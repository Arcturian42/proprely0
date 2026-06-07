// Pages "alternative à X" — angle éditorial différent des comparatifs purs.
// Ces pages ciblent les requêtes "alternative à [concurrent]", "[concurrent]
// pas cher", "[concurrent] trop cher", "remplacer [concurrent]". L'intention
// utilisateur est de quitter le produit actuel ; l'angle éditorial l'aide à
// formuler les bonnes raisons et présente Proprely comme remplacement crédible.

export type AlternativeReason = {
  title: string
  description: string
}

export type AlternativeStep = {
  title: string
  description: string
}

export type AlternativeFAQ = { q: string; a: string }

export type AlternativeTableRow = {
  criterion: string
  competitor: string
  proprely: string
}

export type AlternativePage = {
  slug: string
  competitorName: string
  competitorUrl?: string
  title: string
  metaTitle: string
  metaDescription: string
  tldr: string
  /** Pourquoi les utilisateurs cherchent une alternative (5-7 raisons concrètes) */
  reasonsToLeave: AlternativeReason[]
  /** Comparaison rapide sur 8-12 critères clés (table simplifiée) */
  quickTable: AlternativeTableRow[]
  /** Plan de migration en 4-5 étapes */
  migrationSteps: AlternativeStep[]
  /** FAQ orientée objections de migration */
  faq: AlternativeFAQ[]
  /** Slug du comparatif détaillé associé (pour cross-linking) */
  comparisonSlug?: string
}

