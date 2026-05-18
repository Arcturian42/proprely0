import { motion } from 'framer-motion'
import { CheckCircle, Loader2, Calendar, Check, Hourglass } from 'lucide-react'

type Column = {
  icon: typeof CheckCircle
  iconSpin?: boolean
  iconColor: string
  bg: string
  borderColor: string
  badge: string
  badgeBg: string
  title: string
  desc: string
  itemIcon: typeof CheckCircle
  itemIconClass: string
  liveIndicator?: boolean
  items: string[]
}

const columns: Column[] = [
  {
    icon: CheckCircle,
    iconColor: 'text-emerald-600',
    bg: 'bg-emerald-50',
    borderColor: 'border-emerald-200/60',
    badge: 'Disponible',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    title: 'Déjà disponible',
    desc: "Ce qui fonctionne dans Proprely à votre arrivée dans la bêta.",
    itemIcon: Check,
    itemIconClass: 'text-emerald-500',
    items: [
      'Clients, sites & contacts',
      'Agents et spécialités',
      'Planning et affectation en 1-clic',
      'Missions photo/vidéo avant-après (app mobile)',
      'Devis professionnels en 2 minutes',
      'Signature électronique (devis & contrat)',
      'CRM commercial + cockpit opérationnel',
      'Génération automatique de fiches prospect',
    ],
  },
  {
    icon: Loader2,
    iconSpin: true,
    iconColor: 'text-blue-600',
    bg: 'bg-blue-50',
    borderColor: 'border-blue-200/60',
    badge: 'En finalisation',
    badgeBg: 'bg-blue-100 text-blue-700',
    title: 'En finalisation',
    desc: "Ce qu'on construit pendant la bêta, avec vos retours.",
    itemIcon: Hourglass,
    itemIconClass: 'text-blue-500',
    liveIndicator: true,
    items: [
      'Pilotage avec marge par client',
      'Tableau de bord avancé',
      'Connexion native Pennylane & Qonto',
      'Synchronisation Google Calendar',
      'Application mobile PWA',
      'Export comptable & facturation agréée',
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
    desc: "Ce qu'on construira après la bêta, en partie selon vos demandes.",
    itemIcon: Calendar,
    itemIconClass: 'text-slate-400',
    items: [
      'Reporting mensuel automatique',
      'Gestion des stocks & approvisionnement',
      'Location automatique de machines',
      'Multi-entités pour les franchises',
      'Cockpit marketing & acquisition',
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

export default function ProductStatus() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-y border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4"
          >
            État du produit
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight"
          >
            Transparence totale<br />sur ce qui marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            On est en bêta, on assume. Voici précisément ce qui est déjà là, ce qui se finalise, et ce qui viendra plus tard.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
          {columns.map((col, i) => {
            const ItemIcon = col.itemIcon
            return (
              <motion.div
                key={col.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative bg-white rounded-2xl border ${col.borderColor} p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow`}
              >
                {col.liveIndicator && (
                  <div className="absolute top-5 right-5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">En cours</span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    className={`w-10 h-10 rounded-xl ${col.bg} flex items-center justify-center shrink-0 relative`}
                    animate={col.iconSpin ? { rotate: 360 } : {}}
                    transition={col.iconSpin ? { duration: 6, repeat: Infinity, ease: 'linear' } : {}}
                  >
                    <col.icon size={18} className={col.iconColor} />
                  </motion.div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 ${col.badgeBg}`}>{col.badge}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{col.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">{col.desc}</p>

                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  {col.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={itemVariants}
                      className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug"
                    >
                      <ItemIcon size={14} className={`${col.itemIconClass} mt-0.5 shrink-0`} strokeWidth={2.5} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className={`mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] uppercase tracking-wider font-bold ${col.iconColor}`}>
                  <span>{col.items.length} fonctionnalités</span>
                  {col.liveIndicator && (
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                      className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-slate-500 mt-10"
        >
          Les membres fondateurs influencent directement l'ordre de la feuille de route.
        </motion.p>
      </div>
    </section>
  )
}
