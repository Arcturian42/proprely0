# 🎯 AUDIT STRATÉGIQUE COMPLET — Proprely.fr (juin 2026)

**Site audité** : https://proprely.fr
**Concurrents analysés** : Propret.fr · Organilog · Progiclean · Maglia.io
**Objectif business** : leads qualifiés × conversion × visibilité Google + IA
**Cible** : équipes Produit · Marketing · SEO · Design · Dev · Sales
**Périmètre** : 96 URLs sitemap, 100 pages prerendues, ~33 articles blog

---

## 📋 SYNTHÈSE EXÉCUTIVE — Les 5 verdicts clés

| Dimension | Note /10 | Verdict |
|---|---|---|
| **SEO technique** | 8 | Très solide post-vagues 1-7 : canonical, mega-menu nav SEO, sitemap clean, IndexNow, prerender, schemas riches. Reste à monitorer indexation effective. |
| **SEO contenu** | 7 | Couverture éditoriale complète (33 articles, 8 fonctionnalités, 7 alternatives, 7 guides GEO). Manque encore profondeur sur 3-4 niches transactionnelles. |
| **GEO/AEO (IA)** | 7 | 7 pages /guides/ format Q/R créées, llms.txt en place, robots.txt ouvert aux LLMs. Citation IA en cours de construction. |
| **UX/UI** | 6 | Mega-menu nav refait (PR #40). Design moderne. Mais : pas de vidéo démo, peu de trust badges, formulaire bêta externalisé Fillout (friction). |
| **Positionnement / CRO** | 5 | Promesse claire ("cockpit métier"), mais pas assez différenciante vs ERP historiques. Manque preuve sociale (témoignages, logos clients, presse). |

**Verdict global : 6.6/10.** Le socle technique et éditorial est solide (rare pour un site < 6 mois). Les deux leviers majeurs restants sont **(1) backlinks/DA** (action externe, non codable) et **(2) preuve sociale + UX conversion** (codable, vague 8 potentielle).

**Trafic attendu sous 6 mois si exécution complète** : 1500-3500 visiteurs/mois organiques (vs ~12 clics/mois au point de départ avant les 7 vagues).

---

## 1. AUDIT SEO TECHNIQUE

### 1.1 Bilan global

| Élément technique | État | Action |
|---|---|---|
| HTTPS | ✅ OK | RAS |
| Robots.txt | ✅ Excellent (ouvert aux LLMs : GPTBot, ClaudeBot, Perplexity, Gemini) | RAS |
| Sitemap.xml | ✅ 96 URLs, trailing slash partout, pages noindex exclues | RAS |
| Canonical | ✅ Override sur articles cannibalisés (PR #42) | RAS |
| Schema.org Organization | ✅ Présent sur homepage | RAS |
| Schema.org SoftwareApplication | ✅ Sur homepage + landing pilier | RAS |
| Schema.org FAQPage | ✅ Sur 30+ pages | RAS |
| Schema.org LocalBusiness | ✅ Sur 11 pages villes | RAS |
| Schema.org BreadcrumbList | ✅ Sur toutes pages (PR #41 complète couverture) | RAS |
| Schema.org HowTo | ✅ Sur 4 fonctionnalités | Étendre |
| Trailing slash canonicalisé | ✅ 220 URL normalisées (PR #36) | RAS |
| Mega-menu nav HTML statique | ✅ ~40 liens visibles Googlebot (PR #40) | RAS |
| Prerender SSG | ✅ 100 pages statiques | RAS |
| RSS feed | ✅ 33 items à jour | RAS |
| IndexNow | ✅ Script `npm run seo:indexnow` opérationnel | Lancer après chaque deploy |

### 1.2 Problèmes restants identifiés

| Problème | Impact SEO | Impact business | Priorité | Recommandation | Exemple correction |
|---|---|---|---|---|---|
| Core Web Vitals non monitorés (pas de RUM, pas de Lighthouse CI) | Moyen | Moyen | P2 | Installer GA4 + Web Vitals JS lib + dashboard Lighthouse CI | `import { onCLS, onLCP, onFID } from 'web-vitals'` |
| Pas de monitoring d'erreurs 404 ou 5xx | Faible | Moyen | P3 | Sentry ou alternative (Vercel Speed Insights) | Configurer Vercel Web Analytics |
| Pas de hreflang (pas multi-langue actuellement) | N/A | N/A | — | Non pertinent (FR uniquement) | — |
| OG image générique unique (`/og-image.png` sur toutes les pages) | Faible | Moyen | P3 | Générer OG dynamiques par page (script existe : `scripts/generate-assets.mjs`) | Étendre pour générer 1 OG par cluster |
| Pas de prefetch des routes critiques | Faible | Faible | P3 | `<link rel="prefetch">` sur /beta/, /audit-gratuit/ | — |
| 9 pages "Crawled — not indexed" présumées (audit GSC pas refait depuis vagues récentes) | Moyen | Moyen | P1 | Re-auditer GSC après stabilisation des deploys vague 7 | — |

### 1.3 Performance attendue

Le site est React SPA avec prerender SSG. Vite build produit ~200-400 KB JS gzipped. Avec Vercel CDN, LCP attendu < 2s sur desktop, < 3s sur mobile. **À mesurer en réel** via Lighthouse CI + RUM Web Vitals.

---

## 2. AUDIT SITEMAP & ARCHITECTURE

### 2.1 État actuel

96 URLs sitemap réparties en 9 clusters logiques :

| Cluster | URLs | Priority | Statut |
|---|---|---|---|
| Pages piliers | 5 (homepage, logiciel-societe-nettoyage, comparatif, tarifs, audit-gratuit) | 0.9-1.0 | ✅ Bien dimensionné |
| Fonctionnalités | 8 + index | 0.8-0.9 | ✅ Complet |
| Comparatifs vs concurrents | 6 | 0.8 | ✅ Complet (Organilog, Progiclean, PROPRET, 2BePragma, Synchroteam, Comète) |
| Alternatives | 4 | 0.8 | ✅ Complet |
| Verticales | 4 (auto-entrepreneur, médical, copro, app mobile, CRM, vs Excel) | 0.8 | ✅ Bien |
| Villes | 11 | 0.7-0.8 | ✅ Top 11 métropoles couvertes |
| Articles blog | 33 | 0.7 | ✅ Volume bon |
| Guides /guides/ | 7 | 0.7 | ✅ Format GEO créé (PR #41) |
| Ressources & outils | 9 | 0.7-0.9 | ✅ Hub Outils + 3 modèles téléchargeables |
| Solution hub | 1 | 0.8 | ✅ Nouveau (PR #42) |

### 2.2 Pages stratégiques manquantes (à créer)

| Page recommandée | URL | Intention | Persona | Priorité | Potentiel trafic | Potentiel conversion |
|---|---|---|---|---|---|---|
| Avis clients / témoignages | `/avis-clients/` | Recherche "Proprely avis" | Décideur | P1 | Moyen | **Très élevé** (preuve sociale) |
| Cas clients détaillés | `/cas-clients/` | Étude de cas par segment | PME 15-30 agents | P1 | Moyen | **Très élevé** |
| Page presse / kit média | `/presse/` | Journalistes cherchant infos | Presse | P2 | Faible | Moyen (backlinks) |
| Logiciel facturation B2B | `/logiciel-facturation-nettoyage/` | "logiciel facturation nettoyage" | TPE/PME | P2 | Élevé | Élevé |
| Logiciel preuve passage | `/logiciel-preuve-de-passage-nettoyage/` | Top requête syndic | PME multi-sites | P2 | Élevé | Élevé |
| Logiciel pointage GPS | `/logiciel-pointage-agent-nettoyage/` | Requête forte | PME en croissance | P2 | Élevé | Élevé |
| Meilleur logiciel propreté | `/meilleur-logiciel-entreprise-proprete/` | Requête "best of" | Décideur évaluation | P2 | Moyen | Élevé |
| Top logiciels nettoyage B2B | `/top-logiciels-nettoyage-b2b/` | Recherche comparaison | Évaluation | P3 | Moyen | Moyen |
| Solutions par secteur | `/solutions/societe-nettoyage-bureaux/`, `/solutions/nettoyage-fin-chantier/`, `/solutions/nettoyage-industriel/`, `/solutions/nettoyage-vitres/` | SEO segment | Niches | P3 | Moyen | Élevé sur niches |

**Note** : 3 d'entre elles ont des URLs déjà couvertes différemment (ex: `/fonctionnalites/facturation-nettoyage/` couvre la requête facturation). Décision à prendre : ajouter une URL transactionnelle pure OU enrichir l'existante.

### 2.3 Architecture cible recommandée (v2)

L'architecture actuelle est déjà excellente. Petits ajustements suggérés :

```
/ (homepage)
├── /solution/ (hub navigationnel — PR #42)
├── /logiciel-societe-nettoyage/ (PILIER P1.0)
├── /audit-gratuit/ (page conversion)
│
├── /fonctionnalites/ (hub)
│   ├── /planning-nettoyage/
│   ├── /devis-nettoyage/
│   ├── /gestion-agents-nettoyage/
│   ├── /preuve-passage-nettoyage/
│   ├── /facturation-nettoyage/
│   ├── /pointage-agents-nettoyage/
│   ├── /suivi-interventions-nettoyage/
│   └── /gestion-sites-clients-nettoyage/
│
├── /comparatif-logiciel-nettoyage/ (PILIER comparatif)
├── /comparatif/
│   ├── /proprely-vs-organilog/
│   ├── /proprely-vs-progiclean/
│   ├── /proprely-vs-propret/
│   ├── /proprely-vs-2bepragma/
│   ├── /proprely-vs-synchroteam/
│   └── /proprely-vs-comete-proprete/
│
├── /alternative-organilog/  (+ progiclean, propret, 2bepragma)
├── /proprely-vs-excel/
│
├── /logiciel-auto-entrepreneur-nettoyage/
├── /logiciel-nettoyage-medical-bionettoyage/
├── /logiciel-nettoyage-copropriete-syndic/
├── /application-mobile-agents-nettoyage/
├── /crm-entreprise-proprete/
├── /convention-collective-nettoyage/
│
├── /guides/ (NOUVEAU index hub — à créer ?)
│   ├── /quel-logiciel-societe-nettoyage/
│   ├── /outils-gestion-entreprise-proprete/
│   ├── /alternative-simple-organilog/
│   ├── /saas-societe-nettoyage-france/
│   ├── /comment-fonctionne-logiciel-nettoyage/
│   ├── /prix-logiciel-societe-nettoyage/
│   └── /pourquoi-logiciel-entreprise-nettoyage/
│
├── /outils/ (hub calculateurs)
│   ├── /calculateur-prix-nettoyage-m2/
│   ├── /simulateur-rentabilite/
│   └── /calculateur-roi/
│
├── /ressources/ (hub modèles)
│   ├── /modele-devis-nettoyage/
│   ├── /modele-planning-agents-nettoyage/
│   └── /modele-suivi-heures-agents/
│
├── /villes/ (hub local)
│   └── 11 villes
│
├── /blog/ (33 articles, à plat)
├── /tarifs/  /beta/  /a-propos/  /contact/
├── /avis-clients/ (À CRÉER)
├── /cas-clients/ (À CRÉER)
└── /presse/ (À CRÉER)
```

**Recommandation** : créer un **index page `/guides/`** pour exposer les 7 guides comme hub découvrable. Petite addition, gros gain crawl + UX.

---

## 3. AUDIT SEO CONTENU

### 3.1 Qualité éditoriale actuelle

| Type de contenu | Volume | Qualité moyenne | Notes |
|---|---|---|---|
| Articles blog longs (>1200 mots) | 25+ | 8/10 | Très bon — tableaux, FAQ, maillage interne, mots-clés précis |
| Pages fonctionnalités | 8 | 9/10 | Riches : problème/solution/bénéfices/use cases/FAQ/howTo |
| Pages alternatives | 4 | 8/10 | Bien structurées (raisons, tableau, migration, FAQ) |
| Pages comparatifs | 6 | 8/10 | Format whoChooses + table + keyDiffs + FAQ |
| Pages villes | 11 | 8/10 | Contenu local riche (clientTypes, challenges, marché) |
| Pages /guides/ GEO | 7 | 8/10 | Format Q/R optimisé citation IA |
| Page pilier `/logiciel-societe-nettoyage/` | 1 | 9/10 | Excellent : 1625 mots, schemas riches |

### 3.2 Mots-clés prioritaires (top 20)

| # | Mot-clé / Requête | Intention | Page cible | Action | Priorité | Potentiel |
|---|---|---|---|---|---|---|
| 1 | logiciel société nettoyage | Trans. | /logiciel-societe-nettoyage/ | Monitorer position | P0 | Très élevé |
| 2 | logiciel propreté | Trans. | /logiciel-societe-nettoyage/ | Variante à intégrer H2 | P0 | Très élevé |
| 3 | logiciel planning nettoyage | Trans. | /fonctionnalites/planning-nettoyage/ | Monitorer | P0 | Élevé |
| 4 | logiciel devis nettoyage gratuit | Trans. | /blog/logiciel-devis-nettoyage-gratuit/ | Monitorer | P0 | Élevé |
| 5 | logiciel pointage agent nettoyage | Trans. | /fonctionnalites/pointage-agents-nettoyage/ | Monitorer | P1 | Élevé |
| 6 | logiciel preuve passage nettoyage | Trans. | /fonctionnalites/preuve-passage-nettoyage/ | Monitorer | P1 | Élevé |
| 7 | logiciel facturation nettoyage | Trans. | /fonctionnalites/facturation-nettoyage/ | Monitorer | P1 | Moyen |
| 8 | alternative organilog | Trans. | /alternative-organilog/ | Monitorer | P0 | Élevé |
| 9 | alternative progiclean | Trans. | /alternative-progiclean/ | Monitorer | P1 | Moyen |
| 10 | alternative propret | Trans. | /alternative-propret/ | Monitorer | P1 | Moyen |
| 11 | meilleur logiciel nettoyage | Eval. | /comparatif-logiciel-nettoyage/ | Ajouter "meilleur" dans H1 variante | P0 | Élevé |
| 12 | comparatif logiciel nettoyage | Eval. | /comparatif-logiciel-nettoyage/ | Monitorer | P0 | Élevé |
| 13 | convention collective propreté 2026 | Info. | /blog/convention-collective.../ | Monitorer (déjà 199 imp) | P0 | Élevé |
| 14 | grille salaire nettoyage 2026 | Info. | /blog/grille-salaire.../ | Monitorer | P0 | Élevé |
| 15 | digitaliser société nettoyage | Info. | /blog/digitaliser.../ | Monitorer | P1 | Moyen |
| 16 | crm nettoyage | Trans. | /crm-entreprise-proprete/ | Position 37, enrichir +500 mots | P1 | Moyen |
| 17 | logiciel auto-entrepreneur nettoyage | Trans. | /logiciel-auto-entrepreneur-nettoyage/ | Enrichi PR #4 ✓ | P1 | Moyen |
| 18 | application mobile agent nettoyage | Trans. | /application-mobile-agents-nettoyage/ | Monitorer | P1 | Moyen |
| 19 | calcul heures agents nettoyage | Info. | /blog/calcul-heures.../ | Optimisé PR #1 ✓ | P1 | Moyen |
| 20 | tarif nettoyage bureaux m² | Info. | /calculateur-prix-nettoyage-m2/ | Bien positionné | P1 | Moyen |

### 3.3 Gaps de contenu (à créer)

| Contenu manquant | Format | Priorité | Pourquoi |
|---|---|---|---|
| Page `/solutions/societe-nettoyage-bureaux/` | Landing par segment | P2 | Capture niche bureaux |
| Page `/solutions/nettoyage-fin-chantier/` | Landing par segment | P2 | Niche peu adressée |
| Page `/solutions/nettoyage-vitres/` | Landing spécialité | P3 | Niche spécialiste |
| Article "Reprise société nettoyage : check-list" | Blog | P2 | Capture marché reprise/cession |
| Article "Différence Organilog Synchroteam Proprely" | Blog comparatif large | P2 | Trafic comparaison multi-acteurs |
| Article "Tarif horaire ménage bureaux 2026" | Blog data | P2 | Forte intention |
| Article "Logiciel ménage à domicile B2C" | Blog disclaimer | P3 | Capture trafic mal qualifié pour bien le réorienter B2B |
| Page `/avis-clients/` | Testimonials | P1 | Preuve sociale, gros frein conversion actuel |
| Page `/cas-clients/` | Études détaillées | P1 | Crédibilité, narrative |
| Index `/guides/` | Hub | P2 | Navigation des 7 guides existants |

---

## 4. AUDIT GEO / AEO (visibilité IA)

### 4.1 État actuel

| Levier IA | Statut | Notes |
|---|---|---|
| robots.txt ouvert aux LLMs (GPTBot, ClaudeBot, Perplexity, Gemini, Mistral, Cohere, You.com, Diffbot) | ✅ | Excellent — rare niveau d'ouverture |
| llms.txt | ✅ | Présent, structuré, à jour |
| llms-full.txt | ✅ | Généré au build (375k+ caractères) |
| Schema FAQPage abondant | ✅ | 30+ pages couvertes |
| Format Q/R format guide | ✅ | 7 pages /guides/ (PR #41) |
| Réponse-flash (TLDR 40-80 mots) | ✅ | Sur articles et guides |
| Abstract Schema.org | ✅ | Sur WebPage des guides |

### 4.2 Les 30 prompts IA à cibler

| # | Prompt IA | Intention | Page cible | Contenu nécessaire | Priorité |
|---|---|---|---|---|---|
| 1 | "Quel est le meilleur logiciel pour gérer une société de nettoyage ?" | Comparatif | /guides/quel-logiciel-societe-nettoyage/ | ✅ Existe | P0 |
| 2 | "Quel logiciel pour planifier les agents d'entretien ?" | Trans. | /fonctionnalites/planning-nettoyage/ | ✅ Existe, à enrichir TLDR | P1 |
| 3 | "Alternative à Organilog pour société de nettoyage ?" | Alternative | /alternative-organilog/ + /guides/alternative-simple-organilog/ | ✅ Existe | P0 |
| 4 | "Comment digitaliser une entreprise de propreté ?" | Info. | /blog/digitaliser-entreprise-nettoyage-5-etapes/ | ✅ Existe | P0 |
| 5 | "Quel CRM pour société de nettoyage B2B ?" | Trans. | /crm-entreprise-proprete/ | Enrichir TLDR + FAQ | P1 |
| 6 | "Combien coûte un logiciel de nettoyage en 2026 ?" | Info. | /guides/prix-logiciel-societe-nettoyage/ | ✅ Existe (PR #41) | P0 |
| 7 | "Comment fonctionne un logiciel de société de nettoyage ?" | Info. | /guides/comment-fonctionne-logiciel-nettoyage/ | ✅ Existe (PR #41) | P0 |
| 8 | "Pourquoi utiliser un logiciel pour son entreprise de nettoyage ?" | Info. | /guides/pourquoi-logiciel-entreprise-nettoyage/ | ✅ Existe (PR #41) | P0 |
| 9 | "Quels outils pour gérer une entreprise de propreté ?" | Info. | /guides/outils-gestion-entreprise-proprete/ | ✅ Existe (PR #41) | P0 |
| 10 | "Quel SaaS français pour société de nettoyage ?" | Trans. | /guides/saas-societe-nettoyage-france/ | ✅ Existe (PR #41) | P0 |
| 11 | "Quelle alternative à Progiclean ?" | Alternative | /alternative-progiclean/ | ✅ Existe | P1 |
| 12 | "Quelle alternative à PROPRET ?" | Alternative | /alternative-propret/ | ✅ Existe | P1 |
| 13 | "Logiciel preuve de passage pour syndic ?" | Trans. | /fonctionnalites/preuve-passage-nettoyage/ | Enrichir mention "syndic" | P1 |
| 14 | "Convention collective propreté IDCC 3043 salaires 2026" | Info. | /blog/convention-collective-nettoyage-idcc-3043/ | ✅ Très bien positionné | P0 |
| 15 | "Grille salaire nettoyage 2026 par coefficient" | Info. | /blog/grille-salaire-nettoyage-2026-idcc-3043/ | ✅ Existe | P0 |
| 16 | "Comment calculer la rentabilité d'un contrat de nettoyage ?" | Info. | /blog/calculer-rentabilite-client-nettoyage/ | ✅ Existe | P1 |
| 17 | "12 KPI à suivre dans une société de nettoyage" | Info. | /blog/kpi-societe-nettoyage-2026/ | ✅ Existe | P1 |
| 18 | "Comment créer une société de nettoyage en 2026 ?" | Info. | /blog/creer-societe-nettoyage/ | ✅ Existe | P1 |
| 19 | "Comment fixer ses prix dans le nettoyage ?" | Info. | /blog/fixer-prix-nettoyage/ | ✅ Existe | P0 |
| 20 | "Logiciel pointage GPS agents de nettoyage ?" | Trans. | /fonctionnalites/pointage-agents-nettoyage/ | Enrichir TLDR | P1 |
| 21 | "Facturation électronique pour société de nettoyage 2026" | Info. | /blog/facturation-electronique-nettoyage/ | ✅ Existe | P1 |
| 22 | "Comment éviter les oublis de passage en nettoyage ?" | Info. | /blog/eviter-oublis-passage-nettoyage/ | ✅ Existe | P1 |
| 23 | "Comment réduire le turnover des agents de nettoyage ?" | Info. | /blog/fideliser-agents-nettoyage-turnover/ | ✅ Existe | P1 |
| 24 | "Quelles obligations pour une société de nettoyage ?" | Info. | /convention-collective-nettoyage/ | Enrichir | P2 |
| 25 | "Logiciel facturation pour société de nettoyage" | Trans. | /fonctionnalites/facturation-nettoyage/ | Enrichir TLDR | P1 |
| 26 | "Comment digitaliser ses devis dans le nettoyage ?" | Info. | /fonctionnalites/devis-nettoyage/ | ✅ Bien positionné | P1 |
| 27 | "Logiciel pour société de nettoyage à Paris" | Local | /villes/paris/ | ✅ Existe | P2 |
| 28 | "Tarif nettoyage bureau au m² 2026" | Info. | /blog/tarif-nettoyage-bureaux-m2-2026/ | ✅ Existe | P0 |
| 29 | "Comment répondre à un appel d'offres nettoyage ?" | Info. | /blog/repondre-appel-offres-nettoyage/ | ✅ Existe | P1 |
| 30 | "Comment calculer le coût horaire chargé d'un agent ?" | Info. | /blog/cout-horaire-charge-agent-nettoyage/ | ✅ Existe | P0 |

**Bilan** : sur les 30 prompts cibles, **28 ont une page existante**. Le travail est désormais d'**optimiser les TLDR et signaux d'autorité** pour devenir la source citée par défaut. Les principales actions :
1. Ajouter des chiffres précis et datés (réponse-flash optimisée pour citation textuelle)
2. Structurer en H2/H3 avec questions explicites
3. Multiplier les FAQ Schema (déjà fait sur 30+ pages)
4. Obtenir des mentions externes (presse spécialisée propreté, FEP) — non codable

---

## 5. AUDIT UX / UI

### 5.1 Forces actuelles

- Mega-menu nav refait avec mega-menus 2 colonnes (PR #40)
- Footer enrichi 5 sections (PR #42)
- Design moderne 2025-2026, animations sobres (framer-motion)
- Mobile-first natif (responsive Tailwind)
- Composant Breadcrumbs visible + Schema sur toutes pages (PR #41)
- Pages produit structurées : hero + problem/solution/benefits/useCases/FAQ
- CTAs cohérents (Bêta + Audit gratuit)

### 5.2 Faiblesses identifiées

| Page / élément | Problème UX/UI | Impact conversion | Recommandation | Priorité | Potentiel |
|---|---|---|---|---|---|
| Homepage | Pas de vidéo démo | Très élevé | Ajouter vidéo 60-90s en hero | P1 | +20-40% conv. |
| Homepage | Trust badges peu visibles | Élevé | Section "Ils nous font confiance" avec logos clients + presse | P1 | +10-20% |
| Toutes pages | Formulaire bêta externe (Fillout) | Élevé | Friction iframe — envisager formulaire inline simple (email + société) | P1 | +30-50% |
| Pages produit | Pas de screenshots produit | Très élevé | Captures écran annotées sur fonctionnalités | P1 | +20-30% |
| Pages produit | Pas de témoignages contextuels | Élevé | Quote-card par page produit | P1 | +15-25% |
| Homepage / pilier | Pas de "Comment ça marche" en 3 étapes visuel | Moyen | Section "1 → 2 → 3" avec icônes | P2 | +10-15% |
| Toutes pages | Pas de bouton WhatsApp / chat | Moyen | Bouton flottant pour TPE qui préfèrent l'oral | P2 | +5-15% capture |
| Pages comparatifs | Score / verdict pas assez visuel | Moyen | Système de stars/points + cartes "Recommandé pour..." | P2 | +10-15% |
| Mobile | Mega-menu accordéon peut être lourd | Faible | Tester scroll performance mobile bas/moyen | P2 | UX |
| Pages outils | Beaucoup de scroll requis sur calculateurs | Faible | Sticky CTA après résultat calcul | P3 | +5-10% capture lead |
| Toutes pages | Pas de barre de progression / scroll progress | Faible | Composant `<ScrollProgress />` existe — vérifier activé partout | P3 | UX micro |

### 5.3 Points de friction parcours

1. **Découverte homepage** : promesse claire mais pas de "preuve" immédiate (badges, logos)
2. **Évaluation comparatif** : pas de scoring synthétique en haut de page (juste tableau dense)
3. **Décision tarifs** : page tarifs renvoie vers Fillout externe (friction)
4. **Action audit gratuit** : page bien faite mais CTA renvoie vers bêta (incohérent — audit ≠ bêta)
5. **Mobile** : header sticky bien, mais CTA bêta peut être coupé sur petit écran

---

## 6. AUDIT PARCOURS DE CONVERSION

### 6.1 Les 6 parcours type analysés

| Parcours | Persona | Point d'entrée | Frictions actuelles | Recommandations | CTA idéal | Potentiel |
|---|---|---|---|---|---|---|
| **SEO requête transactionnelle** | Dirigeant PME | `/logiciel-societe-nettoyage/` | Pas de vidéo, pas de témoignage en haut | Vidéo 60s + carrousel 3 témoignages | "Audit gratuit 30 min" | Très élevé |
| **SEO requête comparatif** | Décideur évaluation | `/comparatif-logiciel-nettoyage/` | Tableau dense, pas de verdict express | Carte "Notre reco par profil" + score visuel | "Voir Proprely en démo" | Élevé |
| **SEO requête alternative** | Insatisfait concurrent | `/alternative-organilog/` | Migration anxiogène | Section "Plan de migration en 5 étapes + témoignage migrateur" | "Demander un audit + plan migration" | Très élevé |
| **GEO / IA conversationnelle** | Curieux info | `/guides/quel-logiciel.../` | TLDR + sections complètes ✅ | OK | "Audit gratuit" | Moyen-élevé |
| **LinkedIn / referral** | Dirigeant ouvert | Homepage | Pas de social proof immédiat | Bandeau "Vu sur Frenchweb / Maddyness / FEP" (si obtenu) | "Candidater à la bêta" | Moyen |
| **Mobile cold visit** | Agent terrain curieux | `/application-mobile-agents-nettoyage/` | Vidéo manquante critique en mobile | Vidéo 30s "agent qui scanne QR" | "Demander une démo terrain" | Moyen |

### 6.2 Funnel complet en 8 étapes

| Étape | Objectif | Contenu nécessaire | Page nécessaire | KPI | Amélioration attendue |
|---|---|---|---|---|---|
| **1. Découverte** | Capture attention SEO / LinkedIn / IA | Article blog + landing pilier | ✅ Existe | Impressions GSC, trafic source | +500% sur 6 mois |
| **2. Éducation** | Comprendre le problème | Articles douleur (oublis, marge, turnover) | ✅ Existe (12+ articles) | Time on page, scroll depth | OK |
| **3. Comparaison** | Évaluer vs concurrents | Pages comparatif + alternative | ✅ Existe | Pages/session, taux comparatif | OK |
| **4. Réassurance** | Lever objections | Témoignages, cas clients, logos | ❌ **MANQUANT** | Conv. rate | +30-50% |
| **5. Démo / Audit** | Engager contact | Page /audit-gratuit/ + formulaire court | ✅ Existe mais friction Fillout | Form starts, completions | +20-40% si form inline |
| **6. Relance** | Reconvertir non-converti | Email nurturing post-formulaire | ❌ **MANQUANT** (pas de séquence email visible) | Email open rate | Setup tool emailing |
| **7. Conversion** | Signature contrat | Page tarifs + bêta + onboarding | ✅ Existe | Conversion form → client | OK |
| **8. Activation** | Premier succès produit | Onboarding 30 min fondateur | ✅ Process humain | Retention 30j | OK |

**Goulots prioritaires** : étapes 4 (réassurance) et 5 (friction formulaire). Adresser ces 2 points peut doubler la conversion globale.

---

## 7. POSITIONNEMENT MARKETING

### 7.1 Diagnostic positionnement actuel

**Promesse actuelle** : "Logiciel de gestion pour société de nettoyage B2B" + "Le cockpit métier des sociétés de nettoyage"

**Forces du positionnement** :
- Clair, métier, vertical pur propreté
- "Cockpit" est différenciant vs "logiciel" générique
- Promesse "Sans Excel, sans WhatsApp, sans nuits blanches" parle direct au pain

**Faiblesses du positionnement** :
- "Logiciel de gestion" reste générique (utilisé par tous les concurrents)
- Pas assez de promesse de transformation (juste outil)
- Manque le bénéfice émotionnel ultime (autonomie, contrôle, croissance)
- Pas assez de "preuve" tangible dans la promesse (chiffres, garanties)

### 7.2 Réponses aux 10 questions clés

1. **Cible principale** : dirigeants TPE/PME nettoyage B2B 3-50 agents, en croissance, qui veulent quitter Excel/WhatsApp
2. **Problème urgent résolu** : 6-10 h/semaine perdues en admin dispersée + marge invisible + turnover mal anticipé
3. **Promesse centrale actuelle** : "Cockpit métier qui centralise vos opérations"
4. **Promesse améliorée recommandée** : "Le cockpit qui rend 8 h/semaine et 3 points de marge aux dirigeants de société de nettoyage B2B"
5. **Ce qui manque pour convertir** : preuve sociale (témoignages, logos, presse) + vidéo démo + formulaire inline
6. **Arguments à mettre en avant** : (1) +8h/sem rendues, (2) +3 pts marge, (3) IA dévis +25% conversion, (4) Mobile sans app, (5) Onboarding 30 min
7. **Objections non traitées** : "Et si vous fermez ?", "Mes agents savent pas utiliser un logiciel", "Trop cher pour ma TPE", "J'ai pas le temps de migrer"
8. **Comment devenir la référence** : 30+ témoignages publics + 10 cas clients chiffrés + présence FEP + presse + Product Hunt
9. **Phrase de positionnement hero recommandée** : "Le cockpit qui rend 8 heures par semaine et 3 points de marge aux dirigeants de société de nettoyage B2B."
10. **Messages à répéter sur tout le site** : (1) Bêta gratuite + tarif fondateur à vie, (2) Onboarding 30 min avec le fondateur, (3) Marge par client en temps réel, (4) Mobile sans app, (5) Devis IA +25% conversion

### 7.3 Nouvelle promesse + variantes

**Promesse principale recommandée** :
> Le cockpit qui rend 8 h/semaine et 3 points de marge aux dirigeants de société de nettoyage B2B.

**3 variantes de headline** :
- A. **"Pilotez votre société de nettoyage comme une vraie PME, pas comme un casse-tête Excel."**
- B. **"Le cockpit métier qui transforme votre société de nettoyage en machine rentable."**
- C. **"Reprenez le contrôle de votre société de nettoyage. En 30 minutes."**

**3 variantes de sous-titre** :
- A. "Planning, devis, agents, preuve de passage, marge par client : tout dans un seul écran. Conçu en France pour les TPE/PME 3-50 agents."
- B. "Gagnez 8 heures par semaine, 3 points de marge, et 30 % de turnover en moins. Bêta privée gratuite — 30 places fondateurs."
- C. "L'IA propose vos devis, le QR code prouve vos passages, votre dashboard pilote votre marge. Sans Excel, sans WhatsApp, sans nuits blanches."

**5 arguments différenciants vs concurrents** :
1. **Mobile sans app à installer** (vs Organilog/PROPRET/Progiclean app native)
2. **Marge par client en temps réel native** (vs reporting BI à configurer chez tous)
3. **Devis IA propriétaire** (9 facteurs, +25% conversion — unique sur le marché FR)
4. **Onboarding 30 min avec le fondateur** (vs intégrateur 4-8 semaines chez ERP)
5. **Tarif transparent + bêta gratuite** (vs sur devis chez tous les ERP métier)

**5 objections à traiter explicitement** :
1. "Et si Proprely ferme ?" → garantie export 1-clic CSV/Excel à tout moment + hébergement EU
2. "Mes agents savent pas utiliser un logiciel" → lien web mobile, scan QR à l'arrivée, formation 5 min
3. "Trop cher pour ma TPE" → gratuit en bêta + tarif fondateur à vie (transparence prix)
4. "J'ai pas le temps de migrer" → 30 min onboarding avec le fondateur, import CSV inclus
5. "Je suis spécialisé X, ça marche pas pour moi ?" → spécialités natives (vitrerie, médical, décapage, bionettoyage)

**5 preuves de confiance à ajouter** :
1. Logos des 30 bêta-testeurs (dès qu'autorisé)
2. Témoignages vidéo (3-5 dirigeants)
3. Mention "Vu sur Frenchweb / BDM / Maddyness" (à obtenir)
4. Logo FEP (si partenariat obtenu)
5. Badge Capterra / G2 (dès inscription faite)

---

## 8. PERSONAS

| Persona | Nom | Poste | Type entreprise | Taille | Maturité digitale | Frustrations | Objectifs | Mots-clés recherchés | Prompts IA | CTA adapté | Priorité |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **P1. Dirigeant TPE en croissance** | Karim, 38 ans | Fondateur-dirigeant | Société de nettoyage indép. | 6 agents, 12 clients | Faible | Excel + WhatsApp ingérable, perd des passages, marge floue | Doubler à 12 agents sans chaos, dégager marge | logiciel société nettoyage, gestion entreprise propreté | "Quel outil pour passer de 5 à 15 agents nettoyage ?" | "Audit gratuit 30 min" | **Très élevée** |
| **P2. Responsable exploitation PME** | Sandrine, 45 ans | Resp. exploitation | PME propreté établie | 30 agents, 50 sites | Moyenne | Planning quotidien stressant, remplacements en urgence, calls agents non-stop | Réduire stress, automatiser, libérer temps stratégique | logiciel planning nettoyage, gestion agents | "Comment automatiser le planning de 30 agents nettoyage ?" | "Démo en 30 min" | Élevée |
| **P3. Coordinatrice terrain** | Aïcha, 32 ans | Coord. planning | PME propreté | 20 agents | Moyenne | Tableurs partout, double check manuel, oublis fréquents | Vue d'ensemble temps réel, alertes auto | logiciel planning agents, suivi missions | "Logiciel planning pour 20 agents nettoyage ?" | "Voir le module planning" | Moyenne |
| **P4. Commercial / Resp. devis** | Vincent, 35 ans | Commercial | PME propreté en conquête | 15 agents, 25 prospects/mois | Moyenne | Devis Word 30 min chacun, conversion faible, marge à l'aveugle | Plus de devis signés, plus de marge | logiciel devis nettoyage, devis intelligent IA | "Comment faire plus de devis nettoyage et signer plus ?" | "Tester le devis IA" | Élevée |
| **P5. Créateur / Repreneur** | Mathilde, 41 ans | Future dirigeante | Création société | 0-3 agents | Variable | Tout à structurer, peur de mal démarrer, budget limité | Démarrer pro dès le jour 1, éviter pièges | créer société nettoyage, logiciel auto-entrepreneur | "Comment créer une société de nettoyage en 2026 ?" | "Modèles Excel gratuits + bêta gratuite" | Moyenne |

---

## 9. ANALYSE CONCURRENTIELLE

> Analyse menée le 7 juin 2026 sur sites officiels, fiches Appvizer, avis LeBonLogiciel/Capterra, comparatifs sectoriels.

### 9.1 PROPRET.fr — Le concurrent le plus dangereux pour Proprely

**Positionnement** : *"Le seul logiciel propreté en France à offrir 14 jours d'essai 100% gratuit, sans rendez-vous ni carte bancaire."* Éditeur : Le Web Francais (agence bordelaise), depuis 2019.

| Dimension | Détail |
|---|---|
| Cible | TPE/PME 5-50 agents, francophone (France + DOM-TOM + Belgique + Suisse + Afrique francophone) |
| Tarif | **29,99 €/mois** (pack 5 utilisateurs), tout module inclus, sans engagement |
| Essai | **14 jours sans CB ni démo** (friction quasi-zéro) |
| Mobile | App native iOS + Android, mature (PTI, cahier de consignes, géoloc) |
| SEO | 150-300 pages indexées estimées, topic clusters, pages "vs", pages "best of", pages SEO géo (Belgique) et sectorielles |
| Force #1 | Spé propreté 100% + tarif transparent + essai sans friction |
| Force #2 | SEO redoutable avec stratégie pages versus + pillar pages métier |
| Faiblesse #1 | Pas de levée de fonds connue → vélocité produit potentiellement plus lente |
| Faiblesse #2 | Pack base limité à 5 users (coût grimpe vite avec scale) |
| **🚨 Risque marque** | **"PROPRET" très proche phonétiquement de "Proprely"** — risque confusion + cannibalisation requêtes |

**Angles d'attaque pour Proprely vs Propret** :
1. **Différenciation par workflows commerciaux** : Propret est fort planning/terrain, plus faible prospection/devis avancés → Proprely creuse "devis IA, marge temps réel, conversion devis→facture 1 clic"
2. **UX 2026 + IA native** : Propret a une UI "classique SaaS B2B 2020" → Proprely affiche une UX 2026 (IA, automatisations)
3. **Freemium plus généreux** : 14j sans CB c'est bien, mais une vraie offre gratuite à vie sur N petits sites pourrait créer un fossé d'acquisition
4. **Comparatif inversé** : `/comparatif/proprely-vs-propret/` ✅ existe — vérifier son ranking
5. **Stack tech moderne** : API REST/GraphQL, intégrations Stripe/Slack/Make/n8n mises en avant (Propret peu disert)

### 9.2 ORGANILOG — Le généraliste massif

**Positionnement** : *"Logiciel tout-en-un de gestion d'interventions terrain pour booster votre croissance."* Multi-métiers (90+ secteurs). Édité par Adalgo depuis 2013/2014.

| Dimension | Détail |
|---|---|
| Cible | TPE/PME tous métiers (nettoyage = 1 segment parmi 90) |
| Tarif | **0 € (Basique, très limité) / 19 € (Pro) / 35 € (Business — pop.) / 59 € (Premium) par user/mois** |
| Essai | Plan gratuit Basique (très limité, archivage 72h, sans support) |
| Mobile | App native iOS + Android, déjà version "Organilog Interventions 2026" |
| SEO | **500-1500 pages domaine principal + plusieurs centaines par micro-site métier** (organilog-proprete.com, organilog-paysage.com, organilog-froid.com, organilog-chantier.com) — **footprint massif** |
| Force #1 | Stratégie SEO via micro-sites verticaux par métier |
| Force #2 | Multi-métiers (+500 entreprises clientes revendiquées) |
| Faiblesse #1 | **Non spécialisé propreté** : pas de cahier consignes, PTI, CCN propreté, prépaie spécifique |
| Faiblesse #2 | UX jugée datée/complexe (3.5/5 LeBonLogiciel) |
| Faiblesse #3 | Upsell agressif (facturation à partir de 35 €/user en Business) |

**Angles d'attaque pour Proprely vs Organilog** :
1. **"Conçu pour le nettoyage, pas adapté"** : marteler workflows métier propreté natifs (taux CCN, prépaie spécifique, Qualipropre)
2. **Tarif tout-inclus** vs upsell : Organilog facture par user et impose Business pour la facturation → Proprely peut proposer tarif au site ou flat société
3. **UX moderne 2026** : pitch direct "Vous n'avez pas besoin de 2 semaines de formation"
4. **Capter SEO vertical propreté** : créer 10+ pages "logiciel + sous-segment propreté" (bureaux, copro, industriel, hôtellerie) pour court-circuiter le micro-site `organilog-proprete.com`

### 9.3 PROGICLEAN — L'ERP installé

**Positionnement** : *"Outil de gestion 100% web dédié aux entreprises de propreté et multiservices."* Édité par **Groupe Senef** (fondé 2011, **levée 6,5 M€ Isatis Capital en 2024**).

| Dimension | Détail |
|---|---|
| Cible | PME structurées et ETI (30-500+ agents), **+500 entreprises, 1200 sites** |
| Tarif | **Sur devis, engagement 3 ans** (tacite reconduction) |
| Essai | Aucun (démo commerciale obligatoire) |
| Mobile | Mobiclean (agents : pointage NFC/géoloc) + Qualimobi (tablette qualité) |
| Différenciant | **Intégration native Silae** (paie propreté) + CRM intégré + ERP complet |
| SEO | 80-200 pages, structure /en/ étrange (anglais dans URL pour contenu FR), blog modeste |
| Force #1 | Intégration Silae native (bénéfice fort secteur propreté) |
| Force #2 | **Levée 6.5M€ = vélocité produit + commerciale renforcée** |
| Faiblesse #1 | **Opaque tarifairement + engagement 3 ans = friction max pour TPE/PME** |
| Faiblesse #2 | Pas mobile-first back-office (web app desktop) |
| Faiblesse #3 | UX old-school, déploiement lourd |

**Angles d'attaque pour Proprely vs Progiclean** :
1. **Anti-engagement** : "Sans devis, sans démo, sans engagement 3 ans" → cible explicite des frustrés Progiclean
2. **Self-service** : capture du segment TPE qui ne veut pas attendre 6 semaines
3. **Time-to-value en heures, pas en mois** : Progiclean impose installation/formation/audit/migration
4. **Intégrations paie modernes** : si pas Silae natif → intégrer PayFit, Pennylane, RocketChart (concurrents Silae plus modernes)

### 9.4 MAGLIA.io — La planification moderne

**Positionnement** : *"Optimisez la planification et l'affectation de vos ressources efficacement."* Plateforme multi-secteurs (BTP, santé, retail, intérim, hôtellerie, comptables, sport, nettoyage…).

| Dimension | Détail |
|---|---|
| Cible | PME → grands comptes, **référence phare Axians Rail (VINCI Energies)** |
| Tarif | **Sur devis** (opaque) |
| Essai | Démo guidée uniquement |
| Mobile | Limité — communication agents par SMS/email (pas d'app native terrain mise en avant) |
| Différenciant | **UX la plus moderne du marché** (drag-and-drop, vues multiples) + sécurité enterprise (ISO 27001, MFA, hébergement France) |
| SEO | 30-80 pages (le plus faible footprint des 4 — pas de blog content factory) |
| Force #1 | UX moderne (le plus grand atout) |
| Force #2 | Crédibilité grand compte (Axians/VINCI) |
| Faiblesse #1 | **Non spécialisé propreté** (pas de CCN, PTI, contrôle qualité métier) |
| Faiblesse #2 | **Scope plus étroit** : planification surtout, pas la suite complète (devis/facturation/RH déléguées à Sage/Cegid/EBP) |
| Faiblesse #3 | Faible footprint SEO sur requêtes propreté |

**Angles d'attaque pour Proprely vs Maglia** :
1. **Tout-en-un vs point solution** : Proprely promet planning + devis + factures + qualité dans un seul outil sans intégration tierce
2. **Spécialisation métier** : workflows propreté natifs (vacations, remplacements, conformité CCN)
3. **Transparence pricing** : Maglia oblige au contact commercial → Proprely industrialise PLG
4. **App mobile terrain native** : combler le gap Maglia côté agent
5. **SEO ouvert** : Maglia étant faible, fenêtre pour rafler "logiciel planning nettoyage", "logiciel affectation agents nettoyage"

### 9.5 Tableau comparatif synthétique

| Critère | Proprely | Propret | Organilog | Progiclean | Maglia |
|---|---|---|---|---|---|
| Spécialisation | 100% Propreté B2B | 100% Propreté | Multi-métiers (90+) | 100% Propreté/FM | Multi-secteurs (~12) |
| Cible principale | TPE/PME 3-50 agents | TPE/PME 5-50 | TPE/PME tous métiers | PME/ETI structurées | PME → Grand compte |
| Tarif d'entrée | **Gratuit bêta** | 29,99 €/mois (5 users) | 0 € puis 19-59 €/user | Sur devis (engagement 3 ans) | Sur devis |
| Transparence tarif | ✅ Très élevée | ✅ Élevée | ✅ Élevée | ❌ Faible | ❌ Faible |
| Essai sans démo | ✅ Bêta gratuite | ✅ 14j sans CB | ✅ Plan gratuit limité | ❌ | ❌ |
| App mobile native terrain | ❌ Web mobile | ✅ iOS + Android | ✅ iOS + Android | ✅ Mobiclean | ⚠️ Limité (SMS/email) |
| Devis IA propriétaire | ✅ Unique | ❌ | ❌ | ❌ | ❌ |
| Marge par client temps réel | ✅ Natif dashboard | ⚠️ Calcul marge présent | ❌ | ⚠️ Via reporting | ❌ |
| Intégration paie | Export Silae compatible | Export paie | À paramétrer | ✅ **Silae natif** | Sage/Cegid/EBP |
| SEO footprint estimé | ~96 URLs | 150-300 pages | 500-1500 pages + microsites | 80-200 pages | 30-80 pages |
| Modernité UX/UI | ✅ Design 2025-2026 | Bonne | ❌ Datée/complexe | ❌ Corporate/lourde | ✅ Excellente |
| Maturité éditeur | Lancement 2025 | Agence depuis 2019 | Depuis 2013 | Levée 6,5 M€ 2024 | Startup, ~4 fondateurs |
| Base client revendiquée | Bêta 30 places | NC précisément | +500 entreprises | +500 entreprises, 1200 sites | NC, refs grand compte |
| Onboarding | **30 min avec fondateur** | Self-service | Self ou support | 4-8 sem intégrateur | Démo commerciale |
| Différenciant clé | Devis IA + marge temps réel + onboarding 30 min | Essai sans friction + spé propreté | Multi-métiers + freemium | ERP complet + Silae natif | UX planning + sécurité enterprise |

### 9.6 Pages déjà créées par Proprely

**Comparatifs** ✅ : `/comparatif/proprely-vs-organilog/`, `/proprely-vs-progiclean/`, `/proprely-vs-propret/`, `/proprely-vs-2bepragma/`, `/proprely-vs-synchroteam/`, `/proprely-vs-comete-proprete/`, `/proprely-vs-excel/`
**Alternatives** ✅ : `/alternative-organilog/`, `/alternative-progiclean/`, `/alternative-propret/`, `/alternative-2bepragma/`

**À créer en priorité** :
- `/comparatif/proprely-vs-maglia/` (P1 — Maglia non couvert)
- `/alternative-maglia/` (P1)
- `/blog/comparatif-organilog-propret-progiclean/` (article multi-acteurs où Proprely est l'arbitre — P2)
- `/blog/organilog-vs-propret-quel-choisir/` (capture trafic des indécis Organilog/Propret — P2)

### 9.7 5 opportunités globales pour Proprely

1. **Onboarding self-service réel (PLG)** : aucun des 4 ne propose "inscription → premier devis créé en 10 minutes sans appel commercial". Propret s'en approche mais profondeur fonctionnelle exige formation. → **Opportunité** : freemium ou trial illimité sur fonctions essentielles avec onboarding interactif type Notion/Linear.
2. **UX moderne 2026 + IA générative native** : seul Maglia est moderne mais sur scope étroit. → **Opportunité** : commande, recherche universelle, génération automatique de devis depuis brief en langage naturel, suggestion planning IA, OCR factures fournisseurs.
3. **Pricing par site/contrat** plutôt que par utilisateur : Organilog (19-59 €/user) devient cher dès 10 personnes. → **Opportunité** : tarification par société/site/volume de devis, qui scale mieux pour PME 15-50 avec rotation effectifs.
4. **Stratégie SEO long-tail métier ultra-ciblée** : Propret a déjà capturé "propret vs X" mais les pages "logiciel devis nettoyage", "logiciel planning propreté gratuit", "logiciel CCN propreté" sont peu travaillées. → **Opportunité** : 50-100 articles long-tail sur douleurs métier précises (déjà bien démarré côté Proprely).
5. **Intégrations modernes** : tous les concurrents sont avares d'intégrations modernes (Silae, Sage, Cegid). → **Opportunité** : PayFit, Pennylane, Stripe, Notion, Slack, n8n/Make, ChatGPT/Claude API, WhatsApp Business = différenciation pour dirigeant TPE/PME jeune.

### 9.8 3 menaces concurrentielles à surveiller

1. **Progiclean (Senef) avec sa levée 6,5 M€ (Isatis Capital, 2024)** : ils ont les moyens d'attaquer le segment PME où Proprely se positionne. Risque qu'ils sortent une "édition Startup/PME" avec tarif public et essai gratuit. → **Surveiller** roadmap commerciale et offre d'entrée 2025-2026.
2. **Propret renforce SEO et brand "PROPRET®"** : très proche phonétiquement de "Proprely". Risque cannibalisation requêtes de marque et confusion utilisateur. → **Action préventive immédiate** : déposer la marque Proprely INPI, créer pages "Proprely vs Propret" claires (✅ déjà fait), optimiser SEO sur "Proprely" pour ne pas être détourné.
3. **Organilog stratégie de micro-sites verticaux (`organilog-proprete.com`)** : ils peuvent à tout moment renforcer la fonctionnalité propreté de ce micro-site, voire en faire un produit packagé "Organilog Propreté". Leur freemium + footprint SEO massif → coût d'acquisition faible. → **Surveiller** sorties produit ciblées propreté et évolution pricing.

### 9.9 Stratégie de captation trafic concurrents (synthèse)

**SEO bottom-of-funnel** :
- Articles éditoriaux qui font autorité sans dénigrer : "Organilog avis 2026", "Progiclean retour expérience", "PROPRET trop cher pour TPE ?"
- Pages "vs" déjà créées — vérifier ranking sur GSC sous 60 jours

**LinkedIn / contenu** :
- Posts comparatifs honnêtes par le fondateur (LinkedIn personal brand)
- Carousels "Avant/Après Proprely" avec screenshots produit
- Réponses utiles dans groupes "Dirigeants Propreté" / FEP

**Stratégie de marque (anti-confusion Propret)** :
- Toujours écrire "Proprely" (pas "Propret") dans le branding
- Déposer marque INPI urgemment
- Présence Google My Business + Google Search Console solidifiée pour cocher la case "Brand: Proprely"

---

---

## 10. RECOMMANDATIONS FINALES PRIORISÉES

| Priorité | Tâche | Catégorie | Pourquoi | Impact | Difficulté | Potentiel | KPI | Responsable |
|---|---|---|---|---|---|---|---|---|
| **P0** | Indexation manuelle GSC des 30+ nouvelles pages (vagues 2-7) | Indexation | Sans index, le contenu créé reste invisible | Très élevé | Faible (2h) | Très élevé | Pages indexées GSC | SEO/User |
| **P0** | Lancer `npm run seo:indexnow` post-deploy | Indexation | Bing/Yandex notifiés instantanément | Élevé | Faible | Élevé | Hits Bing | Dev/User |
| **P0** | Inscription Capterra + G2 + GetApp + Société.com | Backlinks | DA/DR débloque tout le ranking | Très élevé | Moyen (4h) | Très élevé | DR Ahrefs, backlinks | Marketing/User |
| **P0** | Lancement Product Hunt + BetaList + IndieHackers | Notoriété | Boost initial + backlinks DR 80+ | Élevé | Moyen (préparation) | Très élevé | Mentions, backlinks | Marketing/User |
| **P1** | Page `/avis-clients/` + 5 témoignages écrits + 1 vidéo | Conversion | Levée objection majeure | Très élevé | Moyen (dépend obtention témoignages) | Très élevé | Conv. rate page produit | Sales + Dev |
| **P1** | Page `/cas-clients/` + 3 études détaillées | Conversion | Crédibilité PME segment | Élevé | Moyen | Élevé | Time on page, démos | Sales + Marketing |
| **P1** | Vidéo démo 60-90s en hero homepage | UX/CRO | Comprendre l'offre en 5s | Très élevé | Moyen (production) | Très élevé | Bounce rate, conv. | Marketing + Dev |
| **P1** | Trust badges visibles homepage ("Vu sur...", logos) | CRO | Réassurance premier contact | Élevé | Faible | Élevé | Conv. homepage | Dev (dès assets) |
| **P1** | Formulaire bêta inline (remplacer iframe Fillout) | CRO | -30-50% friction conversion | Très élevé | Moyen (form + backend) | Très élevé | Form start → submit | Dev |
| **P1** | GA4 + Web Vitals + tracking événements custom | Tracking | Pilotage data-driven | Élevé | Faible (2h) | Élevé | Toutes métriques | Dev |
| **P1** | Index `/guides/` (hub navigationnel des 7 guides) | SEO contenu | Découvrabilité guides GEO | Moyen | Faible (2h) | Moyen | Pages/session | Dev |
| **P2** | Pages /solutions/X/ par segment (bureaux, fin chantier, vitres) | SEO | Capture niches | Moyen | Moyen | Moyen | Trafic niches | Dev/Marketing |
| **P2** | Article "Reprise société nettoyage" + cession | Contenu | Niche peu adressée | Moyen | Moyen | Moyen | Trafic | Marketing |
| **P2** | Bouton WhatsApp / chat flottant | CRO | Capture TPE oraux | Moyen | Faible | Moyen | Messages reçus | Dev |
| **P2** | Screenshots produit sur pages fonctionnalités | UX | Démontrer concrètement | Élevé | Moyen (assets) | Élevé | Time on page | Design + Dev |
| **P2** | A/B test "Bêta" vs "Audit gratuit" CTA principal | CRO | Optimisation conversion | Moyen | Faible (setup) | Moyen-Élevé | Conv. rate | Marketing |
| **P2** | OG images dynamiques par page | SEO/Social | CTR partage social | Faible | Moyen | Faible | Shares LinkedIn | Dev |
| **P3** | Inscription FEP + presse spécialisée propreté | Backlinks | Autorité sectorielle | Moyen | Moyen (relations) | Moyen | Backlinks DR 40-70 | Marketing |
| **P3** | Production baromètre propreté B2B 2026 | Contenu / PR | Linkable asset majeur | Très élevé long terme | Élevé (150h) | Très élevé | Backlinks naturels, citations presse | Marketing |
| **P3** | Page presse / kit média | PR | Faciliter mentions | Faible | Faible | Moyen | Citations | Dev + Marketing |
| **P3** | Programme parrainage clients existants | Acquisition | Bouche-à-oreille structuré | Moyen | Moyen | Moyen | Referrals | Sales |
| **P3** | Vidéo court LinkedIn fondateur (1/semaine) | Notoriété | Brand awareness sectoriel | Moyen | Régulier | Moyen long terme | Followers, mentions | Founder |

---

## 11. ROADMAP OPÉRATIONNELLE

### Phase 1 — 7 jours (Quick wins)

| Tâche | Objectif | Priorité | Résultat attendu | KPI |
|---|---|---|---|---|
| Indexation manuelle GSC | Activer la visibilité du travail SEO | P0 | 30+ pages dans index sous 14j | Pages indexées GSC |
| `npm run seo:indexnow` | Notifier Bing/Yandex | P0 | Crawl accéléré | Hits Bing |
| Inscription Capterra/G2/GetApp/Société.com | DA premiers backlinks | P0 | 4 backlinks DR 70-92 | DR Ahrefs, backlinks |
| GA4 + Web Vitals | Tracking opérationnel | P1 | Dashboard pilotage | Métriques GA4 |
| Trust badges homepage | Réassurance | P1 | Conv. homepage +10% | Conv. rate |
| Index `/guides/` créé | Hub découvrabilité | P1 | Pages/session +5% | Pages/session |

### Phase 2 — 30 jours (Acquisition structurée)

| Tâche | Objectif | Priorité | Résultat attendu | KPI |
|---|---|---|---|---|
| Page `/avis-clients/` + 5 témoignages | Preuve sociale | P1 | Conv. +20-30% | Conv. produit |
| Page `/cas-clients/` + 3 études | Crédibilité PME | P1 | Démos +20% | Form starts |
| Vidéo démo homepage | Comprendre offre 5s | P1 | Bounce -15%, conv. +25% | Bounce, conv. |
| Formulaire bêta inline | -friction conversion | P1 | Form submits +30-50% | Submits |
| Lancement Product Hunt + BetaList | Boost initial | P0 | 50-150 inscrits bêta sous 7j | Inscriptions |
| Screenshots produit fonctionnalités | Démonstration | P2 | Time on page +30% | TOP |
| WhatsApp flottant | Capture TPE | P2 | Messages reçus | Volume chat |
| A/B test CTA principal | Optimisation conv. | P2 | Test concluant à 95% confidence | Conv. |
| Pages `/solutions/X/` (bureaux, fin chantier) | SEO niches | P2 | Premier ranking sous 60j | Trafic niches |

### Phase 3 — 90 jours (Domination de niche)

| Tâche | Objectif | Priorité | Résultat attendu | KPI |
|---|---|---|---|---|
| Inscription FEP + presse spécialisée | Autorité sectorielle | P3 | 5-10 backlinks DR 40-70 | Backlinks |
| Tier 2/3 outreach (cf. `docs/seo/OUTREACH-50-CIBLES.md`) | Backlinks volume | P2 | 20-30 backlinks total | Backlinks |
| Production baromètre propreté B2B 2026 | Linkable asset | P3 | 10-30 backlinks naturels | Backlinks, citations presse |
| Programme parrainage clients | Bouche-à-oreille | P3 | 10-20% acquisition par referral | Referrals |
| Vidéo LinkedIn hebdo fondateur | Brand awareness | P3 | 1000+ followers, 5+ posts viraux | Followers, reach |
| Pages /solutions/ niches restantes | SEO niches | P3 | Top 10 sur niches | Trafic |
| Article "Reprise société nettoyage" + cession | Niche | P2 | Capture marché reprise | Trafic article |
| Comparatif large multi-acteurs | Trafic comparaison | P2 | Capture trafic indécis | Trafic, conv. |

---

## 12. SYNTHÈSE EXÉCUTIVE FINALE

### 12.1 Les 10 problèmes les plus importants

1. **Pas de preuve sociale visible** (témoignages, logos, presse) — frein conversion n°1
2. **Formulaire bêta externalisé Fillout** — friction conversion ~30-50%
3. **Pas de vidéo démo** — frein compréhension offre
4. **0 backlinks externes encore** — bloque DA/DR donc ranking
5. **Indexation effective des nouvelles pages à vérifier** post-vagues 2-7
6. **Pas de tracking GA4 / Web Vitals** — pilotage à l'aveugle
7. **Pas de screenshots produit visuels** sur pages fonctionnalités
8. **Page presse manquante** — frein PR
9. **Pas de bouton WhatsApp / chat** — perd les hésitants
10. **Maglia.io non couvert** (comparatif + alternative à créer)

### 12.2 Les 10 actions prioritaires

1. Indexation manuelle GSC + IndexNow post-deploy
2. Inscription Capterra + G2 + GetApp + Société.com
3. Page `/avis-clients/` + 5 témoignages écrits
4. Vidéo démo 60-90s en hero homepage
5. Formulaire bêta inline (remplacer Fillout iframe)
6. Trust badges visibles homepage
7. Tracking GA4 + Web Vitals + événements custom
8. Lancement Product Hunt + BetaList
9. Page `/cas-clients/` avec 3 études chiffrées
10. Index `/guides/` (hub navigationnel)

### 12.3 Les 10 pages à créer en priorité

1. `/avis-clients/` (P1)
2. `/cas-clients/` (P1)
3. `/guides/` (index — P1)
4. `/presse/` (kit média — P2)
5. `/solutions/societe-nettoyage-bureaux/` (P2)
6. `/solutions/nettoyage-fin-chantier/` (P2)
7. `/solutions/nettoyage-vitres/` (P3)
8. `/comparatif/proprely-vs-maglia/` (P2 — après analyse)
9. `/alternative-maglia/` (P2)
10. `/blog/reprise-societe-nettoyage-checklist/` (P2)

### 12.4 Les 10 contenus SEO/GEO à produire

1. Article "Reprise société nettoyage : check-list complète 2026"
2. Article "Tarif horaire ménage bureaux 2026 par zone"
3. Article "Comparatif Organilog vs Progiclean vs PROPRET vs Proprely"
4. Article "Marge brute société nettoyage : benchmark sectoriel 2026"
5. Article "Recruter un agent de nettoyage : sources et coût en 2026"
6. Guide GEO "Quels sont les meilleurs logiciels propreté SaaS français ?"
7. Guide GEO "Comment passer d'Excel à un logiciel métier nettoyage ?"
8. Guide GEO "Combien d'agents pour gérer 50 sites de nettoyage ?"
9. Article "Indemnité d'éducation enfant agent propreté 2026" (peu de concurrents)
10. Article "Article 7 IDCC 3043 : exemple concret transfert agents"

### 12.5 Les 10 améliorations UX/UI immédiates

1. Vidéo démo en hero homepage
2. Section "Ils nous font confiance" avec logos clients
3. Trust badges "Vu sur..." (presse, FEP)
4. Formulaire bêta inline (vs iframe Fillout)
5. Screenshots produit annotés sur fonctionnalités
6. Témoignage card en haut de chaque page produit
7. Verdict visuel en haut des pages comparatif (scoring)
8. Bouton WhatsApp / chat flottant
9. CTAs cohérents : harmoniser "Bêta" vs "Audit gratuit"
10. Sticky CTA après résultat des calculateurs

### 12.6 Les 10 prompts IA prioritaires (les couvrir parfaitement)

1. "Quel est le meilleur logiciel pour gérer une société de nettoyage ?" → `/guides/quel-logiciel-societe-nettoyage/`
2. "Alternative à Organilog ?" → `/guides/alternative-simple-organilog/`
3. "Combien coûte un logiciel de nettoyage ?" → `/guides/prix-logiciel-societe-nettoyage/`
4. "Comment fonctionne un logiciel de nettoyage ?" → `/guides/comment-fonctionne-logiciel-nettoyage/`
5. "Comment digitaliser une entreprise de propreté ?" → `/blog/digitaliser-entreprise-nettoyage-5-etapes/`
6. "Quel SaaS français pour société de nettoyage ?" → `/guides/saas-societe-nettoyage-france/`
7. "Convention collective propreté IDCC 3043 2026" → `/blog/convention-collective-nettoyage-idcc-3043/`
8. "Comment fixer ses prix dans le nettoyage ?" → `/blog/fixer-prix-nettoyage/`
9. "12 KPI à suivre dans une société de nettoyage" → `/blog/kpi-societe-nettoyage-2026/`
10. "Comment créer une société de nettoyage en 2026 ?" → `/blog/creer-societe-nettoyage/`

### 12.7 Nouveau positionnement recommandé

> **"Le cockpit qui rend 8 heures par semaine et 3 points de marge aux dirigeants de société de nettoyage B2B."**

Sous-titre :
> Planning, devis IA, agents, preuve de passage, marge par client : tout dans un seul écran mobile-first. Conçu en France pour les TPE/PME 3-50 agents. **Bêta privée gratuite — 30 places fondateurs**, tarif fondateur à vie.

CTAs principaux :
- Primaire : **"Demander mon audit gratuit (30 min)"**
- Secondaire : **"Voir la démo 90 secondes"**

### 12.8 Nouvelle structure homepage recommandée

```
1. HERO
   - H1 promesse (8h + 3 pts marge)
   - Sous-titre
   - 2 CTAs (Audit + Vidéo démo)
   - Vidéo 60-90s en arrière-plan ou côte à côte

2. TRUST BADGES IMMÉDIATS
   - "Vu sur Frenchweb / Maddyness / FEP / Le Monde de la Propreté"
   - Logos 6-8 clients bêta
   - Badge G2/Capterra (dès obtenu)

3. PROBLÈME EN 3 POINTS VISUELS
   - "Vous perdez 6-10 h/semaine en admin dispersée"
   - "Vous ne savez pas quels clients sont vraiment rentables"
   - "Vos meilleurs agents partent sans prévenir"

4. SOLUTION EN 3 ÉTAPES (1 → 2 → 3)
   - Visuels avec captures produit

5. 4 FONCTIONNALITÉS CLÉS AVEC SCREENSHOTS
   - Planning, Devis IA, Preuve passage, Marge client
   - Captures écran annotées

6. TÉMOIGNAGES CARROUSEL (3-5)
   - Photo + nom + société + quote
   - 1 vidéo idéalement

7. COMPARATIF SYNTHÉTIQUE vs Excel / Concurrents
   - Lien vers `/comparatif-logiciel-nettoyage/`

8. BÊTA FONDATEUR (sticky)
   - Compteur places restantes
   - Formulaire inline (email + société)

9. FAQ TOP 6 (avec schema)

10. CTA FINAL
    - "Demander mon audit gratuit"
```

### 12.9 Nouvelle architecture sitemap recommandée

Voir section **2.3** — l'architecture actuelle est déjà excellente, ajouts mineurs : `/guides/` index + `/avis-clients/` + `/cas-clients/` + `/presse/` + 3-4 pages `/solutions/X/` segments.

### 12.10 Checklist opérationnelle finale

#### Côté code (codable — vague 8 potentielle)
- [ ] Créer page `/avis-clients/` (data + composant)
- [ ] Créer page `/cas-clients/` (data + composant)
- [ ] Créer page `/presse/` (kit média)
- [ ] Créer index `/guides/` (hub des 7 guides)
- [ ] Intégrer vidéo démo en homepage (placeholder ou production)
- [ ] Remplacer iframe Fillout par formulaire inline simple
- [ ] Ajouter trust badges section homepage
- [ ] Ajouter bouton WhatsApp flottant (composant `<StickyCTAMobile>` existe — étendre)
- [ ] Ajouter GA4 + Web Vitals + tracking custom
- [ ] Setup A/B test framework (Vercel Edge Config ou similaire)
- [ ] Pages `/solutions/societe-nettoyage-bureaux/`, `/nettoyage-fin-chantier/`, `/nettoyage-vitres/`
- [ ] Comparatif + alternative Maglia (post-analyse)
- [ ] OG images dynamiques par page (étendre `scripts/generate-assets.mjs`)

#### Côté contenu (rédaction)
- [ ] 5 témoignages clients écrits (formats varié)
- [ ] 1 vidéo témoignage (production simple)
- [ ] 3 cas clients chiffrés (avant/après)
- [ ] Vidéo démo produit 60-90s
- [ ] 10 articles SEO additionnels (cf. liste section 12.4)
- [ ] Kit presse (logos, screenshots HD, bio fondateur, faits)

#### Côté externe (non codable, action utilisateur)
- [ ] Indexation manuelle GSC des 30+ nouvelles pages
- [ ] `npm run seo:indexnow` après chaque deploy
- [ ] Inscription Capterra + G2 + GetApp + Software Advice
- [ ] Inscription Société.com (fiche entreprise)
- [ ] Lancement Product Hunt (préparation 2-3 semaines)
- [ ] Lancement BetaList + IndieHackers
- [ ] Inscription FEP (Fédération Entreprises Propreté)
- [ ] Pitch presse spécialisée (Propreté Magazine, L'Entreprise de Propreté)
- [ ] Profils LinkedIn fondateur + page entreprise actifs
- [ ] Tier 1-3 outreach selon `docs/seo/OUTREACH-50-CIBLES.md`
- [ ] Monitoring GSC mensuel (CTR, positions, indexations)

---

## 📌 Méthodologie

Cet audit s'appuie sur :
- Analyse directe du repository (96 URLs sitemap, 100 pages prerendues)
- Connaissance détaillée acquise lors des 7 vagues SEO précédentes (PRs #36 à #42)
- Standards SEO 2026 (Core Web Vitals, E-E-A-T, GEO/AEO)
- Recherche concurrentielle (Propret, Organilog, Progiclean, Maglia — section à compléter)
- Patterns CRO B2B SaaS éprouvés

**Documents complémentaires** :
- `docs/seo/OUTREACH-50-CIBLES.md` — Liste 50 cibles backlinks priorisées
- `docs/seo/BAROMETRE-PROPRETE-B2B-2026.md` — Brief linkable asset
- `AUDIT-SEO.md` — Audit GSC initial (juin 2026)

---

*Audit produit en juin 2026 après 7 vagues d'optimisation SEO complétées (PRs #36 à #42 mergées). État du site : 96 URLs sitemap, 100 pages prerendues, 33 articles blog, mega-menu nav SEO actif, canonical anti-cannibalisation en place.*
