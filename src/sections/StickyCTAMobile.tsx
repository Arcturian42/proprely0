import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t border-gray-200 sm:hidden">
      <button
        onClick={() => scrollTo('pricing')}
        className="w-full bg-[#1A4FAF] text-white rounded-xl font-bold h-12 flex items-center justify-center gap-2 text-sm"
      >
        Voir les tarifs
        <ArrowRight size={15} />
      </button>
    </div>
  )
}
