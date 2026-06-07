import { useEffect } from 'react'
import {
  ArrowRight,
  Quote,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Users,
  Building2,
  MapPin,
  Star,
  Mail,
} from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { caseStudies, type CaseStudy } from '../data/caseStudies'
import { BETA_FORM_URL, FOUNDER_SPOTS } from '../config'
import { trackEvent } from '../lib/analytics'

const TRUST_INDICATORS = [
  { icon: Users, value: `${FOUNDER_SPOTS.taken}/${FOUNDER_SPOTS.total}`, label: 'Places fondateurs prises' },
  { icon: MapPin, value: 'France', label: 'Conçu en France, hébergement UE' },
  { icon: Star, value: '30 min', label: "Onboarding avec le fondateur" },
]

const URL = 'https://proprely.fr/cas-clients'
const TITLE = 'Cas clients : ils pilotent leur société de nettoyage avec Proprely'
const DESCRIPTION =
  "Découvrez comment des sociétés de nettoyage B2B remplacent Excel et WhatsApp par Proprely : planning, preuve de passage, marge par contrat, conformité IDCC 3043. Retours fondateurs."

const WHY_FOUNDERS = [
  {
    icon: Users,
    title: "Conçu avec eux",
    desc: "Chaque fonctionnalité est cadrée avec des dirigeants de société de nettoyage. Pas de menu inutile. Pas de jargon SaaS générique.",
  },
  {
    icon: ShieldCheck,
    title: "Onboarding 30 min",
    desc: "Le fondateur vous accompagne en visio, importe votre Excel et vos contacts agents. Vous repartez avec un cockpit opérationnel.",
  },
  {
    icon: Building2,
    title: "Tarif fondateur à vie",
    desc: "Les 30 premières sociétés conservent leur tarif privilégié après la bêta. Pas d'augmentation arbitraire post-lancement.",
  },
]

