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
    <section id="probleme" className="bg-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-red-50 text-red-600 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            La réalité aujourd'hui
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E] mb-3">
            Diriger une société de nettoyage, ce n'est pas simple
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-2xl mx-auto">
            Si l'une de ces situations vous parle, vous n'êtes pas seul. C'est le quotidien de la plupart des dirigeants de PME de propreté.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-[#FEF2F2] rounded-xl p-3 sm:p-4 border border-red-100 flex items-start gap-3"
            >
              <XCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs sm:text-sm text-[#2D3E50]">{pain}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
