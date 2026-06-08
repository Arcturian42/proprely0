// Génération d'OG images dynamiques au build-time.
// Une image par article de blog avec titre + tag + branding.
// Utilise @resvg/resvg-js (déjà en deps) + SVG inline avec system fonts.

import { Resvg } from '@resvg/resvg-js'
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const publicDir = resolve(root, 'public')
const ogDir = resolve(publicDir, 'og')

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true })

const BRAND_BLUE = '#2563EB'
const BRAND_DARK = '#1E3A8A'
const BRAND_SKY = '#38BDF8'

// ─── Helpers ──────────────────────────────────────────────────────────

/** Échappe les caractères XML sensibles dans une chaîne pour SVG */
function xmlEscape(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Coupe un titre en N lignes max selon une largeur max approximative */
function wrapTitle(title, maxCharsPerLine = 28, maxLines = 4) {
  const words = title.split(' ')
  const lines = []
  let current = ''
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + w).trim()
    } else {
      if (current) lines.push(current)
      current = w
      if (lines.length >= maxLines) break
    }
  }
  if (current && lines.length < maxLines) lines.push(current)
  if (lines.length > maxLines) lines.length = maxLines
  return lines
}

// ─── Lecture des posts blog ───────────────────────────────────────────

function extractBlogPosts() {
  const content = readFileSync(resolve(root, 'src/data/blog.ts'), 'utf8')
  // Match séquentiel slug → title → tag. Capture les guillemets simples,
  // doubles ou backticks pour title (certains posts utilisent ' ou ").
  // Pour title : on s'appuie sur la forme "    title: 'xxx'," ou "    title: \"xxx\","
  // (indentation 4 espaces typique du tableau posts).
  const slugRe = /^\s*slug:\s*['"`]([^'"`]+)['"`]/gm
  const titleRe = /^\s*title:\s*(['"`])(.+?)\1\s*,?$/gm
  const tagRe = /^\s*tag:\s*['"`]([^'"`]+)['"`]/gm

  const slugs = [...content.matchAll(slugRe)].map((m) => m[1])
  const titles = [...content.matchAll(titleRe)].map((m) => m[2])
  const tags = [...content.matchAll(tagRe)].map((m) => m[1])

  const posts = []
  const len = Math.min(slugs.length, titles.length, tags.length)
  for (let i = 0; i < len; i++) {
    posts.push({ slug: slugs[i], title: titles[i], tag: tags[i] })
  }
  return posts
}

// ─── Template SVG OG par article ──────────────────────────────────────

function articleOgSvg({ title, tag }) {
  const lines = wrapTitle(title, 26, 4)
  const lineHeight = 78
  const startY = 260 - ((lines.length - 1) * lineHeight) / 2

  const titleTexts = lines
    .map(
      (line, i) =>
        `<text x="80" y="${startY + i * lineHeight}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="64" font-weight="900" fill="#0F172A" letter-spacing="-1.5">${xmlEscape(line)}</text>`
    )
    .join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_SKY}"/>
    </linearGradient>
    <linearGradient id="iconG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1100" cy="80" r="180" fill="${BRAND_SKY}" fill-opacity="0.08"/>
  <circle cx="80" cy="550" r="200" fill="${BRAND_BLUE}" fill-opacity="0.06"/>

  <!-- Logo Proprely en haut-gauche -->
  <rect x="80" y="70" width="50" height="50" rx="11" fill="url(#iconG)"/>
  <path d="M 95 84 L 95 116 L 102 116 L 102 105 L 110 105 C 118 105 122 100 122 95 C 122 89 118 84 110 84 Z M 102 91 L 109 91 C 113 91 115 92 115 95 C 115 98 113 99 109 99 L 102 99 Z" fill="#FFFFFF"/>
  <text x="145" y="105" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="900" fill="#0F172A" letter-spacing="-0.5">Proprely</text>

  <!-- Tag badge -->
  <rect x="80" y="160" width="${20 + tag.length * 11}" height="36" rx="18" fill="${BRAND_BLUE}" fill-opacity="0.10"/>
  <text x="${90 + (10 + tag.length * 11) / 2}" y="184" text-anchor="middle" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="16" font-weight="800" fill="${BRAND_BLUE}" letter-spacing="0.5">${xmlEscape(tag.toUpperCase())}</text>

  <!-- Titre -->
  ${titleTexts}

  <!-- Bottom strip -->
  <rect x="80" y="540" width="1040" height="1" fill="#E2E8F0"/>
  <text x="80" y="585" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="22" font-weight="600" fill="#475569">proprely.fr/blog</text>
  <text x="1120" y="585" text-anchor="end" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="20" font-weight="500" fill="#94A3B8">Logiciel société de nettoyage B2B</text>
