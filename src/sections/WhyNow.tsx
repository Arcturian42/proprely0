import { motion } from 'framer-motion'
import { Clock, TrendingUp, Shield, Headphones } from 'lucide-react'

const reasons = [
  {
    icon: Clock,
    gradient: 'linear-gradient(135deg, #00C2E0, #0099b8)',
    glow: 'rgba(0,194,224,0.2)',
    title: 'Le tarif fondateur disparaît après 30 entreprises',
    desc: 'À 49€/mois au lieu de 129€, c\'est 960€ d\'économie par an. Sur 3 ans = 2 880€. Ce tarif ne sera jamais proposé à nouveau.',
  },
  {
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #1A4FAF, #0F2D5E)',
    glow: 'rgba(26,79,175,0.2)',
    title: 'Les fondateurs ont plus d\'influence sur le produit',
    desc: 'Les 30 premiers utilisateurs ont un canal direct avec l\'équipe produit. Vos besoins seront prioritaires.',
  },
  {
    icon: Shield,
    gradient: 'linear-gradient(135deg, #0F2D5E, #0a1f40)',
    glow: 'rgba(15,45,94,0.25)',
    title: 'Professionnalisez avant vos concurrents',
    desc: 'Les outils généralistes ne sont pas pensés pour le nettoyage. Soyez le premier de votre zone à adopter un logiciel métier.',
  },
  {
    icon: Headphones,
    gradient: 'linear-gradient(135deg, #00C2E0, #1A4FAF)',
    glow: 'rgba(0,194,224,0.18)',
    title: 'Accompagnement dédié, pas un chatbot',
    desc: 'Vous avez un interlocuteur qui connaît votre entreprise. Pas un chatbot, pas un numéro vert. Un humain qui répond au téléphone.',
  },
]

export default function WhyNow() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.08)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            Pourquoi maintenant ?
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Chaque jour sans Proprely,<br className="hidden sm:block" /> vous perdez du temps et de l'argent
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-2xl p-5 card-hover cursor-default"
              style={{ background: '#F8FAFC', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: r.gradient, boxShadow: `0 6px 16px ${r.glow}` }}>
                <r.icon size={17} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#0F2D5E] mb-1.5">{r.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A6B7D]">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
