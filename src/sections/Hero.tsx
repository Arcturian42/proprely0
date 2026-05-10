import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="bg-[#0F2D5E] pt-10 sm:pt-12 pb-14 sm:pb-16 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-white/15 text-white/90 rounded-full border border-white/20 px-4 py-1.5 text-[11px] sm:text-sm mb-6"
        >
          Vos plannings sur Excel, vos agents sur WhatsApp ?
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[26px] sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-3 sm:mb-4"
        >
          L'Operating System des sociétés de nettoyage
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-lg text-white/70 mt-2 sm:mt-3 mb-6 sm:mb-8"
        >
          Un seul logiciel pour planifier, intervenir, facturer et piloter votre entreprise.
        </motion.p>

        {/* Price box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/10 backdrop-blur rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 border border-white/10 inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 mb-6 sm:mb-8"
        >
          <div className="text-center sm:text-left">
            <span className="text-white/40 line-through text-sm sm:text-base">129€/mois</span>
            <div className="text-2xl sm:text-3xl font-bold text-white">49€/mois</div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/20" />
          <div className="text-center sm:text-left">
            <div className="text-white/80 text-xs sm:text-sm font-medium">Tarif fondateur à vie</div>
            <div className="text-[#00C2E0] text-xs sm:text-sm font-semibold">960€ d'économie par an</div>
            <div className="text-[#00C2E0] text-xs font-bold mt-0.5">30 places uniquement</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center mb-6"
        >
          <button
            onClick={() => scrollTo('formulaire')}
            className="bg-[#00C2E0] text-[#0F2D5E] rounded-full px-6 sm:px-8 font-bold h-11 sm:h-12 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform w-full sm:w-auto"
          >
            Candidater — membre fondateur
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollTo('probleme')}
            className="border border-white/25 text-white hover:bg-white/10 rounded-full h-11 sm:h-12 px-6 sm:px-8 font-medium transition-colors w-full sm:w-auto"
          >
            Voir ce que Proprely change
          </button>
        </motion.div>

        {/* Micro-copy */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 text-[10px] sm:text-xs text-white/40">
          {['30 places', 'Sans engagement', 'Essai gratuit'].map((item) => (
            <span key={item} className="flex items-center gap-1">
              <CheckCircle size={10} className="text-[#00C2E0]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
