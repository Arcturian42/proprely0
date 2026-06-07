// Comparatifs Proprely vs concurrents (1 page dédiée par concurrent).
// Ton : honnête et factuel, basé sur des informations publiques.
// L'objectif est SEO (capture des requêtes "[concurrent] avis", "[concurrent]
// alternative", "[concurrent] vs Proprely") et conversion (intent commercial
// chaud), pas le dénigrement.

export type ComparisonRow = {
  criterion: string
  proprely: string
  competitor: string
  /** Quel produit "gagne" sur ce critère (utilisé pour styliser la cellule) */
  edge?: 'proprely' | 'competitor' | 'equal'
}

export type ComparisonFAQ = { q: string; a: string }

export type ComparisonPage = {
  slug: string
  /** Nom canonique du concurrent (utilisé dans les titres, breadcrumbs, schemas) */
  competitorName: string
  /** Site officiel du concurrent (pour citation + maillage externe pertinent) */
  competitorUrl?: string
  title: string
  metaTitle: string
  metaDescription: string
  /** Réponse-flash 40-80 mots pour Generative Engines */
  tldr: string
  /** Description courte du concurrent en 1-2 phrases neutres */
  competitorPitch: string
  /** Réponse synthétique : qui choisir selon profil */
  whoChooses: {
    proprely: string[]
    competitor: string[]
  }
  comparisonTable: ComparisonRow[]
  /** Différences clés en 3-5 points argumentés */
  keyDifferences: { title: string; description: string }[]
  faq: ComparisonFAQ[]
}

