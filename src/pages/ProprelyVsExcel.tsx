import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  Sparkles,
  Clock,
  Users,
  ShieldAlert,
  FileSpreadsheet,
  HelpCircle,
} from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { navigate } from '../lib/useRoute'

const META = {
  title: 'Proprely vs Excel : à partir de quand changer ? · Comparatif 2026',
  description:
    "Excel pour gérer une société de nettoyage : jusqu'où ça tient, ce qui casse à partir de 5 agents, et combien coûte vraiment la dispersion. Comparatif honnête.",
  url: 'https://proprely.fr/proprely-vs-excel',
}

function injectSchema() {
  const id = 'vs-excel-schema'
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
          { '@type': 'ListItem', position: 2, name: 'Proprely vs Excel', item: META.url },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Excel est gratuit, pourquoi payer un logiciel ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Excel n'est pas gratuit dès qu'il vous coûte 6 à 10 heures par semaine d'administration dispersée. À 45 € de coût horaire dirigeant, ça représente 12 600 à 21 000 € de coût caché par an. Pendant la bêta, Proprely est aussi gratuit qu'Excel, sans ce coût caché.",
          },
        },
        {
          '@type': 'Question',
          name: "Mes équipes connaissent Excel par cœur, est-ce qu'elles vont adopter Proprely ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Proprely a été conçu avec des dirigeants de société de nettoyage. L'interface reprend les logiques métier qu'ils connaissent : sites, agents, missions, devis. La prise en main se fait en 30 minutes avec le fondateur.",
          },
        },
        {
          '@type': 'Question',
          name: "Comment je migre mes fichiers Excel existants ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Nous reprenons vos fichiers actuels et nous configurons votre instance avec vous lors de l'onboarding (30 minutes). Clients, sites, agents, fréquences : tout est importé sans que vous ayez à ressaisir.",
          },
        },
        {
          '@type': 'Question',
          name: "Qu'est-ce qui casse vraiment dans Excel quand on grandit ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Trois choses : la collaboration (à 2 personnes simultanées, le fichier se corrompt ou les modifications s'écrasent), la fiabilité (formules cassées, lignes décalées, données perdues), et le manque de fonctions terrain (preuve de passage, signature client, géolocalisation, application mobile pour les agents).",
          },
        },
        {
          '@type': 'Question',
          name: "Et si je veux rester sur Excel ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Excel reste un excellent outil tant que vous êtes seul à gérer, avec moins de 5 agents et moins de 10 sites. Nous proposons d'ailleurs des modèles Excel gratuits sur notre page Ressources. Au-delà, le coût caché de la dispersion dépasse largement le prix d'un outil métier.",
          },
        },
      ],
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

const comparisonRows: { label: string; excel: string | false; proprely: string | true; critical?: boolean }[] = [
  { label: "Centralisation clients + sites + contacts", excel: 'Manuelle, fichier par fichier', proprely: 'Oui, base unique reliée' },
  { label: "Planning agents multi-sites", excel: 'Possible mais fragile', proprely: 'Drag & drop 1-clic', critical: true },
  { label: "Affectation selon spécialités (vitrerie, médical, etc.)", excel: false, proprely: 'Filtrage automatique' },
  { label: "Alertes surmenage / dépassement 35h", excel: false, proprely: 'Automatique', critical: true },
  { label: "Mission terrain avec preuve de passage", excel: false, proprely: 'QR + photos + signature', critical: true },
  { label: "Application mobile pour les agents", excel: false, proprely: 'iOS + Android' },
  { label: "Devis en moins de 2 minutes", excel: 'Modèle à dupliquer à chaque fois', proprely: 'Génération à partir des sites' },
  { label: "Signature électronique devis et contrats", excel: false, proprely: 'Intégrée' },
  { label: "Marge par client en temps réel", excel: 'Si vous savez bâtir le tableau', proprely: 'Calculée automatiquement', critical: true },
  { label: "Documents centralisés (contrats, attestations URSSAF, fiches sécurité)", excel: 'Dispersé entre dossiers', proprely: 'Recherche instantanée' },
  { label: "Collaboration multi-utilisateurs simultanée", excel: 'Conflits fréquents', proprely: 'Native', critical: true },
  { label: "Historique des modifications", excel: false, proprely: 'Tracé pour chaque champ' },
  { label: "Sauvegarde automatique cloud", excel: 'Si OneDrive bien configuré', proprely: 'Automatique, hébergement européen' },
  { label: "Conformité RGPD documentée", excel: 'À votre charge', proprely: 'Documentée, registre fourni' },
  { label: "Coût direct (licence)", excel: '0 € (mais Microsoft 365 ~10 €/mois)', proprely: '0 € pendant la bêta' },
  { label: "Coût caché en heures d'admin perdues", excel: '6 à 10 h/semaine', proprely: 'Réduit de 60 % en moyenne', critical: true },
]

