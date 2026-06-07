import { useEffect } from 'react'
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
  FileText,
  Eye,
  Workflow,
  Zap,
  Shield,
  Smartphone,
  LineChart,
} from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { features } from '../data/features'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/fonctionnalites'
const TITLE = 'Fonctionnalités logiciel nettoyage : modules complets · Proprely'
const DESCRIPTION =
  "Les 4 modules Proprely pour piloter une société de nettoyage : clients & sites, devis & ventes, planning & agents, missions & preuve de passage. Cockpit métier B2B."

type ModuleId = 'clients-sites' | 'devis-ventes' | 'planning-agents' | 'missions-preuve'

type ModuleDef = {
  id: ModuleId
  step: string
  name: string
  tagline: string
  description: string
  icon: typeof Building2
  accent: string
  ringBg: string
  iconBg: string
  iconColor: string
  slugs: string[]
}

const MODULES: ModuleDef[] = [
  {
    id: 'clients-sites',
    step: '01',
    name: 'Clients & sites',
    tagline: 'Le référentiel central de votre activité',
    description:
      "Centralisez clients, sites multi-adresses, contacts, prestations, documents et historique opérationnel. Une fiche client = tout ce que vos équipes commerciale, planning et terrain doivent voir, au même endroit.",
    icon: Building2,
    accent: 'from-blue-500 to-cyan-400',
    ringBg: 'bg-blue-50',
    iconBg: 'bg-blue-600',
    iconColor: 'text-blue-600',
    slugs: ['gestion-sites-clients-nettoyage'],
  },
  {
    id: 'devis-ventes',
    step: '02',
    name: 'Devis & ventes',
    tagline: "Du prospect à la facture, sans Excel",
    description:
      "Algorithme IA propriétaire qui croise 9 facteurs pour proposer 3 scénarios par devis. Signature électronique, facturation récurrente, relances automatiques, conformité Factur-X 2026.",
    icon: FileText,
    accent: 'from-violet-500 to-purple-400',
    ringBg: 'bg-violet-50',
    iconBg: 'bg-violet-600',
    iconColor: 'text-violet-600',
    slugs: ['devis-nettoyage', 'facturation-nettoyage'],
  },
  {
    id: 'planning-agents',
    step: '03',
    name: 'Planning & agents',
    tagline: 'Le terrain organisé en 1 clic',
    description:
      "Planning visuel drag-and-drop, affectation selon spécialité et charge horaire, pointage GPS mobile sans app, compteur d'heures automatique, export paie Silae. Vos agents savent où aller. Vous savez qui fait quoi.",
    icon: Calendar,
    accent: 'from-emerald-500 to-teal-400',
    ringBg: 'bg-emerald-50',
    iconBg: 'bg-emerald-600',
    iconColor: 'text-emerald-600',
    slugs: ['planning-nettoyage', 'gestion-agents-nettoyage', 'pointage-agents-nettoyage'],
  },
  {
    id: 'missions-preuve',
    step: '04',
    name: 'Missions & preuve de passage',
    tagline: 'Zéro litige, traçabilité totale',
    description:
      "Chaque intervention est tracée : QR code site, photos horodatées, signature client, rapport automatique. Fin des contestations « vous n'êtes pas passé ». Conformité syndic, hôtels et exigences médicales.",
    icon: Eye,
    accent: 'from-amber-500 to-orange-400',
    ringBg: 'bg-amber-50',
    iconBg: 'bg-amber-600',
    iconColor: 'text-amber-600',
    slugs: ['suivi-interventions-nettoyage', 'preuve-passage-nettoyage'],
  },
]

const VALUE_PROPS = [
  { icon: Workflow, title: 'Modules connectés', desc: "Un devis signé devient un contrat, qui crée des missions au planning, qui génèrent des preuves de passage, qui alimentent la facturation. Aucun double-saisie." },
  { icon: Smartphone, title: 'Mobile sans installation', desc: "Vos agents reçoivent un lien web. Ils ouvrent leur planning, pointent et valident la preuve depuis leur téléphone. Aucune app Android/iOS à installer." },
  { icon: Zap, title: 'Setup en 30 minutes', desc: "Onboarding direct avec le fondateur. Import de vos clients, sites, agents, fréquences en une visio. Vous repartez avec un cockpit opérationnel." },
  { icon: Shield, title: 'Hébergement européen, RGPD', desc: "Données hébergées en France, conformité RGPD, export 1-clic à tout moment dans des formats standards. Aucun lock-in." },
  { icon: LineChart, title: 'Marge par client en temps réel', desc: "Heures réelles vs facturé, coûts directs et indirects, alertes dérive. Vous voyez quels contrats portent votre rentabilité." },
  { icon: CheckCircle2, title: "Pensé pour la propreté B2B", desc: "Spécialités natives (vitrerie, médical, décapage), conformité IDCC 3043, gestion article 7, primes panier/transport/salissure. Pas un outil générique." },
]

