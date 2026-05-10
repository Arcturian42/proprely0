import { motion } from 'framer-motion'
import { Users, Check, Handshake, Headphones } from 'lucide-react'

const items = [
  { icon: Users, title: 'Immersions terrain', desc: 'Nous avons suivi des agents sur le terrain, assisté à des plannings matinaux, et constaté les mêmes problèmes partout.' },
  { icon: Check, title: 'Fonctionnalités utiles', desc: 'Pas de fonctions inutiles. Chaque feature correspond à une douleur réelle identifiée lors de ces immersions.' },
  { icon: Handshake, title: 'Construction collaborative', desc: 'Les membres fondateurs participent activement à la définition des prochaines fonctionnalités. Vous construisez avec nous.' },
  { icon: Headphones, title: 'Accompagnement fondateur', desc: 'Un suivi personnalisé pour chaque entreprise fondatrice. Vous n\'êtes pas un numéro. Vous êtes un partenaire.' },
]

export default function Credibilite() {
  return (
    <section className="py-14 sm:py-24" style={{ background: '#F0F4F8' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.08)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            Notre méthode
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] mb-3 tracking-tight">
            Construit avec les vrais besoins du terrain
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-xl mx-auto">
            Proprely n'est pas conçu dans un bureau. Il est né de 6 mois d'immersion dans des sociétés de nettoyage en région lyonnaise.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center rounded-2xl p-5 card-hover cursor-default"
              style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: 'linear-gradient(135deg, #0F2D5E, #1A4FAF)', boxShadow: '0 6px 16px rgba(15,45,94,0.2)' }}>
                <item.icon size={17} className="text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0F2D5E] mb-2">{item.title}</h3>
              <p className="text-[10px] sm:text-xs text-[#5A6B7D] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
