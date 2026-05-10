import { motion } from 'framer-motion'
import { Smartphone, FileText, QrCode, BarChart3 } from 'lucide-react'

const results = [
  {
    icon: Smartphone,
    week: 'Semaine 1',
    color: '#00C2E0',
    title: 'Vos agents voient leur planning sur téléphone',
    desc: 'Fini les appels du matin. Vos agents ouvrent un lien, voient leur journée, et partent. Vous gagnez 30 minutes chaque matin.',
  },
  {
    icon: FileText,
    week: 'Semaine 2',
    color: '#1A4FAF',
    title: 'Vos devis sont générés en 2 minutes',
    desc: 'Un client demande un devis ? Vous le générez en 2 clics, professionnel, avec votre logo. Fini le Word et la calculatrice.',
  },
  {
    icon: QrCode,
    week: 'Semaine 3',
    color: '#0F2D5E',
    title: 'Vous prouvez chaque passage client',
    desc: 'QR code scanné, photo avant/après, signature client. Votre client sait que vous êtes passé. Fini les disputes.',
  },
  {
    icon: BarChart3,
    week: 'Semaine 4',
    color: '#00C2E0',
    title: 'Vous voyez votre CA en temps réel',
    desc: 'Vous ouvrez votre tableau de bord et voyez votre chiffre d\'affaires, vos heures, votre rentabilité.',
  },
]

export default function Results() {
  return (
    <section className="bg-white py-14 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-5"
            style={{ background: 'rgba(0,194,224,0.08)', color: '#0F2D5E', border: '1px solid rgba(0,194,224,0.2)' }}>
            Résultats concrets
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0F2D5E] tracking-tight">
            Ce que vous gagnez dès la première semaine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-5 card-hover cursor-default"
              style={{
                background: 'linear-gradient(145deg, #F8FAFC, #F0F4F8)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${r.color}15`, border: `1px solid ${r.color}30` }}>
                <r.icon size={16} style={{ color: r.color }} />
              </div>
              <div className="text-[10px] font-bold mb-1.5" style={{ color: r.color }}>{r.week}</div>
              <h3 className="text-xs sm:text-sm font-bold text-[#0F2D5E] mb-2 leading-snug">{r.title}</h3>
              <p className="text-[10px] sm:text-xs text-[#5A6B7D] leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
