import { useEffect } from 'react'
import {
  ArrowRight,
  Shield,
  Lock,
  Server,
  FileCheck2,
  KeyRound,
  Eye,
  CheckCircle2,
  Mail,
  Download,
} from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/securite-rgpd'
const TITLE = 'Sécurité & RGPD · Proprely'
const DESCRIPTION =
  "La sécurité et la conformité RGPD chez Proprely : hébergement européen, chiffrement, gestion des droits, DPA, sous-traitants, journalisation. Documentation transparente pour les sociétés de nettoyage B2B."

const PILLARS = [
  {
    icon: Server,
    title: 'Hébergement européen',
    desc: "Données hébergées en France et en UE. Infrastructure auditée annuellement. Aucun transfert hors UE sans clauses contractuelles types et information préalable.",
  },
  {
    icon: Lock,
    title: 'Chiffrement bout en bout',
    desc: "TLS 1.3 obligatoire en transit. Chiffrement AES-256 au repos pour la base et les pièces jointes. Clés rotées et gérées en HSM par notre hébergeur.",
  },
  {
    icon: KeyRound,
    title: "Contrôle d'accès strict",
    desc: "Authentification renforcée pour les administrateurs Proprely, journalisation complète des accès aux données clients, principe du moindre privilège, rotation trimestrielle des secrets.",
  },
  {
    icon: FileCheck2,
    title: 'Conformité RGPD by design',
    desc: "Registre des traitements à jour, DPA signable à la demande, sous-traitants listés, durées de conservation paramétrées, exports de données en 1 clic, suppression sous 30 jours.",
  },
  {
    icon: Eye,
    title: 'Transparence opérationnelle',
    desc: "Vous gardez la propriété de vos données. Vous pouvez exporter au format CSV/Excel à tout moment. Aucun lock-in technique : vos données vous appartiennent.",
  },
  {
    icon: Shield,
    title: 'Surveillance et sauvegardes',
    desc: "Sauvegardes chiffrées quotidiennes avec rétention 30 jours. Plan de continuité documenté. Surveillance applicative 24/7. Tests de restauration trimestriels.",
  },
]

const SUBPROCESSORS = [
  { name: 'Hostinger / Hetzner', purpose: 'Hébergement applicatif et base de données', location: 'France / Allemagne' },
  { name: 'Vercel', purpose: 'Hébergement site marketing & preview', location: 'UE (région Francfort)' },
  { name: 'Cloudflare', purpose: 'CDN et protection DDoS', location: 'UE' },
  { name: 'Google Cloud (GA4)', purpose: "Mesure d'audience anonymisée (opt-in)", location: 'UE (Anonymize IP)' },
  { name: 'Fillout', purpose: 'Formulaires de bêta et audit', location: 'UE (RGPD-ready)' },
  { name: 'Brevo (à venir)', purpose: 'Routage emails newsletter et notifications', location: 'France' },
]

const RIGHTS = [
  { right: 'Accès', desc: 'Obtenir une copie de vos données personnelles', deadline: '< 30 jours' },
  { right: 'Rectification', desc: 'Corriger des données inexactes', deadline: '< 30 jours' },
  { right: 'Effacement', desc: 'Demander la suppression de vos données', deadline: '< 30 jours' },
  { right: 'Portabilité', desc: 'Export structuré (CSV / Excel) de vos données', deadline: '< 30 jours' },
  { right: 'Opposition / Limitation', desc: 'Vous opposer à un traitement ou le limiter', deadline: '< 30 jours' },
  { right: 'Retrait de consentement', desc: 'Retirer un consentement (cookies, newsletter)', deadline: 'Immédiat' },
]

const FAQS = [
  {
    q: 'Où sont hébergées les données Proprely ?',
    a: "L'ensemble des données applicatives et la base de données sont hébergées exclusivement en Union Européenne, principalement en France (Hostinger) et en Allemagne (Hetzner). Aucune donnée client n'est stockée hors UE. Les sauvegardes sont également maintenues dans l'UE.",
  },
  {
    q: 'Êtes-vous certifiés ISO 27001 ou SecNumCloud ?',
    a: "Proprely est en bêta privée. Nous appliquons dès aujourd'hui les principes de sécurité ISO 27001 (gestion des accès, chiffrement, journalisation) sans en avoir la certification formelle. La feuille de route post-bêta inclut une certification ISO 27001 et une qualification SecNumCloud quand l'échelle le justifiera. Notre hébergeur applicatif est lui-même certifié ISO 27001.",
  },
  {
    q: 'Pouvez-vous signer un DPA / contrat de sous-traitance RGPD ?',
    a: "Oui. Un Data Processing Agreement (DPA) au sens de l'article 28 du RGPD est disponible sur simple demande à dpo@proprely.fr. Il liste les finalités, les sous-traitants, les durées de conservation, et les mesures techniques et organisationnelles.",
  },
  {
    q: 'Qui peut accéder à mes données chez Proprely ?',
    a: "L'accès aux données de production est strictement limité aux administrateurs Proprely autorisés (équipe restreinte, < 3 personnes en bêta). Chaque accès est journalisé, authentifié par MFA, et lié à un motif (support utilisateur, incident, maintenance). Aucun marketing ni revente de données.",
  },
  {
    q: "Que se passe-t-il si je quitte Proprely ?",
    a: "Vous pouvez exporter l'ensemble de vos données (clients, sites, agents, plannings, missions, devis, factures) en CSV/Excel à tout moment depuis l'interface. À la résiliation, vos données sont conservées 30 jours (réversibilité), puis supprimées définitivement des bases de production et des sauvegardes selon le calendrier de rotation (30 jours supplémentaires maximum).",
  },
  {
    q: 'Utilisez-vous des cookies de traçage ?',
    a: "Uniquement après consentement explicite via le bandeau cookies. Aucun cookie de mesure ou publicitaire n'est déposé tant que vous n'avez pas cliqué « Accepter ». Sans consentement, seul un cookie technique de session est utilisé. Outils utilisés : Google Analytics 4 (anonymisé), Meta Pixel, LinkedIn Insight Tag — tous désactivables.",
  },
  {
    q: 'Comment exercer mes droits RGPD ?',
    a: "Pour exercer un droit (accès, rectification, effacement, portabilité, opposition, retrait de consentement), envoyez un email à dpo@proprely.fr en précisant votre demande. Nous répondons sous 30 jours maximum. Vous pouvez également saisir directement la CNIL en cas de désaccord.",
  },
  {
    q: 'Quelles sont vos durées de conservation ?',
    a: "Données clients actives : durée du contrat. Sauvegardes : 30 jours. Données de facturation : 10 ans (obligation légale). Logs applicatifs : 12 mois. Données prospects newsletter : jusqu'au retrait du consentement. Données ex-clients : 30 jours après résiliation, puis suppression définitive.",
  },
]

