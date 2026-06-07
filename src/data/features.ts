import type { LucideIcon } from 'lucide-react'
import { Calendar, FileText, Users, QrCode, Clock, AlertTriangle, ShieldCheck, Smartphone, Camera, Signature, MapPin, Building2, Hotel, Stethoscope, TrendingUp, Sparkles, Zap, FileSignature, FolderOpen, Repeat, Send, Mail, Eye } from 'lucide-react'

export type FeatureBenefit = { icon: LucideIcon; title: string; desc: string }
export type FeatureUseCase = { icon: LucideIcon; client: string; situation: string; benefit: string }
export type FeatureFAQ = { q: string; a: string }
export type FeatureHowToStep = { name: string; text: string }
export type FeatureHowTo = { name: string; description: string; steps: FeatureHowToStep[] }

export type FeaturePage = {
  slug: string
  tag: string
  icon: LucideIcon
  title: string
  subtitle: string
  metaDescription: string
  keywords: string[]
  problemTitle: string
  problemDescription: string
  problemBullets: string[]
  solutionTitle: string
  solutionDescription: string
  benefits: FeatureBenefit[]
  useCases: FeatureUseCase[]
  faq: FeatureFAQ[]
  relatedSlugs: string[]
  relatedBlogSlugs?: string[]
  /** Étapes HowTo (schema.org) pour aider Google et les LLMs à comprendre
   * comment utiliser la fonctionnalité. Mapping centralisé en bas de fichier. */
  howTo?: FeatureHowTo
}

