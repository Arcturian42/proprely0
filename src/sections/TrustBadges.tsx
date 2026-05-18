import { motion } from 'framer-motion'
import { Globe, Lock, ShieldCheck, MapPin, Zap } from 'lucide-react'

const badges = [
  { icon: Globe, label: 'Hébergement Europe' },
  { icon: Lock, label: 'Conforme RGPD' },
  { icon: ShieldCheck, label: 'Connexion SSL' },
  { icon: MapPin, label: 'Conçu en France' },
  { icon: Zap, label: 'Réponse rapide' },
]

export default function TrustBadges() {
  return (
    <section className="bg-white py-7 sm:py-9 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3"
        >
          {badges.map((b) => (
            <motion.li
              key={b.label}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium"
            >
              <b.icon size={16} className="text-blue-600 shrink-0" strokeWidth={2} />
              <span>{b.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
