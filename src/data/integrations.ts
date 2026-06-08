import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  Calculator,
  Calendar,
  FileText,
  Landmark,
  Mail,
  MessageSquare,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react'

export type IntegrationStatus = 'live' | 'beta' | 'roadmap' | 'on_demand'

export type Integration = {
  slug: string
  name: string
  category: string
  status: IntegrationStatus
  /** Description courte 1-2 phrases */
  description: string
  /** Bullet points concrets de ce que l'intégration permet */
  benefits: string[]
  icon: LucideIcon
  /** Couleur d'accent (Tailwind classes) */
  accent: { bg: string; text: string; border: string }
  /** URL officielle (optionnel) */
  website?: string
  /** Si renseigné, une page dédiée /integrations/{slug}/ est générée. */
  detail?: IntegrationDetail
}

export type IntegrationDetail = {
  /** Réponse-flash 60-100 mots (TL;DR) pour les LLM et le header de page. */
  tldr: string
  /** Meta title (≤60 chars) */
  metaTitle: string
  /** Meta description (≤160 chars) */
  metaDescription: string
  /** Hero pitch : 1-2 phrases qui présentent la valeur de l'intégration */
  heroPitch: string
  /** Cas d'usage concrets pour le métier propreté B2B */
  useCases: { title: string; description: string }[]
  /** Étapes de mise en place */
  howItWorks: { step: string; description: string }[]
  /** FAQ structurée (4-7 Q/R) — alimente le schema FAQPage */
  faq: { q: string; a: string }[]
  /** Liens internes pertinents */
  relatedLinks?: { to: string; label: string }[]
}

const ACCENTS = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
}

