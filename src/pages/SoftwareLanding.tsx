import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, X, Calendar, FileText, Users, QrCode, BarChart3, Smartphone, ShieldCheck, Sparkles, HelpCircle, Calculator, Zap } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { FOUNDER_SPOTS, remainingSpots } from '../config'

const URL = 'https://proprely.fr/logiciel-societe-nettoyage'
const TITLE = 'Logiciel pour société de nettoyage : le guide complet 2026 · Proprely'
const DESCRIPTION = "Logiciel de gestion pensé pour les sociétés de nettoyage B2B : planning, devis, agents, preuve de passage, marge par client. Comparatif avec Excel, PROPRET, Progiclean. Bêta privée gratuite."

const painPoints = [
  "Excel, WhatsApp, Word et Google Agenda — 7 outils dispersés, 6 à 10 heures perdues par semaine",
  "Aucune marge par client visible en temps réel, vous facturez à l'aveugle",
  "Vos agents oublient des passages, vos clients contestent, vous perdez le contrat",
  "Les remplacements se gèrent par téléphone, sans historique, sans traçabilité",
  "Vos devis prennent 20 minutes sur Word, le concurrent envoie en 5",
  "Pas de visibilité sur le surmenage agents, vous découvrez les arrêts maladie après-coup",
]

const coreFeatures = [
  { icon: Calendar, slug: 'planning-nettoyage', title: 'Planning agents', desc: "Affectation 1-clic selon spécialités et charge, planning mobile pour chaque agent sans application à installer." },
  { icon: FileText, slug: 'devis-nettoyage', title: 'Devis professionnels', desc: "Devis en 2 minutes depuis votre catalogue, signature électronique native, suivi commercial automatique." },
  { icon: Users, slug: 'gestion-agents-nettoyage', title: 'Gestion des agents', desc: "Profils, spécialités, charge horaire, alertes surmenage, compteur d'heures pour la paie en 2 clics." },
  { icon: QrCode, slug: 'preuve-passage-nettoyage', title: 'Preuve de passage', desc: "QR code par site, photos avant-après horodatées, signature client, PV automatique envoyé au gestionnaire." },
]

const competitorTable = [
  {
    criteria: "Conçu spécifiquement pour la propreté B2B",
    excel: { v: 'Non, générique', status: 'bad' },
    propret: { v: 'Oui', status: 'ok' },
    progiclean: { v: 'Oui', status: 'ok' },
    proprely: { v: 'Oui, dès le 1er pixel', status: 'ok' },
  },
  {
    criteria: "Affectation agents en 1 clic",
    excel: { v: 'Manuel, copier-coller', status: 'bad' },
    propret: { v: 'Oui (interface dense)', status: 'ok' },
    progiclean: { v: 'Oui', status: 'ok' },
    proprely: { v: 'Drag-and-drop moderne', status: 'ok' },
  },
  {
    criteria: "Mobile-first agents (sans app à installer)",
    excel: { v: 'Non', status: 'bad' },
    propret: { v: 'Application native', status: 'warn' },
    progiclean: { v: 'Application native', status: 'warn' },
    proprely: { v: 'Lien web, aucune installation', status: 'ok' },
  },
  {
    criteria: "Preuve de passage QR + photos + signature",
    excel: { v: 'Non', status: 'bad' },
    propret: { v: 'Oui', status: 'ok' },
    progiclean: { v: 'Partiel', status: 'warn' },
    proprely: { v: 'Oui, natif', status: 'ok' },
  },
  {
    criteria: "Marge par client en temps réel (en surface)",
    excel: { v: 'Reporting manuel', status: 'bad' },
    propret: { v: 'Via reporting', status: 'warn' },
    progiclean: { v: 'Via reporting', status: 'warn' },
    proprely: { v: 'Sur le pilotage, en direct', status: 'ok' },
  },
  {
    criteria: "Onboarding accompagné",
    excel: { v: 'Aucun', status: 'bad' },
    propret: { v: 'Consultant intégrateur, plusieurs jours', status: 'warn' },
    progiclean: { v: 'Consultant intégrateur', status: 'warn' },
    proprely: { v: '30 min avec le fondateur', status: 'ok' },
  },
  {
    criteria: "Export complet des données en 1 clic",
    excel: { v: 'Oui (mais c\'est votre fichier)', status: 'ok' },
    propret: { v: 'Sur demande', status: 'warn' },
    progiclean: { v: 'Variable', status: 'warn' },
    proprely: { v: 'CSV/Excel à tout moment, sans frais', status: 'ok' },
  },
  {
    criteria: "Tarif transparent",
    excel: { v: 'Gratuit (mais coût caché)', status: 'warn' },
    propret: { v: 'Sur devis', status: 'warn' },
    progiclean: { v: 'Sur devis', status: 'warn' },
    proprely: { v: 'Gratuit en bêta, tarif fondateur à vie', status: 'ok' },
  },
]