</svg>`
}

// ─── Template SVG OG générique par page ────────────────────────────────

function pageOgSvg({ title, kicker }) {
  const lines = wrapTitle(title, 24, 4)
  const lineHeight = 80
  const startY = 270 - ((lines.length - 1) * lineHeight) / 2

  const titleTexts = lines
    .map(
      (line, i) =>
        `<text x="80" y="${startY + i * lineHeight}" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="68" font-weight="900" fill="#0F172A" letter-spacing="-1.5">${xmlEscape(line)}</text>`
    )
    .join('\n  ')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <linearGradient id="iconG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1100" cy="80" r="180" fill="${BRAND_SKY}" fill-opacity="0.08"/>
  <circle cx="80" cy="550" r="200" fill="${BRAND_BLUE}" fill-opacity="0.06"/>

  <rect x="80" y="70" width="50" height="50" rx="11" fill="url(#iconG)"/>
  <path d="M 95 84 L 95 116 L 102 116 L 102 105 L 110 105 C 118 105 122 100 122 95 C 122 89 118 84 110 84 Z M 102 91 L 109 91 C 113 91 115 92 115 95 C 115 98 113 99 109 99 L 102 99 Z" fill="#FFFFFF"/>
  <text x="145" y="105" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="28" font-weight="900" fill="#0F172A" letter-spacing="-0.5">Proprely</text>

  <rect x="80" y="160" width="${20 + kicker.length * 11}" height="36" rx="18" fill="${BRAND_BLUE}" fill-opacity="0.10"/>
  <text x="${90 + (10 + kicker.length * 11) / 2}" y="184" text-anchor="middle" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="16" font-weight="800" fill="${BRAND_BLUE}" letter-spacing="0.5">${xmlEscape(kicker.toUpperCase())}</text>

  ${titleTexts}

  <rect x="80" y="540" width="1040" height="1" fill="#E2E8F0"/>
  <text x="80" y="585" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="22" font-weight="600" fill="#475569">proprely.fr</text>
  <text x="1120" y="585" text-anchor="end" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="20" font-weight="500" fill="#94A3B8">Logiciel société de nettoyage B2B</text>
</svg>`
}

// ─── Render ────────────────────────────────────────────────────────────

function render(svg, outName) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: 'system-ui' },
    background: '#FFFFFF',
  })
  const pngData = resvg.render().asPng()
  const path = resolve(ogDir, outName)
  writeFileSync(path, pngData)
}

// ─── Main ──────────────────────────────────────────────────────────────

console.log('Generating dynamic OG images...')

// 1) Articles de blog
const posts = extractBlogPosts()
let blogCount = 0
for (const p of posts) {
  const svg = articleOgSvg({ title: p.title, tag: p.tag })
  render(svg, `blog-${p.slug}.png`)
  blogCount++
}
console.log(`✓ ${blogCount} OG images blog générées dans public/og/`)

// 2) Pages clés (landings principales)
const KEY_PAGES = [
  { slug: 'fonctionnalites', title: 'Le cockpit complet pour piloter votre société de nettoyage', kicker: 'Fonctionnalités' },
  { slug: 'tarifs', title: 'Tarifs Proprely : gratuit pendant la bêta', kicker: 'Tarifs' },
  { slug: 'integrations', title: 'Proprely parle à votre stack : Silae, Pennylane, Qonto, Brevo', kicker: 'Intégrations' },
  { slug: 'cas-clients', title: 'Ils pilotent leur société de nettoyage avec Proprely', kicker: 'Cas clients' },
  { slug: 'securite-rgpd', title: 'Sécurité et conformité RGPD pensées pour la propreté B2B', kicker: 'Sécurité & RGPD' },
  { slug: 'roadmap', title: 'Roadmap publique Proprely — Ce qui arrive', kicker: 'Roadmap' },
  { slug: 'changelog', title: 'Changelog Proprely — Ce qui a été livré', kicker: 'Changelog' },
  { slug: 'auteurs', title: 'Auteurs Proprely — Qui écrit sur le blog', kicker: 'Auteurs' },
  { slug: 'auteurs-paul-munier', title: 'Paul Munier — Business Developer chez Proprely', kicker: 'Auteur' },
  { slug: 'comparatif-logiciel-nettoyage', title: 'Comparatif logiciels nettoyage 2026', kicker: 'Comparatif' },
  { slug: 'logiciel-societe-nettoyage', title: 'Logiciel société de nettoyage B2B : guide complet 2026', kicker: 'Guide' },
  { slug: 'audit-gratuit', title: 'Audit gratuit 30 min avec le fondateur Proprely', kicker: 'Audit' },
]

