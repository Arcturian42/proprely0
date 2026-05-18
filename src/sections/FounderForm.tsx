import { useEffect } from 'react'

export default function FounderForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <section id="formulaire" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Candidature</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Réserve ta place de fondateur
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Quelques minutes pour candidater. On revient vers toi sous 24h pour un premier appel si ton profil colle.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div
            style={{ width: '100%', height: '500px' }}
            data-fillout-id="rBPhgNm42Lus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
        </div>
        <p className="text-center text-xs text-slate-500 mt-5">
          Pas de carte bancaire requise · contact@proprely.fr
        </p>
      </div>
    </section>
  )
}
