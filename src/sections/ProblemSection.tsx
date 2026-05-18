import { motion } from 'framer-motion'

const pains = [
  {
    quote: 'Le 22 du mois, je compte les heures de chaque agent depuis le 1er sur mon agenda. Ça me prend toute la soirée.',
    label: 'Le 22 du mois',
    role: 'Dirigeante · 8 agents',
  },
  {
    quote: "Mon meilleur agent, je l'ai trop usé. Dans quelques semaines, il va partir. J'aurais dû le ménager.",
    label: "L'agent qui craque",
    role: 'Dirigeant · 14 agents',
  },
  {
    quote: "Je sais que certains clients sont casse-couilles mais j'ai aucun moyen de le voir sur mes chiffres.",
    label: 'Le client sangsue',
    role: 'Dirigeant · 22 agents',
  },
  {
    quote: "C'est Excel et Google Agenda. Ça marche, mais t'as pas de visu. T'as pas un vrai truc.",
    label: 'Excel partout',
    role: 'Dirigeante · 6 agents',
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Le problème</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            4 outils. 6 heures perdues<br />par semaine. Un dimanche soir foutu.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Excel pour les heures. WhatsApp pour les remplacements. Google Agenda pour les rappels. Un logiciel de facturation pour les devis. Au final, c'est toi qui jongles.
          </p>
        </div>

        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Sur le terrain</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ce que tes confrères nous ont dit en face
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <p className="text-slate-700 text-base leading-relaxed mb-5 italic">
                <span className="text-3xl text-blue-200 leading-none mr-1">«</span>
                {p.quote}
                <span className="text-3xl text-blue-200 leading-none ml-1">»</span>
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {p.label}
                </span>
                <span className="text-xs text-slate-400">{p.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-slate-500 mt-10"
        >
          Rencontrés en région lyonnaise pendant la construction de Proprely.
        </motion.p>
      </div>
    </section>
  )
}
