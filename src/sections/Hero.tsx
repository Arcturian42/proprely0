import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-24 animated-gradient mesh-grid noise">
      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,194,224,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,79,175,0.2) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,194,224,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-sm mb-7 badge-glow"
          style={{
            background: 'rgba(0,194,224,0.12)',
            border: '1px solid rgba(0,194,224,0.3)',
            color: '#00C2E0',
          }}
        >
          <Sparkles size={12} />
          Vos plannings sur Excel, vos agents sur WhatsApp ?
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[28px] sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 sm:mb-5 tracking-tight"
        >
          <span className="text-white">L'Operating System des</span>
          <br />
          <span className="gradient-text-white">sociétés de nettoyage</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-lg text-white/50 mb-8 sm:mb-10 max-w-xl mx-auto"
        >
          Un seul logiciel pour planifier, intervenir, facturer et piloter votre entreprise.
        </motion.p>

        {/* Price box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 rounded-2xl px-5 sm:px-8 py-4 sm:py-5 mb-8 sm:mb-10"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="text-center sm:text-left">
            <div className="text-white/30 line-through text-xs sm:text-sm mb-0.5">129€/mois</div>
            <div className="text-3xl sm:text-4xl font-black text-white">49€<span className="text-lg font-semibold text-white/60">/mois</span></div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/10" />
          <div className="text-center sm:text-left">
            <div className="text-white/60 text-xs sm:text-sm font-medium mb-1">Tarif fondateur à vie</div>
            <div className="text-[#00C2E0] text-sm sm:text-base font-bold">960€ d'économie par an</div>
            <div className="text-[10px] sm:text-xs text-[#00C2E0]/70 mt-0.5">30 places uniquement</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-7"
        >
          <button
            onClick={() => scrollTo('formulaire')}
            className="flex items-center justify-center gap-2 rounded-full px-7 sm:px-9 py-3.5 font-black text-sm sm:text-base transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, #00C2E0 0%, #0099b8 100%)',
              color: '#0A1F40',
              boxShadow: '0 0 30px rgba(0,194,224,0.4), 0 8px 20px rgba(0,0,0,0.2)',
            }}
          >
            Candidater — membre fondateur
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollTo('probleme')}
            className="rounded-full px-7 sm:px-9 py-3.5 font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-white/10 w-full sm:w-auto"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Voir ce que Proprely change
          </button>
        </motion.div>

        {/* Micro-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-white/30"
        >
          {['30 places', 'Sans engagement', 'Essai gratuit'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle size={11} className="text-[#00C2E0]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
