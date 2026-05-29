import { useState } from 'react'
import { Cookie, X } from 'lucide-react'
import { getConsent, setConsent, enableAnalytics } from '../lib/analytics'
import Link from './Link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && getConsent() === null)

  if (!visible) return null

  const handle = (choice: 'granted' | 'denied') => {
    // GA4 n'est chargé qu'après un consentement explicite (opt-in CNIL).
    if (choice === 'granted') enableAnalytics()
    else setConsent('denied')
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Bandeau de consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[100] bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-5"
    >
      <div className="flex items-start gap-3 mb-3">
        <Cookie size={20} className="text-blue-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Cookies de mesure d'audience</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nous utilisons Google Analytics pour comprendre comment vous utilisez le site et améliorer Proprely.
            Vous pouvez accepter ou refuser, ça ne change rien à votre expérience.{' '}
            <Link to="/confidentialite" className="text-blue-600 hover:underline">En savoir plus</Link>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => handle('denied')}
          aria-label="Fermer et refuser"
          className="text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handle('denied')}
          className="flex-1 bg-slate-100 text-slate-700 rounded-lg px-3 py-2 text-xs font-semibold hover:bg-slate-200 transition-colors"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => handle('granted')}
          className="flex-1 bg-blue-600 text-white rounded-lg px-3 py-2 text-xs font-semibold hover:bg-blue-700 transition-colors"
        >
          Accepter
        </button>
      </div>
    </div>
  )
}
