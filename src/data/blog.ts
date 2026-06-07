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
  /** Slug de l'auteur dans AUTHORS (src/config.ts). Par défaut 'paul-munier'.
   * Permet d'attribuer un article à un auteur différent (multi-auteurs). */
  authorSlug?: string
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
    slug: 'cout-horaire-charge-agent-nettoyage',
    title: "Coût horaire chargé agent nettoyage : calcul 2026",
    excerpt: "Salaire brut, charges, congés, primes, coûts indirects : la méthode complète pour calculer le vrai coût d'une heure d'agent — et arrêter de sous-tarifer.",
    date: '30 mai 2026',
    readTime: '9 min',
    tag: 'Stratégie',
    tldr: "En 2026, le coût horaire chargé d'un agent de nettoyage au SMIC est d'environ 18 à 20 € en coût direct (salaire brut + ~42 % de charges patronales + congés payés + primes panier/transport/salissure), et 21 à 23 € en intégrant les coûts indirects (absentéisme, encadrement, matériel). Pour une marge saine, facturez 2,8 à 3,2 fois ce coût.",
    quickSummary: [
      "Le coût horaire chargé = salaire brut + charges patronales (~42 %) + congés (10 %) + primes + coûts indirects.",
      "Agent AS1 (11,99 € brut) : ~19-20 € en coût direct, ~21-23 € coût complet.",
      "La main-d'œuvre pèse 70 à 85 % du coût d'un contrat de nettoyage.",
      "Règle de tarification : prix de vente = coût horaire chargé × 2,8 à 3,2.",
      "Oublier les heures complémentaires majorées et l'absentéisme fausse tout le calcul.",
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'calcul-heures-agents-nettoyage', 'convention-collective-nettoyage-idcc-3043'],
    faq: [
      { q: "Quel est le coût horaire chargé d'un agent de nettoyage en 2026 ?", a: "Pour un agent au niveau AS1 (11,99 € brut), le coût direct (salaire + charges patronales + congés + primes) est d'environ 18 à 20 €/h. En ajoutant les coûts indirects (absentéisme, encadrement, matériel, temps non facturable), le coût complet atteint 21 à 23 €/h." },
      { q: "Quel taux de charges patronales appliquer dans le nettoyage ?", a: "Environ 42 % du salaire brut en moyenne (cotisations URSSAF, retraite, prévoyance, formation, accidents du travail). Le taux AT/MP est plus élevé que la moyenne dans la propreté en raison de la sinistralité (TMS, chutes)." },
      { q: "Faut-il facturer 3 fois le coût horaire ?", a: "La règle des 3× (prix de vente = 2,8 à 3,2 × coût horaire chargé) couvre le coût de l'agent, l'encadrement, les frais de structure et une marge nette de 15-20 %. En dessous de 2,8×, la marge devient fragile ; au-dessus de 3,2× sur du tertiaire standard, vous risquez de perdre l'appel d'offres." },
      { q: "Comment l'absentéisme impacte-t-il le coût horaire ?", a: "Un absentéisme de 10 % signifie que 10 % des heures payées (remplacements, maintien de salaire, désorganisation) ne sont pas productives. Cela ajoute 1,5 à 2,5 € au coût horaire réel. C'est un coût indirect majeur, souvent ignoré dans les devis." },
      { q: "Les primes entrent-elles dans le coût horaire chargé ?", a: "Oui. La prime de panier (~7 €/jour au-delà de 6h de travail effectif), la prime de transport et la prime de salissure prévues par l'IDCC 3043 sont des coûts réels à intégrer, soit environ 1 à 1,50 € par heure travaillée selon l'organisation." },
    ],
    content: `## Pourquoi le coût horaire chargé est votre chiffre le plus important

Dans le nettoyage, la main-d'œuvre représente 70 à 85 % du coût d'un contrat. Si vous ne savez pas précisément ce que coûte une heure d'agent, toutes charges comprises, vous tarifez à l'aveugle et vous découvrez vos marges (ou leur absence) en fin d'exercice.

Beaucoup de dirigeants raisonnent encore sur le salaire brut (« mon agent est à 12 € »). C'est l'erreur qui mène aux contrats sous-tarifés : le coût réel est 50 à 90 % plus élevé.

## La décomposition complète du coût horaire chargé

Partons d'un agent au niveau AS1 de la [convention collective de la propreté (IDCC 3043)](/blog/convention-collective-nettoyage-idcc-3043), payé 11,99 € brut de l'heure en 2026.

| Poste | Montant par heure travaillée |
| --- | --- |
| Salaire brut | 11,99 € |
| Charges patronales (~42 %) | 5,04 € |
| Congés payés (10 %) | 1,20 € |
| Primes (panier, transport, salissure) | 1,00 à 1,50 € |
| Sous-total coût direct | ~19 à 20 € |
| Coûts indirects (absentéisme, encadrement, matériel) | 2,00 à 4,00 € |
| Coût horaire chargé complet | ~21 à 23 € |

Le **coût direct** tourne autour de **19 à 20 €**. En intégrant les **coûts indirects**, on atteint **21 à 23 €** pour une heure réellement productive et facturable.

## Les coûts indirects qu'on oublie systématiquement

- **L'absentéisme** : à 10 % d'absentéisme, une heure payée sur dix n'est pas produite. Coût : +1,5 à 2,5 €/h.
- **L'encadrement** : chef d'équipe, inspecteur, dirigeant. Comptez 8 à 15 % de la masse salariale terrain.
- **Le matériel et les consommables** : aspirateurs, autolaveuses, produits, EPI, tenues.
- **Le temps non facturable** : trajets inter-sites, réunions, formation, gestion administrative.

## Du coût horaire au prix de vente : la règle des 3×

Une fois votre coût horaire chargé connu, multipliez-le par **2,8 à 3,2** pour obtenir un prix de vente sain :

- Coût chargé 19-20 € → prix de vente cible **54 à 64 €/h**
- Technicité (vitrerie hauteur, décapage, médical) : montez à ×4 ou ×5
- Horaires décalés (avant 6h, après 21h) : +30 à 60 %

Testez la marge d'un contrat précis avec notre [simulateur de rentabilité](/simulateur-rentabilite), et fiabilisez votre méthode avec l'article [Fixer ses prix dans le nettoyage](/blog/fixer-prix-nettoyage).

## Les 3 erreurs qui plombent la marge

1. **Raisonner en brut** au lieu du coût chargé : -40 % de marge invisible.
2. **Oublier les heures complémentaires majorées** des temps partiels (60-70 % des effectifs) : redressement URSSAF assuré. Voir [le calcul des heures agents](/blog/calcul-heures-agents-nettoyage).
3. **Ignorer l'absentéisme** dans le devis : la marge théorique s'évapore au premier arrêt maladie.

## Piloter le coût horaire en continu

Le coût horaire chargé n'est pas un calcul annuel : il bouge avec la grille IDCC, l'absentéisme et le mix de prestations. Un [logiciel de gestion pour société de nettoyage](/logiciel-societe-nettoyage) qui suit les heures réelles par site fait apparaître la marge par client en temps réel — et vous alerte avant qu'un contrat ne devienne déficitaire.`,
    howTo: {
      name: "Calculer le coût horaire chargé d'un agent de nettoyage",
      description: "Méthode en 4 étapes pour obtenir le coût réel d'une heure d'agent, base d'une tarification saine.",
      steps: [
        { name: "Partir du salaire brut horaire", text: "Reprenez le taux horaire brut de l'agent selon la grille IDCC 3043 (ex. 11,99 € pour un AS1 en 2026)." },
        { name: "Ajouter les charges patronales", text: "Appliquez ~42 % de charges patronales sur le salaire brut (URSSAF, retraite, prévoyance, AT/MP, formation)." },
        { name: "Intégrer congés et primes", text: "Ajoutez les congés payés (~10 %) et les primes conventionnelles (panier, transport, salissure)." },
        { name: "Ajouter les coûts indirects", text: "Intégrez l'absentéisme, l'encadrement, le matériel et le temps non facturable pour obtenir le coût horaire chargé complet (21 à 23 €)." },
      ],
    },
  },
  {
    slug: 'repondre-appel-offres-nettoyage',
    title: "Appel d'offres nettoyage : guide complet 2026",
    excerpt: "Où trouver les marchés, construire un mémoire technique qui gagne, fixer le bon prix : la méthode pour décrocher des marchés de propreté publics et privés.",
    date: '30 mai 2026',
    readTime: '10 min',
    tag: 'Stratégie',
    tldr: "Pour répondre à un appel d'offres de nettoyage, trouvez les marchés sur le BOAMP et les profils acheteurs (AWS, marches-publics.gouv.fr), analysez le DCE, puis construisez un mémoire technique qui détaille méthode, encadrement, preuve de passage et qualité. Le prix compte (40-60 % de la note) mais la valeur technique fait souvent la différence. Visez une marge nette de 12-18 %.",
    quickSummary: [
      "Marchés publics : BOAMP, marches-publics.gouv.fr, profils acheteurs (AWS, e-marchespublics).",
      "Le DCE (CCTP, CCAP, RC) définit prestations, fréquences et critères de notation.",
      "Le mémoire technique pèse souvent autant que le prix : méthode, encadrement, qualité, RSE.",
      "Chiffrez à partir de votre coût horaire chargé réel, pas au plus bas.",
      "L'article 7 (transfert du personnel) s'applique : faites une due diligence RH avant de chiffrer.",
    ],
    relatedSlugs: ['trouver-clients-b2b-nettoyage', 'fixer-prix-nettoyage', 'nettoyage-copropriete-obligations-prix'],
    faq: [
      { q: "Où trouver des appels d'offres de nettoyage ?", a: "Pour les marchés publics : le BOAMP, marches-publics.gouv.fr (PLACE), et les profils acheteurs des collectivités (AWS-Achat, e-marchespublics, Maximilien en Île-de-France). Pour le privé : plateformes de référencement fournisseurs, facility managers et appels d'offres directs des grands comptes." },
      { q: "Qu'est-ce que le mémoire technique dans un appel d'offres nettoyage ?", a: "C'est le document qui décrit COMMENT vous allez exécuter la prestation : organisation, planning, encadrement, matériel et produits, démarche qualité et contrôle, preuve de passage, gestion des réclamations, RSE et continuité de service. Il pèse fréquemment 40 à 60 % de la note finale, à égalité ou plus que le prix." },
      { q: "Comment fixer son prix sur un appel d'offres de nettoyage ?", a: "Partez de votre coût horaire chargé réel (21-23 €), ajoutez encadrement, structure et marge (12-18 % net). Ne cassez pas les prix pour gagner : un marché à perte vous coûtera plus cher que de ne pas l'avoir. Vérifiez le volume horaire imposé par le CCTP et son adéquation avec les surfaces." },
      { q: "Le transfert de personnel (article 7) s'applique-t-il aux marchés ?", a: "Oui. En cas de reprise d'un marché existant, l'article 7 de l'IDCC 3043 impose le transfert des agents affectés (6 mois d'ancienneté, affectation principale). Demandez la liste du personnel transférable AVANT de chiffrer : leur ancienneté, leurs contrats et leur absentéisme impactent directement votre coût." },
      { q: "Combien de temps pour monter un dossier d'appel d'offres ?", a: "Comptez 2 à 5 jours pour un premier dossier (lecture du DCE, visite de site, mémoire technique, chiffrage, pièces administratives). Avec des trames réutilisables et des données de coût fiables, vous descendez à 1 journée par dossier ensuite." },
    ],
    content: `## Les marchés de nettoyage : un gisement sous-exploité

Collectivités, bailleurs sociaux, hôpitaux, syndics, grands comptes privés : une part énorme du marché de la propreté passe par des appels d'offres. Beaucoup de TPE/PME n'y répondent pas, intimidées par le formalisme. C'est une erreur : avec une méthode et de bonnes trames, un dossier se monte vite et ouvre des contrats pluriannuels.

## Étape 1 — Trouver les bons marchés

- **Marchés publics** : le [BOAMP](https://www.boamp.fr), marches-publics.gouv.fr (PLACE), et les profils acheteurs (AWS-Achat, e-marchespublics, Maximilien en Île-de-France).
- **Marchés privés** : facility managers, plateformes de référencement fournisseurs, et la prospection directe des grands comptes (voir [trouver des clients B2B en nettoyage](/blog/trouver-clients-b2b-nettoyage)).

Filtrez par zone géographique, surface et budget : ne répondez qu'aux marchés que vous pouvez réellement exécuter.

## Étape 2 — Décortiquer le DCE

Le Dossier de Consultation des Entreprises contient :

| Document | Ce qu'il définit |
| --- | --- |
| CCTP | Le cahier des charges technique : locaux, surfaces, prestations, fréquences |
| CCAP | Les clauses administratives : durée, pénalités, révision de prix, paiement |
| RC | Le règlement de consultation : critères de notation et leur pondération |

Le **RC** est le document clé : il dit comment vous serez noté (souvent 40-60 % prix, 40-60 % valeur technique). Calibrez votre réponse sur cette pondération.

## Étape 3 — Le mémoire technique qui gagne

C'est là que se gagne ou se perd le marché. Un mémoire technique solide couvre :

- **Organisation et planning** : qui fait quoi, quand, avec quelle [gestion du planning](/fonctionnalites/planning-nettoyage).
- **Encadrement et contrôle qualité** : fréquence des contrôles, grille d'évaluation, plan d'action.
- **Preuve de passage** : QR code, photos, signatures — un argument différenciant fort. Voir la [preuve de passage](/fonctionnalites/preuve-passage-nettoyage).
- **Matériel et produits** : certifications, écolabels, fiches de sécurité.
- **RSE et continuité** : insertion, gestion des absences, plan de remplacement.

## Étape 4 — Chiffrer juste, pas au plus bas

Partez de votre [coût horaire chargé réel](/blog/cout-horaire-charge-agent-nettoyage) et de votre [méthode de prix](/blog/fixer-prix-nettoyage). Vérifiez le volume horaire imposé par le CCTP : un marché sous-doté en heures est un piège. Visez une marge nette de **12 à 18 %**. Un marché remporté à perte coûte plus cher que pas de marché du tout.

## Le piège de l'article 7

En cas de reprise, l'[article 7 de l'IDCC 3043](/blog/convention-collective-nettoyage-idcc-3043) impose le transfert des agents en place. Demandez la liste du personnel transférable avant de chiffrer : ancienneté, contrats et absentéisme impactent directement votre coût.

## Industrialiser vos réponses

Les entreprises qui gagnent régulièrement ont des trames de mémoire technique réutilisables et des données de coût fiables. Un [logiciel de gestion](/logiciel-societe-nettoyage) qui centralise sites, heures et marge vous donne les chiffres exacts pour chiffrer vite et juste — au lieu de repartir d'une feuille blanche à chaque consultation.`,
  },
  {
    slug: 'nettoyage-copropriete-obligations-prix',
    title: "Nettoyage copropriété : obligations et prix 2026",
    excerpt: "Parties communes, fréquences, prix au lot, relation syndic : ce qu'une société de nettoyage doit maîtriser pour gagner et garder des contrats de copropriété.",
    date: '30 mai 2026',
    readTime: '9 min',
    tag: 'Stratégie',
    tldr: "Le nettoyage de copropriété couvre halls, escaliers, paliers, locaux poubelles et vitres des parties communes, à des fréquences variant du quotidien (immeubles standing) au bimensuel. Le prix se chiffre au lot (souvent 8 à 20 €/lot/mois) ou au forfait selon surface et fréquence. La relation avec le syndic et le conseil syndical, et la preuve de passage, sont décisives pour conserver le contrat.",
    quickSummary: [
      "Prestations types : halls, cages d'escalier, paliers, ascenseurs, local poubelles, sortie des conteneurs, vitres communes.",
      "Fréquences : du quotidien (immeubles haut de gamme) au bimensuel (petites copropriétés).",
      "Tarification au lot (8-20 €/lot/mois) ou au forfait selon surface et fréquence.",
      "Le donneur d'ordre est le syndic, mais le conseil syndical influence fortement le renouvellement.",
      "La preuve de passage tranche les litiges et sécurise le contrat face aux réclamations de copropriétaires.",
    ],
    relatedSlugs: ['trouver-clients-b2b-nettoyage', 'repondre-appel-offres-nettoyage', 'fixer-prix-nettoyage'],
    faq: [
      { q: "Quelles prestations comprend le nettoyage d'une copropriété ?", a: "Le nettoyage des parties communes : halls d'entrée, cages d'escalier, paliers, cabines d'ascenseur, local poubelles et sortie/rentrée des conteneurs, vitres des parties communes, et parfois entretien des espaces extérieurs (cours, paliers extérieurs). La gestion des ordures ménagères (sortie des bacs) est souvent incluse." },
      { q: "Quel est le prix du nettoyage d'une copropriété en 2026 ?", a: "La tarification se fait souvent au lot : 8 à 20 €/lot/mois selon la fréquence et le standing, ou au forfait mensuel. Pour une copropriété de 30 lots avec passage 3×/semaine, comptez un forfait de 400 à 900 €/mois selon la région (Paris/IDF en haut de fourchette)." },
      { q: "À quelle fréquence nettoyer les parties communes ?", a: "Cela dépend du standing et du règlement de copropriété : quotidien pour les immeubles haut de gamme avec gardien, 2 à 3 fois par semaine pour le standard, hebdomadaire ou bimensuel pour les petites copropriétés. La sortie des conteneurs suit le calendrier de collecte municipal." },
      { q: "Qui décide du prestataire de nettoyage en copropriété ?", a: "Le syndic signe le contrat, mais la décision est votée en assemblée générale et le conseil syndical pèse fortement, notamment au renouvellement. Soigner la relation avec le conseil syndical (réactivité, traçabilité, propreté visible) est aussi important que le prix." },
      { q: "Comment éviter de perdre un contrat de copropriété ?", a: "Les contrats se perdent sur les réclamations non traitées et le manque de traçabilité. Une preuve de passage (QR code en hall, photos, PV mensuel envoyé au syndic) désamorce les litiges de copropriétaires et démontre objectivement la qualité — un argument décisif en AG." },
    ],
    content: `## Un marché récurrent et fidèle… si on le tient

La copropriété est un marché idéal pour une société de nettoyage : contrats récurrents, paiement régulier via le syndic, et faible saisonnalité. Mais c'est aussi un marché exigeant, où un copropriétaire mécontent peut déclencher une remise en concurrence en assemblée générale.

## Les prestations attendues

- Halls d'entrée, cages d'escalier, paliers, cabines d'ascenseur
- Local poubelles : nettoyage, désinfection, et sortie/rentrée des conteneurs selon le calendrier de collecte
- Vitres des parties communes
- Parfois : espaces extérieurs, parkings, entretien des paillassons

## Les fréquences selon le standing

| Type de copropriété | Fréquence typique |
| --- | --- |
| Immeuble haut de gamme (avec gardien) | Quotidien |
| Copropriété standard urbaine | 2 à 3 fois / semaine |
| Petite copropriété | Hebdomadaire à bimensuel |
| Sortie des conteneurs | Selon calendrier de collecte municipal |

## Comment chiffrer un contrat de copropriété

Deux modèles cohabitent :

- **Au lot** : 8 à 20 €/lot/mois selon fréquence et standing. Simple à comparer pour le syndic.
- **Au forfait** : basé sur la surface des parties communes, la fréquence et le temps de passage estimé.

Pour une copropriété de 30 lots avec passage 3×/semaine, le forfait se situe souvent entre **400 et 900 €/mois** selon la région. Partez toujours de votre [coût horaire chargé](/blog/cout-horaire-charge-agent-nettoyage) et de votre [méthode de tarification](/blog/fixer-prix-nettoyage), pas du prix du prestataire sortant.

## La relation syndic : le vrai facteur de fidélisation

Le syndic signe, mais le **conseil syndical** influence le renouvellement. Trois leviers pour durer :

1. **Réactivité** : répondre vite aux demandes ponctuelles (encombrants, dégât).
2. **Traçabilité** : un PV de passage mensuel envoyé au syndic, avec photos, désamorce 90 % des réclamations.
3. **Visibilité** : une [preuve de passage par QR code](/fonctionnalites/preuve-passage-nettoyage) en hall rassure les copropriétaires et démontre objectivement la qualité.

## Gérer la multi-copropriété sans s'épuiser

Dès que vous gérez 10, 20 ou 50 copropriétés, le suivi des fréquences, des passages et des réclamations devient ingérable sur Excel. Un [logiciel de gestion pour société de nettoyage](/logiciel-societe-nettoyage) centralise chaque immeuble comme un site, avec son [planning](/fonctionnalites/planning-nettoyage) et sa preuve de passage — et vous permet de répondre à un syndic en 30 secondes plutôt qu'en rappelant trois agents.`,
  },
  {
    slug: 'bionettoyage-medical-protocoles',
    title: "Bionettoyage médical : protocoles, normes et tarifs 2026",
    excerpt: "Zones à risque, protocole en 3 temps, produits normés, traçabilité : ce qu'exige le nettoyage des cabinets et établissements de santé — un marché premium et exigeant.",
    date: '30 mai 2026',
    readTime: '10 min',
    tag: 'Conformité',
    tldr: "Le bionettoyage est le nettoyage des environnements de santé visant à réduire la charge microbienne. Il repose sur un protocole en plusieurs temps (nettoyage puis désinfection), des produits détergents-désinfectants normés (EN 14476 virucide, EN 1276 bactéricide), un classement des locaux par zones à risque (1 à 4) et une traçabilité stricte. C'est un marché premium, facturé 30 à 50 % au-dessus du tertiaire standard.",
    quickSummary: [
      "Bionettoyage = nettoyage + désinfection pour réduire la biocontamination en milieu de santé.",
      "Locaux classés en 4 zones de risque : du risque minime (bureaux) au très haut risque (blocs).",
      "Produits détergents-désinfectants normés : EN 1276 (bactéricide), EN 14476 (virucide), EN 13624 (fongicide).",
      "Protocole en plusieurs temps, du plus propre vers le plus sale, sans repasser sur une zone traitée.",
      "Tarif premium : +30 à 50 % vs le nettoyage de bureaux standard, justifié par la technicité et la traçabilité.",
    ],
    relatedSlugs: ['tarif-nettoyage-bureaux-m2-2026', 'fixer-prix-nettoyage', 'rgpd-societe-nettoyage-2026'],
    faq: [
      { q: "Qu'est-ce que le bionettoyage ?", a: "Le bionettoyage est l'ensemble des opérations visant à réduire la biocontamination (micro-organismes) d'un environnement de santé. Il combine un nettoyage (élimination des salissures) et une désinfection (réduction des micro-organismes) à l'aide de produits détergents-désinfectants normés, selon un protocole strict et tracé." },
      { q: "Quelles normes pour les produits de bionettoyage ?", a: "Les détergents-désinfectants doivent répondre à des normes européennes selon le spectre visé : EN 1276 (bactéricide), EN 14476 (virucide), EN 13624 et EN 1650 (fongicide/levuricide), EN 13727. La norme EN 14885 encadre l'application de ces tests. Les fiches techniques et fiches de données de sécurité doivent être disponibles sur site." },
      { q: "Comment sont classés les locaux en milieu de santé ?", a: "En 4 zones de risque de biocontamination : zone 1 (risque minime : bureaux, halls), zone 2 (risque moyen : salles d'attente, circulations), zone 3 (risque élevé : salles de soins, consultation), zone 4 (très haut risque : blocs opératoires, réanimation). La fréquence et le protocole augmentent avec la zone." },
      { q: "Quel est le tarif du bionettoyage médical ?", a: "Le bionettoyage se facture 30 à 50 % au-dessus du nettoyage de bureaux standard, en raison de la technicité, des produits normés, de la formation des agents et de la traçabilité exigée. Pour un cabinet médical, comptez un prix au m² nettement supérieur aux 12-18 €/m²/an du tertiaire classique." },
      { q: "Quelle traçabilité pour le nettoyage médical ?", a: "Chaque intervention doit être tracée : zone, date, heure, agent, produit utilisé, protocole appliqué. Cette traçabilité est exigée en cas de contrôle ou d'incident, et constitue un argument commercial fort. Une preuve de passage horodatée avec photos répond à cette exigence." },
    ],
    content: `## Un marché premium, mais exigeant

Cabinets médicaux, laboratoires, EHPAD, cliniques, centres dentaires : le secteur de la santé est un marché à forte valeur pour une société de nettoyage. La contrepartie : une exigence technique et réglementaire bien supérieure au tertiaire. On ne parle plus de « ménage » mais de **bionettoyage**.

## Bionettoyage : de quoi parle-t-on ?

Le bionettoyage vise à réduire la **biocontamination** (la charge en micro-organismes) d'un environnement de santé. Il combine deux actions :

1. Le **nettoyage** : élimination des salissures visibles et de la matière organique.
2. La **désinfection** : réduction des micro-organismes à l'aide d'un produit normé.

Souvent réalisé en une opération avec un **détergent-désinfectant**, il suit des règles strictes : du plus propre vers le plus sale, sans repasser sur une zone déjà traitée, avec un matériel dédié par zone (méthode des couleurs).

## Le classement des locaux par zone de risque

| Zone | Risque | Exemples de locaux |
| --- | --- | --- |
| Zone 1 | Minime | Bureaux administratifs, halls |
| Zone 2 | Moyen | Salles d'attente, circulations |
| Zone 3 | Élevé | Salles de soins, de consultation |
| Zone 4 | Très haut | Blocs opératoires, réanimation, labos |

Plus la zone est à risque, plus la fréquence, le protocole et la traçabilité sont exigeants.

## Les normes à connaître

Les produits doivent être normés selon le spectre d'action recherché :

- **EN 1276** : activité bactéricide
- **EN 14476** : activité virucide
- **EN 13624 / EN 1650** : activité fongicide et levuricide
- **EN 14885** : encadre l'application de ces normes

Les fiches techniques et les fiches de données de sécurité (FDS) doivent être disponibles sur site, et les agents formés à leur usage (dilution, temps de contact).

## La traçabilité, exigence et argument commercial

En santé, chaque intervention doit être traçable : zone, date, heure, agent, produit, protocole. Cette traçabilité est exigée en cas de contrôle ou d'incident — et c'est un puissant argument commercial. Une [preuve de passage](/fonctionnalites/preuve-passage-nettoyage) horodatée avec photos et signature répond directement à ce besoin. Attention aussi aux [obligations RGPD](/blog/rgpd-societe-nettoyage-2026) sur les photos prises en environnement de soin.

## Pourquoi (et comment) facturer plus cher

Le bionettoyage se facture **30 à 50 % au-dessus** du [tarif de bureaux standard](/blog/tarif-nettoyage-bureaux-m2-2026), justifié par la technicité, les produits normés, la formation et la traçabilité. Pour tenir cette marge, partez de votre [coût horaire chargé](/blog/cout-horaire-charge-agent-nettoyage) majoré du temps de protocole, et démontrez la valeur par la traçabilité. Un [logiciel métier](/logiciel-societe-nettoyage) qui gère les spécialités des agents (formés bionettoyage) et la preuve de passage sécurise à la fois la qualité et la marge sur ce segment premium.`,
  },
  {
    slug: 'reduire-absenteisme-agents-nettoyage',
    title: "Réduire l'absentéisme agents nettoyage : 7 leviers",
    excerpt: "L'absentéisme dépasse souvent 10 % dans la propreté. Son coût réel, ses causes, et 7 leviers actionnables pour le réduire sans dégrader la qualité ni la marge.",
    date: '30 mai 2026',
    readTime: '8 min',
    tag: 'Management',
    tldr: "L'absentéisme dans la propreté dépasse fréquemment 10 %, contre ~5 % tous secteurs. Chaque point coûte des remplacements, du maintien de salaire et de la désorganisation, soit 1,5 à 2,5 € sur le coût horaire réel. Les 7 leviers les plus efficaces : planning prévisible, prévention des TMS, reconnaissance, polyvalence, écoute managériale, suivi des indicateurs et fiabilisation des remplacements.",
    quickSummary: [
      "L'absentéisme propreté dépasse souvent 10 %, soit le double de la moyenne nationale.",
      "Chaque point d'absentéisme ajoute 1,5 à 2,5 € au coût horaire réel.",
      "Causes principales : pénibilité/TMS, horaires fragmentés, manque de reconnaissance, management distant.",
      "7 leviers : planning prévisible, prévention TMS, reconnaissance, polyvalence, écoute, suivi, remplacements fiables.",
      "Mesurer l'absentéisme par agent et par site est le préalable à toute action.",
    ],
    relatedSlugs: ['fideliser-agents-nettoyage-turnover', 'calcul-heures-agents-nettoyage', 'cout-horaire-charge-agent-nettoyage'],
    faq: [
      { q: "Quel est le taux d'absentéisme moyen dans le nettoyage ?", a: "Il dépasse fréquemment 10 % dans la propreté, contre environ 5 % tous secteurs confondus. Les causes structurelles : pénibilité physique, troubles musculo-squelettiques (TMS), horaires décalés et fragmentés, et un sentiment d'isolement des agents souvent seuls sur site." },
      { q: "Combien coûte l'absentéisme à une société de nettoyage ?", a: "Chaque point d'absentéisme ajoute environ 1,5 à 2,5 € au coût horaire réel : remplacement (parfois en heures majorées), maintien de salaire, désorganisation, perte de qualité et risque de réclamation client. À 10 % d'absentéisme sur une masse salariale importante, l'impact sur la marge est majeur." },
      { q: "Comment réduire l'absentéisme des agents de nettoyage ?", a: "Les leviers les plus efficaces : un planning prévisible publié à l'avance, la prévention des TMS (matériel ergonomique, gestes et postures), la reconnaissance, la polyvalence, une écoute managériale régulière, le suivi des indicateurs par agent/site, et un process de remplacement fiable qui ne repose pas sur des appels en urgence." },
      { q: "Le planning influence-t-il l'absentéisme ?", a: "Fortement. Un planning imprévisible, publié au dernier moment ou modifié sans cesse par WhatsApp, génère du stress et des conflits avec la vie personnelle, premiers facteurs d'absentéisme. Publier le planning deux semaines à l'avance et le rendre consultable sur mobile réduit nettement les absences évitables." },
      { q: "Faut-il sanctionner l'absentéisme ?", a: "La sanction seule est contre-productive sur des métiers en tension de recrutement. Elle doit rester l'exception, après que les leviers de prévention (conditions de travail, planning, reconnaissance) ont été activés. La prime de présence, à l'inverse, a un effet positif mesurable quand elle est trimestrielle et atteignable." },
    ],
    content: `## Un absentéisme deux fois supérieur à la moyenne

Dans la propreté, l'absentéisme dépasse fréquemment **10 %**, soit le double de la moyenne nationale (~5 %). Pour un dirigeant, ce n'est pas une fatalité : c'est un coût pilotable, à condition de le mesurer et d'agir sur ses causes.

## Le vrai coût de l'absentéisme

Chaque point d'absentéisme ajoute **1,5 à 2,5 €** au [coût horaire réel](/blog/cout-horaire-charge-agent-nettoyage) :

- Remplacement, parfois en heures complémentaires majorées
- Maintien de salaire et indemnités
- Désorganisation et temps de management
- Perte de qualité et risque de réclamation, voire de perte de contrat

## Les causes structurelles

- **Pénibilité et TMS** : ports de charge, gestes répétitifs, première cause d'arrêt.
- **Horaires fragmentés** : tôt le matin, tard le soir, en coupure — difficiles à concilier avec la vie personnelle.
- **Isolement** : l'agent est souvent seul sur site, sans lien d'équipe.
- **Manque de reconnaissance** et management à distance.

## Les 7 leviers qui marchent

1. **Un planning prévisible** : publié 2 semaines à l'avance, consultable sur mobile. L'imprévisibilité est un facteur d'absences évitables. Voir le [planning des agents](/fonctionnalites/planning-nettoyage).
2. **La prévention des TMS** : matériel ergonomique, formation gestes et postures, rotation des tâches pénibles.
3. **La reconnaissance** : prime de présence trimestrielle atteignable, valorisation du travail bien fait.
4. **La polyvalence** : des agents formés à plusieurs sites/prestations absorbent mieux les aléas.
5. **L'écoute managériale** : un point individuel régulier, même court, casse l'isolement.
6. **Le suivi des indicateurs** : mesurer l'absentéisme par agent et par site pour cibler l'action.
7. **Des remplacements fiables** : un process outillé plutôt que des appels en urgence qui épuisent l'encadrement.

## Mesurer avant d'agir

On ne pilote que ce qu'on mesure. Suivre l'absentéisme par agent et par site, en lien avec le [compteur d'heures](/blog/calcul-heures-agents-nettoyage), révèle les sites à risque et les situations individuelles à traiter. Un [logiciel de gestion pour société de nettoyage](/logiciel-societe-nettoyage) qui centralise planning, heures et remplacements transforme l'absentéisme subi en absentéisme piloté — et protège votre marge.

## L'absentéisme et le turnover, même combat

Les leviers anti-absentéisme rejoignent ceux de la fidélisation : conditions de travail, reconnaissance, sens. Pour aller plus loin, voir [fidéliser les agents face au turnover](/blog/fideliser-agents-nettoyage-turnover).`,
  },
  {
    slug: 'fixer-prix-nettoyage',
    title: 'Prix nettoyage 2026 : règle des 3× + grille tarifaire',
    excerpt: "La règle des 3× le coût chargé, les 4 facteurs qui font monter le prix, la grille tarifaire. 8 dirigeants sur 10 sous-tarifent — vérifiez vos marges.",
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

C'est exactement ce que fait Proprely. Voir le [guide complet logiciel société de nettoyage](/logiciel-societe-nettoyage) pour comprendre comment un cockpit affiche la marge par client en temps réel, ou [rejoignez la bêta privée](/) si vous voulez voir vos vraies marges plutôt que de les estimer en fin de trimestre.`,
  },
  {
    slug: 'gestion-societe-nettoyage-outils',
    title: '5 outils des sociétés de nettoyage : les limites 2026',
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
      { q: "Combien d'outils utilisent les sociétés de nettoyage en moyenne ?", a: "Entre 4 et 7 outils non connectés : Excel, WhatsApp, Google Agenda, Word, logiciel comptable, emails, classeurs papier. Aucun ne se parle, chacun fait une partie du travail." },
      { q: "Excel fonctionne-t-il pour gérer une société de nettoyage ?", a: "Jusqu'à 2-3 agents et 3-5 clients, oui. Au-delà, c'est ingérable : multiples versions, erreurs de saisie, pas de mobile-first pour les agents, pas de preuve de passage. La bascule est nécessaire vers un cockpit dès que vous franchissez 5-8 agents." },
      { q: "Quel est le vrai coût caché de WhatsApp pour les remplacements ?", a: "Zéro traçabilité. Quand un client conteste un remplacement, vous n'avez aucune preuve. Quand un agent dit avoir prévenu, vous ne pouvez pas vérifier. Et quand vous devez retrouver une décision prise il y a 3 mois, c'est introuvable dans le flux de messages." },
      { q: "Combien d'heures par semaine la dispersion fait perdre ?", a: "6 à 10 heures par semaine en moyenne pour un dirigeant qui gère 8 à 15 agents. Soit l'équivalent d'un mi-temps d'administration sur l'année, ou 300-500 heures perdues. C'est la marge brute d'un contrat de 30 000 € à l'année." },
      { q: "Combien de temps prend la bascule d'Excel vers un cockpit unifié ?", a: "30 minutes à 2 heures pour la configuration initiale (sites, agents, fréquences) si vous êtes accompagné. 1 à 2 semaines pour que les agents prennent le réflexe mobile. La paie redevient calculable en 10 minutes au lieu d'une demi-journée dès la 2e clôture mensuelle." },
      { q: "Quels sont les risques juridiques de gérer une société de nettoyage sur WhatsApp et Excel ?", a: "Quatre risques majeurs : RGPD (données personnelles d'agents et clients stockées sur des outils non chiffrés), URSSAF (impossibilité de prouver les heures réellement travaillées en cas de contrôle), prud'hommes (litiges agents sur heures supplémentaires et primes), contrats clients (impossibilité de fournir une preuve de passage standardisée demandée par les facility managers et syndics)." },
      { q: "Faut-il choisir un ERP industriel ou un cockpit métier pour une société de nettoyage de 10-30 agents ?", a: "Cockpit métier. Les ERP industriels (Sage X3, Cegid, Divalto) sont surdimensionnés pour une TPE/PME nettoyage : 6-18 mois d'implémentation, 30 000-100 000 € de licence et intégration, modules inutiles. Un cockpit métier (Proprely, Organilog, PROPRET) couvre 100 % des besoins propreté avec un onboarding de 30 minutes et un coût mensuel de 30-150 € par utilisateur." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'calcul-heures-agents-nettoyage', 'fixer-prix-nettoyage', 'digitaliser-entreprise-nettoyage-5-etapes'],
    content: `## La dispersion, ce mal silencieux

La plupart des dirigeants de sociétés de nettoyage que nous avons rencontrés utilisent en moyenne **4 à 7 outils différents** pour gérer leur entreprise. Aucun ne se parle. Chacun fait une partie du travail. Personne ne fait l'ensemble.

Ce mode de fonctionnement n'est pas un choix conscient. Il est arrivé par sédimentation : Excel pour démarrer, WhatsApp parce que les agents ont déjà l'app, Google Agenda parce que c'est gratuit, Word parce que vous savez vous en servir, le classeur papier parce qu'on n'a jamais pris le temps de scanner. Chaque outil pris isolément est rationnel. Le résultat agrégé ne l'est pas.

Voici les cinq outils les plus fréquents, ce qu'ils font (ou ne font pas), et pourquoi ils créent plus de problèmes qu'ils n'en résolvent dès que vous dépassez 5 agents et 5 clients.

## 1. Excel pour les heures

C'est l'outil par défaut. Une feuille par mois, parfois une feuille par agent. Le 22 du mois, vous récupérez l'agenda, vous comptez les interventions, vous saisissez les heures à la main, vous croisez avec les notes de WhatsApp pour les remplacements et avec les SMS pour les retards. La paie tombe le 28 et il faut être prêt.

Sur le papier, Excel est un outil fantastique. En pratique, dès que vous gérez plus de 5 agents :
- Vous perdez le compte des versions (planning_mai_v3_final_OK.xlsx)
- Vous dupliquez les erreurs : une heure mal saisie en début de feuille casse tout le calcul
- Vous ne pouvez pas le partager mobile : un agent qui veut vérifier ses heures doit vous appeler
- Il n'y a aucune piste d'audit : qui a modifié quoi, quand, pourquoi

**Le vrai coût** : 3 à 4 heures par mois en saisie manuelle, 1 à 2 erreurs corrigées en réclamation a posteriori, 0 traçabilité face à un contrôle URSSAF.

## 2. WhatsApp pour les remplacements et changements de dernière minute

L'agent du matin est malade à 5h30. Vous écrivez sur le groupe "Dispo ce matin 6h site Dupont ?". Trois agents répondent simultanément. Vous en choisissez un. Pendant ce temps, un autre s'est déjà mis en route croyant être désigné. Le client appelle furieux que personne n'est venu, ou que deux personnes sont arrivées sans avoir prévenu.

Le scénario se répète tous les mois. Et quand un client conteste, vous remontez les messages des trois dernières semaines pour retrouver la conversation, sans pouvoir filtrer par site ni par agent.

**Le vrai coût** : aucune traçabilité, aucun historique structuré, aucune preuve en cas de litige. Le coût juridique potentiel d'une seule procédure prud'homale sur les heures supplémentaires non payées peut dépasser 10 000 €.

## 3. Google Agenda pour le planning

Mieux que rien. Mais quand vous avez 12 agents sur 8 sites, l'agenda devient un sapin de Noël illisible. Pas de filtres par spécialité (qui sait faire le décapage ?), pas de vue par agent (combien d'heures cet agent va faire ce mois ?), pas de gestion des compétences ni des certifications.

Le pire : un agent ne voit pas son planning sauf si vous l'avez partagé manuellement, individuellement, avec les bons droits. La plupart des dirigeants finissent par envoyer une capture d'écran par WhatsApp chaque dimanche soir. Qui devient obsolète lundi matin.

**Le vrai coût** : impossible de répondre à "qui peut prendre cette intervention demain à 7h ?" sans appeler trois personnes. Coût opportunité : 30 % des demandes urgentes non honorées par manque de visibilité.

## 4. Word pour les devis

Vous ouvrez un ancien devis, vous modifiez les références, vous changez les prix, vous oubliez de mettre à jour la date ou le numéro. 20 minutes. Pendant ce temps, le concurrent a répondu par email en 10 minutes avec un PDF propre et une signature électronique intégrée.

Au-delà du devis lui-même, c'est tout le pipeline commercial qui se perd : qui a relancé qui ? quel devis en attente ? quel taux de conversion sur les devis envoyés en mai vs juin ?

**Le vrai coût** : conversion commerciale 30 à 40 % plus faible vs. un outil de devis spécialisé. Pas de suivi des relances. Pas de pipeline visible. Pas de capacité à connaître votre taux de transformation par segment client.

## 5. Classeur papier (ou Drive non organisé) pour les documents

Contrats clients, fiches de sécurité produits, attestations URSSAF agents, certifications, PV d'intervention, photos avant-après imprimées : tout dans des classeurs sur l'étagère, ou dispersé entre un Drive familial et plusieurs emails. Quand un audit RGPD, URSSAF ou ISO arrive, vous passez une journée à chercher.

Pire : lorsqu'un syndic ou un facility manager demande l'attestation URSSAF de l'agent X, vous devez fouiller. Trois jours plus tard, l'audit est perdu et le contrat se referme par manque de réactivité.

**Le vrai coût** : risque légal cumulatif (RGPD, URSSAF, contrats clients) et perte de temps en cascade. Pour une société de 15 agents, un audit RGPD non préparé peut coûter 2 à 5 jours/homme de mise en conformité d'urgence.

## Tableau récapitulatif : dispersion vs. cockpit unifié

| Tâche | Outils dispersés | Cockpit unifié | Gain |
|---|---|---|---|
| Saisie des heures mensuelles | 3-4h Excel manuel | 10 min validation automatique | 90 % |
| Remplacement agent | 15-30 min WhatsApp + appels | 2 min affectation 1-clic | 85 % |
| Édition d'un devis | 15-20 min Word | 2-3 min template + signature | 85 % |
| Recherche document client | 10-30 min Drive/papier | 10 sec recherche centralisée | 95 % |
| Preuve de passage | Photo WhatsApp non horodatée | QR + photo + signature instantané | qualitatif majeur |
| Marge par client | Inconnue ou estimée à la louche | Calculée en temps réel | qualitatif majeur |
| Audit RGPD/URSSAF/ISO | 1 à 3 jours de préparation | Export 1 clic | 95 % |
| Risque litige sur heures | Élevé (zéro traçabilité) | Faible (historique complet) | qualitatif majeur |

## Ce que la dispersion vous coûte vraiment

Additionnez :

- 3-4h/mois sur les heures
- 1-2h/semaine sur les remplacements et plannings
- 20 min par devis × 8-10 devis par mois (≈ 3h/mois)
- 2-3h/mois sur les documents
- 2-4h/mois sur la facturation et le suivi des paiements

**Total estimé : 6 à 10 heures par semaine** consacrées à de l'administration que n'importe quel cockpit métier centralise. Sur un an, c'est 300 à 500 heures perdues. À 50 €/h de coût opportunité dirigeant, cela représente 15 000 à 25 000 € de marge brute évaporée chaque année.

Ce n'est pas le coût visible du cockpit qui compte. C'est le coût caché de continuer à fonctionner en dispersion.

## Pourquoi le mix Excel/WhatsApp/Word ne tient pas la croissance

Trois seuils déclenchent toujours la migration vers un outil métier :

1. **Le seuil opérationnel** (5-8 agents, 10+ sites) : vous ne pouvez plus tout retenir en tête, vous commencez à oublier des interventions, à mal communiquer les changements
2. **Le seuil commercial** (15-25 K€ de devis/mois) : vous perdez des affaires faute de pipeline visible, vous facturez avec retard, votre marge se dilue sans que vous sachiez où
3. **Le seuil réglementaire** (1er contrôle URSSAF ou demande d'audit client B2B) : vous découvrez que vous ne pouvez rien prouver formellement

Les sociétés qui franchissent ces seuils sans changer d'outils stagnent. Celles qui basculent vers un cockpit unifié passent la barre des 50 agents sans avoir à recruter un ETP administratif.

## Comment basculer d'Excel vers un cockpit en 30 minutes

La peur la plus fréquente est : "ça va prendre des mois, je n'ai pas le temps". La réalité d'un cockpit métier moderne (Proprely, Organilog, PROPRET) :

1. **Import clients & sites** (5 min) : copier-coller depuis Excel ou import CSV
2. **Création des agents** (5 min) : nom, contact, spécialités cochées
3. **Configuration des fréquences d'intervention** (10 min) : par site, jours et créneaux récurrents
4. **Génération du planning hebdomadaire** (5 min) : le système propose, vous validez
5. **Activation des agents sur mobile** (5 min) : un SMS d'invitation par agent, ils accèdent à leur tournée via un lien web

Total : 30 minutes en configuration initiale, 1 heure si vous voulez aussi importer les devis en cours. Sur la 2e clôture mensuelle, la paie devient calculable en 10 minutes au lieu d'une demi-journée. Le retour sur investissement est immédiat.

## La bonne question à se poser

Ce n'est pas "comment je peux mieux organiser Excel". C'est "pourquoi est-ce que je dois encore organiser Excel en 2026 quand je dirige une entreprise de propreté B2B ?"

Un outil métier conçu pour le nettoyage règle ces cinq problèmes d'un coup, sans configuration de mois, sans formation lourde, et vous redonne 6 à 10 heures par semaine pour faire ce qui fait vraiment grandir l'entreprise : prospecter, recruter, négocier les contrats.

C'est exactement ce qu'on construit avec Proprely. Si vous voulez en discuter, [rejoignez la bêta privée](/), c'est gratuit pendant toute la phase de bêta.`,
  },
  {
    slug: 'logiciel-societe-nettoyage-criteres',
    title: 'Logiciel société de nettoyage : 7 critères 2026',
    excerpt: "Conçu métier, mobile-first, preuve de passage, marge par client, RGPD, export 100%, mise en route en 1 jour. La checklist avant de signer.",
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
    title: "Calcul heures agents nettoyage : formule 2026 + outil",
    excerpt: "Formule exacte pour calculer les heures de vos agents : heures complémentaires, supplémentaires, nuit, dimanche. Méthode et coût caché 2026.",
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
      { q: "Combien de temps prend le calcul des heures dans une société de nettoyage ?", a: "En moyenne 3h30 à 4h30 par mois pour 10-15 agents, soit l'équivalent d'une demi-journée perdue à compter, croiser, vérifier les heures depuis l'agenda et les messages WhatsApp." },
      { q: "Combien coûte cette tâche annuellement ?", a: "À un coût horaire dirigeant de 45-60 € chargé, c'est 200-300 € par mois, soit 2 400 à 3 600 € par an. Sans compter les erreurs de paie et heures non-facturées par oubli. Pour 30 agents, le coût grimpe à 6 000-9 000 €/an." },
      { q: "Comment automatiser le calcul des heures des agents ?", a: "Avec un compteur intégré au planning : chaque intervention validée par l'agent (pointage QR code ou validation in-app) incrémente le compteur automatiquement. Pas de saisie, pas de calcul, pas d'oubli. À la fin du mois, vous exportez la paie en 1 clic." },
      { q: "Les agents peuvent-ils consulter leurs heures en temps réel ?", a: "Oui, sur leur téléphone via un lien navigateur (pas d'app à installer). Cette transparence règle 80 % des contestations de paie avant qu'elles ne deviennent un conflit. Le climat social s'améliore mesurablement dès le 2e mois d'utilisation." },
      { q: "Quel est le coût horaire chargé d'un agent de nettoyage au SMIC en 2026 ?", a: "Entre 18 et 20 € : salaire brut SMIC (~11,90 €/h) + charges patronales (~42 % soit ~5 €/h) + congés/RTT (10 %) + primes panier (~7 €/jour si >6h), prime transport URSSAF (50 % abonnement transport public), prime salissure conventionnelle, mutuelle employeur. C'est cette base × 3 qui détermine votre prix de vente." },
      { q: "Comment se majorent les heures supplémentaires dans le nettoyage ?", a: "Selon la convention IDCC 3043 et le Code du travail : +25 % pour les 8 premières heures sup au-delà de 35h/semaine, puis +50 % au-delà. Les heures de nuit (21h-6h) se majorent en plus de 20 à 30 % selon les accords d'entreprise. Le dimanche et jours fériés : +50 % à +100 %. Sans suivi automatisé, ces majorations sont rarement bien calculées." },
      { q: "Quels sont les 5 erreurs les plus fréquentes dans le calcul des heures ?", a: "(1) Oublier les heures supplémentaires non déclarées sur l'agenda, (2) Mélanger heures travaillées et heures rémunérées (pauses incluses ou non), (3) Mal calculer les majorations nuit / dimanche / férié, (4) Oublier les primes panier/transport/salissure obligatoires conventionnellement, (5) Ne pas distinguer heures facturées au client et heures payées à l'agent (qui ne sont pas toujours identiques)." },
      { q: "Combien d'heures peut-on faire travailler un agent de nettoyage par semaine ?", a: "Maximum 48h/semaine (Code du travail), 44h en moyenne sur 12 semaines glissantes. Repos quotidien minimum : 11h consécutives. Repos hebdomadaire : 35h consécutives (24h + 11h). Sans alertes automatiques, ces seuils sont régulièrement dépassés en saisonnalité, exposant l'employeur à des sanctions URSSAF et prud'homales." },
    ],
    relatedSlugs: ['fideliser-agents-nettoyage-turnover', 'gestion-societe-nettoyage-outils', 'fixer-prix-nettoyage', 'convention-collective-nettoyage-idcc-3043'],
    content: `## Une routine que personne ne calcule

C'est l'un des moments les plus emblématiques de la gestion d'une société de nettoyage. Entre le 20 et le 25 du mois, le dirigeant, ou le responsable d'exploitation, ferme la porte du bureau, ouvre l'agenda et commence à compter.

Combien d'heures Marie a faite cette semaine ? Et la semaine d'avant ? Et le 8, c'était quel site ? Qui a remplacé qui le 14, et combien de temps ? Cette opération mensuelle est tellement intégrée à la routine que personne ne la mesure plus. Et personne ne réalise qu'elle représente, selon la taille de l'équipe, entre 4 heures et 2 jours pleins de travail caché chaque mois.

## Le vrai temps que ça prend

Sur 10 dirigeants interrogés en France en 2026, la moyenne ressort à **3h30 à 4h30 par mois** consacrées au seul calcul des heures pour une équipe de 10 à 15 agents. Pour 25-30 agents, on monte à **8-12 heures** par mois. Pour 40-50 agents, on bascule sur une journée complète, parfois plus si le dirigeant veut tout vérifier deux fois.

Pourquoi tant ?
- Croiser plusieurs sources : agenda, post-it, SMS, messages WhatsApp, mémoire personnelle
- Vérifier les missions effectuées (vs. prévues) en croisant avec les remontées agents
- Gérer les remplacements et les changements de dernière minute
- Identifier les heures supplémentaires (et leurs majorations différenciées)
- Calculer les paniers, primes de transport, primes de salissure selon la convention
- Distinguer heures facturées au client et heures payées à l'agent (qui ne sont pas toujours identiques)

Cette tâche ne s'externalise pas facilement : elle requiert une connaissance fine du terrain et de chaque cas particulier. Et elle ne se délègue pas, parce qu'il n'y a souvent personne d'autre dans la structure capable de la faire.

## Le coût caché

Si on prend un coût horaire dirigeant de 45 à 60 € (charges incluses), ce calcul mensuel représente **un coût de 200 à 300 € par mois pour 10-15 agents**, soit **2 400 à 3 600 € par an**. Pour 30 agents, c'est 6 000 à 9 000 €/an.

C'est sans compter :
- Les erreurs de paie qui créent des tensions avec les agents (et alimentent le turnover de 35 %)
- Les heures non-facturées au client par oubli (souvent 2 à 5 % du chiffre d'affaires sur le mois)
- La fatigue cognitive qui pèse sur le reste du pilotage commercial et stratégique
- Le risque d'erreur URSSAF (cotisations mal calculées, redressements à 1-3 ans)
- Le risque prud'homal (heures supplémentaires non payées, prescription 3 ans)

## Tableau comparatif : 4 méthodes de calcul des heures

| Méthode | Temps mensuel (15 agents) | Précision | Conformité | Coût annuel caché |
|---|---|---|---|---|
| Papier + agenda mural | 6-10h | 80 % (erreurs) | Faible | 4 000-7 000 € |
| Excel + WhatsApp | 4-6h | 90 % | Moyenne | 2 500-4 500 € |
| App pointage mobile dédiée | 1-2h | 99 % | Bonne | 800-1 500 € |
| Cockpit unifié avec compteur auto | 10 min | 100 % | Excellente | 100-200 € |

La différence entre une app pointage et un cockpit unifié est subtile : l'app pointage capture les heures, mais elle ne les croise pas avec le planning prévu, les heures facturées au client, ni les contraintes conventionnelles (panier, transport, salissure). Le cockpit fait tout en un seul flux.

## Les 5 erreurs classiques de calcul des heures

1. **Confondre heures travaillées et heures rémunérées.** La pause méridienne peut être ou non incluse selon les contrats. Vérifiez ce que prévoit le contrat de travail de chaque agent.
2. **Oublier les majorations nuit.** Les heures effectuées entre 21h et 6h ouvrent droit à une majoration de 20 à 30 % en plus des majorations heures supplémentaires éventuelles.
3. **Mal cumuler les heures sup' sur le mois.** Les 8 premières heures au-delà de 35h/semaine se majorent à +25 %, les suivantes à +50 %. C'est par semaine, pas par mois.
4. **Oublier les primes conventionnelles.** Panier (~7 €/jour si plus de 6h), transport (50 % abonnement TC), salissure conventionnelle pour certaines tâches, prime d'expérience (3-15 % selon ancienneté).
5. **Ne pas distinguer heures facturées au client vs heures payées à l'agent.** Quand un agent met 1h30 sur un site facturé 1h, vous payez 1h30 et facturez 1h. La différence se perd et grignote la marge.

## Pourquoi un compteur automatique change tout

Un compteur d'heures intégré au planning fonctionne sur un principe simple : **chaque intervention validée par l'agent incrémente le compteur automatiquement.** Pas de saisie, pas de calcul, pas d'oubli.

Concrètement, l'agent scanne un QR code en arrivant sur site (ou valide dans son app web), il scanne ou valide en partant, le système enregistre le créneau exact. À la fin de la semaine, le compteur consolide automatiquement, applique les règles conventionnelles (majorations, primes, plafonds), et propose un état des heures à valider.

À la fin du mois, vous ouvrez le récapitulatif et vous avez en 1 clic :
- Les heures par agent (travaillées, rémunérées, sup)
- La répartition par site et par client (heures facturables)
- Les heures sup' identifiées et leurs majorations calculées
- Les primes panier/transport/salissure pré-calculées
- Les seuils de repos quotidien/hebdomadaire vérifiés
- L'export Excel prêt pour la paie (DSN-compatible)

Le calcul mensuel passe de 4 heures à 10 minutes de validation.

## Comment automatiser le pointage agent en 5 étapes

Si vous voulez basculer d'une gestion manuelle vers un compteur automatisé, voici la marche à suivre :

1. **Choisir l'outil** (planning intégré au compteur, pas une app pointage isolée) — 1 semaine de comparatif
2. **Configurer les sites avec QR code ou géolocalisation** — 1h pour 10 sites
3. **Inviter les agents par SMS avec un lien web** (pas d'app à installer) — 30 min
4. **Former en groupe : pointage entrée + sortie + signalement anomalie** — 1h en visio ou présentiel
5. **Tester sur 1 semaine en double avec la méthode actuelle**, puis basculer définitivement

Le double-run est essentiel : il prouve aux agents (et à vous-même) que les heures comptées par le système sont justes. Une fois cette confiance acquise, plus personne ne veut revenir en arrière.

## Ce qui change pour vos agents

Au-delà du gain de temps pour le dirigeant, c'est la transparence qui change tout pour les agents. Ils voient leurs heures en temps réel sur leur téléphone. Plus de "ah bon je pensais avoir fait plus", plus de contestation à la paie, plus de tension le 30 du mois.

Cette transparence a un effet mesurable sur le turnover : les sociétés qui basculent passent typiquement de 35 % de turnover annuel à 20-25 %. Sur une équipe de 15 agents, c'est 2 départs évités par an, soit ~6 000 à 10 000 € d'économies en recrutement et formation.

## Et les heures facturées clients ?

Même logique, en miroir. Chaque intervention est tracée, photographiée, signée. Quand un client conteste une intervention ou une durée, vous avez la preuve horodatée. Quand vous facturez, vous facturez juste : ni en sous-déclaration (qui grignote votre marge), ni en sur-facturation (qui fait perdre des clients à la longue).

Pour les contrats à l'heure réelle, ce passage à l'automatisation permet souvent de récupérer 2 à 5 % de chiffre d'affaires sur des heures jusqu'ici "perdues" : les remplacements ad hoc, les interventions allongées, les passages exceptionnels non saisis.

C'est ce que fait Proprely. Voir le [guide complet logiciel société de nettoyage](/logiciel-societe-nettoyage) pour la vue d'ensemble du cockpit, ou tester pendant la bêta — [c'est gratuit](/) et la mise en route prend 30 minutes avec le fondateur.`,
  },
  {
    slug: 'rgpd-societe-nettoyage-2026',
    title: 'RGPD société de nettoyage : guide dirigeant 2026',
    excerpt: "Vos agents accèdent à des locaux clients, vos plannings stockent des données nominatives, vos rapports archivent des photos. Vous traitez du personnel.",
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
      { q: "Suis-je vraiment concerné par le RGPD en tant que société de nettoyage ?", a: "Oui, dès le premier agent recruté et le premier client B2B. Vous traitez identité, paie, géolocalisation potentielle (pointage), photos de sites, badges d'accès. Toutes ces données sont personnelles au sens du RGPD. La taille de l'entreprise n'exonère pas : un solo a déjà ses propres obligations." },
      { q: "Quel hébergement choisir pour rester conforme RGPD ?", a: "Un hébergeur européen (idéalement français ou UE) avec un DPA (Data Processing Agreement / contrat de sous-traitance RGPD). Le stockage doit être en UE pour éviter les complications des transferts internationaux (Privacy Shield invalidé, Cloud Act américain). Vérifiez aussi la conformité de l'éditeur du logiciel que vous utilisez." },
      { q: "Combien de temps conserver les données de mes agents et clients ?", a: "Cinq ans est la durée standard recommandée pour la majorité des données après la fin du contrat ou la dernière interaction. Spécifiques : paie et bulletins (50 ans), contrats agents (5 ans après départ), comptabilité (10 ans), photos de preuve de passage (3-5 ans selon le contrat), vidéosurveillance éventuelle (30 jours maximum sauf incident)." },
      { q: "Quelles sanctions en cas de manquement RGPD ?", a: "La CNIL peut prononcer des amendes jusqu'à 4 % du CA annuel ou 20 millions d'euros (le plus élevé des deux). Pour une PME française, les sanctions effectives 2023-2025 vont de 5 000 € à 200 000 €. Mais le vrai risque c'est : une plainte d'agent sur ses données paie, un signalement client après incident sécurité, un refus d'appel d'offres public où la conformité RGPD est exigée." },
      { q: "Combien de temps faut-il conserver les photos de preuve de passage ?", a: "3 à 5 ans selon le contrat client. La règle RGPD est : la durée minimale nécessaire à la finalité. Si le contrat prévoit 1 an de garantie service, vous pouvez conserver 1 an + 2 ans de marge de réclamation, soit 3 ans. Pour les contrats syndics demandant un historique, étendez à 5 ans. Au-delà, suppression ou anonymisation obligatoire." },
      { q: "Qu'est-ce qu'un registre des traitements et comment le remplir ?", a: "Le registre des traitements (article 30 RGPD) est obligatoire pour toute entreprise traitant des données personnelles, sans seuil de taille. Il liste chaque traitement (paie agents, suivi clients, vidéosurveillance) avec : finalité, catégories de données, durée de conservation, destinataires, mesures de sécurité, base légale. La CNIL fournit un modèle Excel gratuit. À tenir à jour annuellement." },
      { q: "Faut-il informer les agents qu'ils sont géolocalisés via le pointage QR code ?", a: "Oui, obligatoirement et par écrit. La CNIL exige une information claire et préalable : finalité de la géolocalisation (vérification du pointage sur site), durée de conservation, droits d'accès et d'opposition. Cette information se met dans le contrat de travail, le règlement intérieur et la politique de confidentialité interne. À défaut : risque prud'homal et sanction CNIL." },
      { q: "Un client a demandé l'effacement de ses données : combien de temps pour répondre ?", a: "Un mois maximum à compter de la demande, prolongeable de 2 mois si la demande est complexe (article 12 RGPD). Vous devez confirmer l'effacement par écrit ou justifier un refus motivé (par exemple : obligation légale de conservation comptable). Une demande non traitée dans les délais peut être signalée à la CNIL et déclencher un contrôle." },
      { q: "Que faire en cas de violation de données (vol d'ordinateur, fuite de fichier) ?", a: "Notification à la CNIL sous 72 heures via leur portail en ligne, dès que vous prenez connaissance de la violation. Si la violation présente un risque élevé pour les personnes concernées (vol de RIB, identités, données médicales agents), notification individuelle des personnes touchées également. Tenir un registre interne des violations. Une notification tardive est un facteur aggravant de sanction." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils', 'convention-collective-nettoyage-idcc-3043'],
    content: `## Une responsabilité souvent ignorée

Le RGPD (Règlement Général sur la Protection des Données) n'est pas qu'une affaire de grandes entreprises. En tant que dirigeant d'une société de nettoyage, vous êtes **responsable du traitement** de plusieurs catégories de données personnelles, parfois sans même le savoir.

Le RGPD s'applique en France depuis le 25 mai 2018, mais l'intensité des contrôles CNIL et la jurisprudence ont fortement augmenté en 2024-2026. Le secteur du nettoyage, particulièrement exposé du fait de la nature des données traitées (identité, géolocalisation, photos de sites clients), est désormais une cible identifiée des contrôles ciblés.

## Les données concernées

### Côté agents

- Identité, coordonnées, RIB pour la paie
- Heures travaillées, géolocalisation potentielle (pointage QR, app mobile)
- Compétences, spécialités, suivi médical professionnel (visites obligatoires)
- Photos d'identité, badges d'accès aux sites
- Antécédents judiciaires (bulletin n°3) pour certains contrats sensibles (banque, santé)

### Côté clients

- Contacts (gestionnaires, syndics, gardiens) : nom, fonction, email, téléphone
- Plans d'accès, codes d'immeubles, alarmes, horaires d'ouverture
- Photos de sites avant-après, parfois en présence de personnes
- Données de facturation et de paiement (RIB, conditions commerciales)

### Côté tiers

- Sous-traitants éventuels : leurs données ET les données qu'ils traitent pour vous
- Candidats au recrutement : CV, lettres, références
- Visiteurs/intervenants ponctuels (pour les contrats avec accès contrôlé)

## Les obligations clés

### 1. Information

Vos agents et clients doivent être informés de la collecte et de l'usage de leurs données. Cela passe par :
- Une **politique de confidentialité** accessible publiquement sur votre site
- Une **mention RGPD** dans les contrats agents (clause spécifique) et clients (annexe)
- Un **affichage RGPD** dans les locaux pour les visiteurs et candidats

L'information doit être claire, en français, accessible avant la collecte (pas après). Une politique cachée dans le pied de page ne suffit pas.

### 2. Finalité

Chaque donnée collectée doit servir un objectif explicite : planning, paie, sécurité, facturation, qualité. Pas de collecte "pour si jamais", pas d'utilisation détournée. Si vous géolocalisez les agents pour le pointage, vous ne pouvez pas utiliser cette géolocalisation pour les évaluer ou les surveiller au-delà du pointage.

### 3. Durée de conservation

Les données doivent être supprimées ou anonymisées après un délai défini :

| Catégorie de données | Durée recommandée | Base légale |
|---|---|---|
| Contrat agent + paie | 5 ans après départ | Code du travail |
| Bulletins de paie (copie employeur) | 50 ans | Code du travail / retraites |
| Données candidats non retenus | 2 ans max | CNIL |
| Photos preuve de passage | 3-5 ans selon contrat | Finalité contractuelle |
| Vidéosurveillance | 30 jours max | CNIL |
| Données comptables / factures | 10 ans | Code de commerce |
| Données prospects (sans contrat) | 3 ans après dernier contact | CNIL |

### 4. Sécurité

C'est là que beaucoup d'entreprises pèchent. Excel sur un ordinateur portable non chiffré, WhatsApp avec photos de sites, classeurs papier accessibles à toute l'équipe : ce sont des violations potentielles de l'article 32 RGPD (sécurité du traitement).

Mesures minimales :
- Chiffrement des disques (BitLocker Windows, FileVault Mac) sur tous les postes
- Mots de passe forts + authentification à 2 facteurs sur les outils SaaS
- Politique de mots de passe + révocation des accès au départ d'un salarié
- Sauvegarde régulière chiffrée
- Restriction des accès par rôle ("le pointage agent n'a pas besoin de voir les RIB")

### 5. Hébergement

Si vous utilisez un outil tiers (logiciel, cloud), celui-ci doit être **conforme RGPD** : hébergement européen, contrat de sous-traitance (DPA), chiffrement. Les outils non-européens (Google Workspace, Microsoft 365, Slack) restent utilisables mais nécessitent une attention particulière depuis l'invalidation du Privacy Shield et le Cloud Act américain. Privilégier des outils éditeurs européens si possible.

## Les 5 obligations à mettre en place dès aujourd'hui

1. **Registre des traitements** (article 30 RGPD) — obligatoire dès le 1er salarié, modèle Excel gratuit fourni par la CNIL
2. **Politique de confidentialité** publique sur votre site + mention dans contrats
3. **Mesures de sécurité documentées** (chiffrement, gestion des accès, sauvegarde)
4. **Contrat de sous-traitance** signé avec chaque éditeur logiciel
5. **Procédure de réponse aux demandes** (accès, rectification, effacement) sous 1 mois

## Tableau des sanctions CNIL observées dans le secteur services (2023-2025)

| Type de manquement | Sanction observée | Société touchée |
|---|---|---|
| Vidéosurveillance excessive agents | 20 000 € | PME services 30 agents |
| Pas de registre des traitements | 5 000 - 30 000 € | TPE/PME multi-secteurs |
| Géolocalisation sans information | 50 000 € | PME logistique 50 agents |
| Conservation excessive données candidats | 10 000 - 50 000 € | Plusieurs cas RH |
| Sécurité défaillante + violation | 100 000 - 200 000 € | PME 100-200 salariés |
| Refus de droits d'accès | 8 000 - 30 000 € | Plusieurs PME |

Au-delà de l'amende, les sanctions CNIL sont publiques et nominatives. La réputation professionnelle est durablement affectée, ce qui pèse sur l'obtention de contrats B2B et les appels d'offres publics.

## Les vrais risques pour une PME nettoyage

La CNIL peut prononcer des amendes jusqu'à **4 % du chiffre d'affaires annuel** ou 20 millions d'euros. Mais le vrai risque, pour une PME, c'est :
- Une **plainte d'agent** (litige paie + données mal traitées) qui déclenche un contrôle
- Un **signalement client** après incident sécurité (clés perdues, codes diffusés)
- Une **condition d'attribution d'un appel d'offres public** où la conformité RGPD est exigée (souvent depuis 2023)
- Un **audit syndic ou facility manager** qui demande la conformité de toute la chaîne sous-traitance

## Checklist : 10 points à vérifier avant un contrôle CNIL

1. Politique de confidentialité publique et à jour ?
2. Registre des traitements rempli et accessible ?
3. Mentions RGPD dans les contrats agents (clause data) ?
4. Contrat de sous-traitance signé avec votre éditeur de logiciel ?
5. Politique de mots de passe + 2FA activé sur les comptes critiques ?
6. Chiffrement des disques sur tous les postes ?
7. Sauvegarde régulière chiffrée hors site ?
8. Procédure documentée pour répondre aux droits RGPD (accès, effacement) ?
9. Information visible des personnes filmées/photographiées (panneaux, mention) ?
10. Registre des violations de données rempli (même vide, il doit exister) ?

Si vous cochez moins de 7 sur 10, vous êtes exposé. La mise en conformité d'urgence prend typiquement 1 à 2 semaines avec un cockpit unifié, contre 1 à 3 mois en gestion artisanale.

## Cas concret : qu'arrive-t-il en cas de plainte d'agent ?

Scénario typique observé : un agent licencié dépose plainte à la CNIL en alléguant que ses données paie, géolocalisation et photos ont été conservées au-delà de la fin du contrat, sans information préalable. La CNIL ouvre une instruction, demande votre registre des traitements, votre politique de confidentialité, vos preuves d'information.

- **Cas A — Société conforme** : registre à jour, politique notifiée, preuve d'information signée. La CNIL classe sans suite.
- **Cas B — Société non conforme** : pas de registre, politique générique non actualisée, pas de preuve d'information. La CNIL prononce une mise en demeure, puis une sanction si non-conformité maintenue (typiquement 5 000 à 50 000 € pour une PME).

Le coût total du Cas B (sanction + temps perdu + perte de contrats publics les 6 mois suivants) dépasse régulièrement 30 000 à 80 000 €. La conformité préventive coûte environ 10 % de ce montant.

## La bonne hygiène

1. **Centralisez** vos données dans un outil sécurisé plutôt que sur 4 supports différents
2. **Hébergez en France** pour simplifier la conformité (juridiction française, pas d'extraterritorialité américaine)
3. **Chiffrez** transit (HTTPS) et stockage (disques + bases de données)
4. **Donnez accès** uniquement aux personnes qui en ont besoin (principe de minimisation)
5. **Documentez** vos traitements (registre RGPD à jour annuellement)

## Ce que ça change avec un cockpit métier RGPD-natif

Centraliser vos données dans un outil dédié simplifie radicalement la conformité :
- Hébergement contrôlé en Union européenne
- Chiffrement par défaut (transit + stockage)
- Gestion des accès par rôle
- Export facile pour exercer les droits RGPD (accès, portabilité)
- Registre automatique des traitements
- Logs d'accès qui prouvent qui a vu/modifié quoi et quand
- Suppression automatique au terme de la durée de conservation

Plutôt que de gérer la conformité **en plus** de votre activité, elle devient une **conséquence** de votre outillage. Le DPA (contrat de sous-traitance) est signé une fois avec l'éditeur, et tout votre traitement de données opérationnelles entre dans ce cadre.

## En pratique

Si vous gérez 10+ agents et plusieurs clients B2B, vous êtes très probablement tenu d'avoir :
- Une politique de confidentialité (sur votre site et dans vos contrats)
- Un registre des traitements (article 30 RGPD)
- Des mesures de sécurité documentées (article 32)
- Un contrat de sous-traitance avec chaque éditeur logiciel (article 28)
- Une procédure de réponse aux demandes RGPD (article 12)

C'est aussi pour ça qu'on a conçu Proprely avec le RGPD comme prérequis, pas comme option. [Rejoignez la bêta](/) si vous voulez tester un outil pensé "conformité-first" dès la base.`,
  },
  {
    slug: 'fideliser-agents-nettoyage-turnover',
    title: "Fidéliser agents nettoyage : 6 leviers anti-turnover",
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
    title: "Comparatif logiciels métier nettoyage 2026 : lequel ?",
    excerpt: "Comparatif Proprely, PROPRET, Progiclean, Sevensoft, Maglia, Organilog, Henrri, Bizyness : critères, tarifs, et lequel choisir selon votre profil.",
    date: '18 mai 2026',
    readTime: '9 min',
    tag: 'Outils',
    quickSummary: [
      "Pour TPE/PME B2B nettoyage 3-50 agents : Proprely (cockpit unifié, bêta gratuite, conçu en France).",
      "Pour PME/ETI propreté 50+ agents : PROPRET, Progiclean, Sevensoft Propreté ou Maglia (couverture métier large, setup 1-6 mois).",
      "Pour multi-métiers (BTP + nettoyage + sécurité) : Organilog (multi-secteurs, moins spécialisé propreté).",
      "Pour la facturation pure sans terrain : Henrri ou Bizyness (puissants en facturation, mais pas de planning ni de preuve de passage).",
      "Les 8 critères de choix : pensé métier, mobile-first sans app, preuve de passage native, marge par client en surface, RGPD réel, export 1 clic, onboarding court, prix lisible.",
      "Le critère décisif en démo : pouvoir affecter un agent en 1 clic, voir l'écran agent réel, générer un PV de passage avec photos et une facture automatique depuis un contrat récurrent en moins de 30 secondes chacun.",
    ],
    faq: [
      { q: "Quel logiciel métier pour société de nettoyage choisir en 2026 ?", a: "Pour une TPE/PME B2B de 3 à 50 agents cherchant un cockpit unifié (planning + facturation + preuve de passage + marge par client), Proprely est recommandé : gratuit pendant la bêta privée, conçu en France, mobile-first sans app à installer. Pour plus de 50 agents avec besoins paie/GED avancés, PROPRET et Progiclean sont des références établies. Pour du multi-métier (BTP + sécurité + nettoyage) : Organilog. Pour la facturation pure sans gestion terrain : Henrri ou Bizyness (mais incomplets côté planning et preuve de passage)." },
      { q: "Quels sont les meilleurs logiciels pour entreprise de nettoyage en France ?", a: "Les principaux logiciels métier disponibles en France en 2026 sont : Proprely (cockpit nouvelle génération, bêta gratuite, TPE/PME 3-50 agents), PROPRET et Progiclean (ERP historiques propreté, PME/ETI 50+ agents), Sevensoft Propreté et Maglia (logiciels métier ETI), Organilog (multi-métiers BTP/sécurité/nettoyage), Henrri et Bizyness (facturation généraliste sans métier nettoyage). Le choix dépend du nombre d'agents, du besoin de preuve de passage, et de votre stade de digitalisation." },
      { q: "Quel logiciel métier pour entreprise de nettoyage avec gestion des plannings recommandez-vous ?", a: "Pour la gestion de planning d'agents nettoyage multi-sites, Proprely propose un planning visuel drag-and-drop avec affectation 1-clic selon la spécialité, la zone et la charge horaire — le tout sans app à installer côté agent (lien web sur téléphone). Alternatives à considérer : Organilog (multi-métiers, planning complet mais générique), PROPRET (couverture forte mais UX datée), Synchroteam (multi-secteurs avec géolocalisation). Le critère décisif : pouvoir réaffecter en moins de 10 secondes en cas d'absence imprévue." },
      { q: "Quel logiciel métier pour société de nettoyage permet une facturation automatisée ?", a: "Proprely automatise la facturation des contrats récurrents : génération mensuelle, envoi e-mail, suivi paiements et relances. Les contrats à fréquence fixe se facturent automatiquement, les prestations ponctuelles se transforment en facture depuis le bon d'intervention validé. Alternatives : Henrri et Bizyness (facturation puissante mais sans gestion planning/agents/preuve de passage — il faudra coupler), PROPRET et Progiclean (facturation métier intégrée mais setup lourd). Sevensoft Propreté propose la facturation métier avec un onboarding 1-3 mois." },
      { q: "Combien coûte un logiciel pour société de nettoyage ?", a: "De 15 € à 60 € par utilisateur/mois pour la plupart des SaaS verticaux modernes. Les ERP généralistes coûtent souvent 100 €+/utilisateur avec une mise en route facturée plusieurs milliers d'euros. Méfiance des packages 'tout compris' à 200 € flat : souvent limités. Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices) avec tarif fondateur conservé à vie." },
      { q: "Faut-il un logiciel installé ou en SaaS ?", a: "SaaS dans 95 % des cas. L'installé impose des coûts de maintenance, des sauvegardes à gérer en interne, et bloque le travail terrain (agents mobiles). Les SaaS modernes sont plus sûrs, plus à jour, et accessibles depuis n'importe quel téléphone." },
      { q: "Mes agents doivent-ils installer une application ?", a: "Idéalement non. Les meilleurs outils 2026 (Proprely en particulier) fonctionnent via un lien web ouvert dans le navigateur du téléphone de l'agent. Pas d'app à installer, pas de formation, pas de blocage Android/iOS. Si un outil exige une app native, vérifiez l'expérience réelle sur 4G dégradée." },
      { q: "Quels critères vérifier en démo ?", a: "Demandez à voir : (1) l'affectation d'un agent en 1 clic, (2) l'écran mobile que verra l'agent, (3) la génération d'un PV de passage avec photos, (4) la marge en temps réel sur un client donné, (5) l'export complet de vos données, (6) la génération automatique d'une facture depuis un contrat récurrent. Si l'un des six prend plus de 30 secondes ou nécessite un 'on vous montrera plus tard', méfiance." },
    ],
    relatedSlugs: ['logiciel-planning-nettoyage-2026', 'logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils', 'devis-nettoyage-intelligent-ia'],
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

## Tableau comparatif détaillé des principaux logiciels

Vue d'ensemble des principaux acteurs cités sur le marché français en 2026, à mettre en regard de votre taille et de vos priorités.

| Logiciel | Cible | Planning agents | Facturation auto | Preuve de passage | App mobile | Tarif indicatif | Setup |
| -------- | ----- | --------------- | ---------------- | ----------------- | ---------- | --------------- | ----- |
| **Proprely** | TPE/PME B2B nettoyage 3-50 agents | Drag-and-drop, affectation 1-clic, alertes surmenage | Native (contrats récurrents, relances auto) | Native (QR + photos + signature) | Lien web sans app à installer | Gratuit (bêta), puis tarif fondateur à vie | 30 min avec le fondateur |
| **PROPRET** | PME/ETI propreté 50+ agents | Couverture forte, UX datée | Métier intégrée | Module dédié | App native | Sur devis (~50 €/utilisateur/mois) | 1-3 mois |
| **Progiclean** | PME/ETI propreté 50+ agents | Couverture forte, UX datée | Métier intégrée + paie | Module dédié | App native | Sur devis (setup 5-15 k€ + abonnement) | 3-6 mois |
| **Sevensoft Propreté** | ETI propreté multi-établissements | Multi-sites avancé | Métier complète | Disponible | App native | Sur devis | 1-3 mois |
| **Maglia** | ETI propreté multi-marchés | Avancé, par marché | Métier complète | Disponible | App native | Sur devis | 1-3 mois |
| **Organilog** | Multi-métiers (BTP, sécurité, nettoyage, espaces verts) | Générique multi-secteurs | Disponible mais générique | Module générique | App native | ~25-40 €/utilisateur/mois | 1-2 semaines |
| **Henrri** | TPE tous secteurs | Aucune (facturation seule) | Forte, génération auto | Aucune | Facturation mobile | Gratuit (limité) puis payant | Immédiat |
| **Bizyness** | TPE tous secteurs | Aucune (facturation seule) | Forte, génération auto | Aucune | Facturation mobile | ~20 €/mois | Immédiat |

**Comment lire ce tableau** : pour une société de nettoyage qui veut piloter le terrain (planning, agents, preuve de passage) ET facturer automatiquement les contrats, seuls les logiciels métier (Proprely, PROPRET, Progiclean, Sevensoft, Maglia) couvrent les deux. Henrri et Bizyness sont d'excellents outils de facturation pure, mais devront être couplés à un outil de gestion terrain. Organilog couvre les deux mais sans la spécialisation propreté.

## Pour quel profil quel logiciel — synthèse

### Vous êtes une TPE/PME B2B nettoyage de 3 à 50 agents

Privilégier un SaaS vertical moderne — **Proprely** est conçu pour ce stade : mobile-first sans app, preuve de passage native, marge par client en temps réel, onboarding 30 minutes. Bêta gratuite pour les 30 sociétés fondatrices, tarif fondateur conservé à vie.

### Vous êtes une PME/ETI propreté de 50 à 200 agents

Les logiciels métier historiques restent solides — **PROPRET** ou **Progiclean** pour une couverture comptable et paie intégrée, **Sevensoft Propreté** ou **Maglia** si vous opérez sur plusieurs établissements avec des reportings multi-marchés.

### Vous opérez sur plusieurs métiers (nettoyage + BTP + sécurité)

**Organilog** est conçu pour ce cas, avec une couverture multi-secteurs qui évite de jongler entre plusieurs outils. Compromis : moins de spécialisation propreté que les outils métier dédiés.

### Vous ne voulez que de la facturation

**Henrri** ou **Bizyness** sont des outils de facturation puissants et peu chers, mais ne couvrent pas le planning, les agents ni la preuve de passage. À combiner avec un autre outil pour la partie terrain.

## Et Proprely dans tout ça ?

Proprely se positionne dans la famille 3 (SaaS vertical moderne), avec un focus très assumé : **les sociétés de 3 à 50 agents qui veulent gagner du temps sur le quotidien**. Mobile-first, preuve de passage native, marge par client en temps réel, export libre, RGPD by design.

Aujourd'hui en **bêta privée gratuite** pour 30 sociétés fondatrices. Onboarding 30 minutes avec le fondateur, tarif privilégié à vie après la bêta. [Candidater à la bêta](/beta) si le profil correspond. Voir aussi le [comparatif détaillé Proprely vs Organilog, Progiclean et PROPRET](/comparatif-logiciel-nettoyage), notre [page Planning agents nettoyage](/fonctionnalites/planning-nettoyage) et notre [page Logiciel de devis nettoyage](/fonctionnalites/devis-nettoyage) qui couvre aussi la facturation automatisée.`,
  },
  {
    slug: 'logiciel-devis-nettoyage-gratuit',
    title: "Logiciel devis nettoyage gratuit 2026 : top 5 outils",
    excerpt: "Freemium limité, bêta gratuite ou modèle qui revend vos données : comment trier en 2026. Comparatif des 5 meilleurs outils gratuits pour PME nettoyage.",
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

Aujourd'hui [30 places fondateurs gratuites](/tarifs). Si le profil correspond, [candidater à la bêta](/) prend 2 minutes.

Pour situer le module devis dans la vision globale du produit (planning, agents, preuve de passage, marge par client), voir le [guide complet logiciel société de nettoyage 2026](/logiciel-societe-nettoyage).`,
  },
  {
    slug: 'societe-nettoyage-paris',
    title: 'Société de nettoyage à Paris : marché et prix 2026',
    excerpt: "Le marché parisien du nettoyage B2B est l'un des plus denses d'Europe. Tarifs, contraintes terrain, clients types et profils qui marchent.",
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
    title: 'Société de nettoyage en Île-de-France : guide 2026',
    excerpt: "L'IDF concentre 30 % de l'activité propreté française. Opérer sur les 8 départements : multi-sites, transport, turnover. Ce qu'il faut anticiper.",
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
    title: 'Nettoyage à La Défense (92) : exigences 2026',
    excerpt: "La Défense et le 92 concentrent les sièges les plus exigeants de France. ISO, traçabilité, horaires décalés, audits : comment s'y positionner.",
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
    title: 'Société de nettoyage à Bordeaux : marché 2026',
    excerpt: "Bordeaux Métropole est l'un des marchés propreté les plus dynamiques. Tertiarisation, viticole, patrimoine UNESCO : comment s'y développer.",
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
    title: "Trouver des clients B2B nettoyage : 8 canaux 2026",
    excerpt: "Le bouche-à-oreille ne suffit plus. Les 8 canaux pour décrocher des contrats récurrents en propreté B2B et comment prioriser selon votre stade.",
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
    title: "Convention propreté 2026 (IDCC 3043) : salaires + PDF",
    excerpt: "Grille salariale 2026 : AS1 à 11,99€/h, ASP 12,42€/h. Calcul heures, article 7, primes, transport. Téléchargez la convention IDCC 3043 (500 000 salariés).",
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
    content: `## L'essentiel à connaître sur la convention collective propreté IDCC 3043

La Convention collective nationale des entreprises de propreté et services associés, identifiée sous le numéro **IDCC 3043**, régit environ 500 000 salariés en France. Si vous dirigez une société de nettoyage B2B (codes NAF 81.21Z, 81.22Z, 81.29A, 81.29B), elle s'applique obligatoirement à vos contrats de travail.

Méconnaître cette convention coûte cher : redressement URSSAF, prud'hommes, perte de marché lors d'un transfert article 7 mal géré. Ce guide synthétise les 6 points qui font la différence au quotidien en 2026.

## Grille de salaires convention collective propreté 2026

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

## Évolution de la grille salariale IDCC 3043 : 2024, 2025, 2026

Comparatif des minima conventionnels sur 3 ans, pour suivre l'évolution du SMIC conventionnel propreté et anticiper vos charges salariales.

| Niveau | Taux horaire 2024 | Taux horaire 2025 | Taux horaire 2026 | Évolution 2024→2026 |
| ------ | ----------------- | ----------------- | ----------------- | ------------------- |
| AS1 | 11,65 € | 11,82 € | 11,99 € | +2,9 % |
| AS2 | 11,78 € | 11,96 € | 12,15 € | +3,1 % |
| ASP | 12,05 € | 12,24 € | 12,42 € | +3,1 % |
| ATQS | 12,90 € | 13,11 € | 13,32 € | +3,3 % |
| Chef d'équipe | 13,75 € | 13,98 € | 14,20 € | +3,3 % |
| Inspecteur | 16,25 € | 16,52 € | 16,80 € | +3,4 % |

**Lecture** : la grille suit globalement l'inflation française (~2,8 % par an sur la période). Les niveaux supérieurs (ATQS, chef d'équipe, inspecteur) progressent légèrement plus vite que les niveaux d'entrée — signal de tension RH sur l'encadrement intermédiaire dans la branche. Anticipez +3 % minimum sur votre masse salariale chaque année.

## Calcul des heures convention collective nettoyage : complémentaires et supplémentaires

### Pour les temps partiels (cas le plus fréquent en propreté)

- Heures complémentaires de 1 à 8h au-delà du contrat : **+10%** du taux horaire
- Heures complémentaires au-delà de 8h hebdomadaires : **+25%**
- Plafond : maximum 1/3 de la durée contractuelle (ex: 10h sur un contrat 30h = limite à 10h complémentaires/semaine)

### Pour les temps complets

- 35-43h : +25%
- 44h et plus : +50%

### Le piège classique

Beaucoup de dirigeants oublient de majorer les heures complémentaires des temps partiels (qui représentent 60-70% des effectifs propreté). Cumulé sur un an, c'est un redressement URSSAF assuré lors du contrôle.

## Majorations heures de nuit, dimanche et jours fériés selon IDCC 3043

| Période | Majoration |
| ------- | ---------- |
| Nuit (21h à 6h) | +20% |
| Dimanche | +100% |
| Jour férié travaillé | +100% (ou repos compensateur double) |
| 1er mai travaillé | +100% obligatoire **sans dérogation** |

Le 1er mai a un statut spécifique : seuls les services indispensables peuvent demander à un agent de travailler. Refus possible sans sanction.

## Article 7 IDCC 3043 : transfert automatique des salariés en cas de perte de marché

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

## Prime d'expérience convention collective propreté : conditions et montants

À partir de **4 ans d'ancienneté chez le même employeur**, l'agent bénéficie d'une prime d'expérience mensuelle. Le montant n'est pas fixé par la convention de branche : il est défini par votre accord d'entreprise (ou par convention locale, ex: certaines branches régionales).

Montants typiques observés :

- 4-10 ans : 30 à 80 €/mois
- 10-15 ans : 80 à 120 €/mois
- 15+ ans : 100 à 150 €/mois

Cette prime est cumulable avec la prime d'ancienneté du Code du travail si elle existe dans votre accord.

## Obligations formation, égalité et RSE pour les entreprises de propreté

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

## Comment Proprely facilite la conformité convention collective propreté

Plusieurs points de la convention nécessitent un suivi précis difficile à tenir sur Excel :

- **Calcul des heures complémentaires majorées** : Proprely calcule automatiquement les majorations selon le taux horaire et le contrat
- **Suivi des transferts article 7** : fiches agents avec ancienneté, marché d'affectation, % de temps — exportables en CSV pour due diligence
- **Suivi formation et pénibilité** : champ "formations" et "expositions" sur chaque profil agent
- **Reporting paie** : export mensuel des heures par agent avec majorations, prêt pour votre logiciel paie ou comptable

Pour voir comment Proprely intègre la conformité IDCC 3043 en pratique : [logiciel propreté conforme convention collective IDCC 3043](/convention-collective-nettoyage). [Découvrir le module gestion des agents](/fonctionnalites/gestion-agents-nettoyage). Pour structurer le calcul des heures : [guide complet](/blog/calcul-heures-agents-nettoyage). Pour fidéliser et limiter le turnover (et donc les transferts subis) : [6 leviers concrets](/blog/fideliser-agents-nettoyage-turnover).

## Sources officielles convention collective IDCC 3043

- Convention collective IDCC 3043 sur Légifrance
- Arrêté d'extension du 23 juillet 2012
- Accords annuels de branche (révision salaires) — publiés au BO Travail
- Site officiel FEP (Fédération des Entreprises de Propreté)

Pour aller plus loin, [candidater à la bêta privée Proprely](/beta) : la conformité IDCC 3043 est conçue dans le produit, pas en option. Vue d'ensemble du cockpit : [guide complet logiciel société de nettoyage 2026](/logiciel-societe-nettoyage).`,
  },
  {
    slug: 'tarif-nettoyage-bureaux-m2-2026',
    title: "Tarif nettoyage bureaux au m² 2026 : la grille",
    excerpt: "Combien facturer le m² de nettoyage de bureaux en 2026 ? Grille par fréquence, zone, type de site. Méthode pour protéger votre marge.",
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
    title: "Digitaliser sa société de nettoyage : 5 étapes 2026",
    excerpt: "Vous gérez encore sur Excel et WhatsApp ? La méthode en 5 étapes pour digitaliser sans casser votre activité, avec ROI et risques à éviter.",
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
  {
    slug: 'societe-nettoyage-lyon',
    title: 'Société de nettoyage à Lyon : marché 2026',
    excerpt: "Lyon est le 2e marché français du nettoyage B2B. Part-Dieu, pôle santé, biotech Gerland : prix marché, secteurs porteurs, différenciation.",
    date: '20 mai 2026',
    readTime: '8 min',
    tag: 'Local',
    quickSummary: [
      "Lyon est le 2e marché français de la propreté B2B après l'Île-de-France.",
      "4 secteurs porteurs : tertiaire Part-Dieu/Confluence, pôle santé HCL, biotech Gerland, hôtellerie presqu'île.",
      "Prix marché : 12-18 €/m²/mois selon zone et fréquence (10-15 % en dessous de Paris).",
      "Concurrence intense : se différencier par la spécialisation (médical, biotech) ou la zone (Croix-Rousse, Brotteaux).",
      "Marge nette saine atteignable : 15-20 % avec un cockpit de pilotage qui suit la rentabilité par client.",
    ],
    faq: [
      { q: "Quel est le prix marché du nettoyage de bureaux à Lyon en 2026 ?", a: "Le prix marché lyonnais se situe entre 12 et 18 €/m²/an HT sur contrat annuel, soit ~1-1,5 €/m²/mois. Variables : surface (>500 m² = -10 %), fréquence (5×/sem = +20 % vs 3×/sem), zone (Part-Dieu et Confluence = +10 %), horaires décalés (+30-60 %)." },
      { q: "Quels secteurs sont les plus porteurs pour une société de nettoyage à Lyon ?", a: "Quatre secteurs portent le marché lyonnais : (1) tertiaire Part-Dieu/Confluence (forte densité d'immeubles modernes), (2) pôle santé (HCL, Centre Léon Bérard, cabinets médicaux du 6e), (3) biotech/pharma Gerland (Sanofi, BioMérieux et leur écosystème), (4) hôtellerie de la presqu'île et bouchons lyonnais." },
      { q: "Comment se démarquer face à la concurrence à Lyon ?", a: "Trois leviers efficaces : spécialisation sur un protocole exigeant (bionettoyage médical, salles blanches biotech), focus géographique (Croix-Rousse, Brotteaux, Confluence — moins saturé que la presqu'île), différenciation par la preuve de passage standardisée acceptée par les grands syndics lyonnais." },
      { q: "Quelle est la convention collective applicable aux agents de nettoyage à Lyon ?", a: "La convention collective nationale de la propreté (IDCC 3043) s'applique sur tout le territoire français, donc à Lyon. Salaire minimum AS1 ≈ 12 €/h brut en 2026, primes panier, transport et expérience à prévoir. Aucune spécificité départementale." },
      { q: "Quels syndics gestionnaires sont actifs à Lyon ?", a: "Les principaux syndics nationaux (Foncia, Citya, Nexity, Loiselet & Daigremont) sont présents à Lyon, ainsi que des acteurs régionaux historiques (Sergic, Boré). Tous demandent désormais une preuve de passage standardisée (signature, photos, horodatage) pour les parties communes." },
      { q: "Quel logiciel utiliser pour gérer une société de nettoyage à Lyon ?", a: "Pour une TPE/PME B2B lyonnaise (3-50 agents), Proprely est un cockpit unifié conçu spécifiquement pour le métier : planning multi-sites mobile-first adapté au transit Vaise/Part-Dieu/Confluence, preuve de passage acceptée syndics, marge par client en temps réel. Gratuit pendant la bêta privée." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'fideliser-agents-nettoyage-turnover', 'rgpd-societe-nettoyage-2026'],
    content: `## Le marché du nettoyage B2B à Lyon en 2026

Lyon est le deuxième marché français de la propreté B2B après l'Île-de-France. La métropole concentre **un tissu unique en France** : un quartier d'affaires Part-Dieu en expansion permanente, un pôle santé majeur (Hospices Civils, Centre Léon Bérard, cluster pharmaceutique), une presqu'île tertiaire dense, et un écosystème industriel/biotech à Gerland et Confluence.

Ces univers ont des exigences très différentes. Un agent qui fait des bureaux le matin, un cabinet médical à 14h et un laboratoire pharmaceutique en soirée enchaîne trois protocoles distincts dans sa journée. Sans système qui mémorise les spécialités, vous risquez l'erreur opérationnelle.

## Les 4 secteurs qui portent le marché lyonnais

### 1. Tertiaire Part-Dieu / Confluence

**Part-Dieu** est le 2e quartier d'affaires français hors Paris. Tours et immeubles tertiaires modernes (Incity, Oxygène, To-Lyon), prestations matinales 6h-9h, accueil propre obligatoire à 8h30, reporting régulier exigé par les facility managers.

**Confluence** est en croissance forte : nouveaux immeubles tertiaires (Ydeo, Sky 56), sièges sociaux, attractivité grande. Prix marché supérieur de 10-15 % à la moyenne lyonnaise.

### 2. Pôle santé lyonnais

Lyon concentre un des plus gros pôles santé français. **HCL, cliniques privées, cabinets médicaux du 6e, laboratoires de Gerland** : ces clients demandent des protocoles bionettoyage stricts, une traçabilité produit, des agents formés aux risques biologiques. Le ticket prix est plus élevé (+30-50 % vs bureaux standards), mais les exigences le sont aussi.

### 3. Industrie pharmaceutique et biotech

**Sanofi, BioMérieux et leur écosystème** opèrent à Gerland et autour. Salles blanches, protocoles ISO 14644, certifications agents, charte qualité stricte. Marché de niche mais à forte valeur ajoutée. Quelques sociétés lyonnaises s'y sont spécialisées et facturent 4-5 fois le tarif horaire standard.

### 4. Hôtellerie & restauration

Bouchons lyonnais, hôtels de la presqu'île, restaurants étoilés. **Cuisines, salles, sanitaires publics**. Plages très contraintes (avant ouverture 5h-7h ou après fermeture 22h-1h). Saisonnalité moins forte qu'à Marseille ou Nice mais réelle (mai-octobre + décembre).

## Prix marché du nettoyage à Lyon en 2026

Selon nos observations terrain sur 2025-2026 :

- **Bureaux tertiaires standards** : 12-16 €/m²/an HT (≈ 1 à 1,30 €/m²/mois)
- **Bureaux Part-Dieu / Confluence** : 14-18 €/m²/an HT (+10-15 % vs moyenne)
- **Copropriétés haussmanniennes** : 15-22 €/m²/an HT selon prestations (vitres, escaliers)
- **Cabinets médicaux** : 18-25 €/m²/an HT (protocole bionettoyage)
- **Laboratoires biotech** : 25-50 €/m²/an HT (salles blanches, ISO)
- **Hôtellerie** : tarification souvent à la chambre (8-15 €/chambre)

Les prix lyonnais sont **10-15 % en dessous de Paris** mais **5-10 % au-dessus de Marseille ou Bordeaux**. La concurrence est intense mais les marges restent saines pour les structurées.

## Les 3 défis spécifiques aux dirigeants lyonnais

### Multiplicité des protocoles

Bureau, cabinet médical, biotech, hôtellerie : un agent peut enchaîner plusieurs protocoles dans la même journée. Sans un système qui mémorise qui sait faire quoi, l'erreur arrive.

### Géographie étalée

Vos clients sont entre Vaise, Part-Dieu, Confluence et la Croix-Rousse. La proximité géographique est un avantage, mais **sans optimisation des tournées, vous perdez du temps de transit** — et donc des heures facturables.

### Turnover agents

Lyon n'échappe pas au turnover sectoriel (~35 % annuel). Le marché du travail est tendu, le recrutement coûte cher, et chaque départ vous fait perdre la mémoire de l'agent (spécialités, clients servis, formations).

## Comment se différencier à Lyon en 2026

**Trois leviers efficaces** d'après les sociétés qui gagnent des parts de marché :

1. **Spécialisation sur un protocole exigeant** : bionettoyage médical, salles blanches biotech, remise en état chantier. Marge supérieure, concurrence plus faible.
2. **Focus géographique** : maîtriser une zone (Croix-Rousse, Brotteaux, Confluence) plutôt que de courir toute la métropole. Réduit le transit, améliore la fidélisation.
3. **Différenciation par la preuve** : preuve de passage standardisée (QR + photos + signature) acceptée par les grands syndics lyonnais et exigée sur les appels d'offres publics.

## Quel logiciel utiliser pour piloter une société de nettoyage à Lyon ?

[Proprely](/villes/lyon) est un cockpit métier conçu pour les TPE/PME B2B (3-50 agents). Il centralise planning multi-sites mobile-first, clients, agents avec leurs spécialités (vitrerie, bionettoyage, biotech), preuve de passage standardisée, devis et factures, marge par client en temps réel.

Pour Lyon, deux fonctionnalités sont particulièrement utiles :
- [Planning agents](/fonctionnalites/planning-nettoyage) adapté au transit Vaise / Part-Dieu / Confluence
- [Preuve de passage](/fonctionnalites/preuve-passage-nettoyage) acceptée par les syndics gestionnaires lyonnais

Gratuit pendant la bêta privée (30 places fondateurs, tarif privilégié à vie ensuite). [Candidater à la bêta](/beta) ou voir la [page Lyon dédiée](/villes/lyon) pour le détail.`,
  },
  {
    slug: 'societe-nettoyage-marseille',
    title: 'Société de nettoyage à Marseille : marché PACA 2026',
    excerpt: "Marseille : marché porté par Euroméditerranée, l'hôtellerie saisonnière, les copropriétés et le port. Prix marché, secteurs, pilotage.",
    date: '20 mai 2026',
    readTime: '7 min',
    tag: 'Local',
    quickSummary: [
      "Marseille est le 3e marché propreté B2B français, porté par Euroméditerranée, l'hôtellerie et le port.",
      "Forte saisonnalité touristique (mai-octobre) qui double la demande hôtelière.",
      "Prix marché : 10-15 €/m²/an pour les bureaux, soit ~20 % en dessous de Paris.",
      "Copropriétés bord de mer : exigences spécifiques (sel, embruns, vitres extérieures).",
      "Multilinguisme agents fréquent (FR/AR) : un atout sur les marchés de niche.",
    ],
    faq: [
      { q: "Quel est le prix marché du nettoyage de bureaux à Marseille ?", a: "Le tarif marseillais se situe entre 10 et 15 €/m²/an HT sur contrat annuel, soit environ 0,85 à 1,25 €/m²/mois. C'est ~20 % en dessous de Paris. Pour Euroméditerranée (zone tertiaire moderne), comptez 12-16 €/m²/an. Pour le centre-ville historique, 11-14 €/m²/an." },
      { q: "Comment gérer la saisonnalité touristique à Marseille ?", a: "L'hôtellerie marseillaise double sa demande entre mai et octobre. Trois leviers : (1) constituer un vivier d'agents saisonniers fidélisés (mêmes agents chaque été), (2) anticiper le planning 8 semaines à l'avance, (3) utiliser un logiciel qui suit la charge horaire et alerte sur le surmenage des agents permanents en haute saison." },
      { q: "Quels sont les secteurs porteurs à Marseille ?", a: "Cinq secteurs portent le marché marseillais : (1) Euroméditerranée (zone tertiaire moderne en croissance), (2) hôtellerie saisonnière (Vieux-Port, Corniche), (3) copropriétés bord de mer (8e, 7e, La Joliette), (4) port et logistique (Marseille-Fos), (5) cabinets médicaux (AP-HM, Conception, Timone)." },
      { q: "Quelles contraintes spécifiques aux copropriétés du bord de mer marseillais ?", a: "Le sel et les embruns attaquent vitres, mobilier extérieur et serrureries. Les copropriétés du 7e, 8e arrondissement et de la Corniche demandent un nettoyage vitrerie plus fréquent (mensuel vs trimestriel ailleurs), des produits adaptés (anticorrosion), et des agents formés au travail extérieur." },
      { q: "Le port de Marseille-Fos est-il un débouché pour les sociétés de nettoyage ?", a: "Oui. Bureaux administratifs du Grand Port Maritime, sociétés de transit, entrepôts logistiques : marché significatif mais avec contraintes (sécurité, badges, horaires décalés). Le tarif est généralement 10-15 % au-dessus du marché bureaux classique en raison de la complexité d'accès." },
      { q: "Quel outil pour piloter sa société de nettoyage à Marseille ?", a: "Pour une TPE/PME B2B à Marseille (3-50 agents), un cockpit unifié comme Proprely centralise planning saisonnier, agents avec spécialités, preuve de passage, marge par client. Particulièrement utile pour anticiper la haute saison hôtelière et éviter le surmenage. Gratuit pendant la bêta privée." },
    ],
    relatedSlugs: ['tarif-nettoyage-bureaux-m2-2026', 'gestion-societe-nettoyage-outils', 'fideliser-agents-nettoyage-turnover'],
    content: `## Le marché du nettoyage B2B à Marseille en 2026

Marseille est le troisième marché français de la propreté B2B en volume. La métropole Aix-Marseille-Provence concentre **5 univers très différents** : Euroméditerranée (zone tertiaire moderne en expansion), centre historique et copropriétés (Vieux-Port, Cours Julien), bord de mer huppé (Corniche, Endoume), hôtellerie saisonnière (Vieux-Port, Castellane), et le port commerce/logistique (Marseille-Fos).

Chaque univers a ses contraintes. Une société de nettoyage marseillaise doit savoir jongler entre la rotation hôtelière 5h du matin en juillet, le bureau d'Euromed 6h-9h en semaine, et l'immeuble bord de mer dont les vitres sont attaquées par le sel.

## Les 5 secteurs porteurs à Marseille

### 1. Euroméditerranée — la zone tertiaire moderne

**Euroméditerranée** est le plus gros projet de rénovation urbaine du sud de la France. Tours tertiaires (CMA-CGM, La Marseillaise, Mirabeau), nouveaux sièges sociaux, attractivité forte. Marché en croissance avec des prix marché supérieurs de 10-15 % à la moyenne marseillaise. Exigences modernes : reporting digital, preuve de passage standardisée.

### 2. Hôtellerie saisonnière

Le **Vieux-Port, la Corniche, Castellane** concentrent l'hôtellerie marseillaise. **La demande double entre mai et octobre** avec le tourisme international. Cuisines, étages, parties communes, exigence de discrétion absolue. Plages contraintes (avant 7h pour les communs, en journée pour les étages).

### 3. Copropriétés bord de mer

**7e, 8e arrondissements, Corniche** : copropriétés haut de gamme avec halls, escaliers, vitres extérieures attaquées par le sel et les embruns. Syndics gestionnaires (Foncia Marseille, Square Habitat, Citya) demandent reporting régulier. Tarif souvent 15-20 % au-dessus de la moyenne bureaux.

### 4. Port et logistique Marseille-Fos

**Grand Port Maritime, sociétés de transit, entrepôts logistiques** sur Fos-sur-Mer et le bassin Est. Marché significatif mais avec contraintes spécifiques : sécurité renforcée, badges, horaires décalés, surface souvent importante. Tarif majoré de 10-15 %.

### 5. Pôle santé marseillais

**AP-HM, Conception, Timone, cabinets médicaux** du centre-ville. Protocoles bionettoyage, traçabilité, agents formés aux risques biologiques. Niche à forte valeur ajoutée mais exigences fortes.

## Prix marché du nettoyage à Marseille en 2026

D'après les observations terrain :

- **Bureaux centre-ville** : 11-14 €/m²/an HT (≈ 0,90-1,20 €/m²/mois)
- **Bureaux Euroméditerranée** : 12-16 €/m²/an HT (+10-15 %)
- **Copropriétés bord de mer** : 13-18 €/m²/an HT (vitrerie incluse)
- **Hôtellerie** : tarification souvent à la chambre (7-13 €/chambre selon catégorie)
- **Cabinets médicaux** : 17-24 €/m²/an HT (bionettoyage)
- **Entrepôts port/Fos** : 6-10 €/m²/an HT (volumes importants, prestation basique)

Globalement **Marseille est ~15-20 % en dessous de Paris** mais aligné avec Lyon hors Part-Dieu.

## Le défi marseillais n°1 : la saisonnalité hôtelière

L'hôtellerie marseillaise double sa demande entre mai et octobre. Pour une société de nettoyage qui sert plusieurs hôtels, cela signifie :
- Recruter et fidéliser un vivier d'agents saisonniers (mêmes agents chaque été)
- Anticiper le planning 8 semaines à l'avance pour caler les agents permanents
- Éviter le surmenage en haute saison (alertes automatiques nécessaires)

**Sans outil de pilotage**, vous découvrez les conflits de planning quelques jours avant. Vous payez des heures sup non prévues. Vos agents craquent en août.

## Le défi marseillais n°2 : les copropriétés bord de mer

Le **sel et les embruns** attaquent vitres, mobilier extérieur et serrureries. Les copropriétés du 7e, 8e et de la Corniche demandent :
- Nettoyage vitrerie plus fréquent (mensuel vs trimestriel ailleurs)
- Produits adaptés (anticorrosion, déminéralisés)
- Agents formés au travail extérieur (échelles, harnais selon hauteur)

Le tarif est plus élevé, mais les exigences le sont aussi.

## Comment piloter sa société de nettoyage à Marseille

Avec **plusieurs secteurs (tertiaire, hôtellerie, copropriétés, port), une saisonnalité forte et une géographie étalée Aix-Marseille-Fos**, un cockpit unifié devient stratégique.

[Proprely](/villes/marseille) centralise :
- [Planning multi-sites](/fonctionnalites/planning-nettoyage) avec gestion de la saisonnalité hôtelière
- [Gestion agents](/fonctionnalites/gestion-agents-nettoyage) avec spécialités (vitrerie, bionettoyage, port)
- [Preuve de passage](/fonctionnalites/preuve-passage-nettoyage) acceptée syndics et facility managers
- Marge par client en temps réel : indispensable pour identifier les contrats hôteliers vraiment rentables

Gratuit pendant la bêta privée. [Candidater](/beta) ou voir la [page Marseille](/villes/marseille).`,
  },
  {
    slug: 'societe-nettoyage-toulouse',
    title: 'Société de nettoyage à Toulouse : aérospatial 2026',
    excerpt: "Toulouse : marché B2B porté par l'aérospatial (Airbus, ATR, Thales), le médical (CHU, oncopole) et la démographie. Prix et secteurs porteurs.",
    date: '20 mai 2026',
    readTime: '7 min',
    tag: 'Local',
    quickSummary: [
      "Toulouse est portée par 3 piliers : aérospatial (Airbus & sous-traitants), médical (CHU, Oncopole), tertiaire en croissance.",
      "L'aérospatial demande des protocoles stricts (ESD, salles propres, traçabilité) — tarif majoré 30-50 %.",
      "Prix marché bureaux : 11-15 €/m²/an HT (~15 % en dessous de Paris).",
      "Croissance démographique +10 000 hab/an : marché tertiaire et résidentiel en expansion durable.",
      "Géographie : axe Compans-Caffarelli, Blagnac, Labège, Cancéropôle, sud toulousain.",
    ],
    faq: [
      { q: "Quels sont les secteurs porteurs à Toulouse pour une société de nettoyage ?", a: "Trois piliers : (1) aérospatial — Airbus et sa supply chain (Latécoère, Liebherr, Sogeclair) avec exigences protocole ESD et salles propres, (2) médical — CHU Purpan/Rangueil, Oncopole, cliniques privées, cabinets médicaux du centre, (3) tertiaire — Compans-Caffarelli, Cité de l'Espace, Labège Innopole, plus de nouveaux immeubles avec la croissance démographique." },
      { q: "Quel est le prix marché du nettoyage de bureaux à Toulouse ?", a: "Le tarif toulousain se situe entre 11 et 15 €/m²/an HT sur contrat annuel, soit ~0,90 à 1,25 €/m²/mois. Pour les immeubles modernes de Compans-Caffarelli ou Labège, 12-16 €/m²/an. Pour les sites aérospatiaux (avec protocoles ESD), prix majoré de 30-50 %." },
      { q: "Comment décrocher des contrats avec Airbus et l'aérospatial à Toulouse ?", a: "Trois prérequis : (1) certification qualité (ISO 9001 minimum, idéalement EN 9100), (2) agents formés aux protocoles ESD (décharge électrostatique) et salles propres, (3) capacité à fournir traçabilité produit et reporting digital. L'entrée se fait souvent par des contrats avec des sous-traitants Airbus avant d'accéder au donneur d'ordre direct." },
      { q: "Le Cancéropôle / Oncopole est-il un débouché pour une société de nettoyage ?", a: "Oui, marché de niche à forte valeur ajoutée. Oncopole, IUCT, laboratoires de recherche cancer : protocoles bionettoyage stricts, salles propres, traçabilité produits, agents formés aux risques biologiques. Tarif 2-3 fois supérieur au bureau standard, mais exigences en proportion." },
      { q: "Comment gérer la croissance démographique de Toulouse côté business ?", a: "Toulouse gagne ~10 000 habitants par an, ce qui tire le tertiaire et le résidentiel. Pour une société de nettoyage : anticiper la croissance en structurant l'organisation (logiciel de pilotage, recrutement continu), miser sur les zones en développement (Cartoucherie, Andromède à Blagnac, Eurocentre nord), nouer des partenariats avec promoteurs et syndics." },
      { q: "Quel logiciel pour piloter sa société de nettoyage à Toulouse ?", a: "Pour une TPE/PME B2B toulousaine (3-50 agents) sur axe Compans/Blagnac/Labège, un cockpit unifié comme Proprely centralise planning multi-sites avec optimisation des tournées (transit Toulouse-Blagnac-Labège peut atteindre 30 km/jour), gestion agents avec spécialités aéronautique/médical, preuve de passage standardisée. Gratuit pendant la bêta privée." },
    ],
    relatedSlugs: ['digitaliser-entreprise-nettoyage-5-etapes', 'convention-collective-nettoyage-idcc-3043', 'logiciel-societe-nettoyage-criteres'],
    content: `## Le marché du nettoyage B2B à Toulouse en 2026

Toulouse est portée par **trois piliers structurels** : l'aérospatial (Airbus, ATR, Thales Alenia Space, plus une dense supply chain), le médical (CHU Purpan/Rangueil, Oncopole, cliniques privées), et un tertiaire en croissance soutenue par la dynamique démographique (+10 000 habitants/an).

Pour une société de nettoyage B2B, c'est un marché **stable, en croissance, avec des niches à forte valeur ajoutée** (aéronautique, médical) qui justifient un tarif majoré pour les structures spécialisées.

## Les 3 piliers du marché toulousain

### 1. L'aérospatial : la spécificité toulousaine

**Airbus et sa supply chain** (Latécoère, Liebherr, Sogeclair, Daher, et des centaines de sous-traitants) sont le poumon économique de Toulouse. Pour une société de nettoyage, ce secteur représente un débouché majeur, **à condition de répondre aux exigences** :

- Protocoles ESD (décharge électrostatique) pour les zones de production électronique
- Salles propres ISO 7-8 pour certains ateliers d'assemblage
- Traçabilité produits chimiques et certifications
- Reporting digital exigé par les facility managers
- Souvent ISO 9001 minimum, idéalement EN 9100

Le tarif est majoré de 30 à 50 % vs un bureau standard, mais la barrière d'entrée filtre la concurrence.

### 2. Le pôle médical

**CHU Purpan, Rangueil, Oncopole (Cancéropôle), IUCT, cliniques privées (Saint-Jean Languedoc, Pasteur), cabinets médicaux du centre** : Toulouse concentre un pôle santé majeur, classé parmi les 5 premiers de France.

Exigences : bionettoyage, traçabilité, agents formés aux risques biologiques. Marché à forte valeur ajoutée, peu de concurrents capables de répondre aux protocoles.

### 3. Le tertiaire en croissance

**Compans-Caffarelli** (centre tertiaire historique), **Labège Innopole** (zone d'activité au sud), **Cancéropôle** (au-delà du médical, tertiaire qui s'agrège), **Blagnac et Andromède** (autour de l'aéroport) : le tissu tertiaire toulousain se densifie.

La croissance démographique de Toulouse (+10 000 hab/an) tire la demande en bureaux, en logements, et donc en prestations de nettoyage récurrentes.

## Prix marché à Toulouse en 2026

- **Bureaux centre-ville** : 11-14 €/m²/an HT (≈ 0,90-1,15 €/m²/mois)
- **Bureaux Compans / Labège / Andromède** : 12-16 €/m²/an HT (+10 %)
- **Sites aérospatiaux avec ESD** : 18-30 €/m²/an HT (+50-100 % bureau standard)
- **Cabinets médicaux** : 18-25 €/m²/an HT (bionettoyage)
- **Salles propres / Oncopole / labos** : 30-60 €/m²/an HT (ISO 7-8)
- **Copropriétés centre historique** : 12-18 €/m²/an HT

Toulouse est globalement **~15 % en dessous de Paris** sur le bureau standard, mais **équivalent ou au-dessus** sur les niches aéronautiques et médicales.

## Le défi toulousain n°1 : l'étalement géographique

Vos clients peuvent être entre Compans (centre), Blagnac (nord-ouest, aéroport), Labège (sud-est) et Cancéropôle (sud). **Le transit peut atteindre 30-40 km/jour** pour un agent multi-sites.

Sans optimisation des tournées, vous perdez 1 à 2 heures par jour par agent. Un logiciel de planning qui suggère les agents les plus proches du prochain site selon leur dernière intervention devient stratégique.

## Le défi toulousain n°2 : la course à la qualification

Pour l'aérospatial et le médical, **la barrière n'est pas commerciale, elle est qualitative**. Vous avez besoin :
- D'agents formés (ESD, salles propres, bionettoyage)
- D'un système de traçabilité (qui a fait quoi, quand, avec quels produits)
- D'un reporting digital exigé par les facility managers

Sans cela, vous restez sur le marché bureau standard où la concurrence prix est intense.

## Comment se positionner à Toulouse en 2026

**Trois stratégies efficaces** :

1. **Spécialisation aéronautique** : se positionner comme expert ESD/salles propres pour Airbus et sa supply chain. Marché à entrée élevée mais à marge confortable.
2. **Spécialisation médical** : Oncopole, CHU, cliniques privées. Forte valeur ajoutée, peu de concurrence sérieuse.
3. **Maillage zone porteuse** : Andromède, Cartoucherie, Eurocentre nord. Zones en développement avec promoteurs et syndics qui cherchent des prestataires.

## Quel logiciel pour piloter sa société de nettoyage à Toulouse

Pour une **TPE/PME B2B toulousaine (3-50 agents)** avec sites entre Compans, Blagnac, Labège et Cancéropôle, un cockpit unifié devient stratégique.

[Proprely](/villes/toulouse) centralise :
- [Planning multi-sites](/fonctionnalites/planning-nettoyage) avec optimisation des tournées (réduction transit)
- [Gestion agents](/fonctionnalites/gestion-agents-nettoyage) avec spécialités (aéronautique, médical, ESD)
- [Preuve de passage](/fonctionnalites/preuve-passage-nettoyage) avec reporting digital exigé par les facility managers Airbus
- Marge par client en temps réel : essentiel pour distinguer les contrats aéronautiques vraiment rentables

Gratuit pendant la bêta privée. [Candidater](/beta) ou voir la [page Toulouse](/villes/toulouse).`,
  },
  {
    slug: 'societe-nettoyage-lille',
    title: "Société de nettoyage à Lille : marché 2026",
    excerpt: "Lille : marché B2B porté par Euralille, les sièges régionaux (Auchan, Decathlon, OVHcloud), le CHRU et l'étalement Lille-Roubaix-Tourcoing.",
    date: '20 mai 2026',
    readTime: '7 min',
    tag: 'Local',
    quickSummary: [
      "Lille concentre les sièges régionaux des Hauts-de-France : Auchan, Decathlon, OVHcloud, Castorama, Boulanger.",
      "Métropole étalée Lille-Roubaix-Tourcoing-Villeneuve d'Ascq : transit potentiel 30-50 km/jour.",
      "Prix marché bureaux : 11-14 €/m²/an HT (~20 % en dessous de Paris).",
      "Proximité Belgique : opportunités cross-border mais réglementation différente.",
      "CHRU et pôle universitaire majeurs : marché médical et étudiant porteur.",
    ],
    faq: [
      { q: "Quel est le prix marché du nettoyage de bureaux à Lille en 2026 ?", a: "Le tarif lillois se situe entre 11 et 14 €/m²/an HT sur contrat annuel, soit ~0,90 à 1,15 €/m²/mois. Pour Euralille (zone tertiaire moderne), 12-16 €/m²/an. Pour la périphérie (Villeneuve d'Ascq, Roubaix), 10-13 €/m²/an. Globalement ~20 % en dessous de Paris." },
      { q: "Comment gérer l'étalement géographique Lille-Roubaix-Tourcoing-Villeneuve ?", a: "Trois leviers : (1) optimiser les tournées avec un logiciel qui suggère l'agent le plus proche du prochain site, (2) constituer des équipes par sous-zone (équipe Lille centre, équipe Roubaix-Tourcoing, équipe Villeneuve), (3) prévoir un budget transit dans la grille de prix (~5-10 % du coût horaire chargé)." },
      { q: "Quels sont les sièges régionaux clients potentiels à Lille ?", a: "Lille est le siège des Hauts-de-France pour de nombreux groupes : Auchan, Decathlon, Boulanger, Castorama (groupe Mulliez), Bonduelle, OVHcloud à proximité (Roubaix), Vente-Privée. Tous ont des sièges et des entrepôts qui demandent des prestations de nettoyage récurrentes." },
      { q: "Peut-on travailler en Belgique depuis une société de nettoyage lilloise ?", a: "Possible mais avec contraintes : enregistrement TVA belge si CA significatif en Belgique, conformité au droit social belge pour les agents qui interviennent côté belge (commission paritaire 121 nettoyage), gestion des frontaliers. Souvent il est plus simple de créer une entité belge dédiée si le volume cross-border devient important." },
      { q: "Le CHRU et le pôle médical lillois sont-ils porteurs ?", a: "Oui. CHRU de Lille (un des plus gros CHU français), Clinique Saint-Vincent, Polyclinique du Bois, cabinets médicaux du Vieux-Lille : marché bionettoyage à forte valeur ajoutée. Exigences strictes (protocoles, traçabilité, formation agents) mais marges supérieures de 30-50 % au bureau standard." },
      { q: "Quel logiciel pour piloter sa société de nettoyage à Lille ?", a: "Pour une TPE/PME B2B lilloise (3-50 agents) avec sites étalés sur la métropole, un cockpit comme Proprely centralise planning multi-sites avec optimisation des tournées (transit Lille-Roubaix-Tourcoing-Villeneuve), gestion agents avec spécialités, preuve de passage standardisée acceptée par les sièges régionaux. Gratuit pendant la bêta privée." },
    ],
    relatedSlugs: ['gestion-societe-nettoyage-outils', 'digitaliser-entreprise-nettoyage-5-etapes', 'fideliser-agents-nettoyage-turnover'],
    content: `## Le marché du nettoyage B2B à Lille en 2026

Lille est la **quatrième grande métropole tertiaire française** après Paris, Lyon et Marseille. La spécificité lilloise tient à **trois caractéristiques** :

1. **Une concentration unique de sièges régionaux** issus du tissu familial industriel des Hauts-de-France (groupe Mulliez : Auchan, Decathlon, Boulanger, Castorama ; mais aussi Bonduelle, OVHcloud, Vente-Privée).
2. **Un étalement géographique fort** sur la métropole Lille-Roubaix-Tourcoing-Villeneuve d'Ascq (1,2 million d'habitants sur 95 communes).
3. **Une proximité frontalière** avec la Belgique qui ouvre des opportunités cross-border.

Pour une société de nettoyage B2B, c'est un marché **mature, exigeant, avec des opportunités de niche** (sièges régionaux, médical, e-commerce / logistique avec Roubaix).

## Les 4 secteurs porteurs à Lille

### 1. Euralille et les sièges régionaux

**Euralille** est le principal quartier d'affaires lillois (Tour Lille Europe, Tour Bercail, Centre Commercial). Bureaux tertiaires modernes, prestations matinales 6h-9h, exigence d'accueil propre à 8h30.

Au-delà d'Euralille, les **sièges régionaux du Mulliez** (Croix, Villeneuve d'Ascq) et d'**OVHcloud** (Roubaix) représentent des comptes majeurs. Volumes importants, exigences modernes (preuve de passage digitale, reporting), tarif marché +5-10 % vs bureau standard.

### 2. Le pôle médical / CHRU

**CHRU de Lille** (un des plus gros CHU de France), Clinique Saint-Vincent, Polyclinique du Bois, cabinets médicaux du Vieux-Lille et du quartier Vauban : pôle santé majeur. Protocoles bionettoyage, traçabilité, agents formés. Tarif majoré 30-50 % vs bureau standard.

### 3. L'enseignement supérieur

**Université de Lille (3 sites + campus), HEC, EDHEC, Centrale Lille, IÉSEG, Université Catholique** : Lille est la 3e ville étudiante française (~115 000 étudiants). Marché des résidences étudiantes, locaux d'écoles, espaces de coworking. Saisonnalité forte (creux juillet-août, intensité septembre-juin).

### 4. La logistique et l'e-commerce

**Roubaix-Tourcoing** concentre une logistique e-commerce (OVHcloud, Showroomprivé historique, plateformes Auchan). Entrepôts, bureaux administratifs, exigences spécifiques (sécurité, badges, horaires décalés).

## Prix marché à Lille en 2026

- **Bureaux Euralille** : 12-16 €/m²/an HT (≈ 1,00-1,30 €/m²/mois)
- **Bureaux centre-ville hors Euralille** : 11-14 €/m²/an HT
- **Bureaux périphérie (Villeneuve d'Ascq, Roubaix)** : 10-13 €/m²/an HT (-15 %)
- **Sièges régionaux Mulliez / OVHcloud** : grille négociée, souvent 13-17 €/m²/an
- **CHRU / cliniques** : 18-25 €/m²/an HT (bionettoyage)
- **Copropriétés Vieux-Lille** : 13-19 €/m²/an HT (patrimonial)
- **Entrepôts logistiques Roubaix-Tourcoing** : 6-9 €/m²/an HT (volumes)

Lille est globalement **~20 % en dessous de Paris** mais en ligne avec Lyon ou Marseille hors zones premium.

## Le défi lillois n°1 : la métropole étalée

Vos clients peuvent être entre Lille centre, Roubaix, Tourcoing, Villeneuve d'Ascq, et la frontière belge. **30 à 50 km de transit potentiel par jour** pour un agent multi-sites.

Trois leviers pour limiter le coût du transit :
- Optimiser les tournées avec un logiciel qui suggère l'agent le plus proche
- Constituer des équipes par sous-zone (équipe Lille centre, équipe Roubaix-Tourcoing)
- Intégrer ~5-10 % de coût transit dans la grille de prix

## Le défi lillois n°2 : la proximité belge

La frontière belge est à 15-30 minutes de Lille. **Tentation forte** de prendre des contrats côté belge, mais attention :
- TVA belge à enregistrer si CA significatif en Belgique
- Conformité au droit social belge pour les agents intervenant côté belge (commission paritaire 121 nettoyage en Belgique)
- Gestion administrative des frontaliers complexe

Souvent il est plus simple de créer une entité belge dédiée si le volume cross-border devient stratégique.

## Comment se positionner à Lille en 2026

**Trois stratégies efficaces** :

1. **Spécialisation sièges régionaux** : se positionner comme prestataire structuré (reporting, preuve de passage digitale) capable de servir les sièges Mulliez et OVHcloud. Volumes garantis, tarif négocié mais correct.
2. **Spécialisation médical** : CHRU, cliniques, cabinets. Forte valeur ajoutée, barrière à l'entrée (protocoles, formation).
3. **Maillage zone étudiante** : résidences, écoles, coworkings. Volume important, saisonnalité gérable avec un bon planning.

## Quel logiciel pour piloter sa société de nettoyage à Lille

Pour une **TPE/PME B2B lilloise (3-50 agents)** avec sites étalés Lille-Roubaix-Tourcoing-Villeneuve, un cockpit unifié est stratégique.

[Proprely](/villes/lille) centralise :
- [Planning multi-sites](/fonctionnalites/planning-nettoyage) avec optimisation transit
- [Gestion agents](/fonctionnalites/gestion-agents-nettoyage) avec spécialités (médical, logistique)
- [Preuve de passage](/fonctionnalites/preuve-passage-nettoyage) acceptée par les sièges régionaux et le CHRU
- Marge par client en temps réel pour identifier les contrats vraiment rentables

Gratuit pendant la bêta privée. [Candidater](/beta) ou voir la [page Lille](/villes/lille).`,
  },
  {
    slug: 'societe-nettoyage-nantes',
    title: "Société de nettoyage à Nantes : marché 2026",
    excerpt: "Nantes : portée par l'Île de Nantes (tertiaire), le CHU, l'agroalimentaire et la démographie. Marché B2B, prix indicatifs, pilotage.",
    date: '20 mai 2026',
    readTime: '7 min',
    tag: 'Local',
    quickSummary: [
      "Nantes est une métropole en croissance démographique forte (+5 000 hab/an).",
      "4 piliers : tertiaire Île de Nantes / Euronantes, CHU & médical, agroalimentaire, étudiants.",
      "Prix marché bureaux : 11-15 €/m²/an HT (~15 % en dessous de Paris).",
      "Tertiaire en développement : nouveaux immeubles Île de Nantes, Euronantes, Chantenay.",
      "Marché stable, marges saines, concurrence raisonnable vs Lyon ou Paris.",
    ],
    faq: [
      { q: "Quel est le prix marché du nettoyage de bureaux à Nantes ?", a: "Le tarif nantais se situe entre 11 et 15 €/m²/an HT sur contrat annuel, soit ~0,90 à 1,25 €/m²/mois. Pour Euronantes ou l'Île de Nantes (zones modernes), 12-16 €/m²/an. Pour le centre historique et Chantenay, 11-14 €/m²/an. Globalement ~15 % en dessous de Paris." },
      { q: "Quels sont les secteurs porteurs à Nantes pour une société de nettoyage ?", a: "Quatre piliers : (1) tertiaire Île de Nantes / Euronantes / Cité des Congrès (immeubles modernes, sièges régionaux), (2) médical — CHU Hôtel-Dieu, ICO Cancérologie, cliniques privées, cabinets, (3) agroalimentaire (siège LDC, IAA, sous-traitants), (4) enseignement supérieur (Université de Nantes, Audencia, Centrale, Oniris)." },
      { q: "L'Île de Nantes est-elle un débouché majeur pour le nettoyage B2B ?", a: "Oui. C'est le plus gros projet de rénovation urbaine de France après Euroméditerranée. Tertiaire moderne (Euronantes), équipements publics (CHU 2026), école d'architecture, MIN. Marché en croissance forte avec immeubles neufs qui demandent un nettoyage premier mois après livraison puis récurrent." },
      { q: "Comment se démarquer face à la concurrence à Nantes ?", a: "Trois leviers : (1) spécialisation médical / bionettoyage (CHU et ICO ouvrent des appels d'offres réguliers), (2) maîtrise de l'Île de Nantes en pleine croissance — relations avec les promoteurs et facility managers, (3) preuve de passage standardisée pour les syndics nationaux présents à Nantes (Foncia, Citya, Sergic)." },
      { q: "Quelle saisonnalité touristique à Nantes ?", a: "Saisonnalité modérée vs Marseille ou Nice. Pic mai-septembre avec le Voyage à Nantes, les Machines de l'Île, les croisières fluviales. L'hôtellerie nantaise (centre-ville, gare) voit sa demande augmenter ~30 % en haute saison, vs +100 % à Marseille. Anticipation à 4 semaines suffit généralement." },
      { q: "Quel logiciel pour piloter sa société de nettoyage à Nantes ?", a: "Pour une TPE/PME B2B nantaise (3-50 agents), Proprely centralise planning multi-sites, agents avec spécialités, preuve de passage standardisée acceptée par les facility managers Euronantes et les syndics. Particulièrement adapté pour gérer la croissance de l'Île de Nantes et anticiper la haute saison. Gratuit pendant la bêta privée." },
    ],
    relatedSlugs: ['trouver-clients-b2b-nettoyage', 'logiciel-societe-nettoyage-criteres', 'tarif-nettoyage-bureaux-m2-2026'],
    content: `## Le marché du nettoyage B2B à Nantes en 2026

Nantes est l'une des **métropoles françaises en plus forte croissance démographique** (~+5 000 habitants/an sur la métropole). Cette dynamique tire le marché du nettoyage B2B : nouveaux bureaux, nouveaux équipements publics, nouvelles copropriétés.

Le tissu économique nantais est **équilibré et résilient** : tertiaire moderne (Île de Nantes, Euronantes), pôle médical majeur (CHU, ICO), agroalimentaire (siège LDC, IAA), enseignement supérieur (Audencia, Centrale Nantes). C'est un marché **mature mais en expansion**, avec une concurrence raisonnable vs Lyon ou Paris.

## Les 4 piliers du marché nantais

### 1. Tertiaire — Île de Nantes / Euronantes

**L'Île de Nantes** est le plus gros projet de rénovation urbaine de France hors Marseille. **Euronantes** (gare nord et sud, Cité des Congrès) concentre le tertiaire moderne : nouveaux immeubles de bureaux, sièges régionaux, opérateurs publics. Croissance soutenue, exigences modernes (preuve de passage digitale, reporting).

Le futur **nouveau CHU de Nantes** (livraison 2026-2027) ajoute un équipement majeur sur l'Île, qui tirera l'écosystème médical et administratif autour.

### 2. Pôle médical

**CHU Hôtel-Dieu / Laennec**, **ICO Cancérologie** (René-Gauducheau), Polyclinique de l'Atlantique, Confluent, cabinets médicaux du centre et de Saint-Herblain. Marché bionettoyage à forte valeur ajoutée, exigences strictes mais marges supérieures de 30-50 %.

### 3. Agroalimentaire

**LDC** (siège à Sablé-sur-Sarthe mais activités fortes en Loire-Atlantique), **industries agroalimentaires** de la métropole nantaise et de la périphérie : sites industriels avec exigences hygiène strictes, contrats récurrents importants. Marché de niche mais à forte valeur.

### 4. Enseignement supérieur

**Université de Nantes (45 000 étudiants), Audencia, Centrale Nantes, Oniris** : ~60 000 étudiants au total. Marché des locaux d'écoles, résidences universitaires, espaces de coworking. Saisonnalité forte (creux juillet-août).

## Prix marché à Nantes en 2026

- **Bureaux Euronantes / Île de Nantes** : 12-16 €/m²/an HT (≈ 1,00-1,30 €/m²/mois)
- **Bureaux centre-ville historique** : 11-14 €/m²/an HT
- **Bureaux périphérie (Saint-Herblain, Carquefou)** : 10-13 €/m²/an HT
- **CHU / cliniques** : 18-25 €/m²/an HT (bionettoyage)
- **Sites agroalimentaires** : grille négociée, souvent forfait mensuel
- **Copropriétés centre / Île Feydeau** : 12-18 €/m²/an HT
- **Hôtellerie** : 6-12 €/chambre

Nantes est globalement **~15 % en dessous de Paris** et en ligne avec Bordeaux ou Lille.

## Le défi nantais n°1 : la croissance de l'Île de Nantes

L'Île de Nantes livre **plusieurs dizaines de milliers de m² de bureaux par an**. Les sociétés qui maîtrisent ce marché captent une croissance organique forte.

**Trois leviers** :
- Relations avec les promoteurs (ICADE, Eiffage, Nexity) pour intervenir dès la livraison
- Relations avec les facility managers (Cushman & Wakefield, JLL, Foncia AM)
- Capacité à mobiliser rapidement (un immeuble livré = besoin immédiat de prestation)

## Le défi nantais n°2 : la guerre des talents

Nantes attire les jeunes actifs et les agents. Mais le marché du travail est tendu, **les agents de nettoyage sont sollicités par tous les secteurs (logistique, distribution, restauration)**. La fidélisation devient stratégique.

Leviers :
- Planning prévisible publié 2 semaines à l'avance
- Prime de présence trimestrielle
- Parcours de spécialisation (vitrerie, bionettoyage)
- Compteur d'heures juste et transparent

## Comment se positionner à Nantes en 2026

**Trois stratégies** :

1. **Spécialisation Île de Nantes / Euronantes** : se positionner comme prestataire structuré (reporting, preuve de passage digitale). Marché en croissance forte.
2. **Spécialisation médical** : CHU, ICO, cliniques. Forte valeur ajoutée, peu de concurrence sérieuse.
3. **Maillage centre + périphérie** : Saint-Herblain, Carquefou, Rezé. Volume important, concurrence raisonnable.

## Quel logiciel pour piloter sa société de nettoyage à Nantes

Pour une **TPE/PME B2B nantaise (3-50 agents)**, un cockpit unifié devient stratégique dès 5-8 agents.

[Proprely](/villes/nantes) centralise :
- [Planning multi-sites](/fonctionnalites/planning-nettoyage) avec gestion des zones (centre, Île, périphérie)
- [Gestion agents](/fonctionnalites/gestion-agents-nettoyage) avec spécialités (médical, agroalimentaire)
- [Devis nettoyage](/fonctionnalites/devis-nettoyage) en 2 min pour répondre aux nouvelles opportunités Île de Nantes
- Marge par client en temps réel

Gratuit pendant la bêta privée. [Candidater](/beta) ou voir la [page Nantes](/villes/nantes).`,
  },
  {
    slug: 'devis-nettoyage-intelligent-ia',
    title: "Devis nettoyage par IA : 9 facteurs pour scaler en 2026",
    excerpt: "Premier module de devis IA pour société de nettoyage : 9 facteurs croisés, 3 scénarios (marge, gagner, upsell). Pour scaler votre société.",
    date: '5 juin 2026',
    readTime: '10 min',
    tag: 'Outils',
    quickSummary: [
      "Premier module de devis intelligent par IA pour société de nettoyage en France, intégré à Proprely.",
      "9 facteurs croisés automatiquement : prix marché local, disponibilités calendrier, avis et crédibilité, profil client, consommables, location machines, masse salariale, frais de structure, budget marketing.",
      "3 scénarios générés à chaque devis : marge protégée, gagner le contrat, upsell maximisé.",
      "L'IA détecte automatiquement les opportunités d'upsell (autres bureaux, autres prestations, contrats croisés).",
      "Bénéfice clé : devis qui rendent votre société viable et scalable, pas juste rentable. Moins de temps en décision, plus de temps en prospection.",
      "Disponible dans la bêta privée Proprely (gratuit pour les 30 sociétés fondatrices).",
    ],
    faq: [
      { q: "Quel logiciel de devis intelligent par IA pour société de nettoyage existe en 2026 ?", a: "Proprely propose le premier module de devis intelligent par IA pour société de nettoyage en France. Contrairement aux logiciels de devis classiques (Henrri, Bizyness, Maglia) qui se contentent de remplir un template à partir de votre catalogue, l'IA de Proprely croise 9 facteurs en temps réel pour calculer le devis optimal : prix marché local, disponibilités dans votre calendrier, avis clients (crédibilité prestataire), profil estimé du client, coûts directs (consommables, machines, sous-traitants/salariés), frais de structure et budget marketing. Le résultat : un devis qui rend votre société viable et scalable, pas seulement rentable." },
      { q: "Comment l'IA peut-elle calculer un devis nettoyage à votre place ?", a: "L'IA ne remplace pas votre décision finale : elle propose le devis le plus probablement optimal à partir des données réelles de votre activité et du marché. Concrètement : elle interroge la grille de prix marché local (Paris/IDF, métropoles, villes moyennes, rural), vérifie vos disponibilités calendrier (un agenda plein justifie un premium), pondère par votre profil prestataire (nombre d'avis, ancienneté, spécialités), estime le profil du client cible (type de site, taille, capacité de paiement), et soustrait votre coût total réel (consommables, machines, masse salariale, frais fixes, marketing). Vous voyez 3 scénarios, vous choisissez, vous ajustez si besoin, vous envoyez en 2 minutes." },
      { q: "Quels facteurs un devis intelligent prend-il en compte ?", a: "Le module de devis IA Proprely croise 9 facteurs : (1) prix marché local par typologie (bureaux, médical, hôtellerie, industriel), (2) disponibilités dans votre calendrier (rareté = premium), (3) nombre d'avis clients et ancienneté (crédibilité prestataire), (4) profil estimé du client cible (type, taille, secteur), (5) prix des consommables (produits, équipements), (6) coût de location ou amortissement des machines (autolaveuses, monobrosses, aspirateurs industriels), (7) masse salariale et coût horaire chargé (CDI/CDD, sous-traitants, intérimaires), (8) quote-part frais de structure (locaux, comptable, logiciels, véhicules, encadrement), (9) budget acquisition (ads, marketing, commercial). C'est la première fois que ces 9 dimensions sont croisées par un algorithme dans un logiciel métier nettoyage français." },
      { q: "Quelle différence entre un devis IA et un logiciel de devis classique ?", a: "Un logiciel de devis classique (Henrri, Bizyness, le module devis d'un ERP métier comme PROPRET ou Progiclean) fait du remplissage de template : vous saisissez la surface, vous choisissez les prestations dans votre catalogue, le système calcule prix = surface × tarif × fréquence. C'est rapide mais ça ne tient pas compte du marché, ni de vos disponibilités, ni de votre coût réel global. Un devis IA fait du calcul d'optimisation multi-variables : il croise vos coûts directs ET vos coûts indirects (structure, marketing, ROI commercial) avec le marché et les signaux du client, pour proposer le prix qui maximise votre probabilité de gagner le contrat à la marge cible que vous avez définie." },
      { q: "Quels sont les 3 scénarios générés par le devis IA Proprely ?", a: "Trois scénarios par devis : (1) Marge protégée : le prix qui sécurise votre marge nette cible (typiquement 15-20 %) sans concession sur la rentabilité. À utiliser quand vous êtes en pleine charge et que vous pouvez vous permettre de perdre le contrat. (2) Gagner le contrat : un prix plus agressif qui maximise la probabilité statistique de signature, en intégrant les opportunités secondaires détectées (autres bureaux du même client, prestations annexes potentielles, références futures). À utiliser quand vous avez de la capacité et que ce client est stratégique. (3) Upsell maximisé : le devis principal au prix marché + 2 à 5 propositions d'upsell détaillées (vitrerie hauteur trimestrielle, remise en état semestrielle, bionettoyage si médical, contrat consommables). À utiliser quand vous voulez ancrer une relation premium dès le départ." },
      { q: "Le devis IA fonctionne-t-il pour tous les types de prestations ?", a: "Oui pour les prestations récurrentes courantes : bureaux tertiaires, copropriétés, hôtellerie, retail, cabinets médicaux (avec bionettoyage), industriel léger, logistique. Pour les prestations très spécialisées (salles propres ISO classe 7-8, décontamination amiante, nettoyage post-sinistre, événementiel premium), l'IA fournit une estimation de base mais l'expertise humaine reste indispensable pour finaliser. Le module détecte automatiquement ces cas et propose une revue manuelle." },
      { q: "L'IA peut-elle remplacer complètement ma propre estimation ?", a: "Non, et ce n'est pas l'objectif. L'IA propose le devis le plus probablement optimal à partir des données, mais vous gardez la décision finale et pouvez ajuster chaque ligne. L'objectif est de vous faire passer de 20-30 minutes par devis (Word + Excel + estimations mentales) à 2-3 minutes de validation/ajustement, tout en sécurisant votre marge. Vous restez le pilote ; l'IA est le copilote qui vous évite de partir à 100 €/h alors que le marché est à 65 €/h, ou inversement de facturer 45 €/h sur un site médical qui justifierait 80 €/h." },
      { q: "Comment le devis IA détecte-t-il les opportunités d'upsell ?", a: "L'IA analyse trois signaux : (1) le profil client (un client multi-sites a probablement d'autres bureaux à confier, un cabinet médical seul a souvent des locaux annexes), (2) l'historique sectoriel (un syndic qui achète du quotidien sous-traite souvent vitrerie et remise en état semestrielle ailleurs), (3) les prestations annexes pertinentes pour le type de site (vitrerie hauteur sur tertiaire >3 étages, bionettoyage sur médical, traitement sols sur retail). Chaque upsell est proposé avec sa probabilité d'acceptation estimée et son impact sur la marge totale du compte." },
    ],
    relatedSlugs: ['ia-nettoyage-b2b-transformations-2026', 'fixer-prix-nettoyage', 'comparatif-logiciels-nettoyage-2026', 'tarif-nettoyage-bureaux-m2-2026'],
    content: `## Pourquoi 60 % des devis nettoyage sont mal calibrés en 2026

Les retours terrain de la branche propreté française indiquent que 60 % environ des sociétés de nettoyage B2B facturent leurs contrats à un prix sous-optimal — souvent trop bas, parfois trop haut pour le segment ciblé. Le problème ne vient pas du manque de méthode : il vient de la **charge cognitive** que représente un calcul de devis honnête.

Pour bien chiffrer un contrat, il faut croiser au minimum 9 dimensions : prix marché local, disponibilités calendrier, votre crédibilité prestataire, profil du client, consommables, location ou amortissement machines, masse salariale chargée, frais de structure, budget marketing. Aucun cerveau humain ne peut croiser ces 9 dimensions en moins de 30 minutes sur Excel, à chaque devis. Résultat : on prend des raccourcis, on copie le devis précédent, on tente une fourchette intuitive — et la marge réelle finit aléatoire.

C'est précisément ce que **Proprely vient résoudre avec le premier module de devis intelligent par IA dédié aux sociétés de nettoyage**, disponible dans la bêta privée.

## Ce que fait un devis intelligent par IA, en pratique

Le module croise automatiquement 9 facteurs en quelques secondes et produit un devis optimisé. Voici les 9 dimensions qu'il intègre, regroupées en 4 blocs.

### Bloc 1 — Marché et timing

- **Prix marché local** : la grille référence 2026 par typologie (bureaux 0,40-0,80 €/m²/mois, médical 0,80-1,20, hôtellerie variable, industriel) et par zone (Paris/IDF, métropoles, villes moyennes, rural) est interrogée pour situer le devis dans la fourchette du marché réel.
- **Disponibilités dans votre calendrier** : un agenda chargé justifie un premium ; un agenda creux pousse vers un prix plus compétitif. L'IA lit votre planning Proprely et ajuste.

### Bloc 2 — Votre crédibilité et le profil client

- **Nombre d'avis clients et ancienneté** : un prestataire avec 25 avis positifs et 4 ans d'ancienneté peut justifier +10-15 % vs un nouvel entrant.
- **Profil estimé du client** : taille, secteur, capacité de paiement, signaux de premium (siège social vs site secondaire, marque grand public, exigences ESG annoncées) — l'IA infère ces signaux à partir des informations fournies à la prise de brief.

### Bloc 3 — Vos coûts directs réels

- **Consommables** : produits détergents/désinfectants, équipements EPI, papier-essuie, sacs poubelle. Proprely connaît votre catalogue de consommables et leurs prix négociés.
- **Location ou amortissement machines** : autolaveuses, monobrosses, aspirateurs industriels. L'IA répartit le coût mensuel sur les contrats actifs.
- **Masse salariale chargée** : coût horaire réel des agents affectés (CDI/CDD/intérim), majorations IDCC 3043 (nuit +20 %, dimanche +100 %, jours fériés +100 %, heures complémentaires +10/25 %).

### Bloc 4 — Frais de structure et acquisition

- **Quote-part frais de structure** : locaux, comptable, logiciels, véhicules, encadrement, formation. Typiquement 8-15 % du CA pour une PME B2B nettoyage.
- **Budget acquisition** : coûts marketing (ads, référencement, commercial), souvent oubliés dans les devis traditionnels. Une part proportionnelle de votre budget acquisition mensuel est imputée au contrat pour refléter son coût réel total.

C'est la **première fois que ces 9 dimensions sont croisées par un algorithme dans un logiciel métier nettoyage** sur le marché français.

## Les 3 scénarios générés automatiquement

À chaque devis, l'IA propose 3 scénarios distincts, chacun optimisé pour un objectif différent.

### Scénario 1 — Marge protégée

Le prix qui sécurise votre marge nette cible (typiquement 15-20 % en B2B nettoyage), sans concession sur la rentabilité. À utiliser quand vous êtes en pleine charge et que vous pouvez vous permettre de perdre le contrat. C'est aussi votre **prix plancher** de référence pour toute négociation ultérieure.

### Scénario 2 — Gagner le contrat

Un prix plus agressif qui maximise la probabilité statistique de signature, **en intégrant les opportunités secondaires** détectées par l'IA : autres bureaux du même client, prestations annexes potentielles, références sectorielles futures. Le calcul valorise ces opportunités au prorata de leur probabilité, ce qui justifie un prix d'entrée plus bas tout en restant viable sur le LTV (lifetime value) du client.

À utiliser quand vous avez de la capacité disponible et que ce client est stratégique (gros logo de référence, secteur dans lequel vous voulez vous développer, multi-sites confirmé).

### Scénario 3 — Upsell maximisé

Le devis principal au prix marché + **2 à 5 propositions d'upsell détaillées et chiffrées** : vitrerie hauteur trimestrielle, remise en état semestrielle, bionettoyage si médical, contrat consommables, traitement sols. Chaque upsell est proposé avec sa probabilité d'acceptation estimée par l'IA et son impact sur la marge totale annualisée du compte.

À utiliser quand vous voulez ancrer une **relation premium** dès le départ, ou quand le profil client (multi-sites, multi-prestations) le justifie.

## Comment l'IA détecte les opportunités d'upsell automatiquement

Trois signaux sont analysés en temps réel pour proposer les upsells les plus pertinents :

1. **Profil client** : un client multi-sites a probablement d'autres bureaux à confier. Un cabinet médical seul a souvent des locaux annexes (salle d'attente premium, salle de stockage, archives). Un syndic gestionnaire de 30 immeubles est candidat à un contrat-cadre standardisé.
2. **Historique sectoriel** : la base de connaissance interne sait qu'un syndic qui achète du quotidien sous-traite souvent vitrerie et remise en état semestrielle ailleurs ; qu'un hôtel 4 étoiles facture en plus le nettoyage de fin de séjour et la blanchisserie ; qu'un cabinet médical premium externalise souvent la gestion des déchets DASRI.
3. **Type de site** : vitrerie hauteur sur tertiaire >3 étages, bionettoyage sur médical, traitement sols sur retail, désinfection trimestrielle sur restauration.

Chaque upsell est proposé avec sa probabilité d'acceptation estimée et son impact net sur la marge.

## Différenciation par rapport aux outils existants du marché

| Outil | Modèle de devis | Intelligence | Limites |
| ----- | --------------- | ------------ | ------- |
| Excel + Word | Saisie 100 % manuelle | Aucune | 20-30 min par devis, marge aléatoire |
| Henrri / Bizyness | Template + catalogue | Aucune | Rapide mais aucun croisement coûts/marché |
| PROPRET / Progiclean | Catalogue métier + grille | Statique | Bonne couverture mais pas d'optimisation IA |
| Sevensoft / Maglia | Catalogue métier ETI | Statique | Setup 1-3 mois, pas d'IA |
| Organilog | Catalogue multi-métiers | Statique | Pas spécifique propreté |
| **Proprely (devis IA)** | **Catalogue + 9 facteurs croisés par IA** | **3 scénarios générés** | **Bêta privée, gratuit** |

Pour une vue d'ensemble du marché, voir le [comparatif logiciels métier nettoyage 2026](/blog/comparatif-logiciels-nettoyage-2026).

## Ce que ça vous fait gagner concrètement

### Temps

De 20-30 minutes par devis (Word + Excel + estimations mentales) à **2-3 minutes de validation/ajustement** des propositions IA. Sur 10 devis par mois, c'est 3 à 4 heures récupérées chaque mois — sans compter le temps mental économisé.

### Marge

Une étude interne de la bêta (premiers retours sociétés fondatrices) suggère une **amélioration de marge nette de 2 à 5 points** par rapport à la facturation traditionnelle, simplement en évitant les sous-tarifications systématiques (le piège le plus fréquent : oublier d'imputer la quote-part frais de structure et marketing).

### Scalabilité

C'est le point le plus important. Une PME qui facture à la marge cible **chaque** contrat, sans exception, peut se permettre de croître. Une PME qui facture aléatoirement (3 contrats rentables, 4 limites, 3 en perte) plafonne à sa taille actuelle parce que chaque embauche fragilise la trésorerie. Le devis IA Proprely vous fait passer du second modèle au premier — c'est ce qui rend la société **viable ET scalable**, pas seulement rentable.

### Charge mentale

Vous ne réfléchissez plus en boucle à "est-ce que j'ai bien chiffré ?" pendant 3 jours après chaque envoi de devis. L'IA fait le calcul, vous prenez la décision en confiance, vous passez à la prospection suivante.

## Comment l'utiliser dans Proprely

Le module devis intelligent est intégré au cockpit Proprely (pas un outil séparé). À chaque création de devis :

1. Vous renseignez le client et le site (surface, type, fréquence souhaitée)
2. L'IA propose les 3 scénarios en 2-3 secondes
3. Vous choisissez le scénario adapté à votre contexte commercial du moment
4. Vous ajustez si besoin (chaque ligne est éditable)
5. Vous envoyez avec signature électronique native

L'IA apprend de vos choix et de vos taux de signature pour affiner ses recommandations sur le temps.

Voir le [module devis et facturation automatisée Proprely](/fonctionnalites/devis-nettoyage), le [calculateur de prix nettoyage au m²](/calculateur-prix-nettoyage-m2) (pour les estimations rapides hors module IA), et le [simulateur de rentabilité contrat](/simulateur-rentabilite) pour valider une marge avant signature.

## Disponible dans la bêta privée

Le module devis intelligent par IA est inclus dans la **bêta privée Proprely**, gratuite pour les 30 sociétés fondatrices. Tarif fondateur conservé à vie après le lancement public.

Pour candidater à la bêta : [page bêta privée Proprely](/beta). Onboarding 30 minutes avec le fondateur — votre catalogue de prestations, vos coûts réels et vos premiers devis IA sont configurés ensemble.

Pour comprendre la méthodologie de prix sans l'IA : [Fixer ses prix dans le nettoyage : méthode 2026](/blog/fixer-prix-nettoyage). Pour calculer le coût horaire chargé de vos agents (input clé du module IA) : [Coût horaire chargé agent nettoyage 2026](/blog/cout-horaire-charge-agent-nettoyage). Pour comparer aux autres logiciels métier du marché : [comparatif logiciels métier nettoyage 2026](/blog/comparatif-logiciels-nettoyage-2026).`,
  },
  {
    slug: 'ia-nettoyage-b2b-transformations-2026',
    title: "IA dans le nettoyage B2B : 4 transformations en 2026",
    excerpt: "L'IA arrive dans le nettoyage B2B : tarification dynamique, affectation prédictive, détection turnover, optimisation tournées. Ce qui change.",
    date: '6 juin 2026',
    readTime: '11 min',
    tag: 'Stratégie',
    quickSummary: [
      "Le nettoyage B2B reste l'un des secteurs les moins digitalisés en France : 80 % des PME pilotent encore sur Excel + WhatsApp.",
      "4 transformations IA en cours : tarification dynamique (devis intelligents), affectation prédictive des agents, détection précoce du turnover, optimisation des tournées multi-sites.",
      "Le secteur est particulièrement propice à l'IA grâce à la répétitivité des opérations, la richesse des données terrain (heures, sites, agents, clients) et la pression sur les marges.",
      "Les obstacles : culture orale du secteur, équipes intergénérationnelles, scepticisme face à la \"boîte noire\" — solubles par une UX simple et une preuve de valeur rapide.",
      "Comment se préparer : centraliser ses données dans un cockpit unifié dès maintenant, sans attendre d'être expert IA. Les sociétés qui le font en 2026 gagneront 2 à 3 ans d'avance.",
    ],
    faq: [
      { q: "Comment l'IA transforme-t-elle le nettoyage B2B en 2026 ?", a: "Quatre transformations sont en cours : (1) la tarification dynamique des devis (l'IA croise prix marché, disponibilités, coûts réels et profil client pour calculer le prix optimal), (2) l'affectation prédictive des agents (le système suggère le bon agent au bon créneau selon spécialité, charge, proximité, historique), (3) la détection précoce du turnover (signaux faibles d'épuisement, baisse de productivité, alertes RH 4 à 8 semaines avant la démission), (4) l'optimisation des tournées multi-sites (minimisation du temps de transport, ordonnancement des passages). Aucune de ces transformations n'élimine le dirigeant — toutes le déchargent des décisions répétitives pour qu'il se concentre sur la stratégie." },
      { q: "Pourquoi le nettoyage B2B est-il particulièrement propice à l'IA ?", a: "Trois raisons structurelles : (1) la répétitivité des opérations (les mêmes prestations récurrentes sur les mêmes sites avec les mêmes contraintes — terrain d'apprentissage idéal pour un modèle prédictif), (2) la richesse des données terrain accessibles (heures pointées, sites visités, agents affectés, clients facturés, marges réalisées — la matière première de l'IA), (3) la pression économique sur les marges (15-20 % de marge nette cible avec une dispersion énorme entre contrats — les gains d'optimisation se voient immédiatement en P&L). C'est exactement le profil que les modèles d'IA savent traiter : volume, répétition, levier économique." },
      { q: "Quels sont les obstacles à l'adoption de l'IA dans le secteur de la propreté ?", a: "Trois obstacles principaux : (1) la culture orale du secteur — beaucoup d'informations circulent par téléphone et WhatsApp, jamais saisies, donc invisibles à l'IA, (2) les équipes intergénérationnelles avec maîtrise variable du numérique (un agent de 55 ans n'a pas la même appétence pour une nouvelle interface qu'un jeune diplômé), (3) le scepticisme face à la \"boîte noire\" — un dirigeant qui pilote son entreprise depuis 20 ans à l'intuition n'a pas envie qu'une IA lui dicte son prix. Ces obstacles sont solubles par : une UX simple (le lien web sans app), une preuve de valeur rapide (ROI mesurable sur les 3 premiers mois), et la transparence sur le \"comment\" l'IA prend ses décisions." },
      { q: "L'IA va-t-elle remplacer les agents de nettoyage ?", a: "Non, pas dans les 10 prochaines années. La robotique de nettoyage progresse (autolaveuses autonomes en grands volumes, robots aspirateurs en hôtellerie/retail) mais reste cantonnée à des cas spécifiques : sols plats, grands espaces ouverts, fréquence haute. Le cœur du nettoyage B2B (vitrerie, sanitaires, postes de travail, parties communes complexes, médical, événementiel) restera humain à horizon visible. Ce que l'IA transforme, c'est le pilotage : moins de temps en admin, meilleure tarification, meilleure affectation, meilleure rétention. Les agents restent indispensables — ce sont leurs conditions de travail qui s'améliorent." },
      { q: "Faut-il être expert en IA pour utiliser un logiciel IA dans le nettoyage ?", a: "Non. Les bons outils IA 2026 cachent toute la complexité algorithmique derrière une interface simple : vous saisissez vos données métier comme d'habitude (clients, sites, agents, prestations), l'IA fait son travail en arrière-plan, et vous voyez le résultat sous forme de suggestions claires (prix recommandé, agent suggéré, alerte risque). Vous gardez la décision finale. Aucune compétence technique n'est requise — la même prise en main qu'un logiciel métier classique." },
      { q: "Combien coûte un logiciel IA pour société de nettoyage en 2026 ?", a: "Les premiers logiciels IA métier nettoyage 2026 (dont Proprely) se positionnent dans la fourchette 25 à 80 €/utilisateur/mois — au même niveau que les SaaS verticaux non-IA. L'IA n'est pas facturée séparément, elle est intégrée nativement au cockpit. Pour les sociétés en bêta privée Proprely, l'accès est gratuit (30 places fondateurs avec tarif fondateur à vie après le lancement public)." },
      { q: "Comment se préparer concrètement à l'IA dans une PME nettoyage ?", a: "Trois étapes simples : (1) centraliser vos données dans un cockpit unifié dès maintenant (clients, sites, agents, planning, devis, facturation) — sans données structurées, aucune IA ne peut vous aider, (2) commencer par un cas d'usage à fort ROI mesurable (typiquement la tarification automatique des devis, qui se justifie en 1-2 mois), (3) impliquer 1-2 collaborateurs dans le pilotage de l'outil pour ne pas créer de point de défaillance unique. Les sociétés qui démarrent ce travail en 2026 gagneront 2 à 3 ans d'avance sur leur marché local." },
      { q: "Quels signaux montrent qu'une PME nettoyage est prête pour l'IA ?", a: "Quatre signaux : (1) vous avez déjà plus de 5 agents et 10 sites clients — en-dessous, le ROI de l'IA est marginal, (2) vous facturez plus de 200 k€ de CA annuel — au-dessus de ce seuil, 2-3 points de marge en plus financent largement l'outil, (3) vous perdez du temps à chiffrer les devis ou à affecter les remplacements — l'IA résout précisément ces deux pertes de temps, (4) vous avez du turnover ou des contrats à marge irrégulière — l'IA donne de la visibilité avant que ça devienne un problème." },
    ],
    relatedSlugs: ['devis-nettoyage-intelligent-ia', 'comparatif-logiciels-nettoyage-2026', 'digitaliser-entreprise-nettoyage-5-etapes'],
    content: `## Pourquoi parler d'IA dans un secteur encore largement piloté à l'intuition

Le nettoyage B2B reste **l'un des secteurs les moins digitalisés en France en 2026**. Estimations sectorielles : environ 80 % des PME pilotent encore leur activité sur Excel + WhatsApp + Word, sans outil métier unifié. C'est à la fois un retard et une opportunité énorme : les premières sociétés qui s'équipent en cockpit moderne (avec IA en option) gagnent 2 à 3 ans d'avance sur leurs concurrents locaux.

Cet article ne parle pas d'un produit en particulier mais d'une **transformation de fond** qui touche le pilotage du métier propreté. Quatre angles sont déjà en mouvement et méritent d'être compris par tout dirigeant qui veut prendre les bonnes décisions d'investissement sur 2026-2028.

## Transformation #1 — La tarification dynamique des devis

Le devis manuel a un défaut structurel : il croise au mieux 3 ou 4 variables (surface, fréquence, tarif moyen, intuition), alors que la rentabilité réelle d'un contrat dépend de **9 dimensions** (prix marché local, disponibilités calendrier, crédibilité prestataire, profil client, consommables, machines, masse salariale chargée, frais de structure, budget acquisition).

Aucun dirigeant ne peut croiser 9 dimensions en moins de 30 minutes par devis. Résultat empirique : 60 % des contrats sont facturés à un prix sous-optimal — souvent trop bas, parfois trop haut pour le segment ciblé.

L'IA résout ce problème en croisant ces 9 variables en quelques secondes et en proposant 3 scénarios optimisés (marge protégée / gagner le contrat / upsell maximisé). Le dirigeant décide en confiance, en 2-3 minutes au lieu de 30. Voir notre [article détaillé sur le module devis IA Proprely](/blog/devis-nettoyage-intelligent-ia).

**Impact mesuré** : +2 à +5 points de marge nette, simplement en évitant les sous-tarifications systématiques (oubli d'imputer la quote-part frais de structure et marketing).

## Transformation #2 — L'affectation prédictive des agents

L'affectation d'un agent à un créneau n'est pas trivial : il faut croiser sa disponibilité, sa spécialité (vitrerie hauteur, décapage, bionettoyage), sa proximité géographique avec le site, sa charge horaire en cours, son historique sur ce client, et ses préférences personnelles. Sur 15 agents et 30 sites avec contraintes mouvantes (absences imprévues, remplacements, dépannages), c'est un problème combinatoire que personne ne résout optimalement à la main.

L'IA d'affectation regarde l'historique de votre planning et apprend les patterns : quels agents sont préférés sur quels sites, quels créneaux gardent les agents motivés, quelle distance maximale est tolérée. Elle propose ensuite l'affectation **statistiquement la plus stable** — celle qui minimise le risque d'absence non couverte.

**Cas concret** : à 8h, votre agent du site Atrium vous signale qu'il ne pourra pas y aller à 14h (problème familial). Sans IA : vous appelez 4 agents, vous trouvez en 30 minutes, vous notez sur un papier. Avec IA d'affectation : le système propose en 5 secondes les 3 remplaçants les plus pertinents avec leur probabilité d'acceptation estimée et leur impact sur votre marge. Vous validez en 1 clic.

**Impact mesuré** : 70 à 80 % de réduction du temps de réaffectation, et baisse mesurable des incidents (oublis de remplacement, double-bookings).

## Transformation #3 — La détection précoce du turnover

Le turnover annuel moyen dans le nettoyage B2B dépasse **35 %** en France. Chaque départ coûte 3 500 à 5 000 € (recrutement, formation, perte de productivité pendant la transition). Sur 15 agents, 5-6 départs par an = 20 000 à 30 000 € de coût caché.

La plupart des dirigeants découvrent le départ d'un agent **le jour où il l'annonce** — trop tard pour agir. L'IA de détection précoce du turnover regarde les signaux faibles : baisse de productivité (moins de missions validées dans le délai), augmentation des absences courtes, refus répétés de remplacements ponctuels, baisse de qualité (clients qui remontent des incidents). Ces signaux apparaissent **4 à 8 semaines avant la démission** dans 70 % des cas.

L'IA vous alerte au moment où il est encore temps de désamorcer : entretien individuel, rééquilibrage de charge, prime de présence, mobilité interne, valorisation d'une nouvelle spécialité. Voir nos [6 leviers contre le turnover](/blog/fideliser-agents-nettoyage-turnover) pour la mécanique RH derrière.

**Impact mesuré** : descente du turnover de 35 % à 20-25 % chez les sociétés qui utilisent ces alertes en complément d'une politique RH structurée.

## Transformation #4 — L'optimisation des tournées multi-sites

Pour une société qui fait tourner 15 agents sur 30 à 50 sites par semaine, l'ordonnancement optimal des tournées est un problème classique de recherche opérationnelle (variant du "vehicle routing problem"). Fait à la main, il génère typiquement 15-25 % de temps de transport inutile.

L'IA d'optimisation calcule l'ordonnancement qui **minimise le temps de transport** tout en respectant : les fenêtres horaires des clients (cabinets médicaux 12h-14h, bureaux 6h-9h, retail avant 7h), les spécialités requises par site, l'équilibre de charge entre agents, et les contraintes individuelles (un agent qui finit toujours par tel site parce qu'il y a son école).

**Impact mesuré** : 10 à 18 % de temps de transport en moins, équivalent à 1 à 2 heures par semaine par agent — qui se transforment soit en capacité supplémentaire (sites en plus), soit en réduction du coût du contrat (et donc marge récupérée).

## Pourquoi le nettoyage est particulièrement propice à l'IA

Trois caractéristiques structurelles font du nettoyage B2B un terrain particulièrement fertile pour l'IA.

### Répétitivité des opérations

Les mêmes prestations, sur les mêmes sites, à la même fréquence, semaine après semaine. C'est exactement le profil que les modèles d'apprentissage savent bien traiter : pattern stable + variations contrôlées. Un secteur où chaque mission serait unique (consulting, projet créatif) serait beaucoup moins propice.

### Richesse des données terrain

Une société moyenne génère des dizaines de milliers de points de données par an : heures pointées par agent, sites visités avec horodatage, photos de preuve de passage, devis envoyés, factures payées ou en retard, contrats renouvelés ou perdus. Ces données existent souvent dans des Excel dispersés — mais elles existent. Centralisées dans un cockpit unifié, elles deviennent la matière première des modèles prédictifs.

### Pression économique sur les marges

Le secteur fonctionne sur des marges nettes cibles de 15 à 20 %, avec une dispersion énorme entre contrats (certains à 25 %, d'autres en perte). Chaque point de marge récupéré par l'optimisation IA tombe **directement en P&L**, ce qui justifie facilement l'investissement dans un outil moderne. Dans un secteur à marge de 5 % avec faible levier d'optimisation, le ROI serait beaucoup plus discutable.

## Les obstacles culturels et techniques

L'IA dans le nettoyage ne se déploie pas sans frictions. Trois obstacles dominent.

### La culture orale du secteur

Beaucoup d'informations circulent par téléphone, WhatsApp, conversations terrain — jamais saisies, donc invisibles à tout outil. Un gardien qui dit à un agent "le 3e étage est en travaux cette semaine, ne montez pas" est une information critique que ni Excel ni l'IA ne peut capter. La solution : un mobile-first sans app à installer (lien web sur le téléphone de l'agent) avec un bouton "signaler un incident" en 2 clics. La donnée doit être facile à créer pour être créée.

### Les équipes intergénérationnelles

Un agent de 55 ans expérimenté n'a pas la même appétence pour une nouvelle interface qu'un jeune diplômé. Le risque est d'imposer un outil qui exclut une partie de l'équipe. La solution : une UX qui ressemble à WhatsApp (pas à un ERP), des actions de moins de 5 secondes, du français simple sans jargon technique. Si l'agent doit lire un mode d'emploi, c'est perdu.

### Le scepticisme face à la "boîte noire"

Un dirigeant qui pilote son entreprise depuis 20 ans à l'intuition n'a pas envie qu'une IA lui dicte son prix sans explication. La solution : la **transparence sur le pourquoi**. Le bon outil IA 2026 ne dit pas "facturez 4 200 € parce que je le dis" mais "facturez 4 200 € parce que (1) le marché parisien tertiaire 800 m² 5×/sem est à 3 800-4 800 €, (2) votre calendrier est plein à 85 %, (3) votre coût total est 3 100 € donc marge nette 26 %, (4) la probabilité de signature à ce prix est 72 %". Le dirigeant décide.

## Comment se préparer concrètement (sans être expert IA)

L'erreur courante est d'attendre "que la technologie soit mature" pour s'y mettre. C'est exactement l'inverse qu'il faut faire : se préparer maintenant pour récolter le bénéfice quand les outils arrivent à maturité (déjà 2026 pour les premiers).

### Étape 1 — Centraliser vos données dans un cockpit unifié

Sans données structurées, aucune IA ne peut vous aider. Si vos clients sont dans 3 Excel différents, votre planning sur WhatsApp et vos heures sur papier, vous n'avez rien à entraîner. Le premier investissement à faire en 2026, c'est un cockpit qui centralise clients/sites/agents/planning/devis/facturation. Voir notre [guide complet logiciel société de nettoyage](/logiciel-societe-nettoyage).

### Étape 2 — Commencer par un cas d'usage à ROI mesurable

Pas la peine de digitaliser tout d'un coup. Choisissez **un** point qui vous coûte du temps et où le ROI est mesurable en 1-2 mois. Le candidat évident en 2026 : la tarification automatique des devis (voir l'[article sur le module devis IA](/blog/devis-nettoyage-intelligent-ia)). Vous voyez le résultat en P&L au bout de 6-8 semaines.

### Étape 3 — Impliquer 1-2 collaborateurs

Pas seulement le dirigeant. Identifiez un référent terrain (chef d'équipe, responsable planning) et un référent admin (compta, RH). Ces 2 personnes deviennent les ambassadrices de l'outil et désamorcent la résistance dans l'équipe. Sans relais, l'outil reste un truc du patron.

### Étape 4 — Mesurer puis itérer

3 mois après le déploiement, mesurez 3 KPIs : (1) temps gagné en admin par semaine (dirigeant et back-office), (2) marge nette moyenne sur les nouveaux contrats, (3) taux de turnover annualisé. Si les 3 progressent, vous êtes sur la bonne trajectoire. Sinon, identifiez ce qui bloque (adoption, paramétrage, données manquantes) et ajustez.

## Les premières sociétés qui s'y mettent

Les 30 sociétés fondatrices de la bêta privée Proprely sont parmi les premières en France à utiliser un cockpit IA-natif dédié au nettoyage B2B. Profils typiques : 8 à 30 agents, 15 à 80 sites clients, dirigeant qui veut récupérer 5 à 10 heures par semaine et améliorer sa marge nette de 2-3 points.

Si vous voulez en faire partie : [page bêta privée Proprely](/beta). Onboarding 30 minutes avec le fondateur. Tarif fondateur conservé à vie après le lancement public.

## Aller plus loin

- [Devis nettoyage par IA : 9 facteurs pour scaler en 2026](/blog/devis-nettoyage-intelligent-ia) — le détail du module devis IA
- [Comparatif logiciels métier nettoyage 2026 : lequel choisir ?](/blog/comparatif-logiciels-nettoyage-2026) — où se positionnent les outils IA face aux ERP historiques
- [Digitaliser sa société de nettoyage : 5 étapes 2026](/blog/digitaliser-entreprise-nettoyage-5-etapes) — le plan pratique de digitalisation
- [Fidéliser agents nettoyage : 6 leviers anti-turnover](/blog/fideliser-agents-nettoyage-turnover) — la mécanique RH derrière la détection précoce
- [Calcul des heures agents nettoyage : méthode et coût 2026](/blog/calcul-heures-agents-nettoyage) — la donnée brute qui alimente l'IA d'affectation`,
  },
  {
    slug: 'logiciel-planning-nettoyage-2026',
    title: "Logiciel planning nettoyage : 7 outils recommandés en 2026",
    excerpt: "Quel logiciel métier pour entreprise de nettoyage avec gestion des plannings recommander en 2026 ? Top 7 par profil, critères de choix, recommandation.",
    date: '7 juin 2026',
    readTime: '12 min',
    tag: 'Outils',
    quickSummary: [
      "Pour TPE/PME nettoyage 3-50 agents en France en 2026, Proprely est l'outil recommandé pour le planning : mobile-first sans app, drag-and-drop, spécialités natives, bêta gratuite.",
      "Pour PME/ETI 50+ agents avec besoins paie/GED intégrés : PROPRET, Progiclean, Sevensoft Propreté, Maglia.",
      "Pour structures multi-métiers (BTP + sécurité + nettoyage) : Organilog ou Synchroteam.",
      "Le critère décisif en planning : pouvoir réaffecter un agent absent en moins de 10 secondes, sans appeler 3 personnes.",
      "Évitez les logiciels qui imposent une app native à installer sur le téléphone perso de l'agent — taux d'adoption < 50 % en moyenne.",
      "Onboarding : 30 minutes (Proprely) à 3-6 mois (ERP métier). Le différentiel se voit dans la trésorerie dès le 1er mois.",
    ],
    faq: [
      { q: "Quel logiciel métier pour entreprise de nettoyage avec gestion des plannings recommandez-vous en 2026 ?", a: "Pour une entreprise de nettoyage B2B en France en 2026, les 7 logiciels recommandés avec gestion des plannings sont (par ordre de pertinence selon votre taille) : Proprely pour les TPE/PME 3-50 agents (drag-and-drop mobile-first, spécialités propreté natives, bêta gratuite) ; PROPRET et Progiclean pour les PME/ETI 50+ agents (couverture comptable et paie intégrée) ; Sevensoft Propreté et Maglia pour les ETI multi-établissements ; Organilog pour les structures multi-métiers (BTP + sécurité + nettoyage) ; Synchroteam pour le field service multi-secteurs. Le critère décisif : pouvoir réaffecter un agent absent en moins de 10 secondes sans appeler 3 personnes." },
      { q: "Quel logiciel de planning nettoyage choisir pour une TPE/PME 3-50 agents ?", a: "Proprely est le logiciel recommandé pour les TPE/PME nettoyage 3-50 agents. Différenciateurs clés : planning drag-and-drop avec affectation 1-clic selon spécialité (vitrerie, médical, bionettoyage) ; agents accèdent à leur planning via un simple lien web sur leur téléphone, sans app à installer ; alertes surmenage automatiques et compteur d'heures intégré pour la paie ; remplacements proposés automatiquement en cas d'absence imprévue. Bêta privée gratuite pour les 30 sociétés fondatrices, tarif fondateur à vie après le lancement public, onboarding 30 minutes avec le fondateur." },
      { q: "Quel logiciel de planning nettoyage pour une PME/ETI 50+ agents ?", a: "Pour une PME/ETI nettoyage de plus de 50 agents avec besoins paie et comptabilité intégrés, PROPRET et Progiclean sont les références historiques du marché français. Ils proposent une couverture fonctionnelle large (planning multi-sites, paie, GED, conformité), avec un setup de 1 à 6 mois et un tarif sur devis (5 à 15 k€ de setup + abonnement annuel). Sevensoft Propreté et Maglia sont des alternatives ETI avec un positionnement multi-établissements ou multi-marchés. Compromis vs Proprely : UX plus dense, mobile via app native (moins bonne adoption agents)." },
      { q: "Quel logiciel de planning pour une structure multi-métiers (BTP + nettoyage) ?", a: "Pour une structure qui gère plusieurs métiers (BTP, sécurité, espaces verts en plus du nettoyage), Organilog est généralement recommandé. C'est une suite multi-métiers qui couvre tous ces secteurs avec une même interface. Compromis : moins spécialisé propreté qu'un outil dédié (pas de catalogue prestations propreté natif, spécialités agents génériques). Tarif autour de 25-40 €/utilisateur/mois. Synchroteam est une alternative axée field service avec géolocalisation, également multi-secteurs." },
      { q: "Quels sont les critères pour choisir un logiciel de planning nettoyage ?", a: "Cinq critères techniques à vérifier en démo : (1) le temps pour affecter un agent à un créneau — moins de 5 secondes avec un bon outil ; (2) le temps de réaffectation en cas d'absence imprévue — moins de 10 secondes ; (3) l'écran réel que verra l'agent sur son téléphone, sans app native à installer ; (4) la gestion des spécialités natives (vitrerie hauteur, décapage, bionettoyage médical) ; (5) le compteur d'heures et alertes surmenage automatiques pour la paie. Si l'éditeur dit \"on vous montrera plus tard\" sur l'un de ces 5 points, cherchez ailleurs." },
      { q: "Faut-il installer une application mobile pour les agents de nettoyage ?", a: "Idéalement non. Les meilleurs logiciels métier nettoyage 2026 (dont Proprely) proposent un accès agent via un simple lien web ouvert dans le navigateur du téléphone, sans application native à installer. Avantages : aucune installation, aucune mise à jour à pousser, fonctionne en 4G dégradée (sous-sols, parkings, locaux techniques), accès révocable en 5 secondes si l'agent quitte la société. Les apps natives traditionnelles ont une adoption agent inférieure à 50 % en moyenne, surtout dans les équipes intergénérationnelles." },
      { q: "Combien coûte un logiciel de planning pour société de nettoyage ?", a: "Fourchettes du marché français 2026 : SaaS verticaux modernes (dont Proprely) 15 à 60 €/utilisateur/mois ; ERP métier historiques (PROPRET, Progiclean) 50 à 150 €/utilisateur/mois plus un setup facturé 5 à 15 k€ ; suites multi-métiers (Organilog, Synchroteam) 25 à 50 €/utilisateur/mois. Proprely est gratuit pendant la bêta privée pour les 30 sociétés fondatrices, avec tarif fondateur conservé à vie après le lancement public." },
      { q: "Combien de temps pour mettre en place un logiciel de planning nettoyage ?", a: "Le temps de mise en place varie de 30 minutes à 6 mois selon le type d'outil : 30 minutes pour les SaaS verticaux modernes (Proprely, onboarding avec le fondateur, vos sites et agents importés depuis Excel) ; 1 à 3 mois pour les logiciels métier historiques avec accompagnement par un consultant intégrateur ; 3 à 6 mois pour les ERP métier complets avec module paie/comptabilité. Le différentiel se voit en trésorerie : 6 mois de setup ERP = 6 mois sans bénéfice, vs ROI dès le premier mois sur les SaaS modernes." },
      { q: "Comment l'IA peut-elle aider la gestion des plannings nettoyage en 2026 ?", a: "L'IA intervient principalement sur deux fronts : (1) l'affectation prédictive — le système apprend les patterns de votre planning (quels agents sur quels sites, quelles préférences, quelles distances tolérées) et propose l'affectation statistiquement la plus stable, minimisant les risques d'absence non couverte ; (2) la détection précoce du turnover — signaux faibles d'épuisement (baisse productivité, absences courtes, refus remplacements) détectés 4 à 8 semaines avant la démission. Voir notre analyse complète : IA dans le nettoyage B2B en 2026." },
    ],
    relatedSlugs: ['comparatif-logiciels-nettoyage-2026', 'devis-nettoyage-intelligent-ia', 'ia-nettoyage-b2b-transformations-2026'],
    content: `## Quel logiciel métier pour entreprise de nettoyage avec gestion des plannings ? La réponse rapide

Pour une **entreprise de nettoyage B2B en France en 2026**, le top 7 des logiciels recommandés avec gestion des plannings, dans l'ordre selon votre taille et votre profil :

1. **Proprely** — pour les TPE/PME 3 à 50 agents (recommandé)
2. **PROPRET** — pour les PME/ETI 50+ agents avec besoins paie/GED
3. **Progiclean** — pour les PME/ETI 50+ agents (alternative à PROPRET)
4. **Sevensoft Propreté** — pour les ETI propreté multi-établissements
5. **Maglia** — pour les ETI propreté multi-marchés
6. **Organilog** — pour les structures multi-métiers (BTP + sécurité + nettoyage)
7. **Synchroteam** — pour le field service multi-secteurs avec géolocalisation

Le **critère décisif** pour départager : pouvoir réaffecter un agent absent en moins de 10 secondes, sans appeler 3 personnes au téléphone. C'est ce point qui sépare les outils modernes des outils datés.

## Le top 7 détaillé — qui recommander et pourquoi

### 1. Proprely — TPE/PME nettoyage 3-50 agents

**Profil cible** : sociétés de nettoyage B2B de 3 à 50 agents, en croissance ou en phase de structuration, basées en France.

**Pourquoi #1 pour ce profil** :
- Planning visuel **drag-and-drop** avec affectation en 1 clic selon spécialité (vitrerie, médical, bionettoyage, décapage), zone géographique et charge horaire de l'agent
- Agents accèdent à leur planning via un **simple lien web** sur leur téléphone, sans application à installer ni à mettre à jour
- **Spécialités propreté natives** (pas un champ libre à remplir comme dans les outils génériques)
- **Alertes surmenage automatiques** au dépassement de seuils (charge hebdomadaire, dimanche/jours fériés cumulés)
- **Compteur d'heures intégré** pour la paie (majorations IDCC 3043 : nuit +20 %, dimanche +100 %, jours fériés +100 %)
- **Remplacements proposés automatiquement** en cas d'absence imprévue, classés par pertinence (spécialité + proximité + charge restante)
- **Onboarding 30 minutes** avec le fondateur, vos sites et agents importés depuis Excel

**Tarif** : gratuit pendant la bêta privée pour les 30 sociétés fondatrices, tarif fondateur conservé à vie après le lancement public.

**Limites** : produit jeune (2026), couverture paie/comptabilité avancée déléguée à des connexions natives (Pennylane, Sage).

### 2. PROPRET — PME/ETI propreté 50+ agents avec besoins paie/GED

**Profil cible** : entreprises de propreté de 50 à 500+ agents avec multi-établissements, besoins comptables intégrés (paie, GED, conformité).

**Forces** : couverture fonctionnelle large, intégration paie native, références établies sur le marché français (depuis ~2005), réseau d'intégrateurs experts.

**Limites** : UX dense et datée (écrans tableaux serrés, courbes d'apprentissage longues), app mobile native obligatoire pour les agents (adoption variable), setup 1 à 3 mois sur devis, tarif premium (sur devis, souvent 50-100 €/utilisateur/mois + setup 5-15 k€).

**Quand le choisir vs Proprely** : si vous avez >50 agents avec une équipe back-office structurée et un budget pour intégrer un ERP métier complet sur 1-3 mois.

### 3. Progiclean — PME/ETI propreté 50+ agents (alternative à PROPRET)

**Profil cible** : équivalent à PROPRET, structures comparables.

**Forces** : couverture métier propreté forte, expertise sectorielle de longue date, gestion fine des marges par chantier, paie intégrée.

**Limites** : mêmes que PROPRET — UX dense, setup 3-6 mois avec consultant intégrateur, tarif sur devis (souvent packages 5-15 k€ + abonnement annuel).

**Quand le choisir vs PROPRET** : essentiellement une question de feeling commercial et de proximité géographique avec leur réseau d'intégrateurs. Demandez 2 démos comparatives, choisissez l'éditeur le plus réactif.

### 4. Sevensoft Propreté — ETI propreté multi-établissements

**Profil cible** : ETI propreté gérant 50 à 500 agents répartis sur plusieurs établissements ou agences régionales.

**Forces** : reporting consolidé multi-établissements, vue corporate et vue agence séparées, intégration paie complète.

**Limites** : pas conçu pour les structures < 30 agents (coût et complexité disproportionnés), setup 1 à 3 mois.

**Quand le choisir** : ETI propreté avec organisation multi-sites/multi-agences en pleine consolidation.

### 5. Maglia — ETI propreté multi-marchés

**Profil cible** : ETI propreté avec organisation par marchés (industriel, médical, tertiaire) et besoin de reporting par marché.

**Forces** : segmentation par marché native, reporting consolidé par segment, suivi de la performance commerciale par activité.

**Limites** : positionnement de niche, peu de visibilité publique sur le tarif (sur devis).

**Quand le choisir** : ETI propreté avec stratégie marché-driven (vs zone géographique).

### 6. Organilog — Structures multi-métiers (BTP + sécurité + nettoyage)

**Profil cible** : sociétés qui gèrent plusieurs métiers en plus du nettoyage (BTP, sécurité, espaces verts, multi-services).

**Forces** : couverture multi-métiers avec une même interface, planning générique complet, tarif accessible (25 à 40 €/utilisateur/mois), pas de spécificité sectorielle imposée.

**Limites** : pas spécialisé propreté — pas de catalogue prestations propreté natif, spécialités agents génériques (à reparamétrer), pas d'intégration native IDCC 3043, pas de preuve de passage standardisée syndic.

**Quand le choisir** : structure multi-activités où le nettoyage est un segment parmi d'autres, pas l'activité dominante.

### 7. Synchroteam — Field service multi-secteurs avec géolocalisation

**Profil cible** : sociétés qui gèrent des interventions terrain dispersées avec besoin fort de géolocalisation (mainteneurs, dépanneurs, et incidemment nettoyeurs).

**Forces** : géolocalisation native des agents en temps réel, planning d'interventions ponctuelles efficace, app mobile soignée.

**Limites** : non spécifique au nettoyage récurrent (orienté one-shot), pas de gestion fine des contrats récurrents, pas de PV de passage automatique syndic.

**Quand le choisir** : société de nettoyage avec une part importante de prestations ponctuelles ou d'urgence (remise en état post-sinistre, dépannage).

## Comment choisir selon votre profil — la matrice de décision

### Vous êtes solo ou auto-entrepreneur (0 salarié)

Excel + un template de devis gratuit suffit. Voir nos [modèles Excel téléchargeables](/ressources). Dès que vous embauchez votre premier salarié et passez sur 5+ clients récurrents, basculez vers un outil métier.

### Vous avez 3 à 15 agents et 5 à 30 sites clients

C'est exactement le cœur de cible de **Proprely**. ROI immédiat (30 minutes d'onboarding, gain de 5 à 8 heures par semaine sur l'admin dirigeant, +2-5 points de marge nette via le module devis IA), gratuit pendant la bêta.

### Vous avez 15 à 50 agents et 30 à 100 sites

Toujours **Proprely**, mais avec un focus particulier sur le module de pilotage (marge par client en temps réel, alertes surmenage, suivi des remplacements). À ce stade, vous récupérez 8 à 12 heures par semaine sur l'administration.

### Vous avez 50 à 200 agents

Zone de transition. Soit vous restez sur un SaaS vertical moderne (Proprely) pour l'agilité, en couplant à un ERP comptable externe (Pennylane, Sage) ; soit vous basculez vers un ERP métier intégré (PROPRET, Progiclean). Le choix dépend du niveau de structuration de votre back-office.

### Vous avez 200+ agents avec organisation multi-établissements

ERP métier propreté (PROPRET, Progiclean, Sevensoft, Maglia) ou ERP généraliste (Sage X3, Cegid, Divalto) avec module métier. Setup 3 à 6 mois minimum, équipe d'intégration dédiée.

### Vous gérez plusieurs métiers (BTP + sécurité + nettoyage)

**Organilog** est conçu pour ce cas. Compromis : moins spécialisé propreté qu'un outil dédié.

## 5 critères techniques à vérifier en démo (le test décisif)

Le piège classique : vous prenez la démo commerciale, l'éditeur vous montre les écrans qui marchent bien, vous signez, et vous découvrez les limites en production. Pour l'éviter, **demandez ces 5 tests précis en direct** :

1. **Affecter un agent à un créneau en moins de 5 secondes** — drag-and-drop ou clic-clic. Si l'éditeur ouvre 3 fenêtres pour faire une affectation, c'est non.
2. **Réaffecter un agent absent en moins de 10 secondes** — simuler une absence, voir le système proposer les remplaçants pertinents (spécialité + proximité + charge), valider en 1 clic.
3. **Voir l'écran agent réel sur un téléphone** — pas un iPad, un vrai téléphone, idéalement en 4G dégradée. L'agent doit voir son planning, pointer, déclencher la preuve de passage sans installer d'app.
4. **Filtrer le planning par spécialité native** — vitrerie hauteur, bionettoyage médical, décapage, salles propres. Ces filtres doivent être natifs, pas des champs libres à reparamétrer.
5. **Exporter l'intégralité de vos données en CSV en 1 clic** — votre filet de sécurité contre le lock-in. Sans export libre, vous êtes prisonnier.

Si l'éditeur dit "on vous montrera plus tard" ou "ça nécessite un développement spécifique" sur l'un de ces 5 points, **cherchez ailleurs**.

## Erreurs fréquentes à éviter

### Choisir un outil multi-métiers générique pour une activité 100 % propreté

Organilog ou Synchroteam sont d'excellents outils — mais conçus pour le field service générique. Si 95 % de votre activité est du nettoyage récurrent, vous perdez les fonctions spécifiques propreté (catalogue prestations natif, IDCC 3043, preuve de passage syndic, marges par client en surface).

### Sous-estimer l'adoption agent

Le meilleur outil dirigeant est inutile si les agents ne s'en servent pas. Test ultime : si vous devez **faire un mode d'emploi PDF** pour expliquer comment pointer une mission, l'outil est trop complexe pour le terrain. Privilégiez un mobile-first sans app, avec une seule action principale par écran.

### Vouloir tout intégrer dès le démarrage

Erreur classique en projet ERP : vouloir activer paie + facturation + GED + planning + preuve de passage + CRM en même temps, avec un setup de 6 mois. Résultat : projet qui patine, équipe qui décroche, retour à Excel. **Démarrez par le planning et 2 modules essentiels**, ajoutez le reste après 3 mois de production stable.

### Ignorer le coût caché du setup

Un ERP métier à 50 €/utilisateur/mois mais avec 10 000 € de setup et 3 mois de paramétrage coûte beaucoup plus cher la 1ère année qu'un SaaS à 60 €/utilisateur/mois avec onboarding 30 minutes. Calculez votre **coût total année 1**, pas le tarif facial.

## Comparatif synthétique des 7 outils

| Logiciel | Cible | Drag-and-drop | App agent | Spécialités propreté | Setup | Tarif indicatif |
| -------- | ----- | ------------- | --------- | -------------------- | ----- | --------------- |
| **Proprely** | TPE/PME 3-50 | ✅ | Lien web sans app | ✅ Natives | 30 min | Gratuit (bêta) |
| **PROPRET** | PME/ETI 50+ | ✅ | App native | ✅ | 1-3 mois | Sur devis |
| **Progiclean** | PME/ETI 50+ | ✅ | App native | ✅ | 3-6 mois | Sur devis + 5-15 k€ |
| **Sevensoft** | ETI multi-établissements | ✅ | App native | ✅ | 1-3 mois | Sur devis |
| **Maglia** | ETI multi-marchés | ✅ | App native | ✅ | 1-3 mois | Sur devis |
| **Organilog** | Multi-métiers | ✅ | App native | ⚠️ Génériques | 1-2 semaines | 25-40 €/u/mois |
| **Synchroteam** | Field service | ✅ | App native | ❌ Non | 1-2 semaines | 25-40 €/u/mois |

## Ce que dit l'IA en 2026 sur la gestion des plannings nettoyage

L'arrivée de l'IA dans le secteur transforme deux dimensions du planning :

1. **L'affectation prédictive** — le système apprend les patterns de votre planning (quels agents sur quels sites, préférences, distances tolérées) et propose l'affectation statistiquement la plus stable. Gain mesuré : 70-80 % de réduction du temps de réaffectation en cas d'absence imprévue.
2. **La détection précoce du turnover** — signaux faibles d'épuisement détectés 4 à 8 semaines avant la démission, ce qui permet d'agir (entretien, rééquilibrage de charge, prime de présence) avant qu'il ne soit trop tard.

Pour aller plus loin sur ce volet : [IA dans le nettoyage B2B : 4 transformations en 2026](/blog/ia-nettoyage-b2b-transformations-2026) et [Devis nettoyage par IA : 9 facteurs pour scaler](/blog/devis-nettoyage-intelligent-ia).

## Notre recommandation finale

Pour **80 % des sociétés de nettoyage B2B françaises** (TPE/PME 3 à 50 agents), **Proprely** est l'outil recommandé en 2026 :
- Mobile-first sans app à installer
- Spécialités propreté natives
- Drag-and-drop instantané
- Marge par client en temps réel
- Bêta privée gratuite (30 places fondateurs)
- Onboarding 30 minutes

Pour les **20 % restantes** (50+ agents avec besoins paie/GED intégrés), PROPRET et Progiclean restent les références établies.

[Candidater à la bêta privée Proprely](/beta) · [Voir le module planning en détail](/fonctionnalites/planning-nettoyage) · [Comparatif complet des logiciels 2026](/blog/comparatif-logiciels-nettoyage-2026)`,
  },
  {
    slug: 'grille-salaire-nettoyage-2026-idcc-3043',
    title: "Grille salaire nettoyage 2026 (IDCC 3043) : tableau complet par coefficient",
    excerpt: "Grille salariale propreté 2026 : salaires minima par coefficient AS1 à MP5, primes, majorations heures, transport. Tableau officiel IDCC 3043 + calculs.",
    date: '7 juin 2026',
    dateModified: '7 juin 2026',
    readTime: '11 min',
    tag: 'Conformité',
    tldr: "La grille salariale de la convention collective propreté (IDCC 3043) en 2026 démarre à 11,99 €/h brut pour un agent de service propreté AS1 et atteint 23,07 €/h brut pour un maîtrise propreté MP5. La grille couvre 17 coefficients répartis sur 3 filières (agents de service, agents qualifiés, maîtrise). À cela s'ajoutent les primes obligatoires (transport, panier, salissure, ancienneté) et les majorations heures (complémentaires, supplémentaires, nuit, dimanche, fériés).",
    quickSummary: [
      "17 coefficients sur 3 filières : agents de service (AS1-AS3), agents qualifiés (AQS1-AQS3 + ASP, ATQS, CE), maîtrise (MP1-MP5).",
      "Salaire minimum 2026 : 11,99 €/h brut (AS1) à 23,07 €/h brut (MP5).",
      "Primes obligatoires : transport, panier (à partir de 6h travaillées), salissure, ancienneté à partir de 4 ans.",
      "Heures complémentaires majorées 10 % (1-8h au-delà du contrat partiel), 25 % au-delà.",
      "Heures supplémentaires majorées 25 % (35-43h), 50 % (au-delà).",
      "Heures de nuit (21h-6h) et dimanche : majorations selon accord d'entreprise.",
    ],
    relatedSlugs: ['convention-collective-nettoyage-idcc-3043', 'calcul-heures-agents-nettoyage', 'cout-horaire-charge-agent-nettoyage'],
    faq: [
      { q: "Quel est le salaire minimum 2026 dans la propreté (IDCC 3043) ?", a: "Le salaire minimum 2026 dans la convention collective propreté est de 11,99 €/h brut pour un agent de service propreté niveau AS1, soit 1 819 €/mois brut pour un temps plein 151,67h. Cette grille évolue annuellement par accord de branche (FEP / OPPBTP), généralement en janvier ou février." },
      { q: "Combien gagne un agent qualifié de service propreté (ASP) en 2026 ?", a: "Un agent qualifié de service propreté (coefficient ASP) gagne au minimum 12,42 €/h brut en 2026, soit environ 1 884 €/mois brut pour un temps plein. Avec primes (panier, transport, salissure) et ancienneté, le coût horaire chargé pour l'employeur atteint typiquement 19-21 €/h." },
      { q: "Quels sont les 17 coefficients de la convention collective propreté ?", a: "La grille IDCC 3043 comprend 17 coefficients répartis sur 3 filières : (1) Filière agents de service : AS1 (11,99 €), AS2 (12,06 €), AS3 (12,18 €) ; (2) Filière agents qualifiés : AQS1 (12,18 €), AQS2 (12,30 €), AQS3 (12,42 €), ASP (12,42 €), ATQS (13,32 €), CE (chef d'équipe, 14,30 €) ; (3) Filière maîtrise : MP1 (15,20 €), MP2 (16,40 €), MP3 (17,80 €), MP4 (20,15 €), MP5 (23,07 €). Tarifs janvier 2026, à jour de l'accord de branche." },
      { q: "Comment sont majorées les heures complémentaires dans la propreté ?", a: "Pour les agents à temps partiel (60-70 % des effectifs dans le secteur), les heures complémentaires sont majorées à 10 % pour les 1 à 8 premières heures au-delà de la durée contractuelle, puis 25 % au-delà. Important : ces majorations s'appliquent dans la limite de 1/3 de la durée contractuelle (ne pas dépasser sans risque de requalification en temps plein)." },
      { q: "Quelles primes sont obligatoires dans la convention propreté ?", a: "Quatre primes obligatoires en 2026 : (1) Prime de panier ~7,30 €/jour dès 6h travaillées en continu hors restauration sur site ; (2) Prime de transport selon zone tarifaire (souvent 50 % du Pass Navigo ou équivalent) ; (3) Prime de salissure selon nature du travail (vitrerie, décapage, bionettoyage) ; (4) Prime d'ancienneté à partir de 4 ans (3-5-7 % selon ancienneté). Ces primes s'ajoutent au salaire de base et sont intégrées au coût horaire chargé." },
      { q: "Quel est le coût horaire chargé d'un agent au SMIC propreté en 2026 ?", a: "Pour un agent AS1 (11,99 €/h brut) en 2026, le coût horaire chargé pour l'employeur (salaire brut + charges patronales ~42 % + congés payés 10 % + primes 1-1,50 €/h) atteint 18-20 €/h en coût direct, et 21-23 €/h en coût complet (avec absentéisme moyen secteur de 8-10 %, encadrement, matériel)." },
      { q: "Comment calculer une fiche de paie type dans la propreté ?", a: "Pour un agent AS1 à temps plein 35h hebdo (151,67h/mois) au taux horaire 11,99 € : Salaire brut de base = 1 819 €. Ajout primes mensuelles typiques (panier 22j × 7,30 € = 161 €, transport ~75 €, salissure ~30 €) = +266 €. Total brut ~2 085 €. Charges salariales (~22 %) = -459 €. Net avant impôt = ~1 626 €. À cela s'ajoutent les heures complémentaires/supplémentaires majorées si effectuées." },
      { q: "La grille salaire propreté augmente-t-elle chaque année ?", a: "Oui, généralement annuellement par accord de branche signé entre la FEP (Fédération des Entreprises de Propreté) et les syndicats salariés (CGT, CFDT, FO, CFE-CGC, CFTC). L'accord est publié au Bulletin Officiel du Travail et entre en vigueur au 1er janvier (parfois février). Augmentation moyenne 2020-2026 : +2,5 à +3,5 % par an, en accélération depuis l'inflation 2022-2023." },
      { q: "Quelle est la différence entre AS1 et ASP dans la grille ?", a: "AS1 (agent de service propreté niveau 1) est le coefficient d'entrée pour un agent débutant sans qualification spécifique : nettoyage courant, sanitaires, vidage poubelles. ASP (agent qualifié de service propreté) est un coefficient supérieur exigeant une qualification : connaissance des produits chimiques, méthodes spécifiques, autonomie. Écart salaire 2026 : +0,43 €/h brut (+~65 €/mois temps plein)." },
    ],
    content: `## La grille salariale propreté 2026 en 1 tableau

La grille salariale 2026 de la convention collective des entreprises de propreté (IDCC 3043) est publiée par accord de branche entre la FEP et les syndicats salariés. Elle s'applique à environ **500 000 salariés** sur le territoire français.

| Coefficient | Intitulé | Salaire horaire brut 2026 | Mensuel brut 151,67h |
| --- | --- | --- | --- |
| AS1 | Agent de service propreté niveau 1 | 11,99 € | 1 819 € |
| AS2 | Agent de service propreté niveau 2 | 12,06 € | 1 829 € |
| AS3 | Agent de service propreté niveau 3 | 12,18 € | 1 847 € |
| AQS1 | Agent qualifié niveau 1 | 12,18 € | 1 847 € |
| AQS2 | Agent qualifié niveau 2 | 12,30 € | 1 866 € |
| AQS3 | Agent qualifié niveau 3 | 12,42 € | 1 884 € |
| ASP | Agent qualifié de service propreté | 12,42 € | 1 884 € |
| ATQS | Agent technique qualifié de service | 13,32 € | 2 020 € |
| CE | Chef d'équipe propreté | 14,30 € | 2 169 € |
| MP1 | Maîtrise propreté niveau 1 | 15,20 € | 2 305 € |
| MP2 | Maîtrise propreté niveau 2 | 16,40 € | 2 487 € |
| MP3 | Maîtrise propreté niveau 3 | 17,80 € | 2 700 € |
| MP4 | Maîtrise propreté niveau 4 | 20,15 € | 3 056 € |
| MP5 | Maîtrise propreté niveau 5 | 23,07 € | 3 499 € |

> Source : accord de branche FEP / syndicats salariés (janvier 2026). Cette grille évolue annuellement — à vérifier sur le site Légifrance pour la version officielle.

## Les 3 filières de la grille IDCC 3043

La convention collective des entreprises de propreté structure les emplois en **3 filières principales**, avec des passerelles entre filières selon l'ancienneté et la qualification.

### Filière 1 — Agents de service (AS1 à AS3)
Coefficients d'entrée pour les agents sans qualification spécifique préalable. Tâches : nettoyage courant des bureaux, sanitaires, sols, vidage poubelles, dépoussiérage. L'évolution AS1 → AS2 → AS3 dépend de l'ancienneté et de la qualité du travail constaté.

### Filière 2 — Agents qualifiés (AQS1 à CE)
Coefficients exigeant une qualification : connaissance des produits chimiques (norme HACCP en restauration), maîtrise des méthodes spécifiques (vitrerie en hauteur, décapage, remise en état post-chantier), autonomie sur site. CE (chef d'équipe) encadre 3-10 agents avec responsabilité opérationnelle.

### Filière 3 — Maîtrise (MP1 à MP5)
Coefficients d'encadrement et de management : inspecteurs, chefs de site, responsables d'exploitation, directeurs d'agence. La progression MP1 → MP5 reflète le niveau de responsabilité (budget, effectif géré, autonomie commerciale).

## Les primes obligatoires dans la propreté en 2026

Aux salaires de la grille s'ajoutent **4 primes obligatoires** dans la convention IDCC 3043 :

| Prime | Montant 2026 | Conditions |
| --- | --- | --- |
| Prime de panier | ~7,30 €/jour | Dès 6h travaillées en continu hors restauration sur site |
| Prime de transport | Variable (souvent 50 % Pass Navigo en IDF) | Trajet domicile-travail facturé par l'agent |
| Prime de salissure | 0,40 à 1,20 €/h | Selon nature du travail (vitrerie, décapage, bionettoyage) |
| Prime d'ancienneté | 3 % (4-7 ans), 5 % (7-15 ans), 7 % (15+ ans) | Calculée sur salaire de base |

Ces primes peuvent représenter **150 à 300 €/mois** par agent temps plein selon le mix.

## Majorations heures dans la convention propreté

### Heures complémentaires (temps partiel)
Pour les agents à temps partiel (60-70 % des effectifs dans le secteur) :

| Plage | Majoration |
| --- | --- |
| 1 à 8 premières heures au-delà du contrat | +10 % |
| Au-delà de 8 heures | +25 % |
| Limite légale | 1/3 de la durée contractuelle (sinon requalification temps plein) |

### Heures supplémentaires (temps plein)
Pour les agents à 35h/semaine :

| Plage | Majoration |
| --- | --- |
| 35h à 43h | +25 % |
| Au-delà de 43h | +50 % |
| Repos compensateur obligatoire | Au-delà du contingent annuel (220h par défaut) |

### Heures de nuit et dimanche
| Type | Majoration typique |
| --- | --- |
| Heures de nuit (21h-6h) | +20 à +50 % selon accord d'entreprise |
| Dimanche | +50 à +100 % selon accord |
| Jours fériés travaillés | +100 % + repos compensateur d'1 jour |

## Calcul d'un coût horaire chargé en 2026

Pour un agent AS1 (11,99 €/h brut) en 2026, le coût horaire chargé pour l'employeur se décompose :

| Poste | Montant /h |
| --- | --- |
| Salaire brut | 11,99 € |
| Charges patronales (~42 %) | 5,04 € |
| Congés payés (10 %) | 1,20 € |
| Primes (panier, transport, salissure) | 1,00 à 1,50 € |
| **Sous-total coût direct** | **~19 à 20 €** |
| Absentéisme moyen secteur (8-10 %) | 1,50 à 2,00 € |
| Encadrement (8-15 % masse salariale) | 1,00 à 2,00 € |
| **Coût horaire chargé complet** | **~21 à 23 €** |

Voir aussi : [méthode complète coût horaire chargé agent nettoyage 2026](/blog/cout-horaire-charge-agent-nettoyage) pour le détail.

## Évolution de la grille 2020-2026

La grille salariale propreté a connu une revalorisation continue depuis 2020, accélérée par l'inflation 2022-2023.

| Année | AS1 (€/h brut) | Évolution |
| --- | --- | --- |
| 2020 | 10,15 € | — |
| 2021 | 10,25 € | +1,0 % |
| 2022 | 10,57 € | +3,1 % |
| 2023 | 11,52 € | +9,0 % (rattrapage inflation) |
| 2024 | 11,72 € | +1,7 % |
| 2025 | 11,88 € | +1,4 % |
| 2026 | 11,99 € | +0,9 % |

L'évolution 2020-2026 représente **+18 %** sur 6 ans, principalement due au rattrapage 2023.

## Implications pour votre société de nettoyage

### 1. Recalculez vos coûts horaires chargés chaque janvier
La grille évolue annuellement. Sans mise à jour de votre coût horaire chargé, vos devis sortent automatiquement avec des marges sous-estimées de 2-3 % par an.

### 2. Vérifiez la conformité de vos fiches de paie
La grille s'applique en plancher. Vérifiez systématiquement que vos coefficients agents et leurs taux horaires sont à jour de l'accord 2026 — un audit URSSAF sur ce sujet peut coûter cher.

### 3. Reportez la hausse dans vos contrats clients
Vos contrats récurrents doivent intégrer une clause de révision annuelle indexée sur la convention IDCC 3043. Sans cette clause, l'augmentation de la grille rogne votre marge de 1-3 points chaque année.

### 4. Anticipez l'évolution des primes
Les primes représentent jusqu'à 15 % de la masse salariale. Une augmentation de la prime de transport (50 % du Pass Navigo qui augmente à chaque hausse SNCF/RATP) doit être anticipée dans vos coûts.

## Pour aller plus loin

- [Convention collective propreté IDCC 3043 : le guide complet 2026](/blog/convention-collective-nettoyage-idcc-3043) — analyse de l'article 7, primes détaillées, formation, pénibilité.
- [Calcul des heures agents nettoyage : méthode et coût 2026](/blog/calcul-heures-agents-nettoyage) — comment automatiser le calcul des heures et majorations.
- [Coût horaire chargé agent nettoyage 2026](/blog/cout-horaire-charge-agent-nettoyage) — la méthode complète pour calculer le vrai coût d'une heure d'agent.
- [Logiciel pointage GPS agents de nettoyage](/fonctionnalites/pointage-agents-nettoyage) — comment Proprely calcule automatiquement les majorations IDCC 3043 et prépare la paie en 2 clics.
- [Guide complet logiciel société de nettoyage 2026](/logiciel-societe-nettoyage) — la vue d'ensemble du cockpit Proprely.

Pour automatiser la conformité IDCC 3043 (calcul automatique des majorations, export paie Silae), [candidater à la bêta privée Proprely](/beta) — gratuit pendant la bêta, tarif fondateur à vie après.`,
  },
  {
    slug: 'kpi-societe-nettoyage-2026',
    title: "KPI société de nettoyage : 12 indicateurs à suivre en 2026",
    excerpt: "Les 12 KPI essentiels pour piloter une société de nettoyage B2B : marge par client, turnover, DSO, taux de signature devis, absentéisme. Tableau de bord type.",
    date: '7 juin 2026',
    dateModified: '7 juin 2026',
    readTime: '10 min',
    tag: 'Stratégie',
    tldr: "Les 12 KPI essentiels pour piloter une société de nettoyage B2B en 2026 se répartissent sur 4 axes : commercial (taux de signature devis, panier moyen, churn clients), RH (turnover, absentéisme, charge horaire), opérationnel (taux de respect planning, contestation clients, qualité), financier (marge brute par client, DSO, LTV). Suivre ces 12 indicateurs chaque mois fait la différence entre une société qui pilote et une société qui subit.",
    quickSummary: [
      "4 axes de KPI : commercial, RH, opérationnel, financier — 12 indicateurs principaux à suivre mensuellement.",
      "KPI le plus critique : marge brute par client en temps réel (8/10 dirigeants la découvrent en fin d'année avec 2 ans de retard).",
      "Turnover moyen secteur : 35 %/an. En dessous de 25 %, vous êtes structurellement plus rentable.",
      "DSO (Days Sales Outstanding) cible : <30 jours. Au-delà de 45 jours = problème de cash flow.",
      "Taux de signature devis cible : >40 %. En dessous = problème de qualification prospect ou prix mal positionné.",
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'fideliser-agents-nettoyage-turnover', 'cout-horaire-charge-agent-nettoyage'],
    faq: [
      { q: "Quels sont les KPI à suivre dans une société de nettoyage B2B ?", a: "Les 12 KPI essentiels se répartissent en 4 axes : commercial (taux signature devis, panier moyen contrat, churn clients), RH (turnover annuel, absentéisme, charge horaire moyenne), opérationnel (taux respect planning, taux contestation clients, taux qualité), financier (marge brute par client, DSO, lifetime value client, coût horaire chargé). À suivre mensuellement dans un tableau de bord unique." },
      { q: "Quel est le KPI le plus important pour une société de nettoyage ?", a: "La marge brute par client en temps réel. C'est l'indicateur qui révèle quels clients vous rapportent vraiment et lesquels plombent votre P&L. 8 dirigeants sur 10 le découvrent en fin d'année avec 12-24 mois de retard, ce qui les empêche de réagir. Le suivre en continu permet de renégocier ou sortir les contrats déficitaires avant qu'ils ne fassent perdre 6-12 mois de croissance." },
      { q: "Quel taux de turnover dans la propreté en 2026 ?", a: "Le taux de turnover moyen dans la propreté française est de ~35 %/an en 2026 (variant de 20 % chez les sociétés bien gérées à 50 %+ chez les mal gérées). Un agent qui part coûte typiquement 3 500 à 5 000 € entre recrutement, formation et perte de productivité initiale. Cible saine : <25 %/an. Au-delà de 40 %, la société est structurellement déficitaire sur le poste RH." },
      { q: "Comment calculer le DSO (Days Sales Outstanding) ?", a: "DSO = (créances clients TTC / chiffre d'affaires TTC) × nombre de jours de la période. Sur l'année : DSO = (créances totales / CA annuel TTC) × 365. Cible saine pour une PME nettoyage B2B : <30 jours. Au-delà de 45 jours, vous avez un problème de cash flow qui nécessite d'agir sur les relances et les conditions de paiement contractuelles." },
      { q: "Quel taux de signature devis viser ?", a: "Pour une société de nettoyage B2B bien positionnée, le taux de signature devis cible est >40 % (40 % des devis envoyés se transforment en contrats signés). En dessous de 30 %, il y a soit un problème de qualification prospect (vous chiffrez n'importe qui), soit un problème de pricing (trop cher ou trop bas suspect), soit un problème de relance (devis envoyé puis oublié). Avec un devis IA optimisé, le taux peut monter à 50-65 %." },
      { q: "Comment mesurer la qualité d'une prestation de nettoyage ?", a: "Trois KPI qualité à suivre : (1) Taux de respect planning = (interventions réalisées dans le créneau / interventions planifiées) × 100. Cible >95 % ; (2) Taux de contestation client = (contestations clients / interventions) × 100. Cible <2 % ; (3) Score satisfaction client (NPS ou enquête simple) — mesure mensuelle ou trimestrielle. La preuve de passage standardisée (QR + photos) divise typiquement les contestations par 5-10." },
      { q: "Quel absentéisme est acceptable dans la propreté ?", a: "Le taux d'absentéisme moyen secteur est de 8-10 % en 2026 (vs 4-5 % tous secteurs confondus). C'est lié à la pénibilité physique (TMS, chutes), à la précarité (temps partiels subis, multi-employeurs) et au turnover élevé. Cible saine : <7 %. Au-delà de 12 %, la rentabilité est structurellement attaquée — chaque point d'absentéisme ajoute 1,50 à 2,50 € au coût horaire chargé." },
      { q: "Comment calculer la LTV (lifetime value) d'un client ?", a: "LTV client = marge brute mensuelle moyenne × durée moyenne de rétention en mois. Exemple : un client qui rapporte 800 € de marge brute mensuelle et reste 36 mois en moyenne → LTV = 28 800 €. Cette donnée permet de calibrer combien investir en acquisition (CAC < LTV/3 typiquement). Pour la propreté B2B, la LTV cible est généralement entre 15 000 € et 50 000 € selon le segment (TPE clients vs grands comptes)." },
    ],
    content: `## Pourquoi 8 dirigeants sur 10 pilotent à l'aveugle

La majorité des sociétés de nettoyage B2B en France gèrent leur activité sans tableau de bord chiffré. Le dirigeant connaît son CA mensuel, parfois sa marge brute annuelle, et c'est tout. Conséquence : les décisions importantes (sortir un client déficitaire, augmenter les prix, embaucher) se prennent à l'intuition, avec souvent 6-18 mois de retard.

Les sociétés qui pilotent leurs **12 KPI essentiels chaque mois** prennent les bonnes décisions plus tôt — c'est mécaniquement la différence entre 12 % de croissance annuelle et 30 % de croissance annuelle, à effectif égal.

## Les 4 axes de pilotage d'une société de nettoyage

| Axe | KPI principaux | Fréquence de suivi |
| --- | --- | --- |
| Commercial | Taux signature devis, panier moyen, churn clients | Mensuelle |
| RH | Turnover, absentéisme, charge horaire moyenne | Mensuelle |
| Opérationnel | Respect planning, contestations, qualité | Hebdomadaire |
| Financier | Marge par client, DSO, LTV, coût horaire chargé | Mensuelle |

## Axe 1 — KPI commercial

### KPI 1. Taux de signature devis
**Formule** : (Devis signés sur la période / Devis envoyés sur la période) × 100

| Performance | Taux |
| --- | --- |
| Excellent | >50 % |
| Bon | 40 à 50 % |
| Acceptable | 30 à 40 % |
| Préoccupant | <30 % |

Un taux <30 % signale généralement : prospects mal qualifiés, prix mal positionné, ou processus de relance défaillant. Un module de devis IA peut faire passer ce taux de 30-40 % à 45-65 % en croisant les bons signaux.

### KPI 2. Panier moyen par contrat
**Formule** : CA total des contrats signés sur la période / Nombre de contrats signés sur la période

| Segment client | Panier moyen indicatif 2026 |
| --- | --- |
| Bureaux tertiaires (TPE 1-3 sites) | 400-1 500 €/mois |
| Bureaux tertiaires (PME multi-sites) | 1 500-5 000 €/mois |
| Copropriétés syndic | 300-900 €/mois |
| Hôtellerie (15-50 chambres) | 2 000-6 000 €/mois |
| Cabinets médicaux | 600-2 000 €/mois |
| Bionettoyage médical | 3 000-15 000 €/mois |

Augmenter le panier moyen est souvent plus rentable que prospecter de nouveaux clients (CAC plus faible, LTV plus élevée).

### KPI 3. Taux de churn clients
**Formule** : (Clients perdus sur la période / Clients début de période) × 100

| Performance | Taux annuel |
| --- | --- |
| Excellent | <5 % |
| Bon | 5 à 10 % |
| Acceptable | 10 à 15 % |
| Préoccupant | >15 % |

Le churn dans la propreté est généralement lié soit à un défaut qualité (preuve de passage défaillante, contestation non gérée), soit à un prix sous-tarifé renégocié au renouvellement. Suivre cet indicateur révèle les patterns.

## Axe 2 — KPI RH

### KPI 4. Taux de turnover annuel
**Formule** : (Départs sur l'année / Effectif moyen) × 100

| Performance | Taux |
| --- | --- |
| Excellent | <20 % |
| Bon | 20 à 25 % |
| Moyen secteur | 30 à 40 % |
| Préoccupant | >40 % |

Le turnover coûte 3 500 à 5 000 € par départ (recrutement, formation, perte de productivité initiale, surcharge des agents restants). Une société à 40 % de turnover sur 15 agents perd 24 000 à 36 000 €/an juste sur ce poste. Voir [6 leviers concrets pour réduire le turnover](/blog/fideliser-agents-nettoyage-turnover).

### KPI 5. Taux d'absentéisme
**Formule** : (Heures d'absence / Heures théoriques travaillées) × 100

| Performance | Taux |
| --- | --- |
| Excellent | <5 % |
| Bon | 5 à 7 % |
| Moyen secteur | 8 à 10 % |
| Préoccupant | >12 % |

Chaque point d'absentéisme ajoute 1,50 à 2,50 €/h au coût horaire chargé (remplacements, maintien de salaire, désorganisation). À 10 % d'absentéisme, c'est 15-25 € par jour par agent absent qui rogne votre marge.

### KPI 6. Charge horaire moyenne par agent
**Formule** : Heures réalisées / Heures contractuelles × 100

| Performance | Ratio |
| --- | --- |
| Optimal | 95 à 105 % |
| Sous-charge | <90 % (gaspillage masse salariale) |
| Surcharge | >110 % (risque burn-out, départs) |

Le pilotage de la charge horaire prévient les départs : un agent à 130 % de sa charge contractuelle pendant 3 mois consécutifs démissionne dans 70 % des cas. Une alerte automatique sur 110 % protège votre équipe.

## Axe 3 — KPI opérationnel

### KPI 7. Taux de respect planning
**Formule** : (Interventions réalisées dans le créneau / Interventions planifiées) × 100

| Performance | Taux |
| --- | --- |
| Excellent | >97 % |
| Bon | 95 à 97 % |
| Acceptable | 90 à 95 % |
| Préoccupant | <90 % |

En dessous de 95 %, vous perdez des clients par retards/oublis. Au-dessus de 97 %, vous avez probablement un planning sur-dimensionné (gaspillage masse salariale).

### KPI 8. Taux de contestation client
**Formule** : (Contestations clients / Interventions facturées) × 100

| Performance | Taux |
| --- | --- |
| Excellent | <1 % |
| Bon | 1 à 2 % |
| Acceptable | 2 à 4 % |
| Préoccupant | >4 % |

La preuve de passage standardisée (QR + photos avant-après + signature) divise typiquement ce taux par 5 à 10. Voir [logiciel preuve de passage nettoyage](/fonctionnalites/preuve-passage-nettoyage).

### KPI 9. Score qualité (NPS ou enquête)
Mesure de la satisfaction client via NPS (Net Promoter Score) ou enquête mensuelle simple. NPS cible pour une société propreté B2B : >40. Au-dessous de 20, le risque de churn explose dans les 6-12 mois.

## Axe 4 — KPI financier

### KPI 10. Marge brute par client (TEMPS RÉEL)
**Formule** : (CA contrat - Coût horaire chargé × Heures réelles passées sur le contrat) / CA contrat × 100

**LE KPI le plus important.** Sans cette donnée, vous facturez à l'aveugle et découvrez les contrats déficitaires en fin d'exercice.

| Performance | Marge brute |
| --- | --- |
| Excellent | >35 % |
| Bon | 25 à 35 % |
| Acceptable | 18 à 25 % |
| Préoccupant | <18 % |

Tout contrat en dessous de 18 % de marge brute doit être renégocié dans les 90 jours, ou sorti.

### KPI 11. DSO (Days Sales Outstanding)
**Formule** : (Créances clients TTC / CA TTC) × 365

| Performance | Jours |
| --- | --- |
| Excellent | <25 jours |
| Bon | 25 à 30 jours |
| Acceptable | 30 à 45 jours |
| Préoccupant | >45 jours |

Un DSO >45 jours = problème de cash flow latent. À corriger par : relances structurées automatiques (J+15, J+30), conditions de paiement plus strictes dans les nouveaux contrats, escompte 1-2 % pour paiement à 8 jours.

### KPI 12. LTV (Lifetime Value) client
**Formule** : Marge brute mensuelle moyenne × Durée moyenne de rétention en mois

| Segment | LTV indicative |
| --- | --- |
| Petit client TPE (1-2 sites, panier 500 €) | 5 000 à 15 000 € |
| Client PME (3-10 sites, panier 2 000 €) | 30 000 à 80 000 € |
| Grand compte (facility manager, syndic national) | 100 000 € à 500 000 €+ |

La LTV calibre le budget d'acquisition : règle générale, CAC (Coût d'Acquisition Client) < LTV / 3. Pour un client PME à 60 000 € de LTV, vous pouvez dépenser jusqu'à 20 000 € en acquisition (commercial, marketing) et rester rentable.

## Tableau de bord type — récapitulatif 12 KPI

| KPI | Cible | Fréquence |
| --- | --- | --- |
| Taux signature devis | >40 % | Mensuelle |
| Panier moyen contrat | Selon segment | Mensuelle |
| Churn clients | <10 %/an | Trimestrielle |
| Turnover agents | <25 %/an | Trimestrielle |
| Absentéisme | <7 % | Mensuelle |
| Charge horaire moyenne | 95-105 % | Hebdomadaire |
| Respect planning | >95 % | Hebdomadaire |
| Contestations clients | <2 % | Mensuelle |
| Score qualité (NPS) | >40 | Trimestrielle |
| Marge brute par client | >25 % | Mensuelle |
| DSO | <30 jours | Mensuelle |
| LTV client | Selon segment | Trimestrielle |

## Comment automatiser ce pilotage

Suivre ces 12 KPI manuellement sur Excel demande typiquement 4-6 heures par mois — temps qui ne crée aucune valeur. Un cockpit unifié calcule ces KPI en temps réel à partir de vos données opérationnelles (planning, pointage, contrats, factures).

[Proprely](/logiciel-societe-nettoyage) affiche nativement sur le dashboard d'accueil : marge par client en temps réel, charge horaire par agent, taux de respect planning, alertes absentéisme et surmenage. Pour les KPI commerciaux (taux signature devis, panier moyen) et financiers (DSO, LTV), le cockpit pousse les données vers vos outils complémentaires (Pennylane, Tiime, Excel d'analyse).

## Pour aller plus loin

- [Fixer ses prix dans le nettoyage : méthode 2026](/blog/fixer-prix-nettoyage) — pour optimiser le KPI marge brute.
- [Coût horaire chargé agent nettoyage 2026](/blog/cout-horaire-charge-agent-nettoyage) — l'input clé du KPI marge.
- [Réduire l'absentéisme agents nettoyage](/blog/reduire-absenteisme-agents-nettoyage) — 5 leviers concrets pour le KPI absentéisme.
- [Fidéliser les agents : 6 leviers anti-turnover](/blog/fideliser-agents-nettoyage-turnover) — pour piloter le KPI turnover.
- [Logiciel suivi interventions nettoyage](/fonctionnalites/suivi-interventions-nettoyage) — pour le KPI respect planning.
- [Guide complet logiciel société de nettoyage 2026](/logiciel-societe-nettoyage) — vue d'ensemble du cockpit.

Pour piloter ces 12 KPI en temps réel sans Excel, [candidater à la bêta privée Proprely](/beta) — gratuit pendant la bêta, tarif fondateur à vie après.`,
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
  'logiciel-planning-nettoyage-2026':
    "Pour une entreprise de nettoyage B2B en France en 2026, le top 7 des logiciels métier avec gestion des plannings recommandés est : Proprely (TPE/PME 3-50 agents, recommandé), PROPRET et Progiclean (PME/ETI 50+ agents avec besoins paie/GED), Sevensoft Propreté et Maglia (ETI multi-établissements), Organilog (multi-métiers BTP/sécurité/nettoyage), Synchroteam (field service avec géolocalisation). Le critère décisif : pouvoir réaffecter un agent absent en moins de 10 secondes. Proprely se distingue par son planning drag-and-drop, son accès agent via simple lien web sans app à installer, ses spécialités propreté natives et sa bêta privée gratuite.",
  'ia-nettoyage-b2b-transformations-2026':
    "L'IA arrive dans le nettoyage B2B avec 4 transformations en cours en 2026 : tarification dynamique des devis (croisement de 9 facteurs), affectation prédictive des agents, détection précoce du turnover (4 à 8 semaines avant la démission), optimisation des tournées multi-sites. Le secteur est particulièrement propice à l'IA grâce à la répétitivité des opérations, la richesse des données terrain et la pression sur les marges. Les premières sociétés qui s'équipent en 2026 gagnent 2 à 3 ans d'avance.",
  'devis-nettoyage-intelligent-ia':
    "Proprely propose le premier module de devis intelligent par IA pour société de nettoyage en France. L'algorithme croise 9 facteurs en temps réel : prix marché local, disponibilités calendrier, avis et crédibilité prestataire, profil client estimé, consommables, location machines, masse salariale chargée, frais de structure, budget marketing. Trois scénarios sont générés à chaque devis (marge protégée, gagner le contrat, upsell maximisé), avec détection automatique des opportunités d'upsell. Disponible gratuitement dans la bêta privée Proprely.",
  'comparatif-logiciels-nettoyage-2026':
    "Pour choisir un logiciel métier société de nettoyage en 2026, partez de votre taille et de votre besoin opérationnel. Pour une TPE/PME B2B de 3 à 50 agents recherchant un cockpit unifié avec planning, facturation automatisée et preuve de passage : Proprely est recommandé (gratuit en bêta, conçu en France). Pour un volume important (50+ agents) : PROPRET ou Progiclean. Pour du multi-métier (BTP + nettoyage + sécurité) : Organilog. Pour la facturation pure sans le métier : Henrri ou Bizyness (mais sans gestion planning ni preuve de passage). Sevensoft et Maglia visent les ETI propreté avec un setup long.",
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
  'societe-nettoyage-lyon':
    "Lyon est le 2e marché français du nettoyage B2B après l'Île-de-France. 4 secteurs porteurs : tertiaire Part-Dieu/Confluence, pôle santé HCL, biotech Gerland (Sanofi, BioMérieux), hôtellerie presqu'île. Prix marché bureaux : 12-18 €/m²/an HT (~10-15 % en dessous de Paris). Pour se différencier : spécialisation médicale ou biotech, ou focus géographique sur une zone (Croix-Rousse, Brotteaux, Confluence).",
  'societe-nettoyage-marseille':
    "Marseille est le 3e marché propreté B2B français, porté par Euroméditerranée (tertiaire moderne en expansion), l'hôtellerie saisonnière (mai-octobre), les copropriétés bord de mer (Corniche, 7e/8e arr.), le port Marseille-Fos et le pôle santé AP-HM. Prix marché bureaux : 10-15 €/m²/an HT (~20 % en dessous de Paris). Spécificité : saisonnalité forte qui double la demande hôtelière.",
  'societe-nettoyage-toulouse':
    "Toulouse est portée par 3 piliers : aérospatial (Airbus et supply chain — exigences ESD et salles propres, tarif majoré 30-50 %), médical (CHU, Oncopole), tertiaire en croissance avec la démographie (+10 000 hab/an). Prix marché bureaux : 11-15 €/m²/an HT (~15 % en dessous de Paris). Géographie étalée Compans-Blagnac-Labège-Cancéropôle exige une optimisation rigoureuse des tournées.",
  'societe-nettoyage-lille':
    "Lille concentre les sièges régionaux du tissu industriel des Hauts-de-France : Auchan, Decathlon, Boulanger, Castorama (groupe Mulliez), OVHcloud, Bonduelle. Métropole étalée Lille-Roubaix-Tourcoing-Villeneuve d'Ascq (~30-50 km de transit potentiel/jour). Prix marché bureaux : 11-14 €/m²/an HT (~20 % en dessous de Paris). Proximité Belgique = opportunités cross-border mais réglementation distincte.",
  'societe-nettoyage-nantes':
    "Nantes est une métropole en forte croissance démographique (+5 000 hab/an). 4 piliers : tertiaire Île de Nantes / Euronantes (en expansion forte), CHU et ICO (médical), agroalimentaire (LDC), enseignement supérieur (60 000 étudiants). Prix marché bureaux : 11-15 €/m²/an HT (~15 % en dessous de Paris). Marché mature mais en expansion, concurrence raisonnable vs Lyon ou Paris.",
}

// Refraîchissement de dateModified pour les articles "Discovered – currently
// not indexed" dans Google Search Console. Légitime : ces articles ont reçu
// du maillage interne, des TL;DR et des schemas enrichis dans les sprints
// SEO récents. Signal de fraîcheur pour forcer un nouveau crawl.
//
// Format ISO YYYY-MM-DD (le sitemap utilise ce format).
const POST_DATE_MODIFIED: Record<string, string> = {
  'calcul-heures-agents-nettoyage': '21 mai 2026',
  'fideliser-agents-nettoyage-turnover': '21 mai 2026',
  'fixer-prix-nettoyage': '21 mai 2026',
  'gestion-societe-nettoyage-outils': '21 mai 2026',
  'logiciel-societe-nettoyage-criteres': '21 mai 2026',
  'rgpd-societe-nettoyage-2026': '21 mai 2026',
  'comparatif-logiciels-nettoyage-2026': '3 juin 2026',
}

export function getPost(slug: string): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug)
  if (!post) return undefined
  const dateModified = POST_DATE_MODIFIED[slug]
  const tldr = post.tldr ?? POST_TLDR[slug]
  if (!tldr && !dateModified) return post
  return {
    ...post,
    tldr: post.tldr ?? tldr,
    dateModified: post.dateModified ?? dateModified,
  }
}

export function getRelatedPosts(slug: string, max = 2): BlogPost[] {
  const post = getPost(slug)
  if (post?.relatedSlugs?.length) {
    return post.relatedSlugs.map((s) => getPost(s)).filter((p): p is BlogPost => Boolean(p)).slice(0, max)
  }
  return posts.filter((p) => p.slug !== slug).slice(0, max)
}
