import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots, progressPercent } from '../config'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const remaining = remainingSpots()
  const percentFull = progressPercent()

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20 sm:pt-28 pb-20 sm:pb-28 overflow-hidden">
      <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur border border-blue-200/80 text-blue-700 rounded-full pl-3 pr-4 py-1.5 text-xs font-semibold mb-8 shadow-sm"
        >
          <span className="flex items-center gap-1.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-600" />
            </span>
            <span className="uppercase tracking-wider text-[10px]">Bêta privée</span>
          </span>
          <span className="w-px h-3 bg-blue-200" />
          <span>{remaining} places restantes sur {FOUNDER_SPOTS.total}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
        >
          Fini les nuits à compter<br />
          <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">les heures à la main.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Rejoignez 30 fondateurs qui construisent le premier logiciel de gestion pensé{' '}
          <span className="text-slate-900 font-semibold">100% pour les sociétés de nettoyage</span> en France.
          Accès privé, tarifs bloqués à vie.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <button
            onClick={() => scrollTo('formulaire')}
            className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Réserver ma place fondateur
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="bg-white/80 backdrop-blur border border-slate-200 text-slate-700 rounded-xl px-7 py-4 font-semibold text-base hover:bg-white hover:border-slate-300 transition-all"
          >
            Voir comment ça fonctionne
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500"
        >
          <span>Pas de carte bancaire</span>
          <span className="text-slate-300">·</span>
          <span>Démo gratuite de 20 min</span>
          <span className="text-slate-300">·</span>
          <span>Réponse sous 24h</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 max-w-md mx-auto"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <span className="font-semibold text-slate-700">{FOUNDER_SPOTS.taken} dirigeants déjà inscrits</span>
            <span>{remaining} places</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentFull}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
