export default function Footer() {
  return (
    <footer className="bg-[#0A1F40] py-5 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#00C2E0] flex items-center justify-center">
            <span className="text-[#0A1F40] text-[10px] font-bold">P</span>
          </div>
          <span className="text-white font-bold text-sm">Proprely</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs text-white/30">
          <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          <a href="mailto:contact@proprely.fr" className="hover:text-white transition-colors">contact@proprely.fr</a>
        </div>
      </div>
    </footer>
  )
}
