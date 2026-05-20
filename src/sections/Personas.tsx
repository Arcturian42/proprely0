import { motion } from 'framer-motion'
import { ArrowRight, Building2, Users, MapPin, Award } from 'lucide-react'
import Link from '../components/Link'

const personas = [
  {
    icon: Building2,
    title: "PME en structuration",
    range: "3 à 15 agents",
    description: "Vous quittez Excel et WhatsApp pour passer à un outil pro. Centralisation des clients, planning lisible, devis qui sortent en 2 minutes. Onboarding 30 min, vous êtes opérationnel le jour même.",
    target: '/fonctionnalites/planning-nettoyage',
    cta: 'Découvrir le planning',
  },
  {
    icon: Users,
    title: "Société en croissance",
    range: "15 à 50 agents",
    description: "Vous gagnez des contrats plus vite que vous n'arrivez à structurer. Marge par client en temps réel, alertes surmenage agents, preuve de passage native. Vous reprenez la main sur la rentabilité.",
    target: '/fonctionnalites/gestion-agents-nettoyage',
    cta: 'Découvrir la gestion agents',
  },
  {
    icon: Award,
    title: "Spécialiste B2B exigeant",
    range: "Syndics, hôtels, médical, industrie",
    description: "Vos clients exigent traçabilité et reporting standardisé. QR code par site, photos avant/après horodatées, PV automatique envoyé au gestionnaire. Conforme aux exigences syndics et ISO.",
    target: '/fonctionnalites/preuve-passage-nettoyage',
    cta: 'Découvrir la preuve de passage',
  },
  {
    icon: MapPin,
    title: "Multi-sites en grande ville",
    range: "Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes",
    description: "Vous opérez sur plusieurs métropoles ou plusieurs zones d'une grande ville. Optimisation des tournées, fiches site avec protocoles spécifiques, planning consultable agents sur leur téléphone sans app.",
    target: '/villes',
    cta: 'Voir les pages villes',
  },
]

export default function Personas() {
  return (
    <section id="pour-qui" className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Pour qui</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
            Conçu pour les sociétés de nettoyage B2B françaises
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Quatre profils types parmi les sociétés que nous accompagnons. Le produit s'adapte à votre stade, pas l'inverse.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {personas.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  to={p.target}
                  className="group block h-full bg-slate-50 rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform,background-color] duration-200 ease-[var(--ease-out)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 group-hover:bg-blue-100 rounded-full px-2 py-0.5 transition-colors">
                      {p.range}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    {p.cta}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-slate-500 mt-10"
        >
          Pas conçu pour : le nettoyage particulier domestique (B2C), ni les grands groupes industriels (200+ agents).
        </motion.p>
      </div>
    </section>
  )
}
