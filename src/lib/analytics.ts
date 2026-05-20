const STORAGE_KEY = 'proprely_consent_v1'
const GA_ID = (import.meta as unknown as { env: { VITE_GA4_MEASUREMENT_ID?: string } }).env.VITE_GA4_MEASUREMENT_ID

type Consent = 'granted' | 'denied' | null

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function getConsent(): Consent {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  if (v === 'granted' || v === 'denied') return v
  return null
}

export function setConsent(value: Exclude<Consent, null>) {
  window.localStorage.setItem(STORAGE_KEY, value)
  if (value === 'granted') loadGA()
  else unloadGA()
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(args)
}

export function loadGA() {
  if (!GA_ID) return
  if (document.getElementById('ga4-script')) return
  const s = document.createElement('script')
  s.id = 'ga4-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', GA_ID, { anonymize_ip: true, send_page_view: true })
}

function unloadGA() {
  document.getElementById('ga4-script')?.remove()
  window.dataLayer = []
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID) return
  if (getConsent() !== 'granted') return
  window.gtag?.('event', name, params || {})
}

export function trackPageView(path: string) {
  if (!GA_ID) return
  if (getConsent() !== 'granted') return
  window.gtag?.('event', 'page_view', { page_path: path, page_location: window.location.href })
}

export function initAnalytics() {
  if (typeof window === 'undefined') return
  if (getConsent() === 'granted') loadGA()
}
