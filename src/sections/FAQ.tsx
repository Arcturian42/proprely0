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
    a: "Oui. Aucun paiement, aucune carte bancaire demandée. Vous accédez à toute la plateforme, clients, sites, agents, planning, devis, factures, documents, pilotage, sans limite d'utilisation pendant toute la durée de la bêta.",
  },
  {
    q: "Combien ça coûtera après la bêta ?",
    a: "Le tarif public sera communiqué en fin de bêta. Les membres fondateurs gardent un tarif privilégié, fixé à l'avance et conservé à vie. Vous ne serez jamais soumis aux augmentations futures.",
  },
  {
    q: "Comment êtes-vous différents d'un logiciel généraliste ?",
    a: "Proprely n'est pas un logiciel générique adapté au nettoyage. Chaque fonctionnalité a été pensée pour les réalités du métier : spécialités agents (vitrerie, moquette, décapage), compteur d'heures par site, gestion des récurrences, alertes surmenage, preuve de passage. Le vocabulaire, les workflows, les rapports, tout est conçu pour la propreté B2B.",
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
    a: "Non. Vos agents reçoivent un lien, ouvrent leur planning dans leur navigateur, et c'est tout. L'interface est conçue pour être prise en main sans formation, accessible à des équipes intergénérationnelles.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et vous pouvez les exporter en 1 clic à tout moment, dans des formats standards (CSV, Excel).",
  },
  {
    q: "Et si Proprely arrête son activité ?",
    a: "Vos données sont exportables à tout moment dans des formats standards. Pas de verrouillage propriétaire. Vous gardez vos historiques, vos contrats et vos prestations sans dépendre de nous.",
  },
  {
    q: "Quelle est la prochaine étape concrète ?",
    a: "Vous remplissez le formulaire (2 minutes). Nous étudions votre candidature et vous répondons sous 24h. Si votre profil correspond, nous calons un premier appel de découverte et de mise en route avec le fondateur.",
  },
  {
    q: "C'est quoi un logiciel de gestion pour société de nettoyage ?",
    a: "Un logiciel de gestion pour société de nettoyage centralise dans un seul outil les fonctions opérationnelles du métier : clients et sites, agents avec leurs spécialités, planning et affectation, missions avec preuve de passage (QR + photos + signature), devis et factures, documents administratifs, pilotage de la rentabilité par client. Pour une TPE/PME B2B (3-50 agents), il remplace typiquement Excel, WhatsApp, Word et Google Drive utilisés en parallèle.",
  },
  {
    q: "Combien coûte un logiciel pour société de nettoyage en 2026 ?",
    a: "Les solutions du marché vont de 0 € (Excel ou outils gratuits limités) à plusieurs centaines d'euros par mois pour les ERP métier comme Progiclean ou PROPRET. Un cockpit B2B moderne se positionne typiquement entre 25 et 80 €/utilisateur/mois selon le périmètre. Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices), avec un tarif fondateur conservé à vie après le lancement public.",
  },
  {
    q: "Proprely fonctionne-t-il pour une société de nettoyage à Paris, Lyon, Marseille ?",
    a: "Oui. Proprely a été conçu pour les sociétés de nettoyage B2B en France, avec des pages dédiées par ville pour les principales métropoles (Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille, Nice, Strasbourg, Montpellier, Rennes). Le produit s'adapte aux spécificités locales : rotations matinales tertiaires, syndics de copropriétés, hôtellerie saisonnière, pôles médicaux, biotech.",
  },
  {
    q: "Faut-il être en bêta privée pour tester Proprely ?",
    a: "Pendant la phase actuelle, oui. Nous sélectionnons 30 sociétés fondatrices à qui nous offrons un accès gratuit, un onboarding 30 minutes avec le fondateur, et un tarif privilégié conservé à vie. La candidature se fait depuis la page d'accueil en 2 minutes. Réponse sous 24h ouvrées. Après les 30 places, la bêta se referme jusqu'au lancement public.",
  },
  {
    q: "Proprely gère-t-il la convention collective de la propreté (IDCC 3043) ?",
    a: "Oui. La grille de salaires AS1 à MP5, les primes (panier, transport, expérience), les majorations heures sup et les durées de travail standards de la convention collective nationale de la propreté (IDCC 3043) sont intégrées au module gestion des agents. Vous restez bien sûr maître de votre grille interne si elle diffère de la convention.",
  },
  {
    q: "Comment Proprely se compare à PROPRET, Progiclean ou Organilog ?",
    a: "PROPRET et Progiclean sont des ERP métier historiques (~20-30 ans) ciblant les PME/ETI (>50 agents) avec un périmètre large (paie, GED, qualité). Organilog est une suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Proprely est un cockpit nouvelle génération (2025-2026) conçu spécifiquement pour les TPE/PME B2B nettoyage (3-50 agents), mobile-first, avec marge par client en temps réel et onboarding 30 minutes. Comparatifs détaillés disponibles sur le site.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">FAQ</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Vos questions sur la bêta
          </h2>
        </motion.div>

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
