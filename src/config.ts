export const FOUNDER_SPOTS = {
  taken: 16,
  total: 30,
} as const

export const remainingSpots = () => FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken
export const progressPercent = () => (FOUNDER_SPOTS.taken / FOUNDER_SPOTS.total) * 100

// URL externe du formulaire de candidature à la bêta privée Proprely (Fillout).
// Utilisée par tous les CTA "Candidater à la bêta" dans l'application,
// en remplacement de l'ancre #formulaire qui dépendait du chargement du
// widget embed sur la home (parfois blanc en arrivée directe).
export const BETA_FORM_URL = 'https://pershingsolution.fillout.com/t/rBPhgNm42Lus'

// Auteur principal du blog Proprely et responsable du développement commercial.
// Centralisé pour les schémas Person et l'affichage E-E-A-T sur la page
// À propos et les articles de blog (T22, T23 audit SEO niveau 2).
export const AUTHOR = {
  name: 'Paul Munier',
  jobTitle: 'Business Developer & rédacteur',
  url: 'https://proprely.fr/a-propos',
  linkedin: 'https://www.linkedin.com/in/paulmunier/',
  bio: "Paul Munier est en charge du développement commercial chez Proprely et signe la plupart des articles du blog. Il s'appuie sur des entretiens réguliers avec des dirigeants de sociétés de nettoyage B2B et sur la convention collective IDCC 3043 pour traiter les sujets concrets du métier : tarification, calcul des heures, transferts article 7, fidélisation des agents, choix d'outils.",
  knowsAbout: [
    'Logiciel de gestion société de nettoyage',
    'Convention collective propreté IDCC 3043',
    'Pilotage de marge en propreté B2B',
    'Planning multi-sites pour société de nettoyage',
    'Preuve de passage et conformité syndic',
  ],
} as const
