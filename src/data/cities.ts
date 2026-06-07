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
  /** Département (numéro + nom). Utilisé dans le schéma LocalBusiness areaServed. */
  department?: string
  /** Coordonnées géographiques (centre-ville, format WGS84). Utilisées pour le schéma LocalBusiness.geo. */
  geo?: { latitude: number; longitude: number }
  /** URL Wikidata de la ville. Utilisée comme sameAs dans le schéma LocalBusiness. */
  wikidata?: string
  /** Quartiers d'affaires et zones tertiaires différenciants pour la propreté B2B locale. */
  neighborhoods?: { name: string; description: string }[]
  /** Prix de marché local (bureaux €/m²/an HT et signal de tension). */
  marketPricing?: { range: string; note: string }
  population: string
  title: string
  subtitle: string
  /** Réponse-flash 40-80 mots optimisée pour Generative Engines
   *  (ChatGPT, Perplexity, AI Overviews). Affichée en tête de page. */
  tldr?: string
  metaDescription: string
  keywords: string[]
  marketIntro: string
  marketBullets: string[]
  clientTypes: CityClientType[]
  challenges: CityChallenge[]
  proprelyFit: CityFit[]
  faq: CityFAQ[]
  /** Slugs d'articles de blog liés (pour maillage interne ville → blog) */
  relatedBlogSlugs?: string[]
  /** Slugs de fonctionnalités liées (pour maillage interne ville → feature) */
  relatedFeatureSlugs?: string[]
}

/**
 * Données géo + wikidata par ville. Centralisées ici (plutôt qu'inlinées dans
 * chaque objet) pour faciliter la mise à jour et garder les objets villes
 * lisibles. Injectées par getCity().
 */
const CITY_GEO: Record<string, { latitude: number; longitude: number; wikidata: string; department: string }> = {
  paris:       { latitude: 48.8566, longitude:  2.3522, wikidata: 'https://www.wikidata.org/wiki/Q90',    department: '75 — Paris' },
  lyon:        { latitude: 45.7640, longitude:  4.8357, wikidata: 'https://www.wikidata.org/wiki/Q456',   department: '69 — Rhône' },
  marseille:   { latitude: 43.2965, longitude:  5.3698, wikidata: 'https://www.wikidata.org/wiki/Q23482', department: '13 — Bouches-du-Rhône' },
  bordeaux:    { latitude: 44.8378, longitude: -0.5792, wikidata: 'https://www.wikidata.org/wiki/Q1479',  department: '33 — Gironde' },
  toulouse:    { latitude: 43.6047, longitude:  1.4442, wikidata: 'https://www.wikidata.org/wiki/Q7880',  department: '31 — Haute-Garonne' },
  nantes:      { latitude: 47.2184, longitude: -1.5536, wikidata: 'https://www.wikidata.org/wiki/Q12191', department: '44 — Loire-Atlantique' },
  lille:       { latitude: 50.6292, longitude:  3.0573, wikidata: 'https://www.wikidata.org/wiki/Q648',   department: '59 — Nord' },
  nice:        { latitude: 43.7102, longitude:  7.2620, wikidata: 'https://www.wikidata.org/wiki/Q33959', department: '06 — Alpes-Maritimes' },
  strasbourg:  { latitude: 48.5734, longitude:  7.7521, wikidata: 'https://www.wikidata.org/wiki/Q6602',  department: '67 — Bas-Rhin' },
  montpellier: { latitude: 43.6108, longitude:  3.8767, wikidata: 'https://www.wikidata.org/wiki/Q6441',  department: '34 — Hérault' },
  rennes:      { latitude: 48.1173, longitude: -1.6778, wikidata: 'https://www.wikidata.org/wiki/Q647',   department: '35 — Ille-et-Vilaine' },
}

/**
 * Quartiers d'affaires et zones tertiaires différenciants par ville. Données
 * géo-locales que Google valorise comme signal de pertinence (T10 audit SEO).
 * Centralisées hors des objets villes pour la lisibilité.
 */
const CITY_NEIGHBORHOODS: Record<string, { name: string; description: string }[]> = {
  paris: [
    { name: "QCA (Quartier Central des Affaires)", description: "Triangle Opéra–Champs-Élysées–Madeleine : sièges sociaux du CAC 40, banques d'affaires, cabinets de conseil. Rotations 6h-9h avant ouverture, exigence d'accueil irréprochable à 8h30." },
    { name: "La Défense (92)", description: "Premier quartier d'affaires européen, 3,5 millions de m² de bureaux. Badges, accès contrôlés, preuves de passage standardisées exigées par les facility managers." },
    { name: "13e — Paris Rive Gauche / BNF", description: "Bibliothèque François-Mitterrand, sièges Le Monde / Telecom Paris. Immeubles tertiaires modernes, exigences éco-responsabilité forte." },
    { name: "Boulogne / Issy-les-Moulineaux (92)", description: "Sièges des grands groupes média (TF1, BFM), tech (Microsoft France, Oracle). Norme ISO 14001, certifications agents." },
    { name: "Saint-Denis / Plaine Saint-Denis (93)", description: "Sièges SFR, Orange Campus, Stade de France. Bureaux tertiaires modernes, exigences logistiques liées aux événements." },
  ],
  lyon: [
    { name: "Part-Dieu", description: "2e quartier d'affaires français hors Paris, gare TGV, tours en expansion (To-Lyon, Silex²). Rotations matinales 6h-9h, reporting régulier exigé." },
    { name: "Confluence", description: "Quartier tertiaire moderne au sud de la presqu'île, certifications HQE/BREEAM omniprésentes. Exigences éco-responsabilité fortes." },
    { name: "Gerland (7e)", description: "Cluster biotech & pharmaceutique : Sanofi, BioMérieux et leur écosystème. Salles blanches, protocoles ISO, certifications agents obligatoires." },
    { name: "Vaise (9e)", description: "Pôle multimédia (Bayer, Technip, Atos, Cegid). Tertiaire moderne, accès depuis le tunnel sous Fourvière — délais matinaux à anticiper." },
    { name: "Vieux-Lyon / Presqu'île", description: "Hôtellerie haut de gamme, restaurants étoilés, bouchons lyonnais. Plages très contraintes (avant ouverture)." },
  ],
  marseille: [
    { name: "Euroméditerranée", description: "Plus grand projet de rénovation urbaine d'Europe du Sud, 480 ha. Tertiaire moderne (CMA-CGM, La Marseillaise, Les Docks). Marché en expansion." },
    { name: "Le Prado / 8e arrondissement", description: "Quartier d'affaires historique, mutuelles, cabinets d'avocats. Copropriétés bourgeoises, syndics nationaux exigeant un reporting standardisé." },
    { name: "La Joliette", description: "Reconversion portuaire, sièges régionaux et incubateurs (CMA-CGM, Voyage Privé). Rotations matinales avec contraintes mistral." },
    { name: "Pôle Activités d'Aix-en-Provence", description: "Sites Airbus Helicopters, ITER, microélectronique (STMicroelectronics). Exigences ESD et salles propres, tarifs majorés 30-50 %." },
    { name: "Vieux-Port / Le Panier", description: "Hôtellerie saisonnière (mai-octobre), restaurants. Doublement de la demande estivale, gestion saisonnalité critique." },
  ],
  bordeaux: [
    { name: "Bassins à flot / Bacalan", description: "Tertiaire en croissance, Cité du Vin, sièges régionaux. Reconversion industrielle récente, bureaux modernes HQE." },
    { name: "Chartrons / quais", description: "Tertiaire historique : avocats, négociants en vins, banques privées. Copropriétés haussmanniennes, exigences patrimoniales." },
    { name: "Mériadeck", description: "Bureaux administratifs (Conseil régional, CAF, CPAM, tribunal). Volumes importants, contraintes horaires strictes (avant 8h)." },
    { name: "Aéroparc Mérignac", description: "Dassault, Thales, Stelia Aerospace. Exigences ESD/salles propres, badges, traçabilité renforcée." },
    { name: "Saint-Émilion / Médoc (œnotourisme)", description: "Hôtellerie de prestige (Sources de Caudalie, Lalique), châteaux viticoles. Saisonnalité mai-octobre + vendanges septembre." },
  ],
}

