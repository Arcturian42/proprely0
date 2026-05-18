import { motion } from 'framer-motion'
import { Check, X, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

type Row = {
  category: string
  excel: { value: string; status: 'bad' | 'warn' | 'ok' }
  proprely: { value: string; status: 'bad' | 'warn' | 'ok' }
}

const rows: Row[] = [
  { category: 'Calcul des heures par agent', excel: { value: '4h manuel / mois sur agenda papier', status: 'bad' }, proprely: { value: 'Automatique par site et par agent', status: 'ok' } },
  { category: 'Génération de devis', excel: { value: '15-20 min sur Word, sans logo', status: 'bad' }, proprely: { value: '2 minutes, avec votre charte', status: 'ok' } },
  { category: 'Preuve de passage', excel: { value: 'Aucune, parole contre parole', status: 'bad' }, proprely: { value: 'QR code + photos + signature client', status: 'ok' } },
  { category: 'Remplacements urgents', excel: { value: 'Téléphone et WhatsApp, traçabilité nulle', status: 'bad' }, proprely: { value: 'Centralisés, historique conservé', status: 'ok' } },
  { category: 'Marge par client', excel: { value: 'Invisible jusqu\'à la clôture comptable', status: 'bad' }, proprely: { value: 'Visible en temps réel', status: 'ok' } },
  { category: 'Planning consulté par les agents', excel: { value: 'Appels du matin, papier, SMS', status: 'bad' }, proprely: { value: 'Lien navigateur sur leur téléphone', status: 'ok' } },
  { category: 'Sécurité des données', excel: { value: 'Sur ordinateur local, sauvegardes incertaines', status: 'warn' }, proprely: { value: 'Hébergement européen, RGPD, chiffré', status: 'ok' } },
  { category: 'Multi-sites par client', excel: { value: 'Tableaux croisés vite illisibles', status: 'bad' }, proprely: { value: 'Vue arborescence client → sites', status: 'ok' } },
  { category: 'Documents (contrats, fiches)', excel: { value: 'Dispersés entre PC, mails, papier', status: 'bad' }, proprely: { value: 'Centralisés, recherche instantanée', status: 'ok' } },
  { category: 'Alerte surmenage des agents', excel: { value: 'Aucune, découverte au burn-out', status: 'bad' }, proprely: { value: 'Alerte automatique dès le seuil', status: 'ok' } },
]

const statusStyle = {
  bad: { bg: 'bg-red-50', text: 'text-red-700', icon: X, iconColor: 'text-red-500' },
  warn: { bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertTriangle, iconColor: 'text-amber-500' },
  ok: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: Check, iconColor: 'text-emerald-500' },
}

export default function Comparison() {
  return (
    <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Comparatif</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Excel + WhatsApp + Word<br />vs Proprely
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            La même tâche, deux mondes. Voici ce que vous faites aujourd'hui, et ce que vous feriez demain.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-3 gap-px bg-slate-100">
            <div className="bg-slate-50 px-4 sm:px-6 py-4 flex items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Au quotidien</span>
            </div>
            <div className="bg-white px-4 sm:px-6 py-4 flex items-center justify-between">
              <span className="text-sm sm:text-base font-bold text-slate-900">Aujourd'hui</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded">Excel + WhatsApp</span>
            </div>
            <div className="bg-blue-50 px-4 sm:px-6 py-4 flex items-center justify-between">
              <span className="text-sm sm:text-base font-bold text-blue-900">Avec Proprely</span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Cockpit</span>
            </div>
          </div>

          {rows.map((row, i) => {
            const excelStyle = statusStyle[row.excel.status]
            const proprelyStyle = statusStyle[row.proprely.status]
            const ExcelIcon = excelStyle.icon
            const ProprelyIcon = proprelyStyle.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="grid grid-cols-3 gap-px bg-slate-100 border-t border-slate-100"
              >
                <div className="bg-slate-50/50 px-4 sm:px-6 py-4 sm:py-5">
                  <div className="text-xs sm:text-sm font-semibold text-slate-700">{row.category}</div>
                </div>
                <div className="bg-white px-4 sm:px-6 py-4 sm:py-5 flex items-start gap-2.5">
                  <ExcelIcon size={16} className={`${excelStyle.iconColor} shrink-0 mt-0.5`} />
                  <span className="text-xs sm:text-sm text-slate-600 leading-snug">{row.excel.value}</span>
                </div>
                <div className="bg-blue-50/30 px-4 sm:px-6 py-4 sm:py-5 flex items-start gap-2.5">
                  <ProprelyIcon size={16} className={`${proprelyStyle.iconColor} shrink-0 mt-0.5`} />
                  <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">{row.proprely.value}</span>
                </div>
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-3 gap-px bg-slate-100 border-t-2 border-slate-200"
          >
            <div className="bg-slate-900 px-4 sm:px-6 py-5 flex items-center">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">Total semaine</span>
            </div>
            <div className="bg-red-50 px-4 sm:px-6 py-5 flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-red-700 leading-tight">6 à 10 h perdues</span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-red-600/80 hidden sm:inline">en admin dispersée</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-sky-600 px-4 sm:px-6 py-5 flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                <TrendingUp size={14} className="shrink-0" />
                6 h récupérées
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-sky-100 hidden sm:inline">chaque semaine</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 sm:mt-12 text-center"
        >
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm sm:text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Passer à Proprely</span>
            <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-500 mt-3">Gratuit pendant la bêta · Onboarding 30 min · Pas de carte bancaire</p>
        </motion.div>
      </div>
    </section>
  )
}
