import { writeFileSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const ORIGIN = 'https://proprely.fr'

const FR_MONTHS = {
  janvier: '01', février: '02', fevrier: '02', mars: '03', avril: '04',
  mai: '05', juin: '06', juillet: '07', août: '08', aout: '08',
  septembre: '09', octobre: '10', novembre: '11', décembre: '12', decembre: '12',
}

function parseFrenchDate(str) {
  if (!str) return null
  const m = str.toLowerCase().trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/)
  if (!m) return null
  const day = m[1].padStart(2, '0')
  const month = FR_MONTHS[m[2]]
  if (!month) return null
  return `${m[3]}-${month}-${day}`
}

function extractField(filePath, field) {
  const content = readFileSync(filePath, 'utf8')
  const re = new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`, 'g')
  return [...content.matchAll(re)].map((m) => m[1])
}

/**
 * Lit blog.ts et croise les `slug` avec la map POST_DATE_MODIFIED pour récupérer
 * la date la plus récente (dateModified si présente, sinon date de publication).
 * Cela permet de pousser au sitemap des `lastmod` à jour pour les articles qui
 * ont été révisés (signal de fraîcheur pour les bots).
 */
function extractBlogPosts(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const slugs = extractField(filePath, 'slug')
  const dates = extractField(filePath, 'date')

  const dateModifiedMap = {}
  const mapMatch = content.match(/const POST_DATE_MODIFIED:[^=]*=\s*\{([\s\S]*?)\n\}/)
  if (mapMatch) {
    const body = mapMatch[1]
    const entryRe = /['"`]([^'"`]+)['"`]\s*:\s*['"`]([^'"`]+)['"`]/g
    let m
    while ((m = entryRe.exec(body)) !== null) {
      dateModifiedMap[m[1]] = m[2]
    }
  }

  return slugs.map((slug, i) => {
    const published = parseFrenchDate(dates[i])
    const modified = parseFrenchDate(dateModifiedMap[slug])
    const lastmod = modified || published
    return { slug, lastmod }
  })
}

const blogPosts = extractBlogPosts(resolve(root, 'src/data/blog.ts'))
const featureSlugs = extractField(resolve(root, 'src/data/features.ts'), 'slug')
const citySlugs = extractField(resolve(root, 'src/data/cities.ts'), 'slug')
const resourceSlugs = extractField(resolve(root, 'src/data/resources.ts'), 'slug')
const comparisonSlugs = extractField(resolve(root, 'src/data/comparisons.ts'), 'slug')
const alternativeSlugs = extractField(resolve(root, 'src/data/alternatives.ts'), 'slug')
const guideSlugs = extractField(resolve(root, 'src/data/guides.ts'), 'slug')

const mostRecentBlog = blogPosts
  .map((p) => p.lastmod)
  .filter(Boolean)
  .sort()
  .reverse()[0]

const today = new Date().toISOString().slice(0, 10)
const buildDate = mostRecentBlog || today

// `lastmod` global de secours (utilisé uniquement si git log indisponible).
// La vraie date par fichier est calculée via gitLastmod() ci-dessous, ce qui
// donne à Google un signal de fraîcheur honnête (Google ignore les lastmod
// non fiables, donc on n'inflate jamais).
const CONTENT_LASTMOD = '2026-05-29'

// Cache des dates git par chemin (1 spawn par fichier = lent à grande échelle).
const gitLastmodCache = new Map()

