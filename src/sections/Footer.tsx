export default function Footer() {
  return (
    <footer className="bg-slate-950 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">P</span>
          </div>
          <span className="text-white font-bold text-sm">Proprely</span>
          <span className="text-slate-500 text-xs ml-2 hidden sm:inline">Le logiciel des sociétés de nettoyage</span>
        </div>

        <div className="flex items-center gap-5 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-300 transition-colors">Mentions légales</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Confidentialité</a>
          <a href="mailto:contact@proprely.fr" className="hover:text-slate-300 transition-colors">contact@proprely.fr</a>
        </div>
      </div>
    </footer>
  )
}
