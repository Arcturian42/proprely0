import { motion } from 'framer-motion'
import { Clock, TrendingUp, Shield, Headphones } from 'lucide-react'

const reasons = [
  {
    icon: Clock,
    title: 'Le tarif fondateur disparaît après 30 entreprises',
    desc: 'À 49€/mois au lieu de 129€, c\'est 960€ d\'économie par an. Sur 3 ans = 2 880€. Ce tarif ne sera jamais proposé à nouveau.',
  },
  {
    icon: TrendingUp,
    title: 'Les fondateurs ont plus d\'influence sur le produit',
    desc: 'Les 30 premiers utilisateurs ont un canal direct avec l\'équipe produit. Vos besoins seront prioritaires.',
  },
  {
    icon: Shield,
    title: 'Professionnalisez avant vos concurrents',
    desc: 'Les outils généralistes ne sont pas pensés pour le nettoyage. Soyez le premier de votre zone à adopter un logiciel métier.',
  },
  {
    icon: Headphones,
    title: 'Accompagnement dédié, pas un chatbot',
    desc: 'Vous avez un interlocuteur qui connaît votre entreprise. Pas un chatbot, pas un numéro vert. Un humain qui répond au téléphone.',
  },
]

export default function WhyNow() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Pourquoi maintenant ?
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E]">
            Chaque jour sans Proprely, vous perdez du temps et de l'argent
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0F2D5E] text-white flex items-center justify-center shrink-0 mt-0.5">
                <r.icon size={17} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[#0F2D5E] mb-1">{r.title}</h3>
                <p className="text-xs sm:text-sm text-[#5A6B7D]">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
