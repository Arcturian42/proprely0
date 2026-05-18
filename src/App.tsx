import { useEffect } from 'react'
import Landing from './pages/Landing'
import RoiCalculator from './pages/RoiCalculator'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import ThankYou from './pages/ThankYou'
import { useRoute } from './lib/useRoute'

const META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Proprely — Le cockpit métier des sociétés de nettoyage qui scalent',
    description: "Centralisez clients, sites, agents, plannings, devis et missions dans un seul logiciel métier conçu pour les entreprises de propreté B2B. Bêta privée gratuite — 30 places fondateurs.",
  },
  '/calculateur-roi': {
    title: 'Calculateur ROI — Combien vous coûte la dispersion ? · Proprely',
    description: "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word pour gérer votre société de nettoyage.",
  },
  '/blog': {
    title: 'Blog — Gestion, terrain et propreté B2B · Proprely',
    description: "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage. Productivité, RGPD, outils.",
  },
  '/beta/merci': {
    title: 'Candidature enregistrée — Proprely',
    description: "Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.",
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

function App() {
  const route = useRoute()

  useEffect(() => {
    const meta = META[route]
    if (meta) {
      document.title = meta.title
      setMeta('description', meta.description)
      setMeta('og:title', meta.title)
      setMeta('og:description', meta.description)
      setMeta('og:url', `https://proprely.fr${route}`)
    } else if (route.startsWith('/blog/')) {
      // Title is set by BlogPost itself
    }
  }, [route])

  let content
  if (route === '/calculateur-roi') content = <RoiCalculator />
  else if (route === '/blog') content = <BlogIndex />
  else if (route.startsWith('/blog/')) content = <BlogPost slug={route.slice(6)} />
  else if (route === '/beta/merci' || route === '/beta/merci/') content = <ThankYou />
  else content = <Landing />

  return <div className="w-full bg-white">{content}</div>
}

export default App
