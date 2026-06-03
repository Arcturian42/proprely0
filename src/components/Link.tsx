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

export default function Link({ to, hash, children, className, ariaLabel, itemProp }: Props) {
  const href = hash ? `${to}#${hash}` : to

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to, hash ? { hash } : undefined)
  }

  return (
    <a href={href} onClick={handleClick} className={className} aria-label={ariaLabel} itemProp={itemProp}>
      {children}
    </a>
  )
}