/** Prix de marché bureaux par ville (référentiel 2026, €/m²/an HT). */
const CITY_PRICING: Record<string, { range: string; note: string }> = {
  paris:       { range: "15-22 €/m²/an HT", note: "Référence haute du marché français. Premium 25-40 % au-dessus de la moyenne nationale." },
  lyon:        { range: "12-18 €/m²/an HT", note: "2e marché français, 10-15 % en dessous de Paris. Marge nette atteignable 15-20 %." },
  marseille:   { range: "10-15 €/m²/an HT", note: "3e marché, 20 % en dessous de Paris. Saisonnalité forte mai-octobre." },
  bordeaux:    { range: "10-13 €/m²/an HT", note: "10-20 % en dessous de Paris. Marge nette atteignable 15-20 %." },
  toulouse:    { range: "11-15 €/m²/an HT", note: "15 % en dessous de Paris. Tarif majoré 30-50 % sur les sites aérospatial / ESD." },
  nantes:      { range: "11-15 €/m²/an HT", note: "Marché mature mais en expansion, 15 % en dessous de Paris." },
  lille:       { range: "11-14 €/m²/an HT", note: "20 % en dessous de Paris. Opportunités cross-border Belgique." },
  nice:        { range: "12-17 €/m²/an HT", note: "Saisonnalité touristique forte, tertiaire en croissance." },
  strasbourg:  { range: "10-13 €/m²/an HT", note: "Institutions européennes, exigences multilingues, RGPD renforcé." },
  montpellier: { range: "10-13 €/m²/an HT", note: "Pôle santé et tech en croissance, démographie +1 % par an." },
  rennes:      { range: "10-13 €/m²/an HT", note: "Tech et agroalimentaire, marché en expansion régulière." },
}

