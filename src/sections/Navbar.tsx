import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-slate-900 tracking-tight">Proprely</span>
          <span className="hidden sm:inline-flex ml-2 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 border border-blue-100">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-blue-600" />
            </span>
            Bêta privée
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
          <button onClick={() => scrollTo('solution')} className="hover:text-slate-900 transition-colors">Solution</button>
          <button onClick={() => scrollTo('features')} className="hover:text-slate-900 transition-colors">Fonctionnalités</button>
          <button onClick={() => scrollTo('fondateur')} className="hover:text-slate-900 transition-colors">Membres fondateurs</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-slate-900 transition-colors">FAQ</button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group relative bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta</span>
            <ArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  )
}
