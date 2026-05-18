import { useEffect, useState } from 'react'

function getRoute() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname
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
