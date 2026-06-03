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

// Auteurs du blog Proprely. Map indexée par slug pour permettre
// l'ajout d'auteurs supplémentaires sans changer la structure. Le clic
// sur la signature renvoie directement vers le profil LinkedIn de l'auteur.
export type Author = {
  slug: string
  name: string
  jobTitle: string
  linkedin: string
  bio: string
  knowsAbout: string[]
}

export const AUTHORS: Record<string, Author> = {
  'paul-munier': {
    slug: 'paul-munier',
    name: 'Paul Munier',
    jobTitle: 'Business Developer & rédacteur',
    linkedin: 'https://www.linkedin.com/in/paulmunier/',
    bio: "Business Developer chez Proprely. Paul s'appuie sur des entretiens réguliers avec des dirigeants de sociétés de nettoyage B2B et sur la convention collective IDCC 3043 pour traiter les sujets concrets du métier.",
    knowsAbout: [
      'Logiciel de gestion société de nettoyage',
      'Convention collective propreté IDCC 3043',
      'Pilotage de marge en propreté B2B',
      'Planning multi-sites pour société de nettoyage',
      'Preuve de passage et conformité syndic',
    ],
  },
}

export const DEFAULT_AUTHOR_SLUG = 'paul-munier'

export const getAuthor = (slug?: string): Author =>
  AUTHORS[slug ?? DEFAULT_AUTHOR_SLUG] ?? AUTHORS[DEFAULT_AUTHOR_SLUG]

// Conservé pour compatibilité avec le code existant qui référence AUTHOR
// (page À propos, schémas). Pointe sur l'auteur par défaut.
export const AUTHOR = AUTHORS[DEFAULT_AUTHOR_SLUG]
