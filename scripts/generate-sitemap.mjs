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

const urls = [
  { loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${ORIGIN}/tarifs`, priority: '0.9', changefreq: 'monthly' },
  { loc: `${ORIGIN}/calculateur-roi`, priority: '0.8', changefreq: 'monthly' },
  { loc: `${ORIGIN}/blog`, priority: '0.7', changefreq: 'weekly' },
  ...featureSlugs.map((slug) => ({ loc: `${ORIGIN}/fonctionnalites/${slug}`, priority: '0.8', changefreq: 'monthly' })),
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
console.log(`✓ sitemap.xml regenerated (${urls.length} URLs : 4 core + ${featureSlugs.length} features + ${blogSlugs.length} blog)`)
