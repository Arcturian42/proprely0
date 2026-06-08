import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Cpu, Zap, Layers, Globe } from 'lucide-react'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

// Vision marketing présentée publiquement. NE révèle PAS le détail interne
// (50 modules, dates précises, mitigations, KPIs business). Garde uniquement
// les promesses high-level et les capacités client-facing par phase.

type Phase = {
  code: string
  codeName: string
  period: string
  status: 'in_progress' | 'next' | 'upcoming'
  statusLabel: string
  promise: string
  capabilities: string[]
  accent: { from: string; to: string; ring: string; text: string; glow: string }
}

const PHASES: Phase[] = [
  {
    code: 'MVP',
    codeName: 'Build the Core',
    period: 'Juin 2026',
    status: 'in_progress',
    statusLabel: 'En cours',
    promise: "J'organise mon activité et structure mon acquisition.",
    capabilities: [
      'Centralisation clients, sites, agents et missions',
      'Planning multi-sites avec gestion des fréquences',
      'Pipeline commercial enrichi automatiquement',
    ],
    accent: {
      from: 'from-blue-500',
      to: 'to-cyan-400',
      ring: 'ring-blue-500/40',
      text: 'text-blue-300',
      glow: 'bg-blue-500/20',
    },
  },
  {
    code: 'V0',
    codeName: 'Connect the Field',
    period: 'Juin 2026',
    status: 'next',
    statusLabel: 'Prochaine étape',
    promise: 'Mes agents sont connectés. Ma trésorerie est visible.',
    capabilities: [
      'App mobile agent sans installation (lien web)',
      'Pointage GPS, photos et checklists terrain',
      'Connexion banque pro et visibilité financière temps réel',
    ],
    accent: {
      from: 'from-cyan-400',
      to: 'to-teal-400',
      ring: 'ring-cyan-400/40',
      text: 'text-cyan-300',
      glow: 'bg-cyan-400/20',
    },
  },
  {
    code: 'V1',
    codeName: 'Prove the Work',
    period: 'Juillet 2026',
    status: 'upcoming',
    statusLabel: 'À venir',
    promise: 'Je prouve mon travail et je capture mes leads.',
    capabilities: [
      'Preuve de passage automatique côté client (lien magique)',
      'Rentabilité par contrat en temps réel',
      'Formulaires de devis publics avec attribution source',
    ],
    accent: {
      from: 'from-emerald-400',
      to: 'to-green-500',
      ring: 'ring-emerald-400/40',
      text: 'text-emerald-300',
      glow: 'bg-emerald-400/20',
    },
  },
  {
    code: 'V2',
    codeName: 'Operate at Scale',
    period: 'Juillet 2026',
    status: 'upcoming',
    statusLabel: 'À venir',
    promise: "J'opère à l'échelle, en pleine conformité française.",
    capabilities: [
      'Conformité IDCC 3043 native + habilitations agents',
      'Portail client white-label avec tickets',
      'Intégration directe au site web du dirigeant',
    ],
    accent: {
      from: 'from-violet-500',
      to: 'to-purple-500',
      ring: 'ring-violet-500/40',
      text: 'text-violet-300',
      glow: 'bg-violet-500/20',
    },
  },
  {
    code: 'V3',
    codeName: 'AI-Native Cockpit',
    period: 'Août 2026',
    status: 'upcoming',
    statusLabel: 'À venir',
    promise: 'Mon SaaS pense avec moi. Il devient un copilote.',
    capabilities: [
      'Assistant IA devis : 9 facteurs croisés en temps réel',
      "Smart Scheduling — recommandation d'affectation par contexte",
      'Voice-to-action multilingue sur le terrain',
    ],
    accent: {
      from: 'from-orange-500',
      to: 'to-amber-400',
      ring: 'ring-orange-500/40',
      text: 'text-orange-300',
      glow: 'bg-orange-500/20',
    },
  },
]

const BEYOND = [
  { icon: Cpu, title: 'Computer Vision', desc: 'Validation propreté par photo, dataset propriétaire' },
  { icon: Zap, title: 'Conformité prédictive', desc: 'Veille URSSAF + droit du travail automatisée' },
  { icon: Layers, title: 'Marketplace partenaires', desc: 'Pennylane, Sage, EBP, Cegid, assurances métier' },
  { icon: Globe, title: 'Europe', desc: 'Belgique, Suisse, Luxembourg puis Allemagne, Espagne' },
]

