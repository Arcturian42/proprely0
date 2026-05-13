import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  return (
    <section className="bg-white pt-16 sm:pt-24 pb-16 sm:pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-blue-50 text-[#1A4FAF] rounded-full px-3.5 py-1 text-xs font-semibold mb-8 border border-blue-100"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#1A4FAF] animate-pulse" />
          Disponible maintenant — Démarrez en 10 minutes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight mb-6"
        >
          Le logiciel des{' '}
          <span className="text-[#1A4FAF]">sociétés de nettoyage</span>{' '}
          qui veulent grandir
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Planning, interventions, équipes, CRM, devis, facturation et pilotage — dans un seul outil conçu pour votre métier.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
        >
          <button
            onClick={() => scrollTo('pricing')}
            className="bg-[#1A4FAF] text-white rounded-lg px-7 py-3.5 font-bold text-sm sm:text-base hover:bg-[#0F2D5E] transition-colors flex items-center justify-center gap-2"
          >
            Voir les tarifs
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="border border-gray-200 text-gray-700 rounded-lg px-7 py-3.5 font-semibold text-sm sm:text-base hover:bg-gray-50 transition-colors"
          >
            Découvrir les fonctionnalités
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400"
        >
          {['Sans engagement', 'Essai gratuit 14 jours', 'Support inclus', 'Données hébergées en France'].map(item => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-[#1A4FAF]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
