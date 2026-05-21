import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Euro, Clock, TrendingUp, Sparkles, type LucideIcon } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import NewsletterSignup from '../components/NewsletterSignup'

const META = {
  title: 'Outils gratuits pour société de nettoyage · Proprely',
  description:
    "Calculateurs et simulateurs gratuits pour piloter votre société de nettoyage : prix au m², coût horaire chargé, marge de contrat, ROI dispersion. Aucune inscription requise.",
  url: 'https://proprely.fr/outils',
}

type Tool = {
  slug: string
  icon: LucideIcon
  title: string
  description: string
  duration: string
  href: string
}

const tools: Tool[] = [
  {
    slug: 'prix-nettoyage-m2',
    icon: Euro,
    title: 'Calculateur prix de nettoyage au m²',
    description: "Estimez le prix de vente d'une prestation de nettoyage de bureaux selon surface, fréquence, zone géographique et type de local.",
    duration: '1 min',
    href: '/calculateur-prix-nettoyage-m2',
  },
  {
    slug: 'simulateur-rentabilite',
    icon: TrendingUp,
    title: 'Simulateur de rentabilité contrat',
    description: "Calculez en 1 minute la marge brute d'un contrat : prix horaire vs coût horaire chargé, verdict instantané, recommandations.",
    duration: '1 min',
    href: '/simulateur-rentabilite',
  },
  {
    slug: 'calculateur-roi',
    icon: Calculator,
    title: 'Calculateur ROI dispersion',
    description: "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word.",
    duration: '30 sec',
    href: '/calculateur-roi',
  },
  {
    slug: 'cout-horaire-chargé',
    icon: Clock,
    title: "Coût horaire chargé d'un agent (modèle Excel)",
    description: "Modèle Excel téléchargeable : salaire brut + charges (~42 %) + congés/RTT + primes panier/transport. La base de votre grille de prix.",
    duration: '5 min',
    href: '/ressources/modele-suivi-heures-agents',
  },
]

function injectSchema() {
  const id = 'tools-index-schema'
  document.getElementById(id)?.remove()
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: META.title,
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: tools.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.title,
          url: `https://proprely.fr${t.href}`,
          description: t.description,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: META.url },
      ],
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function ToolsIndex() {
  useEffect(() => {
    injectSchema()
    return () => {
      document.getElementById('tools-index-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Outils' }]} />
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
              <Sparkles size={12} />
              Outils gratuits
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Les calculateurs gratuits<br className="hidden sm:block" />
              pour piloter votre société de nettoyage
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Quatre outils utilisables tout de suite, sans inscription, pour fixer les prix, mesurer la marge et calculer le coût caché de la dispersion administrative.
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {tools.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.div
                    key={t.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                  >
                    <Link
                      to={t.href}
                      className="group block h-full bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <Icon size={20} />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {t.duration}
                        </span>
                      </div>
                      <h2 className="font-black text-slate-900 text-lg sm:text-xl mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                        {t.title}
                      </h2>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{t.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                        Utiliser l'outil
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <NewsletterSignup source="tools_index" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
