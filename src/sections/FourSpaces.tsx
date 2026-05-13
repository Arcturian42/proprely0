import { motion } from 'framer-motion'
import { Calendar, Users, BarChart3, Target, CheckCircle } from 'lucide-react'

const modules = [
  {
    icon: Calendar,
    color: '#1A4FAF',
    tag: 'Starter',
    title: 'Opérations & Planning',
    desc: 'Le cœur du logiciel. Gérez chaque mission, chaque agent, chaque heure — sans Excel ni WhatsApp.',
    items: [
      'Planning centralisé par site et par agent',
      'Compteur d\'heures automatique par employé',
      'Spécialités agents (vitrerie, moquette, décappage…)',
      'Alertes de surcharge de travail',
      'Récurrence des interventions client',
      'Photos avant/après et signature terrain',
    ],
  },
  {
    icon: Users,
    color: '#0F2D5E',
    tag: 'Starter',
    title: 'Agenda & Équipes',
    desc: 'Affectez les bons agents aux bonnes missions. Évitez le surmenage. Pilotez votre équipe avec clarté.',
    items: [
      'Profil agent avec compétences et charge horaire',
      'Alerte quand un agent approche de sa limite',
      'Vue calendrier semaine/mois',
      'Affectation en 1 clic selon disponibilité',
      'Gestion des remplacements',
      'Export heures pour la paie',
    ],
  },
  {
    icon: Target,
    color: '#00C2E0',
    tag: 'Company',
    title: 'CRM & Commercial',
    desc: 'Transformez vos prospects en clients, suivez vos relances, gérez vos devis et factures.',
    items: [
      'Pipeline commercial visuel',
      'Devis générés en 2 clics',
      'Alertes recouvrement impayés',
      'Historique complet par client',
      'Rentabilité par client (taux de marge)',
      'Identification des clients non rentables',
    ],
  },
  {
    icon: BarChart3,
    color: '#0F2D5E',
    tag: 'Company',
    title: 'Pilotage & Analyse',
    desc: 'Sachez exactement ce que vous gagnez, par client, par mission, par agent. Décidez avec des chiffres réels.',
    items: [
      'Dashboard CA en temps réel',
      'Connexion Pennylane / Conto',
      'Taux de marge par client et par site',
      'Alertes financières personnalisables',
      'Rapport de rentabilité mensuel',
      'Analyse satisfaction clients',
    ],
  },
]

export default function FourSpaces() {
  return (
    <section id="features" className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">Fonctionnalités</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
            Tout ce dont vous avez besoin.<br />Rien de superflu.
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Chaque fonctionnalité vient d'un vrai besoin terrain, identifié avec des dirigeants de sociétés de nettoyage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-gray-100 rounded-2xl p-6 sm:p-7 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15` }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                  {m.tag}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
              <p className="text-sm text-gray-500 mb-5">{m.desc}</p>
              <ul className="space-y-2">
                {m.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={14} className="text-[#1A4FAF] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
