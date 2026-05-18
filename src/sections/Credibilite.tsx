import { motion } from 'framer-motion'
import { Users, Check, Handshake, Headphones } from 'lucide-react'

const items = [
  {
    icon: Users,
    title: "6 mois d'immersion terrain",
    desc: "Plannings matinaux, tournées avec agents, soirées de fin de mois passées à compter les heures avec les dirigeants.",
  },
  {
    icon: Check,
    title: 'Zéro fonction inutile',
    desc: "Chaque feature correspond à une douleur identifiée sur le terrain. Pas de jargon SaaS, pas de complexité superflue.",
  },
  {
    icon: Handshake,
    title: 'Construit avec vous',
    desc: "Les fondateurs participent activement à la définition des prochaines fonctionnalités. Vous orientez la roadmap.",
  },
  {
    icon: Headphones,
    title: 'Accompagnement humain',
    desc: "Un interlocuteur par entreprise fondatrice. Pas un ticket numéroté. Un humain qui connaît votre dossier.",
  },
]

export default function Credibilite() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Notre méthode</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Construit sur le terrain.<br />Pas dans une tour en verre.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Proprely n'est pas un logiciel générique adapté au nettoyage. C'est un outil né de 6 mois passés avec des dirigeants en région lyonnaise.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <item.icon size={20} className="text-blue-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
