import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    n: '1',
    title: 'Vous configurez en 10 minutes',
    desc: 'Vos sites clients, vos agents, vos fréquences d\'intervention. Pas de formation, pas de setup complexe.',
  },
  {
    n: '2',
    title: 'Vos agents travaillent simplement',
    desc: 'Ils voient leur planning sur téléphone, scannent le QR code sur site, signent électroniquement. Fini le papier.',
  },
  {
    n: '3',
    title: 'Vous pilotez avec des chiffres réels',
    desc: 'Tableau de bord, CA en temps réel, heures facturées, taux de réalisation. Vous décidez avec clarté.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Comment ça marche
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E]">
            Trois étapes. Pas de formation. Pas de setup de trois mois.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#0F2D5E] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {step.n}
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#0F2D5E] mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6B7D]">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="bg-[#1A4FAF] text-white rounded-full px-6 sm:px-8 py-3 font-bold flex items-center gap-2 mx-auto hover:scale-[1.02] transition-transform"
          >
            Rejoindre les 30 fondateurs
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
