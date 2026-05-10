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
    <section id="fondateur" className="py-16 sm:py-24 relative overflow-hidden animated-gradient mesh-grid noise">
      {/* Glow orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,194,224,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,79,175,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5 badge-glow"
            style={{ background: '#00C2E0', color: '#0A1F40' }}
          >
            <Award size={13} />
            Offre exclusive — 30 places
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight"
          >
            Devenez l'une des 30 entreprises<br className="hidden sm:block" /> fondatrices Proprely
          </motion.h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-2xl mx-auto">
            Nous sélectionnons 30 sociétés de nettoyage pour construire Proprely avec nous. En échange, vous bénéficiez d'un tarif privilégié à vie.
          </p>
        </div>

        {/* Price box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 sm:p-7 mb-7 sm:mb-9"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="py-2">
              <div className="text-white/30 text-xs mb-1.5">Prix public futur</div>
              <div className="text-2xl sm:text-3xl font-black text-white/30 line-through">129€<span className="text-base">/mois</span></div>
            </div>
            <div className="rounded-2xl py-5 px-4 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #00C2E0, #0099b8)', boxShadow: '0 0 40px rgba(0,194,224,0.4)' }}>
              <div className="text-[#0A1F40] text-xs font-bold mb-1.5 opacity-80">Tarif fondateur à vie</div>
              <div className="text-4xl sm:text-5xl font-black text-[#0A1F40]">49€</div>
              <div className="text-[#0A1F40] text-sm font-semibold opacity-70">/mois</div>
              <div className="text-[#0A1F40] text-[10px] font-bold mt-1.5 opacity-60">30 places uniquement</div>
            </div>
            <div className="py-2">
              <div className="text-white/30 text-xs mb-1.5">Vous économisez</div>
              <div className="text-2xl sm:text-3xl font-black text-[#00C2E0]">960€<span className="text-base font-semibold text-[#00C2E0]/70">/an</span></div>
              <div className="text-white/30 text-xs mt-1">2 880€ sur 3 ans</div>
            </div>
          </div>
        </motion.div>

        {/* Advantages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-7 sm:mb-9">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="flex items-start gap-2.5 rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <CheckCircle size={14} className="text-[#00C2E0] mt-0.5 shrink-0" />
              <span className="text-xs sm:text-sm text-white/75">{adv}</span>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl p-3 sm:p-4 mb-8 text-center"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-[10px] sm:text-xs text-white/35">
            Vous ne devenez pas actionnaire. Vous restez utilisateur avec un tarif privilégié et un accompagnement premium. C'est tout.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="inline-flex items-center gap-2 rounded-full px-8 sm:px-12 py-4 font-black text-sm sm:text-base transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00C2E0, #0099b8)',
              color: '#0A1F40',
              boxShadow: '0 0 40px rgba(0,194,224,0.45), 0 12px 30px rgba(0,0,0,0.2)',
            }}
          >
            Candidater — 49€/mois à vie
            <ArrowRight size={16} />
          </button>
          <p className="text-[10px] sm:text-xs text-white/25 mt-4">Sans engagement · Période d'essai incluse · Annulation à tout moment</p>
        </div>
      </div>
    </section>
  )
}