export const alternatives: AlternativePage[] = [
  {
    slug: 'alternative-organilog',
    competitorName: 'Organilog',
    competitorUrl: 'https://www.organilog.com',
    title: "Alternative à Organilog pour société de nettoyage : 5 raisons + comparatif 2026",
    metaTitle: 'Alternative à Organilog : Proprely (spécialisé nettoyage) · 2026',
    metaDescription: "Vous cherchez une alternative spécialisée nettoyage à Organilog ? Découvrez Proprely : conçu 100 % propreté B2B, mobile-first, gratuit en bêta. Comparatif détaillé.",
    tldr: "Organilog est une suite multi-métiers (BTP, sécurité, espaces verts, nettoyage) qui demande beaucoup de paramétrage pour devenir vraiment adapté à la propreté. Proprely est l'alternative spécialisée 100 % propreté B2B : vocabulaire métier natif (sites, agents avec spécialités vitrerie/décapage, preuve de passage syndic), marge par client en temps réel, onboarding 30 min. Gratuit pendant la bêta privée, tarif fondateur à vie après.",
    reasonsToLeave: [
      { title: "Vocabulaire et workflows pas adaptés au métier propreté", description: "Organilog est généraliste : interventions, ressources, prestations… vous devez paramétrer chaque concept pour qu'il colle à votre métier. Avec Proprely, les concepts métier propreté sont natifs : sites clients, agents avec spécialités (vitrerie hauteur, moquette, décapage, bionettoyage), missions récurrentes, preuve de passage syndic." },
      { title: "Pas de marge par client en temps réel", description: "Organilog dispose d'un module reporting où vous construisez la marge comme un rapport périodique à configurer. Proprely affiche la marge brute par client directement sur le dashboard d'accueil — vous identifiez le client qui plombe votre P&L en 30 secondes, pas en 30 minutes de paramétrage BI." },
      { title: "Spécialités agents pas natives", description: "Sur Organilog, vous créez les compétences agents génériques (\"compétence 1\", \"compétence 2\"). Sur Proprely, les spécialités propreté sont préconfigurées : vitrerie en hauteur, moquette, décapage, remise en état post-chantier, bionettoyage médical, salles propres ESD." },
      { title: "Pas de format preuve de passage standardisé pour syndics", description: "Organilog laisse à configurer la preuve d'intervention à votre charte. Proprely propose un format preuve de passage standardisé (QR + photos avant/après + signature + horodatage) accepté tel quel par les principaux syndics nationaux et facility managers — gain immédiat à la signature des appels d'offres." },
      { title: "Tarif facturé même sur fonctions non utilisées", description: "Organilog facture à partir d'~25 €/utilisateur/mois (selon devis) pour une suite large dont vous n'utilisez que la moitié si vous êtes pure propreté. Proprely est gratuit pendant la bêta privée (30 fondateurs) et le tarif fondateur reste valable à vie après le lancement public." },
      { title: "Onboarding plus long pour le métier propreté", description: "Sur Organilog, comme l'outil est généraliste, la configuration initiale propreté demande plusieurs jours (tutoriels + paramétrage). Sur Proprely : 30 minutes avec le fondateur, import de votre fichier clients/sites, vous êtes opérationnel." },
    ],
    quickTable: [
      { criterion: "Spécialisation métier", competitor: "Multi-métiers (généraliste)", proprely: "100 % propreté B2B" },
      { criterion: "Spécialités agents", competitor: "À paramétrer", proprely: "Natives (vitrerie, moquette, décapage…)" },
      { criterion: "Preuve de passage syndic", competitor: "À configurer", proprely: "Standardisée (QR + photos + signature)" },
      { criterion: "Marge par client temps réel", competitor: "Reporting BI à configurer", proprely: "Natif sur dashboard" },
      { criterion: "Onboarding", competitor: "Tutoriels + paramétrage", proprely: "30 min avec le fondateur" },
      { criterion: "Devis IA propriétaire", competitor: "Devis classique", proprely: "Natif (9 facteurs, 3 scénarios)" },
      { criterion: "Conformité IDCC 3043", competitor: "Paramétrage manuel", proprely: "Grille salaires intégrée" },
      { criterion: "Tarif TPE 5 agents", competitor: "~125 €/mois (5 × 25 €)", proprely: "Gratuit bêta, tarif fondateur à vie" },
      { criterion: "Mobile agent", competitor: "App native (Android/iOS)", proprely: "Lien web (pas d'installation)" },
      { criterion: "Export données", competitor: "Oui", proprely: "Oui (CSV/Excel 1-clic)" },
    ],
    migrationSteps: [
      { title: "Export Organilog → CSV", description: "Depuis Organilog, exportez vos clients, sites, agents et plannings au format CSV/Excel. Comptez 1-2 h selon la richesse de votre base." },
      { title: "Onboarding Proprely 30 min", description: "Programmez un appel avec le fondateur Proprely. Vous lui transmettez vos exports CSV. Pendant l'appel, il importe les données et configure votre cockpit (sites, fréquences, agents, spécialités)." },
      { title: "Test en parallèle 1-2 semaines", description: "Gardez Organilog actif en parallèle 1-2 semaines pour vérifier que toutes vos données sont bien remontées dans Proprely. Vos agents peuvent commencer à utiliser le lien web Proprely sur leurs téléphones." },
      { title: "Bascule complète", description: "Une fois vos process validés, vous arrêtez la facturation Organilog. Vous gardez l'archive Organilog (export complet) en local pour conformité. Plus de double saisie." },
      { title: "Optimisation et formation continue", description: "Sessions de 30 min mensuelles avec le fondateur pour optimiser votre usage et remonter vos besoins (la roadmap Proprely est influencée par les 30 sociétés fondatrices)." },
    ],
    faq: [
      { q: "Pourquoi chercher une alternative à Organilog pour la propreté B2B ?", a: "Organilog est conçu comme une suite multi-métiers (BTP, sécurité, espaces verts, nettoyage), ce qui implique un paramétrage long pour adapter le vocabulaire et les workflows au métier propreté. Une alternative spécialisée comme Proprely propose nativement les concepts métier (sites, agents avec spécialités vitrerie/décapage, preuve de passage syndic) sans paramétrage." },
      { q: "Combien coûte Proprely vs Organilog ?", a: "Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices) et le tarif fondateur est conservé à vie après le lancement public. Organilog facture à partir d'~25 €/utilisateur/mois (selon devis et engagement). Pour une équipe de 5 utilisateurs, Organilog coûte ~125 €/mois ; Proprely 0 € pendant la bêta." },
      { q: "Combien de temps pour migrer d'Organilog vers Proprely ?", a: "Compter 1-2 semaines au total : export Organilog (1-2 h), onboarding Proprely (30 min avec le fondateur), test en parallèle (1-2 semaines), bascule complète. Pas d'intégrateur externe, pas de coût de migration caché." },
      { q: "Mes agents auront-ils besoin de réapprendre un nouvel outil ?", a: "Non. Proprely a une interface 2025-2026 conçue pour la prise en main immédiate. Les agents ouvrent un lien web sur leur téléphone (pas d'app à installer), voient leur planning, scannent le QR du site, prennent les photos avant-après. La courbe d'apprentissage est de l'ordre de la minute, pas de la journée." },
      { q: "Que se passe-t-il si Proprely ne répond pas à un besoin que j'avais avec Organilog ?", a: "Le programme fondateurs (30 sociétés bêta) sert précisément à ça : remonter les besoins terrain et influencer la roadmap. Si une fonction critique manque, l'équipe Proprely la priorise. Pour les besoins très spécifiques (BTP + nettoyage en parallèle, par exemple), Proprely peut ne pas être la bonne alternative — Organilog reste pertinent dans ce cas." },
      { q: "Peut-on garder Organilog en parallèle pendant la migration ?", a: "Oui et c'est recommandé : 1-2 semaines en double usage pour valider que toutes vos données sont bien dans Proprely et que vos process tournent. Pas d'engagement de bascule immédiate côté Proprely." },
    ],
    comparisonSlug: 'proprely-vs-organilog',
  },
  {
    slug: 'alternative-progiclean',
    competitorName: 'Progiclean',
    competitorUrl: 'https://www.progiclean.com',
    title: "Alternative à Progiclean : plus simple, plus rapide à déployer (2026)",
    metaTitle: "Alternative à Progiclean : Proprely (cockpit léger) · 2026",
    metaDescription: "Progiclean trop lourd ou trop cher pour votre TPE/PME ? Découvrez Proprely : cockpit léger, onboarding 30 min, gratuit en bêta privée. Comparatif détaillé.",
    tldr: "Progiclean est un ERP propreté historique conçu pour les PME/ETI structurées (>50 agents) avec déploiement long (4-8 semaines via intégrateur). Proprely est l'alternative légère pour TPE/PME (3-50 agents) : cockpit unifié déployable en 30 minutes, mobile-first, marge par client en temps réel. Gratuit en bêta privée, tarif fondateur à vie après.",
    reasonsToLeave: [
      { title: "Trop lourd pour une TPE/PME en croissance", description: "Progiclean est un ERP métier conçu pour des PME/ETI structurées (>50 agents, plusieurs établissements, équipes RH/paie/qualité internalisées). Si vous êtes 3-30 agents en croissance, vous payez et configurez un produit qui dépasse vos besoins. Proprely a fait le choix d'un cockpit léger ciblé TPE/PME, plus rapide à déployer et plus simple à utiliser au quotidien." },
      { title: "Déploiement de 4-8 semaines avec intégrateur", description: "Le déploiement Progiclean demande typiquement 4 à 8 semaines : paramétrage par un intégrateur, formation des équipes, import des données, validation. Proprely se déploie en 30 minutes lors d'un appel avec le fondateur. Pas d'intégrateur externe, pas de coût de setup en plus de l'abonnement." },
      { title: "Interface dense issue de 15-20 ans d'évolution", description: "Progiclean est sur le marché depuis ~15-20 ans. L'interface a évolué mais conserve un héritage \"logiciel métier\" que beaucoup d'utilisateurs trouvent dense, surtout pour les équipes jeunes ou intergénérationnelles. Proprely a été conçu en 2025 avec les codes design contemporains : interface aérée, mobile-first, dashboard synthétique." },
      { title: "Marge par client pas native sur le dashboard", description: "Progiclean affiche la marge dans un module reporting/BI où elle se construit comme un rapport périodique. Proprely affiche la marge brute par client en temps réel directement sur le dashboard d'accueil — pilotage opérationnel vs reporting périodique." },
      { title: "Tarif PME pas adapté aux TPE", description: "Progiclean fonctionne sur devis sur mesure, généralement plusieurs milliers d'euros de setup + abonnement annuel. C'est cohérent avec sa cible PME/ETI mais excessif pour une TPE en démarrage. Proprely est gratuit pendant la bêta privée et le tarif fondateur reste à vie après." },
      { title: "App native obligatoire pour les agents", description: "Sur Progiclean, les agents installent une application native (Android/iOS) sur leur téléphone — friction sur les vieux modèles, téléphones partagés, ou agents réticents à installer une app pro. Proprely propose un lien web mobile-first ouvert dans le navigateur : zéro installation, fonctionne sur tous les téléphones." },
    ],
    quickTable: [
      { criterion: "Cible principale", competitor: "PME/ETI >50 agents", proprely: "TPE/PME 3-50 agents" },
      { criterion: "Temps d'onboarding", competitor: "4-8 semaines (intégrateur)", proprely: "30 min avec le fondateur" },
      { criterion: "Coût setup", competitor: "Plusieurs k€ + abonnement annuel", proprely: "0 € (bêta privée gratuite)" },
      { criterion: "Interface", competitor: "Mature, dense (héritage 15-20 ans)", proprely: "Design 2025-2026 (aérée)" },
      { criterion: "Mobile agent", competitor: "App native obligatoire", proprely: "Lien web (zéro installation)" },
      { criterion: "Marge par client", competitor: "Module reporting/BI", proprely: "Natif sur dashboard" },
      { criterion: "Devis IA propriétaire", competitor: "Non", proprely: "Natif (9 facteurs, 3 scénarios)" },
      { criterion: "Paie intégrée", competitor: "Module paie complet", proprely: "Export Silae/Sage compatible" },
      { criterion: "GED documents", competitor: "Module GED complet", proprely: "Documents centralisés par client/site" },
      { criterion: "Export données", competitor: "Process à initier", proprely: "Oui (CSV/Excel 1-clic)" },
    ],
    migrationSteps: [
      { title: "Bilan de votre usage actuel Progiclean", description: "Listez les modules que vous utilisez VRAIMENT (planning, devis, agents, preuve de passage) vs ceux que vous payez mais n'utilisez pas. Souvent : 40-60 % de la suite Progiclean est sous-utilisée par les TPE/PME." },
      { title: "Export Progiclean → CSV", description: "Demandez à Progiclean l'export complet de vos données (clients, sites, agents, plannings, factures, contrats). Compter 1-3 jours selon votre éditeur pour récupérer l'archive." },
      { title: "Onboarding Proprely 30 min", description: "Appel avec le fondateur Proprely. Transmission des exports CSV. Import et configuration de votre cockpit en direct (sites, fréquences, agents, spécialités). Vous repartez avec un outil opérationnel." },
      { title: "Test en parallèle 2-4 semaines", description: "Gardez Progiclean actif en parallèle 2-4 semaines pour valider que toutes vos données opérationnelles tournent bien sur Proprely. Pour les fonctions paie/GED, prévoyez une solution dédiée (Silae pour la paie, Drive/SharePoint pour la GED)." },
      { title: "Bascule complète + résiliation Progiclean", description: "Résiliez votre abonnement Progiclean (préavis contractuel à vérifier). Conservez l'archive en local pour conformité. Économies typiques : 80-95 % du coût Progiclean pour une TPE/PME." },
    ],
    faq: [
      { q: "Pourquoi chercher une alternative à Progiclean ?", a: "Progiclean est un ERP métier conçu pour les PME/ETI structurées (>50 agents). Si vous êtes une TPE/PME en croissance (3-30 agents), le produit est souvent trop lourd, trop cher et trop long à déployer (4-8 semaines). Une alternative légère comme Proprely propose un cockpit unifié déployable en 30 minutes." },
      { q: "Proprely couvre-t-il toutes les fonctions de Progiclean ?", a: "Sur le périmètre opérationnel (planning, devis, agents, preuve de passage, marge), Proprely est comparable avec un avantage sur la marge temps réel et le devis IA. Sur le périmètre ERP étendu (paie intégrée, GED avancée, qualité formalisée), Proprely a fait le choix de déléguer à des solutions spécialisées (Silae pour la paie, Drive/SharePoint pour la GED). C'est un parti pris : faire bien le métier propreté, plutôt que faire moyen partout." },
      { q: "Combien je vais économiser en passant de Progiclean à Proprely ?", a: "Pour une TPE/PME (3-15 agents), l'économie typique est de 80-95 % du coût total (setup + abonnement annuel) — souvent plusieurs milliers d'euros par an. À cela s'ajoute l'économie de l'intégrateur (4-8 semaines de prestation évitées) et le temps interne de paramétrage." },
      { q: "Combien de temps pour migrer de Progiclean à Proprely ?", a: "Compter 4-6 semaines au total : bilan usage (1 semaine), export Progiclean (1-3 jours), onboarding Proprely (30 min), test en parallèle (2-4 semaines), bascule complète. Pas d'intégrateur externe nécessaire." },
      { q: "Mes équipes vont-elles s'adapter à Proprely après des années sur Progiclean ?", a: "Oui, et plus vite que vous ne pensez. Beaucoup de dirigeants nous remontent que leurs équipes (y compris seniors) sont soulagées de quitter une interface dense pour une interface 2025-2026 aérée. La courbe d'apprentissage est de l'ordre de quelques minutes pour les agents (lien web mobile), quelques heures pour les dirigeants/responsables." },
      { q: "Comment gérer la paie sans le module Progiclean ?", a: "Proprely exporte les heures travaillées au format Silae directement importable. Vous gardez la maîtrise de la paie via Silae (ou votre cabinet comptable) — solution éprouvée, mieux maintenue qu'un module paie embarqué dans un ERP métier propreté." },
    ],
    comparisonSlug: 'proprely-vs-progiclean',
  },
  {
    slug: 'alternative-propret',
    competitorName: 'PROPRET',
    competitorUrl: 'https://www.propret.com',
    title: "Alternative à PROPRET pour société de nettoyage : 5 raisons + comparatif 2026",
    metaTitle: "Alternative à PROPRET : Proprely (nouvelle génération) · 2026",
    metaDescription: "Vous cherchez une alternative moderne à PROPRET ? Découvrez Proprely : interface 2026, mobile-first, marge par client en temps réel. Gratuit en bêta privée.",
    tldr: "PROPRET est un éditeur historique du marché français des logiciels propreté (présent depuis les années 1990), avec une base installée importante chez les PME. Proprely est l'alternative nouvelle génération conçue en 2025-2026 : interface aérée, mobile-first par lien web, marge par client en temps réel, onboarding 30 min. Gratuit pendant la bêta privée, tarif fondateur à vie après.",
    reasonsToLeave: [
      { title: "Interface héritage qui freine les jeunes équipes", description: "PROPRET est sur le marché depuis ~30 ans. L'interface a évolué mais conserve un héritage \"logiciel métier 1990s\" : densité fonctionnelle élevée, navigation par menus profonds, conventions visuelles datées. Pour des équipes jeunes ou intergénérationnelles, c'est un frein à l'adoption. Proprely a été conçu en 2025 avec les codes design contemporains : interface aérée, mobile-first, navigation intuitive." },
      { title: "App mobile native obligatoire pour les agents", description: "PROPRET propose une application mobile native dédiée pour les agents (Android/iOS). Installation, mise à jour, formation, blocages OS… autant de frictions à chaque déploiement. Proprely propose un lien web mobile-first ouvert dans n'importe quel navigateur : zéro installation, fonctionne sur tous les téléphones, y compris vieux modèles ou partagés." },
      { title: "Marge par client construite comme un reporting périodique", description: "PROPRET affiche la marge dans un module reporting. Vous construisez la vue de la marge comme un rapport à configurer et à consulter périodiquement. Proprely affiche la marge brute par client en temps réel directement sur le dashboard d'accueil — pilotage opérationnel quotidien vs reporting périodique." },
      { title: "Pas de devis intelligent par IA", description: "PROPRET propose un module devis classique (template + grille tarifaire) — mature mais sans intelligence d'optimisation. Proprely intègre nativement un module de devis IA propriétaire (9 facteurs croisés, 3 scénarios) qui apporte +20-35 % de taux de conversion et +2-5 points de marge nette sur les retours bêta." },
      { title: "Tarification opaque sur devis sur mesure", description: "PROPRET fonctionne sur devis sur mesure : pas de tarif public, négociation longue, dépendance au commercial. Proprely affiche un modèle clair : gratuit pendant la bêta privée (30 fondateurs), tarif fondateur conservé à vie après le lancement public. Transparence vs négociation." },
      { title: "Onboarding plus long (plusieurs jours à semaines)", description: "Le déploiement PROPRET demande typiquement plusieurs jours à plusieurs semaines (paramétrage, formation, validation). Proprely se déploie en 30 minutes lors d'un appel avec le fondateur. Différence structurelle entre un éditeur historique et un cockpit nouvelle génération." },
    ],
    quickTable: [
      { criterion: "Génération du produit", competitor: "Marché depuis les années 1990", proprely: "Lancé en 2025-2026" },
      { criterion: "Interface", competitor: "Mature, dense (héritage)", proprely: "Design 2025-2026 (aérée)" },
      { criterion: "Mobile agent", competitor: "App native obligatoire", proprely: "Lien web (zéro installation)" },
      { criterion: "Marge par client temps réel", competitor: "Module reporting", proprely: "Natif sur dashboard" },
      { criterion: "Devis IA propriétaire", competitor: "Devis classique", proprely: "Natif (9 facteurs, 3 scénarios)" },
      { criterion: "Preuve de passage syndic", competitor: "Module configurable", proprely: "Standardisée (QR + photos + signature)" },
      { criterion: "Onboarding", competitor: "Plusieurs jours à semaines", proprely: "30 min avec le fondateur" },
      { criterion: "Tarif TPE 5 agents", competitor: "Devis sur mesure", proprely: "Gratuit bêta, tarif fondateur à vie" },
      { criterion: "Suivi qualité formel", competitor: "Module dédié", proprely: "Preuve de passage + historique" },
      { criterion: "Export données", competitor: "Export disponible", proprely: "Oui (CSV/Excel 1-clic)" },
    ],
    migrationSteps: [
      { title: "Bilan d'usage PROPRET et besoins futurs", description: "Listez ce que vous utilisez VRAIMENT dans PROPRET vs ce que vous payez. Identifiez les 3-5 fonctions critiques que votre alternative doit absolument couvrir." },
      { title: "Export PROPRET → CSV", description: "Demandez à PROPRET l'export complet de vos données opérationnelles (clients, sites, agents, plannings, contrats). Compter 1-5 jours selon la réactivité de votre éditeur." },
      { title: "Onboarding Proprely 30 min", description: "Appel avec le fondateur Proprely. Import des exports CSV, configuration en direct de votre cockpit (sites, fréquences, agents, spécialités, preuves de passage). Vous repartez opérationnel." },
      { title: "Test en parallèle 2-4 semaines", description: "Gardez PROPRET actif 2-4 semaines pour valider que toutes vos données opérationnelles tournent sur Proprely. Pour la paie/GED, prévoyez Silae/Drive en parallèle." },
      { title: "Bascule complète + résiliation PROPRET", description: "Résiliez PROPRET (préavis contractuel à vérifier). Conservez l'archive en local 5 ans pour conformité. Vos agents passent au lien web Proprely sur leur téléphone." },
    ],
    faq: [
      { q: "Pourquoi chercher une alternative à PROPRET en 2026 ?", a: "PROPRET est un éditeur historique du marché propreté français (~30 ans). Si la maturité fonctionnelle est un avantage, l'interface héritage et le mobile app-only deviennent des freins pour les équipes jeunes ou intergénérationnelles. Une alternative nouvelle génération comme Proprely propose une interface 2025-2026 aérée, mobile-first par lien web et marge par client en temps réel." },
      { q: "Proprely est-il aussi fiable que PROPRET malgré sa nouveauté ?", a: "La fiabilité technique (hébergement européen, chiffrement, RGPD, sauvegardes) est au niveau attendu d'un SaaS B2B 2026. La maturité fonctionnelle est en revanche celle d'un produit jeune : certaines fonctions périphériques (paie intégrée, GED avancée, qualité formelle) sont volontairement déléguées à des solutions spécialisées (Silae, Drive/SharePoint, modules qualité externes)." },
      { q: "Combien je vais économiser en passant de PROPRET à Proprely ?", a: "Proprely étant gratuit pendant la bêta privée, l'économie est de 100 % du coût PROPRET pendant cette période. Après le lancement public, le tarif fondateur conservé à vie reste significativement inférieur au tarif PROPRET standard pour des TPE/PME (souvent 60-80 % d'économie)." },
      { q: "Mes agents vont-ils s'adapter au lien web Proprely après l'app PROPRET ?", a: "Oui, généralement plus facilement. Un lien web s'ouvre en 3 secondes sans installation, ne demande pas de mise à jour, fonctionne sur tous les téléphones (y compris vieux modèles ou partagés entre brigades). La courbe d'apprentissage est de quelques minutes." },
      { q: "Comment gérer la qualité formelle sans le module PROPRET ?", a: "Pour les exigences qualité formelles (audits planifiés, plans d'action, scoring qualitatif), Proprely propose la preuve de passage native (QR + photos avant-après + signature + horodatage) et l'historique complet par site. Pour des audits qualité plus formels, vous pouvez compléter avec un module externe ou un Excel structuré. Selon vos clients (syndics standards vs facility managers exigeants), l'écart peut être marginal ou structurant." },
      { q: "Combien de temps pour migrer de PROPRET à Proprely ?", a: "Compter 4-6 semaines au total : bilan d'usage (1 semaine), export PROPRET (1-5 jours), onboarding Proprely (30 min), test en parallèle (2-4 semaines), bascule complète. Pas d'intégrateur externe, pas de coût caché." },
    ],
    comparisonSlug: 'proprely-vs-propret',
  },
  {
    slug: 'alternative-2bepragma',
    competitorName: '2BePragma',
    competitorUrl: 'https://www.2bepragma.com',
    title: "Alternative à 2BePragma pour PME nettoyage : passez à l'échelle (2026)",
    metaTitle: "Alternative à 2BePragma : Proprely (cockpit moderne) · 2026",
    metaDescription: "Votre société de nettoyage grandit et 2BePragma montre ses limites ? Découvrez Proprely : cockpit moderne pensé pour l'échelle. Gratuit en bêta privée.",
    tldr: "2BePragma est un éditeur français de logiciels métier propreté, conçu pour les PME structurées (30-100+ agents). Proprely est l'alternative pour les TPE/PME en croissance (3-50 agents) : cockpit unifié déployable en 30 minutes, mobile-first par lien web, devis IA propriétaire, marge par client en temps réel. Gratuit pendant la bêta privée, tarif fondateur à vie après.",
    reasonsToLeave: [
      { title: "Dimensionné pour PME structurées, lourd pour TPE/PME en croissance", description: "2BePragma cible historiquement les PME structurées (30-100+ agents) avec équipes RH/qualité/admin internalisées. Si vous êtes une TPE/PME en croissance (3-30 agents), le produit dépasse vos besoins quotidiens. Proprely a fait le choix d'un cockpit léger ciblé TPE/PME, plus simple à utiliser au quotidien." },
      { title: "Pas de devis intelligent par IA pour optimiser la conversion", description: "2BePragma propose un module devis classique (template + grille tarifaire). Proprely intègre nativement un module de devis IA propriétaire qui croise 9 facteurs (prix marché local, disponibilités, profil client, coûts réels) et propose 3 scénarios optimisés. Sur les retours bêta : +20-35 % de taux de conversion, +2-5 points de marge nette." },
      { title: "Pas de marge par client en temps réel sur le dashboard", description: "2BePragma affiche la marge dans un module reporting où elle se construit comme un rapport périodique. Proprely affiche la marge brute par client en temps réel directement sur le dashboard d'accueil — pilotage opérationnel quotidien vs reporting périodique." },
      { title: "Onboarding plusieurs jours à semaines", description: "Le déploiement 2BePragma demande typiquement plusieurs jours à plusieurs semaines (paramétrage, formation, validation). Proprely se déploie en 30 minutes lors d'un appel avec le fondateur — adapté à une TPE/PME qui n'a pas le temps ni le budget pour un projet d'intégration." },
      { title: "App native obligatoire pour les agents", description: "Sur 2BePragma, les agents installent une application native. Proprely propose un lien web mobile-first ouvert dans le navigateur : zéro installation, fonctionne sur tous les téléphones (y compris vieux modèles ou partagés)." },
      { title: "Tarification PME pas adaptée aux TPE", description: "2BePragma fonctionne sur devis sur mesure, dimensionné pour des budgets PME structurées. Proprely est gratuit pendant la bêta privée (30 sociétés fondatrices) et le tarif fondateur reste à vie après le lancement public. Aligné sur les budgets TPE/PME en croissance." },
    ],
    quickTable: [
      { criterion: "Cible principale", competitor: "PME structurée 30-100+ agents", proprely: "TPE/PME 3-50 agents" },
      { criterion: "Onboarding", competitor: "Plusieurs jours à semaines", proprely: "30 min avec le fondateur" },
      { criterion: "Mobile agent", competitor: "App native dédiée", proprely: "Lien web (zéro installation)" },
      { criterion: "Devis IA propriétaire", competitor: "Devis classique", proprely: "Natif (9 facteurs, 3 scénarios)" },
      { criterion: "Marge par client", competitor: "Module reporting/BI", proprely: "Natif sur dashboard" },
      { criterion: "Spécialités agents", competitor: "À paramétrer", proprely: "Natives (vitrerie, moquette, décapage…)" },
      { criterion: "Preuve de passage syndic", competitor: "Disponible (à configurer)", proprely: "Standardisée (QR + photos + signature)" },
      { criterion: "Conformité IDCC 3043", competitor: "Paramétrage manuel", proprely: "Grille salaires intégrée" },
      { criterion: "Tarif TPE 5 agents", competitor: "Devis sur mesure", proprely: "Gratuit bêta, tarif fondateur à vie" },
      { criterion: "Interface", competitor: "Interface mature métier", proprely: "Design 2025-2026 (aérée)" },
    ],
    migrationSteps: [
      { title: "Audit usage actuel 2BePragma", description: "Quels modules utilisez-vous vraiment ? Lesquels sont sous-utilisés ? Identifiez les 3-5 fonctions critiques que votre alternative doit absolument couvrir." },
      { title: "Export 2BePragma → CSV", description: "Demandez l'export complet de vos données opérationnelles (clients, sites, agents, plannings, contrats, factures). Comptez 1-5 jours selon votre éditeur." },
      { title: "Onboarding Proprely 30 min", description: "Appel avec le fondateur Proprely. Import des exports CSV et configuration en direct de votre cockpit. Vos sites, agents, fréquences, spécialités sont opérationnels en sortie d'appel." },
      { title: "Test en parallèle 2-4 semaines", description: "Gardez 2BePragma actif en parallèle. Vos agents commencent à utiliser le lien web Proprely. Vous comparez les workflows en condition réelle." },
      { title: "Bascule complète + résiliation 2BePragma", description: "Une fois Proprely validé, résiliez 2BePragma (préavis contractuel à vérifier). Conservez l'archive en local 5 ans. Vos économies typiques : 70-90 % du coût annuel pour une TPE/PME." },
    ],
    faq: [
      { q: "Pourquoi chercher une alternative à 2BePragma ?", a: "2BePragma cible les PME structurées (30+ agents). Si vous êtes une TPE/PME en croissance (3-30 agents), le produit est souvent surdimensionné et trop long à déployer. Une alternative légère comme Proprely propose un cockpit unifié déployable en 30 minutes, avec un devis IA propriétaire et la marge par client en temps réel." },
      { q: "Le devis IA de Proprely est-il vraiment plus performant qu'un devis classique 2BePragma ?", a: "Sur les retours bêta privée Proprely : +20-35 % de taux de conversion et +2-5 points de marge nette sur les contrats signés. L'algorithme IA croise 9 facteurs en temps réel (prix marché local, vos disponibilités, profil client estimé, coûts réels) — impossibles à intégrer manuellement en 20 minutes par devis." },
      { q: "Combien je vais économiser en passant de 2BePragma à Proprely ?", a: "Pour une TPE/PME (3-15 agents), l'économie typique est de 70-90 % du coût annuel total (setup + abonnement). Proprely est gratuit pendant la bêta privée, et le tarif fondateur reste significativement inférieur après le lancement public." },
      { q: "Combien de temps pour migrer de 2BePragma à Proprely ?", a: "Compter 4-6 semaines au total : audit usage (1 semaine), export 2BePragma (1-5 jours), onboarding Proprely (30 min), test en parallèle (2-4 semaines), bascule complète. Pas d'intégrateur externe nécessaire." },
      { q: "Et si je grandis au-delà de 50 agents ?", a: "Proprely est conçu pour scaler jusqu'à 50 agents avec une excellente expérience. Au-delà, si vos besoins évoluent vers un ERP complet (paie internalisée, qualité formelle, GED avancée), vous pouvez basculer vers un ERP métier (PROPRET, Progiclean, 2BePragma) avec votre historique opérationnel exportable depuis Proprely. C'est rare avant 80-100 agents : la plupart des PME 50-80 agents restent satisfaites de Proprely + solutions spécialisées (Silae, Drive)." },
      { q: "Mes équipes vont-elles s'adapter à Proprely après 2BePragma ?", a: "Oui, généralement très vite. Proprely a une interface 2025-2026 conçue pour la prise en main immédiate. Beaucoup de dirigeants nous remontent que leurs équipes (y compris seniors) sont soulagées de passer à une interface aérée. Courbe d'apprentissage : minutes pour les agents (lien web mobile), heures pour les dirigeants/responsables." },
    ],
    comparisonSlug: 'proprely-vs-2bepragma',
  },
]

export function getAlternative(slug: string): AlternativePage | undefined {
  return alternatives.find((a) => a.slug === slug)
}
