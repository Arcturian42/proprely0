import { FileText, Calendar, Clock, Calculator, type LucideIcon } from 'lucide-react'

export type Resource = {
  slug: string
  title: string
  shortTitle: string
  tag: string
  icon: LucideIcon
  metaTitle: string
  metaDescription: string
  excerpt: string
  description: string
  format: string
  fileSize: string
  filePath?: string
  pageHref?: string
  whatsInside: string[]
  whoFor: string[]
  bestFor: string
  relatedFeatureSlug?: string
  relatedBlogSlugs?: string[]
  keywords: string[]
}

export const resources: Resource[] = [
  {
    slug: 'modele-devis-nettoyage',
    title: 'Modèle de devis nettoyage professionnel (Excel)',
    shortTitle: 'Modèle de devis nettoyage',
    tag: 'Devis',
    icon: FileText,
    metaTitle: 'Modèle de devis nettoyage Excel gratuit · Proprely',
    metaDescription: "Téléchargez gratuitement un modèle de devis pour société de nettoyage : prestations, fréquences, taux horaire, TVA, conditions et signatures. Format Excel / CSV.",
    excerpt: "Un modèle de devis prêt à l'emploi pour société de nettoyage : prestations détaillées, fréquences, calcul automatique du HT/TTC, conditions commerciales et signature.",
    description: "Le modèle de devis utilisé par les sociétés de nettoyage qui veulent répondre vite et structuré. Ouvre dans Excel ou Google Sheets, modifiez les lignes selon votre prestation, exportez en PDF et envoyez à votre client.",
    format: 'Excel / Google Sheets (.csv)',
    fileSize: '< 10 Ko',
    filePath: '/ressources/modele-devis-nettoyage.csv',
    whatsInside: [
      "En-tête société émettrice (raison sociale, SIRET, TVA, contact)",
      "Bloc client structuré (facturation, contact, SIRET)",
      "Numéro de devis, date d'émission, validité",
      "Détail prestations : désignation, fréquence, heures, taux horaire, montant",
      "Exemples chiffrés : bureaux, sanitaires, vitrerie, décapage, remise en état",
      "Bloc consommables et fournitures séparé",
      "Récap financier HT mensuel / annuel + TVA + TTC",
      "Conditions commerciales : durée, préavis, paiement, pénalités, révision",
      "Bloc signatures et mentions Bon pour accord",
    ],
    whoFor: [
      'Dirigeants de société de nettoyage qui veulent professionnaliser leurs devis',
      'Auto-entrepreneurs propreté qui se lancent en B2B',
      'Commerciaux et responsables qui chiffrent plusieurs prestations par semaine',
    ],
    bestFor: "Préparer un devis B2B propre en moins de 15 minutes sans rien oublier.",
    relatedFeatureSlug: 'devis-nettoyage',
    relatedBlogSlugs: ['fixer-prix-nettoyage', 'calcul-heures-agents-nettoyage'],
    keywords: ['modèle devis nettoyage', 'devis nettoyage excel', 'modèle devis société nettoyage', 'exemple devis nettoyage professionnel'],
  },
  {
    slug: 'modele-planning-agents-nettoyage',
    title: 'Modèle de planning hebdomadaire des agents (Excel)',
    shortTitle: 'Modèle de planning agents',
    tag: 'Planning',
    icon: Calendar,
    metaTitle: 'Modèle de planning agents de nettoyage Excel gratuit · Proprely',
    metaDescription: "Téléchargez un modèle de planning hebdomadaire pour vos agents de nettoyage : créneaux matin/soir, sites, spécialités, totaux d'heures et alertes de surcharge.",
    excerpt: "Un planning hebdomadaire prêt à l'emploi avec vos agents en lignes, vos jours en colonnes, et les sites + horaires en cellules. Totaux d'heures et bloc absences inclus.",
    description: "Le modèle de planning hebdomadaire des sociétés de nettoyage qui passent du papier à un cadre structuré. Saisissez vos agents, vos sites, vos créneaux, vos remplacements. Identifiez en un coup d'œil les surcharges, les conflits et les trous de planning.",
    format: 'Excel / Google Sheets (.csv)',
    fileSize: '< 10 Ko',
    filePath: '/ressources/modele-planning-agents-nettoyage.csv',
    whatsInside: [
      "Vue hebdomadaire complète : 7 jours × créneaux matin/soir",
      "Lignes agents avec spécialités (vitrerie, médical, hôtellerie, décapage)",
      "Codes site dans chaque cellule pour aller vite",
      "Référentiel sites séparé : nom, adresse, fréquence, type, accès",
      "Bloc total d'heures par agent et par semaine",
      "Bloc absences / remplacements avec motif et impact sites",
      "Check-list alertes à vérifier : dépassement 35h, conflits créneaux, spécialités",
    ],
    whoFor: [
      'Responsables planning qui jonglent encore entre WhatsApp et papier',
      'Dirigeants TPE qui veulent visualiser la charge réelle de chaque agent',
      "Sociétés en croissance qui passent de 3 à 10+ agents",
    ],
    bestFor: "Avoir une vision claire de la semaine en moins de 10 minutes et anticiper les remplacements.",
    relatedFeatureSlug: 'planning-nettoyage',
    relatedBlogSlugs: ['gestion-societe-nettoyage-outils', 'fideliser-agents-nettoyage-turnover'],
    keywords: ['modèle planning nettoyage', 'planning agents nettoyage excel', 'planning hebdomadaire propreté', 'modèle planning entreprise nettoyage'],
  },
  {
    slug: 'modele-suivi-heures-agents',
    title: "Tableau de suivi des heures agents (Excel)",
    shortTitle: 'Suivi des heures agents',
    tag: 'Heures & paie',
    icon: Clock,
    metaTitle: 'Tableau suivi heures agents nettoyage Excel gratuit · Proprely',
    metaDescription: "Téléchargez un tableau de suivi des heures pour vos agents de nettoyage : saisie par intervention, synthèse mensuelle, heures sup, contrôle légal, coût horaire chargé.",
    excerpt: "Le tableau Excel pour saisir, totaliser et valider les heures de vos agents — intervention par intervention, avec synthèse mensuelle et calcul du coût horaire chargé.",
    description: "Un tableau complet pour passer du suivi sur post-it ou WhatsApp à un suivi rigoureux. Saisie de chaque intervention (date, agent, site, horaires), synthèse mensuelle par agent, contrôle des seuils légaux, calcul du coût horaire chargé pour vos devis.",
    format: 'Excel / Google Sheets (.csv)',
    fileSize: '< 10 Ko',
    filePath: '/ressources/modele-suivi-heures-agents.csv',
    whatsInside: [
      "Tableau de saisie : date, agent, site, heure début, heure fin, total heures",
      "Distinction heures normales / supplémentaires 25% / 50% / dimanche / nuit",
      "Synthèse mensuelle par agent : heures totales + coût brut estimé",
      "Check-list de contrôle légal : 48h hebdo max, repos 11h, repos hebdo 35h, pause 20 min",
      "Calcul détaillé du coût horaire chargé (brut + charges + congés payés + provisions)",
      "Colonne validation par responsable + commentaire",
    ],
    whoFor: [
      'Dirigeants qui veulent fiabiliser les bulletins de paie',
      'Sociétés qui multiplient les agents et les sites',
      'Responsables qui doivent justifier les heures auprès des clients ou de l\'inspection du travail',
    ],
    bestFor: "Fiabiliser la paie, sécuriser le droit du travail et calculer le vrai coût horaire pour vos devis.",
    relatedFeatureSlug: 'gestion-agents-nettoyage',
    relatedBlogSlugs: ['calcul-heures-agents-nettoyage', 'fixer-prix-nettoyage'],
    keywords: ['tableau suivi heures agents', 'suivi heures nettoyage excel', 'feuille de pointage nettoyage', 'coût horaire chargé nettoyage'],
  },
  {
    slug: 'calculateur-roi',
    title: 'Calculateur ROI : combien vous coûte la dispersion ?',
    shortTitle: 'Calculateur ROI',
    tag: 'Outil interactif',
    icon: Calculator,
    metaTitle: 'Calculateur ROI gestion société nettoyage · Proprely',
    metaDescription: "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année en gestion dispersée entre Excel, WhatsApp et Word.",
    excerpt: "Un outil interactif qui calcule, en 30 secondes, le coût réel de votre gestion dispersée entre 6-7 outils non connectés.",
    description: "Renseignez quelques paramètres simples : nombre d'agents, taux horaire dirigeant, outils actuels. L'outil estime le temps perdu chaque semaine en administration et le coût annuel équivalent.",
    format: 'Outil web interactif',
    fileSize: 'Aucun téléchargement',
    pageHref: '/calculateur-roi',
    whatsInside: [
      "Temps réel perdu chaque semaine en administration dispersée",
      "Coût annuel équivalent (heures perdues × taux horaire dirigeant)",
      "ROI estimé si vous centralisiez sur un seul outil",
      "Recommandations selon votre profil (taille, outils actuels)",
    ],
    whoFor: [
      'Dirigeants qui veulent quantifier le coût caché de leur gestion actuelle',
      'Sociétés qui hésitent à investir dans un logiciel métier',
    ],
    bestFor: "Donner un chiffre concret au coût de votre organisation actuelle pour décider en connaissance de cause.",
    keywords: ['calcul roi logiciel nettoyage', 'coût gestion société nettoyage', 'temps perdu administration nettoyage'],
  },
]

export function getResource(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug)
}

export function getDownloadableResources(): Resource[] {
  return resources.filter((r) => r.filePath)
}
