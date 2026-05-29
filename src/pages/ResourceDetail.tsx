import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Download, CheckCircle, Sparkles, ExternalLink } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { getResource, resources } from '../data/resources'
import type { Resource } from '../data/resources'
import { getFeature } from '../data/features'
import { getPost } from '../data/blog'
import Link from '../components/Link'
import LeadMagnetForm from '../components/LeadMagnetForm'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-black text-slate-900 mb-3">Ressource introuvable</h1>
          <p className="text-slate-600 mb-6">Cette ressource n'existe pas ou a été retirée.</p>
          <Link to="/ressources" className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3 font-semibold text-sm hover:bg-blue-700 transition-colors">
            <ArrowLeft size={14} />
            Toutes les ressources
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function injectSchema(r: Resource) {
  const id = 'resource-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/ressources/${r.slug}/`
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: r.title,
      description: r.metaDescription,
      url,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Ressources', item: 'https://proprely.fr/ressources' },
          { '@type': 'ListItem', position: 3, name: r.shortTitle, item: url },
        ],
      },
    },
  ]
  if (r.filePath) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: r.title,
      description: r.metaDescription,
      url: `https://proprely.fr${r.filePath}`,
      encodingFormat: 'text/csv',
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      publisher: { '@id': 'https://proprely.fr/#organization' },
    })
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
  document.head.appendChild(script)
}

type Props = { slug: string }

export default function ResourceDetail({ slug }: Props) {
  const r = getResource(slug)
  const feature = r?.relatedFeatureSlug ? getFeature(r.relatedFeatureSlug) : undefined
  const relatedBlogs = (r?.relatedBlogSlugs || []).map(getPost).filter(Boolean)
  const otherResources = resources.filter((x) => x.slug !== slug).slice(0, 3)

  useEffect(() => {
    if (!r) return
    const url = `https://proprely.fr/ressources/${r.slug}/`
    document.title = r.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', r.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', r.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', r.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', r.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', r.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectSchema(r)
    return () => {
      document.getElementById('resource-schema')?.remove()
    }
  }, [r])

  if (!r) return <NotFound />

  const Icon = r.icon
  const isDownload = !!r.filePath

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              to="/ressources"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Toutes les ressources
            </Link>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
                >
                  <Icon size={12} />
                  {r.tag}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5"
                >
                  {r.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7"
                >
                  {r.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="space-y-3"
                >
                  {isDownload && r.filePath ? (
                    <LeadMagnetForm filePath={r.filePath} resourceSlug={r.slug} resourceTitle={r.shortTitle} />
                  ) : r.pageHref ? (
                    <Link
                      to={r.pageHref}
                      className="group relative bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} />
                      <span>Ouvrir l'outil</span>
                    </Link>
                  ) : null}

                  <Link to="/beta" className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] inline-flex items-center justify-center gap-2 w-full">
                    Rejoindre la bêta gratuite
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>

                <p className="text-xs text-slate-500 mt-4">{r.format} · {r.fileSize}</p>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">Ce modèle convient si</p>
                  <ul className="space-y-3">
                    {r.whoFor.map((w, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                        <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Contenu</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce qu'il y a dans le fichier
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                {r.bestFor}
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {r.whatsInside.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-slate-100"
                >
                  <CheckCircle size={14} className="text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700 leading-snug">{b}</span>
                </motion.li>
              ))}
            </ul>

            {isDownload && (
              <div className="text-center mt-10">
                <a
                  href={r.filePath}
                  download
                  className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 active:scale-[0.97]"
                >
                  <Download size={16} />
                  Télécharger le modèle gratuitement
                </a>
              </div>
            )}
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
              Ce modèle ne suffit plus quand vous grandissez
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Proprely automatise ce que ce modèle vous demande de faire à la main. Configuration en 30 minutes avec le fondateur. Tarif fondateur conservé à vie.
            </p>
            <Link to="/beta" className="group bg-white text-blue-700 rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-[0.97]">
              Rejoindre la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </Link>
            <p className="text-xs text-blue-200 mt-4">Pas de carte bancaire · Aucun engagement · Réponse sous 24h</p>
          </div>
        </section>

        {(feature || relatedBlogs.length > 0 || otherResources.length > 0) && (
          <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              {feature && (
                <>
                  <h2 className="text-xl font-black text-slate-900 mb-6">La fonctionnalité Proprely associée</h2>
                  <Link to="/fonctionnalites/${feature.slug}" className="group block w-full text-left bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 mb-10 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]">
                    <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                      <feature.icon size={12} />
                      {feature.tag}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">{feature.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{feature.subtitle}</p>
                  </Link>
                </>
              )}

              {relatedBlogs.length > 0 && (
                <>
                  <h2 className="text-xl font-black text-slate-900 mb-6">À lire sur le blog</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {relatedBlogs.map((b) => b && (
                      <Link to="/blog/${b.slug}" key={b.slug}
                        className="group text-left bg-white rounded-2xl border border-slate-100 p-5 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 inline-block mb-2">{b.tag}</span>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">{b.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{b.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {otherResources.length > 0 && (
                <>
                  <h2 className="text-xl font-black text-slate-900 mb-6">Autres ressources gratuites</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {otherResources.map((o) => {
                      const OIcon = o.icon
                      return (
                        <Link to="/ressources/${o.slug}" key={o.slug}
                          className="group text-left bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                            <OIcon size={16} className="text-blue-600" />
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1 leading-snug">{o.shortTitle}</h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{o.excerpt}</p>
                        </Link>
                      )
                    })}
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
