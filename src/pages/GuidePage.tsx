import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle, Sparkles, BookOpen } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getGuide } from '../data/guides'
import type { GuidePage as GuidePageType } from '../data/guides'
import Link from '../components/Link'

function injectGuideSchema(g: GuidePageType) {
  const id = 'guide-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/guides/${g.slug}/`
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: g.title,
      description: g.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      abstract: g.tldr,
      mainContentOfPage: { '@type': 'WebPageElement', name: g.primaryQuestion },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://proprely.fr/guides/' },
        { '@type': 'ListItem', position: 3, name: g.primaryQuestion, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: g.faq.map((f) => ({
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

export default function GuidePage({ slug }: Props) {
  const g = getGuide(slug)

  useEffect(() => {
    if (!g) return
    const url = `https://proprely.fr/guides/${g.slug}/`
    document.title = g.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', g.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', g.metaTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', g.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', g.metaTitle)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', g.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectGuideSchema(g)
    return () => {
      document.getElementById('guide-schema')?.remove()
    }
  }, [g])

  if (!g) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumbs items={[{ name: 'Guides', href: '/blog' }, { name: g.primaryQuestion }]} className="mb-6" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <BookOpen size={12} />
              Guide réponse directe
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {g.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Réponse-flash</p>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{g.tldr}</p>
            </motion.div>
          </div>
        </section>

        {g.sections.map((section, i) => (
          <section
            key={section.heading}
            className={`py-12 sm:py-16 border-y border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                {section.heading}
              </h2>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    dangerouslySetInnerHTML={{
                      __html: p.replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>'),
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Vos questions sur le sujet
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {g.faq.map((f, i) => (
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

        {g.relatedLinks.length > 0 && (
          <section className="py-12 sm:py-16 border-t border-slate-100 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">
                Pour aller plus loin
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {g.relatedLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-white transition-colors"
                  >
                    <ArrowRight size={16} className="text-blue-600 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="block font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Une question concrète sur votre société de nettoyage ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 minutes en visio avec le fondateur Proprely pour identifier vos pertes de temps et d'argent. Audit offert, sans engagement.
            </p>
            <Link
              to="/audit-gratuit"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Demander mon audit gratuit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
