import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

type MenuColumn = {
  heading: string
  links: { to: string; label: string; desc?: string }[]
}

type MenuConfig = {
  label: string
  columns: MenuColumn[]
  footerLink?: { to: string; label: string }
}

const SOLUTIONS_MENU: MenuConfig = {
  label: 'Solutions',
  columns: [
    {
      heading: 'Par contexte',
      links: [
        { to: '/logiciel-societe-nettoyage', label: 'Société de nettoyage', desc: 'Le guide complet 2026' },
        { to: '/logiciel-auto-entrepreneur-nettoyage', label: 'Auto-entrepreneur', desc: 'Démarrer seul, sans Excel' },
        { to: '/logiciel-nettoyage-medical-bionettoyage', label: 'Médical & bionettoyage', desc: 'Protocoles et traçabilité' },
        { to: '/logiciel-nettoyage-copropriete-syndic', label: 'Copropriété & syndic', desc: 'Multi-immeubles, PV automatique' },
      ],
    },
    {
      heading: 'Par douleur métier',
      links: [
        { to: '/proprely-vs-excel', label: 'Remplacer Excel & WhatsApp', desc: 'Centraliser planning, agents et clients' },
        { to: '/application-mobile-agents-nettoyage', label: 'Suivre les agents sur le terrain', desc: 'App mobile, sans installation' },
        { to: '/crm-entreprise-proprete', label: 'Centraliser clients & sites', desc: 'CRM propreté, marge par client' },
        { to: '/convention-collective-nettoyage', label: 'Conformité IDCC 3043', desc: 'Grille salariale, article 7' },
      ],
    },
  ],
  footerLink: { to: '/audit-gratuit', label: 'Audit gratuit 30 min avec le fondateur' },
}

const FEATURES_MENU: MenuConfig = {
  label: 'Fonctionnalités',
  columns: [
    {
      heading: 'Opérationnel',
      links: [
        { to: '/fonctionnalites/planning-nettoyage', label: 'Planning agents', desc: 'Drag-and-drop, spécialités' },
        { to: '/fonctionnalites/gestion-agents-nettoyage', label: 'Gestion des agents', desc: 'Profils, alertes, compteur heures' },
        { to: '/fonctionnalites/pointage-agents-nettoyage', label: 'Pointage GPS', desc: 'Mobile, anti-fraude, export Silae' },
        { to: '/fonctionnalites/suivi-interventions-nettoyage', label: 'Suivi interventions', desc: 'Temps réel, alertes retard' },
      ],
    },
    {
      heading: 'Commercial & gestion',
      links: [
        { to: '/fonctionnalites/devis-nettoyage', label: 'Devis intelligent IA', desc: '9 facteurs, 3 scénarios' },
        { to: '/fonctionnalites/facturation-nettoyage', label: 'Facturation', desc: 'Récurrente, Factur-X 2026' },
        { to: '/fonctionnalites/preuve-passage-nettoyage', label: 'Preuve de passage', desc: 'QR + photos + signature' },
        { to: '/fonctionnalites/gestion-sites-clients-nettoyage', label: 'Sites & clients', desc: 'Multi-sites, marge par client' },
      ],
    },
  ],
  footerLink: { to: '/fonctionnalites', label: 'Voir toutes les fonctionnalités' },
}

const COMPARATIFS_MENU: MenuConfig = {
  label: 'Comparatifs',
  columns: [
    {
      heading: 'Comparatif général',
      links: [
        { to: '/comparatif-logiciel-nettoyage', label: 'Comparatif logiciels 2026', desc: '6 outils notés' },
        { to: '/proprely-vs-excel', label: 'Proprely vs Excel', desc: 'Coût caché de la dispersion' },
      ],
    },
    {
      heading: 'Face à face concurrents',
      links: [
        { to: '/comparatif/proprely-vs-organilog', label: 'Proprely vs Organilog' },
        { to: '/comparatif/proprely-vs-progiclean', label: 'Proprely vs Progiclean' },
        { to: '/comparatif/proprely-vs-propret', label: 'Proprely vs PROPRET' },
        { to: '/comparatif/proprely-vs-2bepragma', label: 'Proprely vs 2BePragma' },
        { to: '/comparatif/proprely-vs-synchroteam', label: 'Proprely vs Synchroteam' },
        { to: '/comparatif/proprely-vs-comete-proprete', label: 'Proprely vs Comète Propreté' },
      ],
    },
  ],
  footerLink: { to: '/comparatif-logiciel-nettoyage', label: 'Voir le comparatif complet' },
}

const RESOURCES_MENU: MenuConfig = {
  label: 'Ressources',
  columns: [
    {
      heading: 'Outils gratuits',
      links: [
        { to: '/calculateur-prix-nettoyage-m2', label: 'Prix nettoyage m²', desc: 'Estimation par type de local' },
        { to: '/simulateur-rentabilite', label: 'Simulateur rentabilité', desc: 'Marge brute par contrat' },
        { to: '/calculateur-roi', label: 'Calculateur ROI', desc: 'Coût caché de la dispersion' },
        { to: '/outils', label: 'Tous les outils', desc: '4 calculateurs gratuits' },
      ],
    },
    {
      heading: 'Modèles & guides',
      links: [
        { to: '/ressources', label: 'Modèles Excel', desc: 'Devis, planning, suivi heures' },
        { to: '/blog/grille-salaire-nettoyage-2026-idcc-3043', label: 'Grille salaire 2026', desc: 'Tableau complet IDCC 3043' },
        { to: '/blog/convention-collective-nettoyage-idcc-3043', label: 'Convention IDCC 3043', desc: 'Guide salaires + PDF' },
        { to: '/blog/creer-societe-nettoyage', label: 'Créer une société', desc: 'Guide 10 étapes 2026' },
      ],
    },
  ],
  footerLink: { to: '/blog', label: 'Voir tous les articles du blog' },
}

