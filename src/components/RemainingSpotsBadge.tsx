import { Flame } from 'lucide-react'
import { remainingSpots, FOUNDER_SPOTS } from '../config'

type Variant = 'inline' | 'pill' | 'banner'

type Props = {
  variant?: Variant
  /** Texte personnalisé prefix, défaut "Plus que" */
  prefix?: string
  className?: string
}

/**
 * Badge dynamique qui affiche le nombre de places fondateurs restantes.
 * Utilisé sur tous les CTA bêta pour créer un effet de rareté / urgence.
 * Source de vérité : FOUNDER_SPOTS dans src/config.ts (taken/total).
 *
 * Variantes :
 * - inline : texte simple (pour intégrer dans un paragraphe)
 * - pill : badge arrondi coloré (pour à côté d'un CTA)
 * - banner : bandeau visible (en haut d'une section CTA)
 */
export default function RemainingSpotsBadge({ variant = 'pill', prefix = 'Plus que', className = '' }: Props) {
  const remaining = remainingSpots()
  const isUrgent = remaining <= 10
  const isCritical = remaining <= 5

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-center gap-1 font-bold ${isUrgent ? 'text-orange-600' : 'text-blue-700'} ${className}`}>
        {isCritical && <Flame size={12} className="text-orange-500" />}
        {prefix} {remaining} place{remaining > 1 ? 's' : ''} sur {FOUNDER_SPOTS.total}
      </span>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isUrgent ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-blue-50 text-blue-700 border border-blue-100'} ${className}`}>
        {isCritical && <Flame size={12} />}
        {prefix} {remaining} place{remaining > 1 ? 's' : ''} sur {FOUNDER_SPOTS.total}
      </div>
    )
  }

  // variant === 'pill' (par défaut)
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${isUrgent ? 'bg-orange-100 text-orange-700' : 'bg-cyan-100 text-cyan-700'} ${className}`}>
      {isCritical && <Flame size={10} />}
      {remaining}/{FOUNDER_SPOTS.total} places
    </span>
  )
}
