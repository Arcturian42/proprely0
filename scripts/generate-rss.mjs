import { writeFileSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const ORIGIN = 'https://proprely.fr'

const FR_MONTHS = {
  janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3,
  mai: 4, juin: 5, juillet: 6, août: 7, aout: 7,
  septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11,
}

function parseFrenchDate(str) {
  const m = str.toLowerCase().trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/)
  if (!m) return null
  const month = FR_MONTHS[m[2]]
  if (month === undefined) return null
  return new Date(Date.UTC(Number(m[3]), month, Number(m[1])))
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function extractField(content, field) {
  const re = new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`, 'g')
  return [...content.matchAll(re)].map((m) => m[1])
}

const blogContent = readFileSync(resolve(root, 'src/data/blog.ts'), 'utf8')
const slugs = extractField(blogContent, 'slug')
const titles = extractField(blogContent, 'title')
const excerpts = extractField(blogContent, 'excerpt')
const dates = extractField(blogContent, 'date')
const tags = extractField(blogContent, 'tag')

const items = slugs.map((slug, i) => {
  const date = parseFrenchDate(dates[i]) || new Date()
  return {
    slug,
    title: titles[i],
    excerpt: excerpts[i],
    date,
    tag: tags[i],
  }
})

items.sort((a, b) => b.date.getTime() - a.date.getTime())

const lastBuildDate = items[0]?.date.toUTCString() || new Date().toUTCString()

const itemsXml = items
  .map(
    (it) => `    <item>
      <title>${escapeXml(it.title)}</title>
      <link>${ORIGIN}/blog/${it.slug}/</link>
      <guid isPermaLink="true">${ORIGIN}/blog/${it.slug}/</guid>
      <description>${escapeXml(it.excerpt)}</description>
      <category>${escapeXml(it.tag)}</category>
      <pubDate>${it.date.toUTCString()}</pubDate>
    </item>`
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Proprely · Blog</title>
    <link>${ORIGIN}/blog/</link>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage B2B. Productivité, RGPD, outils, prix, fidélisation.</description>
    <language>fr-FR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${itemsXml}
  </channel>
</rss>
`

writeFileSync(resolve(root, 'public/rss.xml'), rss)
console.log(`✓ rss.xml regenerated (${items.length} items)`)
