import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Sparkles, TrendingUp, Search, Users, Building2 } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const META = {
  title: 'Audit gratuit de votre société de nettoyage : 30 min · Proprely',
  description:
    "30 minutes pour identifier vos pertes de temps et d'argent, et chiffrer le ROI d'une digitalisation. Audit offert avec le fondateur Proprely, sans engagement.",
  url: 'https://proprely.fr/audit-gratuit/',
}

function injectSchema() {
  const id = 'audit-schema'
  document.getElementById(id)?.remove()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: META.title,
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Audit gratuit', item: META.url },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Audit gratuit société de nettoyage',
      description: "Audit de 30 minutes avec le fondateur Proprely : identification des pertes de temps, chiffrage du ROI d'une digitalisation, recommandations adaptées à votre taille.",
      provider: { '@id': 'https://proprely.fr/#organization' },
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    },
  ]

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

const auditPoints = [
  { icon: Search, title: "Cartographie de vos outils actuels", desc: "Excel, WhatsApp, Word, Google Agenda, papier… On liste tout et on identifie où l'info se perd entre les outils." },
  { icon: Clock, title: "Chiffrage du temps perdu en gestion", desc: "Combien d'heures par semaine consacrez-vous (vous et vos chefs d'équipe) à la gestion ? On calcule en euros." },
  { icon: TrendingUp, title: "Identification des contrats sous-tarifés", desc: "On regarde 2-3 contrats avec vous et on chiffre la marge brute réelle. Souvent : surprise désagréable." },
  { icon: Users, title: "Diagnostic risque RH / turnover", desc: "Quel est votre taux de turnover ? Vos agents les plus chargés sont-ils protégés ? On évalue le risque." },
  { icon: Building2, title: "Roadmap de digitalisation chiffrée", desc: "À la fin de l'audit, vous repartez avec une roadmap claire : que digitaliser en priorité, dans quel ordre, quel ROI attendre." },
]

const auditFaq = [
  { q: "Combien coûte l'audit ?", a: "0 €, c'est offert par Proprely. Notre objectif : vous aider à identifier ce qui vous coûte du temps et de l'argent, que vous deveniez client ou non. Si à la fin Proprely ne vous correspond pas, nous vous orienterons honnêtement vers une autre solution." },
  { q: "Combien de temps ça prend ?", a: "30 minutes en visio (Google Meet ou téléphone). On peut faire plus court (20 min) ou plus long (45 min) selon votre disponibilité et la complexité de votre activité." },
  { q: "Qui fait l'audit ?", a: "Paul Munier, fondateur de Proprely. Pas un commercial, pas un junior. L'audit fait partie de notre démarche : comprendre les vraies douleurs des dirigeants de sociétés de nettoyage avant de leur proposer une solution." },
  { q: "Que dois-je préparer ?", a: "Rien d'obligatoire. Si vous avez 5 minutes : ayez en tête le nombre d'agents, le nombre de sites/clients, et 1 ou 2 contrats sur lesquels vous voulez creuser la marge. Sinon, on regardera ensemble pendant l'appel." },
  { q: "Et si vous me proposez Proprely à la fin ?", a: "Nous pouvons vous proposer de candidater à la bêta privée (30 places fondateurs, gratuit pendant toute la bêta, tarif fondateur à vie après) si votre profil correspond. Sans engagement de votre part. Si Proprely ne convient pas, nous orientons honnêtement vers d'autres solutions du marché." },
  { q: "Faut-il être une grosse société pour bénéficier de l'audit ?", a: "Non. Nous faisons l'audit dès 3 agents, et jusqu'à 50 agents. Au-delà, nous orientons vers des solutions ERP métier plus adaptées (PROPRET, Progiclean, 2BePragma)." },
]

export default function AuditGratuit() {
  useEffect(() => {
    document.title = META.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', META.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', META.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', META.url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', META.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', META.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', META.url)
    injectSchema()
    return () => {
      document.getElementById('audit-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs items={[{ name: 'Audit gratuit' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Audit offert · 30 minutes
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Audit gratuit de votre <br className="hidden sm:block" />
              <span className="text-blue-600">société de nettoyage</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              30 minutes en visio avec le fondateur Proprely pour identifier vos pertes de temps et d'argent, et chiffrer le ROI d'une digitalisation. Audit offert, sans engagement. Pour TPE/PME 3-50 agents.
            </motion.p>

            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Demander mon audit gratuit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-slate-500 mt-3">Réponse sous 24 h ouvrées</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Ce que vous obtenez</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                5 livrables concrets à la fin des 30 minutes
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {auditPoints.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <p.icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1.5">{p.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Comment ça se passe</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-10">
              4 étapes simples
            </h2>

            <ol className="space-y-4 text-left">
              {[
                { n: 1, title: "Vous demandez votre audit", desc: "Formulaire en 2 minutes. Vous précisez votre nombre d'agents, votre activité et vos disponibilités." },
                { n: 2, title: "On vous propose 3 créneaux sous 24 h ouvrées", desc: "Vous choisissez celui qui vous arrange. Le lien Google Meet vous est envoyé automatiquement." },
                { n: 3, title: "30 min d'échange avec le fondateur", desc: "On parcourt vos outils actuels, on chiffre le temps perdu, on regarde 2-3 contrats pour la marge, on diagnostique le risque RH." },
                { n: 4, title: "Roadmap chiffrée envoyée par email", desc: "Sous 48 h, vous recevez un email récapitulatif : ce qu'on a identifié, les priorités, le ROI estimé. Vous décidez de la suite. Sans engagement." },
              ].map((s) => (
                <li key={s.n} className="flex gap-4 bg-white border border-slate-100 rounded-2xl p-5">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center">{s.n}</div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              to="/beta"
              className="group mt-10 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Demander mon audit gratuit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Vos questions sur l'audit gratuit
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {auditFaq.map((f, i) => (
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

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              30 minutes, 0 €, des chiffres concrets
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Que vous deveniez client Proprely ou non, vous repartez avec un état des lieux chiffré de votre organisation et une roadmap de digitalisation adaptée à votre taille.
            </p>
            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Demander mon audit gratuit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
