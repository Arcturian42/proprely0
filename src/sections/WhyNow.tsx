import { motion } from 'framer-motion'
import { FOUNDER_SPOTS } from '../config'

const reasons = [
  {
    title: `Le tarif fondateur ferme à ${FOUNDER_SPOTS.total} entreprises`,
    desc: "Après ça, on bascule au prix public. Les fondateurs gardent leur tarif d'aujourd'hui, pour toujours, même quand on monte en gamme.",
  },
  {
    title: 'Tes besoins deviennent nos prochaines fonctionnalités',
    desc: "Un appel direct chaque mois avec le fondateur. Tu remontes tes galères, elles passent en haut de la pile. Tu co-construis le produit.",
  },
  {
    title: "Prends de l'avance dans ta ville",
    desc: "Les outils généralistes ne sont pas faits pour le nettoyage. Sois le premier de ton département à avoir un vrai logiciel métier.",
  },
  {
    title: 'Un humain au bout du fil',
    desc: "Pas de chatbot, pas de numéro vert. Le fondateur connaît ton dossier et décroche quand tu appelles.",
  },
]

export default function WhyNow() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Pourquoi maintenant</p>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
            Une fenêtre.<br />
            <span className="tabular-nums">{FOUNDER_SPOTS.total} places.</span><br />
            <span className="text-slate-400">Puis on ferme.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-12 sm:gap-y-16">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-2xl font-mono text-blue-600 tabular-nums font-black">
                  0{i + 1}
                </span>
                <span className="flex-1 border-t border-slate-200" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug tracking-tight">{r.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
