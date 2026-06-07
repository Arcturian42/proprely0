# 📂 SEO — Documentation & assets de pilotage

Documents produits par la stratégie SEO Proprely.

## Fichiers

- **OUTREACH-50-CIBLES.md** — Liste de 50 cibles pour link building (Tier 1 à 6) avec contacts, statuts et templates d'emails. À tenir à jour dans une Google Sheet en parallèle.
- **BAROMETRE-PROPRETE-B2B-2026.md** — Brief complet pour produire le baromètre annuel du marché propreté B2B (linkable asset majeur). Plan, sources de data, stratégie de diffusion.

## Ressources externes

- Audit SEO complet : voir `/AUDIT-SEO.md` à la racine du repo
- Tracking GSC : https://search.google.com/search-console
- Sitemap : https://proprely.fr/sitemap.xml
- IndexNow : `npm run seo:indexnow` (après chaque déploiement contentful)

## Workflow recommandé

1. **Hebdo** : check GSC → ajuster titles si CTR faible
2. **Hebdo** : 5-10 contacts outreach (cf. OUTREACH-50-CIBLES.md)
3. **Mensuel** : revue topical authority (clusters, articles)
4. **Trimestriel** : mise à jour du baromètre + relance presse
5. **Après chaque deploy** : `npm run seo:indexnow`
