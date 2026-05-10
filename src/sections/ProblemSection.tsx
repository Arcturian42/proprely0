import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'

const pains = [
  'Vos plannings sont encore sur Excel, ou pire, sur papier',
  'Vos agents vous appellent pour savoir où ils vont demain',
  'Vos remplacements se font au dernier moment, dans la panique',
  'Vos clients demandent des preuves de passage que vous n\'arrivez pas à fournir',
  'Vos devis et factures prennent des heures chaque semaine',
  'Vous avez zéro visibilité sur le chiffre d\'affaires réel de la semaine',
  'Vous pilotez votre entreprise au feeling, sans chiffres fiables',
  'Vos informations sont dispersées entre WhatsApp, email et des post-it',
]

export default function ProblemSection() {
  return (
    <section id="probleme" className="bg-white py-14 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            La réalité aujourd'hui
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-black text-[#0F2D5E] mb-3 tracking-tight"
          >
            Diriger une société de nettoyage,<br className="hidden sm:block" /> ce n'est pas simple
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-[#5A6B7D] max-w-xl mx-auto"
          >
            Si l'une de ces situations vous parle, vous n'êtes pas seul.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group rounded-2xl p-4 sm:p-5 flex items-start gap-3 card-hover cursor-default"
              style={{
                background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF5F5 100%)',
                border: '1px solid rgba(239,68,68,0.12)',
              }}
            >
              <XCircle size={17} className="text-red-400 mt-0.5 shrink-0 group-hover:text-red-500 transition-colors" />
              <p className="text-xs sm:text-sm text-[#2D3E50] font-medium">{pain}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
