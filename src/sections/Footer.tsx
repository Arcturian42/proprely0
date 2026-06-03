import { Calculator, BookOpen, Mail, ArrowUpRight, Tag, MapPin } from 'lucide-react'
import Link from '../components/Link'

export default function Footer() {
  return (
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
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              <Link to="/fonctionnalites" className="hover:text-slate-300 transition-colors">Fonctionnalités</Link>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/logiciel-societe-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors font-semibold">
                  Logiciel nettoyage
                </Link>
              </li>
              <li>
                <Link to="/logiciel-auto-entrepreneur-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Auto-entrepreneur
                </Link>
              </li>
              <li>
                <Link to="/crm-entreprise-proprete" className="text-slate-400 hover:text-white text-sm transition-colors">
                  CRM propreté
                </Link>
              </li>
              <li>
                <Link to="/convention-collective-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Convention IDCC 3043
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites/planning-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Planning
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites/devis-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Devis
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites/gestion-agents-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Gestion agents
                </Link>
              </li>
              <li>
                <Link to="/fonctionnalites/preuve-passage-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Preuve de passage
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              <Link to="/ressources" className="hover:text-slate-300 transition-colors">Ressources</Link>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/tarifs" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Tag size={12} />
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/outils" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Calculator size={12} />
                  Outils gratuits
                </Link>
              </li>
              <li>
                <Link to="/calculateur-prix-nettoyage-m2" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Calculator size={12} />
                  Prix nettoyage m²
                </Link>
              </li>
              <li>
                <Link to="/calculateur-roi" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Calculator size={12} />
                  Calculateur ROI
                </Link>
              </li>
              <li>
                <Link to="/simulateur-rentabilite" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Calculator size={12} />
                  Simulateur rentabilité
                </Link>
              </li>
              <li>
                <Link to="/comparatif-logiciel-nettoyage" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Comparatif logiciels
                </Link>
              </li>
              <li>
                <Link to="/proprely-vs-excel" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Proprely vs Excel
                </Link>
              </li>
              <li>
                <Link to="/comparatif/proprely-vs-organilog" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  vs Organilog
                </Link>
              </li>
              <li>
                <Link to="/comparatif/proprely-vs-progiclean" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  vs Progiclean
                </Link>
              </li>
              <li>
                <Link to="/comparatif/proprely-vs-propret" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  vs PROPRET
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <BookOpen size={12} />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Mail size={12} />
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                  <Mail size={12} />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Légal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/mentions-legales" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cgu" className="text-slate-400 hover:text-white text-sm transition-colors">
                  CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12 pb-12 border-b border-slate-800">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
            <Link to="/villes" className="hover:text-slate-300 transition-colors">Logiciel nettoyage par ville</Link>
          </h4>
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
            <li>
              <Link to="/villes/paris" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Paris &amp; Île-de-France
              </Link>
            </li>
            <li>
              <Link to="/villes/lyon" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Lyon &amp; Rhône-Alpes
              </Link>
            </li>
            <li>
              <Link to="/villes/marseille" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Marseille &amp; PACA
              </Link>
            </li>
            <li>
              <Link to="/villes/bordeaux" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Bordeaux &amp; Gironde
              </Link>
            </li>
            <li>
              <Link to="/villes/toulouse" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Toulouse &amp; Occitanie
              </Link>
            </li>
            <li>
              <Link to="/villes/nantes" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Nantes &amp; Loire-Atlantique
              </Link>
            </li>
            <li>
              <Link to="/villes/lille" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Lille &amp; Hauts-de-France
              </Link>
            </li>
            <li>
              <Link to="/villes/nice" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Nice &amp; Côte d'Azur
              </Link>
            </li>
            <li>
              <Link to="/villes/strasbourg" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Strasbourg &amp; Alsace
              </Link>
            </li>
            <li>
              <Link to="/villes/montpellier" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Montpellier &amp; Hérault
              </Link>
            </li>
            <li>
              <Link to="/villes/rennes" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                <MapPin size={12} />
                Rennes &amp; Bretagne
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Proprely. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a
              href="https://www.linkedin.com/company/proprely/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Proprely sur LinkedIn"
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              LinkedIn
              <ArrowUpRight size={11} />
            </a>
            <a
              href="https://tiktok.com/@proprely"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Proprely sur TikTok"
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              TikTok
              <ArrowUpRight size={11} />
            </a>
            <a href="https://proprely.fr" className="hover:text-slate-300 transition-colors inline-flex items-center gap-1">
              proprely.fr
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
