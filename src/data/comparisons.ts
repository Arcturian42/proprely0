export type ComparisonRow = {
  category: string
  competitor: string
  proprely: string
  winner: 'proprely' | 'competitor' | 'tie'
}

export type ComparisonFAQ = { q: string; a: string }

export type ComparisonPage = {
  slug: string
  title: string
  subtitle: string
  metaDescription: string
  keywords: string[]
  competitor: string
  competitorContext: string
  proprelyContext: string
  rows: ComparisonRow[]
  verdict: string
  whenCompetitor: string[]
  whenProprely: string[]
  faq: ComparisonFAQ[]
}

export const comparisons: ComparisonPage[] = [
  {
    slug: 'proprely-vs-excel',
    title: 'Proprely vs Excel : quand un tableur ne suffit plus pour gérer sa société de nettoyage',
    subtitle: "Excel fonctionne jusqu'à 2-3 agents. Au-delà, les frictions explosent. Comparatif honnête sur 10 critères pour savoir quand basculer.",
    metaDescription: "Excel vs Proprely pour gérer une société de nettoyage : 10 critères comparés. Calcul heures, planning, devis, preuve de passage, marge par client, RGPD. Verdict objectif.",
    keywords: ['proprely vs excel', 'excel société nettoyage', 'alternative excel nettoyage', 'logiciel nettoyage vs tableur'],
    competitor: 'Excel',
    competitorContext: "Excel est l'outil par défaut pour 80% des sociétés de nettoyage de moins de 10 agents. Gratuit (ou inclus dans la suite Office), maîtrisé par tout le monde, infiniment configurable. Mais conçu pour la modélisation, pas pour le pilotage opérationnel quotidien.",
    proprelyContext: "Proprely est un cockpit métier dédié aux sociétés de nettoyage B2B. Mobile-first pour les agents, preuve de passage native, pilotage marge en temps réel. Conçu pour remplacer l'usage opérationnel d'Excel, pas pour faire de l'analyse comptable.",
    rows: [
      { category: 'Coût direct annuel', competitor: 'Inclus Office (≈ 100 €/an)', proprely: 'Gratuit pendant la bêta', winner: 'proprely' },
      { category: 'Calcul mensuel des heures', competitor: '3 à 4h de saisie manuelle (200 à 300 €/mois en temps dirigeant)', proprely: '2 clics, export prêt pour la paie', winner: 'proprely' },
      { category: 'Planning agents', competitor: 'Une feuille par mois, illisible au-delà de 12 agents', proprely: 'Vue calendrier, drag-and-drop, filtres par agent/site/spécialité', winner: 'proprely' },
      { category: 'Accès mobile pour les agents', competitor: 'Impossible (impression papier ou screenshots WhatsApp)', proprely: 'Lien web, pas d\'app à installer, fonctionne en 4G capricieuse', winner: 'proprely' },
      { category: 'Devis et factures', competitor: 'Modèle Word + saisie manuelle (20 min/devis)', proprely: 'Génération en 2 min, signature électronique, suivi relances', winner: 'proprely' },
      { category: 'Preuve de passage', competitor: 'Aucune (photos WhatsApp dispersées dans 12 conversations)', proprely: 'QR code, photos horodatées, signature client, PV automatique', winner: 'proprely' },
      { category: 'Marge par client en temps réel', competitor: 'Calcul à la main en fin de trimestre (souvent jamais)', proprely: 'Affichée en continu, alerte sur clients déficitaires', winner: 'proprely' },
      { category: 'Versions et erreurs', competitor: '3 versions du même fichier, erreurs de saisie en cascade', proprely: 'Source unique, validation des saisies, historique tracé', winner: 'proprely' },
      { category: 'Conformité RGPD', competitor: 'Fichiers locaux non chiffrés, accès large, durée de conservation ?', proprely: 'Hébergement EU, chiffrement transit + repos, gestion accès par rôle, registre auto', winner: 'proprely' },
      { category: 'Analyse comptable libre (ex. macro Power Query)', competitor: 'Excellent (souplesse modélisation)', proprely: 'Export CSV/Excel en 1 clic pour analyse externe', winner: 'competitor' },
    ],
    verdict: "Excel reste pertinent pour de l'analyse ad-hoc ou pour les sociétés de 1 à 2 agents. Dès qu'il y a plusieurs agents, plusieurs sites et un besoin de mobile pour les équipes, le coût caché du tableur (saisie, erreurs, absence de preuve de passage, RGPD friable) dépasse largement le prix d'un outil métier dédié. Le bon usage : Proprely pour l'opérationnel quotidien + Excel pour l'analyse approfondie ponctuelle via export CSV.",
    whenCompetitor: [
      "Vous gérez 1 à 2 agents et 1 ou 2 clients",
      "Vous avez besoin de modéliser un scénario business spécifique (prévisionnel, simulation)",
      "Vous n'avez pas d'agents sur le terrain (centrale d'achat, sous-traitance pure)",
    ],
    whenProprely: [
      "Vous avez 3 agents ou plus",
      "Vos clients ont plusieurs sites avec des fréquences différentes",
      "Vous perdez du temps chaque mois à calculer les heures à la main",
      "Vous avez déjà subi une contestation \"vous n'êtes pas passé\" sans pouvoir prouver",
      "Vous voulez voir votre marge par client en temps réel, pas en fin de trimestre",
    ],
    faq: [
      { q: "Excel suffit-il pour gérer une société de nettoyage ?", a: "Jusqu'à 2-3 agents, oui. Au-delà, les frictions deviennent supérieures aux gains : 3-4h/mois sur les heures, 20 min par devis, aucune preuve de passage, pas de mobile pour les agents. À 10 agents, le coût caché Excel dépasse 3 000 €/an en temps perdu." },
      { q: "Puis-je exporter mes données Excel vers Proprely ?", a: "Oui, c'est même prévu dans l'onboarding. Vos clients, sites, agents et historiques sont importés par CSV/Excel en bulk lors de l'appel de 30 minutes avec le fondateur. Vous repartez avec vos données existantes." },
      { q: "Et si je veux garder mes feuilles Excel pour l'analyse ?", a: "Vous pouvez. Proprely exporte tout en CSV/Excel en 1 clic à tout moment. Vous gardez vos analyses approfondies dans Excel et l'opérationnel quotidien dans Proprely." },
      { q: "Combien je gagne en passant d'Excel à Proprely ?", a: "En moyenne 6 à 10 heures par semaine récupérées sur la gestion (calcul heures, planning, devis, recherche documents). À un coût horaire dirigeant de 45-60 €, c'est 14 000 à 31 000 € par an libérés." },
    ],
  },
  {
    slug: 'proprely-vs-trello',
    title: "Proprely vs Trello : pourquoi un outil générique ne tient pas le métier nettoyage",
    subtitle: "Trello, Notion, Asana, ClickUp : excellents outils, mais conçus horizontalement. Comparatif des limites concrètes face à un cockpit métier nettoyage.",
    metaDescription: "Trello vs Proprely pour la gestion d'une société de nettoyage : 10 critères. Limites des outils génériques face à un logiciel conçu pour la propreté B2B.",
    keywords: ['proprely vs trello', 'trello nettoyage', 'outil generique nettoyage', 'logiciel projet nettoyage'],
    competitor: 'Trello et outils génériques',
    competitorContext: "Trello (et ses cousins Notion, Asana, ClickUp, Monday) sont des outils horizontaux de gestion de projets. Très flexibles, design soigné, adoption rapide. Plusieurs sociétés de nettoyage les utilisent par défaut, faute d'alternative connue.",
    proprelyContext: "Proprely est un cockpit vertical, conçu pour le métier de la propreté B2B. Le vocabulaire (sites, fréquences, spécialités, preuve de passage) est natif, pas configuré. Pas de paramétrage de 3 mois pour transformer un outil générique en outil métier.",
    rows: [
      { category: 'Notion de site distinct du client', competitor: 'Champ libre à configurer (carte = client OU site = ambiguïté)', proprely: 'Natif : client → sites → contacts → prestations', winner: 'proprely' },
      { category: 'Spécialités agents (vitrerie, moquette, décapage)', competitor: 'Tags libres à configurer, pas de logique d\'affectation', proprely: 'Champ structuré, affectation priorise les agents qualifiés', winner: 'proprely' },
      { category: 'Fréquences variables (quotidien, 3x/semaine, mensuel)', competitor: 'À modéliser manuellement (récurrences basiques uniquement)', proprely: 'Modèles de fréquence métier prêts à l\'emploi', winner: 'proprely' },
      { category: 'Compteur d\'heures par agent', competitor: 'Inexistant (custom fields à empiler, calcul manuel)', proprely: 'Automatique à chaque mission validée', winner: 'proprely' },
      { category: 'Preuve de passage', competitor: 'Pièce jointe libre, pas de QR, pas de signature, pas de PV', proprely: 'QR code par site, photos horodatées, signature, PV auto', winner: 'proprely' },
      { category: 'Devis et factures', competitor: 'À faire en dehors (Word, autre logiciel)', proprely: 'Intégré, conversion devis → facture en 1 clic', winner: 'proprely' },
      { category: 'Marge par client en temps réel', competitor: 'Impossible nativement', proprely: 'Tableau de bord dédié', winner: 'proprely' },
      { category: 'Mobile pour les agents', competitor: 'App générique, demande compte + login (friction)', proprely: 'Lien web simple, sans installation, sans compte', winner: 'proprely' },
      { category: 'Personnalisation totale workflow', competitor: 'Excellent (drag-and-drop infini)', proprely: 'Limité à ce qu\'attend le métier', winner: 'competitor' },
      { category: 'Vue projet pour produit logiciel ou marketing', competitor: 'Excellent (cas d\'usage natif)', proprely: 'Pas conçu pour ça', winner: 'competitor' },
    ],
    verdict: "Trello et les outils génériques restent excellents pour piloter un projet interne (lancement marketing, sprint produit, ToDo équipe). Pour gérer le métier opérationnel d'une société de nettoyage, ils demandent 1 à 3 mois de paramétrage pour reconstituer ce qu'un cockpit métier offre dès la première heure. Et même bien configurés, certains éléments (preuve de passage, marge par client) restent impossibles.",
    whenCompetitor: [
      "Vous gérez vos projets internes (marketing, RH, produit)",
      "Vous suivez un onboarding client en mode projet",
      "Vous avez besoin d'un outil collaboratif horizontal flexible",
    ],
    whenProprely: [
      "Vous gérez l'opérationnel terrain quotidien d'agents de propreté",
      "Vous avez besoin de preuve de passage opposable",
      "Vous voulez voir la marge par client en temps réel",
      "Vous ne voulez pas passer 3 mois à paramétrer un outil avant qu'il soit utile",
    ],
    faq: [
      { q: "Trello fonctionne-t-il pour une société de nettoyage ?", a: "Oui, jusqu'à un certain point. Plusieurs petites sociétés l'utilisent pour suivre les sites comme des cartes. Les limites apparaissent vite : pas de compteur d'heures, pas de marge par client, pas de preuve de passage native, et les agents doivent installer une app + créer un compte." },
      { q: "Quelle est la différence entre un outil vertical et horizontal ?", a: "Un outil horizontal (Trello, Notion) est conçu pour fonctionner dans tous les secteurs. Un outil vertical (Proprely) est conçu pour un seul métier, avec le vocabulaire et les workflows natifs. L'horizontal demande à l'utilisateur de modéliser son métier ; le vertical le présuppose." },
      { q: "Puis-je utiliser Trello ET Proprely ?", a: "Bien sûr. Beaucoup de fondateurs gardent Trello pour leurs projets internes (marketing, produit, RH) et utilisent Proprely uniquement pour l'opérationnel propreté. Les deux co-existent sans friction." },
      { q: "Pourquoi pas Notion plutôt que Proprely ?", a: "Notion est encore plus flexible que Trello, mais la flexibilité a un coût : il faut tout construire. Un dirigeant qui veut piloter sa société, pas créer un produit logiciel maison, gagne du temps avec un outil prêt à l'emploi qui parle son langage." },
    ],
  },
  {
    slug: 'logiciels-gestion-societe-nettoyage',
    title: "Top des logiciels de gestion pour société de nettoyage en France · 2026",
    subtitle: "Comparatif honnête des principales solutions du marché. Critères, segments visés, prix indicatifs, forces et limites. Pour choisir en connaissance de cause.",
    metaDescription: "Comparatif logiciels gestion société de nettoyage France 2026 : Proprely, ERP industriels, outils planning légers, tableurs. Critères de choix, segments, prix indicatifs.",
    keywords: ['comparatif logiciels nettoyage', 'logiciel gestion société nettoyage', 'meilleur logiciel propreté', 'logiciels nettoyage 2026'],
    competitor: 'Le marché des logiciels nettoyage',
    competitorContext: "Le marché français des logiciels pour société de nettoyage se segmente en 3 familles : (1) les ERP industriels conçus pour 200+ agents (Cegid, Sage variantes propreté), (2) les outils horizontaux adaptables (Trello, Notion, Excel), (3) les outils planning légers sans pilotage marge (typiquement 10-30 €/agent/mois). Un quatrième segment émerge : les cockpits métier verticaux, légers et prêts à l'emploi.",
    proprelyContext: "Proprely se positionne sur le quatrième segment : un cockpit métier conçu pour les PME du nettoyage (3 à 50 agents), mobile-first, preuve de passage native, pilotage marge en temps réel, mise en route en 30 minutes. C'est ce comparatif qui le situe parmi les autres options.",
    rows: [
      { category: 'Cible (taille société)', competitor: 'ERP : 200+ agents · Planning légers : 5-30 · Excel : 1-3', proprely: '3 à 50 agents', winner: 'proprely' },
      { category: 'Mise en route', competitor: 'ERP : 3-6 mois · Planning : 1-2 sem · Excel : immédiat', proprely: '30 minutes avec le fondateur', winner: 'proprely' },
      { category: 'Prix indicatif annuel', competitor: 'ERP : 10 000-50 000 € · Planning : 1 200-4 000 € · Excel : 100 €', proprely: 'Bêta gratuite · tarif fondateur garanti à vie', winner: 'proprely' },
      { category: 'Preuve de passage native', competitor: 'ERP : oui (lourd) · Planning : rarement · Excel : non', proprely: 'QR, photos, signature, PV auto', winner: 'proprely' },
      { category: 'Mobile-first agents', competitor: 'ERP : app dédiée 80 Mo · Planning : variable · Excel : non', proprely: 'Lien web sans installation', winner: 'proprely' },
      { category: 'Marge par client temps réel', competitor: 'ERP : oui (post-config) · Planning : non · Excel : manuel', proprely: 'Natif', winner: 'proprely' },
      { category: 'Connexion Pennylane / Qonto', competitor: 'ERP : passerelles custom · Planning : rare · Excel : non', proprely: 'En finalisation, connexions natives', winner: 'proprely' },
      { category: 'Hébergement européen RGPD', competitor: 'ERP : variable · Planning : variable · Excel : local sur poste', proprely: 'EU exclusif, chiffrement transit + repos', winner: 'proprely' },
      { category: 'Export 100% données en 1 clic', competitor: 'ERP : souvent payant ou complexe · Planning : variable · Excel : trivial', proprely: 'CSV/Excel en 1 clic, gratuit, à tout moment', winner: 'tie' },
      { category: 'Adaptation à des besoins très spécifiques', competitor: 'ERP : excellent (sur-mesure) · Planning : limité · Excel : illimité', proprely: 'Métier nettoyage uniquement', winner: 'competitor' },
    ],
    verdict: "Pour une société de nettoyage entre 3 et 50 agents qui veut un cockpit immédiatement opérationnel, mobile pour les agents, avec preuve de passage et pilotage marge, Proprely couvre le besoin sans le sur-équipement d'un ERP industriel. Pour une société de plus de 200 agents avec besoins ERP intégrés (paie, comptabilité, multi-sociétés), un Cegid ou Sage reste pertinent malgré le coût et le délai d'implémentation. Pour 1 à 2 agents et un seul client, Excel suffit encore.",
    whenCompetitor: [
      "Vous avez plus de 200 agents et besoin d'un ERP intégré (paie, compta, multi-sociétés)",
      "Vous avez une équipe IT dédiée pour paramétrer pendant plusieurs mois",
      "Vous avez un budget supérieur à 10 000 € par an pour le logiciel",
    ],
    whenProprely: [
      "Vous gérez entre 3 et 50 agents",
      "Vous voulez être opérationnel le jour même",
      "Vos agents ne sont pas équipés et doivent accéder à leur planning depuis n'importe quel téléphone",
      "Vous voulez voir votre marge réelle par client, pas la calculer en fin de trimestre",
      "Vous voulez tester sans engagement financier (bêta gratuite)",
    ],
    faq: [
      { q: "Quel est le meilleur logiciel pour une société de nettoyage en France ?", a: "Il n'y a pas de meilleur absolu : ça dépend de la taille (3-50 vs 200+), du budget, et des contraintes IT. Pour le segment 3-50 agents en France qui veut une mise en route rapide et le pilotage marge en temps réel, les cockpits verticaux comme Proprely sont les mieux positionnés." },
      { q: "Combien coûte un logiciel de gestion société de nettoyage ?", a: "Très variable. Les ERP industriels (Cegid, Sage propreté) tournent à 10 000-50 000 €/an. Les outils planning légers (Combo, Planubo, Skello variantes) sont à 1 200-4 000 €/an. Proprely est gratuit pendant la bêta et conserve un tarif fondateur à vie pour les premiers utilisateurs." },
      { q: "Faut-il un logiciel SaaS ou installé en local ?", a: "Le SaaS est largement dominant en 2026 pour 3 raisons : pas d'IT à gérer côté entreprise, mises à jour automatiques, accès depuis n'importe quel appareil (essentiel pour les agents terrain). L'installé local subsiste uniquement chez les grands groupes avec des contraintes IT spécifiques." },
      { q: "Peut-on changer de logiciel facilement ?", a: "Oui si l'éditeur respecte la portabilité des données. Le test à faire avant de signer : « si je résilie demain, qu'est-ce que je récupère ? ». Tout en CSV/Excel en 1 clic = portable. « On fera un export sur demande » = piège. Proprely est conçu pour être quittable à tout moment." },
      { q: "Un logiciel généraliste type Trello ou Notion peut-il remplacer un logiciel métier ?", a: "Pour les très petites structures (1-3 agents), oui temporairement. Au-delà, les limites apparaissent : pas de preuve de passage, pas de compteur d'heures automatique, pas de marge par client. Le temps de paramétrage pour combler ces manques dépasse vite l'investissement dans un outil métier." },
    ],
  },
]

export function getComparison(slug: string): ComparisonPage | undefined {
  return comparisons.find((c) => c.slug === slug)
}
