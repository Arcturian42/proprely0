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

type RouteMeta = { title: string; description: string; robots?: string }

const META: Record<string, RouteMeta> = {
  '/': {
    title: 'Logiciel société de nettoyage : le cockpit métier · Proprely',
    description: "Logiciel de gestion pour société de nettoyage B2B : clients, agents, planning, devis, preuve de passage dans un seul outil. Bêta privée gratuite.",
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
    title: 'Tarifs : gratuit pendant la bêta, fondateur à vie · Proprely',
    description: "Proprely est gratuit pendant la bêta privée. 30 sociétés fondatrices gardent un tarif privilégié à vie. Sans CB, sans engagement.",
  },
  '/contact': {
    title: 'Contact · Proprely',
    description: "Contactez Proprely : logiciel de gestion pour sociétés de nettoyage B2B. Email contact@proprely.fr, réponse sous 24h ouvrées.",
  },
  '/mentions-legales': {
    title: 'Mentions légales · Proprely',
    description: "Mentions légales de Proprely : éditeur Pershing Global Solutions LTD, hébergeur Hostinger, propriété intellectuelle, contact.",
  },
  '/confidentialite': {
    title: 'Politique de confidentialité · Proprely',
    description: "Politique de confidentialité Proprely : données collectées, finalités, base légale, durée de conservation, droits RGPD.",
  },
  '/cgu': {
    title: "Conditions générales d'utilisation · Proprely",
    description: "CGU Proprely : accès au service, engagements éditeur et membre, propriété des données, résiliation, évolutions.",
  },
  '/fonctionnalites': {
    title: 'Fonctionnalités logiciel nettoyage · Proprely',
    description: "Toutes les fonctionnalités Proprely pour piloter une société de nettoyage : planning agents, devis, gestion agents, preuve de passage. Conçu pour la propreté B2B.",
  },
  '/villes': {
    title: 'Logiciel nettoyage par ville · Proprely',
    description: "Logiciel de gestion pour société de nettoyage par ville : Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes. Conçu pour la propreté B2B française.",
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
      const url = `https://proprely.fr${route}`
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
  else if (route.startsWith('/blog/')) content = <BlogPost slug={route.slice(6).replace(/\/$/, '')} />
  else if (route === '/beta/merci' || route === '/beta/merci/') content = <ThankYou />
  else if (route.startsWith('/fonctionnalites/')) content = <FeaturePage slug={route.slice(17).replace(/\/$/, '')} />
  else if (route.startsWith('/villes/')) content = <CityPage slug={route.slice(8).replace(/\/$/, '')} />
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
