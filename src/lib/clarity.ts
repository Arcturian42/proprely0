// Microsoft Clarity (session recordings + heatmaps).
// IMPORTANT : Clarity capture des sessions utilisateur — c'est plus invasif
// que GA4. Il DOIT être chargé après consentement explicite, comme GA4 et les
// pixels publicitaires. Sans ce gating, on viole le RGPD et on casse la
// promesse de conformité affichée sur le site (/securite-rgpd, FAQ).

import { getConsent } from './analytics'

const CLARITY_PROJECT_ID = 'x3rm90dm0k'

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

let clarityLoaded = false

function consentGranted(): boolean {
  return getConsent() === 'granted'
}

function loadClarity() {
  if (clarityLoaded || typeof window === 'undefined') return
  if (!consentGranted()) return
  clarityLoaded = true

  // Snippet officiel Microsoft Clarity (cf. clarity.microsoft.com)
  ;(function (c: Window, l: Document, a: 'clarity', r: 'script', i: string) {
    c[a] = c[a] || (function (...args: unknown[]) {
      ;((c[a] as { q?: unknown[][] }).q = (c[a] as { q?: unknown[][] }).q || []).push(args)
    } as Window['clarity'])
    const t = l.createElement(r) as HTMLScriptElement
    t.async = true
    t.src = 'https://www.clarity.ms/tag/' + i
    const y = l.getElementsByTagName(r)[0]
    y.parentNode!.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID)
}

export function initClarity() {
  if (typeof window === 'undefined') return
  if (!consentGranted()) return

  const start = () => loadClarity()
  const ric = (window as typeof window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void
  }).requestIdleCallback
  if (ric) ric(start, { timeout: 4000 })
  else setTimeout(start, 2000)
}
