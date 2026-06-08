import { Quote, Star, Users, MapPin } from 'lucide-react'
import { FOUNDER_SPOTS } from '../config'

export type Testimonial = {
  /** Citation textuelle du dirigeant — laisser vide tant que pas validé écrit */
  quote: string
  /** Nom anonymisable : "P. M." ou "Paul M." */
  author: string
  /** Fonction : "Dirigeant", "Gérant", "Directeur opérationnel" */
  role: string
  /** Société anonymisée : "Société tertiaire 80 agents · Paris" */
  company: string
}

/** Indicateurs trust 100 % vérifiables, pas de fabrication */
// eslint-disable-next-line react-refresh/only-export-components
export const TRUST_INDICATORS = [
  { icon: Users, value: `${FOUNDER_SPOTS.taken}/${FOUNDER_SPOTS.total}`, label: 'Places fondateurs prises' },
  { icon: MapPin, value: 'France', label: 'Conçu en France, hébergement UE' },
  { icon: Star, value: '30 min', label: "Onboarding avec le fondateur" },
]

/** Témoignages à remplir avec de vrais retours validés écrit par les fondateurs.
 *  Placeholder désactivé tant que `quote` est vide. */
// eslint-disable-next-line react-refresh/only-export-components
export const TESTIMONIALS: Testimonial[] = [
  // Exemple de structure — remplace par les vrais retours :
  // {
  //   quote: "On a remplacé 4 fichiers Excel et un groupe WhatsApp en une matinée. Mes chefs d'équipe ont compris l'outil en 10 minutes.",
  //   author: 'P. M.',
  //   role: 'Dirigeant',
  //   company: 'Société tertiaire · 12 agents · Lyon',
  // },
]

type SocialProofProps = {
  /** "row" = bandeau horizontal compact pour hero
   *  "grid" = grille de témoignages pleine
   *  "indicators" = juste les chiffres trust */
  variant?: 'row' | 'grid' | 'indicators'
  className?: string
}

export default function SocialProof({ variant = 'row', className = '' }: SocialProofProps) {
  if (variant === 'indicators') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-8 ${className}`}>
        {TRUST_INDICATORS.map((t) => {
          const Icon = t.icon
          return (
            <div key={t.label} className="flex items-center gap-2.5 text-left">
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">{t.value}</div>
                <div className="text-xs text-slate-500 leading-tight">{t.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  if (variant === 'row') {
    const hasTestimonials = TESTIMONIALS.length > 0
    return (
      <div className={`${className}`}>
        {hasTestimonials ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <figure
                key={i}
                className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm"
              >
                <Quote size={16} className="text-blue-600 mb-2" aria-hidden="true" />
                <blockquote className="text-sm text-slate-700 leading-relaxed mb-3">
                  {t.quote}
                </blockquote>
                <figcaption className="text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{t.author}</span> · {t.role}
                  <br />
                  <span className="text-slate-500">{t.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <SocialProof variant="indicators" />
        )}
      </div>
    )
  }

  // variant === 'grid'
  const hasTestimonials = TESTIMONIALS.length > 0
  if (!hasTestimonials) {
    return (
      <div className={className}>
        <SocialProof variant="indicators" />
      </div>
    )
  }

  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {TESTIMONIALS.map((t, i) => (
        <figure
          key={i}
          className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-sm"
        >
          <Quote size={18} className="text-blue-600 mb-3" aria-hidden="true" />
          <blockquote className="text-base text-slate-700 leading-relaxed mb-4">
            {t.quote}
          </blockquote>
          <figcaption className="text-xs text-slate-500">
            <span className="font-bold text-slate-900 text-sm">{t.author}</span>
            <span className="block mt-0.5">{t.role}</span>
            <span className="block mt-0.5">{t.company}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