const faq = [
  { q: "Quel est le meilleur logiciel pour une société de nettoyage en 2026 ?", a: "Tout dépend de votre taille. Pour 3-50 agents en croissance ou en structuration, les SaaS verticaux modernes (dont Proprely) offrent le meilleur rapport productivité/prix avec mobile-first natif et preuve de passage. Au-delà de 50 agents, des logiciels métier historiques (PROPRET, Progiclean) ou ERP couvrent davantage la couche comptable mais avec une UX plus dense." },
  { q: "Combien coûte un logiciel pour société de nettoyage ?", a: "De 15 à 60 €/utilisateur/mois pour la plupart des SaaS verticaux, à 100+ €/utilisateur pour les ERP. Proprely est gratuit pendant la bêta privée (30 places fondateurs), tarif fondateur conservé à vie après." },
  { q: "Mes agents doivent-ils installer une application ?", a: "Pas avec Proprely. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone, le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G dégradée." },
  { q: "Peut-on remplacer Excel et WhatsApp complètement ?", a: "Oui pour la gestion quotidienne : clients/sites, agents, planning, missions, devis, factures, documents. WhatsApp peut rester pour les échanges informels — mais l'opérationnel passe par Proprely et tout est tracé." },
  { q: "Quelle taille d'entreprise est concernée ?", a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Dès que vous gérez plusieurs sites et plusieurs agents, vous avez besoin de centraliser. La bêta est ouverte aux structures en croissance comme aux entreprises établies." },
  { q: "Combien de temps pour la mise en route ?", a: "30 minutes lors d'un appel avec le fondateur. Vos sites, agents et fréquences sont importés (Excel, CSV, photos). À la fin de l'appel, votre planning est opérationnel." },
  { q: "Mes données sont-elles sécurisées ?", a: "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et vous pouvez les exporter en 1 clic à tout moment." },
  { q: "Quelle est la différence entre Proprely et PROPRET ou Progiclean ?", a: "PROPRET et Progiclean sont les acteurs historiques (10-15 ans) avec une couverture fonctionnelle large mais une UX datée et un mobile via app native. Proprely est un SaaS de nouvelle génération (2026) conçu mobile-first par lien web, avec preuve de passage native et marge par client en surface. Voir notre comparatif détaillé : /comparatif-logiciel-nettoyage." },
]

function injectSchema() {
  const id = 'software-landing-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Proprely',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      url: URL,
      publisher: { '@id': 'https://proprely.fr/#organization' },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/LimitedAvailability',
        price: '0',
        priceCurrency: 'EUR',
        description: "Accès gratuit pendant la bêta privée, sur sélection",
      },
      featureList: coreFeatures.map((f) => f.title),
    },
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
          { '@type': 'ListItem', position: 2, name: 'Logiciel société de nettoyage', item: URL },
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

function StatusIcon({ status }: { status: 'ok' | 'warn' | 'bad' }) {
  if (status === 'ok') return <CheckCircle size={16} className="text-emerald-500 shrink-0" />
  if (status === 'warn') return <Sparkles size={16} className="text-amber-500 shrink-0" />
  return <X size={16} className="text-red-400 shrink-0" />
}

