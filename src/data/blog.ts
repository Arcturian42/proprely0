export type BlogFAQ = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tag: string
  content: string
  quickSummary: string[]
  faq?: BlogFAQ[]
  relatedSlugs?: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'modele-planning-hebdomadaire-entreprise-proprete',
    title: "Modèle de planning hebdomadaire pour une entreprise de propreté (à télécharger gratuitement)",
    excerpt: "Un modèle gratuit prêt à l'emploi, avec exemples, formules, récap heures et marges par site. Plus les 5 sections que doit avoir un planning de société de nettoyage, et ses limites quand vous dépassez 5 agents.",
    date: '19 mai 2026',
    readTime: '6 min',
    tag: 'Outils',
    quickSummary: [
      "Un planning hebdomadaire mal structuré fait perdre 6 à 10 heures par semaine en clarifications et oublis.",
      "Un bon modèle comporte 5 sections : planning agent×jour, récap heures, récap site, remplacements, notes.",
      "Modèle CSV gratuit à télécharger, compatible Excel et Google Sheets, avec exemples et formules.",
      "Au-delà de 5-6 agents, Excel atteint ses limites : pas de mobile, pas de preuve de passage, pas de marge temps réel.",
    ],
    faq: [
      { q: "Quel est le meilleur format pour un planning hebdomadaire de société de nettoyage ?", a: "Un format structuré en 5 sections : (1) planning agent par jour, (2) récap heures par agent avec alerte surmenage, (3) récap par site avec marge brute, (4) tracé des remplacements, (5) notes libres. Le format peut être CSV/Excel pour démarrer, puis cockpit métier au-delà de 5-6 agents." },
      { q: "Faut-il un planning hebdomadaire ou mensuel ?", a: "Hebdomadaire pour le pilotage opérationnel (qui fait quoi cette semaine), mensuel pour le récap et la paie. Les deux se déduisent du même tableau si la structure est propre." },
      { q: "Combien de temps prend la mise à jour d'un planning hebdomadaire ?", a: "Sur un modèle Excel propre, comptez 30-45 min par semaine pour 5-10 agents. Au-delà, le temps explose (3-5h pour 20 agents) car la mise à jour cross-références devient ingérable manuellement." },
      { q: "Peut-on partager le planning Excel avec ses agents ?", a: "Oui, via lien partagé OneDrive ou Google Sheets. Limite : pas de notifications, pas de version mobile optimisée, pas de gestion des droits par agent (un agent voit tout ou rien). Un cockpit métier règle ces 3 limites." },
      { q: "Quand passer d'un planning Excel à un logiciel métier ?", a: "Trois signaux : (1) vous dépassez 5-6 agents ou 8-10 sites, (2) un client conteste un passage sans que vous puissiez prouver, (3) vous découvrez le burn-out d'un agent le jour où il démissionne. Si l'un de ces signaux apparaît, le coût d'un cockpit devient inférieur au coût caché d'Excel." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'calcul-heures-agents-nettoyage', 'gestion-societe-nettoyage-outils'],
    content: `## Pourquoi un planning hebdomadaire structuré change tout

Si vous gérez une société de nettoyage entre 3 et 30 agents, le planning hebdomadaire est votre outil le plus utilisé de la semaine. Mal structuré, il génère 6 à 10 heures perdues par semaine en clarifications, appels, oublis, doubles-bookings, remplacements ratés. Bien structuré, il devient le **point de vérité unique** pour vous, vos agents et vos clients.

Nous avons compilé les meilleures pratiques de 60 dirigeants de sociétés de nettoyage en France dans un modèle gratuit, prêt à l'emploi, compatible Excel et Google Sheets.

**[Télécharger le modèle de planning hebdomadaire (CSV gratuit)](/templates/planning-hebdomadaire-entreprise-proprete.csv)**

Le fichier est en CSV avec encodage UTF-8 et BOM, il s'ouvre directement dans Excel (Microsoft 365 ou Office), LibreOffice et Google Sheets sans manipulation. Aucune inscription demandée, aucun email à renseigner.

## Les 5 sections que doit avoir un bon planning hebdomadaire

### Section 1 : Planning agent par jour

C'est le cœur du planning : qui fait quoi, où, quand. Une ligne par agent, une colonne par jour de la semaine (lundi à dimanche), et dans chaque case le site + les horaires.

**À éviter** : se contenter d'écrire "Atrium" dans la case. **À privilégier** : "Atrium Tour A · 06h-10h". La précision horaire est ce qui permet de détecter les chevauchements et de communiquer aux clients sans ambiguïté.

Le total d'heures de la semaine se calcule en bout de ligne, soit à la main, soit avec une formule \`=SOMME(...)\` adaptée. Le modèle joint le pré-calcule pour 10 agents.

### Section 2 : Récapitulatif heures par agent

Cette section consolide les heures de chaque agent sur le mois en cours :

- Heures contractuelles (151,67 par défaut pour un temps plein)
- Heures réalisées (somme des 4 semaines)
- Écart (alerte si supérieur à +20%)
- Drapeau surmenage (seuil par défaut : 145h/mois)

C'est ce qui vous permet de **détecter le surmenage avant le burn-out**. Un agent qui dépasse 145h pendant 2 semaines consécutives est un agent qui craque dans 3 à 6 semaines. Coût d'un départ : 3 500 à 5 000 €.

### Section 3 : Récapitulatif par site

Une ligne par site avec : nom du site, client, fréquence contractuelle, heures prévues, heures réalisées, écart, **marge brute estimée**.

La marge brute est la donnée la plus stratégique du planning : c'est ce qui vous dit quel client tire votre rentabilité vers le bas. Un site qui passe de 32% à 18% de marge en 3 mois doit déclencher une renégociation immédiate.

### Section 4 : Remplacements et changements

Un agent absent à 6h du matin ? Vous le tracez ici : date, agent absent, site concerné, remplaçant retenu, heures, qui a validé, notes.

Pourquoi c'est crucial : (1) traçabilité légale (paie, contestation), (2) climat social (éviter de toujours appeler le même remplaçant par culpabilité), (3) optimisation (identifier les sites les plus difficiles à remplacer pour anticiper).

### Section 5 : Notes et points d'attention

Espace libre pour : les congés en cours, les alertes client à anticiper, les arrivées de nouveaux agents, les fins de contrat. C'est ici que vous formalisez tout ce qui ne rentre pas dans les colonnes mais qui pèse sur la semaine.

## Comment utiliser le modèle

1. **Vendredi 18h** : remplissez Section 1 pour la semaine suivante (planning agent × jour)
2. **Dimanche soir** : communiquez le planning aux agents (par lien Google Sheets ou par email)
3. **Lundi matin** : mettez à jour Section 4 si un agent signale une absence dans la nuit
4. **Vendredi 17h** : vérifiez Section 2 pour les alertes surmenage de la semaine
5. **Fin de mois** : actualisez Section 3 (marge par site) pour identifier les clients déficitaires

Ce rituel hebdomadaire prend **30 à 45 minutes** sur un modèle propre, et il économise les 6 à 10 heures perdues en frictions diverses.

## Les limites d'un planning Excel

Un modèle Excel bien construit emmène une société de nettoyage jusqu'à environ 5-6 agents. Au-delà, cinq limites apparaissent :

**1. Pas de mobile pour les agents**
Vos agents ne sont pas devant un ordinateur. Ils sont en sous-sol, dans le métro, sur un chantier. Un planning Excel demande soit une impression papier (perdue dès le mardi), soit un screenshot WhatsApp (mis à jour 4 fois par semaine), soit un partage Google Sheets qui demande un compte Google et une connexion stable.

**2. Aucune preuve de passage**
L'agent est-il bien passé ? À quelle heure ? Avec quels produits ? Sans QR code, photos horodatées et signature client, vous êtes vulnérable à la première contestation. La preuve de passage est devenue critère éliminatoire pour la quasi-totalité des appels d'offres en 2026.

**3. Calcul manuel des heures**
Le 22 du mois, vous comptez ligne par ligne. Erreurs régulières, contestations à la paie, 3-4 heures perdues mensuellement. Soit **2 400 à 3 600 € par an** de temps dirigeant brûlé.

**4. Aucune alerte automatique de surmenage**
Sur Excel, l'alerte surmenage demande une vérification visuelle hebdomadaire. Sur 15 agents, l'œil saute des cellules, le surmenage est détecté le jour de l'arrêt maladie. Trop tard.

**5. Pas de pilotage marge en temps réel**
La marge par client se calcule en fin de trimestre, parfois jamais. Vous découvrez qu'un client est déficitaire 3 mois après que le problème ait commencé.

## Quand passer à un cockpit métier

Trois signaux indiquent que votre planning Excel a atteint sa limite :

- Vous dépassez **5-6 agents** ou **8-10 sites**
- Un client a déjà contesté un passage sans que vous puissiez **prouver**
- Vous avez découvert le **burn-out** d'un agent le jour de sa démission

Si l'un de ces signaux apparaît, le coût d'opportunité d'un cockpit métier devient largement inférieur au coût caché d'Excel.

[Proprely](/) est conçu exactement pour cette transition : la mise en route prend 30 minutes avec le fondateur, c'est gratuit pendant la bêta privée, et vos données restent exportables en CSV à tout moment. Vous gardez votre modèle Excel ouvert en parallèle si vous voulez, le temps de vérifier que le cockpit tient ses promesses.

## Bonus : la check-list du planning prêt à l'emploi

Avant de commencer à remplir le modèle, vérifiez que vous avez :

- La liste à jour de vos agents avec leurs spécialités
- Le tableau de vos clients et sites avec les fréquences contractuelles
- Vos coûts horaires chargés par agent (pour la section marge)
- Les contraintes horaires de chaque site (avant 6h, après 21h, week-end)

Si l'un de ces éléments manque, prenez 1 heure pour les rassembler avant de toucher au planning. Un planning construit sur des données incomplètes est pire qu'un planning manquant.

**[Télécharger le modèle de planning hebdomadaire (CSV gratuit)](/templates/planning-hebdomadaire-entreprise-proprete.csv)**`,
  },
  {
    slug: 'comment-faire-devis-nettoyage-bureaux',
    title: "Comment faire un devis de nettoyage pour des bureaux : méthode complète + exemple chiffré",
    excerpt: "Les 6 sections obligatoires d'un devis bureaux, la méthode de chiffrage pas à pas, et un exemple complet pour 800 m² nettoyés 5 fois par semaine. Plus les 5 erreurs qui plombent votre conversion.",
    date: '17 mai 2026',
    readTime: '9 min',
    tag: 'Commercial',
    quickSummary: [
      "Un devis de nettoyage bureaux structuré contient 6 sections : en-tête, périmètre, prestations, fréquences, prix HT, conditions.",
      "Méthode de chiffrage en 4 étapes : ratio de productivité m²/h, heures totales, coût horaire chargé, prix de vente × 3.",
      "Exemple chiffré : 800 m² bureaux nettoyés 5x/sem = environ 1 600 €/mois HT, marge brute 30%.",
      "5 erreurs typiques : devis copié-collé, oubli des prestations ponctuelles, prix au m² fixe, pas de signature électronique, pas de relance.",
    ],
    faq: [
      { q: "Combien facturer pour le nettoyage de 100 m² de bureaux ?", a: "À titre indicatif, 0,20 à 0,35 €/m²/passage pour des bureaux standards en quotidien (5x/semaine), soit environ 200 à 350 € par mois pour 100 m². La fourchette dépend du ratio de productivité de vos agents, du coût horaire local et de l'accessibilité du site." },
      { q: "Quel est le multiplicateur prix / coût horaire dans le nettoyage de bureaux ?", a: "La règle des 3× s'applique : prix de vente horaire = 3 × coût horaire chargé. Fourchette saine : 2,8 à 3,2. Moins, vous travaillez à perte. Plus, vous êtes hors marché sur du bureau standard." },
      { q: "Quel ratio de productivité retenir pour les bureaux ?", a: "200 à 300 m²/h pour des bureaux standards (open-space, salles de réunion, dégagements). Plus bas (150-200) pour des bureaux avec beaucoup de mobilier, sanitaires lourds, ou contraintes d'accès. Plus haut (300-400) sur des plateaux ouverts simples." },
      { q: "Faut-il facturer les sanitaires à part dans un devis bureaux ?", a: "Pas obligatoire mais recommandé : les sanitaires consomment 2 à 3 fois plus de temps au m² que les bureaux standards. Les détacher dans le devis vous protège si le client renégocie le périmètre, et justifie un prix supérieur si la surface sanitaires augmente." },
      { q: "Comment justifier un devis bureaux 20% au-dessus du concurrent ?", a: "Détaillez : le ratio de productivité tenu (vs un concurrent qui sur-estime), les produits certifiés écolabel (vs grand public), la preuve de passage native (QR + photos + signature), les engagements de remplacement (sous 2h ouvrées vs WhatsApp aléatoire), le contrôle qualité documenté. Le client se convainc lui-même." },
      { q: "Quel délai de validité mettre sur un devis de nettoyage bureaux ?", a: "30 jours est standard. En-dessous (15 jours), vous pressez le client. Au-dessus (60-90 jours), vous vous exposez à l'inflation des charges sociales et matières. 30 jours permet aussi de re-prospecter naturellement si pas de réponse." },
    ],
    relatedSlugs: ['fixer-prix-nettoyage', 'logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils'],
    content: `## Pourquoi un devis bureaux mal structuré vous fait perdre l'affaire

Vous recevez une demande de devis pour 800 m² de bureaux nettoyés 5 fois par semaine. Vous ouvrez un ancien devis, vous changez les références, vous bidouillez le prix au feeling, vous envoyez par email 20 minutes plus tard. Le client reçoit 4 propositions. La plus structurée gagne, même si elle est 15% plus chère.

C'est exactement ce qui se joue à chaque demande de devis bureaux. Voici la méthode complète pour gagner.

## Les 6 sections obligatoires d'un devis bureaux

### Section 1 : En-tête

C'est ce que le client voit en premier. Doit contenir :

- Logo et raison sociale du prestataire
- Numéro SIRET, code NAF (généralement 8121Z), numéro TVA intracommunautaire
- Coordonnées complètes (adresse, téléphone, email)
- Numéro de devis unique, date d'émission, validité (30 jours standard)
- Coordonnées du client (raison sociale, adresse, contact)

Un devis sans numéro unique et sans validité paraît bricolé. Le client doute avant même de lire le prix.

### Section 2 : Périmètre

Le périmètre, c'est la photographie exacte de ce qui sera nettoyé :

- Adresse complète du site
- Surface totale en m², détaillée par zone
- Type de revêtements (moquette, vinyle, parquet, carrelage)
- Plages horaires autorisées (avant 6h, après 18h, week-end)
- Contraintes d'accès (badge, alarme, gardien)

Ce qui n'est pas dans le périmètre n'est pas dans le prix. C'est la base de toute discussion ultérieure sur les avenants.

### Section 3 : Prestations détaillées

C'est ici que vous valorisez votre savoir-faire. Chaque prestation décrite avec :

- Nom de la prestation (ex : "Aspiration et lavage des sols durs")
- Fréquence (5x/semaine, 1x/semaine, 1x/mois, ponctuel)
- Zone concernée
- Produits utilisés (écolabel, allergènes, marques)
- Méthode (mono-brosse, micro-fibre, vapeur)

Plus c'est détaillé, plus le client peut comparer objectivement. Et plus vous justifiez un prix premium.

### Section 4 : Fréquences

Tableau récapitulatif des fréquences par prestation. Modèle simple :

| Prestation | Quotidien | Hebdomadaire | Mensuel | Trimestriel |
|---|---|---|---|---|
| Aspiration sols | ✓ | | | |
| Lavage sols | ✓ | | | |
| Sanitaires complet | ✓ | | | |
| Vitres intérieures | | | ✓ | |
| Vitres extérieures | | | | ✓ |
| Détartrage sanitaires | | ✓ | | |

Un tableau évite les ambiguïtés et facilite la comparaison entre prestataires.

### Section 5 : Prix HT

Trois lignes minimum :

- Forfait mensuel HT
- Décomposition (heures × taux horaire OU forfait par prestation)
- Prestations ponctuelles à la carte (vitrerie hauteur, décapage, remise en état)

Évitez de présenter un prix unique sans décomposition. Le client ne saura pas où négocier et il négociera donc partout — ou partira chez le concurrent qui aura détaillé.

### Section 6 : Conditions

Toute la partie contractuelle :

- Durée du contrat (généralement 12 mois reconductible tacitement)
- Conditions de révision du prix (typiquement indexée IDCC propreté, révision annuelle automatique)
- Modalités de remplacement (sous 2h ouvrées par exemple)
- Conditions de résiliation (préavis 1 à 3 mois)
- Modalités de paiement (30 jours fin de mois, virement)
- Conditions générales (souvent en annexe ou via lien)
- Espace signature (idéalement signature électronique)

## La méthode de chiffrage en 4 étapes

### Étape 1 : Le ratio de productivité

Pour des bureaux standards en quotidien :

- **Bureaux open-space, dégagements, salles de réunion** : 200 à 300 m²/h
- **Sanitaires** : 50 à 100 m²/h (plus complexe, plus de temps)
- **Cuisine office / espace cafétéria** : 80 à 150 m²/h
- **Hall d'accueil, escaliers** : 100 à 200 m²/h

Calibrez ces ratios sur vos données réelles. Un ratio fantaisiste, c'est une perte assurée sur 12 mois.

### Étape 2 : Heures totales par passage

Sur notre exemple de 800 m² de bureaux :

- 600 m² bureaux standards à 250 m²/h = 2,4 h
- 100 m² sanitaires à 75 m²/h = 1,3 h
- 100 m² circulations à 150 m²/h = 0,7 h

**Total : 4,4 heures par passage**

Sur 5 passages par semaine, soit 22 heures par semaine. Sur le mois (4,33 semaines), environ **95 heures de prestation mensuelle**.

### Étape 3 : Coût horaire chargé

Pour un agent au SMIC 2026, comptez environ **18 à 20 €** de coût horaire chargé (salaire brut + charges patronales + congés payés + paniers + mutuelle).

Sur l'exemple, le coût direct mensuel est donc : 95 h × 19 € = **1 805 € de coût direct**.

### Étape 4 : Prix de vente

Application de la règle des 3× :

- Prix de vente horaire = 3 × 19 € = **57 € HT/h**
- Forfait mensuel = 95 h × 57 € = **5 415 € HT/mois**

Cette fourchette est cohérente avec un site premium (cabinet d'avocats, siège société). Pour des bureaux standards plus exposés à la concurrence, le ratio peut descendre à 2,8 ou 2,9, soit environ **5 000 à 5 200 € HT/mois**.

Marge brute estimée : 30 à 35%.

## Les 5 erreurs typiques à éviter

### Erreur 1 : Le devis copié-collé sans recalcul

C'est la fuite de marge la plus fréquente. Vous prenez un ancien devis, vous changez les références client et les surfaces, vous ne touchez pas au prix horaire. Résultat : vous facturez en 2026 sur des coûts horaires 2022. Perdez 5 à 10 points de marge par an.

**Le bon réflexe** : recalculez systématiquement le coût horaire chargé en fonction de votre grille interne actualisée. Mettez à jour vos grilles tous les 6 mois.

### Erreur 2 : L'oubli des prestations ponctuelles

Vous chiffrez le quotidien, vous oubliez les vitres mensuelles, le décapage annuel, le shampouinage moquette. Le client demande ces prestations en cours d'année, vous les facturez "au coup par coup" sans grille tarifaire claire.

**Le bon réflexe** : intégrez systématiquement une grille de prestations ponctuelles dans le devis initial. Même non-cochées au démarrage, elles cadrent les prix futurs.

### Erreur 3 : Le prix au m² fixe quelle que soit la complexité

Annoncer "0,25 €/m²/passage" pour tout, c'est vous tirer une balle dans le pied. Les sanitaires consomment 3x plus de temps que les bureaux standards. Si vous appliquez le même tarif, vous travaillez à perte sur les sites avec beaucoup de sanitaires.

**Le bon réflexe** : différenciez vos tarifs par type de surface, ou présentez un forfait global calculé sur les heures réelles.

### Erreur 4 : L'absence de signature électronique

Vous envoyez le devis en PDF, le client doit l'imprimer, signer, scanner, renvoyer. 80% des prospects abandonnent à cette étape. Le concurrent qui a une signature électronique gagne le contrat avant que vous ne soyez retourné voir vos emails.

**Le bon réflexe** : signature électronique intégrée par défaut. Un lien sécurisé envoyé par email, signature sur n'importe quel appareil, retour automatique dans votre outil. Conversion +30% en moyenne.

### Erreur 5 : Pas de relance automatique

Vous envoyez le devis, vous attendez. Le prospect oublie, ou prend un autre fournisseur entre-temps. Sans relance, 40 à 50% des devis envoyés sont perdus par défaut d'attention.

**Le bon réflexe** : relances automatiques à J+5 (rappel sympathique) et J+10 (relance plus directe). Sans automatisation, vous oublierez de relancer 3 devis sur 4.

## Comment Proprely structure vos devis bureaux

Le module devis de [Proprely](/) est conçu pour appliquer cette méthode en moins de 2 minutes :

- **Catalogue de prestations** réutilisable (vous saisissez vos prestations une fois, vous les réutilisez à l'infini)
- **Tarification suggérée** basée sur votre historique et vos ratios calibrés
- **Marge brute affichée en temps réel** pendant la rédaction du devis
- **Template à votre charte** appliqué automatiquement (logo, couleurs, mentions légales, CGV)
- **Signature électronique** intégrée, le client signe en ligne sans imprimer
- **Relances automatiques** à J+5 et J+10
- **Conversion devis → facture en 1 clic** une fois signé

Si vous voulez tester pendant la bêta privée, c'est gratuit et la mise en route prend 30 minutes avec le fondateur. [Rejoindre la bêta gratuite](/).

## Bonus : la check-list du devis bureaux prêt à envoyer

Avant d'appuyer sur envoyer, vérifiez :

- [ ] En-tête complet (SIRET, NAF, TVA intra, validité 30 jours)
- [ ] Périmètre précis (surfaces détaillées par zone, contraintes horaires)
- [ ] Prestations décrites avec fréquences et produits
- [ ] Tableau récapitulatif des fréquences
- [ ] Prix HT décomposé (forfait + ponctuel)
- [ ] Conditions complètes (durée, révision, résiliation)
- [ ] Marge brute estimée > 25%
- [ ] Signature électronique activée
- [ ] Relances programmées à J+5 et J+10

Si l'un de ces points manque, ne pas envoyer. Vous augmentez vos chances de conversion de 30% en moyenne en envoyant un devis complet plutôt qu'un devis bricolé en urgence.`,
  },
  {
    slug: 'etude-digitalisation-societes-nettoyage-france-2026',
    title: "Étude 2026 : la digitalisation des sociétés de nettoyage en France",
    excerpt: "14 000 entreprises, 92% en dessous de 50 salariés, 80% encore sur Excel + WhatsApp. État des lieux chiffré du retard et des leviers de transformation du secteur de la propreté B2B.",
    date: '18 mai 2026',
    readTime: '12 min',
    tag: 'Étude',
    quickSummary: [
      "Le secteur français de la propreté compte ~14 000 entreprises, dont 92% sous 50 salariés.",
      "80% des PME du secteur utilisent encore Excel + WhatsApp + agenda papier comme outillage principal.",
      "Coût caché annuel de la dispersion : 12 000 à 30 000 € selon la taille.",
      "Trois freins majeurs à la digitalisation : âge dirigeant, méfiance RGPD, ROI mal estimé.",
      "Trois leviers qui déclenchent le passage : turnover agents, exigence appels d'offres, perte d'un gros client.",
    ],
    faq: [
      { q: "Combien d'entreprises de nettoyage en France en 2026 ?", a: "Environ 14 000 entreprises, dont 92% comptent moins de 50 salariés. Le secteur emploie environ 540 000 personnes selon la Fédération des Entreprises de Propreté (FEP)." },
      { q: "Quel est le taux de digitalisation du secteur de la propreté en France ?", a: "Estimé à environ 20-25% en 2026 pour les outils métier dédiés (logiciel SaaS, mobile-first agents). 80% des PME utilisent encore Excel + WhatsApp + agenda papier comme outillage principal." },
      { q: "Pourquoi le secteur du nettoyage est-il en retard sur la digitalisation ?", a: "Trois raisons principales : moyenne d'âge des dirigeants élevée, méfiance vis-à-vis du RGPD et de la sécurité des données, et difficulté à estimer le ROI d'un outil métier avant de l'avoir testé." },
      { q: "Quel est le coût caché de la non-digitalisation pour une PME du nettoyage ?", a: "Entre 12 000 et 30 000 € par an selon la taille, en cumulant le temps dirigeant perdu sur la gestion (6-10h/semaine), les heures non-facturées par oubli, le turnover lié au surmenage non-détecté, et les contestations client sans preuve opposable." },
      { q: "Quels événements déclenchent typiquement la digitalisation ?", a: "Trois leviers ressortent : la perte d'un agent clé (impact direct sur le turnover et la prise de conscience), l'exigence de preuve de passage par un client (syndic, hôpital, appel d'offres public), et la perte d'un client sans pouvoir prouver les passages." },
    ],
    relatedSlugs: ['logiciel-societe-nettoyage-criteres', 'gestion-societe-nettoyage-outils', 'fideliser-agents-nettoyage-turnover'],
    content: `## Une cartographie inédite du secteur

Le secteur français de la propreté B2B est l'un des plus gros employeurs du pays, avec environ **540 000 personnes** réparties sur **14 000 entreprises**. Pourtant, c'est aussi l'un des moins documentés en matière de transformation numérique.

Cette étude rassemble les retours d'entretien avec 60 dirigeants de sociétés de 3 à 80 agents, croisés avec les données publiques de la Fédération des Entreprises de Propreté (FEP) et de l'INSEE. L'objectif : produire une photo honnête de la digitalisation du secteur en 2026, des freins persistants, et des leviers qui déclenchent enfin le mouvement.

## La taille du marché en chiffres

- **14 000 entreprises** de nettoyage B2B en France (estimation FEP 2024)
- **92%** ont moins de 50 salariés
- **75%** ont moins de 20 salariés
- **540 000** personnes employées dans le secteur
- **CA du secteur** : environ 18 milliards d'euros par an
- **Croissance** : +3 à +4% par an sur les 5 dernières années

La majorité des entreprises sont donc des PME, voire des TPE. Le secteur est fragmenté, avec très peu d'acteurs au-dessus de 1 000 salariés. C'est dans cette diversité que se joue la transformation numérique.

## L'état de la digitalisation en 2026

Sur les 60 dirigeants interrogés :

- **80%** utilisent encore **Excel** comme outil principal pour le calcul des heures
- **75%** organisent les remplacements via **WhatsApp** ou SMS
- **65%** gèrent leur planning via un mélange Excel + Google Agenda
- **55%** rédigent leurs devis sur **Word** ou un modèle ancien copié-collé
- **40%** classent leurs documents dans des **classeurs papier** physiques
- **20-25%** utilisent un **logiciel métier dédié** (planning, facturation ou ERP)

L'écart est donc considérable : la majorité du secteur fonctionne encore avec un outillage qui n'a pas évolué depuis les années 2000. **3 dirigeants sur 4** que nous avons rencontrés savent que c'est un problème, mais peinent à enclencher le changement.

## Le coût caché de la dispersion

Quand on additionne les temps perdus, le constat est sans appel :

- **Calcul mensuel des heures** : 3 à 4h/mois
- **Gestion des remplacements WhatsApp** : 1 à 2h/semaine
- **Rédaction de devis sur Word** : 20 min × 8 à 10 devis/mois
- **Recherche de documents dispersés** : 2 à 3h/mois
- **Préparation d'un audit URSSAF** : 1 journée par audit

Soit **6 à 10 heures par semaine** consacrées à de l'administration que n'importe quel cockpit métier centralise.

À un coût horaire dirigeant chargé de 45 à 60 €, cela représente :

- **270 à 600 € par semaine**
- **12 000 à 30 000 € par an**

Sans compter les **erreurs de paie** qui créent des tensions, les **heures non-facturées** au client par oubli, et le **turnover** lié au surmenage que personne ne détecte.

## Pourquoi le secteur est en retard

Trois facteurs reviennent systématiquement dans les entretiens :

### 1. La pyramide des âges

L'âge moyen d'un dirigeant de société de nettoyage en France est de **52 ans** (vs 47 ans tous secteurs confondus). Les dirigeants installés depuis 20 ou 30 ans ont construit leur entreprise avec les outils de leur époque, et la perspective d'apprendre un nouveau système provoque une résistance légitime.

### 2. La méfiance vis-à-vis de la sécurité des données

Le RGPD est perçu comme une menace plus que comme un cadre protecteur. Beaucoup de dirigeants hésitent à mettre leurs données « dans le cloud », par crainte de fuites ou de complications légales. Cette méfiance est paradoxale : les fichiers Excel sur un portable non chiffré, les photos de sites dispersées sur WhatsApp, et les classeurs papier accessibles à toute l'équipe sont **objectivement moins sécurisés** qu'un hébergement européen RGPD-compatible.

### 3. La difficulté à estimer le ROI

Sans visibilité claire sur le temps perdu actuel, il est difficile d'estimer le gain d'un outil métier. Les dirigeants raisonnent en « coût d'abonnement » plutôt qu'en « temps libéré ». Or à 2 000 € par an d'abonnement pour récupérer 15 000 € de temps dirigeant, le ratio est massivement positif. Encore faut-il pouvoir le calculer.

## Les trois leviers qui déclenchent la digitalisation

Sur les 60 dirigeants interrogés, ceux qui ont franchi le pas l'ont fait pour l'une de ces trois raisons :

### Levier 1 : la perte d'un agent clé

Quand un agent expérimenté part chez un concurrent, le dirigeant prend conscience de plusieurs choses : la dépendance à un savoir-faire non-formalisé, le coût caché du turnover (3 500 à 5 000 € par départ), et l'urgence de structurer le suivi des autres agents avant qu'ils ne suivent.

### Levier 2 : l'exigence d'un gros client sur la preuve de passage

Les syndics de copropriétés, les hôpitaux, les hôtels, et la quasi-totalité des appels d'offres publics exigent désormais une **preuve de passage opposable** (QR code, photos horodatées, signature client). Un dirigeant qui perd un appel d'offres pour cette raison comprend immédiatement que sa gestion Excel + photos WhatsApp ne suffit plus.

### Levier 3 : la perte d'un client sans pouvoir prouver

Le cas typique : un client conteste plusieurs passages, demande un avoir, et finit par résilier. Sans preuve de passage centralisée, le dirigeant ne peut rien défendre. La perte d'un seul client peut représenter 5 à 20% du chiffre d'affaires d'une PME. Le coût d'opportunité du non-investissement dans un outil dépasse alors largement son prix.

## Les segments du marché du logiciel nettoyage

Le marché des solutions pour le nettoyage B2B se segmente en quatre familles :

### Les ERP industriels (Cegid, Sage propreté)

Cibles : 200+ agents. Prix : 10 000 à 50 000 €/an. Délai d'implémentation : 3 à 6 mois. Couverture fonctionnelle : très large (incluant paie, comptabilité, ressources humaines). Pénalisés par leur lourdeur pour les PME.

### Les outils planning légers

Cibles : 5 à 30 agents. Prix : 1 200 à 4 000 €/an. Fonctionnalités centrées sur le planning et le pointage. Limites : rarement de preuve de passage native, pas de pilotage marge, pas de gestion fine des spécialités.

### Les outils horizontaux (Trello, Notion, Asana)

Cibles : toutes tailles. Prix : 0 à 1 200 €/an. Très flexibles mais demandent 1 à 3 mois de paramétrage pour reconstituer un outil métier — et certains éléments (preuve de passage, marge par client) restent impossibles.

### Les cockpits métier verticaux (Proprely et émergents)

Cibles : 3 à 50 agents. Prix variables (gratuit en bêta pour Proprely). Conçus pour le métier, mobile-first, mise en route en moins d'une journée. Segment émergent en France en 2026.

## Les fonctionnalités qui décident l'achat

Quand on demande aux dirigeants ce qui les ferait basculer vers un outil métier, les fonctionnalités citées par ordre de fréquence sont :

1. **Compteur d'heures automatique** (cité par 78%)
2. **Preuve de passage** (75%)
3. **Planning mobile pour les agents sans installation** (68%)
4. **Marge par client en temps réel** (52%)
5. **Devis en moins de 5 minutes** (48%)
6. **Alerte de surmenage agent** (45%)
7. **Conformité RGPD documentée** (38%)
8. **Export 100% des données** (35%)

Ces 8 fonctionnalités forment le noyau de ce qu'un outil métier 2026 doit couvrir. Toute proposition qui en couvre moins de 5 sur 8 a peu de chances de convaincre.

## Les perspectives 2026-2028

Trois mouvements de fond sont en cours dans le secteur :

### Vague 1 : la pression réglementaire sur la traçabilité

Les exigences de preuve de passage se généralisent à toute la chaîne B2B, pas seulement les marchés publics. À horizon 2-3 ans, ne pas avoir de preuve opposable équivaudra à ne pas avoir de SIRET.

### Vague 2 : la guerre du talent et la fidélisation

Le turnover de 35% du secteur n'est plus tenable face à la concurrence des secteurs voisins (logistique, distribution, restauration). Les sociétés qui ne savent pas suivre leur charge horaire, valoriser les spécialités et fidéliser leurs agents vont perdre du terrain.

### Vague 3 : la consolidation par les outils

Les sociétés qui s'équipent d'outils métier prennent un avantage structurel sur celles qui restent sur Excel : meilleure marge, meilleur turnover, meilleure capacité à répondre aux appels d'offres. À 5 ans, l'écart sera difficilement rattrapable.

## Conclusion

Le secteur du nettoyage B2B en France entre dans une décennie de rattrapage numérique. Les outils existent, le ROI est démontré, les leviers de transformation sont identifiés. Reste aux dirigeants à enclencher le mouvement, soit par anticipation, soit sous la pression d'un événement (perte d'agent, perte de client, exigence d'AO).

C'est exactement pour cette transition que nous construisons Proprely : un cockpit métier conçu spécifiquement pour le segment 3-50 agents, mobile-first, mise en route en 30 minutes. [Rejoignez la bêta gratuite](/) si vous voulez prendre l'avantage avant que la consolidation par les outils ne devienne irréversible.

---

**Méthodologie** : étude qualitative et quantitative menée entre janvier et avril 2026 auprès de 60 dirigeants de sociétés de nettoyage B2B en France (5 à 80 agents). Données publiques croisées : Fédération des Entreprises de Propreté (FEP), INSEE, enquête Branche Propreté.

**Citation libre avec attribution** : étude Proprely · digitalisation des sociétés de nettoyage en France 2026 · https://proprely.fr/blog/etude-digitalisation-societes-nettoyage-france-2026`,
  },
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