let pageCount = 0
for (const p of KEY_PAGES) {
  const svg = pageOgSvg({ title: p.title, kicker: p.kicker })
  render(svg, `${p.slug}.png`)
  pageCount++
}
console.log(`✓ ${pageCount} OG images landing générées dans public/og/`)

// 3) Comparatifs : 1 image par comparatif
function extractField(filePath, field) {
  const content = readFileSync(filePath, 'utf8')
  const re = new RegExp(`${field}:\\s*['"\`]([^'"\`]+)['"\`]`, 'g')
  return [...content.matchAll(re)].map((m) => m[1])
}

const comparisonSlugs = extractField(resolve(root, 'src/data/comparisons.ts'), 'slug')
let comparisonCount = 0
for (const slug of comparisonSlugs) {
  const competitor = slug.replace('proprely-vs-', '').replace(/-/g, ' ')
  const Competitor = competitor.charAt(0).toUpperCase() + competitor.slice(1)
  const svg = pageOgSvg({
    title: `Proprely vs ${Competitor} : le comparatif honnête 2026`,
    kicker: 'Comparatif',
  })
  render(svg, `comparatif-${slug}.png`)
  comparisonCount++
}
console.log(`✓ ${comparisonCount} OG images comparatifs générées`)

// 4) Alternatives
const alternativeSlugs = extractField(resolve(root, 'src/data/alternatives.ts'), 'slug')
let alternativeCount = 0
for (const slug of alternativeSlugs) {
  const competitor = slug.replace('alternative-', '').replace(/-/g, ' ')
  const Competitor = competitor.charAt(0).toUpperCase() + competitor.slice(1)
  const svg = pageOgSvg({
    title: `Alternative à ${Competitor} : Proprely en 2026`,
    kicker: 'Alternative',
  })
  render(svg, `${slug}.png`)
  alternativeCount++
}
console.log(`✓ ${alternativeCount} OG images alternatives générées`)

// 5) Villes : 1 image par ville
const citySlugs = extractField(resolve(root, 'src/data/cities.ts'), 'slug')
let cityCount = 0
for (const slug of citySlugs) {
  const City = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
  const svg = pageOgSvg({
    title: `Logiciel société de nettoyage à ${City}`,
    kicker: `Logiciel nettoyage ${City}`,
  })
  render(svg, `villes-${slug}.png`)
  cityCount++
}
console.log(`✓ ${cityCount} OG images villes générées`)

// 6) Fonctionnalités
const featureSlugs = extractField(resolve(root, 'src/data/features.ts'), 'slug')
let featureCount = 0
for (const slug of featureSlugs) {
  const feature = slug.replace(/-/g, ' ')
  const Feature = feature.charAt(0).toUpperCase() + feature.slice(1)
  const svg = pageOgSvg({
    title: `${Feature} : la fonctionnalité Proprely`,
    kicker: 'Fonctionnalité',
  })
  render(svg, `fonctionnalites-${slug}.png`)
  featureCount++
}
console.log(`✓ ${featureCount} OG images fonctionnalités générées`)

// 7) Guides
const guideSlugs = extractField(resolve(root, 'src/data/guides.ts'), 'slug')
let guideCount = 0
for (const slug of guideSlugs) {
  const phrase = slug.replace(/-/g, ' ')
  const Phrase = phrase.charAt(0).toUpperCase() + phrase.slice(1)
  const svg = pageOgSvg({
    title: `${Phrase} — Guide Proprely 2026`,
    kicker: 'Guide',
  })
  render(svg, `guides-${slug}.png`)
  guideCount++
}
console.log(`✓ ${guideCount} OG images guides générées`)

const total = blogCount + pageCount + comparisonCount + alternativeCount + cityCount + featureCount + guideCount
console.log(`\nTotal : ${total} images OG. Place : public/og/`)
