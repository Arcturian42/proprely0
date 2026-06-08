import { useEffect, useMemo, useState } from 'react'
import { Search, ArrowRight, BookOpen, ExternalLink, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { glossary, GLOSSARY_CATEGORIES, type GlossaryCategory } from '../data/glossary'

const URL = 'https://proprely.fr/glossaire'
const TITLE = 'Glossaire propreté B2B : 40+ termes définis · Proprely'
const DESCRIPTION =
  "Glossaire métier des sociétés de nettoyage B2B : IDCC 3043, AS1, article 7, bionettoyage, CCTP, coût horaire chargé, Factur-X, RGPD. Définitions précises et sources officielles."

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function injectSchema() {
  const id = 'glossaire-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-08',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Glossaire', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Glossaire propreté B2B',
      url: URL,
      inLanguage: 'fr-FR',
      hasDefinedTerm: glossary.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${URL}#${t.slug}`,
        name: t.term,
        alternateName: t.aliases,
        description: t.short,
        inDefinedTermSet: URL,
        url: `${URL}#${t.slug}`,
      })),
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function GlossairePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | 'all'>('all')

  useEffect(() => {
    document.title = TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', URL)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', URL)
    injectSchema()
    return () => {
      document.getElementById('glossaire-schema')?.remove()
    }
  }, [])

  // Scroll vers l'ancre si présente
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 200)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    let items = [...glossary]
    if (activeCategory !== 'all') items = items.filter((t) => t.category === activeCategory)
    if (q) {
      items = items.filter((t) => {
        const haystack = [t.term, ...(t.aliases ?? []), t.short, t.long, t.category].join(' ')
        return normalize(haystack).includes(q)
      })
    }
    return items.sort((a, b) => a.term.localeCompare(b.term, 'fr'))
  }, [query, activeCategory])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="absolute top-10 -right-20 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Glossaire' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-100">
              <BookOpen size={12} />
              {glossary.length} termes définis
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Glossaire propreté B2B
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Tous les termes métier des sociétés de nettoyage français : convention IDCC 3043, marchés publics, finance, conformité 2026. Définitions précises, sources officielles, liens vers les guides associés.
            </p>

            {/* Search */}
            <div className="relative max-w-2xl">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un terme : IDCC, AS1, CCTP, bionettoyage…"
                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                aria-label="Rechercher dans le glossaire"
              />
            </div>
          </div>
        </section>

        {/* CATEGORIES FILTER */}
        <section className="border-y border-slate-100 bg-white sticky top-14 sm:top-16 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tout ({glossary.length})
              </button>
              {GLOSSARY_CATEGORIES.map((c) => {
                const count = glossary.filter((t) => t.category === c).length
                const isActive = activeCategory === c
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 py-12">Aucun terme ne correspond à votre recherche.</p>
            ) : (
              <div className="space-y-5">
                {filtered.map((term) => (
                  <article
                    key={term.slug}
                    id={term.slug}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all scroll-mt-32"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 leading-tight">
                          {term.term}
                        </h2>
                        {term.aliases && term.aliases.length > 0 && (
                          <p className="text-xs text-slate-500 italic">
                            Aussi appelé : {term.aliases.join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {term.category}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed mb-3">
                      {term.short}
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{term.long}</p>

                    {term.sources && term.sources.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Sources officielles</p>
                        <div className="flex flex-wrap gap-2">
                          {term.sources.map((s) => (
                            <a
                              key={s.url}
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full px-2.5 py-1 transition-colors"
                            >
                              {s.label}
                              <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {term.related && term.related.length > 0 && (
                      <div className="border-t border-slate-100 pt-3 mt-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Voir aussi</p>
                        <div className="flex flex-wrap gap-3">
                          {term.related.map((r) => (
                            <Link
                              key={r.to}
                              to={r.to}
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                            >
                              {r.label}
                              <ArrowRight size={11} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Permalink */}
                    <a
                      href={`#${term.slug}`}
                      className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-700 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Permalien
                    </a>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Sparkles size={28} className="text-blue-200 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Un terme manque ? On l'ajoute.
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ce glossaire est mis à jour à chaque nouveau retour des fondateurs Proprely. Si un terme métier manque, écrivez-nous et il sera ajouté.
            </p>
            <a
              href="mailto:contact@proprely.fr?subject=Glossaire%20Proprely%20%E2%80%94%20suggestion%20de%20terme"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-50 transition-colors"
            >
              Proposer un terme
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
