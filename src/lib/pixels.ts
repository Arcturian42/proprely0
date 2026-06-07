// Pixels publicitaires (Meta, LinkedIn). Comme GA4, ces traceurs ne sont
// chargés QU'APRÈS consentement explicite. IDs configurables via variables
// d'environnement Vite — non chargés si vides.

import { getConsent } from './analytics'

const META_PIXEL_ID = (import.meta as unknown as {
  env: { VITE_META_PIXEL_ID?: string }
}).env.VITE_META_PIXEL_ID

const LINKEDIN_PARTNER_ID = (import.meta as unknown as {
  env: { VITE_LINKEDIN_PARTNER_ID?: string }
}).env.VITE_LINKEDIN_PARTNER_ID

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string }
    _fbq?: unknown
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
    lintrk?: (action: string, params?: Record<string, unknown>) => void
  }
}

let metaLoaded = false
let linkedinLoaded = false

function consentGranted(): boolean {
  return getConsent() === 'granted'
}

function loadMetaPixel() {
  if (metaLoaded || !META_PIXEL_ID || typeof window === 'undefined') return
  if (!consentGranted()) return
  metaLoaded = true

  ;(function (f: Window, b: Document, e: string) {
    if (f.fbq) return
    const n = function (...args: unknown[]) {
      // @ts-expect-error fbq dynamic
      n.callMethod ? n.callMethod.apply(n, args) : n.queue!.push(args)
    } as Window['fbq']
    if (!f._fbq) f._fbq = n
    // @ts-expect-error fbq dynamic
    n.push = n
    // @ts-expect-error fbq dynamic
    n.loaded = true
    // @ts-expect-error fbq dynamic
    n.version = '2.0'
    // @ts-expect-error fbq dynamic
    n.queue = []
    f.fbq = n
    const t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = 'https://connect.facebook.net/en_US/fbevents.js'
    const s = b.getElementsByTagName(e)[0]
    s.parentNode!.insertBefore(t, s)
  })(window, document, 'script')

  window.fbq?.('init', META_PIXEL_ID)
  window.fbq?.('track', 'PageView')
}

function loadLinkedInTag() {
  if (linkedinLoaded || !LINKEDIN_PARTNER_ID || typeof window === 'undefined') return
  if (!consentGranted()) return
  linkedinLoaded = true

  window._linkedin_partner_id = LINKEDIN_PARTNER_ID
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []
  window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID)

  ;(function (l: Window) {
    if (!l.lintrk) {
      l.lintrk = function (a: string, b?: Record<string, unknown>) {
        // @ts-expect-error lintrk dynamic queue
        ;(l.lintrk.q = l.lintrk.q || []).push([a, b])
      }
      // @ts-expect-error lintrk dynamic queue
      l.lintrk.q = []
    }
    const s = document.getElementsByTagName('script')[0]
    const b = document.createElement('script')
    b.type = 'text/javascript'
    b.async = true
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js'
    s.parentNode!.insertBefore(b, s)
  })(window)
}

export function initPixels() {
  if (typeof window === 'undefined') return
  if (!consentGranted()) return

  const start = () => {
    loadMetaPixel()
    loadLinkedInTag()
  }
  const ric = (window as typeof window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void
  }).requestIdleCallback
  if (ric) ric(start, { timeout: 4000 })
  else setTimeout(start, 2000)
}

export function trackPixelEvent(name: string, params?: Record<string, unknown>) {
  if (!consentGranted()) return
  window.fbq?.('track', name, params || {})
  window.lintrk?.('track', params || {})
}

export function trackPixelPageView() {
  if (!consentGranted()) return
  window.fbq?.('track', 'PageView')
}

export function trackPixelLead(extra?: Record<string, unknown>) {
  if (!consentGranted()) return
  window.fbq?.('track', 'Lead', extra)
  window.lintrk?.('track', { conversion_id: extra?.conversion_id })
}

export function trackPixelCompleteRegistration(extra?: Record<string, unknown>) {
  if (!consentGranted()) return
  window.fbq?.('track', 'CompleteRegistration', extra)
  window.lintrk?.('track', { conversion_id: extra?.conversion_id })
}
