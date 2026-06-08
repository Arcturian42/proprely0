// Glossaire métier propreté B2B — termes utilisés dans les sociétés de
// nettoyage françaises. Utilisé pour :
//   - Page /glossaire/ (signaux SEO + GEO)
//   - Schema DefinedTerm (citation par LLM)
//   - Tooltips contextuels (UX)

export type GlossaryTerm = {
  /** Slug d'ancre pour permaliens (/glossaire#slug) */
  slug: string
  /** Terme exact (avec accents et casse) */
  term: string
  /** Aliases / acronymes alternatifs */
  aliases?: string[]
  /** Catégorie pour le filtrage */
  category: GlossaryCategory
  /** Définition courte (1-2 phrases, pour tooltip + résultat recherche) */
  short: string
  /** Définition complète avec contexte, ordres de grandeur, références */
  long: string
  /** Sources officielles (URL externes citables) */
  sources?: { label: string; url: string }[]
  /** Liens internes Proprely associés */
  related?: { label: string; to: string }[]
}

export type GlossaryCategory =
  | 'Réglementaire'
  | 'Convention IDCC 3043'
  | 'Métier'
  | 'Commercial'
  | 'Financier'
  | 'Technique'
  | 'Hygiène & sécurité'
  | 'Conformité 2026'

