import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, X, AlertTriangle, HelpCircle, Sparkles, Award } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const URL = 'https://proprely.fr/comparatif-logiciel-nettoyage'
const TITLE = 'Comparatif logiciels nettoyage 2026 : lequel choisir ? · Proprely'
const DESCRIPTION = "Comparatif des logiciels métier société de nettoyage en 2026 : Proprely, Organilog, Progiclean, PROPRET, Synchroteam. Critères et tarifs."

type Tool = {
  name: string
  pos: string
  founded: string
  pricing: string
  agentMin: number
  agentMax: number
}

const tools: Tool[] = [
  { name: 'Proprely', pos: 'SaaS vertical 2026, mobile-first', founded: '2026', pricing: 'Gratuit (bêta privée), tarif fondateur à vie', agentMin: 3, agentMax: 50 },
  { name: 'PROPRET', pos: 'Logiciel métier historique', founded: '~2010', pricing: 'Sur devis (~40-60 €/utilisateur/mois)', agentMin: 10, agentMax: 200 },
  { name: 'Progiclean', pos: 'Logiciel métier historique', founded: '~2008', pricing: 'Sur devis (~30-50 €/utilisateur/mois)', agentMin: 10, agentMax: 100 },
  { name: 'Organilog', pos: 'Field service générique', founded: '~2014', pricing: '20-40 €/utilisateur/mois', agentMin: 5, agentMax: 100 },
  { name: 'Synchroteam', pos: 'Field service générique', founded: '~2012', pricing: '~28-36 €/utilisateur/mois', agentMin: 5, agentMax: 100 },
  { name: 'Excel', pos: 'Tableur généraliste', founded: 'N/A', pricing: 'Inclus Microsoft 365', agentMin: 1, agentMax: 8 },
]

type Row = {
  criteria: string
  proprely: { v: string; s: 'ok' | 'warn' | 'bad' }
  propret: { v: string; s: 'ok' | 'warn' | 'bad' }
  progiclean: { v: string; s: 'ok' | 'warn' | 'bad' }
  organilog: { v: string; s: 'ok' | 'warn' | 'bad' }
  synchroteam: { v: string; s: 'ok' | 'warn' | 'bad' }
  excel: { v: string; s: 'ok' | 'warn' | 'bad' }
}