const FLOW_STEPS = [
  { label: 'Prospect', module: '01' },
  { label: 'Devis IA', module: '02' },
  { label: 'Client + Site', module: '01' },
  { label: 'Planning', module: '03' },
  { label: 'Mission', module: '04' },
  { label: 'Preuve', module: '04' },
  { label: 'Facturation', module: '02' },
  { label: 'Marge', module: '02' },
]

const FAQS = [
  {
    q: 'Comment les 4 modules de Proprely se connectent-ils entre eux ?',
    a: "Un devis signé dans le module Devis & ventes crée automatiquement un contrat lié à un client et un site dans le module Clients & sites. Les fréquences contractuelles génèrent les missions récurrentes dans le module Missions, qui apparaissent au planning des agents (module Planning). Chaque mission validée déclenche la preuve de passage et incrémente le compteur d'heures qui alimentera la facturation. Aucun double-saisie, aucun export Excel intermédiaire.",
  },
  {
    q: 'Faut-il choisir ses modules à la carte ou tout est inclus ?',
    a: "Pendant la bêta privée, l'ensemble des 4 modules est inclus dans une seule offre. La logique « cockpit complet » est volontaire : il n'y a pas de valeur à n'avoir que le planning sans la preuve de passage, ou les devis sans la facturation. La grille tarifaire post-bêta sera lisible (forfait par tranche de taille), sans add-ons cachés.",
  },
  {
    q: 'Mes agents doivent-ils télécharger une application ?',
    a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning, le pointage et la preuve de passage s'affichent dans son navigateur. Pas d'installation, pas de blocage Android/iOS, fonctionne en 4G dégradée. C'est un choix stratégique : 100 % d'adoption en moins d'une journée.",
  },
  {
    q: "L'IA du module devis est-elle une vraie IA ou un simple calcul ?",
    a: "C'est un algorithme propriétaire qui croise 9 facteurs en temps réel : prix marché local par zone INSEE, disponibilités du calendrier, profil client estimé (taille, secteur, historique), masse salariale chargée IDCC 3043 réelle, consommables, machines, frais de structure, marketing alloué, crédibilité prestataire. Le modèle propose 3 scénarios distincts (marge protégée / gagner le contrat / upsell maximisé) — vous gardez la décision finale.",
  },
  {
    q: "Combien de temps pour démarrer ? Et si je suis encore sur Excel ?",
    a: "30 minutes avec le fondateur. On importe ensemble vos clients, sites, agents, fréquences depuis votre Excel actuel (n'importe quel format). À la fin de l'appel, votre cockpit est opérationnel et vos premiers plannings sont prêts à être envoyés. Aucun consultant intégrateur, aucun setup à plusieurs milliers d'euros.",
  },
  {
    q: 'Comment se compare Proprely aux autres logiciels nettoyage (Organilog, Progiclean, PROPRET) ?',
    a: "Organilog est multi-métiers (BTP, sécurité, espaces verts) avec une UX généraliste. Progiclean et PROPRET sont propreté-natifs mais sur des architectures legacy avec des apps à installer et des UX datées. Proprely est conçu nouvelle génération : web sans app pour les agents, IA pour les devis, marge par client en temps réel, modules connectés sans double saisie. Le bon choix dépend de votre taille : Proprely est calibré TPE/PME B2B 3-50 agents.",
  },
]

const featuresBySlug = new Map(features.map((f) => [f.slug, f]))

