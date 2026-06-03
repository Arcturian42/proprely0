import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Calculator, Users, ShieldCheck, HelpCircle, Sparkles, BookOpen, AlertTriangle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/convention-collective-nettoyage/'
const TITLE = 'Logiciel conforme convention collective propreté IDCC 3043 · Proprely'
const DESCRIPTION = "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes. Bêta gratuite."

const grille2026 = [
  { niveau: 'AS1', label: 'Agent Service Propreté débutant', coef: '110', taux: '11,99 €' },
  { niveau: 'AS2', label: 'Agent Service Propreté', coef: '130', taux: '12,15 €' },
  { niveau: 'ASP', label: 'Agent Service Propreté qualifié', coef: '150', taux: '12,42 €' },
  { niveau: 'ATQS', label: 'Agent Très Qualifié Service', coef: '175', taux: '13,32 €' },
  { niveau: "Chef d'équipe", label: "Encadrement terrain", coef: '195', taux: '14,20 €' },
  { niveau: 'Inspecteur', label: 'Responsable secteur', coef: '235', taux: '16,80 €' },
]

const obligations = [
  { icon: Calculator, title: 'Calcul des heures complémentaires', desc: "Majoration +10 % de 1 à 8h, +25 % au-delà pour les temps partiels. Erreur fréquente = redressement URSSAF assuré." },
  { icon: Users, title: 'Article 7 : transfert de personnel', desc: "Reprise automatique des agents lors d'un changement de prestataire. Due diligence RH obligatoire avant signature." },
  { icon: FileText, title: 'Prime d\'expérience à 4 ans', desc: "Versement mensuel à partir de 4 ans d'ancienneté chez le même employeur. Montants définis par accord d'entreprise." },
  { icon: ShieldCheck, title: 'Formation 0,55 % et pénibilité', desc: "Plan annuel formation propreté, suivi médical renforcé pour les agents exposés aux produits CMR (bionettoyage médical)." },
]

const proprelyFit = [
  { title: 'Grille salariale intégrée', desc: "La grille IDCC 3043 AS1 à inspecteur est paramétrée par défaut. Vous pouvez la surcharger par votre grille interne si elle est plus généreuse." },
  { title: 'Calcul automatique des majorations', desc: "Heures complémentaires, supplémentaires, nuit (+20 %), dimanche (+100 %), jours fériés (+100 %). Plus de calcul manuel ni d'oubli." },
  { title: "Suivi article 7 prêt pour la due diligence", desc: "Fiches agents avec ancienneté, marché d'affectation, % de temps sur chaque site — exportable en CSV pour transmission au successeur." },
  { title: 'Reporting paie standardisé', desc: "Export mensuel des heures par agent avec toutes les majorations conformes IDCC 3043. Prêt pour votre logiciel paie ou votre comptable." },
]

const faq = [
  { q: "Proprely applique-t-il automatiquement la convention collective propreté IDCC 3043 ?", a: "Oui. La grille salariale 2026 (AS1 à inspecteur), les majorations heures complémentaires/supplémentaires/nuit/dimanche/jours fériés, la prime d'expérience à partir de 4 ans, et les seuils pénibilité sont intégrés dans le module gestion des agents. Vous pouvez bien sûr surcharger avec votre grille interne si elle est plus généreuse que les minima conventionnels." },
  { q: "Comment Proprely gère-t-il l'article 7 (transfert automatique des salariés) ?", a: "Chaque agent a une fiche avec son ancienneté, le marché auquel il est affecté principalement, et le pourcentage de son temps sur ce marché. Lors d'un transfert (gain ou perte de marché), l'export CSV liste les agents éligibles (>6 mois d'ancienneté, >30 % du temps sur le marché) avec toutes les données nécessaires à la due diligence." },
  { q: "Le calcul des heures de nuit, dimanche et jours fériés est-il automatique ?", a: "Oui. Vous saisissez l'horaire réel de l'intervention (mobile ou desktop), Proprely identifie les plages concernées et applique les majorations conventionnelles : nuit +20 % (21h-6h), dimanche +100 %, jours fériés +100 %, 1er mai +100 % obligatoire. Le récapitulatif mensuel par agent est prêt pour la paie." },
  { q: "Quelles sont les sanctions en cas de non-respect de l'IDCC 3043 ?", a: "Trois risques principaux : (1) redressement URSSAF pour majorations heures complémentaires non versées (typique 5-20 k€ pour une PME de 15 agents sur 3 ans), (2) prud'hommes pour rappel de salaire (jusqu'à 3 ans d'arriérés + intérêts + dommages), (3) perte de marché si la due diligence article 7 révèle des anomalies sociales chez le prestataire sortant. Conformité IDCC 3043 = condition de sérénité juridique et commerciale." },
  { q: "Faut-il être expert RH pour utiliser Proprely en conformité IDCC 3043 ?", a: "Non. Les règles conventionnelles sont préconfigurées. Vous saisissez les heures réelles et les contrats, Proprely fait le calcul. En cas de doute sur un point spécifique (transfert article 7, prime d'expérience, exposition CMR), nous recommandons une revue annuelle avec votre cabinet comptable ou un avocat en droit social. Proprely vous fournit tous les exports nécessaires à cette revue." },
  { q: "Où trouver le détail complet de la convention collective propreté IDCC 3043 ?", a: "Notre article de référence couvre les 6 points qui font la différence au quotidien : grille de salaires 2024/2025/2026, calcul des heures, article 7, prime d'expérience, obligations formation/RSE/pénibilité. Voir l'article complet ci-dessous, ainsi que les sources officielles (Légifrance, FEP, accords annuels de branche)." },
]

