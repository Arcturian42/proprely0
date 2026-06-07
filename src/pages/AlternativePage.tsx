import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, AlertTriangle, HelpCircle, Sparkles, MoveRight } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getAlternative } from '../data/alternatives'
import type { AlternativePage as AlternativePageType } from '../data/alternatives'
import Link from '../components/Link'

function injectAlternativeSchema(a: AlternativePageType) {
  const id = 'alternative-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/${a.slug}/`
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: a.title,
      description: a.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      abstract: a.tldr,
      mentions: a.competitorUrl
        ? [{ '@type': 'Organization', name: a.competitorName, url: a.competitorUrl }]
        : [{ '@type': 'Organization', name: a.competitorName }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Comparatif', item: 'https://proprely.fr/comparatif-logiciel-nettoyage/' },
        { '@type': 'ListItem', position: 3, name: `Alternative à ${a.competitorName}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

type Props = { slug: string }

export default function AlternativePage({ slug }: Props) {
  const a = getAlternative(slug)

  useEffect(() => {
    if (!a) return
    const url = `https://proprely.fr/${a.slug}/`
    document.title = a.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', a.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', a.metaTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', a.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', a.metaTitle)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', a.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectAlternativeSchema(a)
    return () => {
      document.getElementById('alternative-schema')?.remove()
    }
  }, [a])

  if (!a) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs items={[{ name: `Alternative à ${a.competitorName}` }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Comparatif 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {a.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              {a.tldr}
            </motion.p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/beta"
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {a.comparisonSlug && (
                <Link
                  to={`/comparatif/${a.comparisonSlug}`}
                  className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-blue-200 hover:text-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Comparatif détaillé
                </Link>
              )}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className="text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Pourquoi changer</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
              {a.reasonsToLeave.length} raisons concrètes de chercher une alternative à {a.competitorName}
            </h2>

            <div className="space-y-5">
              {a.reasonsToLeave.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6"
                >
                  <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">{r.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{r.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight text-center">
              {a.competitorName} vs Proprely : tableau comparatif
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[200px]">Critère</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[220px]">{a.competitorName}</th>
                    <th className="text-left p-4 font-bold text-blue-700 bg-blue-50/40 min-w-[220px]">Proprely</th>
                  </tr>
                </thead>
                <tbody>
                  {a.quickTable.map((row) => (
                    <tr key={row.criterion} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-semibold text-slate-900 text-xs sm:text-sm">{row.criterion}</td>
                      <td className="p-4 text-xs sm:text-sm text-slate-700">
                        <div className="flex items-start gap-2">
                          <X size={14} className="text-slate-400 shrink-0 mt-0.5" />
                          <span>{row.competitor}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs sm:text-sm text-slate-700 bg-blue-50/30">
                        <div className="flex items-start gap-2">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.proprely}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <MoveRight size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Plan de migration</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
              Comment migrer de {a.competitorName} vers Proprely en {a.migrationSteps.length} étapes
            </h2>

            <ol className="space-y-4">
              {a.migrationSteps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Vos questions sur la migration depuis {a.competitorName}
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {a.faq.map((f, i) => (
                <details key={i} className="group p-5 sm:p-6 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 font-bold text-slate-900 list-none">
                    <span className="text-sm sm:text-base group-open:text-blue-700 transition-colors">{f.q}</span>
                    <span className="text-blue-600 text-xs group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Prêt à passer de {a.competitorName} à Proprely ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 sociétés fondatrices, accès gratuit pendant toute la bêta, tarif privilégié à vie après. Onboarding 30 min avec le fondateur, migration de vos données incluse.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/beta"
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/logiciel-societe-nettoyage"
                className="bg-white/10 border border-white/20 text-white rounded-xl px-6 py-3.5 font-semibold text-sm hover:bg-white/15 transition-colors inline-flex items-center justify-center gap-2"
              >
                Le guide complet
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
