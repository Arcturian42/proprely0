import { motion } from 'framer-motion'
import { Calendar, Target, BarChart3, Smartphone, CheckCircle } from 'lucide-react'

const universes = [
  {
    icon: Calendar,
    gradient: 'linear-gradient(135deg, #00C2E0, #0099b8)',
    glow: 'rgba(0,194,224,0.25)',
    title: 'Vos Opérations',
    subtitle: 'Gardez le contrôle, même quand tout bouge',
    items: ['Planning drag & drop avec alertes', 'Affectation des agents par site', 'Gestion des remplacements'],
  },
  {
    icon: Target,
    gradient: 'linear-gradient(135deg, #1A4FAF, #0F2D5E)',
    glow: 'rgba(26,79,175,0.25)',
    title: 'Votre Commercial',
    subtitle: 'Transformez plus vite vos demandes en clients signés',
    items: ['Devis professionnels en 2 clics', 'Relances automatisées', 'Historique client complet'],
  },
  {
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #0F2D5E, #0a1f40)',
    glow: 'rgba(15,45,94,0.3)',
    title: 'Votre Pilotage',
    subtitle: 'Prenez vos décisions avec des chiffres clairs',
    items: ['Tableau de bord en temps réel', 'CA, rentabilité, taux de réalisation', 'Heures facturées vs effectuées'],
  },
  {
    icon: Smartphone,
    gradient: 'linear-gradient(135deg, #00C2E0, #1A4FAF)',
    glow: 'rgba(0,194,224,0.2)',
    title: 'Vos Agents Terrain',
    subtitle: 'Un outil simple, même sans formation',
    items: ['Planning mobile accessible partout', 'QR code + check-in géolocalisé', 'Photos, signature client sur téléphone'],
  },
]

export default function FourSpaces() {
  return (
    <section id="univers" className="py-14 sm:py-24" style={{ background: '#F0F4F8' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Quatre univers. <span className="gradient-text">Un seul logiciel.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {universes.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group rounded-2xl p-5 sm:p-6 card-hover cursor-default"
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: u.gradient, boxShadow: `0 6px 16px ${u.glow}` }}>
                <u.icon size={18} className="text-white" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0F2D5E] mb-1">{u.title}</h3>
              <p className="text-[11px] sm:text-xs text-[#8A9AA0] mb-4">{u.subtitle}</p>
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
