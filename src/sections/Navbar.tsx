import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#1A4FAF] flex items-center justify-center">
            <span className="text-white text-xs font-black">P</span>
          </div>
          <span className="text-base font-bold text-gray-900 tracking-tight">Proprely</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          <button onClick={() => scrollTo('features')} className="hover:text-gray-900 transition-colors">Fonctionnalités</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-gray-900 transition-colors">Tarifs</button>
          <button onClick={() => scrollTo('growth')} className="hover:text-gray-900 transition-colors">Services</button>
          <button onClick={() => scrollTo('faq')} className="hover:text-gray-900 transition-colors">FAQ</button>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">
            Connexion
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="bg-[#1A4FAF] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#0F2D5E] transition-colors flex items-center gap-1.5"
          >
            Démarrer
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </nav>
  )
}
