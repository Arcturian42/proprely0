import { useEffect, useState } from 'react'
import { X, Calculator, ArrowRight } from 'lucide-react'
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
}

export default function ExitIntentPopup({
  source,
  title = 'Avant de partir — recevez nos analyses propreté B2B',
  subtitle = "Une fois par semaine, on partage des analyses chiffrées (marge, IDCC 3043, comparatifs logiciels) pensées pour les dirigeants de société de nettoyage.",
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Avant de partir"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X size={16} />
        </button>

        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white px-6 sm:px-8 pt-7 pb-14 relative">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-4 border border-white/20">
            <Calculator size={11} />
            Vous utilisez nos calculateurs ?
          </div>
          <h2 className="text-xl sm:text-2xl font-black leading-tight mb-2 pr-6">{title}</h2>
          <p className="text-sm text-blue-100 leading-relaxed">{subtitle}</p>
        </div>

        <div className="px-6 sm:px-8 pt-0 pb-7 -mt-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-lg mb-4">
            <NewsletterSignup source={source} variant="inline" buttonLabel="Recevoir" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              RGPD · Hébergement européen
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-500 hover:text-slate-900 inline-flex items-center gap-1"
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
