import { motion } from 'framer-motion'
import { Award, CheckCircle, ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const advantages = [
  'Tarif fondateur conservé à vie (abonnement actif)',
  'Customer service sur mesure avec interlocuteur dédié',
  'Onboarding personnalisé — un membre de l\'équipe vous accompagne',
  'Accès direct à l\'équipe produit par téléphone',
  'Influence sur la roadmap et les fonctionnalités',
  'Construction du logiciel selon vos besoins terrain réels',
]

export default function FounderOffer() {
  return (
    <section id="fondateur" className="bg-[#0F2D5E] py-14 sm:py-20 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#00C2E0] opacity-[0.05] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#00C2E0] opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0] text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-4">
            <Award size={14} />
            Offre exclusive — 30 places
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">
            Devenez l'une des 30 entreprises fondatrices Proprely
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto">
            Nous sélectionnons 30 sociétés de nettoyage pour construire Proprely avec nous. Vous nous faites part de vos besoins terrain réels. En échange, vous bénéficiez d'un tarif privilégié à vie et d'un accompagnement dédié.
          </p>
        </div>

        {/* Price box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center">
            <div className="py-3">
              <div className="text-white/40 text-xs mb-1">Prix public futur</div>
              <div className="text-2xl sm:text-3xl font-bold text-white/50 line-through">129€/mois</div>
            </div>
            <div className="bg-[#00C2E0] rounded-2xl py-4 px-4 shadow-xl">
              <div className="text-[#0F2D5E] text-xs font-bold mb-1">Tarif fondateur à vie</div>
              <div className="text-3xl sm:text-4xl font-bold text-[#0F2D5E]">49€<span className="text-lg">/mois</span></div>
              <div className="text-[#0F2D5E] text-xs mt-1 font-medium">30 places uniquement</div>
            </div>
            <div className="py-3">
              <div className="text-white/40 text-xs mb-1">Vous économisez</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#00C2E0]">960€/an</div>
              <div className="text-white/50 text-xs mt-1">2 880€ sur 3 ans</div>
            </div>
          </div>
        </motion.div>

        {/* Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="flex items-start gap-2"
            >
              <CheckCircle size={15} className="text-[#00C2E0] mt-0.5 shrink-0" />
              <span className="text-xs sm:text-sm text-white/80">{adv}</span>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-white/5 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 text-center">
          <p className="text-[10px] sm:text-xs text-white/50">
            Vous ne devenez pas actionnaire. Vous restez utilisateur avec un tarif privilégié et un accompagnement premium. C'est tout.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="bg-[#00C2E0] text-[#0F2D5E] rounded-full px-8 sm:px-10 py-3.5 font-bold flex items-center gap-2 mx-auto hover:scale-[1.02] transition-transform"
          >
            Candidater — 49€/mois à vie
            <ArrowRight size={16} />
          </button>
          <p className="text-[10px] sm:text-xs text-white/30 mt-3">Sans engagement · Période d'essai incluse · Annulation à tout moment</p>
        </div>
      </div>
    </section>
  )
}
