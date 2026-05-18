import { motion } from 'framer-motion'
import { CheckCircle, Loader2, Calendar } from 'lucide-react'

const columns = [
  {
    icon: CheckCircle,
    iconColor: 'text-emerald-600',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-200/60',
    badge: 'Disponible',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    title: 'Déjà disponible',
    desc: 'Ce qui fonctionne dans Proprely à votre arrivée dans la bêta.',
    items: [
      'Clients & sites avec historique',
      'Agents et spécialités',
      'Planning et affectation 1-clic',
      'Missions avec QR code et photos',
      'Devis professionnels en 2 minutes',
      'Documents centralisés',
    ],
  },
  {
    icon: Loader2,
    iconColor: 'text-blue-600',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-200/60',
    badge: 'En finalisation',
    badgeBg: 'bg-blue-100 text-blue-700',
    title: 'En finalisation',
    desc: 'Ce qu\'on construit pendant la bêta, avec vos retours.',
    items: [
      'Pilotage avec marge par client',
      'Connexion native Pennylane / Conto',
      'Signature électronique client',
      'Application mobile agents',
      'Export comptable automatique',
    ],
  },
  {
    icon: Calendar,
    iconColor: 'text-slate-500',
    bg: 'bg-slate-50',
    borderColor: 'border-slate-200/60',
    badge: 'Prévu plus tard',
    badgeBg: 'bg-slate-100 text-slate-600',
    title: 'Sur la feuille de route',
    desc: 'Ce qu\'on construira après la bêta, en partie selon vos demandes.',
    items: [
      'IA prospection locale',
      'Reporting mensuel automatique',
      'Workflow d\'approvisionnement',
      'Multi-entités pour les franchises',
      'Intégration logiciels de paie',
    ],
  },
]

export default function ProductStatus() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">État du produit</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Transparence totale<br />sur ce qui marche
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            On est en bêta, on assume. Voici précisément ce qui est déjà là, ce qui se finalise, et ce qui viendra plus tard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-white rounded-2xl border ${col.borderColor} p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl ${col.bg} flex items-center justify-center shrink-0`}>
                  <col.icon size={18} className={col.iconColor} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${col.badgeBg}`}>{col.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{col.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{col.desc}</p>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className={`w-1.5 h-1.5 rounded-full ${col.iconColor.replace('text-', 'bg-')} mt-2 shrink-0`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-10">
          Les membres fondateurs influencent directement l'ordre de la feuille de route.
        </p>
      </div>
    </section>
  )
}
