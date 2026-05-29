import { useEffect, useState } from 'react'

function getRoute() {
  if (typeof window === 'undefined') return '/'
  // Normalise le trailing slash : le serveur (Apache DirectorySlash / Vercel
  // trailingSlash) sert les pages à leur URL canonique AVEC slash final
  // (ex. /tarifs/). Sans cette normalisation, le routeur ci-dessous ne
  // reconnaît que la forme sans slash (route === '/tarifs') et rend <NotFound>
  // après le boot du JS sur /tarifs/ — ce qui faisait apparaître ces pages
  // comme des 404 dans Google Search Console alors que le HTML prérendu est
  // correct. On retire donc le(s) slash(es) final(aux), en gardant la racine.
  const path = window.location.pathname
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export function useRoute() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onChange = () => {
      const next = getRoute()
      setRoute(next)
    }
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return route
}

export function navigate(path: string, options?: { hash?: string }) {
  const target = options?.hash ? `${path}#${options.hash}` : path
  if (window.location.pathname + window.location.hash === target) {
    if (options?.hash) {
      document.getElementById(options.hash)?.scrollIntoView({ behavior: 'smooth' })
    }
    return
  }
  window.history.pushState(null, '', target)
  window.dispatchEvent(new PopStateEvent('popstate'))
  if (!options?.hash) {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }
}
