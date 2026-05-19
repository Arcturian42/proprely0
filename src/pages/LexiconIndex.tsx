import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, ArrowRight } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { lexicon } from '../data/lexicon'
import { navigate } from '../lib/useRoute'

function injectLexiconIndexSchema() {
  const id = 'lexicon-index-schema'
  document.getElementById(id)?.remove()
  const url = 'https://proprely.fr/lexique'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Lexique du métier de la propreté B2B',
    description: "Définitions des termes spécifiques au métier de la propreté B2B : preuve de passage, tournée, cahier des charges, ratios de productivité, spécialités agents et plus.",
    url,
    inLanguage: 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
    hasPart: lexicon.map((e) => ({
      '@type': 'DefinedTerm',
      name: e.term,
      description: e.shortDef,
      url: `${url}/${e.slug}`,
    })),
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}

export default function LexiconIndex() {
  useEffect(() => {
    const url = 'https://proprely.fr/lexique'
    const title = 'Lexique de la propreté B2B · Proprely'
    const desc = "Définitions du vocabulaire métier des sociétés de nettoyage B2B en France : preuve de passage, tournée, cahier des charges, ratio de productivité, AQAP, et plus."
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', desc)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectLexiconIndexSchema()
    return () => {
      document.getElementById('lexicon-index-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Retour à l'accueil
            </motion.button>

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <BookOpen size={12} />
              Lexique métier
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5"
            >
              Le vocabulaire du métier de la propreté B2B
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed"
            >
              Les termes que vous croisez chaque jour, expliqués sans jargon. Pour les dirigeants qui veulent maîtriser le langage du secteur, et pour leurs équipes qui apprennent le métier.
            </motion.p>
          </div>
        </section>

        <section className="bg-white py-10 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {lexicon.map((entry, i) => (
                <motion.button
                  key={entry.slug}
                  onClick={() => navigate(`/lexique/${entry.slug}`)}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
                  className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                >
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug flex items-center gap-2">
                    {entry.term}
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-blue-600" />
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{entry.shortDef}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">Bêta privée gratuite</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 tracking-tight">
              Le métier est complexe. Votre outil ne devrait pas l'être.
            </h2>
            <p className="text-slate-600 text-base mb-6">
              Proprely parle le langage du nettoyage dès la première heure. Pas de paramétrage de plusieurs mois pour transformer un outil générique.
            </p>
            <button
              onClick={() => navigate('/', { hash: 'formulaire' })}
              className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-bold text-sm hover:bg-blue-700 transition-colors"
            >
              Rejoindre la bêta gratuite
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
