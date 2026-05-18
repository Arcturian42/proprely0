import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "C'est quoi exactement, la bêta privée ?",
    a: "Nous lançons Proprely avec 30 sociétés de nettoyage fondatrices. Pendant toute la durée de la bêta, vous utilisez le produit gratuitement, vous nous remontez vos besoins, et vous influencez les prochaines fonctionnalités. Cinq avantages exclusifs : accès gratuit, onboarding fait par le fondateur, influence sur la feuille de route, support prioritaire, et conditions préférentielles à vie une fois la bêta terminée.",
  },
  {
    q: "C'est vraiment gratuit ?",
    a: "Oui. Aucun paiement, aucune carte bancaire demandée. Vous accédez à toute la plateforme — clients, sites, agents, planning, devis, factures, documents, pilotage — sans limite d'utilisation pendant toute la durée de la bêta.",
  },
  {
    q: "Combien ça coûtera après la bêta ?",
    a: "Le tarif public sera communiqué en fin de bêta. Les membres fondateurs gardent un tarif privilégié, fixé à l'avance et conservé à vie. Vous ne serez jamais soumis aux augmentations futures.",
  },
  {
    q: "Comment êtes-vous différents d'un logiciel généraliste ?",
    a: "Proprely n'est pas un logiciel générique adapté au nettoyage. Chaque fonctionnalité a été construite avec des dirigeants du métier : spécialités agents (vitrerie, moquette, décapage), compteur d'heures par site, gestion des récurrences, alertes surmenage, preuve de passage. Le vocabulaire, les workflows, les rapports — tout est pensé pour la propreté B2B.",
  },
  {
    q: "Combien de temps pour la mise en route ?",
    a: "30 minutes lors d'un appel avec le fondateur. Nous configurons votre entreprise ensemble : vos sites, vos agents, vos fréquences d'intervention. À la fin de l'appel, vous êtes opérationnel.",
  },
  {
    q: "Mon entreprise est-elle assez grande ?",
    a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Dès que vous gérez plusieurs sites ou plusieurs agents, vous avez besoin de centraliser. La bêta est ouverte aux entreprises en croissance comme aux structures établies.",
  },
  {
    q: "Mes agents vont-ils devoir installer une application ?",
    a: "Non. Vos agents reçoivent un lien, ouvrent leur planning dans leur navigateur, et c'est tout. L'interface a été testée avec des équipes intergénérationnelles, de 22 à 58 ans, sans difficulté d'adoption.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Hébergement en France (OVH), chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et vous pouvez les exporter en 1 clic à tout moment, dans des formats standards (CSV, Excel).",
  },
  {
    q: "Et si Proprely arrête son activité ?",
    a: "Vos données sont exportables à tout moment dans des formats standards. Pas de verrouillage propriétaire. Vous gardez vos historiques, vos contrats et vos prestations sans dépendre de nous.",
  },
  {
    q: "Quelle est la prochaine étape concrète ?",
    a: "Vous remplissez le formulaire (2 minutes). Nous étudions votre candidature et vous répondons sous 24h. Si votre profil correspond, nous calons un premier appel de découverte et de mise en route avec le fondateur.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Vos questions sur la bêta
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
              className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-5 text-left hover:bg-slate-100 transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm"
                >
                  <ChevronDown size={14} className="text-blue-600" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
