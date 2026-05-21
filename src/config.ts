export const FOUNDER_SPOTS = {
  taken: 4,
  total: 30,
} as const

export const remainingSpots = () => FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken
export const progressPercent = () => (FOUNDER_SPOTS.taken / FOUNDER_SPOTS.total) * 100

// URL externe du formulaire de candidature à la bêta privée Proprely (Fillout).
// Utilisée par tous les CTA "Candidater à la bêta" dans l'application,
// en remplacement de l'ancre #formulaire qui dépendait du chargement du
// widget embed sur la home (parfois blanc en arrivée directe).
export const BETA_FORM_URL = 'https://pershingsolution.fillout.com/t/rBPhgNm42Lus'
