import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Stethoscope, ShieldCheck, FileText, Camera, HelpCircle, Sparkles, BookOpen, AlertTriangle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/logiciel-nettoyage-medical-bionettoyage/'
const TITLE = 'Logiciel nettoyage médical et bionettoyage : traçabilité IDCC 3043 · Proprely'
const DESCRIPTION = "Logiciel pour société de bionettoyage médical : protocoles, traçabilité produits CMR, PV automatique. Conforme convention collective IDCC 3043. Bêta gratuite."

const obligations = [
  { icon: ShieldCheck, title: 'Protocoles bionettoyage tracés', desc: "Chaque site médical (cabinet, clinique, laboratoire) a sa fiche protocole : produits agréés, ordre des zones (sol → mobilier → sanitaires), temps de contact, fréquence. Les agents consultent le protocole sur leur téléphone avant d'intervenir." },
  { icon: AlertTriangle, title: 'Suivi exposition CMR obligatoire', desc: "La convention collective IDCC 3043 impose un suivi médical renforcé et une fiche d'exposition conservée 50 ans pour les agents exposés aux produits CMR (cancérogènes, mutagènes, reprotoxiques) — fréquents en bionettoyage médical. Proprely centralise ces fiches dans le profil agent." },
  { icon: Camera, title: 'Preuve de passage horodatée et géolocalisée', desc: "QR code à l'entrée du site, photos avant-après par zone, signature du référent médical si présent. Le PV PDF est envoyé automatiquement au facility manager ou au cabinet, avec horodatage et nom de l'agent." },
  { icon: FileText, title: 'Traçabilité produits et lots', desc: "Chaque produit utilisé (détergent, désinfectant virucide/bactéricide/fongicide) référencé avec son numéro de lot et sa fiche de données de sécurité. En cas d'audit ANSM ou ARS, l'historique est exportable en 1 clic." },
]

const clientTypes = [
  { title: "Cabinets médicaux & dentaires", desc: "Plages contraintes par les rendez-vous patients (avant 8h, entre 12h-14h, après 19h). Bionettoyage quotidien avec protocole 3 produits (détergent → désinfectant → rinçage). Tarif marché : 0,80 à 1,20 €/m²/mois." },
  { title: "Cliniques privées & centres d'imagerie", desc: "Plages élargies, exigence de traçabilité ANSM, agents formés bionettoyage obligatoires. Contrôle qualité régulier par le pharmacien hygiéniste. Tarif marché : 1,00 à 1,50 €/m²/mois." },
  { title: "Laboratoires d'analyses biomédicales", desc: "Salles propres ISO classe 7 ou 8, protocoles spécifiques zones échantillons / paillasses / sanitaires. Suivi exposition agents systématique. Tarif marché : 1,20 à 1,80 €/m²/mois." },
  { title: "EHPAD & résidences seniors", desc: "Volumes élevés (8 000 à 25 000 m²), contraintes infectiologiques fortes, périodes épidémies (grippe, gastro, Covid) avec protocole renforcé. Tarif marché : 0,70 à 1,00 €/m²/mois." },
]

const proprelyFit = [
  { title: "Spécialités bionettoyage natives", desc: "Profil agent avec spécialités médicales : bionettoyage, salles propres, secteur ASD. Affectation automatique vers les agents formés, refus système si un agent non habilité est affecté." },
  { title: "Conformité IDCC 3043 médical", desc: "Suivi des formations CMR, visites médicales renforcées (tous les 4 ans minimum), fiche d'exposition individuelle par agent, archivage 50 ans." },
  { title: "PV envoyés au pharmacien hygiéniste", desc: "Configurez par site les destinataires des PV automatiques. Le pharmacien hygiéniste de la clinique reçoit son rapport quotidien sans intervention manuelle." },
  { title: "Marge par contrat médical", desc: "Les contrats médicaux justifient un prix premium mais cachent souvent un coût horaire élevé (technicité + traçabilité). Proprely affiche la marge brute par contrat en temps réel pour éviter les sous-tarifications." },
]

