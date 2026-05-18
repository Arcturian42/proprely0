import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard, Calendar, Users, Building2, ClipboardList, FileText, FolderOpen, MoreHorizontal, Flame, Calculator } from 'lucide-react'
import { FOUNDER_SPOTS, remainingSpots } from '../config'
import { navigate } from '../lib/useRoute'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord' },
  { icon: Calendar, label: 'Planning', active: true },
  { icon: Users, label: 'Agents' },
  { icon: Building2, label: 'Clients & sites' },
  { icon: ClipboardList, label: 'Missions' },
  { icon: FileText, label: 'Devis & factures' },
  { icon: FolderOpen, label: 'Documents' },
]

const missions = [
  { time: '07:00', site: 'Bureaux Atrium · Tour A', agent: 'Marie L.', tag: 'Récurrent', status: 'En cours', statusColor: 'bg-blue-50 text-blue-700 border-blue-100' },
  { time: '08:30', site: 'Hôtel Vivaldi · Étages', agent: 'Karim B.', tag: 'Vitrerie', status: 'Terminé', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  { time: '14:00', site: 'Syndic Foch · Hall', agent: 'Sofia D.', tag: 'Quotidien', status: 'À venir', statusColor: 'bg-slate-100 text-slate-600 border-slate-200' },
  { time: '15:30', site: 'Cabinet médical Dr Mercier', agent: 'Marie L.', tag: 'Remise en état', status: 'À venir', statusColor: 'bg-slate-100 text-slate-600 border-slate-200' },
]

function ProductMockup() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute -inset-6 bg-gradient-to-br from-blue-400/20 via-sky-300/15 to-blue-500/20 blur-3xl rounded-[2.5rem] pointer-events-none" />

      <div className="relative bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(15,42,94,0.25)] border border-slate-200/80 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <div className="w-3 h-3 rounded-full bg-amber-300" />
            <div className="w-3 h-3 rounded-full bg-emerald-300" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-500 font-mono">
              app.proprely.fr/planning
            </div>
          </div>
          <MoreHorizontal size={14} className="text-slate-400" />
        </div>

        <div className="grid grid-cols-12 min-h-[360px] sm:min-h-[420px]">
          <aside className="col-span-3 lg:col-span-3 bg-slate-50/60 border-r border-slate-100 p-3 space-y-0.5">
            <div className="px-2 py-1.5 mb-2">
              <div className="text-xs font-black tracking-tight text-slate-900">Proprely</div>
              <div className="text-[9px] text-slate-400 uppercase tracking-wider">Cockpit</div>
            </div>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] sm:text-[11px] ${
                  item.active
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600'
                }`}
              >
                <item.icon size={12} className="shrink-0" />
                <span className="truncate hidden sm:inline">{item.label}</span>
              </div>
            ))}
          </aside>

          <main className="col-span-9 lg:col-span-9 p-4 sm:p-5 bg-white">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Planning du jour</h3>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Mercredi 22 octobre · 12 interventions planifiées</p>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block">Semaine 43</div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: 'CA mois', value: '24 380 €', trend: '+12%' },
                { label: 'Heures', value: '687 h', trend: '94%' },
                { label: 'Marge', value: '31%', trend: '+3pt' },
              ].map((k) => (
                <div key={k.label} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                  <div className="text-[8px] sm:text-[9px] uppercase text-slate-500 mb-0.5 tracking-wider">{k.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{k.value}</div>
                  <div className="text-[8px] sm:text-[9px] text-emerald-600 font-semibold mt-0.5">{k.trend}</div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {missions.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 bg-white border border-slate-100 rounded-lg text-[10px] sm:text-[11px] hover:border-slate-200 transition-colors"
                >
                  <div className="font-bold text-slate-900 w-9 sm:w-11 shrink-0">{m.time}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-800 font-medium truncate">{m.site}</div>
                    <div className="text-slate-500 text-[9px] sm:text-[10px] hidden sm:block">{m.agent} · {m.tag}</div>
                  </div>
                  <div className={`text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded border ${m.statusColor} shrink-0`}>
                    {m.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const remaining = remainingSpots()

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-20 sm:pt-28 pb-16 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-300/30 blur-3xl animate-blob-1" />
        <div className="absolute top-[25%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-sky-300/30 blur-3xl animate-blob-2" />
        <div className="absolute top-[55%] left-[20%] w-[28rem] h-[28rem] rounded-full bg-indigo-300/20 blur-3xl animate-blob-3" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-blue-200/80 text-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-8 shadow-sm"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-600" />
          </span>
          <span className="uppercase tracking-wider text-[10px]">Bêta privée ouverte aux sociétés de nettoyage</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
        >
          Le cockpit métier des sociétés de nettoyage<br />
          <span className="text-blue-600">qui veulent scaler sans s'épuiser</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Proprely centralise vos clients, sites, agents, plannings, devis et missions dans un seul logiciel métier conçu pour les entreprises de propreté B2B.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
        >
          <Flame size={14} className="text-amber-600" />
          <span>{remaining} places restantes sur {FOUNDER_SPOTS.total}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-4"
        >
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta privée</span>
            <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('/calculateur-roi')}
            className="bg-white border border-slate-200 text-slate-700 rounded-xl px-7 py-4 font-semibold text-base hover:border-slate-300 hover:bg-slate-50 transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <Calculator size={16} className="text-slate-500" />
            Calculer mon économie
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-xs sm:text-sm text-slate-500 mb-14"
        >
          Bêta gratuite, pas de carte bancaire, onboarding accompagné, conçu pour la propreté B2B
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  )
}
