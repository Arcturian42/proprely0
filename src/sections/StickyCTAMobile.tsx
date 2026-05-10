import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function StickyCTAMobile() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const formEl = document.getElementById('formulaire')
      if (!formEl) return
      const formRect = formEl.getBoundingClientRect()
      const scrolled = window.scrollY > 400
      const formInView = formRect.top < window.innerHeight && formRect.bottom > 0
      setVisible(scrolled && !formInView)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:hidden"
      style={{
        background: 'rgba(10,31,64,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(0,194,224,0.15)',
      }}>
      <button
        onClick={() => scrollTo('formulaire')}
        className="w-full rounded-full font-black h-12 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, #00C2E0, #0099b8)',
          color: '#0A1F40',
          boxShadow: '0 0 20px rgba(0,194,224,0.3)',
        }}
      >
        Devenir fondateur — 49€/mois
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
