import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Home, FileSignature, Camera, Send, HelpCircle, Sparkles, BookOpen } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/logiciel-nettoyage-copropriete-syndic/'
const TITLE = 'Logiciel nettoyage copropriété et syndic : PV automatique · Proprely'
const DESCRIPTION = "Logiciel pour société de nettoyage qui travaille avec des syndics de copropriété : preuve de passage QR, PV automatique au syndic, reporting standardisé. Bêta gratuite."

const syndicNeeds = [
  { icon: Camera, title: 'Preuve de passage standardisée', desc: "Les principaux syndics nationaux (Foncia, Citya, Nexity, Sergic, Loiselet & Daigremont) exigent désormais une preuve de passage formelle : QR code à l'entrée, photos avant-après des parties communes, signature du gardien si présent. Sans cela, contestations garanties." },
  { icon: Send, title: 'PV mensuel envoyé automatiquement', desc: "Le gestionnaire d'immeuble du syndic veut un rapport mensuel synthétique : passages effectués, photos par zone (hall, escaliers, ascenseur, cour), incidents éventuels. Proprely génère et envoie ce PV sans intervention manuelle." },
  { icon: FileSignature, title: 'Contrats récurrents facturés automatiquement', desc: "Les contrats syndic sont quasi-systématiquement annuels avec facturation mensuelle ou trimestrielle. Proprely transforme le contrat signé en facturation automatique : génération, envoi au compta du syndic, suivi paiement, relances à J+15 et J+30." },
  { icon: Home, title: 'Adaptation aux contraintes du bâti', desc: "Halls haussmanniens en marbre, escaliers à rampe en bois, cours pavées, ascenseurs hydrauliques anciens : chaque copropriété a ses spécificités. Fiches site avec protocoles dédiés et produits agréés, mémorisées une fois et accessibles à tous les agents." },
]

const syndicProfiles = [
  { title: "Syndics nationaux (Foncia, Citya, Nexity)", desc: "Volumes importants (50 à 500 immeubles par agence), exigence reporting standardisé, contrats appel d'offres tous les 3-5 ans. Tarif marché : 0,40 à 0,70 €/m²/mois selon zone. Marge cible : 12 à 18 %." },
  { title: "Syndics indépendants régionaux", desc: "5 à 50 immeubles par cabinet, relation plus directe avec le gestionnaire, contrats reconduits tacitement. Tarif marché : 0,45 à 0,80 €/m²/mois. Marge cible : 15 à 20 %." },
  { title: "Copropriétés en gestion directe (ASL)", desc: "Conseil syndical bénévole, décisions en AG annuelle, exigences variables. Plages d'intervention souvent contraintes par les habitants. Tarif marché : 0,40 à 0,65 €/m²/mois. Marge cible : 15 à 22 %." },
  { title: "Copropriétés haussmanniennes premium", desc: "Halls patrimoniaux (marbre, bois, ferronnerie), exigences esthétiques fortes, parfois gardien permanent. Prestations vitrerie hauteur et entretien spécifiques. Tarif marché : 0,80 à 1,30 €/m²/mois. Marge cible : 18 à 25 %." },
]

const proprelyFit = [
  { title: "PV automatique au format syndic", desc: "Configurez par site le destinataire des PV (gestionnaire d'immeuble, conseil syndical, comptabilité syndic). Le rapport mensuel part automatiquement avec photos, horodatage, agent et incidents." },
  { title: "Multi-sites avec contraintes locales", desc: "Un syndic = N immeubles avec chacun ses spécificités (entrée gardien, code, contrats sortants, fréquences). Proprely gère 5 à 500 sites par client sans dégrader la lisibilité du planning." },
  { title: "Facturation récurrente syndic", desc: "Contrats annuels avec facturation mensuelle/trimestrielle automatique, envoi au service comptabilité du syndic, suivi des paiements, relances à J+15 et J+30. Plus aucun retard de relance, plus aucune facture oubliée." },
  { title: "Réponse aux appels d'offres syndic", desc: "Catalogue prestations syndic (halls, escaliers, ascenseur, cour, vitres) avec tarification par fréquence. Devis détaillé en 5 minutes pour une réponse rapide aux appels d'offres triannuels." },
]

