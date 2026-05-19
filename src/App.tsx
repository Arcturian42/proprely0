import { lazy, Suspense, useEffect } from 'react'
import Landing from './pages/Landing'
import { useRoute } from './lib/useRoute'
import ScrollProgress from './components/ScrollProgress'

const RoiCalculator = lazy(() => import('./pages/RoiCalculator'))
const BlogIndex = lazy(() => import('./pages/BlogIndex'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const FeaturePage = lazy(() => import('./pages/FeaturePage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const NotFound = lazy(() => import('./pages/NotFound'))

type RouteMeta = { title: string; description: string; robots?: string }

const META: Record<string, RouteMeta> = {
  '/': {
    title: 'Proprely : Le cockpit métier des sociétés de nettoyage',
    description: "Vos clients, sites, agents, plannings et devis dans un seul outil — pensé avec des dirigeants du nettoyage, pour des dirigeants du nettoyage. Bêta privée gratuite : 30 places fondateurs.",
  },
  '/calculateur-roi': {
    title: 'Calculateur ROI : Combien vous coûte la dispersion ? · Proprely',
    description: "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word pour gérer votre société de nettoyage.",
  },
  '/blog': {
    title: 'Blog · Gestion, terrain et propreté B2B · Proprely',
    description: "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage. Productivité, RGPD, outils.",
  },
  '/beta/merci': {
    title: 'Candidature enregistrée · Proprely',
    description: "Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.",
    robots: 'noindex,follow',
  },
  '/tarifs': {
    title: 'Tarifs : Gratuit pendant la bêta, tarif fondateur à vie · Proprely',
    description: "Proprely est gratuit pendant la bêta privée. 30 sociétés fondatrices gardent un tarif privilégié à vie après le lancement. Sans CB, sans engagement, sans lock-in.",
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
  }, [route])

  let content
  if (route === '/') content = <Landing />
  else if (route === '/calculateur-roi') content = <RoiCalculator />
  else if (route === '/tarifs') content = <Pricing />
  else if (route === '/blog') content = <BlogIndex />
  else if (route.startsWith('/blog/')) content = <BlogPost slug={route.slice(6).replace(/\/$/, '')} />
  else if (route === '/beta/merci' || route === '/beta/merci/') content = <ThankYou />
  else if (route.startsWith('/fonctionnalites/')) content = <FeaturePage slug={route.slice(17).replace(/\/$/, '')} />
  else content = <NotFound />

  if (route === '/') {
    return (
      <div className="w-full bg-white">
        <ScrollProgress />
        {content}
      </div>
    )
  }

  return (
    <div className="w-full bg-white">
      <ScrollProgress />
      <Suspense fallback={<PageLoading />}>{content}</Suspense>
    </div>
  )
}

export default App
