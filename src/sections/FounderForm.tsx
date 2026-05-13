import { useEffect } from 'react'

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <section id="formulaire" className="bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#1A4FAF] uppercase tracking-widest mb-4">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            Démarrez votre essai gratuit
          </h2>
          <p className="text-gray-500 text-base">
            Remplissez le formulaire, on vous rappelle sous 24h pour configurer votre compte ensemble.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
          <div
            style={{ width: '100%', height: '500px' }}
            data-fillout-id="rBPhgNm42Lus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          Sans engagement · Essai 14 jours · contact@proprely.fr
        </p>
      </div>
    </section>
  )
}
