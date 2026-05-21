export type BlogFAQ = { q: string; a: string }

export type HowToStep = { name: string; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  dateModified?: string
  readTime: string
  tag: string
  content: string
  /** Réponse-flash (40-80 mots) optimisée pour les Generative Engines
   * (ChatGPT, Perplexity, Google AI Overviews). Affichée en tête d'article
   * et incluse dans le HTML pré-rendu pour les crawlers IA. */
  tldr?: string
  quickSummary: string[]
  faq?: BlogFAQ[]
  relatedSlugs?: string[]
  howTo?: { name: string; description: string; steps: HowToStep[] }
}

export const posts: BlogPost[] = [
  {
    slug: 'fixer-prix-nettoyage',
    title: 'Fixer ses prix dans le nettoyage : la méthode juste en 2026',
    excerpt: "8 dirigeants sur 10 sous-tarifent sans le savoir. La règle des 3×, les 4 facteurs qui font monter le prix, et comment construire une grille interne qui protège vos marges.",
    date: '15 mai 2026',
    readTime: '7 min',
    tag: 'Stratégie',
    quickSummary: [
      "La règle de base : prix de vente = 3 × coût horaire chargé (fourchette saine 2,8 à 3,2).",
      "4 facteurs qui justifient une hausse : technicité, horaires, accessibilité, fréquence.",
      "La méthode « prix de référence » : 3 grilles internes mises à jour 2 fois par an.",
      "Sans visibilité sur la marge par client, vous facturez à l'aveugle.",
    ],
    faq: [
      { q: "Quel est le bon multiplicateur prix / coût horaire dans le nettoyage ?", a: "La fourchette saine est de 2,8 à 3,2 fois le coût horaire chargé. Moins, vous travaillez à perte. Plus, vous êtes hors marché." },
      { q: "Comment justifier un prix élevé sans perdre l'affaire ?", a: "Détaillez les prestations (qui fait quoi, à quelle fréquence), listez les produits utilisés et leurs certifications, intégrez la preuve de passage et les engagements de remplacement. Le client se convainc lui-même." },
      { q: "Faut-il facturer plus pour les prestations ponctuelles ?", a: "Oui : 20 à 30% au-dessus d'un contrat récurrent équivalent, pour couvrir la mobilisation ponctuelle et l'absence d'amortissement." },
      { q: "Quel taux de marge nette viser dans le nettoyage B2B ?", a: "15 à 20% de marge nette est la cible saine. En-dessous de 10%, votre entreprise est vulnérable au moindre imprévu (turnover, remplacement, hausse charges)." },
    ],
    relatedSlugs: ['calcul-heures-agents-nettoyage', 'logiciel-societe-nettoyage-criteres'],
    howTo: {
      name: "Fixer le prix d'une prestation de nettoyage B2B",
      description: "Méthode en 4 étapes pour calculer un prix juste qui protège votre marge sans vous mettre hors marché.",
      steps: [
        { name: "Calculer le coût horaire chargé", text: "Additionnez le salaire brut horaire, les charges patronales (~42%), les congés et RTT (10%), les primes (panier, transport, salissure) et la mutuelle. Pour un agent au SMIC en 2026, comptez 18 à 20€ de coût horaire chargé." },
        { name: "Appliquer le multiplicateur de base ×3", text: "Multipliez le coût horaire chargé par 3 (fourchette saine : 2,8 à 3,2). Ce multiplicateur couvre le coût direct, le temps non-facturable, les frais de structure et votre marge nette cible de 15-20%." },
        { name: "Ajuster selon les 4 facteurs", text: "Augmentez le prix selon : la technicité (×4 à ×5 pour vitrerie, décapage, moquette), les contraintes horaires (+30 à +60% avant 6h ou après 21h), l'accessibilité (+10 à +20% en hauteur ou sites sensibles), la récurrence (+20 à +30% pour les ponctuels)." },
        { name: "Justifier le prix par le détail", text: "Construisez un devis qui détaille les prestations, liste les produits utilisés, intègre la preuve de passage et les engagements de remplacement. Le client se convainc lui-même de la valeur." },
      ],
    },
    content: `## Le piège du prix au feeling

La plupart des dirigeants de sociétés de nettoyage que nous rencontrons fixent leurs prix au feeling. Un peu en dessous du concurrent qu'ils ont en tête. Un peu au-dessus de ce que le client annonce comme budget. Sans calcul rigoureux derrière.

Résultat : **8 dirigeants sur 10 brident leur marge sans le savoir**. Ils gagnent moins que ce qu'ils pourraient, et surtout, ils ne savent pas pourquoi.

Voici la méthode utilisée par les sociétés qui marchent. Elle est simple, rigoureuse, basée sur du calcul, pas sur de l'intuition.

## La règle de base : 3× le coût horaire chargé

C'est la règle d'or du secteur, et elle tient en une équation :

**Prix de vente horaire = 3 × Coût horaire chargé**

### Comment calculer le coût horaire chargé

Le coût horaire chargé, c'est ce que vous coûte une heure d'agent, tout compris :

- Salaire brut horaire (à partir du SMIC ou de votre grille interne)
- Charges patronales (environ 42% du brut)
- Congés payés et RTT (10%)
- Prime de panier, transport, prime de salissure
- Mutuelle, prévoyance

Pour un agent au SMIC en 2026, comptez environ **18 à 20€ de coût horaire chargé**. Pour un agent plus expérimenté ou spécialisé, ça monte vite à 22-25€.

### Pourquoi multiplier par 3 et pas par 2,5

Le multiplicateur de 3 couvre :

- Le coût direct (l'heure travaillée)
- Le temps non-facturable (déplacements, briefing, remplacement)
- Vos frais de structure (bureau, comptable, logiciels, assurance)
- Votre marge nette cible (généralement 15-20%)

Si vous multipliez par 2,5, vous facturez vos heures à perte. Si vous multipliez par 4, vous êtes hors marché. La fourchette saine, c'est **2,8 à 3,2**.

## Les 4 facteurs qui font monter le prix

Le multiplicateur de base, c'est 3. Mais selon le contexte, vous pouvez (et devez) facturer plus :

### 1. La technicité de la prestation

Décapage, vitrerie en hauteur, moquette à shampouiner, remise en état après chantier : ce sont des prestations spécialisées. **Comptez ×4 à ×5** sur le coût horaire.

### 2. Les contraintes horaires

Avant 6h, après 21h, week-end, jours fériés : majoration légale + votre marge. **+30 à +60%** sur le prix standard.

### 3. L'accessibilité du site

Hauteur, accès en sous-sol, lieux sensibles (cabinets médicaux, laboratoires) : **+10 à +20%**.

### 4. La récurrence

Un contrat hebdomadaire stable vaut moins qu'une prestation ponctuelle. Inversement, une prestation ponctuelle peut être facturée 20-30% plus cher qu'un contrat récurrent.

## Comment justifier un prix élevé sans perdre l'affaire

La pire erreur, c'est de baisser le prix face à une objection. La bonne pratique, c'est de **détailler ce qui justifie le prix**.

Un devis professionnel inclut :

- Le détail des prestations (qui fait quoi, à quelle fréquence)
- Les produits utilisés (et leur certification écolabel)
- La preuve de passage (photos, signature)
- Les engagements de remplacement
- Les délais de réactivité

Un devis comme celui-là justifie un prix 15-20% au-dessus du concurrent low-cost. **Et c'est le client qui s'en convainc lui-même**.

## Le piège du devis copié-collé

C'est la plus grosse fuite de marge dans le secteur : prendre un ancien devis, changer les références client, recalculer 3 chiffres et envoyer. En 15 minutes.

Le problème :

- Vous ne réfléchissez pas aux spécificités du site
- Vous reconduisez vos anciennes erreurs de tarification
- Vous ne tenez pas compte de l'inflation (+5-7% par an sur les charges)

### La méthode "prix de référence par site"

Au lieu de copier-coller, créez **3 grilles internes** :

- Bureaux standards (€/m²/passage)
- Sites techniques (cabinets, hôtels, syndics)
- Prestations ponctuelles (décapage, vitrerie, remise en état)

Mettez-les à jour 2 fois par an avec vos vrais coûts. Quand un prospect demande un devis, vous appliquez la grille + un ajustement contextuel (+5 à +20%).

**Résultat : devis cohérents, marges protégées, temps de rédaction divisé par 4**.

## Ce que change un outil de pilotage

Sans visibilité sur votre marge réelle par client, vous facturez à l'aveugle. Vous découvrez 45 jours plus tard que tel client tire votre marge globale vers le bas, sans pouvoir réagir.

Un cockpit qui affiche la **marge par client en temps réel** change la dynamique : vous identifiez les clients déficitaires, vous renégociez ou vous sortez. Vous identifiez les clients premium, vous y consacrez vos meilleurs agents.

C'est exactement ce que fait Proprely. [Rejoignez la bêta privée](/) si vous voulez voir vos vraies marges, plutôt que de les estimer en fin de trimestre.`,
  },
  {
    slug: 'gestion-societe-nettoyage-outils',
    title: '5 outils que les sociétés de nettoyage utilisent au quotidien (et pourquoi ça pose problème)',
    excerpt: "Excel, WhatsApp, Google Agenda, Word, classeur papier. Cinq outils, cinq sources de friction. Anatomie de la dispersion qui fait perdre 6 heures par semaine.",
    date: '12 mai 2026',
    readTime: '6 min',
    tag: 'Gestion',
    quickSummary: [
      "Un dirigeant utilise en moyenne 4 à 7 outils non connectés pour gérer son entreprise.",
      "Excel, WhatsApp, Google Agenda, Word et le classeur papier : les 5 outils typiques.",
      "Au total : 6 à 10 heures par semaine perdues en administration que personne ne calcule.",
      "Un outil métier centralise les 5 sans configuration de mois ni formation lourde.",
    ],
    faq: [
      { q: "Combien d'outils utilisent les sociétés de nettoyage en moyenne ?", a: "Entre 4 et 7 outils non connectés : Excel, WhatsApp, Google Agenda, Word, logiciel comptable, emails, classeurs papier. Aucun ne se parle." },
      { q: "Excel fonctionne-t-il pour gérer une société de nettoyage ?", a: "Jusqu'à 2-3 agents, oui. Au-delà, c'est ingérable : multiples versions, erreurs de saisie, pas de mobile-first, pas de preuve de passage." },
      { q: "Quel est le vrai coût caché de WhatsApp pour les remplacements ?", a: "Zéro traçabilité. Quand un client conteste un remplacement, vous n'avez aucune preuve. Et quand un agent dit avoir prévenu, vous ne pouvez pas vérifier." },
      { q: "Combien d'heures par semaine la dispersion fait perdre ?", a: "6 à 10 heures par semaine en moyenne. Soit l'équivalent d'un mi-temps d'admin sur l'année." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'calcul-heures-agents-nettoyage'],
    content: `## La dispersion, ce mal silencieux

La plupart des dirigeants de sociétés de nettoyage que nous avons rencontrés utilisent en moyenne **4 à 7 outils différents** pour gérer leur entreprise. Aucun ne se parle. Chacun fait une partie du travail. Personne ne fait l'ensemble.

Voici les cinq outils les plus fréquents, et pourquoi ils créent plus de problèmes qu'ils n'en résolvent.

## 1. Excel pour les heures

C'est l'outil par défaut. Une feuille par mois, parfois une feuille par agent. Le 22 du mois, vous récupérez l'agenda, vous comptez les interventions, vous saisissez les heures à la main.

**Le vrai coût** : 3 à 4 heures par mois en saisie manuelle. Des erreurs régulières. Pas de traçabilité quand un client conteste.

## 2. WhatsApp pour les remplacements

Quand un agent est malade, vous écrivez sur le groupe. Quelqu'un répond. Ou pas. Vous appelez en parallèle. Le message se perd, le remplaçant ne se présente pas, le client appelle furieux.

**Le vrai coût** : aucune traçabilité, aucun historique. Quand vous voulez retrouver qui a remplacé qui le 14 mars, c'est impossible.

## 3. Google Agenda pour le planning

C'est mieux que rien. Mais quand vous avez 12 agents sur 8 sites, l'agenda devient un sapin de Noël illisible. Pas de filtres, pas de vue par agent, pas de gestion des spécialités.

**Le vrai coût** : impossible de répondre à "qui peut prendre cette intervention demain à 7h ?" sans appeler trois personnes.

## 4. Word pour les devis

Vous ouvrez un ancien devis, vous modifiez les références, vous changez les prix. 20 minutes. Pendant ce temps, le concurrent a répondu par email en 10 minutes.

**Le vrai coût** : conversion commerciale plus faible. Pas de suivi des relances. Pas de pipeline.

## 5. Classeur papier pour les documents

Contrats, fiches de sécurité, attestations URSSAF, PV d'intervention. Tout dans des classeurs sur l'étagère. Quand un audit RGPD ou URSSAF arrive, vous passez une journée à chercher.

**Le vrai coût** : risque légal et perte de temps en cascade.

## Ce que la dispersion vous coûte vraiment

Additionnez :

- 3-4h/mois sur les heures
- 1-2h/semaine sur les remplacements et plannings
- 20 min par devis × 8-10 devis par mois
- 2-3h/mois sur les documents

**Total estimé : 6 à 10 heures par semaine** consacrées à de l'administration que n'importe quel cockpit métier centralise.

## La bonne question à se poser

Ce n'est pas "comment je peux mieux organiser Excel". C'est "pourquoi est-ce que je dois encore organiser Excel en 2026 quand je dirige une entreprise de propreté B2B ?"

Un outil métier conçu pour le nettoyage règle ces cinq problèmes d'un coup, sans configuration de mois, sans formation lourde.

C'est exactement ce qu'on construit avec Proprely. Si vous voulez en discuter, [rejoignez la bêta privée](/), c'est gratuit pendant toute la phase de bêta.`,
  },
  {
    slug: 'logiciel-societe-nettoyage-criteres',
    title: 'Logiciel pour société de nettoyage : 7 critères pour bien choisir',
    excerpt: "Conçu pour le métier, mobile-first, preuve de passage, marge par client visible, RGPD réel, export 100%, mise en route en moins d'une journée. La checklist à appliquer avant de signer.",
    date: '8 mai 2026',
    readTime: '8 min',
    tag: 'Outils',
    quickSummary: [
      "Le nettoyage n'est ni du BTP ni du commerce : exigez un outil pensé pour le métier.",
      "7 critères : conçu métier, mobile-first agents, preuve de passage, marge visible, RGPD réel, export 100%, mise en route < 1 jour.",
      "Le test #0 : une période d'essai gratuite est obligatoire. Sans ça, fuyez.",
    ],
    faq: [
      { q: "Comment savoir si un logiciel est vraiment conçu pour le nettoyage ?", a: "3 questions à poser : gère-t-il la notion de site en plus du client ? gère-t-il les spécialités agents (vitrerie, moquette) ? gère-t-il les fréquences variables (quotidien à mensuel) ? Si l'éditeur répond « il faudra configurer ça », passez votre chemin." },
      { q: "Pourquoi le mobile-first est-il critique pour le nettoyage ?", a: "Vos agents ne sont pas devant un ordinateur. Ils sont sur site, avec leur téléphone personnel, parfois en sous-sol. Le logiciel doit fonctionner sans installation d'app, sans formation, sur 4G capricieuse." },
      { q: "Que demander avant de signer pour vérifier la conformité RGPD ?", a: "L'hébergeur (et son pays), le DPA (Data Processing Agreement), la procédure d'export en cas de résiliation, et le chiffrement (transit + stockage). Pas de réponse précise = alerte rouge." },
      { q: "Combien de temps doit prendre la mise en route ?", a: "Moins d'une journée. Au-delà, c'est qu'il est pensé pour des entreprises de 500 personnes, pas pour vous. Import CSV des clients/sites/agents en bulk, premier devis créé dans l'heure." },
      { q: "Pourquoi exiger un export 100% des données ?", a: "Parce que vos données vous appartiennent. Test : « Si je résilie demain, je récupère quoi ? ». Tout en CSV/Excel = OK. « On verra » = piège." },
    ],
    relatedSlugs: ['gestion-societe-nettoyage-outils', 'fixer-prix-nettoyage'],
    content: `## Pourquoi un logiciel "standard" ne marche pas pour vous

Vous avez sûrement essayé. Un CRM générique, un outil de planning pour artisans, un logiciel comptable avec module facturation. Aucun ne tient sur la durée.

La raison est simple : **le nettoyage n'est ni du BTP, ni du commerce, ni du conseil**. C'est un métier avec ses propres règles, sites multiples par client, remplacements fréquents, preuve de passage, agents itinérants, marge serrée.

Voici les 7 critères qu'un logiciel de gestion doit cocher pour fonctionner dans une société de nettoyage. À tester avant de signer.

## Critère 1 : Conçu pour le nettoyage, pas adapté au nettoyage

Les éditeurs "généralistes" vous diront que leur produit est "adaptable" au nettoyage. Méfiance. **Adapté ≠ conçu pour**.

Posez la question test :

- Gère-t-il la notion de "site" en plus du "client" (un client = plusieurs sites) ?
- Gère-t-il les spécialités des agents (vitrerie, moquette, décapage) ?
- Gère-t-il les fréquences variables (quotidien, 3×/semaine, hebdomadaire, mensuel) ?

Si la réponse à l'une des trois est "il faudra configurer ça", passez votre chemin.

## Critère 2 : Mobile-first pour vos agents

Vos agents ne sont pas devant un ordinateur. Ils sont sur site, avec leur téléphone perso, souvent en mode économie de données.

Le logiciel doit fonctionner :

- **Sans installation** d'application (un lien web suffit)
- **Sans formation** (l'agent ouvre, il comprend)
- **Sur connexion faible** (4G capricieuse, sous-sols)

Si vos agents doivent installer une app qui pèse 80 Mo et qui crashe sur leur Galaxy A02, vous avez perdu d'avance.

## Critère 3 : Preuve de passage intégrée

C'est devenu un standard exigé par les syndics, les hôtels, les cabinets médicaux. Si le logiciel ne propose pas de preuve de passage native (QR code, photos, signature client), vous serez forcé d'ajouter un outil tiers.

Ce que doit faire la preuve de passage :

- Check-in au démarrage (avec géolocalisation optionnelle)
- Photos avant/après horodatées
- Signature client à la sortie
- Génération automatique d'un PV consultable par le client

Sans ça, la première contestation vous coûte plus cher que le logiciel.

## Critère 4 : Marge par client visible en temps réel

C'est LA différence entre un logiciel "de gestion" et un vrai cockpit.

La majorité des outils du marché vous montrent du CA. Quelques-uns vous montrent les heures. Très peu vous montrent la **marge** par client, en temps réel.

Or c'est l'indicateur qui pilote vraiment l'entreprise :

- Quel client tire votre marge vers le bas ?
- Quel site est devenu déficitaire ?
- Où renégocier ou résilier ?

Un logiciel qui ne montre pas la marge, c'est un tableau de bord sans voyant moteur.

## Critère 5 : Conformité RGPD réelle

Pas "RGPD-compatible" dans la plaquette. **Hébergement européen, chiffrement, contrat de sous-traitance RGPD documenté**.

À demander avant de signer :

- Où sont stockées les données ? (UE, hors UE)
- Quel hébergeur ?
- Avez-vous un DPA (Data Processing Agreement) ?
- Comment se passe la suppression de données quand je pars ?

Pour rappel, vous êtes **responsable du traitement** des données de vos agents et clients. Un éditeur non-conforme vous expose, vous.

## Critère 6 : Exportable à 100%

Vos données vous appartiennent. Toujours. Si le logiciel ne permet pas d'exporter en CSV/Excel toutes vos données (clients, agents, missions, devis, factures) en 1 clic, c'est un piège.

Le test : "Si je résilie demain, je récupère quoi ?"

- Tout, dans un format standard ouvert : continuez à creuser
- "On fera un export", "ça dépend" : alerte rouge

Un éditeur sérieux assume que vous puissiez partir. Et le facilite.

## Critère 7 : Mise en route en moins d'une journée

Les outils qui demandent **6 mois de paramétrage et 4 jours de formation** sont des outils qui finissent inutilisés.

Le bon logiciel pour le nettoyage doit pouvoir :

- Importer vos clients/sites/agents en bulk (CSV)
- Vous laisser créer votre premier devis dans l'heure
- Permettre à vos agents d'accéder à leur planning sans intervention IT

Si la mise en route dépasse une journée, c'est qu'il est pensé pour des entreprises de 500 personnes, pas pour vous.

## Le test ultime : essayer avant de payer

C'est le critère #0, celui qui rend les 7 autres vérifiables.

Un éditeur qui ne propose pas de période d'essai (ou de bêta gratuite) ne croit pas en son produit.

Chez Proprely, c'est l'inverse : la bêta est **gratuite pendant toute sa durée**, sans carte bancaire. Vous testez en conditions réelles, avec vos clients, vos agents, vos sites. Si ça ne convient pas, vous partez avec vos données. [Rejoignez la bêta privée](/) pour tester par vous-même.`,
  },
  {
    slug: 'calcul-heures-agents-nettoyage',
    title: "Le calcul des heures : la vraie raison qui vous fait perdre une journée par mois",
    excerpt: "Le 22 du mois, vous récupérez l'agenda, vous additionnez les heures de chaque agent, vous transmettez à la paie. Combien ça vous coûte vraiment ? Bien plus que ce que vous imaginez.",
    date: '5 mai 2026',
    readTime: '5 min',
    tag: 'Productivité',
    quickSummary: [
      "3h30 à 4h30 par mois consacrées au seul calcul des heures.",
      "Coût caché annuel pour un dirigeant : 2 400 à 3 600€.",
      "Les erreurs de paie répétées sont le poison lent du climat social.",
      "Un compteur automatique fait passer le calcul de 4h à 2 clics.",
    ],
    faq: [
      { q: "Combien de temps prend le calcul des heures dans une société de nettoyage ?", a: "En moyenne 3h30 à 4h30 par mois, soit l'équivalent d'une demi-journée perdue à compter, croiser, vérifier les heures depuis l'agenda et les messages." },
      { q: "Combien coûte cette tâche annuellement ?", a: "À un coût horaire dirigeant de 45-60€ chargé, c'est 200-300€ par mois, soit 2 400 à 3 600€ par an. Sans compter les erreurs de paie et heures non-facturées par oubli." },
      { q: "Comment automatiser le calcul des heures des agents ?", a: "Avec un compteur intégré au planning : chaque intervention validée incrémente le compteur de l'agent automatiquement. Pas de saisie, pas de calcul, pas d'oubli." },
      { q: "Les agents peuvent-ils consulter leurs heures en temps réel ?", a: "Oui, sur leur téléphone via un lien navigateur. Cette transparence règle 80% des contestations de paie avant qu'elles ne deviennent un conflit." },
    ],
    relatedSlugs: ['fideliser-agents-nettoyage-turnover', 'gestion-societe-nettoyage-outils'],
    content: `## Une routine que personne ne calcule

C'est l'un des moments les plus emblématiques de la gestion d'une société de nettoyage. Entre le 20 et le 25 du mois, le dirigeant, ou le responsable d'exploitation, ferme la porte du bureau, ouvre l'agenda et commence à compter.

Combien d'heures Marie a faite cette semaine ? Et la semaine d'avant ? Et le 8, c'était quel site ?

## Le vrai temps que ça prend

Sur 10 dirigeants interrogés, la moyenne ressort à **3h30 à 4h30 par mois** consacrées au seul calcul des heures. Soit l'équivalent d'une demi-journée perdue chaque mois.

Pourquoi tant ?
- Croiser plusieurs sources : agenda, post-it, SMS, messages WhatsApp
- Vérifier les missions effectuées (vs prévues)
- Gérer les remplacements
- Identifier les heures supplémentaires
- Calculer les paniers et primes selon les conventions

Cette tâche ne s'externalise pas : elle requiert une connaissance fine du terrain. Et elle ne se délègue pas, parce qu'il n'y a souvent personne d'autre dans la structure capable de la faire.

## Le coût caché

Si on prend un coût horaire dirigeant de 45 à 60€ (charges incluses), ce calcul mensuel représente **un coût de 200 à 300€ par mois**, soit **2 400 à 3 600€ par an**.

C'est sans compter :
- Les erreurs de paie qui créent des tensions avec les agents
- Les heures non-facturées au client par oubli
- La fatigue cognitive qui pèse sur le reste du pilotage

## Pourquoi un compteur automatique change tout

Un compteur d'heures intégré au planning fonctionne sur un principe simple : **chaque intervention validée incrémente le compteur de l'agent automatiquement.** Pas de saisie, pas de calcul, pas d'oubli.

À la fin du mois, vous ouvrez le récapitulatif et vous avez :
- Les heures par agent
- La répartition par site et par client
- Les heures sup' identifiées
- L'export prêt pour la paie

Le calcul mensuel passe de 4 heures à 2 clics.

## Ce qui change pour vos agents

Au-delà du gain de temps, c'est la transparence qui change tout. Vos agents voient leurs heures en temps réel. Plus de "ah bon je pensais avoir fait plus", plus de contestation à la paie, plus de tension le 30 du mois.

## Et les heures facturées clients ?

Même logique, en miroir. Chaque intervention est tracée, photographiée, signée. Quand un client conteste, vous avez la preuve. Quand vous facturez, vous facturez juste.

C'est ce que fait Proprely. Si vous voulez tester pendant la bêta, [c'est gratuit](/) et la mise en route prend 30 minutes avec le fondateur.`,
  },
  {
    slug: 'rgpd-societe-nettoyage-2026',
    title: 'RGPD et nettoyage : ce que doit savoir un dirigeant en 2026',
    excerpt: "Vos agents ont accès à des locaux clients. Vos planning contiennent des données nominatives. Vos rapports d'intervention archivent des photos. Sans le savoir, vous traitez des données à caractère personnel.",
    date: '28 avril 2026',
    readTime: '7 min',
    tag: 'Conformité',
    quickSummary: [
      "Vous êtes responsable du traitement des données de vos agents et clients (souvent sans le savoir).",
      "5 obligations clés : information, finalité, durée, sécurité, hébergement.",
      "Sanctions CNIL jusqu'à 4% du CA annuel ou 20M€.",
      "Centraliser dans un outil RGPD-natif rend la conformité conséquence, pas charge supplémentaire.",
    ],
    faq: [
      { q: "Suis-je vraiment concerné par le RGPD en tant que société de nettoyage ?", a: "Oui, dès le premier agent recruté et le premier client B2B. Vous traitez identité, paie, géolocalisation, photos de sites, toutes ces données sont personnelles." },
      { q: "Quel hébergement choisir pour rester conforme RGPD ?", a: "Un hébergeur européen avec un DPA (Data Processing Agreement). Le stockage doit être en UE pour éviter les complications des transferts internationaux." },
      { q: "Combien de temps conserver les données de mes agents et clients ?", a: "Généralement 5 ans après la fin du contrat, sauf obligations légales spécifiques (paie, comptabilité) qui peuvent imposer 10 ans d'archivage." },
      { q: "Quelles sanctions en cas de manquement RGPD ?", a: "La CNIL peut prononcer des amendes jusqu'à 4% du CA annuel ou 20 millions d'euros. Pour une PME, le vrai risque est plutôt une plainte d'agent ou un refus d'appel d'offres public." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils'],
    content: `## Une responsabilité souvent ignorée

Le RGPD n'est pas qu'une affaire de grandes entreprises. En tant que dirigeant d'une société de nettoyage, vous êtes **responsable du traitement** de plusieurs catégories de données personnelles, parfois sans même le savoir.

## Les données concernées

### Côté agents

- Identité, coordonnées, RIB pour la paie
- Heures travaillées, géolocalisation potentielle (check-in)
- Compétences, spécialités, suivi médical (parfois)
- Photos d'identité, badges d'accès aux sites

### Côté clients

- Contacts (gestionnaires, syndics, gardiens)
- Plans d'accès, codes d'immeubles, alarmes
- Photos de sites, parfois en présence de personnes

## Les obligations clés

### 1. Information

Vos agents et clients doivent être informés de la collecte et de l'usage de leurs données. Cela passe par une **politique de confidentialité** accessible, claire, et idéalement liée à votre contrat.

### 2. Finalité

Chaque donnée collectée doit servir un objectif explicite : planning, paie, sécurité, facturation. Pas de collecte "pour si jamais".

### 3. Durée

Les données doivent être supprimées ou anonymisées après un délai défini (généralement 5 ans après la fin du contrat, sauf obligations légales spécifiques).

### 4. Sécurité

C'est là que beaucoup d'entreprises pèchent. Excel sur un ordinateur portable non chiffré, WhatsApp avec photos de sites, classeurs papier accessibles à toute l'équipe, ce sont des violations potentielles.

### 5. Hébergement

Si vous utilisez un outil tiers (logiciel, cloud), celui-ci doit être **conforme RGPD**. Hébergement européen, contrat de sous-traitance, chiffrement.

## Les sanctions

La CNIL peut prononcer des amendes jusqu'à **4% du chiffre d'affaires annuel** ou 20 millions d'euros. Mais le vrai risque, pour une PME, c'est :
- Une plainte d'agent (litige paie + données)
- Un signalement client après incident
- Une condition d'attribution d'un appel d'offres public (la conformité RGPD est exigée)

## La bonne hygiène

1. **Centralisez** vos données dans un outil sécurisé plutôt que sur 4 supports différents
2. **Hébergez en France** pour simplifier la conformité
3. **Chiffrez** transit (HTTPS) et stockage
4. **Donnez accès** uniquement aux personnes qui en ont besoin
5. **Documentez** vos traitements (registre RGPD)

## Ce que ça change avec un cockpit métier

Centraliser vos données dans un outil dédié simplifie radicalement la conformité :
- Hébergement contrôlé en Union européenne
- Chiffrement par défaut
- Gestion des accès par rôle
- Export facile pour exercer les droits RGPD
- Registre automatique des traitements

Plutôt que de gérer la conformité **en plus** de votre activité, elle devient une **conséquence** de votre outillage.

## En pratique

Si vous gérez 10+ agents et plusieurs clients B2B, vous êtes très probablement tenu d'avoir :
- Une politique de confidentialité (sur votre site et dans vos contrats)
- Un registre des traitements
- Des mesures de sécurité documentées

C'est aussi pour ça qu'on a conçu Proprely avec le RGPD comme prérequis, pas comme option. [Rejoignez la bêta](/) si vous voulez tester un outil pensé "conformité-first" dès la base.`,
  },
  {
    slug: 'fideliser-agents-nettoyage-turnover',
    title: "Fidéliser ses agents de nettoyage : 6 leviers contre 35% de turnover",
    excerpt: "Le secteur a un turnover de 35% par an. Les sociétés qui descendent sous 15% appliquent ces 6 leviers. Indice : ce ne sont pas celles qui paient le plus.",
    date: '21 avril 2026',
    readTime: '7 min',
    tag: 'Management',
    quickSummary: [
      "Turnover moyen secteur : 35% par an (3 à 5× la moyenne tertiaire).",
      "6 leviers : suivi surmenage, planning prévisible, spécialités, remplacements, paie juste, visibilité.",
      "Coût d'un départ : 3 500 à 5 000€. Sur 15 agents, 17 500 à 25 000€/an en frictions.",
      "Réduire le turnover de 35% à 20% = 7 500 à 10 000€/an récupérés.",
    ],
    faq: [
      { q: "Quel est le taux de turnover moyen dans le nettoyage ?", a: "Environ 35% par an, soit 3 à 5 fois plus que dans l'industrie ou les services tertiaires. Les sociétés les mieux organisées descendent sous 15%." },
      { q: "Combien coûte un départ d'agent dans une société de nettoyage ?", a: "Entre 3 500 et 5 000€ : recrutement, formation, période de prise en main, surcharge sur les autres agents pendant la transition." },
      { q: "Quelle est la première frustration des agents ?", a: "L'imprévisibilité du planning, pas le salaire. Un agent qui ne sait pas s'il va être appelé à 5h du matin pour un remplacement ne peut pas organiser sa vie." },
      { q: "Comment détecter le surmenage avant le burn-out ?", a: "Suivre la charge horaire par agent en automatique, définir un seuil d'alerte (ex: 145h/mois) et rééquilibrer dès dépassement sur 2 semaines consécutives." },
      { q: "Pourquoi reconnaître les spécialités fidélise ?", a: "Décapage, vitrerie, moquette, remise en état sont des savoir-faire. Un agent à qui on les confie se sent valorisé. Un agent qu'on bascule au hasard se sent interchangeable." },
    ],
    relatedSlugs: ['calcul-heures-agents-nettoyage', 'fixer-prix-nettoyage'],
    content: `## Le secret le mieux gardé du nettoyage

Le turnover dans le secteur de la propreté avoisine **35% par an**. C'est 3 à 5 fois plus que dans l'industrie ou les services tertiaires.

Recruter coûte. Former coûte. Et chaque agent qui part emporte avec lui une connaissance des sites qu'il sera difficile de remplacer rapidement.

Pourtant, certaines sociétés affichent un turnover inférieur à 15%. Ce ne sont pas celles qui paient le plus. Ce sont celles qui appliquent ces 6 leviers.

## Levier 1 : Les écouter quand ils signalent du surmenage

Le premier indicateur de départ, c'est le surmenage. Et le surmenage ne se voit pas dans Excel : il se voit dans le **regard fatigué**, dans les retards, dans les arrêts maladie qui se multiplient.

Le piège classique : envoyer toujours les mêmes agents sur les missions urgentes parce qu'ils sont "fiables". Au bout de 3 mois, ils craquent. Et ils partent, souvent chez le concurrent direct.

### Le bon réflexe

- Suivre la charge horaire par agent (heures réellement effectuées)
- Définir un **seuil d'alerte** (ex: 145h/mois)
- Ré-équilibrer la charge dès que le seuil est dépassé sur 2 semaines consécutives

Sans suivi automatique, vous découvrez le surmenage le jour de l'arrêt maladie. Trop tard.

## Levier 2 : Un planning prévisible et lisible

L'enquête Branche Propreté 2024 le montre : la **première frustration** des agents, ce n'est pas le salaire. C'est l'imprévisibilité du planning.

Un agent qui ne sait pas si on va l'appeler à 5h du matin pour un remplacement, c'est un agent qui ne peut pas organiser sa vie. Qui ne peut pas garder ses enfants. Qui finit par partir.

### Le bon réflexe

- Communiquer le planning **minimum 7 jours à l'avance**
- Le rendre **lisible sur leur téléphone**, sans application à installer
- Notifier en temps réel les changements (remplacements, ajouts)

Un planning consulté sur un lien navigateur, ça change la vie d'un agent. Et ça réduit drastiquement les "oublis".

## Levier 3 : Reconnaître les spécialités

Le décapage, la vitrerie, la moquette, la remise en état post-chantier : ce sont des **savoir-faire**, pas des tâches anonymes.

Un agent à qui on confie systématiquement les missions techniques se sent valorisé. Un agent qu'on bascule au hasard entre quotidien, vitrerie et nettoyage post-chantier se sent interchangeable.

### Le bon réflexe

- Identifier les spécialités de chaque agent dans une **fiche profil**
- Affecter prioritairement selon la spécialité (pas selon la disponibilité brute)
- Valoriser publiquement : "Karim, c'est notre référent décapage"

## Levier 4 : Faciliter les remplacements

Un agent qui appelle à 6h du matin pour signaler une absence enfant malade, c'est une réalité du métier. La question, c'est comment vous gérez la suite.

**Mauvaise gestion** : vous appelez 5 personnes au hasard, l'une accepte par culpabilité, elle bouille intérieurement.

**Bonne gestion** : vous avez un système qui propose le remplaçant le plus pertinent (proximité, spécialité, charge horaire), vous l'appelez en premier, il dit oui ou non, c'est traité en 5 minutes.

La différence ? Le ressenti des équipes. Personne n'aime être "celle qu'on appelle parce qu'il n'y a personne d'autre".

## Levier 5 : Payer juste, payer à l'heure

La règle est simple : **un agent qui doute des heures payées doute de l'entreprise**.

Les erreurs de paie qui s'accumulent (5 minutes par-ci, 15 minutes par-là), c'est le poison lent du climat social. Et au bout du compte, c'est ce qui fait basculer un agent vers la concurrence.

### Le bon réflexe

- Compteur d'heures **automatique** (et visible par l'agent)
- Validation des heures par l'agent avant la paie
- Paiement à date fixe, sans dérapage

Donner accès au compteur en temps réel, c'est aussi régler 80% des contestations avant qu'elles n'arrivent.

## Levier 6 : Donner de la visibilité sur le travail bien fait

Le nettoyage est un métier de **discrétion**. Quand tout est propre, personne ne dit rien. Quand quelque chose cloche, tout le monde se manifeste.

Cette asymétrie use psychologiquement. Pour la compenser : montrer le travail bien fait.

### Le bon réflexe

- Photos avant/après horodatées de chaque intervention
- Compteur d'interventions par agent (visible par lui)
- Retours clients positifs systématiquement remontés à l'agent concerné

Un agent qui voit que son travail est tracé, valorisé et reconnu, c'est un agent qui reste.

## Le coût caché du turnover

Faisons le calcul : un agent qui part vous coûte en moyenne **3 500 à 5 000€** (recrutement, formation, période de prise en main, surcharge sur les autres).

Sur 15 agents, à 35% de turnover, c'est 5 agents par an. Soit **17 500 à 25 000€ par an** que vous brûlez en frictions, alors que vous pourriez les investir dans des outils, des primes ou de la formation.

**Réduire le turnover de 35% à 20%, c'est récupérer 7 500€ à 10 000€ par an**. C'est plus qu'un budget logiciel annuel.

C'est exactement la philosophie derrière Proprely : centraliser pour rendre le travail des agents (et celui du dirigeant) plus prévisible, plus reconnu, moins frustrant. [Rejoignez la bêta privée](/) pour tester l'effet en conditions réelles.`,
  },
  {
    slug: 'comparatif-logiciels-nettoyage-2026',
    title: "Comparatif logiciels société de nettoyage 2026 : la grille de lecture honnête",
    excerpt: "Trois familles de logiciels se partagent le marché de la propreté B2B. Voici comment les distinguer, ce qu'ils savent (vraiment) faire, et la grille de lecture pour ne pas se tromper.",
    date: '18 mai 2026',
    readTime: '9 min',
    tag: 'Outils',
    quickSummary: [
      "Trois familles : ERP généralistes adaptés, logiciels métier historiques, nouveaux SaaS verticaux.",
      "Les ERP généralistes coûtent cher et demandent du paramétrage : viables au-delà de 50 agents.",
      "Les logiciels métier historiques ont la couverture fonctionnelle, mais l'UX et le mobile-first sont souvent à la traîne.",
      "Les nouveaux SaaS verticaux misent sur la productivité quotidienne. Couverture variable, à challenger.",
      "Les 8 critères de choix : métier, mobile, preuve de passage, marge par client, RGPD, export, onboarding, prix.",
    ],
    faq: [
      { q: "Quel est le meilleur logiciel pour une société de nettoyage ?", a: "Il n'y a pas de meilleur logiciel dans l'absolu : ça dépend de la taille (3-50 agents vs 50+), du mix client (syndics, hôtels, médical, industriel), et du niveau de digitalisation actuel. La grille de lecture ci-dessous donne les bons critères de comparaison." },
      { q: "Combien coûte un logiciel pour société de nettoyage ?", a: "De 15€ à 60€ par utilisateur/mois pour la plupart des SaaS verticaux. Les ERP généralistes coûtent souvent 100€+/utilisateur avec une mise en route facturée plusieurs milliers d'euros. Méfiance des packages 'tout compris' à 200€ flat : souvent limités." },
      { q: "Faut-il un logiciel installé ou en SaaS ?", a: "SaaS dans 95% des cas. L'installé impose des coûts de maintenance, des sauvegardes à gérer en interne, et bloque le travail terrain (agents mobiles). Les SaaS modernes sont plus sûrs, plus à jour, et accessibles depuis n'importe quel téléphone." },
      { q: "Mes agents doivent-ils installer une application ?", a: "Idéalement non. Les meilleurs outils 2026 fonctionnent via un lien web ouvert dans le navigateur du téléphone de l'agent. Pas d'app à installer, pas de formation, pas de blocage Android/iOS. Si un outil exige une app native, vérifiez l'expérience réelle sur 4G dégradée." },
      { q: "Quels critères vérifier en démo ?", a: "Demandez à voir : (1) l'affectation d'un agent en 1 clic, (2) l'écran mobile que verra l'agent, (3) la génération d'un PV de passage avec photos, (4) la marge en temps réel sur un client donné, (5) l'export complet de vos données. Si l'un des cinq prend plus de 30 secondes ou nécessite un 'on vous montrera plus tard', méfiance." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils'],
    content: `## Le marché des logiciels nettoyage en 2026

La propreté B2B française compte plus de 15 000 sociétés. Le marché des logiciels qui leur sont destinés a explosé depuis 2022, mais reste **structuré en trois familles** très différentes.

Avant de choisir, il faut comprendre quelle famille répond vraiment à votre stade et à votre besoin. Spoiler : ce n'est pas une question de fonctionnalités cochées, c'est une question d'usage quotidien.

## Famille 1 : Les ERP généralistes adaptés (Sage, Cegid, Divalto)

Ce sont des progiciels conçus pour gérer une PME au sens large : compta, facturation, RH, parfois CRM. Adaptés au nettoyage via un module métier ou du paramétrage spécifique.

### Ce qu'ils savent faire

- Couverture comptable et fiscale complète
- Multi-sociétés, multi-établissements, multi-devises
- Intégration native paie (URSSAF, DSN)
- Reporting financier costaud

### Ce qu'ils savent moins bien faire

- **Le terrain.** Les écrans agents sont souvent un afterthought. L'agent qui veut consulter son planning sur son téléphone galère.
- **L'affectation rapide.** Pas pensé pour drag-and-droper un agent sur un créneau en 5 secondes.
- **La preuve de passage.** Quasi inexistante en standard, à développer en spécifique (cher).

### Verdict honnête

**Viable à partir de 50 agents et plusieurs millions de CA.** En-dessous, le coût d'acquisition (15 000 à 50 000€ d'intégration) et la complexité d'usage rendent la valeur ajoutée discutable. Vous payez pour de la robustesse comptable dont vous n'avez pas (encore) besoin.

## Famille 2 : Les logiciels métier historiques (Praxedo, Synchroteam, Comète Propreté)

Ce sont des outils nés dans les années 2000-2010, conçus dès le départ pour les services à la personne, le BTP, ou la propreté B2B. Couverture fonctionnelle souvent excellente, design plus daté.

### Ce qu'ils savent faire

- Planning et affectation multi-sites
- Catalogue prestations sectoriel
- Devis et facturation métier
- Mobile pour les agents (avec ou sans app dédiée)

### Ce qu'ils savent moins bien faire

- **L'UX 2026.** Beaucoup d'écrans encore en tableaux denses, courbes d'apprentissage longues.
- **Le mobile-first.** Souvent une app à installer, parfois capricieuse en zone 4G dégradée.
- **La marge par client en temps réel.** Disponible via reporting, rarement en surface dans l'écran de pilotage.

### Verdict honnête

**Solide choix entre 10 et 80 agents** si vous acceptez le compromis UX. Le rapport couverture/prix est correct (30 à 60€/utilisateur/mois généralement). Demandez impérativement une démo terrain (pas commerciale) sur **le téléphone d'un agent en conditions réelles**.

## Famille 3 : Les nouveaux SaaS verticaux (Proprely et autres)

Vague récente (2022-2026) de SaaS conçus dès le départ pour une niche métier. Mobile-first, UX moderne, intégrations natives.

### Ce qu'ils savent faire

- Affectation drag-and-drop en 5 secondes
- Lien web sur téléphone agent (aucune app à installer)
- Preuve de passage QR + photos + signature native
- Marge par client visible en temps réel
- Export complet des données en 1 clic

### Ce qu'ils savent moins bien faire

- **Couverture fonctionnelle variable.** Vérifiez la profondeur (multi-sociétés, reporting consolidé, multi-devises) si vous en avez besoin.
- **Maturité comptable.** L'intégration paie/compta passe souvent par une connexion native vers Pennylane, Sage ou autre. Pas autonome.
- **Track record.** Outils jeunes, exigez de parler à 2-3 clients en production avant de signer.

### Verdict honnête

**Idéal entre 3 et 50 agents** si la productivité quotidienne (gain d'heures par semaine) compte plus que la couverture exhaustive. Coûts généralement plus bas (15 à 40€/utilisateur/mois), onboarding plus rapide (30 minutes à 1 journée), pas de coût d'intégration caché.

## Les 8 critères qui comptent vraiment

Quel que soit le candidat, vérifiez ces 8 points lors de la démo. Si un seul tombe, négociez ou cherchez ailleurs.

### 1. Pensé métier, pas adapté métier

Posez la question : "C'est un outil qui a été conçu **pour** les sociétés de nettoyage, ou un outil généraliste **adapté** ?" La différence se voit en 10 secondes : si la démo commence par "vous configurez votre catalogue prestations" en mode tableau Excel, c'est adapté. Si elle commence par "voici les spécialités agents (vitrerie, moquette, décapage), elles existent déjà", c'est métier.

### 2. Mobile-first sur l'agent

Demandez à voir l'écran que verra un agent **sur son téléphone**, pas sur un iPad. Sans installer d'app, sur une connexion 4G dégradée si possible. C'est l'usage réel.

### 3. Preuve de passage native

QR code, photos avant/après, signature électronique du client. Doit fonctionner hors-ligne (sous-sols, parkings). PV envoyé automatiquement au client en fin d'intervention.

### 4. Marge par client en temps réel

Pas dans un reporting à compiler. **En surface**, dans l'écran de pilotage. Heures facturées vs heures réelles, marge brute par client, alerte si la marge passe sous un seuil.

### 5. RGPD réel, pas marketing

Hébergement européen, chiffrement en transit et au repos, sous-traitant explicitement nommé. Le contrat de sous-traitance disponible sur demande. Les photos de preuve de passage incluses dans la conformité.

### 6. Export complet en 1 clic

Vos données, en CSV ou Excel, à tout moment. Sans condition, sans frais, sans préavis. C'est votre **filet de sécurité** : sans export libre, vous êtes prisonnier de l'éditeur.

### 7. Onboarding rapide et accompagné

Maximum **1 journée** pour être opérationnel. Si l'éditeur vous parle de "3 à 6 mois de paramétrage avec un consultant intégrateur", c'est un ERP déguisé. Pas adapté au stade PME.

### 8. Prix lisible

Forfait par tranche d'agents ou par utilisateur, communiqué à l'avance. Pas de "on vous fera un devis". Pas de frais cachés (intégration, formation, mise à jour, support prioritaire payant). Le prix après la 1ère année doit être garanti à l'avance.

## La grille de décision en 30 secondes

| Profil | Famille recommandée |
| ------ | ------------------- |
| 3 à 15 agents, croissance | SaaS vertical moderne |
| 15 à 50 agents, structuration | SaaS vertical ou logiciel métier historique |
| 50 à 200 agents, multi-établissements | Logiciel métier historique ou ERP léger |
| 200+ agents, multi-sociétés, multi-pays | ERP généraliste avec module métier |

## Et Proprely dans tout ça ?

Proprely se positionne dans la famille 3 (SaaS vertical moderne), avec un focus très assumé : **les sociétés de 3 à 50 agents qui veulent gagner du temps sur le quotidien**. Mobile-first, preuve de passage native, marge par client en temps réel, export libre, RGPD by design.

Aujourd'hui en **bêta privée gratuite** pour 30 sociétés fondatrices. Onboarding 30 minutes avec le fondateur, tarif privilégié à vie après la bêta. [Candidater à la bêta](/) si le profil correspond.`,
  },
  {
    slug: 'logiciel-devis-nettoyage-gratuit',
    title: "Logiciel de devis nettoyage gratuit : ce qu'il faut savoir avant de chercher",
    excerpt: "\"Gratuit\" cache trois réalités très différentes : freemium limité, vraie gratuité bêta, ou modèle qui revend vos données. Comment trier, et que choisir si vous démarrez.",
    date: '19 mai 2026',
    readTime: '6 min',
    tag: 'Outils',
    quickSummary: [
      "Trois familles de 'logiciels gratuits' : freemium limité, bêta privée temporaire, modèle revente données.",
      "Le freemium limite typiquement à 1-2 devis/mois, 1 utilisateur, pas d'export.",
      "La bêta privée est un vrai gratuit mais limité dans le temps (6-18 mois) et au nombre de places.",
      "La revente de données est interdite par RGPD mais reste pratiquée. Vérifier la politique de confidentialité.",
      "Pour démarrer : commencer par un template Word gratuit, puis basculer vers un SaaS dès 5 devis/mois.",
    ],
    faq: [
      { q: "Existe-t-il un vrai logiciel de devis nettoyage gratuit ?", a: "Oui, sous deux formes : (1) le freemium d'éditeurs établis (avec des limitations strictes : 1-2 devis/mois, pas d'export, pas de signature électronique), et (2) les bêtas privées de SaaS verticaux comme Proprely (accès complet et gratuit, mais limité dans le temps et au nombre de places fondateurs)." },
      { q: "Quelle différence entre logiciel gratuit et template Word ?", a: "Le template Word est gratuit mais demande 15-20 minutes par devis (mise en forme, calcul TVA, signature image). Le logiciel automatise tout : 2-5 minutes par devis, signature électronique native, suivi des relances, marge calculée." },
      { q: "Le devis signé électroniquement a-t-il une valeur juridique ?", a: "Oui, depuis le règlement eIDAS 2014/910/UE. La signature électronique a la même valeur qu'une signature manuscrite, à condition que le prestataire respecte les niveaux de fiabilité (signature simple, avancée ou qualifiée selon le contexte)." },
      { q: "Combien de devis envoyer par mois pour rentabiliser un logiciel payant ?", a: "À partir de 5-8 devis par mois, le ROI est positif : un devis prend 5 minutes au lieu de 20, soit 75 minutes/mois minimum gagnées, ce qui dépasse largement le coût d'un SaaS à 20-40€/mois." },
      { q: "Quel logiciel choisir si je commence ma société de nettoyage ?", a: "Démarrez avec un template Word gratuit le temps de valider votre offre (50 premiers devis). Dès que vous dépassez 5 devis/mois récurrents, basculez vers un SaaS spécialisé : vous récupérez 1h+ par semaine, vous gagnez en pro, vous suivez les conversions." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'comparatif-logiciels-nettoyage-2026'],
    content: `## "Gratuit" : un mot piégé

Quand vous cherchez **"logiciel de devis nettoyage gratuit"** sur Google, vous tombez sur 3 familles d'offres très différentes. La distinction est cruciale, parce que la mauvaise option peut vous coûter plus cher qu'un outil payant honnête.

## Famille 1 : Le freemium limité

C'est le modèle dominant : un éditeur propose une version "gratuite" qui marche, mais qui plafonne tellement vite que vous êtes forcé de passer à la version payante dès que votre activité décolle.

### Les limitations typiques

- **1 ou 2 devis par mois** (au-delà : passage payant obligatoire)
- **1 seul utilisateur** (pas de partage équipe)
- **Pas d'export** de vos données
- **Pas de signature électronique** native (ou bridée à 1 signature/mois)
- Le logo de l'éditeur visible sur vos devis envoyés au client
- **Pas de relances automatiques** des prospects

### Qui c'est pour

Idéal si vous testez votre activité ou si vous envoyez moins de 3 devis par an. Au-delà, vous perdrez plus de temps à contourner les limitations qu'à payer un vrai outil.

## Famille 2 : Les bêtas privées de SaaS verticaux

Modèle récent (2022-2026). Des éditeurs comme **Proprely** lancent leur produit en accès gratuit et complet pour les 20 à 50 premières sociétés sélectionnées comme "membres fondateurs".

### Les conditions typiques

- **Accès complet et gratuit** à toutes les fonctionnalités
- Pas de carte bancaire demandée
- Pas de limites artificielles sur le nombre de devis
- **Tarif privilégié à vie** après la fin de la bêta
- **Limité dans le temps** : la bêta dure typiquement 6 à 18 mois
- **Limité en places** : 20 à 50 entreprises au total

### Qui c'est pour

Idéal pour les sociétés en croissance (3 à 50 agents) prêtes à donner du feedback structuré et à essuyer quelques bugs en échange d'un outil pro gratuit pendant la phase de structuration. C'est le meilleur "gratuit" du marché, mais il faut être sélectionné et accepter le côté "produit en construction".

## Famille 3 : Les modèles qui revendent vos données

À éviter absolument. Certains éditeurs prétendument "gratuits" se rémunèrent en revendant vos données métier (clients, prix pratiqués, marges) à des concurrents, des assureurs, ou des sociétés de prospection.

### Comment les repérer

- **Politique de confidentialité floue** ou inexistante
- Hébergement hors UE (USA, Asie) sans contrat de sous-traitance explicite
- **Mentions légales** introuvables ou incomplètes
- Cookies tiers de tracking publicitaire actifs dès la 1ère visite
- Demande d'accès à votre carnet de contacts ou à votre messagerie

### Pourquoi c'est dangereux

Au-delà du non-respect du RGPD (amende potentielle 4% du CA), vous donnez à des inconnus la cartographie commerciale de votre entreprise. Sortez immédiatement de ces outils.

## Comparatif gratuit vs payant : quand basculer ?

Faisons le calcul honnête.

### Sur Word ou Excel

- Temps moyen par devis : **20 minutes** (mise en forme, calculs TVA, signature image, export PDF)
- Pas de suivi commercial (vous perdez 20 à 30% des prospects faute de relance)
- Pas de signature électronique (client doit imprimer, scanner, renvoyer : 5 à 10 jours de délai)

### Sur un logiciel pro (SaaS vertical)

- Temps moyen par devis : **3 à 5 minutes** (catalogue, calculs auto, signature native)
- Relances automatiques à J+5 et J+10
- Signature électronique en 1 clic, devis signé revenu en quelques heures

### Le seuil de rentabilité

Imaginons un tarif horaire dirigeant à 40€ (chargé). Un devis sur Word vous coûte 20 min × 40€/h = **13,30€ en temps**. Sur un SaaS, 4 min × 40€/h = **2,70€**.

Économie : **10,60€ par devis**.

À 5 devis/mois, vous économisez **53€/mois** = largement plus qu'un SaaS à 20-40€/mois.

**À partir de 5 devis par mois, le SaaS est rentable.**

## La stratégie réaliste pour démarrer

Voici la séquence que nous recommandons aux dirigeants qui démarrent :

### Étape 1 : Les 20 premiers devis

Utilisez un **template Word gratuit** (disponible sur le site de la CCI, sur Office.com, ou via un comptable). Vous validez votre offre, vos prix, votre catalogue prestations. Pas besoin d'outil sophistiqué.

### Étape 2 : Les devis 20 à 100

Si vous êtes encore en pré-amorçage et que les devis restent occasionnels, le template Word tient. Si vous dépassez 5 devis/mois récurrents, **basculez vers un SaaS**.

### Étape 3 : Les devis 100+

À ce stade, vous avez besoin de fonctionnalités au-delà du devis lui-même : catalogue partagé entre commerciaux, relances automatiques, conversion devis → facture en 1 clic, marge calculée en temps réel par client. Un SaaS vertical (famille 2) devient incontournable.

## Proprely et le devis nettoyage

[Proprely](/fonctionnalites/devis-nettoyage) propose son module devis dans le cadre de sa bêta privée gratuite (famille 2 ci-dessus).

Génération en 2 minutes depuis un template à votre charte, signature électronique native, suivi automatique des relances, conversion devis → facture en 1 clic. Marge brute affichée en temps réel pendant que vous construisez votre devis.

Aujourd'hui [30 places fondateurs gratuites](/tarifs). Si le profil correspond, [candidater à la bêta](/) prend 2 minutes.`,
  },
  {
    slug: 'societe-nettoyage-paris',
    title: 'Société de nettoyage à Paris : marché, prix et organisation en 2026',
    excerpt: "Le marché parisien du nettoyage B2B reste l'un des plus denses d'Europe. Voici ce qu'il faut savoir avant d'opérer dans Paris intra-muros : tarifs, contraintes terrain, clients types et profils de prestations qui marchent.",
    date: '18 mai 2026',
    readTime: '9 min',
    tag: 'Marché local',
    quickSummary: [
      "Paris concentre près de 1,7 million d'emplois tertiaires sur 105 km² : densité B2B inégalée en France.",
      "Tarifs Paris : 15 à 25 % au-dessus de la moyenne nationale, justifiés par charges agents, transport et exigences clients.",
      "Trois contraintes terrain spécifiques : stationnement réglementé, accès immeubles haussmanniens, horaires décalés avant 8h.",
      "Recrutement : la majorité des agents habite en grande couronne, gestion des trajets et des retards devient critique.",
    ],
    faq: [
      { q: "Quel est le tarif moyen d'une prestation de nettoyage à Paris ?", a: "Pour le nettoyage courant de bureaux, comptez 28 à 38 € HT/h selon le type de site, l'horaire et la fréquence. C'est 15 à 25 % au-dessus de la moyenne nationale, ce qui compense les charges plus élevées, les temps de trajet agents et le coût des consommables livrés en zone dense." },
      { q: "Quels arrondissements concentrent le plus de demande B2B ?", a: "Le QCA (8e, 9e, 16e, 17e), La Défense en limite ouest, le 13e (Paris Rive Gauche), et le tissu mixte des 11e, 12e, 19e, 20e (PME et cabinets). Les arrondissements à forte densité touristique (1er, 2e, 4e, 5e, 6e) sont dominés par l'hôtellerie et la restauration." },
      { q: "Comment gérer le stationnement et l'accès aux sites en plein Paris ?", a: "Trois leviers : créneaux de livraison négociés avec les clients (avant 9h ou après 19h), véhicules utilitaires éligibles ZFE Crit'Air 1 ou 2, et chariots de transport entre métro et site quand le véhicule n'est pas possible. La majorité des sociétés performantes opèrent sans véhicule en cœur de ville." },
      { q: "Quels sont les types de clients les plus rentables à Paris ?", a: "Les hôtels haut de gamme (marges sur prestations ponctuelles + récurrent stable), les cabinets de conseil et avocats (peu sensibles au prix, exigences qualité), et les syndics de copropriétés tertiaires. Les bureaux corporate sont volumineux mais tendus sur le prix." },
      { q: "La ZFE Paris impacte-t-elle les sociétés de nettoyage ?", a: "Oui depuis 2025 pour Crit'Air 3 et plus. Les véhicules de société datant d'avant 2011 (diesel) et 2006 (essence) sont interdits en circulation dans Paris intra-muros en semaine de 8h à 20h. Beaucoup de sociétés ont basculé sur petits utilitaires électriques ou recourent à des prestataires logistiques pour les fournitures." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'gestion-societe-nettoyage-outils', 'fideliser-agents-nettoyage-turnover'],
    content: `Paris reste, et de loin, le marché B2B le plus dense d'Europe. 1,7 million d'emplois tertiaires sur 105 km², 200 000 entreprises actives, et une concentration de sièges sociaux qui n'a d'équivalent que Londres ou Francfort. Pour une société de nettoyage, c'est un terrain où la demande ne manque jamais — mais où la concurrence, les contraintes terrain et le coût de structure ne pardonnent pas l'amateurisme.

Cet article passe en revue ce qu'il faut savoir avant d'opérer dans Paris intra-muros : structure du marché, tarifs réels, contraintes terrain, profils de clients, et leviers d'organisation qui font la différence.

## Un marché concentré, mais segmenté

La capitale ne se gère pas comme un seul bassin. Quatre macro-zones structurent la demande B2B :

- **Le QCA (Quartier Central des Affaires)** — 8e, 9e, 16e, 17e arrondissements. Sièges sociaux, banques, conseil, juridique. C'est ici qu'on trouve les contrats les plus volumineux, et aussi les exigences les plus strictes.
- **La Défense étendue** — Pas formellement Paris, mais inséparable du marché parisien. Grands comptes, tours, standards ISO. Tarifs hauts, standards élevés. À traiter dans un article dédié.
- **Paris Rive Gauche** — 13e principalement, avec l'extension tertiaire autour de la BNF. Bureaux modernes, immeubles récents, marché en croissance.
- **Le tissu mixte** — 11e, 12e, 19e, 20e. PME, cabinets, professions libérales, start-ups. Contrats plus petits mais plus nombreux et moins disputés.

À cela s'ajoute le **secteur de l'hôtellerie-restauration** (1er, 2e, 4e, 5e, 6e, 18e Montmartre), le **secteur médical** (cabinets, cliniques, laboratoires partout dans Paris), et les **syndics tertiaires** (parties communes d'immeubles haussmanniens des arrondissements ouest).

## Les tarifs réels en 2026

Comptez **28 à 38 € HT/h** pour du nettoyage courant de bureaux, selon trois variables :

- **Horaire** : avant 8h ou après 19h, prévoir +15 à +25 %.
- **Fréquence** : un passage quotidien justifie un tarif moindre qu'un passage hebdomadaire (mobilisation amortie).
- **Type de site** : un cabinet médical avec exigences sanitaires monte à 35-42 €/h, un open space tertiaire standard reste à 28-32 €/h.

La vitrerie se facture entre **32 et 45 € HT/h** selon accessibilité (interne, externe, nacelle, hauteur).

Le décapage / métallisation se chiffre à **42-55 € HT/h** plus fournitures.

Ces tarifs sont **15 à 25 % au-dessus de la moyenne nationale**. C'est rarement de la marge pure : les charges agents IDF (transport, indemnités), le coût des consommables livrés en zone dense, et la pression immobilière sur les locaux d'entreprise expliquent l'essentiel de l'écart.

**Erreur classique** : sous-tarifer pour entrer sur un compte parisien, en pensant rattraper sur le volume. La règle des 3× (prix = 3 × coût horaire chargé) ne se négocie pas à Paris parce que les heures réelles dépassent presque toujours les heures contractuelles — embouteillages, accès, remplacements urgents.

## Trois contraintes terrain spécifiques

### Le stationnement

Paris compte environ 60 000 places de stationnement payant en surface, pour 1,1 million de véhicules pendulaires. Pour un véhicule utilitaire de société de nettoyage, deux options viables : créneaux de livraison avant 9h ou après 19h, ou utilitaires Crit'Air 1 (électrique ou hybride rechargeable).

La **ZFE Paris** interdit en semaine, de 8h à 20h, les véhicules Crit'Air 3 et plus depuis 2025. Concrètement : un utilitaire diesel d'avant 2011 ou essence d'avant 2006 ne rentre plus dans Paris en journée ouvrée. Beaucoup de sociétés ont basculé sur des petits utilitaires électriques (Renault Kangoo E-Tech, Citroën Berlingo Electric) ou recourent à des prestataires logistiques pour les fournitures lourdes.

### L'accès aux immeubles haussmanniens

60 % du bâti parisien est antérieur à 1948. Pour vos agents, cela signifie :

- Pas toujours d'ascenseur (cas fréquent en 5e, 6e, Marais)
- Cages d'escalier étroites limitant les chariots
- Codes d'accès qui changent régulièrement
- Gardiens présents ou non, horaires variables
- Locaux poubelles parfois en sous-sol non éclairé

**À documenter dans Proprely** (ou votre outil de gestion) pour chaque site : code accès, contact gardien, ascenseur oui/non, étages, particularités. Un agent qui découvre ces points sur place perd 15 à 30 minutes par intervention.

### Les horaires décalés

Les bureaux corporate parisiens imposent presque tous un nettoyage **avant 8h ou après 19h**. Open spaces interdits en journée, sécurité réglementée, badges nominatifs. C'est une norme à Paris bien plus qu'en province.

Conséquence opérationnelle : vos agents commencent à 6h ou finissent à 22h. Cela rend le recrutement plus difficile, et impose une organisation par binômes pour les remplacements.

## Recrutement et logistique RH

Les agents de nettoyage à Paris résident très majoritairement en grande couronne : 93, 95, 77, sud du 91. Temps de trajet aller : 45 minutes à 1h15. Trois conséquences directes :

- **Le retard de RER A ou B en heure de pointe peut décaler une équipe entière**. Pas de remplacement instantané possible si vous n'avez pas d'agents en réserve à proximité.
- **Le coût agent réel intègre l'indemnité transport** (50 % du pass Navigo, soit ~45 €/mois minimum) et parfois des indemnités kilométriques pour la grande couronne.
- **Le turnover est plus élevé qu'en province** — autour de 35-40 % par an selon les estimations sectorielles, contre 25-30 % en moyenne nationale.

Bonne pratique : maintenir un **vivier d'agents disponibles à moins de 30 minutes** de chacun de vos sites majeurs. Pour le 92, des agents en 92, 93, 75 ouest. Pour le 75 centre, des agents 75 et 93. Ça limite les remplacements impossibles.

## Les profils clients les plus rentables

Sur la base des retours terrain qu'on collecte auprès des dirigeants parisiens, par ordre de rentabilité moyenne :

1. **Hôtels haut de gamme** — récurrent stable + prestations ponctuelles fréquentes (remises en état, vitrerie événementielle). Marges souvent > 25 %.
2. **Cabinets de conseil et juridiques** — peu sensibles au prix, exigences qualité élevées, contrats longs. Marges 20-25 %.
3. **Cabinets médicaux et cliniques** — exigences sanitaires fortes mais tarifaires acceptés en conséquence. Marges 18-22 %.
4. **Syndics tertiaires** — récurrent prévisible, prestations standardisées. Marges 15-20 %.
5. **Bureaux corporate volumineux** — gros chiffre d'affaires, prix tendus. Marges 10-15 %.

**Vigilance** : les contrats publics et certaines grandes chaînes hôtelières standardisent fortement les prix au m² et imposent des audits qualité réguliers. Rentables si volume, risqués si vous êtes mono-client.

## Comment Proprely change la donne à Paris

Trois bénéfices spécifiques pour un dirigeant qui opère dans Paris intra-muros :

- **Centralisation des accès et particularités site** — code, contact gardien, ascenseur, étages, créneau autorisé. Vos agents arrivent informés, pas après 3 SMS.
- **Planning multi-sites avec vue déplacements** — pour éviter d'envoyer un agent du 13e au 17e entre deux interventions, ou de faire perdre 30 minutes à un agent en RER.
- **Marge réelle par client** — vous voyez immédiatement quel contrat parisien est rentable et lequel mange votre marge. Indispensable dans un marché où l'écart entre heures contractuelles et heures réelles est plus élevé qu'ailleurs.

[Découvrir Proprely](/beta) ou [tester le simulateur de rentabilité](/simulateur-rentabilite) pour mesurer la marge réelle d'un contrat parisien en moins d'une minute.`,
  },
  {
    slug: 'societe-nettoyage-ile-de-france',
    title: 'Gérer une société de nettoyage en Île-de-France : multi-sites et logistique',
    excerpt: "L'Île-de-France concentre 30 % de l'activité française de propreté. Opérer sur les 8 départements implique une organisation différente d'un marché provincial : multi-sites, transport, turnover. Ce qu'il faut anticiper.",
    date: '17 mai 2026',
    readTime: '8 min',
    tag: 'Marché local',
    quickSummary: [
      "30 % du chiffre d'affaires national de la propreté B2B se réalise en Île-de-France selon les données FEP.",
      "8 départements aux dynamiques opposées : 75/92 saturés, 77/91/95 en croissance, 93/94 marchés intermédiaires.",
      "Multi-sites devient la règle dès 5 agents : implique une organisation logistique très différente d'un opérateur provincial.",
      "Turnover IDF 35 à 40 % contre 25-30 % en province : la fidélisation des agents est le levier numéro 1 de rentabilité.",
    ],
    faq: [
      { q: "Quel département IDF est le plus dynamique pour une société de nettoyage ?", a: "Les Hauts-de-Seine (92) restent le département le plus dense en bureaux par habitant, avec La Défense et le sud du département (Boulogne, Issy). En croissance : l'est francilien (Marne-la-Vallée 77), Saint-Quentin-en-Yvelines (78), et certains pôles tertiaires en 91 et 95 (Roissy, Évry-Courcouronnes)." },
      { q: "Faut-il un dépôt à Paris pour opérer en Île-de-France ?", a: "Pas nécessairement. Beaucoup de sociétés efficaces ont leur dépôt en 92, 93 ou 94 (proximité Paris + accessibilité périphérique + loyers raisonnables), voire en grande couronne avec une logistique optimisée. Un dépôt intra-Paris coûte 3 à 5 fois plus cher qu'en banlieue immédiate sans bénéfice opérationnel évident." },
      { q: "Quelle est la zone idéale pour démarrer en IDF ?", a: "Démarrer sur 2-3 communes voisines plutôt que de couvrir tout un département. Exemples : axe Boulogne-Issy-Vanves, axe Pantin-Romainville-Bagnolet, axe Vincennes-Saint-Mandé-Charenton. Avantage : agents sur place, déplacements minimaux, bouche-à-oreille rapide." },
      { q: "Le turnover des agents est-il vraiment plus élevé en IDF ?", a: "Oui, sensiblement. Les estimations sectorielles donnent 35 à 40 % par an en IDF contre 25-30 % en moyenne nationale. Causes : temps de transport, coût de la vie, concurrence d'autres secteurs (logistique Amazon, retail, hôtellerie). Réduire ce turnover de 10 points économise plusieurs milliers d'euros par an pour une société de 10-15 agents." },
      { q: "Comment optimiser les déplacements inter-sites en IDF ?", a: "Trois principes : (1) regrouper les sites d'un même agent dans un rayon géographique cohérent, (2) éviter les déplacements en heure de pointe quand c'est possible (créneaux avant 8h ou après 19h), (3) calculer le coût horaire réel en intégrant temps de trajet — pour un site à 30 minutes, vos heures effectives ne sont pas les heures contractuelles." },
    ],
    relatedSlugs: ['societe-nettoyage-paris', 'fideliser-agents-nettoyage-turnover', 'gestion-societe-nettoyage-outils'],
    content: `Selon les données de la Fédération des Entreprises de Propreté, l'Île-de-France représente près de **30 % du chiffre d'affaires national** du secteur, pour 12 % de la population française. C'est dire la concentration et la rentabilité — potentielle — du marché.

Mais opérer sur les 8 départements franciliens ne se fait pas comme on opère à Bordeaux ou à Nantes. Les distances, la densité, le profil RH et la pression tarifaire impliquent une organisation différente. Voici les leviers spécifiques qui font la différence entre une société qui se développe et une société qui s'épuise.

## Les 8 départements ne se ressemblent pas

L'Île-de-France n'est pas un marché homogène. Elle se compose de huit dynamiques distinctes :

- **Paris (75)** — Le marché le plus dense et le plus disputé. Tarifs hauts, exigences hautes, marges sous pression. À traiter avec un article dédié si on opère essentiellement intra-muros.
- **Hauts-de-Seine (92)** — Le poumon tertiaire francilien. La Défense, Boulogne, Issy, Levallois, Neuilly. Concentration de sièges sociaux. Tarifs hauts, contrats volumineux, exigences proches de Paris.
- **Seine-Saint-Denis (93)** — Marché mixte. Au sud (Saint-Denis, Saint-Ouen, Pantin), forte croissance tertiaire avec arrivée du Grand Paris Express. Au nord, plus industriel. Tarifs intermédiaires, marges souvent meilleures qu'à Paris.
- **Val-de-Marne (94)** — Marché mature. Créteil, Vincennes, Charenton. Tertiaire stable, beaucoup d'établissements de santé. Bon équilibre exigences/marges.
- **Yvelines (78)** — Saint-Quentin-en-Yvelines, Versailles. Pôles tertiaires bien identifiés (Bouygues, Renault, Thales). Tarifs hauts dans les sièges, moins denses en PME.
- **Essonne (91)** — Plateau de Saclay, Évry-Courcouronnes. Croissance tech et recherche. Marché en développement.
- **Seine-et-Marne (77)** — Marne-la-Vallée (Disney, Val d'Europe), Pôle aéroportuaire Sud. Marché dispersé, distances importantes.
- **Val-d'Oise (95)** — Cergy-Pontoise, plateforme Roissy. Marché logistique fort, tertiaire en croissance autour de Roissy.

**Implication pratique** : choisir 2-3 départements adjacents pour démarrer ou se développer, plutôt que de chercher à couvrir toute l'IDF d'un coup. Un opérateur 92+75 ouest peut être beaucoup plus rentable qu'un opérateur 75+93+94 mal coordonné.

## Le multi-sites devient la norme très vite

En province, une société de nettoyage de 8-10 agents gère typiquement 15-20 sites clients. En IDF, le même nombre d'agents gère 25-40 sites — parce que les contrats sont plus petits en moyenne, et parce que les agents sont plus mobiles.

Cette densité de sites change radicalement les besoins opérationnels :

- **Le planning devient impossible à tenir sur Excel** dès 30 sites avec fréquences variables (quotidien, 3×/semaine, hebdo, bi-mensuel).
- **La gestion des accès** (codes, badges, contacts gardien) doit être centralisée, à jour, accessible à tous les agents concernés depuis leur téléphone.
- **Les remplacements en cas d'absence** doivent se faire en quelques minutes : un agent qui appelle à 5h45 pour dire qu'il est malade, c'est 2 à 4 sites à recaler avant 7h.

C'est précisément pour cela que la majorité des sociétés IDF qu'on a interviewées passent à un outil métier entre 5 et 8 agents — alors qu'en province le seuil se situe plutôt à 10-12.

## Le turnover : votre coût caché numéro 1

Les estimations sectorielles concordent : le turnover annuel des agents de nettoyage en Île-de-France oscille entre **35 et 40 %**, contre 25-30 % en moyenne nationale.

Les causes ? Pas seulement le salaire. Trois facteurs reviennent systématiquement :

1. **Les temps de transport** — Un agent qui habite Aulnay et qui travaille à Boulogne perd 3 heures par jour en RER + métro. C'est plus que ses heures sur site.
2. **La concurrence d'autres secteurs** — Amazon Logistic, Carrefour Drive, hôtellerie, restauration rapide. À salaire équivalent, ces secteurs offrent moins de coupures horaires (la coupure 6h-9h / 17h-20h tue le quotidien d'un agent).
3. **Le manque de reconnaissance** — Agents qui se sentent invisibles, qui ne voient jamais leur dirigeant, qui n'ont pas de retour sur leur travail. C'est un classique sectoriel, mais amplifié par la dispersion géographique IDF.

**Calcul** : à 35 % de turnover sur 12 agents, c'est 4 départs par an. À 3 500-5 000 € de coût par départ (recrutement, formation, perte de productivité, surcharge sur les autres), vous perdez **14 000 à 20 000 € par an** en frictions RH.

Réduire ce turnover à 20-25 % est le levier de rentabilité le plus puissant disponible — plus puissant qu'une renégociation tarifaire ou qu'un nouveau client.

[Voir notre article complet sur la fidélisation des agents](/blog/fideliser-agents-nettoyage-turnover) pour les leviers concrets.

## Trois choix structurants quand on démarre en IDF

### Choisir son département de base

L'erreur classique du dirigeant qui démarre : prendre le premier contrat qui se présente, où qu'il soit. À six mois, il a 3 agents dispersés entre Pantin, Versailles et Vélizy. Ingérable.

Mieux : choisir 1 département principal + 1 département adjacent, et y concentrer 70 % de l'activité avant d'étendre. Exemples qui marchent :

- 92 nord (Levallois, Clichy, Neuilly) + ouest parisien (75008, 75017)
- 93 sud (Saint-Denis, Saint-Ouen, Pantin) + nord-est parisien (75019, 75020)
- 94 (Créteil, Charenton, Vincennes) + 75 est (75011, 75012)
- 92 sud (Issy, Vanves, Boulogne, Sèvres) + 75 sud-ouest (75015, 75016)

### Choisir son segment

Plutôt que de prendre tous les types de clients, se spécialiser :

- **Bureaux corporate volumineux** (200+ postes) — gros volume, marges tendues, exigences ISO. Adapté si vous avez déjà 15-20 agents.
- **Cabinets et PME tertiaires** (5-50 postes) — petits contrats nombreux, marges meilleures, moins exigeant. Adapté pour démarrer ou rester PME.
- **Établissements de santé** — cabinets, cliniques, laboratoires. Marges correctes, exigences sanitaires fortes. Spécialisation recommandée si vous savez bien former.
- **Hôtellerie** — récurrent stable + prestations ponctuelles (remises en état, vitrerie, événementiel). Très rentable si vous tenez la qualité.
- **Syndics tertiaires** — parties communes d'immeubles. Récurrent prévisible, peu exigeant. Volumes modestes par site.

Une société qui fait 70 % de son CA sur un segment + 30 % sur deux autres est plus rentable qu'une société qui fait 20 % sur cinq segments.

### Choisir son dépôt

Le dépôt n'est jamais à Paris intra-muros sauf cas très particuliers (loyer 3-5× plus cher, accès véhicules contraint). Les choix qui marchent :

- 92 nord (Gennevilliers, Asnières) si vous opérez 75/92 nord
- 93 sud (Pantin, Bobigny) si vous opérez 75/93/94
- 94 (Ivry, Vitry) si vous opérez 75 sud + 94
- 78 sud-est (Versailles, Vélizy) si vous opérez 78/92 ouest

Loyers entre 80 et 150 €/m²/an, soit 12 000-25 000 €/an pour un dépôt de 150 m² avec véhicules.

## Comment Proprely change la donne en IDF

Pour un dirigeant qui opère en Île-de-France, trois bénéfices spécifiques :

- **Planning multi-sites visuel** — voir d'un coup d'œil qui travaille où, à quelle heure, avec quels accès. Réagir à une absence en 2 minutes.
- **Base accès centralisée** — codes, badges, contacts gardien, particularités. Disponibles sur le téléphone de chaque agent concerné. Fin des SMS de 5h45.
- **Marge réelle par client** — IDF, les heures réelles dépassent presque toujours les heures contractuelles. Le module rentabilité vous montre quel contrat est sain et lequel mange votre marge.

[Découvrir Proprely](/beta) ou [tester le simulateur de rentabilité](/simulateur-rentabilite) pour vérifier la marge réelle de vos contrats IDF.`,
  },
  {
    slug: 'societe-nettoyage-la-defense-92',
    title: 'Nettoyage à La Défense et dans les Hauts-de-Seine : exigences et organisation',
    excerpt: "Le 92 et La Défense en tête concentrent les sièges sociaux et grands comptes les plus exigeants de France. Standards ISO, traçabilité obligatoire, horaires décalés, audits clients : ce qu'il faut savoir pour s'y positionner durablement.",
    date: '16 mai 2026',
    readTime: '8 min',
    tag: 'Marché local',
    quickSummary: [
      "La Défense seule représente 3,2 millions de m² de bureaux et 180 000 salariés : le plus grand quartier d'affaires d'Europe.",
      "Standards qualité élevés : preuve de passage formalisée, ISO 9001 ou équivalent quasi systématique pour les grands comptes.",
      "Horaires décalés : nettoyage avant 7h ou après 20h dans la majorité des immeubles, badges nominatifs obligatoires.",
      "Tarifs en haut de fourchette : 32 à 45 € HT/h pour le courant, jusqu'à 55 €/h pour les prestations techniques.",
    ],
    faq: [
      { q: "Faut-il une certification ISO pour travailler à La Défense ?", a: "Pas obligatoire pour tous les contrats, mais quasi systématique pour les sièges sociaux des grandes entreprises. ISO 9001 (qualité), ISO 14001 (environnement), parfois OHSAS 18001 (sécurité). Beaucoup de donneurs d'ordre l'imposent en condition de réponse aux appels d'offres. Pour une PME, c'est un investissement de 5 000 à 15 000 € sur 1-2 ans, rentabilisé si vous visez ces comptes." },
      { q: "Quels sont les tarifs habituels à La Défense ?", a: "Nettoyage courant : 32 à 45 € HT/h selon exigences et horaires. Vitrerie : 38 à 55 €/h en interne, plus si nacelle obligatoire (cas fréquent dans les tours). Prestations techniques (sols durs, décapage, métallisation) : 45 à 60 €/h. C'est le segment le mieux rémunéré d'Île-de-France." },
      { q: "Quels sont les horaires types pour travailler à La Défense ?", a: "Deux créneaux dominants : 5h-8h pour les open spaces (interdits en journée), et 19h-22h pour les zones secondaires (couloirs, sanitaires, salles de réunion). Quelques rares contrats permettent du nettoyage en journée pour des zones spécifiques (cuisines, restaurants d'entreprise) mais c'est l'exception." },
      { q: "Comment accéder aux tours de La Défense pour nos agents ?", a: "Trois niveaux : (1) badge nominatif délivré par le client après contrôle d'identité et parfois enquête de moralité, (2) badge sous-traitant générique pour les agents permanents, (3) procédure visiteur pour les ponctuels avec accompagnement. Anticipez 2 à 4 semaines de délai pour les nouveaux agents." },
      { q: "Le marché La Défense est-il accessible à une PME du nettoyage ?", a: "Oui mais avec une stratégie ciblée. Les tours principales (Total, AXA, Société Générale, etc.) sont sur des contrats avec les grands groupes Onet, Atalian, Samsic. Mais les immeubles secondaires, les niveaux inférieurs des tours, les co-working et les sièges régionaux sont accessibles aux PME structurées. Comptez 18-24 mois pour percer si vous démarrez de zéro." },
    ],
    relatedSlugs: ['societe-nettoyage-paris', 'societe-nettoyage-ile-de-france', 'logiciel-societe-nettoyage-criteres'],
    content: `**3,2 millions de mètres carrés de bureaux, 180 000 salariés, 500 entreprises dont 15 du CAC 40**. La Défense est le plus grand quartier d'affaires d'Europe occidentale, et le segment le mieux rémunéré du marché français de la propreté B2B. C'est aussi le segment le plus exigeant.

Cet article s'adresse aux dirigeants de société de nettoyage qui se demandent si ce marché est accessible, à quelles conditions, et comment s'y positionner durablement. Il couvre La Défense au sens strict (Puteaux + Courbevoie + Nanterre la Folie) ainsi que les pôles tertiaires des Hauts-de-Seine (Issy, Boulogne, Levallois, Neuilly), qui partagent la même typologie de clients et d'exigences.

## La structure du marché

La Défense ce sont une **soixantaine de tours et d'immeubles de grande hauteur**, sur deux dalles (esplanade nord et esplanade sud), prolongées par les quartiers Coupole-Régnault, Coeur Défense, et les développements récents de Nanterre-La Folie.

Les **sièges sociaux** dominent : Total Energies, AXA, Société Générale, BNP Paribas, Saint-Gobain, Engie, Bouygues, Vinci, Mazars, EY, KPMG, Deloitte, PwC. Plus une couche dense de sociétés de conseil, juridiques, et services financiers.

Le tertiaire francilien hors Défense se structure principalement sur :

- **Boulogne-Billancourt et Issy-les-Moulineaux** — TF1, France Télévisions, Renault, Microsoft France, Cisco. Tertiaire haut de gamme accessible.
- **Levallois-Perret** — Alstom, Pernod Ricard, sièges divers. Marché mature.
- **Neuilly-sur-Seine** — Cabinets juridiques, sociétés de conseil, family offices. Petits volumes mais marges élevées.

## Les exigences spécifiques

### La traçabilité formalisée

À La Défense plus qu'ailleurs, le nettoyage **doit pouvoir se prouver**. Trois niveaux de traçabilité sont attendus :

- **Preuve de passage** par badge ou QR code à l'entrée du site, avec horodatage. C'est la norme dans 80 % des grands comptes.
- **Photos avant/après** des zones critiques (sanitaires, espaces clients, cafétérias). Demandées par les facilities managers pour leurs propres audits.
- **Compte-rendu hebdomadaire ou mensuel** des interventions, anomalies signalées, consommables livrés.

Une société qui ne peut pas fournir ces éléments est éliminée à l'audit initial. Une société qui les fournit à la main (mail + Excel + photos sur WhatsApp) tient un an avant que le client lui demande un outil structuré.

### Les standards qualité

L'ISO 9001 est demandée dans 70 % des appels d'offres La Défense, l'ISO 14001 (environnement) dans 50 %, et l'ISO 45001 (sécurité) dans 30 %. Pour une PME ambitieuse, c'est un investissement de 5 000 à 15 000 € étalé sur 12 à 18 mois, rentabilisé dès le 2e ou 3e contrat décroché.

Des certifications complémentaires peuvent aussi débloquer des comptes :

- **Qualipropre** ou label FEP — référence sectorielle
- **EcoCert** ou label vert — utile sur les comptes sensibles au sujet RSE
- **SST formation** — obligatoire pour beaucoup de prestations sur sites industriels ou techniques

### Les horaires

La quasi-totalité des immeubles La Défense impose un nettoyage **hors heures de bureau**. Deux créneaux dominent :

- **Tôt le matin** (5h-8h) pour les open spaces principaux
- **Le soir** (19h-22h) pour les zones secondaires et l'achèvement

Conséquence RH : vos agents enchaînent souvent deux sites par jour, avec une coupure de 8 à 10 heures au milieu. Ce rythme est invivable pour qui habite loin (45 min de RER aller, 45 min retour, deux fois par jour). Les sociétés performantes recrutent des agents qui habitent **à moins de 30 minutes du 92**, idéalement en 92 ou 93 sud.

### Le contrôle d'accès

Trois niveaux selon les contrats :

1. **Badge nominatif client** — délivré après contrôle d'identité et parfois enquête (cas des banques et défense). Délai 2-4 semaines. Reste au site même quand l'agent est en congés.
2. **Badge sous-traitant générique** — utilisable par tout agent référencé chez vous. Plus souple mais limité à certaines zones.
3. **Accès visiteur** — pour les interventions ponctuelles, avec accompagnement obligatoire d'un référent.

Cette mécanique a un impact direct sur votre organisation : changement d'agent = délai badge = surcharge sur les agents en place. Le turnover coûte plus cher à La Défense qu'ailleurs.

## Les tarifs

Le segment La Défense / 92 tertiaire est le mieux rémunéré du marché français.

**Nettoyage courant bureaux** : 32 à 45 € HT/h selon exigences et horaires. La fourchette haute concerne les sites avec preuve de passage + ISO + horaires très contraints.

**Vitrerie** : 38 à 55 €/h en interne, +30-50 % si nacelle obligatoire (cas fréquent au-dessus du R+5).

**Prestations techniques** : 45 à 60 €/h hors fournitures (décapage, métallisation sols durs, remise en état avant événement).

**Audit qualité mensuel** : compté en plus, 200-400 €/audit selon taille site, parfois inclus dans le forfait.

À ces tarifs, la marge nette d'un contrat bien tenu se situe entre **18 et 28 %**, soit nettement au-dessus de la moyenne sectorielle (12-18 %). Mais elle s'effondre vite si vous ne maîtrisez pas vos heures réelles, vos badges, ou vos remplacements.

## Comment percer quand on est une PME

Trois stratégies qu'on voit fonctionner :

### 1. La spécialisation

Plutôt que de répondre à tous les appels d'offres, choisir un sous-segment : vitrerie haute technicité, décapage spécialisé, remise en état post-événement, nettoyage cabinets juridiques. Devenir la référence sur ce sous-segment dans le 92.

### 2. Le sous-traitant des grands

Onet, Atalian, Samsic ne peuvent pas tout faire. Ils sous-traitent une partie de leurs prestations à des PME locales sur des sites secondaires, des prestations ponctuelles, ou des zones géographiquement éloignées de leurs hubs. C'est une voie d'entrée pour 12-18 mois, avec marges réduites mais expérience et références qui s'accumulent.

### 3. Les comptes secondaires

Plutôt que viser les tours principales (verrouillées), viser :

- Les immeubles secondaires autour de La Défense (côté Courbevoie nord, Puteaux ouest)
- Les niveaux inférieurs de certaines tours (commerces, restaurants d'entreprise)
- Les coworking et sociétés en croissance qui ouvrent leur premier siège (WeWork, Spaces, mais aussi sièges de scale-up)
- Les sièges régionaux d'entreprises basées en province qui ouvrent une antenne La Défense

Comptez **18 à 24 mois** pour atteindre 8-12 contrats stables sur ce marché si vous démarrez de zéro, mais une fois la base constituée, la rétention est très bonne (5-7 ans en moyenne).

## Comment Proprely change la donne sur ce marché

Trois bénéfices spécifiques pour les opérateurs La Défense / 92 tertiaire :

- **Preuve de passage prête à l'emploi** — QR codes, photos avant/après, signature client, exports PDF pour audits. Ce que vos clients vous demandent, livré sans construction maison.
- **Traçabilité documentaire** — contrats, attestations URSSAF, fiches de sécurité, certifications. Centralisées et exportables en 1 clic pour répondre aux audits ISO.
- **Gestion des badges et accès** — pour chaque agent : badges actifs, sites autorisés, dates d'expiration. Fin des surprises au pied de la tour à 5h45.

[Découvrir Proprely](/beta) ou [tester le simulateur de rentabilité](/simulateur-rentabilite) pour vérifier la marge réelle de vos contrats Défense.`,
  },
  {
    slug: 'societe-nettoyage-bordeaux',
    title: 'Société de nettoyage à Bordeaux : un marché en croissance accélérée',
    excerpt: "Bordeaux Métropole est devenue en 10 ans l'un des marchés français de la propreté les plus dynamiques. Tertiarisation rapide, secteur viticole spécifique, patrimoine UNESCO contraint : ce qu'il faut savoir pour s'y développer.",
    date: '15 mai 2026',
    readTime: '7 min',
    tag: 'Marché local',
    quickSummary: [
      "Bordeaux Métropole : 815 000 habitants, +35 % d'emplois tertiaires depuis 2015, 3 nouveaux pôles d'affaires majeurs.",
      "Trois marchés distincts : Bordeaux centre patrimonial, Euratlantique tertiaire, et la couronne périurbaine en croissance.",
      "Secteur viticole : 7 000 propriétés AOC dans la métropole et la Gironde, demande croissante de nettoyage technique de chais.",
      "Tarifs au-dessous de Paris mais dans la moyenne nationale haute : 24 à 32 € HT/h pour le courant.",
    ],
    faq: [
      { q: "Quel est le tarif horaire moyen à Bordeaux ?", a: "Nettoyage courant : 24 à 32 € HT/h selon site et fréquence. Vitrerie : 28 à 38 €/h. Décapage : 38 à 48 €/h. C'est globalement 10 à 15 % en dessous des tarifs parisiens, et dans la moyenne nationale haute. La croissance économique de la métropole a tiré les tarifs vers le haut depuis 2018." },
      { q: "Le secteur viticole est-il un débouché intéressant ?", a: "Oui, et c'est une spécificité bordelaise. 7 000 propriétés viticoles dans la Gironde, dont beaucoup en AOC Bordeaux et Médoc, ont besoin de nettoyage technique de chais (en post-vendanges principalement), de bureaux d'accueil œnotouristique, et de salles de dégustation. Marges souvent meilleures car prestations spécialisées et clients moins sensibles au prix." },
      { q: "Où concentrer son activité à Bordeaux ?", a: "Trois zones distinctes selon votre stratégie : (1) le centre patrimonial (Saint-Pierre, Saint-Michel, Chartrons) pour les commerces, hôtels patrimoine et cabinets, (2) Euratlantique pour les bureaux corporate modernes (LGV, Allianz, MMA), (3) la couronne (Mérignac, Pessac, Talence, Bègles) pour les zones d'activité et les sièges techniques (Dassault, Thales)." },
      { q: "Quelles contraintes spécifiques au centre patrimonial UNESCO ?", a: "Trois contraintes : (1) zones piétonnes étendues (Saint-Catherine, Chartrons, Saint-Pierre) interdites aux véhicules en journée — livraisons avant 11h obligatoires, (2) bâtiments classés avec règles spécifiques sur les produits utilisés (notamment pour les façades et vitreries de bâti historique), (3) accès cours intérieures souvent étroits limitant les chariots et matériels." },
      { q: "Bordeaux est-il un marché accessible pour une nouvelle entreprise ?", a: "Oui, plus accessible que Paris ou Lyon. La croissance économique de la métropole crée plus de nouveaux contrats qu'il n'y a d'acteurs établis. Beaucoup de PME locales se sont créées entre 2018 et 2024 et ont atteint 8-15 agents en 3-4 ans. La concurrence des grands groupes nationaux (Onet, Samsic, Atalian) est présente mais moins étouffante qu'en IDF." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'societe-nettoyage-ile-de-france', 'gestion-societe-nettoyage-outils'],
    content: `En dix ans, Bordeaux Métropole est passée d'un marché de la propreté de second rang à l'un des plus dynamiques de France. **+35 % d'emplois tertiaires depuis 2015**, trois nouveaux pôles d'affaires majeurs (Euratlantique, Bordeaux Plaine Rive Droite, Mérignac aéropôle), et une métropole qui a gagné 80 000 habitants sur la décennie.

Pour une société de nettoyage qui veut s'y développer — ou qui s'y développe déjà — l'analyse de marché diffère significativement de celle d'une grande ville historiquement tertiarisée comme Lyon ou Paris. Voici les spécificités structurantes.

## Trois marchés en un

Bordeaux ne se gère pas comme un seul bassin. Trois macro-zones aux dynamiques très différentes :

### Le centre patrimonial

Saint-Pierre, Saint-Michel, Chartrons, Quinconces, Sainte-Catherine. La ville classée UNESCO en 2007, qui concentre commerces, hôtels patrimoine, cabinets et professions libérales, sièges régionaux historiques.

Caractéristiques opérationnelles :

- **Zones piétonnes étendues** (rue Sainte-Catherine, Saint-Pierre, Chartrons) : livraisons et accès véhicules avant 11h ou après 19h.
- **Bâtiments classés** : règles spécifiques sur les produits utilisés pour façades et vitreries de bâti historique. Demande croissante de produits éco-certifiés.
- **Hôtels patrimoine** (Grand Hôtel, Burdigala, Yndo, etc.) : prestations exigeantes, récurrent stable + ponctuel événementiel.

Tarifs cible : 26-32 € HT/h pour le nettoyage courant, jusqu'à 40 €/h pour les prestations sur bâti classé.

### Euratlantique et la rive droite

Le grand projet d'aménagement autour de la LGV Bordeaux-Saint-Jean (depuis 2017), ainsi que la rive droite (Bastide-Niel, Brazza, Floirac) : c'est ici que se construit le Bordeaux tertiaire moderne.

Caractéristiques :

- **Immeubles corporate récents** (Allianz, MMA, BNP Paribas, Crédit Agricole) avec exigences standardisées.
- **Bureaux flex et coworking** en forte croissance (WOJO, Spaces, Wellio).
- **Tertiaire santé** autour de l'hôpital Saint-André et des nouveaux développements.

Tarifs cible : 24-30 € HT/h pour le courant, comparable IDF moyenne mais avec marges souvent meilleures car charges agents inférieures.

### La couronne métropolitaine

Mérignac (siège de Dassault, Thales, Snecma, l'aéropôle), Pessac (Bordeaux Bersol, campus universitaire), Talence et Bègles. C'est ici qu'on trouve :

- **Les sièges techniques** des grandes entreprises du Sud-Ouest
- **Les zones d'activité** logistiques et industrielles
- **Les campus universitaires et de recherche**

Caractéristiques opérationnelles : sites plus volumineux, contrats avec marchés publics fréquents (universités, CHU), moins de contraintes d'accès qu'en centre.

Tarifs cible : 22-28 € HT/h, marges souvent confortables sur les contrats privés (Dassault, Thales sites secondaires).

## Le secteur viticole : une spécificité à exploiter

Bordeaux et la Gironde concentrent **environ 7 000 propriétés viticoles AOC**. Beaucoup sont en zone métropolitaine ou périurbaine immédiate.

Trois types de prestations en demande croissante :

### Nettoyage technique de chais

Avant et après vendanges (août-septembre puis octobre-novembre), les chais doivent être nettoyés en profondeur : sols, cuves, équipements, salles de vinification. C'est une prestation ponctuelle annuelle, souvent facturée en forfait, qui peut représenter **3 000 à 12 000 € par propriété** selon taille.

### Bureaux d'accueil œnotouristique

La majorité des grandes propriétés (et de plus en plus de petites) ont développé un accueil œnotouristique structuré : salles d'accueil, espaces de dégustation, parfois restaurant ou hébergement. Ces espaces ont besoin d'un nettoyage récurrent semaine + remise en état après événements (mariages, séminaires, événements œnotouristiques).

### Restaurants et hébergements gastronomiques

Le tourisme œnologique a fait exploser l'hôtellerie haut de gamme et la restauration gastronomique en Gironde. Demande forte de nettoyage spécialisé (cuisines pro, vitrerie, sols techniques).

**Tarifs cible secteur viticole** : 28 à 42 € HT/h pour les prestations standard, jusqu'à 55 €/h pour les prestations techniques (sols cuves, vitrerie spécifique). Les clients sont rarement sensibles au prix mais très sensibles à la fiabilité.

## Les contraintes terrain à anticiper

### Le centre piéton et la circulation

La rue Sainte-Catherine (longue de 1,2 km, première rue commerçante d'Europe en longueur) et toute la zone Saint-Pierre / Chartrons sont fermées aux véhicules en journée. Vos livraisons et vos agents accèdent **avant 11h ou après 19h**.

Bordeaux a aussi mis en place une **ZFE-m** (zone à faibles émissions mobilité) depuis 2024, restreignant les véhicules les plus polluants. Pour une société qui se renouvelle, ce n'est pas un obstacle. Pour un parc ancien, ça impose un calendrier de renouvellement.

### Le tram et les pistes cyclables

L'extension du tramway (lignes A, B, C, D) a transformé l'accès à de nombreux quartiers. Avantage : vos agents peuvent venir en transport sans dépendre de la voiture. Inconvénient : certains itinéraires véhicules sont rallongés par les voies dédiées tram et vélo.

### Le climat océanique

Pluies fréquentes en automne-hiver, ce qui augmente la fréquence des passages sur sols durs (halls, entrées) et la consommation de tapis absorbants. À intégrer dans vos devis pour les sites avec forte fréquentation publique.

## Recrutement et coût agents

Le marché RH bordelais est **moins tendu qu'en IDF** mais s'est resserré depuis 2020 avec l'afflux d'actifs (notamment du télétravail parisien). Le coût horaire chargé d'un agent qualifié à Bordeaux se situe entre **18 et 22 €/h**, contre 20-25 € en IDF.

Le turnover sectoriel se situe entre **25 et 30 %**, soit 10 à 15 points en dessous de l'IDF. C'est un avantage structurel important pour la rentabilité.

Bassins de recrutement principaux : Bordeaux centre, Bègles, Cenon, Lormont, Floirac. Pour les sites en rive gauche, agents souvent en rive gauche ; pour les sites Mérignac/Pessac, agents souvent en couronne sud-ouest.

## Comment Proprely change la donne à Bordeaux

Trois bénéfices spécifiques pour les opérateurs Bordeaux Métropole :

- **Multi-sites optimisé** — gérer simultanément centre piéton (contraintes accès), Euratlantique (corporate), couronne et propriétés viticoles avec un seul outil et un seul planning.
- **Prestations ponctuelles structurées** — vendanges, événementiels, remises en état : devis rapides, suivi des interventions, facturation au passage. Là où Excel coince.
- **Marge réelle par client** — particulièrement utile sur le secteur viticole où les prestations ponctuelles ont des marges très variables selon le site.

[Découvrir Proprely](/beta) ou [télécharger nos modèles gratuits](/ressources) (devis, planning, suivi heures) pour structurer votre activité bordelaise.`,
  },
  {
    slug: 'trouver-clients-b2b-nettoyage',
    title: "Comment trouver des clients B2B en nettoyage : 8 canaux qui marchent en 2026",
    excerpt: "Le bouche-à-oreille ne suffit plus. Les 8 canaux concrets pour décrocher de nouveaux contrats récurrents en propreté B2B : ce qui marche, ce qui coûte cher pour rien, et comment prioriser selon votre stade.",
    date: '20 mai 2026',
    readTime: '10 min',
    tag: 'Stratégie',
    quickSummary: [
      "Le bouche-à-oreille reste le canal #1 (35-45% des nouveaux contrats) mais ne suffit plus pour croître.",
      "Google Business Profile + SEO local = canal le plus rentable à long terme (CAC < 100 €).",
      "LinkedIn fonctionne pour cibler facility managers et syndics — pas pour les TPE locales.",
      "Les appels d'offres publics demandent 30-50h de préparation pour un taux de gain de 5-15%.",
      "Capterra/GetApp/SoftwareAdvice : faible volume mais leads très chauds (B2B SaaS uniquement).",
      "Évitez Google Ads bas-de-funnel sans landing pages dédiées (CAC × 3-5).",
    ],
    faq: [
      { q: "Quel est le meilleur canal d'acquisition pour une société de nettoyage B2B ?", a: "Le bouche-à-oreille reste #1 (35-45% des contrats) mais ne passe pas à l'échelle. À court terme : Google Business Profile + SEO local sur votre ville. À moyen terme : LinkedIn pour les comptes tertiaires, démarchage des syndics pour les copropriétés, partenariats avec courtiers facility management." },
      { q: "Combien coûte un nouveau client B2B en nettoyage ?", a: "Variable selon canal. Bouche-à-oreille : 0 € (mais limité). SEO local : 50-200 € de CAC à terme. Démarchage commercial direct : 800-2000 €. Appels d'offres publics : 1500-5000 € (préparation + temps perdu sur dossiers non gagnés). Google Ads sans landing pages dédiées : 1500-3000 €." },
      { q: "Faut-il payer un commercial dédié à la prospection ?", a: "À partir de 15-20 agents et 200 K€ de CA récurrent. Avant, le dirigeant gère la prospection lui-même via canaux passifs (Google, LinkedIn, bouche-à-oreille). Un commercial dédié sans système de CRM coûte plus qu'il ne rapporte la 1ère année." },
      { q: "Les appels d'offres publics valent-ils la peine ?", a: "Oui pour les sociétés de 15+ agents avec un commercial dédié. Préparation d'un dossier : 30-50 heures. Taux de gain moyen : 5-15%. Marges souvent compressées. Mieux vaut cibler les marchés publics à enveloppe < 100 K€ (moins de concurrence)." },
      { q: "Combien de temps pour voir des résultats SEO local ?", a: "3 à 6 mois pour apparaître sur les requêtes locales (logiciel nettoyage Paris, société propreté Lyon). 6-12 mois pour ranker sur les requêtes commerciales pures. La fiche Google Business Profile peut générer des appels dès le 1er mois si elle est complète." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'fideliser-agents-nettoyage-turnover'],
    content: `## Pourquoi le bouche-à-oreille ne suffit plus

En 2026, 35 à 45% des nouveaux contrats d'une société de nettoyage B2B viennent du bouche-à-oreille. C'est le canal numéro 1, et ça restera vrai. Mais c'est aussi un canal **non-actionnable** : vous ne pouvez pas l'accélérer en travaillant plus, et il plafonne avec votre carnet d'adresses.

Pour passer de 5 agents à 15, de 15 à 50, il faut **systématiser l'acquisition**. Voici les 8 canaux qui fonctionnent réellement, classés par rentabilité à moyen terme.

## Canal 1 : Google Business Profile + SEO local

**Le canal le plus rentable à long terme.** Une fiche Google Business Profile complète (photos, horaires, zone d'opération, avis clients) génère des appels directs sans intermédiaire ni clic payant.

### Ce qui fonctionne

- Remplir 100% des champs (catégorie, sous-catégories, services, attributs)
- Publier 1 photo/semaine pendant 3 mois (intervention, équipe, locaux)
- Demander systématiquement un avis Google après chaque mission validée
- Ajouter les questions/réponses fréquentes

### Coût et délai

- Coût : 0 € de média + ~2h/semaine
- Premiers appels : 4-8 semaines
- Volume pic : 5-15 appels qualifiés/mois selon ville et concurrence

### Pour qui

Toutes les sociétés de nettoyage avec une présence physique (bureau, dépôt, ou même domicile). Indispensable à partir de 3 agents.

## Canal 2 : SEO sur votre site

Le complément naturel du Google Business Profile. Une dizaine d'articles bien optimisés sur votre ville (ex: "Société de nettoyage à Paris : marché, prix, organisation") génèrent un trafic régulier de prospects qualifiés.

### Ce qui fonctionne

- Pages villes/spécialités spécifiques ("nettoyage bureaux Paris 17", "nettoyage cabinet médical Lyon")
- Articles guides ("Combien coûte un nettoyage de bureau au m² en 2026")
- Calculateurs interactifs (le calculateur ROI Proprely en est un exemple)
- Templates téléchargeables avec capture email (devis, planning, suivi heures)

### Coût et délai

- Coût : ~500-2000 € en contenu rédigé ou 20-40h de temps interne par mois
- Premiers visiteurs SEO : 2-4 mois
- Volume pic : 50-300 visites organiques/mois après 12 mois

### Pour qui

Sociétés qui veulent investir dans un canal pérenne. Pas adapté si vous cherchez du trafic en 30 jours.

## Canal 3 : LinkedIn

Pour cibler **les facility managers, directeurs immobiliers, gestionnaires de syndic**. Inefficace pour les TPE locales (boulangerie, cabinet médical) qui ne sont pas sur LinkedIn.

### Ce qui fonctionne

- Profil personnel du dirigeant complet, avec son numéro, mail
- 1 post/semaine : retour de chantier, photo équipe, conseil métier
- Sales Navigator pour identifier les facility managers de votre zone (199 €/mois)
- 20-30 connexions ciblées par semaine avec message personnalisé court

### Coût et délai

- Coût : 199 €/mois (Sales Navigator) + 5-8h/semaine
- Premiers RDV : 6-12 semaines
- Volume pic : 1-3 RDV qualifiés/semaine après 6 mois

### Pour qui

Sociétés qui visent des contrats tertiaires (bureaux 500 m²+), copropriétés gérées par syndics nationaux, hôtels chaînes.

## Canal 4 : Démarchage téléphonique et terrain

**Le canal le plus inconfortable mais souvent le plus efficace à court terme.** Appeler ou passer dans une boutique pour proposer un devis fonctionne — encore — en 2026.

### Ce qui fonctionne

- Cibler par zone géographique (rue par rue dans une zone tertiaire)
- Carte de visite + flyer professionnel laissé à l'accueil
- Suivi à 7 jours par téléphone
- Statistique réaliste : 2-3% de conversion en RDV, 30-50% de RDV en contrat

### Coût et délai

- Coût : votre temps + impressions papier
- Premiers contrats : 2-6 semaines
- Volume pic : 2-5 nouveaux contrats/mois à 4-6h de prospection/semaine

### Pour qui

Phase démarrage. Toutes les sociétés en phase de structuration commerciale.

## Canal 5 : Appels d'offres publics

**Marchés publics, hôpitaux, mairies, lycées**. Volumes importants, marges compressées, processus lourd.

### Ce qui fonctionne

- Cibler les marchés à enveloppe < 100 K€ (moins de concurrence sérieuse)
- Veille via BOAMP, AWS Achat, mPlace
- Préparer un dossier "type" réutilisable (mémoire technique, références, RSE)
- Statistique réaliste : 5-15% de taux de gain pour un primo-candidat

### Coût et délai

- Coût : 30-50h par dossier de préparation
- Premiers contrats : 2-6 mois
- Volume pic : 1-3 marchés/an

### Pour qui

Sociétés de 15+ agents avec un commercial dédié et une trésorerie qui supporte des paiements à 60 jours.

## Canal 6 : Partenariats avec syndics et facility managers

**Le canal le plus stable.** Un partenariat avec un gestionnaire de syndic peut générer 5 à 20 immeubles d'un coup.

### Ce qui fonctionne

- Lister les syndics de votre zone (300 m de rayon autour de votre dépôt)
- Demander un RDV de 30 min pour présenter votre offre
- Commission discrète au gestionnaire (5-10% du premier mois de contrat, à formaliser)
- Reporting standardisé qui leur facilite la vie (preuve de passage avec PV automatique)

### Coût et délai

- Coût : votre temps + qualité de service
- Premiers contrats : 2-4 mois
- Volume pic : 1-3 nouveaux immeubles/mois

### Pour qui

Sociétés qui visent les copropriétés ou les ASL. Indispensable au-delà de 10 immeubles.

## Canal 7 : Plateformes B2B (Capterra, GetApp, Trustpilot, Google Reviews)

Pour le **SaaS** spécifiquement (donc pour vous **client** d'outils comme Proprely, pas pour les sociétés de nettoyage classiques). Cité ici car certains éditeurs SaaS de propreté commencent à publier des annuaires.

### Pour les sociétés de nettoyage classiques

Trustpilot et Google Reviews sont à entretenir : un client qui choisit entre 3 prestataires regarde les avis. 30+ avis avec une note > 4,5/5 fait la différence.

## Canal 8 : Google Ads et Facebook Ads

**À éviter en bas-de-funnel sans landing pages dédiées.** Le CAC explose à 1500-3000 € sur des mots-clés concurrentiels comme "logiciel société nettoyage" ou "société propreté Paris".

### Quand ça fonctionne

- Vous avez une landing page ultra-spécifique par mot-clé
- Vous avez un système de tracking des conversions (téléphone, formulaire, RDV)
- Votre site convertit déjà 2%+ en trafic organique (sinon n'investissez pas)
- Vous testez un budget < 500 € sur 2 semaines avant de monter

### Pour qui

Sociétés avec budget marketing structuré et au moins 500 K€ de CA. Avant, optimisez d'abord vos canaux 1-6.

## La séquence recommandée selon votre stade

### Stade 1 : 0-5 agents (démarrage)

1. Google Business Profile complet
2. 5-10 visites/semaine en démarchage terrain
3. Demander 1 avis Google après chaque mission
4. Partenariat avec 1 ou 2 syndics

### Stade 2 : 5-15 agents (structuration)

5. Site web pro avec 3-5 pages clés (homepage, services, contact, blog)
6. 1 article SEO/mois sur la propreté locale
7. Profil LinkedIn dirigeant actif

### Stade 3 : 15-50 agents (croissance)

8. CRM pour suivre prospects (voir [CRM entreprise propreté](/crm-entreprise-proprete))
9. Présence commerciale sur appels d'offres locaux
10. Sales Navigator + démarchage facility managers
11. SEO complet (15-20 articles, pages villes, calculateurs)

## Le réflexe à acquérir : tracker vos canaux

Sans système qui mesure d'où vient chaque prospect, vous investissez à l'aveugle. La question à se poser à chaque nouveau client : **"Comment nous avez-vous trouvés ?"** et noter la réponse dans une fiche client.

Au bout de 6 mois, vous voyez ce qui fonctionne dans **votre** zone, avec **votre** offre, pour **votre** taille. Pas besoin de stratégie marketing magique : du tracking simple suffit.

## Aller plus loin

Si vous gérez aujourd'hui ces canaux dans plusieurs fichiers Excel ou WhatsApp, vous perdez 40-60% des relances et opportunités. [Proprely centralise la partie commerciale](/crm-entreprise-proprete) (pipeline, relances, suivi par client) directement dans votre cockpit. [Candidater à la bêta gratuite](/beta) ou [voir le guide complet du logiciel propreté](/logiciel-societe-nettoyage).`,
  },
  {
    slug: 'convention-collective-nettoyage-idcc-3043',
    title: "Convention collective nettoyage IDCC 3043 : guide pratique 2026",
    excerpt: "La convention collective des entreprises de propreté (IDCC 3043) régit 500 000 salariés en France. Grille salariale, heures, primes, transferts, RSE : le guide complet pour les dirigeants en 2026.",
    date: '20 mai 2026',
    readTime: '12 min',
    tag: 'Conformité',
    quickSummary: [
      "IDCC 3043 — Convention collective des entreprises de propreté — régit ~500 000 salariés en France.",
      "Grille salariale 2026 : agent service propreté niveau AS1 à 11,99 €/h, ASP à 12,42 €/h, ATQS à 13,32 €/h.",
      "Heures complémentaires majorées à 10% (1 à 8h), 25% au-delà — règles spécifiques convention.",
      "Article 7 : transfert automatique du personnel en cas de perte de marché. Obligation légale, pas une option.",
      "Prime d'expérience à partir de 4 ans d'ancienneté chez le même employeur.",
      "Heures de nuit (21h-6h) majorées à 20%, dimanche à 100%, jours fériés à 100%.",
    ],
    faq: [
      { q: "Quelle convention collective s'applique aux entreprises de nettoyage ?", a: "La Convention collective nationale des entreprises de propreté et services associés (IDCC 3043), créée par accord du 26 juillet 2011 et étendue par arrêté ministériel. Elle s'applique à toutes les entreprises de propreté de droit privé en France (code NAF 81.21Z, 81.22Z, 81.29A, 81.29B principalement)." },
      { q: "Quel est le salaire minimum d'un agent de propreté en 2026 ?", a: "Niveau AS1 (agent de service propreté débutant) : 11,99 €/h brut au 1er janvier 2026, soit ~1818 € brut/mois pour 35h. Niveau ASP (qualifié) : 12,42 €/h. Niveau ATQS (très qualifié, ex: chef d'équipe) : 13,32 €/h. La grille est révisée annuellement par accord de branche." },
      { q: "Qu'est-ce que l'article 7 et pourquoi est-il critique ?", a: "L'article 7 de la convention IDCC 3043 prévoit le transfert automatique des salariés affectés à un marché en cas de changement de prestataire. Concrètement : si vous gagnez un marché à un concurrent, vous reprenez ses agents (avec leur ancienneté, contrat, salaire). Si vous perdez le marché, vos agents partent chez le successeur. Obligation légale, pas négociable. Implique une due diligence RH avant tout transfert." },
      { q: "Les heures de nuit, dimanche et jours fériés sont-elles majorées ?", a: "Oui. Heures de nuit (21h à 6h) : +20%. Dimanche : +100% du taux horaire. Jours fériés travaillés : +100% (ou repos compensateur double si négocié). Ces majorations sont obligatoires dans la branche, indépendamment de votre contrat de travail." },
      { q: "Comment fonctionne la prime d'expérience ?", a: "À partir de 4 ans d'ancienneté chez le même employeur, l'agent bénéficie d'une prime d'expérience versée mensuellement. Montant variable selon l'accord d'entreprise. Souvent forfaitaire (30-80 €/mois pour 4-10 ans, jusqu'à 150 €/mois au-delà de 15 ans). Vérifier votre accord d'entreprise ou la dernière révision IDCC 3043." },
      { q: "Quelles obligations RSE et formation impose la convention ?", a: "La branche impose 0,55% de la masse salariale en formation (CDI/CDD) à partir de 11 salariés. Plan annuel de formation à présenter au CSE. Égalité professionnelle homme/femme (rapport annuel). Pénibilité (exposition produits chimiques) : suivi médical renforcé pour les agents exposés aux produits CMR." },
    ],
    relatedSlugs: ['calcul-heures-agents-nettoyage', 'fideliser-agents-nettoyage-turnover'],
    content: `## L'essentiel à connaître sur la convention IDCC 3043

La Convention collective nationale des entreprises de propreté et services associés, identifiée sous le numéro **IDCC 3043**, régit environ 500 000 salariés en France. Si vous dirigez une société de nettoyage B2B (codes NAF 81.21Z, 81.22Z, 81.29A, 81.29B), elle s'applique obligatoirement à vos contrats de travail.

Méconnaître cette convention coûte cher : redressement URSSAF, prud'hommes, perte de marché lors d'un transfert article 7 mal géré. Ce guide synthétise les 6 points qui font la différence au quotidien en 2026.

## Grille salariale 2026

La grille est révisée chaque année par accord de branche. Au 1er janvier 2026, les minima conventionnels (35h hebdomadaires, sans prime ni majoration) sont :

| Niveau | Coefficient | Taux horaire brut | Salaire brut mensuel base 35h |
| ------ | ----------- | ----------------- | ----------------------------- |
| AS1 (Agent Service Propreté débutant) | 110 | 11,99 € | 1 818 € |
| AS2 | 130 | 12,15 € | 1 842 € |
| ASP (Agent Service Propreté qualifié) | 150 | 12,42 € | 1 884 € |
| ATQS (Agent Très Qualifié Service) | 175 | 13,32 € | 2 020 € |
| Chef d'équipe | 195 | 14,20 € | 2 153 € |
| Inspecteur / Responsable secteur | 235 | 16,80 € | 2 548 € |

**Attention** : ces montants sont des **planchers**. Vous pouvez et devez parfois payer plus selon le marché local, la spécialité (vitrerie hauteur, décapage, médical), et l'ancienneté.

## Heures complémentaires et supplémentaires

### Pour les temps partiels (cas le plus fréquent en propreté)

- Heures complémentaires de 1 à 8h au-delà du contrat : **+10%** du taux horaire
- Heures complémentaires au-delà de 8h hebdomadaires : **+25%**
- Plafond : maximum 1/3 de la durée contractuelle (ex: 10h sur un contrat 30h = limite à 10h complémentaires/semaine)

### Pour les temps complets

- 35-43h : +25%
- 44h et plus : +50%

### Le piège classique

Beaucoup de dirigeants oublient de majorer les heures complémentaires des temps partiels (qui représentent 60-70% des effectifs propreté). Cumulé sur un an, c'est un redressement URSSAF assuré lors du contrôle.

## Heures de nuit, dimanche et jours fériés

| Période | Majoration |
| ------- | ---------- |
| Nuit (21h à 6h) | +20% |
| Dimanche | +100% |
| Jour férié travaillé | +100% (ou repos compensateur double) |
| 1er mai travaillé | +100% obligatoire **sans dérogation** |

Le 1er mai a un statut spécifique : seuls les services indispensables peuvent demander à un agent de travailler. Refus possible sans sanction.

## L'article 7 : la règle qui change tout

C'est l'article le plus important de la convention pour un dirigeant.

### Le principe

Quand un marché change de prestataire (vous gagnez ou vous perdez un contrat), les salariés affectés à ce marché sont **transférés automatiquement** au nouveau prestataire, avec :

- Leur ancienneté conservée
- Leur contrat de travail (avec ses spécificités, primes, accords individuels)
- Leur salaire de base

### Les conditions du transfert

L'agent doit :

1. Avoir au moins **6 mois d'ancienneté chez le prestataire sortant** au moment du transfert
2. Être affecté **principalement** au marché concerné (> 30% de son temps)
3. Ne pas avoir été embauché dans les 3 mois précédant le changement de prestataire (sauf cas particuliers)

### Implications pratiques

**Quand vous gagnez un marché** : vous récupérez les agents existants, dont vous ne savez rien (turnover potentiel, absentéisme, qualité). Faites une due diligence RH **avant signature** : demander la liste nominative au prestataire sortant, vérifier les contrats, identifier les agents en arrêt longue durée.

**Quand vous perdez un marché** : vos agents partent chez le concurrent. Vous gardez l'ancienneté pour les indemnités de licenciement éventuelles si vous ne pouvez pas les reclasser sur d'autres marchés.

## Prime d'expérience

À partir de **4 ans d'ancienneté chez le même employeur**, l'agent bénéficie d'une prime d'expérience mensuelle. Le montant n'est pas fixé par la convention de branche : il est défini par votre accord d'entreprise (ou par convention locale, ex: certaines branches régionales).

Montants typiques observés :

- 4-10 ans : 30 à 80 €/mois
- 10-15 ans : 80 à 120 €/mois
- 15+ ans : 100 à 150 €/mois

Cette prime est cumulable avec la prime d'ancienneté du Code du travail si elle existe dans votre accord.

## Obligations RSE, formation, égalité

### Formation professionnelle

- Contribution légale formation : 1% de la masse salariale brute (au-delà de 11 salariés ETP)
- La branche propreté impose en complément : **0,55% spécifique** pour le plan de développement des compétences

### Égalité homme/femme

- Rapport annuel obligatoire au-delà de 50 salariés
- Index égalité professionnelle à publier sur votre site (note sur 100)

### Pénibilité et risques chimiques

Les agents exposés aux produits CMR (cancérogènes, mutagènes, reprotoxiques — fréquents en bionettoyage médical) doivent bénéficier :

- D'un suivi médical renforcé (visite tous les 4 ans minimum)
- D'une formation aux risques chimiques documentée
- D'une fiche d'exposition individuelle conservée 50 ans

## Comment Proprely facilite la conformité IDCC 3043

Plusieurs points de la convention nécessitent un suivi précis difficile à tenir sur Excel :

- **Calcul des heures complémentaires majorées** : Proprely calcule automatiquement les majorations selon le taux horaire et le contrat
- **Suivi des transferts article 7** : fiches agents avec ancienneté, marché d'affectation, % de temps — exportables en CSV pour due diligence
- **Suivi formation et pénibilité** : champ "formations" et "expositions" sur chaque profil agent
- **Reporting paie** : export mensuel des heures par agent avec majorations, prêt pour votre logiciel paie ou comptable

[Découvrir le module gestion des agents](/fonctionnalites/gestion-agents-nettoyage). Pour structurer le calcul des heures : [guide complet](/blog/calcul-heures-agents-nettoyage). Pour fidéliser et limiter le turnover (et donc les transferts subis) : [6 leviers concrets](/blog/fideliser-agents-nettoyage-turnover).

## Sources officielles

- Convention collective IDCC 3043 sur Légifrance
- Arrêté d'extension du 23 juillet 2012
- Accords annuels de branche (révision salaires) — publiés au BO Travail
- Site officiel FEP (Fédération des Entreprises de Propreté)

Pour aller plus loin, [candidater à la bêta privée Proprely](/beta) : la conformité IDCC 3043 est conçue dans le produit, pas en option.`,
  },
  {
    slug: 'tarif-nettoyage-bureaux-m2-2026',
    title: "Tarif nettoyage bureaux au m² en 2026 : la grille honnête pour les prestataires",
    excerpt: "Combien facturer le m² de nettoyage de bureaux en 2026 ? Grille par fréquence, par zone, par type de site. Méthode pour calculer un prix qui protège votre marge sans perdre l'affaire.",
    date: '20 mai 2026',
    readTime: '9 min',
    tag: 'Stratégie',
    quickSummary: [
      "Tarif moyen national 2026 : 0,40 à 0,80 €/m²/mois pour un nettoyage quotidien de bureaux.",
      "Paris/Île-de-France : +25 à +40% au-dessus de la moyenne nationale.",
      "Calcul fiable : (m² × prestations × fréquence) ÷ vitesse de production agent × coût horaire chargé × 2,8-3,2.",
      "Vitesse de production standard : 250 à 400 m²/heure selon le type de site et la fréquence.",
      "Erreur classique : facturer au forfait sans connaître son coût réel — 3 contrats sur 10 finissent à perte.",
      "Méthode 'prix de référence' : 3 grilles internes (basse, moyenne, premium) mises à jour 2 fois/an.",
    ],
    faq: [
      { q: "Quel est le tarif moyen au m² pour le nettoyage de bureaux en 2026 ?", a: "0,40 à 0,80 €/m²/mois pour un nettoyage quotidien standard de bureaux (passage 5 fois/semaine, parties communes + sanitaires + bureaux). Variable selon la zone : Paris/IDF +25-40%, grandes métropoles régionales +10-20%, zones rurales -10-20%. Ces tarifs s'entendent hors prestations spécifiques (vitrerie, moquette, remise en état)." },
      { q: "Comment calculer un prix au m² fiable ?", a: "Méthode : (surface en m² × prestations à réaliser × fréquence hebdomadaire) ÷ vitesse de production de l'agent en m²/h × coût horaire chargé. Le résultat est votre coût de revient. Multipliez par 2,8 à 3,2 pour obtenir le prix de vente. Vitesses de référence : 250-400 m²/h pour bureaux, 150-250 m²/h pour cabinet médical (protocole bionettoyage), 400-600 m²/h pour grand plateau open space." },
      { q: "Faut-il facturer au forfait ou au m² ?", a: "Au forfait pour le client (plus lisible), mais calculé au m² en interne. Le forfait mensuel donne au client une visibilité budgétaire. Vous, vous tracez en m² × prestation × fréquence pour vérifier que vous restez rentable. Sans ce calcul interne, 3 contrats sur 10 finissent à perte sans que vous vous en rendiez compte." },
      { q: "Comment justifier un prix plus élevé que la concurrence ?", a: "Quatre leviers : (1) Détail des prestations (qui fait quoi, combien de fois, quels produits), (2) Engagements de remplacement (si l'agent est absent, vous garantissez intervention sous X heures), (3) Preuve de passage automatique (QR + photos + signature), (4) Reporting régulier (PV mensuel automatique au gestionnaire). Ces 4 éléments justifient +10 à +20% par rapport à un concurrent low-cost." },
      { q: "Quel taux de marge nette viser sur un contrat de nettoyage de bureaux ?", a: "15 à 20% de marge nette est la cible saine. En-dessous de 10%, votre entreprise est vulnérable au moindre imprévu (remplacement, hausse de charges, sinistre). Au-delà de 25%, vous êtes probablement hors marché ou sur un client captif (situation à court terme)." },
      { q: "Les tarifs varient-ils selon le type de bureau ?", a: "Oui significativement. Bureau corporate standard : 0,40-0,55 €/m²/mois. Cabinet médical : 0,80-1,20 €/m²/mois (bionettoyage, traçabilité, fréquence haute). Coworking : 0,55-0,80 €/m²/mois (rotation forte, exigence esthétique). Espace de direction (présidence, salle de conseil) : 0,80-1,50 €/m²/mois (qualité haut de gamme demandée)." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'calcul-heures-agents-nettoyage'],
    content: `## Pourquoi 60% des dirigeants se trompent sur leur prix au m²

D'après les retours terrain de la branche propreté en 2025, environ 60% des sociétés de nettoyage B2B facturent au forfait sans avoir calculé leur coût de revient au m². Résultat : sur 10 contrats actifs, 3 sont en perte sèche et 4 en marge insuffisante. Seuls 3 portent la rentabilité.

Ce guide donne la méthode honnête pour calculer un prix au m² qui **protège votre marge sans perdre l'affaire**.

## La grille de référence 2026

### Bureaux standards (passage 5 fois/semaine)

| Zone | Tarif au m²/mois |
| ---- | ---------------- |
| Paris intra-muros | 0,55 à 0,90 € |
| Île-de-France (hors Paris) | 0,50 à 0,80 € |
| Grandes métropoles (Lyon, Marseille, Bordeaux, Toulouse, Nice, Lille, Nantes, Strasbourg, Montpellier, Rennes) | 0,45 à 0,70 € |
| Villes moyennes (50-200K hab) | 0,40 à 0,60 € |
| Zones rurales / petites villes | 0,35 à 0,50 € |

### Cabinets médicaux et dentaires

Multipliez les tarifs bureaux par **1,5 à 2,2** selon protocole et fréquence. Justification : produits certifiés, traçabilité, agents formés bionettoyage, plages contraintes par les rendez-vous patients.

### Coworking et espaces flex

Multipliez par **1,3 à 1,6**. Justification : rotation forte des utilisateurs, exigence esthétique constante, fréquence haute (parfois 2x/jour sur les sanitaires).

### Industriel et logistique

Multipliez par **0,7 à 1,0**. Justification : surfaces importantes (économie d'échelle), prestations moins exigeantes esthétiquement, mais vigilance sur les zones spécifiques (vestiaires, douches, salles de pause).

## La méthode de calcul fiable

### Étape 1 : Mesurer la surface réelle

Le contrat client donne souvent une surface annoncée. Visitez le site, mesurez les zones effectivement nettoyées (les couloirs comptent, pas les escaliers extérieurs). Différence typique : 5-15% entre annoncé et réel.

### Étape 2 : Lister les prestations

Pour chaque zone, lister :

- Sols : aspirateur, lavage, vitrification
- Mobilier : dépoussiérage, traces
- Sanitaires : nettoyage, désinfection, consommables
- Parties communes : halls, escaliers, ascenseurs
- Cuisines/tisaneries
- Poubelles : ramassage, sortie

### Étape 3 : Estimer la fréquence

Quotidien (5x/semaine), 3x/semaine, hebdomadaire, mensuel. La fréquence détermine la charge de travail réelle.

### Étape 4 : Appliquer la vitesse de production

Vitesses observées dans la branche en 2026 :

| Type de site | Vitesse (m²/h) |
| ------------ | -------------- |
| Open space standard | 350-500 |
| Bureaux individuels classiques | 250-350 |
| Cabinet médical (bionettoyage) | 150-250 |
| Sanitaires (nettoyage complet) | 30-50 |
| Cuisine/tisanerie | 80-120 |
| Hall avec marbre/parties communes prestige | 150-200 |
| Vitrerie intérieure | 80-100 |

### Étape 5 : Calculer le coût de revient horaire chargé

Coût horaire chargé = salaire brut × 1,45 (charges patronales) + produits et matériel + quote-part frais de structure.

Pour un agent ASP en 2026 à 12,42 €/h brut :

- Brut + charges : 12,42 × 1,45 = **18,01 €/h**
- Produits et matériel : +0,80 €/h (forfaitaire)
- Quote-part frais de structure (loyer dépôt, véhicules, encadrement, admin) : +3-5 €/h

**Coût horaire chargé total : 22-25 €/h** pour un agent ASP standard.

### Étape 6 : Multiplier par 2,8 à 3,2

C'est la **règle des 3×** : votre prix de vente doit être à 2,8-3,2 fois votre coût horaire chargé pour couvrir vos imprévus (absentéisme, remplacements, renégociations, sinistres) et générer une marge nette de 15-20%.

À 22 €/h de coût et un multiplicateur de 3, votre **prix de vente horaire est 66 €**.

### Étape 7 : Convertir en €/m²/mois

Exemple : un site de 800 m² de bureaux standards, nettoyage quotidien (5x/semaine = 22 jours/mois en moyenne), vitesse 350 m²/h.

- Temps par passage : 800 ÷ 350 = **2,28 h**
- Temps mensuel : 2,28 × 22 = **50,28 h**
- Coût mensuel : 50,28 × 22 € = **1106 €**
- Prix de vente cible : 50,28 × 66 € = **3318 €**
- Prix au m²/mois : 3318 ÷ 800 = **4,15 €/m²/mois** (pour quotidien)
- Ou par jour ouvré : 3318 ÷ 22 = **150 €/jour**

> **Attention** : ces chiffres sont des illustrations. Vos coûts réels varient selon votre structure (TPE solo vs PME avec encadrement), votre ville et votre mix client.

## Les 4 facteurs qui justifient une hausse de prix

### 1. Technicité (vitrerie hauteur, décapage, remise en état post-chantier)

Multiplicateur 1,3 à 2,0. Justifie une facturation à part en plus du contrat récurrent.

### 2. Horaires (nuit, dimanche, jour férié)

Majorations convention IDCC 3043 (+20% nuit, +100% dimanche, +100% jour férié). À répercuter sur le devis.

### 3. Accessibilité

Sous-sols, parkings difficiles, sites enclavés, accès badgés contraignants. +5 à +15% selon contrainte réelle.

### 4. Fréquence très haute ou très basse

Très haute fréquence (>1x/jour) : pas d'économie d'échelle, prix proportionnel. Très basse fréquence (1x/mois) : déplacement disproportionné, +20 à +30%.

## La méthode "prix de référence" pour ne pas se planter

Construire **3 grilles internes** à mettre à jour 2 fois par an :

1. **Grille basse** : votre minimum vital (en-dessous, vous travaillez à perte). Calculée avec multiplicateur 2,5.
2. **Grille moyenne** : votre prix standard. Multiplicateur 3,0.
3. **Grille premium** : pour les sites prestige (cabinet présidentiel, hôtel 5 étoiles, prestations à valeur ajoutée). Multiplicateur 3,5+.

Quand vous établissez un devis, partez systématiquement de la grille moyenne. Descendez sur la basse uniquement pour les contrats stratégiques (gain de visibilité, ancrage zone). Montez sur la premium quand l'exigence le justifie.

## Erreurs à éviter

### Facturer au forfait sans connaître son coût

Le piège classique. Le client demande "combien par mois ?" et vous donnez un chiffre rond. Au bout de 6 mois, vous découvrez que vous perdez de l'argent. Toujours **calculer en interne au m² × prestation × fréquence**, même si le devis client est au forfait.

### Aligner sur le concurrent sans contrôler ses coûts

"Ils sont à 1500 €, je propose 1450 €." Si vos coûts sont supérieurs, vous perdez à chaque facture. Mieux vaut perdre l'affaire que perdre de l'argent.

### Ne pas réviser les prix avec l'inflation des charges

Les charges sociales et les salaires conventionnels montent. Si vous ne révisez pas vos prix annuellement, votre marge fond. Inclure une **clause d'indexation** dans vos contrats.

### Sous-estimer les remplacements

Un agent absent 10% du temps moyen sur l'année. À ne pas oublier dans le coût de revient.

## Aller plus loin

[Calculateur ROI Proprely](/calculateur-roi) pour estimer le coût de votre gestion dispersée. [Simulateur de rentabilité contrat](/simulateur-rentabilite) pour valider qu'un contrat précis est rentable avant signature. [Module devis Proprely](/fonctionnalites/devis-nettoyage) : catalogue prestations, marge brute affichée en temps réel pendant la construction du devis.

Pour structurer votre tarification : [Fixer ses prix dans le nettoyage : la méthode juste en 2026](/blog/fixer-prix-nettoyage). Pour comprendre la convention collective : [Convention collective nettoyage IDCC 3043 : guide pratique 2026](/blog/convention-collective-nettoyage-idcc-3043).`,
  },
  {
    slug: 'digitaliser-entreprise-nettoyage-5-etapes',
    title: "Digitaliser son entreprise de nettoyage en 5 étapes concrètes (2026)",
    excerpt: "Vous gérez encore sur Excel et WhatsApp ? La méthode en 5 étapes pour digitaliser sans casser votre activité — par ordre de priorité, avec ROI estimé et risques à éviter.",
    date: '20 mai 2026',
    readTime: '8 min',
    tag: 'Outils',
    quickSummary: [
      "Étape 1 — Cartographier vos flux actuels (3-4h, gratuit). Indispensable avant tout outil.",
      "Étape 2 — Centraliser clients et sites dans un seul fichier ou un CRM (1 semaine, ROI immédiat).",
      "Étape 3 — Digitaliser le planning des agents (mobile-first, sans app à installer). ROI 3-5h/semaine.",
      "Étape 4 — Mettre en place preuve de passage native (QR + photos + signature). Réduit les litiges de 70-90%.",
      "Étape 5 — Industrialiser devis, factures, suivi commercial. Récupère 2-3h/semaine.",
      "Erreurs à éviter : tout digitaliser d'un coup, choisir un outil sans tester, ignorer les agents.",
    ],
    faq: [
      { q: "Combien de temps pour digitaliser une société de nettoyage ?", a: "Selon la taille : 2 à 6 semaines pour une TPE (3-15 agents), 2 à 4 mois pour une PME (15-50 agents). L'erreur fréquente est de vouloir tout faire en une fois. La méthode en 5 étapes étalées sur plusieurs semaines donne de meilleurs résultats avec moins de risques opérationnels." },
      { q: "Combien coûte la digitalisation d'une entreprise de nettoyage ?", a: "Tout dépend du chemin choisi. Excel + templates gratuits : 0 €. SaaS vertical moderne (Proprely et autres) : 15-50 €/utilisateur/mois. Logiciel métier historique (PROPRET, Progiclean) : 30-60 €/utilisateur/mois avec consultant intégrateur 5-15 K€. ERP généraliste : 100+ €/utilisateur/mois avec intégration 30-50 K€. Le coût caché de ne pas digitaliser : 12 à 21 K€/an en dispersion admin." },
      { q: "Faut-il digitaliser quand on a moins de 5 agents ?", a: "Partiellement. Le planning peut rester sur Excel ou Google Sheets. La preuve de passage et le suivi clients deviennent intéressants dès le 1er client B2B exigeant (syndic, hôtel, médical). Les devis pro deviennent rentables à partir de 5-8 devis par mois." },
      { q: "Que faire si mes agents ne sont pas à l'aise avec le numérique ?", a: "Le mythe du 'mes agents ne savent pas faire' tombe avec les outils 2026. La majorité des agents utilisent déjà WhatsApp et Instagram. Un lien web envoyé par SMS, qui ouvre directement le planning sur leur téléphone (sans app à installer, sans login complexe), est adopté en 5 minutes. Important : impliquer 1-2 agents pilotes dès le départ pour faire le retour terrain." },
      { q: "Comment éviter le double travail pendant la transition ?", a: "Trois règles : (1) Choisir une date de bascule claire (pas de cohabitation > 2 semaines), (2) Importer toutes les données existantes en lot avant le démarrage (clients, sites, agents, prestations), (3) Désactiver les anciens canaux dès le J1 (fermer le groupe WhatsApp planning, archiver le fichier Excel)." },
    ],
    relatedSlugs: ['comparatif-logiciels-nettoyage-2026', 'logiciel-societe-nettoyage-criteres'],
    content: `## Pourquoi 70% des sociétés de nettoyage n'ont toujours pas digitalisé en 2026

D'après une enquête FEP 2024, environ 70% des sociétés de nettoyage de moins de 50 agents en France pilotent encore principalement sur Excel, WhatsApp et Word. Le coût caché est documenté : **12 à 21 K€/an** par société, en heures de dirigeant perdues, erreurs de pointage, contrats sous-tarifés et litiges.

Pourtant, la digitalisation est plus simple en 2026 qu'il y a 5 ans :

- Outils SaaS verticaux modernes (mobile-first, sans app)
- Onboarding en 30 minutes à 1 journée (vs 3-6 mois pour les ERP historiques)
- Tarifs accessibles (15-50 €/utilisateur/mois)
- Hébergement européen RGPD par défaut

Le frein principal n'est plus technologique : il est méthodologique. Ce guide donne la **méthode en 5 étapes** pour digitaliser sans casser votre activité.

## Étape 1 — Cartographier vos flux actuels (3-4h)

Avant d'acheter un outil, comprenez ce que vous voulez remplacer.

### Faire l'inventaire

Sur une feuille A3, listez :

- Tous les fichiers Excel/Google Sheets que vous utilisez (clients, sites, agents, planning, devis, factures, paie)
- Les groupes WhatsApp ou SMS (planning, remplacements, urgences)
- Les classeurs papier (contrats, attestations, fiches de poste)
- Les emails récurrents (relances, PV de passage, factures envoyées)

### Identifier les douleurs

Pour chaque flux, notez en 1 ligne :

- Combien de temps vous y passez par semaine
- Combien d'erreurs ou d'oublis vous y avez eu le mois dernier
- Si quelqu'un d'autre que vous peut prendre le relais

C'est votre **photo de l'existant**. Indispensable pour mesurer le ROI ensuite.

## Étape 2 — Centraliser clients et sites (1 semaine)

L'erreur classique : digitaliser le planning en premier. Faux. **Commencez par les données client.**

### Structurer la base

Pour chaque client, créez une fiche :

- Nom de la société
- SIRET, adresse de facturation
- Contact décisionnaire (direction)
- Contact opérationnel (facility manager, gardien)
- Liste des sites (un client peut avoir plusieurs sites)

Pour chaque site :

- Adresse
- Superficie (m²) et type (bureaux, médical, copro, retail, industriel)
- Fréquences (quotidien, hebdo, mensuel)
- Prestations (sols, vitres, sanitaires, parties communes)
- Contacts opérationnels (gardien, accès, codes)
- Photos d'état initial

### Outils possibles

- **Excel structuré** (gratuit, suffisant pour < 15 clients) — voir [nos modèles gratuits](/ressources)
- **CRM métier** (Proprely et autres) — voir [CRM entreprise propreté](/crm-entreprise-proprete)
- **Pas HubSpot/Salesforce** : trop puissants et coûteux pour ce besoin

### ROI

Récupération immédiate de 30 minutes à 1h par semaine sur la recherche d'informations client (adresse, code, contact). Et impact qualité : vous ne perdez plus d'opportunités par oubli de relance.

## Étape 3 — Digitaliser le planning agents (1-2 semaines)

C'est le cœur opérationnel. **Mobile-first obligatoire.**

### Les critères du bon outil planning

- **Affectation en 1 clic** (drag-and-drop d'un agent sur un créneau)
- **Mobile pour les agents sans app à installer** : un lien web qui s'ouvre dans le navigateur
- **Notifications de changement en temps réel** (un agent absent → remplaçant proposé automatiquement)
- **Visibilité par agent, par client, par jour, par semaine**
- **Compteur d'heures automatique** pour la paie

### Le piège des apps natives

Beaucoup d'éditeurs imposent une app à installer pour les agents. Conséquences :

- Adoption faible (40-60% en moyenne)
- Problèmes sur les téléphones bas de gamme ou Android anciens
- Formation nécessaire

Les outils 2026 modernes (dont Proprely) fonctionnent **via un lien web** ouvert dans le navigateur du téléphone agent. Aucune installation, fonctionne sur 4G dégradée.

### ROI

3 à 5 heures par semaine récupérées pour le dirigeant. Et impact qualité : moins d'agents qui se présentent sur le mauvais site, moins de retards, moins de tensions sur les remplacements.

Voir aussi : [Planning des agents de nettoyage : la gestion centralisée](/fonctionnalites/planning-nettoyage).

## Étape 4 — Preuve de passage native (1 semaine)

C'est le levier qui fait la **différence en négociation client** et qui **réduit les litiges de 70-90%**.

### Les composants essentiels

- **QR code par site** : l'agent scanne à son arrivée, géolocalisation + horodatage enregistrés
- **Photos avant/après horodatées** : 2-3 photos par intervention (sols, sanitaires, parties communes)
- **Signature client électronique** si présent (gardien, gestionnaire) — sinon, validation par l'agent
- **PV automatique** envoyé au client en fin d'intervention

### Pourquoi c'est critique en 2026

Les syndics nationaux exigent désormais une preuve de passage standardisée pour la majorité des marchés. Les hôtels et cabinets médicaux le demandent dès le contrat. Sans preuve de passage native, vous perdrez progressivement vos meilleurs marchés.

Voir : [Preuve de passage nettoyage : QR code, photos avant-après et signature](/fonctionnalites/preuve-passage-nettoyage).

### ROI

Récupération de 1 à 2h/semaine en gestion des litiges. Gain commercial : +10 à +15% sur le prix grâce à la valeur perçue. Réduction des annulations de contrat suite à plaintes.

## Étape 5 — Devis, factures, suivi commercial (2-3 semaines)

Maintenant que l'opérationnel tourne, attaquez l'avant et l'après-vente.

### Devis professionnels

- Catalogue prestations réutilisable (quotidien bureaux, vitrerie, décapage)
- Génération en 2 minutes au lieu de 20
- Signature électronique native (eIDAS conforme)
- Suivi des relances automatiques à J+5 et J+10

### Factures

- Conversion devis signé → facture en 1 clic
- Numérotation comptable automatique
- Export comptable mensuel
- Connexion native vers Pennylane (en finalisation), Qonto (en finalisation)

### Suivi commercial

- Pipeline visible (envoyé / ouvert / signé / refusé)
- Marge brute affichée en temps réel pendant la construction du devis
- Historique des échanges par compte

Voir : [Logiciel de devis nettoyage](/fonctionnalites/devis-nettoyage). Et : [Comment fixer ses prix dans le nettoyage](/blog/fixer-prix-nettoyage).

### ROI

2 à 3h/semaine récupérées sur la création de devis, le suivi et la facturation. Conversion devis → signature améliorée de 30-50% grâce aux relances automatiques.

## Les 4 erreurs classiques à éviter

### 1. Tout digitaliser d'un coup

L'enthousiasme pousse à acheter un outil qui couvre tout et à basculer en 1 semaine. Résultat : épuisement, abandon partiel, retour aux anciens outils sur certains flux. **Phasez** : 1 module par semaine ou tous les 15 jours.

### 2. Choisir un outil sans tester

Demandez systématiquement une démo de **30 minutes avec vos propres données réelles** (importez 5-10 clients et 5-10 agents). Pas une démo générique avec données fictives. Si l'éditeur refuse, méfiance.

### 3. Ignorer les agents

Vos agents sont en première ligne du changement. Si vous décidez seul, l'adoption sera mauvaise. **Impliquez 1-2 agents pilotes dès la phase de choix d'outil**. Faites-leur tester le mobile.

### 4. Ne pas mesurer le ROI

Sans mesure du temps gagné, vous ne sauriez pas si la digitalisation est rentable. **Avant la transition**, notez votre temps actuel sur chaque flux. **3 mois après**, refaites le même chiffrage. La différence est votre vrai ROI.

## La séquence recommandée

Si vous démarrez de zéro :

- **Semaine 1** : Cartographie (étape 1)
- **Semaines 2-3** : Centralisation clients/sites (étape 2)
- **Semaines 4-5** : Planning agents (étape 3)
- **Semaines 6-7** : Preuve de passage (étape 4)
- **Semaines 8-10** : Devis et facturation (étape 5)

Pour une TPE de 3-15 agents, comptez **6 à 10 semaines au total**. Pour une PME de 15-50, **3 à 4 mois**.

## Aller plus loin

[Comparatif logiciels nettoyage 2026](/comparatif-logiciel-nettoyage) pour choisir votre outil. [Le guide complet du logiciel propreté](/logiciel-societe-nettoyage) pour la vue d'ensemble. [Candidater à la bêta privée Proprely](/beta) si vous voulez tester un cockpit unifié gratuit pendant la bêta, avec tarif fondateur conservé à vie.`,
  },
]

// TL;DR (réponse-flash) par article, séparé du tableau principal pour
// faciliter la mise à jour. Format : 40-80 mots, réponse directe à
// l'intention de recherche, optimisé pour les Generative Engines
// (ChatGPT, Perplexity, Google AI Overviews, Gemini).
const POST_TLDR: Record<string, string> = {
  'fixer-prix-nettoyage':
    "Pour fixer le prix d'une prestation de nettoyage B2B, multipliez votre coût horaire chargé par 3 (fourchette saine : 2,8 à 3,2). Pour un agent au SMIC en 2026, le coût horaire chargé est de 18-20 €, soit un prix de vente cible de 54-60 €/h. Ajustez ensuite selon 4 facteurs : technicité (×4-5), horaires décalés (+30-60 %), accessibilité (+10-20 %), ponctualité (+20-30 %).",
  'gestion-societe-nettoyage-outils':
    "La majorité des sociétés de nettoyage B2B en France gèrent leur activité avec un mix d'Excel (planning, devis), WhatsApp (changements de dernière minute), Word (factures), Google Drive (documents) et papier (preuve de passage). Ce mix coûte en moyenne 6 à 10 heures par semaine au dirigeant et bloque la croissance dès que la société dépasse 5-8 agents.",
  'logiciel-societe-nettoyage-criteres':
    "Les 8 critères qui comptent pour choisir un logiciel société de nettoyage : (1) planning multi-sites mobile-first, (2) preuve de passage standardisée (QR + photos + signature), (3) marge par client en temps réel, (4) devis pro en 2 minutes, (5) gestion agents avec spécialités, (6) hébergement européen RGPD, (7) export 1 clic, (8) onboarding accompagné. Évitez les outils ERP industriels surdimensionnés pour une TPE/PME.",
  'calcul-heures-agents-nettoyage':
    "Le coût horaire chargé d'un agent au SMIC en 2026 est de 18-20 € : salaire brut + charges patronales (~42 %) + congés/RTT (10 %) + primes (panier, transport, salissure) + mutuelle. Multipliez ce coût par 3 pour fixer le prix de vente horaire. Les heures supplémentaires se majorent à +25 % (8 premières heures) puis +50 %. Sans suivi rigoureux, la paie déborde de 5-10 % chaque mois.",
  'rgpd-societe-nettoyage-2026':
    "Une société de nettoyage B2B est soumise au RGPD dès qu'elle gère des données d'agents et de contacts clients. Obligations 2026 : registre des traitements (obligatoire dès le 1er salarié), mention sous-traitants, durée de conservation des photos de preuve de passage (5 ans recommandé), information des personnes filmées/photographiées, contrat de sous-traitance avec votre éditeur de logiciel, hébergement européen privilégié.",
  'fideliser-agents-nettoyage-turnover':
    "Le turnover annuel moyen dans le nettoyage B2B dépasse 35 %. 6 leviers prouvés pour le réduire : (1) prime de présence trimestrielle, (2) planning prévisible publié 2 semaines à l'avance, (3) alertes surmenage automatiques, (4) parcours de spécialisation (vitrerie, décapage), (5) reconnaissance terrain (photo de la semaine), (6) entretien individuel trimestriel de 30 minutes. Cibler 20 % de turnover annuel est réaliste.",
  'comparatif-logiciels-nettoyage-2026':
    "Comparatif 2026 des logiciels société de nettoyage : Proprely (cockpit unifié bêta gratuite, conçu en France pour TPE/PME B2B 3-50 agents), PROPRET (historique du marché, ergonomie datée), Progiclean (puissant mais lourd à paramétrer), Organilog (multi-secteurs, pas spécifiquement propreté), Excel (gratuit mais bloque la croissance). Choix : Proprely si TPE/PME B2B, PROPRET si gros volume, Organilog si multi-métier.",
  'logiciel-devis-nettoyage-gratuit':
    "Les options gratuites de logiciel de devis nettoyage (Henrri, Tiime, Excel, Word) suffisent pour 1-3 clients par mois. Au-delà, leurs limites se révèlent : pas de suivi commercial, pas de relances automatiques, pas de signature électronique, pas de lien avec le planning agents. Pour une société B2B de nettoyage avec 5+ devis par mois, un outil dédié comme Proprely (gratuit pendant la bêta) devient rentable.",
  'societe-nettoyage-paris':
    "Le marché du nettoyage B2B à Paris représente près d'un tiers du marché français. Cible majoritaire : tertiaire QCA, copropriétés haussmanniennes gérées par les grands syndics, hôtellerie, cabinets médicaux. Spécificités à connaître : rotations 5h-9h, syndics qui demandent preuve de passage standardisée, turnover agents >35 %, pression sur les prix. Marge nette saine : 15-18 %.",
  'societe-nettoyage-ile-de-france':
    "L'Île-de-France concentre ~30 % du marché français de la propreté B2B. Géographie : Paris intra-muros (densité tertiaire), La Défense (92, tours), Saint-Denis/Saint-Ouen (industriel, logistique), Boulogne-Issy (sièges sociaux), Versailles/Saint-Quentin (tertiaire ouest). Départements porteurs en croissance : 92, 93, 94. Salaire d'agent généralement +5 à +10 % vs province pour compenser le coût de la vie.",
  'societe-nettoyage-la-defense-92':
    "Le quartier de La Défense (92) est le premier quartier d'affaires européen avec ~3,5 millions de m² de bureaux. Spécificités pour une société de nettoyage : rotations matinales 5h-9h obligatoires, exigences sécurité strictes (badges, accès contrôlés), preuve de passage standardisée demandée par les facility managers, exigence de polyvalence (bureaux + parties communes + sanitaires), prix marché 14-18 € HT/m²/mois sur contrat annuel.",
  'societe-nettoyage-bordeaux':
    "Le marché bordelais du nettoyage B2B est porté par 3 secteurs : tertiaire Chartrons / Bassins à flot, hôtellerie/œnotourisme (Saint-Émilion, Médoc), cabinets médicaux & laboratoires. Spécificités locales : forte saisonnalité touristique (mai-octobre), copropriétés du centre historique à exigences patrimoniales, prix marché 10-13 €/m²/mois soit 10-20 % en dessous de Paris. Marge nette atteignable : 15-20 %.",
  'trouver-clients-b2b-nettoyage':
    "Les 5 canaux d'acquisition B2B qui marchent en nettoyage : (1) prospection LinkedIn ciblée (office managers, syndics, DRH), (2) recommandation de clients satisfaits (programme de parrainage), (3) référencement local SEO (page ville + Google Business Profile), (4) partenariat avec syndics/facility managers, (5) appels d'offres publics (BOAMP, profils acheteurs). Le porte-à-porte et les flyers ont un ROI quasi nul en B2B.",
  'convention-collective-nettoyage-idcc-3043':
    "La convention collective nationale de la propreté (IDCC 3043) régit ~500 000 salariés en France. Points clés 2026 : grille de salaires AS1 à MP5 (de 12,00 €/h brut à 18+ €/h), prime panier (~ 7 €/jour si plus de 6h), prime de transport (URSSAF), prime d'expérience (3-15 %), congés payés 2,5 jours/mois, durée de travail standard 35h/semaine. Tout employeur du secteur doit l'appliquer.",
  'tarif-nettoyage-bureaux-m2-2026':
    "Le tarif de nettoyage de bureaux en France en 2026 se situe en moyenne entre 12 et 22 € HT/m²/an, soit ~1-2 €/m²/mois sur contrat annuel. Variables : surface (>500 m² = -10-20 %), fréquence (quotidien vs 3×/semaine), zone géographique (Paris/IDF +15-25 % vs province), prestations annexes (vitres, moquette), horaires (avant 7h ou après 21h = +30-60 %).",
  'digitaliser-entreprise-nettoyage-5-etapes':
    "5 étapes pour digitaliser une société de nettoyage en 2-4 mois : (1) audit des outils actuels et heures perdues, (2) choix d'un cockpit unifié (planning + devis + agents + preuve de passage + marge), (3) migration progressive des données clients/sites/agents, (4) formation agents 1h max sur mobile, (5) basculement complet en 4-8 semaines selon taille. ROI typique : 6-10h récupérées par semaine pour le dirigeant.",
}

export function getPost(slug: string): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return undefined
  if (post.tldr) return post
  const tldr = POST_TLDR[slug]
  return tldr ? { ...post, tldr } : post
}

export function getRelatedPosts(slug: string, max = 2): BlogPost[] {
  const post = getPost(slug)
  if (post?.relatedSlugs?.length) {
    return post.relatedSlugs.map((s) => getPost(s)).filter((p): p is BlogPost => Boolean(p)).slice(0, max)
  }
  return posts.filter((p) => p.slug !== slug).slice(0, max)
}
