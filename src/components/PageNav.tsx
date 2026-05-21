import { ArrowRight, ArrowLeft } from 'lucide-react'
import Link from './Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

export default function PageNav() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft size={16} className="text-slate-500" />
          <span className="text-base font-bold text-slate-900 tracking-tight">Proprely</span>
          <span className="hidden sm:inline ml-2 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 border border-blue-100">Bêta privée</span>
        </Link>

        <a
          href={BETA_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('beta_cta_click', { location: 'page_nav' })}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-600/20"
        >
          Rejoindre la bêta
          <ArrowRight size={14} />
        </a>
      </div>
    </nav>
  )
}