export const integrations: Integration[] = [
  // ── Paie & RH ──────────────────────────────────────────────────────
  {
    slug: 'silae',
    name: 'Silae',
    category: 'Paie & RH',
    status: 'live',
    description: "Export paie au format Silae : heures, primes, majorations IDCC 3043 prêtes à importer chaque mois.",
    benefits: [
      "Export CSV / TXT compatible avec votre gestionnaire de paie",
      "Heures complémentaires + majorations calculées automatiquement",
      "Primes panier, transport, salissure intégrées",
      "Calcul article 7 (transfert personnel) à venir",
    ],
    icon: Users,
    accent: ACCENTS.blue,
    website: 'https://www.silae.fr',
  },

  // ── Comptabilité ───────────────────────────────────────────────────
  {
    slug: 'pennylane',
    name: 'Pennylane',
    category: 'Comptabilité',
    status: 'beta',
    description: "Synchronisation des factures émises et règlements vers Pennylane pour automatiser la comptabilité.",
    benefits: [
      "Factures Proprely poussées dans Pennylane en temps réel",
      "Rapprochement bancaire automatisé",
      "Lien direct avec votre expert-comptable",
    ],
    icon: Calculator,
    accent: ACCENTS.violet,
    website: 'https://www.pennylane.com',
    detail: {
      tldr: "L'intégration Proprely × Pennylane synchronise automatiquement vos factures de nettoyage émises et leurs règlements vers votre logiciel comptable Pennylane. Vous évitez la double saisie, votre expert-comptable accède aux écritures en temps réel, et le rapprochement bancaire se fait sans intervention manuelle. Disponible en bêta pour les sociétés fondatrices Proprely en 2026.",
      metaTitle: "Intégration Pennylane × Proprely : compta nettoyage auto",
      metaDescription: "Intégration Pennylane × Proprely : factures de nettoyage poussées en temps réel, rapprochement bancaire automatisé, expert-comptable connecté. Compta sans double saisie.",
      heroPitch: "Vos factures Proprely arrivent dans Pennylane sans aucune ressaisie. Votre expert-comptable a toujours la version à jour, le rapprochement bancaire se fait tout seul, vos clôtures mensuelles passent de 1 journée à 1 heure.",
      useCases: [
        {
          title: "Factures mensuelles contrats récurrents",
          description: "Vos contrats d'entretien récurrents génèrent une facture chaque mois dans Proprely. Elle est poussée dans Pennylane dans la minute, avec le client, le SIRET, le montant HT/TTC, le compte de produit pré-affecté. Votre expert-comptable la valide depuis Pennylane, sans demander quoi que ce soit.",
        },
        {
          title: "Rapprochement bancaire des règlements",
          description: "Quand un client paie via virement, Pennylane détecte le règlement sur votre compte bancaire connecté (Qonto, Shine, banque traditionnelle) et le rapproche automatiquement avec la facture Proprely correspondante. Plus besoin de pointer manuellement.",
        },
        {
          title: "Clôture mensuelle en 1 heure",
          description: "À la fin du mois, vos factures émises, leurs paiements, et vos notes de frais sont déjà dans Pennylane. La clôture passe de plusieurs heures de ressaisie à une revue de cohérence en 1 heure. Votre expert-comptable garde la main sur les écritures complexes (paie IDCC 3043, DSN, provisions).",
        },
        {
          title: "Suivi DSO et relances",
          description: "Pennylane et Proprely partagent l'état de paiement de chaque facture. Vous voyez votre DSO réel par client dans le dashboard Proprely (CRM propreté) et déclenchez vos relances depuis l'outil où vous travaillez le client. Pennylane prend le relais pour les recouvrements lourds si besoin.",
        },
      ],
      howItWorks: [
        {
          step: "Connexion en 5 minutes",
          description: "Depuis votre compte Proprely, vous cliquez sur \"Connecter Pennylane\". Vous êtes redirigé vers Pennylane, vous autorisez l'application, vous revenez sur Proprely. C'est fait.",
        },
        {
          step: "Choix du périmètre",
          description: "Vous choisissez quoi synchroniser : factures émises (recommandé), avoirs, règlements rapprochés. Et vous pouvez exclure certains comptes ou clients si vous gardez du flux manuel sur Pennylane.",
        },
        {
          step: "Synchronisation continue",
          description: "À partir de là, chaque facture Proprely qui sort va dans Pennylane. Chaque règlement détecté sur Pennylane revient dans Proprely (statut facture passé à \"payée\"). Vous n'avez plus rien à faire de manuel.",
        },
        {
          step: "Onboarding accompagné",
          description: "Les sociétés bêta fondatrices bénéficient d'un onboarding 30 min avec le fondateur pour valider la cartographie des comptes de produit et des codes journaux Pennylane.",
        },
      ],
      faq: [
        {
          q: "L'intégration Pennylane × Proprely est-elle disponible aujourd'hui ?",
          a: "Oui en bêta privée pour les sociétés fondatrices Proprely en 2026. La généralisation est prévue après la fin de la bêta, avec accès prioritaire pour les membres fondateurs au tarif fondateur conservé à vie.",
        },
        {
          q: "Puis-je continuer à utiliser mon expert-comptable avec Pennylane ?",
          a: "Oui, c'est exactement le scénario cible. Pennylane est conçu pour le travail collaboratif entreprise + expert-comptable. Proprely pousse les flux opérationnels (factures, règlements), votre expert-comptable garde la main sur les écritures de paie IDCC 3043, DSN, provisions, fiscal.",
        },
        {
          q: "Que se passe-t-il si je modifie une facture dans Proprely après l'envoi à Pennylane ?",
          a: "Proprely pousse la mise à jour à Pennylane. Si la facture a déjà été validée comptablement, Pennylane crée un avoir + une nouvelle facture (pratique comptable standard). Si elle est encore en brouillon, elle est simplement mise à jour.",
        },
        {
          q: "Quel format est utilisé pour les factures envoyées à Pennylane ?",
          a: "API native Pennylane (JSON) avec tous les champs comptables : client (avec SIRET), date émission, date d'exigibilité, lignes HT, TVA, totaux, compte de produit, code journal. Au-delà de la bêta, Proprely émettra aussi en Factur-X conformément à la réforme 2026-2027.",
        },
        {
          q: "Combien coûte l'intégration Pennylane × Proprely ?",
          a: "L'intégration est gratuite pendant la bêta privée Proprely. Le tarif Pennylane reste séparé (compte Pennylane standard à votre nom). Après la bêta, l'intégration sera incluse dans tous les plans Proprely, sans surcoût.",
        },
        {
          q: "Et si je quitte Pennylane pour un autre outil comptable ?",
          a: "Vous gardez l'export CSV / Excel universel de Proprely (factures, règlements, clients) qui fonctionne avec tous les logiciels comptables (Tiime, Indy, Sage, Cegid). L'intégration Pennylane est juste plus rapide quand vous êtes dessus.",
        },
      ],
      relatedLinks: [
        { to: '/fonctionnalites/facturation-nettoyage', label: 'Facturation Proprely pour société de nettoyage' },
        { to: '/integrations', label: 'Toutes les intégrations Proprely' },
        { to: '/integrations/qonto', label: 'Intégration Qonto × Proprely' },
        { to: '/securite-rgpd', label: 'Sécurité & RGPD' },
      ],
    },
  },
  {
    slug: 'tiime',
    name: 'Tiime',
    category: 'Comptabilité',
    status: 'roadmap',
    description: "Connexion bidirectionnelle avec Tiime pour les TPE qui pilotent leur compta en ligne.",
    benefits: [
      "Export factures et avoirs",
      "Synchronisation clients et fournisseurs",
      "Roadmap Q3 2026",
    ],
    icon: Calculator,
    accent: ACCENTS.violet,
    website: 'https://www.tiime.fr',
  },
  {
    slug: 'indy',
    name: 'Indy',
    category: 'Comptabilité',
    status: 'on_demand',
    description: "Pour les indépendants et auto-entrepreneurs nettoyage qui tiennent leur compta sur Indy.",
    benefits: [
      "Export factures au format Indy",
      "Disponible sur demande, prioritaire pour membres fondateurs",
    ],
    icon: Calculator,
    accent: ACCENTS.violet,
    website: 'https://www.indy.fr',
  },

  // ── Banque pro ─────────────────────────────────────────────────────
  {
    slug: 'qonto',
    name: 'Qonto',
    category: 'Banque pro',
    status: 'beta',
    description: "Rapprochement des règlements clients depuis Qonto vers vos factures Proprely.",
    benefits: [
      "Marquage automatique des factures réglées",
      "Alertes paiement reçu en temps réel",
      "Webhook Qonto + API standard",
    ],
    icon: Wallet,
    accent: ACCENTS.emerald,
    website: 'https://qonto.com',
    detail: {
      tldr: "L'intégration Proprely × Qonto rapproche automatiquement les règlements clients reçus sur votre compte Qonto avec les factures émises depuis Proprely. Chaque virement entrant marque la facture correspondante comme payée, en temps réel. Plus de pointage manuel, un DSO réel visible dans le dashboard Proprely. Disponible en bêta pour les sociétés fondatrices en 2026.",
      metaTitle: "Intégration Qonto × Proprely : rapprochement automatique",
      metaDescription: "Intégration Qonto × Proprely : règlements clients rapprochés automatiquement avec vos factures de nettoyage. DSO en temps réel, alertes paiement, fin du pointage manuel.",
      heroPitch: "Vos clients paient sur Qonto, Proprely passe la facture en \"payée\" automatiquement. Vous voyez votre DSO réel par client, vous lancez les relances avant la dérive, vous arrêtez de pointer Excel ↔ Qonto le vendredi soir.",
      useCases: [
        {
          title: "Marquage automatique des factures payées",
          description: "Quand un client de nettoyage vous vire son règlement sur Qonto, Proprely détecte le virement via webhook Qonto, le rapproche avec la facture correspondante (montant + référence client) et bascule la facture en statut \"payée\" automatiquement. Pas d'intervention humaine.",
        },
        {
          title: "Alertes paiement reçu en temps réel",
          description: "Vous recevez une notification Proprely (et un mail) dès qu'un règlement arrive : \"SCI Atrium vient de payer la facture 2026-0142 de 1 240 €\". Pratique pour boucler la trésorerie avant un appel d'offres, ou pour confirmer un acompte avant de démarrer la prestation.",
        },
        {
          title: "DSO réel par client dans le CRM Proprely",
          description: "Le délai moyen de paiement par client (DSO) est calculé en temps réel à partir des règlements Qonto. Vous repérez immédiatement les mauvais payeurs (>60 jours) sur le dashboard CRM Proprely, sans avoir à exporter des relevés bancaires.",
        },
        {
          title: "Relances anticipées",
          description: "Avant qu'une facture parte en DSO 60+, Proprely vous propose une relance automatique (J-3 avant échéance, J+5, J+15, J+30) avec un brouillon mail préfilé et le statut de paiement Qonto en temps réel. Vous validez ou ajustez avant envoi.",
        },
      ],
      howItWorks: [
        {
          step: "Connexion Qonto en 3 minutes",
          description: "Depuis Proprely, vous cliquez sur \"Connecter Qonto\", vous êtes redirigé vers Qonto pour valider l'accès (en lecture seule par défaut, vos virements sortants sont JAMAIS déclenchés par Proprely), vous revenez.",
        },
        {
          step: "Choix des comptes à synchroniser",
          description: "Si vous avez plusieurs comptes Qonto (compte principal + sous-compte par exemple), vous choisissez ceux qui doivent remonter dans Proprely. Les autres restent privés.",
        },
        {
          step: "Rapprochement automatique",
          description: "À partir de là, chaque virement entrant détecté sur le webhook Qonto est testé contre les factures Proprely en attente de paiement. Si match (montant + indicateur client), la facture passe en \"payée\". Si pas de match, la transaction reste sans affectation, vous la rapprochez manuellement en 1 clic depuis Proprely.",
        },
        {
          step: "Aucun accès en écriture",
          description: "Proprely ne peut JAMAIS déclencher un virement sortant depuis votre Qonto. La permission demandée est en lecture seule (\"Read transactions\"). Aucun risque sur la sécurité de votre trésorerie.",
        },
      ],
      faq: [
        {
          q: "L'intégration Qonto × Proprely est-elle disponible aujourd'hui ?",
          a: "Oui en bêta privée pour les sociétés fondatrices Proprely en 2026. La généralisation est prévue après la fin de la bêta, avec accès prioritaire pour les membres fondateurs au tarif fondateur conservé à vie.",
        },
        {
          q: "Proprely peut-il déclencher des virements depuis mon Qonto ?",
          a: "Non. La permission demandée à Qonto est en lecture seule sur les transactions entrantes. Proprely ne peut jamais déclencher un virement sortant, faire une carte, ou modifier votre compte Qonto. Aucun risque sur la sécurité.",
        },
        {
          q: "Que se passe-t-il si un client paie le mauvais montant ?",
          a: "Le rapprochement automatique ne se déclenche que si le montant Qonto correspond exactement au montant attendu de la facture Proprely. Si le client paie un montant partiel ou erroné, la transaction est marquée \"à rapprocher manuellement\" — vous décidez si vous validez en paiement partiel, en avoir, ou si vous relancez.",
        },
        {
          q: "Mes données bancaires sont-elles stockées par Proprely ?",
          a: "Non. Proprely ne stocke aucun numéro de carte, aucun RIB. Seules les métadonnées des transactions entrantes (date, montant, libellé virement, référence client si présente) sont remontées via le webhook Qonto, le temps du rapprochement. Conformité RGPD intégrale, hébergement européen.",
        },
        {
          q: "Et si j'ai Shine ou une banque traditionnelle au lieu de Qonto ?",
          a: "Shine est disponible \"sur demande\" pour les membres fondateurs en bêta. Les banques traditionnelles (Crédit Agricole, BNP, Société Générale) seront connectées via DSP2 / agrégateurs (Bridge, Powens) en roadmap 2027. En attendant, vous pouvez importer un relevé CSV manuel dans Proprely et déclencher le rapprochement.",
        },
        {
          q: "Combien coûte l'intégration Qonto × Proprely ?",
          a: "L'intégration est gratuite pendant la bêta privée Proprely. Le tarif Qonto reste séparé (compte Qonto standard à votre nom). Après la bêta, l'intégration sera incluse dans tous les plans Proprely, sans surcoût.",
        },
      ],
      relatedLinks: [
        { to: '/fonctionnalites/facturation-nettoyage', label: 'Facturation Proprely pour société de nettoyage' },
        { to: '/integrations', label: 'Toutes les intégrations Proprely' },
        { to: '/integrations/pennylane', label: 'Intégration Pennylane × Proprely' },
        { to: '/securite-rgpd', label: 'Sécurité & RGPD' },
      ],
    },
  },
  {
    slug: 'shine',
    name: 'Shine',
    category: 'Banque pro',
    status: 'on_demand',
    description: "Mêmes capacités que Qonto, via l'API Shine. Activable à la demande.",
    benefits: [
      "Rapprochement automatique des règlements",
      "Disponible sur demande pour les membres fondateurs",
    ],
    icon: Wallet,
    accent: ACCENTS.emerald,
    website: 'https://www.shine.fr',
  },
  {
    slug: 'memo-bank',
    name: 'Memo Bank',
    category: 'Banque pro',
    status: 'roadmap',
    description: "Connexion API Memo Bank pour les sociétés de nettoyage 10+ agents qui structurent leur trésorerie.",
    benefits: [
      "Multi-comptes, multi-utilisateurs",
      "Roadmap Q4 2026",
    ],
    icon: Banknote,
    accent: ACCENTS.emerald,
    website: 'https://memo.bank',
  },

  // ── Email & marketing ──────────────────────────────────────────────
  {
    slug: 'brevo',
    name: 'Brevo',
    category: 'Email & marketing',
    status: 'live',
    description: "Capture des leads (newsletter + ressources) automatiquement poussée dans vos listes Brevo.",
    benefits: [
      "Capture newsletter + lead magnets",
      "Attributs COMPANY, SOURCE, RESOURCE",
      "Hébergement français, RGPD ready",
    ],
    icon: Mail,
    accent: ACCENTS.amber,
    website: 'https://www.brevo.com/fr/',
  },

  // ── Productivité ───────────────────────────────────────────────────
  {
    slug: 'google-calendar',
    name: 'Google Calendar',
    category: 'Productivité',
    status: 'roadmap',
    description: "Synchronisation des interventions planifiées avec votre Google Calendar pro.",
    benefits: [
      "Plannings agents visibles dans Google Calendar",
      "Calendrier partagé avec votre équipe d'encadrement",
      "Roadmap Q3 2026",
    ],
    icon: Calendar,
    accent: ACCENTS.rose,
    website: 'https://calendar.google.com',
  },
  {
    slug: 'slack',
    name: 'Slack',
    category: 'Productivité',
    status: 'roadmap',
    description: "Notifications Slack pour les alertes critiques (mission en retard, agent absent, devis signé).",
    benefits: [
      "Notifs dans le canal Slack de votre équipe d'encadrement",
      "Alertes paramétrables par type d'événement",
      "Roadmap Q4 2026",
    ],
    icon: MessageSquare,
    accent: ACCENTS.rose,
  },

  // ── Conformité ─────────────────────────────────────────────────────
  {
    slug: 'chorus-pro',
    name: 'Chorus Pro',
    category: 'Conformité Factur-X',
    status: 'beta',
    description: "Émission de factures électroniques au format Factur-X conforme à la réforme 2026-2027.",
    benefits: [
      "Format Factur-X (XML + PDF/A-3) natif",
      "Dépôt sur Chorus Pro pour les marchés publics",
      "Conformité obligatoire dès 2027 pour les grandes entreprises",
    ],
    icon: FileText,
    accent: ACCENTS.slate,
    website: 'https://chorus-pro.gouv.fr',
  },
  {
    slug: 'pdp-factur-x',
    name: 'PDP Factur-X',
    category: 'Conformité Factur-X',
    status: 'roadmap',
    description: "Connexion à votre Plateforme de Dématérialisation Partenaire (PDP) à choisir au lancement de la réforme.",
    benefits: [
      "Compatibilité avec les PDP enregistrées par l'État",
      "Roadmap alignée sur le calendrier officiel de la réforme",
    ],
    icon: ShieldCheck,
    accent: ACCENTS.slate,
  },

  // ── ERP / Compta cabinet ────────────────────────────────────────────
  {
    slug: 'export-csv-universel',
    name: 'Export CSV / Excel universel',
    category: 'Export universel',
    status: 'live',
    description: "Toutes vos données (clients, sites, agents, plannings, missions, devis, factures) exportables en CSV ou Excel à tout moment.",
    benefits: [
      "Export 1-clic depuis l'interface",
      "Compatible avec tous les outils comptables / ERP",
      "Aucun lock-in technique",
    ],
    icon: Landmark,
    accent: ACCENTS.slate,
  },
]

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  live: 'Disponible',
  beta: 'En bêta',
  roadmap: 'Roadmap',
  on_demand: 'Sur demande',
}

export const STATUS_STYLE: Record<IntegrationStatus, string> = {
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  beta: 'bg-blue-50 text-blue-700 border-blue-200',
  roadmap: 'bg-amber-50 text-amber-700 border-amber-200',
  on_demand: 'bg-slate-100 text-slate-700 border-slate-200',
}