function injectSchema() {
  const id = 'securite-rgpd-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
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
          { '@type': 'ListItem', position: 2, name: 'Sécurité & RGPD', item: URL },
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

export default function SecuriteRGPD() {
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
      document.getElementById('securite-rgpd-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: 'Sécurité & RGPD' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-emerald-100">
              <Shield size={12} />
              Trust by design
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-[1.05] max-w-4xl">
              Sécurité & conformité RGPD
              <br />
              <span className="text-slate-600">pensées pour la propreté B2B</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Vos données métier — clients, sites, agents, contrats — sont parmi les plus sensibles que vous traitez. Voici comment Proprely les protège, document à l'appui.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-2">
              <a
                href="mailto:dpo@proprely.fr?subject=Demande%20DPA%20Proprely"
                onClick={() => trackEvent('email_click', { location: 'securite_rgpd_hero', kind: 'dpa' })}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                <Download size={14} />
                Demander notre DPA
              </a>
              <a
                href="mailto:dpo@proprely.fr"
                onClick={() => trackEvent('email_click', { location: 'securite_rgpd_hero', kind: 'dpo' })}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 bg-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                <Mail size={14} />
                Contacter le DPO
              </a>
            </div>
          </div>
        </section>

        {/* PILLARS */}
        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Les 6 piliers de notre sécurité
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Aucune promesse marketing. Chaque pilier est vérifiable, documenté et opposable contractuellement via notre DPA.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PILLARS.map((p) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-emerald-600" />
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SUBPROCESSORS */}
        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 bg-white text-slate-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
                Sous-traitants
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Qui traite vos données
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Liste complète et à jour des sous-traitants techniques avec leur finalité et leur localisation. Mise à jour notifiée par email aux clients en cas de changement.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-bold text-slate-700">Sous-traitant</th>
                    <th className="text-left p-4 font-bold text-slate-700">Finalité</th>
                    <th className="text-left p-4 font-bold text-slate-700">Localisation</th>
                  </tr>
                </thead>
                <tbody>
                  {SUBPROCESSORS.map((s) => (
                    <tr key={s.name} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-semibold text-slate-900">{s.name}</td>
                      <td className="p-4 text-slate-600">{s.purpose}</td>
                      <td className="p-4 text-slate-600 whitespace-nowrap">{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RIGHTS */}
        <section className="py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Vos droits RGPD, exerçables en un email
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Vous disposez de 6 droits sur vos données personnelles. Tous activables auprès de notre DPO à <a href="mailto:dpo@proprely.fr" className="text-blue-600 font-bold hover:underline">dpo@proprely.fr</a>, avec une réponse sous 30 jours maximum.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RIGHTS.map((r) => (
                <div key={r.right} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <h3 className="text-base font-black text-slate-900">Droit d'{r.right.toLowerCase()}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{r.desc}</p>
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 inline-block rounded-full px-2.5 py-1">
                    Délai : {r.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-white text-slate-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
                FAQ
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                Les questions sécurité qui reviennent en RFP B2B
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-2xl">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5 px-5 sm:px-6">
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

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Une question sécurité ou conformité ?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              Notre DPO répond sous 48 h ouvrées. Pour une démo qui inclut la revue sécurité, candidatez à la bêta privée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'securite_rgpd_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 rounded-xl px-7 py-4 font-black text-sm hover:bg-slate-100 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <a
                href="mailto:dpo@proprely.fr"
                onClick={() => trackEvent('email_click', { location: 'securite_rgpd_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-white/20 transition-colors"
              >
                <Mail size={14} />
                Contacter le DPO
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              <Link to="/confidentialite" className="hover:text-slate-200 underline">Politique de confidentialité</Link>
              {' '}·{' '}
              <Link to="/mentions-legales" className="hover:text-slate-200 underline">Mentions légales</Link>
              {' '}·{' '}
              <Link to="/cgu" className="hover:text-slate-200 underline">CGU</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
