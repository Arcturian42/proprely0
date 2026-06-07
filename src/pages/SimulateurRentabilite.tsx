import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Euro, Lightbulb, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const META = {
  title: "Simulateur de rentabilité par contrat de nettoyage · Proprely",
  description:
    "Calculez en 1 minute la marge brute, la marge nette et le résultat horaire d'un contrat de nettoyage. Verdict immédiat et recommandations selon votre situation.",
  url: 'https://proprely.fr/simulateur-rentabilite',
}

function injectSchema() {
  const id = 'simulateur-schema'
  document.getElementById(id)?.remove()
  const schema = {
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
        { '@type': 'ListItem', position: 2, name: 'Simulateur de rentabilité', item: META.url },
      ],
    },
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schema)
  document.head.appendChild(script)
}

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  hint?: string
  onChange: (n: number) => void
}

function Slider({ label, value, min, max, step = 1, suffix, hint, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2 gap-3">
        <div className="flex-1 min-w-0">
          <label className="text-sm font-semibold text-slate-700 block">{label}</label>
          {hint && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{hint}</p>}
        </div>
        <div className="text-2xl font-black text-slate-900 shrink-0">
          {value.toLocaleString('fr-FR')}
          <span className="text-base text-slate-500 font-bold ml-1">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{min.toLocaleString('fr-FR')}{suffix}</span>
        <span>{max.toLocaleString('fr-FR')}{suffix}</span>
      </div>
    </div>
  )
}

type Verdict = {
  level: 'excellent' | 'good' | 'limit' | 'bad'
  title: string
  desc: string
  recommendations: string[]
}

function buildVerdict(netMarginPercent: number, hourlyMargin: number): Verdict {
  if (netMarginPercent >= 25 && hourlyMargin >= 8) {
    return {
      level: 'excellent',
      title: 'Contrat très rentable',
      desc: "Ce contrat dégage une marge confortable. Concentrez vos efforts pour en signer d'autres comme celui-ci et sécuriser la fidélisation.",
      recommendations: [
        'Identifier ce qui rend ce contrat rentable et le reproduire sur de nouveaux clients',
        'Sécuriser la reconduction tacite et la révision annuelle indexée',
        'Documenter la prestation pour pouvoir la déléguer sans perte de marge',
      ],
    }
  }
  if (netMarginPercent >= 15 && hourlyMargin >= 4) {
    return {
      level: 'good',
      title: 'Contrat rentable, marge dans les standards',
      desc: 'Ce contrat est dans la fourchette saine du secteur. Plusieurs leviers permettent encore de gagner 2 à 5 points de marge.',
      recommendations: [
        'Vérifier que vos consommables ne sont pas surcoûtés ou surdimensionnés',
        'Auditer les heures réelles vs heures contractuelles (souvent +10%)',
        'Renégocier les fréquences peu utiles avec le client',
      ],
    }
  }
  if (netMarginPercent >= 5) {
    return {
      level: 'limit',
      title: 'Contrat à la limite',
      desc: "La marge nette est faible. Une absence, une remise en état imprévue ou une hausse des charges peut basculer ce contrat en perte.",
      recommendations: [
        'Revoir le prix au prochain anniversaire en vous appuyant sur l\'index propreté FEP',
        'Recalculer vos heures réelles : la sous-évaluation initiale est la cause n°1',
        'Identifier les remises en état facturables qui sortent du contrat',
        'Vérifier si le client justifie une prestation aussi fréquente',
      ],
    }
  }
  return {
    level: 'bad',
    title: 'Contrat non rentable en l\'état',
    desc: "Ce contrat vous coûte ou ne couvre pas vos charges. Sans action rapide, il pénalise toute votre activité.",
    recommendations: [
      'Renégocier immédiatement le tarif (hausse de 8 à 15%) avec preuve de l\'indice propreté',
      'Réduire la fréquence ou retirer des prestations non essentielles',
      'Réaffecter un agent plus rapide ou mieux formé sur ce site',
      'Préparer un scénario de résiliation propre si la renégociation échoue',
    ],
  }
}

const verdictStyles: Record<Verdict['level'], { bg: string; border: string; icon: typeof TrendingUp; iconColor: string; textColor: string }> = {
  excellent: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: TrendingUp, iconColor: 'text-emerald-600', textColor: 'text-emerald-900' },
  good: { bg: 'bg-blue-50', border: 'border-blue-200', icon: CheckCircle, iconColor: 'text-blue-600', textColor: 'text-blue-900' },
  limit: { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-600', textColor: 'text-amber-900' },
  bad: { bg: 'bg-red-50', border: 'border-red-200', icon: TrendingDown, iconColor: 'text-red-600', textColor: 'text-red-900' },
}

