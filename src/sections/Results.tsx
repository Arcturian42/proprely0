import { motion } from 'framer-motion'
import { Smartphone, FileText, QrCode, BarChart3 } from 'lucide-react'

const results = [
  {
    icon: Smartphone,
    week: 'Semaine 1',
    title: '30 min gagnées chaque matin',
    desc: "Tes agents ouvrent un lien, voient leur journée, partent. Plus d'appels du matin pour caler qui fait quoi.",
  },
  {
    icon: FileText,
    week: 'Semaine 2',
    title: 'Devis envoyés en 2 minutes',
    desc: "Un prospect appelle ? Tu génères un devis pro en 2 clics, avec ton logo, envoyé direct. Plus de Word, plus de calculatrice.",
  },
  {
    icon: QrCode,
    week: 'Semaine 3',
    title: 'Preuve de passage à chaque mission',
    desc: "QR code scanné, photos avant/après, signature client. Tes clients voient le travail. Plus de litiges sur les heures facturées.",
  },
  {
    icon: BarChart3,
    week: 'Semaine 4',
    title: 'Ta marge en temps réel',
    desc: "Tableau de bord : ton CA du mois, les heures par site, la marge par client. Tu pilotes sans attendre le comptable.",
  },
]

export default function Results() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Résultats concrets</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Ce que tu gagnes,<br />semaine après semaine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out)] border border-transparent hover:border-slate-100"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                <r.icon size={18} className="text-white" />
              </div>
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full mb-2">
                {r.week}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{r.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
