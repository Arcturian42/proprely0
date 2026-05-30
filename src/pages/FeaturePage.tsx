import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle, HelpCircle, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getFeature, getRelatedFeatures } from '../data/features'
import type { FeaturePage as FeaturePageType } from '../data/features'
import { getPost } from '../data/blog'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

function injectFeatureSchema(feature: FeaturePageType) {
  const id = 'feature-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/fonctionnalites/${feature.slug}/`
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: feature.title,
      description: feature.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Fonctionnalités', item: 'https://proprely.fr/fonctionnalites' },
          { '@type': 'ListItem', position: 3, name: feature.tag, item: url },
        ],
      },
    },
  ]
  if (feature.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: feature.faq.map((f) => ({
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

type Props = { slug: string }

export default function FeaturePage({ slug }: Props) {
  const feature = getFeature(slug)
  const related = getRelatedFeatures(slug, 2)
  const relatedBlogs = (feature?.relatedBlogSlugs || []).map(getPost).filter(Boolean)

  useEffect(() => {
    if (!feature) return
    const url = `https://proprely.fr/fonctionnalites/${feature.slug}/`
    const title = `${feature.title} · Proprely`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', feature.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', feature.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', feature.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', feature.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', feature.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectFeatureSchema(feature)
    return () => {
      document.getElementById('feature-schema')?.remove()
    }
  }, [feature])

  if (!feature) return <NotFound />

  const Icon = feature.icon

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs
                items={[
                  { name: 'Fonctionnalités', href: '/fonctionnalites' },
                  { name: feature.tag },
                ]}
              />
            </div>
            <Link
              to="/fonctionnalites"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Toutes les fonctionnalités
            </Link>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Icon size={12} />
              {feature.tag}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {feature.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {feature.subtitle}
            </motion.p>

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
                onClick={() => trackEvent('beta_cta_click', { location: 'feature_page_hero', feature: feature.slug })}
                className="group relative bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
                <span className="relative">Rejoindre la bêta gratuite</span>
                <ArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
              </a>
              <Link
                to="/calculateur-roi"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] inline-flex items-center justify-center"
              >
                Calculer mon ROI
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-3">Le problème</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {feature.problemTitle}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {feature.problemDescription}
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {feature.problemBullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-slate-100"
                >
                  <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-sm text-slate-700 leading-snug">{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">La solution</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                {feature.solutionTitle}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {feature.solutionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {feature.benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: (i % 3) * 0.08 }}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <b.icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Cas d'usage</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Comment {feature.tag.toLowerCase()} fonctionne en conditions réelles
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {feature.useCases.map((u, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <u.icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{u.client}</h3>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed italic">{u.situation}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{u.benefit}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Tout ce qu'on nous demande sur {feature.tag.toLowerCase()}
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 sm:px-6 divide-y divide-slate-200">
              {feature.faq.map((q, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{q.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-400 opacity-10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Prêt à structurer votre {feature.tag.toLowerCase()} ?
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Rejoignez la bêta privée Proprely. Configuration en 30 minutes avec le fondateur. Tarif fondateur à vie.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'feature_page_footer', feature: feature.slug })}
              className="group bg-white text-blue-700 rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Rejoindre la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </a>
          </div>
        </section>

        {(related.length > 0 || relatedBlogs.length > 0) && (
          <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              {related.length > 0 && (
                <>
                  <h2 className="text-xl font-black text-slate-900 mb-6">Découvrir d'autres fonctionnalités</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        to={`/fonctionnalites/${r.slug}`}
                        className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                      >
                        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                          <r.icon size={12} />
                          {r.tag}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">{r.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{r.subtitle}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {relatedBlogs.length > 0 && (
                <>
                  <h2 className="text-xl font-black text-slate-900 mb-6">À lire sur le blog</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedBlogs.map((b) => b && (
                      <Link
                        key={b.slug}
                        to={`/blog/${b.slug}`}
                        className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 inline-block mb-2">{b.tag}</span>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">{b.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
