import { writeFileSync, readFileSync } from 'node:fs'
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

function extractBlogPosts(filePath) {
  const slugs = extractField(filePath, 'slug')
  const dates = extractField(filePath, 'date')
  return slugs.map((slug, i) => ({ slug, lastmod: parseFrenchDate(dates[i]) }))
}

const blogPosts = extractBlogPosts(resolve(root, 'src/data/blog.ts'))
const featureSlugs = extractField(resolve(root, 'src/data/features.ts'), 'slug')

const mostRecentBlog = blogPosts
  .map((p) => p.lastmod)
  .filter(Boolean)
  .sort()
  .reverse()[0]

const today = new Date().toISOString().slice(0, 10)
const buildDate = mostRecentBlog || today

const urls = [
  { loc: `${ORIGIN}/`, priority: '1.0', changefreq: 'weekly', lastmod: buildDate },
  { loc: `${ORIGIN}/tarifs`, priority: '0.9', changefreq: 'monthly', lastmod: today },
  { loc: `${ORIGIN}/calculateur-roi`, priority: '0.8', changefreq: 'monthly', lastmod: today },
  { loc: `${ORIGIN}/blog`, priority: '0.7', changefreq: 'weekly', lastmod: buildDate },
  ...featureSlugs.map((slug) => ({
    loc: `${ORIGIN}/fonctionnalites/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: today,
  })),
  ...blogPosts.map((p) => ({
    loc: `${ORIGIN}/blog/${p.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: p.lastmod || today,
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`✓ sitemap.xml regenerated (${urls.length} URLs : 4 core + ${featureSlugs.length} features + ${blogPosts.length} blog)`)
