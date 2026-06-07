import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { CheckCircle, ArrowRight, Award, Shield, Users, Calculator, HelpCircle, TrendingDown, TrendingUp } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import { FOUNDER_SPOTS, BETA_FORM_URL } from '../config'
import Link from '../components/Link'
import RemainingSpotsBadge from '../components/RemainingSpotsBadge'
import SocialProof from '../components/SocialProof'
import TrustSeals from '../components/TrustSeals'
import { trackEvent } from '../lib/analytics'

const founderBenefits = [
  'Accès gratuit pendant toute la durée de la bêta',
  'Tarif fondateur garanti à vie après la bêta',
  'Onboarding 30 min avec le fondateur',
  'Support prioritaire (réponse sous 4h)',
  'Influence directe sur la feuille de route',
]

const inclus = [
  'Clients, sites et contacts illimités',
  'Agents et spécialités sans limite',
  'Planning et affectation 1-clic',
  'Missions avec preuve de passage (QR, photos, signature)',
  'Devis et factures avec signature électronique',
  'Documents centralisés (contrats, fiches, attestations)',
  'Pilotage et marge par client en temps réel',
  'Hébergement européen, conformité RGPD',
  'Export de vos données en 1 clic, à tout moment',
]

const faqs = [
  {
    q: "Combien coûtera Proprely après la bêta ?",
    a: "Le tarif public sera communiqué à la fin de la bêta. Les membres fondateurs conservent un tarif privilégié, fixé à l'avance et conservé à vie — sans soumission aux augmentations futures.",
  },
  {
    q: "Y a-t-il un coût caché ou un engagement ?",
    a: "Non. Pas de carte bancaire demandée pendant la bêta. Pas d'engagement. Vous pouvez exporter vos données et partir à tout moment, dans des formats standards (CSV, Excel).",
  },
  {
    q: "Le tarif sera-t-il par agent, par site ou forfaitaire ?",
    a: "Le modèle final sera défini avec les retours des membres fondateurs. L'objectif est un tarif lisible, prévisible, qui ne pénalise pas la croissance. Forfait par tranche de taille d'entreprise est l'hypothèse de travail.",
  },
  {
    q: "Que se passe-t-il si je rejoins maintenant et que le tarif ne me convient pas après ?",
    a: "Vous restez membre fondateur avec votre tarif privilégié garanti à vie, ou vous partez librement en exportant vos données. Aucun lock-in technique ou contractuel.",
  },
  {
    q: "Pourquoi limiter à 30 sociétés fondatrices ?",
    a: "Parce que chaque société fondatrice bénéficie d'un onboarding et d'un support personnalisé par le fondateur. Au-delà, la qualité du suivi se dégraderait. Une fois les 30 places prises, la bêta se referme jusqu'au lancement public.",
  },
  {
    q: "Le tarif sera-t-il aligné sur Organilog, Progiclean ou PROPRET ?",
    a: "L'objectif est de proposer un tarif plus accessible et plus lisible que les outils legacy du marché, sans setup à plusieurs milliers d'euros ni surcoût par module. La grille définitive sera publiée et notifiée aux fondateurs en avance.",
  },
  {
    q: "Y a-t-il des frais de setup ou d'intégration ?",
    a: "Non. L'onboarding 30 min avec le fondateur est inclus, sans frais. Aucun consultant intégrateur, aucun setup à 2 000 € comme on en voit ailleurs. Vous importez votre Excel actuel et on configure ensemble votre cockpit.",
  },
  {
    q: "Que comprend le support pendant la bêta ?",
    a: "Support prioritaire en direct par le fondateur, par email et messagerie. Délai de réponse cible : moins de 4 h ouvrées. Les membres fondateurs ont une ligne directe.",
  },
  {
    q: "Puis-je migrer mes données depuis Excel ou un autre logiciel ?",
    a: "Oui. Pendant l'onboarding 30 min, le fondateur importe vos clients, sites, agents, plannings et historiques depuis n'importe quel format Excel/CSV. La migration depuis Organilog, Progiclean ou PROPRET est également supportée via export CSV.",
  },
  {
    q: "Le tarif fondateur reste-t-il valable si j'ajoute des agents ?",
    a: "Oui. Le tarif fondateur est conservé à vie quelle que soit votre croissance pendant la durée de votre contrat. Si vous passez de 5 à 50 agents, le tarif fondateur s'applique sur l'ensemble.",
  },
]

