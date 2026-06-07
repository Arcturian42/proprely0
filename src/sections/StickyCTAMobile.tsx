import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

// Sticky CTA mobile global — affiché sur TOUTES les pages mobile dès que
// l'utilisateur scroll > 600px. Précédemment limité à la homepage (dépendance
// à l'élément #formulaire), maintenant actif partout pour maximiser les
// inscriptions à la bêta.
export default function StickyCTAMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Sur la homepage : masquer si formulaire en vue (évite doublon visuel)
      const formEl = document.getElementById('formulaire')
      if (formEl) {
        const formRect = formEl.getBoundingClientRect()
        const formInView = formRect.top < window.innerHeight && formRect.bottom > 0
        if (formInView) {
          setVisible(false)
          return
        }
      }
      // Sur toutes les pages : afficher après 500px de scroll
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <a
        href={BETA_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('beta_cta_click', { location: 'sticky_mobile_global' })}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold h-12 flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-600/25 active:scale-[0.97] transition-transform duration-150 ease-[var(--ease-out)]"
      >
        <Sparkles size={14} />
        Rejoindre la bêta gratuite
        <ArrowRight size={15} />
      </a>
    </div>
  )
}
