# Audit SEO Proprely.fr

> Audit technique, contenu, conversion & GEO du repository `proprely0`
> Réalisé le **29 mai 2026** · Stack : Vite + React 19 + TypeScript + Tailwind, prerendering statique, hébergement Apache/Hostinger
> Périmètre : analyse du code source (aucune modification — audit en lecture seule)

---

## 1. Résumé exécutif

**Proprely.fr est, sur le plan technique, dans le top 10 % des sites SaaS B2B français que l'on peut auditer.** La majorité des « quick wins » classiques d'un audit SEO sont **déjà implémentés et de bonne qualité** :

- ✅ **Prerendering statique par route** (`scripts/prerender.mts`, 1724 lignes) : chaque URL est générée en HTML statique avec `<title>`, meta description, canonical, Open Graph, Twitter, JSON-LD spécifiques et contenu textuel complet. C'est la pierre angulaire d'un SPA bien référencé.
- ✅ **Schema.org très complet** : `Organization`, `ProfessionalService`, `SoftwareApplication`, `WebSite`, `FAQPage`, `BlogPosting`, `HowTo`, `BreadcrumbList`, `WebPage`, `AboutPage`, `CollectionPage`, `ItemList`.
- ✅ **robots.txt pro-GEO** : tous les crawlers IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot…) sont explicitement autorisés.
- ✅ **`llms.txt` exceptionnel** (162 lignes) : index sémantique + FAQ extraite pour les moteurs génératifs. Rare et excellent.
- ✅ **Structure Hn correcte** : 1 seul `<h1>` par page (via `<motion.h1>`), hiérarchie H2/H3 propre, breadcrumbs visibles + schéma.
- ✅ **Maillage interne sitewide** via le `Footer` (toutes les pages + 11 villes) avec de vraies balises `<a href>`.
- ✅ **Contenu profond et unique** : 22 articles de blog (1 500–2 500 mots, FAQ + HowTo + TL;DR), 4 pages fonctionnalités, 11 pages villes, 3 comparatifs concurrents, 5 ressources, 4 calculateurs.
- ✅ **Performance soignée** : routes lazy-loaded, code-splitting (`framer-motion`/`icons`/`react`/`vendor`), GA4 chargé en `requestIdleCallback`, polices préchargées en async, headers de cache + GZIP + ETag (`.htaccess`), images légères.

**Conclusion : il n'y a pas d'erreur SEO bloquante.** Le site est indexable, complet et bien structuré. Le travail à faire n'est donc **pas de la correction d'urgence mais de l'optimisation à fort levier et de la croissance** :

| Axe | État | Priorité |
|---|---|---|
| Indexation / technique de base | 🟢 Excellent | Maintenir |
| Métadonnées & schémas | 🟢 Très bon | Affiner |
| Contenu & profondeur sémantique | 🟢 Bon | Étendre |
| **Conversion (preuves visuelles & sociales)** | 🔴 **Faible** | **Haute** |
| **Conformité RGPD analytics (CNIL)** | 🟠 **À risque** | **Haute** |
| **Signaux de fraîcheur (`lastmod`)** | 🟠 À corriger | Moyenne |
| **Autorité / netlinking (off-page)** | 🔴 Inexistant (domaine neuf) | Haute (hors repo) |
| Couverture programmatique | 🟠 Mince vs potentiel | Moyenne |

