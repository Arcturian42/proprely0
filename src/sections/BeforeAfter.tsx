import { motion } from 'framer-motion'
import { XCircle, CheckCircle } from 'lucide-react'

const beforeItems = [
  'Plannings dispersés sur Excel, WhatsApp et papier',
  'Agents qui appellent pour connaître leur mission',
  'Preuves de passage inexistantes ou perdues',
  'Devis rédigés à la main, 30 min par client',
  'Pas de visibilité sur le CA de la semaine',
  'Direction qui pilote au feeling',
  'Informations perdues entre les outils',
]

const afterItems = [
  'Un seul calendrier centralisé, accessible partout',
  'Agents qui voient leur planning sur téléphone',
  'QR code, photos et signature client pour chaque passage',
  'Devis générés en 2 clics, professionnels',
  'Tableau de bord avec CA, heures, réalisation',
  'Décisions prises avec des chiffres réels',
  'Tout centralisé : opérations, équipes, clients',
]

export default function BeforeAfter() {
  return (
    <section className="bg-[#F0F4F8] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Avant / Après
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E]">
            Imaginez votre entreprise dans 3 mois
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-red-200"
          >
            <div className="flex items-center gap-2 mb-5">
              <XCircle size={20} className="text-red-500" />
              <h3 className="text-sm sm:text-base font-semibold text-[#0F2D5E]">Avant Proprely</h3>
            </div>
            <div className="space-y-3">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <XCircle size={14} className="text-red-300 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-[#5A6B7D]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0F2D5E] rounded-2xl p-5 sm:p-6 border border-[#00C2E0]"
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={20} className="text-[#00C2E0]" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Avec Proprely</h3>
            </div>
            <div className="space-y-3">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-[#00C2E0] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
