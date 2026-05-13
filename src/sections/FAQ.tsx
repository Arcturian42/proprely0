import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Est-ce que Proprely remplace Excel et Google Agenda ?', a: 'Complètement. Vous n\'avez plus besoin de jongler entre un tableau Excel pour les heures, Google Agenda pour le planning, WhatsApp pour les agents et un autre outil pour les devis. Tout est centralisé dans Proprely.' },
  { q: 'Comment fonctionne le compteur d\'heures automatique ?', a: 'Chaque intervention saisie dans Proprely est automatiquement associée à un ou plusieurs agents. Le logiciel cumule leurs heures en temps réel. En fin de mois, vous avez un récapitulatif complet par agent — sans compter manuellement sur votre agenda.' },
  { q: 'Puis-je gérer les spécialités de mes agents ?', a: 'Oui. Chaque profil agent peut avoir des compétences associées (vitrerie, moquette, décappage, remise en état, fin de chantier…). Lors de l\'affectation d\'une mission, Proprely vous indique quels agents ont les compétences requises et leur charge horaire actuelle.' },
  { q: 'Comment Proprely m\'aide à éviter le surmenage de mes équipes ?', a: 'Proprely affiche en permanence le nombre d\'heures effectuées par chaque agent sur la période en cours. Des alertes se déclenchent quand un agent dépasse un seuil défini. Vous pouvez ainsi rééquilibrer les affectations avant que la situation devienne critique.' },
  { q: 'Est-ce que mes agents doivent installer une application ?', a: 'Seulement avec le plan Cruiser. L\'application mobile agents permet le check-in géolocalisé, la signature client et l\'envoi de photos depuis le terrain. Sur les plans Starter et Company, les agents accèdent à leur planning via un lien web — aucune installation requise.' },
  { q: 'Comment fonctionne l\'analyse de rentabilité client ?', a: 'En connectant Proprely à votre logiciel comptable (Pennylane, Conto…), vous obtenez une vue croisée : heures passées par site, revenu facturé, et marge calculée. Vous identifiez en un coup d\'œil vos clients les plus rentables et ceux qui vous coûtent plus qu\'ils ne vous rapportent.' },
  { q: 'Est-ce que je peux changer de plan ?', a: 'Oui, à tout moment. Si votre équipe grandit ou si vous avez besoin de fonctionnalités supplémentaires, vous passez au plan supérieur en quelques clics. La facturation est ajustée au prorata.' },
  { q: 'Combien de temps dure la période d\'essai ?', a: '14 jours, sans carte bancaire requise. Vous configurez votre entreprise, importez vos agents et testez toutes les fonctionnalités du plan choisi. Au terme de l\'essai, vous décidez si vous continuez.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Vos données sont hébergées en France, chiffrées en transit et au repos. Proprely est conforme au RGPD. Vous restez propriétaire de vos données et pouvez les exporter à tout moment.' },
  { q: 'Qu\'est-ce que les tokens de prospection ?', a: 'C\'est un service additionnel qui permet à notre IA d\'identifier des prospects locaux qualifiés pour votre zone (gérants de bureaux, syndics, hôtels, restaurants…) et de préparer des messages de prise de contact personnalisés. Vous achetez des crédits selon vos besoins.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Vos questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
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
