import { useEffect, useState } from 'react'
import { X, Calculator, ArrowRight, Sparkles } from 'lucide-react'
import NewsletterSignup from './NewsletterSignup'
import { trackEvent } from '../lib/analytics'

const STORAGE_KEY = 'proprely_exitintent_v1'
const DISMISS_DAYS = 30
// Délai minimum d'engagement avant d'armer le trigger (évite popup immédiat)
const ARM_DELAY_MS = 5_000

type DismissEntry = { until: number }

function shouldShow(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return true
    const entry = JSON.parse(raw) as DismissEntry
    return Date.now() > entry.until
  } catch {
    return true
  }
}

function markDismissed() {
  try {
    const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ until }))
  } catch {
    /* ignore */
  }
}

type Props = {
  /** Source pour le tracking (ex: roi_calculator, simulateur_rentabilite) */
  source: string
  /** Titre customisable selon la page */
  title?: string
  /** Sous-titre customisable */
  subtitle?: string
  /** Badge contextuel affiché en haut. Si non fourni, déduit de la source. */
  badge?: string
}

// Déduit un badge contextuel à partir de la source de la page pour ne pas
// afficher "Vous utilisez nos calculateurs ?" sur un article de blog.
function defaultBadge(source: string): { label: string; useCalculatorIcon: boolean } {
  if (source.includes('calculator') || source.includes('calculateur') || source.includes('simulateur')) {
    return { label: 'Vous utilisez nos calculateurs ?', useCalculatorIcon: true }
  }
  if (source === 'blog_post' || source === 'blog_index') {
    return { label: 'Vous avez aimé cet article ?', useCalculatorIcon: false }
  }
  if (source.startsWith('comparatif') || source.startsWith('alternative')) {
    return { label: 'Avant de comparer ailleurs', useCalculatorIcon: false }
  }
  if (source === 'guide' || source.startsWith('guide')) {
    return { label: 'Pour aller plus loin', useCalculatorIcon: false }
  }
  if (source === 'ville' || source === 'villes_index') {
    return { label: 'Vous gérez plusieurs sites ?', useCalculatorIcon: false }
  }
  if (source === 'fonctionnalite' || source === 'fonctionnalites_index') {
    return { label: 'Avant de partir', useCalculatorIcon: false }
  }
  if (source === 'integration' || source === 'integrations_index') {
    return { label: 'Vous structurez votre stack ?', useCalculatorIcon: false }
  }
  if (source === 'ressource') {
    return { label: 'Téléchargez nos modèles', useCalculatorIcon: false }
  }
  return { label: 'Avant de partir', useCalculatorIcon: false }
}

export default function ExitIntentPopup({
  source,
  title = 'Avant de partir — recevez nos analyses propreté B2B',
  subtitle = "Une fois par semaine, on partage des analyses chiffrées (marge, IDCC 3043, comparatifs logiciels) pensées pour les dirigeants de société de nettoyage.",
  badge,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!shouldShow()) return

    let armed = false
    let shown = false
    const armTimer = window.setTimeout(() => {
      armed = true
    }, ARM_DELAY_MS)

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed || shown) return
      // Détection : la souris quitte par le haut de la fenêtre
      if (e.clientY > 0 || e.relatedTarget) return
      shown = true
      setVisible(true)
      trackEvent('exit_intent_shown', { source })
    }

    // Bonus desktop : aussi détecter visibility change (onglet)
    const onVisibility = () => {
      if (!armed || shown) return
      if (document.visibilityState === 'hidden') {
        shown = true
        setVisible(true)
        trackEvent('exit_intent_shown', { source, trigger: 'visibility' })
      }
    }

    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearTimeout(armTimer)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [source])

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) return null

  const handleClose = () => {
    markDismissed()
    setVisible(false)
    trackEvent('exit_intent_dismissed', { source })
  }

  const resolvedBadge = badge ? { label: badge, useCalculatorIcon: false } : defaultBadge(source)
  const BadgeIcon = resolvedBadge.useCalculatorIcon ? Calculator : Sparkles

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Avant de partir"
      // Backdrop : padding compact en mobile (3) + safe-area inset pour les notchs iOS.
      // Centrage flexbox, items-end sur mobile pour bottom-sheet style + items-center sm+.
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm px-3 sm:px-4 py-3 sm:py-4"
      style={{
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
      onClick={handleClose}
    >
      <div
        // max-h en dvh (dynamic viewport) avec fallback vh : gère barres mobiles iOS/Android.
        // overflow-y-auto pour scroll vertical si le contenu déborde.
        // En mobile : bottom sheet rounded-t-3xl (visuel) ; en sm+ : modal classique rounded-3xl.
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_-10px_60px_rgba(0,0,0,0.25)] sm:shadow-[0_20px_80px_rgba(0,0,0,0.25)] w-full max-w-lg overflow-y-auto overscroll-contain max-h-[calc(100svh-1.5rem)] sm:max-h-[calc(100dvh-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle visuel pour bottom sheet mobile (purement décoratif) */}
        <div className="sm:hidden flex justify-center pt-2 pb-1">
          <span aria-hidden="true" className="block w-10 h-1 rounded-full bg-slate-300/80" />
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-colors shadow-sm"
        >
          <X size={16} />
        </button>

        {/* Header bleu — paddings réduits en mobile pour éviter débordement vertical */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white px-5 sm:px-8 pt-5 sm:pt-7 pb-12 sm:pb-14 relative">
          {/* Badge contextuel — flex-wrap pour éviter débordement horizontal en français long */}
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-3 sm:mb-4 border border-white/20 max-w-full">
            <BadgeIcon size={11} className="shrink-0" />
            <span className="truncate">{resolvedBadge.label}</span>
          </div>
          {/* H2 : pr-10 pour vraiment laisser place au bouton X (was pr-6 = insuffisant) */}
          <h2 className="text-lg sm:text-2xl font-black leading-tight mb-2 pr-10">{title}</h2>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">{subtitle}</p>
        </div>

        {/* Body — paddings réduits en mobile, -mt réduit pour ne pas faire flotter trop haut */}
        <div className="px-5 sm:px-8 pt-0 pb-6 sm:pb-7 -mt-8 sm:-mt-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-lg mb-4">
            <NewsletterSignup source={source} variant="inline" buttonLabel="Recevoir" />
          </div>
          {/* Footer : stack en mobile très étroit, row en sm+. Évite débordement horizontal. */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 sm:justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              RGPD · Hébergement européen
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 justify-center sm:justify-end font-medium"
            >
              Continuer sans
              <ArrowRight size={11} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
