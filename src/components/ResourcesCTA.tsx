import { ArrowRight, Download } from 'lucide-react'
import { navigate } from '../lib/useRoute'

type Props = {
  variant?: 'inline' | 'block'
  className?: string
}

export default function ResourcesCTA({ variant = 'block', className = '' }: Props) {
  if (variant === 'inline') {
    return (
      <button
        onClick={() => navigate('/ressources')}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-2 ${className}`}
      >
        <Download size={14} />
        Téléchargez nos modèles gratuits
      </button>
    )
  }

  return (
    <aside
      className={`bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Download size={18} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">Ressources gratuites</p>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 leading-snug">
            Téléchargez nos modèles Excel
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Modèles de devis, planning et suivi des heures — prêts à l'emploi, sans inscription.
          </p>
          <button
            onClick={() => navigate('/ressources')}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            Voir les modèles gratuits
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  )
}
