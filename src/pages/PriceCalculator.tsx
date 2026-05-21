import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Euro, MapPin, Building2, Repeat, Info, HelpCircle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import NewsletterSignup from '../components/NewsletterSignup'
import { trackEvent } from '../lib/analytics'
import { BETA_FORM_URL } from '../config'

const META = {
  title: 'Calculateur prix nettoyage bureaux au m² · Proprely',
  description:
    "Calculez le prix de vente d'une prestation de nettoyage de bureaux : tarif au m² selon surface, fréquence, zone géographique, type de local. Estimation honnête, sans inscription.",
  url: 'https://proprely.fr/calculateur-prix-nettoyage-m2',
}

type LocalType = 'bureaux_standards' | 'bureaux_premium' | 'medical' | 'industriel' | 'commerce'
type Zone = 'paris_idf' | 'grande_metropole' | 'ville_moyenne' | 'zone_rurale'
type Frequency = 1 | 2 | 3 | 4 | 5 | 6

const LOCAL_TYPES: { value: LocalType; label: string; basePrice: number; help: string }[] = [
  { value: 'bureaux_standards', label: 'Bureaux standards', basePrice: 13, help: 'Open space, sanitaires, salles de réunion classiques.' },
  { value: 'bureaux_premium', label: 'Bureaux haut de gamme', basePrice: 17, help: "Réception soignée, matériaux nobles, vitrerie fréquente." },
  { value: 'medical', label: 'Cabinet médical / labo', basePrice: 21, help: 'Protocoles bionettoyage, traçabilité produits, agents formés.' },
  { value: 'industriel', label: 'Site industriel / logistique', basePrice: 9, help: 'Volumes importants, prestation moins complexe au m².' },
  { value: 'commerce', label: 'Commerce / retail', basePrice: 14, help: 'Vitrines, sols brillants, fréquence quotidienne avant ouverture.' },
]

const ZONES: { value: Zone; label: string; multiplier: number; help: string }[] = [
  { value: 'paris_idf', label: 'Paris / Île-de-France', multiplier: 1.20, help: 'Marché +15-25 % vs moyenne nationale.' },
  { value: 'grande_metropole', label: 'Lyon, Marseille, Lille, Bordeaux, Toulouse, Nantes', multiplier: 1.00, help: 'Référence : prix marché métropolitain.' },
  { value: 'ville_moyenne', label: 'Ville moyenne (50 000-200 000 hab)', multiplier: 0.90, help: '-10 % vs grandes métropoles.' },
  { value: 'zone_rurale', label: 'Zone rurale / petite ville', multiplier: 0.82, help: '-18 % vs grandes métropoles.' },
]

const FREQUENCIES: { value: Frequency; label: string; multiplier: number }[] = [
  { value: 1, label: '1×/semaine', multiplier: 0.65 },
  { value: 2, label: '2×/semaine', multiplier: 0.78 },
  { value: 3, label: '3×/semaine', multiplier: 0.88 },
  { value: 4, label: '4×/semaine', multiplier: 0.95 },
  { value: 5, label: '5×/semaine (quotidien)', multiplier: 1.00 },
  { value: 6, label: '6×/semaine (incl. samedi)', multiplier: 1.12 },
]

function injectSchema() {
  const id = 'price-calc-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: META.title,
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      datePublished: '2026-05-21',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://proprely.fr/outils' },
        { '@type': 'ListItem', position: 3, name: 'Calculateur prix nettoyage', item: META.url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quel est le prix moyen du nettoyage de bureaux au m² en France en 2026 ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le prix moyen du nettoyage de bureaux en France en 2026 se situe entre 12 et 18 € HT/m²/an, soit ~1-1,5 €/m²/mois. La fourchette varie selon la zone géographique (Paris/IDF +15-25 %, ville moyenne -10 %), le type de local (médical +30-50 % vs bureau standard), la fréquence et les prestations annexes (vitrerie, moquette).",
          },
        },
        {
          '@type': 'Question',
          name: 'Comment calcule-t-on le prix au m² pour une prestation de nettoyage ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Méthode : prix de base au m² (selon type de local) × multiplicateur de zone géographique × multiplicateur de fréquence. Cette estimation donne un prix annuel HT. Diviser par 12 pour le forfait mensuel. Ajuster ensuite selon les contraintes horaires (avant 6h ou après 21h : +30 à 60 %) et les prestations annexes.",
          },
        },
        {
          '@type': 'Question',
          name: 'Le prix du nettoyage est-il plus cher à Paris qu\'en province ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui. Le marché Paris / Île-de-France est typiquement 15 à 25 % au-dessus de la moyenne nationale, en raison du coût de la vie (salaires agents + 5-10 %), de la densité tertiaire, et de la concurrence sur les marchés syndic / facility. Les grandes métropoles (Lyon, Marseille, Lille) sont alignées à la moyenne nationale. Villes moyennes : -10 %. Zones rurales : -18 %.",
          },
        },
        {
          '@type': 'Question',
          name: 'Comment justifier un prix au m² plus élevé que la concurrence ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Détaillez les prestations (qui fait quoi, à quelle fréquence), listez les produits utilisés et leurs certifications (écolabels), intégrez la preuve de passage (QR + photos + signature), les engagements de remplacement et les délais de réactivité. Un devis détaillé justifie un prix 15-20 % supérieur sans difficulté.",
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

function formatEuro(n: number): string {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(n))
}

