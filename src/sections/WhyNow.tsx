import { motion } from 'framer-motion'
import { Clock, TrendingUp, Shield, Headphones } from 'lucide-react'
import { FOUNDER_SPOTS } from '../config'

const reasons = [
  {
    icon: Clock,
    title: `Le tarif fondateur ferme à ${FOUNDER_SPOTS.total} entreprises`,
    desc: "Après ça, on bascule au prix public. Les fondateurs gardent leur tarif d'aujourd'hui — pour toujours, même quand on monte en gamme.",
  },
  {
    icon: TrendingUp,
    title: 'Tes besoins deviennent nos prochaines fonctionnalités',
    desc: "Un appel direct chaque mois avec le fondateur. Tu remontes tes galères, elles passent en haut de la pile. Tu co-construis le produit.",
  },
  {
    icon: Shield,
    title: 'Prends de l\'avance dans ta ville',
    desc: "Les outils généralistes ne sont pas faits pour le nettoyage. Sois le premier de ton département à avoir un vrai logiciel métier.",
  },
  {
    icon: Headphones,
    title: 'Un humain au bout du fil',
    desc: "Pas de chatbot, pas de numéro vert. Le fondateur connaît ton dossier et décroche quand tu appelles.",
  },
]

export default function WhyNow() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Pourquoi maintenant</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Une fenêtre. {FOUNDER_SPOTS.total} places.<br />Puis on ferme.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all border border-transparent hover:border-slate-100"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <r.icon size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
