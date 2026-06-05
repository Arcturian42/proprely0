import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Smartphone, Zap, ShieldCheck, QrCode, HelpCircle, Sparkles, BookOpen, X } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const URL = 'https://proprely.fr/application-mobile-agents-nettoyage/'
const TITLE = "Application mobile agents nettoyage : sans app · Proprely"
const DESCRIPTION = "Application mobile pour agents de nettoyage : planning, pointage, preuve de passage via lien web — aucune app à installer. Bêta gratuite."

const benefits = [
  { icon: Zap, title: "Zéro installation, zéro mise à jour", desc: "L'agent ouvre un lien web depuis son téléphone, c'est tout. Pas d'application à télécharger sur Play Store ou App Store, pas de compte créer, pas de mises à jour à pousser. La version est toujours la dernière, sans intervention." },
  { icon: Smartphone, title: "Fonctionne sur tout téléphone récent", desc: "Android 8+ et iPhone iOS 13+, smartphone d'entrée de gamme ou haut de gamme : tant qu'il a un navigateur, ça fonctionne. Pas de blocage Android/iOS, pas de problème de stockage saturé." },
  { icon: ShieldCheck, title: "Sécurisé même si le téléphone est perdu", desc: "Le lien est nominatif et révocable depuis le cockpit dirigeant. Si un agent quitte la société ou perd son téléphone, son accès est coupé en 5 secondes. Aucune donnée client stockée localement sur le téléphone." },
  { icon: QrCode, title: "Connexion réseau dégradée gérée", desc: "L'agent peut consulter son planning en mode dégradé (cache navigateur) et valider sa mission. Les photos de preuve de passage sont stockées localement le temps de retrouver de la 4G correcte, puis envoyées en arrière-plan." },
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
  { q: "Quelle application mobile pour les agents de nettoyage ?", a: "Proprely propose une application mobile pour agents de nettoyage qui ne nécessite aucune installation : chaque agent reçoit un lien web personnel qu'il ouvre dans le navigateur de son téléphone. Il accède immédiatement à son planning de la semaine, peut pointer son arrivée et son départ, déclencher la preuve de passage (QR + photos avant-après + signature client), signaler une absence ou un incident, et consulter son compteur d'heures en temps réel. Compatible Android 8+ et iOS 13+, fonctionne en 4G dégradée." },
  { q: "L'application mobile Proprely est-elle gratuite ?", a: "Oui. L'accès agent est inclus dans tous les abonnements Proprely (et donc gratuit pendant la bêta privée pour les 30 sociétés fondatrices). Vous payez par site ou par utilisateur dirigeant — pas par agent. Vous pouvez ajouter autant d'agents que nécessaire sans surcoût." },
  { q: "Pourquoi pas d'application native à installer ?", a: "Trois raisons : (1) les agents de nettoyage refusent souvent d'installer une app pro sur leur téléphone perso, (2) les apps natives saturent le stockage des téléphones d'entrée de gamme, (3) chaque mise à jour casse l'app pour une partie des utilisateurs (problème compatibilité Android/iOS). Le lien web supprime ces trois frictions. Les meilleures solutions 2026 vont toutes vers le web mobile responsive plutôt que vers les apps natives métier." },
  { q: "L'application fonctionne-t-elle hors connexion ?", a: "Mode dégradé oui, hors ligne complet non. L'agent peut consulter son planning en cache navigateur, pointer ses heures et prendre les photos de preuve de passage même en 4G capricieuse — les données sont stockées temporairement dans le navigateur puis envoyées en arrière-plan dès qu'une connexion correcte est retrouvée. Pour une utilisation 100 % hors ligne (zones blanches complètes), une app native dédiée serait nécessaire." },
  { q: "Que se passe-t-il si un agent perd son téléphone ?", a: "Vous coupez son accès en 5 secondes depuis le cockpit dirigeant : son lien personnel devient inactif et plus aucune donnée client n'est accessible depuis son téléphone. Aucune donnée client sensible (planning, photos, signatures) n'est stockée localement sur le téléphone de manière persistante — le cache est nettoyé automatiquement après 7 jours d'inactivité." },
  { q: "Mes agents qui ne sont pas à l'aise avec le numérique vont-ils s'en sortir ?", a: "Oui. L'interface utilise un vocabulaire métier accessible, des icônes claires et une seule action principale par écran. Le retour terrain de la bêta indique que les agents non-natifs du numérique (40-60 ans, équipes intergénérationnelles) prennent la main en 5 à 10 minutes. L'absence d'installation supprime la première barrière. Si nécessaire, le dirigeant peut faire la première intervention avec l'agent." },
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
      description: DESCRIPTION,
      url: URL,
      operatingSystem: 'Web (Android 8+, iOS 13+, navigateur récent)',
      applicationCategory: 'BusinessApplication',
      publisher: { '@id': 'https://proprely.fr/#organization' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        description: 'Accès agent inclus dans tous les abonnements Proprely, gratuit pendant la bêta privée.',
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
              Mobile-first sans app
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Application mobile pour agents de nettoyage :<br />
              <span className="text-blue-600">aucune app à installer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Pour équiper vos agents de nettoyage en mobile, Proprely fournit un simple lien web personnel : planning, pointage, preuve de passage, signalement d'absence et compteur d'heures dans le navigateur du téléphone. Aucune application à installer, aucune mise à jour à pousser, aucune formation longue.
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
              <Link
                to="/fonctionnalites/planning-nettoyage"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Voir le planning desktop
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Pourquoi les apps natives échouent sur le terrain nettoyage
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Vous avez peut-être déjà essayé une application mobile native pour vos agents. Si c'est le cas, vous avez probablement rencontré ces frictions :
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
                Un lien web personnel = une application mobile
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Chaque agent ouvre son lien, et c'est tout. Les 4 bénéfices structurants :
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
                6 actions essentielles, accessibles depuis le lien web personnel — sans formation longue.
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
              Équipez vos agents en 30 minutes — sans installer d'app
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              30 sociétés fondatrices, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min : chaque agent reçoit son lien personnel à la fin de l'appel.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'mobile_footer' })}
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
