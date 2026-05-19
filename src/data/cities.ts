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
]

export function getCity(slug: string): CityPage | undefined {
  return cities.find((c) => c.slug === slug)
}
