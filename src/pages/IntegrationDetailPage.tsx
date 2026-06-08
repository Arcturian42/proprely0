import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, CheckCircle, HelpCircle, Sparkles, Zap } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import NotFound from './NotFound'
import { integrations, STATUS_LABEL, STATUS_STYLE, type Integration } from '../data/integrations'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

function getIntegration(slug: string): Integration | undefined {
  const i = integrations.find((x) => x.slug === slug)
  return i?.detail ? i : undefined
}

function injectSchema(i: Integration) {
  const id = 'integration-detail-schema'
  document.getElementById(id)?.remove()
  if (!i.detail) return
  const url = `https://proprely.fr/integrations/${i.slug}/`
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: i.detail.metaTitle,
      description: i.detail.metaDescription,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-08',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      abstract: i.detail.tldr,
      mentions: i.website
        ? [{ '@type': 'Organization', name: i.name, url: i.website }]
        : [{ '@type': 'Organization', name: i.name }],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'aside > p:first-of-type'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Intégrations', item: 'https://proprely.fr/integrations/' },
        { '@type': 'ListItem', position: 3, name: `${i.name} × Proprely`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: i.detail.faq.map((f) => ({
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

export default function IntegrationDetailPage({ slug }: Props) {
  const i = getIntegration(slug)

  useEffect(() => {
    if (!i || !i.detail) return
    const url = `https://proprely.fr/integrations/${i.slug}/`
    document.title = i.detail.metaTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', i.detail.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', i.detail.metaTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', i.detail.metaDescription)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', i.detail.metaTitle)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', i.detail.metaDescription)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectSchema(i)
    return () => {
      document.getElementById('integration-detail-schema')?.remove()
    }
  }, [i])

  if (!i || !i.detail) return <NotFound />

  const Icon = i.icon
  const a = i.accent
  const d = i.detail

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Intégrations', href: '/integrations' }, { name: `${i.name} × Proprely` }]} />
            </div>

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className={`w-14 h-14 rounded-2xl ${a.bg} ${a.border} border flex items-center justify-center`}>
                <Icon size={26} className={a.text} />
              </div>
              <span className="text-3xl font-bold text-slate-400">×</span>
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                <Sparkles size={22} className="text-white" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <span className={`inline-block w-1.5 h-1.5 rounded-full bg-blue-600`} />
              Intégration {STATUS_LABEL[i.status]}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              {i.name} × Proprely
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              {d.heroPitch}
            </motion.p>

            <motion.aside
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="text-left bg-white border-l-4 border-blue-500 rounded-r-2xl p-5 sm:p-6 mb-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Réponse-flash</span>
              </div>
              <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">{d.tldr}</p>
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
                onClick={() => trackEvent('beta_cta_click', { location: 'integration_hero', integration: i.slug })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta Proprely
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              {i.website && (
                <a
                  href={i.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Site officiel {i.name}
                  <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Ce que {i.name} × Proprely vous permet de faire
            </h2>
            <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              {d.useCases.length} cas d'usage concrets, validés par les sociétés de nettoyage fondatrices de Proprely.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {d.useCases.map((uc, k) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: k * 0.05 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">{uc.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed ml-7">{uc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Comment ça marche
            </h2>
            <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              Mise en place en quelques minutes depuis votre compte Proprely. Aucune compétence technique requise.
            </p>
            <ol className="space-y-5">
              {d.howItWorks.map((step, k) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: k * 0.06 }}
                  className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-5 sm:p-6"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {k + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5 leading-snug">{step.step}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Tout ce qu'on nous demande sur {i.name} × Proprely
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {d.faq.map((f, k) => (
                <details key={k} className="group p-5 sm:p-6 cursor-pointer">
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

        {d.relatedLinks?.length ? (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                À lire aussi
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {d.relatedLinks.map((rl, k) => (
                  <li key={k}>
                    <Link
                      to={rl.to}
                      className="block bg-white border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-200"
                    >
                      <span className="text-sm sm:text-base font-semibold text-slate-900">{rl.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <span className={`inline-block px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-4 ${STATUS_STYLE[i.status]}`}>
              {STATUS_LABEL[i.status]}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Tester Proprely + {i.name} gratuitement
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur, intégration {i.name} incluse.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'integration_footer', integration: i.slug })}
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
