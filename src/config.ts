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

// Fondateur Proprely. Centralisé pour les schémas Person et l'affichage E-E-A-T
// sur la page À propos et les articles de blog (T22, T23 audit SEO niveau 2).
export const FOUNDER = {
  name: 'Paul Munier',
  jobTitle: 'Fondateur de Proprely',
  url: 'https://proprely.fr/a-propos',
  linkedin: 'https://www.linkedin.com/in/paulmunier/',
  bio: "Paul Munier dirige Proprely. Après plusieurs années à concevoir des logiciels métiers chez Pershing Global Solutions, il a lancé Proprely en interrogeant des dirigeants de sociétés de nettoyage B2B sur leur quotidien : le constat — 6 à 10 heures perdues par semaine entre Excel, WhatsApp, Word et le papier — est devenu la mission du produit.",
  knowsAbout: [
    'Logiciel de gestion société de nettoyage',
    'Convention collective propreté IDCC 3043',
    'Pilotage de marge en propreté B2B',
    'Planning multi-sites pour société de nettoyage',
    'Preuve de passage et conformité syndic',
  ],
} as const
