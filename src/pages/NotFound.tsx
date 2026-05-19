import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calculator, Home, Tag } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { navigate } from '../lib/useRoute'

const links = [
  { icon: Home, label: 'Accueil', desc: 'Découvrir le cockpit', href: '/' },
  { icon: Tag, label: 'Tarifs', desc: 'Gratuit pendant la bêta', href: '/tarifs' },
  { icon: Calculator, label: 'Calculateur ROI', desc: 'Combien vous perdez par an', href: '/calculateur-roi' },
  { icon: BookOpen, label: 'Blog', desc: 'Analyses pour les dirigeants du nettoyage', href: '/blog' },
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
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
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
              </button>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