export const comparisons: ComparisonPage[] = [
  {
    slug: 'proprely-vs-organilog',
    competitorName: 'Organilog',
    competitorUrl: 'https://www.organilog.com',
    title: 'Proprely vs Organilog : comparatif 2026 pour société de nettoyage',
    metaTitle: 'Proprely vs Organilog 2026 : comparatif honnête · Proprely',
    metaDescription: "Comparatif Proprely vs Organilog en 2026 : fonctionnalités, tarifs, mobile, preuve de passage, marge par client. Lequel choisir pour une société de nettoyage B2B française ?",
    tldr: "Organilog est un logiciel multi-métiers (BTP, sécurité, espaces verts, nettoyage…) avec une approche généraliste, tandis que Proprely est conçu exclusivement pour les sociétés de nettoyage B2B françaises. Choisissez Organilog si vous gérez plusieurs métiers en parallèle ; choisissez Proprely si vous voulez un outil avec le vocabulaire, les workflows et la preuve de passage adaptés à la propreté B2B (spécialités agents, marge par client, syndics).",
    competitorPitch: "Organilog est une suite SaaS française multi-métiers de gestion d'interventions, lancée en 2010. Le produit cible les sociétés de services terrain : BTP, sécurité, espaces verts, nettoyage, plomberie, électricité.",
    whoChooses: {
      proprely: [
        "Société de nettoyage B2B exclusivement (3-50 agents)",
        "Besoin d'un vocabulaire et de workflows propreté (sites, agents avec spécialités vitrerie/moquette/décapage, preuve de passage syndic)",
        "Recherche un cockpit avec marge par client en temps réel",
        "Onboarding accompagné 30 min par le fondateur",
        "Hébergement européen, RGPD, conçu en France",
      ],
      competitor: [
        "Société multi-métiers (BTP + nettoyage, sécurité + nettoyage, etc.)",
        "Besoin d'une suite généraliste paramétrable",
        "Volume important d'interventions ponctuelles (>500/mois)",
        "Acceptation d'une courbe d'apprentissage plus longue",
      ],
    },
    comparisonTable: [
      { criterion: "Spécialisation métier", proprely: "100 % propreté B2B", competitor: "Multi-métiers (généraliste)", edge: 'proprely' },
      { criterion: "Spécialités agents (vitrerie, moquette, décapage)", proprely: "Natif", competitor: "À paramétrer", edge: 'proprely' },
      { criterion: "Preuve de passage (QR + photos + signature)", proprely: "Standardisée, format syndic", competitor: "Disponible, à configurer", edge: 'proprely' },
      { criterion: "Marge par client en temps réel", proprely: "Natif", competitor: "Reporting BI à paramétrer", edge: 'proprely' },
      { criterion: "Application mobile agent", proprely: "Lien web, pas d'installation", competitor: "App native (Android/iOS)", edge: 'competitor' },
      { criterion: "Mode hors-ligne", proprely: "Oui (sync auto)", competitor: "Oui", edge: 'equal' },
      { criterion: "Devis & factures", proprely: "Natif, signature électronique", competitor: "Module dédié", edge: 'equal' },
      { criterion: "Convention collective IDCC 3043", proprely: "Conformité grille salaires intégrée", competitor: "Paramétrage manuel", edge: 'proprely' },
      { criterion: "Tarification (TPE/PME B2B 5-15 agents)", proprely: "Gratuit pendant la bêta, tarif fondateur à vie", competitor: "À partir de ~25 €/utilisateur/mois (selon devis)", edge: 'proprely' },
      { criterion: "Onboarding", proprely: "30 min avec le fondateur", competitor: "Tutoriels + support email", edge: 'proprely' },
      { criterion: "Hébergement", proprely: "Union européenne, RGPD", competitor: "France/UE", edge: 'equal' },
      { criterion: "Export données 1-clic", proprely: "Oui (CSV/Excel)", competitor: "Oui", edge: 'equal' },
    ],
    keyDifferences: [
      {
        title: "Spécialisation métier vs généralisme",
        description: "Organilog est conçu comme une suite générique multi-métiers. Vous paramétrez le vocabulaire (interventions, prestations, ressources). Proprely impose les concepts métier propreté : sites clients, agents avec spécialités, missions récurrentes, preuve de passage syndic. Moins flexible, mais plus rapide à prendre en main quand vous êtes 100 % nettoyage.",
      },
      {
        title: "Marge par client : natif vs reporting",
        description: "Proprely affiche la marge par client en temps réel sur le dashboard (CA contrat vs coût horaire chargé × heures réelles). Organilog dispose d'un module reporting/BI où la marge se construit comme un rapport à configurer. Si vous voulez piloter la rentabilité au quotidien sans configurer un BI, c'est un écart structurel.",
      },
      {
        title: "Preuve de passage : standardisée vs configurable",
        description: "Proprely propose un format de preuve de passage standardisé (QR + photos avant/après + signature + horodatage) accepté tel quel par les principaux syndics nationaux et facility managers. Organilog permet de configurer la preuve d'intervention à votre charte. Plus flexible, mais nécessite un paramétrage initial.",
      },
      {
        title: "Tarification",
        description: "Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices) et le tarif fondateur est conservé à vie après le lancement public. Organilog propose des forfaits par utilisateur/mois (~25 € à partir de 2026 selon devis), avec engagement annuel pour les tarifs préférentiels.",
      },
    ],
    faq: [
      { q: "Quelle est la différence principale entre Proprely et Organilog ?", a: "Proprely est conçu exclusivement pour les sociétés de nettoyage B2B françaises (vocabulaire, workflows, preuve de passage syndic, marge par client). Organilog est une suite multi-métiers (BTP, sécurité, espaces verts, nettoyage…) plus flexible mais qu'il faut paramétrer pour le métier propreté." },
      { q: "Organilog est-il moins cher que Proprely ?", a: "Pendant la bêta privée, Proprely est gratuit. Organilog facture à partir d'~25 €/utilisateur/mois (selon devis et engagement). À volume égal (5 utilisateurs), Proprely est nettement moins cher pendant la bêta et reste compétitif ensuite avec le tarif fondateur à vie." },
      { q: "Peut-on migrer d'Organilog vers Proprely ?", a: "Oui. Organilog permet l'export des données (clients, sites, interventions) au format CSV/Excel. Pendant l'onboarding Proprely (30 minutes avec le fondateur), nous importons vos fichiers et reconstituons votre organisation : clients, sites, agents, fréquences." },
      { q: "Qui choisit Organilog plutôt que Proprely ?", a: "Les sociétés qui exercent plusieurs métiers en parallèle (nettoyage + BTP, nettoyage + espaces verts, etc.) ont intérêt à un outil multi-métiers comme Organilog. Les sociétés exclusivement nettoyage B2B bénéficient davantage d'un outil spécialisé comme Proprely." },
      { q: "Proprely a-t-il une application mobile native comme Organilog ?", a: "Non, Proprely propose un lien web mobile-first que les agents ouvrent dans leur navigateur. Pas d'installation, pas de mise à jour à pousser, fonctionne sur 4G capricieuse. Organilog propose une app native Android/iOS. Les deux approches ont leurs avantages : web = zéro friction, native = expérience plus aboutie hors-ligne." },
      { q: "Proprely et Organilog sont-ils tous les deux conformes RGPD ?", a: "Oui, les deux acteurs sont français/européens et conformes RGPD. Proprely héberge en UE, chiffrement en transit et au repos, export 1-clic. Organilog héberge en France/UE également." },
    ],
  },
  {
    slug: 'proprely-vs-progiclean',
    competitorName: 'Progiclean',
    competitorUrl: 'https://www.progiclean.com',
    title: 'Proprely vs Progiclean : comparatif 2026 pour société de nettoyage',
    metaTitle: 'Proprely vs Progiclean 2026 : comparatif honnête · Proprely',
    metaDescription: "Comparatif Proprely vs Progiclean en 2026 : fonctionnalités, tarifs, ergonomie, mobile, RGPD. Lequel choisir pour une société de nettoyage B2B française ?",
    tldr: "Progiclean est un ERP propreté historique du marché français, conçu pour les sociétés de nettoyage à fort volume (>50 agents, multi-établissements). Proprely cible les TPE/PME B2B (3-50 agents) avec un cockpit unifié plus léger, mobile-first, et un onboarding accompagné en 30 minutes. Choisissez Progiclean si vous êtes une PME structurée à fort volume ; Proprely si vous êtes une TPE/PME qui veut un outil rapide à déployer.",
    competitorPitch: "Progiclean est un ERP métier français dédié aux entreprises de propreté, présent sur le marché depuis les années 2000. Le produit cible historiquement les ETI et grandes PME du secteur, avec un périmètre fonctionnel large (devis, planning, paie, GED, qualité).",
    whoChooses: {
      proprely: [
        "TPE/PME B2B (3-50 agents)",
        "Recherche un outil rapide à déployer (30 min onboarding)",
        "Priorité au mobile-first pour les agents (lien web, pas d'app à installer)",
        "Pilotage par la marge client en temps réel",
        "Hébergement européen pur cloud, RGPD natif",
      ],
      competitor: [
        "PME ou ETI structurée (>50 agents, multi-établissements)",
        "Besoin d'un ERP large couvrant paie, GED, qualité, achats",
        "Capacité d'investir 4-8 semaines en paramétrage et formation",
        "Préférence pour un éditeur historique du marché propreté français",
      ],
    },
    comparisonTable: [
      { criterion: "Cible principale", proprely: "TPE/PME B2B 3-50 agents", competitor: "PME/ETI >50 agents", edge: 'equal' },
      { criterion: "Périmètre fonctionnel", proprely: "Cockpit unifié (planning, devis, agents, preuve, marge)", competitor: "ERP large (+ paie, GED, qualité, achats)", edge: 'equal' },
      { criterion: "Temps d'onboarding", proprely: "30 minutes avec le fondateur", competitor: "4-8 semaines (intégrateur)", edge: 'proprely' },
      { criterion: "Mobile-first agent", proprely: "Lien web, pas d'installation", competitor: "App native", edge: 'proprely' },
      { criterion: "Preuve de passage standardisée", proprely: "Natif (QR + photos + signature)", competitor: "Module qualité", edge: 'proprely' },
      { criterion: "Marge par client temps réel", proprely: "Sur dashboard d'accueil", competitor: "Module reporting/BI", edge: 'proprely' },
      { criterion: "Paie intégrée", proprely: "Export pour comptable / Silae", competitor: "Module paie intégré", edge: 'competitor' },
      { criterion: "GED (documents)", proprely: "Documents centralisés par client/site", competitor: "Module GED complet", edge: 'competitor' },
      { criterion: "Tarification (TPE 5 agents)", proprely: "Gratuit bêta, tarif fondateur à vie", competitor: "Devis sur mesure, ~plusieurs k€ setup + abonnement", edge: 'proprely' },
      { criterion: "Hébergement", proprely: "Pur cloud UE", competitor: "Cloud / on-premise selon contrat", edge: 'equal' },
      { criterion: "Ergonomie", proprely: "Interface moderne 2025-2026", competitor: "Interface mature (datée selon avis)", edge: 'proprely' },
      { criterion: "Export données 1-clic", proprely: "Oui (CSV/Excel)", competitor: "Export disponible (process)", edge: 'proprely' },
    ],
    keyDifferences: [
      {
        title: "TPE/PME vs PME/ETI : deux marchés différents",
        description: "Progiclean a historiquement structuré son produit pour les PME et ETI du secteur (>50 agents, plusieurs établissements, structure paie/RH/qualité internalisée). Proprely a fait le choix inverse : cibler les TPE/PME (3-50 agents) qui veulent un cockpit léger, rapide à déployer, sans avoir besoin d'un intégrateur. Si vous êtes >50 agents avec une vraie structure interne, Progiclean est plus aligné. Si vous êtes 3-30 agents, Proprely est plus rapide à déployer.",
      },
      {
        title: "30 minutes vs 4-8 semaines d'onboarding",
        description: "Le déploiement de Progiclean prend typiquement 4 à 8 semaines (paramétrage par un intégrateur, formation des équipes, import des données). Proprely se déploie en 30 minutes lors d'un appel avec le fondateur : sites, agents, fréquences configurés ensemble. C'est une question de profondeur fonctionnelle (ERP vs cockpit) mais aussi de cible (TPE vs PME).",
      },
      {
        title: "Ergonomie : héritage vs design 2025-2026",
        description: "Progiclean est sur le marché depuis ~15-20 ans. Son interface a évolué mais conserve un héritage 'logiciel métier' que certains utilisateurs trouvent dense. Proprely a été conçu en 2025 avec les codes design contemporains (interface aérée, mobile-first, dashboard synthétique). Pour une équipe jeune ou des agents intergénérationnels, c'est un facteur d'adoption important.",
      },
      {
        title: "Tarification",
        description: "Progiclean fonctionne sur devis sur mesure (souvent plusieurs milliers d'euros de setup + abonnement annuel) — adapté à des budgets PME/ETI. Proprely est gratuit pendant la bêta privée pour 30 sociétés fondatrices, avec tarif fondateur conservé à vie après le lancement public. Cible budget différente.",
      },
    ],
    faq: [
      { q: "Quelle est la différence principale entre Proprely et Progiclean ?", a: "Progiclean est un ERP métier mature pour PME/ETI (>50 agents) avec un périmètre large (paie, GED, qualité, achats) et un déploiement de 4-8 semaines. Proprely est un cockpit léger pour TPE/PME (3-50 agents) avec un focus opérationnel (planning, devis, agents, preuve, marge) et un déploiement en 30 minutes." },
      { q: "Progiclean est-il plus complet que Proprely ?", a: "Sur le périmètre ERP (paie, GED, qualité, achats), oui. Sur le périmètre opérationnel (planning, devis, agents, preuve de passage, marge), les deux sont comparables avec un avantage Proprely sur l'ergonomie mobile et la marge temps réel." },
      { q: "Combien coûte Progiclean ?", a: "Progiclean fonctionne sur devis sur mesure, généralement plusieurs milliers d'euros de setup + un abonnement annuel selon le nombre d'utilisateurs et de modules. Le ticket d'entrée est conçu pour des PME/ETI." },
      { q: "Peut-on passer de Progiclean à Proprely ?", a: "Oui pour la partie opérationnelle (planning, clients, sites, agents). Si vous utilisez le module paie ou GED de Progiclean, vous garderez probablement une solution externe pour ces fonctions (Silae, Cegid, etc.). Les données opérationnelles s'importent au format CSV/Excel pendant l'onboarding Proprely." },
      { q: "Proprely a-t-il vocation à devenir un ERP complet comme Progiclean ?", a: "Non. Proprely a fait le choix de rester un cockpit opérationnel pur (planning, agents, preuve, marge) en s'intégrant aux solutions spécialisées (paie : Silae, comptabilité : Sage/Cegid, GED : Drive/SharePoint). C'est un parti pris : faire bien le métier propreté, plutôt que faire moyen partout." },
      { q: "L'interface de Progiclean est-elle facile à prendre en main ?", a: "Progiclean est un produit mature avec une interface dense (héritage 15-20 ans). Les utilisateurs expérimentés en sont satisfaits, mais la prise en main demande typiquement plusieurs jours de formation. Proprely vise une prise en main en 30 minutes avec une interface conçue en 2025." },
    ],
  },
  {
    slug: 'proprely-vs-propret',
    competitorName: 'PROPRET',
    competitorUrl: 'https://www.propret.com',
    title: 'Proprely vs PROPRET : comparatif 2026 pour société de nettoyage',
    metaTitle: 'Proprely vs PROPRET 2026 : comparatif honnête · Proprely',
    metaDescription: "Comparatif Proprely vs PROPRET en 2026 : fonctionnalités, tarifs, ergonomie, mobile, marge par client. Lequel choisir pour une société de nettoyage B2B française ?",
    tldr: "PROPRET est un éditeur historique du marché français des logiciels propreté, présent depuis les années 1990, avec une base installée importante chez les PME du secteur. Proprely est un cockpit nouvelle génération (2025-2026) conçu mobile-first pour les TPE/PME B2B. Choisissez PROPRET si vous êtes une PME établie qui valorise un éditeur historique. Choisissez Proprely si vous voulez une interface 2026, mobile-first, déployable en 30 minutes.",
    competitorPitch: "PROPRET est un logiciel de gestion pour entreprises de propreté édité depuis les années 1990 en France. Le produit est historiquement présent chez les PME du secteur, avec un périmètre couvrant devis, planning, suivi qualité et facturation.",
    whoChooses: {
      proprely: [
        "TPE/PME B2B (3-50 agents) qui veut un outil moderne",
        "Mobile-first prioritaire (lien web, pas d'installation)",
        "Marge par client en temps réel sur le dashboard",
        "Onboarding accompagné 30 min par le fondateur",
        "Hébergement européen pur cloud, RGPD natif",
      ],
      competitor: [
        "PME établie qui valorise un éditeur historique du secteur",
        "Préférence pour une solution éprouvée par 20+ ans de retours terrain",
        "Acceptation d'une interface mature (parfois jugée datée par les jeunes équipes)",
        "Base installée syndics / facility managers qui connaissent déjà PROPRET",
      ],
    },
    comparisonTable: [
      { criterion: "Ancienneté du produit", proprely: "Lancé en 2025-2026 (nouvelle génération)", competitor: "Marché depuis les années 1990 (éditeur historique)", edge: 'equal' },
      { criterion: "Interface", proprely: "Design 2025-2026 (aérée, mobile-first)", competitor: "Interface mature (densité fonctionnelle élevée)", edge: 'proprely' },
      { criterion: "Mobile agent", proprely: "Lien web, pas d'installation", competitor: "App mobile dédiée", edge: 'proprely' },
      { criterion: "Mode hors-ligne", proprely: "Oui (sync auto)", competitor: "Oui", edge: 'equal' },
      { criterion: "Preuve de passage standardisée", proprely: "Natif (QR + photos + signature)", competitor: "Module disponible", edge: 'equal' },
      { criterion: "Marge par client temps réel", proprely: "Sur dashboard d'accueil", competitor: "Reporting à configurer", edge: 'proprely' },
      { criterion: "Devis & facturation", proprely: "Natif, signature électronique", competitor: "Module complet (mature)", edge: 'equal' },
      { criterion: "Suivi qualité (audits, contrôles)", proprely: "Preuve de passage + historique", competitor: "Module qualité dédié", edge: 'competitor' },
      { criterion: "Tarification (TPE 5 agents)", proprely: "Gratuit bêta, tarif fondateur à vie", competitor: "Devis sur mesure", edge: 'proprely' },
      { criterion: "Temps d'onboarding", proprely: "30 minutes avec le fondateur", competitor: "Plusieurs jours à plusieurs semaines", edge: 'proprely' },
      { criterion: "Hébergement", proprely: "Pur cloud UE", competitor: "Cloud / on-premise", edge: 'equal' },
      { criterion: "Export données 1-clic", proprely: "Oui (CSV/Excel)", competitor: "Export disponible", edge: 'equal' },
    ],
    keyDifferences: [
      {
        title: "Génération produit : 1990s vs 2025-2026",
        description: "PROPRET est un éditeur historique du marché propreté français, avec ~30 ans de présence et une base installée importante. Cette maturité est un avantage (fonctionnalités éprouvées, retours terrain accumulés) mais aussi un coût technologique (interface héritage, intégrations cloud parfois moins natives). Proprely est conçu en 2025 avec les standards contemporains (pur cloud, mobile-first, API). Selon votre génération d'équipe et votre vision technique, c'est un facteur structurant.",
      },
      {
        title: "Mobile : app native vs lien web",
        description: "PROPRET propose une application mobile native dédiée pour les agents (Android/iOS). Proprely a fait le choix d'un lien web mobile-first : chaque agent reçoit un lien qu'il ouvre dans son navigateur, pas d'installation, pas de mise à jour à pousser. Les deux approches sont valides : app native = expérience plus aboutie hors-ligne ; lien web = zéro friction d'adoption, fonctionne sur tous les téléphones, y compris vieux modèles ou téléphones partagés.",
      },
      {
        title: "Marge par client : natif vs reporting",
        description: "Proprely affiche la marge par client en temps réel sur le dashboard d'accueil (CA contrat vs coût horaire chargé × heures réelles). PROPRET dispose d'un module reporting où la marge se construit comme un rapport périodique. Si vous voulez piloter la rentabilité au quotidien, l'écart est structurel.",
      },
      {
        title: "Tarification et onboarding",
        description: "Proprely est gratuit pendant la bêta privée (30 fondateurs), tarif fondateur conservé à vie, onboarding 30 minutes. PROPRET fonctionne sur devis sur mesure, avec un déploiement typique de plusieurs jours à plusieurs semaines. Profils budget différents.",
      },
    ],
    faq: [
      { q: "Quelle est la différence principale entre Proprely et PROPRET ?", a: "PROPRET est un éditeur historique du marché propreté français (~30 ans de présence), avec une base installée importante chez les PME. Proprely est un cockpit nouvelle génération (2025-2026), conçu mobile-first, avec marge par client en temps réel et onboarding 30 minutes. Maturité vs modernité." },
      { q: "PROPRET est-il plus complet que Proprely ?", a: "Sur le suivi qualité dédié (audits formels, plans d'action qualité), PROPRET dispose d'un module plus complet. Sur les fonctions opérationnelles (planning, devis, preuve, marge), les deux sont comparables avec un avantage Proprely sur la modernité de l'interface et la marge temps réel." },
      { q: "Combien coûte PROPRET ?", a: "PROPRET fonctionne sur devis sur mesure. Le ticket d'entrée varie selon le nombre d'utilisateurs, les modules retenus et le mode de déploiement (cloud ou on-premise). Le modèle est conçu pour des PME établies." },
      { q: "Peut-on migrer de PROPRET vers Proprely ?", a: "Oui pour les données opérationnelles (clients, sites, agents, plannings). L'export PROPRET s'effectue au format CSV/Excel. Pendant l'onboarding Proprely (30 min avec le fondateur), nous importons et reconstituons votre organisation." },
      { q: "Proprely est-il aussi fiable que PROPRET malgré sa nouveauté ?", a: "Proprely est en bêta privée auprès de 30 sociétés fondatrices sélectionnées. La fiabilité technique (hébergement UE, chiffrement, RGPD) est au niveau attendu d'un SaaS B2B 2026. La maturité fonctionnelle est en revanche celle d'un produit jeune : certaines fonctions périphériques (paie intégrée, GED avancée) sont volontairement déléguées à des solutions spécialisées." },
      { q: "L'application mobile PROPRET est-elle un avantage par rapport au lien web Proprely ?", a: "Cela dépend de votre équipe. App native = meilleure expérience hors-ligne et notifications push. Lien web = zéro installation, fonctionne sur n'importe quel téléphone (y compris vieux modèles ou partagés), pas de mise à jour à pousser, mise en route en 30 secondes par agent. Les deux modèles ont leur logique." },
    ],
  },
  {
    slug: 'proprely-vs-2bepragma',
    competitorName: '2BePragma',
    competitorUrl: 'https://www.2bepragma.com',
    title: 'Proprely vs 2BePragma : comparatif 2026 pour société de nettoyage',
    metaTitle: 'Proprely vs 2BePragma 2026 : comparatif honnête · Proprely',
    metaDescription: "Comparatif Proprely vs 2BePragma en 2026 : fonctionnalités, tarifs, mobile, marge par client. Quand passer à l'échelle ? Lequel pour votre société de nettoyage B2B ?",
    tldr: "2BePragma est un éditeur français spécialisé propreté avec une approche métier complète orientée PME structurées. Proprely est un cockpit nouvelle génération (2025-2026) conçu pour les TPE/PME 3-50 agents qui veulent un outil rapide à déployer et mobile-first. Choisissez 2BePragma si vous êtes une PME structurée à fort volume ; Proprely si vous êtes une TPE/PME en croissance qui veut un outil opérationnel léger.",
    competitorPitch: "2BePragma est un éditeur français de logiciels métier pour la propreté, présent sur le marché depuis plusieurs années. Le produit couvre les besoins opérationnels des sociétés de nettoyage B2B (planning, devis, facturation, qualité) avec une orientation PME structurées.",
    whoChooses: {
      proprely: [
        "TPE/PME B2B en croissance (3-50 agents)",
        "Recherche un outil rapide à déployer (30 min onboarding)",
        "Priorité au mobile-first pour les agents (lien web, pas d'app à installer)",
        "Pilotage par la marge client en temps réel",
        "Tarif transparent (gratuit en bêta, tarif fondateur à vie après)",
        "Interface design 2025-2026 aérée",
      ],
      competitor: [
        "PME structurée 30-100+ agents",
        "Besoin d'un module qualité audits formels",
        "Capacité d'investir plusieurs jours en paramétrage et formation",
        "Préférence pour un éditeur métier établi",
        "Volume important d'interventions ponctuelles (>500/mois)",
      ],
    },
    comparisonTable: [
      { criterion: "Cible principale", proprely: "TPE/PME B2B 3-50 agents", competitor: "PME structurée 30-100+ agents", edge: 'equal' },
      { criterion: "Temps d'onboarding", proprely: "30 minutes avec le fondateur", competitor: "Plusieurs jours à semaines (intégrateur)", edge: 'proprely' },
      { criterion: "Mobile agent", proprely: "Lien web, pas d'installation", competitor: "App mobile dédiée", edge: 'proprely' },
      { criterion: "Spécialités agents (vitrerie, moquette, décapage)", proprely: "Natif", competitor: "À paramétrer", edge: 'proprely' },
      { criterion: "Preuve de passage standardisée", proprely: "Natif (QR + photos + signature)", competitor: "Disponible (à configurer)", edge: 'proprely' },
      { criterion: "Marge par client temps réel", proprely: "Natif sur dashboard", competitor: "Module reporting/BI", edge: 'proprely' },
      { criterion: "Devis IA propriétaire", proprely: "Natif (9 facteurs croisés, 3 scénarios)", competitor: "Non (devis classique)", edge: 'proprely' },
      { criterion: "Module qualité audits formels", proprely: "Preuve de passage + historique", competitor: "Module qualité dédié", edge: 'competitor' },
      { criterion: "Convention collective IDCC 3043", proprely: "Conformité grille salaires intégrée", competitor: "Paramétrage manuel", edge: 'proprely' },
      { criterion: "Tarification (TPE 5 agents)", proprely: "Gratuit bêta, tarif fondateur à vie", competitor: "Devis sur mesure", edge: 'proprely' },
      { criterion: "Interface", proprely: "Design 2025-2026 (aérée, mobile-first)", competitor: "Interface mature métier", edge: 'proprely' },
      { criterion: "Hébergement", proprely: "Pur cloud UE", competitor: "Cloud / on-premise selon contrat", edge: 'equal' },
      { criterion: "Export données 1-clic", proprely: "Oui (CSV/Excel)", competitor: "Export disponible (process)", edge: 'proprely' },
    ],
    keyDifferences: [
      {
        title: "TPE/PME en croissance vs PME structurée",
        description: "2BePragma cible historiquement les PME structurées du secteur propreté, avec un périmètre fonctionnel qui s'adresse à des équipes internes RH/qualité/admin dédiées. Proprely a fait le choix de cibler les TPE/PME en croissance (3-50 agents) qui n'ont pas ces équipes internes et veulent un cockpit léger, rapide à déployer. Si vous êtes 30+ agents avec une vraie structure interne, 2BePragma est plus aligné. Si vous êtes 3-30 agents, Proprely est plus rapide à déployer et moins chargé en fonctionnalités non utilisées.",
      },
      {
        title: "30 minutes vs plusieurs jours d'onboarding",
        description: "Le déploiement de 2BePragma demande typiquement plusieurs jours à plusieurs semaines (paramétrage, formation, import des données). Proprely se déploie en 30 minutes lors d'un appel avec le fondateur : sites, agents, fréquences configurés ensemble. C'est une question de profondeur fonctionnelle mais aussi de cible (TPE vs PME structurée).",
      },
      {
        title: "Devis IA propriétaire : un avantage structurel pour Proprely",
        description: "Proprely intègre nativement un module de devis intelligent par IA (algorithme propriétaire qui croise 9 facteurs et propose 3 scénarios optimisés). Sur les retours bêta : +20-35 % de taux de conversion, +2-5 points de marge nette. 2BePragma propose un module devis classique (template + grille tarifaire). Pour une société en phase de structuration commerciale, c'est un facteur de différenciation important.",
      },
      {
        title: "Tarification",
        description: "2BePragma fonctionne sur devis sur mesure, généralement adapté à des budgets PME établies. Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices) avec tarif fondateur conservé à vie. Profils budget différents : Proprely vise les budgets TPE/PME en croissance, 2BePragma les PME structurées.",
      },
    ],
    faq: [
      { q: "Quelle est la différence principale entre Proprely et 2BePragma ?", a: "2BePragma cible les PME structurées (30+ agents) avec un périmètre fonctionnel large nécessitant plusieurs jours de paramétrage. Proprely cible les TPE/PME (3-50 agents) avec un cockpit léger déployable en 30 minutes. Proprely intègre en plus un module de devis IA propriétaire et la marge par client en temps réel sur le dashboard." },
      { q: "Quand basculer de 2BePragma à Proprely (ou inversement) ?", a: "Si vous êtes une TPE/PME en croissance (3-30 agents) et que 2BePragma vous semble lourd ou cher pour vos besoins, basculez vers Proprely. À l'inverse, si vous êtes 50+ agents avec des besoins qualité audits formels, RH/paie internalisée et GED avancée, 2BePragma peut être mieux dimensionné qu'un cockpit léger comme Proprely." },
      { q: "Combien coûte 2BePragma ?", a: "2BePragma fonctionne sur devis sur mesure selon le nombre d'utilisateurs, les modules retenus et le mode de déploiement. Le ticket d'entrée est conçu pour des PME établies, plus élevé qu'un SaaS pur cloud pour TPE." },
      { q: "Peut-on migrer de 2BePragma à Proprely ?", a: "Oui pour les données opérationnelles (clients, sites, agents, plannings). 2BePragma permet l'export au format CSV/Excel. Pendant l'onboarding Proprely (30 min avec le fondateur), nous importons et reconstituons votre organisation." },
      { q: "Proprely a-t-il un module qualité comme 2BePragma ?", a: "Proprely intègre la preuve de passage native (QR + photos + signature + horodatage) et l'historique complet par site. Pour un module qualité plus formel (audits planifiés, plans d'action qualité, scoring), 2BePragma propose une couverture plus large. Selon vos exigences clients (syndics, facility managers), l'écart peut être structurant ou marginal." },
      { q: "Le devis IA de Proprely fonctionne-t-il pour tous les types de prestations ?", a: "Oui pour les prestations récurrentes courantes : bureaux tertiaires, copropriétés, hôtellerie, retail, cabinets médicaux avec bionettoyage, industriel léger. Pour les prestations très spécialisées (salles propres ISO classe 7-8, décontamination amiante), l'IA fournit une estimation de base et propose une revue manuelle." },
    ],
  },
]

export function getComparison(slug: string): ComparisonPage | undefined {
  return comparisons.find((c) => c.slug === slug)
}
