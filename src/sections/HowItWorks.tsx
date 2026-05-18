import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    n: '1',
    title: 'Vous candidatez (2 min)',
    desc: "Un court formulaire. On vous répond sous 24h pour vérifier que Proprely correspond à votre besoin.",
  },
  {
    n: '2',
    title: 'Démo et configuration (30 min)',
    desc: "Appel avec le fondateur. On configure votre entreprise ensemble : sites, agents, fréquences. C'est prêt à la fin de l'appel.",
  },
  {
    n: '3',
    title: 'Vous pilotez dès la semaine 1',
    desc: "Vos agents voient leur planning. Vos heures se comptent toutes seules. Vous gagnez 3h dès la première semaine.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Comment ça marche</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Trois étapes. Pas de formation.<br />Pas de setup de trois mois.
          </h2>
        </div>

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
            className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            Candidater à la bêta privée
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
