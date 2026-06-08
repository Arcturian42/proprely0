// GA4 avec Consent Mode v2.
//
// Le tag gtag.js est chargé immédiatement depuis index.html (pour que Google
// Tag Assistant détecte la balise et pour respecter le pattern Google moderne),
// MAIS toutes les catégories de stockage sont "denied" par défaut.
//
// Au clic "Accepter" dans le bandeau cookies, on appelle gtag('consent',
// 'update', { analytics_storage: 'granted', ... }) — ce qui débloque le pixel
// d'analytics chez Google sans recharger de script. Conforme CNIL / EEE.

const GA_ID = 'G-ETKWWG0CWL'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

// Fournit un gtag de secours si le bootstrap n'a pas eu lieu (SSR, env de test).
function ensureGtag() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
}

function consentGranted(): boolean {
  return getConsent() === 'granted'
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  ensureGtag()
  // L'événement est queué même sans consentement. Si Consent Mode est en
  // "denied", Google Tag Manager ne le compte pas comme un hit user identifiable
  // (cookieless ping uniquement). Une fois "granted", les events suivants
  // alimentent les rapports GA4 normalement.
  window.gtag?.('event', name, params || {})
}

export function trackPageView(path: string) {
  if (typeof window === 'undefined') return
  ensureGtag()
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
  })
}

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
  // Synchronise immédiatement Consent Mode pour GA4.
  ensureGtag()
  if (value === 'granted') {
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })
  } else {
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    })
  }
}

/**
 * Appelée après "Accepter" dans le bandeau cookies. Mémorise le choix et
 * propage le Consent Mode update à GA4. Pas besoin d'injecter le script :
 * il est déjà chargé en idle via index.html.
 */
export function enableAnalytics() {
  setConsent('granted')
}

export function initAnalytics() {
  if (typeof window === 'undefined') return
  ensureGtag()
  // Si l'utilisateur avait déjà accepté lors d'une visite précédente, on
  // propage immédiatement le Consent Mode pour débloquer les rapports.
  if (consentGranted()) {
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })
  }
}

/** Conservé pour rétrocompatibilité avec d'éventuels callers. */
export function isAnalyticsLoaded() {
  return typeof window !== 'undefined' && Array.isArray(window.dataLayer)
}

// Référence GA_ID (utilisé indirectement via le script index.html).
void GA_ID
