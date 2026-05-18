import { motion } from 'framer-motion'
import { Award, Check, ArrowRight, Lock } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots, progressPercent } from '../config'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const advantages = [
  { title: "Ton tarif d'aujourd'hui, à vie", desc: "Même quand on passera au prix public, tu gardes ton tarif fondateur. Pour toujours." },
  { title: 'Tous les modules, sans limite', desc: "Opérations, CRM, Pilotage — tout est ouvert. Pas de quota d'agents, pas de fonction bridée." },
  { title: 'Mise en route avec le fondateur', desc: "30 minutes d'appel pour configurer ta boîte. Tu repars opérationnel, pas avec un tutoriel à lire." },
  { title: 'Réponse sous 4h en semaine', desc: "Un bug, une question ? Un humain qui connaît ton dossier répond, pas un ticket numéroté." },
  { title: 'Ton avis pèse sur le produit', desc: "Un appel mensuel avec le fondateur. Tes demandes passent en haut de la liste." },
  { title: 'Un dossier traité, pas un email perdu', desc: "Tu n'es pas dans une file d'attente. Tu as un référent qui sait qui tu es et ce que tu fais." },
]

export default function FounderOffer() {
  const remaining = remainingSpots()
  const percentFull = progressPercent()

  return (
    <section id="fondateur" className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 sm:py-28 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-500 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-sky-500 opacity-15 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-500/15 backdrop-blur border border-sky-400/30 text-sky-300 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
            <Award size={14} />
            Sélection fermée à {FOUNDER_SPOTS.total} entreprises
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Construis Proprely<br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">avec nous, pas pour nous</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            On cherche {FOUNDER_SPOTS.total} sociétés de nettoyage pour bâtir Proprely avec nous. En échange, tu gardes ton tarif fondateur pour toujours et un accès direct à l'équipe.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{FOUNDER_SPOTS.taken} <span className="text-sky-400">/ {FOUNDER_SPOTS.total}</span></div>
              <div className="text-xs text-slate-400 mt-1">dirigeants sélectionnés</div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                {remaining} places
              </div>
              <div className="text-xs text-slate-400 mt-1">restantes</div>
            </div>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentFull}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 mb-8 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0">
            <Lock size={18} className="text-sky-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base mb-0.5">Ton tarif est communiqué pendant le premier appel</div>
            <div className="text-slate-400 text-xs sm:text-sm">Conservé à vie · Sans engagement · Annulation à tout moment</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10">
          {advantages.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-sky-500/20 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} className="text-sky-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">{a.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{a.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group bg-white text-slate-900 rounded-xl px-8 py-4 font-bold text-base hover:bg-slate-100 transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Candidater à la bêta
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-400 mt-4">Pas de carte bancaire · Sélection sur dossier · Réponse sous 24h</p>
        </div>
      </div>
    </section>
  )
}
