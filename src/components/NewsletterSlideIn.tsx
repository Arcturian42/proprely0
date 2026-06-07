import { useEffect, useState } from 'react'
import { X, Mail } from 'lucide-react'
import NewsletterSignup from './NewsletterSignup'
import { trackEvent } from '../lib/analytics'

const STORAGE_KEY = 'proprely_newsletter_slidein_v1'
// Trigger : scroll > 40 % de la page OU plus de 30 s sur la page
const SCROLL_THRESHOLD = 0.4
const TIME_THRESHOLD_MS = 30_000
// Si fermé / soumis → ne plus afficher pendant 7 jours
const DISMISS_DAYS = 7

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
  /** Source pour le tracking GA / Brevo */
  source?: string
}

export default function NewsletterSlideIn({ source = 'blog_slidein' }: Props) {
  const [visible, setVisible] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (!shouldShow()) return

    let scrollPassed = false
    let timePassed = false
    let shown = false

    const tryShow = () => {
      if (shown || !scrollPassed || !timePassed) return
      shown = true
      setVisible(true)
      requestAnimationFrame(() => setAnimateIn(true))
      trackEvent('newsletter_slidein_shown', { source })
    }

    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      const ratio = total > 0 ? doc.scrollTop / total : 0
      if (ratio > SCROLL_THRESHOLD) {
        scrollPassed = true
        tryShow()
      }
    }

    const timer = window.setTimeout(() => {
      timePassed = true
      tryShow()
    }, TIME_THRESHOLD_MS)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [source])

  if (!visible) return null

  const handleClose = () => {
    markDismissed()
    setAnimateIn(false)
    window.setTimeout(() => setVisible(false), 200)
    trackEvent('newsletter_slidein_dismissed', { source })
  }

  return (
    <div
      role="complementary"
      aria-label="Inscription à la newsletter Proprely"
      className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-[80] transition-all duration-200 ${
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X size={14} />
        </button>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-5 pt-5 pb-12 relative">
          <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3">
            <Mail size={11} />
            Newsletter Proprely
          </div>
          <h3 className="text-base font-black leading-snug mb-1.5 pr-6">
            Une analyse propreté B2B chaque semaine
          </h3>
          <p className="text-xs text-blue-100 leading-relaxed">
            Méthodes, prix, conformité, outils. Désinscription en 1 clic.
          </p>
        </div>

        <div className="bg-white px-5 pt-0 pb-5 -mt-8">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md">
            <NewsletterSignup
              source={source}
              variant="inline"
              buttonLabel="Recevoir"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-tight">
            RGPD · Hébergement européen · Pas de spam
          </p>
        </div>
      </div>
    </div>
  )
}
