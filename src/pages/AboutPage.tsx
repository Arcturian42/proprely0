import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Compass, Heart, ShieldCheck, Users, MapPin, ExternalLink } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import { BETA_FORM_URL, FOUNDER } from '../config'
import { trackEvent } from '../lib/analytics'

const META = {
  title: 'À propos de Proprely : notre mission et notre équipe · Proprely',
  description:
    "Proprely est édité par Pershing Global Solutions LTD. Notre mission : libérer les dirigeants de sociétés de nettoyage B2B de la dispersion.",
  url: 'https://proprely.fr/a-propos',
}

function injectAboutSchema() {
  const id = 'about-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: META.title,
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      mainEntity: { '@id': 'https://proprely.fr/#organization' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://proprely.fr/a-propos#paul-munier',
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
      url: FOUNDER.url,
      sameAs: [FOUNDER.linkedin],
      worksFor: { '@id': 'https://proprely.fr/#organization' },
      knowsAbout: FOUNDER.knowsAbout,
      description: FOUNDER.bio,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'À propos', item: META.url },
      ],
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

const values = [
  {
    icon: Compass,
    title: 'Conçu avec des dirigeants du nettoyage',
    description:
      "Chaque fonctionnalité de Proprely a été construite à partir d'entretiens avec des dirigeants de sociétés de nettoyage B2B en France. Pas de fonction inventée. Pas de gadget. Que des choses qui répondent à un problème terrain réel.",
  },
  {
    icon: Heart,
    title: 'Bêta privée, accompagnée, gratuite',
    description:
      "Nous lançons avec 30 sociétés fondatrices, sélectionnées sur dossier. Onboarding 30 minutes avec le fondateur, support prioritaire, influence directe sur la feuille de route. Tarif fondateur conservé à vie après le lancement public.",
  },
  {
    icon: ShieldCheck,
    title: 'Vos données restent vos données',
    description:
      "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire à 100 %. Vous pouvez exporter en 1 clic, à tout moment, dans des formats standards. Aucun lock-in technique ou contractuel.",
  },
  {
    icon: Building2,
    title: 'Édité par une société IT établie',
    description:
      "Proprely est édité par Pershing Global Solutions LTD (Dublin, Irlande), société IT spécialisée dans le développement de logiciels métiers sur mesure. Cela vous garantit une équipe technique structurée et un éditeur engagé sur la durée.",
  },
]

const milestones = [
  {
    year: 'Février 2026',
    title: "Premiers entretiens",
    text: "Premiers entretiens terrain avec des dirigeants de sociétés de nettoyage B2B. Constat partagé : 6 à 10 heures par semaine perdues à jongler entre Excel, WhatsApp, Word, Drive et papier. Personne n'a d'outil unifié conçu pour le métier.",
  },
  {
    year: 'Mars 2026',
    title: "Construction",
    text: "Construction du produit avec un panel de dirigeants. Itérations hebdomadaires, focus sur les 7 modules essentiels : clients & sites, agents, planning, missions avec preuve de passage, devis & factures, documents, pilotage avec marge par client.",
  },
  {
    year: 'Juillet 2026',
    title: "Bêta privée",
    text: "Ouverture de la bêta privée à 30 sociétés fondatrices sélectionnées. Onboarding 30 minutes avec le fondateur, support prioritaire, influence directe sur la feuille de route, conditions tarifaires préférentielles conservées à vie.",
  },
]

export default function AboutPage() {
  useEffect(() => {
    document.title = META.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', META.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', META.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', META.url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', META.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', META.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', META.url)
    injectAboutSchema()
    return () => {
      document.getElementById('about-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-14 sm:pb-20 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'À propos' }]} />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Libérer les dirigeants du nettoyage de la dispersion administrative
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Proprely est le cockpit métier qui centralise clients, sites, agents, planning, missions, devis et pilotage d'une société de nettoyage B2B dans un seul outil. Conçu en France, en bêta privée auprès de 30 sociétés fondatrices.
            </motion.p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Notre mission
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
              Diriger une société de nettoyage B2B en France en 2026, c'est jongler entre Excel pour le planning, WhatsApp pour les changements de dernière minute, Word pour les devis, Google Drive pour les documents, et le papier pour la preuve de passage.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
              Résultat : <strong>6 à 10 heures par semaine</strong> perdues par le dirigeant en administration dispersée. À 45 € de coût horaire, c'est <strong>12 600 à 21 000 € de coût caché par an</strong>. Et surtout, c'est une charge mentale qui finit par bloquer la croissance.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Notre mission est simple : <strong>libérer ces heures et cette charge mentale</strong>. Un seul cockpit qui centralise tout, conçu avec les dirigeants qui l'utilisent, sur la convention collective IDCC 3043 et les exigences réelles des syndics, facility managers et clients B2B français.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight text-center">
              Nos engagements
            </h2>
            <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Quatre principes qui guident le produit et la relation avec les sociétés fondatrices.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug">{v.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{v.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
              Le fondateur
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Proprely est porté par une personne qui parle au quotidien avec ses utilisateurs.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0 sm:w-32">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-lg shadow-blue-600/20">
                    PM
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">{FOUNDER.name}</h3>
                  <p className="text-sm sm:text-base text-blue-700 font-bold mb-4">{FOUNDER.jobTitle}</p>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
                    {FOUNDER.bio}
                  </p>
                  <a
                    href={FOUNDER.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('founder_linkedin_click', { location: 'about_page' })}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 font-semibold text-sm hover:border-blue-300 hover:text-blue-700 hover:shadow-sm transition-colors"
                  >
                    <ExternalLink size={14} />
                    Profil LinkedIn de {FOUNDER.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-10 leading-tight">
              Notre histoire
            </h2>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex gap-5"
                >
                  <div className="shrink-0 w-24 sm:w-28 text-right font-black text-blue-600 text-sm sm:text-base pt-1">{m.year}</div>
                  <div className="border-l-2 border-blue-100 pl-5">
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1.5">{m.title}</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Éditeur</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Pershing Global Solutions LTD</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Société IT spécialisée dans le développement de logiciels métiers sur mesure. Proprely est l'un de ses produits dédiés au marché B2B français des sociétés de nettoyage.
                </p>
                <a href="https://pershingsolution.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:underline mt-3">
                  pershingsolution.com
                  <ArrowRight size={12} />
                </a>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} className="text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Siège</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">Dublin, Irlande</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-1">
                  77 Camden Lower Street, Saint Kevin
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">
                  Dublin D02 XE80, Irlande
                </p>
                <p className="text-sm text-slate-500">
                  Service support et commercial en français : <a href="mailto:contact@proprely.fr" className="text-blue-600 font-semibold hover:underline">contact@proprely.fr</a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <Users size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Programme fondateur</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Vous voulez participer à la construction de Proprely ?
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-4">
              Nous sélectionnons <strong>30 sociétés de nettoyage fondatrices</strong>. Pendant toute la durée de la bêta privée, vous utilisez Proprely gratuitement, vous influencez la feuille de route, et vous bénéficiez d'un support prioritaire.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-8">
              Après le lancement public, vous gardez votre <strong>tarif fondateur à vie</strong>, fixé à l'avance et non soumis aux augmentations futures.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'about_page' })}
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
