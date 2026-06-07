import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Building2, Hotel, Stethoscope, Home as HomeIcon, Users, Calendar, FileText, QrCode, Smartphone, MapPin, FileSignature, Clock } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const URL = 'https://proprely.fr/solution/'
const TITLE = 'Solution gestion société de nettoyage B2B 2026 · Proprely'
const DESCRIPTION = "La solution complète pour gérer une société de nettoyage B2B en 2026 : par type de société, par fonctionnalité, par cas d'usage. Découvrez toutes les options."

// Hub navigationnel — NE cible PAS le mot-clé "logiciel société de nettoyage"
// (pilier /logiciel-societe-nettoyage/) mais "solution gestion société nettoyage B2B"
// pour éviter toute cannibalisation. Cluster d'entrée vers les différentes
// landing pages selon le besoin utilisateur.

const bySector = [
  { icon: Building2, to: '/logiciel-societe-nettoyage', label: 'Logiciel société de nettoyage', desc: 'Le guide complet 2026 pour TPE/PME B2B 3-50 agents.' },
  { icon: HomeIcon, to: '/logiciel-auto-entrepreneur-nettoyage', label: 'Solution auto-entrepreneur', desc: 'Démarrer seul en propreté sans Excel ni WhatsApp.' },
  { icon: Stethoscope, to: '/logiciel-nettoyage-medical-bionettoyage', label: 'Solution secteur médical', desc: 'Bionettoyage, protocoles HACCP, traçabilité agents.' },
  { icon: Hotel, to: '/logiciel-nettoyage-copropriete-syndic', label: 'Solution copropriété & syndic', desc: 'Multi-immeubles, PV automatique, fil syndic standardisé.' },
]

const byNeed = [
  { icon: Calendar, to: '/fonctionnalites/planning-nettoyage', label: 'Planning agents', desc: 'Drag-and-drop avec affectation 1-clic selon spécialités.' },
  { icon: FileText, to: '/fonctionnalites/devis-nettoyage', label: 'Devis intelligent IA', desc: 'Algorithme propriétaire : 9 facteurs, 3 scénarios optimisés.' },
  { icon: Users, to: '/fonctionnalites/gestion-agents-nettoyage', label: 'Gestion des agents', desc: 'Profils, spécialités, alertes surmenage, compteur d\'heures.' },
  { icon: QrCode, to: '/fonctionnalites/preuve-passage-nettoyage', label: 'Preuve de passage', desc: 'QR code + photos avant-après + signature + PV automatique.' },
  { icon: FileSignature, to: '/fonctionnalites/facturation-nettoyage', label: 'Facturation 2026', desc: 'Factur-X conforme + récurrente automatique + relances.' },
  { icon: Clock, to: '/fonctionnalites/pointage-agents-nettoyage', label: 'Pointage GPS', desc: 'Mobile sans badgeuse + calcul majorations IDCC 3043.' },
  { icon: MapPin, to: '/fonctionnalites/suivi-interventions-nettoyage', label: 'Suivi interventions', desc: 'Statut temps réel + alertes retard + rapports automatiques.' },
  { icon: Building2, to: '/fonctionnalites/gestion-sites-clients-nettoyage', label: 'Sites & clients', desc: 'Multi-sites, protocoles, marge par client en temps réel.' },
  { icon: Smartphone, to: '/application-mobile-agents-nettoyage', label: 'App mobile agents', desc: 'Lien web mobile sans application à installer.' },
  { icon: Users, to: '/crm-entreprise-proprete', label: 'CRM propreté', desc: 'Pipeline commercial + marge par compte client.' },
]

function injectSchema() {
  const id = 'solution-hub-schema'
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
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Solution', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Solutions Proprely par segment et par besoin',
      numberOfItems: bySector.length + byNeed.length,
      itemListElement: [...bySector, ...byNeed].map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://proprely.fr${item.to}/`,
        name: item.label,
      })),
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function SolutionHub() {
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
      document.getElementById('solution-hub-schema')?.remove()
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
            <Breadcrumbs items={[{ name: 'Solution' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Tout l'écosystème Proprely
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              La solution complète pour <br className="hidden sm:block" />
              <span className="text-blue-600">gérer une société de nettoyage B2B</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Explorez l'écosystème Proprely selon votre besoin : par type de société (auto-entrepreneur, PME, secteur médical, copropriété) ou par fonctionnalité (planning, devis, agents, preuve de passage, facturation 2026). Tout part d'un cockpit unifié, gratuit pendant la bêta privée.
            </motion.p>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Par type de société</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Trouvez la solution adaptée à votre profil
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {bySector.map((s, i) => (
                <motion.div
                  key={s.to}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    to={s.to}
                    className="group flex items-start gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6 hover:border-blue-200 hover:bg-white transition-colors"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                      <s.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors mb-1.5">
                        {s.label}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                    <ArrowRight size={16} className="text-blue-600 mt-1 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Par besoin / fonctionnalité</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Sélectionnez votre besoin opérationnel
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {byNeed.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <Link
                    to={n.to}
                    className="group flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                      <n.icon size={18} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors mb-1.5">
                      {n.label}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 border-t border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-6 text-center">
              Pas sûr du choix ? Démarrez par ces options
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                to="/audit-gratuit"
                className="group flex flex-col items-start gap-2 bg-emerald-50 border border-emerald-100 rounded-xl p-5 hover:border-emerald-300 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Recommandé</span>
                <span className="font-bold text-slate-900 text-base">Audit gratuit 30 min</span>
                <span className="text-xs text-slate-600">Diagnostic offert par le fondateur Proprely</span>
              </Link>
              <Link
                to="/outils"
                className="group flex flex-col items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:bg-white transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Sans inscription</span>
                <span className="font-bold text-slate-900 text-base">4 calculateurs gratuits</span>
                <span className="text-xs text-slate-600">Prix m², ROI, rentabilité, coût horaire</span>
              </Link>
              <Link
                to="/comparatif-logiciel-nettoyage"
                className="group flex flex-col items-start gap-2 bg-slate-50 border border-slate-100 rounded-xl p-5 hover:border-blue-200 hover:bg-white transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Pour comparer</span>
                <span className="font-bold text-slate-900 text-base">Comparatif logiciels 2026</span>
                <span className="text-xs text-slate-600">6 outils notés sur 13 critères</span>
              </Link>
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
              Tout l'écosystème Proprely en bêta privée
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 sociétés fondatrices, accès gratuit à toutes les fonctionnalités pendant la bêta, tarif fondateur à vie après le lancement public. Onboarding 30 min avec le fondateur.
            </p>
            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
