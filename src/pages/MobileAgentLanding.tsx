import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Smartphone, Zap, ShieldCheck, QrCode, HelpCircle, Sparkles, BookOpen, X, ExternalLink } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.proprely.app'
const URL = 'https://proprely.fr/application-mobile-agents-nettoyage/'
const TITLE = "Application mobile agents nettoyage : app Android gratuite · Proprely"
const DESCRIPTION = "App mobile pour agents de nettoyage : planning, pointage, preuve de passage. Android sur le Play Store (gratuite, optionnelle), iOS bientôt, ou lien web. Aucun coût par agent. Bêta privée."

const benefits = [
  { icon: Smartphone, title: "App Android gratuite sur le Play Store", desc: "Téléchargement optionnel (com.proprely.app). Planning, pointage, preuve de passage (QR, photos, signature) dans une expérience native. iOS arrive bientôt." },
  { icon: Zap, title: "Le web reste OK", desc: "Pas d'obligation d'installer quoi que ce soit : chaque agent peut ouvrir son lien personnel dans le navigateur. Idéal pour un essai rapide ou un téléphone partagé." },
  { icon: ShieldCheck, title: "Aucun coût par agent", desc: "L'accès terrain est inclus. Pas de facturation par utilisateur agent — contrairement aux grilles « +X € / user »." },
  { icon: QrCode, title: "Accès révocable, données maîtrisées", desc: "Lien / compte nominatif coupés en quelques secondes depuis le cockpit si un agent part ou perd son téléphone." },
]

const features = [
  { title: "Voir son planning de la semaine", desc: "Affiché clairement par jour, par site, par horaire. L'agent voit ses prochaines interventions, l'adresse, le code d'accès, le protocole et les éventuelles consignes spéciales (gardien à prévenir, animaux, fragilités)." },
  { title: "Pointer son arrivée et départ", desc: "Check-in à l'arrivée sur site avec horodatage (et géolocalisation optionnelle si activée par le dirigeant), check-out à la fin. Le compteur d'heures de l'agent est mis à jour automatiquement pour la paie." },
  { title: "Déclencher la preuve de passage", desc: "Scan du QR code du site, photos avant-après par zone, signature du client ou gardien si présent. Le PV PDF est généré et envoyé au facility manager configuré dès la validation." },
  { title: "Signaler une absence ou un incident", desc: "Bouton dédié pour prévenir d'une absence (le cockpit dirigeant reçoit une alerte et propose les remplaçants), ou pour signaler un incident sur site (vol, dégradation, oubli matériel) avec photo et commentaire." },
  { title: "Consulter ses heures et historique", desc: "L'agent voit son compteur d'heures du mois en cours en temps réel. Transparence qui règle 80 % des contestations de paie avant qu'elles ne deviennent un conflit." },
  { title: "Recevoir ses consignes en français simple", desc: "L'interface utilise un vocabulaire métier accessible : pas de jargon technique, pas d'icônes énigmatiques, pas de menu à 4 niveaux. Conçu pour des équipes intergénérationnelles avec maîtrise variable du numérique." },
]

const challenges = [
  "Vos agents ne veulent pas installer une énième application sur leur téléphone perso",
  "Le téléphone de votre agent est saturé, l'app refuse de s'installer",
  "Vous perdez 3 heures à former chaque nouvel agent à l'application native",
  "Les mises à jour de l'app cassent la fonctionnalité pour la moitié de votre équipe",
  "Quand un agent quitte la société, son ancien compte reste actif des semaines",
  "L'app native ne fonctionne plus en sous-sol ou en parking 4G dégradée",
]

const faq = [
  { q: "Quelle application mobile pour les agents de nettoyage ?", a: "Proprely propose une app Android gratuite sur le Play Store (iOS bientôt), plus un accès web. Planning, pointage, preuve de passage (QR + photos + signature), absences / incidents, compteur d'heures. L'app est optionnelle." },
  { q: "L'application mobile Proprely est-elle gratuite ?", a: "Oui. App gratuite · accès agent inclus dans la bêta / l'offre. Pas de facturation par agent." },
  { q: "Faut-il installer l'application ?", a: "Non, ce n'est pas obligatoire. App Android recommandée pour le confort terrain ; le lien web fonctionne aussi. iOS en approche." },
  { q: "Pourquoi proposer une app et le web ?", a: "Certains agents préfèrent une app native ; d'autres refusent d'installer une app pro. Proprely laisse le choix, sans surcoût par tête." },
  { q: "Fonctionne-t-elle hors connexion ?", a: "Mode dégradé / cache selon canal (app vs navigateur). Ne pas attendre un offline total sans validation produit." },
  { q: "Que se passe-t-il si un agent perd son téléphone ?", a: "Révocation de l'accès depuis le cockpit en quelques secondes." },
]

