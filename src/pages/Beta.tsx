import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Flame, Shield, Sparkles, Calendar, CheckCircle } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import FounderOffer from '../sections/FounderOffer'
import ProductStatus from '../sections/ProductStatus'
import Credibilite from '../sections/Credibilite'
import FounderForm from '../sections/FounderForm'
import FAQ from '../sections/FAQ'
import { FOUNDER_SPOTS, remainingSpots } from '../config'
import { navigate } from '../lib/useRoute'

const META = {
  title: 'Bêta privée Proprely : devenez membre fondateur · 30 places',
  description:
    "Rejoignez les 30 sociétés de nettoyage fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur conservé à vie, onboarding 30 min avec le fondateur.",
  url: 'https://proprely.fr/beta',
}

function injectSchema() {
  const id = 'beta-schema'
  document.getElementById(id)?.remove()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: META.title,
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Bêta privée', item: META.url },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Programme membres fondateurs Proprely',
      description: "Accès gratuit pendant toute la bêta privée. Tarif fondateur conservé à vie. Limité à 30 sociétés.",
      availability: 'https://schema.org/LimitedAvailability',
      price: '0',
      priceCurrency: 'EUR',
      eligibleQuantity: { '@type': 'QuantitativeValue', value: FOUNDER_SPOTS.total },
      seller: { '@id': 'https://proprely.fr/#organization' },
    },
  ]

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function Beta() {
  const remaining = remainingSpots()

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
      document.getElementById('beta-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-0 left-0 w-[35rem] h-[35rem] rounded-full bg-blue-300/30 blur-3xl animate-blob-1 pointer-events-none" />
          <div className="absolute top-[20%] right-0 w-[30rem] h-[30rem] rounded-full bg-sky-300/30 blur-3xl animate-blob-2 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors mb-6"
            >
              <ArrowLeft size={12} />
              Retour à l'accueil
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-blue-200/80 text-blue-700 rounded-full px-4 py-1.5 text-xs font-semibold mb-6 shadow-sm"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-60 animate-ping-3x" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-blue-600" />
              </span>
              <span className="uppercase tracking-wider text-[10px]">Bêta privée · Programme fondateurs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-5"
            >
              Devenez l'une des <span className="text-blue-600">{FOUNDER_SPOTS.total} sociétés fondatrices</span> de Proprely
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-7"
            >
              Accès gratuit à toute la plateforme pendant la bêta. Onboarding 30 minutes avec le fondateur. Tarif fondateur conservé à vie quand on passe au prix public.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 text-amber-900 rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold mb-6"
            >
              <Flame size={14} className="text-amber-600" />
              <span>{remaining} places restantes sur {FOUNDER_SPOTS.total}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-3"
            >
              <button
                onClick={() => document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative bg-blue-600 text-white rounded-xl px-8 py-4 font-bold text-base hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
                <span className="relative">Candidater maintenant</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xs sm:text-sm text-slate-500"
            >
              Gratuit pendant la bêta · Sans carte bancaire · Réponse sous 24h
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid sm:grid-cols-3 gap-3 max-w-3xl mx-auto"
            >
              {[
                { icon: Calendar, label: "Mise en route en 30 minutes" },
                { icon: Sparkles, label: "Influence sur la feuille de route" },
                { icon: Shield, label: "Hébergement européen RGPD" },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-white border border-slate-100 rounded-xl px-4 py-3 text-left shadow-sm">
                  <b.icon size={16} className="text-blue-600 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <FounderOffer />

        <ProductStatus />

        <Credibilite />

        <section className="bg-slate-50 py-16 sm:py-20 border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Profil recherché</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Pour qui est la bêta privée
              </h2>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Pour rendre la bêta utile, nous sélectionnons des entreprises qui partagent les mêmes réalités.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                "Société de nettoyage B2B en France (bureaux, syndics, hôtels, cabinets médicaux, restaurants)",
                "Entre 3 et 50 agents",
                "Au moins 5 sites clients",
                "Vous utilisez aujourd'hui Excel, WhatsApp, Word ou papier pour piloter",
                "Vous êtes dirigeant ou responsable d'exploitation",
                "Vous êtes prêt à nous remonter des retours pendant 4 à 8 semaines",
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-slate-100"
                >
                  <CheckCircle size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-700 leading-snug">{b}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FounderForm />

        <FAQ />

        <Footer />
      </main>
    </div>
  )
}
