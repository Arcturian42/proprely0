import { motion } from 'framer-motion'
import { Globe, Megaphone, Users2, Target, ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const services = [
  {
    icon: Globe,
    title: 'Création de site web',
    price: 'À partir de 990€',
    desc: 'Un site professionnel conçu pour convertir des prospects en clients. Design soigné, SEO local, formulaire de devis intégré.',
    tags: ['Site vitrine', 'SEO local', 'Formulaire devis'],
  },
  {
    icon: Megaphone,
    title: 'Gestion des publicités',
    price: 'À partir de 490€/mois',
    desc: 'On gère vos campagnes Google Ads et Meta pour vous amener des demandes de devis qualifiées. Vous vous concentrez sur les interventions.',
    tags: ['Google Ads', 'Meta Ads', 'Rapport mensuel'],
  },
  {
    icon: Target,
    title: 'Tokens de prospection',
    price: 'À partir de 190€',
    desc: 'Achetez des crédits de prospection pour que notre IA identifie des prospects locaux qualifiés (gérants de bureaux, syndics, hôtels…) et prépare vos messages de prise de contact.',
    tags: ['Prospection IA', 'Ciblage local', 'Messages personnalisés'],
  },
  {
    icon: Users2,
    title: 'Construction de votre équipe commerciale',
    price: '3 000€ + 15% de commission',
    desc: 'On recrute, forme et déploie un setter et un closer dédiés à votre entreprise. Vous payez uniquement sur les résultats — 15% des contrats signés.',
    tags: ['Setter + Closer', 'Formation incluse', '100% à la performance'],
    highlight: true,
  },
]

export default function GrowthServices() {
  return (
    <section id="growth" className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">Services Growth</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Proprely gère votre opérationnel.<br />On peut aussi faire grandir votre CA.
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Des services optionnels pour les entreprises qui veulent accélérer leur croissance commerciale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl p-6 sm:p-7 border ${
                s.highlight
                  ? 'border-[#1A4FAF] bg-blue-50/50'
                  : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#1A4FAF]/10 flex items-center justify-center">
                  <s.icon size={20} className="text-[#1A4FAF]" />
                </div>
                {s.highlight && (
                  <span className="text-[10px] font-black bg-[#1A4FAF] text-white px-2.5 py-1 rounded-full">
                    100% performance
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
              <p className="text-sm font-semibold text-[#1A4FAF] mb-3">{s.price}</p>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{s.desc}</p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => scrollTo('formulaire')}
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 rounded-xl px-6 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Discuter de vos besoins
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  )
}
