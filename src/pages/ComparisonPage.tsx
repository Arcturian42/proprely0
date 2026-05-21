import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, X, Minus, Sparkles, HelpCircle, Zap } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getComparison } from '../data/comparisons'
import type { ComparisonPage as ComparisonPageType } from '../data/comparisons'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

function injectComparisonSchema(c: ComparisonPageType) {
  const id = 'comparison-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/comparatif/${c.slug}`
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.title,
      description: c.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      abstract: c.tldr,
      mentions: c.competitorUrl
        ? [{ '@type': 'Organization', name: c.competitorName, url: c.competitorUrl }]
        : [{ '@type': 'Organization', name: c.competitorName }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Comparatif', item: 'https://proprely.fr/comparatif-logiciel-nettoyage' },
        { '@type': 'ListItem', position: 3, name: `Proprely vs ${c.competitorName}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({
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

function EdgeBadge({ edge }: { edge?: 'proprely' | 'competitor' | 'equal' }) {
  if (edge === 'proprely')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5">
        <Check size={10} /> Proprely
      </span>
    )
  if (edge === 'competitor')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5">
        <X size={10} /> Concurrent
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-full px-2 py-0.5">
      <Minus size={10} /> Égalité
    </span>
  )
}

type Props = { slug: string }

export default function ComparisonPage({ slug }: Props) {
  const c = getComparison(slug)

  useEffect(() => {
    if (!c) return
    const url = `https://proprely.fr/comparatif/${c.slug}`
    document.title = c.metaTitle
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
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Comparatif', href: '/comparatif-logiciel-nettoyage' }, { name: `Proprely vs ${c.competitorName}` }]} />
            </div>
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
              {c.title}
            </motion.h1>

            <motion.aside
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-left bg-white border-l-4 border-blue-500 rounded-r-2xl p-5 sm:p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Réponse-flash</span>
              </div>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">{c.tldr}</p>
            </motion.aside>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'comparison_hero', comparison: c.slug })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta Proprely
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/calculateur-roi"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Calculer mon économie
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              {c.competitorName} en quelques mots
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">{c.competitorPitch}</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Le tableau comparatif Proprely vs {c.competitorName}
            </h2>
            <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              {c.comparisonTable.length} critères évalués honnêtement. Les badges indiquent où chaque solution est généralement la plus solide.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 sm:px-5 py-4 font-bold text-slate-900">Critère</th>
                    <th className="text-left px-4 sm:px-5 py-4 font-bold text-blue-700">Proprely</th>
                    <th className="text-left px-4 sm:px-5 py-4 font-bold text-slate-700">{c.competitorName}</th>
                    <th className="text-left px-4 sm:px-5 py-4 font-bold text-slate-500 hidden sm:table-cell">Avantage</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparisonTable.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-900">{row.criterion}</td>
                      <td className="px-4 sm:px-5 py-3.5 text-slate-700 align-top">{row.proprely}</td>
                      <td className="px-4 sm:px-5 py-3.5 text-slate-700 align-top">{row.competitor}</td>
                      <td className="px-4 sm:px-5 py-3.5 align-top hidden sm:table-cell">
                        <EdgeBadge edge={row.edge} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-10 leading-tight">
              Les différences structurelles
            </h2>
            <div className="space-y-5">
              {c.keyDifferences.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200"
                >
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2.5 leading-snug">{d.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/40 to-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Qui choisit Proprely, qui choisit {c.competitorName} ?
            </h2>
            <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              La bonne question n'est pas « qui est le meilleur ». C'est « lequel correspond à votre profil ».
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">Choisissez Proprely si</div>
                <ul className="space-y-2.5">
                  {c.whoChooses.proprely.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 leading-snug">
                      <Check size={16} className="text-blue-600 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Choisissez {c.competitorName} si</div>
                <ul className="space-y-2.5">
                  {c.whoChooses.competitor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 leading-snug">
                      <Check size={16} className="text-slate-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Tout ce qu'on nous demande sur Proprely vs {c.competitorName}
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {c.faq.map((f, i) => (
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
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Tester Proprely gratuitement
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'comparison_footer', comparison: c.slug })}
              className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-slate-400 mt-4">Gratuit · Sans carte bancaire · Réponse sous 24h</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
