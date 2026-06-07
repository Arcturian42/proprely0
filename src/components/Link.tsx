import { type MouseEvent, type ReactNode } from 'react'
import { navigate } from '../lib/useRoute'

type Props = {
  to: string
  hash?: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  itemProp?: string
}

// Canonical URL = trailing slash partout sauf racine. Le serveur (Vercel
// trailingSlash) redirige les URL sans slash, ce qui créait des entrées
// "Page with redirect" dans GSC à chaque clic interne. On émet directement
// la forme canonique dans le href pour supprimer ces redirections.
function withTrailingSlash(to: string): string {
  if (!to || to === '/') return to
  if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('#')) return to
  return to.endsWith('/') ? to : `${to}/`
}

export default function Link({ to, hash, children, className, ariaLabel, itemProp }: Props) {
  const canonical = withTrailingSlash(to)
  const href = hash ? `${canonical}#${hash}` : canonical

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(canonical, hash ? { hash } : undefined)
  }

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel} itemProp={itemProp}>
      {children}
    </a>
  )
}
