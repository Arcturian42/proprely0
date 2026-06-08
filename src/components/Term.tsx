import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'

// Lexique léger embarqué pour les tooltips contextuels. Les définitions
// complètes vivent dans src/data/glossary.ts et la page /glossaire/.
// Ce dictionnaire ne contient que les termes les plus susceptibles d'apparaitre
// dans le copy des landings (UX-1 du Sprint 5).

const SHORT_DEFINITIONS: Record<string, string> = {
  'idcc-3043': "Convention collective nationale des entreprises de propreté et services associés (IDCC 3043). Cadre les salaires, primes et obligations RH du secteur.",
  'as1': "Niveau le plus bas de la grille IDCC 3043 : agent de service débutant. SMIC propreté à 11,99 €/h brut en 2026.",
  'as2': "Agent de service niveau 2 : 6 mois d'expérience minimum. ~12,15 €/h brut en 2026.",
  'as3': "Agent de service niveau 3 : polyvalence et autonomie sans encadrement direct.",
  'atqs': "Agent Très Qualifié de Service : haute technicité (bionettoyage médical, vitrerie hauteur, décapage). Salaire 14,50 à 17 €/h brut 2026.",
  'article-7': "Clause d'IDCC 3043 imposant le transfert automatique des agents au repreneur d'un marché de nettoyage (sous conditions : CDI, affectation >30 %, ancienneté 6 mois).",
  'prime-panier': "Prime conventionnelle versée à chaque agent travaillant plus de 6h consécutives sur un site. ~7 €/jour en 2026.",
  'cctp': "Cahier des Clauses Techniques Particulières : document du DCE qui définit les prestations attendues, fréquences et surfaces.",
  'boamp': "Bulletin Officiel des Annonces des Marchés Publics — plateforme officielle de publication des marchés publics français.",
  'cout-horaire-charge': "Coût total d'une heure d'agent toutes charges comprises (salaire brut + 42 % charges + primes + indirects). Pour un AS1 : 19-23 €/h en 2026.",
  'marge-brute': "CA d'un contrat moins les coûts directs (main-d'œuvre + consommables + déplacements). Cible standard : 25-35 %.",
  'marge-nette': "Marge brute moins la quote-part de frais de structure. Cible standard propreté B2B : 12-18 %.",
  'bionettoyage': "Méthode de nettoyage et désinfection des surfaces en milieu médical, encadrée par protocoles stricts (CCLIN/ARLIN, NF EN 14885).",
  'preuve-passage': "Justificatif d'intervention combinant QR code site, photos avant/après horodatées et signature client. Standard moderne anti-litige syndic.",
  'factur-x': "Format de facture électronique mixte (PDF/A-3 + XML) — norme française obligatoire en réception dès le 1er septembre 2026.",
  'chorus-pro': "Plateforme officielle de l'État pour le dépôt des factures électroniques destinées aux marchés publics.",
  'pdp': "Plateforme de Dématérialisation Partenaire : prestataire privé enregistré par la DGFiP pour transmettre les factures électroniques B2B dès 2027.",
  'rgpd': "Règlement européen 2016/679 encadrant le traitement des données personnelles. Implique registre des traitements, base légale, droits exerçables.",
  'urssaf': "Union de Recouvrement des Cotisations de Sécurité Sociale et d'Allocations Familiales. Particulièrement vigilante sur les heures complémentaires en propreté.",
  'fep': "Fédération des Entreprises de Propreté : organisation patronale du secteur. Publie l'indice de révision des prix utilisé dans les contrats.",
}

type Props = {
  /** Slug du terme dans /glossaire/. */
  slug: string
  /** Texte affiché (par défaut, c'est le terme lui-même). */
  children: ReactNode
  /** Désactive le lien vers /glossaire si false. */
  link?: boolean
  className?: string
}

export default function Term({ slug, children, link = true, className = '' }: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const closeTimer = useRef<number | null>(null)

  const definition = SHORT_DEFINITIONS[slug]
  const href = `/glossaire/#${slug}`

  // Fermer si clic dehors (utile sur mobile/tablette où le tap ouvre)
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 180)
  }

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  if (!definition) {
    // Fallback : pas de définition disponible, on rend juste un lien simple
    return link ? (
      <a href={href} className={`text-blue-600 hover:underline ${className}`}>
        {children}
      </a>
    ) : (
      <span className={className}>{children}</span>
    )
  }

  return (
    <span
      ref={wrapperRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-slate-900 font-semibold border-b border-dotted border-blue-400 cursor-help inline-flex items-baseline"
        title={definition}
        aria-expanded={open}
        aria-describedby={open ? `tooltip-${slug}` : undefined}
      >
        {children}
      </button>

      {open && (
        <span
          role="tooltip"
          id={`tooltip-${slug}`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 bg-slate-900 text-white rounded-xl p-4 shadow-2xl shadow-slate-900/40 z-50 normal-case"
        >
          <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-300 mb-1.5">Définition</span>
          <span className="block text-xs sm:text-sm leading-relaxed mb-2 text-slate-100">
            {definition}
          </span>
          {link && (
            <a
              href={href}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 hover:text-blue-200 hover:underline"
            >
              Voir la définition complète
              <ExternalLink size={10} />
            </a>
          )}
          {/* Tail */}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 -mt-1.5" />
        </span>
      )}
    </span>
  )
}
