import { motion } from 'framer-motion'
import { Sparkles, BarChart3, Search, MessageSquare, Zap, Shield, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const agents = [
  {
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #0F2D5E, #1A4FAF)',
    glow: 'rgba(15,45,94,0.3)',
    title: 'CFO IA',
    subtitle: 'Vos chiffres, décryptés',
    desc: 'Analyse vos marges, contrats, charges et sites les moins rentables',
  },
  {
    icon: Search,
    gradient: 'linear-gradient(135deg, #1A4FAF, #00C2E0)',
    glow: 'rgba(26,79,175,0.25)',
    title: 'Agent Prospection',
    subtitle: 'Trouve des clients pour vous',
    desc: 'Identifie des prospects locaux et prépare des messages de prise de contact',
  },
  {
    icon: MessageSquare,
    gradient: 'linear-gradient(135deg, #00C2E0, #0099b8)',
    glow: 'rgba(0,194,224,0.25)',
    title: 'CMO IA',
    subtitle: 'Votre communication, simplifiée',
    desc: 'Prépare vos posts LinkedIn, améliore votre visibilité locale',
  },
  {
    icon: Zap,
    gradient: 'linear-gradient(135deg, #0F2D5E, #00C2E0)',
    glow: 'rgba(0,194,224,0.2)',
    title: 'Assistant Opérationnel',
    subtitle: 'Vos opérations, optimisées',
    desc: 'Optimise les plannings, détecte les anomalies, prépare les rapports clients',
  },
]

export default function AIAgentsSection() {
  return (
    <section className="py-14 sm:py-24 relative overflow-hidden" style={{ background: '#F0F4F8' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5 badge-glow"
            style={{ background: '#00C2E0', color: '#0A1F40' }}
          >
            <Sparkles size={13} />
            Exclusivité fondateur — Modules IA
          </motion.div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] mb-3 tracking-tight">
            Construisez avec nous les premiers<br className="hidden sm:block" />
            <span className="gradient-text"> agents IA</span> pour les sociétés de nettoyage
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-2xl mx-auto">
            Nous sélectionnons des dirigeants partenaires pour tester, orienter et co-construire les futurs modules IA de Proprely.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto mb-8">
          {agents.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-5 sm:p-6 card-hover cursor-default"
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: a.gradient, boxShadow: `0 8px 20px ${a.glow}` }}>
                <a.icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F2D5E] mb-0.5">{a.title}</h3>
              <div className="text-xs font-bold text-[#00C2E0] mb-2">{a.subtitle}</div>
              <p className="text-xs text-[#5A6B7D]">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 max-w-2xl mx-auto mb-8 flex items-start gap-3"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
        >
          <Lightbulb size={18} className="text-[#00C2E0] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#5A6B7D]">
            Vous n'avez pas besoin d'être technophile : nous construisons ces outils avec vous, à partir de vos vrais problèmes terrain. Pas de jargon, pas de formation complexe.
          </p>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
          <button
            onClick={() => scrollTo('formulaire')}
            className="inline-flex items-center justify-center gap-2 rounded-full px-7 sm:px-9 py-3.5 font-bold text-sm transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #0F2D5E, #1A4FAF)', color: '#fff', boxShadow: '0 8px 24px rgba(15,45,94,0.3)' }}
          >
            Devenir société partenaire IA
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollTo('fondateur')}
            className="inline-flex items-center justify-center rounded-full px-7 sm:px-9 py-3.5 font-medium text-sm transition-all duration-200 hover:bg-[#0F2D5E]/5"
            style={{ border: '1px solid rgba(15,45,94,0.2)', color: '#0F2D5E' }}
          >
            Découvrir l'offre fondateur
          </button>
        </div>

        {/* Micro-copy */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-[#8A9AA0]">
          <span className="flex items-center gap-1.5"><Shield size={10} className="text-[#00C2E0]" /> Réservé aux premières sociétés sélectionnées</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={10} className="text-[#00C2E0]" /> Aucun engagement</span>
          <span className="flex items-center gap-1.5"><Sparkles size={10} className="text-[#00C2E0]" /> Accès prioritaire aux futurs modules IA</span>
        </div>
      </div>
    </section>
  )
}
