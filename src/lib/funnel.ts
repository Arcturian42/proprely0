// Helpers de funnel tracking GA4 typés.
// Centralise les events critiques (engagement, conversion) avec un schéma
// stable pour faciliter les rapports dans GA4 + DataLayer custom dimensions.
//
// Architecture : 4 catégories d'events
//  - page_step  : étape de funnel (visite, scroll milestones, time milestones)
//  - engagement : interactions produit (slider, FAQ open, video play…)
//  - conversion : conversions (lead, signup, demo request)
//  - exit       : signaux de sortie (exit-intent, abandon form)

import { trackEvent } from './analytics'
import { trackPixelLead, trackPixelEvent, trackPixelCompleteRegistration } from './pixels'

export type FunnelStep =
  | 'visit'
  | 'scroll_25'
  | 'scroll_50'
  | 'scroll_75'
  | 'scroll_100'
  | 'time_10s'
  | 'time_30s'
  | 'time_60s'
  | 'time_180s'
  | 'first_click'
  | 'cta_view'

export type EngagementType =
  | 'calculator_slider'
  | 'calculator_result'
  | 'faq_open'
  | 'video_play'
  | 'mega_menu_open'
  | 'tab_change'
  | 'filter_change'
  | 'comparison_view'

export type ConversionType =
  | 'lead_newsletter'
  | 'lead_magnet'
  | 'demo_requested'
  | 'audit_requested'
  | 'beta_form_submit'

/**
 * Étape de funnel passive (auto-déclenchée par scroll / temps).
 * Categories pour facilitation des rapports GA4.
 */
export function trackFunnelStep(step: FunnelStep, params?: Record<string, unknown>) {
  trackEvent('funnel_step', { step, ...params })
}

/**
 * Engagement actif de l'utilisateur (interactions produit).
 */
export function trackEngagement(type: EngagementType, params?: Record<string, unknown>) {
  trackEvent('engagement', { type, ...params })
}

/**
 * Conversion : déclenche aussi le tracking pixel (Meta Lead / LinkedIn).
 */
export function trackConversion(type: ConversionType, params?: Record<string, unknown>) {
  trackEvent('conversion', { type, ...params })
  if (type === 'beta_form_submit' || type === 'demo_requested') {
    trackPixelCompleteRegistration({ content_category: type, ...params })
  } else {
    trackPixelLead({ content_category: type, ...params })
  }
}

export function trackExit(reason: 'exit_intent' | 'form_abandon', params?: Record<string, unknown>) {
  trackEvent('exit', { reason, ...params })
  trackPixelEvent('Lead', { intent: reason, ...params })
}

// ─── Auto-trackers : scroll depth + time milestones ────────────────────

let installed = false

const scrollMilestones: { ratio: number; step: FunnelStep }[] = [
  { ratio: 0.25, step: 'scroll_25' },
  { ratio: 0.5, step: 'scroll_50' },
  { ratio: 0.75, step: 'scroll_75' },
  { ratio: 1.0, step: 'scroll_100' },
]

const timeMilestones: { delayMs: number; step: FunnelStep }[] = [
  { delayMs: 10_000, step: 'time_10s' },
  { delayMs: 30_000, step: 'time_30s' },
  { delayMs: 60_000, step: 'time_60s' },
  { delayMs: 180_000, step: 'time_180s' },
]

const firedScroll = new Set<FunnelStep>()
const firedTime = new Set<FunnelStep>()
const firedFirstClick = { value: false }

let currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
const timers: number[] = []

function resetForNewPage() {
  firedScroll.clear()
  firedTime.clear()
  firedFirstClick.value = false
  timers.forEach((t) => window.clearTimeout(t))
  timers.length = 0
}

function armTimers() {
  for (const m of timeMilestones) {
    const id = window.setTimeout(() => {
      if (!firedTime.has(m.step)) {
        firedTime.add(m.step)
        trackFunnelStep(m.step, { path: currentPath })
      }
    }, m.delayMs)
    timers.push(id)
  }
}

function onScroll() {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  if (total <= 0) return
  const ratio = doc.scrollTop / total
  for (const m of scrollMilestones) {
    if (ratio >= m.ratio && !firedScroll.has(m.step)) {
      firedScroll.add(m.step)
      trackFunnelStep(m.step, { path: currentPath })
    }
  }
}

function onClick() {
  if (firedFirstClick.value) return
  firedFirstClick.value = true
  trackFunnelStep('first_click', { path: currentPath })
}

/**
 * Installe les listeners de tracking funnel passif (scroll, time, first click).
 * À appeler 1 fois après le consentement. Idempotent.
 */
export function installFunnelTracking() {
  if (installed || typeof window === 'undefined') return
  installed = true

  armTimers()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onClick, { capture: true, passive: true })
  // Auto-reset au changement de route (SPA pseudo-router)
  let lastPath = window.location.pathname
  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname
      currentPath = lastPath
      resetForNewPage()
      armTimers()
    }
  }, 1000)
}
