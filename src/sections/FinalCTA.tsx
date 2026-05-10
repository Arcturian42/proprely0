import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function FinalCTA() {
  return (
    <section className="py-14 sm:py-24 relative overflow-hidden animated-gradient mesh-grid noise">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0,194,224,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
          Votre entreprise de nettoyage<br /> mérite mieux qu'Excel et WhatsApp
        </h2>
        <p className="text-xs sm:text-sm text-white/40 mb-8">
          30 places seulement. Tarif fondateur à vie : <strong className="text-white/70">49 €/mois</strong> au lieu de 129 €/mois.
        </p>
        <button
          onClick={() => scrollTo('formulaire')}
          className="inline-flex items-center justify-center gap-2 rounded-full px-9 sm:px-12 py-4 font-black text-sm sm:text-base transition-all duration-200 hover:scale-105 w-full sm:w-auto"
          style={{
            background: 'linear-gradient(135deg, #00C2E0, #0099b8)',
            color: '#0A1F40',
            boxShadow: '0 0 40px rgba(0,194,224,0.45), 0 12px 30px rgba(0,0,0,0.2)',
          }}
        >
          Candidater maintenant
          <ArrowRight size={16} />
        </button>
        <p className="text-[10px] sm:text-xs text-white/25 mt-4">Sans engagement · Réponse sous 48h · Essai gratuit</p>
      </motion.div>
    </section>
  )
}
