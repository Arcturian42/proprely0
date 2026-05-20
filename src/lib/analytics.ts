// GA4 est chargé en dur dans index.html (G-ETKWWG0CWL).
// Ce module fournit juste les helpers pour tracker events et page views
// depuis le code SPA.

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params || {})
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  })
}

// Compat : kept for components that import these symbols.
// Avec GA4 charge en dur dans index.html, le consent banner ne gate
// plus rien — il informe juste l'utilisateur. Conservé pour ne pas
// casser les imports existants.
const STORAGE_KEY = 'proprely_consent_v1'
type Consent = 'granted' | 'denied' | null

export function getConsent(): Consent {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  if (v === 'granted' || v === 'denied') return v
  return null
}

export function setConsent(value: Exclude<Consent, null>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, value)
}

export function initAnalytics() {
  // GA4 est chargé via index.html. Rien à faire ici.
}
