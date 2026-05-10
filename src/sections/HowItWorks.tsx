import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const steps = [
  {
    n: '01',
    title: 'Vous configurez en 10 minutes',
    desc: 'Vos sites clients, vos agents, vos fréquences d\'intervention. Pas de formation, pas de setup complexe.',
  },
  {
    n: '02',
    title: 'Vos agents travaillent simplement',
    desc: 'Ils voient leur planning sur téléphone, scannent le QR code sur site, signent électroniquement. Fini le papier.',
  },
  {
    n: '03',
    title: 'Vous pilotez avec des chiffres réels',
    desc: 'Tableau de bord, CA en temps réel, heures facturées, taux de réalisation. Vous décidez avec clarté.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.08)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            Comment ça marche
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Trois étapes. Pas de formation.<br className="hidden sm:block" /> Pas de setup de trois mois.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden sm:block absolute top-7 left-full w-full h-px z-0"
                  style={{ background: 'linear-gradient(90deg, rgba(0,194,224,0.3), transparent)', width: '80%', marginLeft: '10%' }} />
              )}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 font-black text-lg"
                  style={{
                    background: 'linear-gradient(135deg, #0F2D5E, #1A4FAF)',
                    color: '#00C2E0',
                    boxShadow: '0 8px 20px rgba(15,45,94,0.25)',
                  }}
                >
                  {step.n}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#0F2D5E] mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A6B7D]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="inline-flex items-center gap-2 rounded-full px-7 sm:px-9 py-3.5 font-bold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #1A4FAF, #0F2D5E)',
              color: 'white',
              boxShadow: '0 8px 24px rgba(15,45,94,0.3)',
            }}
          >
            Rejoindre les 30 fondateurs
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
