import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const modules = [
  {
    label: 'Opérations',
    title: 'Opérations & Planning',
    tagline: "Vos agents savent où aller, quand, avec quels outils.",
    benefits: [
      { before: "Coups de fil et messages WhatsApp pour caler le planning", after: "Vos agents consultent leur planning sur leur téléphone, sans appel" },
      { before: "Heures comptées le 22 du mois sur l'agenda papier", after: "Compteur d'heures automatique par agent et par site, prêt pour la paie" },
      { before: "Photos avant/après dispersées dans 12 conversations WhatsApp", after: "Photos, signatures et preuves de passage attachées à chaque mission" },
    ],
  },
  {
    label: 'Équipes',
    title: 'Équipes & Spécialités',
    tagline: 'Évitez le surmenage. Gardez vos meilleurs agents.',
    benefits: [
      { before: "Vous découvrez le burn-out d'un agent au moment où il démissionne", after: "Alerte automatique quand un agent dépasse son seuil de charge" },
      { before: "Affectations à l'instinct selon qui est joignable", after: "Affectation 1-clic selon spécialité (vitrerie, moquette, décapage) et disponibilité" },
      { before: "Remplacements gérés dans l'urgence par téléphone", after: "Remplacements centralisés, historique conservé, traçabilité complète" },
    ],
  },
  {
    label: 'Commercial',
    title: 'Commercial & Facturation',
    tagline: "Transformez vos demandes en clients. Sans logiciel séparé.",
    benefits: [
      { before: "Devis tapés sur Word, 15-20 minutes par client", after: "Devis professionnels générés en 2 minutes, avec votre logo" },
      { before: "Relances oubliées, prospects perdus dans les emails", after: "Suivi commercial avec alertes de relance automatiques" },
      { before: "Impossible de savoir quel client est vraiment rentable", after: "Marge par client, identification des prestations déficitaires" },
    ],
  },
  {
    label: 'Pilotage',
    title: 'Pilotage & Rentabilité',
    tagline: 'Décidez avec des chiffres, pas au feeling.',
    benefits: [
      { before: "Vous découvrez la rentabilité du mois 45 jours après la clôture", after: "CA, heures et marge visibles en temps réel" },
      { before: "Comptable et logiciel de facturation déconnectés", after: "Connexion native Pennylane / Conto, données synchronisées" },
      { before: "Décisions prises à l'instinct, sans visibilité", after: "Rapport mensuel automatique par site et par client" },
    ],
  },
]

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function FourSpaces() {
  return (
    <section id="features" className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Avant / Après</p>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[0.95] mb-6">
            Ce qui change concrètement<br />
            <span className="text-slate-400">dans votre quotidien.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Quatre espaces métier, trois preuves chacun. Lisez la colonne de gauche, lisez celle de droite, vous savez ce que Proprely change.
          </p>
        </motion.div>

        <div className="border-t-2 border-slate-900/10">
          {modules.map((m, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-x-12 gap-y-6 py-12 sm:py-16 border-b border-slate-200/70"
            >
              <header className="lg:pt-2">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-600 tabular-nums">
                  0{i + 1} / 04 · {m.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight tracking-tight mt-2 mb-3">
                  {m.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{m.tagline}</p>
              </header>

              <div>
                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 mb-5">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-700">Aujourd'hui</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-blue-700">Avec Proprely</div>
                </div>

                {m.benefits.map((b, j) => (
                  <div key={j} className="grid grid-cols-2 gap-x-4 sm:gap-x-8 py-4 border-t border-slate-100 first:border-t-0">
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-through decoration-red-300/60 decoration-1">
                      {b.before}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                      {b.after}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed">
            <strong className="text-slate-900 font-bold">12 transformations</strong> que vous mesurez dès la première semaine d'utilisation.
          </p>
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 overflow-hidden shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta</span>
            <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