const COST_COMPARISON = [
  {
    label: "Logiciel / abonnement",
    excel: "0 €",
    proprely: "Bêta : 0 €",
    proprelyDetail: "Tarif fondateur publié en fin de bêta",
  },
  {
    label: "Temps dispersion (admin, copier-coller, recherches)",
    excel: "6 à 10 h / semaine",
    proprely: "1 à 2 h / semaine",
    proprelyDetail: "Saisie unique, données qui circulent entre modules",
  },
  {
    label: "Coût horaire dirigeant chargé",
    excel: "~ 45 €/h",
    proprely: "~ 45 €/h",
    proprelyDetail: "Identique — mais 5x moins d'heures consommées",
  },
  {
    label: "Coût annuel de la dispersion",
    excel: "12 600 à 21 000 €",
    proprely: "~ 3 000 €",
    proprelyDetail: "9 000 à 18 000 € récupérés par an",
  },
  {
    label: "Litiges syndic / client sans preuve de passage",
    excel: "3 à 8 / an",
    proprely: "≈ 0",
    proprelyDetail: "QR + photos + signature standardisés",
  },
  {
    label: "Marge invisible perdue (devis sous-tarifés)",
    excel: "−2 à −5 points",
    proprely: "+2 à +5 points",
    proprelyDetail: "Devis IA + suivi marge temps réel",
  },
  {
    label: "Risque URSSAF (heures complémentaires non tracées)",
    excel: "Élevé",
    proprely: "Maîtrisé",
    proprelyDetail: "Pointage GPS + calcul majorations IDCC 3043",
  },
]

