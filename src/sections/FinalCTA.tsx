import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function FinalCTA() {
  return (
    <section className="bg-[#0F2D5E] py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Prêt à arrêter de compter vos heures à la main ?
        </h2>
        <p className="text-blue-200 text-base mb-8">
          Essai gratuit 14 jours. Aucune carte bancaire. Démarrez en 10 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => scrollTo('pricing')}
            className="bg-white text-[#1A4FAF] rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            Choisir mon plan
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollTo('formulaire')}
            className="border border-white/20 text-white rounded-xl px-7 py-3.5 font-semibold text-sm hover:bg-white/10 transition-colors"
          >
            Parler à l'équipe
          </button>
        </div>
      </motion.div>
    </section>
  )
}
