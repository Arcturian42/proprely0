import { motion } from 'framer-motion'
import { Smartphone, FileText, QrCode, BarChart3 } from 'lucide-react'

const results = [
  {
    icon: Smartphone,
    week: 'Semaine 1',
    title: 'Vos agents voient leur planning sur téléphone',
    desc: 'Fini les appels du matin. Vos agents ouvrent un lien, voient leur journée, et partent. Vous gagnez 30 minutes chaque matin.',
  },
  {
    icon: FileText,
    week: 'Semaine 2',
    title: 'Vos devis sont générés en 2 minutes',
    desc: 'Un client demande un devis ? Vous le générez en 2 clics, professionnel, avec votre logo. Fini le Word et la calculatrice.',
  },
  {
    icon: QrCode,
    week: 'Semaine 3',
    title: 'Vous prouvez chaque passage client',
    desc: 'QR code scanné, photo avant/après, signature client. Votre client sait que vous êtes passé. Fini les disputes.',
  },
  {
    icon: BarChart3,
    week: 'Semaine 4',
    title: 'Vous voyez votre CA en temps réel',
    desc: 'Vous ouvrez votre tableau de bord et voyez votre chiffre d\'affaires, vos heures, votre rentabilité. Vous pilotez avec des chiffres.',
  },
]

export default function Results() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Résultats concrets
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E]">
            Ce que vous gagnez dès la première semaine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#F8FAFC] rounded-xl p-4 sm:p-5 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0F2D5E]/10 flex items-center justify-center mb-3">
                <r.icon size={16} className="text-[#0F2D5E]" />
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-[#00C2E0] mb-1">{r.week}</div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#0F2D5E] mb-2">{r.title}</h3>
              <p className="text-[10px] sm:text-xs text-[#5A6B7D]">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
