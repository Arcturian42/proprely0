export const FOUNDER_SPOTS = {
  taken: 4,
  total: 30,
} as const

export const remainingSpots = () => FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken
export const progressPercent = () => (FOUNDER_SPOTS.taken / FOUNDER_SPOTS.total) * 100