const faq = [
  { q: "Quel logiciel pour société de bionettoyage médical ?", a: "Pour piloter une société de bionettoyage médical en France, le logiciel doit couvrir trois exigences spécifiques : (1) la traçabilité des protocoles et des produits (détergent, désinfectant, lot, fiche FDS) pour les audits ANSM/ARS, (2) le suivi des agents exposés aux produits CMR avec fiche d'exposition individuelle conservée 50 ans (obligation IDCC 3043), (3) la preuve de passage horodatée envoyée automatiquement au pharmacien hygiéniste ou au facility manager. Proprely intègre ces trois exigences nativement, avec spécialités bionettoyage natives sur les profils agents et PV automatique configurable par destinataire." },
  { q: "Comment tracer les protocoles bionettoyage avec un logiciel ?", a: "La traçabilité bionettoyage s'organise en 4 niveaux : (1) protocole par site (ordre des zones, produits agréés, temps de contact), (2) consigne par mission (l'agent voit le protocole sur son téléphone avant intervention), (3) check-list de passage (chaque zone validée avec photos avant-après), (4) export d'audit (historique complet exportable pour ANSM, ARS ou client). Proprely couvre les 4 niveaux dans un seul outil." },
  { q: "Le logiciel gère-t-il le suivi des agents exposés aux CMR ?", a: "Oui. La convention collective propreté IDCC 3043 impose un suivi médical renforcé pour les agents exposés aux produits cancérogènes, mutagènes ou reprotoxiques (CMR) — fréquents en bionettoyage médical et industriel. Proprely centralise dans le profil agent : formation aux risques chimiques (date, organisme), visites médicales renforcées (tous les 4 ans minimum), fiche d'exposition individuelle archivée 50 ans, équipements de protection fournis. Export possible pour un audit URSSAF ou inspection du travail." },
  { q: "Quelle marge attendre sur un contrat de bionettoyage médical ?", a: "Les contrats médicaux justifient un prix premium (0,80 à 1,80 €/m²/mois selon la complexité), mais le coût horaire est plus élevé qu'en bureaux standards : agents formés (+10 à +15 % vs SMIC propreté), produits agréés plus chers, temps de protocole plus long. Cible saine : 18 à 25 % de marge nette (vs 15-20 % en bureaux standards). Proprely affiche la marge brute par contrat en temps réel pour éviter la sous-tarification." },
  { q: "Mes agents bionettoyage doivent-ils utiliser une application ?", a: "Non, ils accèdent à leur planning, aux protocoles du site et à la preuve de passage via un simple lien web ouvert sur leur téléphone. Pas d'application à installer, pas de mise à jour à gérer, fonctionne sur 4G dégradée — important dans les sous-sols de cliniques ou les locaux techniques de laboratoires." },
  { q: "Comment se compare Proprely aux ERP propreté pour le médical ?", a: "PROPRET, Progiclean ou Sevensoft proposent des modules bionettoyage complets mais avec setup 1-3 mois et tarif sur devis (souvent 50+ €/utilisateur/mois ou packages 5-15 k€). Proprely couvre les exigences essentielles du bionettoyage médical (traçabilité protocoles, suivi CMR, PV automatique) en bêta gratuite pour les TPE/PME 3-50 agents, avec onboarding 30 minutes. Pas adapté si vous avez besoin d'une intégration paie ERP avancée." },
]

function injectSchema() {
  const id = 'medical-schema'
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
          { '@type': 'ListItem', position: 2, name: 'Logiciel nettoyage médical', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel pour société de bionettoyage médical',
      description: DESCRIPTION,
      url: URL,
      image: 'https://proprely.fr/og-image.png',
      provider: { '@id': 'https://proprely.fr/#organization' },
      serviceType: 'Logiciel de gestion société de bionettoyage médical',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de bionettoyage médical et établissements de santé en France',
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

export default function MedicalBionetLanding() {
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
      document.getElementById('medical-schema')?.remove()
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
              <Breadcrumbs items={[{ name: 'Logiciel nettoyage médical' }]} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Stethoscope size={12} />
              Bionettoyage médical
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Logiciel nettoyage médical et bionettoyage :<br />
              <span className="text-blue-600">traçabilité, protocoles, conformité IDCC 3043</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Pour piloter une société de bionettoyage médical, votre logiciel doit tracer les protocoles, suivre les agents exposés aux produits CMR (obligation IDCC 3043) et envoyer la preuve de passage horodatée au pharmacien hygiéniste. Proprely intègre les trois nativement.
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
                onClick={() => trackEvent('beta_cta_click', { location: 'medical_hero' })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/blog/bionettoyage-medical-protocoles"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Lire le guide bionettoyage
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertTriangle size={12} />
                Les 4 exigences spécifiques
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce que le médical impose en plus
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Le bionettoyage médical ajoute 4 couches que le nettoyage tertiaire standard ne connaît pas. Chacune est obligatoire et auditée.
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

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Vos clients types et leur marché
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Les 4 typologies de sites médicaux, avec contraintes et prix marché 2026 indicatifs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {clientTypes.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-100 p-6"
                >
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">{c.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{c.desc}</p>
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
                Conformité bionettoyage sans complexité ERP
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
              Guides et ressources bionettoyage
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>📖 <Link to="/blog/bionettoyage-medical-protocoles" className="text-blue-700 font-semibold hover:underline">Guide bionettoyage médical : protocoles, produits CMR, traçabilité</Link></li>
              <li>⚖️ <Link to="/convention-collective-nettoyage" className="text-blue-700 font-semibold hover:underline">Logiciel conforme convention collective propreté IDCC 3043</Link></li>
              <li>👥 <Link to="/fonctionnalites/gestion-agents-nettoyage" className="text-blue-700 font-semibold hover:underline">Gestion agents nettoyage : spécialités, formations, exposition CMR</Link></li>
              <li>📸 <Link to="/fonctionnalites/preuve-passage-nettoyage" className="text-blue-700 font-semibold hover:underline">Preuve de passage : QR, photos, signature, PV automatique</Link></li>
              <li>💶 <Link to="/blog/tarif-nettoyage-bureaux-m2-2026" className="text-blue-700 font-semibold hover:underline">Tarif nettoyage 2026 (bureaux et médical au m²)</Link></li>
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
              Logiciel et bionettoyage médical : ce qu'on nous demande
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
              Pilotez votre bionettoyage médical sans Excel
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min : protocoles, suivi CMR et PV automatiques configurés pour vous.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'medical_footer' })}
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