const faq = [
  { q: "Quel logiciel pour société de nettoyage qui travaille avec des syndics ?", a: "Pour piloter une société de nettoyage qui sert des syndics de copropriété, le logiciel doit couvrir trois exigences : (1) preuve de passage standardisée (QR + photos avant-après + signature gardien éventuelle) acceptée par les syndics nationaux, (2) PV mensuel automatique envoyé au gestionnaire d'immeuble sans intervention manuelle, (3) facturation récurrente annuelle/trimestrielle avec relances automatiques. Proprely intègre ces trois exigences nativement, avec multi-sites illimité (un syndic peut avoir 50 à 500 immeubles)." },
  { q: "Comment générer un PV de passage pour un syndic de copropriété ?", a: "Le PV de passage propreté pour syndic doit contenir : date et heure d'intervention, nom de l'agent, zones nettoyées (hall, escaliers, ascenseur, cour), photos avant-après des parties communes, incidents éventuels (objet trouvé, dégradation, ampoule grillée), signature du gardien si présent. Proprely génère ce PV automatiquement à la validation de la mission par l'agent et l'envoie au gestionnaire d'immeuble configuré. Format accepté par Foncia, Citya, Nexity, Sergic et Loiselet & Daigremont." },
  { q: "Comment automatiser la facturation des contrats syndic ?", a: "Les contrats syndic sont quasi-systématiquement annuels avec facturation mensuelle ou trimestrielle. Proprely transforme le contrat signé en facturation automatique : génération à l'échéance, envoi au service comptabilité du syndic (adresse e-mail dédiée par syndic), suivi du paiement, relances à J+15 et J+30 si la facture n'est pas réglée. Vous gagnez 2 à 4 heures par mois sur la facturation et les relances pour une dizaine de syndics actifs." },
  { q: "Que faire en cas d'incident sur une copropriété (vol, dégradation) ?", a: "L'agent signale l'incident depuis son téléphone (catégorie + photo + commentaire). Proprely : (1) ajoute l'incident au PV mensuel automatique, (2) envoie une notification immédiate au gestionnaire d'immeuble si configuré, (3) garde l'historique horodaté pour les audits ou contestations futures. La traçabilité protège vos contrats lors des renouvellements ou appels d'offres." },
  { q: "Peut-on adapter le protocole de nettoyage selon le bâti de la copropriété ?", a: "Oui. Chaque site (immeuble) a sa fiche dédiée avec son protocole spécifique : produits adaptés au revêtement (marbre, terrazzo, parquet ancien, carrelage), ordre des zones, fréquence par partie commune (hall quotidien, escaliers 3×/semaine, ascenseur quotidien, cour hebdomadaire), interdits (pas de produit corrosif sur ferronnerie ancienne). L'agent consulte la fiche sur son téléphone avant chaque intervention." },
  { q: "Combien de syndics et d'immeubles Proprely peut-il gérer ?", a: "Pas de limite par défaut. Les sociétés de nettoyage utilisent typiquement Proprely pour 3 à 25 syndics actifs et 30 à 300 immeubles au total. Le multi-sites illimité avec vue par client, par site et par zone géographique reste lisible jusqu'à plusieurs centaines de copropriétés. Au-delà, il faut hiérarchiser par zone ou par chef d'équipe." },
]

function injectSchema() {
  const id = 'copro-schema'
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
      datePublished: '2026-06-03',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Logiciel nettoyage copropriété', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel pour société de nettoyage de copropriétés',
      description: DESCRIPTION,
      url: URL,
      image: 'https://proprely.fr/og-image.png',
      provider: { '@id': 'https://proprely.fr/#organization' },
      serviceType: 'Logiciel de gestion société de nettoyage copropriétés',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de nettoyage B2B intervenant pour syndics et copropriétés en France',
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

export default function CoproSyndicLanding() {
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
      document.getElementById('copro-schema')?.remove()
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
              <Breadcrumbs items={[{ name: 'Logiciel nettoyage copropriété' }]} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Home size={12} />
              Copropriété & syndic
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Logiciel nettoyage copropriété et syndic :<br />
              <span className="text-blue-600">preuve de passage + PV automatique + facturation récurrente</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Pour piloter une société de nettoyage qui sert des syndics, votre logiciel doit fournir une preuve de passage standardisée acceptée par Foncia, Citya, Nexity, envoyer un PV mensuel automatique au gestionnaire d'immeuble et facturer les contrats annuels sans intervention manuelle.
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
                onClick={() => trackEvent('beta_cta_click', { location: 'copro_hero' })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/blog/nettoyage-copropriete-obligations-prix"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Lire le guide copropriété
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce que les syndics attendent vraiment
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                4 exigences récurrentes qui font la différence entre un contrat reconduit et un contrat perdu à l'appel d'offres triennal.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {syndicNeeds.map((n, i) => {
                const Icon = n.icon
                return (
                  <motion.div
                    key={n.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{n.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{n.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Vos profils de clients syndic
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                4 typologies avec tarifs et marges marché 2026.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {syndicProfiles.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6"
                >
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{s.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
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
                Conformité syndic sans Excel ni messagerie dispersée
              </h2>
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
              Guides et ressources copropriété
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>📖 <Link to="/blog/nettoyage-copropriete-obligations-prix" className="text-blue-700 font-semibold hover:underline">Guide nettoyage copropriété : obligations légales et prix de marché</Link></li>
              <li>📸 <Link to="/fonctionnalites/preuve-passage-nettoyage" className="text-blue-700 font-semibold hover:underline">Preuve de passage : QR + photos + PV automatique au syndic</Link></li>
              <li>💸 <Link to="/fonctionnalites/devis-nettoyage" className="text-blue-700 font-semibold hover:underline">Devis et facturation automatisée des contrats syndic</Link></li>
              <li>📅 <Link to="/fonctionnalites/planning-nettoyage" className="text-blue-700 font-semibold hover:underline">Planning multi-sites pour 30 à 300 immeubles</Link></li>
              <li>📍 <Link to="/villes/paris" className="text-blue-700 font-semibold hover:underline">Logiciel nettoyage Paris (50 000+ copropriétés)</Link></li>
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Logiciel et nettoyage copropriétés : ce qu'on nous demande
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
              Pilotez vos contrats syndic depuis un seul écran
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min : sites, agents, PV et facturation récurrente configurés pour vous.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'copro_footer' })}
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