function injectSchema() {
  const id = 'convention-collective-schema'
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
      datePublished: '2026-06-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      about: {
        '@type': 'Legislation',
        name: 'Convention collective nationale des entreprises de propreté et services associés',
        legislationIdentifier: 'IDCC 3043',
        legislationJurisdiction: { '@type': 'Country', name: 'France' },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Convention collective nettoyage IDCC 3043', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel conforme convention collective propreté IDCC 3043',
      description: DESCRIPTION,
      url: URL,
      image: 'https://proprely.fr/og-image.png',
      provider: { '@id': 'https://proprely.fr/#organization' },
      serviceType: 'Logiciel de gestion société de nettoyage conforme IDCC 3043',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de nettoyage B2B en France soumis à la convention collective propreté IDCC 3043',
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

export default function ConventionCollectiveLanding() {
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
      document.getElementById('convention-collective-schema')?.remove()
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
            <div className="flex justify-center mb-6">
              <Breadcrumbs items={[{ name: 'Convention collective propreté IDCC 3043' }]} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Conformité IDCC 3043 native
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Logiciel propreté conforme<br />
              <span className="text-blue-600">convention collective IDCC 3043</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Grille de salaires 2026 préconfigurée, calcul automatique des majorations heures, suivi article 7 prêt pour la due diligence, exports paie standardisés. Proprely intègre la convention collective des entreprises de propreté pour vous éviter redressement URSSAF et erreurs paie.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'convention_collective_hero' })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/blog/convention-collective-nettoyage-idcc-3043"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Lire le guide complet IDCC 3043
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
              Grille de salaires convention collective propreté 2026
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Minima conventionnels IDCC 3043 au 1er janvier 2026, base 35h hebdomadaires. Préconfigurés dans Proprely, modifiables si votre grille interne est plus généreuse.
            </p>
            <div className="overflow-x-auto bg-white border border-slate-100 rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 font-bold text-slate-700">Niveau</th>
                    <th className="px-4 sm:px-6 py-3 font-bold text-slate-700 hidden sm:table-cell">Libellé</th>
                    <th className="px-4 sm:px-6 py-3 font-bold text-slate-700 text-right">Coef.</th>
                    <th className="px-4 sm:px-6 py-3 font-bold text-slate-700 text-right">Taux horaire brut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grille2026.map((row) => (
                    <tr key={row.niveau}>
                      <td className="px-4 sm:px-6 py-3 font-bold text-slate-900">{row.niveau}</td>
                      <td className="px-4 sm:px-6 py-3 text-slate-600 hidden sm:table-cell">{row.label}</td>
                      <td className="px-4 sm:px-6 py-3 text-slate-600 text-right">{row.coef}</td>
                      <td className="px-4 sm:px-6 py-3 font-bold text-blue-700 text-right">{row.taux}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              Source : accord de branche convention collective des entreprises de propreté et services associés (IDCC 3043). Pour l'évolution sur 3 ans (2024/2025/2026) et les détails par niveau, voir le{' '}
              <Link to="/blog/convention-collective-nettoyage-idcc-3043" className="text-blue-700 font-semibold hover:underline">guide complet IDCC 3043</Link>.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle size={12} />
                Les 4 obligations clés
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Les obligations IDCC 3043 que vous ne pouvez plus tenir sur Excel
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                4 points de la convention où l'erreur coûte cher : redressement URSSAF, prud'hommes, perte de marché en transfert article 7.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {obligations.map((o, i) => {
                const Icon = o.icon
                return (
                  <motion.div
                    key={o.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{o.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{o.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/40 to-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={12} />
                Comment Proprely répond
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Conformité IDCC 3043 sans expert RH dédié
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Les règles conventionnelles sont préconfigurées. Vous saisissez les heures réelles, Proprely applique les majorations et génère les exports paie.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {proprelyFit.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7"
                >
                  <CheckCircle size={20} className="text-blue-600 mb-3" />
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{f.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Pour aller plus loin</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-5 tracking-tight">
              Le guide complet convention collective propreté
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Cette page présente le logiciel. Pour comprendre en profondeur la convention IDCC 3043 (grille 2024/2025/2026, calcul détaillé des heures, mécanique de l'article 7, primes, formation, pénibilité, sources Légifrance/FEP), consultez notre guide de référence.
            </p>
            <Link
              to="/blog/convention-collective-nettoyage-idcc-3043"
              className="group inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              Lire le guide IDCC 3043 complet
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Logiciel et convention collective IDCC 3043 : ce qu'on nous demande
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
              Pilotez vos agents en conformité IDCC 3043, sans Excel
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur — la grille IDCC 3043 est configurée pour vous.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'convention_collective_footer' })}
              className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
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