export default function RoadmapVision() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 text-white py-20 sm:py-28">
      {/* Background effects */}
      <div className="absolute inset-0 -z-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200 mb-6"
          >
            <Sparkles size={12} className="text-blue-300" />
            Vision stratégique · 76 jours, 5 paliers
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto"
          >
            De l'opération à l'intelligence —
            <br />
            <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent">
              le premier cockpit IA-native
            </span>{' '}
            pour la propreté B2B
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            Cinq paliers, chacun ajoute une couche défendable. <strong className="text-white">Organiser</strong>, <strong className="text-white">connecter</strong>,{' '}
            <strong className="text-white">prouver</strong>, <strong className="text-white">industrialiser</strong>, <strong className="text-white">optimiser</strong>. Au terme : un système métier vertical qui pense avec le dirigeant.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-violet-500/30 to-orange-500/0"
          />

          <div className="space-y-8 lg:space-y-16">
            {PHASES.map((phase, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.article
                  key={phase.code}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: 0.05 }}
                  className={`relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 items-start`}
                >
                  {/* Left content (or empty) */}
                  <div className={`hidden lg:block ${isLeft ? '' : 'order-3'}`}>
                    {isLeft && <PhaseCard phase={phase} />}
                  </div>

                  {/* Center marker */}
                  <div className="hidden lg:flex flex-col items-center pt-2 order-2 lg:order-none">
                    <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${phase.accent.from} ${phase.accent.to} flex items-center justify-center text-white font-black text-sm shadow-2xl ${phase.accent.glow ? `shadow-${phase.accent.from.replace('from-', '')}/40` : ''}`}>
                      <div className={`absolute inset-0 rounded-full ${phase.accent.glow} blur-md -z-10`} />
                      {phase.code}
                    </div>
                  </div>

                  {/* Right content (or empty) */}
                  <div className={`${isLeft ? 'lg:order-3 hidden lg:block' : 'lg:order-1'}`}>
                    {!isLeft && <PhaseCard phase={phase} />}
                  </div>

                  {/* Mobile: always show card with inline marker */}
                  <div className="lg:hidden">
                    <PhaseCard phase={phase} showMobileMarker />
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* Beyond V3 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-28"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-200 mb-4">
              <Sparkles size={11} className="text-violet-300" />
              Au-delà
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 leading-tight">
              La direction long terme
            </h3>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Après le cockpit IA-native, la suite : moats données, conformité prédictive, expansion européenne.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BEYOND.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="relative bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 border border-white/10 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-violet-200" />
                  </div>
                  <div className="text-sm font-black text-white mb-1">{b.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{b.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-3">
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'roadmap_vision' })}
              className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 rounded-xl px-7 py-4 font-black text-sm hover:bg-slate-100 transition-all shadow-2xl shadow-blue-500/20 hover:-translate-y-0.5"
            >
              Rejoindre la bêta privée
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              to="/fonctionnalites"
              className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-white/10 transition-colors"
            >
              Voir les fonctionnalités livrées
            </Link>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Une nouvelle phase livrée tous les 15-16 jours · Onboarding 30 min avec le fondateur
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PhaseCard({ phase, showMobileMarker = false }: { phase: Phase; showMobileMarker?: boolean }) {
  const statusBadge =
    phase.status === 'in_progress'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
      : phase.status === 'next'
        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
        : 'bg-white/5 text-slate-400 border-white/10'

  return (
    <div className="relative">
      {/* Subtle glow behind card */}
      <div className={`absolute -inset-2 ${phase.accent.glow} rounded-3xl blur-2xl opacity-50 -z-10`} />

      <div className="relative bg-slate-900/70 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 hover:border-white/20 transition-colors">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {showMobileMarker && (
            <div className={`lg:hidden w-9 h-9 rounded-full bg-gradient-to-br ${phase.accent.from} ${phase.accent.to} flex items-center justify-center text-white font-black text-xs shadow-lg shrink-0`}>
              {phase.code}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className={`text-[10px] font-bold uppercase tracking-widest ${phase.accent.text}`}>
              {phase.codeName}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{phase.period}</div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border px-2.5 py-1 ${statusBadge}`}
          >
            {phase.status === 'in_progress' && (
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
              </span>
            )}
            {phase.statusLabel}
          </span>
        </div>

        <p className="text-lg sm:text-xl font-black text-white leading-tight mb-4 italic">
          « {phase.promise} »
        </p>

        <ul className="space-y-2">
          {phase.capabilities.map((c, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.accent.from} ${phase.accent.to} mt-1.5 shrink-0`} />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
