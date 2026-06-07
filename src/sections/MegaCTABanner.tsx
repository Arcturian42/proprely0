import { ArrowRight, Sparkles, Clock, ShieldCheck, Zap } from 'lucide-react'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

type Props = {
  /** Titre principal du bandeau */
  title?: string
  /** Sous-titre de réassurance */
  subtitle?: string
  /** Label du CTA primaire */
  ctaLabel?: string
  /** Localisation pour le tracking analytics */
  location?: string
  /** Variante visuelle : "dark" (slate-950) ou "blue" (gradient bleu) */
  variant?: 'dark' | 'blue'
}

const DEFAULT_TITLE = "Prêt à reprendre le contrôle de votre société de nettoyage ?"
const DEFAULT_SUBTITLE = "30 sociétés fondatrices, accès gratuit pendant la bêta, tarif fondateur à vie. Onboarding 30 min avec le fondateur."
const DEFAULT_CTA = "Rejoindre la bêta gratuite"

export default function MegaCTABanner({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  ctaLabel = DEFAULT_CTA,
  location = 'mega_cta_banner',
  variant = 'dark',
}: Props) {
  const bgClass = variant === 'blue'
    ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white'
    : 'bg-slate-950 text-white'

  return (
    <section className={`relative py-14 sm:py-20 border-t border-slate-100 overflow-hidden ${bgClass}`}>
      <div className="absolute top-0 -left-32 w-[28rem] h-[28rem] rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles size={12} />
          Bêta privée gratuite — 30 places fondateurs
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-tight">
          {title}
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        <a
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('beta_cta_click', { location })}
          className="group inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 sm:px-9 py-4 font-bold text-sm sm:text-base hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:-translate-y-0.5 active:scale-[0.97]"
        >
          {ctaLabel}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} className="text-cyan-300" />
            Onboarding 30 min avec le fondateur
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={12} className="text-cyan-300" />
            Pas de carte bancaire
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-cyan-300" />
            Hébergement européen RGPD
          </span>
        </div>
      </div>
    </section>
  )
}
