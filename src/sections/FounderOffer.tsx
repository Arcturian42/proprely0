import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, ArrowRight, Sparkles, Headphones, Lightbulb, Zap, BadgePercent } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots, progressPercent } from '../config'
import AnimatedCounter from '../components/AnimatedCounter'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const advantages = [
  {
    icon: Sparkles,
    title: 'Accès bêta 100% gratuit',
    desc: "Tous les modules, sans limite d'agents ni de sites, pendant toute la durée de la bêta.",
  },
  {
    icon: Headphones,
    title: 'Onboarding accompagné',
    desc: "Mise en route avec le fondateur. Vos sites, agents et clients configurés en 30 minutes lors d'un appel.",
  },
  {
    icon: Lightbulb,
    title: 'Influence sur la feuille de route',
    desc: "Vos besoins remontés en direct à l'équipe produit deviennent les prochaines fonctionnalités prioritaires.",
  },
  {
    icon: Zap,
    title: 'Accès prioritaire au support',
    desc: "Un interlocuteur dédié qui connaît votre dossier. Réponse sous 4h en semaine, sans ticket numéroté.",
  },
  {
    icon: BadgePercent,
    title: 'Conditions préférentielles à vie',
    desc: "Quand on passera au prix public, vous gardez un tarif fondateur réservé exclusivement aux premières entreprises.",
  },
]

export default function FounderOffer() {
  const remaining = remainingSpots()
  const percentFull = progressPercent()
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [spotlightVisible, setSpotlightVisible] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <section
      id="fondateur"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setSpotlightVisible(true)}
      onMouseLeave={() => setSpotlightVisible(false)}
      className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-28 overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-500 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky-500 opacity-15 blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden md:block"
        style={{
          opacity: spotlightVisible ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.18), transparent 55%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/15 backdrop-blur border border-sky-400/30 text-sky-300 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
            <Award size={14} />
            Programme membres fondateurs · {FOUNDER_SPOTS.total} entreprises
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Construisez Proprely<br />
            <span className="text-sky-400">avec nous, pas pour nous</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Nous sélectionnons {FOUNDER_SPOTS.total} sociétés de nettoyage pour participer à la bêta privée. Cinq avantages exclusifs, réservés aux premières entreprises sélectionnées.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 mb-10 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                <AnimatedCounter to={FOUNDER_SPOTS.taken} duration={1.4} />
                <span className="text-sky-400"> / {FOUNDER_SPOTS.total}</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">dirigeants sélectionnés</div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-sky-400">
                <AnimatedCounter to={remaining} suffix=" places" duration={1.4} />
              </div>
              <div className="text-xs text-slate-400 mt-1">restantes</div>
            </div>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentFull}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>

        <ol className="border-t border-white/10 mb-12">
          {advantages.map((a, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group grid grid-cols-[40px,1fr] sm:grid-cols-[60px,150px,1fr] gap-x-4 sm:gap-x-8 gap-y-2 py-6 sm:py-7 border-b border-white/10 hover:bg-white/[0.03] transition-colors px-2 -mx-2 rounded-sm"
            >
              <span className="font-mono text-xs sm:text-sm font-bold tabular-nums text-sky-400 pt-1.5">
                0{i + 1}
              </span>
              <div className="col-span-1 sm:col-span-1 flex items-start gap-3 sm:pt-0">
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0">
                  <a.icon size={16} className="text-sky-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight tracking-tight sm:hidden">{a.title}</h3>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="hidden sm:block text-lg font-bold text-white leading-tight tracking-tight mb-2">{a.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{a.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group bg-white text-slate-900 rounded-xl px-8 py-4 font-bold text-base hover:bg-slate-100 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl shadow-blue-500/20 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
          >
            Devenir membre fondateur
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
          </button>
          <p className="text-xs text-slate-400 mt-4">Gratuit pendant la bêta · Pas de carte bancaire · Aucun engagement</p>
        </div>
      </div>
    </section>
  )
}
