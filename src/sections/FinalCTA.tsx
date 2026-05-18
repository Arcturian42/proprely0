import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots } from '../config'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function FinalCTA() {
  const remaining = remainingSpots()

  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-sky-400 opacity-10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
          {remaining} places restantes sur {FOUNDER_SPOTS.total}
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
          Prêt à arrêter de compter<br />tes heures à la main ?
        </h2>
        <p className="text-blue-100 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Réserve ta place dans la bêta. Sélection sur dossier. Ton tarif d'aujourd'hui, conservé pour toujours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group bg-white text-blue-700 rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-50 transition-all shadow-2xl flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Candidater
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="border border-white/30 text-white rounded-xl px-7 py-4 font-semibold text-base hover:bg-white/10 transition-colors"
          >
            Lire la FAQ
          </button>
        </div>
        <p className="text-xs text-blue-200 mt-6">Pas de carte bancaire · 20 min avec le fondateur · Réponse sous 24h</p>
      </motion.div>
    </section>
  )
}