function injectSchema() {
  const id = 'cas-clients-schema'
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
      datePublished: '2026-06-07',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Cas clients', item: URL },
        ],
      },
    },
  ]

  if (caseStudies.length > 0) {
    caseStudies.forEach((cs) => {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Review',
        reviewBody: cs.pullQuote,
        author: { '@type': 'Person', name: cs.authorName },
        publisher: { '@type': 'Organization', name: 'Proprely' },
        itemReviewed: {
          '@type': 'SoftwareApplication',
          name: 'Proprely',
          applicationCategory: 'BusinessApplication',
        },
        datePublished: cs.collectedAt,
      })
    })
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <article className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-200">
      <div className="bg-gradient-to-br from-blue-50 via-white to-sky-50 p-6 sm:p-8 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-white border border-blue-200 text-blue-700 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            {cs.sector}
          </span>
          <span className="text-xs text-slate-500">{cs.region} · {cs.agentCount} agents</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-tight">
          {cs.companyName}
        </h2>
        <p className="text-sm text-slate-600">{cs.companyDescription}</p>
      </div>

      <div className="p-6 sm:p-8 border-b border-slate-100">
        <Quote size={20} className="text-blue-600 mb-3" aria-hidden="true" />
        <blockquote className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium mb-4">
          {cs.pullQuote}
        </blockquote>
        <figcaption className="text-xs text-slate-500">
          <span className="font-bold text-slate-900">{cs.authorName}</span> · {cs.authorRole}
          {' · '}<span>{cs.collectedAt}</span>
        </figcaption>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 p-6 sm:p-8 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Le défi</h3>
          <p className="text-sm font-bold text-slate-900 mb-2 leading-snug">{cs.challenge.title}</p>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{cs.challenge.description}</p>
          <ul className="space-y-1.5">
            {cs.challenge.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">La solution</h3>
          <p className="text-sm font-bold text-slate-900 mb-2 leading-snug">{cs.solution.title}</p>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{cs.solution.description}</p>
          <ul className="space-y-1.5">
            {cs.solution.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">Résultats</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cs.results.map((r) => {
            const Icon = r.trend === 'down' ? TrendingDown : TrendingUp
            const color = r.trend === 'down' ? 'text-emerald-600' : 'text-emerald-600'
            return (
              <div key={r.label} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex items-center gap-1 mb-1">
                  <Icon size={12} className={color} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{r.label}</span>
                </div>
                <div className="text-xl font-black text-slate-900 leading-tight">{r.value}</div>
              </div>
            )
          })}
        </div>
        {cs.relatedSlugs && cs.relatedSlugs.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-xs text-slate-500">Voir aussi : </span>
            {cs.relatedSlugs.map((slug, i) => (
              <span key={slug}>
                {i > 0 && ' · '}
                <Link to={`/${slug}`} className="text-xs font-bold text-blue-600 hover:underline">
                  {slug.replace(/-/g, ' ')}
                </Link>
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function CasClientsPage() {
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
      document.getElementById('cas-clients-schema')?.remove()
    }
  }, [])

  const hasStudies = caseStudies.length > 0

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="absolute top-10 -left-20 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Cas clients' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-100">
              <Users size={12} />
              {FOUNDER_SPOTS.taken} sociétés fondatrices · {FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken} places restantes
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Ils pilotent leur société de nettoyage avec Proprely
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Des dirigeants de société de nettoyage B2B qui ont remplacé Excel, WhatsApp et Word par un cockpit unique. Voici leurs défis avant Proprely, ce qu'ils ont mis en place et les résultats mesurés.
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-8">
              {TRUST_INDICATORS.map((t) => {
                const Icon = t.icon
                return (
                  <div key={t.label} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-tight">{t.value}</div>
                      <div className="text-xs text-slate-500 leading-tight">{t.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CASE STUDIES OR PLACEHOLDER */}
        {hasStudies ? (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} cs={cs} />
              ))}
            </div>
          </section>
        ) : (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-amber-100">
                Récits en cours de collecte
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Études détaillées disponibles bientôt
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Nous recueillons actuellement les retours détaillés de nos {FOUNDER_SPOTS.taken} premières sociétés fondatrices : situation avant Proprely, mise en place, résultats chiffrés à 30, 60 et 90 jours. Les premiers cas clients publiés sous peu.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                En attendant, vous pouvez{' '}
                <Link to="/audit-gratuit" className="text-blue-600 font-bold hover:underline">
                  prendre un audit gratuit
                </Link>{' '}
                avec le fondateur ou échanger avec lui directement à{' '}
                <a href="mailto:contact@proprely.fr" className="text-blue-600 font-bold hover:underline">
                  contact@proprely.fr
                </a>
                .
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto">
                <h3 className="text-base font-black text-slate-900 mb-3">
                  Vous êtes déjà membre fondateur ?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  On adorerait raconter votre passage à Proprely. 20 minutes d'échange, on s'occupe de la rédaction, validation écrite avant publication. En contrepartie : mise en avant sur cette page, lien vers votre société, et un mois de support prioritaire offert.
                </p>
                <a
                  href="mailto:contact@proprely.fr?subject=Cas%20client%20Proprely"
                  onClick={() => trackEvent('email_click', { location: 'cas_clients_collect', kind: 'case_study' })}
                  className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-slate-800 transition-colors"
                >
                  <Mail size={14} />
                  Proposer mon retour
                </a>
              </div>
            </div>
          </section>
        )}

        {/* WHY FOUNDERS CHOOSE */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Pourquoi les premiers fondateurs nous rejoignent
              </p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                3 raisons qui reviennent à chaque conversation
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {WHY_FOUNDERS.map((r) => {
                const Icon = r.icon
                return (
                  <div key={r.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{r.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Rejoignez les fondateurs Proprely
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              {FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken} places restantes sur {FOUNDER_SPOTS.total}. Onboarding 30 min avec le fondateur. Tarif fondateur garanti à vie après la bêta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'cas_clients_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-50 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('audit_cta_click', { location: 'cas_clients_final' })}
                className="inline-flex items-center justify-center gap-2 bg-blue-800/40 border border-white/30 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-800/60 transition-colors"
              >
                Audit gratuit 30 min
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
