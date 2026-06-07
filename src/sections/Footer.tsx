import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

const linkClass = 'text-slate-400 hover:text-white text-sm transition-colors'
const headingClass = 'text-white font-bold text-xs uppercase tracking-wider mb-4'

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-16 pb-10 sm:pt-20 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-end mb-12 pb-12 border-b border-slate-800">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-white font-bold text-lg">Proprely</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-200 bg-blue-900/40 rounded-full px-2 py-0.5 border border-blue-800">
                Bêta privée
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Le cockpit métier des sociétés de nettoyage B2B : clients, agents, planning, devis, preuve de passage, rentabilité — au même endroit.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'footer_cta' })}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Rejoindre la bêta
              <ArrowRight size={14} />
            </a>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('audit_cta_click', { location: 'footer_cta' })}
              className="inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 hover:bg-slate-900 text-slate-200 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
            >
              Audit gratuit 30 min
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 pb-12 border-b border-slate-800">
          <div>
            <h4 className={headingClass}>
              <Link to="/fonctionnalites" className="hover:text-slate-300 transition-colors">Produit</Link>
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/fonctionnalites/planning-nettoyage" className={linkClass}>Planning agents</Link></li>
              <li><Link to="/fonctionnalites/gestion-agents-nettoyage" className={linkClass}>Gestion des agents</Link></li>
              <li><Link to="/fonctionnalites/pointage-agents-nettoyage" className={linkClass}>Pointage GPS</Link></li>
              <li><Link to="/fonctionnalites/preuve-passage-nettoyage" className={linkClass}>Preuve de passage</Link></li>
              <li><Link to="/fonctionnalites/suivi-interventions-nettoyage" className={linkClass}>Suivi interventions</Link></li>
              <li><Link to="/fonctionnalites/devis-nettoyage" className={linkClass}>Devis intelligent</Link></li>
              <li><Link to="/fonctionnalites/facturation-nettoyage" className={linkClass}>Facturation</Link></li>
              <li><Link to="/fonctionnalites/gestion-sites-clients-nettoyage" className={linkClass}>Sites & clients</Link></li>
              <li><Link to="/fonctionnalites" className={`${linkClass} font-semibold`}>Toutes les fonctionnalités →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>
              <Link to="/solution" className="hover:text-slate-300 transition-colors">Solutions</Link>
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/logiciel-societe-nettoyage" className={`${linkClass} font-semibold`}>Société de nettoyage</Link></li>
              <li><Link to="/logiciel-auto-entrepreneur-nettoyage" className={linkClass}>Auto-entrepreneur</Link></li>
              <li><Link to="/logiciel-nettoyage-medical-bionettoyage" className={linkClass}>Médical & bionettoyage</Link></li>
              <li><Link to="/logiciel-nettoyage-copropriete-syndic" className={linkClass}>Copropriété & syndic</Link></li>
              <li><Link to="/proprely-vs-excel" className={linkClass}>Remplacer Excel & WhatsApp</Link></li>
              <li><Link to="/application-mobile-agents-nettoyage" className={linkClass}>App mobile agents</Link></li>
              <li><Link to="/crm-entreprise-proprete" className={linkClass}>CRM propreté</Link></li>
              <li><Link to="/convention-collective-nettoyage" className={linkClass}>Conformité IDCC 3043</Link></li>
              <li><Link to="/audit-gratuit" className={`${linkClass} font-semibold`}>Audit gratuit 30 min →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>
              <Link to="/comparatif-logiciel-nettoyage" className="hover:text-slate-300 transition-colors">Comparatifs</Link>
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/comparatif-logiciel-nettoyage" className={`${linkClass} font-semibold`}>Comparatif logiciels 2026</Link></li>
              <li><Link to="/proprely-vs-excel" className={linkClass}>Proprely vs Excel</Link></li>
              <li><Link to="/comparatif/proprely-vs-organilog" className={linkClass}>vs Organilog</Link></li>
              <li><Link to="/comparatif/proprely-vs-progiclean" className={linkClass}>vs Progiclean</Link></li>
              <li><Link to="/comparatif/proprely-vs-propret" className={linkClass}>vs PROPRET</Link></li>
              <li><Link to="/comparatif/proprely-vs-2bepragma" className={linkClass}>vs 2BePragma</Link></li>
              <li><Link to="/comparatif/proprely-vs-synchroteam" className={linkClass}>vs Synchroteam</Link></li>
              <li><Link to="/comparatif/proprely-vs-comete-proprete" className={linkClass}>vs Comète Propreté</Link></li>
              <li><Link to="/alternative-organilog" className={`${linkClass} font-semibold`}>Alternatives →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>
              <Link to="/ressources" className="hover:text-slate-300 transition-colors">Ressources</Link>
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/blog" className={`${linkClass} font-semibold`}>Blog</Link></li>
              <li><Link to="/outils" className={linkClass}>Outils gratuits</Link></li>
              <li><Link to="/calculateur-prix-nettoyage-m2" className={linkClass}>Prix nettoyage m²</Link></li>
              <li><Link to="/calculateur-roi" className={linkClass}>Calculateur ROI</Link></li>
              <li><Link to="/simulateur-rentabilite" className={linkClass}>Simulateur rentabilité</Link></li>
              <li><Link to="/ressources" className={linkClass}>Modèles Excel gratuits</Link></li>
              <li><Link to="/guides/quel-logiciel-societe-nettoyage" className={linkClass}>Guides réponse directe</Link></li>
              <li><Link to="/blog/grille-salaire-nettoyage-2026-idcc-3043" className={linkClass}>Grille salaire 2026</Link></li>
              <li><Link to="/blog/creer-societe-nettoyage" className={linkClass}>Créer une société</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Entreprise</h4>
            <ul className="space-y-2.5">
              <li><Link to="/tarifs" className={`${linkClass} font-semibold`}>Tarifs</Link></li>
              <li><Link to="/beta" className={linkClass}>Bêta privée</Link></li>
              <li><Link to="/a-propos" className={linkClass}>À propos</Link></li>
              <li><Link to="/cas-clients" className={linkClass}>Cas clients</Link></li>
              <li><Link to="/securite-rgpd" className={linkClass}>Sécurité & RGPD</Link></li>
              <li><Link to="/contact" className={linkClass}>Contact</Link></li>
              <li>
                <a
                  href="https://www.linkedin.com/company/proprely/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  LinkedIn
                  <ArrowUpRight size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@proprely"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} inline-flex items-center gap-1`}
                >
                  TikTok
                  <ArrowUpRight size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-10 pb-10 border-b border-slate-800">
          <h4 className={headingClass}>
            <Link to="/villes" className="hover:text-slate-300 transition-colors inline-flex items-center gap-1.5">
              <MapPin size={12} />
              Logiciel nettoyage par ville
            </Link>
          </h4>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <li><Link to="/villes/paris" className={linkClass}>Paris</Link></li>
            <li><Link to="/villes/lyon" className={linkClass}>Lyon</Link></li>
            <li><Link to="/villes/marseille" className={linkClass}>Marseille</Link></li>
            <li><Link to="/villes/bordeaux" className={linkClass}>Bordeaux</Link></li>
            <li><Link to="/villes/toulouse" className={linkClass}>Toulouse</Link></li>
            <li><Link to="/villes/nantes" className={linkClass}>Nantes</Link></li>
            <li><Link to="/villes/lille" className={linkClass}>Lille</Link></li>
            <li><Link to="/villes/nice" className={linkClass}>Nice</Link></li>
            <li><Link to="/villes/strasbourg" className={linkClass}>Strasbourg</Link></li>
            <li><Link to="/villes/montpellier" className={linkClass}>Montpellier</Link></li>
            <li><Link to="/villes/rennes" className={linkClass}>Rennes</Link></li>
            <li><Link to="/villes" className={`${linkClass} font-semibold`}>Toutes les villes →</Link></li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Proprely — Édité par Pershing Global Solutions LTD. Tous droits réservés.
          </p>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
            <Link to="/mentions-legales" className="hover:text-slate-300 transition-colors">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-slate-300 transition-colors">Confidentialité</Link>
            <Link to="/cgu" className="hover:text-slate-300 transition-colors">CGU</Link>
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
