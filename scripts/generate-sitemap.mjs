import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const ORIGIN = 'https://proprely.fr'

function extractSlugs(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const matches = [...content.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)]
  return matches.map((m) => m[1])
}

const blogSlugs = extractSlugs(resolve(root, 'src/data/blog.ts'))
const featureSlugs = extractSlugs(resolve(root, 'src/data/features.ts'))
const resourceSlugs = extractSlugs(resolve(root, 'src/data/resources.ts'))

const TOOL_RESOURCE_SLUGS = new Set(['calculateur-roi', 'simulateur-rentabilite'])

const urls = [
  { loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${ORIGIN}/beta`, priority: '0.95', changefreq: 'weekly' },
  { loc: `${ORIGIN}/tarifs`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${ORIGIN}/proprely-vs-excel`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${ORIGIN}/ressources`, priority: '0.85', changefreq: 'weekly' },
  { loc: `${ORIGIN}/calculateur-roi`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${ORIGIN}/simulateur-rentabilite`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${ORIGIN}/blog`, priority: '0.7', changefreq: 'weekly' },
  ...featureSlugs.map((slug) => ({ loc: `${ORIGIN}/fonctionnalites/${slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...resourceSlugs
    .filter((slug) => !TOOL_RESOURCE_SLUGS.has(slug))
    .map((slug) => ({ loc: `${ORIGIN}/ressources/${slug}`, priority: '0.75', changefreq: 'monthly' })),
  ...blogSlugs.map((slug) => ({ loc: `${ORIGIN}/blog/${slug}`, priority: '0.6', changefreq: 'monthly' })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
const ressourcePages = resourceSlugs.filter((s) => !TOOL_RESOURCE_SLUGS.has(s)).length
console.log(`✓ sitemap.xml regenerated (${urls.length} URLs : 8 core + ${featureSlugs.length} features + ${ressourcePages} resources + ${blogSlugs.length} blog)`)
