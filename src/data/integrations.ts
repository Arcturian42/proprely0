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