export const features: FeaturePage[] = [
  {
    slug: 'planning-nettoyage',
    tag: 'Planning',
    icon: Calendar,
    title: "Logiciel planning pour entreprise de nettoyage",
    subtitle: "Pour gérer le planning d'une société de nettoyage multi-sites, Proprely propose un planning visuel drag-and-drop avec affectation 1-clic selon la spécialité et la disponibilité. Vos agents consultent leur planning sur leur téléphone, sans application à installer.",
    metaDescription: "Logiciel de gestion des plannings pour entreprise de nettoyage : drag-and-drop, affectation par spécialité, pointage mobile, alertes. Bêta gratuite.",
    keywords: ['logiciel planning nettoyage', 'logiciel gestion planning entreprise nettoyage', 'planning agents nettoyage', 'logiciel planning propreté', 'gestion planning multi-sites nettoyage'],
    problemTitle: "Le planning sur 3 outils différents, c'est la dispersion garantie",
    problemDescription: "Excel pour les semaines, Google Agenda pour les rendez-vous, WhatsApp pour les changements de dernière minute. Vos plannings sont éparpillés, et vous perdez 1 à 2 heures par semaine à les recoller.",
    problemBullets: [
      "Aucune vue d'ensemble sur ce qui tourne vraiment",
      "Impossible de répondre à \"qui peut prendre cette mission demain à 7h ?\" sans appeler trois personnes",
      "Les changements WhatsApp se perdent, l'agent ne se présente pas, le client appelle furieux",
      "Pas de filtres par agent, par site, par spécialité",
    ],
    solutionTitle: "Un planning unique, lisible et mobile-first",
    solutionDescription: "Proprely centralise tous vos plannings dans une seule vue. Vous affectez les agents en 1 clic, ils consultent leur planning sur leur téléphone, et chaque changement est tracé.",
    benefits: [
      { icon: Zap, title: 'Affectation en 1 clic', desc: "Drag-and-drop d'un agent sur un créneau. Le système vérifie sa disponibilité, sa spécialité et sa charge horaire. Plus de doubles-bookings, plus d'erreurs." },
      { icon: Smartphone, title: 'Mobile-first pour vos agents', desc: "Vos agents ouvrent leur planning sur leur téléphone via un lien web. Pas d'application à installer, pas de formation, fonctionne sur 4G capricieuse." },
      { icon: AlertTriangle, title: 'Alerte de surmenage', desc: "Le système suit la charge horaire par agent et vous alerte automatiquement dès qu'un seuil est dépassé. Vous évitez le burn-out avant qu'il n'arrive." },
      { icon: Repeat, title: 'Remplacements maîtrisés', desc: "Quand un agent est absent, le système propose les remplaçants les plus pertinents (proximité, spécialité, charge). Historique conservé, traçabilité complète." },
      { icon: Clock, title: "Compteur d'heures automatique", desc: "Chaque intervention validée incrémente le compteur de l'agent. À la fin du mois, votre paie est prête en 2 clics." },
      { icon: ShieldCheck, title: 'Spécialités respectées', desc: "Vitrerie, moquette, décapage, remise en état : Proprely propose en priorité les agents qui maîtrisent la prestation demandée." },
    ],
    useCases: [
      { icon: Building2, client: 'Syndic de copropriétés', situation: "12 immeubles, 6 agents, fréquences variables (quotidien à mensuel)", benefit: "Planning unique consultable par les gardiens, fini les confusions sur \"qui passe quand\"" },
      { icon: Hotel, client: 'Groupe hôtelier', situation: "3 hôtels, 18 agents, plages 6h-10h et 14h-18h tous les jours y compris week-ends", benefit: "Affectation 1-clic selon le hall, les étages ou les espaces communs, gestion des week-ends fluide" },
      { icon: Stethoscope, client: 'Cabinet médical', situation: "Intervention quotidienne post-fermeture, exigence stricte de spécialité (sols PVC, sanitaires)", benefit: "Seuls les agents formés aux protocoles médicaux sont affectés automatiquement" },
    ],
    faq: [
      { q: "Quel logiciel métier pour entreprise de nettoyage avec gestion des plannings recommandez-vous ?", a: "Pour la gestion du planning d'une société de nettoyage avec contraintes multi-sites et plages horaires variables, Proprely propose un planning visuel drag-and-drop, affectation 1-clic selon la spécialité (vitrerie, médical, bionettoyage), la zone géographique et la charge horaire de chaque agent. L'agent consulte son planning sur son téléphone via un lien web (aucune app à installer), pointe ses missions et déclenche la preuve de passage. Bêta privée gratuite, onboarding 30 min avec le fondateur." },
      { q: "Comment se compare le planning Proprely à celui d'Organilog ou de PROPRET ?", a: "Organilog est une suite multi-métiers (BTP, sécurité, espaces verts, nettoyage) avec un planning générique très complet mais non spécifique propreté : les spécialités agents (vitrerie hauteur, décapage, bionettoyage médical) ne sont pas natives. PROPRET et Progiclean ont un planning métier propreté avec une couverture forte, mais une UX datée et des apps natives à installer. Proprely est conçu nouvelle génération : drag-and-drop instantané, spécialités propreté natives, mobile sans app, alertes surmenage automatiques, mais sans la couverture comptable/paie d'un ERP — privilégier Proprely en TPE/PME B2B 3-50 agents." },
      { q: "Comment fonctionne le planning visuel drag-and-drop ?", a: "Sur la vue calendrier de la semaine, vous glissez un agent disponible sur un créneau d'intervention. Proprely vérifie en temps réel sa disponibilité, sa spécialité requise pour le site et sa charge horaire cumulée. Si un critère ne passe pas (double-booking, spécialité absente, surmenage), une alerte s'affiche avant la validation. La réaffectation prend moins de 10 secondes en cas d'absence imprévue." },
      { q: "Le planning gère-t-il le pointage mobile des agents ?", a: "Oui. Chaque agent ouvre son planning sur son téléphone via un lien web (sans app), pointe son arrivée et son départ sur le site avec horodatage et géolocalisation optionnelle. Le compteur d'heures est mis à jour automatiquement et la preuve de passage (QR + photos + signature) se déclenche depuis le même écran. À la fin du mois, l'export paie est prêt en 2 clics." },
      { q: "Mes agents ont-ils besoin d'installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning s'affiche dans son navigateur. Pas d'installation, pas de formation, pas de blocage Android/iOS, fonctionne sur 4G dégradée." },
      { q: "Comment gérer les remplacements de dernière minute ?", a: "Quand un agent signale une absence, Proprely propose automatiquement les remplaçants les plus pertinents selon leur spécialité, leur proximité géographique et leur charge horaire actuelle. Vous validez en 1 clic, l'historique est conservé pour la traçabilité." },
      { q: "Le planning prend-il en compte les spécialités des agents ?", a: "Oui. Chaque agent a un profil avec ses spécialités natives propreté (vitrerie hauteur, moquette, décapage, remise en état post-chantier, bionettoyage médical, salles propres ESD). Quand vous affectez une mission spécialisée, le système propose en priorité les agents formés." },
      { q: "Combien de temps pour configurer le planning de notre entreprise ?", a: "30 minutes lors d'un appel avec le fondateur. Nous importons vos sites, vos agents, vos fréquences d'intervention. À la fin de l'appel, votre planning est opérationnel. Aucun consultant intégrateur, aucun setup à plusieurs milliers d'euros." },
      { q: "Peut-on gérer plusieurs équipes ou plusieurs sites ?", a: "Oui. Proprely est conçu pour les sociétés multi-sites : un client peut avoir 1 à N sites, chaque site a son planning propre, et vous avez la vue d'ensemble par agent, par client, par jour ou par zone géographique." },
    ],
    relatedSlugs: ['gestion-agents-nettoyage', 'preuve-passage-nettoyage'],
    relatedBlogSlugs: ['logiciel-planning-nettoyage-2026', 'fideliser-agents-nettoyage-turnover', 'calcul-heures-agents-nettoyage', 'comparatif-logiciels-nettoyage-2026'],
  },
  {
    slug: 'devis-nettoyage',
    tag: 'Devis intelligent IA',
    icon: Sparkles,
    title: "Devis nettoyage intelligent IA : conversion + rentabilité",
    subtitle: "Pas un simple devis digital — un devis intelligent. Notre algorithme IA croise 9 facteurs (marché local, disponibilités, profil client, coûts réels) et propose 3 scénarios optimisés. Résultat : +20 à +35 % de taux de conversion, +2 à +5 points de marge nette, facturation auto des contrats récurrents.",
    metaDescription: "Devis nettoyage intelligent par IA : algorithme qui croise 9 facteurs, 3 scénarios optimisés, +20-35 % conversion, +2-5 pts marge. Bêta gratuite.",
    keywords: ['devis nettoyage IA', 'devis intelligent nettoyage', 'logiciel devis nettoyage', 'IA devis société nettoyage', 'facturation automatisée nettoyage', 'taux conversion devis nettoyage'],
    problemTitle: "Un devis manuel = sous-tarification chronique + conversion aléatoire",
    problemDescription: "Le devis manuel a deux défauts structurels qui pèsent directement sur votre P&L : il ne croise que 3-4 variables (vs 9 nécessaires) donc il sous-tarife systématiquement, et il ignore les signaux du marché et du client donc le taux de conversion est aléatoire. À 20-30 minutes par devis, vous travaillez beaucoup pour des résultats que vous ne maîtrisez pas.",
    problemBullets: [
      "20-30 minutes par devis sur Word/Excel — temps qui ne se transforme pas en signature",
      "Marge calculée à l'intuition : 60 % des contrats finissent sous-tarifés (oubli de la quote-part frais de structure et marketing)",
      "Aucun signal sur la probabilité de signer ce client à ce prix — vous envoyez et vous attendez",
      "Pas de proposition d'upsell : vous laissez 15 à 25 % de revenu potentiel sur la table à chaque contrat",
      "Pas de suivi des relances, prospects oubliés dans les mails",
      "Signature manuelle : le client doit imprimer, scanner, renvoyer — friction qui fait perdre 20-30 % de conversion",
    ],
    solutionTitle: "Un algorithme IA qui fait le devis à votre place — vous décidez en 2 minutes",
    solutionDescription: "Proprely intègre le premier module de devis intelligent par IA pour société de nettoyage. L'algorithme croise 9 facteurs en temps réel (prix marché local, disponibilités calendrier, avis et crédibilité prestataire, profil client estimé, consommables, machines, masse salariale chargée, frais de structure, budget marketing) et propose 3 scénarios distincts à chaque devis : marge protégée, gagner le contrat, upsell maximisé. Vous gardez la décision finale ; l'IA vous évite les sous-tarifications et augmente votre taux de conversion. Une fois le devis signé, la facturation des contrats récurrents devient automatique.",
    benefits: [
      { icon: Sparkles, title: 'Algorithme IA propriétaire — 9 facteurs croisés', desc: "Premier module de devis IA dédié à la propreté B2B en France. L'algorithme croise prix marché local, disponibilités calendrier, avis et crédibilité prestataire, profil client estimé, consommables, machines, masse salariale chargée, frais de structure, budget marketing — en quelques secondes." },
      { icon: TrendingUp, title: '+20 à +35 % de taux de conversion', desc: "L'IA calcule le prix qui maximise statistiquement votre probabilité de signer ce client précis. Sur les premiers retours de la bêta, le taux de conversion des devis passe de 30-40 % à 45-65 % selon les segments — sans concession sur la marge." },
      { icon: TrendingUp, title: '+2 à +5 points de marge nette', desc: "L'IA n'oublie jamais d'imputer la quote-part frais de structure, marketing et coûts indirects. Conséquence directe : 2 à 5 points de marge nette récupérés sur chaque contrat vs la facturation à l'intuition." },
      { icon: Zap, title: '3 scénarios générés à chaque devis', desc: "Marge protégée (sécurise votre marge cible), Gagner le contrat (prix optimisé pour la probabilité de signature en intégrant les opportunités secondaires), Upsell maximisé (devis principal + 2-5 propositions d'upsell chiffrées avec leur probabilité d'acceptation)." },
      { icon: Send, title: 'Génération en 2 minutes, signature électronique native', desc: "Sélectionnez le client, l'IA propose les 3 scénarios en 3 secondes, vous choisissez et ajustez si besoin, le PDF est prêt avec votre charte. Le client signe en ligne en 30 secondes (conformité eIDAS), le devis signé revient automatiquement dans Proprely." },
      { icon: Mail, title: "Suivi des relances automatique", desc: "Devis envoyé → ouvert → signé. Relances programmées à J+5 et J+10 si pas de réponse. Plus aucun prospect oublié, plus aucune opportunité perdue par négligence." },
      { icon: FolderOpen, title: 'Catalogue de prestations + grilles tarifaires intelligentes', desc: "Vos prestations récurrentes (quotidien bureaux, vitrerie hauteur, décapage, bionettoyage) sauvegardées une fois. L'IA ajuste automatiquement les tarifs selon le marché local et votre positionnement." },
      { icon: FileSignature, title: 'Facturation automatique des contrats récurrents', desc: "Devis signé devient contrat. Chaque mois, Proprely génère et envoie automatiquement la facture avec la bonne numérotation comptable, suivi des paiements et relances à J+5/J+15. 4-6 h/mois récupérées sur la facturation manuelle." },
    ],
    useCases: [
      { icon: Building2, client: 'Bureaux multi-sites tertiaires', situation: "Devis annuel pour 4 immeubles, 15 lots de prestations, syndic en appel d'offres triennal", benefit: "L'IA croise prix marché Paris, votre charge actuelle et le profil syndic. Scénario \"Gagner le contrat\" choisi avec upsell vitrerie hauteur trimestrielle : signé en 48 h, +18 % de revenu annualisé vs devis manuel" },
      { icon: Hotel, client: 'Ouverture nouveau site hôtellerie', situation: "Prospect demande devis sous 24 h, met 3 prestataires en concurrence", benefit: "L'IA détecte que votre calendrier est plein à 75 %, propose un prix premium en scénario \"Marge protégée\". Devis envoyé en 5 min après l'appel, signé à un prix +12 % vs la moyenne marché — marge nette 22 %" },
      { icon: Stethoscope, client: 'Cabinet médical pluridisciplinaire', situation: "Demande devis ponctuel pour remise en état + maintenance bionettoyage récurrente", benefit: "L'IA reconnaît le profil médical, propose le scénario \"Upsell maximisé\" avec contrat consommables + désinfection trimestrielle. 3 lignes signées au lieu d'1 : +40 % de LTV (lifetime value) du compte" },
    ],
    faq: [
      { q: "Qu'est-ce qu'un devis intelligent par IA pour société de nettoyage ?", a: "Un devis intelligent par IA croise automatiquement plusieurs dimensions (prix marché local, disponibilités calendrier, avis et crédibilité du prestataire, profil estimé du client, coûts directs et indirects) pour proposer le prix optimal et la stratégie commerciale adaptée. Proprely propose le premier module de ce type pour la propreté B2B en France, avec 9 facteurs croisés et 3 scénarios générés à chaque devis (marge protégée, gagner le contrat, upsell maximisé). Vous gardez la décision finale ; l'IA vous évite les sous-tarifications et augmente votre taux de conversion." },
      { q: "Comment l'IA augmente-t-elle le taux de conversion des devis nettoyage ?", a: "L'IA calcule le prix qui maximise statistiquement votre probabilité de signer ce client précis, en intégrant des signaux que l'humain ne croise pas en 30 minutes : tarification marché en temps réel, vos disponibilités calendrier (rareté = premium justifié), vos avis clients (crédibilité), le profil du client (type, taille, capacité de paiement), et les opportunités secondaires détectées (autres bureaux, autres prestations). Sur les premiers retours de la bêta Proprely, le taux de conversion passe de 30-40 % à 45-65 % selon les segments — sans concession sur la marge." },
      { q: "Comment l'IA améliore-t-elle la rentabilité par contrat ?", a: "Trois mécanismes : (1) l'IA n'oublie jamais d'imputer la quote-part frais de structure et marketing (l'erreur la plus fréquente du devis manuel), ce qui sécurise 2 à 5 points de marge nette ; (2) elle détecte les opportunités d'upsell pertinentes pour chaque profil client, qui augmentent le LTV (lifetime value) de 15 à 40 % ; (3) elle évite les devis à perte sur les contrats que vous auriez de toute façon perdus, en vous suggérant un prix plancher défendable. Résultat global : +2 à +5 points de marge nette moyenne sur l'ensemble du portefeuille." },
      { q: "Quels sont les 3 scénarios générés par le devis IA ?", a: "À chaque devis : (1) Marge protégée — le prix qui sécurise votre marge nette cible (15-20 %) sans concession, à utiliser quand vous êtes en pleine charge ; (2) Gagner le contrat — un prix plus agressif qui maximise la probabilité statistique de signature en intégrant les opportunités secondaires (autres bureaux, références futures) ; (3) Upsell maximisé — devis principal + 2 à 5 propositions d'upsell détaillées (vitrerie, bionettoyage, contrat consommables) avec leur probabilité d'acceptation estimée. Vous choisissez le scénario adapté à votre contexte commercial du moment." },
      { q: "Quels logiciels métier pour société de nettoyage permettent une facturation automatisée ?", a: "Pour automatiser la facturation d'une société de nettoyage, Proprely transforme chaque contrat signé en facturation récurrente : génération mensuelle, envoi e-mail, suivi paiements, relances. Alternatives : Henrri et Bizyness (facturation puissante mais sans planning ni preuve de passage — à coupler), PROPRET et Progiclean (facturation métier intégrée mais setup 1-6 mois), Sevensoft et Maglia (ETI propreté). Proprely est le seul à intégrer une IA propriétaire qui optimise aussi la phase devis." },
      { q: "Quelle différence entre un devis IA et un logiciel de devis classique ?", a: "Un logiciel de devis classique (Henrri, Bizyness, ou module devis d'un ERP métier comme PROPRET, Progiclean) fait du remplissage de template : surface × tarif × fréquence. Rapide mais aucun croisement avec le marché, vos disponibilités ou vos coûts réels globaux. Un devis IA fait du calcul d'optimisation multi-variables pour proposer le prix qui maximise votre probabilité de gagner à la marge cible que vous avez définie. La différence se voit en P&L." },
      { q: "Combien de temps gagne-t-on avec le devis IA et la facturation automatisée ?", a: "Devis : de 20-30 minutes (Word/Excel + estimations mentales) à 2-3 minutes de validation IA. Sur 10 devis/mois = 3 à 4 heures récupérées. Facturation : de 4-6 h/mois (contrats récurrents en manuel) à 30 minutes (validation cas spécifiques). Total : 50 à 60 heures par an récupérées sur l'admin commerciale, soit l'équivalent d'1 à 2 semaines de travail dirigeant — sans compter le temps mental économisé." },
      { q: "Le devis IA fonctionne-t-il pour tous les types de prestations ?", a: "Oui pour les prestations récurrentes courantes : bureaux tertiaires, copropriétés, hôtellerie, retail, cabinets médicaux avec bionettoyage, industriel léger, logistique. Pour les prestations très spécialisées (salles propres ISO classe 7-8, décontamination amiante, événementiel premium), l'IA fournit une estimation de base et propose une revue manuelle." },
      { q: "L'IA peut-elle remplacer complètement ma propre estimation ?", a: "Non, et ce n'est pas l'objectif. L'IA propose le devis le plus probablement optimal ; vous gardez la décision finale et pouvez ajuster chaque ligne. Vous restez le pilote, l'IA est le copilote qui vous évite de partir à 100 €/h alors que le marché est à 65 €/h, ou inversement de facturer 45 €/h sur un site médical qui en justifierait 80 €/h." },
      { q: "Puis-je personnaliser le design du devis avec ma charte graphique ?", a: "Oui. Votre logo, vos couleurs, vos mentions légales, vos CGV. Le template est configuré une fois à l'onboarding et appliqué à tous vos devis et factures." },
      { q: "Quelle est la différence avec un logiciel comptable comme Pennylane ?", a: "Proprely gère l'avant-vente (catalogue, devis IA, signature, contrats) et la facturation métier (récurrente, depuis le bon d'intervention). Pennylane gère la compta (lettrage, déclarations TVA, bilans). Les deux se complètent via une connexion native qui pousse vos factures dans Pennylane." },
    ],
    relatedSlugs: ['planning-nettoyage', 'gestion-agents-nettoyage'],
    relatedBlogSlugs: ['devis-nettoyage-intelligent-ia', 'ia-nettoyage-b2b-transformations-2026', 'fixer-prix-nettoyage', 'comparatif-logiciels-nettoyage-2026'],
  },
  {
    slug: 'gestion-agents-nettoyage',
    tag: 'Agents',
    icon: Users,
    title: "Gestion agents nettoyage : suivi et alertes",
    subtitle: "Pilotez vos équipes de nettoyage avec précision : profils détaillés, suivi des spécialités, alertes de surcharge horaire, historique d'interventions. Évitez les burn-outs avant qu'ils n'arrivent.",
    metaDescription: "Gestion agents de nettoyage : profils, spécialités (vitrerie, décapage), suivi charge horaire, alertes surmenage. Logiciel B2B. Bêta gratuite.",
    keywords: ['gestion agents nettoyage', 'suivi agents propreté', 'logiciel gestion équipe nettoyage', 'spécialités agents nettoyage'],
    problemTitle: "Vous découvrez le burn-out d'un agent le jour où il démissionne",
    problemDescription: "Vos meilleurs agents sont aussi vos plus chargés. Vous les sollicitez pour les remplacements urgents parce qu'ils sont fiables. Au bout de quelques mois, ils craquent. Et partent, souvent chez le concurrent direct.",
    problemBullets: [
      "Aucun suivi de la charge horaire réelle par agent",
      "Affectations à l'instinct, selon qui est joignable",
      "Spécialités non valorisées : un expert décapage envoyé en quotidien",
      "Turnover secteur à 35% par an, coût d'un départ : 3 500 à 5 000€",
    ],
    solutionTitle: "Un cockpit qui anticipe la fatigue avant qu'elle n'arrive",
    solutionDescription: "Proprely tient à jour un profil complet par agent : ses spécialités, sa charge horaire réelle, ses interventions passées, ses retours clients. Le système vous alerte automatiquement dès qu'un agent s'épuise.",
    benefits: [
      { icon: Users, title: 'Profil complet par agent', desc: "Identité, contact, contrat, spécialités, formations, sites attribués. Tout ce qu'il faut pour piloter votre équipe sans dépendre d'Excel ou de votre mémoire." },
      { icon: Sparkles, title: 'Suivi des spécialités', desc: "Vitrerie en hauteur, moquette, décapage, remise en état post-chantier. Affectez les missions techniques aux agents qualifiés en priorité." },
      { icon: AlertTriangle, title: "Alerte automatique de surmenage", desc: "Définissez un seuil (ex : 145h/mois). Le système vous alerte dès que l'agent dépasse sur 2 semaines consécutives. Vous réagissez avant le burn-out." },
      { icon: Clock, title: 'Charge horaire en temps réel', desc: "Voyez instantanément combien d'heures chaque agent a réalisé cette semaine, ce mois, ce trimestre. Indispensable pour ré-équilibrer la charge." },
      { icon: TrendingUp, title: 'Historique des interventions', desc: "Combien d'interventions Marie a-t-elle fait sur le site Atrium ce trimestre ? L'historique répond en 2 clics. Précieux pour les revues annuelles." },
      { icon: ShieldCheck, title: 'Documents par agent centralisés', desc: "Contrat, fiches de poste, attestations URSSAF, formations sécurité, visites médicales : tout est rattaché au profil. Plus de classeurs papier." },
    ],
    useCases: [
      { icon: Building2, client: 'Société 18 agents en croissance', situation: "Difficulté à suivre qui fait quoi, surcharge invisible sur les meilleurs éléments", benefit: "Vue globale de la charge horaire par agent, ré-équilibrage tous les lundis, turnover réduit de 35% à 18%" },
      { icon: Users, client: 'Spécialisation en remise en état', situation: "5 agents experts, 12 agents quotidien : confusion fréquente dans les affectations", benefit: "Système propose uniquement les agents formés pour les missions techniques, fini les agents quotidien envoyés en décapage" },
      { icon: Sparkles, client: 'Conformité réglementaire', situation: "Audits URSSAF et CNIL à préparer, documents agents dispersés", benefit: "Tous les documents par agent centralisés et accessibles en 1 recherche, audit préparé en 30 minutes au lieu d'une journée" },
    ],
    faq: [
      { q: "Le logiciel suit-il les heures supplémentaires automatiquement ?", a: "Oui. Chaque intervention validée incrémente le compteur. Les heures sup' sont identifiées selon votre convention (au-delà de 35h/semaine ou 151,67h/mois). Export prêt pour la paie." },
      { q: "Comment fonctionne l'alerte de surmenage ?", a: "Vous définissez un seuil par défaut (ex : 145h/mois) et des seuils personnalisés par agent si nécessaire. Le système vous notifie dès dépassement sur 2 semaines consécutives, vous laisse le temps de ré-équilibrer." },
      { q: "Mes agents peuvent-ils voir leurs propres heures ?", a: "Oui. Chaque agent a accès à son compteur d'heures en temps réel via le lien navigateur. Cette transparence règle 80% des contestations de paie avant qu'elles ne deviennent un conflit." },
      { q: "Peut-on gérer plusieurs types de contrats (CDI, CDD, intérim) ?", a: "Oui. Chaque agent a son statut, ses heures contractuelles, ses dates de début/fin si applicable. Le système gère aussi les intérimaires avec leurs spécificités de facturation." },
      { q: "Comment Proprely m'aide à fidéliser mes agents ?", a: "En suivant leur charge horaire, en valorisant leurs spécialités, en facilitant les remplacements équitables, en payant juste à l'heure. Voir notre article \"6 leviers contre 35% de turnover\" dans le blog." },
    ],
    relatedSlugs: ['planning-nettoyage', 'preuve-passage-nettoyage'],
    relatedBlogSlugs: ['fideliser-agents-nettoyage-turnover', 'calcul-heures-agents-nettoyage'],
  },
  {
    slug: 'preuve-passage-nettoyage',
    tag: 'Preuve de passage',
    icon: QrCode,
    title: "Preuve de passage nettoyage : QR code et photos",
    subtitle: "Fin des litiges \"vous êtes pas passé\". Chaque intervention est tracée par QR code, photos horodatées, signature client. Conformité totale avec les exigences des syndics, hôtels et cabinets médicaux.",
    metaDescription: "Preuve de passage nettoyage : QR code, photos avant-après horodatées, signature client, PV automatique. Conformité syndics et médical.",
    keywords: ['preuve passage nettoyage', 'QR code nettoyage', 'contrôle qualité nettoyage', 'PV intervention nettoyage'],
    problemTitle: "\"Vous êtes pas passé hier\" : le mot qui vous fait perdre des contrats",
    problemDescription: "Sans preuve de passage, vous êtes en parole contre parole. Le client conteste, vous ne pouvez rien prouver, vous perdez la mission, parfois le contrat. Et c'est désormais un critère éliminatoire pour beaucoup d'appels d'offres.",
    problemBullets: [
      "Aucune traçabilité quand un client conteste un passage",
      "Photos avant/après dispersées dans 12 conversations WhatsApp",
      "Pas de signature client horodatée",
      "Critère éliminatoire pour les appels d'offres publics et les syndics",
    ],
    solutionTitle: "Chaque intervention prouvée, horodatée, opposable",
    solutionDescription: "Proprely génère un QR code unique par site. L'agent scanne à son arrivée, prend des photos avant et après, fait signer le client (si présent). Le PV est automatiquement généré et envoyé au client.",
    benefits: [
      { icon: QrCode, title: 'QR code par site', desc: "Un QR code unique pour chaque site. L'agent scanne à l'arrivée. Heure et géolocalisation enregistrées automatiquement. Aucun moyen de falsifier." },
      { icon: Camera, title: 'Photos avant/après horodatées', desc: "L'agent prend des photos avant et après son intervention depuis Proprely. Horodatage et géolocalisation intégrés. Stockage sécurisé, accessibles 5 ans." },
      { icon: Signature, title: 'Signature client électronique', desc: "Si un représentant du client est présent (gardien, syndic, gestionnaire), il signe directement sur le téléphone de l'agent. PV instantané." },
      { icon: FileText, title: 'PV automatique', desc: "À la fin de chaque intervention, un PV est généré : date, heure, agent, photos, signature, observations. Envoyé au client par email automatiquement." },
      { icon: MapPin, title: 'Géolocalisation au check-in', desc: "Optionnel mais recommandé : le check-in QR code enregistre la géolocalisation. Vous prouvez que l'agent était bien sur place, pas à 3 km." },
      { icon: ShieldCheck, title: 'Conformité RGPD', desc: "Toutes les preuves de passage sont hébergées en Europe, chiffrées en transit et au repos, archivées 5 ans selon obligation légale. Conformité totale RGPD." },
    ],
    useCases: [
      { icon: Building2, client: 'Syndic multi-immeubles', situation: "Gardiens contestent les passages, syndic veut un PV par intervention", benefit: "QR code par hall d'entrée, photos avant/après publiques pour les gardiens, contestations divisées par 10" },
      { icon: Hotel, client: 'Groupe hôtelier 4 étoiles', situation: "Direction exige une traçabilité totale pour son audit qualité", benefit: "PV automatique par chambre et par étage, audit qualité préparé en 1 clic au lieu d'une semaine" },
      { icon: Stethoscope, client: 'Cabinet médical', situation: "Conformité protocole sanitaire strictement exigée par les médecins", benefit: "Photos avant/après horodatées validant le respect du protocole, signature électronique du référent à chaque passage" },
    ],
    faq: [
      { q: "Comment fonctionne le QR code par site ?", a: "Proprely génère un QR code unique pour chaque site lors de la création. Vous l'imprimez et le collez à un endroit visible (entrée, accueil). L'agent le scanne avec Proprely sur son téléphone à chaque arrivée." },
      { q: "Les photos sont-elles conservées combien de temps ?", a: "5 ans en standard, conforme aux obligations légales et aux exigences des syndics et appels d'offres. Stockage sécurisé en Europe, chiffré. Accessibles à tout moment via Proprely." },
      { q: "Que se passe-t-il si l'agent n'a pas de réseau au moment du check-in ?", a: "Proprely fonctionne en mode hors-ligne. Les photos et le check-in sont enregistrés localement et synchronisés dès que le réseau revient (typiquement à la sortie du sous-sol)." },
      { q: "Le client reçoit-il automatiquement le PV ?", a: "Oui, si vous l'activez. Le PV est envoyé par email après chaque intervention validée, avec photos et signature. Vous pouvez aussi le rendre accessible via un lien permanent." },
      { q: "Est-ce que la géolocalisation est obligatoire ?", a: "Non, c'est optionnel. Activée, elle ajoute une preuve supplémentaire (l'agent était bien sur place). Désactivée, vous gardez le QR + photos + horodatage qui suffisent dans la plupart des cas." },
    ],
    relatedSlugs: ['planning-nettoyage', 'gestion-agents-nettoyage'],
    relatedBlogSlugs: ['logiciel-societe-nettoyage-criteres', 'rgpd-societe-nettoyage-2026'],
  },
  {
    slug: 'gestion-sites-clients-nettoyage',
    tag: 'Sites & clients',
    icon: Building2,
    title: "Logiciel gestion sites et clients pour société de nettoyage",
    subtitle: "Centralisez vos comptes clients multi-sites dans un cockpit unique. Un client = N sites, chacun avec sa fréquence, ses protocoles, son historique d'interventions et sa marge en temps réel.",
    metaDescription: "Logiciel gestion sites et clients pour société de nettoyage : centralisation multi-sites, protocoles, historique, marge par client. Bêta gratuite.",
    keywords: ['logiciel gestion sites clients nettoyage', 'base clients propreté', 'gestion multi-sites nettoyage', 'CRM propreté multi-sites', 'fichier clients société nettoyage'],
    problemTitle: "Vos clients sont dans 3 Excel, vos sites dans 2 autres, vos contacts dans WhatsApp",
    problemDescription: "Pour une société de nettoyage B2B, un client = souvent 3 à 15 sites distincts. Bureaux Paris, agence Lyon, entrepôt Roissy. Chacun avec sa fréquence, son contact, ses protocoles, ses contraintes d'accès. En Excel, l'info se disperse en 6 mois et personne ne sait plus à qui parler.",
    problemBullets: [
      "Aucune vue d'ensemble \"qui sont mes 20 plus gros clients\" en 3 secondes",
      "Le contact syndic change, l'info reste dans la boîte mail du commercial sorti il y a 8 mois",
      "Quand un gardien appelle pour un problème, vous ne savez plus quel agent passe sur quel site",
      "Impossible de chiffrer la marge réelle par client sans 4 heures d'Excel",
      "Les protocoles d'accès (codes badges, horaires d'ouverture) se perdent entre les agents",
    ],
    solutionTitle: "Un compte client, N sites, l'info structurée et accessible en 2 clics",
    solutionDescription: "Proprely structure naturellement les comptes clients multi-sites comme dans la vraie vie : un compte parent (le syndic, le groupe hôtelier, le facility manager) qui contient N sites. Chaque site porte ses propres règles, son historique, ses photos, ses contacts. Vous changez d'agence, l'info reste centralisée et opposable.",
    benefits: [
      { icon: Building2, title: 'Hiérarchie compte → sites native', desc: "Un client peut avoir 1 à 100 sites. Chaque site a son adresse, son contact, sa fréquence, ses spécificités. Vue arborescente comme dans la vraie vie, sans bricolage Excel." },
      { icon: FolderOpen, title: 'Protocoles et contraintes par site', desc: "Codes badges, horaires d'ouverture, jours fériés spécifiques, exigences spéciales (silence dans cabinets médicaux, EPI obligatoires). Chaque agent voit ces consignes avant d'intervenir." },
      { icon: TrendingUp, title: 'Marge par client en temps réel', desc: "Pour chaque compte, marge brute calculée sur les heures réellement consommées vs facturation. Vous identifiez en 30 secondes le client qui plombe votre P&L." },
      { icon: Users, title: 'Contacts multiples par site', desc: "Gardien, syndic, facility manager, comptable : chaque rôle a son contact dédié. Plus jamais \"qui appelle-t-on déjà pour ce site ?\" en pleine urgence." },
      { icon: FileText, title: 'Historique d\'interventions complet', desc: "Toutes les missions, photos, PV, remarques, depuis le premier passage. Précieux pour les renégociations annuelles ou les contestations clients." },
      { icon: MapPin, title: 'Cartographie multi-sites', desc: "Vue carte de vos sites pour optimiser les tournées et l'affectation des agents par zone géographique. Réduction immédiate du temps de trajet." },
    ],
    useCases: [
      { icon: Building2, client: 'Syndic 30 copropriétés', situation: "30 immeubles, 4 régions, 1 contact gardien par immeuble", benefit: "Chaque immeuble = un site avec son gardien, son code, sa fréquence. Renouvellement du contrat triennal préparé en 1 h au lieu de 3 jours, marge par immeuble visible." },
      { icon: Hotel, client: 'Groupe hôtelier 5 établissements', situation: "5 hôtels, contacts différents par hôtel (responsable hébergement)", benefit: "Compte parent \"Groupe X\" + 5 sites enfants. Direction groupe voit le reporting consolidé, chaque DG d'hôtel reçoit son PV automatique." },
      { icon: Stethoscope, client: 'Facility manager tertiaire multi-villes', situation: "12 sites tertiaires en Île-de-France, 1 facility manager pour le tout", benefit: "Vue cartographique des 12 sites, planning agents par zone (Nord/Sud/Est), reporting consolidé envoyé chaque mois au FM." },
    ],
    faq: [
      { q: "Comment Proprely structure-t-il les clients multi-sites ?", a: "Un compte client parent (par exemple le syndic ou le groupe hôtelier) peut contenir N sites enfants. Chaque site porte ses propres règles, fréquence, contacts, historique. Idéal pour les facility managers et grands comptes multi-établissements." },
      { q: "Peut-on importer notre fichier clients Excel existant ?", a: "Oui. Pendant l'onboarding 30 min avec le fondateur, nous importons votre fichier clients/sites Excel en CSV. Aucune ressaisie manuelle, vos données arrivent structurées dans Proprely." },
      { q: "Comment voit-on la marge réelle par client ?", a: "Pour chaque compte, Proprely calcule la marge brute en temps réel : facturation cumulée − heures agents réellement passées × coût horaire chargé. Vous voyez immédiatement les clients qui tirent votre marge vers le haut ou le bas." },
      { q: "Peut-on stocker des documents spécifiques au client (contrat, CCTP) ?", a: "Oui. Chaque compte et chaque site dispose d'un dossier numérique pour stocker contrats signés, CCTP, plans d'accès, photos de référence, attestations URSSAF demandées par le client. Hébergement européen RGPD." },
      { q: "Comment gérer les contacts multiples par site ?", a: "Chaque site peut avoir plusieurs contacts avec leur rôle (gardien, syndic, comptabilité, urgences). Les notifications automatiques (PV de passage, factures, alertes) partent au bon contact selon le type d'événement." },
      { q: "Le module remplace-t-il un CRM commercial classique ?", a: "Pour la propreté B2B, oui dans 90 % des cas. Pour les forces de vente structurées avec plusieurs commerciaux et pipeline opportunités complexe, Proprely se complète avec HubSpot ou Pipedrive via connexion API. Voir notre page CRM propreté pour le détail." },
    ],
    relatedSlugs: ['gestion-agents-nettoyage', 'planning-nettoyage'],
    relatedBlogSlugs: ['trouver-clients-b2b-nettoyage', 'gestion-societe-nettoyage-outils'],
  },
  {
    slug: 'suivi-interventions-nettoyage',
    tag: 'Suivi missions',
    icon: Eye,
    title: "Logiciel suivi interventions pour société de nettoyage",
    subtitle: "Suivez chaque mission en temps réel : statut (planifiée, en cours, terminée), rapports, historique complet, alertes en cas de retard. Zéro oubli de passage, zéro contestation client.",
    metaDescription: "Logiciel suivi interventions nettoyage : statut temps réel, rapports automatiques, historique, alertes retard. Zéro oubli de passage. Bêta gratuite.",
    keywords: ['logiciel suivi interventions nettoyage', 'suivi missions propreté', 'gestion prestations nettoyage', 'rapport intervention nettoyage', 'tracking interventions B2B'],
    problemTitle: "Vous découvrez le passage oublié 3 jours après, quand le client appelle",
    problemDescription: "Sans système de suivi temps réel, vos interventions vivent leur vie. Vous ne savez pas qui est où, qui a terminé, qui a un problème. Un agent oublie un passage : vous l'apprenez quand le client appelle furieux 72 heures plus tard. Trop tard.",
    problemBullets: [
      "Aucune visibilité temps réel sur ce qui se passe sur le terrain",
      "Les oublis de passage se découvrent par les clients (signal d'alerte tardif)",
      "Les rapports d'intervention restent dans le téléphone de l'agent — ou pire, oraux",
      "Impossible de répondre à \"où est l'agent de l'Atrium ?\" sans 3 appels",
      "Historique d'interventions inexistant ou éclaté sur 5 supports différents",
    ],
    solutionTitle: "Chaque mission tracée, chaque statut visible, chaque oubli alerté avant le client",
    solutionDescription: "Proprely affiche en temps réel le statut de chaque mission de nettoyage : planifiée, en cours, terminée, en retard, problème signalé. Quand une mission n'a pas démarré 30 minutes après son créneau, une alerte arrive sur votre cockpit. Vous réagissez avant le client.",
    benefits: [
      { icon: Eye, title: 'Statut mission en temps réel', desc: "Dashboard live : combien de missions planifiées aujourd'hui, combien en cours, combien terminées, combien à risque. Vous pilotez votre journée comme une tour de contrôle." },
      { icon: AlertTriangle, title: 'Alerte automatique sur retard', desc: "Une mission qui n'a pas démarré 30 min après l'horaire planifié déclenche une alerte. Vous appelez l'agent, vous trouvez un remplaçant, vous prévenez le client. Avant qu'il vous appelle." },
      { icon: FileText, title: 'Rapports d\'intervention structurés', desc: "À chaque fin de mission, l'agent valide un rapport (durée réelle, anomalies, photos, consommables utilisés). Plus de rapports oraux ou perdus, tout est centralisé et opposable." },
      { icon: Clock, title: 'Historique complet par site', desc: "Toutes les interventions d'un site depuis le premier jour : dates, agents, durées, photos, anomalies. Précieux quand un client demande \"on est intervenu combien de fois en octobre ?\"" },
      { icon: Smartphone, title: 'Mise à jour mobile par l\'agent', desc: "L'agent ouvre Proprely sur son téléphone, voit ses missions du jour, démarre, termine, ajoute photos et notes. Sans app à installer, depuis n'importe quel navigateur mobile." },
      { icon: Send, title: 'Notification client automatique', desc: "Configurez l'envoi automatique d'une notification au client à la fin de chaque mission (PV avec photos). Réduit les contestations de 80 % et rassure les clients exigeants." },
    ],
    useCases: [
      { icon: Stethoscope, client: 'Cabinet médical exigeant', situation: "Passage quotidien obligatoire 6 h, protocole bionettoyage, médecin pointilleux", benefit: "Statut mission visible par le référent médical en temps réel, PV envoyé à 6h45, plus aucune contestation depuis 4 mois (vs 2 par semaine avant)." },
      { icon: Building2, client: 'Syndic 18 immeubles', situation: "Difficile de savoir qui a fait quoi sur quel immeuble cette semaine", benefit: "Vue d'ensemble en 1 écran : 18 immeubles, 5 status couleurs (à faire, en cours, fait, alerte). Réunion syndic préparée en 10 min." },
      { icon: Hotel, client: 'Hôtel 80 chambres', situation: "Brigade matin doit tout terminer avant 10h, retards = clients mécontents", benefit: "Suivi temps réel chambre par chambre, alerte si une chambre dépasse 25 min, réaffectation immédiate. Brigade respecte le timing à 95 % vs 70 % avant." },
    ],
    faq: [
      { q: "Comment fonctionne le suivi en temps réel ?", a: "Chaque mission planifiée a un statut visible dans le dashboard : planifiée, démarrée (agent a scanné le QR), en cours, terminée, en retard, problème signalé. Le dashboard se rafraîchit toutes les 30 secondes. Vous voyez la situation comme une tour de contrôle aérien." },
      { q: "Quand reçoit-on les alertes de retard ?", a: "Configurable : par défaut, alerte 30 min après l'horaire planifié sans démarrage de mission. Vous pouvez ajuster le seuil par site ou par client (un cabinet médical exigeant peut avoir un seuil à 10 min, un site standard à 45 min)." },
      { q: "Les agents peuvent-ils signaler un problème depuis leur téléphone ?", a: "Oui. Pendant la mission, l'agent peut signaler une anomalie (matériel cassé, accès bloqué, mission impossible à terminer) avec une photo et une note. Vous recevez l'alerte immédiatement, plus de \"on me l'a dit hier\"." },
      { q: "Les rapports d'intervention sont-ils exportables ?", a: "Oui, en PDF (PV individuel) et en CSV/Excel (synthèse mensuelle par site, par agent, par client). Idéal pour les revues clients trimestrielles et les audits internes." },
      { q: "Combien de temps les historiques sont-ils conservés ?", a: "5 ans en standard, conforme aux obligations contractuelles et aux exigences des syndics et facility managers. Hébergement européen, chiffrement en transit et au repos." },
      { q: "Le suivi fonctionne-t-il si l'agent n'a pas de réseau ?", a: "Oui. Mode hors-ligne : les statuts, photos et rapports sont enregistrés localement et synchronisés dès le retour du réseau (typiquement à la sortie du sous-sol)." },
    ],
    relatedSlugs: ['planning-nettoyage', 'preuve-passage-nettoyage'],
    relatedBlogSlugs: ['calcul-heures-agents-nettoyage', 'rgpd-societe-nettoyage-2026'],
  },
  {
    slug: 'pointage-agents-nettoyage',
    tag: 'Pointage GPS',
    icon: Clock,
    title: "Logiciel pointage GPS pour agents de nettoyage",
    subtitle: "Pointage mobile GPS, calcul automatique des heures travaillées, lutte contre la fraude au temps. Préparez la paie en 2 clics, sans badgeuse à installer, sans application à télécharger.",
    metaDescription: "Logiciel pointage GPS agents nettoyage : pointage mobile, calcul automatique heures, anti-fraude, export paie Silae. Sans badgeuse, sans app. Bêta gratuite.",
    keywords: ['logiciel pointage agents nettoyage', 'pointage GPS nettoyage', 'badgeuse mobile nettoyage', 'pointage mobile propreté', 'compteur heures agents nettoyage'],
    problemTitle: "Le pointage papier ou WhatsApp = sous-déclaration + paie compliquée",
    problemDescription: "La majorité des sociétés de nettoyage gèrent encore le pointage à l'ancienne : feuille papier signée par l'agent, photo WhatsApp d'une horloge, ou pire, simple parole. Conséquences : heures sous-déclarées (les agents perdent), heures surfacturées (vos clients râlent), fraudes possibles, et 3 à 5 heures par mois de re-saisie pour préparer la paie.",
    problemBullets: [
      "Feuilles papier perdues, illisibles, ou modifiées après coup",
      "Aucune preuve géolocalisée que l'agent était bien sur place",
      "Re-saisie manuelle des heures pour la paie : 3 à 5 h/mois perdues",
      "Erreurs de paie qui empoisonnent le climat social",
      "Risque URSSAF en cas de contrôle (heures complémentaires non déclarées)",
      "Impossible de prouver à un client que l'agent était bien sur site 4 h",
    ],
    solutionTitle: "Un pointage GPS mobile, sans badgeuse, qui prépare la paie automatiquement",
    solutionDescription: "Proprely transforme le téléphone de chaque agent en badgeuse mobile. Pointage à l'arrivée et au départ, géolocalisation optionnelle pour preuve, calcul automatique des heures travaillées (heures complémentaires, supplémentaires, nuit, dimanche, jours fériés), et export paie compatible Silae prêt en 2 clics. Aucune badgeuse à installer, aucune application à télécharger.",
    benefits: [
      { icon: Clock, title: 'Pointage mobile in/out', desc: "L'agent pointe son arrivée en scannant le QR code du site, et son départ en validant la fin de mission. Horodatage à la seconde près, impossible à falsifier après coup." },
      { icon: MapPin, title: 'Géolocalisation optionnelle', desc: "Activée, la géoloc enregistre la position GPS au pointage. Vous prouvez que l'agent était bien sur place, pas à 5 km en train de pointer pour son collègue. Optionnel et configurable par site." },
      { icon: Sparkles, title: 'Calcul automatique des heures', desc: "Proprely calcule en temps réel : heures normales, complémentaires (au-delà du contrat temps partiel), supplémentaires (au-delà de 35h), nuit (21h-6h), dimanche, jours fériés. Selon les majorations IDCC 3043." },
      { icon: ShieldCheck, title: 'Anti-fraude intégré', desc: "QR code unique par site + horodatage serveur + géoloc optionnelle = preuve cumulative opposable. Plus de pointage anticipé, plus de \"copain qui pointe pour moi\"." },
      { icon: FileText, title: 'Export paie Silae prêt', desc: "À la fin du mois, export CSV au format Silae directement importable dans votre logiciel de paie. Plus de re-saisie, plus d'erreurs. 3 à 5 h/mois récupérées." },
      { icon: Smartphone, title: 'Sans badgeuse, sans app', desc: "Aucun hardware à installer (économie 800-1500 € par site). Aucune application à télécharger (compatible tous Android/iOS). L'agent utilise son téléphone via un lien web." },
    ],
    useCases: [
      { icon: Building2, client: 'TPE 6 agents temps partiel', situation: "Pointage feuille papier, paie calculée à la main, 4 heures/mois pour le dirigeant", benefit: "Pointage QR remplace les feuilles, export Silae automatique. Le dirigeant récupère 3,5 h/mois et zéro erreur de paie depuis 2 mois." },
      { icon: Hotel, client: 'Brigade hôtel 12 agents', situation: "Pointage papier signé chaque matin par la gouvernante, fréquentes contestations", benefit: "Chaque agent pointe son arrivée à la prise de service via QR, départ en fin de chambre. Contestations divisées par 10, gouvernante libérée de la tâche." },
      { icon: Users, client: 'Société 25 agents multi-sites', situation: "Fraudes au pointage suspectées (agent A pointe pour agent B)", benefit: "Géolocalisation activée + QR unique par site : fraudes impossibles. Gain estimé : 200 h/mois récupérées sur les sous-déclarations + sur-pointages." },
    ],
    faq: [
      { q: "Comment fonctionne le pointage GPS pour agents nettoyage ?", a: "L'agent ouvre son lien Proprely sur son téléphone (sans app à installer), scanne le QR code du site à son arrivée. Le pointage est horodaté à la seconde, géolocalisé (si activé) et associé à sa mission planifiée. Idem pour le départ. Le compteur d'heures se met à jour automatiquement." },
      { q: "Faut-il installer une badgeuse physique sur chaque site ?", a: "Non. Vous imprimez le QR code unique du site et le collez à l'entrée. C'est tout. Économie immédiate : 800-1500 € par site vs une badgeuse traditionnelle, et aucune maintenance hardware." },
      { q: "Les agents doivent-ils télécharger une application ?", a: "Non. Proprely fonctionne via un lien web ouvert dans le navigateur du téléphone (Chrome, Safari). Compatible 100 % Android et iOS, fonctionne sur 4G dégradée." },
      { q: "Comment Proprely calcule-t-il les heures complémentaires ?", a: "Selon votre convention (IDCC 3043 propreté pour la France) : heures complémentaires majorées à 10 % de 1 à 8 h au-delà du contrat temps partiel, 25 % au-delà. Heures supplémentaires majorées 25 % au-delà de 35 h hebdo, 50 % au-delà de 43 h. Heures de nuit (21h-6h) majorées selon votre accord d'entreprise. Tout configurable." },
      { q: "L'export paie est-il compatible avec Silae ou d'autres logiciels ?", a: "Oui. Export CSV au format standard directement importable dans Silae, Sage Paie, Cegid, Quadratus, Payfit. Spécification format disponible pour intégrations spécifiques sur demande." },
      { q: "Peut-on désactiver la géolocalisation par site ou par agent ?", a: "Oui, la géoloc est configurable par site. Activée par défaut sur les sites à fort enjeu (médical, syndics exigeants), désactivable sur les sites où elle pose un sujet RGPD ou social. Le pointage QR + horodatage reste valable dans tous les cas." },
      { q: "Comment se compare le pointage Proprely au pointage Organilog ou PROPRET ?", a: "Organilog propose un pointage mobile générique non spécifique propreté (pas de calcul natif des majorations IDCC 3043). PROPRET et Progiclean ont un pointage métier intégré, mais nécessitent une app native à installer et un setup intégrateur. Proprely est conçu propreté + sans app à installer + export paie direct, idéal pour TPE/PME B2B 3-50 agents." },
      { q: "Que se passe-t-il en cas de panne réseau au moment du pointage ?", a: "Mode hors-ligne natif : le pointage est enregistré localement avec horodatage et géoloc, synchronisé dès le retour du réseau. Aucune perte de donnée, aucun pointage manqué." },
    ],
    relatedSlugs: ['gestion-agents-nettoyage', 'planning-nettoyage'],
    relatedBlogSlugs: ['calcul-heures-agents-nettoyage', 'convention-collective-nettoyage-idcc-3043', 'cout-horaire-charge-agent-nettoyage'],
  },
  {
    slug: 'facturation-nettoyage',
    tag: 'Facturation',
    icon: FileSignature,
    title: "Logiciel facturation pour société de nettoyage",
    subtitle: "Facturation électronique conforme, récurrente automatique sur contrats, relances paiement à J+15 et J+30. Gagnez 4 à 6 heures par mois sur l'admin facturation, avec une trésorerie qui rentre à temps.",
    metaDescription: "Logiciel facturation société nettoyage : facturation électronique, récurrente, relances automatiques, export comptable. Gagnez 4-6h/mois. Bêta gratuite.",
    keywords: ['logiciel facturation société nettoyage', 'facturation électronique propreté', 'facturation récurrente nettoyage', 'logiciel facturation entreprise propreté', 'facture nettoyage automatique'],
    problemTitle: "4 à 6 heures par mois sur la facturation manuelle, et 30 % de retards de paiement",
    problemDescription: "Sur 10 contrats récurrents, c'est 10 factures à émettre chaque mois, à envoyer, à suivre, à relancer. Sur Word + Excel + Outlook, comptez 4 à 6 heures de pure admin par mois — temps qui ne crée aucune valeur. Pire : sans relances structurées, 30 % de vos factures sont payées en retard, et 3-5 % deviennent des impayés.",
    problemBullets: [
      "Re-saisir chaque mois les mêmes factures pour les contrats récurrents",
      "Oubli de facture en début de mois quand la charge opérationnelle est lourde",
      "Pas de suivi automatique des paiements : qui a payé, qui n'a pas payé ?",
      "Relances manuelles oubliées : 30 % des factures payées en retard (impact trésorerie)",
      "Risque réglementaire 2026 : facturation électronique obligatoire entre entreprises",
      "Pas d'export comptable automatique : la compta refait la saisie (et facture le temps)",
    ],
    solutionTitle: "Facturation automatique sur contrats + relances structurées + conformité électronique 2026",
    solutionDescription: "Une fois le devis signé dans Proprely, le contrat se crée et déclenche la facturation automatique : facture émise chaque mois à la date configurée, envoyée par email avec lien de paiement, relancée à J+15 et J+30 si impayé. Conformité facturation électronique 2026 native (Chorus Pro et PDP), export comptable direct vers Pennylane/Tiime/Sage.",
    benefits: [
      { icon: Repeat, title: 'Facturation récurrente automatique', desc: "Devis signé = contrat = facture mensuelle automatique. Vous configurez la date d'émission (ex : 1er du mois), Proprely fait le reste. Vous récupérez 4 à 6 heures/mois et zéro oubli." },
      { icon: FileSignature, title: 'Facturation électronique 2026 conforme', desc: "Format Factur-X natif, dépôt Chorus Pro et PDP (Plateforme de Dématérialisation Partenaire) prêts pour l'obligation 2026 B2B. Aucun ajustement à faire le jour J." },
      { icon: Send, title: 'Envoi et lien de paiement', desc: "Facture envoyée automatiquement par email au bon contact (comptabilité). Inclut un lien de paiement en ligne (virement, CB via Stripe) pour accélérer l'encaissement de 5 à 10 jours en moyenne." },
      { icon: Mail, title: 'Relances automatiques structurées', desc: "Pas de paiement à J+15 ? Relance courtoise auto. À J+30 ? Relance ferme avec mention de pénalités. À J+45 ? Alerte dirigeant pour intervention manuelle. Réduit les impayés de 60 %." },
      { icon: TrendingUp, title: 'Suivi paiement temps réel', desc: "Dashboard : factures émises, encaissées, en attente, en retard. DSO (Days Sales Outstanding) calculé automatiquement. Vous pilotez votre trésorerie en 30 secondes." },
      { icon: FolderOpen, title: 'Export comptable direct', desc: "Connexion native Pennylane et Tiime (en finalisation), export CSV/XML pour Sage, Cegid, Quadratus. Votre comptable ne re-saisit plus, économie 100 à 300 € HT/mois sur ses honoraires." },
    ],
    useCases: [
      { icon: Building2, client: 'PME 15 contrats récurrents', situation: "15 factures à émettre chaque mois sur Word + envoi Outlook, 5 h/mois", benefit: "Facturation auto le 1er du mois, envoi auto avec lien paiement. 4,5 h/mois récupérées, DSO réduit de 38 à 24 jours en 3 mois." },
      { icon: Hotel, client: 'Groupe hôtelier 5 sites', situation: "Facturation centralisée groupe mais ventilation par hôtel demandée", benefit: "Facture parent groupe + détail par hôtel, format Factur-X envoyé via Chorus Pro. Direction administrative validation en 5 min vs 1 h avant." },
      { icon: Users, client: 'Société 8 agents en croissance', situation: "Trésorerie tendue, impayés récurrents sur 3-4 clients", benefit: "Relances automatiques J+15 et J+30 : 4 impayés sur 12 mois vs 11 l'année précédente. Trésorerie débloquée de 18k € en 6 mois." },
    ],
    faq: [
      { q: "La facturation Proprely est-elle conforme à la réforme 2026 ?", a: "Oui. Format Factur-X natif (PDF + XML structuré), dépôt Chorus Pro pour les marchés publics, et compatibilité PDP (Plateforme de Dématérialisation Partenaire) pour les échanges B2B obligatoires en 2026. Aucune action à prévoir le jour J de la réforme." },
      { q: "Comment fonctionne la facturation récurrente automatique ?", a: "Quand un devis est signé dans Proprely, il devient un contrat avec une date de facturation configurée (par défaut le 1er du mois). À cette date, Proprely émet automatiquement la facture, l'envoie par email au contact comptabilité du client avec lien de paiement, et la rentre dans le suivi. Aucune intervention manuelle." },
      { q: "Les relances de paiement sont-elles personnalisables ?", a: "Oui. Modèles configurables pour J+15 (relance courtoise), J+30 (relance ferme avec mention pénalités), J+45 (alerte dirigeant pour gestion contentieux). Vous éditez le ton, l'objet, les pièces jointes une fois et c'est valable pour tous les clients." },
      { q: "Avec quels logiciels comptables Proprely se connecte-t-il ?", a: "Connexion native Pennylane (production) et Tiime (en finalisation). Export CSV/XML standard pour Sage, Cegid, Quadratus, EBP, Apogée. Spécification format disponible pour intégrations spécifiques sur demande." },
      { q: "Peut-on facturer en TVA 10 % et 20 % ?", a: "Oui. Configuration TVA par prestation (10 % pour copropriétés résidentielles, 20 % pour tertiaire B2B). Calcul automatique au moment de l'émission. Mentions légales conformes." },
      { q: "Comment se compare la facturation Proprely à celle de Henrri ou Bizyness ?", a: "Henrri et Bizyness sont d'excellents logiciels de facturation pure, mais sans planning, sans preuve de passage, sans calcul de marge par client. Vous devez les coupler à d'autres outils. Proprely intègre nativement facturation + planning + preuve de passage + marge, ce qui supprime les ressaisies et donne une vue 360°." },
      { q: "Combien de temps économise-t-on avec la facturation automatisée ?", a: "Sur les retours bêta : 4 à 6 heures par mois économisées (re-saisie, envoi, suivi, relances), soit 50 à 70 heures par an. Pour un dirigeant à 45 € de coût horaire chargé : 2 250 à 3 150 € de temps récupéré par an, sans compter la réduction du DSO et des impayés." },
    ],
    relatedSlugs: ['devis-nettoyage', 'gestion-sites-clients-nettoyage'],
    relatedBlogSlugs: ['logiciel-devis-nettoyage-gratuit', 'fixer-prix-nettoyage'],
  },
]

