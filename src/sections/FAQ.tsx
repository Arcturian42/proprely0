import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'À qui s\'adresse Proprely ?', a: 'Aux sociétés de nettoyage et entreprises de propreté en France, de 3 à 50 agents. Que vous soyez auto-entrepreneur ou PME en croissance, Proprely s\'adapte à votre taille.' },
  { q: 'Que signifie "Operating System des sociétés de nettoyage" ?', a: 'Proprely n\'est pas un simple planning. C\'est une plateforme centrale qui regroupe vos opérations, votre commercial, votre pilotage dirigeant et vos agents terrain dans un seul outil. Comme un système d\'exploitation relie tous les composants d\'un ordinateur, Proprely relie tous les aspects de votre entreprise.' },
  { q: 'Que signifie "entreprise fondatrice" ?', a: 'C\'est l\'une des 30 premières sociétés sélectionnées pour utiliser Proprely et nous aider à l\'améliorer avec des retours terrain. Vous bénéficiez d\'un tarif réduit à vie (49€/mois) et d\'un accompagnement prioritaire. Vous ne devenez pas actionnaire.' },
  { q: 'Pourquoi le tarif est-il à 49 €/mois ?', a: 'C\'est notre tarif fondateur exclusif pour les 30 premières entreprises. Le prix public futur sera de 129 €/mois. Vous économisez 960 € par an.' },
  { q: 'Est-ce vraiment un tarif à vie ?', a: 'Oui. Tant que votre abonnement reste actif, vous conservez le tarif fondateur de 49 €/mois. Même quand le prix public passera à 129 €/mois.' },
  { q: 'Que se passe-t-il après les 30 places ?', a: 'Les candidatures seront mises sur liste d\'attente. Le tarif fondateur ne sera plus disponible. Les nouveaux inscrits paieront le prix public de 129 €/mois.' },
  { q: 'Est-ce que je dois payer immédiatement ?', a: 'Non. Vous candidatez d\'abord. Si vous êtes sélectionné, vous bénéficiez d\'une période d\'essai gratuite avant tout paiement. Aucun prélèvement sans votre accord explicite.' },
  { q: 'Est-ce que je peux annuler ?', a: 'Oui, à tout moment. Sans frais, sans justification. Vous gardez vos données et pouvez les exporter à tout moment en format CSV ou Excel.' },
  { q: 'Est-ce que mes agents doivent installer une application ?', a: 'Non. Proprely fonctionne en PWA (Progressive Web App). Vos agents accèdent à leur planning via un lien sur leur téléphone, sans téléchargement. Cela fonctionne sur tous les smartphones.' },
  { q: 'Est-ce que Proprely remplace Excel et WhatsApp ?', a: 'Exactement. Vous n\'avez plus besoin de jongler entre plusieurs outils. Tout est centralisé : plannings, interventions, clients, devis, factures et pilotage.' },
  { q: 'Est-ce adapté aux petites entreprises ?', a: 'Oui. Proprely est conçu pour les PME de 3 à 50 agents. Notre plan Starter est parfait pour les petites structures. Les fondateurs ont accès à toutes les fonctionnalités.' },
  { q: 'Est-ce adapté aux entreprises avec plusieurs sites ?', a: 'Oui. Vous pouvez gérer autant de sites clients que nécessaire. Chaque site a son propre planning, ses propres interventions et ses équipes dédiées.' },
  { q: 'Quand pourrai-je utiliser Proprely ?', a: 'Les membres fondateurs auront un accès prioritaire dès la version beta. Nous visons un onboarding des 30 fondateurs dans les 4 semaines suivant leur sélection.' },
  { q: 'Est-ce que je peux demander des fonctionnalités spécifiques ?', a: 'C\'est même encouragé. Les membres fondateurs ont un canal direct avec l\'équipe produit. Vos besoins terrain influenceront directement la roadmap.' },
  { q: 'Comment fonctionne l\'accompagnement personnalisé ?', a: 'Chaque fondateur est suivi par un membre de notre équipe pour l\'onboarding, la configuration et l\'utilisation quotidienne. Vous avez un interlocuteur dédié qui connaît votre entreprise.' },
  { q: 'Est-ce que je deviens actionnaire ou associé de Proprely ?', a: 'Non. "Entreprise fondatrice" signifie que vous êtes l\'une des 30 premières utilisatrices privilégiées. Vous bénéficiez d\'un tarif réduit à vie et d\'un accompagnement premium. Vous n\'achetez pas de parts, vous ne devenez pas associé.' },
  { q: 'Que se passe-t-il si le logiciel ne me convient pas ?', a: 'Vous bénéficiez d\'une période d\'essai pour tester Proprely avec vos équipes. Vous pouvez annuler à tout moment, sans frais. Vos données vous appartiennent et sont exportables en CSV ou Excel.' },
  { q: 'Mes agents ne sont pas à l\'aise avec la techno. Ça va marcher ?', a: 'Oui. L\'interface agent de Proprely a été volontairement simplifiée : un lien, un planning, un QR code, une case à cocher. Pas d\'application à télécharger, pas de mot de passe complexe, pas de formation nécessaire.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Oui. Vos données sont hébergées en France, chiffrées en transit et au repos. Proprely est conforme au RGPD. Vos données ne sont jamais revendues à des tiers. Vous restez propriétaire de vos données.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-14 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.08)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Vos questions, nos réponses
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(0,0,0,0.07)' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-left transition-colors"
                style={{ background: open === i ? '#F8FAFC' : '#fff' }}
              >
                <span className="text-xs sm:text-sm font-semibold text-[#0F2D5E] pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={16} className="text-[#00C2E0] shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-[#5A6B7D] leading-relaxed"
                      style={{ background: '#F8FAFC', borderTop: '1px solid rgba(0,194,224,0.08)' }}>
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
