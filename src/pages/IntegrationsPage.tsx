import { useEffect, useMemo } from 'react'
import { ArrowRight, ExternalLink, Plug, Mail, ShieldCheck, RefreshCcw } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'
import { integrations, STATUS_LABEL, STATUS_STYLE, type Integration } from '../data/integrations'

const URL = 'https://proprely.fr/integrations'
const TITLE = 'Intégrations Proprely : Silae, Pennylane, Qonto, Brevo · Proprely'
const DESCRIPTION =
  "Toutes les intégrations Proprely : paie Silae, comptabilité Pennylane/Tiime/Indy, banque Qonto/Shine, email Brevo, Chorus Pro Factur-X. Cockpit nettoyage qui parle à votre stack."

const PRINCIPLES = [
  {
    icon: Plug,
    title: "Aucun lock-in technique",
    desc: "Vos données restent les vôtres. Export CSV/Excel à tout moment, intégrations standards plutôt que propriétaires.",
  },
  {
    icon: ShieldCheck,
    title: "Conformité Factur-X 2026",
    desc: "Émission native au format Factur-X (XML + PDF/A-3) et compatibilité avec les PDP enregistrées par l'État.",
  },
  {
    icon: RefreshCcw,
    title: "Synchronisation temps réel",
    desc: "Webhooks et APIs standards quand disponibles. Sinon, exports périodiques compatibles avec votre cabinet comptable.",
  },
]

function injectSchema() {
  const id = 'integrations-schema'
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
      hasPart: integrations.map((i) => ({
        '@type': 'WebPage',
        name: `Intégration ${i.name}`,
        description: i.description,
      })),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Intégrations', item: URL },
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

function IntegrationCard({ integration }: { integration: Integration }) {
  const Icon = integration.icon
  const a = integration.accent
  return (
    <article className={`relative bg-white border ${a.border} rounded-2xl p-6 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-shadow duration-200`}>
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl ${a.bg} ${a.border} border flex items-center justify-center shrink-0`}>
          <Icon size={22} className={a.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">{integration.name}</h3>
            <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border ${STATUS_STYLE[integration.status]}`}>
              {STATUS_LABEL[integration.status]}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold">{integration.category}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{integration.description}</p>
      <ul className="space-y-1.5 mb-4">
        {integration.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
            <span className={`w-1 h-1 rounded-full ${a.text.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
      {integration.website && (
        <a
          href={integration.website}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
        >
          Site officiel
          <ExternalLink size={11} />
        </a>
      )}
    </article>
  )
}

export default function IntegrationsPage() {
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
      document.getElementById('integrations-schema')?.remove()
    }
  }, [])

  const byCategory = useMemo(() => {
    const groups = new Map<string, Integration[]>()
    integrations.forEach((i) => {
      const arr = groups.get(i.category) ?? []
      arr.push(i)
      groups.set(i.category, arr)
    })
    return Array.from(groups.entries())
  }, [])

  const liveCount = integrations.filter((i) => i.status === 'live').length
  const totalCount = integrations.length

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="absolute top-10 -right-20 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Intégrations' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-emerald-100">
              <Plug size={12} />
              {liveCount}/{totalCount} intégrations actives ou en bêta
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Proprely parle à votre stack
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Paie, comptabilité, banque, email, calendrier, conformité Factur-X. Le cockpit Proprely s'intègre aux outils que vos sociétés de nettoyage utilisent déjà — et reste 100 % exportable sans lock-in.
            </p>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-5">
              {PRINCIPLES.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h2 className="text-base font-black text-slate-900 mb-2 leading-snug">{p.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS BY CATEGORY */}
        {byCategory.map(([category, items]) => (
          <section
            key={category}
            className="py-12 sm:py-16 border-t border-slate-100"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Catégorie</p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {category}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((i) => (
                  <IntegrationCard key={i.slug} integration={i} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* REQUEST INTEGRATION */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              Une autre intégration ?
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Votre outil n'est pas dans la liste ?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              Les membres fondateurs influencent directement notre roadmap d'intégrations. Demandez la vôtre — si elle bénéficie à plusieurs fondateurs, elle passe en priorité.
            </p>
            <a
              href="mailto:contact@proprely.fr?subject=Demande%20d%27int%C3%A9gration"
              onClick={() => trackEvent('email_click', { location: 'integrations_request', kind: 'integration' })}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              <Mail size={14} />
              Demander une intégration
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Connectez Proprely à votre activité en 30 minutes
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              Onboarding direct avec le fondateur. On configure les intégrations utiles à votre stack pendant l'appel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'integrations_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-50 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <Link
                to="/securite-rgpd"
                className="inline-flex items-center justify-center gap-2 bg-blue-800/40 border border-white/30 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-800/60 transition-colors"
              >
                Voir notre sécurité & RGPD
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
