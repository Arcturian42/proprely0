import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-50" style={{
      background: 'rgba(10, 31, 64, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 194, 224, 0.12)',
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #00C2E0, #1A4FAF)',
            boxShadow: '0 0 12px rgba(0,194,224,0.4)',
          }}>
            <span className="text-white text-xs font-black">P</span>
          </div>
          <span className="text-base sm:text-lg font-bold text-white tracking-tight">Proprely</span>
        </div>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {[
            { label: 'Solution', id: 'probleme' },
            { label: 'Fonctionnalités', id: 'univers' },
            { label: 'Offre Fondateur', id: 'fondateur', bold: true },
            { label: 'FAQ', id: 'faq' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`transition-all duration-200 hover:text-[#00C2E0] ${
                item.bold
                  ? 'font-semibold text-[#00C2E0]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('formulaire')}
          className="flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #00C2E0, #0099b8)',
            color: '#0F2D5E',
            boxShadow: '0 0 20px rgba(0,194,224,0.35)',
          }}
        >
          Devenir fondateur
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  )
}
