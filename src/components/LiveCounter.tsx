import { useEffect, useState, useRef } from 'react'
import { TrendingUp, Clock, Building2 } from 'lucide-react'
import { FOUNDER_SPOTS } from '../config'

// Hypothèses calibrées pour rester honnêtes :
// - chaque fondateur économise ~6 h/semaine d'admin grâce au cockpit
// - bêta démarrée le 1er janvier 2026 (date publique du lancement)
// - 47 semaines actives par an (vacances déduites)
const HOURS_SAVED_PER_FOUNDER_PER_WEEK = 6
const BETA_START = new Date('2026-01-01T00:00:00Z').getTime()

function weeksSinceBetaStart(): number {
  const elapsedMs = Date.now() - BETA_START
  if (elapsedMs <= 0) return 0
  const weeks = elapsedMs / (1000 * 60 * 60 * 24 * 7)
  // Cap à 47 semaines par an pour rester réaliste
  return Math.min(weeks, 47)
}

function estimateHoursSaved(): number {
  const weeks = weeksSinceBetaStart()
  return Math.round(FOUNDER_SPOTS.taken * HOURS_SAVED_PER_FOUNDER_PER_WEEK * weeks)
}

function estimateEurosSaved(): number {
  // Hypothèse coût horaire dirigeant chargé : 45 €/h (cohérent avec /calculateur-roi)
  return estimateHoursSaved() * 45
}

type Stat = { icon: typeof TrendingUp; value: string; label: string; sub?: string }

type Props = {
  variant?: 'strip' | 'card'
  className?: string
  /** Anime l'apparition au scroll si true */
  animate?: boolean
}

export default function LiveCounter({ variant = 'strip', className = '', animate = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hoursDisplayed, setHoursDisplayed] = useState(0)
  const [eurosDisplayed, setEurosDisplayed] = useState(0)
  const [visible, setVisible] = useState(!animate)

  const targetHours = estimateHoursSaved()
  const targetEuros = estimateEurosSaved()

  useEffect(() => {
    if (!animate || !ref.current) return
    const node = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [animate])

  useEffect(() => {
    if (!visible) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration)
      const ease = 1 - Math.pow(1 - progress, 3)
      setHoursDisplayed(Math.round(targetHours * ease))
      setEurosDisplayed(Math.round(targetEuros * ease))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, targetHours, targetEuros])

  const stats: Stat[] = [
    {
      icon: Building2,
      value: `${FOUNDER_SPOTS.taken}`,
      label: 'Fondateurs actifs',
      sub: `sur ${FOUNDER_SPOTS.total} places`,
    },
    {
      icon: Clock,
      value: `${hoursDisplayed.toLocaleString('fr-FR')} h`,
      label: "Heures cumulées récupérées",
      sub: "depuis le lancement de la bêta",
    },
    {
      icon: TrendingUp,
      value: `${(eurosDisplayed / 1000).toFixed(1).replace('.', ',')} k€`,
      label: 'Coût caché évité',
      sub: 'estimation cumulée fondateurs',
    },
  ]

  if (variant === 'card') {
    return (
      <div ref={ref} className={`grid sm:grid-cols-3 gap-4 ${className}`}>
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <Icon size={18} className="text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 tabular-nums leading-tight">{s.value}</div>
              <div className="text-xs font-bold text-slate-700 mt-1">{s.label}</div>
              {s.sub && <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>}
            </div>
          )
        })}
      </div>
    )
  }

  // variant === 'strip'
  return (
    <div ref={ref} className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ${className}`}>
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.label} className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Icon size={14} className="text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900 tabular-nums leading-tight">{s.value}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{s.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
