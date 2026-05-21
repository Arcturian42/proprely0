import type { LucideIcon } from 'lucide-react'
import { Calendar, FileText, Users, QrCode, Clock, AlertTriangle, ShieldCheck, Smartphone, Camera, Signature, MapPin, Building2, Hotel, Stethoscope, TrendingUp, Sparkles, Zap, FileSignature, FolderOpen, Repeat, Send, Mail } from 'lucide-react'

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
    title: "Planning des agents de nettoyage : la gestion centralisée pour les sociétés de propreté B2B",
    subtitle: "Affectez vos agents en 1 clic selon leurs spécialités et leur disponibilité. Vos agents consultent leur planning sur leur téléphone, sans application à installer.",
    metaDescription: "Logiciel de planning pour agents de nettoyage : affectation 1-clic, vue par agent et par site, alertes surmenage, remplacements traçables. Conçu pour la propreté B2B.",
    keywords: ['planning agents nettoyage', 'logiciel planning propreté', 'gestion planning nettoyage', 'planning hebdomadaire nettoyage'],
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
      { q: "Mes agents ont-ils besoin d'installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning s'affiche dans son navigateur. Pas d'installation, pas de formation." },
      { q: "Comment gérer les remplacements de dernière minute ?", a: "Quand un agent signale une absence, Proprely propose automatiquement les remplaçants les plus pertinents selon leur spécialité, leur proximité géographique et leur charge horaire actuelle. Vous validez en 1 clic, l'historique est conservé." },
      { q: "Le planning prend-il en compte les spécialités des agents ?", a: "Oui. Chaque agent a un profil avec ses spécialités (vitrerie, moquette, décapage, remise en état post-chantier). Quand vous affectez une mission spécialisée, le système propose en priorité les agents formés." },
      { q: "Combien de temps pour configurer le planning de notre entreprise ?", a: "30 minutes lors d'un appel avec le fondateur. Nous importons vos sites, vos agents, vos fréquences d'intervention. À la fin de l'appel, votre planning est opérationnel." },
      { q: "Peut-on gérer plusieurs équipes ou plusieurs sites ?", a: "Oui. Proprely est conçu pour les sociétés multi-sites : un client peut avoir 1 à N sites, chaque site a son planning propre, et vous avez la vue d'ensemble par agent, par client ou par jour." },
    ],
    relatedSlugs: ['gestion-agents-nettoyage', 'preuve-passage-nettoyage'],
    relatedBlogSlugs: ['fideliser-agents-nettoyage-turnover', 'calcul-heures-agents-nettoyage'],
  },
  {
    slug: 'devis-nettoyage',
    tag: 'Devis',
    icon: FileText,
    title: "Logiciel de devis nettoyage : devis professionnels en 2 minutes pour les sociétés de propreté",
    subtitle: "Vos devis prêts en 2 minutes au lieu de 20. Template à votre charte, envoi par email, signature électronique, suivi des relances. Marge optimisée selon votre historique.",
    metaDescription: "Logiciel de devis pour société de nettoyage : génération en 2 minutes, template personnalisé, signature électronique, suivi commercial. Conçu pour la propreté B2B.",
    keywords: ['logiciel devis nettoyage', 'devis nettoyage modèle', 'devis propreté B2B', 'modèle devis société nettoyage'],
    problemTitle: "20 minutes par devis sur Word, et le concurrent a déjà répondu",
    problemDescription: "Vous ouvrez un ancien devis, vous changez les références, vous recalculez les prix à la main, vous mettez la signature image, vous exportez en PDF. Pendant ce temps, le concurrent a envoyé sa proposition en 10 minutes.",
    problemBullets: [
      "20 minutes en moyenne par devis sur Word",
      "Risque d'erreur dans les calculs (TVA, panier, primes)",
      "Pas de suivi des relances, pas de pipeline commercial",
      "Pas de signature électronique : le client doit imprimer, scanner, renvoyer",
    ],
    solutionTitle: "Devis professionnels générés en 2 minutes, signature électronique incluse",
    solutionDescription: "Proprely génère vos devis depuis un template à votre charte. Vous choisissez le client, vous ajoutez les prestations depuis votre catalogue, le système calcule les marges et la TVA. Envoi par email avec signature électronique.",
    benefits: [
      { icon: Send, title: 'Génération en 2 minutes', desc: "Sélectionnez le client, ajoutez les prestations depuis votre catalogue, validez. Le PDF est prêt avec votre logo, vos couleurs, vos mentions légales." },
      { icon: FileSignature, title: 'Signature électronique', desc: "Le client signe directement depuis son navigateur, sans imprimer ni scanner. Le devis signé revient automatiquement dans Proprely." },
      { icon: TrendingUp, title: 'Marge optimisée', desc: "Le système suggère un prix basé sur votre historique et le marché local. Vous voyez votre marge brute en temps réel avant d'envoyer." },
      { icon: Mail, title: "Suivi automatique des relances", desc: "Devis envoyé → en attente → ouvert → signé. Relances programmées si pas de réponse à J+5 et J+10. Plus de prospects oubliés dans les mails." },
      { icon: FolderOpen, title: 'Catalogue de prestations réutilisable', desc: "Vos prestations récurrentes (quotidien bureaux, vitrerie hauteur, décapage) sauvegardées une fois, réutilisables à l'infini. Tarification cohérente." },
      { icon: Sparkles, title: 'Conversion en facture en 1 clic', desc: "Devis signé ? Convertissez-le en facture en 1 clic. La facture reprend tous les éléments avec la numérotation comptable correcte." },
    ],
    useCases: [
      { icon: Building2, client: 'Bureaux multi-sites', situation: "Devis annuel pour 4 immeubles, 15 lots de prestations", benefit: "Catalogue réutilisable, devis structuré par site et par lot, envoyé en 5 minutes au lieu de 90" },
      { icon: Hotel, client: 'Ouverture nouveau site', situation: "Prospect demande devis sous 24h, met 3 prestataires en concurrence", benefit: "Devis envoyé en 10 minutes après l'appel découverte, le prospect signe avant que le concurrent ne réponde" },
      { icon: Stethoscope, client: 'Cabinet médical pluridisciplinaire', situation: "Demande devis ponctuel pour remise en état après travaux", benefit: "Devis spécifique généré depuis le template \"ponctuel\", signature électronique en bas de page, intervention validée le jour même" },
    ],
    faq: [
      { q: "Puis-je personnaliser le design du devis avec ma charte graphique ?", a: "Oui. Votre logo, vos couleurs, vos mentions légales, vos conditions générales. Le template est configuré une seule fois lors de l'onboarding et appliqué à tous vos devis." },
      { q: "Le devis inclut-il la signature électronique du client ?", a: "Oui. Le client reçoit un email avec un lien sécurisé. Il signe en ligne depuis n'importe quel appareil. Le devis signé revient automatiquement dans Proprely avec horodatage." },
      { q: "Comment fonctionne la conversion devis vers facture ?", a: "Un devis signé peut être converti en facture en 1 clic. La facture reprend automatiquement les éléments, applique la numérotation comptable, et peut être envoyée immédiatement au client." },
      { q: "Puis-je relancer automatiquement les prospects qui n'ont pas signé ?", a: "Oui. Proprely envoie des relances automatiques à J+5 et J+10 si le devis n'a pas été ouvert ou signé. Vous gardez la main pour personnaliser ou suspendre les relances." },
      { q: "Quelle est la différence avec un logiciel comptable comme Pennylane ?", a: "Proprely gère l'avant-vente (catalogue, devis, signature, relances), Pennylane gère l'après (facture, comptabilité, déclarations). Les deux se complètent via une connexion native." },
    ],
    relatedSlugs: ['planning-nettoyage', 'gestion-agents-nettoyage'],
    relatedBlogSlugs: ['fixer-prix-nettoyage', 'logiciel-societe-nettoyage-criteres'],
  },
  {
    slug: 'gestion-agents-nettoyage',
    tag: 'Agents',
    icon: Users,
    title: "Gestion des agents de nettoyage : suivi, spécialités, alertes surmenage",
    subtitle: "Pilotez vos équipes de nettoyage avec précision : profils détaillés, suivi des spécialités, alertes de surcharge horaire, historique d'interventions. Évitez les burn-outs avant qu'ils n'arrivent.",
    metaDescription: "Logiciel de gestion des agents de nettoyage : profils, spécialités (vitrerie, moquette, décapage), suivi charge horaire, alertes surmenage. Conçu pour la propreté B2B.",
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
    title: "Preuve de passage nettoyage : QR code, photos avant-après et signature client",
    subtitle: "Fin des litiges \"vous êtes pas passé\". Chaque intervention est tracée par QR code, photos horodatées, signature client. Conformité totale avec les exigences des syndics, hôtels et cabinets médicaux.",
    metaDescription: "Logiciel preuve de passage nettoyage : QR code, photos avant-après horodatées, signature client électronique, PV automatique. Conformité syndics, hôtels, cabinets médicaux.",
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
    name: "Créer un devis de nettoyage professionnel en 2 minutes avec Proprely",
    description: "Construire un devis de prestation de nettoyage à partir d'un client, de prestations standardisées, et l'envoyer avec signature électronique pour relance automatique.",
    steps: [
      { name: "Sélectionner le client et le site", text: "Choisissez un client existant ou créez-le. Ajoutez le site concerné avec sa surface et ses spécificités (bureaux, copropriété, hôtel, médical)." },
      { name: "Choisir les prestations et la fréquence", text: "Sélectionnez dans votre catalogue les prestations (nettoyage quotidien, vitrerie mensuelle, moquette trimestrielle…). Le prix se calcule automatiquement selon votre grille interne (m² × tarif × fréquence)." },
      { name: "Personnaliser et générer le PDF", text: "Ajustez les commentaires, conditions de paiement, durée de validité. Proprely génère un PDF professionnel avec votre logo, vos mentions légales et CGV." },
      { name: "Envoyer pour signature électronique", text: "Envoyez le devis par email avec un lien de signature électronique. Le client signe en 30 secondes depuis son téléphone ou son ordinateur." },
      { name: "Relancer et convertir en contrat", text: "Proprely suit l'état du devis (envoyé, ouvert, signé, refusé). Relances automatiques après J+3 et J+7. À la signature, le contrat se crée et alimente le planning automatiquement." },
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
