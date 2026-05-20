import { useEffect } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { cities } from '../data/cities'

const URL = 'https://proprely.fr/villes'
const TITLE = 'Logiciel nettoyage par ville · Proprely'
const DESCRIPTION = "Logiciel de gestion pour société de nettoyage par ville : Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes. Conçu pour la propreté B2B française."

function injectSchema() {
  const id = 'city-index-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Logiciel nettoyage par ville',
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      hasPart: cities.map((c) => ({
        '@type': 'WebPage',
        name: c.title,
        url: `https://proprely.fr/villes/${c.slug}`,
        description: c.metaDescription,
      })),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Villes', item: URL },
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

export default function CityIndex() {
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
      document.getElementById('city-index-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: 'Villes' }]} className="mb-6" />
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <MapPin size={12} />
              Logiciel nettoyage par ville
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Proprely dans les principales villes françaises
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-12">
              Le marché de la propreté B2B varie d'une région à l'autre : Paris a ses syndics et son tertiaire QCA, Lyon son pôle santé, Marseille sa saisonnalité touristique, Bordeaux son œnotourisme, Toulouse son aéronautique, Nantes son industrie maritime. Proprely s'adapte aux contraintes locales.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/villes/${c.slug}`}
                  className="group block bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-blue-600" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5">
                      {c.region}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                    Logiciel nettoyage à {c.city}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {c.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Découvrir {c.city}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Votre ville n'est pas encore listée ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Proprely opère sur toute la France. Les pages villes ci-dessus présentent les spécificités des marchés que nous documentons le plus. Si vous êtes ailleurs, candidatez quand même à la bêta : le produit est identique et l'onboarding est calé sur votre réalité locale.
            </p>
            <Link
              to="/"
              hash="formulaire"
              className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Candidater à la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
