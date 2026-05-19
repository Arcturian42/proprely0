export type LexiconEntry = {
  slug: string
  term: string
  shortDef: string
  definition: string
  context: string
  relatedTerms: string[]
}

export const lexicon: LexiconEntry[] = [
  {
    slug: 'preuve-de-passage',
    term: 'Preuve de passage',
    shortDef: "Trace opposable qu'une intervention de nettoyage a bien été effectuée sur un site, à une heure précise, dans des conditions documentées.",
    definition: "La preuve de passage est l'ensemble des éléments qui attestent qu'une intervention a eu lieu : check-in horodaté (typiquement par scan d'un QR code unique au site), photos avant et après l'intervention, signature électronique du client si présent, géolocalisation optionnelle. L'agrégation de ces éléments produit un PV (procès-verbal) automatique consultable par le client.",
    context: "Devenue critère éliminatoire dans la majorité des appels d'offres publics et chez les syndics de copropriétés. Une preuve de passage robuste règle la plupart des contestations avant qu'elles ne deviennent un litige. Elle protège l'entreprise de nettoyage contre les retenues de paiement abusives et le client contre les facturations indues.",
    relatedTerms: ['cahier-des-charges-proprete', 'autocontrole'],
  },
  {
    slug: 'tournee-nettoyage',
    term: 'Tournée',
    shortDef: "Suite ordonnée d'interventions effectuées par un même agent sur une même journée ou demi-journée, généralement sur plusieurs sites géographiquement proches.",
    definition: "La tournée est l'unité d'organisation de base d'une équipe de nettoyage terrain. Elle regroupe plusieurs prestations (typiquement 3 à 8) en fonction de la proximité géographique des sites, des fréquences contractuelles et de la spécialité de l'agent. Une tournée bien construite minimise les temps de déplacement et maximise le temps facturable.",
    context: "L'optimisation de tournée est un levier majeur de productivité. Selon l'enquête Branche Propreté, un agent effectue en moyenne 4 à 6 sites par tournée. Une mauvaise organisation peut faire perdre 30 à 60 minutes de temps non-facturable par jour et par agent.",
    relatedTerms: ['ratio-productivite', 'frequence-intervention'],
  },
  {
    slug: 'cahier-des-charges-proprete',
    term: 'Cahier des charges propreté',
    shortDef: "Document contractuel qui décrit précisément les prestations attendues, les fréquences, les produits utilisés et les modalités de contrôle qualité.",
    definition: "Le cahier des charges propreté formalise l'engagement du prestataire envers son client. Il liste : les locaux concernés (avec surfaces), les prestations attendues (sols, sanitaires, vitres, mobilier, déchets), les fréquences (quotidien, hebdomadaire, mensuel, ponctuel), les produits et certifications (écolabel, allergènes), les plages horaires, les modalités de remplacement, et les indicateurs de contrôle qualité.",
    context: "Le cahier des charges est la pièce maîtresse d'un contrat de propreté. Un cahier mal rédigé est source de litiges (« vous deviez nettoyer ça aussi »). Les bons cahiers sont quantifiables : surfaces en m², fréquences précises, produits référencés, autocontrôles documentés.",
    relatedTerms: ['contrat-de-proprete', 'autocontrole'],
  },
  {
    slug: 'ratio-productivite',
    term: 'Ratio de productivité (m²/h)',
    shortDef: "Surface qu'un agent peut nettoyer en une heure, exprimée en mètres carrés. Indicateur de référence pour estimer un devis et piloter la marge.",
    definition: "Le ratio de productivité indique combien de m² un agent peut nettoyer en une heure dans des conditions normales. Il varie fortement selon le type de prestation : bureaux standards (200-300 m²/h), sanitaires (50-100 m²/h), vitres (15-30 m²/h), décapage (40-80 m²/h). Ces ratios sont la base de l'estimation des heures et donc des devis.",
    context: "Sous-estimer un ratio = perdre de l'argent (facturer 200 m²/h quand on tient 150 = -25% de marge). Le surestimer = saturer ses agents et provoquer du turnover. Les ratios doivent être calibrés sur les données réelles de l'entreprise, pas sur les standards théoriques.",
    relatedTerms: ['cahier-des-charges-proprete', 'frequence-intervention'],
  },
  {
    slug: 'frequence-intervention',
    term: 'Fréquence d\'intervention',
    shortDef: "Cadence à laquelle une prestation est effectuée sur un site donné : quotidien, x fois par semaine, hebdomadaire, mensuel, ponctuel.",
    definition: "La fréquence d'intervention définit la régularité d'une prestation. Les fréquences standards : quotidien (5 ou 7 jours/semaine), 3x/semaine, 2x/semaine, hebdomadaire, bi-mensuel, mensuel, trimestriel, et ponctuel (remise en état, décapage, vitrerie hauteur). Sur un même site, plusieurs prestations peuvent avoir des fréquences différentes (bureaux quotidiens + vitres mensuelles).",
    context: "Une fréquence mal modélisée pénalise toute la suite : devis incorrect, planning incohérent, facturation imprécise. Les outils métier (vs Excel) doivent gérer nativement les fréquences variables et les enchaînements de prestations sur un même site.",
    relatedTerms: ['ratio-productivite', 'contrat-de-proprete'],
  },
  {
    slug: 'agent-qualifie-aqap',
    term: 'Agent qualifié AQAP',
    shortDef: "Agent de propreté ayant suivi une formation et obtenu une qualification reconnue par la branche professionnelle, généralement attestée par un CQP.",
    definition: "AQAP (Agent Qualifié de Propreté) désigne un agent ayant validé un Certificat de Qualification Professionnelle (CQP) reconnu par la branche Propreté. Le CQP atteste de compétences sur les techniques de nettoyage (sols, vitres, sanitaires, biocontamination), l'utilisation des produits et machines, et la sécurité au travail. Le statut AQAP ouvre droit à une grille salariale supérieure et à des prestations techniques.",
    context: "Les clients exigeants (hôpitaux, agroalimentaire, salles blanches) demandent des agents AQAP. Un dirigeant qui investit dans la qualification de ses agents accède à des contrats premium mieux margés. La fidélisation des AQAP est cruciale : un agent qualifié qui part part avec son CQP, et le remplacer coûte 3 500 à 5 000 €.",
    relatedTerms: ['specialite-agent', 'contrat-de-proprete'],
  },
  {
    slug: 'autocontrole',
    term: 'Autocontrôle',
    shortDef: "Procédure interne par laquelle un prestataire vérifie lui-même la qualité de ses interventions, généralement via une grille standardisée.",
    definition: "L'autocontrôle est l'engagement du prestataire à contrôler la qualité de ses propres prestations sans attendre la remontée du client. Il s'appuie sur une grille de contrôle (par zone, par poste de travail), une fréquence (mensuel à hebdomadaire selon le contrat) et un livrable (rapport, photos, score). Les écarts identifiés déclenchent un plan d'action.",
    context: "L'autocontrôle est exigé par la norme NF Service Propreté et par la plupart des appels d'offres publics. Bien tenu, il prévient les litiges et démontre la maturité du prestataire. Mal tenu, il devient une charge administrative inutile. Les outils métier permettent de digitaliser les grilles d'autocontrôle pour gagner du temps.",
    relatedTerms: ['preuve-de-passage', 'cahier-des-charges-proprete'],
  },
  {
    slug: 'contrat-de-proprete',
    term: 'Contrat de propreté',
    shortDef: "Document juridique liant un prestataire de nettoyage à son client B2B, fixant la durée, les prestations, les prix et les conditions de résiliation.",
    definition: "Le contrat de propreté est l'engagement contractuel entre l'entreprise de nettoyage et son client. Il comprend : la durée (typiquement 1 à 3 ans reconductible), le cahier des charges détaillé (annexé), la grille tarifaire (forfait mensuel ou prix unitaire), les conditions de révision des prix (généralement indexée sur l'IDCC propreté), les clauses de remplacement, les conditions de résiliation (préavis de 1 à 3 mois) et les pénalités éventuelles.",
    context: "Un contrat bien rédigé protège les deux parties. Les clauses sensibles : la révision annuelle automatique (anti-érosion des marges), la traçabilité des interventions (preuve de passage), les modalités de remplacement (qui paie en cas d'imprévu). Sur les grands comptes, l'AO impose souvent son propre modèle ; sur les PME, l'entreprise de nettoyage peut imposer le sien.",
    relatedTerms: ['cahier-des-charges-proprete', 'prestation-ponctuelle'],
  },
  {
    slug: 'prestation-ponctuelle',
    term: 'Prestation ponctuelle',
    shortDef: "Intervention unique non récurrente, généralement facturée plus cher qu'une prestation contractuelle équivalente.",
    definition: "Une prestation ponctuelle est une intervention non récurrente : remise en état après chantier, décapage de sols, shampouinage de moquette, nettoyage post-événementiel, vitrerie hauteur, désinfection ciblée. Elle est facturée à part du contrat récurrent, généralement avec une majoration de 20 à 30% pour compenser la mobilisation ponctuelle, l'absence d'amortissement et le risque commercial.",
    context: "Les prestations ponctuelles sont un levier de marge important : moins concurrentielles, mieux margées, elles permettent de valoriser les spécialités. Un dirigeant qui structure une offre ponctuelle (catalogue, devis-type, planning de mobilisation) peut faire monter le panier moyen client de 15 à 30%.",
    relatedTerms: ['remise-en-etat', 'contrat-de-proprete'],
  },
  {
    slug: 'remise-en-etat',
    term: 'Remise en état',
    shortDef: "Prestation lourde de nettoyage en profondeur, typiquement réalisée après travaux, sinistre, ou rotation de locataire.",
    definition: "La remise en état (souvent abrégée RE) désigne une intervention de nettoyage en profondeur, distincte du nettoyage récurrent. Elle inclut : aspiration et lavage complet des sols (parfois décapage + cirage), nettoyage des plafonds et murs, désinfection des sanitaires, dégraissage des cuisines, vitres intérieures et extérieures, mobilier. Réalisée après travaux, après sinistre, ou en rotation locataire (bureaux, hôtels, logements).",
    context: "La remise en état est l'une des prestations les mieux margées du secteur (souvent 1,5 à 2x un quotidien équivalent). Elle demande des agents formés, du matériel spécifique (mono-brosses, aspirateurs eau-poussière, échafaudages), et une chaîne logistique solide. Les sociétés qui structurent cette offre se différencient nettement.",
    relatedTerms: ['prestation-ponctuelle', 'agent-qualifie-aqap'],
  },
  {
    slug: 'specialite-agent',
    term: 'Spécialité agent',
    shortDef: "Compétence métier d'un agent au-delà du nettoyage standard : vitrerie, moquette, décapage, désinfection médicale, hauteur.",
    definition: "Une spécialité agent est une compétence technique reconnue, souvent attestée par formation : vitrerie en hauteur (avec habilitation travail en hauteur), moquette (shampouineuse, injection-extraction), décapage de sols (mono-brosse, produits décapants), désinfection médicale (protocoles biocontamination), démoussage toiture, nettoyage cryogénique. Chaque spécialité justifie un tarif horaire plus élevé.",
    context: "Identifier et valoriser les spécialités de ses agents est un double levier : commercial (justifier un prix premium) et RH (fidéliser les agents en leur confiant des missions valorisantes). Les outils métier doivent permettre de qualifier chaque agent et de proposer en priorité les agents qualifiés sur les missions techniques.",
    relatedTerms: ['agent-qualifie-aqap', 'prestation-ponctuelle'],
  },
]

export function getLexiconEntry(slug: string): LexiconEntry | undefined {
  return lexicon.find((e) => e.slug === slug)
}

export function getRelatedLexicon(slug: string, max = 2): LexiconEntry[] {
  const entry = getLexiconEntry(slug)
  if (entry?.relatedTerms?.length) {
    return entry.relatedTerms.map(getLexiconEntry).filter((e): e is LexiconEntry => Boolean(e)).slice(0, max)
  }
  return lexicon.filter((e) => e.slug !== slug).slice(0, max)
}
