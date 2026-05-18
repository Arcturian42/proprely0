import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: "C'est quoi exactement, la bêta privée ?",
    a: "On lance Proprely avec 30 sociétés de nettoyage fondatrices. Pendant 3 mois, tu utilises le produit, tu nous remontes tes besoins, tu influences ce qu'on construit en priorité. En échange : tarif conservé à vie, mise en route faite par le fondateur, et un interlocuteur qui connaît ton dossier.",
  },
  {
    q: "Encore un logiciel compliqué à prendre en main ?",
    a: "Mise en route en 30 minutes lors d'un appel avec le fondateur. On configure ta boîte ensemble. Si tu sais utiliser Google Agenda, tu sais utiliser Proprely. L'interface a été testée avec des agents de 22 à 58 ans — aucun n'a eu besoin de formation.",
  },
  {
    q: "Je n'ai pas le temps de changer d'outil maintenant",
    a: "Aujourd'hui tu perds environ 6h par semaine à jongler entre Excel, WhatsApp et ton logiciel de facturation. Proprely te les rend dès la première semaine. Et c'est nous qui faisons la configuration avec toi, tu n'as rien à monter seul.",
  },
  {
    q: "Mon entreprise est-elle assez grande ?",
    a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Si tu as plus d'un site à gérer, tu as besoin de Proprely. Si tu es en croissance, encore plus.",
  },
  {
    q: "Je gère déjà avec Excel et WhatsApp, ça marche",
    a: "Ça marche, oui. Jusqu'au jour où un agent oublie un site, où un client conteste les heures, ou où tu passes ton dimanche soir à compter. Proprely élimine ces moments. Et garde tous tes historiques.",
  },
  {
    q: "Combien ça coûte vraiment ?",
    a: "Le tarif fondateur est communiqué pendant le premier appel. C'est un tarif privilégié, conservé à vie, exclusivement pour les 30 fondateurs. Pas de frais cachés, pas d'engagement, annulation possible à tout moment.",
  },
  {
    q: "C'est vraiment fait pour le nettoyage, ou un logiciel générique repackagé ?",
    a: "Proprely n'est PAS un logiciel générique. Chaque fonctionnalité a été construite avec des dirigeants du nettoyage : spécialités agents (vitrerie, moquette, décappage), compteur d'heures par site, gestion des récurrences, alertes surmenage. C'est venu de leurs galères, pas d'un brainstorm en réunion.",
  },
  {
    q: "Et si Proprely disparaît ?",
    a: "Données hébergées en France (OVH). Export complet en 1 clic à tout moment, dans des formats standards (CSV, Excel). Tu restes propriétaire à 100%. Pas de verrouillage.",
  },
  {
    q: "Mes agents ne vont pas adopter, c'est sûr",
    a: "Pas d'application à installer : tes agents reçoivent un lien, ouvrent leur planning, c'est tout. Si ton agent utilise WhatsApp, il utilisera Proprely. Testé avec des équipes de 22 à 58 ans.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Hébergement France (OVH), chiffrement en transit et au repos, conformité RGPD. Tu restes propriétaire de tes données à 100% et tu peux les exporter à tout moment.",
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
            Tes questions sur la bêta
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
