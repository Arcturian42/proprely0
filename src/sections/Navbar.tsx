import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0F2D5E] flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-[#0F2D5E]">Proprely</span>
        </div>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[#5A6B7D]">
          <button onClick={() => scrollTo('probleme')} className="hover:text-[#0F2D5E] transition-colors">Solution</button>
          <button onClick={() => scrollTo('univers')} className="hover:text-[#0F2D5E] transition-colors">Fonctionnalités</button>
          <button onClick={() => scrollTo('fondateur')} className="font-semibold text-[#0F2D5E] hover:text-[#1A4FAF] transition-colors">Offre Fondateur</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-[#0F2D5E] transition-colors">FAQ</button>
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('formulaire')}
          className="bg-[#0F2D5E] text-white rounded-full px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold hover:bg-[#1A4FAF] transition-colors flex items-center gap-1.5"
        >
          Devenir fondateur
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  )
}
