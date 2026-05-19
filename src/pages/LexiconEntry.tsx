import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { getLexiconEntry, getRelatedLexicon } from '../data/lexicon'
import type { LexiconEntry as LexiconEntryType } from '../data/lexicon'
import { navigate } from '../lib/useRoute'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-black text-slate-900 mb-3">Terme introuvable</h1>
          <p className="text-slate-600 mb-6">Cette entrée du lexique n'existe pas.</p>
          <button
            onClick={() => navigate('/lexique')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Voir le lexique
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function injectLexiconEntrySchema(e: LexiconEntryType) {
  const id = 'lexicon-entry-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/lexique/${e.slug}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: e.term,
    description: e.shortDef,
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Lexique de la propreté B2B',
      url: 'https://proprely.fr/lexique',
    },
    inLanguage: 'fr-FR',
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}

type Props = { slug: string }

export default function LexiconEntry({ slug }: Props) {
  const entry = getLexiconEntry(slug)
  const related = getRelatedLexicon(slug, 2)

  useEffect(() => {
    if (!entry) return
    const url = `https://proprely.fr/lexique/${entry.slug}`
    const title = `${entry.term} · Lexique propreté B2B · Proprely`
    const desc = entry.shortDef
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', desc)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectLexiconEntrySchema(entry)
    return () => {
      document.getElementById('lexicon-entry-schema')?.remove()
    }
  }, [entry])

  if (!entry) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1">
        <article className="py-10 sm:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => navigate('/lexique')}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              Lexique
            </button>

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <BookOpen size={12} />
              Définition métier
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5"
            >
              {entry.term}
            </motion.h1>

            <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-5 sm:p-6 mb-8">
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700 mb-1.5">En une phrase</p>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">{entry.shortDef}</p>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">Définition complète</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-8">{entry.definition}</p>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 tracking-tight">Pourquoi c'est important</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-10">{entry.context}</p>

            <div className="mt-12 pt-8 border-t border-slate-100 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Bêta privée</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Un outil qui parle le langage du métier</h3>
              <p className="text-sm sm:text-base text-slate-700 mb-5">
                Proprely intègre nativement les notions du métier (sites, fréquences, spécialités, preuve de passage). Pas de configuration pour adapter un outil générique.
              </p>
              <button
                onClick={() => navigate('/', { hash: 'formulaire' })}
                className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Rejoindre la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
              </button>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="bg-slate-50 py-12 sm:py-16 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl font-black text-slate-900 mb-6">Termes liés</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <button
                    key={r.slug}
                    onClick={() => navigate(`/lexique/${r.slug}`)}
                    className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                  >
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">{r.term}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{r.shortDef}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
