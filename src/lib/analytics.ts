// GA4 est chargé en lazy depuis ce module pour ne pas bloquer le rendu initial.
// L'init effectif est déclenché après idle/load + délai pour libérer le main thread.

const GA_ID = 'G-ETKWWG0CWL'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let gaLoaded = false
let gaLoadStarted = false

/**
 * GA4 est une mesure d'audience NON exemptée par la CNIL : elle ne doit jamais
 * être chargée sans consentement explicite préalable. Ce verrou est le point de
 * passage unique — tous les chemins (idle, interaction, trackEvent) transitent
 * par loadGAScript, donc aucun ne peut charger GA sans consentement.
 */
function consentGranted(): boolean {
  return getConsent() === 'granted'
}

function loadGAScript() {
  if (gaLoadStarted || typeof window === 'undefined') return
  if (!consentGranted()) return
  gaLoadStarted = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  script.onload = () => {
    gaLoaded = true
  }
  document.head.appendChild(script)
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  if (!consentGranted()) return
  if (!gaLoadStarted) loadGAScript()
  window.gtag?.('event', name, params || {})
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return
  if (!consentGranted() || !gaLoadStarted) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  })
}

// Compat : kept for components that import these symbols.
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

/**
 * Appelé après un consentement explicite ("Accepter" dans le bandeau cookies).
 * Mémorise le choix puis démarre immédiatement GA4 (le verrou consentGranted()
 * de loadGAScript est désormais satisfait).
 */
export function enableAnalytics() {
  setConsent('granted')
  loadGAScript()
}

export function initAnalytics() {
  if (typeof window === 'undefined' || gaLoadStarted) return
  // Sans consentement accordé, on n'attache aucun listener et on ne planifie
  // aucun chargement. La mesure démarre via enableAnalytics() au clic "Accepter".
  if (!consentGranted()) return

  const start = () => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void
    }).requestIdleCallback
    if (ric) {
      ric(loadGAScript, { timeout: 4000 })
    } else {
      setTimeout(loadGAScript, 2000)
    }
  }

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }

  // Fallback: charger sur première interaction si l'idle ne se déclenche pas vite
  const onInteract = () => {
    loadGAScript()
    window.removeEventListener('scroll', onInteract)
    window.removeEventListener('pointerdown', onInteract)
    window.removeEventListener('keydown', onInteract)
  }
  window.addEventListener('scroll', onInteract, { passive: true, once: true })
  window.addEventListener('pointerdown', onInteract, { once: true })
  window.addEventListener('keydown', onInteract, { once: true })
}

// Silence unused warning if needed in the future
export function isAnalyticsLoaded() {
  return gaLoaded
}
