import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "C'est quoi exactement la bêta privée ?",
    a: "Nous lançons Proprely avec 30 sociétés de nettoyage fondatrices. Pendant 3 mois, vous utilisez le produit, vous nous remontez vos besoins et vous influencez la roadmap. En contrepartie : tarif privilégié bloqué à vie, onboarding fait par le fondateur, support prioritaire.",
  },
  {
    q: 'Encore un logiciel compliqué ?',
    a: "Mise en place en 10 minutes lors d'un appel avec le fondateur. Si vous savez utiliser Google Agenda, vous savez utiliser Proprely. L'interface a été testée avec des agents de 22 à 58 ans — aucun n'a eu besoin de formation.",
  },
  {
    q: "Je n'ai pas le temps de changer d'outil",
    a: "Vous passez aujourd'hui environ 10h/semaine en administration. Proprely vous en fait gagner 6 dès la première semaine. ROI immédiat. Configuration faite par nous, vous n'avez rien à monter seul.",
  },
  {
    q: 'Mon entreprise est-elle assez grande ?',
    a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Si vous avez plus d'un site à gérer, vous avez besoin de Proprely. Si vous êtes en croissance, encore plus.",
  },
  {
    q: 'Je gère déjà avec Excel et WhatsApp',
    a: "Ça fonctionne — jusqu'au jour où un agent oublie un site, où un client conteste les heures, ou où vous passez votre dimanche soir à compter. Proprely élimine ces moments. Et garde tous vos historiques.",
  },
  {
    q: 'Combien ça coûte vraiment ?',
    a: "Le tarif fondateur est communiqué lors de l'appel découverte. C'est un tarif privilégié, bloqué à vie, exclusivement pour les 30 fondateurs. Sans frais cachés, sans engagement, annulation possible à tout moment.",
  },
  {
    q: "C'est vraiment adapté au nettoyage ?",
    a: "Proprely n'est PAS un logiciel générique. Chaque fonctionnalité a été construite avec des dirigeants de sociétés de nettoyage : spécialités agents (vitrerie, moquette, décappage), compteur d'heures par site, gestion des récurrences clients, alertes surmenage. Pas avec des développeurs dans une tour en verre.",
  },
  {
    q: 'Et si Proprely disparaît ?',
    a: "Données hébergées en France (OVH). Export complet de vos données en 1 clic à tout moment, dans des formats standards (CSV, Excel). Vous restez propriétaire. Pas de verrouillage.",
  },
  {
    q: "Mes agents ne vont pas adopter ?",
    a: "Pas d'application à installer sur les plans standards : vos agents reçoivent un lien, ouvrent leur planning, c'est tout. Si votre agent utilise WhatsApp, il utilisera Proprely. Testé avec des équipes intergénérationnelles.",
  },
  {
    q: 'Mes données sont-elles sécurisées ?',
    a: "Hébergement France (OVH), chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et pouvez les exporter à tout moment.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
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
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center shrink-0"
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
