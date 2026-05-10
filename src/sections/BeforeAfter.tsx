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
    <section className="py-14 sm:py-24" style={{ background: '#F0F4F8' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.1)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            Avant / Après
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Imaginez votre entreprise dans 3 mois
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-6 sm:p-7"
            style={{ background: '#fff', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <XCircle size={18} className="text-red-500" />
              <h3 className="text-sm sm:text-base font-bold text-[#0F2D5E]">Avant Proprely</h3>
            </div>
            <div className="space-y-3.5">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-6 sm:p-7 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #0F2D5E 0%, #0d3872 100%)',
              border: '1px solid rgba(0,194,224,0.3)',
              boxShadow: '0 0 40px rgba(0,194,224,0.12)',
            }}
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,194,224,0.15) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div className="flex items-center gap-2 mb-6 relative">
              <CheckCircle size={18} className="text-[#00C2E0]" />
              <h3 className="text-sm sm:text-base font-bold text-white">Avec Proprely</h3>
            </div>
            <div className="space-y-3.5 relative">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle size={14} className="text-[#00C2E0] mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
