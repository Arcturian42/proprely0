import { motion } from 'framer-motion'

const pains = [
  {
    quote: '"Le 22 du mois, je compte les heures de chaque agent depuis le 1er sur mon agenda. Ça me prend toute la soirée."',
    label: 'Calcul des heures',
  },
  {
    quote: '"Mon meilleur agent, je l\'ai trop usé. Dans quelques semaines, il va partir. J\'aurais dû le ménager."',
    label: 'Surmenage des équipes',
  },
  {
    quote: '"Je sais que certains clients sont casse-couilles mais j\'ai aucun moyen de le voir sur mes chiffres."',
    label: 'Rentabilité client',
  },
  {
    quote: '"C\'est Excel et Google Agenda. Ça marche, mais t\'as pas de visu. T\'as pas un vrai truc."',
    label: 'Outils inadaptés',
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">Ce que vos confrères nous ont dit</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            On a rencontré des dirigeants.<br />Voilà ce qu'ils vivent.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-100"
            >
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 italic">{p.quote}</p>
              <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                {p.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          Proprely est construit pour résoudre exactement ces problèmes. Rien de plus, rien de moins.
        </motion.p>
      </div>
    </section>
  )
}
