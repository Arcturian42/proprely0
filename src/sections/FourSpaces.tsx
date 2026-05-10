import { motion } from 'framer-motion'
import { Calendar, Target, BarChart3, Smartphone, CheckCircle } from 'lucide-react'

const universes = [
  {
    icon: Calendar,
    bg: '#00C2E0',
    title: 'Vos Opérations',
    subtitle: 'Gardez le contrôle, même quand tout bouge',
    items: ['Planning drag & drop avec alertes', 'Affectation des agents par site', 'Gestion des remplacements'],
  },
  {
    icon: Target,
    bg: '#1A4FAF',
    title: 'Votre Commercial',
    subtitle: 'Transformez plus vite vos demandes en clients signés',
    items: ['Devis professionnels en 2 clics', 'Relances automatisées', 'Historique client complet'],
  },
  {
    icon: BarChart3,
    bg: '#0F2D5E',
    title: 'Votre Pilotage',
    subtitle: 'Prenez vos décisions avec des chiffres clairs',
    items: ['Tableau de bord en temps réel', 'CA, rentabilité, taux de réalisation', 'Heures facturées vs effectuées'],
  },
  {
    icon: Smartphone,
    bg: '#00C2E0',
    title: 'Vos Agents Terrain',
    subtitle: 'Un outil simple, même sans formation',
    items: ['Planning mobile accessible partout', 'QR code + check-in géolocalisé', 'Photos, signature client sur téléphone'],
  },
]

export default function FourSpaces() {
  return (
    <section id="univers" className="bg-[#F0F4F8] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E]">
            Quatre univers. Un seul logiciel.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {universes.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: u.bg }}>
                <u.icon size={18} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#0F2D5E] mb-1">{u.title}</h3>
              <p className="text-xs text-[#5A6B7D] mb-3">{u.subtitle}</p>
              <div className="space-y-2">
                {u.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <CheckCircle size={13} className="text-[#00C2E0] shrink-0" />
                    <span className="text-xs text-[#2D3E50]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
