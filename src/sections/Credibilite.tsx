import { motion } from 'framer-motion'
import { Sparkles, Check, Handshake, Headphones } from 'lucide-react'

const items = [
  {
    icon: Sparkles,
    title: "Conçu pour le nettoyage",
    desc: "Pas un CRM générique adapté. Un outil pensé dès l'origine pour la propreté B2B : sites multiples par client, spécialités agents, remplacements, preuve de passage.",
  },
  {
    icon: Check,
    title: 'Zéro fonction inutile',
    desc: "Chaque fonctionnalité répond à un problème concret du secteur. Pas de jargon SaaS, pas de superflu, pas de modules pour faire joli dans une plaquette.",
  },
  {
    icon: Handshake,
    title: 'Co-construit avec les fondateurs',
    desc: "Vos besoins terrain orientent ce que nous développons en priorité. Vous faites avancer le produit avec nous pendant toute la bêta.",
  },
  {
    icon: Headphones,
    title: 'Un interlocuteur, un dossier',
    desc: "Pas un ticket numéroté. Pas une file d'attente. Une personne qui sait qui vous êtes et ce que vous faites au quotidien.",
  },
]

export default function Credibilite() {
  return (
    <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Notre méthode</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Conçu pour le nettoyage.<br />Pas une copie générique.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Proprely n'est pas un logiciel généraliste adapté au nettoyage. C'est un outil pensé spécifiquement pour les entreprises de propreté B2B et leurs réalités opérationnelles.
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
              className="text-center bg-slate-50 rounded-2xl p-5 sm:p-6"
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

