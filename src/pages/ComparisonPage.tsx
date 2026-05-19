import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, MinusCircle, Sparkles, HelpCircle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { getComparison, comparisons } from '../data/comparisons'
import type { ComparisonPage as ComparisonPageType } from '../data/comparisons'
import { navigate } from '../lib/useRoute'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-black text-slate-900 mb-3">Comparatif introuvable</h1>
          <p className="text-slate-600 mb-6">Ce comparatif n'existe pas.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour à l'accueil
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function injectComparisonSchema(c: ComparisonPageType) {
  const id = 'comparison-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/comparatif/${c.slug}`
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.title,
      description: c.metaDescription,
      url,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Comparatifs', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 3, name: c.competitor, item: url },
        ],
      },
    },
  ]
  if (c.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
  document.head.appendChild(script)
}

function WinnerIcon({ winner }: { winner: 'proprely' | 'competitor' | 'tie' }) {
  if (winner === 'proprely') return <CheckCircle size={16} className="text-emerald-500" />
  if (winner === 'competitor') return <XCircle size={16} className="text-red-500" />
  return <MinusCircle size={16} className="text-slate-400" />
}

type Props = { slug: string }

export default function ComparisonPageView({ slug }: Props) {
  const c = getComparison(slug)
  const others = comparisons.filter((x) => x.slug !== slug).slice(0, 2)

  useEffect(() => {
    if (!c) return
    const url = `https://proprely.fr/comparatif/${c.slug}`
    const title = `${c.title} · Proprely`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', c.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', c.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', c.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', c.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectComparisonSchema(c)
    return () => {
      document.getElementById('comparison-schema')?.remove()
    }
  }, [c])

  if (!c) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Retour à l'accueil
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              Comparatif
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {c.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              {c.subtitle}
            </motion.p>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{c.competitor}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{c.competitorContext}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Proprely</p>
              <p className="text-sm text-slate-700 leading-relaxed">{c.proprelyContext}</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Comparatif détaillé</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {c.competitor} vs Proprely · {c.rows.length} critères
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="hidden sm:grid sm:grid-cols-[1.4fr,1.6fr,1.6fr,auto] gap-4 bg-slate-900 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider">
                <div>Critère</div>
                <div>{c.competitor}</div>
                <div>Proprely</div>
                <div className="text-center">Gagnant</div>
              </div>
              {c.rows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                  className="grid sm:grid-cols-[1.4fr,1.6fr,1.6fr,auto] gap-3 sm:gap-4 px-5 py-4 border-t border-slate-100"
                >
                  <div className="text-sm font-bold text-slate-900">{row.category}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <span className="sm:hidden text-[10px] uppercase font-bold text-slate-400 block mb-0.5">{c.competitor}</span>
                    {row.competitor}
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <span className="sm:hidden text-[10px] uppercase font-bold text-blue-700 block mb-0.5">Proprely</span>
                    {row.proprely}
                  </div>
                  <div className="flex sm:justify-center items-start gap-1.5">
                    <WinnerIcon winner={row.winner} />
                    <span className="text-[10px] sm:hidden uppercase tracking-wider font-bold text-slate-500">
                      {row.winner === 'proprely' ? 'Proprely' : row.winner === 'competitor' ? c.competitor : 'Égalité'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">Verdict</p>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed">{c.verdict}</p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Quand garder {c.competitor}</p>
              <ul className="space-y-2.5">
                {c.whenCompetitor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">Quand passer à Proprely</p>
              <ul className="space-y-2.5">
                {c.whenProprely.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Ce qu'on nous demande sur ce comparatif
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 sm:px-6 divide-y divide-slate-200">
              {c.faq.map((q, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{q.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-14 sm:py-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-400 opacity-10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Testez Proprely sans engagement
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Mise en route en 30 minutes avec le fondateur. Aucune carte bancaire. Tarif fondateur conservé à vie.
            </p>
            <button
              onClick={() => navigate('/', { hash: 'formulaire' })}
              className="group bg-white text-blue-700 rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Rejoindre la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </button>
          </div>
        </section>

        {others.length > 0 && (
          <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl font-black text-slate-900 mb-6">Autres comparatifs</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {others.map((o) => (
                  <button
                    key={o.slug}
                    onClick={() => navigate(`/comparatif/${o.slug}`)}
                    className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 inline-block mb-2">Comparatif</span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">{o.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{o.subtitle}</p>
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
