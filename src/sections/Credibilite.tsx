import { motion } from 'framer-motion'

const items = [
  {
    label: 'Spécialisation',
    title: 'Conçu pour le nettoyage, pas adapté.',
    desc: "Pas un CRM générique sur lequel on aurait collé un module nettoyage. Un outil pensé dès l'origine pour la propreté B2B : sites multiples par client, spécialités agents, remplacements, preuve de passage.",
  },
  {
    label: 'Pertinence',
    title: 'Zéro fonction inutile.',
    desc: "Chaque fonctionnalité répond à un problème concret du secteur. Pas de jargon SaaS, pas de superflu, pas de modules pour faire joli dans une plaquette commerciale.",
  },
  {
    label: 'Co-construction',
    title: 'Construit avec ses fondateurs.',
    desc: "Vos besoins terrain orientent ce que nous développons en priorité. Vous faites avancer le produit avec nous pendant toute la bêta, pas après.",
  },
  {
    label: 'Support',
    title: 'Un interlocuteur, votre dossier.',
    desc: "Pas un ticket numéroté. Pas une file d'attente anonyme. Une personne qui sait qui vous êtes, ce que vous faites au quotidien, et qui vous répond.",
  },
]

export default function Credibilite() {
  return (
    <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Notre méthode</p>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6">
            Conçu pour le nettoyage.<br />
            <span className="text-slate-400">Pas une copie générique.</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
            Proprely n'est pas un logiciel généraliste adapté au nettoyage. C'est un outil pensé spécifiquement pour les entreprises de propreté B2B et leurs réalités opérationnelles.
          </p>
        </motion.div>

        <div className="border-t-2 border-slate-900/10">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-y-3 md:gap-x-12 py-8 sm:py-10 border-b border-slate-200/70"
            >
              <div className="md:pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
                  0{i + 1} / {String(items.length).padStart(2, '0')}
                </span>
                <p className="text-sm font-semibold text-slate-500 mt-1 tracking-tight">{item.label}</p>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
