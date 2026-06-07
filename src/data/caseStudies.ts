// Cas clients — études détaillées des sociétés fondatrices Proprely.
// Tableau vide tant que les retours fondateurs ne sont pas validés écrit.
// La page affiche un fallback "Récits de fondateurs à venir" si vide.

export type CaseStudyMetric = {
  label: string
  value: string
  /** Tendance, optionnel : "up" (bénéfique) ou "down" (douleur résolue) */
  trend?: 'up' | 'down'
}

export type CaseStudy = {
  slug: string
  /** Société anonymisable : "Société tertiaire Paris" ou "Atrium Propreté" */
  companyName: string
  /** Anonymisée : "Société de nettoyage B2B · Paris · 45 agents" */
  companyDescription: string
  /** Secteur : "Tertiaire", "Médical", "Copropriété", "Hôtellerie", "Mixte" */
  sector: string
  /** Taille en agents (nombre approximatif) */
  agentCount: number
  /** Zone géographique */
  region: string
  /** Citation principale, 1-3 phrases du dirigeant */
  pullQuote: string
  /** Nom signataire : "Paul M." ou "Paul Martin" */
  authorName: string
  /** Fonction : "Dirigeant", "Gérant", "Directeur opérationnel" */
  authorRole: string
  /** Date du retour (mois année) : "Mai 2026" */
  collectedAt: string
  /** Problème initial */
  challenge: {
    title: string
    description: string
    bullets: string[]
  }
  /** Solution Proprely mise en place */
  solution: {
    title: string
    description: string
    bullets: string[]
  }
  /** Résultats chiffrés et concrets */
  results: CaseStudyMetric[]
  /** Liens vers pages produit utiles pour ce profil */
  relatedSlugs?: string[]
}

/** Tableau vide volontairement — à remplir avec des retours fondateurs validés
 *  écrit (mail ou DocuSign). Aucune fabrication. */
export const caseStudies: CaseStudy[] = []

// ── Exemple de structure pour remplir un cas réel ────────────────────────────
//
// {
//   slug: 'atrium-proprete-paris',
//   companyName: 'Atrium Propreté',
//   companyDescription: 'Société de nettoyage tertiaire · Paris · 45 agents',
//   sector: 'Tertiaire',
//   agentCount: 45,
//   region: 'Île-de-France',
//   pullQuote: "On a remplacé 4 Excel et un groupe WhatsApp en une matinée. Mes chefs d'équipe ont compris l'outil en 10 minutes. La preuve de passage a coupé court à 3 litiges syndic en un mois.",
//   authorName: 'Paul Martin',
//   authorRole: 'Dirigeant',
//   collectedAt: 'Mai 2026',
//   challenge: {
//     title: "Planning éclaté, marges invisibles",
//     description: "Avec 45 agents sur 80 sites parisiens, la coordination quotidienne mangeait 6 à 8 heures par semaine du dirigeant…",
//     bullets: [
//       "Planning hebdomadaire reconstruit chaque dimanche soir",
//       "Aucune visibilité sur la marge réelle par contrat",
//       "Litiges syndic mensuels sans preuve de passage",
//     ],
//   },
//   solution: {
//     title: "Cockpit unifié avec preuve de passage",
//     description: "Migration vers Proprely en 30 min onboarding. Tous les sites importés depuis Excel, les agents notifiés par lien web, les contrats récurrents paramétrés.",
//     bullets: [
//       "Planning drag-and-drop avec affectation 1-clic",
//       "Preuve de passage QR + photos sur 100 % des sites syndic",
//       "Marge par client en temps réel + alertes dérive",
//     ],
//   },
//   results: [
//     { label: "Heures gagnées / semaine", value: "7 h", trend: 'up' },
//     { label: "Litiges syndic / mois", value: "0", trend: 'down' },
//     { label: "Marge récupérée", value: "+3 pts", trend: 'up' },
//     { label: "Adoption agents", value: "100 % en 1 jour", trend: 'up' },
//   ],
//   relatedSlugs: ['logiciel-societe-nettoyage', 'logiciel-nettoyage-copropriete-syndic'],
// },
