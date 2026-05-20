import type { LucideIcon } from 'lucide-react'
import { Building2, Hotel, Stethoscope, Home, ShoppingBag, GraduationCap, Wine, Building } from 'lucide-react'

export type CityClientType = { icon: LucideIcon; type: string; description: string }
export type CityChallenge = { title: string; description: string }
export type CityFit = { title: string; description: string }
export type CityFAQ = { q: string; a: string }

export type CityPage = {
  slug: string
  city: string
  region: string
  population: string
  title: string
  subtitle: string
  metaDescription: string
  keywords: string[]
  marketIntro: string
  marketBullets: string[]
  clientTypes: CityClientType[]
  challenges: CityChallenge[]
  proprelyFit: CityFit[]
  faq: CityFAQ[]
}

export const cities: CityPage[] = [
  {
    slug: 'paris',
    city: 'Paris',
    region: 'Île-de-France',
    population: '2,1 millions d\'habitants intra-muros, 12 millions en région',
    title: "Logiciel de nettoyage à Paris : le cockpit métier des sociétés de propreté franciliennes",
    subtitle: "Conçu pour les contraintes parisiennes : rotations matinales serrées, multi-sites tertiaires, copropriétés haussmanniennes, turnover agents élevé. Pilotez clients, agents, plannings et devis depuis un seul écran.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Paris et en Île-de-France. Planning, agents, devis, missions, pilotage. Conçu pour la propreté B2B francilienne. Bêta gratuite.",
    keywords: ['logiciel nettoyage Paris', 'logiciel propreté Île-de-France', 'gestion société nettoyage Paris', 'planning agents nettoyage Paris'],
    marketIntro: "L'Île-de-France concentre près d'un tiers du marché français de la propreté B2B. Les dirigeants de sociétés de nettoyage parisiennes affrontent un cocktail unique : des rotations matinales avant 8h sur de la tour tertiaire, des copropriétés haussmanniennes avec gardiens, des cabinets de la rive gauche aux protocoles stricts, et un turnover agents qui dépasse régulièrement les 35% annuels.",
    marketBullets: [
      "Densité tertiaire la plus forte de France : tours de La Défense, immeubles de bureaux du QCA, sièges sociaux",
      "Plus de 50 000 immeubles en copropriété intra-muros, beaucoup gérés par les principaux syndics nationaux",
      "Hôtellerie haut de gamme et indépendante en forte demande de prestations différenciées",
      "Cabinets médicaux, dentaires et laboratoires avec exigences sanitaires renforcées",
      "Concurrence intense, marges sous pression, fidélisation des agents devenue stratégique",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux tertiaires", description: "Tours QCA, immeubles haussmanniens reconvertis, sièges sociaux. Rotations 6h-9h ou 19h-22h, exigence d'accueil propre dès l'ouverture." },
      { icon: Home, type: "Copropriétés haussmanniennes", description: "Halls en marbre, escaliers à rampe, cours pavées. Syndics gestionnaires qui demandent reporting régulier et preuve de passage." },
      { icon: Hotel, type: "Hôtellerie", description: "De l'indépendant 3 étoiles aux palaces. Étages le matin, parties communes en continu, exigence de discrétion absolue." },
      { icon: Stethoscope, type: "Cabinets médicaux & laboratoires", description: "Protocoles sanitaires stricts, traçabilité des produits, plages d'intervention contraintes par les rendez-vous patients." },
      { icon: ShoppingBag, type: "Retail & restaurants", description: "Avant ouverture (5h-7h) ou après fermeture (22h-1h). Cuisines, vitrines, sanitaires publics, fréquences quotidiennes." },
      { icon: GraduationCap, type: "Établissements scolaires privés", description: "Plages strictement hors temps scolaire, vacances bloquées pour remise en état, exigences administratives renforcées." },
    ],
    challenges: [
      { title: "Rotations matinales et nocturnes ingérables sans planning unifié", description: "Avec 5 à 15 sites tournant entre 5h et 22h, le simple suivi devient un casse-tête. Excel ne tient pas la cadence, WhatsApp se perd, et chaque oubli devient un client mécontent ou un agent en colère." },
      { title: "Turnover agents qui dépasse régulièrement 35% annuels", description: "Recrutement, formation, intégration : tout est à recommencer plusieurs fois par an. Sans système qui capitalise sur les profils et les spécialités, vous perdez la mémoire de votre équipe à chaque départ." },
      { title: "Syndics qui demandent reporting et traçabilité formels", description: "Les principaux syndics nationaux exigent désormais une preuve de passage standardisée (signature, photos, horodatage). Sans outil dédié, c'est une charge administrative pure qui pèse sur vos équipes." },
      { title: "Pression sur les prix et marges qui s'effritent", description: "La concurrence est intense, les appels d'offres sont serrés, et sans visibilité sur la marge réelle par client, vous facturez à l'aveugle. Une grille de prix incohérente, et c'est tout votre carnet qui glisse vers la perte." },
    ],
    proprelyFit: [
      { title: "Planning multi-sites pensé pour les contraintes franciliennes", description: "Affectation en 1 clic selon proximité (RER/métro), spécialité et charge horaire. Vos agents consultent leur tournée sur leur téléphone, sans application à installer." },
      { title: "Preuve de passage acceptée par les syndics", description: "QR code sur site, photos avant-après, signature client. Le PV est généré automatiquement et envoyé au syndic gestionnaire sans intervention manuelle." },
      { title: "Suivi du turnover et fidélisation des agents", description: "Compteur d'heures automatique, alertes surmenage, historique des spécialités et formations. Vous identifiez les agents à risque de départ avant qu'ils ne partent." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous voyez immédiatement quel contrat est rentable et lequel ronge votre rentabilité." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage parisiennes ?", a: "Oui. Proprely a été conçu avec et pour des dirigeants de sociétés de nettoyage B2B françaises, dont une majorité opère en région parisienne. Multi-sites, rotations matinales et nocturnes, exigences syndic, hôtellerie : les cas d'usage franciliens sont au cœur du produit." },
      { q: "Mes agents parisiens doivent-ils installer une application sur leur téléphone ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne sur 4G capricieuse dans le métro." },
      { q: "Combien coûte Proprely pour une société parisienne ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Peut-on gérer plusieurs équipes réparties sur Paris et la petite couronne ?", a: "Oui. Proprely est conçu pour les organisations multi-sites avec plusieurs équipes. Vue d'ensemble par agent, par client, par jour ou par zone géographique." },
      { q: "Proprely gère-t-il les exigences des syndics parisiens ?", a: "Oui. Preuve de passage standardisée (QR, photos, signature), PV automatiques envoyés au syndic gestionnaire, historique complet par site. Les principaux formats demandés par les grands syndics sont supportés." },
      { q: "Comment intégrer Proprely à mon existant si j'ai déjà Excel et WhatsApp ?", a: "L'onboarding se fait en 30 minutes avec le fondateur. Vos sites, agents et fréquences sont importés (Excel, CSV, photos). À la fin de l'appel, votre planning est opérationnel. Aucune migration brutale, vous continuez à utiliser ce que vous voulez le temps de la transition." },
    ],
  },
  {
    slug: 'lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    population: '520 000 habitants, 1,4 million dans la métropole',
    title: "Logiciel de nettoyage à Lyon : pilotez votre société de propreté en Rhône-Alpes",
    subtitle: "Conçu pour la réalité lyonnaise : forte densité tertiaire, secteur médical et pharmaceutique exigeant, immobilier de bureaux en croissance (Confluence, Part-Dieu, Vaise). Centralisez clients, agents, plannings et devis dans un seul outil.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Lyon et en Rhône-Alpes. Planning, agents, devis, missions, pilotage. Conçu pour la propreté B2B lyonnaise. Bêta gratuite.",
    keywords: ['logiciel nettoyage Lyon', 'logiciel propreté Rhône-Alpes', 'gestion société nettoyage Lyon', 'planning agents nettoyage Lyon'],
    marketIntro: "Lyon est le deuxième marché français de la propreté B2B après l'Île-de-France. La métropole concentre un tissu unique en France : un quartier d'affaires Part-Dieu en expansion permanente, un pôle santé majeur (Hospices Civils, Centre Léon Bérard, cluster pharmaceutique), une presqu'île tertiaire dense, et un écosystème industriel/biotech à Gerland et Confluence. Les sociétés de nettoyage lyonnaises naviguent entre ces univers aux exigences très différentes.",
    marketBullets: [
      "Part-Dieu : 2e quartier d'affaires français hors Paris, immeubles tertiaires haute densité",
      "Pôle santé majeur : HCL, cabinets médicaux du 6e et de la presqu'île, laboratoires de Gerland",
      "Industrie et biotech : cluster pharmaceutique, sites Sanofi, BioMérieux et leurs sous-traitants",
      "Tourisme et hôtellerie : Vieux-Lyon, Bellecour, Confluence, capitale gastronomique attire l'hôtellerie",
      "Marché en croissance lente mais stable, marges légèrement supérieures à la moyenne nationale",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Part-Dieu / Confluence", description: "Tours et immeubles tertiaires modernes. Prestations matinales 6h-9h, accueil propre obligatoire à 8h30. Reporting régulier exigé." },
      { icon: Stethoscope, type: "Pôle santé lyonnais", description: "HCL, cliniques privées, cabinets médicaux du 6e, laboratoires de Gerland. Protocoles bionettoyage, traçabilité, agents formés aux risques biologiques." },
      { icon: Building, type: "Industrie pharmaceutique & biotech", description: "Sanofi, BioMérieux et leur écosystème. Salles blanches, protocoles ISO, certifications agents, charte qualité stricte." },
      { icon: Hotel, type: "Hôtellerie & restauration", description: "Bouchons lyonnais, hôtels de la presqu'île, restaurants étoilés. Cuisines, salles, sanitaires publics. Plages très contraintes (avant ouverture)." },
      { icon: Home, type: "Copropriétés Croix-Rousse / Brotteaux", description: "Immeubles haussmanniens et bourgeois. Halls, escaliers, vitres extérieures. Syndics avec exigence de reporting standardisé." },
      { icon: ShoppingBag, type: "Retail & commerces", description: "Galeries marchandes (Part-Dieu, Confluence), boutiques de centre-ville. Avant ouverture 5h-9h, exigences vitrerie et sols brillants." },
    ],
    challenges: [
      { title: "Multiplicité des protocoles selon les types de clients", description: "Bureau ce matin, cabinet médical à 14h, laboratoire pharmaceutique en soirée : un agent peut enchaîner trois protocoles différents dans sa journée. Sans système qui mémorise qui sait faire quoi, vous risquez l'erreur opérationnelle." },
      { title: "Concentration géographique mais sites dispersés", description: "Vos clients sont entre Vaise, Part-Dieu, Confluence et la Croix-Rousse. La proximité géographique est un avantage, mais sans optimisation des tournées, vous perdez du temps de transit." },
      { title: "Exigences qualité du secteur santé et biotech", description: "Le pôle santé lyonnais ne pardonne pas l'à-peu-près. Traçabilité, certifications, conformité ISO : les contrats les plus rentables sont aussi les plus exigeants administrativement." },
      { title: "Saisonnalité hôtellerie et restauration", description: "L'été et les fêtes de fin d'année font exploser la demande hôtellerie-restauration. Sans système flexible, vous craquez en haute saison ou vous portez des charges en basse saison." },
    ],
    proprelyFit: [
      { title: "Spécialités agents par type de protocole", description: "Chaque agent a un profil avec ses certifications et protocoles maîtrisés (bionettoyage, salle blanche, vitrerie en hauteur). Le système propose en priorité les bons profils, pas les disponibles." },
      { title: "Affectation optimisée géographiquement", description: "Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention. Moins de transit, plus d'heures facturables." },
      { title: "Documents et certifications centralisés", description: "Attestations URSSAF, fiches sécurité produits, certifications agents : tout est rangé, recherchable, exportable en 1 clic pour les audits clients." },
      { title: "Vue charge horaire et alertes surmenage", description: "Le compteur d'heures suit chaque agent en temps réel. Une alerte se déclenche dès qu'un seuil est dépassé : vous évitez le burn-out avant qu'il n'arrive." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Lyon ?", a: "Oui. Proprely centralise les besoins typiques d'une société lyonnaise : multi-sites tertiaires, secteur santé exigeant, hôtellerie-restauration saisonnière, copropriétés bourgeoises. Tous les modules sont conçus pour des PME B2B françaises." },
      { q: "Le module bionettoyage et santé est-il supporté ?", a: "Proprely gère les spécialités agents (incluant bionettoyage, salle blanche, protocoles médicaux), les fiches sécurité produits par site, la traçabilité des interventions et la preuve de passage avec photos. Les exigences typiques des HCL ou laboratoires sont couvertes." },
      { q: "Combien coûte Proprely à Lyon ?", a: "Gratuit pendant la bêta privée pour les 30 sociétés fondatrices sélectionnées. Tarif fondateur conservé à vie après le lancement. Pas de carte bancaire demandée, pas d'engagement." },
      { q: "Peut-on gérer les sites entre Lyon, Villeurbanne et la périphérie ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique, optimisation des tournées selon proximité. Le planning suggère les agents les plus proches du prochain site." },
      { q: "Comment se passe l'onboarding pour une société lyonnaise ?", a: "30 minutes en visio avec le fondateur. Import de vos sites, agents et fréquences. À la fin de l'appel, votre planning est opérationnel et utilisable dès le lendemain par vos équipes." },
      { q: "Mes agents lyonnais ont-ils besoin d'installer une application ?", a: "Non. Chaque agent ouvre son planning et ses missions via un simple lien web sur son téléphone. Pas d'installation, pas de formation, fonctionne en 4G." },
    ],
  },
  {
    slug: 'marseille',
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    population: '870 000 habitants, 1,9 million dans la métropole',
    title: "Logiciel de nettoyage à Marseille : pilotez votre société de propreté en PACA",
    subtitle: "Conçu pour la réalité marseillaise : tertiaire en mutation (Euroméditerranée, La Joliette), hôtellerie touristique saisonnière, copropriétés bord de mer avec contraintes sel et humidité. Centralisez clients, agents, plannings et devis.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Marseille et en PACA. Planning, agents, devis, missions, pilotage. Conçu pour la propreté B2B marseillaise. Bêta gratuite.",
    keywords: ['logiciel nettoyage Marseille', 'logiciel propreté PACA', 'gestion société nettoyage Marseille', 'planning agents nettoyage Marseille'],
    marketIntro: "Marseille et la métropole Aix-Marseille-Provence forment le troisième pôle français de la propreté B2B. Le marché y présente des spécificités méditerranéennes uniques : un quartier d'affaires en pleine mutation (Euroméditerranée, La Joliette), une hôtellerie-restauration touristique avec saisonnalité marquée, des copropriétés en bord de mer aux contraintes spécifiques (sel, humidité, calcaire), et un tissu de PME tertiaires dispersées sur plusieurs centres économiques.",
    marketBullets: [
      "Euroméditerranée : 2e opération nationale d'aménagement, immeubles tertiaires neufs avec exigences haut de gamme",
      "La Joliette : pôle d'affaires en croissance, sièges régionaux, sociétés tech et services",
      "Tourisme : 5 millions de visiteurs annuels, hôtellerie de Notre-Dame-de-la-Garde au Vieux-Port, restauration intense",
      "Aix-en-Provence à 30 km : tertiaire haut de gamme, copropriétés bourgeoises, demande tirée",
      "Saisonnalité forte : pic mai-septembre, ralentissement hivernal sur le tourisme",
      "Marges plus tendues qu'à Paris ou Lyon, fidélisation des agents particulièrement critique",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Euroméditerranée / Joliette", description: "Immeubles tertiaires neufs, sièges régionaux, espaces de coworking. Prestations matinales avant 9h, accueil propre exigé." },
      { icon: Home, type: "Copropriétés bord de mer", description: "Vue mer, calcaire sur les vitres, salinité qui ronge les rampes inox. Halls, escaliers, parties communes avec contraintes matériaux spécifiques." },
      { icon: Hotel, type: "Hôtellerie touristique", description: "Vieux-Port, Corniche, Aix centre historique. Saisonnalité explosive été, étages, parties communes, restaurants intégrés." },
      { icon: Wine, type: "Restauration & traiteurs", description: "Restaurants du Vieux-Port aux étoilés calanques, traiteurs événementiels. Cuisines, salles, sanitaires publics. Plages très contraintes (avant ouverture, après service)." },
      { icon: ShoppingBag, type: "Retail & galeries", description: "Centres commerciaux (Prado, Bourse, Terrasses du Port), boutiques de centre-ville. Avant ouverture 5h-9h, exigences vitrerie." },
      { icon: Stethoscope, type: "Cabinets médicaux & dentaires", description: "Quartiers résidentiels du 8e, du 6e, d'Aix. Protocoles sanitaires, plages contraintes par les rendez-vous patients." },
    ],
    challenges: [
      { title: "Saisonnalité qui explose l'organisation l'été", description: "Mai à septembre, la demande hôtellerie-restauration peut doubler. Sans planning flexible et système de remplacements rapide, vous craquez ou vous refusez du chiffre. L'hiver, vous portez des heures non-facturables si vous avez sur-recruté." },
      { title: "Dispersion géographique sur la métropole", description: "Vos sites peuvent être entre Marseille centre, l'Estaque, Aix-en-Provence et Aubagne. 30 à 50 km de transit potentiel chaque jour. Sans optimisation des tournées, vous perdez vite la rentabilité." },
      { title: "Spécificités matériaux bord de mer", description: "Calcaire, sel, humidité : les produits et fréquences ne sont pas les mêmes qu'en intérieur des terres. Vos agents doivent savoir adapter leur prestation, et vous devez le facturer correctement." },
      { title: "Marges sous pression, concurrence intense", description: "Le marché marseillais est plus tendu sur les prix qu'à Paris ou Lyon. Sans visibilité claire sur la marge par client, vous risquez de facturer en dessous de votre coût réel, surtout sur les contrats récurrents." },
    ],
    proprelyFit: [
      { title: "Planning flexible pour la saisonnalité", description: "Affectation rapide, agents saisonniers gérés comme des fixes, vue charge horaire par mois pour anticiper les pics. Vous absorbez la haute saison sans craquer et limitez les heures non-facturables hors saison." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site selon leur dernière intervention. Moins de transit Marseille-Aix-Aubagne, plus d'heures facturables." },
      { title: "Fiches site avec spécificités matériaux", description: "Chaque site a sa fiche : sols, vitres, protocoles spécifiques, produits agréés. Le bord de mer avec ses contraintes sel/calcaire est documenté une fois, suivi par tous les agents." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous identifiez immédiatement les contrats à renégocier et ceux qui portent vraiment votre rentabilité." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Marseille ?", a: "Oui. Proprely centralise les besoins typiques d'une société marseillaise : multi-sites dispersés sur la métropole, saisonnalité hôtellerie-restauration, contraintes spécifiques bord de mer, mix tertiaire et résidentiel haut de gamme." },
      { q: "Comment Proprely gère-t-il la saisonnalité estivale ?", a: "Le planning gère les agents saisonniers comme des fixes : profils, spécialités, disponibilités. Vue charge horaire mensuelle pour anticiper les pics. Remplacements suggérés automatiquement en cas d'absence. Vous absorbez l'été sans perdre votre organisation." },
      { q: "Combien coûte Proprely à Marseille et en PACA ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Peut-on gérer les sites entre Marseille, Aix-en-Provence et Aubagne ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention, ce qui optimise les tournées sur la métropole." },
      { q: "Proprely supporte-t-il les fiches techniques par site (calcaire, sel) ?", a: "Oui. Chaque site a sa fiche détaillée avec spécificités matériaux, produits agréés, fréquences spécifiques. Le bord de mer avec ses contraintes est documenté une fois et appliqué à toutes les interventions." },
      { q: "Mes agents marseillais ont-ils besoin d'une application ?", a: "Non. Chaque agent ouvre son planning et ses missions via un lien web sur son téléphone. Pas d'installation, pas de formation, fonctionne en 4G y compris dans les calanques." },
    ],
  },
  {
    slug: 'bordeaux',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    population: '260 000 habitants, 820 000 dans la métropole',
    title: "Logiciel de nettoyage à Bordeaux : pilotez votre société de propreté en Gironde",
    subtitle: "Conçu pour la réalité bordelaise : tertiaire en croissance (Euratlantique, Bassins à flot), copropriétés du croissant haussmannien, hôtellerie œnotouristique, cabinets médicaux du Triangle d'Or. Centralisez clients, agents, plannings et devis.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Bordeaux et en Nouvelle-Aquitaine. Planning, agents, devis, missions, pilotage B2B. Bêta privée gratuite.",
    keywords: ['logiciel nettoyage Bordeaux', 'logiciel propreté Gironde', 'gestion société nettoyage Bordeaux', 'planning agents nettoyage Bordeaux'],
    marketIntro: "Bordeaux Métropole figure parmi les marchés français de la propreté B2B en plus forte croissance. La capitale girondine concentre un tissu varié : un quartier d'affaires Euratlantique qui sort de terre depuis 2010, des Bassins à flot reconvertis en pôle tertiaire moderne, un croissant haussmannien classé UNESCO, le Triangle d'Or commerçant et résidentiel haut de gamme, et un œnotourisme qui irrigue toute la métropole. Les sociétés de nettoyage bordelaises composent avec cette diversité.",
    marketBullets: [
      "Euratlantique : quartier d'affaires neuf autour de la gare Saint-Jean, immeubles tertiaires modernes haute densité",
      "Bassins à flot et Brazza : zones reconverties, sièges régionaux, sociétés tech, espaces de coworking",
      "Centre historique UNESCO : copropriétés haussmanniennes, pierre de taille, halls et escaliers à l'identité forte",
      "Œnotourisme et hôtellerie : Cité du Vin, hôtels de charme, palaces, châteaux viticoles ouverts au public",
      "Pôle santé : CHU Pellegrin, polycliniques, cabinets du Triangle d'Or et de Caudéran",
      "Marché en croissance régulière, marges légèrement supérieures à la moyenne nationale",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Euratlantique / Bassins à flot", description: "Immeubles tertiaires neufs, sièges régionaux, coworkings. Rotations 6h-9h, accueil propre exigé, reporting standardisé attendu." },
      { icon: Home, type: "Copropriétés haussmanniennes UNESCO", description: "Pierre de taille, halls voûtés, escaliers à rampe en fer forgé. Syndics avec exigences patrimoniales spécifiques et reporting régulier." },
      { icon: Hotel, type: "Hôtellerie œnotouristique", description: "Du boutique-hôtel du centre au palace Yndo en passant par les châteaux viticoles ouverts au public. Étages, parties communes, exigence de discrétion." },
      { icon: Stethoscope, type: "Pôle santé bordelais", description: "CHU Pellegrin, polycliniques privées, cabinets du Triangle d'Or et de Caudéran. Bionettoyage, traçabilité produits, agents formés." },
      { icon: ShoppingBag, type: "Retail & rues commerçantes", description: "Rue Sainte-Catherine, cours de l'Intendance, Promenade Sainte-Catherine. Avant ouverture 5h-9h, vitrerie et sols brillants exigés." },
      { icon: Wine, type: "Châteaux viticoles et chais", description: "Domaines de Pessac-Léognan, Saint-Émilion, Margaux ouverts au public. Salles de dégustation, parties accueil, sanitaires visiteurs, contraintes saisonnières." },
    ],
    challenges: [
      { title: "Croissance qui rattrape l'organisation", description: "Bordeaux gagne des sièges régionaux chaque année, la demande tertiaire explose, mais la plupart des sociétés de nettoyage girondines continuent à piloter sur Excel et WhatsApp. Sans système qui passe à l'échelle, vous perdez en qualité au fur et à mesure que vous gagnez en volume." },
      { title: "Mix patrimonial / moderne très différent", description: "Un client haussmannien classé n'a pas les mêmes exigences qu'un siège tertiaire neuf d'Euratlantique. Les protocoles, les fréquences, les produits diffèrent. Sans fiches site documentées, le savoir reste dans la tête des agents et part avec eux." },
      { title: "Œnotourisme et saisonnalité spécifique", description: "Mai-octobre, vendanges, grands événements (Bordeaux Wine Festival) : la demande explose ponctuellement. Sans planning flexible et agents saisonniers gérés comme des fixes, vous craquez sur la haute saison." },
      { title: "Concurrence locale qui s'intensifie", description: "Plusieurs acteurs nationaux et régionaux montent en puissance sur Bordeaux. Sans différenciation claire (preuve de passage, reporting, marge maîtrisée), vous restez piégé sur les prix bas et les appels d'offres serrés." },
    ],
    proprelyFit: [
      { title: "Fiches site qui mémorisent le patrimoine", description: "Chaque copropriété haussmannienne, chaque siège Euratlantique a sa fiche : matériaux, protocoles, produits agréés, fréquences. Le savoir reste dans l'entreprise même quand un agent part." },
      { title: "Preuve de passage pour les syndics et le tertiaire", description: "QR code, photos avant-après, signature. Le PV est généré automatiquement et envoyé au syndic gestionnaire ou au facility manager sans intervention." },
      { title: "Planning flexible saisonnalité œnotouristique", description: "Agents saisonniers gérés comme des fixes, vue charge horaire mensuelle pour anticiper mai-octobre, remplacements suggérés automatiquement. Vous absorbez la haute saison sans craquer." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous voyez immédiatement quels contrats portent votre rentabilité et lesquels vous coûtent en silence." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Bordeaux ?", a: "Oui. Proprely a été conçu pour la diversité des marchés régionaux français. À Bordeaux, le mix tertiaire neuf / patrimoine haussmannien / œnotourisme est entièrement supporté : multi-sites, fiches par bâtiment, agents saisonniers gérés comme des fixes, preuve de passage acceptée par les principaux syndics." },
      { q: "Mes agents bordelais doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G y compris dans le Médoc." },
      { q: "Combien coûte Proprely à Bordeaux et en Gironde ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Comment Proprely gère-t-il la saisonnalité œnotouristique ?", a: "Le planning gère les agents saisonniers comme des fixes (profils, spécialités, disponibilités). Vue charge horaire mensuelle pour anticiper les pics mai-octobre et les grands événements bordelais. Remplacements suggérés automatiquement en cas d'absence." },
      { q: "Peut-on gérer des sites entre Bordeaux centre, Mérignac et Pessac ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention, ce qui optimise les tournées sur la métropole." },
      { q: "Proprely répond-il aux exigences des syndics bordelais sur le centre UNESCO ?", a: "Oui. Preuve de passage standardisée (QR, photos, signature), PV automatiques envoyés au syndic gestionnaire, historique complet par site et par intervention. Les principaux formats demandés par les grands syndics nationaux sont supportés." },
    ],
  },
  {
    slug: 'toulouse',
    city: 'Toulouse',
    region: 'Occitanie',
    population: '500 000 habitants, 1,5 million dans la métropole',
    title: "Logiciel de nettoyage à Toulouse : pilotez votre société de propreté en Occitanie",
    subtitle: "Conçu pour la réalité toulousaine : pôle aéronautique géant (Airbus, Thales), tertiaire en croissance (Compans-Caffarelli, Andromède), copropriétés du Capitole, cabinets médicaux. Centralisez clients, agents, plannings et devis dans un seul outil.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Toulouse et en Occitanie. Planning, agents, devis, missions, pilotage B2B. Conçu pour la propreté Haute-Garonne. Bêta gratuite.",
    keywords: ['logiciel nettoyage Toulouse', 'logiciel propreté Occitanie', 'gestion société nettoyage Toulouse', 'planning agents nettoyage Toulouse'],
    marketIntro: "Toulouse Métropole est le quatrième marché français de la propreté B2B et l'un des plus dynamiques. La ville rose concentre un tissu unique : capitale européenne de l'aéronautique (Airbus, ATR, Thales, Safran et leurs centaines de sous-traitants), un quartier tertiaire en expansion (Compans-Caffarelli, Andromède, La Cartoucherie), un centre historique brique rose classé, et un pôle santé majeur autour du CHU Purpan/Rangueil. Les sociétés de nettoyage toulousaines opèrent dans des environnements aux exigences très contrastées.",
    marketBullets: [
      "Pôle aéronautique : Airbus, ATR, Thales, Safran et 1 200+ sous-traitants. Sites industriels avec protocoles ISO et accès sécurisés",
      "Tertiaire en croissance : Compans-Caffarelli, Andromède, Cartoucherie, Borderouge — sièges régionaux et nationaux",
      "Centre historique : copropriétés brique rose autour du Capitole, halls et escaliers à l'identité forte",
      "Pôle santé : CHU Purpan, CHU Rangueil, polycliniques, cabinets de la Côte Pavée et de Saint-Cyprien",
      "Universités et grandes écoles : Capitole, Mirail, INSA, ISAE, ENSEEIHT — résidences et locaux à forte affluence",
      "Marché en croissance forte (+3 à +5%/an), tirée par l'aéronautique et le tertiaire",
    ],
    clientTypes: [
      { icon: Building, type: "Sous-traitants aéronautiques", description: "PME des Zones Aérospatiales (Blagnac, Toulouse-Francazal, Colomiers). Protocoles ISO 9001, accès badgés, agents formés." },
      { icon: Building2, type: "Bureaux Compans / Andromède / Cartoucherie", description: "Immeubles tertiaires neufs, sièges régionaux, coworkings. Rotations 6h-9h, accueil propre obligatoire à 8h30." },
      { icon: Home, type: "Copropriétés brique rose Capitole", description: "Halls voûtés, escaliers en pierre, parties communes au charme méridional. Syndics avec exigence de reporting." },
      { icon: Stethoscope, type: "Pôle santé toulousain", description: "CHU Purpan/Rangueil, polycliniques privées, cabinets de la Côte Pavée et de Saint-Cyprien. Bionettoyage, traçabilité." },
      { icon: GraduationCap, type: "Résidences étudiantes & écoles", description: "Université Capitole, Mirail, INSA, ISAE. Plages hors temps universitaire, vacances bloquées pour remise en état." },
      { icon: Hotel, type: "Hôtellerie & restauration", description: "Hôtels du centre et de Blagnac (proximité aéroport), restaurants du Capitole et de Saint-Cyprien. Étages, parties communes." },
    ],
    challenges: [
      { title: "Sites aéronautiques avec exigences ISO et accès sécurisés", description: "Travailler sur un site Airbus ou Thales, c'est respecter des protocoles ISO, badger ses agents, tracer chaque intervention. Sans système qui mémorise qui peut accéder à quoi et qui valide qu'une mission est faite selon le protocole, vous risquez de perdre votre référencement client." },
      { title: "Étalement géographique sur la métropole", description: "Vos sites peuvent être entre Toulouse centre, Blagnac, Colomiers, Labège, Balma. 20 à 40 km de transit potentiel par jour. Sans optimisation des tournées, vous perdez vite la rentabilité, surtout sur les contrats récurrents serrés." },
      { title: "Croissance forte qui sature l'organisation", description: "Toulouse gagne du tertiaire chaque mois, l'aéronautique pousse, mais piloter sur Excel et WhatsApp ne tient pas la cadence. Vous perdez des heures en administration au lieu de capter la croissance commerciale." },
      { title: "Turnover agents et pénurie de profils qualifiés", description: "Le marché du travail toulousain est tendu sur les profils techniques (bionettoyage, accès aéronautique). Sans système qui capitalise sur les spécialités et la formation des agents, chaque départ vous coûte un trimestre de productivité." },
    ],
    proprelyFit: [
      { title: "Fiches site avec protocoles spécifiques", description: "Site Airbus, cabinet médical, copropriété : chaque site a sa fiche avec protocoles, produits agréés, accès, agents habilités. Le savoir reste dans l'entreprise, les nouveaux agents sont opérationnels dès le 1er jour." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site selon leur dernière intervention. Moins de transit Toulouse-Blagnac-Labège, plus d'heures facturables." },
      { title: "Spécialités et habilitations tracées par agent", description: "Vitrerie, moquette, décapage, bionettoyage médical, accès aéronautique : chaque agent a son profil avec ses habilitations. Le planning propose en priorité les agents qualifiés pour chaque mission." },
      { title: "Preuve de passage acceptée par les syndics et l'aéronautique", description: "QR code sur site, photos avant-après, signature. Le PV est généré automatiquement et envoyé au facility manager ou au syndic sans intervention manuelle. Conforme aux exigences ISO." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Toulouse ?", a: "Oui. Proprely supporte les spécificités toulousaines : sites aéronautiques avec protocoles ISO et habilitations agents, copropriétés du centre historique, pôle santé avec bionettoyage, tertiaire en croissance, étalement géographique sur la métropole." },
      { q: "Mes agents toulousains doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G y compris sur les sites industriels de Blagnac." },
      { q: "Combien coûte Proprely à Toulouse et en Occitanie ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Proprely gère-t-il les habilitations agents pour les sites aéronautiques ?", a: "Oui. Chaque agent a un profil avec ses spécialités et ses habilitations (bionettoyage, accès aéronautique, formation produits). Le planning propose en priorité les agents qualifiés pour chaque mission. Historique conservé pour les audits ISO." },
      { q: "Peut-on gérer des sites entre Toulouse, Blagnac, Colomiers et Labège ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention, ce qui optimise les tournées sur la métropole." },
      { q: "Proprely supporte-t-il les exigences ISO 9001 des sous-traitants aéronautiques ?", a: "Oui. Preuve de passage standardisée (QR, photos, signature), PV automatiques par site et par intervention, historique complet conservé. Conforme aux exigences de traçabilité ISO 9001 demandées par les donneurs d'ordre aéronautiques." },
    ],
  },
  {
    slug: 'nantes',
    city: 'Nantes',
    region: 'Pays de la Loire',
    population: '320 000 habitants, 670 000 dans la métropole',
    title: "Logiciel de nettoyage à Nantes : pilotez votre société de propreté en Pays de la Loire",
    subtitle: "Conçu pour la réalité nantaise : tertiaire en croissance (Île de Nantes, EuroNantes), tissu industriel maritime, copropriétés du centre, hôtellerie et tourisme culturel. Centralisez clients, agents, plannings et devis.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Nantes et en Pays de la Loire. Planning, agents, devis, missions, pilotage B2B. Conçu pour la propreté Loire-Atlantique. Bêta gratuite.",
    keywords: ['logiciel nettoyage Nantes', 'logiciel propreté Loire-Atlantique', 'gestion société nettoyage Nantes', 'planning agents nettoyage Nantes'],
    marketIntro: "Nantes Métropole est l'un des marchés français de la propreté B2B en plus forte croissance démographique et économique. La cité des ducs concentre un mix unique : un quartier d'affaires en pleine mutation sur l'Île de Nantes, un tertiaire EuroNantes adossé à la gare, un tissu industriel maritime hérité des chantiers (Naval Group, Airbus Atlantic), un centre historique commerçant, une scène culturelle dynamique (Machines de l'Île, Voyage à Nantes) et une demande qui dépasse l'offre sur la plupart des segments propreté.",
    marketBullets: [
      "Île de Nantes : ex-friche industrielle reconvertie, immeubles tertiaires neufs, sièges régionaux et nationaux",
      "EuroNantes : pôle d'affaires autour de la gare, immeubles haute densité, accueil et reporting exigés",
      "Tissu industriel maritime : Naval Group, Airbus Atlantic et leurs sous-traitants, protocoles industriels",
      "Centre historique : copropriétés bourgeoises Quartier Graslin, rues commerçantes Decré et Bouffay",
      "Tourisme culturel : Machines de l'Île, Château des Ducs, Voyage à Nantes — flux touristique tertiaire",
      "Marché en croissance forte (+4 à +6%/an), tirée par la démographie et le tertiaire",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Île de Nantes / EuroNantes", description: "Immeubles tertiaires neufs, sièges régionaux, coworkings, scaleups tech. Rotations 6h-9h, accueil propre exigé." },
      { icon: Building, type: "Industrie maritime et aéronautique", description: "Naval Group, Airbus Atlantic et sous-traitants. Sites industriels avec protocoles, accès sécurisés, traçabilité." },
      { icon: Home, type: "Copropriétés Graslin / Centre", description: "Immeubles bourgeois, halls en pierre, escaliers à rampe en fer forgé. Syndics avec exigence de reporting standardisé." },
      { icon: Stethoscope, type: "Pôle santé nantais", description: "CHU Hôtel-Dieu, polycliniques, cabinets médicaux et dentaires. Bionettoyage, traçabilité produits, agents formés." },
      { icon: Hotel, type: "Hôtellerie & restauration culturelle", description: "Hôtels du centre, autour de la gare, près des Machines de l'Île. Étages, parties communes, restaurants intégrés." },
      { icon: ShoppingBag, type: "Retail & rues commerçantes", description: "Rue Crébillon, Decré, Bouffay, Passage Pommeraye. Avant ouverture 5h-9h, vitrerie et sols brillants exigés." },
    ],
    challenges: [
      { title: "Croissance démographique et économique qui sature l'offre", description: "Nantes gagne 5 000 à 8 000 habitants par an, le tertiaire pousse, mais l'offre propreté ne suit pas. Vous croulez sous les demandes entrantes, et sans système qui passe à l'échelle, vous arbitrez à l'aveugle entre les opportunités." },
      { title: "Mix industriel maritime et tertiaire neuf", description: "Un site Naval Group n'a pas les mêmes exigences qu'un immeuble EuroNantes. Protocoles différents, accès différents, agents habilités différemment. Sans fiches site documentées et habilitations tracées, vous risquez l'erreur opérationnelle." },
      { title: "Tissu PME dispersé sur la métropole", description: "Vos clients peuvent être entre Nantes centre, Saint-Herblain, Rezé, Carquefou. 15 à 30 km de transit par jour. Sans optimisation des tournées, vous perdez vite la rentabilité." },
      { title: "Pénurie de profils qualifiés", description: "Le marché du travail nantais est tendu. Sans système qui capitalise sur les spécialités et la formation des agents, chaque départ vous coûte un trimestre de productivité et fragilise votre référencement chez les grands clients." },
    ],
    proprelyFit: [
      { title: "Fiches site qui mémorisent les protocoles", description: "Site Naval Group, immeuble EuroNantes, copropriété Graslin : chaque site a sa fiche avec protocoles, produits agréés, accès, agents habilités. Les nouveaux agents sont opérationnels dès le 1er jour." },
      { title: "Spécialités et habilitations tracées par agent", description: "Vitrerie, moquette, décapage, bionettoyage médical, accès industriel : chaque agent a son profil avec ses habilitations. Le planning propose en priorité les agents qualifiés." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site. Moins de transit Nantes-Saint-Herblain-Carquefou, plus d'heures facturables." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous identifiez immédiatement les contrats à renégocier et ceux qui portent vraiment votre rentabilité." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Nantes ?", a: "Oui. Proprely supporte les spécificités nantaises : mix industriel maritime / tertiaire neuf, sites Naval Group et Airbus Atlantic avec protocoles, tertiaire Île de Nantes et EuroNantes, copropriétés du centre, dispersion géographique sur la métropole." },
      { q: "Mes agents nantais doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G y compris dans les sites industriels de Saint-Herblain ou Rezé." },
      { q: "Combien coûte Proprely à Nantes et en Loire-Atlantique ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Proprely gère-t-il les habilitations pour les sites Naval Group ou Airbus Atlantic ?", a: "Oui. Chaque agent a un profil avec ses spécialités et ses habilitations. Le planning propose en priorité les agents qualifiés pour chaque mission industrielle. Historique conservé pour les audits clients." },
      { q: "Peut-on gérer des sites entre Nantes, Saint-Herblain, Rezé et Carquefou ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention." },
      { q: "Proprely répond-il aux exigences de traçabilité des donneurs d'ordre nantais ?", a: "Oui. Preuve de passage standardisée (QR, photos, signature), PV automatiques par site et par intervention, historique complet conservé. Conforme aux exigences de traçabilité demandées par les grands donneurs d'ordre tertiaires et industriels." },
    ],
  },
]

export function getCity(slug: string): CityPage | undefined {
  return cities.find((c) => c.slug === slug)
}
