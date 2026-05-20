import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

const formFields = [
  'Prénom et nom',
  'Email professionnel',
  'Nom de votre entreprise',
  "Nombre d'agents",
  'Ville ou région',
  'Votre plus gros problème actuel',
]

export default function FounderForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)

    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string; eventName?: string } | undefined
      if (!data || typeof data !== 'object') return
      if (data.type === 'form_submitted' || data.eventName === 'form_submitted') {
        trackEvent('beta_form_submit', { form: 'founder' })
      }
    }
    window.addEventListener('message', onMessage)

    return () => {
      document.body.removeChild(script)
      window.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <section id="formulaire" className="bg-slate-50 py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Candidature bêta</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              Réservez votre place de membre fondateur
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Quelques minutes pour candidater. Nous revenons vers vous sous 24h pour un premier appel si votre profil correspond.
            </p>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Ce qu'on vous demande</p>
              <ul className="space-y-2.5">
                {formFields.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={14} className="text-blue-600 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Gratuit pendant la bêta · Pas de carte bancaire · Aucun engagement · Vos données restent confidentielles
            </p>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
              <div
                style={{ width: '100%', minHeight: '600px' }}
                data-fillout-id="rBPhgNm42Lus"
                data-fillout-embed-type="standard"
                data-fillout-inherit-parameters
                data-fillout-dynamic-resize
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
