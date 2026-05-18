import { motion } from 'framer-motion'
import { Clock, TrendingUp, Shield, Headphones } from 'lucide-react'

const reasons = [
  {
    icon: Clock,
    title: 'Le tarif fondateur ferme à 30 entreprises',
    desc: "Une seule fois. Une fois la bêta lancée, le tarif passera au prix public. Les fondateurs gardent leur tarif privilégié à vie.",
  },
  {
    icon: TrendingUp,
    title: 'Les fondateurs influencent la roadmap',
    desc: "Canal direct avec l'équipe produit. Vos besoins terrain deviennent les prochaines fonctionnalités. Vous co-construisez Proprely.",
  },
  {
    icon: Shield,
    title: 'Soyez le premier de votre zone',
    desc: "Les outils généralistes ne sont pas pensés pour le nettoyage. Adoptez le seul logiciel métier avant vos concurrents.",
  },
  {
    icon: Headphones,
    title: 'Accompagnement humain dédié',
    desc: "Un interlocuteur qui connaît votre entreprise. Pas un chatbot, pas un numéro vert. Le fondateur répond au téléphone.",
  },
]

export default function WhyNow() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Pourquoi maintenant</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            La bêta ne s'ouvre qu'une fois
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
