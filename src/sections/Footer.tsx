export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#1A4FAF] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">P</span>
          </div>
          <span className="text-white font-bold text-sm">Proprely</span>
          <span className="text-gray-600 text-xs ml-2">Le logiciel des sociétés de nettoyage</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-gray-600">
          <a href="#" className="hover:text-gray-400 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Confidentialité</a>
          <a href="mailto:contact@proprely.fr" className="hover:text-gray-400 transition-colors">contact@proprely.fr</a>
        </div>
      </div>
    </footer>
  )
}