function injectSchema() {
  const id = 'mobile-schema'
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
          { '@type': 'ListItem', position: 2, name: 'Application mobile agents nettoyage', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Proprely — application agent terrain',
      description: "App Android gratuite (optionnelle) pour agents de nettoyage : planning, pointage, preuve de passage. iOS bientôt · web OK · aucun coût par agent.",
      url: URL,
      operatingSystem: 'Android',
      applicationCategory: 'BusinessApplication',
      downloadUrl: PLAY_STORE_URL,
      installUrl: PLAY_STORE_URL,
      publisher: { '@id': 'https://proprely.fr/#organization' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        description: 'App gratuite · accès agent inclus · pas de facturation par agent. Web disponible ; iOS bientôt.',
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

export default function MobileAgentLanding() {
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
      document.getElementById('mobile-schema')?.remove()
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
              <Breadcrumbs items={[{ name: 'Application mobile agents nettoyage' }]} />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Smartphone size={12} />
              Android · Play Store · iOS bientôt · Web OK
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Application mobile pour vos agents de nettoyage —{" "}
              <span className="text-blue-600">app ou web, au choix</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Proprely équipe vos agents sur le terrain avec une app Android gratuite (déjà sur le Play Store), une version iOS bientôt, et un accès web qui reste disponible. L'app est un plus : personne n'est forcé de l'installer. Et vous ne payez pas par agent.
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
                onClick={() => trackEvent('beta_cta_click', { location: 'mobile_hero' })}
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('play_store_click', { location: 'mobile_hero' })}
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Télécharger sur Google Play
                <ExternalLink size={14} />
              </a>
            </motion.div>
            <p className="text-xs text-slate-500 mt-4">iOS bientôt · ou continuer sur le web · 0 € / agent</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              L'app pro sur téléphone perso : la douleur reste réelle
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Beaucoup d'agents refusent encore d'installer une énième app métier. Chez Proprely, l'app est optionnelle et gratuite ; le web suffit si l'équipe refuse l'install.
            </p>
            <ul className="space-y-3">
              {challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-xl p-4">
                  <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles size={12} />
                Notre approche
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                App Android gratuite, web OK, aucun coût par agent
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Les agents travaillent sur mobile : app Android gratuite (iOS bientôt) ou lien web — au choix. L'app est optionnelle. Aucun coût par agent.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-gradient-to-b from-blue-50/40 to-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce que vos agents peuvent faire depuis leur téléphone
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                6 actions essentielles, dans l'app Android ou via le lien web — sans formation longue.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
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
              Guides et fonctionnalités mobile
            </h2>
            <ul className="space-y-3 text-slate-700">
              <li>📅 <Link to="/fonctionnalites/planning-nettoyage" className="text-blue-700 font-semibold hover:underline">Logiciel de planning agents nettoyage (cockpit dirigeant)</Link></li>
              <li>📸 <Link to="/fonctionnalites/preuve-passage-nettoyage" className="text-blue-700 font-semibold hover:underline">Preuve de passage mobile : QR + photos + signature</Link></li>
              <li>👥 <Link to="/fonctionnalites/gestion-agents-nettoyage" className="text-blue-700 font-semibold hover:underline">Gestion agents : profils, spécialités, alertes</Link></li>
              <li>📊 <Link to="/blog/calcul-heures-agents-nettoyage" className="text-blue-700 font-semibold hover:underline">Calcul des heures agents : méthode et coût 2026</Link></li>
              <li>📖 <Link to="/blog/comparatif-logiciels-nettoyage-2026" className="text-blue-700 font-semibold hover:underline">Comparatif logiciels métier nettoyage 2026</Link></li>
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
              Application mobile agents nettoyage : ce qu'on nous demande
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
              Équipez vos agents en 30 minutes — app optionnelle
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min : chaque agent reçoit son accès (app Android ou lien web) à la fin de l'appel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'mobile_footer' })}
                className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('play_store_click', { location: 'mobile_footer' })}
                className="bg-white/10 border border-white/20 text-white rounded-xl px-6 py-4 font-semibold text-sm hover:bg-white/15 transition-colors inline-flex items-center justify-center gap-2"
              >
                Télécharger sur Google Play
                <ExternalLink size={14} />
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">Gratuit · Sans carte bancaire · iOS bientôt · 0 € / agent</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
