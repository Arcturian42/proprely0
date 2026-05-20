import { motion } from 'framer-motion'
import { ArrowRight, Flame } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots } from '../config'
import Link from '../components/Link'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function FinalCTA() {
  const remaining = remainingSpots()

  return (
    <section className="bg-slate-950 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-400 opacity-10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 rounded-full px-4 py-1.5 text-xs font-bold mb-8">
          <Flame size={14} />
          <span className="tabular-nums">{remaining} places restantes sur {FOUNDER_SPOTS.total}</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6">
          Arrêtez de tout porter<br />
          <span className="text-slate-400">tout seul.</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Rejoignez les sociétés qui construisent Proprely. Accès gratuit pendant la bêta, conditions préférentielles à vie pour les fondateurs.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-6">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative bg-white text-slate-900 rounded-xl px-8 py-4 font-bold text-base hover:bg-slate-100 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-[0.97] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta gratuite</span>
            <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
          </button>
          <Link
            to="/calculateur-roi"
            className="border border-white/20 text-white rounded-xl px-7 py-4 font-semibold text-base hover:bg-white/10 hover:border-white/30 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 inline-flex items-center justify-center"
          >
            Calculer mon économie
          </Link>
        </div>

        <p className="text-xs text-slate-500">Gratuit pendant la bêta, pas de carte bancaire, aucun engagement.</p>
      </motion.div>
    </section>
  )
}
