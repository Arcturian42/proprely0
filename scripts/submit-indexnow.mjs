/**
 * IndexNow submission script for proprely.fr.
 *
 * Reads public/sitemap.xml, extracts URLs and submits them to IndexNow
 * (api.indexnow.org). Bing relays the notification to Yandex and other
 * IndexNow-compatible search engines.
 *
 * Usage:
 *   - Manual : `npm run seo:indexnow`
 *   - Specific URLs : `node scripts/submit-indexnow.mjs <url1> <url2> ...`
 *   - Bulk from sitemap (no args) : submits everything found in sitemap.xml
 *
 * The script is not wired into `npm run build` by default to avoid spamming
 * IndexNow at every CI build. Run it manually after a meaningful content push,
 * or wire it into a deploy hook (Vercel deploy webhook, etc.).
 */
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const HOST = 'proprely.fr'
const KEY = '592d62742a734c8f8ff208f26d9f7412'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

function extractSitemapUrls() {
  const sitemapPath = resolve(root, 'public/sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.error(`✗ sitemap.xml introuvable à ${sitemapPath}`)
    process.exit(1)
  }
  const xml = readFileSync(sitemapPath, 'utf8')
  const matches = xml.matchAll(/<loc>([^<]+)<\/loc>/g)
  return [...matches].map((m) => m[1].trim()).filter(Boolean)
}

async function submit(urls) {
  if (!urls.length) {
    console.error('✗ Aucune URL à soumettre')
    process.exit(1)
  }
  if (urls.length > 10000) {
    console.error(`✗ Trop d'URLs (${urls.length}), limite IndexNow = 10 000`)
    process.exit(1)
  }

  // Validation : toutes les URLs doivent appartenir au host déclaré
  const invalid = urls.filter((u) => !u.startsWith(`https://${HOST}/`))
  if (invalid.length) {
    console.error(`✗ ${invalid.length} URL(s) hors du host ${HOST} :`)
    invalid.slice(0, 5).forEach((u) => console.error(`   ${u}`))
    process.exit(1)
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  console.log(`→ Soumission de ${urls.length} URL(s) à ${ENDPOINT}`)
  console.log(`   keyLocation : ${KEY_LOCATION}`)

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const body = await res.text()

  if (res.ok || res.status === 202) {
    console.log(`✓ IndexNow OK (HTTP ${res.status})`)
    console.log(`   ${urls.length} URL(s) soumise(s) à Bing (relayé à Yandex et autres moteurs IndexNow)`)
    return
  }

  console.error(`✗ IndexNow ECHEC (HTTP ${res.status})`)
  if (body) console.error(`   Body : ${body.slice(0, 500)}`)
  // Codes IndexNow connus :
  //  200 OK ; 202 Accepted (queued)
  //  400 Bad Request (payload malformé)
  //  403 Forbidden (clé incorrecte ou keyLocation non accessible)
  //  422 Unprocessable (URL hors host)
  //  429 Too Many Requests (rate limit)
  process.exit(1)
}

const cliUrls = process.argv.slice(2)
const urls = cliUrls.length ? cliUrls : extractSitemapUrls()

await submit(urls)