Les **3 leviers les plus rentables** dans l'ordre :
1. **Ajouter des visuels produit + preuves sociales** (le site n'a littéralement **aucune balise `<img>`** → aucun screenshot du cockpit, aucun témoignage client → frein de conversion majeur et trafic Google Images = 0).
2. **Gating du consentement GA4** (le site vend de la conformité RGPD mais charge Google Analytics sans consentement → risque CNIL + incohérence de marque).
3. **Stratégie d'autorité** : le domaine est neuf, sans backlinks. C'est le vrai plafond de verre pour le ranking — à traiter hors repo (annuaires SaaS FR, fédérations propreté, Product Hunt, RP).

---

## 2. État actuel du SEO

### 2.1 Architecture technique

| Élément | Implémentation | Verdict |
|---|---|---|
| Framework | Vite 8 + React 19 + TS + Tailwind 3 | 🟢 Moderne |
| Routing | Routeur custom (`src/lib/useRoute.ts`, `pathname`) | 🟢 OK (URLs propres) |
| Rendu pour crawlers | Prerendering statique (`prerender.mts`) → 1 `index.html`/route | 🟢 Solide |
| Hébergement | Apache/Hostinger, `.htaccess` (HTTPS forcé, vrais 404, cache, ETag) | 🟢 Bien configuré |
| URLs | `/fonctionnalites/planning-nettoyage`, `/villes/paris`, `/blog/...` — lisibles, en français, sans paramètre | 🟢 Excellent |
| Build SEO | `build` enchaîne `generate-sitemap` + `generate-rss` + `vite build` + `prerender` | 🟢 Pipeline propre |
| IndexNow | `scripts/submit-indexnow.mjs` (`seo:indexnow`) | 🟢 Bonus |

### 2.2 Inventaire des pages (≈ 65 URLs prérendues)

- **Pages business / produit** : `/`, `/logiciel-societe-nettoyage` (guide pilier), `/fonctionnalites` + 4 sous-pages, `/crm-entreprise-proprete`, `/logiciel-auto-entrepreneur-nettoyage`, `/tarifs`, `/beta`.
- **Comparatifs** : `/comparatif-logiciel-nettoyage`, `/proprely-vs-excel`, `/comparatif/proprely-vs-organilog|progiclean|propret`.
- **Local (GEO)** : `/villes` + 11 villes (Paris…Rennes) + articles villes dédiés.
- **Outils / lead-gen** : `/outils`, `/calculateur-prix-nettoyage-m2`, `/calculateur-roi`, `/simulateur-rentabilite`, `/ressources` + 5 ressources.
- **Éditorial** : `/blog` + 22 articles.
- **Confiance / légal** : `/a-propos`, `/contact`, `/mentions-legales`, `/confidentialite`, `/cgu`.

### 2.3 Ce qui est déjà très bien fait (à NE PAS « corriger »)

- Un seul `<h1>` par page, hiérarchie propre (vérifié sur l'ensemble des `src/pages/*` et `src/sections/*`).
- Canonical par page (prerender + mise à jour client dans `src/App.tsx`).
- Open Graph + Twitter Card complets (`og:image:width/height`, `og:locale`, `og:site_name`).
- Sitemap avec namespace `image:image`, RSS, manifest PWA, favicons multi-formats.
- `hreflang` `fr` + `x-default` (site mono-langue → correct).
- Breadcrumbs visibles **et** `BreadcrumbList` schema sur les sous-pages.
- Page `/beta/merci` en `noindex` + exclue du sitemap.

---

## 3. Problèmes critiques détectés

> Aucun problème **bloquant l'indexation**. Les points ci-dessous sont des **freins business/conformité** ou des **dettes de qualité** à fort impact.

### 🔴 C1 — Zéro visuel produit & zéro preuve sociale
- **Constat** : `grep "<img"` sur tout `src/` = **0 résultat**. Aucun screenshot du cockpit, aucune capture de planning/devis/preuve de passage. Aucun logo client, aucun témoignage nommé, aucune métrique client réelle (la section `Credibilite.tsx` ne contient que des arguments de positionnement, pas de preuves).
- **Impact** : (1) conversion SEO faible — un dirigeant qui cherche un logiciel veut **voir** l'outil ; (2) trafic Google Images = 0 ; (3) signaux multimodaux GEO absents ; (4) E-E-A-T affaibli (pas de preuve d'usage réel).
- **Nuance** : la rareté des preuves clients est normale en bêta privée (4/30 places prises) — mais les **screenshots produit** n'ont aucune excuse et sont prioritaires.

### 🟠 C2 — Google Analytics 4 chargé sans consentement (risque CNIL/RGPD)
- **Constat** : `src/lib/analytics.ts` → `initAnalytics()` déclenche `loadGAScript()` via `requestIdleCallback` **sans vérifier le consentement**. Les fonctions `getConsent()/setConsent()` existent mais ne gatent pas le chargement de GA4.
- **Impact** : risque de mise en demeure CNIL (GA4 n'est pas un traceur exempté), et **incohérence de marque majeure** pour un produit qui vend la conformité RGPD comme argument central.
- **Action** : ne charger GA4 qu'après consentement explicite (mode « Consent Mode v2 » ou blocage total tant que `getConsent() !== 'granted'`).

### 🟠 C3 — `lastmod` du sitemap = date de build pour ~50 URLs
- **Constat** : dans `scripts/generate-sitemap.mjs`, toutes les pages hors blog reçoivent `lastmod: today`. Le sitemap committé montre 50 URLs sur la même date. À chaque build, toutes ces dates « sautent » à aujourd'hui.
- **Impact** : Google apprend que le `lastmod` n'est pas fiable et finit par l'ignorer → perte d'un signal de fraîcheur utile pour le re-crawl.
- **Action** : `lastmod` doit refléter la **vraie** date de dernière modification du contenu (map par page, comme déjà fait pour le blog via `POST_DATE_MODIFIED`).

---

## 4. Quick wins prioritaires

| Priorité | Quick Win | Impact SEO | Difficulté | Fichier concerné | Pourquoi c'est important | Action recommandée |
|---|---|---|---|---|---|---|
| 🔴 P0 | Gater GA4 derrière le consentement | Moyen (légal/marque) | Faible | `src/lib/analytics.ts`, `src/components/CookieBanner.tsx` | Conformité CNIL + cohérence avec le positionnement RGPD | Ne charger `loadGAScript()` que si `getConsent()==='granted'`; sinon attendre l'action du bandeau |
| 🔴 P0 | Ajouter 4–8 screenshots produit (planning, devis, preuve de passage, pilotage) | Élevé (conversion + Images + GEO) | Moyenne | `Hero.tsx`, `FeaturePage.tsx`, `SoftwareLanding.tsx`, sitemap image | Voir l'outil = lever d'objection n°1 en SaaS | Exporter des captures (ou mockups) en WebP, `<img>` avec `alt` riche en mots-clés, `loading="lazy"`, `width/height` |
| 🔴 P0 | `lastmod` réel par page dans le sitemap | Moyen | Faible | `scripts/generate-sitemap.mjs` | Préserver la confiance de Google dans le signal de fraîcheur | Map `PAGE_LASTMOD` par URL, fallback date de création (pas `today`) |
| 🟠 P1 | OG images par template de page | Moyen (CTR social/SERP) | Moyenne | `scripts/generate-assets.mjs` (pipeline resvg déjà présent) | 1 seule image partagée pour 65 URLs → CTR social faible | Générer une OG par type (feature/ville/comparatif/article) avec titre dynamique |
| 🟠 P1 | Raccourcir les `<title>` > 60 car. | Faible-moyen | Faible | `src/App.tsx`, `src/data/comparisons.ts`, prerender | Ex. `/comparatif-logiciel-nettoyage` (~88 car.) tronqué en SERP | Cibler 50–60 caractères, mot-clé en tête |
| 🟠 P1 | Auteur nommé (E-E-A-T) sur les articles | Moyen (confiance + GEO) | Moyenne | `src/data/blog.ts`, `prerender.mts` (`blogPostingSchema`) | `author` = `Organization` générique aujourd'hui | Ajouter un `Person` auteur + courte bio + page auteur |
| 🟠 P1 | Liens SEO dans le header (menu Produit/Ressources/Comparatifs) | Moyen (profondeur de crawl + UX) | Moyenne | `src/sections/Navbar.tsx`, `src/components/PageNav.tsx` | Le header n'expose **aucun** lien vers les pages SEO (tout repose sur le footer) | Menu desktop avec liens réels vers `/fonctionnalites`, `/comparatif-logiciel-nettoyage`, `/villes`, `/blog`, `/tarifs` |
| 🟠 P1 | Titre dynamique sur navigation SPA des routes dynamiques | Faible | Faible | `src/App.tsx` (objet `META`) | blog/feature/ville/comparatif ne mettent pas à jour le `<title>` en navigation client (OK au chargement direct via prerender, KO en SPA → analytics/partage) | Résoudre les meta depuis les data files pour les routes `startsWith` |
| 🟢 P2 | Ajouter `inLanguage`, `wordCount`, `Person` dans `BlogPosting` | Faible | Faible | `prerender.mts` | Enrichir la compréhension LLM/Google | Compléter le schéma article |
| 🟢 P2 | Bloc « Réponse-flash / TL;DR » **visible** en haut des articles | Moyen (featured snippets + GEO) | Faible | `BlogPost.tsx` | Le `tldr` existe en données mais doit être bien visible (40–55 mots) | Encadré en tête d'article + `speakable` schema |
| 🟢 P2 | Nettoyer les assets morts | Nul (hygiène) | Triviale | `src/assets/hero.png`, `react.svg`, `vite.svg` | `hero.png` n'est référencé nulle part ; restes du template Vite | Supprimer |
| 🟢 P2 | Cohérence `/beta/merci` | Nul | Triviale | `public/robots.txt` | `Disallow` **+** `noindex` : le disallow empêche Google de voir le noindex | Garder le `noindex,follow` seul **ou** le disallow seul |

---

## 5. Audit technique détaillé

### 5.1 Indexation
- **Indexabilité** : 🟢 toutes les pages importantes sont prérendues et indexables. `/beta/merci` correctement en `noindex`.
- **robots.txt** : 🟢 excellent, ouvert aux crawlers classiques et IA. *Micro-point* : `Disallow: /beta/merci` redondant avec le `noindex` (cf. P2).
- **Sitemap** : 🟢 généré dynamiquement, 65 URLs, namespace image. ⚠️ `lastmod` à fiabiliser (C3). *Détail* : le message de log dit « 16 core » alors qu'il y a 18 URLs core — incohérence cosmétique.
- **Canonical** : 🟢 par page, cohérent entre prerender et rendu client.
- **Routes dynamiques** : 🟢 bien gérées par `.htaccess` (dossiers prérendus servis, vrais 404 sinon). ⚠️ titres non mis à jour en navigation SPA (P1, impact faible car le chargement direct sert le bon HTML).

### 5.2 Métadonnées
- **Titles/descriptions** : 🟢 uniques par page, orientés intention (« logiciel société de nettoyage », « par ville », « comparatif »). ⚠️ quelques titres > 60 car. (tronqués en SERP).
- **Open Graph / Twitter** : 🟢 complets. ⚠️ image OG **unique** pour tout le site (P1).
- **Doublons** : 🟢 aucun doublon de title/description détecté ; `META` (App.tsx) et prerender alignés.

### 5.3 Structure sémantique
- 🟢 1 `<h1>` par page, hiérarchie H2/H3 logique, mots-clés métier présents (planning, devis, preuve de passage, IDCC 3043, marge par client).
- 🟢 Contenu lisible pour Google **et** pour les LLM (FAQ, TL;DR, HowTo structurés).
- ⚠️ **Architecture de rendu à surveiller** : le contenu prérendu est injecté dans un `<div class="seo-fallback">` **hors écran** (`left:-10000px`, `aria-hidden`), puis React **remplace** (ne *hydrate* pas) `#root`. Cela fonctionne (le site s'indexe), mais : (1) texte hors écran = signal légèrement discounté tant que Google n'a pas rendu le JS ; (2) **risque de dérive** entre le HTML prérendu et l'arbre React (deux représentations maintenues à la main). *Recommandation moyen terme* : évaluer un vrai SSG avec hydratation (cohérence garantie, plus de contenu hors écran).

### 5.4 Performance / Core Web Vitals
- 🟢 Routes `lazy()` + `Suspense`, code-splitting manuel, GA4 en idle, polices en `preload`+async, headers cache/immutable + GZIP + ETag.
- 🟢 Pas d'image lourde (LCP probablement porté par le H1 texte → favorable).
- 🟠 **`framer-motion` sur quasiment toutes les pages et sections** : dépendance JS lourde (animations au scroll `whileInView`). Sur mobile bas de gamme, risque sur **INP** et coût de parsing JS. Envisager : limiter les animations aux sections above-the-fold, ou alléger via CSS pour les pages de contenu.
- 🟠 **Google Fonts externes** (Inter, 5 graisses) : bien chargées en async, mais 2 connexions externes + dépendance tierce. *Option* : auto-héberger Inter (woff2 subset) pour supprimer le render-blocking résiduel et 1 RTT.
- ✅ Recommandation : faire tourner Lighthouse/PageSpeed sur `/`, `/logiciel-societe-nettoyage`, `/villes/paris` et un article pour chiffrer LCP/INP/CLS réels.

### 5.5 Maillage interne
- 🟢 `Footer` présent sur **toutes** les pages → hub de liens sitewide (produit, ressources, comparatifs, blog, 11 villes, légal).
- 🟢 Liens in-content : articles liés, fonctionnalités liées sur pages villes, etc.
- 🟠 **Header sans liens SEO** : `Navbar.tsx` (home) = ancres `scrollTo` + CTA ; `PageNav.tsx` (sous-pages) = retour accueil + CTA. La navigation primaire **n'expose pas** l'arborescence SEO (P1).
- 🟠 **Pages potentiellement sous-maillées** : les pages villes pointent vers features/articles, mais le maillage **villes ↔ villes** et **comparatifs ↔ articles comparatifs** peut être densifié (cocon).

### 5.6 Accessibilité impactant le SEO
- 🟢 `lang="fr"`, structure Hn correcte, breadcrumbs.
- ⚠️ Quand des `<img>` seront ajoutées (C1), imposer des `alt` descriptifs riches en mots-clés.

---

## 6. Audit contenu & conversion

### 6.1 Proposition de valeur — 🟢 claire
« Le cockpit métier des sociétés de nettoyage B2B » : message net, problème (dispersion 7 outils, 6–10 h/sem perdues) et solution (7 modules, 1 écran) bien articulés. Vocabulaire 100 % métier (IDCC 3043, preuve de passage, marge par client).

### 6.2 Adéquation ICP — 🟢 forte
Le site parle précisément aux dirigeants/responsables d'exploitation de sociétés de propreté B2B (3–50 agents, multi-sites). Personas, cas d'usage par secteur (syndic, hôtel, médical) bien traités dans les données.

### 6.3 Mots-clés business — 🟢 visibles
« logiciel société de nettoyage », « planning agents nettoyage », « devis nettoyage », « comparatif logiciel nettoyage », déclinaisons villes. Bonne couverture intentionnelle.

### 6.4 CTA — 🟢 clairs
CTA « Rejoindre la bêta / Candidater » omniprésents, redirigés vers le formulaire Fillout externe. Sticky mobile.

### 6.5 Confiance — 🟠 partielle
- 🟢 Mentions RGPD, hébergement européen, éditeur identifié (Pershing Global Solutions LTD), page À propos, légal complet.
- 🔴 **Manque de preuves** : aucun screenshot produit, aucun témoignage/logo client, aucune métrique réelle. Pour un site dont l'argument est « conçu **avec** des dirigeants », l'absence de toute citation/visage/logo affaiblit la crédibilité.
- 🟠 **Incohérence RGPD** : GA4 sans consentement (C2) contredit le discours de conformité.

### 6.6 Ce qui manque pour transformer le trafic SEO en leads
| Élément | Présent ? | Recommandation |
|---|---|---|
| Screenshots / démo visuelle | ❌ | **Prioritaire** — galerie produit + GIF/vidéo courte |
| Témoignages / logos clients | ❌ (normal en bêta) | À intégrer dès les 1ers fondateurs (citations + secteur + ville) |
| Pricing | 🟢 `/tarifs` (gratuit bêta + fondateur à vie) | OK |
| FAQ | 🟢 riche (home + par page) | OK |
| Démo / vidéo | ❌ | Ajouter une vidéo de 60–90 s du cockpit |
| Lead magnets | 🟢 ressources Excel + calculateurs + newsletter | 🟢 Très bon |
| Pages métier/secteur | ❌ | Cf. §9 (syndics, hôtellerie, médical, industriel) |

---

## 7. Recommandations schema.org

| Schéma | État actuel | Recommandation |
|---|---|---|
| `Organization` | 🟢 Complet (home, `@id`) | RAS |
| `SoftwareApplication` | 🟢 Présent | Ajouter `aggregateRating`/`review` **dès** qu'il y a des avis réels (pas avant — pas de faux avis) |
| `WebSite` | 🟢 Présent | Ajouter `potentialAction` `SearchAction` si une recherche interne est ajoutée |
| `BreadcrumbList` | 🟢 Sur sous-pages | RAS |
| `FAQPage` | 🟢 Home + pages | RAS (excellent pour GEO) |
| `BlogPosting` | 🟢 Présent | **Enrichir** : `author` `Person` (E-E-A-T), `wordCount`, `keywords`, `articleSection` ✓ déjà |
| `ProfessionalService` | 🟢 Home + villes | RAS |
| `HowTo` | 🟢 Features + articles | RAS |
| `Product`/`Offer` | 🟠 `Offer` dans `SoftwareApplication` | OK tant que pas de prix public (bêta) |
| `LocalBusiness` | ❌ | **Ne pas ajouter** : Proprely est un SaaS national, pas un commerce local. Les pages villes ciblent la zone desservie via `ProfessionalService` + `areaServed` (déjà fait correctement). |
| `VideoObject` | ❌ | À ajouter avec la future vidéo démo |
| `ImageObject` | 🟠 Logo only | À étendre aux screenshots produit |
| `Person` (auteur) | ❌ | **À ajouter** (E-E-A-T + GEO) |
| `speakable` | ❌ | Ajouter sur TL;DR/FAQ (lecture vocale, GEO) |

---

## 8. Plan d'action priorisé

### Niveau 1 — À corriger immédiatement (cette semaine)
1. **Gater GA4 derrière le consentement** (C2) — `analytics.ts` + `CookieBanner`.
2. **`lastmod` réel par page** (C3) — `generate-sitemap.mjs`.
3. **Raccourcir les titres > 60 caractères** (P1) — `App.tsx`, `comparisons.ts`.
4. **Corriger la redondance `/beta/merci`** et le log « 16 core » (hygiène).

### Niveau 2 — Quick wins à fort impact (2–4 semaines)
5. **Screenshots produit + `alt`** sur Hero, features, software landing (C1) — déclencheur de conversion n°1.
6. **OG images par template** via le pipeline `resvg` existant.
7. **Liens SEO dans le header** (menu Produit/Ressources/Comparatifs/Villes).
8. **Auteur nommé + `Person` schema + page auteur** (E-E-A-T).
9. **TL;DR visible** en tête d'article + `speakable`.
10. **Titre dynamique en navigation SPA** pour les routes dynamiques.

### Niveau 3 — Stratégie moyen terme (1–3 mois)
11. **Étendre la couverture programmatique** (cf. §9) : pages secteur, nouvelles fonctionnalités, nouveaux comparatifs, villes tier-2, glossaire.
12. **Construire les cocons sémantiques** (tarification, RH/agents, conformité, acquisition, digitalisation) avec maillage dense.
13. **Alléger `framer-motion`** sur les pages de contenu + envisager l'auto-hébergement des polices.
14. **Évaluer un vrai SSG avec hydratation** (robustesse vs le pattern « div hors écran + remplacement »).
15. **Autorité / off-page (hors repo, mais déterminant)** : annuaires SaaS FR (Appvizer, Capterra/GetApp FR), Product Hunt, fédérations propreté (FEP, Monde de la Propreté), articles invités, RP de lancement, Google Business Profile pour l'entité éditrice. **C'est le principal plafond de croissance d'un domaine neuf.**
16. **Mesurer** : connecter Search Console (la balise `google-site-verification` est présente), suivre couverture d'indexation, requêtes, CTR, et brancher des conversions GA4 (post-consentement).

---

## 9. Pages SEO à créer

> Le socle est là (guide pilier, comparatifs, villes, blog). L'objectif est d'**élargir la surface intentionnelle** et de **couvrir les requêtes problème/secteur** non encore adressées.

### 9.1 Pages business
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Logiciel de facturation nettoyage | `/fonctionnalites/facturation-nettoyage` | logiciel facturation nettoyage | Transactionnelle | Haute | Capter la recherche facturation, compléter les 4 features |
| Logiciel pointage / suivi des heures | `/fonctionnalites/pointage-heures-nettoyage` | logiciel pointage agents nettoyage | Transactionnelle | Haute | Requête à fort volume RH |
| Gestion documents & conformité | `/fonctionnalites/gestion-documents-nettoyage` | gestion documents société nettoyage | Transactionnelle | Moyenne | Valoriser le module GED/conformité |
| Application mobile agents | `/application-mobile-nettoyage` | application mobile agents nettoyage | Transactionnelle | Moyenne | Argument mobile-first |

### 9.2 Pages métier / secteur (cocon « par type de client »)
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Logiciel nettoyage pour syndics/copropriétés | `/secteurs/nettoyage-syndic-copropriete` | logiciel nettoyage copropriété | Commerciale | Haute | Segment à forte récurrence |
| Logiciel nettoyage hôtellerie | `/secteurs/nettoyage-hotellerie` | logiciel propreté hôtellerie | Commerciale | Haute | Segment saisonnier/haut de gamme |
| Logiciel nettoyage médical / bionettoyage | `/secteurs/nettoyage-medical-bionettoyage` | logiciel bionettoyage médical | Commerciale | Haute | Segment premium, marge élevée |
| Logiciel nettoyage industriel / tertiaire | `/secteurs/nettoyage-industriel-tertiaire` | logiciel nettoyage industriel | Commerciale | Moyenne | Multi-sites |

### 9.3 Pages problèmes (intention informationnelle haute du funnel)
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Arrêter de gérer le nettoyage sur Excel/WhatsApp | `/blog/arreter-excel-whatsapp-nettoyage` | gérer société nettoyage sans excel | Informationnelle | Haute | Capter la douleur, rediriger vers `/proprely-vs-excel` |
| Comment calculer la rentabilité d'un contrat | `/blog/rentabilite-contrat-nettoyage` | calcul rentabilité contrat nettoyage | Informationnelle | Haute | Lier au simulateur |
| Réussir un appel d'offres nettoyage | `/blog/appel-offres-nettoyage-gagner` | gagner appel d'offres nettoyage | Informationnelle | Moyenne | Acquisition B2B |
| Réduire l'absentéisme des agents | `/blog/absenteisme-agents-nettoyage` | réduire absentéisme nettoyage | Informationnelle | Moyenne | Complète le contenu RH |

### 9.4 Pages comparatives
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Proprely vs Nettoyeur/Bionet (autres ERP) | `/comparatif/proprely-vs-[concurrent]` | alternative [concurrent] | Commerciale | Moyenne | Étendre le cocon comparatif |
| Meilleurs logiciels nettoyage 2026 (top liste) | `/blog/meilleurs-logiciels-nettoyage-2026` | meilleur logiciel société nettoyage | Commerciale | Haute | Requête « best of » à fort CTR |
| Alternative à Excel pour le nettoyage | `/alternative-excel-nettoyage` | alternative excel nettoyage | Commerciale | Moyenne | Variante de `/proprely-vs-excel` |

### 9.5 Pages locales (extension GEO tier-2)
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Villes tier-2 (Grenoble, Nancy, Reims, Tours, Angers, Dijon…) | `/villes/[ville]` | logiciel nettoyage [ville] | Commerciale locale | Moyenne | Réplique du template villes existant (ROI élevé, faible coût) |

### 9.6 Articles SEO (longue traîne)
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Grille de salaire propreté 2026 (IDCC 3043) | `/blog/grille-salaire-proprete-2026` | grille salaire nettoyage 2026 | Informationnelle | Haute | Requête saisonnière à fort volume |
| Modèle de cahier des charges nettoyage | `/blog/cahier-des-charges-nettoyage-modele` | cahier des charges nettoyage | Informationnelle | Moyenne | Lead magnet associé |
| Checklist contrôle qualité nettoyage | `/blog/controle-qualite-nettoyage-checklist` | contrôle qualité nettoyage | Informationnelle | Moyenne | Lien vers preuve de passage |

### 9.7 Pages GEO / LLM optimization
| Page à créer | URL recommandée | Mot-clé principal | Intention | Priorité | Objectif business |
|---|---|---|---|---|---|
| Glossaire / lexique de la propreté B2B | `/lexique-nettoyage` | définition [terme] nettoyage | Informationnelle | Haute | Hub de définitions = très cité par les LLM, maillage interne massif |
| Page « statistiques du secteur propreté » | `/statistiques-secteur-proprete` | chiffres secteur propreté France | Informationnelle | Moyenne | Contenu « citable » (data) pour GEO + backlinks |
| `llms-full.txt` (dump complet du contenu) | `/llms-full.txt` | — | GEO | Moyenne | Complète l'excellent `llms.txt` existant |

---

## 10. Checklist d'implémentation pour Claude Code

> Étapes concrètes, fichier par fichier. À traiter dans l'ordre des niveaux du §8.

**Niveau 1 (cette semaine)**
- [ ] `src/lib/analytics.ts` : conditionner `loadGAScript()` à `getConsent()==='granted'` ; relancer après clic « Accepter » dans `CookieBanner.tsx`.
- [ ] `scripts/generate-sitemap.mjs` : introduire une map `PAGE_LASTMOD` (URL → date réelle) ; supprimer `lastmod: today` par défaut ; corriger le message de log « 16 core ».
- [ ] `src/App.tsx` + `src/data/comparisons.ts` : raccourcir les `<title>` > 60 car. (notamment `/comparatif-logiciel-nettoyage`).
- [ ] `public/robots.txt` : retirer `Disallow: /beta/merci` (le `noindex,follow` suffit) **ou** assumer le disallow seul.

**Niveau 2 (2–4 semaines)**
- [ ] Ajouter des `<img>` (WebP, `alt`, `width/height`, `loading="lazy"`) : `Hero.tsx`, `FeaturePage.tsx`, `SoftwareLanding.tsx`, `CRMPage.tsx`. Mettre à jour le `bodyHtml` prérendu correspondant dans `prerender.mts` (les crawlers non-JS doivent voir l'`<img alt>`). Ajouter les images au sitemap image.
- [ ] `scripts/generate-assets.mjs` : générer une OG par template (feature/ville/comparatif/article) avec titre dynamique ; brancher dans `buildHtml()` (`prerender.mts`) via un paramètre `ogImage`.
- [ ] `src/sections/Navbar.tsx` & `src/components/PageNav.tsx` : ajouter un menu avec liens réels (`<Link>`) vers `/fonctionnalites`, `/comparatif-logiciel-nettoyage`, `/villes`, `/blog`, `/tarifs`.
- [ ] `src/data/blog.ts` : champ `author` (Person) ; `prerender.mts` `blogPostingSchema()` : émettre `author: {@type:'Person', name, url}` + créer une page auteur.
- [ ] `src/pages/BlogPost.tsx` : encadré TL;DR visible en tête + `speakable` dans le schéma.
- [ ] `src/App.tsx` : résoudre `title/description` pour les routes dynamiques (`/blog/`, `/fonctionnalites/`, `/villes/`, `/comparatif/`, `/ressources/`) depuis les data files.

**Niveau 3 (1–3 mois)**
- [ ] Créer les data + entrées de routing + blocs prerender pour les pages du §9 (réutiliser les templates `FeaturePage`/`CityPage`/`ComparisonPage`).
- [ ] Construire `/lexique-nettoyage` (hub GEO) + `/statistiques-secteur-proprete` + `llms-full.txt`.
- [ ] Auditer `framer-motion` page par page (contenu vs marketing) ; envisager l'auto-hébergement d'Inter.
- [ ] Étudier une migration SSG avec hydratation pour supprimer le pattern « div hors écran ».
- [ ] Nettoyer les assets morts (`src/assets/hero.png`, `react.svg`, `vite.svg`).

**Toujours après chaque lot**
- [ ] `npm run build` (régénère sitemap + RSS + prerender) puis vérifier le HTML statique dans `dist/<route>/index.html`.
- [ ] Re-soumettre via `npm run seo:indexnow` et vérifier Search Console.
- [ ] Lighthouse mobile sur `/`, une page feature, une page ville, un article.

---

## 11. Prochaine étape recommandée

**Commencer par les 3 items de Niveau 1 + les screenshots produit (C1).** Ce sont les actions au meilleur rapport impact/effort :

1. **Screenshots produit** (impact conversion immédiat, débloque aussi Google Images et le GEO multimodal).
2. **Consentement GA4** (supprime un risque légal et une incohérence de marque).
3. **`lastmod` fiabilisé** (protège un signal de fraîcheur pour le re-crawl des ~60 pages programmatiques).

> **Recommandation de méthode** : traiter ces 3–4 quick wins dans **une première PR courte et vérifiable**, mesurer l'effet sur l'indexation et la conversion via Search Console + GA4, puis enchaîner sur l'extension programmatique (§9) qui constitue le vrai moteur de croissance organique à moyen terme.
>
> **Rappel stratégique** : techniquement, le site n'a quasiment plus de dette. Le facteur limitant n°1 du ranking d'ici 3–6 mois sera **l'autorité du domaine (netlinking)** — un chantier off-page à lancer **en parallèle** des optimisations on-site décrites ici.

---

*Audit réalisé en lecture seule sur le repository — aucune modification de code applicatif. Les recommandations sont prêtes à être implémentées sur demande.*
