import type { LucideIcon } from 'lucide-react'
import {
  Sparkles,
  Cog,
  Shield,
  ChartBar,
  Plug,
  FileText,
} from 'lucide-react'

export type ChangelogStatus = 'shipped' | 'in_progress' | 'planned' | 'considering'
export type ChangelogCategory =
  | 'Produit'
  | 'Intégrations'
  | 'Sécurité'
  | 'Contenu'
  | 'Performance'
  | 'UI/UX'

export type ChangelogItem = {
  /** Date au format YYYY-MM-DD pour le tri */
  date: string
  /** Date affichée en français : "7 juin 2026" */
  dateLabel: string
  status: ChangelogStatus
  category: ChangelogCategory
  title: string
  description: string
  /** Bullet points concrets */
  details?: string[]
  /** Lien interne associé (page produit, blog, etc.) */
  link?: { to: string; label: string }
  /** Si l'item est un sous-changement d'une release plus grande */
  parent?: string
}

const CATEGORY_ICON: Record<ChangelogCategory, LucideIcon> = {
  Produit: Sparkles,
  Intégrations: Plug,
  Sécurité: Shield,
  Contenu: FileText,
  Performance: ChartBar,
  'UI/UX': Cog,
}

export const CATEGORY_STYLE: Record<ChangelogCategory, { bg: string; text: string; border: string; icon: LucideIcon }> = {
  Produit: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: CATEGORY_ICON.Produit },
  Intégrations: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CATEGORY_ICON.Intégrations },
  Sécurité: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', icon: CATEGORY_ICON.Sécurité },
  Contenu: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: CATEGORY_ICON.Contenu },
  Performance: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', icon: CATEGORY_ICON.Performance },
  'UI/UX': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: CATEGORY_ICON['UI/UX'] },
}

export const STATUS_LABEL: Record<ChangelogStatus, string> = {
  shipped: 'Livré',
  in_progress: 'En cours',
  planned: 'Planifié',
  considering: 'À l\'étude',
}

export const STATUS_STYLE: Record<ChangelogStatus, string> = {
  shipped: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
  planned: 'bg-amber-50 text-amber-700 border-amber-200',
  considering: 'bg-slate-100 text-slate-700 border-slate-200',
}

// ── Changelog réel basé sur les PRs livrées récemment ─────────────────
// Maintenir cette liste en ordre antichronologique (le plus récent en haut).

