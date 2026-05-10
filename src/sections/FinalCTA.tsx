import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function FinalCTA() {
  return (
    <section className="bg-[#0F2D5E] py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6"
      >
        <h2 className="text-xl sm:text-3xl font-bold text-white">
          Votre entreprise de nettoyage mérite mieux qu'Excel et WhatsApp
        </h2>
        <p className="text-xs sm:text-sm text-white/60">
          30 places seulement. Tarif fondateur à vie : 49 €/mois au lieu de 129 €/mois.
        </p>
        <button
          onClick={() => scrollTo('formulaire')}
          className="bg-[#00C2E0] text-[#0F2D5E] rounded-full px-8 sm:px-10 py-3.5 font-bold flex items-center gap-2 mx-auto w-full sm:w-auto justify-center hover:scale-[1.02] transition-transform"
        >
          Candidater maintenant
          <ArrowRight size={16} />
        </button>
        <p className="text-[10px] sm:text-xs text-white/30">Sans engagement · Réponse sous 48h · Essai gratuit</p>
      </motion.div>
    </section>
  )
}
