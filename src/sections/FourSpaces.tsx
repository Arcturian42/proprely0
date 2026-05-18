import { motion } from 'framer-motion'
import { Calendar, Users, Target, BarChart3 } from 'lucide-react'

const modules = [
  {
    icon: Calendar,
    title: 'Opérations & Planning',
    tagline: 'Vos agents savent où aller, quand, avec quels outils.',
    benefits: [
      { before: "Coups de fil et messages WhatsApp pour caler le planning", after: "Vos agents voient leur journée sur leur téléphone, sans appel" },
      { before: "Heures comptées le 22 du mois sur l'agenda papier", after: "Compteur d'heures automatique, prêt pour la paie en 2 clics" },
      { before: "Photos avant/après envoyées sur WhatsApp et perdues", after: "Photos, signatures et preuves attachées à chaque mission" },
    ],
  },
  {
    icon: Users,
    title: 'Équipes & Bien-être',
    tagline: 'Évitez le surmenage. Gardez vos meilleurs agents.',
    benefits: [
      { before: "Vous découvrez le burnout d'un agent quand il démissionne", after: "Alerte automatique quand un agent approche de sa limite" },
      { before: "Affectations à l'instinct selon qui répond le premier", after: "Affectation 1-clic selon spécialité, dispo et charge horaire" },
      { before: "Remplacements gérés dans l'urgence par téléphone", after: "Gestion centralisée des remplacements, traçabilité totale" },
    ],
  },
  {
    icon: Target,
    title: 'CRM & Commercial',
    tagline: 'Transformez vos demandes en clients. Sans logiciel séparé.',
    benefits: [
      { before: "Devis rédigés sur Word, 30 min par client", after: "Devis générés en 2 clics, professionnels, avec votre logo" },
      { before: "Relances oubliées, prospects perdus dans les emails", after: "Pipeline visuel avec alertes de relance automatiques" },
      { before: "Impossible de savoir quel client est vraiment rentable", after: "Marge par client, identification des clients déficitaires" },
    ],
  },
  {
    icon: BarChart3,
    title: 'Pilotage & Rentabilité',
    tagline: 'Décidez avec des chiffres réels, pas au feeling.',
    benefits: [
      { before: "Vous découvrez la rentabilité du mois 45 jours après", after: "Dashboard CA, heures, marge — en temps réel" },
      { before: "Comptable et logiciel de facturation déconnectés", after: "Connexion native Pennylane / Conto, données synchronisées" },
      { before: "Décisions prises à l'instinct, sans visibilité", after: "Rapport mensuel automatique de rentabilité par site et client" },
    ],
  },
]

export default function FourSpaces() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">La solution</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
            Tout ce dont vous avez besoin.<br />Rien de superflu.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Chaque fonctionnalité a été construite avec des dirigeants de sociétés de nettoyage. Pas avec des développeurs dans une tour en verre.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <m.icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-slate-600">{m.tagline}</p>
                </div>
              </div>
              <div className="space-y-3 mt-5">
                {m.benefits.map((b, j) => (
                  <div key={j} className="bg-slate-50 rounded-xl p-3.5">
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded shrink-0 mt-0.5">Avant</span>
                      <span className="text-sm text-slate-500">{b.before}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0 mt-0.5">Après</span>
                      <span className="text-sm text-slate-800 font-medium">{b.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