export default function SoftwareLanding() {
  const remaining = remainingSpots()

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
      document.getElementById('software-landing-schema')?.remove()
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
            <Breadcrumbs items={[{ name: 'Logiciel société de nettoyage' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Le guide complet · 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Logiciel pour société de nettoyage :<br />
              <span className="text-blue-600">le guide complet 2026</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Tout ce qu'il faut savoir pour choisir un logiciel de gestion pensé pour la propreté B2B : fonctionnalités essentielles, comparatif Excel / PROPRET / Progiclean / Proprely, ROI estimé, FAQ détaillée. Plus une bêta privée gratuite à candidater dès maintenant.
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
                Candidater à la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/comparatif-logiciel-nettoyage"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Voir le comparatif détaillé
              </Link>
            </motion.div>
            <p className="text-xs text-slate-500 mt-4">{remaining} places restantes sur {FOUNDER_SPOTS.total} · Gratuit pendant la bêta</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Pourquoi un logiciel pour société de nettoyage ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              La gestion d'une société de nettoyage B2B impose un rythme et un nombre d'interactions qu'aucun outil généraliste ne sait gérer. À partir de 3 agents et 5 sites clients, la dispersion entre Excel, WhatsApp, Google Agenda et Word coûte 6 à 10 heures par semaine d'administration pure, sans compter les erreurs et les conflits client.
            </p>
            <ul className="space-y-3">
              {painPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-xl p-4">
                  <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-8">
              Un logiciel pensé pour le métier permet de centraliser ces flux dans une seule interface, où chaque module (clients, agents, planning, devis, missions, documents, pilotage) communique avec les autres. C'est la promesse d'un cockpit unifié — sans avoir à payer un ERP généraliste à 30 000 € d'intégration.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Fonctionnalités essentielles</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Les 4 modules qu'un logiciel propreté doit avoir
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Si l'un de ces modules est absent ou faible, le logiciel ne couvrira pas votre quotidien. Si tous sont présents et connectés, vous récupérez 6 à 10 heures par semaine.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {coreFeatures.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.slug}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link
                      to={`/fonctionnalites/${f.slug}`}
                      className="group block bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                        <Icon size={22} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                        {f.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {f.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                        Découvrir
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-3xl mx-auto">
              {[
                { icon: Smartphone, label: 'Mobile-first agents' },
                { icon: BarChart3, label: 'Marge par client en direct' },
                { icon: ShieldCheck, label: 'Hébergement européen RGPD' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 px-4 py-3">
                  <Icon size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Comparatif rapide</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Proprely vs Excel, PROPRET et Progiclean
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Comparatif honnête sur les 8 critères qui comptent vraiment au quotidien. Voir{' '}
                <Link to="/comparatif-logiciel-nettoyage" className="text-blue-600 hover:underline font-semibold">le comparatif détaillé</Link>{' '}
                pour le tableau complet et les FAQ.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-bold text-slate-700">Critère</th>
                    <th className="text-left p-4 font-bold text-slate-700">Excel</th>
                    <th className="text-left p-4 font-bold text-slate-700">PROPRET</th>
                    <th className="text-left p-4 font-bold text-slate-700">Progiclean</th>
                    <th className="text-left p-4 font-bold text-blue-700">Proprely</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorTable.map((row) => (
                    <tr key={row.criteria} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-semibold text-slate-900">{row.criteria}</td>
                      {[row.excel, row.propret, row.progiclean, row.proprely].map((cell, i) => (
                        <td key={i} className={`p-4 ${i === 3 ? 'bg-blue-50/40' : ''}`}>
                          <div className="flex items-start gap-2">
                            <StatusIcon status={cell.status as 'ok' | 'warn' | 'bad'} />
                            <span className="text-xs sm:text-sm text-slate-700 leading-snug">{cell.v}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/comparatif-logiciel-nettoyage"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Voir le comparatif détaillé
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5">
              <Calculator size={12} />
              ROI estimé
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Combien la dispersion vous coûte chaque année
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Sur une société de 10 agents qui perd 8 heures par semaine en admin dispersée, à 45 € de coût horaire dirigeant chargé, c'est <strong className="text-slate-900">16 800 €/an</strong> de coût caché. Auquel s'ajoutent les erreurs de pointage, les contrats sous-tarifés et les litiges client.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: '6-10 h', label: "Perdues par semaine en admin" },
                { value: '12 600 €', label: "Coût caché minimum / an" },
                { value: '30 min', label: 'Onboarding Proprely' },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="text-2xl font-black text-blue-600 mb-1">{c.value}</div>
                  <div className="text-xs text-slate-600">{c.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/calculateur-roi"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator size={14} />
                Calculateur ROI personnalisé
              </Link>
              <Link
                to="/simulateur-rentabilite"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator size={14} />
                Simulateur marge par contrat
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Tout ce qu'on nous demande sur les logiciels propreté
            </h2>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl divide-y divide-slate-100">
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
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Zap size={12} />
              Bêta privée gratuite · {remaining} places restantes
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Le logiciel propreté pensé avec des dirigeants du nettoyage
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 sociétés fondatrices, accès gratuit pendant toute la bêta, tarif privilégié à vie après le lancement public. Onboarding 30 min avec le fondateur.
            </p>
            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-xs text-slate-400 mt-4">Gratuit · Sans carte bancaire · Réponse sous 24h</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
