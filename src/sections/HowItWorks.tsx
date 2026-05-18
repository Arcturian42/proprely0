import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    duration: '2 min',
    title: 'Vous candidatez',
    desc: "Un formulaire court. Nous revenons vers vous sous 24h pour caler un premier appel si votre profil correspond.",
  },
  {
    duration: '30 min',
    title: 'Démo et mise en route',
    desc: "Un appel avec le fondateur. Nous configurons votre entreprise ensemble : sites, agents, fréquences. C'est prêt à la fin de l'appel.",
  },
  {
    duration: 'Jour 1',
    title: 'Vous pilotez',
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
          className="max-w-3xl mb-14 sm:mb-20"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Comment ça marche</p>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
            Trois étapes.<br />
            <span className="text-slate-400">Opérationnel le jour même.</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl">
          <div className="absolute left-[14px] sm:left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-300 via-blue-200 to-transparent" aria-hidden="true" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative grid grid-cols-[28px,1fr] sm:grid-cols-[36px,1fr] gap-x-5 sm:gap-x-8 pb-10 sm:pb-14 last:pb-0"
            >
              <div className="relative">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center font-mono font-black text-blue-600 text-[10px] sm:text-xs tabular-nums z-10 relative">
                  0{i + 1}
                </div>
              </div>
              <div className="pt-0 sm:pt-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 tabular-nums">{step.duration}</span>
                  <span className="flex-1 border-t border-slate-200" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight tracking-tight">{step.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 max-w-3xl pl-[33px] sm:pl-[44px]">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