const whenExcelWorks = [
  "Vous êtes seul à gérer (pas de back-office, pas d'assistant)",
  "Vous avez moins de 5 agents",
  "Vous gérez moins de 10 sites clients",
  "Vous n'avez pas besoin de preuve de passage formelle",
  "Vous ne gérez pas de prestations récurrentes complexes",
  "Vous n'avez pas d'enjeu de marge par client à suivre finement",
]

const whenExcelBreaks = [
  "Vous passez plus de 6 heures par semaine en admin dispersée",
  "Vous gérez 5 agents ou plus, sur 10 sites ou plus",
  "Vos clients commencent à demander des preuves de passage",
  "Vous travaillez à 2+ personnes sur les mêmes fichiers",
  "Vous découvrez des erreurs de pointage ou de devis a posteriori",
  "Vous ne savez plus exactement quels contrats sont rentables",
  "Vous perdez du temps à retrouver un document (contrat, attestation)",
  "Vos agents oublient des passages ou les fréquences ne sont pas respectées",
]

const hiddenCosts = [
  {
    icon: Clock,
    title: '6 à 10 heures perdues par semaine',
    desc: "Recopier les heures, ressaisir les devis, mettre à jour 3 fichiers à chaque changement de planning. Sur un an, 280 à 470 heures consacrées à la saisie au lieu du commercial ou du terrain.",
  },
  {
    icon: ShieldAlert,
    title: 'Risque de fichier corrompu ou perdu',
    desc: "Une formule cassée, une ligne supprimée par erreur, un .xlsx qui refuse de s'ouvrir : ça arrive en moyenne 2 à 3 fois par an. Le temps de tout reconstituer coûte plus cher qu'une licence annuelle.",
  },
  {
    icon: Users,
    title: 'Conflits multi-utilisateurs',
    desc: "Dès que 2 personnes modifient le même fichier en même temps (même via OneDrive), des modifications s'écrasent silencieusement. Vous ne savez pas ce qui a été perdu, ni quand.",
  },
  {
    icon: AlertTriangle,
    title: 'Erreurs de pointage et de facturation',
    desc: "Heures saisies en double, oubliées, ou attribuées au mauvais site : sans contrôle automatique, ces erreurs passent inaperçues et finissent par coûter la marge d'un contrat entier.",
  },
]

const migrationSteps = [
  { day: 'Jour 1', title: 'Audit de vos fichiers Excel actuels', desc: "Nous identifions ensemble vos sources : planning, suivi des heures, fichier devis, base clients, fichier sites." },
  { day: 'Jour 2', title: 'Configuration de votre instance', desc: "Onboarding de 30 minutes avec le fondateur : import des clients, sites, agents, fréquences d'intervention." },
  { day: 'Jour 3', title: 'Premier planning + premier devis', desc: "Vous générez votre planning de la semaine et votre premier devis depuis Proprely. Vous comparez avec votre fichier Excel." },
  { day: 'Semaine 1', title: 'Validation côté agents', desc: "Vos agents installent l'app mobile, valident leurs premières missions avec preuve de passage." },
  { day: 'Semaine 2', title: 'Bascule complète', desc: "Vous archivez vos fichiers Excel et vous travaillez exclusivement sur Proprely. Vos données restent exportables à tout moment." },
]

const faqs = [
  { q: "Excel est gratuit, pourquoi payer un logiciel ?", a: "Excel n'est pas gratuit dès qu'il vous coûte 6 à 10 heures par semaine d'administration dispersée. À 45 € de coût horaire dirigeant, ça représente 12 600 à 21 000 € de coût caché par an. Pendant la bêta, Proprely est aussi gratuit qu'Excel, sans ce coût caché." },
  { q: "Mes équipes connaissent Excel par cœur, est-ce qu'elles vont adopter Proprely ?", a: "Proprely a été conçu avec des dirigeants de société de nettoyage. L'interface reprend les logiques métier qu'ils connaissent : sites, agents, missions, devis. La prise en main se fait en 30 minutes avec le fondateur." },
  { q: "Comment je migre mes fichiers Excel existants ?", a: "Nous reprenons vos fichiers actuels et nous configurons votre instance avec vous lors de l'onboarding (30 minutes). Clients, sites, agents, fréquences : tout est importé sans que vous ayez à ressaisir." },
  { q: "Qu'est-ce qui casse vraiment dans Excel quand on grandit ?", a: "Trois choses : la collaboration (à 2 personnes simultanées, le fichier se corrompt ou les modifications s'écrasent), la fiabilité (formules cassées, lignes décalées, données perdues), et le manque de fonctions terrain (preuve de passage, signature client, géolocalisation, application mobile pour les agents)." },
  { q: "Et si je veux rester sur Excel ?", a: "Excel reste un excellent outil tant que vous êtes seul à gérer, avec moins de 5 agents et moins de 10 sites. Nous proposons d'ailleurs des modèles Excel gratuits sur notre page Ressources. Au-delà, le coût caché de la dispersion dépasse largement le prix d'un outil métier." },
]

