import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles, ExternalLink, CheckCircle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import MegaCTABanner from '../sections/MegaCTABanner'
import Footer from '../sections/Footer'
import { resources } from '../data/resources'
import Link from '../components/Link'
import NewsletterSignup from '../components/NewsletterSignup'

const META = {
  title: 'Ressources gratuites pour société de nettoyage · Proprely',
  description:
    "Modèles de devis, planning et suivi des heures pour société de nettoyage : téléchargez gratuitement nos templates Excel et notre calculateur ROI. Conçu pour les dirigeants B2B.",
  url: 'https://proprely.fr/ressources',
}

function injectSchema() {
  const id = 'resources-schema'
  document.getElementById(id)?.remove()

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Ressources gratuites pour société de nettoyage',
    description: META.description,
    url: META.url,
    inLanguage: 'fr-FR',
    isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Ressources', item: META.url },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: resources.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.title,
        url: `https://proprely.fr/ressources/${r.slug}`,
      })),
    },
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(itemList)
  document.head.appendChild(script)
}

export default function Resources() {
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
      document.getElementById('resources-schema')?.remove()
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
            <Breadcrumbs items={[{ name: 'Ressources' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Ressources gratuites
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Les outils des dirigeants de société de nettoyage
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Des modèles Excel et des outils interactifs pour structurer votre activité sans nous attendre. Téléchargement immédiat, sans inscription ni carte bancaire.
            </motion.p>
          </div>
        </section>

        <section className="bg-white pb-16 sm:pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {resources.map((r, i) => {
                const Icon = r.icon
                const isDownload = !!r.filePath
                return (
                  <motion.div
                    key={r.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                  <Link
                    to={`/ressources/${r.slug}`}
                    className="group block text-left bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Icon size={22} className="text-blue-600" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2.5 py-1">
                        {r.tag}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-tight">
                      {r.shortTitle}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {r.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-500">{r.format} · {r.fileSize}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:gap-2 transition-all">
                        {isDownload ? <Download size={14} /> : <ExternalLink size={14} />}
                        {isDownload ? 'Télécharger' : 'Ouvrir'}
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <NewsletterSignup source="resources" />
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-24 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Vous voulez aller plus loin que les modèles Excel ?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Proprely centralise tout ce que vous faites aujourd'hui dans plusieurs fichiers : clients, sites, agents, planning, missions, devis, documents, pilotage. Gratuit pendant la bêta, tarif fondateur à vie.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8 text-left">
              {[
                'Tout dans un seul écran',
                'Mise en route 30 minutes',
                'Hébergement européen RGPD',
              ].map((label) => (
                <div key={label} className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 px-4 py-3">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Rejoindre la bêta privée
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
            </Link>
            <p className="text-xs text-slate-500 mt-4">Gratuit pendant la bêta · Pas de carte bancaire · Réponse sous 24h</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Guide ressources société de nettoyage</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              Modèles, templates et guides gratuits pour société de nettoyage en 2026
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              <p>Démarrer ou structurer une société de nettoyage B2B demande des outils opérationnels prêts à l'emploi. Proprely met à disposition gratuitement des modèles Excel et des guides pratiques pour les TPE/PME nettoyage qui n'ont pas encore basculé vers un logiciel métier complet. Ces ressources couvrent les trois besoins essentiels : devis professionnel, planning hebdomadaire et suivi des heures pour la paie.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Modèle devis nettoyage professionnel (Excel)</h3>
              <p>Template Excel structuré : header avec votre logo et SIRET, table prestations avec lignes pré-formatées (quotidien, vitrerie, décapage, bionettoyage), calcul automatique sous-total + TVA 20 % (ou 10 % pour copropriétés) + total TTC, conditions de paiement et clauses légales. Adapté à un démarrage TPE 1-5 clients récurrents. Voir aussi notre <Link to="/blog/logiciel-devis-nettoyage-gratuit" className="text-blue-600 font-semibold hover:underline">comparatif des 5 meilleurs logiciels devis nettoyage gratuits 2026</Link>.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Modèle planning agents nettoyage (Excel)</h3>
              <p>Planning hebdomadaire : colonnes jours (lundi-dimanche) × lignes agents, cellules avec sites affectés et horaires, codes couleur par client, ligne récap heures par agent en bas. Idéal pour TPE 1-8 agents et 5-15 sites. Au-delà, les limites Excel deviennent bloquantes — voir notre <Link to="/blog/modele-planning-agents-nettoyage-excel" className="text-blue-600 font-semibold hover:underline">guide complet modèle planning agents Excel</Link>.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Modèle suivi des heures par agent (Excel)</h3>
              <p>Journal mensuel : 1 onglet par agent, saisie quotidienne des heures, calcul automatique des majorations (heures complémentaires temps partiel +10 %/+25 %, heures supplémentaires +25 %/+50 %, nuit, dimanche, jours fériés) selon convention collective IDCC 3043. Récapitulatif prêt pour transmission au comptable ou import paie Silae. Voir notre <Link to="/blog/calcul-heures-agents-nettoyage" className="text-blue-600 font-semibold hover:underline">méthode complète calcul des heures agents nettoyage 2026</Link>.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8">Pour aller plus loin</h3>
              <p>Approfondir : <Link to="/blog/creer-societe-nettoyage" className="text-blue-600 font-semibold hover:underline">créer une société de nettoyage en 2026 : guide en 10 étapes</Link> · <Link to="/blog/fixer-prix-nettoyage" className="text-blue-600 font-semibold hover:underline">prix nettoyage 2026 : règle des 3× + grille tarifaire</Link> · <Link to="/blog/grille-salaire-nettoyage-2026-idcc-3043" className="text-blue-600 font-semibold hover:underline">grille salaire nettoyage 2026 (IDCC 3043) : tableau complet</Link> · <Link to="/outils" className="text-blue-600 font-semibold hover:underline">4 calculateurs gratuits Proprely</Link> · <Link to="/logiciel-societe-nettoyage" className="text-blue-600 font-semibold hover:underline">logiciel société de nettoyage : guide complet 2026</Link>.</p>
            </div>
          </div>
        </section>

        <MegaCTABanner
          title="Les modèles Excel sont gratuits. Le cockpit complet aussi (pour les 30 fondateurs)."
          subtitle="Excel atteint vite ses limites passé 5-8 agents. Proprely centralise planning, devis, agents, preuve de passage et marge par client — sans installation, sans engagement. Bêta privée gratuite."
          ctaLabel="Rejoindre la bêta — 30 places"
          location="resources_mega_cta"
        />
      </main>

      <Footer />
    </div>
  )
}
