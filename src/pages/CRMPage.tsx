import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, Users, Mail, BarChart3, Phone, FileText, HelpCircle, Sparkles, CheckCircle, X } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const URL = 'https://proprely.fr/crm-entreprise-proprete'
const TITLE = 'CRM entreprise propreté : suivez clients et prospects · Proprely'
const DESCRIPTION = "CRM pensé pour les entreprises de propreté : pipeline commercial, suivi clients et sites, relances devis, marge par compte. Conçu pour la propreté B2B française."

const limitsOfGenericCRM = [
  "HubSpot et Salesforce sont pensés pour le SaaS et la vente complexe : trop puissants, trop coûteux, sans logique métier propreté",
  "Pas de notion native de site client (un client = plusieurs sites avec fréquences distinctes)",
  "Pas de catalogue prestations propreté (quotidien bureaux, vitrerie, décapage, remise en état)",
  "Pas de lien automatique entre prospect signé et planning agents",
  "Pas de visibilité sur la marge par client en temps réel",
  "Onboarding lourd et tarif élevé (40-80 €/utilisateur/mois minimum)",
]

const proprelyCRMFeatures = [
  { icon: Building2, title: "Comptes clients + sites multiples", desc: "Un client = un compte, avec plusieurs sites. Chaque site a ses fréquences, ses prestations, ses contacts opérationnels et ses contacts décisionnaires." },
  { icon: Mail, title: "Pipeline prospects et devis", desc: "Suivez vos opportunités : envoyé / ouvert / signé. Relances automatiques à J+5 et J+10. Visibilité immédiate sur ce qui doit être relancé." },
  { icon: Users, title: "Contacts par site et par fonction", desc: "Le directeur, le facility manager, le gardien, le syndic : chaque interlocuteur a son rôle et son historique d'échanges." },
  { icon: Phone, title: "Historique des appels et SMS", desc: "Marquez les interventions commerciales (appel, mail, RDV, visite), suivez la fréquence par compte. Plus de prospects oubliés." },
  { icon: FileText, title: "Devis et catalogue propreté", desc: "Catalogue de prestations propreté pré-configuré (quotidien, vitrerie, décapage, remise en état). Génération de devis en 2 minutes." },
  { icon: BarChart3, title: "Marge par client en temps réel", desc: "Heures facturées vs heures réelles, marge brute par compte. Vous savez immédiatement quels clients portent vraiment votre rentabilité." },
]

const faq = [
  { q: "Pourquoi un CRM spécifique pour la propreté ?", a: "Parce que les CRM généralistes (HubSpot, Salesforce, Pipedrive) sont conçus pour la vente complexe SaaS ou B2B industrielle. Ils ne couvrent pas les spécificités propreté : un client = plusieurs sites, catalogue prestations métier, lien direct prospect → planning agents, marge par compte en temps réel." },
  { q: "Combien coûte un CRM propreté ?", a: "Les CRM généralistes coûtent 40-80 €/utilisateur/mois minimum (et 200+ € pour Salesforce). Proprely intègre les fonctions CRM dans sa plateforme : gratuit pendant la bêta, tarif fondateur à vie après le lancement public." },
  { q: "Quelle différence avec HubSpot pour mon entreprise de nettoyage ?", a: "HubSpot est excellent pour le marketing automation et la vente complexe (cycles de 6-12 mois, multiples décideurs). En propreté B2B, la vente est plus rapide (devis → signature en 1-3 semaines) et le besoin principal est de relier prospect → contrat → planning → marge. C'est ce que fait Proprely, sans la complexité HubSpot." },
  { q: "Peut-on migrer depuis HubSpot ou Salesforce ?", a: "Oui. Vos comptes et contacts sont importés depuis un export CSV. Vos opportunités en cours sont ré-injectées dans le pipeline Proprely. Lors de l'onboarding (30 min), nous configurons votre catalogue prestations et vos étapes commerciales." },
  { q: "Y a-t-il une connexion native avec Outlook ou Gmail ?", a: "La synchronisation calendrier (Google Calendar, Outlook) est en finalisation. La connexion email pour synchroniser les échanges client est prévue après la bêta. Pour l'instant, vous saisissez manuellement les interactions commerciales depuis l'interface." },
  { q: "Le module CRM est-il disponible séparément ?", a: "Non. Proprely est un cockpit unifié : clients/sites + agents + planning + devis + factures + documents + pilotage. Le CRM est intégré aux autres modules, pas vendu séparément. C'est cette intégration qui fait la valeur (relier prospect → planning → marge sans copier-coller)." },
  { q: "Combien de prospects et clients Proprely supporte-t-il ?", a: "Pas de limite imposée. Pendant la bêta, vous pouvez gérer autant de comptes, sites et contacts que vous voulez. Le produit est conçu pour 3-50 agents avec typiquement 10-150 sites clients." },
]

function injectSchema() {
  const id = 'crm-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: TITLE,
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'CRM entreprise propreté', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
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

export default function CRMPage() {
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
      document.getElementById('crm-schema')?.remove()
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
            <Breadcrumbs items={[{ name: 'CRM entreprise propreté' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              CRM métier propreté
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              CRM entreprise propreté :<br />
              <span className="text-blue-600">suivez clients, sites et prospects</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Un CRM pensé pour la réalité d'une société de nettoyage B2B : un compte client = plusieurs sites avec fréquences distinctes, pipeline devis avec relances auto, lien direct prospect → planning agents → marge réelle.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/beta"
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Tester le CRM en bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/logiciel-societe-nettoyage"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Voir tous les modules
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Pourquoi HubSpot ou Salesforce ne suffit pas
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Les CRM généralistes sont d'excellents outils — pour leurs cas d'usage. La propreté B2B a des spécificités qu'ils ne couvrent pas, et leur complexité/coût rendent leur adoption douloureuse pour une PME nettoyage.
            </p>
            <ul className="space-y-3">
              {limitsOfGenericCRM.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-xl p-4">
                  <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Le CRM Proprely</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                6 fonctions pensées propreté
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Intégrées au cockpit Proprely : le prospect que vous signez passe automatiquement en client avec ses sites, son planning et sa marge suivie.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {proprelyCRMFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{f.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Pourquoi c'est puissant : tout est connecté</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Un prospect signé devient un client avec ses sites en 1 clic. Les sites alimentent le planning des agents. Le planning génère les heures facturées. Les heures comparées au temps réel donnent la marge. Tout dans un seul outil — voir aussi <Link to="/fonctionnalites/devis-nettoyage" className="text-blue-600 hover:underline font-semibold">le module devis</Link> et <Link to="/fonctionnalites/planning-nettoyage" className="text-blue-600 hover:underline font-semibold">le planning agents</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Vos questions sur le CRM Proprely
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {faq.map((f, i) => (
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
              Centralisez vos clients et pilotez vos prospects
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur.
            </p>
            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