export default function ProprelyVsExcel() {
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
      document.getElementById('vs-excel-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Retour à l'accueil
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <FileSpreadsheet size={12} />
              Comparatif honnête · 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Excel ou Proprely ?<br />
              <span className="text-blue-600">À partir de quand vous devriez changer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Excel reste un excellent outil pour démarrer. À partir d'une certaine taille, il devient le frein principal à la croissance d'une société de nettoyage. Voici à quel moment, pourquoi, et comment basculer sans douleur.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button
                onClick={() => navigate('/beta')}
                className="group relative bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
                <span className="relative">Rejoindre la bêta gratuite</span>
                <ArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
              </button>
              <button
                onClick={() => navigate('/simulateur-rentabilite')}
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Simulateur de rentabilité
              </button>
            </motion.div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Honnêteté</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Excel a sa place. Voici où.
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                On ne va pas vous dire qu'Excel est mauvais. Il est juste mauvais à partir d'un certain seuil — qu'on va identifier ensemble.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5 lg:gap-6">
              <div className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Check size={16} className="text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Restez sur Excel si...</h3>
                </div>
                <ul className="space-y-2.5">
                  {whenExcelWorks.map((w, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                      <Check size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-red-100 p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <AlertTriangle size={16} className="text-red-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Excel devient le frein si...</h3>
                </div>
                <ul className="space-y-2.5">
                  {whenExcelBreaks.map((w, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                      <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Comparatif</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Excel vs Proprely, fonction par fonction
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Pas de marketing, juste les capacités réelles de chaque outil sur les sujets qui comptent pour une société de nettoyage B2B.
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-4 sm:px-6 py-4 font-bold text-slate-900 text-xs uppercase tracking-wider">Capacité</th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-slate-700 text-xs uppercase tracking-wider min-w-[180px]">
                      <span className="inline-flex items-center gap-2">
                        <FileSpreadsheet size={14} className="text-emerald-600" />
                        Excel
                      </span>
                    </th>
                    <th className="px-4 sm:px-6 py-4 font-bold text-blue-700 text-xs uppercase tracking-wider min-w-[180px]">
                      <span className="inline-flex items-center gap-2">
                        <Sparkles size={14} className="text-blue-600" />
                        Proprely
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-slate-100 last:border-b-0 ${row.critical ? 'bg-blue-50/30' : ''}`}
                    >
                      <td className="px-4 sm:px-6 py-3.5 text-slate-800 font-medium">
                        {row.label}
                        {row.critical && (
                          <span className="ml-2 inline-block text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded px-1.5 py-0.5">Critique</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-slate-600">
                        {row.excel === false ? (
                          <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-semibold">
                            <X size={12} /> Non
                          </span>
                        ) : (
                          <span className="text-xs">{row.excel}</span>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-3.5 text-slate-800 font-medium">
                        {row.proprely === true ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                            <Check size={12} /> Oui
                          </span>
                        ) : (
                          <span className="text-xs">{row.proprely}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-3">Coût caché</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Excel n'est pas gratuit
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Quand on additionne les heures perdues, les erreurs et les risques, Excel coûte plus cher qu'une licence annuelle d'un outil métier. Quatre coûts cachés qu'on retrouve à chaque audit.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {hiddenCosts.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: (i % 2) * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <c.icon size={20} className="text-red-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/calculateur-roi')}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
              >
                Calculer mon coût caché en 30 secondes
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Migration</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Comment basculer d'Excel à Proprely en 2 semaines
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Pas de big bang, pas de double saisie pendant 3 mois. Un plan séquencé pour migrer sans perdre une heure d'activité.
              </p>
            </div>

            <ol className="space-y-3 max-w-3xl mx-auto">
              {migrationSteps.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100"
                >
                  <div className="shrink-0 w-20 sm:w-24 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 rounded-full px-3 py-1 text-center">
                    {s.day}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-400 opacity-10 blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white rounded-full px-4 py-1.5 text-xs font-bold mb-5">
              <Sparkles size={12} />
              Bêta privée gratuite
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              Vos fichiers Excel attendent que vous décidiez.
            </h2>
            <p className="text-blue-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              On vous accompagne pour migrer sans perdre une heure d'activité. Onboarding 30 min, accès gratuit pendant la bêta, tarif fondateur conservé à vie.
            </p>
            <button
              onClick={() => navigate('/beta')}
              className="group bg-white text-blue-700 rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl inline-flex items-center gap-2 hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Rejoindre la bêta gratuite
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </button>
            <p className="text-xs text-blue-200 mt-4">Pas de carte bancaire · Aucun engagement · Réponse sous 24h</p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={16} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Les objections qu'on entend le plus
              </h2>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 sm:px-6 divide-y divide-slate-200">
              {faqs.map((q, i) => (
                <div key={i} className="py-5">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-2">{q.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
