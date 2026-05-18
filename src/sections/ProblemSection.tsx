import { motion } from 'framer-motion'
import { FileSpreadsheet, MessageSquare, CalendarX, FileText, UserMinus, Building2, FolderX } from 'lucide-react'

const pains = [
  {
    icon: FileSpreadsheet,
    title: 'Excel partout',
    desc: "Les heures, les devis, les plannings. Sept feuilles, trois versions, et personne ne sait laquelle est la bonne.",
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp pour gérer les remplacements',
    desc: "Les messages se perdent, les agents ne se présentent pas, et c'est vous qui appelez à 6h du matin pour rattraper.",
  },
  {
    icon: CalendarX,
    title: 'Plannings éparpillés',
    desc: "Un agenda papier, un Google Agenda, un fichier client. Aucune vue d'ensemble sur ce qui tourne réellement.",
  },
  {
    icon: FileText,
    title: 'Devis tapés à la main',
    desc: "20 minutes pour générer un devis sur Word. Le prospect attend, et finit par appeler le concurrent qui a répondu en 10 minutes.",
  },
  {
    icon: UserMinus,
    title: 'Agents en surcharge invisible',
    desc: "Vous découvrez le burn-out d'un agent quand il démissionne. Aucune alerte, aucun suivi de la charge horaire.",
  },
  {
    icon: Building2,
    title: 'Clients et sites mélangés',
    desc: "Un client = trois sites = douze prestations. Tout est dans votre tête. Vos collaborateurs n'ont aucun accès à l'historique.",
  },
  {
    icon: FolderX,
    title: 'Documents dispersés',
    desc: "Contrats sur le bureau, fiches sécurité dans la boîte mail, attestations chez le comptable. Aucun classement, aucune recherche.",
  },
]

const quotes = [
  {
    quote: 'Le 22 du mois, je compte les heures de chaque agent depuis le 1er sur mon agenda. Ça me prend toute la soirée.',
    role: 'Dirigeante · 8 agents',
  },
  {
    quote: "Mon meilleur agent, je l'ai trop usé. Dans quelques semaines, il va partir. J'aurais dû le ménager.",
    role: 'Dirigeant · 14 agents',
  },
  {
    quote: "Je sais que certains clients sont peu rentables mais j'ai aucun moyen de le voir sur mes chiffres.",
    role: 'Dirigeant · 22 agents',
  },
  {
    quote: "C'est Excel et Google Agenda. Ça marche, mais on n'a pas de visibilité. On n'a pas un vrai outil.",
    role: 'Dirigeante · 6 agents',
  },
]

export default function ProblemSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Le problème</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Votre gestion est dispersée<br />entre 7 outils qui ne se parlent pas
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Excel, WhatsApp, Google Agenda, Word, un logiciel de facturation, des emails, des classeurs papier. Chaque outil fait une partie du travail. Personne ne fait l'ensemble.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-20">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <p.icon size={18} className="text-red-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Sur le terrain</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ce que les dirigeants nous ont dit en face
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {quotes.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <p className="text-slate-700 text-base leading-relaxed mb-5 italic">
                <span className="text-3xl text-blue-200 leading-none mr-1">«</span>
                {p.quote}
                <span className="text-3xl text-blue-200 leading-none ml-1">»</span>
              </p>
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-medium">{p.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-slate-500 mt-10"
        >
          Entretiens menés avec des dirigeants de sociétés de nettoyage en région lyonnaise.
        </motion.p>
      </div>
    </section>
  )
}
