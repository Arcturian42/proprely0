import { lazy, Suspense, useEffect } from 'react'
import Landing from './pages/Landing'
import { useRoute } from './lib/useRoute'
import ScrollProgress from './components/ScrollProgress'
import CookieBanner from './components/CookieBanner'
import { initAnalytics, trackPageView } from './lib/analytics'

const RoiCalculator = lazy(() => import('./pages/RoiCalculator'))
const BlogIndex = lazy(() => import('./pages/BlogIndex'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const FeaturePage = lazy(() => import('./pages/FeaturePage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const NotFound = lazy(() => import('./pages/NotFound'))
const CityPage = lazy(() => import('./pages/CityPage'))
const Legal = lazy(() => import('./pages/Legal'))
const Contact = lazy(() => import('./pages/Contact'))
const FeatureIndex = lazy(() => import('./pages/FeatureIndex'))
const CityIndex = lazy(() => import('./pages/CityIndex'))
const Beta = lazy(() => import('./pages/Beta'))
const Resources = lazy(() => import('./pages/Resources'))
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'))
const ProprelyVsExcel = lazy(() => import('./pages/ProprelyVsExcel'))
const SimulateurRentabilite = lazy(() => import('./pages/SimulateurRentabilite'))
const SoftwareLanding = lazy(() => import('./pages/SoftwareLanding'))
const ComparatifLogiciels = lazy(() => import('./pages/ComparatifLogiciels'))
const AutoEntrepreneurLanding = lazy(() => import('./pages/AutoEntrepreneurLanding'))
const CRMPage = lazy(() => import('./pages/CRMPage'))
const ConventionCollectiveLanding = lazy(() => import('./pages/ConventionCollectiveLanding'))
const MedicalBionetLanding = lazy(() => import('./pages/MedicalBionetLanding'))
const CoproSyndicLanding = lazy(() => import('./pages/CoproSyndicLanding'))
const MobileAgentLanding = lazy(() => import('./pages/MobileAgentLanding'))
const ComparisonPage = lazy(() => import('./pages/ComparisonPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ToolsIndex = lazy(() => import('./pages/ToolsIndex'))
const PriceCalculator = lazy(() => import('./pages/PriceCalculator'))

type RouteMeta = { title: string; description: string; robots?: string }

const META: Record<string, RouteMeta> = {
  '/': {
    title: 'Logiciel société de nettoyage : planning, devis, clients · Proprely',
    description: "Logiciel de gestion pour société de nettoyage B2B : clients, agents, planning, devis, preuve de passage. Bêta privée gratuite.",
  },
  '/calculateur-roi': {
    title: 'Calculateur ROI société de nettoyage · Proprely',
    description: "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à gérer votre société de nettoyage sur Excel, WhatsApp et Word.",
  },
  '/blog': {
    title: 'Blog : gestion société de nettoyage · Proprely',
    description: "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage : productivité, prix, RGPD, outils.",
  },
  '/beta/merci': {
    title: 'Candidature enregistrée · Proprely',
    description: "Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.",
    robots: 'noindex,follow',
  },
  '/tarifs': {
    title: 'Tarifs Proprely 2026 — Gratuit pendant la bêta · Proprely',
    description: "Proprely est gratuit pendant toute la durée de la bêta privée. Découvrez la politique tarifaire, les engagements membres fondateurs et ce que coûte vraiment la gestion sans logiciel.",
  },
  '/contact': {
    title: 'Contact · Proprely',
    description: "Contactez Proprely : logiciel de gestion pour sociétés de nettoyage B2B. Email contact@proprely.fr, réponse sous 24h ouvrées.",
  },
  '/mentions-legales': {
    title: 'Mentions légales · Proprely',
    description: "Mentions légales de Proprely : éditeur Pershing Global Solutions LTD, hébergeur Hostinger, propriété intellectuelle, contact.",
    robots: 'noindex,follow',
  },
  '/confidentialite': {
    title: 'Politique de confidentialité · Proprely',
    description: "Politique de confidentialité Proprely : données collectées, finalités, base légale, durée de conservation, droits RGPD.",
    robots: 'noindex,follow',
  },
  '/cgu': {
    title: "Conditions générales d'utilisation · Proprely",
    description: "CGU Proprely : accès au service, engagements éditeur et membre, propriété des données, résiliation, évolutions.",
    robots: 'noindex,follow',
  },
  '/fonctionnalites': {
    title: 'Fonctionnalités logiciel nettoyage · Proprely',
    description: "Toutes les fonctionnalités Proprely : planning agents, devis, gestion agents, preuve de passage. Logiciel propreté B2B. Bêta gratuite.",
  },
  '/villes': {
    title: 'Logiciel nettoyage par ville · Proprely',
    description: "Logiciel de gestion pour société de nettoyage par ville : Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes. Conçu pour la propreté B2B française.",
  },
  '/beta': {
    title: 'Bêta privée Proprely : devenez membre fondateur · 30 places',
    description: "Rejoignez les 30 sociétés de nettoyage fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur conservé à vie, onboarding 30 min.",
  },
  '/ressources': {
    title: 'Ressources gratuites pour société de nettoyage · Proprely',
    description: "Modèles de devis, planning et suivi des heures pour société de nettoyage : téléchargez gratuitement nos templates Excel et notre calculateur ROI.",
  },
  '/proprely-vs-excel': {
    title: 'Proprely vs Excel : le comparatif honnête · Proprely',
    description: "Excel coûte 6 à 10h par semaine et finit par bloquer la croissance. Comparatif détaillé Proprely vs Excel : marge, traçabilité, mobile, conformité.",
  },
  '/simulateur-rentabilite': {
    title: 'Simulateur rentabilité contrat nettoyage · Proprely',
    description: "Calculez en 1 minute la marge brute d'un contrat de nettoyage : prix horaire vs coût horaire chargé, verdict instantané, recommandations.",
  },
  '/logiciel-societe-nettoyage': {
    title: 'Logiciel société de nettoyage B2B : guide complet 2026 · Proprely',
    description: "Logiciel de gestion pour société de nettoyage B2B : planning, devis, preuve de passage, CRM, rentabilité. Bêta gratuite — 14 places.",
  },
  '/comparatif-logiciel-nettoyage': {
    title: 'Comparatif logiciels société de nettoyage 2026 : lequel choisir ? · Proprely',
    description: "Comparatif complet des logiciels pour société de nettoyage en 2026 : Proprely, Organilog, Progiclean, PROPRET, Synchroteam. Fonctionnalités, prix, mobile, support FR — lequel choisir.",
  },
  '/logiciel-auto-entrepreneur-nettoyage': {
    title: 'Logiciel auto-entrepreneur nettoyage : gérer seul sans se perdre · Proprely',
    description: "Logiciel pour auto-entrepreneur en nettoyage : devis, clients, planning, facturation, suivi heures. Pour solo et indépendants.",
  },
  '/crm-entreprise-proprete': {
    title: 'CRM entreprise propreté : suivez clients et prospects · Proprely',
    description: "CRM pensé pour les entreprises de propreté : pipeline commercial, suivi clients et sites, relances devis, marge par compte. Conçu pour la propreté B2B française.",
  },
  '/a-propos': {
    title: 'À propos de Proprely : notre mission et notre équipe · Proprely',
    description: "Proprely est édité par Pershing Global Solutions LTD. Notre mission : libérer les dirigeants de sociétés de nettoyage B2B de la dispersion.",
  },
  '/outils': {
    title: 'Outils gratuits pour société de nettoyage · Proprely',
    description: "Calculateurs et simulateurs gratuits : prix au m², coût horaire chargé, marge de contrat, ROI dispersion. Pour dirigeants de sociétés de nettoyage B2B en France.",
  },
  '/calculateur-prix-nettoyage-m2': {
    title: 'Calculateur prix nettoyage bureaux au m² · Proprely',
    description: "Calculez le prix de nettoyage de bureaux au m² : surface, fréquence, zone géographique, type de local. Estimation honnête sans inscription.",
  },
  '/convention-collective-nettoyage': {
    title: 'Logiciel conforme convention collective propreté IDCC 3043 · Proprely',
    description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes. Bêta gratuite.",
  },
  '/logiciel-nettoyage-medical-bionettoyage': {
    title: 'Logiciel nettoyage médical et bionettoyage : traçabilité IDCC 3043 · Proprely',
    description: "Logiciel pour société de bionettoyage médical : protocoles, traçabilité produits CMR, PV automatique. Conforme convention collective IDCC 3043. Bêta gratuite.",
  },
  '/logiciel-nettoyage-copropriete-syndic': {
    title: 'Logiciel nettoyage copropriété et syndic : PV automatique · Proprely',
    description: "Logiciel pour société de nettoyage qui travaille avec des syndics de copropriété : preuve de passage QR, PV automatique au syndic, reporting standardisé. Bêta gratuite.",
  },
  '/application-mobile-agents-nettoyage': {
    title: "Application mobile agents nettoyage : sans app à installer · Proprely",
    description: "Application mobile pour agents de société de nettoyage : planning, pointage, preuve de passage. Aucune app à installer — simple lien web sur le téléphone. Bêta gratuite.",
  },
}


function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setRobots(value: string | undefined) {
  const existing = document.querySelector('meta[name="robots"]')
  if (value) {
    if (existing) existing.setAttribute('content', value)
    else {
      const el = document.createElement('meta')
      el.setAttribute('name', 'robots')
      el.setAttribute('content', value)
      document.head.appendChild(el)
    }
  } else if (existing) {
    existing.remove()
  }
}

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  )
}

function App() {
  const route = useRoute()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    const meta = META[route]
    if (meta) {
      // URL canonique AVEC slash final (cohérent avec le serveur et le sitemap).
      const url = `https://proprely.fr${route}${route === '/' ? '' : '/'}`
      document.title = meta.title
      setMeta('description', meta.description)
      setMeta('og:title', meta.title)
      setMeta('og:description', meta.description)
      setMeta('og:url', url)
      setMeta('twitter:title', meta.title)
      setMeta('twitter:description', meta.description)
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
      setRobots(meta.robots)
    } else {
      setRobots(undefined)
    }
    trackPageView(route)
  }, [route])

  // Dé-doublonnage du JSON-LD. Chaque page prérendue embarque un bloc
  // <script type="application/ld+json"> SANS id ; la plupart des pages
  // réinjectent leur schéma (AVEC id) au montage. Sans ça, Googlebot voit DEUX
  // FAQPage/WebPage au rendu JS → "invalid items detected" dans la Search Console.
  // On retire donc le bloc prérendu (sans id) dès qu'un bloc injecté (avec id)
  // apparaît. Le @graph global de la home est explicitement préservé.
  useEffect(() => {
    if (route === '/') return
    const dedupe = () => {
      const injected = document.querySelector('script[type="application/ld+json"][id]')
      if (!injected) return
      document
        .querySelectorAll('script[type="application/ld+json"]:not([id])')
        .forEach((el) => {
          if (el.textContent?.includes('"@graph"')) return
          el.remove()
        })
    }
    dedupe()
    const observer = new MutationObserver(dedupe)
    observer.observe(document.head, { childList: true })
    return () => observer.disconnect()
  }, [route])

  let content
  if (route === '/') content = <Landing />
  else if (route === '/calculateur-roi') content = <RoiCalculator />
  else if (route === '/tarifs') content = <Pricing />
  else if (route === '/blog') content = <BlogIndex />
  else if (route === '/contact') content = <Contact />
  else if (route === '/mentions-legales') content = <Legal kind="mentions" />
  else if (route === '/confidentialite') content = <Legal kind="privacy" />
  else if (route === '/cgu') content = <Legal kind="cgu" />
  else if (route === '/fonctionnalites' || route === '/fonctionnalites/') content = <FeatureIndex />
  else if (route === '/villes' || route === '/villes/') content = <CityIndex />
  else if (route === '/ressources' || route === '/ressources/') content = <Resources />
  else if (route === '/proprely-vs-excel') content = <ProprelyVsExcel />
  else if (route === '/simulateur-rentabilite') content = <SimulateurRentabilite />
  else if (route === '/logiciel-societe-nettoyage') content = <SoftwareLanding />
  else if (route === '/comparatif-logiciel-nettoyage') content = <ComparatifLogiciels />
  else if (route === '/logiciel-auto-entrepreneur-nettoyage') content = <AutoEntrepreneurLanding />
  else if (route === '/crm-entreprise-proprete') content = <CRMPage />
  else if (route === '/convention-collective-nettoyage' || route === '/convention-collective-nettoyage/') content = <ConventionCollectiveLanding />
  else if (route === '/logiciel-nettoyage-medical-bionettoyage' || route === '/logiciel-nettoyage-medical-bionettoyage/') content = <MedicalBionetLanding />
  else if (route === '/logiciel-nettoyage-copropriete-syndic' || route === '/logiciel-nettoyage-copropriete-syndic/') content = <CoproSyndicLanding />
  else if (route === '/application-mobile-agents-nettoyage' || route === '/application-mobile-agents-nettoyage/') content = <MobileAgentLanding />
  else if (route === '/a-propos' || route === '/a-propos/') content = <AboutPage />
  else if (route === '/outils' || route === '/outils/') content = <ToolsIndex />
  else if (route === '/calculateur-prix-nettoyage-m2' || route === '/calculateur-prix-nettoyage-m2/') content = <PriceCalculator />
  else if (route.startsWith('/comparatif/')) content = <ComparisonPage slug={route.slice(12).replace(/\/$/, '')} />
  else if (route.startsWith('/blog/')) content = <BlogPost slug={route.slice(6).replace(/\/$/, '')} />
  else if (route === '/beta/merci' || route === '/beta/merci/') content = <ThankYou />
  else if (route === '/beta' || route === '/beta/') content = <Beta />
  else if (route.startsWith('/fonctionnalites/')) content = <FeaturePage slug={route.slice(17).replace(/\/$/, '')} />
  else if (route.startsWith('/villes/')) content = <CityPage slug={route.slice(8).replace(/\/$/, '')} />
  else if (route.startsWith('/ressources/')) content = <ResourceDetail slug={route.slice(12).replace(/\/$/, '')} />
  else content = <NotFound />

  if (route === '/') {
    return (
      <div className="w-full bg-white">
        <ScrollProgress />
        {content}
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="w-full bg-white">
      <ScrollProgress />
      <Suspense fallback={<PageLoading />}>{content}</Suspense>
      <CookieBanner />
    </div>
  )
}

export default App
