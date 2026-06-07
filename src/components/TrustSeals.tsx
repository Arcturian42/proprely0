import { ShieldCheck, MapPin, Lock, Server, ArrowRight } from 'lucide-react'
import Link from './Link'

type Variant = 'strip' | 'compact' | 'card'

const SEALS = [
  { icon: ShieldCheck, label: 'RGPD', sub: 'Conforme + DPA' },
  { icon: MapPin, label: 'France', sub: 'Hébergement UE' },
  { icon: Lock, label: 'TLS + AES-256', sub: 'Chiffrement' },
  { icon: Server, label: '99,9 %', sub: 'Sauvegardes quotidiennes' },
]

type Props = {
  variant?: Variant
  className?: string
  /** Affiche le lien "Voir la page sécurité" */
  showLink?: boolean
}

export default function TrustSeals({ variant = 'strip', className = '', showLink = true }: Props) {
  if (variant === 'strip') {
    return (
      <div className={className}>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500">
          {SEALS.map((s) => {
            const Icon = s.icon
            return (
              <span key={s.label} className="inline-flex items-center gap-1.5">
                <Icon size={12} className="text-emerald-600" />
                <span className="font-bold text-slate-700">{s.label}</span>
                <span className="text-slate-400 hidden sm:inline">· {s.sub}</span>
              </span>
            )
          })}
          {showLink && (
            <Link
              to="/securite-rgpd"
              className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
            >
              Détails sécurité
              <ArrowRight size={10} />
            </Link>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={className}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {SEALS.map((s) => {
            const Icon = s.icon
            return (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-1 text-[11px] font-semibold text-slate-700"
              >
                <Icon size={11} className="text-emerald-600" />
                {s.label}
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  // variant === 'card'
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      {SEALS.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-2">
              <Icon size={16} className="text-emerald-600" />
            </div>
            <div className="text-sm font-black text-slate-900 leading-tight">{s.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
          </div>
        )
      })}
    </div>
  )
}
