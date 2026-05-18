export const FOUNDER_SPOTS = {
  taken: 12,
  total: 30,
} as const

export const remainingSpots = () => FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken
export const progressPercent = () => (FOUNDER_SPOTS.taken / FOUNDER_SPOTS.total) * 100