export const cities: CityPage[] = [
  {
    slug: 'paris',
    city: 'Paris',
    region: 'Île-de-France',
    population: '2,1 millions d\'habitants intra-muros, 12 millions en région',
    title: "Logiciel nettoyage Paris : cockpit métier B2B",
    subtitle: "Conçu pour les contraintes parisiennes : rotations matinales serrées, multi-sites tertiaires, copropriétés haussmanniennes, turnover agents élevé. Pilotez clients, agents, plannings et devis depuis un seul écran.",
    tldr: "Pour gérer une société de nettoyage à Paris en 2026, Proprely centralise plannings, agents, devis et preuve de passage sur un cockpit unique adapté aux contraintes parisiennes : rotations matinales avant 8h dans le tertiaire, 50 000+ copropriétés haussmanniennes avec PV automatique pour les syndics, turnover agents > 35 %. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Paris et IDF : planning, agents, devis, preuve de passage. Cockpit B2B francilien. Bêta gratuite.",
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
    title: "Logiciel nettoyage Lyon : cockpit Rhône-Alpes",
    subtitle: "Conçu pour la réalité lyonnaise : forte densité tertiaire, secteur médical et pharmaceutique exigeant, immobilier de bureaux en croissance (Confluence, Part-Dieu, Vaise). Centralisez clients, agents, plannings et devis dans un seul outil.",
    tldr: "Pour gérer une société de nettoyage à Lyon en 2026, Proprely propose un cockpit unique adapté au tertiaire de Part-Dieu, Confluence et Vaise, au médical/pharmaceutique exigeant (HCL, biotechs) et aux contraintes IDCC 3043. Planning multi-sites, preuve de passage, marge par client en temps réel. Bêta privée gratuite, hébergement européen.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Lyon et Rhône-Alpes : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
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
    title: "Logiciel nettoyage Marseille : cockpit PACA",
    subtitle: "Conçu pour la réalité marseillaise : tertiaire en mutation (Euroméditerranée, La Joliette), hôtellerie touristique saisonnière, copropriétés bord de mer avec contraintes sel et humidité. Centralisez clients, agents, plannings et devis.",
    tldr: "Pour gérer une société de nettoyage à Marseille en 2026, Proprely centralise plannings, agents et preuve de passage avec le contexte PACA en tête : tertiaire en mutation à Euroméditerranée et La Joliette, hôtellerie saisonnière intense l'été, copropriétés bord de mer avec contraintes sel et humidité. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Marseille et en PACA : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
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
    title: "Logiciel nettoyage Bordeaux : cockpit Gironde",
    subtitle: "Conçu pour la réalité bordelaise : tertiaire en croissance (Euratlantique, Bassins à flot), copropriétés du croissant haussmannien, hôtellerie œnotouristique, cabinets médicaux du Triangle d'Or. Centralisez clients, agents, plannings et devis.",
    tldr: "Pour gérer une société de nettoyage à Bordeaux en 2026, Proprely propose un cockpit unique adapté au tertiaire d'Euratlantique et des Bassins à flot, aux copropriétés du croissant haussmannien et à l'hôtellerie œnotouristique. Planning multi-sites, preuve de passage, conformité IDCC 3043, marge par contrat. Bêta privée gratuite.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Bordeaux et Nouvelle-Aquitaine : planning, agents, devis, preuve de passage. Bêta gratuite.",
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
    title: "Logiciel nettoyage Toulouse : cockpit Occitanie",
    subtitle: "Conçu pour la réalité toulousaine : pôle aéronautique géant (Airbus, Thales), tertiaire en croissance (Compans-Caffarelli, Andromède), copropriétés du Capitole, cabinets médicaux. Centralisez clients, agents, plannings et devis dans un seul outil.",
    tldr: "Pour gérer une société de nettoyage à Toulouse en 2026, Proprely centralise plannings, agents et preuve de passage avec le contexte Occitanie en tête : pôle aéronautique Airbus/Thales aux protocoles stricts, tertiaire en croissance à Compans-Caffarelli et Andromède, copropriétés du Capitole. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Toulouse et Occitanie : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
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
    title: "Logiciel nettoyage Nantes : cockpit Pays de la Loire",
    subtitle: "Conçu pour la réalité nantaise : tertiaire en croissance (Île de Nantes, EuroNantes), tissu industriel maritime, copropriétés du centre, hôtellerie et tourisme culturel. Centralisez clients, agents, plannings et devis.",
    tldr: "Pour gérer une société de nettoyage à Nantes en 2026, Proprely propose un cockpit unique adapté au tertiaire de l'Île de Nantes et EuroNantes, au tissu industriel maritime, et aux copropriétés du centre-ville. Planning multi-sites, preuve de passage, marge par client, conformité IDCC 3043. Bêta privée gratuite.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Nantes et Pays de la Loire : planning, agents, devis, preuve de passage. Bêta gratuite.",
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
  {
    slug: 'lille',
    city: 'Lille',
    region: 'Hauts-de-France',
    population: '236 000 habitants, 1,2 million dans la métropole',
    title: "Logiciel nettoyage Lille : cockpit Hauts-de-France",
    subtitle: "Conçu pour la réalité lilloise : Euralille tertiaire, frontière belge avec sociétés cross-border, copropriétés du Vieux-Lille, pôle hospitalier CHRU. Centralisez clients, agents, plannings et devis dans un seul outil.",
    tldr: "Pour gérer une société de nettoyage à Lille en 2026, Proprely centralise plannings, agents et preuve de passage avec le contexte Hauts-de-France en tête : tertiaire d'Euralille, frontière belge avec sociétés cross-border, copropriétés du Vieux-Lille, pôle hospitalier CHRU exigeant bionettoyage. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Lille et Hauts-de-France : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
    keywords: ['logiciel nettoyage Lille', 'logiciel propreté Nord', 'gestion société nettoyage Hauts-de-France', 'planning agents nettoyage Lille'],
    marketIntro: "Lille est la capitale économique du Nord et un marché de la propreté B2B sous-estimé en France. La métropole concentre Euralille (3ème quartier d'affaires français hors région parisienne après La Défense et La Part-Dieu), un pôle universitaire majeur (Université de Lille, Centrale Lille, EDHEC, IESEG), le CHRU de Lille (1er CHU français en taille), un tissu industriel hérité (textile, agroalimentaire), une proximité frontalière unique avec la Belgique, et un centre historique classé. Les sociétés de nettoyage lilloises composent avec ces univers très différents.",
    marketBullets: [
      "Euralille : 3ème quartier d'affaires français hors IDF, immeubles tertiaires haute densité",
      "Pôle hospitalier majeur : CHRU de Lille, hôpitaux Saint-Vincent, polycliniques, cabinets médicaux",
      "Universités et grandes écoles : Université de Lille (60 000 étudiants), Centrale, EDHEC, IESEG",
      "Vieux-Lille : copropriétés bourgeoises avec halls en pierre, syndics nationaux",
      "Proximité belge : certaines sociétés opèrent sur Lille + Tournai/Mouscron, double réglementation",
      "Tissu industriel et agroalimentaire : sites de production avec protocoles HACCP, propreté réglementée",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Euralille / Roubaix-Tourcoing", description: "Immeubles tertiaires modernes, sièges régionaux (Auchan, Decathlon, OVHcloud à proximité), startups. Rotations 6h-9h, exigence accueil." },
      { icon: Stethoscope, type: "Pôle santé lillois", description: "CHRU, cliniques privées, EHPAD, cabinets médicaux. Bionettoyage, traçabilité produits, agents formés aux risques biologiques." },
      { icon: GraduationCap, type: "Universités et grandes écoles", description: "Université de Lille, EDHEC, IESEG, Centrale. Plages hors temps universitaire, vacances bloquées pour remise en état, exigences administratives." },
      { icon: Home, type: "Copropriétés Vieux-Lille / Boulevards", description: "Immeubles bourgeois, briques rouges historiques, halls en pierre. Syndics avec exigence de reporting standardisé." },
      { icon: Building, type: "Industrie et agroalimentaire", description: "Sites de production (textile, agroalimentaire, logistique). Protocoles HACCP, agents formés, traçabilité ISO." },
      { icon: ShoppingBag, type: "Retail & rues commerçantes", description: "Rue de Béthune, Rue Faidherbe, Euralille shopping. Avant ouverture 5h-9h, vitrerie et sols brillants exigés." },
    ],
    challenges: [
      { title: "Multi-protocoles sur la même journée", description: "Un agent peut enchaîner bureau Euralille à 6h, cabinet médical à 14h, et site industriel agroalimentaire HACCP en soirée. Trois protocoles très différents. Sans système qui mémorise qui sait faire quoi, vous risquez l'erreur opérationnelle." },
      { title: "Métropole étalée Lille-Roubaix-Tourcoing-Villeneuve d'Ascq", description: "Vos sites peuvent être entre Lille centre, Roubaix, Tourcoing, Villeneuve d'Ascq, et la frontière belge. 30 à 50 km de transit potentiel par jour. Sans optimisation des tournées, vous perdez la rentabilité." },
      { title: "Cross-border avec la Belgique", description: "Si vous opérez à Tournai, Mouscron ou Courtrai en plus de Lille, vous devez gérer deux réglementations sociales (France/Belgique), deux devises affichées éventuelles, et des conventions collectives différentes pour vos agents." },
      { title: "Recrutement tendu, turnover élevé", description: "La métropole lilloise est en croissance économique soutenue, le marché du travail est tendu sur les profils techniques (bionettoyage, HACCP). Sans système qui capitalise sur les spécialités, chaque départ coûte un trimestre de productivité." },
    ],
    proprelyFit: [
      { title: "Spécialités et habilitations tracées par agent", description: "Vitrerie, moquette, décapage, bionettoyage médical, HACCP industriel : chaque agent a son profil. Le planning propose en priorité les agents qualifiés pour chaque mission." },
      { title: "Fiches site avec protocoles spécifiques", description: "Site CHRU, bureau Euralille, copro Vieux-Lille, ligne agroalimentaire : chaque site a sa fiche avec protocoles, produits agréés, accès, agents habilités. Le savoir reste dans l'entreprise." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site selon leur dernière intervention. Moins de transit Lille-Roubaix-Villeneuve, plus d'heures facturables." },
      { title: "Preuve de passage acceptée par syndics et CHRU", description: "QR code, photos avant-après, signature. PV automatique envoyé au facility manager ou au syndic. Conforme aux exigences hospitalières et tertiaires." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Lille ?", a: "Oui. Proprely supporte les spécificités lilloises : mix tertiaire Euralille / médical CHRU / universitaire / agroalimentaire industriel, copropriétés du Vieux-Lille avec syndics nationaux, étalement géographique Lille-Roubaix-Tourcoing-Villeneuve, et même les agents qui interviennent à la frontière belge." },
      { q: "Mes agents lillois doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G y compris dans les sous-sols du CHRU." },
      { q: "Combien coûte Proprely à Lille et dans les Hauts-de-France ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire, pas d'engagement." },
      { q: "Proprely gère-t-il les protocoles HACCP pour les sites agroalimentaires ?", a: "Oui. Chaque site agroalimentaire a sa fiche avec protocoles HACCP, produits agréés, agents habilités. Preuve de passage avec photos et signature pour traçabilité. Historique conservé pour les audits clients." },
      { q: "Peut-on gérer des sites entre Lille, Roubaix, Tourcoing et Villeneuve d'Ascq ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention, ce qui optimise les tournées sur la métropole." },
      { q: "Proprely supporte-t-il les opérations cross-border France-Belgique ?", a: "Oui pour la partie planning et opérationnelle. Pour les particularités juridiques et sociales propres aux agents belges (conventions collectives, charges, paie), nous recommandons d'utiliser un logiciel paie dédié belge en parallèle. La connexion native paie est en finalisation." },
    ],
  },
  {
    slug: 'nice',
    city: 'Nice',
    region: 'Provence-Alpes-Côte d\'Azur',
    population: '340 000 habitants, 1 million dans la métropole Nice Côte d\'Azur',
    title: "Logiciel nettoyage Nice : cockpit Côte d'Azur",
    subtitle: "Conçu pour la réalité niçoise : hôtellerie de luxe Promenade des Anglais, tourisme international, événementiel récurrent, copropriétés résidentielles bord de mer, contraintes climatiques (sel, soleil). Centralisez clients, agents, plannings et devis.",
    tldr: "Pour gérer une société de nettoyage à Nice en 2026, Proprely propose un cockpit unique adapté à l'hôtellerie de luxe Promenade des Anglais, au tourisme international saisonnier, à l'événementiel récurrent et aux copropriétés bord de mer (contraintes sel, soleil). Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Nice et Côte d'Azur : planning, agents, devis, preuve de passage. Luxe et tourisme. Bêta gratuite.",
    keywords: ['logiciel nettoyage Nice', 'logiciel propreté Côte d\'Azur', 'gestion société nettoyage Nice', 'planning agents nettoyage Côte d\'Azur'],
    marketIntro: "Nice et la métropole Nice Côte d'Azur constituent un marché de la propreté B2B très particulier en France : l'hôtellerie de luxe internationale y domine (Negresco, Hyatt Regency, palaces de la Promenade des Anglais et de Cannes), l'événementiel récurrent porte une demande pulsée (Festival de Cannes, Monaco Grand Prix, salons MIPIM/MIPCOM), les copropriétés résidentielles de luxe bord de mer imposent des prestations haut de gamme, et les contraintes climatiques (salinité, soleil intense, humidité) influencent produits et fréquences.",
    marketBullets: [
      "Hôtellerie de luxe : palaces 5 étoiles, hôtels boutique, résidences de tourisme haut de gamme",
      "Événementiel international : Festival de Cannes, MIPIM, MIPCOM, Monaco Grand Prix — pics de demande",
      "Aéroport Nice Côte d'Azur : 2ème aéroport français, sociétés de services aéroportuaires",
      "Copropriétés résidentielles bord de mer : Promenade, Mont Boron, Cap Ferrat, contraintes sel et humidité",
      "Pôle tertiaire émergent : Nice Méridia, Sophia-Antipolis (1ère technopole européenne)",
      "Saisonnalité marquée : avril-octobre haute saison, demande peut doubler",
    ],
    clientTypes: [
      { icon: Hotel, type: "Hôtellerie de luxe", description: "Palaces 5 étoiles (Negresco, Boscolo, Le Méridien), hôtels boutique. Étages, parties communes, restaurants étoilés, exigence absolue de discrétion." },
      { icon: Home, type: "Copropriétés résidentielles luxe", description: "Promenade des Anglais, Mont Boron, Cap Ferrat. Halls en marbre, parties communes vue mer. Salinité, calcaire, syndics haut de gamme exigeants." },
      { icon: Building2, type: "Tertiaire Nice Méridia / Sophia-Antipolis", description: "Sièges régionaux, scaleups tech, sociétés internationales (Amadeus, IBM, SAP à Sophia). Rotations matinales, accueil propre exigé." },
      { icon: ShoppingBag, type: "Retail et galeries marchandes", description: "Avenue Jean Médecin, Nice Étoile, centres commerciaux Lingostière. Avant ouverture 5h-9h, vitrerie haute fréquence." },
      { icon: Building, type: "Aéroport Nice Côte d'Azur", description: "2ème aéroport français. Sociétés sous-traitantes propreté terminal, parkings, lounges. Protocoles aviation, accès sécurisés." },
      { icon: Stethoscope, type: "Cabinets médicaux & cliniques", description: "Cliniques privées Saint-George, Saint-François. Cabinets médicaux du Cimiez et de Carras. Bionettoyage strict." },
    ],
    challenges: [
      { title: "Saisonnalité touristique qui double les besoins l'été", description: "Avril à octobre, la demande hôtelière et événementielle peut doubler. Sans planning flexible et système d'agents saisonniers gérés comme des fixes, vous craquez sur la haute saison ou vous portez des heures non-facturables l'hiver." },
      { title: "Pics événementiels imprévisibles", description: "Festival de Cannes, MIPIM, GP Monaco, salons : des semaines où la demande explose ponctuellement avec besoin d'agents qualifiés pour des sites luxe. Sans système qui mobilise rapidement la bonne équipe, vous perdez l'opportunité." },
      { title: "Salinité et calcaire bord de mer", description: "Les vitres, rampes inox, parties communes bord de mer demandent des produits et fréquences spécifiques. Sans fiches site documentées, le savoir-faire reste dans la tête des agents et part avec eux." },
      { title: "Recrutement saisonnier et turnover", description: "Le marché du travail saisonnier niçois est tendu de mai à septembre. Sans système qui capitalise sur les profils saisonniers d'une année sur l'autre, vous recommencez chaque printemps." },
    ],
    proprelyFit: [
      { title: "Planning flexible saisonnalité touristique", description: "Agents saisonniers gérés comme des fixes (profils, spécialités, disponibilités historisées). Vue charge horaire mensuelle pour anticiper avril-octobre. Remplacements suggérés automatiquement. Vous absorbez la haute saison sans craquer." },
      { title: "Fiches site avec contraintes bord de mer", description: "Chaque copropriété ou hôtel a sa fiche avec spécificités sel/calcaire/humidité, produits agréés, fréquences spécifiques. Le savoir documenté une fois, suivi par tous les agents." },
      { title: "Mobilisation rapide pour événementiel", description: "Festival, MIPIM, GP : sélectionnez l'équipe en quelques clics selon spécialités luxe et habilitations. Briefing partagé, planning consolidé, preuve de passage par site." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous identifiez les contrats luxe vraiment rentables et ceux qui érodent votre marge." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Nice ?", a: "Oui. Proprely supporte les spécificités niçoises : hôtellerie de luxe, événementiel international, copropriétés bord de mer avec contraintes sel/calcaire, saisonnalité forte, tissu tertiaire Méridia/Sophia-Antipolis." },
      { q: "Mes agents niçois doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Pas d'installation, pas de formation, fonctionne en 4G y compris en zone littorale." },
      { q: "Combien coûte Proprely à Nice et sur la Côte d'Azur ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public." },
      { q: "Comment Proprely gère-t-il la saisonnalité touristique forte ?", a: "Le planning gère les agents saisonniers comme des fixes (profils, spécialités, disponibilités). Vue charge horaire mensuelle pour anticiper les pics. Remplacements suggérés automatiquement. Vous absorbez la haute saison sans perdre votre organisation." },
      { q: "Proprely gère-t-il les événementiels type Festival de Cannes ou GP Monaco ?", a: "Oui. Constitution rapide d'équipes ponctuelles, briefing partagé, planning consolidé multi-sites, preuve de passage par site et par intervention. Idéal pour les opérations événementielles intensives." },
      { q: "Peut-on gérer des sites entre Nice, Cannes, Monaco, Antibes et Sophia ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention." },
    ],
  },
  {
    slug: 'strasbourg',
    city: 'Strasbourg',
    region: 'Grand Est',
    population: '290 000 habitants, 510 000 dans l\'Eurométropole',
    title: "Logiciel nettoyage Strasbourg : cockpit Alsace",
    subtitle: "Conçu pour la réalité strasbourgeoise : capitale européenne (Parlement, Conseil de l'Europe), pôle pharmaceutique, frontière allemande, copropriétés du centre UNESCO. Centralisez clients, agents, plannings et devis dans un seul outil.",
    tldr: "Pour gérer une société de nettoyage à Strasbourg en 2026, Proprely centralise plannings, agents et preuve de passage avec le contexte Alsace en tête : institutions européennes aux protocoles stricts, pôle pharmaceutique exigeant bionettoyage, frontière allemande, copropriétés du centre UNESCO. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Strasbourg et Grand Est : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
    keywords: ['logiciel nettoyage Strasbourg', 'logiciel propreté Alsace', 'gestion société nettoyage Grand Est', 'planning agents nettoyage Strasbourg'],
    marketIntro: "Strasbourg est un marché de la propreté B2B unique en France : capitale européenne (Parlement européen, Conseil de l'Europe, Cour des Droits de l'Homme), siège d'institutions internationales avec sécurité renforcée, pôle pharmaceutique majeur (Lilly, Novartis, sous-traitants), frontière allemande avec sociétés opérant sur Strasbourg-Kehl, centre historique classé UNESCO, port autonome (3ème port fluvial européen), et tissu universitaire dense.",
    marketBullets: [
      "Capitale européenne : Parlement, Conseil de l'Europe, CEDH, sécurité renforcée, accès badgés",
      "Pôle pharmaceutique : Lilly, Novartis, et leur écosystème sous-traitants. Protocoles GMP, salles blanches",
      "Frontière allemande : Strasbourg-Kehl avec sociétés cross-border, double réglementation FR/DE",
      "Centre UNESCO : Grande Île, halls Petite France, contraintes patrimoniales fortes",
      "Université de Strasbourg : 5ème université française, 51 000 étudiants",
      "Port autonome de Strasbourg : 3ème port fluvial européen, sites logistiques étendus",
    ],
    clientTypes: [
      { icon: Building, type: "Institutions européennes", description: "Parlement européen, Conseil de l'Europe, CEDH. Accès sécurisés, agents habilités, contrôles renforcés. Prestations sous appel d'offres pluriannuels." },
      { icon: Building, type: "Industrie pharmaceutique", description: "Lilly, Novartis, sous-traitants. Salles blanches, protocoles GMP, certifications agents, charte qualité stricte." },
      { icon: Home, type: "Copropriétés Grande Île UNESCO", description: "Maisons à colombages, halls historiques, parties communes patrimoniales. Syndics avec exigences spécifiques classement UNESCO." },
      { icon: Building2, type: "Bureaux Wacken / Étoile", description: "Quartier d'affaires européen, sièges régionaux, scaleups tech. Rotations 6h-9h." },
      { icon: GraduationCap, type: "Universités et grandes écoles", description: "Université de Strasbourg, ENA (devenue INSP), Sciences Po. Plages hors temps universitaire, vacances bloquées." },
      { icon: Stethoscope, type: "Pôle santé strasbourgeois", description: "Hôpitaux Universitaires (HUS), cliniques privées, cabinets de la Robertsau et de Schiltigheim. Bionettoyage." },
    ],
    challenges: [
      { title: "Sécurité renforcée des institutions européennes", description: "Travailler au Parlement européen ou au Conseil de l'Europe impose des habilitations agents (enquête de moralité), des accès badgés, des audits sécurité. Sans système qui mémorise qui peut accéder à quoi et qui valide chaque intervention, vous risquez de perdre votre référencement." },
      { title: "Multi-protocoles pharmaceutique GMP", description: "Les sites Lilly/Novartis exigent des protocoles GMP (bonnes pratiques de fabrication), agents formés salles blanches, traçabilité produits. Cohabite avec des copropriétés UNESCO et des bureaux tertiaires classiques. Mix exigeant." },
      { title: "Cross-border avec l'Allemagne (Kehl)", description: "Si vous opérez sur Strasbourg + Kehl/Offenburg, vous gérez deux réglementations sociales, deux conventions collectives, parfois deux devises affichées. Charge admin importante sans système qui sépare proprement les flux." },
      { title: "Contraintes patrimoniales UNESCO", description: "Les copropriétés de la Grande Île ont des matériaux historiques (colombages, pierre de taille, ferronnerie ancienne). Sans fiches site documentées avec protocoles spécifiques, le risque de dégradation est réel." },
    ],
    proprelyFit: [
      { title: "Habilitations agents tracées par site sensible", description: "Chaque agent a un profil avec ses habilitations (sécurité institutions européennes, GMP pharmaceutique, accès aéronautique). Le planning propose en priorité les agents qualifiés. Historique conservé pour les audits." },
      { title: "Fiches site avec protocoles GMP et UNESCO", description: "Site Lilly avec protocole GMP, copro Grande Île avec matériaux historiques : chaque site a sa fiche avec protocoles, produits agréés, agents habilités. Le savoir reste dans l'entreprise." },
      { title: "Multi-zones Strasbourg-Kehl-Schiltigheim", description: "Multi-sites illimités, vue par zone géographique, optimisation des tournées. Pour les opérations cross-border, séparation possible des plannings France/Allemagne." },
      { title: "Preuve de passage acceptée par institutions et industrie", description: "QR code, photos avant-après, signature. PV automatique envoyé au facility manager. Conforme aux exigences institutions européennes et industrie pharmaceutique." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Strasbourg ?", a: "Oui. Proprely supporte les spécificités strasbourgeoises : institutions européennes avec habilitations agents, pôle pharmaceutique GMP, centre UNESCO avec contraintes patrimoniales, cross-border avec l'Allemagne, et tertiaire/universitaire classique." },
      { q: "Mes agents strasbourgeois doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Pas d'installation, pas de formation. Fonctionne en 4G y compris dans les sous-sols du Parlement européen." },
      { q: "Combien coûte Proprely à Strasbourg et en Alsace ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public." },
      { q: "Proprely gère-t-il les habilitations agents pour les institutions européennes ?", a: "Oui. Chaque agent a un profil avec ses habilitations et son historique de formation. Le planning propose en priorité les agents qualifiés. Idéal pour les audits sécurité du Parlement européen ou du Conseil de l'Europe." },
      { q: "Proprely supporte-t-il les protocoles GMP pour Lilly et Novartis ?", a: "Oui. Fiches site avec protocoles GMP détaillés, produits agréés, agents formés salles blanches. Preuve de passage avec photos et signature. Conforme aux exigences de traçabilité des donneurs d'ordre pharmaceutiques." },
      { q: "Peut-on gérer des sites entre Strasbourg, Schiltigheim et Kehl en Allemagne ?", a: "Oui pour la partie planning et opérationnelle. Pour les particularités juridiques et sociales propres aux agents allemands (conventions collectives, charges, paie), nous recommandons un logiciel paie dédié allemand en parallèle." },
    ],
  },
  {
    slug: 'montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    population: '300 000 habitants, 500 000 dans la métropole',
    title: "Logiciel nettoyage Montpellier : cockpit Hérault",
    subtitle: "Conçu pour la réalité montpelliéraine : croissance démographique forte, pôle universitaire (1ère ville étudiante par habitant), tertiaire émergent (Port Marianne, Odysseum), tourisme méditerranéen, cabinets médicaux du Triangle. Centralisez clients, agents, plannings et devis.",
    tldr: "Pour gérer une société de nettoyage à Montpellier en 2026, Proprely propose un cockpit unique adapté à la croissance démographique forte, au pôle universitaire 1ère ville étudiante par habitant, au tertiaire émergent de Port Marianne et Odysseum, et aux cabinets médicaux du Triangle. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Montpellier et l'Hérault : planning, agents, devis, preuve de passage. Bêta gratuite.",
    keywords: ['logiciel nettoyage Montpellier', 'logiciel propreté Hérault', 'gestion société nettoyage Montpellier', 'planning agents nettoyage Montpellier'],
    marketIntro: "Montpellier est l'une des villes françaises en plus forte croissance démographique (+1,2 %/an), portée par l'attractivité universitaire et la qualité de vie méditerranéenne. La métropole concentre Port Marianne et Odysseum (quartiers tertiaires émergents), un pôle universitaire majeur (Université de Montpellier, plus ancienne faculté de médecine d'Europe), des cabinets médicaux du Triangle, une économie touristique côtière (Palavas-les-Flots, Carnon, La Grande-Motte à proximité), et un centre historique classé. Les sociétés de nettoyage montpelliéraines surfent sur cette croissance.",
    marketBullets: [
      "Croissance démographique +1,2 %/an : tertiaire en expansion, demande propreté tirée",
      "Port Marianne et Odysseum : quartiers tertiaires émergents, immeubles neufs",
      "Pôle universitaire majeur : Université de Montpellier (45 000 étudiants), résidences",
      "Pôle santé : CHU Lapeyronie, cabinets médicaux du Triangle et de Boutonnet",
      "Tourisme côtier proche : hôtels et résidences saisonnières Palavas/Carnon/La Grande-Motte",
      "Centre historique : copropriétés bourgeoises et hôtels particuliers, hôtellerie de charme",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux Port Marianne / Odysseum", description: "Immeubles tertiaires neufs, sièges régionaux, startups. Rotations 6h-9h, accueil propre exigé." },
      { icon: GraduationCap, type: "Universités et résidences étudiantes", description: "Université de Montpellier, écoles d'ingénieurs, résidences CROUS et privées. Plages hors temps universitaire, remise en état vacances." },
      { icon: Stethoscope, type: "Pôle santé montpelliérain", description: "CHU Lapeyronie, cliniques privées, cabinets médicaux du Triangle et de Boutonnet. Bionettoyage, traçabilité." },
      { icon: Home, type: "Copropriétés centre historique", description: "Écusson historique, halls en pierre, escaliers à rampe. Syndics avec exigence de reporting." },
      { icon: Hotel, type: "Hôtellerie touristique", description: "Hôtels de charme du centre, hôtels d'affaires Antigone, résidences côtières (Palavas, Carnon, La Grande-Motte)." },
      { icon: ShoppingBag, type: "Retail & galeries marchandes", description: "Polygone, Odysseum shopping. Avant ouverture 5h-9h, vitrerie et sols brillants." },
    ],
    challenges: [
      { title: "Croissance qui sature l'organisation", description: "Montpellier gagne du tertiaire chaque mois, la demande explose, mais piloter sur Excel/WhatsApp ne tient pas la cadence. Vous perdez en qualité au fur et à mesure que vous gagnez en volume." },
      { title: "Saisonnalité côtière proche", description: "Si vous opérez sur Palavas, Carnon ou La Grande-Motte en plus de Montpellier centre, vous gérez une saisonnalité explosive (mai-septembre). Sans planning flexible et agents saisonniers gérés comme des fixes, vous craquez." },
      { title: "Étalement géographique sur la métropole", description: "Vos sites peuvent être entre Montpellier centre, Lattes, Castelnau-le-Lez, et la côte. 15 à 30 km de transit par jour. Sans optimisation des tournées, vous perdez la rentabilité." },
      { title: "Pénurie de profils qualifiés", description: "Le marché du travail montpelliérain est tendu sur les profils techniques (bionettoyage, médical). Sans système qui capitalise sur les spécialités et la formation des agents, chaque départ vous coûte un trimestre de productivité." },
    ],
    proprelyFit: [
      { title: "Planning flexible saisonnalité côtière", description: "Agents saisonniers gérés comme des fixes (profils, spécialités, disponibilités historisées). Vue charge horaire mensuelle pour anticiper mai-septembre. Vous absorbez la haute saison sans craquer." },
      { title: "Fiches site avec spécialités médicales", description: "CHU Lapeyronie, cabinets médicaux du Triangle : chaque site a sa fiche avec protocoles, produits agréés, agents formés bionettoyage. Le savoir reste dans l'entreprise." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site. Moins de transit Montpellier-Lattes-côte, plus d'heures facturables." },
      { title: "Marge par client en temps réel", description: "Chaque heure facturée vs chaque heure réelle, par client et par site. Vous identifiez immédiatement les contrats à renégocier." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Montpellier ?", a: "Oui. Proprely supporte les spécificités montpelliéraines : croissance forte du tertiaire (Port Marianne, Odysseum), pôle médical CHU et cabinets, copropriétés du centre historique, saisonnalité côtière proche, et étalement géographique sur la métropole." },
      { q: "Mes agents montpelliérains doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Pas d'installation, pas de formation. Fonctionne en 4G y compris en zone côtière dégradée." },
      { q: "Combien coûte Proprely à Montpellier et dans l'Hérault ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public." },
      { q: "Comment Proprely gère-t-il la saisonnalité côtière ?", a: "Le planning gère les agents saisonniers comme des fixes. Vue charge horaire mensuelle pour anticiper les pics mai-septembre sur Palavas, Carnon, La Grande-Motte. Remplacements suggérés automatiquement." },
      { q: "Peut-on gérer des sites entre Montpellier, Lattes, Castelnau et la côte ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site." },
      { q: "Proprely supporte-t-il les exigences bionettoyage du CHU Lapeyronie ?", a: "Oui. Fiches site avec protocoles bionettoyage détaillés, agents formés et habilités, preuve de passage avec photos et signature. Conforme aux exigences hospitalières." },
    ],
  },
  {
    slug: 'rennes',
    city: 'Rennes',
    region: 'Bretagne',
    population: '220 000 habitants, 460 000 dans la métropole',
    title: "Logiciel nettoyage Rennes : cockpit Bretagne",
    subtitle: "Conçu pour la réalité rennaise : pôle tech français majeur (b<>com, Orange Labs, Technicolor), universités Rennes 1 et 2, copropriétés du centre médiéval, tissu agroalimentaire. Centralisez clients, agents, plannings et devis dans un seul outil.",
    tldr: "Pour gérer une société de nettoyage à Rennes en 2026, Proprely centralise plannings, agents et preuve de passage avec le contexte Bretagne en tête : pôle tech (b<>com, Orange Labs), universités Rennes 1 et 2, copropriétés du centre médiéval, tissu agroalimentaire exigeant HACCP. Bêta privée gratuite, conforme IDCC 3043.",
    metaDescription: "Logiciel de gestion pour société de nettoyage à Rennes et Bretagne : planning, agents, devis, preuve de passage. Cockpit B2B. Bêta gratuite.",
    keywords: ['logiciel nettoyage Rennes', 'logiciel propreté Bretagne', 'gestion société nettoyage Rennes', 'planning agents nettoyage Ille-et-Vilaine'],
    marketIntro: "Rennes est un pôle économique en forte croissance, capitale de la Bretagne et l'un des principaux pôles tech français : b<>com (Institut de Recherche Technologique sur le numérique), Orange Labs, Technicolor, et un écosystème de scaleups en pleine expansion. La métropole concentre également un pôle universitaire majeur (Rennes 1 et 2, plus de 70 000 étudiants), un centre historique médiéval avec ses maisons à pans de bois, un tissu agroalimentaire breton (Lactalis, Cooperl, Triballat à proximité), et une qualité de vie qui attire les entreprises.",
    marketBullets: [
      "Pôle tech majeur : b<>com, Orange Labs, Technicolor, scaleups (Klaxoon, Klaxit, Inseego)",
      "Universités Rennes 1 (sciences) et Rennes 2 (sciences humaines) : 70 000+ étudiants",
      "Centre historique médiéval : maisons à pans de bois, halls patrimoniaux",
      "Tissu agroalimentaire breton : Lactalis, Cooperl, Triballat et leurs sous-traitants",
      "CHU de Rennes : 5 000 lits, l'un des principaux CHU français",
      "Croissance économique forte, marché propreté tiré par tertiaire et tech",
    ],
    clientTypes: [
      { icon: Building2, type: "Bureaux tertiaires et tech", description: "Sièges b<>com, Orange Labs, Technicolor, scaleups. Espaces de coworking, accueil moderne. Rotations 6h-9h." },
      { icon: GraduationCap, type: "Universités et grandes écoles", description: "Rennes 1, Rennes 2, INSA, ENS, Sciences Po Rennes. Plages hors temps universitaire, vacances bloquées pour remise en état." },
      { icon: Stethoscope, type: "Pôle santé rennais", description: "CHU de Rennes, cliniques privées, cabinets médicaux. Bionettoyage, traçabilité produits, agents formés." },
      { icon: Home, type: "Copropriétés centre médiéval", description: "Place des Lices, rue de la Psallette, halls en pierre et bois. Syndics avec exigences patrimoniales et reporting standardisé." },
      { icon: Building, type: "Industrie agroalimentaire", description: "Sites de production Lactalis, Cooperl, Triballat, sous-traitants. Protocoles HACCP, agents formés, traçabilité ISO." },
      { icon: ShoppingBag, type: "Retail & rues commerçantes", description: "Rue Le Bastard, Place Sainte-Anne, Alma. Avant ouverture 5h-9h, vitrerie haute fréquence." },
    ],
    challenges: [
      { title: "Croissance tech qui tire la demande tertiaire", description: "Rennes gagne du tertiaire chaque mois (b<>com, Technicolor, scaleups), la demande propreté explose, mais piloter sur Excel et WhatsApp ne tient plus la cadence. Vous perdez en qualité au fur et à mesure que vous gagnez en volume." },
      { title: "Mix médiéval / moderne très contrasté", description: "Un bureau Technicolor n'a pas les mêmes exigences qu'une copropriété médiévale Place des Lices. Protocoles, fréquences, produits diffèrent. Sans fiches site documentées, le savoir-faire reste dans la tête des agents." },
      { title: "Sites agroalimentaires HACCP exigeants", description: "Travailler chez Lactalis ou Cooperl impose des protocoles HACCP stricts, agents formés, traçabilité. Sans système qui mémorise qui peut accéder à quoi et qui valide qu'une mission est faite selon le protocole, vous risquez de perdre votre référencement." },
      { title: "Étalement géographique sur la métropole", description: "Vos sites peuvent être entre Rennes centre, Chantepie, Cesson-Sévigné, Saint-Grégoire. 10 à 25 km de transit par jour. Sans optimisation des tournées, vous perdez la rentabilité." },
    ],
    proprelyFit: [
      { title: "Spécialités et habilitations tracées par agent", description: "Vitrerie, moquette, décapage, bionettoyage médical, HACCP industriel : chaque agent a son profil. Le planning propose en priorité les agents qualifiés." },
      { title: "Fiches site avec protocoles HACCP et patrimoniaux", description: "Site Lactalis avec HACCP, copro centre médiéval avec contraintes patrimoniales : chaque site a sa fiche avec protocoles, produits agréés, agents habilités." },
      { title: "Optimisation géographique des tournées", description: "Le système suggère les agents les plus proches du prochain site selon leur dernière intervention. Moins de transit Rennes-Cesson-Saint-Grégoire, plus d'heures facturables." },
      { title: "Preuve de passage acceptée par syndics et industriels", description: "QR code, photos avant-après, signature. PV automatique envoyé au facility manager ou au syndic. Conforme aux exigences industrielles agroalimentaires." },
    ],
    faq: [
      { q: "Proprely est-il adapté aux sociétés de nettoyage à Rennes ?", a: "Oui. Proprely supporte les spécificités rennaises : mix tertiaire tech (b<>com, Technicolor, scaleups) / médical CHU / universitaire / agroalimentaire HACCP, copropriétés du centre médiéval avec syndics nationaux, étalement géographique sur la métropole." },
      { q: "Mes agents rennais doivent-ils installer une application ?", a: "Non. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone. Pas d'installation, pas de formation. Fonctionne en 4G y compris dans les sites industriels de Cesson-Sévigné." },
      { q: "Combien coûte Proprely à Rennes et en Ille-et-Vilaine ?", a: "Gratuit pendant toute la durée de la bêta privée pour les 30 sociétés sélectionnées comme membres fondatrices. Tarif fondateur conservé à vie après le lancement public." },
      { q: "Proprely gère-t-il les protocoles HACCP pour Lactalis ou Cooperl ?", a: "Oui. Chaque site agroalimentaire a sa fiche avec protocoles HACCP, produits agréés, agents habilités. Preuve de passage avec photos et signature pour traçabilité. Historique conservé pour les audits clients." },
      { q: "Peut-on gérer des sites entre Rennes, Chantepie, Cesson-Sévigné et Saint-Grégoire ?", a: "Oui. Multi-sites illimités, vue par agent ou par zone géographique. Le planning suggère les agents les plus proches du prochain site selon leur dernière intervention." },
      { q: "Proprely supporte-t-il les exigences patrimoniales du centre médiéval ?", a: "Oui. Fiches site avec spécificités patrimoniales (bois, pierre, ferronnerie ancienne), produits agréés, protocoles documentés. Le savoir-faire est mémorisé une fois, suivi par tous les agents." },
    ],
  },
]

// Maillage interne ville → articles / fonctionnalités (séparé pour éviter
// d'alourdir les 11 objets ville et faciliter la mise à jour quand on ajoute
// des articles ou fonctionnalités).
const CITY_RELATIONS: Record<string, { blogs: string[]; features: string[] }> = {
  paris: {
    blogs: ['societe-nettoyage-paris', 'societe-nettoyage-ile-de-france', 'societe-nettoyage-la-defense-92'],
    features: ['planning-nettoyage', 'preuve-passage-nettoyage', 'gestion-agents-nettoyage', 'devis-nettoyage'],
  },
  lyon: {
    blogs: ['fixer-prix-nettoyage', 'fideliser-agents-nettoyage-turnover', 'rgpd-societe-nettoyage-2026'],
    features: ['planning-nettoyage', 'gestion-agents-nettoyage', 'preuve-passage-nettoyage', 'devis-nettoyage'],
  },
  marseille: {
    blogs: ['tarif-nettoyage-bureaux-m2-2026', 'gestion-societe-nettoyage-outils', 'fixer-prix-nettoyage'],
    features: ['planning-nettoyage', 'devis-nettoyage', 'preuve-passage-nettoyage'],
  },
  bordeaux: {
    blogs: ['societe-nettoyage-bordeaux', 'fixer-prix-nettoyage', 'calcul-heures-agents-nettoyage'],
    features: ['planning-nettoyage', 'gestion-agents-nettoyage', 'devis-nettoyage'],
  },
  toulouse: {
    blogs: ['digitaliser-entreprise-nettoyage-5-etapes', 'convention-collective-nettoyage-idcc-3043', 'logiciel-societe-nettoyage-criteres'],
    features: ['planning-nettoyage', 'preuve-passage-nettoyage', 'gestion-agents-nettoyage'],
  },
  nantes: {
    blogs: ['trouver-clients-b2b-nettoyage', 'logiciel-societe-nettoyage-criteres', 'tarif-nettoyage-bureaux-m2-2026'],
    features: ['planning-nettoyage', 'devis-nettoyage', 'gestion-agents-nettoyage'],
  },
  lille: {
    blogs: ['gestion-societe-nettoyage-outils', 'digitaliser-entreprise-nettoyage-5-etapes', 'fideliser-agents-nettoyage-turnover'],
    features: ['planning-nettoyage', 'preuve-passage-nettoyage', 'gestion-agents-nettoyage'],
  },
  nice: {
    blogs: ['tarif-nettoyage-bureaux-m2-2026', 'fideliser-agents-nettoyage-turnover', 'fixer-prix-nettoyage'],
    features: ['planning-nettoyage', 'gestion-agents-nettoyage', 'preuve-passage-nettoyage'],
  },
  strasbourg: {
    blogs: ['rgpd-societe-nettoyage-2026', 'convention-collective-nettoyage-idcc-3043', 'logiciel-societe-nettoyage-criteres'],
    features: ['preuve-passage-nettoyage', 'gestion-agents-nettoyage', 'planning-nettoyage'],
  },
  montpellier: {
    blogs: ['fideliser-agents-nettoyage-turnover', 'calcul-heures-agents-nettoyage', 'logiciel-societe-nettoyage-criteres'],
    features: ['planning-nettoyage', 'gestion-agents-nettoyage', 'devis-nettoyage'],
  },
  rennes: {
    blogs: ['trouver-clients-b2b-nettoyage', 'logiciel-societe-nettoyage-criteres', 'digitaliser-entreprise-nettoyage-5-etapes'],
    features: ['planning-nettoyage', 'devis-nettoyage', 'preuve-passage-nettoyage'],
  },
}

export function getCity(slug: string): CityPage | undefined {
  const city = cities.find((c) => c.slug === slug)
  if (!city) return undefined
  const rel = CITY_RELATIONS[slug]
  const geo = CITY_GEO[slug]
  const neighborhoods = CITY_NEIGHBORHOODS[slug]
  const pricing = CITY_PRICING[slug]
  return {
    ...city,
    relatedBlogSlugs: city.relatedBlogSlugs ?? rel?.blogs,
    relatedFeatureSlugs: city.relatedFeatureSlugs ?? rel?.features,
    geo: city.geo ?? (geo ? { latitude: geo.latitude, longitude: geo.longitude } : undefined),
    wikidata: city.wikidata ?? geo?.wikidata,
    department: city.department ?? geo?.department,
    neighborhoods: city.neighborhoods ?? neighborhoods,
    marketPricing: city.marketPricing ?? pricing,
  }
}

export function getCityRelations(slug: string): { blogs: string[]; features: string[] } | undefined {
  return CITY_RELATIONS[slug]
}
