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
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getRelatedPosts(slug: string, max = 2): BlogPost[] {
  const post = getPost(slug)
  if (post?.relatedSlugs?.length) {
    return post.relatedSlugs.map((s) => getPost(s)).filter((p): p is BlogPost => Boolean(p)).slice(0, max)
  }
  return posts.filter((p) => p.slug !== slug).slice(0, max)
}
