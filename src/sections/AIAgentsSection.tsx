import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Search, MessageSquare, Zap, Shield, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const agents = [
  {
    icon: BarChart3,
    bg: '#0F2D5E',
    title: 'CFO IA',
    subtitle: 'Vos chiffres, décryptés',
    desc: 'Analyse vos marges, contrats, charges et sites les moins rentables',
  },
  {
    icon: Search,
    bg: '#1A4FAF',
    title: 'Agent Prospection',
    subtitle: 'Trouve des clients pour vous',
    desc: 'Identifie des prospects locaux et prépare des messages de prise de contact',
  },
  {
    icon: MessageSquare,
    bg: '#00C2E0',
    title: 'CMO IA',
    subtitle: 'Votre communication, simplifiée',
    desc: 'Prépare vos posts LinkedIn, améliore votre visibilité locale',
  },
  {
    icon: Zap,
    bg: '#0F2D5E',
    title: 'Assistant Opérationnel',
    subtitle: 'Vos opérations, optimisées',
    desc: 'Optimise les plannings, détecte les anomalies, prépare les rapports clients',
  },
]

export default function AIAgentsSection() {
  return (
    <section className="bg-[#F0F4F8] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#00C2E0] text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-4">
            <Sparkles size={14} />
            Exclusivité fondateur, Modules IA
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E] mb-3">
            L'IA arrive dans le nettoyage.<br className="hidden sm:block" /> Vous voulez l'orienter ?
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-2xl mx-auto">
            Nous sélectionnons des dirigeants partenaires pour tester, orienter et co-construire les futurs modules IA de Proprely : prospection, pilotage financier, marketing local, planning intelligent et reporting qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-8">
          {agents.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-[box-shadow,transform] duration-300 ease-[var(--ease-out)]"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: a.bg }}>
                <a.icon size={18} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#0F2D5E] mb-0.5">{a.title}</h3>
              <div className="text-xs font-semibold text-[#00C2E0] mb-2">{a.subtitle}</div>
              <p className="text-xs text-[#5A6B7D]">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 max-w-2xl mx-auto mb-8 flex items-start gap-3">
          <Lightbulb size={18} className="text-[#00C2E0] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#5A6B7D]">
            Vous n'avez pas besoin d'être technophile : nous construisons ces outils avec vous, à partir de vos vrais problèmes terrain. Pas de jargon, pas de formation complexe. Juste des outils qui vous font gagner du temps et de l'argent.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('beta_cta_click', { location: 'home_ai_agents' })}
            className="bg-[#0F2D5E] text-white rounded-full px-6 sm:px-8 py-3 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.97] transition-transform duration-200 ease-[var(--ease-out)]"
          >
            Devenir société partenaire IA
            <ArrowRight size={16} />
          </a>
          <button
            onClick={() => scrollTo('fondateur')}
            className="border border-[#0F2D5E] text-[#0F2D5E] rounded-full px-6 sm:px-8 py-3 font-medium hover:bg-[#0F2D5E]/5 active:scale-[0.97] transition-[background-color,transform] duration-200 ease-[var(--ease-out)]"
          >
            Découvrir l'offre fondateur
          </button>
        </div>

        {/* Micro-copy */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-[#5A6B7D]">
          <span className="flex items-center gap-1"><Shield size={10} className="text-[#00C2E0]" /> Réservé aux premières sociétés sélectionnées</span>
          <span className="flex items-center gap-1"><CheckCircle size={10} className="text-[#00C2E0]" /> Aucun engagement</span>
          <span className="flex items-center gap-1"><Sparkles size={10} className="text-[#00C2E0]" /> Accès prioritaire aux futurs modules IA</span>
        </div>
      </div>
    </section>
  )
}