function gitLastmod(relativePath) {
  if (gitLastmodCache.has(relativePath)) return gitLastmodCache.get(relativePath)
  let date = null
  try {
    // Format ISO court (YYYY-MM-DD), date du dernier commit qui touche le fichier
    const out = execSync(`git log -1 --format=%cs -- "${relativePath}"`, {
      cwd: root,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    if (out && /^\d{4}-\d{2}-\d{2}$/.test(out)) date = out
  } catch {
    /* git indisponible ou hors d'un repo : fallback */
  }
  gitLastmodCache.set(relativePath, date)
  return date
}

// Lastmod par URL : prend la date la plus récente entre le(s) fichier(s) data
// concerné(s) et le composant React qui rend la page. Si rien : CONTENT_LASTMOD.
function lastmodFor(paths) {
  const dates = paths.map((p) => gitLastmod(p)).filter(Boolean)
  if (dates.length === 0) return CONTENT_LASTMOD
  return dates.sort().reverse()[0]
}

const HOME_LM = lastmodFor(['src/pages/Landing.tsx', 'src/sections/Hero.tsx', 'index.html'])
const TARIFS_LM = lastmodFor(['src/pages/Pricing.tsx'])
const ROI_LM = lastmodFor(['src/pages/RoiCalculator.tsx'])
const BLOG_INDEX_LM = lastmodFor(['src/data/blog.ts', 'src/pages/BlogIndex.tsx'])
const CONTACT_LM = lastmodFor(['src/pages/Contact.tsx'])
const FEATURES_INDEX_LM = lastmodFor(['src/data/features.ts', 'src/pages/FeatureIndex.tsx'])
const CITIES_INDEX_LM = lastmodFor(['src/data/cities.ts', 'src/pages/CityIndex.tsx'])
const BETA_LM = lastmodFor(['src/pages/Beta.tsx'])
const RESOURCES_LM = lastmodFor(['src/data/resources.ts', 'src/pages/Resources.tsx'])
const VS_EXCEL_LM = lastmodFor(['src/pages/ProprelyVsExcel.tsx'])
const SIMU_LM = lastmodFor(['src/pages/SimulateurRentabilite.tsx'])
const SOFTWARE_LM = lastmodFor(['src/pages/SoftwareLanding.tsx'])
const COMPARATIF_LM = lastmodFor(['src/data/comparisons.ts', 'src/pages/ComparatifLogiciels.tsx'])
const AUTO_LM = lastmodFor(['src/pages/AutoEntrepreneurLanding.tsx'])
const CRM_LM = lastmodFor(['src/pages/CRMPage.tsx'])
const CONVENTION_LM = lastmodFor(['src/pages/ConventionCollectiveLanding.tsx'])
const MEDICAL_LM = lastmodFor(['src/pages/MedicalBionetLanding.tsx'])
const COPRO_LM = lastmodFor(['src/pages/CoproSyndicLanding.tsx'])
const MOBILE_LM = lastmodFor(['src/pages/MobileAgentLanding.tsx'])
const ABOUT_LM = lastmodFor(['src/pages/AboutPage.tsx'])
const SECU_LM = lastmodFor(['src/pages/SecuriteRGPD.tsx'])
const CAS_LM = lastmodFor(['src/data/caseStudies.ts', 'src/pages/CasClientsPage.tsx'])
const INTEG_LM = lastmodFor(['src/data/integrations.ts', 'src/pages/IntegrationsPage.tsx'])
const AUTHORS_LM = lastmodFor(['src/config.ts', 'src/pages/AuthorIndex.tsx'])
const GLOSS_LM = lastmodFor(['src/data/glossary.ts', 'src/pages/GlossairePage.tsx'])
const PAUL_LM = lastmodFor(['src/config.ts', 'src/pages/AuthorPage.tsx'])
const TOOLS_LM = lastmodFor(['src/pages/ToolsIndex.tsx'])
const PRICE_LM = lastmodFor(['src/pages/PriceCalculator.tsx'])
const AUDIT_LM = lastmodFor(['src/pages/AuditGratuit.tsx'])
const SOLUTION_LM = lastmodFor(['src/pages/SolutionHub.tsx'])
const ALT_LM = lastmodFor(['src/data/alternatives.ts', 'src/pages/AlternativePage.tsx'])
const GUIDE_LM = lastmodFor(['src/data/guides.ts', 'src/pages/GuidePage.tsx'])
const FEATURE_LM = lastmodFor(['src/data/features.ts', 'src/pages/FeaturePage.tsx'])
const CITY_LM = lastmodFor(['src/data/cities.ts', 'src/pages/CityPage.tsx'])

// Image par défaut pour les pages éditoriales (og-image)
const DEFAULT_OG_IMAGE = `${ORIGIN}/og-image.png`

const urls = [
  { loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly', lastmod: HOME_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Proprely — Logiciel de gestion société de nettoyage B2B' },
  { loc: `${ORIGIN}/tarifs`, priority: '0.9', changefreq: 'monthly', lastmod: TARIFS_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Tarifs Proprely' },
  { loc: `${ORIGIN}/calculateur-roi`, priority: '0.8', changefreq: 'monthly', lastmod: ROI_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Calculateur ROI société de nettoyage' },
  { loc: `${ORIGIN}/blog`, priority: '0.8', changefreq: 'weekly', lastmod: BLOG_INDEX_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Blog Proprely · Propreté B2B' },
  { loc: `${ORIGIN}/contact`, priority: '0.5', changefreq: 'yearly', lastmod: CONTACT_LM },
  { loc: `${ORIGIN}/fonctionnalites`, priority: '0.9', changefreq: 'monthly', lastmod: FEATURES_INDEX_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Fonctionnalités Proprely' },
  { loc: `${ORIGIN}/villes`, priority: '0.8', changefreq: 'monthly', lastmod: CITIES_INDEX_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel nettoyage par ville' },
  { loc: `${ORIGIN}/beta`, priority: '0.6', changefreq: 'weekly', lastmod: BETA_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Bêta privée Proprely' },
  { loc: `${ORIGIN}/ressources`, priority: '0.8', changefreq: 'monthly', lastmod: RESOURCES_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Ressources Proprely' },
  { loc: `${ORIGIN}/proprely-vs-excel`, priority: '0.8', changefreq: 'monthly', lastmod: VS_EXCEL_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Proprely vs Excel' },
  { loc: `${ORIGIN}/simulateur-rentabilite`, priority: '0.8', changefreq: 'monthly', lastmod: SIMU_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Simulateur rentabilité' },
  { loc: `${ORIGIN}/logiciel-societe-nettoyage`, priority: '1.0', changefreq: 'weekly', lastmod: SOFTWARE_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel société de nettoyage — guide 2026' },
  { loc: `${ORIGIN}/comparatif-logiciel-nettoyage`, priority: '0.9', changefreq: 'monthly', lastmod: COMPARATIF_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Comparatif logiciels nettoyage 2026' },
  { loc: `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage`, priority: '0.8', changefreq: 'monthly', lastmod: AUTO_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel auto-entrepreneur nettoyage' },
  { loc: `${ORIGIN}/crm-entreprise-proprete`, priority: '0.8', changefreq: 'monthly', lastmod: CRM_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'CRM entreprise propreté' },
  { loc: `${ORIGIN}/convention-collective-nettoyage`, priority: '0.9', changefreq: 'monthly', lastmod: CONVENTION_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel conforme convention collective propreté IDCC 3043' },
  { loc: `${ORIGIN}/logiciel-nettoyage-medical-bionettoyage`, priority: '0.8', changefreq: 'monthly', lastmod: MEDICAL_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel nettoyage médical et bionettoyage' },
  { loc: `${ORIGIN}/logiciel-nettoyage-copropriete-syndic`, priority: '0.8', changefreq: 'monthly', lastmod: COPRO_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Logiciel nettoyage copropriété et syndic' },
  { loc: `${ORIGIN}/application-mobile-agents-nettoyage`, priority: '0.8', changefreq: 'monthly', lastmod: MOBILE_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Application mobile agents nettoyage' },
  { loc: `${ORIGIN}/a-propos`, priority: '0.7', changefreq: 'monthly', lastmod: ABOUT_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'À propos de Proprely' },
  { loc: `${ORIGIN}/securite-rgpd`, priority: '0.7', changefreq: 'monthly', lastmod: SECU_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Sécurité & RGPD Proprely' },
  { loc: `${ORIGIN}/cas-clients`, priority: '0.8', changefreq: 'monthly', lastmod: CAS_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Cas clients Proprely' },
  { loc: `${ORIGIN}/integrations`, priority: '0.8', changefreq: 'monthly', lastmod: INTEG_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Intégrations Proprely' },
  { loc: `${ORIGIN}/auteurs`, priority: '0.6', changefreq: 'monthly', lastmod: AUTHORS_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Auteurs Proprely' },
  { loc: `${ORIGIN}/glossaire`, priority: '0.7', changefreq: 'monthly', lastmod: GLOSS_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Glossaire propreté B2B' },
  { loc: `${ORIGIN}/auteurs/paul-munier`, priority: '0.5', changefreq: 'monthly', lastmod: PAUL_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Paul Munier — Auteur Proprely' },
  { loc: `${ORIGIN}/outils`, priority: '0.9', changefreq: 'monthly', lastmod: TOOLS_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Outils gratuits Proprely' },
  { loc: `${ORIGIN}/calculateur-prix-nettoyage-m2`, priority: '0.9', changefreq: 'monthly', lastmod: PRICE_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Calculateur prix nettoyage bureaux au m²' },
  { loc: `${ORIGIN}/audit-gratuit`, priority: '0.9', changefreq: 'monthly', lastmod: AUDIT_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Audit gratuit société de nettoyage' },
  { loc: `${ORIGIN}/solution`, priority: '0.8', changefreq: 'monthly', lastmod: SOLUTION_LM, image: DEFAULT_OG_IMAGE, imageTitle: 'Solution gestion société de nettoyage B2B 2026' },
  ...alternativeSlugs.map((slug) => ({
    loc: `${ORIGIN}/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: ALT_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Alternative ${slug.replace('alternative-', '')}`,
  })),
  ...guideSlugs.map((slug) => ({
    loc: `${ORIGIN}/guides/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: GUIDE_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Guide : ${slug.replace(/-/g, ' ')}`,
  })),
  ...comparisonSlugs.map((slug) => ({
    loc: `${ORIGIN}/comparatif/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: COMPARATIF_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Comparatif ${slug.replace(/-/g, ' ')}`,
  })),
  ...resourceSlugs
    // Dédoublonnage : /calculateur-roi/ et /simulateur-rentabilite/ existent déjà
    // en pages de premier niveau (URLs canoniques). On retire les variantes
    // /ressources/... pour ne pas diluer le signal (cf. doublons signalés GSC).
    .filter((slug) => slug !== 'calculateur-roi' && slug !== 'simulateur-rentabilite')
    .map((slug) => ({
    loc: `${ORIGIN}/ressources/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: RESOURCES_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Ressource Proprely : ${slug.replace(/-/g, ' ')}`,
  })),
  ...featureSlugs.map((slug) => ({
    loc: `${ORIGIN}/fonctionnalites/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: FEATURE_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Fonctionnalité : ${slug.replace(/-/g, ' ')}`,
  })),
  ...citySlugs.map((slug) => ({
    loc: `${ORIGIN}/villes/${slug}`,
    // Top 3 métropoles (Paris, Lyon, Marseille) à 0.8 — même niveau que les pages
    // produit majeures (comparatif, simulateur). Autres villes à 0.7.
    priority: ['paris', 'lyon', 'marseille'].includes(slug) ? '0.8' : '0.7',
    changefreq: 'monthly',
    lastmod: CITY_LM,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Logiciel nettoyage ${slug.charAt(0).toUpperCase() + slug.slice(1)}`,
  })),
  ...blogPosts.map((p) => ({
    loc: `${ORIGIN}/blog/${p.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.lastmod || CONTENT_LASTMOD,
    image: DEFAULT_OG_IMAGE,
    imageTitle: `Article : ${p.slug.replace(/-/g, ' ')}`,
  })),
  // Pages légales (/mentions-legales, /confidentialite, /cgu) volontairement
  // EXCLUES du sitemap : elles sont en noindex,follow (cf. App.tsx + prerender).
]

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map((u) => {
    // URL canonique AVEC slash final (cohérent avec le serveur et les canonicals).
    const loc = u.loc.endsWith('/') ? u.loc : `${u.loc}/`
    const imageBlock = u.image
      ? `
    <image:image>
      <image:loc>${u.image}</image:loc>
      <image:title>${escapeXml(u.imageTitle || '')}</image:title>
    </image:image>`
      : ''
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${imageBlock}
  </url>`
  })
  .join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)

// Silence unused variable warning
void buildDate

console.log(`✓ sitemap.xml régénéré : ${urls.length} URLs (trailing slash, pages légales noindex exclues, doublons d'outils retirés, namespace image:image)`)
