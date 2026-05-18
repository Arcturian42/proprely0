import { useState } from 'react'
import { Calculator, BookOpen, Mail, ArrowUpRight } from 'lucide-react'
import Modal from '../components/Modal'
import { MentionsLegales, Confidentialite, CGU } from '../components/LegalContent'
import { navigate } from '../lib/useRoute'

type LegalPage = 'mentions' | 'privacy' | 'cgu' | null

export default function Footer() {
  const [open, setOpen] = useState<LegalPage>(null)

  return (
    <>
      <footer className="bg-slate-950 pt-16 pb-10 sm:pt-20 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 mb-12 pb-12 border-b border-slate-800">
            <div className="col-span-2 sm:col-span-1">
              <span className="text-white font-bold text-base block mb-2">Proprely</span>
              <p className="text-slate-500 text-xs leading-relaxed">
                Le cockpit métier pour piloter votre société de nettoyage.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Produit</h4>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => navigate('/', { hash: 'solution' })} className="text-slate-400 hover:text-white text-sm transition-colors">
                    Solution
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/', { hash: 'fondateur' })} className="text-slate-400 hover:text-white text-sm transition-colors">
                    Membres fondateurs
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/', { hash: 'faq' })} className="text-slate-400 hover:text-white text-sm transition-colors">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Ressources</h4>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => navigate('/calculateur-roi')} className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                    <Calculator size={12} />
                    Calculateur ROI
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/blog')} className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                    <BookOpen size={12} />
                    Blog
                  </button>
                </li>
                <li>
                  <a href="mailto:contact@proprely.fr" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                    <Mail size={12} />
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Légal</h4>
              <ul className="space-y-2.5">
                <li>
                  <button onClick={() => setOpen('mentions')} className="text-slate-400 hover:text-white text-sm transition-colors">
                    Mentions légales
                  </button>
                </li>
                <li>
                  <button onClick={() => setOpen('privacy')} className="text-slate-400 hover:text-white text-sm transition-colors">
                    Confidentialité
                  </button>
                </li>
                <li>
                  <button onClick={() => setOpen('cgu')} className="text-slate-400 hover:text-white text-sm transition-colors">
                    CGU
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-slate-500 text-xs">
              © {new Date().getFullYear()} Proprely. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <a href="https://proprely.fr" className="hover:text-slate-300 transition-colors inline-flex items-center gap-1">
                proprely.fr
                <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Modal open={open === 'mentions'} onClose={() => setOpen(null)} title="Mentions légales">
        <MentionsLegales />
      </Modal>
      <Modal open={open === 'privacy'} onClose={() => setOpen(null)} title="Politique de confidentialité">
        <Confidentialite />
      </Modal>
      <Modal open={open === 'cgu'} onClose={() => setOpen(null)} title="Conditions Générales d'Utilisation">
        <CGU />
      </Modal>
    </>
  )
}
