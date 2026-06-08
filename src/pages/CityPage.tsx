import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Sparkles, CheckCircle, HelpCircle, AlertCircle, BookOpen, Layers, Building2, Euro } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getCity } from '../data/cities'
import type { CityPage as CityPageType } from '../data/cities'
import { getPost } from '../data/blog'
import { getFeature } from '../data/features'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

function injectCitySchema(city: CityPageType) {
  const id = 'city-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/villes/${city.slug}/`
  const today = new Date().toISOString().slice(0, 10)
  const cityAreaServed: Record<string, unknown> = {
    '@type': 'City',
    name: city.city,
    containedInPlace: { '@type': 'AdministrativeArea', name: city.region },
  }
  if (city.wikidata) {
    cityAreaServed.sameAs = city.wikidata
  }
  const localBusinessSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${url}#localbusiness`,
    name: `Proprely — logiciel société de nettoyage à ${city.city}`,
    description: city.metaDescription,
    url,
    image: 'https://proprely.fr/og-image.png',
    logo: 'https://proprely.fr/proprely-icon-512.png',
    priceRange: '€€',
    email: 'contact@proprely.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '30 rue Marbeuf',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      postalCode: '75008',
      addressCountry: 'FR',
    },
    areaServed: city.department
      ? [cityAreaServed, { '@type': 'AdministrativeArea', name: city.department }]
      : [cityAreaServed],
    serviceType: 'Logiciel de gestion société de nettoyage B2B',
    parentOrganization: { '@id': 'https://proprely.fr/#organization' },
  }
  if (city.geo) {
    localBusinessSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: city.geo.latitude,
      longitude: city.geo.longitude,
    }
  }
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: city.title,
      description: city.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      keywords: city.keywords.join(', '),
      about: {
        '@type': 'Service',
        name: `Logiciel de gestion pour sociétés de nettoyage à ${city.city}`,
        provider: { '@id': 'https://proprely.fr/#organization' },
        areaServed: cityAreaServed,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `Proprely — logiciel société de nettoyage à ${city.city}`,
      description: city.metaDescription,
      url,
      image: 'https://proprely.fr/og-image.png',
      provider: { '@id': 'https://proprely.fr/#organization' },
      serviceType: 'Logiciel de gestion société de nettoyage',
      areaServed: cityAreaServed,
      audience: {
        '@type': 'BusinessAudience',
        audienceType: `Dirigeants de sociétés de nettoyage B2B à ${city.city} et en ${city.region}`,
      },
    },
    localBusinessSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Villes', item: 'https://proprely.fr/villes' },
        { '@type': 'ListItem', position: 3, name: city.city, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: city.faq.map((f) => ({
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

export default function CityPage({ slug }: Props) {
  const city = getCity(slug)
  const relatedPosts = (city?.relatedBlogSlugs ?? [])
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p))
    .slice(0, 3)
  const relatedFeatures = (city?.relatedFeatureSlugs ?? [])
    .map((s) => getFeature(s))
    .filter((f): f is NonNullable<ReturnType<typeof getFeature>> => Boolean(f))
    .slice(0, 4)

  useEffect(() => {
    if (!city) return
    const url = `https://proprely.fr/villes/${city.slug}/`
    const title = `${city.title} · Proprely`
    // eslint-disable-next-line react-hooks/immutability
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', city.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', city.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', city.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', city.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', city.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectCitySchema(city)
    return () => {
      document.getElementById('city-schema')?.remove()
    }
  }, [city])

  if (!city) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Villes', href: '/villes' }, { name: city.city }]} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <MapPin size={12} />
              {city.region}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {city.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              {city.subtitle}
            </motion.p>

            {city.tldr && (
              <motion.aside
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 }}
                className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-5 sm:p-6 mb-8 max-w-3xl mx-auto text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">À retenir</span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{city.tldr}</p>
              </motion.aside>
            )}

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
                onClick={() => trackEvent('beta_cta_click', { location: 'city_page_hero', city: city.slug })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
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
              Le marché de la propreté B2B à {city.city}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {city.marketIntro}
            </p>
            <ul className="space-y-3">
              {city.marketBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <CheckCircle size={18} className="text-blue-600 mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {city.neighborhoods && city.neighborhoods.length > 0 && (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Géographie locale</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Quartiers d'affaires et zones tertiaires à {city.city}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                Les zones où se concentre la demande propreté B2B à {city.city} et leurs spécificités opérationnelles. Connaître ces zones permet d'optimiser vos tournées, vos tarifs et votre force de vente.
              </p>
              <div className="space-y-4">
                {city.neighborhoods.map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6"
                  >
                    <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1.5">{n.name}</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{n.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {city.marketPricing && (
          <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/40 to-white border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-3">
                <Euro size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Prix de marché 2026</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Tarifs propreté bureaux à {city.city} en 2026
              </h2>
              <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Tarif moyen bureaux</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">{city.marketPricing.range}</div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{city.marketPricing.note}</p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pour calibrer votre tarification au m² selon le type de site et les prestations, consultez le{' '}
                <Link to="/blog/tarif-nettoyage-bureaux-m2-2026" className="text-blue-700 font-semibold hover:underline">
                  guide complet du tarif nettoyage bureaux en 2026
                </Link>{' '}
                ou utilisez notre{' '}
                <Link to="/calculateur-prix-nettoyage-m2" className="text-blue-700 font-semibold hover:underline">
                  calculateur de prix nettoyage au m²
                </Link>.
              </p>
            </div>
          </section>
        )}

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Vos clients types à {city.city}
            </h2>
            <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              Les profils de clients que vous gérez au quotidien dans la métropole {city.region.toLowerCase()}.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {city.clientTypes.map((c, i) => {
                const Icon = c.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow] duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{c.type}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
              Les défis spécifiques à {city.city}
            </h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Ce que vous gérez en plus, par rapport à une société de nettoyage hors {city.region.toLowerCase()}.
            </p>
            <div className="space-y-4">
              {city.challenges.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-amber-50/50 border border-amber-100 rounded-2xl p-5 sm:p-6"
                >
                  <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{c.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/40 to-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Pourquoi Proprely</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Comment Proprely répond aux contraintes de {city.city}
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Les fonctionnalités calibrées pour ce que vous gérez vraiment au quotidien.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {city.proprelyFit.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7"
                >
                  <CheckCircle size={20} className="text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{f.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
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
              Ce qu'on nous demande sur {city.city}
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {city.faq.map((f, i) => (
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

        {(relatedFeatures.length > 0 || relatedPosts.length > 0) && (
          <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {relatedFeatures.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Fonctionnalités utiles à {city.city}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 tracking-tight">
                    Les modules Proprely les plus utiles pour les sociétés de nettoyage {city.city === 'Paris' ? 'parisiennes' : `de ${city.city}`}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {relatedFeatures.map((f) => (
                      <Link
                        key={f.slug}
                        to={`/fonctionnalites/${f.slug}`}
                        className="group block bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">{f.tag}</div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">{f.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{f.subtitle}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className="text-blue-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Lectures liées</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 tracking-tight">
                    À lire pour gérer votre société de nettoyage à {city.city}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedPosts.map((p) => (
                      <Link
                        key={p.slug}
                        to={`/blog/${p.slug}`}
                        className="group block bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5"
                      >
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">{p.tag} · {p.readTime}</div>
                        <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">{p.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{p.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Prêt à piloter votre société depuis un seul outil ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'city_page_footer', city: city.slug })}
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
