import { remainingSpots, FOUNDER_SPOTS } from '../config'

type Variant = 'inline' | 'pill' | 'banner'

type Props = {
  variant?: Variant
  prefix?: string
  className?: string
}

/**
 * Badge sobre affichant le nombre de places fondateurs restantes.
 * Source de vérité : FOUNDER_SPOTS dans src/config.ts.
 * Style neutre slate, sans urgence visuelle agressive.
 */
export default function RemainingSpotsBadge({ variant = 'pill', prefix = 'Plus que', className = '' }: Props) {
  const remaining = remainingSpots()
  const label = `${remaining} place${remaining > 1 ? 's' : ''} sur ${FOUNDER_SPOTS.total}`

  if (variant === 'inline') {
    return (
      <span className={`font-semibold text-slate-700 ${className}`}>
        {prefix} {label}
      </span>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        {prefix} {label}
      </div>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      {remaining}/{FOUNDER_SPOTS.total} places
    </span>
  )
}