export const glossary: GlossaryTerm[] = [
  // ─── Convention IDCC 3043 ────────────────────────────────────────────
  {
    slug: 'idcc-3043',
    term: 'IDCC 3043',
    aliases: ['Convention propreté', 'CCN propreté'],
    category: 'Convention IDCC 3043',
    short: "Convention collective nationale des entreprises de propreté et services associés (IDCC 3043). Cadre les salaires, primes et obligations RH du secteur.",
    long: "L'IDCC 3043 est la convention collective nationale qui s'applique à toutes les entreprises de propreté et services associés en France. Elle fixe la grille salariale (niveaux AS, ATQS, MP, CE), les primes obligatoires (panier, transport, salissure), les conditions de transfert de personnel (article 7), la mutuelle et la prévoyance. Toute société de nettoyage employant un salarié y est rattachée d'office. Mise à jour annuellement par avenant (dernière révision majeure de la grille : 2026).",
    sources: [{ label: "Légifrance — IDCC 3043", url: 'https://www.legifrance.gouv.fr' }],
    related: [
      { label: 'Logiciel conforme IDCC 3043', to: '/convention-collective-nettoyage' },
      { label: 'Grille salaire 2026', to: '/blog/grille-salaire-nettoyage-2026-idcc-3043' },
    ],
  },
  {
    slug: 'as1',
    term: 'AS1',
    aliases: ['Agent de service niveau 1'],
    category: 'Convention IDCC 3043',
    short: "Niveau le plus bas de la grille IDCC 3043 : agent de service débutant. SMIC propreté à 11,99 €/h brut en 2026.",
    long: "AS1 (Agent de Service niveau 1) est le premier échelon de la grille salariale IDCC 3043. Il concerne les agents débutants sans expérience préalable, affectés à des tâches d'entretien courant. Salaire brut horaire en 2026 : 11,99 €. C'est la majorité des embauches dans le secteur — environ 60-70 % des effectifs terrain.",
    related: [
      { label: 'Coût horaire chargé agent AS1', to: '/blog/cout-horaire-charge-agent-nettoyage' },
    ],
  },
  {
    slug: 'as2',
    term: 'AS2',
    aliases: ['Agent de service niveau 2'],
    category: 'Convention IDCC 3043',
    short: "Agent de service niveau 2 : 6 mois d'expérience minimum. ~12,15 €/h brut en 2026.",
    long: "AS2 (Agent de Service niveau 2) concerne les agents avec au moins 6 mois d'expérience continue dans le secteur ou des compétences techniques spécifiques (vitrerie en hauteur, décapage, monobrosse). Salaire brut horaire 2026 : ~12,15 €.",
  },
  {
    slug: 'as3',
    term: 'AS3',
    aliases: ['Agent de service niveau 3'],
    category: 'Convention IDCC 3043',
    short: "Agent de service niveau 3 : polyvalence et autonomie. Encadrement possible d'un binôme.",
    long: "AS3 (Agent de Service niveau 3) regroupe les agents expérimentés et autonomes, capables de prendre en charge un site sans encadrement direct. Souvent affectés aux sites complexes (médical, hôtellerie haut de gamme). Niveau d'entrée pour évoluer vers ATQS ou CE1.",
  },
  {
    slug: 'atqs',
    term: 'ATQS',
    aliases: ['Agent Très Qualifié de Service'],
    category: 'Convention IDCC 3043',
    short: "Agent Très Qualifié de Service : haut technicité (bionettoyage médical, décontamination, hauteur).",
    long: "L'ATQS (Agent Très Qualifié de Service) est un niveau premium de la grille IDCC 3043, réservé aux agents avec une qualification reconnue (CQP, certifications) ou une technicité particulière : bionettoyage hospitalier, salle propre ESD, décapage, vitrerie en hauteur. Salaire brut 2026 : 14,50 à 17 €/h selon échelon.",
  },
  {
    slug: 'mp1',
    term: 'MP1 à MP5',
    aliases: ['Maîtrise propreté', 'MP'],
    category: 'Convention IDCC 3043',
    short: "Maîtrise propreté : niveaux d'encadrement intermédiaire (chefs d'équipe, inspecteurs).",
    long: "Les niveaux MP (Maîtrise Propreté) 1 à 5 couvrent les fonctions d'encadrement intermédiaire entre l'agent et le dirigeant : chef d'équipe (MP1-2), inspecteur (MP3-4), responsable de secteur (MP5). Salaires bruts mensuels 2026 : 1 980 € (MP1) à 2 850 € (MP5) base 35h.",
  },
  {
    slug: 'ce1',
    term: 'CE1 à CE3',
    aliases: ['Cadre Exploitation', 'CE'],
    category: 'Convention IDCC 3043',
    short: "Cadre Exploitation : encadrement supérieur, directeurs d'agence ou de zone.",
    long: "Les niveaux CE (Cadre Exploitation) 1 à 3 concernent les cadres dirigeants opérationnels : responsable d'agence, directeur d'exploitation, directeur régional. Statut cadre (forfait jours possible). Salaires bruts mensuels 2026 : 2 950 € (CE1) à 4 800 € (CE3) base forfait jours.",
  },
  {
    slug: 'article-7',
    term: 'Article 7 (transfert du personnel)',
    aliases: ['Article 7', 'Transfert IDCC 3043'],
    category: 'Convention IDCC 3043',
    short: "Clause d'IDCC 3043 imposant le transfert automatique des agents au repreneur d'un marché de nettoyage (sous conditions).",
    long: "L'article 7 de l'IDCC 3043 (anciennement annexe 7) impose, en cas de perte d'un marché et reprise par un concurrent, le transfert automatique des agents affectés au site repris. Conditions : agent affecté principalement (>30 %) au site depuis 6 mois minimum, en CDI, avec maintien intégral de l'ancienneté, du salaire et des avantages. C'est à la fois une protection des salariés et un risque à anticiper dans tout chiffrage d'appel d'offres avec reprise.",
    related: [{ label: 'Répondre à un appel d\'offres nettoyage', to: '/blog/repondre-appel-offres-nettoyage' }],
  },
  {
    slug: 'prime-panier',
    term: 'Prime de panier',
    aliases: ['Indemnité panier'],
    category: 'Convention IDCC 3043',
    short: "Prime conventionnelle versée à chaque agent travaillant plus de 6h consécutives sur un site. ~7 €/jour en 2026.",
    long: "La prime de panier est versée à chaque agent travaillant 6 heures ou plus consécutives sur un même site, sans possibilité de regagner son domicile pour le repas. Montant 2026 : 6,90 € à 7,30 € selon les avenants régionaux. Non soumise aux cotisations sociales jusqu'à un plafond URSSAF fixé annuellement.",
  },
  {
    slug: 'prime-transport',
    term: 'Prime de transport',
    aliases: ['Indemnité transport'],
    category: 'Convention IDCC 3043',
    short: "Prime conventionnelle pour les déplacements professionnels inter-sites. Revue à la hausse en 2026.",
    long: "La prime de transport (ou indemnité de transport) couvre les déplacements professionnels entre plusieurs sites dans la même journée. Forfait journalier négocié au niveau de l'entreprise, généralement 2 à 5 € selon zone et fréquence. À distinguer du remboursement des transports en commun (50 % obligatoire) et du forfait mobilités durables (vélo, covoiturage).",
    related: [{ label: 'Indemnité transport propreté 2026', to: '/blog/indemnite-transport-proprete-2026' }],
  },
  {
    slug: 'prime-salissure',
    term: 'Prime de salissure',
    category: 'Convention IDCC 3043',
    short: "Prime versée aux agents exposés à des conditions de travail particulièrement salissantes.",
    long: "La prime de salissure est due aux agents exposés à des conditions de travail particulièrement sales : remise en état après chantier, dégorgement de canalisations, intervention en zone industrielle. Montant fixé par accord d'entreprise (généralement 1,50 à 3 €/jour). Cumulable avec la prime de panier.",
  },

  // ─── Métier ──────────────────────────────────────────────────────────
  {
    slug: 'bionettoyage',
    term: 'Bionettoyage',
    category: 'Métier',
    short: "Méthode de nettoyage et désinfection des surfaces en milieu médical, encadrée par protocoles stricts.",
    long: "Le bionettoyage désigne l'ensemble des procédés de nettoyage-désinfection appliqués en milieu médical (hôpitaux, EHPAD, cabinets) pour réduire la contamination bactérienne et virale. Combine 3 étapes obligatoires : pré-nettoyage, désinfection avec biocide validé, rinçage. Protocoles encadrés par les recommandations CCLIN/ARLIN et la norme NF EN 14885. Exige des agents formés (CQP bionettoyage) et un traçage rigoureux (PV de bionettoyage).",
    related: [
      { label: 'Bionettoyage médical : protocoles', to: '/blog/bionettoyage-medical-protocoles' },
      { label: 'Logiciel nettoyage médical', to: '/logiciel-nettoyage-medical-bionettoyage' },
    ],
  },
  {
    slug: 'preuve-passage',
    term: 'Preuve de passage',
    aliases: ['Proof of passage', 'PV passage'],
    category: 'Métier',
    short: "Justificatif que l'agent est bien intervenu sur un site. Combine généralement QR code, photos et signature.",
    long: "La preuve de passage est l'ensemble des éléments tracés qui justifient qu'une intervention de nettoyage a bien eu lieu. Standard moderne : scan d'un QR code site (validation GPS), photos avant/après horodatées, signature client (sur place ou par email). Permet d'éviter les litiges syndic, d'attester en cas d'audit qualité et de justifier la facturation. Devient un argument différenciant fort en appels d'offres syndic et copropriété.",
    related: [{ label: 'Preuve de passage QR + photos', to: '/fonctionnalites/preuve-passage-nettoyage' }],
  },
  {
    slug: 'remise-en-etat',
    term: 'Remise en état',
    aliases: ['REE'],
    category: 'Métier',
    short: "Prestation ponctuelle de nettoyage approfondi après chantier, sinistre ou déménagement.",
    long: "La remise en état (souvent abrégée REE) est une prestation ponctuelle de nettoyage approfondi destinée à rendre un local à son état initial après un événement : fin de chantier, sinistre (dégât des eaux, incendie), déménagement, événement avec dégradations. Tarifée au m² ou au forfait (généralement 3 à 6 fois le tarif d'entretien courant). Marge brute supérieure mais saisonnière.",
  },
  {
    slug: 'vitrerie',
    term: 'Vitrerie',
    category: 'Métier',
    short: "Nettoyage des vitres et surfaces vitrées. Souvent en hauteur (nacelle, perche).",
    long: "La vitrerie regroupe le nettoyage des vitres, baies, vérandas et surfaces vitrées. Distinguer vitrerie accessible (escabeau, perche télescopique jusqu'à 6m) et vitrerie en hauteur (nacelle, cordiste). La vitrerie en hauteur requiert habilitations spécifiques (travail en hauteur, CACES nacelles). Tarif au m² souvent 2 à 4 fois supérieur à l'entretien courant.",
  },
  {
    slug: 'decapage',
    term: 'Décapage',
    category: 'Métier',
    short: "Procédé d'élimination en profondeur des couches d'émulsion sur sols durs (PVC, lino, marbre).",
    long: "Le décapage est un procédé mécanique-chimique d'élimination des couches d'émulsion et de saleté incrustée sur les sols durs (PVC, lino, marbre, granito). Exige une monobrosse avec disque adapté, un produit décapant (alcalin), une autolaveuse pour rincer, et idéalement une remise en émulsion ensuite. Compétence spécialisée valorisée en grille IDCC 3043 (passe en AS2 ou AS3).",
  },
  {
    slug: 'monobrosse',
    term: 'Monobrosse',
    category: 'Métier',
    short: "Machine motorisée pour décaper, lustrer ou shamponner les sols. Diamètre 17 à 25 pouces.",
    long: "La monobrosse est une machine motorisée à brosse unique rotative (rouge pour décaper, noir pour décapage agressif, blanc pour lustrer, beige pour spray) utilisée pour traiter les sols durs et moquettes. Diamètres standards : 17, 20 ou 25 pouces. Investissement neuf : 800 à 1 800 €. C'est l'outil de base pour les prestations de décapage et lustrage.",
  },
  {
    slug: 'autolaveuse',
    term: 'Autolaveuse',
    category: 'Métier',
    short: "Machine combinant brossage, eau savonneuse et aspiration pour le nettoyage des grandes surfaces dures.",
    long: "L'autolaveuse est une machine qui combine en un passage : dépose d'eau savonneuse, brossage rotatif, aspiration de l'eau sale. Disponible en version poussée (compact, 35 à 50 cm de largeur) ou autoportée (grandes surfaces > 1000 m²). Utilisée pour le nettoyage quotidien des sols durs en tertiaire, grandes surfaces, parkings. Investissement : 1 500 € (compact) à 8 000 € (autoportée).",
  },

  // ─── Commercial / Marchés ───────────────────────────────────────────
  {
    slug: 'cctp',
    term: 'CCTP',
    aliases: ['Cahier des Clauses Techniques Particulières'],
    category: 'Commercial',
    short: "Cahier des Clauses Techniques Particulières : document du DCE qui définit les prestations attendues, fréquences et surfaces.",
    long: "Le CCTP (Cahier des Clauses Techniques Particulières) est l'un des trois documents principaux du DCE (Dossier de Consultation des Entreprises) d'un appel d'offres. Il décrit en détail les locaux, surfaces, prestations attendues, fréquences, méthodes imposées et matériel requis. C'est le document à étudier en priorité pour chiffrer correctement.",
    related: [{ label: 'Répondre à un appel d\'offres nettoyage', to: '/blog/repondre-appel-offres-nettoyage' }],
  },
  {
    slug: 'ccap',
    term: 'CCAP',
    aliases: ['Cahier des Clauses Administratives Particulières'],
    category: 'Commercial',
    short: "Cahier des Clauses Administratives : conditions contractuelles (durée, paiement, pénalités, révision de prix).",
    long: "Le CCAP (Cahier des Clauses Administratives Particulières) précise les conditions contractuelles d'un marché : durée, modalités de paiement (généralement 30 ou 45 jours), pénalités de retard, indice de révision de prix (FEP ou autre), clauses de résiliation. À lire avec attention : un CCAP trop favorable au donneur d'ordre peut rendre un marché toxique.",
  },
  {
    slug: 'rc-consultation',
    term: 'RC (Règlement de Consultation)',
    aliases: ['Règlement de Consultation'],
    category: 'Commercial',
    short: "Document qui définit les critères de notation et leur pondération dans un appel d'offres.",
    long: "Le RC (Règlement de Consultation) est le document qui définit les règles du jeu d'un appel d'offres : critères de notation, pondération, modalités de remise des offres, date limite. C'est le document clé pour calibrer sa réponse : un marché noté 60 % prix / 40 % valeur technique ne se traite pas comme un 40/60. À lire en premier.",
  },
  {
    slug: 'boamp',
    term: 'BOAMP',
    aliases: ['Bulletin Officiel des Annonces des Marchés Publics'],
    category: 'Commercial',
    short: "Bulletin Officiel des Annonces des Marchés Publics — plateforme officielle de publication des marchés publics français.",
    long: "Le BOAMP (Bulletin Officiel des Annonces des Marchés Publics) est la plateforme officielle française de publication des marchés publics. Pour les marchés de nettoyage > 40 000 €, la publication au BOAMP est obligatoire. Complété par marches-publics.gouv.fr (PLACE) et les profils acheteurs des collectivités (AWS-Achat, e-marchespublics).",
    sources: [{ label: "BOAMP officiel", url: 'https://www.boamp.fr' }],
  },
  {
    slug: 'memoire-technique',
    term: 'Mémoire technique',
    category: 'Commercial',
    short: "Document de réponse à un appel d'offres décrivant comment la prestation sera exécutée.",
    long: "Le mémoire technique est le document central de toute réponse à un appel d'offres nettoyage. Il décrit COMMENT la prestation sera exécutée : organisation, encadrement, méthodes, matériel et produits, contrôle qualité, preuve de passage, RSE, continuité de service. Pèse fréquemment 40 à 60 % de la note finale, à égalité ou plus que le prix.",
  },

  // ─── Financier ──────────────────────────────────────────────────────
  {
    slug: 'cout-horaire-charge',
    term: 'Coût horaire chargé',
    aliases: ['CHC'],
    category: 'Financier',
    short: "Coût total d'une heure d'agent toutes charges comprises : salaire brut + charges patronales + primes + coûts indirects.",
    long: "Le coût horaire chargé (CHC) est le vrai coût d'une heure d'agent pour l'employeur. Décomposition typique 2026 pour un AS1 : salaire brut 11,99 € + charges patronales ~42 % + congés payés 10 % + primes (panier, transport, salissure) 1-1,50 € = coût direct 19-20 €/h. Coût complet en intégrant absentéisme, encadrement, matériel et frais de structure : 21-23 €/h.",
    related: [{ label: 'Coût horaire chargé agent nettoyage 2026', to: '/blog/cout-horaire-charge-agent-nettoyage' }],
  },
  {
    slug: 'marge-brute',
    term: 'Marge brute',
    category: 'Financier',
    short: "CA d'un contrat moins les coûts directs (main-d'œuvre + consommables + déplacements).",
    long: "La marge brute d'un contrat de nettoyage = CA HT − coûts directs (main-d'œuvre × CHC + consommables + déplacements). Cible standard en propreté B2B : 25-35 %. En dessous de 20 %, le contrat devient fragile (absences, hausses de charges). Au-dessus de 40 %, soit le contrat est sous-utilisé soit le prix est trop élevé pour la concurrence.",
    related: [{ label: 'Simulateur rentabilité contrat', to: '/simulateur-rentabilite' }],
  },
  {
    slug: 'marge-nette',
    term: 'Marge nette',
    category: 'Financier',
    short: "Marge brute moins la quote-part de frais de structure (encadrement, locaux, marketing, gestion).",
    long: "La marge nette = marge brute − quote-part frais de structure (encadrement, locaux, comptabilité, marketing, direction). Cible standard en propreté B2B : 12-18 %. Permet de juger la rentabilité réelle d'un contrat une fois tous les coûts pris en compte. C'est l'indicateur de pilotage le plus important pour un dirigeant.",
  },
  {
    slug: 'quote-part-structure',
    term: 'Quote-part frais de structure',
    aliases: ['QP', 'Frais de structure'],
    category: 'Financier',
    short: "Part de chaque contrat affectée à la couverture des frais généraux de l'entreprise.",
    long: "La quote-part frais de structure est la fraction des coûts généraux (encadrement, locaux, comptabilité, marketing, dirigeant) répartie sur chaque contrat. Calculée généralement comme un pourcentage du CA (10-15 % en TPE/PME) ou des heures vendues. À intégrer dans tout devis : sous-estimer ce poste est la cause n°1 de contrats apparemment rentables qui ne le sont pas.",
  },
  {
    slug: 'factur-x',
    term: 'Factur-X',
    category: 'Conformité 2026',
    short: "Format de facture électronique mixte (PDF/A-3 + XML structuré) — norme française obligatoire dès 2027 pour les grandes entreprises.",
    long: "Factur-X est le format de facture électronique mixte adopté par la France et l'Allemagne (équivalent ZUGFeRD). Combine un PDF/A-3 lisible humainement et un XML structuré lisible par les machines. Devient obligatoire dès le 1er septembre 2026 pour les grandes entreprises (réception), puis pour les ETI/PME progressivement jusqu'en 2027. Implique une mise en conformité du logiciel de facturation et l'utilisation d'une PDP (Plateforme de Dématérialisation Partenaire).",
    related: [{ label: 'Intégrations Factur-X', to: '/integrations' }],
  },
  {
    slug: 'chorus-pro',
    term: 'Chorus Pro',
    category: 'Conformité 2026',
    short: "Plateforme officielle de l'État pour le dépôt des factures électroniques aux marchés publics.",
    long: "Chorus Pro est la plateforme officielle gérée par l'État français pour la réception des factures électroniques destinées aux entités publiques (collectivités, État, hôpitaux). Obligatoire pour facturer un marché public, quel que soit le montant. Format accepté : Factur-X ou UBL/CII. Les éditeurs proposent une intégration directe pour éviter le téléversement manuel.",
    sources: [{ label: "Chorus Pro officiel", url: 'https://chorus-pro.gouv.fr' }],
  },
  {
    slug: 'pdp',
    term: 'PDP (Plateforme de Dématérialisation Partenaire)',
    aliases: ['Plateforme de Dématérialisation Partenaire'],
    category: 'Conformité 2026',
    short: "Plateforme privée enregistrée par l'État pour transmettre les factures électroniques entre entreprises dès 2027.",
    long: "Les PDP (Plateformes de Dématérialisation Partenaires) sont des prestataires privés enregistrés par la DGFiP pour transmettre les factures électroniques entre entreprises dans le cadre de la réforme 2027. Chaque entreprise devra choisir une PDP (gratuite ou payante) ou utiliser le portail public PPF. La liste officielle des PDP enregistrées est tenue par la DGFiP.",
  },

  // ─── Hygiène & sécurité ─────────────────────────────────────────────
  {
    slug: 'haccp',
    term: 'HACCP',
    aliases: ['Hazard Analysis Critical Control Point'],
    category: 'Hygiène & sécurité',
    short: "Méthode d'analyse des risques sanitaires utilisée en cuisines, restauration et agroalimentaire.",
    long: "HACCP (Hazard Analysis Critical Control Point) est une méthode systématique d'analyse et de maîtrise des risques sanitaires, obligatoire en restauration, agroalimentaire et collectivités. Pour les sociétés de nettoyage intervenant dans ces locaux : connaissance des protocoles, agents formés, traçabilité des produits désinfectants, séparation des matériels par zone (cuisine / sanitaire / sol).",
  },
  {
    slug: 'cmr',
    term: 'Produits CMR',
    aliases: ['Cancérigène, Mutagène, Reprotoxique'],
    category: 'Hygiène & sécurité',
    short: "Produits chimiques classés cancérigènes, mutagènes ou reprotoxiques. Soumis à traçabilité stricte.",
    long: "Les produits CMR (Cancérigènes, Mutagènes, Reprotoxiques) sont des produits chimiques classés par le règlement CLP (Classification, Labelling, Packaging) et listés à l'arrêté du 5 janvier 1993. Pour les sociétés de nettoyage : substitution obligatoire si possible, formation des agents, EPI spécifiques, traçabilité (registre de produits + fiches de données de sécurité), surveillance médicale renforcée. Certains désinfectants hospitaliers en contiennent.",
  },
  {
    slug: 'document-unique',
    term: 'Document Unique (DUERP)',
    aliases: ['DUERP', 'DU'],
    category: 'Réglementaire',
    short: "Document obligatoire évaluant les risques professionnels dans l'entreprise. À mettre à jour annuellement.",
    long: "Le Document Unique d'Évaluation des Risques Professionnels (DUERP) est obligatoire pour toute entreprise dès le 1er salarié. Il évalue les risques par poste de travail (chutes, TMS, exposition produits, agressions) et propose un plan d'action. Mise à jour annuelle obligatoire et à chaque changement majeur. Sanction en cas d'absence : 1 500 € (3 000 € en récidive) + responsabilité aggravée en cas d'accident.",
  },
  {
    slug: 'plan-prevention',
    term: 'Plan de prévention',
    category: 'Réglementaire',
    short: "Document obligatoire pour toute intervention sur le site d'un client tiers. Définit les risques communs et les mesures.",
    long: "Le plan de prévention est un document obligatoire dès qu'une entreprise extérieure intervient sur le site d'un client tiers (presque toujours en propreté B2B). Il liste les risques communs entre les activités des deux entreprises et les mesures de prévention. Obligatoire avant le démarrage. Sa rédaction est partagée entre l'entreprise utilisatrice (le client) et l'entreprise intervenante (le prestataire nettoyage).",
  },

  // ─── Technique / Métier moderne ────────────────────────────────────
  {
    slug: 'qr-code-site',
    term: 'QR code site',
    category: 'Technique',
    short: "Étiquette QR fixée sur un site, scannée par l'agent à l'arrivée et au départ pour tracer le passage.",
    long: "Le QR code site est une étiquette autocollante fixée à un point de référence d'un site (entrée, local technique). L'agent le scanne avec son smartphone à l'arrivée et au départ via une application web ou native. Permet de générer une preuve de passage avec horodatage, géolocalisation et identification automatique du site. Fait partie intégrante du standard moderne de preuve de passage.",
  },
  {
    slug: 'pointage-gps',
    term: 'Pointage GPS',
    category: 'Technique',
    short: "Validation de présence d'un agent sur site par géolocalisation, en complément du badge ou QR.",
    long: "Le pointage GPS valide la présence physique d'un agent sur un site en captant ses coordonnées GPS au moment du pointage. Lutte contre la fraude (badgeuse à distance, scan QR par un tiers). Sa mise en place doit respecter le RGPD : information préalable des salariés, finalité limitée au pointage, durée de conservation limitée.",
    related: [{ label: 'Pointage GPS agents nettoyage', to: '/fonctionnalites/pointage-agents-nettoyage' }],
  },
  {
    slug: 'fep',
    term: 'FEP',
    aliases: ['Fédération des Entreprises de Propreté'],
    category: 'Métier',
    short: "Fédération nationale des entreprises de propreté en France. Publie l'indice de révision des prix.",
    long: "La FEP (Fédération des Entreprises de Propreté) est l'organisation patronale du secteur. Elle représente les entreprises de propreté au niveau national, publie l'indice de révision des prix utilisé dans les contrats, organise les CQP (Certificats de Qualification Professionnelle) et anime des observatoires métier. Adhésion volontaire mais l'indice FEP est largement utilisé dans les marchés.",
    sources: [{ label: "FEP officiel", url: 'https://www.monde-proprete.com' }],
  },

  // ─── Réglementaire général ─────────────────────────────────────────
  {
    slug: 'rgpd',
    term: 'RGPD',
    aliases: ['Règlement Général sur la Protection des Données'],
    category: 'Réglementaire',
    short: "Règlement européen 2016/679 encadrant le traitement des données personnelles.",
    long: "Le RGPD (Règlement Général sur la Protection des Données, UE 2016/679) est entré en application en mai 2018. Pour une société de nettoyage, il s'applique au traitement des données des salariés (paie, géolocalisation, vidéosurveillance) et des contacts clients (CRM). Obligations principales : registre des traitements, base légale identifiée, durée de conservation, droits exerçables (accès, rectification, effacement), sécurité des données, notification de violation.",
    related: [{ label: 'Sécurité & RGPD Proprely', to: '/securite-rgpd' }],
  },
  {
    slug: 'urssaf',
    term: 'URSSAF',
    aliases: ['Union de Recouvrement des Cotisations de Sécurité Sociale et d\'Allocations Familiales'],
    category: 'Réglementaire',
    short: "Organisme collecteur des cotisations sociales en France. Contrôles fréquents en propreté.",
    long: "L'URSSAF (Union de Recouvrement des Cotisations de Sécurité Sociale et d'Allocations Familiales) collecte les cotisations patronales et salariales. Le secteur propreté est particulièrement contrôlé sur : heures complémentaires non déclarées (temps partiels), travail dissimulé, sous-traitance en cascade, respect de la grille IDCC 3043. Le redressement moyen en cas de contrôle dépasse 30 000 € en TPE-PME.",
  },
]

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  'Convention IDCC 3043',
  'Métier',
  'Commercial',
  'Financier',
  'Conformité 2026',
  'Hygiène & sécurité',
  'Réglementaire',
  'Technique',
]

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.slug === slug)
}
