import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    n: '1',
    title: 'Vous candidatez (2 min)',
    desc: "Un formulaire court. Nous revenons vers vous sous 24h pour caler un premier appel si votre profil correspond.",
  },
  {
    n: '2',
    title: 'Démo et mise en route (30 min)',
    desc: "Un appel avec le fondateur. Nous configurons votre entreprise ensemble : sites, agents, fréquences. C'est prêt à la fin de l'appel.",
  },
  {
    n: '3',
    title: 'Vous pilotez dès la semaine 1',
    desc: "Vos agents consultent leur planning, vos heures se comptent automatiquement, vos devis sortent en 2 minutes. Six heures récupérées chaque semaine.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14 sm:mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Comment ça marche</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Trois étapes. Pas de formation.<br />Opérationnel le jour même.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 mb-12 relative">
          <div className="hidden sm:block absolute top-7 left-[16.66%] right-[16.66%] h-px border-t-2 border-dashed border-blue-200" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="text-center relative"
            >
              <div className="relative inline-flex w-14 h-14 rounded-full bg-white border-2 border-blue-600 text-blue-600 font-black text-xl items-center justify-center mb-5 shadow-sm z-10">
                {step.n}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta gratuite</span>
            <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
