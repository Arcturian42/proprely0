import { ChevronRight, Home } from 'lucide-react'
import Link from './Link'

export type Crumb = { name: string; href?: string }

type Props = {
  items: Crumb[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: Props) {
  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs sm:text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        <li>
          <Link
            to="/"
            ariaLabel="Accueil"
            className="inline-flex items-center gap-1 hover:text-blue-700 transition-colors"
          >
            <Home size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-slate-300 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="text-slate-700 font-medium truncate max-w-[60vw] sm:max-w-none" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-blue-700 transition-colors truncate max-w-[40vw] sm:max-w-none">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