export default function PriceCalculator() {
  const [surface, setSurface] = useState<number>(300)
  const [localType, setLocalType] = useState<LocalType>('bureaux_standards')
  const [zone, setZone] = useState<Zone>('grande_metropole')
  const [frequency, setFrequency] = useState<Frequency>(5)

  useEffect(() => {
    document.title = META.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', META.url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', META.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', META.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', META.url)
    injectSchema()
    return () => {
      document.getElementById('price-calc-schema')?.remove()
    }
  }, [])

  const result = useMemo(() => {
    const base = LOCAL_TYPES.find((t) => t.value === localType)?.basePrice ?? 13
    const zoneMul = ZONES.find((z) => z.value === zone)?.multiplier ?? 1
    const freqMul = FREQUENCIES.find((f) => f.value === frequency)?.multiplier ?? 1
    const priceM2YearLow = base * zoneMul * freqMul * 0.85
    const priceM2YearHigh = base * zoneMul * freqMul * 1.15
    const annualLow = priceM2YearLow * surface
    const annualHigh = priceM2YearHigh * surface
    const monthlyLow = annualLow / 12
    const monthlyHigh = annualHigh / 12
    return {
      priceM2YearLow,
      priceM2YearHigh,
      annualLow,
      annualHigh,
      monthlyLow,
      monthlyHigh,
    }
  }, [surface, localType, zone, frequency])

  // Track usage for analytics (only when surface is positive)
  useEffect(() => {
    if (surface <= 0) return
    const handle = window.setTimeout(() => {
      trackEvent('price_calc_used', {
        local_type: localType,
        zone,
        frequency,
        surface,
      })
    }, 1500)
    return () => window.clearTimeout(handle)
  }, [surface, localType, zone, frequency])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumbs items={[{ name: 'Outils', href: '/outils' }, { name: 'Calculateur prix' }]} className="mb-6" />
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
              <Calculator size={12} />
              Calculateur prix nettoyage
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5"
            >
              Calculateur prix de nettoyage<br className="hidden sm:block" />
              de bureaux au m² en 2026
            </motion.h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl">
              Estimez le prix de vente d'une prestation de nettoyage selon la surface, le type de local, la zone géographique et la fréquence. Fourchette basse / haute basée sur les prix marché observés en France en 2026.
            </p>
          </div>
        </section>

        <section className="pb-12 sm:pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Vos paramètres</h2>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                      <Building2 size={14} className="text-blue-600" />
                      Type de local
                    </label>
                    <select
                      value={localType}
                      onChange={(e) => setLocalType(e.target.value as LocalType)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                    >
                      {LOCAL_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {LOCAL_TYPES.find((t) => t.value === localType)?.help}
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                      <MapPin size={14} className="text-blue-600" />
                      Zone géographique
                    </label>
                    <select
                      value={zone}
                      onChange={(e) => setZone(e.target.value as Zone)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                    >
                      {ZONES.map((z) => (
                        <option key={z.value} value={z.value}>{z.label}</option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {ZONES.find((z) => z.value === zone)?.help}
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
                      <Repeat size={14} className="text-blue-600" />
                      Fréquence de passage
                    </label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(Number(e.target.value) as Frequency)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
                    >
                      {FREQUENCIES.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center justify-between gap-2 text-sm font-bold text-slate-900 mb-2">
                      <span className="flex items-center gap-2">
                        <Building2 size={14} className="text-blue-600" />
                        Surface du local
                      </span>
                      <span className="text-blue-600 tabular-nums">{surface} m²</span>
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={5000}
                      step={50}
                      value={surface}
                      onChange={(e) => setSurface(Number(e.target.value))}
                      className="w-full accent-blue-600"
                      aria-label="Surface en m²"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>50 m²</span>
                      <span>5 000 m²</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                  <Info size={13} className="text-slate-400 shrink-0 mt-0.5" />
                  <p>Estimation à titre indicatif. Les prix réels dépendent aussi des contraintes horaires (rotations matinales / nocturnes : +30 à +60 %), des prestations annexes (vitrerie, moquette, décapage) et de votre marge cible.</p>
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-blue-600/30 blur-3xl pointer-events-none" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-4">Estimation</p>

                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1.5">Forfait mensuel HT</p>
                    <p className="text-3xl sm:text-4xl font-black tabular-nums leading-none">
                      {formatEuro(result.monthlyLow)} – {formatEuro(result.monthlyHigh)} €
                    </p>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1.5">Annuel HT</p>
                    <p className="text-xl sm:text-2xl font-bold tabular-nums leading-none">
                      {formatEuro(result.annualLow)} – {formatEuro(result.annualHigh)} €
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-wider text-slate-400 mb-1.5">Au m² / an HT</p>
                    <p className="text-base font-bold tabular-nums">
                      {result.priceM2YearLow.toFixed(1)} – {result.priceM2YearHigh.toFixed(1)} €
                    </p>
                  </div>

                  <a
                    href={BETA_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('beta_cta_click', { location: 'price_calculator' })}
                    className="group inline-flex items-center justify-center gap-2 w-full bg-blue-600 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-blue-700 transition-colors"
                  >
                    Tester Proprely gratuitement
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Cockpit métier qui calcule votre marge automatiquement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
              Comment lire le résultat
            </h2>
            <div className="space-y-5 text-slate-700 leading-relaxed text-base sm:text-lg">
              <p>
                La <strong>fourchette basse / haute</strong> reflète l'écart classique de marché entre prestataires positionnés "low-cost" et "premium" pour des prestations équivalentes. Si vous facturez en-dessous de la fourchette basse, votre marge est probablement insuffisante. Au-dessus, vous devez pouvoir justifier la différence (preuve de passage, certifications, réactivité).
              </p>
              <p>
                Les <strong>prix au m² indicatifs</strong> partent d'un panier moyen 2026 en France :
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-base">
                <li>Bureaux standards : 13 €/m²/an HT (base)</li>
                <li>Bureaux premium : 17 €/m²/an HT</li>
                <li>Cabinets médicaux / labos : 21 €/m²/an HT (protocoles bionettoyage)</li>
                <li>Sites industriels : 9 €/m²/an HT (volumes, prestation moins complexe)</li>
                <li>Commerces / retail : 14 €/m²/an HT</li>
              </ul>
              <p>
                Les multiplicateurs <strong>zone géographique</strong> et <strong>fréquence</strong> reflètent les écarts observés sur le marché : Paris/IDF est ~15-25 % au-dessus de la moyenne, une zone rurale ~-18 %, un contrat quotidien coûte ~35 % de plus qu'un contrat hebdomadaire.
              </p>
              <p>
                Si vous voulez aller plus loin, le <Link to="/simulateur-rentabilite" className="text-blue-600 font-semibold hover:underline">simulateur de rentabilité</Link> permet de vérifier que votre marge brute est saine en croisant ce prix de vente avec votre coût horaire chargé réel.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Le prix du nettoyage au m² en 2026
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {[
                {
                  q: "Quel est le prix moyen du nettoyage de bureaux au m² en France en 2026 ?",
                  a: "Entre 12 et 18 € HT/m²/an, soit ~1-1,5 €/m²/mois. La fourchette varie selon la zone géographique (Paris/IDF +15-25 %, ville moyenne -10 %), le type de local (médical +30-50 % vs bureau standard), la fréquence et les prestations annexes (vitrerie, moquette).",
                },
                {
                  q: "Comment calcule-t-on le prix au m² pour une prestation de nettoyage ?",
                  a: "Méthode : prix de base au m² (selon type de local) × multiplicateur de zone géographique × multiplicateur de fréquence. Cette estimation donne un prix annuel HT. Divisez par 12 pour le forfait mensuel. Ajustez ensuite selon les contraintes horaires (avant 6h ou après 21h : +30 à 60 %) et les prestations annexes.",
                },
                {
                  q: "Le prix du nettoyage est-il plus cher à Paris qu'en province ?",
                  a: "Oui. Le marché Paris / Île-de-France est typiquement 15 à 25 % au-dessus de la moyenne nationale, en raison du coût de la vie (salaires agents + 5-10 %), de la densité tertiaire, et de la concurrence sur les marchés syndic / facility. Les grandes métropoles (Lyon, Marseille, Lille) sont alignées à la moyenne nationale. Villes moyennes : -10 %. Zones rurales : -18 %.",
                },
                {
                  q: "Comment justifier un prix au m² plus élevé que la concurrence ?",
                  a: "Détaillez les prestations (qui fait quoi, à quelle fréquence), listez les produits utilisés et leurs certifications (écolabels), intégrez la preuve de passage (QR + photos + signature), les engagements de remplacement et les délais de réactivité. Un devis détaillé justifie un prix 15-20 % supérieur sans difficulté.",
                },
              ].map((f, i) => (
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

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <NewsletterSignup
              source="price_calculator"
              title="Recevez les grilles de prix mises à jour"
              description="Une fois par trimestre : actualisation des fourchettes de prix au m² par zone et par secteur, basée sur des contrats réels. Conformément RGPD, désinscription en 1 clic."
            />
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-950 text-white border-t border-slate-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Euro className="mx-auto mb-4 text-blue-400" size={36} />
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Calculer le prix, c'est bien.<br className="hidden sm:block" />
              Vérifier votre marge réelle, c'est mieux.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
              Proprely affiche votre marge par client en temps réel : heures facturées vs heures réelles, coût horaire chargé vs prix de vente. Vous savez instantanément quels contrats sont rentables.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'price_calculator_footer' })}
              className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
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
