import { useEffect } from 'react'

export default function FounderForm() {
  useEffect(() => {
    // Load Fillout embed script
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="formulaire" className="bg-[#F0F4F8] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block bg-[#00C2E0]/10 text-[#0F2D5E] rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold mb-4">
            Candidature fondateur
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#0F2D5E] mb-3">
            Rejoignez les 30 entreprises fondatrices
          </h2>
          <p className="text-xs sm:text-sm text-[#5A6B7D] max-w-xl mx-auto">
            Remplissez le formulaire ci-dessous. Nous vous répondons sous 48h. Sans engagement, essai gratuit inclus.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div
            style={{ width: '100%', height: '500px' }}
            data-fillout-id="rBPhgNm42Lus"
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            data-fillout-dynamic-resize
          />
        </div>

        <p className="text-center text-[10px] sm:text-xs text-[#8A9AA0] mt-4">
          Sans engagement · Réponse sous 48h · Essai gratuit · contact@proprely.fr
        </p>
      </div>
    </section>
  )
}
