import { motion } from 'framer-motion'

const pains = [
  { title: 'Excel partout', desc: "Les heures, les devis, les plannings. Sept feuilles, trois versions, et personne ne sait laquelle est la bonne.", impact: "3 à 4h perdues par mois en saisie manuelle." },
  { title: 'WhatsApp pour gérer les remplacements', desc: "Les messages se perdent, les agents ne se présentent pas, et c'est vous qui appelez à 6h du matin pour rattraper.", impact: "Aucune traçabilité quand un client conteste." },
  { title: 'Plannings éparpillés', desc: "Un agenda papier, un Google Agenda, un fichier client. Aucune vue d'ensemble sur ce qui tourne réellement.", impact: "Impossible de répondre à « qui peut prendre cette mission demain ? »." },
  { title: 'Devis tapés à la main', desc: "20 minutes pour générer un devis sur Word. Le prospect attend, et finit par appeler le concurrent qui a répondu en 10 minutes.", impact: "Conversion commerciale qui s'effondre par lenteur." },
  { title: 'Agents en surcharge invisible', desc: "Vous découvrez le burn-out d'un agent quand il démissionne. Aucune alerte, aucun suivi de la charge horaire.", impact: "Coût d'un départ : 3 500 à 5 000€." },
  { title: 'Clients et sites mélangés', desc: "Un client, trois sites, douze prestations. Tout est dans votre tête. Vos collaborateurs n'ont aucun accès à l'historique.", impact: "Vous êtes le seul à pouvoir répondre." },
  { title: 'Documents dispersés', desc: "Contrats sur le bureau, fiches sécurité dans la boîte mail, attestations chez le comptable. Aucun classement, aucune recherche.", impact: "Audit URSSAF, une journée à chercher." },
]

const quotes = [
  { quote: 'Le 22 du mois, je compte les heures de chaque agent depuis le 1er sur mon agenda. Ça me prend toute la soirée.', role: 'Dirigeante, 8 agents' },
  { quote: "Mon meilleur agent, je l'ai trop usé. Dans quelques semaines, il va partir. J'aurais dû le ménager.", role: 'Dirigeant, 14 agents' },
  { quote: "Je sais que certains clients sont peu rentables mais j'ai aucun moyen de le voir sur mes chiffres.", role: 'Dirigeant, 22 agents' },
  { quote: "C'est Excel et Google Agenda. Ça marche, mais on n'a pas de visibilité. On n'a pas un vrai outil.", role: 'Dirigeante, 6 agents' },
]

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <p className="text-sm font-semibold text-red-600 uppercase tracking-widest mb-4">Le problème</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05]">
            Votre gestion est dispersée<br />entre 7 outils qui ne se parlent pas.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Excel, WhatsApp, Google Agenda, Word, un logiciel de facturation, des emails, des classeurs papier. Chaque outil fait une partie du travail. Personne ne fait l'ensemble. <strong className="text-slate-900">Vous perdez 6 à 10 heures par semaine</strong> à recoller les morceaux.
          </p>
        </motion.div>

        <ol className="max-w-4xl">
          {pains.map((p, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: 0.04 * i }}
              className="grid grid-cols-[auto,1fr] gap-x-5 sm:gap-x-8 gap-y-2 py-7 sm:py-9 border-t border-slate-200/70 first:border-t-2 first:border-slate-900/15"
            >
              <span className="text-3xl sm:text-5xl font-black text-slate-200 leading-none tabular-nums tracking-tight pt-1">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">{p.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-2.5">{p.desc}</p>
                <p className="text-xs sm:text-sm text-red-700 font-semibold tracking-wide">{p.impact}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mt-20 sm:mt-24 mb-10"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Le constat partagé</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            Les phrases qu'on entend partout dans le secteur
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-10 sm:gap-x-14 gap-y-10">
          {quotes.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="relative pl-5 sm:pl-7"
            >
              <span aria-hidden="true" className="absolute left-0 top-0 text-5xl sm:text-6xl leading-none text-slate-300 font-serif select-none">"</span>
              <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed italic mb-3">
                {q.quote}
              </blockquote>
              <figcaption className="text-xs text-slate-500 font-medium not-italic tracking-wide">
                {q.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-slate-500 mt-12"
        >
          Situations typiques rencontrées par les sociétés de nettoyage B2B en France.
        </motion.p>
      </div>
    </section>
  )
}