export default function SimulateurRentabilite() {
  const [revenue, setRevenue] = useState(2400)
  const [hours, setHours] = useState(80)
  const [hourlyCost, setHourlyCost] = useState(20)
  const [consumables, setConsumables] = useState(120)
  const [travel, setTravel] = useState(60)
  const [overheadPercent, setOverheadPercent] = useState(12)

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
      document.getElementById('simulateur-schema')?.remove()
    }
  }, [])

  const laborCost = useMemo(() => hours * hourlyCost, [hours, hourlyCost])
  const directCost = useMemo(() => laborCost + consumables + travel, [laborCost, consumables, travel])
  const overheadCost = useMemo(() => Math.round(revenue * (overheadPercent / 100)), [revenue, overheadPercent])
  const totalCost = useMemo(() => directCost + overheadCost, [directCost, overheadCost])

  const grossMargin = useMemo(() => revenue - directCost, [revenue, directCost])
  const grossMarginPercent = useMemo(() => (revenue > 0 ? (grossMargin / revenue) * 100 : 0), [grossMargin, revenue])
  const netMargin = useMemo(() => revenue - totalCost, [revenue, totalCost])
  const netMarginPercent = useMemo(() => (revenue > 0 ? (netMargin / revenue) * 100 : 0), [netMargin, revenue])
  const hourlyMargin = useMemo(() => (hours > 0 ? netMargin / hours : 0), [netMargin, hours])
  const yearlyNet = useMemo(() => Math.round(netMargin * 12), [netMargin])

  const verdict = useMemo(() => buildVerdict(netMarginPercent, hourlyMargin), [netMarginPercent, hourlyMargin])
  const VStyle = verdictStyles[verdict.level]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              to="/ressources"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Toutes les ressources
            </Link>

            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
                <Euro size={14} />
                Simulateur de rentabilité
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Ce contrat est-il<br />
                <span className="text-blue-600">vraiment rentable ?</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Renseignez les paramètres d'un contrat de nettoyage. Le simulateur calcule la marge brute, la marge nette et le résultat horaire, et donne un verdict immédiat avec des actions concrètes.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Paramètres du contrat</h2>
                <div className="space-y-7">
                  <Slider
                    label="CA mensuel HT du contrat"
                    value={revenue}
                    min={500}
                    max={15000}
                    step={50}
                    suffix=" €"
                    hint="Le prix mensuel facturé au client (hors prestations ponctuelles)"
                    onChange={setRevenue}
                  />
                  <Slider
                    label="Heures de prestation par mois"
                    value={hours}
                    min={5}
                    max={400}
                    step={1}
                    suffix=" h"
                    hint="Total des heures agents passées sur ce site / contrat"
                    onChange={setHours}
                  />
                  <Slider
                    label="Coût horaire chargé agent"
                    value={hourlyCost}
                    min={15}
                    max={35}
                    step={0.5}
                    suffix=" €"
                    hint="Salaire brut + charges + congés payés + provision absences"
                    onChange={setHourlyCost}
                  />
                  <Slider
                    label="Consommables / fournitures par mois"
                    value={consumables}
                    min={0}
                    max={800}
                    step={10}
                    suffix=" €"
                    hint="Produits, sacs, essuie-mains, etc. utilisés sur le site"
                    onChange={setConsumables}
                  />
                  <Slider
                    label="Frais de déplacement par mois"
                    value={travel}
                    min={0}
                    max={500}
                    step={10}
                    suffix=" €"
                    hint="Carburant, péages, indemnités kilométriques imputables au site"
                    onChange={setTravel}
                  />
                  <Slider
                    label="Quote-part frais de structure"
                    value={overheadPercent}
                    min={5}
                    max={25}
                    step={1}
                    suffix=" %"
                    hint="Part du CA pour absorber direction, encadrement, locaux, assurances, etc."
                    onChange={setOverheadPercent}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-7 leading-relaxed">
                  Hypothèses sectorielles standard. Pour une simulation fine personnalisée, le module rentabilité de Proprely intègre vos propres coûts réels par agent et par site.
                </p>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <motion.div
                  key={`verdict-${verdict.level}`}
                  initial={{ scale: 0.98, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${VStyle.bg} ${VStyle.border} border-2 rounded-2xl p-6 sm:p-7`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 ${VStyle.iconColor}`}>
                      <VStyle.icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${VStyle.iconColor} mb-1`}>Verdict</div>
                      <h3 className={`text-lg sm:text-xl font-black ${VStyle.textColor} leading-tight`}>{verdict.title}</h3>
                    </div>
                  </div>
                  <p className={`text-sm ${VStyle.textColor} leading-relaxed opacity-90 mb-4`}>{verdict.desc}</p>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-900/10">
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${VStyle.iconColor} mb-1`}>Marge nette</div>
                      <div className={`text-xl sm:text-2xl font-black ${VStyle.textColor}`}>{netMarginPercent.toFixed(1)} %</div>
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${VStyle.iconColor} mb-1`}>Résultat / heure</div>
                      <div className={`text-xl sm:text-2xl font-black ${VStyle.textColor}`}>{hourlyMargin.toFixed(2)} €</div>
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold uppercase tracking-wider ${VStyle.iconColor} mb-1`}>Net annuel</div>
                      <div className={`text-xl sm:text-2xl font-black ${VStyle.textColor}`}>{yearlyNet.toLocaleString('fr-FR')} €</div>
                    </div>
                  </div>
                </motion.div>

                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider text-[11px]">Détail du calcul</h3>
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <dt className="text-slate-600">CA mensuel</dt>
                      <dd className="font-bold text-slate-900 tabular-nums">{revenue.toLocaleString('fr-FR')} €</dd>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <dt className="text-slate-600">Coût main d'œuvre ({hours} h × {hourlyCost} €)</dt>
                      <dd className="font-bold text-red-600 tabular-nums">−{laborCost.toLocaleString('fr-FR')} €</dd>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <dt className="text-slate-600">Consommables</dt>
                      <dd className="font-bold text-red-600 tabular-nums">−{consumables.toLocaleString('fr-FR')} €</dd>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <dt className="text-slate-600">Déplacements</dt>
                      <dd className="font-bold text-red-600 tabular-nums">−{travel.toLocaleString('fr-FR')} €</dd>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 bg-slate-50/60 -mx-2 px-2 rounded">
                      <dt className="text-slate-800 font-semibold">Marge brute</dt>
                      <dd className="font-black text-slate-900 tabular-nums">{grossMargin.toLocaleString('fr-FR')} € · {grossMarginPercent.toFixed(1)} %</dd>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                      <dt className="text-slate-600">Frais de structure ({overheadPercent} % du CA)</dt>
                      <dd className="font-bold text-red-600 tabular-nums">−{overheadCost.toLocaleString('fr-FR')} €</dd>
                    </div>
                    <div className="flex items-center justify-between pt-2.5 border-t-2 border-slate-200">
                      <dt className="text-slate-900 font-black">Résultat net mensuel</dt>
                      <dd className={`font-black tabular-nums text-lg ${netMargin >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                        {netMargin >= 0 ? '+' : ''}{netMargin.toLocaleString('fr-FR')} €
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={16} className="text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-[11px]">Actions recommandées</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {verdict.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider mb-3">
                      <Sparkles size={11} />
                      Aller plus loin
                    </div>
                    <h3 className="text-base sm:text-lg font-black mb-2 leading-tight">
                      Faites tourner ce calcul sur l'ensemble de vos contrats
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Proprely calcule automatiquement la marge en temps réel pour chacun de vos clients. Vous voyez immédiatement où vous gagnez de l'argent, où vous en perdez, et où renégocier.
                    </p>
                    <Link to="/beta" className="group bg-white text-slate-900 rounded-xl px-5 py-3 font-bold text-sm hover:bg-slate-100 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] inline-flex items-center gap-2 active:scale-[0.97]">
                      Rejoindre la bêta gratuite
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Méthode</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce que le simulateur calcule, et ce qu'il ne calcule pas
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="prose-content text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
                <p><strong className="text-slate-900">Marge brute</strong> = CA mensuel − (heures × coût horaire chargé + consommables + déplacements). Elle mesure si vos coûts directs sont couverts par le prix du contrat.</p>
                <p><strong className="text-slate-900">Marge nette</strong> = marge brute − frais de structure. Elle inclut la quote-part de vos frais généraux (encadrement, locaux, assurances, logiciels, comptabilité) qu'on absorbe en pourcentage du CA, faute de pouvoir tout allouer site par site.</p>
                <p><strong className="text-slate-900">Résultat horaire</strong> = marge nette ÷ heures sur le site. C'est le KPI le plus utile pour comparer deux contrats de tailles différentes.</p>
                <p>Ce simulateur ne tient pas compte des prestations ponctuelles (remise en état, vitrerie exceptionnelle, décapage), des écarts entre heures contractuelles et heures réellement effectuées, ni des coûts liés aux remplacements et absences. Sur ces aspects, l'écart peut représenter 3 à 8 points de marge.</p>
                <p><strong className="text-slate-900">Pour aller plus loin</strong>, le module rentabilité de Proprely intègre vos coûts horaires réels par agent, les remises en état facturées hors contrat, et le suivi des écarts entre heures planifiées et heures réalisées.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Guide rentabilité contrat nettoyage 2026</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              Comprendre la rentabilité d'un contrat de nettoyage B2B en 2026
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>La rentabilité d'un contrat de nettoyage B2B en France se mesure principalement via la marge brute (CA contrat − coût direct des heures agents). En 2026, sur les retours bêta privée Proprely, 15-25 % des contrats d'une société de nettoyage sont structurellement déficitaires sans que le dirigeant le sache. Les calculer en temps réel est le KPI le plus stratégique du pilotage opérationnel.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Les 4 seuils de marge brute à connaître</h3>
              <p><strong>Plus de 35 % :</strong> excellent (segments premium, technicité, contrats exclusifs). Conserver, demander référencement, étudier upsell.</p>
              <p><strong>25 à 35 % :</strong> bon (cible standard pour la propreté B2B). Conserver, surveiller dans le temps.</p>
              <p><strong>15 à 25 % :</strong> à surveiller. Étudier optimisations internes, renégocier au renouvellement.</p>
              <p><strong>Moins de 15 % :</strong> à renégocier dans 90 jours (+15-25 % de tarif) ou à sortir. Tout contrat à moins de 10 % de marge brute est structurellement déficitaire car ne couvre pas les frais de structure (12-15 % typique) et la marge nette cible.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Les causes typiques d'un contrat déficitaire</h3>
              <p>4 causes récurrentes : (1) <strong>Sous-tarification au démarrage</strong> (peur de perdre le prospect, prix à 50 €/h au lieu de 60-65 €/h cible) ; (2) <strong>Dérapage des heures réelles vs heures contractuelles</strong> (les agents font 23 h/semaine au lieu de 20 h prévues — surfacturation interne non détectée) ; (3) <strong>Coût horaire chargé sous-estimé</strong> (raisonnement en brut 12 € au lieu du chargé 20-22 €) ; (4) <strong>Hausses IDCC 3043 annuelles non répercutées</strong> dans les contrats (rogne 1-3 points de marge/an).</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Comment automatiser le suivi de la rentabilité</h3>
              <p>Le calcul manuel mensuel demande 4-6 h/mois et arrive avec 30-60 jours de retard. Un logiciel métier intégré (planning + pointage + facturation) calcule la marge par client en temps réel : pour chaque contrat, agrégation auto des heures pointées × coût horaire chargé paramétré, comparaison au CA facturé, affichage dashboard avec code couleur (vert/orange/rouge). Voir notre <Link to="/blog/calculer-rentabilite-client-nettoyage" className="text-blue-600 font-semibold hover:underline">méthode complète pour calculer la rentabilité par client en nettoyage</Link>.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Pour aller plus loin</h3>
              <p>Approfondir : <Link to="/blog/ameliorer-rentabilite-societe-nettoyage" className="text-blue-600 font-semibold hover:underline">améliorer la rentabilité société de nettoyage : 5 leviers 2026</Link> · <Link to="/blog/cout-horaire-charge-agent-nettoyage" className="text-blue-600 font-semibold hover:underline">coût horaire chargé agent nettoyage 2026 : méthode</Link> · <Link to="/blog/fixer-prix-nettoyage" className="text-blue-600 font-semibold hover:underline">prix nettoyage 2026 : règle des 3× + grille tarifaire</Link> · <Link to="/blog/kpi-societe-nettoyage-2026" className="text-blue-600 font-semibold hover:underline">12 KPI société de nettoyage à suivre en 2026</Link> · <Link to="/fonctionnalites/suivi-interventions-nettoyage" className="text-blue-600 font-semibold hover:underline">logiciel suivi interventions nettoyage temps réel</Link> · <Link to="/logiciel-societe-nettoyage" className="text-blue-600 font-semibold hover:underline">logiciel société de nettoyage : guide complet 2026</Link>.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
