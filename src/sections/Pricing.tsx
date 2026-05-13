import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const plans = [
  {
    name: 'Starter',
    price: '49',
    desc: 'L\'essentiel pour gérer vos opérations au quotidien.',
    limit: 'Jusqu\'à 7 agents',
    highlight: false,
    features: [
      'Planning centralisé des interventions',
      'Compteur d\'heures automatique',
      'Profils agents + spécialités',
      'Agenda & récurrence clients',
      'Photos et rapports terrain',
      'Support par email',
    ],
    cta: 'Démarrer en Starter',
  },
  {
    name: 'Company',
    price: '150',
    desc: 'Pour les entreprises qui veulent aussi gérer leur commercial et leur rentabilité.',
    limit: 'Jusqu\'à 40 agents',
    highlight: true,
    badge: 'Le plus populaire',
    features: [
      'Tout le plan Starter',
      'CRM & pipeline commercial',
      'Devis et facturation',
      'Prospection & relances',
      'Module pilotage & rentabilité',
      'Connexion API (Pennylane, Conto…)',
      'Support prioritaire',
    ],
    cta: 'Démarrer en Company',
  },
  {
    name: 'Cruiser',
    price: '240',
    desc: 'La solution complète avec l\'application mobile pour vos agents terrain.',
    limit: 'Agents illimités',
    highlight: false,
    features: [
      'Tout le plan Company',
      'Application mobile agents',
      'QR code + check-in géolocalisé',
      'Signature électronique client',
      'Alertes temps réel terrain',
      'Tableaux de bord avancés',
      'Account manager dédié',
    ],
    cta: 'Démarrer en Cruiser',
  },
  {
    name: 'Corporate',
    price: null,
    desc: 'Pour les groupes et franchises. Solution sur-mesure avec accompagnement complet.',
    limit: 'Multi-entités',
    highlight: false,
    features: [
      'Tout le plan Cruiser',
      'Déploiement multi-sites',
      'Intégrations personnalisées',
      'Contrat de service dédié',
      'Formation équipe incluse',
      'SLA garanti',
    ],
    cta: 'Nous contacter',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">Tarifs</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Un plan pour chaque étape de votre croissance
          </h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Sans engagement. Essai gratuit 14 jours. Changez de plan à tout moment.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`rounded-2xl p-6 flex flex-col relative ${
                plan.highlight
                  ? 'bg-[#1A4FAF] text-white shadow-xl shadow-blue-200'
                  : 'bg-white border border-gray-100'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#00C2E0] text-[#0A1F40] text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap size={10} />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>
                  {plan.name}
                </p>
                {plan.price ? (
                  <div className="flex items-end gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}€
                    </span>
                    <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-blue-200' : 'text-gray-400'}`}>/mois</span>
                  </div>
                ) : (
                  <div className="text-3xl font-black text-gray-900 mb-1">Sur devis</div>
                )}
                <p className={`text-xs font-semibold mb-3 ${plan.highlight ? 'text-blue-200' : 'text-[#1A4FAF]'}`}>
                  {plan.limit}
                </p>
                <p className={`text-xs leading-relaxed ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <CheckCircle
                      size={14}
                      className={`mt-0.5 shrink-0 ${plan.highlight ? 'text-[#00C2E0]' : 'text-[#1A4FAF]'}`}
                    />
                    <span className={`text-xs ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo('formulaire')}
                className={`w-full rounded-xl py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-white text-[#1A4FAF] hover:bg-blue-50'
                    : 'bg-[#1A4FAF] text-white hover:bg-[#0F2D5E]'
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Tous les prix sont HT · TVA applicable selon votre situation · Facturation mensuelle ou annuelle (-15%)
        </p>
      </div>
    </section>
  )
}
