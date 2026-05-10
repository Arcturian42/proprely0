export default function Footer() {
  return (
    <footer className="py-6 sm:py-8" style={{
      background: '#0A1F40',
      borderTop: '1px solid rgba(0,194,224,0.1)',
    }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00C2E0, #1A4FAF)', boxShadow: '0 0 10px rgba(0,194,224,0.3)' }}>
            <span className="text-white text-[10px] font-black">P</span>
          </div>
          <span className="text-white font-bold text-sm tracking-tight">Proprely</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 text-xs text-white/25">
          <a href="#" className="hover:text-white/60 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white/60 transition-colors">Confidentialité</a>
          <a href="mailto:contact@proprely.fr" className="hover:text-[#00C2E0] transition-colors">contact@proprely.fr</a>
        </div>
      </div>
    </footer>
  )
}