// Mapping HowTo par fonctionnalité, séparé de l'array principal pour
// faciliter la mise à jour. Génère un schema.org HowTo dans les pages
// fonctionnalités (utile pour Google Rich Results et les Generative Engines).
const FEATURE_HOWTO: Record<string, FeatureHowTo> = {
  'planning-nettoyage': {
    name: "Créer et affecter un planning d'agents de nettoyage avec Proprely",
    description: "Configurer un planning hebdomadaire multi-sites, affecter les agents en 1 clic selon spécialités et disponibilité, et le rendre consultable par les agents sur leur téléphone.",
    steps: [
      { name: "Créer les sites clients", text: "Ajoutez vos sites clients avec adresse, fréquence d'intervention (quotidien, hebdomadaire, etc.) et plages horaires souhaitées. Vous pouvez importer une liste depuis Excel pendant l'onboarding." },
      { name: "Renseigner les agents et leurs spécialités", text: "Créez le profil de chaque agent : nom, contact, spécialités (vitrerie, moquette, décapage, remise en état), charge horaire hebdomadaire cible. Ces spécialités servent à l'affectation automatique." },
      { name: "Glisser-déposer un agent sur un créneau", text: "Sur la vue planning de la semaine, faites glisser un agent sur un créneau d'intervention. Proprely vérifie sa disponibilité, sa spécialité et sa charge horaire pour éviter doubles-bookings et surmenage." },
      { name: "Envoyer le planning aux agents", text: "À la validation, chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Pas d'application à installer. Il voit son planning de la semaine et coche les missions terminées en temps réel." },
      { name: "Suivre et ajuster", text: "Depuis le dashboard, suivez l'avancement en temps réel. Une mission absente déclenche une alerte. Vous pouvez réaffecter en 1 clic à un autre agent disponible." },
    ],
  },
  'devis-nettoyage': {
    name: "Créer un devis nettoyage intelligent par IA en 2 minutes avec Proprely",
    description: "Construire un devis de prestation nettoyage avec algorithme IA qui croise 9 facteurs (marché, calendrier, coûts réels) et propose 3 scénarios optimisés (marge protégée, gagner le contrat, upsell maximisé) pour maximiser conversion et marge.",
    steps: [
      { name: "Sélectionner le client et le site", text: "Choisissez un client existant ou créez-le. Ajoutez le site concerné avec sa surface, son type (bureaux, copropriété, hôtel, médical, industriel) et ses spécificités. L'IA utilise ces signaux pour estimer le profil client." },
      { name: "Choisir les prestations et la fréquence", text: "Sélectionnez dans votre catalogue les prestations (nettoyage quotidien, vitrerie mensuelle, moquette trimestrielle, bionettoyage…). L'IA charge automatiquement les coûts associés depuis vos paramètres (consommables, machines, masse salariale chargée)." },
      { name: "Laisser l'IA générer 3 scénarios", text: "En 3 secondes, l'algorithme IA croise 9 facteurs (prix marché local, disponibilités calendrier, vos avis et crédibilité, profil client, coûts directs, frais de structure, budget marketing) et propose 3 scénarios : Marge protégée, Gagner le contrat, Upsell maximisé. Chaque scénario affiche son prix, sa marge nette estimée et sa probabilité de signature." },
      { name: "Choisir le scénario et ajuster si besoin", text: "Sélectionnez le scénario adapté à votre contexte commercial. Toutes les lignes restent éditables si vous voulez personnaliser. Proprely génère un PDF professionnel avec votre logo, vos mentions légales et CGV." },
      { name: "Envoyer pour signature électronique", text: "Envoyez le devis par e-mail avec un lien de signature électronique conforme eIDAS. Le client signe en 30 secondes depuis son téléphone ou son ordinateur." },
      { name: "Relancer et convertir en contrat avec facturation automatique", text: "Proprely suit l'état du devis (envoyé, ouvert, signé, refusé). Relances automatiques à J+5 et J+10. À la signature, le contrat se crée, alimente le planning et déclenche la facturation récurrente automatique chaque mois — avec relances à J+15 et J+30 si impayé." },
    ],
  },
  'gestion-agents-nettoyage': {
    name: "Gérer les agents d'une société de nettoyage avec Proprely",
    description: "Configurer le profil de chaque agent, suivre la charge horaire, les spécialités et les certifications, prévenir le surmenage et fidéliser l'équipe.",
    steps: [
      { name: "Créer le profil agent", text: "Renseignez identité, contact, contrat (CDI/CDD), date d'embauche, charge horaire cible. Ajoutez les documents administratifs (contrat, attestation URSSAF, fiche de paie type) dans son dossier numérique." },
      { name: "Renseigner les spécialités", text: "Cochez les prestations maîtrisées : vitrerie, moquette, décapage, remise en état, bionettoyage, salles propres, ESD. Ces spécialités filtrent les agents proposés lors de l'affectation au planning." },
      { name: "Suivre la charge horaire en temps réel", text: "Le dashboard agent affiche heures planifiées vs heures cible. Si un agent dépasse son seuil (ex : 39h sur 35h cible), une alerte surmenage se déclenche automatiquement." },
      { name: "Gérer les absences et remplacements", text: "Quand un agent est absent, Proprely propose en 1 clic les remplaçants les plus pertinents (proximité géographique, spécialité, charge horaire disponible). Historique conservé pour la traçabilité." },
      { name: "Préparer la paie sans erreur", text: "À la fin du mois, exportez les heures travaillées de chaque agent vers votre logiciel de paie (Silae compatible). Compteur d'heures, primes, heures sup intégrées. Plus de pointage manuel." },
    ],
  },
  'preuve-passage-nettoyage': {
    name: "Mettre en place une preuve de passage de nettoyage avec QR code et photos",
    description: "Configurer une preuve de passage standardisée sur un site client, avec QR code physique, photos avant-après, signature client, et PV automatique envoyé au syndic ou facility manager.",
    steps: [
      { name: "Configurer le site et générer le QR code", text: "Sur la fiche du site client, activez la preuve de passage. Proprely génère un QR code unique à imprimer et coller sur le site (entrée, local technique, hall)." },
      { name: "L'agent scanne le QR à l'arrivée", text: "L'agent ouvre son lien Proprely, scanne le QR code du site. Le check-in est horodaté et géolocalisé (si activé) automatiquement. La mission démarre." },
      { name: "Prendre les photos avant-après", text: "L'agent prend des photos avant et après l'intervention via Proprely. Les photos sont automatiquement associées au site, à la mission et à la date. Stockage sécurisé européen, 5 ans de conservation." },
      { name: "Faire signer le client (optionnel)", text: "Si un client ou gardien est présent, il signe sur l'écran du téléphone de l'agent. Sa signature est intégrée au PV automatique." },
      { name: "Le PV part automatiquement", text: "À la validation de la mission, Proprely génère un PV PDF (QR + photos avant/après + signature + horodatage + agent) et l'envoie automatiquement au syndic ou facility manager configuré. Format accepté par les principaux acteurs nationaux." },
    ],
  },
}

export function getFeature(slug: string): FeaturePage | undefined {
  const f = features.find((p) => p.slug === slug)
  if (!f) return undefined
  if (f.howTo) return f
  const howTo = FEATURE_HOWTO[slug]
  return howTo ? { ...f, howTo } : f
}

export function getRelatedFeatures(slug: string, max = 2): FeaturePage[] {
  const f = getFeature(slug)
  if (f?.relatedSlugs?.length) {
    return f.relatedSlugs.map((s) => getFeature(s)).filter((x): x is FeaturePage => Boolean(x)).slice(0, max)
  }
  return features.filter((p) => p.slug !== slug).slice(0, max)
}