function injectSchema() {
  const id = 'feature-index-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Fonctionnalités Proprely',
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      hasPart: features.map((f) => ({
        '@type': 'WebPage',
        name: f.title,
        url: `https://proprely.fr/fonctionnalites/${f.slug}`,
        description: f.metaDescription,
      })),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Fonctionnalités', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
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

export default function FeatureIndex() {
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
      document.getElementById('feature-index-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-24">
          <div className="absolute inset-0 -z-10 opacity-50">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Fonctionnalités' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-100">
              <Sparkles size={12} />
              4 modules connectés · 8 fonctionnalités · 1 seul outil
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Le cockpit métier complet
              <br />
              pour piloter votre société de nettoyage B2B
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Du prospect à la rentabilité opérationnelle : <strong className="text-slate-900">clients & sites, devis & ventes, planning & agents, missions & preuve de passage</strong>. Quatre modules pensés pour la propreté B2B, qui se parlent entre eux, sans double saisie ni copier-coller.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'feature_index_hero' })}
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Rejoindre la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('audit_cta_click', { location: 'feature_index_hero' })}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 bg-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Audit gratuit 30 min
              </a>
            </div>

            {/* Module pills */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
              {MODULES.map((m) => {
                const Icon = m.icon
                return (
                  <a
                    key={m.id}
                    href={`#${m.id}`}
                    className="group flex items-center gap-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg ${m.ringBg} flex items-center justify-center shrink-0`}>
                      <Icon size={16} className={m.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Module {m.step}</div>
                      <div className="text-sm font-bold text-slate-900 truncate">{m.name}</div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Ce qui change quand tout est connecté
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Excel et WhatsApp coûtent invisible : 6 à 10 heures par semaine de saisie, des marges qui fondent, des litiges sans preuve. Proprely centralise les 4 piliers métier dans un cockpit unique pensé pour les TPE/PME propreté B2B.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VALUE_PROPS.map((v) => {
                const Icon = v.icon
                return (
                  <div
                    key={v.title}
                    className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-slate-200 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{v.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FLOW DIAGRAM */}
        <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow size={12} />
                Comment les modules se parlent
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Du prospect à la marge, sans rupture
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Une donnée saisie une seule fois, qui circule dans toute la chaîne. Chaque étape met à jour la suivante automatiquement.
              </p>
            </div>

            <div className="overflow-x-auto -mx-4 px-4 pb-2">
              <div className="flex items-center gap-2 min-w-max sm:justify-between">
                {FLOW_STEPS.map((s, idx) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm shrink-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        Module {s.module}
                      </div>
                      <div className="text-sm font-bold text-slate-900 whitespace-nowrap">{s.label}</div>
                    </div>
                    {idx < FLOW_STEPS.length - 1 && (
                      <ArrowRight size={16} className="text-slate-300 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODULES DETAILED */}
        {MODULES.map((m, mIdx) => {
          const Icon = m.icon
          const moduleFeatures = m.slugs.map((slug) => featuresBySlug.get(slug)).filter(Boolean)

          return (
            <section
              key={m.id}
              id={m.id}
              className={`py-14 sm:py-24 scroll-mt-24 ${mIdx % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-14">
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.accent} flex items-center justify-center shadow-lg`}>
                        <Icon size={26} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Module {m.step}
                        </div>
                        <div className="text-2xl font-black text-slate-900 leading-tight">{m.name}</div>
                      </div>
                    </div>
                    <p className="text-base font-semibold text-slate-700 mb-3 leading-snug">{m.tagline}</p>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{m.description}</p>
                  </div>

                  <div className="space-y-4">
                    {moduleFeatures.map((f) => {
                      if (!f) return null
                      const FIcon = f.icon
                      return (
                        <Link
                          key={f.slug}
                          to={`/fonctionnalites/${f.slug}`}
                          className="group block bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 hover:border-blue-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl ${m.ringBg} flex items-center justify-center shrink-0`}>
                              <FIcon size={22} className={m.iconColor} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${m.iconColor} ${m.ringBg} rounded-full px-2 py-0.5`}>
                                  {f.tag}
                                </span>
                              </div>
                              <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                                {f.title}
                              </h3>
                              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-4">
                                {f.subtitle}
                              </p>
                              {f.benefits && f.benefits.length > 0 && (
                                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                                  {f.benefits.slice(0, 4).map((b) => (
                                    <li key={b.title} className="flex items-start gap-2 text-sm text-slate-700">
                                      <CheckCircle2 size={14} className={`${m.iconColor} mt-0.5 shrink-0`} />
                                      <span className="leading-snug">{b.title}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                                Voir le détail de la fonctionnalité
                                <ArrowRight size={14} />
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* COMPARISON STRIP */}
        <section className="py-14 sm:py-20 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  Avant / après
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
                  Excel + WhatsApp coûtent
                  <br />
                  <span className="text-cyan-300">6 à 10 h par semaine</span>
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  De la double saisie planning/paie aux litiges sans preuve, en passant par les devis sous-tarifés : la dispersion a un coût mesurable. Proprely centralise tout dans un cockpit unique pensé pour la propreté B2B.
                </p>
                <Link
                  to="/proprely-vs-excel"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-300 hover:text-cyan-200"
                >
                  Voir le comparatif Proprely vs Excel
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Heures gagnées/semaine', val: '6-10 h' },
                  { label: 'Marge récupérée', val: '+2-5 pts' },
                  { label: 'Litiges évités/an', val: '~12' },
                  { label: 'Setup', val: '30 min' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <div className="text-3xl sm:text-4xl font-black text-white mb-1">{s.val}</div>
                    <div className="text-xs text-slate-400 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                FAQ
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Les questions qui reviennent
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                    <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{f.q}</span>
                    <span className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-slate-500 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="text-sm sm:text-base text-slate-600 leading-relaxed pt-4">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 -z-0 opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-300 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-5 leading-tight">
              Voir Proprely fonctionner sur votre activité
            </h2>
            <p className="text-base sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              30 minutes avec le fondateur. On importe votre Excel, on monte vos premiers plannings, vous repartez avec un cockpit opérationnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'feature_index_final' })}
                className="group inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-50 transition-all shadow-2xl shadow-blue-900/30 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Rejoindre la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('audit_cta_click', { location: 'feature_index_final' })}
                className="inline-flex items-center justify-center gap-2 bg-blue-800/40 border border-white/30 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-800/60 transition-colors"
              >
                Audit gratuit 30 min
              </a>
            </div>
            <p className="text-xs text-blue-200 mt-5">Sans CB · Sans engagement · Tarif fondateur garanti à vie</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
