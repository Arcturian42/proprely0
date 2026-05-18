export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  content: string
}

export const posts: BlogPost[] = [
  {
    slug: 'fixer-prix-nettoyage',
    title: 'Fixer ses prix dans le nettoyage : la méthode juste en 2026',
    excerpt: "8 dirigeants sur 10 sous-tarifent sans le savoir. La règle des 3×, les 4 facteurs qui font monter le prix, et comment construire une grille interne qui protège vos marges.",
    date: '15 mai 2026',
    readTime: '7 min',
    tag: 'Stratégie',
    content: `## Le piège du prix au feeling

La plupart des dirigeants de sociétés de nettoyage que nous rencontrons fixent leurs prix au feeling. Un peu en dessous du concurrent qu'ils ont en tête. Un peu au-dessus de ce que le client annonce comme budget. Sans calcul rigoureux derrière.

Résultat : **8 dirigeants sur 10 brident leur marge sans le savoir**. Ils gagnent moins que ce qu'ils pourraient — et surtout, ils ne savent pas pourquoi.

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
    content: `## La dispersion, ce mal silencieux

La plupart des dirigeants de sociétés de nettoyage que nous avons rencontrés utilisent en moyenne **4 à 7 outils différents** pour gérer leur entreprise. Aucun ne se parle. Chacun fait une partie du travail. Personne ne fait l'ensemble.

Voici les cinq outils les plus fréquents — et pourquoi ils créent plus de problèmes qu'ils n'en résolvent.

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

C'est exactement ce qu'on construit avec Proprely. Si vous voulez en discuter, [rejoignez la bêta privée](/) — c'est gratuit pendant toute la phase de bêta.`,
  },
  {
    slug: 'logiciel-societe-nettoyage-criteres',
    title: 'Logiciel pour société de nettoyage : 7 critères pour bien choisir',
    excerpt: "Conçu pour le métier, mobile-first, preuve de passage, marge par client visible, RGPD réel, export 100%, mise en route en moins d'une journée. La checklist à appliquer avant de signer.",
    date: '8 mai 2026',
    readTime: '8 min',
    tag: 'Outils',
    content: `## Pourquoi un logiciel "standard" ne marche pas pour vous

Vous avez sûrement essayé. Un CRM générique, un outil de planning pour artisans, un logiciel comptable avec module facturation. Aucun ne tient sur la durée.

La raison est simple : **le nettoyage n'est ni du BTP, ni du commerce, ni du conseil**. C'est un métier avec ses propres règles — sites multiples par client, remplacements fréquents, preuve de passage, agents itinérants, marge serrée.

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
    content: `## Une routine que personne ne calcule

C'est l'un des moments les plus emblématiques de la gestion d'une société de nettoyage. Entre le 20 et le 25 du mois, le dirigeant — ou le responsable d'exploitation — ferme la porte du bureau, ouvre l'agenda et commence à compter.

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

C'est là que beaucoup d'entreprises pèchent. Excel sur un ordinateur portable non chiffré, WhatsApp avec photos de sites, classeurs papier accessibles à toute l'équipe — ce sont des violations potentielles.

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
    content: `## Le secret le mieux gardé du nettoyage

Le turnover dans le secteur de la propreté avoisine **35% par an**. C'est 3 à 5 fois plus que dans l'industrie ou les services tertiaires.

Recruter coûte. Former coûte. Et chaque agent qui part emporte avec lui une connaissance des sites qu'il sera difficile de remplacer rapidement.

Pourtant, certaines sociétés affichent un turnover inférieur à 15%. Ce ne sont pas celles qui paient le plus. Ce sont celles qui appliquent ces 6 leviers.

## Levier 1 : Les écouter quand ils signalent du surmenage

Le premier indicateur de départ, c'est le surmenage. Et le surmenage ne se voit pas dans Excel : il se voit dans le **regard fatigué**, dans les retards, dans les arrêts maladie qui se multiplient.

Le piège classique : envoyer toujours les mêmes agents sur les missions urgentes parce qu'ils sont "fiables". Au bout de 3 mois, ils craquent. Et ils partent — souvent chez le concurrent direct.

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
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
