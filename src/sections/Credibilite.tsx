import { motion } from 'framer-motion'
import { Users, Check, Handshake, Headphones } from 'lucide-react'

const items = [
  {
    icon: Users,
    title: 'Immersions terrain',
    desc: 'Nous avons suivi des agents sur le terrain, assisté à des plannings matinaux, et constaté les mêmes problèmes partout.',
  },
  {
    icon: Check,
    title: 'Fonctionnalités utiles',
    desc: 'Pas de fonctions inutiles. Chaque feature correspond à une douleur réelle identifiée lors de ces immersions.',
  },
  {
    icon: Handshake,
    title: 'Construction collaborative',
    desc: 'Les membres fondateurs participent activement à la définition des prochaines fonctionnalités. Vous construisez avec nous.',
  },
  {
    icon: Headphones,
    title: 'Accompagnement fondateur',
    desc: 'Un suivi personnalisé pour chaque entreprise fondatrice. Vous n\'êtes pas un numéro. Vous êtes un partenaire.',
  },
]

export default function Credibilite() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Notre méthode
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E] mb-3">
            Construit avec les vrais besoins du terrain
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-2xl mx-auto">
            Proprely n'est pas conçu dans un bureau. Il est né de 6 mois d'immersion dans des sociétés de nettoyage en région lyonnaise.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0F2D5E]/10 flex items-center justify-center mx-auto mb-3">
                <item.icon size={18} className="text-[#0F2D5E]" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#0F2D5E] mb-2">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-[#5A6B7D]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
