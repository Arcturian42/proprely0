import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, BookOpen, Calculator, Mail } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import Link from '../components/Link'

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1 flex items-center py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
        <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-emerald-100/40 blur-3xl pointer-events-none animate-blob-1" />
        <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-2" />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-7 shadow-lg shadow-emerald-500/30"
          >
            <CheckCircle size={36} className="text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight"
          >
            Votre candidature est<br />bien enregistrée
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed max-w-xl mx-auto"
          >
            Nous analysons les candidatures pour sélectionner les sociétés les plus pertinentes. Si votre profil correspond, nous vous contactons sous <strong className="text-slate-900">24h ouvrées</strong> pour planifier votre onboarding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 sm:p-7 mb-10 text-left"
          >
            <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3">Pendant ce temps</h2>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>Lisez nos analyses sectorielles pour préparer votre arrivée dans Proprely</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>Calculez précisément combien la dispersion vous coûte chaque année</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                <span>Surveillez votre boîte mail (et le dossier "Promotions" pour les premiers jours)</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.38 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/blog"
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <BookOpen size={14} />
              Lire le blog
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </Link>
            <Link
              to="/calculateur-roi"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
            >
              <Calculator size={14} />
              Calculateur ROI
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-slate-500 mt-10 flex items-center justify-center gap-1.5"
          >
            <Mail size={11} />
            Une question urgente ? <a href="mailto:contact@proprely.fr" className="text-blue-600 font-semibold hover:underline">contact@proprely.fr</a>
          </motion.p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
