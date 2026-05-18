import { motion } from 'framer-motion'
import { LayoutDashboard, Calendar, Users, Building2, ClipboardList, FileText, FolderOpen, ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const modules = [
  {
    icon: Building2,
    title: 'Clients & sites',
    benefit: "Plus jamais perdu dans vos prestations",
    desc: "Toutes vos prestations organisées par client et par site. Historique, contrats, fréquences, contacts.",
  },
  {
    icon: Users,
    title: 'Agents',
    benefit: "Gardez vos meilleurs agents",
    desc: "Profils avec spécialités (vitrerie, moquette, décapage), charge horaire, alertes de surmenage automatiques.",
  },
  {
    icon: Calendar,
    title: 'Planning',
    benefit: "30 min gagnées chaque matin",
    desc: "Vue calendrier centralisée. Affectation 1-clic selon spécialité et disponibilité. Remplacements maîtrisés.",
  },
  {
    icon: ClipboardList,
    title: 'Missions',
    benefit: "Preuve de passage à chaque intervention",
    desc: "Récurrences, check-in QR code, photos avant/après, signatures clients. Fin des litiges sur les heures.",
  },
  {
    icon: FileText,
    title: 'Devis & factures',
    benefit: "Devis envoyés en 2 minutes",
    desc: "Devis professionnels générés avec votre logo. Suivi des relances, alerte impayés, factures en 2 clics.",
  },
  {
    icon: FolderOpen,
    title: 'Documents',
    benefit: "Tout retrouver en 5 secondes",
    desc: "Contrats, fiches sécurité, attestations URSSAF, fiches de poste — classés, centralisés, accessibles.",
  },
  {
    icon: LayoutDashboard,
    title: 'Pilotage',
    benefit: "Votre vraie marge, en temps réel",
    desc: "CA, heures et marge par client et par site. Vous ne découvrez plus la rentabilité 45 jours après.",
  },
]

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">La solution</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Un cockpit unique<br />pour piloter votre activité
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Proprely remplace Excel, WhatsApp, Word, votre agenda et votre logiciel de facturation. Sept espaces, une seule interface, conçue pour les sociétés de nettoyage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
              className={`group bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all ${i === modules.length - 1 ? 'sm:col-span-2 lg:col-span-1 sm:bg-gradient-to-br sm:from-blue-50 sm:to-white sm:border-blue-100' : ''}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${i === modules.length - 1 ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <m.icon size={20} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1.5">{m.title}</div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">{m.benefit}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            Rejoindre la bêta gratuite
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs text-slate-500 mt-3">Gratuit pendant la bêta · Pas de carte bancaire · Aucun engagement</p>
        </div>
      </div>
    </section>
  )
}
