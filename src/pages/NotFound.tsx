import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calculator, Home, Sparkles, Award, MessageSquareQuote } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const links = [
  { icon: Home, label: 'Logiciel société de nettoyage', desc: 'Le guide complet 2026', href: '/logiciel-societe-nettoyage' },
  { icon: Award, label: 'Comparatif logiciels 2026', desc: '6 outils notés sur 13 critères', href: '/comparatif-logiciel-nettoyage' },
  { icon: MessageSquareQuote, label: 'Audit gratuit 30 min', desc: 'Diagnostic offert par le fondateur', href: '/audit-gratuit' },
  { icon: Calculator, label: '4 outils gratuits', desc: 'Prix m², rentabilité, ROI', href: '/outils' },
  { icon: BookOpen, label: 'Blog Proprely', desc: '33 articles pour dirigeants nettoyage', href: '/blog' },
]

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page introuvable · Proprely'
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "La page que vous cherchez n'existe pas ou a été déplacée."
    )
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex,follow')
    return () => {
      document.querySelector('meta[name="robots"]')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1 flex items-center py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden">
        <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
        <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4"
          >
            Erreur 404
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 leading-tight tracking-tight"
          >
            Page introuvable
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="text-base sm:text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            La page que vous cherchez n'existe pas ou a été déplacée. Voici quelques pistes pour rebondir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="group flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 text-left hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 active:scale-[0.98] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <l.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{l.label}</div>
                  <div className="text-xs text-slate-500 truncate">{l.desc}</div>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-10"
          >
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: '404_page' })}
              className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Sparkles size={14} />
              Rejoindre la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-slate-500 mt-3">30 places fondateurs · Sans carte bancaire · Onboarding 30 min</p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