const rows: Row[] = [
  {
    criteria: 'Conçu pour la propreté B2B',
    proprely: { v: 'Oui, vertical pur', s: 'ok' },
    propret: { v: 'Oui', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Non, field service générique', s: 'warn' },
    synchroteam: { v: 'Non, field service générique', s: 'warn' },
    excel: { v: 'Non, adapté manuellement', s: 'bad' },
  },
  {
    criteria: 'Essai gratuit',
    proprely: { v: 'Gratuit toute la bêta', s: 'ok' },
    propret: { v: 'Démo sur demande', s: 'warn' },
    progiclean: { v: 'Démo sur demande', s: 'warn' },
    organilog: { v: '14 jours', s: 'ok' },
    synchroteam: { v: '14 jours', s: 'ok' },
    excel: { v: 'Inclus Microsoft 365', s: 'ok' },
  },
  {
    criteria: 'Planning agents drag-and-drop',
    proprely: { v: '1 clic, suggestions intelligentes', s: 'ok' },
    propret: { v: 'Oui (UI dense)', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Oui', s: 'ok' },
    synchroteam: { v: 'Oui', s: 'ok' },
    excel: { v: 'Manuel, copier-coller', s: 'bad' },
  },
  {
    criteria: 'Devis intégré + signature électronique',
    proprely: { v: 'Oui, en 2 min', s: 'ok' },
    propret: { v: 'Oui (module séparé)', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Basique', s: 'warn' },
    synchroteam: { v: 'Basique', s: 'warn' },
    excel: { v: 'Word/PDF manuel', s: 'bad' },
  },
  {
    criteria: 'Preuve de passage QR + photos + signature',
    proprely: { v: 'Natif, hors-ligne', s: 'ok' },
    propret: { v: 'Oui', s: 'ok' },
    progiclean: { v: 'Partiel', s: 'warn' },
    organilog: { v: 'Oui (générique)', s: 'ok' },
    synchroteam: { v: 'Oui (générique)', s: 'ok' },
    excel: { v: 'Non', s: 'bad' },
  },
  {
    criteria: 'Marge par client en temps réel',
    proprely: { v: 'En surface, sur le pilotage', s: 'ok' },
    propret: { v: 'Via reporting (différé)', s: 'warn' },
    progiclean: { v: 'Via reporting', s: 'warn' },
    organilog: { v: 'Non', s: 'bad' },
    synchroteam: { v: 'Non', s: 'bad' },
    excel: { v: 'Manuel, retard 30+ jours', s: 'bad' },
  },
  {
    criteria: 'Application mobile agents (sans app à installer)',
    proprely: { v: 'Lien web direct', s: 'ok' },
    propret: { v: 'App native obligatoire', s: 'warn' },
    progiclean: { v: 'App native obligatoire', s: 'warn' },
    organilog: { v: 'App native', s: 'warn' },
    synchroteam: { v: 'App native', s: 'warn' },
    excel: { v: 'Non utilisable terrain', s: 'bad' },
  },
  {
    criteria: 'Spécialités et habilitations agents',
    proprely: { v: 'Oui (vitrerie, moquette, etc.)', s: 'ok' },
    propret: { v: 'Oui', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Compétences génériques', s: 'warn' },
    synchroteam: { v: 'Compétences génériques', s: 'warn' },
    excel: { v: 'Non structuré', s: 'bad' },
  },
  {
    criteria: 'Hébergement européen RGPD',
    proprely: { v: 'Oui, par défaut', s: 'ok' },
    propret: { v: 'Oui', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Oui', s: 'ok' },
    synchroteam: { v: 'Oui', s: 'ok' },
    excel: { v: 'Local (vos sauvegardes)', s: 'warn' },
  },
  {
    criteria: 'Export complet des données en 1 clic',
    proprely: { v: 'CSV/Excel à tout moment', s: 'ok' },
    propret: { v: 'Sur demande', s: 'warn' },
    progiclean: { v: 'Variable, parfois payant', s: 'warn' },
    organilog: { v: 'CSV partiel', s: 'warn' },
    synchroteam: { v: 'CSV', s: 'warn' },
    excel: { v: 'Oui (vos fichiers)', s: 'ok' },
  },
  {
    criteria: 'Onboarding accompagné',
    proprely: { v: '30 min avec le fondateur', s: 'ok' },
    propret: { v: 'Consultant intégrateur (plusieurs jours)', s: 'warn' },
    progiclean: { v: 'Consultant intégrateur', s: 'warn' },
    organilog: { v: 'Self-onboarding + support', s: 'warn' },
    synchroteam: { v: 'Self-onboarding + support', s: 'warn' },
    excel: { v: 'Aucun', s: 'bad' },
  },
  {
    criteria: 'Support en français',
    proprely: { v: 'Oui, par le fondateur', s: 'ok' },
    propret: { v: 'Oui', s: 'ok' },
    progiclean: { v: 'Oui', s: 'ok' },
    organilog: { v: 'Oui', s: 'ok' },
    synchroteam: { v: 'Oui', s: 'ok' },
    excel: { v: 'Communauté seulement', s: 'warn' },
  },
  {
    criteria: 'Tarif transparent',
    proprely: { v: 'Gratuit en bêta, fondateur à vie', s: 'ok' },
    propret: { v: 'Sur devis', s: 'warn' },
    progiclean: { v: 'Sur devis', s: 'warn' },
    organilog: { v: 'Public dès 20 €', s: 'ok' },
    synchroteam: { v: 'Public dès ~28 €', s: 'ok' },
    excel: { v: 'Microsoft 365', s: 'ok' },
  },
]

const verdicts = [
  {
    profile: '1 à 5 agents, vous démarrez',
    range: 'Solo / TPE',
    reco: 'Excel + un modèle pro tient encore. Téléchargez nos modèles gratuits pour structurer dès maintenant.',
    href: '/ressources',
    cta: 'Voir les modèles gratuits',
  },
  {
    profile: '3 à 15 agents, en structuration',
    range: 'PME en croissance',
    reco: 'Proprely (SaaS moderne, mobile-first, gratuit en bêta). Onboarding rapide, pas de consultant intégrateur.',
    href: '/beta',
    cta: 'Candidater à la bêta Proprely',
  },
  {
    profile: '15 à 50 agents, multi-sites',
    range: 'PME établie',
    reco: 'Proprely si l\'agilité et la marge par client priment ; PROPRET ou Progiclean si la couverture comptable historique est critique.',
    href: '/logiciel-societe-nettoyage',
    cta: 'Voir le guide complet',
  },
  {
    profile: '50+ agents, plusieurs sociétés',
    range: 'ETI / Groupe',
    reco: 'ERP métier (Sage, Cegid, Divalto) avec module propreté, ou PROPRET/Progiclean en édition entreprise. Proprely est conçu pour 3-50 agents.',
    href: null,
    cta: null,
  },
]

const faq = [
  { q: "Quel est le meilleur logiciel pour société de nettoyage en 2026 ?", a: "Pas de réponse unique : ça dépend de la taille (3-50 agents vs 50+), du mix client (syndics, hôtels, médical, industriel) et de votre niveau de digitalisation. Pour les PME 3-50 agents en croissance, les SaaS verticaux modernes (Proprely) offrent le meilleur rapport productivité/prix. Au-delà, les logiciels historiques (PROPRET, Progiclean) ou ERP couvrent davantage." },
  { q: "Faut-il prendre un logiciel installé ou en SaaS ?", a: "SaaS dans 95% des cas. L'installé impose maintenance, sauvegardes, et bloque le travail terrain (agents mobiles). Les SaaS modernes sont plus sûrs, à jour, et accessibles depuis n'importe quel téléphone." },
  { q: "PROPRET ou Proprely : que choisir ?", a: "PROPRET est l'acteur historique (10+ ans), couverture fonctionnelle large, UX plus dense, mobile via app native, intégration souvent par consultant. Proprely est un SaaS de nouvelle génération (2026) : mobile-first par lien web, marge par client en surface, onboarding 30 min avec le fondateur. PROPRET est plus adapté aux 50+ agents avec besoins comptables avancés ; Proprely cible 3-50 agents avec besoin de productivité quotidienne." },
  { q: "Progiclean ou Proprely : que choisir ?", a: "Progiclean est un acteur métier solide pour 10-100 agents avec spécialisation propreté forte. Le compromis principal : UX datée et app native obligatoire pour les agents. Proprely propose la même couverture sur les 4 modules essentiels (planning, devis, agents, preuve de passage) avec une UX 2026 et un mobile sans app. Pour 3-50 agents en croissance, Proprely est plus agile ; Progiclean reste pertinent au-delà de 50 agents." },
  { q: "Organilog est un bon choix pour la propreté ?", a: "Organilog est conçu pour le field service générique (BTP, maintenance, services). Solide en planning, faible sur la spécificité propreté : pas de catalogue prestations spécifique, marges par client absentes, agents avec compétences génériques (pas vitrerie/moquette/décapage). Pour une société de nettoyage B2B, un SaaS vertical (Proprely) ou un métier historique (PROPRET/Progiclean) couvrira mieux." },
  { q: "Combien coûte un logiciel de nettoyage ?", a: "Fourchette : 15-60 €/utilisateur/mois pour les SaaS verticaux, 100+ €/utilisateur/mois pour les ERP métier. Méfiance des forfaits flat à 200 €/mois (souvent limités). Proprely est gratuit pendant la bêta (30 places fondateurs), avec un tarif fondateur conservé à vie après le lancement public." },
  { q: "Quels critères vérifier en démo ?", a: "5 tests à demander : (1) affecter un agent en 1 clic, (2) voir l'écran mobile que verra l'agent, (3) générer un PV de passage avec photos, (4) voir la marge en temps réel sur un client donné, (5) exporter l'intégralité des données. Si l'un prend plus de 30 secondes ou nécessite un 'on vous montrera plus tard', cherchez ailleurs." },
  { q: "Combien de temps pour migrer ?", a: "30 min à 1 journée pour les SaaS verticaux modernes (Proprely) avec onboarding accompagné. 3 à 6 mois pour un ERP avec consultant intégrateur. Excel : pas de migration, mais le coût d'apprentissage de l'outil cible est dans les deux cas." },
]

function injectSchema() {
  const id = 'comparatif-schema'
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
          { '@type': 'ListItem', position: 2, name: 'Comparatif logiciel nettoyage', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Logiciels société de nettoyage comparés en 2026',
      description: "Liste des logiciels analysés dans le comparatif Proprely 2026 pour les sociétés de nettoyage B2B en France.",
      numberOfItems: 5,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: [
        { name: 'Proprely', description: "Cockpit métier B2B nouvelle génération (2026) conçu pour les TPE/PME nettoyage 3-50 agents. Planning, devis, preuve de passage, marge par client.", url: 'https://proprely.fr/' },
        { name: 'PROPRET', description: "ERP métier historique de la propreté (depuis ~2005). Couverture fonctionnelle large (paie, GED) destinée aux PME/ETI 50+ agents.", url: 'https://proprely.fr/comparatif/proprely-vs-propret' },
        { name: 'Progiclean', description: "ERP métier propreté historique (depuis ~2000). Setup sur devis, abonnement annuel, cible PME/ETI 50+ agents.", url: 'https://proprely.fr/comparatif/proprely-vs-progiclean' },
        { name: 'Organilog', description: "Suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Forfait par utilisateur/mois, non spécifique propreté.", url: 'https://proprely.fr/comparatif/proprely-vs-organilog' },
        { name: 'Synchroteam', description: "Solution de gestion d'interventions multi-secteurs avec planning et géolocalisation, non spécifique au nettoyage.", url: 'https://www.synchroteam.com/' },
      ].map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: s.url,
        item: {
          '@type': 'SoftwareApplication',
          name: s.name,
          description: s.description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: s.url,
        },
      })),
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
  if (status === 'ok') return <CheckCircle size={14} className="text-emerald-500 shrink-0" />
  if (status === 'warn') return <AlertTriangle size={14} className="text-amber-500 shrink-0" />
  return <X size={14} className="text-red-400 shrink-0" />
}

export default function ComparatifLogiciels() {
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
      document.getElementById('comparatif-schema')?.remove()
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
            <Breadcrumbs items={[{ name: 'Comparatif logiciel nettoyage' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Award size={12} />
              Comparatif honnête · 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Comparatif logiciels société de nettoyage 2026 :<br />
              <span className="text-blue-600">lequel choisir ?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
Proprely, Organilog, Progiclean, PROPRET, Synchroteam et Excel passés au crible : 13 critères qui comptent vraiment au quotidien, 4 profils types avec recommandation explicite, 8 questions fréquentes. Aucun jugement caché : nous citons quand un concurrent est meilleur que nous.
            </motion.p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-8 text-center">
              Les outils comparés
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((t) => (
                <div key={t.name} className={`rounded-2xl p-5 border ${t.name === 'Proprely' ? 'bg-blue-50/50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="font-bold text-slate-900 mb-1">{t.name}</div>
                  <div className="text-xs text-slate-500 mb-3">{t.pos}</div>
                  <div className="text-xs text-slate-600 leading-snug space-y-1">
                    <div><strong className="text-slate-900">Lancé :</strong> {t.founded}</div>
                    <div><strong className="text-slate-900">Cible :</strong> {t.agentMin}-{t.agentMax} agents</div>
                    <div><strong className="text-slate-900">Tarif :</strong> {t.pricing}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight text-center">
              Tableau comparatif détaillé
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[200px]">Critère</th>
                    <th className="text-left p-4 font-bold text-blue-700 bg-blue-50/40 min-w-[140px]">Proprely</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[130px]">PROPRET</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[130px]">Progiclean</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[130px]">Organilog</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[130px]">Synchroteam</th>
                    <th className="text-left p-4 font-bold text-slate-700 min-w-[130px]">Excel</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.criteria} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-semibold text-slate-900 text-xs sm:text-sm">{row.criteria}</td>
                      {([row.proprely, row.propret, row.progiclean, row.organilog, row.synchroteam, row.excel] as const).map((cell, i) => (
                        <td key={i} className={`p-4 ${i === 0 ? 'bg-blue-50/30' : ''}`}>
                          <div className="flex items-start gap-2">
                            <StatusIcon status={cell.s} />
                            <span className="text-xs text-slate-700 leading-snug">{cell.v}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-500 text-center mt-4">
              Méthodologie : critères vérifiables publiquement (sites éditeurs, démos commerciales, retours utilisateurs) au 1er trimestre 2026. Voir aussi notre article{' '}
              <Link to="/blog/comparatif-logiciels-nettoyage-2026" className="text-blue-600 hover:underline font-semibold">Comparatif logiciels société de nettoyage 2026</Link>{' '}
              pour la méthode complète.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Recommandation par profil</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Quel logiciel pour ma société de nettoyage ?
              </h2>
            </div>

            <div className="space-y-4">
              {verdicts.map((v) => (
                <motion.div
                  key={v.profile}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">{v.range}</div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{v.profile}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.reco}</p>
                  </div>
                  {v.href && v.cta && (
                    <Link
                      to={v.href}
                      className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 font-semibold text-sm hover:border-blue-200 hover:text-blue-700 transition-colors inline-flex items-center gap-1.5 shrink-0"
                    >
                      {v.cta}
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </motion.div>
              ))}
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
              Vos questions sur le choix d'un logiciel propreté
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

        <section className="py-12 sm:py-16 border-t border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">
              Aller plus loin
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { to: '/comparatif/proprely-vs-organilog', label: 'Proprely vs Organilog', desc: 'Le face-à-face avec la suite field service' },
                { to: '/comparatif/proprely-vs-progiclean', label: 'Proprely vs Progiclean', desc: "Face à l'ERP métier historique" },
                { to: '/comparatif/proprely-vs-propret', label: 'Proprely vs PROPRET', desc: "Face à l'éditeur historique de la propreté" },
                { to: '/proprely-vs-excel', label: 'Proprely vs Excel', desc: 'Le coût caché de la gestion sur tableur' },
                { to: '/tarifs', label: 'Tarifs Proprely', desc: 'Gratuit pendant la bêta, tarif fondateur à vie' },
                { to: '/fonctionnalites', label: 'Toutes les fonctionnalités', desc: 'Planning, devis, agents, preuve de passage' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="group flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-white transition-colors"
                >
                  <ArrowRight size={16} className="text-blue-600 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <span>
                    <span className="block font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">{l.label}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{l.desc}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Convaincu par Proprely ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 sociétés fondatrices, accès gratuit pendant toute la bêta, tarif privilégié à vie après. Onboarding 30 min avec le fondateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/beta"
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/logiciel-societe-nettoyage"
                className="bg-white/10 border border-white/20 text-white rounded-xl px-6 py-3.5 font-semibold text-sm hover:bg-white/15 transition-colors inline-flex items-center justify-center gap-2"
              >
                Le guide complet
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
