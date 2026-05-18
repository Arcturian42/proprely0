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
- Hébergement contrôlé (OVH France pour Proprely)
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
]

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}
