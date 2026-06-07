import { useEffect } from 'react'
import { ArrowRight, ExternalLink, BookOpen, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { AUTHORS } from '../config'
import { posts } from '../data/blog'

const URL = 'https://proprely.fr/auteurs'
const TITLE = 'Auteurs Proprely — Qui écrit sur le blog · Proprely'
const DESCRIPTION =
  "Les auteurs du blog Proprely : profils, expertises et méthode éditoriale. Aucun article publié sans cadrage avec un dirigeant de société de nettoyage en exercice."

function injectSchema() {
  const id = 'authors-index-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-07',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      hasPart: Object.values(AUTHORS).map((a) => ({
        '@type': 'ProfilePage',
        url: `${URL}/${a.slug}`,
        mainEntity: { '@type': 'Person', name: a.name, jobTitle: a.jobTitle },
      })),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Auteurs', item: URL },
        ],
      },
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function AuthorIndex() {
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
      document.getElementById('authors-index-schema')?.remove()
    }
  }, [])

  const authors = Object.values(AUTHORS).map((a) => ({
    ...a,
    articleCount: posts.filter((p) => (p.authorSlug ?? 'paul-munier') === a.slug).length,
  }))

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Auteurs' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-100">
              <Sparkles size={12} />
              Méthode éditoriale Proprely
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Qui écrit sur le blog Proprely
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Aucun article publié sans avoir été cadré avec un dirigeant de société de nettoyage en exercice. Sources officielles citées (IDCC 3043, INSEE, Légifrance, BOAMP). Aucune fabrication, aucune affiliation cachée.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {authors.map((a) => {
                const initials = a.name.split(' ').map((p) => p[0]).join('').toUpperCase()
                return (
                  <Link
                    key={a.slug}
                    to={`/auteurs/${a.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all block"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-black shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">
                          {a.name}
                        </h2>
                        <p className="text-sm text-slate-600 font-semibold">{a.jobTitle}</p>
                        <p className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1.5">
                          <BookOpen size={12} />
                          {a.articleCount} article{a.articleCount > 1 ? 's' : ''} publié{a.articleCount > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-3">{a.bio}</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                        Voir le profil
                        <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                        <ExternalLink size={11} />
                        LinkedIn vérifié
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