export const changelog: ChangelogItem[] = [
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Produit',
    title: 'Page Intégrations',
    description: 'Nouvelle page /integrations/ documentant les 14 connecteurs Proprely sur 7 catégories.',
    details: [
      'Silae (paie), Brevo (email), Export CSV/Excel : disponibles',
      'Pennylane, Qonto, Chorus Pro : en bêta',
      'Google Calendar, Slack, Tiime, Memo Bank : roadmap',
    ],
    link: { to: '/integrations', label: 'Voir les intégrations' },
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Produit',
    title: 'Page Cas clients',
    description: 'Structure de cas clients prête à recevoir les retours détaillés des fondateurs.',
    link: { to: '/cas-clients', label: 'Voir la page' },
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Produit',
    title: 'Tarifs : tableau comparatif chiffré + FAQ étoffée',
    description: 'Comparaison Excel/WhatsApp vs Proprely sur 7 postes, FAQ doublée à 10 questions, schemas Product + Offer.',
    link: { to: '/tarifs', label: 'Voir les tarifs' },
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'UI/UX',
    title: 'Trust indicators dans Hero et Pricing',
    description: 'Bandeau social proof avec 3 indicateurs vérifiables (places fondateurs, conçu en France, onboarding 30 min).',
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Intégrations',
    title: 'Capture leads Brevo automatisée',
    description: 'Newsletter + lead magnets remontent automatiquement dans Brevo via API serverless edge, RGPD-compliant.',
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Sécurité',
    title: 'Page Sécurité & RGPD',
    description: 'Page dédiée avec 6 piliers sécurité, sous-traitants documentés, droits RGPD, FAQ détaillée. DPA disponible.',
    link: { to: '/securite-rgpd', label: 'Voir la page' },
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Intégrations',
    title: 'Pixels Meta + LinkedIn Insight Tag',
    description: 'Initialisation avec gating consentement, déclenchement sur leads et page views.',
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'UI/UX',
    title: 'Header et footer SaaS B2B mature',
    description: 'Mega-menu Solutions (par contexte + par douleur), footer 5 colonnes avec colonne Entreprise, CTA Audit gratuit + Rejoindre la bêta.',
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Produit',
    title: 'Landing /fonctionnalites/ par modules',
    description: '4 modules connectés (Clients & sites, Devis & ventes, Planning & agents, Missions & preuve), diagramme de flux, 6 value props.',
    link: { to: '/fonctionnalites', label: 'Voir les fonctionnalités' },
  },
  {
    date: '2026-06-07',
    dateLabel: '7 juin 2026',
    status: 'shipped',
    category: 'Contenu',
    title: 'Article : Créer une société de nettoyage',
    description: 'Guide complet en 10 étapes (statut, BP, démarches, IDCC 3043, matériel, recrutement, prospection).',
    link: { to: '/blog/creer-societe-nettoyage', label: 'Lire l\'article' },
  },

  // ── In progress ────────────────────────────────────────────────────
  {
    date: '2026-06-15',
    dateLabel: 'Juin 2026',
    status: 'in_progress',
    category: 'Produit',
    title: 'Module Devis intelligent IA — phase 2',
    description: 'Affinement de l\'algorithme 9 facteurs avec retours des fondateurs : pondération par secteur, gestion des appels d\'offres.',
  },
  {
    date: '2026-06-15',
    dateLabel: 'Juin 2026',
    status: 'in_progress',
    category: 'Intégrations',
    title: 'Pennylane : synchronisation factures',
    description: 'Bêta technique en cours avec 2 fondateurs. Lancement public visé fin juin.',
  },
  {
    date: '2026-06-30',
    dateLabel: 'Fin juin 2026',
    status: 'in_progress',
    category: 'Contenu',
    title: 'Collecte des 3 premiers cas clients',
    description: 'Retours détaillés des fondateurs sur leur passage à Proprely : défi initial, mise en place, résultats à 60 et 90 jours.',
  },

  // ── Planned ────────────────────────────────────────────────────────
  {
    date: '2026-07-15',
    dateLabel: 'Q3 2026',
    status: 'planned',
    category: 'Intégrations',
    title: 'Google Calendar : sync interventions',
    description: 'Plannings agents publiés vers Google Calendar pour visibilité encadrement.',
  },
  {
    date: '2026-07-15',
    dateLabel: 'Q3 2026',
    status: 'planned',
    category: 'Produit',
    title: 'Application mobile native (PWA renforcée)',
    description: 'Mode hors-ligne, notifications push pour les rappels d\'intervention, scan QR amélioré.',
  },
  {
    date: '2026-09-01',
    dateLabel: 'Q3 2026',
    status: 'planned',
    category: 'Sécurité',
    title: 'Certification ISO 27001 — préparation',
    description: 'Audit blanc et mise en conformité documentaire en vue d\'une certification post-bêta.',
  },
  {
    date: '2026-10-15',
    dateLabel: 'Q4 2026',
    status: 'planned',
    category: 'Intégrations',
    title: 'Chorus Pro Factur-X généralisé',
    description: 'Émission native conforme à la réforme facturation électronique 2027.',
  },
  {
    date: '2026-10-15',
    dateLabel: 'Q4 2026',
    status: 'planned',
    category: 'Produit',
    title: 'Cockpit dirigeant : KPI prédictifs',
    description: 'Marge prévisionnelle par contrat, alertes dérive, recommandations IA fondées sur les patterns terrain.',
  },
  {
    date: '2026-10-15',
    dateLabel: 'Q4 2026',
    status: 'planned',
    category: 'Intégrations',
    title: 'Slack : notifications critiques',
    description: 'Mission en retard, agent absent, devis signé : push dans le canal Slack de l\'équipe d\'encadrement.',
  },

  // ── Considering ────────────────────────────────────────────────────
  {
    date: '2027-01-01',
    dateLabel: '2027',
    status: 'considering',
    category: 'Produit',
    title: 'Module DPO automatisé (RGPD)',
    description: 'Pour aider les petites structures à gérer registre des traitements, demandes de droits, sous-traitants.',
  },
  {
    date: '2027-01-01',
    dateLabel: '2027',
    status: 'considering',
    category: 'Produit',
    title: 'Portail client public',
    description: 'Espace de demandes des clients (signaler un problème, télécharger les preuves de passage, valider une intervention).',
  },
  {
    date: '2027-01-01',
    dateLabel: '2027',
    status: 'considering',
    category: 'Intégrations',
    title: 'Microsoft Teams (alternative à Slack)',
    description: 'Pour les sociétés qui utilisent l\'écosystème Microsoft 365 plutôt que Slack.',
  },
]