const MENUS: MenuConfig[] = [SOLUTIONS_MENU, FEATURES_MENU, COMPARATIFS_MENU, RESOURCES_MENU]

type Props = {
  /** Si true, ajoute un retour à l'accueil (utilisé sur les pages internes) */
  showHomeAccent?: boolean
}

export default function MegaMenuNav({ showHomeAccent = true }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openMenu && !mobileOpen) return
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [openMenu, mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <nav ref={navRef} className="w-full bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <span className="relative inline-flex items-center text-base font-bold text-slate-900 tracking-tight">
            Proprely
            <span aria-hidden="true" className="absolute -right-1.5 top-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </span>
          {showHomeAccent && (
            <span className="hidden sm:inline-flex ml-3 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 rounded-full px-2 py-0.5 border border-blue-100">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping-3x" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-blue-600" />
              </span>
              Bêta privée
            </span>
          )}
        </Link>

        <div className="hidden lg:flex items-center gap-1 text-sm text-slate-600 font-medium">
          {MENUS.map((menu) => (
            <div key={menu.label} className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
                onMouseEnter={() => setOpenMenu(menu.label)}
                className={`px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors inline-flex items-center gap-1 ${
                  openMenu === menu.label ? 'text-slate-900 bg-slate-50' : ''
                }`}
                aria-expanded={openMenu === menu.label}
                aria-haspopup="true"
              >
                {menu.label}
                <ChevronDown size={14} className={`transition-transform ${openMenu === menu.label ? 'rotate-180' : ''}`} />
              </button>

              {openMenu === menu.label && (
                <div
                  onMouseLeave={() => setOpenMenu(null)}
                  className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 w-[640px] z-50"
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-3">{col.heading}</h3>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="block px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors group"
                              >
                                <span className="block font-semibold text-slate-900 text-sm group-hover:text-blue-700">
                                  {link.label}
                                </span>
                                {link.desc && (
                                  <span className="block text-xs text-slate-500 mt-0.5">{link.desc}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {menu.footerLink && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <Link
                        to={menu.footerLink.to}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                      >
                        {menu.footerLink.label}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          <Link to="/blog" className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
            Blog
          </Link>
          <Link to="/tarifs" className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors">
            Tarifs
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('audit_cta_click', { location: 'mega_menu_nav' })}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Audit gratuit
          </a>
          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('beta_cta_click', { location: 'mega_menu_nav' })}
            className="group relative bg-blue-600 text-white rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] active:scale-[0.97] inline-flex items-center gap-1.5 shadow-sm shadow-blue-600/20 hover:shadow-md hover:shadow-blue-600/30 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none" />
            <span className="relative">Rejoindre la bêta</span>
            <ArrowRight size={13} className="relative group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-50 transition-colors"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl shadow-slate-200/50 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            {MENUS.map((menu) => (
              <div key={menu.label} className="border-b border-slate-100 last:border-b-0">
                <button
                  onClick={() => setMobileSection(mobileSection === menu.label ? null : menu.label)}
                  className="w-full flex items-center justify-between py-3.5 text-left font-semibold text-slate-900"
                  aria-expanded={mobileSection === menu.label}
                >
                  {menu.label}
                  <ChevronDown size={16} className={`transition-transform ${mobileSection === menu.label ? 'rotate-180' : ''}`} />
                </button>
                {mobileSection === menu.label && (
                  <div className="pb-4 space-y-4">
                    {menu.columns.map((col) => (
                      <div key={col.heading}>
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2">{col.heading}</h3>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className="block px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                              >
                                <span className="block text-sm font-semibold text-slate-900">{link.label}</span>
                                {link.desc && <span className="block text-xs text-slate-500 mt-0.5">{link.desc}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {menu.footerLink && (
                      <Link
                        to={menu.footerLink.to}
                        className="inline-flex items-center gap-1.5 px-2 text-sm font-bold text-blue-600"
                      >
                        {menu.footerLink.label}
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="border-b border-slate-100">
              <Link to="/blog" className="block py-3.5 font-semibold text-slate-900">
                Blog
              </Link>
            </div>
            <div className="border-b border-slate-100">
              <Link to="/tarifs" className="block py-3.5 font-semibold text-slate-900">
                Tarifs
              </Link>
            </div>
            <div className="pt-5 flex flex-col gap-2.5">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'mega_menu_nav_mobile' })}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-blue-600 text-white rounded-lg px-4 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('audit_cta_click', { location: 'mega_menu_nav_mobile' })}
                className="w-full inline-flex items-center justify-center gap-1.5 border border-slate-200 text-slate-700 rounded-lg px-4 py-3 text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Audit gratuit 30 min
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