function injectPricingSchema() {
  const id = 'pricing-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Proprely',
      description:
        "Logiciel de gestion pour société de nettoyage B2B : planning agents, devis, preuve de passage, marge par client.",
      url: 'https://proprely.fr/tarifs/',
      brand: { '@type': 'Brand', name: 'Proprely' },
      offers: {
        '@type': 'Offer',
        name: 'Membre fondateur — bêta privée',
        priceCurrency: 'EUR',
        price: '0',
        availability: 'https://schema.org/LimitedAvailability',
        url: 'https://proprely.fr/tarifs/',
        validFrom: '2026-01-01',
        description: `Accès gratuit pendant la bêta privée. Tarif fondateur conservé à vie après le lancement public. ${FOUNDER_SPOTS.total - FOUNDER_SPOTS.taken} places restantes sur ${FOUNDER_SPOTS.total}.`,
        eligibleQuantity: {
          '@type': 'QuantitativeValue',
          maxValue: FOUNDER_SPOTS.total,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tarifs Proprely',
      url: 'https://proprely.fr/tarifs/',
      datePublished: '2026-01-01',
      dateModified: today,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Tarifs', item: 'https://proprely.fr/tarifs/' },
        ],
      },
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function Pricing() {
  useEffect(() => {
    injectPricingSchema()
    return () => {
      document.getElementById('pricing-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Tarifs' }]} />
            </div>
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Tarifs</p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6"
            >
              Tarifs Proprely<br />
              <span className="text-blue-600">Gratuit pendant la bêta</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Proprely est en bêta privée. Aucun paiement, aucune carte bancaire demandée. Les {FOUNDER_SPOTS.total} premières sociétés sélectionnées gardent leur tarif privilégié à vie après le lancement public.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-2"
            >
              <RemainingSpotsBadge variant="banner" />
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 sm:p-10 shadow-2xl shadow-blue-500/20"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Award size={16} className="text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-300">Membre fondateur</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight">0 €</span>
                  <span className="text-blue-200 ml-2">/ mois pendant la bêta</span>
                </div>
                <p className="text-blue-100 text-sm mb-8 leading-relaxed">
                  Tarif fondateur conservé à vie après le lancement public, fixé à l'avance et non soumis aux augmentations futures.
                </p>
                <ul className="space-y-3 mb-10">
                  {founderBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle size={16} className="text-amber-300 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BETA_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('beta_cta_click', { location: 'pricing_card' })}
                  className="group w-full bg-white text-blue-700 rounded-xl px-6 py-4 font-bold text-base hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
                >
                  Candidater à la bêta
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
                </a>
                <p className="text-xs text-blue-200 mt-4 text-center">Sans carte bancaire · Réponse sous 24h</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sm:p-10"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Users size={16} className="text-slate-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Lancement public</span>
                </div>
                <div className="mb-2">
                  <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900">À venir</span>
                </div>
                <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                  Le tarif public sera défini avec les retours des fondateurs. L'objectif : un prix lisible, prévisible, qui ne pénalise pas la croissance.
                </p>
                <ul className="space-y-3 mb-10">
                  <li className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span>Toutes les fonctionnalités de la bêta</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span>Support standard</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span>Modèle hypothèse : forfait par tranche d'agents</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span>Engagement mensuel sans frais cachés</span>
                  </li>
                </ul>
                <div className="text-center py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-500">
                  Communication du tarif en fin de bêta · membres fondateurs notifiés en avance
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Le vrai coût</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Combien coûte la gestion sans logiciel ?
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Le vrai coût n'est pas le logiciel : c'est son absence. Diriger sur Excel, WhatsApp, Word et le papier, c'est 6 à 10 heures d'administration dispersée par semaine. À 45 € de coût horaire dirigeant chargé, cela représente <strong className="text-slate-900">12 600 à 21 000 € par an</strong> — sans compter les erreurs de pointage, les contrats sous-tarifés et les litiges faute de preuve de passage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calculateur-roi" className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2">
                <Calculator size={14} />
                Calculateur ROI
              </Link>
              <Link to="/simulateur-rentabilite" className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2">
                <Calculator size={14} />
                Simulateur de rentabilité
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Ils rejoignent la bêta</p>
              <h2 className="text-base sm:text-lg font-semibold text-slate-700">Les premiers fondateurs ont déjà signé</h2>
            </div>
            <SocialProof variant="indicators" />
            <TrustSeals variant="strip" className="mt-6" />
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Comparatif chiffré</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Combien Proprely vous fait économiser vs Excel + WhatsApp
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                Ordres de grandeur observés en propreté B2B pour une société de 5 à 30 agents. Les montants varient selon votre coût horaire dirigeant et votre niveau de dispersion actuel.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 font-bold text-slate-700">Poste</th>
                    <th className="text-left p-4 font-bold text-slate-700">
                      <span className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Sans logiciel</span>
                      Excel + WhatsApp
                    </th>
                    <th className="text-left p-4 font-bold text-slate-700">
                      <span className="block text-xs uppercase tracking-wider text-blue-600 mb-1">Avec Proprely</span>
                      Cockpit unique
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COST_COMPARISON.map((row) => (
                    <tr key={row.label} className="border-b border-slate-100 last:border-b-0">
                      <td className="p-4 font-semibold text-slate-900 align-top">{row.label}</td>
                      <td className="p-4 text-slate-700 align-top">
                        <span className="inline-flex items-center gap-1.5">
                          <TrendingUp size={12} className="text-amber-600 shrink-0" />
                          <span>{row.excel}</span>
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                          <TrendingDown size={12} className="text-emerald-600 shrink-0" />
                          <span>{row.proprely}</span>
                        </span>
                        <div className="text-xs text-slate-500 mt-1 leading-relaxed">{row.proprelyDetail}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/calculateur-roi"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3 font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                <Calculator size={14} />
                Calculer mon économie sur mon activité
              </Link>
              <Link
                to="/proprely-vs-excel"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Comparatif détaillé Proprely vs Excel
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Tout est inclus</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Aucun module en option,<br />aucune limite d'utilisation
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-3">
              {inclus.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3"
                >
                  <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/calculateur-roi"
                className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97]"
              >
                <Calculator size={14} />
                Calculer mon économie potentielle
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">FAQ tarifs</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Vos questions sur les prix
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6"
                >
                  <h3 className="flex items-start gap-2 text-base sm:text-lg font-bold text-slate-900 mb-2">
                    <HelpCircle size={16} className="text-blue-600 mt-1 shrink-0" />
                    {f.q}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed pl-6">{f.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-blue-600 opacity-10 blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <Shield size={32} className="text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4">
              Sans risque, sans engagement, sans lock-in
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Vos données restent les vôtres. Exportables en CSV ou Excel en 1 clic, à tout moment. Hébergement européen, conformité RGPD, chiffrement en transit et au repos.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'pricing_footer' })}
              className="group bg-white text-slate-900 rounded-xl px-7 py-4 font-bold text-base hover:bg-slate-100 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-2xl shadow-blue-500/20 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </a>
            <p className="text-xs text-slate-400 mt-4">
              <RemainingSpotsBadge variant="inline" className="!text-slate-400 !font-normal" /> · Aucune carte bancaire demandée
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
