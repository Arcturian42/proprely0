import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { posts, getPost } from '../src/data/blog.ts'
import { getAuthor } from '../src/config.ts'
import { features, getFeature } from '../src/data/features.ts'
import { cities, getCity } from '../src/data/cities.ts'
import { resources } from '../src/data/resources.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const ORIGIN = 'https://proprely.fr'

const FR_MONTHS: Record<string, string> = {
  janvier: '01', février: '02', fevrier: '02', mars: '03', avril: '04',
  mai: '05', juin: '06', juillet: '07', août: '08', aout: '08',
  septembre: '09', octobre: '10', novembre: '11', décembre: '12', decembre: '12',
}

function parseFrenchDate(str: string): string | null {
  const m = str.toLowerCase().trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/)
  if (!m) return null
  const day = m[1].padStart(2, '0')
  const month = FR_MONTHS[m[2]]
  if (!month) return null
  return `${m[3]}-${month}-${day}`
}

const TODAY = new Date().toISOString().slice(0, 10)

const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8')

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(s: string): string {
  return escapeHtml(s)
}

function md2html(content: string): string {
  const lines = content.split('\n')
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      out.push(`<h2>${escapeHtml(line.slice(3))}</h2>`)
      i++
      continue
    }
    if (line.startsWith('### ')) {
      out.push(`<h3>${escapeHtml(line.slice(4))}</h3>`)
      i++
      continue
    }
    // Tableau markdown : ligne d'en-tête | … | suivie d'une ligne séparatrice | --- |
    if (line.trim().startsWith('|') && i + 1 < lines.length && /^\|?[\s:|-]*-[\s:|-]*\|?$/.test(lines[i + 1].trim())) {
      const splitRow = (s: string) => s.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim())
      const header = splitRow(line)
      i += 2
      const bodyRows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        bodyRows.push(splitRow(lines[i]))
        i++
      }
      const thead = '<thead><tr>' + header.map((h) => `<th>${renderInline(h)}</th>`).join('') + '</tr></thead>'
      const tbody = '<tbody>' + bodyRows.map((r) => '<tr>' + r.map((c) => `<td>${renderInline(c)}</td>`).join('') + '</tr>').join('') + '</tbody>'
      out.push(`<table>${thead}${tbody}</table>`)
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      out.push('<ul>' + items.map((t) => `<li>${renderInline(t)}</li>`).join('') + '</ul>')
      continue
    }
    if (line.trim() === '') {
      i++
      continue
    }
    out.push(`<p>${renderInline(line)}</p>`)
    i++
  }
  return out.join('\n')
}

function renderInline(text: string): string {
  let s = escapeHtml(text)
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  return s
}

type PageMeta = {
  url: string
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  schemas: object[]
  bodyHtml: string
  robots?: string
}

function buildHtml(meta: PageMeta): string {
  // URL canonique AVEC slash final : c'est l'URL réellement servie par le
  // serveur (Apache DirectorySlash / Vercel trailingSlash) et celle déclarée
  // dans le sitemap. Évite les statuts "Page with redirect" dans GSC.
  const canonical = `${ORIGIN}${meta.url}${meta.url.endsWith('/') ? '' : '/'}`
  const ogTitle = meta.ogTitle ?? meta.title
  const ogDesc = meta.ogDescription ?? meta.description
  const schemaScript = `<script type="application/ld+json">${JSON.stringify(meta.schemas)}</script>`

  let html = baseHtml

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  )
  if (meta.robots) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<meta name="robots" content="${escapeAttr(meta.robots)}" />\n    <link rel="canonical" href="${escapeAttr(canonical)}" />`
    )
  } else {
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeAttr(canonical)}" />`
    )
  }
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`
  )
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttr(ogTitle)}" />`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttr(ogDesc)}" />`
  )
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(ogTitle)}" />`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeAttr(ogDesc)}" />`
  )

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript)

  html = html.replace(
    /<div class="seo-fallback" aria-hidden="true">[\s\S]*?<\/div>/,
    `<div class="seo-fallback" aria-hidden="true">${meta.bodyHtml}</div>`
  )

  return html
}

function writePage(routePath: string, html: string) {
  const cleanPath = routePath === '/' ? '' : routePath.replace(/^\//, '').replace(/\/$/, '')
  const targetDir = cleanPath ? resolve(distDir, cleanPath) : distDir
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true })
  const targetFile = resolve(targetDir, 'index.html')
  writeFileSync(targetFile, html)
}

function blogPostingSchema(p: typeof posts[number] & { tldr?: string; authorSlug?: string }) {
  const url = `${ORIGIN}/blog/${p.slug}/`
  const datePublished = parseFrenchDate(p.date) || p.date
  const dateModified = p.dateModified ? (parseFrenchDate(p.dateModified) || p.dateModified) : datePublished
  const wordCount = p.content.split(/\s+/).filter(Boolean).length
  const minutes = p.readTime.match(/(\d+)/)?.[1]
  const author = getAuthor(p.authorSlug)
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url,
    datePublished,
    dateModified,
    image: `${ORIGIN}/og-image.png`,
    author: {
      '@type': 'Person',
      '@id': `${ORIGIN}/auteur/${author.slug}#person`,
      name: author.name,
      url: author.linkedin,
      jobTitle: author.jobTitle,
      sameAs: [author.linkedin],
      worksFor: { '@id': `${ORIGIN}/#organization` },
      knowsAbout: author.knowsAbout,
    },
    publisher: {
      '@id': `${ORIGIN}/#organization`,
      '@type': 'Organization',
      name: 'Proprely',
      logo: { '@type': 'ImageObject', url: `${ORIGIN}/proprely-icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'fr-FR',
    articleSection: p.tag,
    wordCount,
  }
  if (minutes) schema.timeRequired = `PT${minutes}M`
  if (p.tldr) {
    schema.abstract = p.tldr
  }
  return schema
}

function howToSchema(h: NonNullable<typeof posts[number]['howTo']>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: h.name,
    description: h.description,
    inLanguage: 'fr-FR',
    step: h.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function webpageSchema(title: string, description: string, url: string, crumbs: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'fr-FR',
    datePublished: '2026-01-01',
    dateModified: TODAY,
    isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  }
}

const generated: string[] = []

for (const rawPost of posts) {
  // getPost() injecte le TL;DR depuis POST_TLDR et dateModified depuis
  // POST_DATE_MODIFIED si présents.
  const p = getPost(rawPost.slug) ?? rawPost
  const url = `/blog/${p.slug}`
  const summaryHtml = p.quickSummary.map((s) => `<li>${escapeHtml(s)}</li>`).join('')
  const faqHtml = (p.faq || [])
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')
  const tldrHtml = p.tldr
    ? `<aside><p><strong>Réponse-flash :</strong> ${escapeHtml(p.tldr)}</p></aside>`
    : ''
  const relatedSlugs = p.relatedSlugs?.length
    ? p.relatedSlugs
    : posts.filter((q) => q.slug !== p.slug && q.tag === p.tag).slice(0, 3).map((q) => q.slug)
  const relatedPosts = relatedSlugs
    .map((s) => posts.find((q) => q.slug === s))
    .filter((q): q is NonNullable<typeof q> => Boolean(q))
    .slice(0, 4)
  const relatedHtml = relatedPosts.length
    ? `<aside><h2>À lire aussi</h2><ul>${relatedPosts
        .map(
          (q) =>
            `<li><a href="${ORIGIN}/blog/${q.slug}"><strong>${escapeHtml(q.title)}</strong></a> — ${escapeHtml(q.excerpt)}</li>`,
        )
        .join('')}</ul></aside>`
    : ''

  const publishedIso = parseFrenchDate(p.date) || ''
  const modifiedIso = p.dateModified ? (parseFrenchDate(p.dateModified) || '') : ''
  const publishedTime = publishedIso
    ? `<time datetime="${escapeAttr(publishedIso)}">${escapeHtml(p.date)}</time>`
    : escapeHtml(p.date)
  const dateModifiedDisplay = p.dateModified && p.dateModified !== p.date
    ? ` · Mis à jour le ${modifiedIso ? `<time datetime="${escapeAttr(modifiedIso)}">${escapeHtml(p.dateModified)}</time>` : escapeHtml(p.dateModified)}`
    : ''
  const postAuthor = getAuthor(p.authorSlug)
  const bodyHtml = `
    <h1>${escapeHtml(p.title)}</h1>
    <p>${escapeHtml(p.excerpt)}</p>
    <p>Publié le ${publishedTime} · ${escapeHtml(p.readTime)} · ${escapeHtml(p.tag)}${dateModifiedDisplay}</p>
    <p>Par <a href="${escapeAttr(postAuthor.linkedin)}" rel="author noopener noreferrer" target="_blank">${escapeHtml(postAuthor.name)}</a>, ${escapeHtml(postAuthor.jobTitle)}</p>
    ${tldrHtml}
    <h2>L'essentiel</h2>
    <ul>${summaryHtml}</ul>
    ${md2html(p.content)}
    ${faqHtml ? `<h2>Questions fréquentes</h2>${faqHtml}` : ''}
    ${relatedHtml}
  `.trim()

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
      { '@type': 'ListItem', position: 3, name: p.title, item: `${ORIGIN}${url}` },
    ],
  }
  const schemas: object[] = [blogPostingSchema(p), breadcrumbs]
  if (p.faq?.length) schemas.push(faqSchema(p.faq))
  if (p.howTo) schemas.push(howToSchema(p.howTo))

  const html = buildHtml({
    url,
    title: `${p.title} · Proprely`,
    description: p.excerpt,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

for (const rawFeature of features) {
  // getFeature() injecte howTo depuis FEATURE_HOWTO si présent.
  const f = getFeature(rawFeature.slug) ?? rawFeature
  const url = `/fonctionnalites/${f.slug}`
  const benefitsHtml = f.benefits
    .map((b) => `<li><strong>${escapeHtml(b.title)}</strong> — ${escapeHtml(b.desc)}</li>`)
    .join('')
  const useCasesHtml = f.useCases
    .map((u) => `<li><strong>${escapeHtml(u.client)}</strong> — ${escapeHtml(u.situation)} · ${escapeHtml(u.benefit)}</li>`)
    .join('')
  const faqHtml = f.faq
    .map((q) => `<h3>${escapeHtml(q.q)}</h3><p>${escapeHtml(q.a)}</p>`)
    .join('')
  const howToHtml = f.howTo
    ? `<h2>Comment utiliser ${escapeHtml(f.tag.toLowerCase())} : ${escapeHtml(f.howTo.name)}</h2>
       <p>${escapeHtml(f.howTo.description)}</p>
       <ol>${f.howTo.steps
         .map((s) => `<li><strong>${escapeHtml(s.name)}</strong> — ${escapeHtml(s.text)}</li>`)
         .join('')}</ol>`
    : ''

  const bodyHtml = `
    <h1>${escapeHtml(f.title)}</h1>
    <p>${escapeHtml(f.subtitle)}</p>
    <h2>${escapeHtml(f.problemTitle)}</h2>
    <p>${escapeHtml(f.problemDescription)}</p>
    <ul>${f.problemBullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
    <h2>${escapeHtml(f.solutionTitle)}</h2>
    <p>${escapeHtml(f.solutionDescription)}</p>
    <h2>Bénéfices</h2>
    <ul>${benefitsHtml}</ul>
    <h2>Cas d'usage</h2>
    <ul>${useCasesHtml}</ul>
    ${howToHtml}
    <h2>Questions fréquentes</h2>
    ${faqHtml}
  `.trim()

  const schemas: object[] = [
    webpageSchema(f.title, f.metaDescription, `${ORIGIN}${url}`, [
      { name: 'Accueil', item: `${ORIGIN}/` },
      { name: 'Fonctionnalités', item: `${ORIGIN}/fonctionnalites` },
      { name: f.tag, item: `${ORIGIN}${url}` },
    ]),
  ]
  if (f.faq.length) schemas.push(faqSchema(f.faq))
  if (f.howTo) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: f.howTo.name,
      description: f.howTo.description,
      inLanguage: 'fr-FR',
      step: f.howTo.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    })
  }

  const html = buildHtml({
    url,
    title: `${f.title} · Proprely`,
    description: f.metaDescription,
    ogTitle: f.title,
    ogDescription: f.metaDescription,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

for (const rawCity of cities) {
  // getCity() injecte relatedBlogSlugs et relatedFeatureSlugs depuis CITY_RELATIONS.
  const c = getCity(rawCity.slug) ?? rawCity
  const url = `/villes/${c.slug}`
  const marketBulletsHtml = c.marketBullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')
  const clientTypesHtml = c.clientTypes
    .map((ct) => `<li><strong>${escapeHtml(ct.type)}</strong> — ${escapeHtml(ct.description)}</li>`)
    .join('')
  const challengesHtml = c.challenges
    .map((ch) => `<h3>${escapeHtml(ch.title)}</h3><p>${escapeHtml(ch.description)}</p>`)
    .join('')
  const fitHtml = c.proprelyFit
    .map((f) => `<h3>${escapeHtml(f.title)}</h3><p>${escapeHtml(f.description)}</p>`)
    .join('')
  const faqHtml = c.faq
    .map((q) => `<h3>${escapeHtml(q.q)}</h3><p>${escapeHtml(q.a)}</p>`)
    .join('')

  const relatedFeatures = (c.relatedFeatureSlugs ?? [])
    .map((s) => getFeature(s))
    .filter((f): f is NonNullable<ReturnType<typeof getFeature>> => Boolean(f))
  const relatedPosts = (c.relatedBlogSlugs ?? [])
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<ReturnType<typeof getPost>> => Boolean(p))

  const relatedFeaturesHtml = relatedFeatures.length
    ? `
    <h2>Fonctionnalités Proprely utiles à ${escapeHtml(c.city)}</h2>
    <ul>
      ${relatedFeatures
        .map(
          (f) =>
            `<li><a href="${ORIGIN}/fonctionnalites/${f.slug}"><strong>${escapeHtml(f.title)}</strong></a> — ${escapeHtml(f.subtitle)}</li>`,
        )
        .join('')}
    </ul>`
    : ''
  const relatedPostsHtml = relatedPosts.length
    ? `
    <h2>À lire pour gérer votre société de nettoyage à ${escapeHtml(c.city)}</h2>
    <ul>
      ${relatedPosts
        .map(
          (p) =>
            `<li><a href="${ORIGIN}/blog/${p.slug}"><strong>${escapeHtml(p.title)}</strong></a> — ${escapeHtml(p.excerpt)}</li>`,
        )
        .join('')}
    </ul>`
    : ''

  const neighborhoodsHtml = c.neighborhoods?.length
    ? `
    <h2>Quartiers d'affaires et zones tertiaires à ${escapeHtml(c.city)}</h2>
    <p>Les zones où se concentre la demande propreté B2B et leurs spécificités opérationnelles.</p>
    <ul>${c.neighborhoods
      .map((n) => `<li><strong>${escapeHtml(n.name)}</strong> — ${escapeHtml(n.description)}</li>`)
      .join('')}</ul>`
    : ''
  const pricingHtml = c.marketPricing
    ? `
    <h2>Prix de marché propreté à ${escapeHtml(c.city)} en 2026</h2>
    <p><strong>Tarif bureaux :</strong> ${escapeHtml(c.marketPricing.range)}. ${escapeHtml(c.marketPricing.note)}</p>
    <p>Pour calibrer votre tarification au m², consultez le <a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026">guide complet du tarif nettoyage bureaux 2026</a>.</p>`
    : ''

  const bodyHtml = `
    <h1>${escapeHtml(c.title)}</h1>
    <p>${escapeHtml(c.subtitle)}</p>
    <h2>Le marché de la propreté B2B à ${escapeHtml(c.city)}</h2>
    <p>${escapeHtml(c.marketIntro)}</p>
    <ul>${marketBulletsHtml}</ul>
    ${neighborhoodsHtml}
    ${pricingHtml}
    <h2>Vos clients types à ${escapeHtml(c.city)}</h2>
    <ul>${clientTypesHtml}</ul>
    <h2>Les défis spécifiques à ${escapeHtml(c.city)}</h2>
    ${challengesHtml}
    <h2>Comment Proprely répond aux contraintes de ${escapeHtml(c.city)}</h2>
    ${fitHtml}
    ${relatedFeaturesHtml}
    ${relatedPostsHtml}
    <h2>Questions fréquentes sur ${escapeHtml(c.city)}</h2>
    ${faqHtml}
  `.trim()

  const cityUrl = `${ORIGIN}${url}`
  const cityAreaServed: Record<string, unknown> = {
    '@type': 'City',
    name: c.city,
    containedInPlace: { '@type': 'AdministrativeArea', name: c.region },
  }
  if (c.wikidata) {
    cityAreaServed.sameAs = c.wikidata
  }
  const localBusinessSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${cityUrl}#localbusiness`,
    name: `Proprely — logiciel société de nettoyage à ${c.city}`,
    description: c.metaDescription,
    url: cityUrl,
    image: `${ORIGIN}/og-image.png`,
    logo: `${ORIGIN}/proprely-icon-512.png`,
    priceRange: '€€',
    email: 'contact@proprely.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '30 rue Marbeuf',
      addressLocality: 'Paris',
      addressRegion: 'Île-de-France',
      postalCode: '75008',
      addressCountry: 'FR',
    },
    areaServed: c.department
      ? [cityAreaServed, { '@type': 'AdministrativeArea', name: c.department }]
      : [cityAreaServed],
    serviceType: 'Logiciel de gestion société de nettoyage B2B',
    parentOrganization: { '@id': `${ORIGIN}/#organization` },
  }
  if (c.geo) {
    localBusinessSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: c.geo.latitude,
      longitude: c.geo.longitude,
    }
  }

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.title,
      description: c.metaDescription,
      url: cityUrl,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      keywords: c.keywords.join(', '),
      about: {
        '@type': 'Service',
        name: `Logiciel de gestion pour sociétés de nettoyage à ${c.city}`,
        provider: { '@id': `${ORIGIN}/#organization` },
        areaServed: cityAreaServed,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `Proprely — logiciel société de nettoyage à ${c.city}`,
      description: c.metaDescription,
      url: cityUrl,
      image: `${ORIGIN}/og-image.png`,
      provider: { '@id': `${ORIGIN}/#organization` },
      serviceType: 'Logiciel de gestion société de nettoyage',
      areaServed: cityAreaServed,
      audience: {
        '@type': 'BusinessAudience',
        audienceType: `Dirigeants de sociétés de nettoyage B2B à ${c.city} et en ${c.region}`,
      },
    },
    localBusinessSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Villes', item: `${ORIGIN}/villes` },
        { '@type': 'ListItem', position: 3, name: c.city, item: cityUrl },
      ],
    },
    faqSchema(c.faq),
  ]

  const html = buildHtml({
    url,
    title: `${c.title} · Proprely`,
    description: c.metaDescription,
    ogTitle: c.title,
    ogDescription: c.metaDescription,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

const blogIndexBody = `
  <h1>Blog · Gestion, terrain et propreté B2B</h1>
  <p>Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage : productivité, prix, RGPD, fidélisation, outils.</p>
  <h2>Articles récents</h2>
  <ul>
    ${posts
      .map(
        (p) =>
          `<li><a href="${ORIGIN}/blog/${p.slug}"><strong>${escapeHtml(p.title)}</strong></a> — ${escapeHtml(
            p.excerpt
          )} (${escapeHtml(p.readTime)})</li>`
      )
      .join('')}
  </ul>
`.trim()

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${ORIGIN}/blog#blog`,
  name: 'Blog Proprely · Gestion, terrain et propreté B2B',
  description:
    "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage : productivité, RGPD, outils, prix, fidélisation, marchés locaux.",
  url: `${ORIGIN}/blog`,
  inLanguage: 'fr-FR',
  isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
  publisher: { '@id': `${ORIGIN}/#organization` },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    '@id': `${ORIGIN}/blog/${p.slug}#article`,
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: getPost(p.slug)?.dateModified ?? p.date,
    url: `${ORIGIN}/blog/${p.slug}`,
    author: (() => {
      const a = getAuthor(p.authorSlug)
      return { '@type': 'Person', '@id': `${ORIGIN}/auteur/${a.slug}#person`, name: a.name }
    })(),
  })),
}

const blogItemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: posts.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${ORIGIN}/blog/${p.slug}`,
    name: p.title,
  })),
}

const blogIndexHtml = buildHtml({
  url: '/blog',
  title: 'Blog · Gestion, terrain et propreté B2B · Proprely',
  description:
    "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage. Productivité, RGPD, outils, prix, fidélisation.",
  schemas: [
    webpageSchema(
      'Blog Proprely',
      "Analyses et retours d'expérience pour les dirigeants de sociétés de nettoyage.",
      `${ORIGIN}/blog`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Blog', item: `${ORIGIN}/blog` },
      ]
    ),
    blogSchema,
    blogItemList,
  ],
  bodyHtml: blogIndexBody,
})
writePage('/blog', blogIndexHtml)
generated.push('/blog')

const roiFaqs = [
  { q: "Comment calculer le ROI d'un logiciel pour société de nettoyage ?", a: "Le ROI d'un logiciel métier société de nettoyage se calcule en comparant le temps administratif gagné (heures par semaine récupérées par le dirigeant et les agents) au coût total de l'outil. Formule simplifiée : (heures hebdomadaires économisées × 47 semaines × coût horaire chargé du dirigeant) − abonnement annuel = ROI. Pour une PME de 8-15 agents, la dispersion entre Excel, WhatsApp et Word coûte typiquement 6 à 10 heures par semaine, soit 12 000 à 21 000 € par an au taux horaire dirigeant de 45 €." },
  { q: "Combien d'heures par semaine perd-on à gérer son entreprise de nettoyage sur Excel et WhatsApp ?", a: "Les retours terrain de dirigeants TPE/PME B2B nettoyage en France indiquent une moyenne de 6 à 10 heures par semaine perdues en administration dispersée : ressaisie entre outils, recherche d'informations, suivi des messages WhatsApp, contrôle manuel des pointages, génération de devis et factures sur Word. Au-delà de 5-8 agents, la charge augmente proportionnellement au nombre de sites et de prestations récurrentes." },
  { q: "Quelle hypothèse utilisez-vous pour le coût horaire dirigeant ?", a: "Le calculateur utilise 45 €/h comme coût horaire chargé d'un dirigeant TPE/PME nettoyage en France (rémunération nette ≈ 30 €/h + charges sociales + part fixe entreprise). C'est un benchmark conservateur ; si vous vous rémunérez au-dessus du SMIC dirigeant standard, ajustez à la hausse pour obtenir votre vrai ROI." },
  { q: "Le calcul prend-il en compte le temps perdu par les agents ?", a: "Le calculateur ROI Proprely se concentre sur le temps dirigeant car c'est le poste le plus mesurable et le plus impactant. Pour intégrer le temps agents (saisie pointage, échanges WhatsApp, recherche planning), comptez 2-4 heures supplémentaires par semaine par tranche de 5 agents. Le ROI réel est donc souvent 30-50 % supérieur au calcul de base." },
  { q: "À partir de combien d'agents un logiciel métier devient-il rentable ?", a: "Selon nos benchmarks 2026 : à partir de 3-5 agents pour les dirigeants qui pilotent eux-mêmes l'opérationnel, et à partir de 5-8 agents si la gestion est partagée. Sous 3 agents, un mix template Word + Excel + WhatsApp reste viable. Au-dessus de 8 agents, la dispersion coûte plus cher chaque mois que l'abonnement d'un cockpit unifié — y compris en bêta privée gratuite Proprely." },
]

const roiBody = `
  <h1>Calculateur ROI logiciel société de nettoyage : combien la dispersion vous coûte</h1>
  <p>Pour calculer le ROI d'un logiciel métier société de nettoyage, il faut comparer le temps administratif gagné au coût de l'outil. Une PME B2B nettoyage de 8 à 15 agents perd typiquement 6 à 10 heures par semaine en administration dispersée entre Excel, WhatsApp et Word — soit <strong>12 600 à 21 000 € par an</strong> au coût horaire dirigeant chargé de 45 €. Notre calculateur vous donne votre chiffre en 30 secondes.</p>
  <h2>Ce que vous découvrirez en 30 secondes</h2>
  <ul>
    <li>Le temps réel perdu chaque semaine en administration dispersée (saisie, recherche, ressaisie entre outils)</li>
    <li>Le coût annuel équivalent (heures × taux horaire dirigeant chargé)</li>
    <li>Le ROI estimé si vous centralisiez sur un seul outil métier</li>
    <li>Le seuil de rentabilité par taille d'entreprise (3, 8, 15, 25 agents)</li>
  </ul>
  <h2>Méthodologie du calcul</h2>
  <p>Le calculateur s'appuie sur trois données : le nombre d'agents que vous gérez, le nombre de sites clients, et votre coût horaire chargé estimé. Sur cette base, nous appliquons un coefficient empirique tiré de nos entretiens avec des dirigeants TPE/PME B2B nettoyage (entre 0,5 et 1,5 heure perdue par agent par semaine selon la dispersion).</p>
  <h2>Benchmarks par taille de société</h2>
  <ul>
    <li><strong>3 agents, 1-3 sites :</strong> 2-3 h perdues par semaine = 4 200 à 6 300 €/an. ROI immédiat dès le premier mois.</li>
    <li><strong>8 agents, 5-10 sites :</strong> 5-7 h perdues par semaine = 10 500 à 14 700 €/an. ROI atteint en 2-3 mois avec un cockpit unifié.</li>
    <li><strong>15 agents, 10-20 sites :</strong> 7-10 h perdues par semaine = 14 700 à 21 000 €/an. ROI dès le premier mois si l'outil supprime la double saisie.</li>
    <li><strong>25 agents et plus :</strong> 8-12 h perdues par semaine = 16 800 à 25 200 €/an, sans compter les erreurs paie et les contrats sous-tarifés.</li>
  </ul>
  <h2>Ce que ce calcul ne couvre pas (et qui augmente votre vrai ROI)</h2>
  <p>Le ROI réel est généralement 30 à 50 % supérieur à l'estimation de base parce que le calculateur ne tient compte que du temps dirigeant. Vous récupérez en plus : le temps des agents (saisie pointage, recherche planning), la marge sur les contrats actuellement sous-tarifés (visibilité marge par client), la qualité avec moins de litiges grâce à la preuve de passage standardisée, et la baisse de turnover qui résulte d'un meilleur pilotage de la charge horaire.</p>
  <h2>Aller plus loin</h2>
  <p>Pour calibrer votre tarification au m² : <a href="${ORIGIN}/calculateur-prix-nettoyage-m2">calculateur de prix nettoyage bureaux au m²</a>. Pour estimer la marge brute d'un contrat précis : <a href="${ORIGIN}/simulateur-rentabilite">simulateur de rentabilité contrat nettoyage</a>. Pour le guide complet du choix de logiciel : <a href="${ORIGIN}/logiciel-societe-nettoyage">logiciel société de nettoyage — guide complet 2026</a> ou le <a href="${ORIGIN}/comparatif-logiciel-nettoyage">comparatif Proprely vs PROPRET, Progiclean, Organilog</a>. La bêta privée Proprely est gratuite pour 30 sociétés fondatrices : <a href="${ORIGIN}/beta">candidater à la bêta</a>.</p>
`.trim()

const roiHtml = buildHtml({
  url: '/calculateur-roi',
  title: 'Calculateur ROI logiciel société de nettoyage · Proprely',
  description:
    "Calculez le ROI d'un logiciel métier société de nettoyage : heures perdues sur Excel et WhatsApp, coût annuel, seuil de rentabilité par taille d'entreprise. 30 secondes.",
  schemas: [
    webpageSchema(
      'Calculateur ROI Proprely',
      'Combien vous coûte la dispersion entre Excel, WhatsApp et Word pour gérer votre société de nettoyage.',
      `${ORIGIN}/calculateur-roi`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Calculateur ROI', item: `${ORIGIN}/calculateur-roi` },
      ]
    ),
    faqSchema(roiFaqs),
  ],
  bodyHtml: roiBody,
})
writePage('/calculateur-roi', roiHtml)
generated.push('/calculateur-roi')

const pricingBody = `
  <h1>Tarifs Proprely — Gratuit pendant la bêta</h1>
  <p>Proprely est en bêta privée. Aucun paiement, aucune carte bancaire demandée. Les 30 premières sociétés sélectionnées comme membres fondateurs gardent leur tarif privilégié à vie après le lancement public.</p>
  <h2>Tarif membre fondateur</h2>
  <p>0 € par mois pendant toute la durée de la bêta. Accès complet à tous les modules sans limite. Tarif fondateur conservé à vie après le lancement, fixé à l'avance et non soumis aux augmentations futures.</p>
  <ul>
    <li>Accès gratuit pendant toute la durée de la bêta</li>
    <li>Tarif fondateur garanti à vie après la bêta</li>
    <li>Onboarding 30 min avec le fondateur</li>
    <li>Support prioritaire (réponse sous 4h)</li>
    <li>Influence directe sur la feuille de route</li>
  </ul>
  <h2>Lancement public</h2>
  <p>Le tarif public sera défini avec les retours des fondateurs. L'objectif : un prix lisible, prévisible, qui ne pénalise pas la croissance. Modèle hypothèse : forfait par tranche d'agents.</p>
  <h2>Combien coûte la gestion d'une société de nettoyage SANS logiciel ?</h2>
  <p>Le vrai coût n'est pas le logiciel : c'est son absence. Diriger sur Excel, WhatsApp, Word et le papier représente 6 à 10 heures d'administration dispersée par semaine. À 45 € de coût horaire dirigeant chargé, c'est 12 600 à 21 000 € par an — sans compter les erreurs de pointage, les contrats sous-tarifés et les litiges clients faute de preuve de passage. Chiffrez votre propre coût avec le <a href="${ORIGIN}/calculateur-roi">calculateur ROI</a> ou la marge d'un contrat avec le <a href="${ORIGIN}/simulateur-rentabilite">simulateur de rentabilité</a>.</p>
  <h2>Tout est inclus</h2>
  <p>Aucun module en option, aucune limite d'utilisation. Clients, sites et contacts illimités. Agents et spécialités sans limite. Planning et affectation 1-clic. Missions avec preuve de passage (QR, photos, signature). Devis et factures avec signature électronique. Documents centralisés. Pilotage et marge par client en temps réel. Hébergement européen, conformité RGPD. Export de vos données en 1 clic à tout moment.</p>
  <h2>Sans risque, sans engagement, sans lock-in</h2>
  <p>Vos données restent les vôtres. Exportables en CSV ou Excel en 1 clic, à tout moment. Hébergement européen, conformité RGPD, chiffrement en transit et au repos.</p>
`.trim()

const pricingFaqs = [
  { q: "Combien coûtera Proprely après la bêta ?", a: "Le tarif public sera communiqué à la fin de la bêta. Les membres fondateurs conservent un tarif privilégié, fixé à l'avance et conservé à vie." },
  { q: "Y a-t-il un coût caché ou un engagement ?", a: "Non. Pas de carte bancaire demandée pendant la bêta. Pas d'engagement. Vous pouvez exporter vos données et partir à tout moment." },
  { q: "Le tarif sera-t-il par agent, par site ou forfaitaire ?", a: "Le modèle final sera défini avec les retours des membres fondateurs. L'objectif est un tarif lisible, prévisible, qui ne pénalise pas la croissance." },
  { q: "Que se passe-t-il si je rejoins maintenant et que le tarif ne me convient pas après ?", a: "Vous restez membre fondateur avec votre tarif privilégié garanti à vie, ou vous partez librement en exportant vos données. Aucun lock-in technique ou contractuel." },
  { q: "Pourquoi limiter à 30 sociétés fondatrices ?", a: "Parce que chaque société fondatrice bénéficie d'un onboarding et d'un support personnalisé par le fondateur. Une fois les 30 places prises, la bêta se referme jusqu'au lancement public." },
]

const pricingHtml = buildHtml({
  url: '/tarifs',
  title: 'Tarifs Proprely 2026 — Gratuit pendant la bêta · Proprely',
  description: "Proprely est gratuit pendant toute la durée de la bêta privée. Découvrez la politique tarifaire, les engagements membres fondateurs et ce que coûte vraiment la gestion sans logiciel.",
  schemas: [
    webpageSchema(
      'Tarifs Proprely',
      'Gratuit pendant la bêta privée. Tarif fondateur à vie pour les 30 premières sociétés sélectionnées.',
      `${ORIGIN}/tarifs`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Tarifs', item: `${ORIGIN}/tarifs` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Proprely — logiciel société de nettoyage B2B',
      description: "Cockpit métier pour piloter une société de nettoyage B2B : clients, agents, planning, missions avec preuve de passage, devis, factures, pilotage de la marge.",
      brand: { '@type': 'Brand', name: 'Proprely' },
      image: `${ORIGIN}/og-image.png`,
      offers: {
        '@type': 'Offer',
        '@id': `${ORIGIN}/tarifs#offer-beta`,
        url: `${ORIGIN}/tarifs`,
        name: 'Bêta privée Proprely — accès gratuit',
        description: "Accès complet au cockpit pendant toute la durée de la bêta privée, réservé aux 30 sociétés fondatrices. Tarif fondateur conservé à vie après le lancement public.",
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        eligibleCustomerType: 'https://schema.org/Enterprise',
        areaServed: { '@type': 'Country', name: 'France' },
        seller: { '@id': `${ORIGIN}/#organization` },
      },
    },
    faqSchema(pricingFaqs),
  ],
  bodyHtml: pricingBody,
})
writePage('/tarifs', pricingHtml)
generated.push('/tarifs')

const thankYouBody = `
  <h1>Candidature enregistrée</h1>
  <p>Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.</p>
`.trim()

const notFoundBody = `
  <h1>Page introuvable (404)</h1>
  <p>La page que vous cherchez n'existe pas ou a été déplacée.</p>
  <h2>Où aller maintenant ?</h2>
  <ul>
    <li><a href="${ORIGIN}/">Accueil — Découvrir le cockpit Proprely</a></li>
    <li><a href="${ORIGIN}/tarifs">Tarifs — Gratuit pendant la bêta</a></li>
    <li><a href="${ORIGIN}/calculateur-roi">Calculateur ROI — Combien la dispersion vous coûte</a></li>
    <li><a href="${ORIGIN}/blog">Blog — Analyses pour les dirigeants du nettoyage</a></li>
  </ul>
`.trim()

const notFoundHtml = buildHtml({
  url: '/404',
  title: 'Page introuvable · Proprely',
  description: "La page que vous cherchez n'existe pas ou a été déplacée.",
  robots: 'noindex,follow',
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page introuvable',
      description: "La page que vous cherchez n'existe pas ou a été déplacée.",
      url: `${ORIGIN}/404`,
      inLanguage: 'fr-FR',
    },
  ],
  bodyHtml: notFoundBody,
})
writeFileSync(resolve(distDir, '404.html'), notFoundHtml)
generated.push('/404.html')

const thankYouHtml = buildHtml({
  url: '/beta/merci',
  title: 'Candidature enregistrée · Proprely',
  description: 'Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.',
  robots: 'noindex,follow',
  schemas: [
    webpageSchema(
      'Candidature enregistrée',
      'Confirmation de candidature à la bêta privée Proprely.',
      `${ORIGIN}/beta/merci`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Merci', item: `${ORIGIN}/beta/merci` },
      ]
    ),
  ],
  bodyHtml: thankYouBody,
})
writePage('/beta/merci', thankYouHtml)
generated.push('/beta/merci')

const contactBody = `
  <h1>Contacter Proprely</h1>
  <p>Une question sur le logiciel, la bêta privée, ou votre candidature de membre fondateur ? Écrivez-nous, nous revenons vers vous sous 24h ouvrées.</p>
  <h2>Email</h2>
  <p>Pour toute question : <a href="mailto:contact@proprely.fr">contact@proprely.fr</a>. Réponse sous 24h ouvrées (lundi-vendredi, 9h-18h CET).</p>
  <h2>Informations</h2>
  <p><strong>Éditeur :</strong> Pershing Global Solutions LTD, 77 Camden Lower Street, Saint Kevin, Dublin D02 XE80, Irlande.</p>
  <p><strong>Zones d'opération :</strong> France entière, focus Paris &amp; Île-de-France, Lyon &amp; Rhône-Alpes, Marseille &amp; PACA.</p>
  <h2>Rejoindre la bêta privée</h2>
  <p>Vous voulez tester Proprely ? Candidatez à la bêta privée depuis la <a href="${ORIGIN}/">page d'accueil</a>. 30 places fondateurs disponibles.</p>
`.trim()

const contactHtml = buildHtml({
  url: '/contact',
  title: 'Contact · Proprely',
  description: 'Contactez Proprely : logiciel de gestion pour sociétés de nettoyage B2B. Email contact@proprely.fr, réponse sous 24h ouvrées.',
  schemas: [
    webpageSchema(
      'Contact Proprely',
      'Contactez Proprely : email, zones d\'opération, éditeur.',
      `${ORIGIN}/contact`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Contact', item: `${ORIGIN}/contact` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${ORIGIN}/contact`,
      name: 'Contacter Proprely',
      inLanguage: 'fr-FR',
      mainEntity: { '@id': `${ORIGIN}/#organization` },
    },
  ],
  bodyHtml: contactBody,
})
writePage('/contact', contactHtml)
generated.push('/contact')

const conventionFaqs = [
  { q: "Proprely applique-t-il automatiquement la convention collective propreté IDCC 3043 ?", a: "Oui. La grille salariale 2026 (AS1 à inspecteur), les majorations heures complémentaires/supplémentaires/nuit/dimanche/jours fériés, la prime d'expérience à partir de 4 ans, et les seuils pénibilité sont intégrés dans le module gestion des agents. Vous pouvez bien sûr surcharger avec votre grille interne si elle est plus généreuse que les minima conventionnels." },
  { q: "Comment Proprely gère-t-il l'article 7 (transfert automatique des salariés) ?", a: "Chaque agent a une fiche avec son ancienneté, le marché auquel il est affecté principalement, et le pourcentage de son temps sur ce marché. Lors d'un transfert (gain ou perte de marché), l'export CSV liste les agents éligibles (>6 mois d'ancienneté, >30 % du temps sur le marché) avec toutes les données nécessaires à la due diligence." },
  { q: "Le calcul des heures de nuit, dimanche et jours fériés est-il automatique ?", a: "Oui. Vous saisissez l'horaire réel de l'intervention, Proprely identifie les plages concernées et applique les majorations conventionnelles : nuit +20 % (21h-6h), dimanche +100 %, jours fériés +100 %, 1er mai +100 % obligatoire. Le récapitulatif mensuel par agent est prêt pour la paie." },
  { q: "Quelles sont les sanctions en cas de non-respect de l'IDCC 3043 ?", a: "Trois risques principaux : redressement URSSAF pour majorations heures complémentaires non versées (typique 5-20 k€ pour une PME de 15 agents sur 3 ans), prud'hommes pour rappel de salaire (jusqu'à 3 ans d'arriérés + intérêts), et perte de marché si la due diligence article 7 révèle des anomalies sociales." },
  { q: "Faut-il être expert RH pour utiliser Proprely en conformité IDCC 3043 ?", a: "Non. Les règles conventionnelles sont préconfigurées. Vous saisissez les heures réelles et les contrats, Proprely fait le calcul. En cas de doute sur un point spécifique, nous recommandons une revue annuelle avec votre cabinet comptable ou un avocat en droit social." },
  { q: "Où trouver le détail complet de la convention collective propreté IDCC 3043 ?", a: "Notre article de référence couvre les 6 points qui font la différence au quotidien : grille de salaires 2024/2025/2026, calcul des heures, article 7, prime d'expérience, obligations formation/RSE/pénibilité, sources officielles Légifrance et FEP." },
]

const conventionBody = `
  <h1>Logiciel propreté conforme convention collective IDCC 3043</h1>
  <p>Grille de salaires 2026 préconfigurée, calcul automatique des majorations heures, suivi article 7 prêt pour la due diligence, exports paie standardisés. Proprely intègre la convention collective des entreprises de propreté pour vous éviter redressement URSSAF et erreurs paie.</p>
  <h2>Grille de salaires convention collective propreté 2026</h2>
  <p>Minima conventionnels IDCC 3043 au 1er janvier 2026, base 35h hebdomadaires :</p>
  <ul>
    <li><strong>AS1 (Agent Service Propreté débutant)</strong> — coefficient 110 — 11,99 €/h brut</li>
    <li><strong>AS2 (Agent Service Propreté)</strong> — coefficient 130 — 12,15 €/h brut</li>
    <li><strong>ASP (Agent Service Propreté qualifié)</strong> — coefficient 150 — 12,42 €/h brut</li>
    <li><strong>ATQS (Agent Très Qualifié Service)</strong> — coefficient 175 — 13,32 €/h brut</li>
    <li><strong>Chef d'équipe</strong> — coefficient 195 — 14,20 €/h brut</li>
    <li><strong>Inspecteur / Responsable secteur</strong> — coefficient 235 — 16,80 €/h brut</li>
  </ul>
  <h2>Les 4 obligations IDCC 3043 que vous ne pouvez plus tenir sur Excel</h2>
  <ul>
    <li><strong>Calcul des heures complémentaires</strong> — Majoration +10 % de 1 à 8h, +25 % au-delà pour les temps partiels. Erreur fréquente = redressement URSSAF assuré.</li>
    <li><strong>Article 7 : transfert de personnel</strong> — Reprise automatique des agents lors d'un changement de prestataire. Due diligence RH obligatoire avant signature.</li>
    <li><strong>Prime d'expérience à 4 ans</strong> — Versement mensuel à partir de 4 ans d'ancienneté chez le même employeur. Montants définis par accord d'entreprise.</li>
    <li><strong>Formation 0,55 % et pénibilité</strong> — Plan annuel formation propreté, suivi médical renforcé pour les agents exposés aux produits CMR (bionettoyage médical).</li>
  </ul>
  <h2>Comment Proprely répond à la conformité IDCC 3043</h2>
  <ul>
    <li><strong>Grille salariale intégrée</strong> — la grille IDCC 3043 AS1 à inspecteur est paramétrée par défaut, surcharge possible si votre grille interne est plus généreuse</li>
    <li><strong>Calcul automatique des majorations</strong> — heures complémentaires, supplémentaires, nuit (+20 %), dimanche (+100 %), jours fériés (+100 %)</li>
    <li><strong>Suivi article 7 prêt pour la due diligence</strong> — fiches agents avec ancienneté, marché d'affectation, % de temps — exportable CSV</li>
    <li><strong>Reporting paie standardisé</strong> — export mensuel des heures par agent avec toutes majorations conformes IDCC 3043</li>
  </ul>
  <h2>Le guide complet convention collective propreté</h2>
  <p>Cette page présente le logiciel. Pour comprendre en profondeur la convention IDCC 3043 (grille 2024/2025/2026, calcul détaillé des heures, mécanique de l'article 7, primes, formation, pénibilité, sources Légifrance/FEP), consultez notre <a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043">guide de référence convention collective propreté IDCC 3043</a>.</p>
`.trim()

const conventionHtml = buildHtml({
  url: '/convention-collective-nettoyage',
  title: 'Logiciel conforme convention collective propreté IDCC 3043 · Proprely',
  description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes. Bêta gratuite.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Logiciel conforme convention collective propreté IDCC 3043',
      description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes.",
      url: `${ORIGIN}/convention-collective-nettoyage`,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      about: {
        '@type': 'Legislation',
        name: 'Convention collective nationale des entreprises de propreté et services associés',
        legislationIdentifier: 'IDCC 3043',
        legislationJurisdiction: { '@type': 'Country', name: 'France' },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Convention collective nettoyage IDCC 3043', item: `${ORIGIN}/convention-collective-nettoyage` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel conforme convention collective propreté IDCC 3043',
      description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes.",
      url: `${ORIGIN}/convention-collective-nettoyage`,
      image: `${ORIGIN}/og-image.png`,
      provider: { '@id': `${ORIGIN}/#organization` },
      serviceType: 'Logiciel de gestion société de nettoyage conforme IDCC 3043',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de nettoyage B2B en France soumis à la convention collective propreté IDCC 3043',
      },
    },
    faqSchema(conventionFaqs),
  ],
  bodyHtml: conventionBody,
})
writePage('/convention-collective-nettoyage', conventionHtml)
generated.push('/convention-collective-nettoyage')

const mentionsBody = `
  <h1>Mentions légales</h1>
  <h2>Éditeur du site</h2>
  <p><strong>Pershing Global Solutions LTD</strong> (éditeur de Proprely). Siège social : 77 Camden Lower Street, Saint Kevin, Dublin D02 XE80, Irlande. Email : contact@proprely.fr.</p>
  <h2>Directeur de la publication</h2>
  <p>Pershing Global Solutions LTD.</p>
  <h2>Hébergement</h2>
  <p>Le site proprely.fr est hébergé par Hostinger International Ltd., 61 Lordou Vironos, 6023 Larnaca, Chypre. Les données saisies dans l'application Proprely sont hébergées chez un prestataire situé dans l'Union européenne, conformément au RGPD.</p>
  <h2>Propriété intellectuelle</h2>
  <p>L'ensemble du contenu du site proprely.fr est protégé par le droit d'auteur et les droits de propriété intellectuelle.</p>
  <h2>Litiges</h2>
  <p>Tout litige relatif à l'utilisation du site est soumis au droit français.</p>
`.trim()

const mentionsHtml = buildHtml({
  url: '/mentions-legales',
  title: 'Mentions légales · Proprely',
  description: "Mentions légales de Proprely : éditeur Pershing Global Solutions LTD, hébergeur Hostinger, propriété intellectuelle, contact.",
  robots: 'noindex,follow',
  schemas: [
    webpageSchema(
      'Mentions légales Proprely',
      'Éditeur, hébergeur, propriété intellectuelle, contact.',
      `${ORIGIN}/mentions-legales`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Mentions légales', item: `${ORIGIN}/mentions-legales` },
      ]
    ),
  ],
  bodyHtml: mentionsBody,
})
writePage('/mentions-legales', mentionsHtml)
generated.push('/mentions-legales')

const privacyBody = `
  <h1>Politique de confidentialité</h1>
  <p>Le responsable du traitement des données collectées sur proprely.fr est Proprely, joignable à l'adresse contact@proprely.fr.</p>
  <h2>Données collectées</h2>
  <p>Lors de votre candidature à la bêta privée : prénom, nom, email professionnel, nom d'entreprise, nombre d'agents, ville ou région, plus gros problème de gestion rencontré.</p>
  <h2>Finalités</h2>
  <p>Évaluer votre candidature, communiquer avec vous, fournir et améliorer le service, respecter nos obligations légales.</p>
  <h2>Base légale</h2>
  <p>Consentement (candidature, communications) et exécution du contrat de service.</p>
  <h2>Durée de conservation</h2>
  <p>12 mois en cas de non-sélection. 3 ans à des fins de prospection après fin de contrat (sauf opposition), 10 ans pour obligations légales.</p>
  <h2>Vos droits</h2>
  <p>Conformément au RGPD : accès, rectification, effacement, limitation, opposition, portabilité, réclamation auprès de la CNIL. Pour exercer ces droits : contact@proprely.fr (réponse sous 1 mois).</p>
  <h2>Cookies</h2>
  <p>Le site utilise des cookies fonctionnels strictement nécessaires et, si vous y consentez, un cookie de mesure d'audience Google Analytics.</p>
`.trim()

const privacyHtml = buildHtml({
  url: '/confidentialite',
  title: 'Politique de confidentialité · Proprely',
  description: "Politique de confidentialité Proprely : données collectées, finalités, base légale, durée de conservation, droits RGPD.",
  robots: 'noindex,follow',
  schemas: [
    webpageSchema(
      'Politique de confidentialité Proprely',
      'Données collectées, finalités, durée de conservation, droits RGPD.',
      `${ORIGIN}/confidentialite`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Confidentialité', item: `${ORIGIN}/confidentialite` },
      ]
    ),
  ],
  bodyHtml: privacyBody,
})
writePage('/confidentialite', privacyHtml)
generated.push('/confidentialite')

const cguBody = `
  <h1>Conditions générales d'utilisation</h1>
  <h2>Objet</h2>
  <p>Les présentes CGU régissent l'accès et l'utilisation du service Proprely en phase de bêta privée.</p>
  <h2>Accès au service</h2>
  <p>L'accès au service est gratuit pendant toute la durée de la bêta privée. Aucun moyen de paiement n'est requis.</p>
  <h2>Engagements de l'éditeur</h2>
  <p>Fournir un service fonctionnel, assurer la sécurité des données, informer des évolutions, conserver les données en UE.</p>
  <h2>Propriété des données</h2>
  <p>Le membre fondateur reste propriétaire à 100% des données qu'il saisit. Export possible à tout moment en CSV ou Excel.</p>
  <h2>Conditions préférentielles à vie</h2>
  <p>À l'issue de la bêta, les membres fondateurs bénéficient d'un tarif privilégié garanti à vie.</p>
  <h2>Résiliation</h2>
  <p>Résiliation possible à tout moment, sans préavis, par simple notification à contact@proprely.fr.</p>
`.trim()

const cguHtml = buildHtml({
  url: '/cgu',
  title: "Conditions générales d'utilisation · Proprely",
  description: "CGU Proprely : accès au service, engagements éditeur et membre, propriété des données, résiliation, évolutions.",
  robots: 'noindex,follow',
  schemas: [
    webpageSchema(
      'CGU Proprely',
      "Accès au service, engagements, propriété des données, résiliation.",
      `${ORIGIN}/cgu`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'CGU', item: `${ORIGIN}/cgu` },
      ]
    ),
  ],
  bodyHtml: cguBody,
})
writePage('/cgu', cguHtml)
generated.push('/cgu')

const featureIndexBody = `
  <h1>Fonctionnalités logiciel nettoyage</h1>
  <p>Proprely centralise quatre modules connectés pour piloter une société de propreté B2B : planning des agents, devis, gestion d'équipe, preuve de passage. Tout dans un seul outil, pensé pour le métier.</p>
  <h2>Modules</h2>
  <ul>
    ${features
      .map(
        (f) =>
          `<li><a href="${ORIGIN}/fonctionnalites/${f.slug}"><strong>${escapeHtml(f.title)}</strong></a> — ${escapeHtml(f.metaDescription)}</li>`
      )
      .join('')}
  </ul>
  <h2>Tout connecté dans un seul écran</h2>
  <p>Un devis signé devient une facture, une mission affectée apparaît sur le planning de l'agent, une preuve de passage met à jour automatiquement le suivi qualité du client. Pas de copier-coller entre Excel, WhatsApp et Word.</p>
`.trim()

const featureIndexHtml = buildHtml({
  url: '/fonctionnalites',
  title: 'Fonctionnalités logiciel nettoyage · Proprely',
  description: "Toutes les fonctionnalités Proprely : planning agents, devis, gestion agents, preuve de passage. Logiciel propreté B2B. Bêta gratuite.",
  schemas: [
    webpageSchema(
      'Fonctionnalités Proprely',
      "Planning, devis, gestion agents, preuve de passage pour société de nettoyage.",
      `${ORIGIN}/fonctionnalites`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Fonctionnalités', item: `${ORIGIN}/fonctionnalites` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Fonctionnalités Proprely',
      url: `${ORIGIN}/fonctionnalites`,
      inLanguage: 'fr-FR',
      hasPart: features.map((f) => ({
        '@type': 'WebPage',
        name: f.title,
        url: `${ORIGIN}/fonctionnalites/${f.slug}`,
        description: f.metaDescription,
      })),
    },
  ],
  bodyHtml: featureIndexBody,
})
writePage('/fonctionnalites', featureIndexHtml)
generated.push('/fonctionnalites')

const cityIndexBody = `
  <h1>Logiciel nettoyage par ville</h1>
  <p>Le marché de la propreté B2B varie d'une région à l'autre. Paris a ses syndics et son tertiaire QCA, Lyon son pôle santé, Marseille sa saisonnalité touristique, Bordeaux son œnotourisme, Toulouse son aéronautique, Nantes son industrie maritime. Proprely s'adapte aux contraintes locales.</p>
  <h2>Villes documentées</h2>
  <ul>
    ${cities
      .map(
        (c) =>
          `<li><a href="${ORIGIN}/villes/${c.slug}"><strong>Logiciel nettoyage à ${escapeHtml(c.city)}</strong></a> (${escapeHtml(c.region)}) — ${escapeHtml(c.metaDescription)}</li>`
      )
      .join('')}
  </ul>
  <h2>Votre ville n'est pas listée ?</h2>
  <p>Proprely opère sur toute la France. Si vous êtes ailleurs, candidatez quand même à la bêta : le produit est identique et l'onboarding est calé sur votre réalité locale.</p>
`.trim()

const cityIndexHtml = buildHtml({
  url: '/villes',
  title: 'Logiciel nettoyage par ville · Proprely',
  description: "Logiciel de gestion pour société de nettoyage par ville : Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes. Conçu pour la propreté B2B française.",
  schemas: [
    webpageSchema(
      'Proprely par ville',
      "Logiciel nettoyage pour Paris, Lyon, Marseille, Bordeaux, Toulouse, Nantes.",
      `${ORIGIN}/villes`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Villes', item: `${ORIGIN}/villes` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Logiciel nettoyage par ville',
      url: `${ORIGIN}/villes`,
      inLanguage: 'fr-FR',
      hasPart: cities.map((c) => ({
        '@type': 'WebPage',
        name: c.title,
        url: `${ORIGIN}/villes/${c.slug}`,
        description: c.metaDescription,
      })),
    },
  ],
  bodyHtml: cityIndexBody,
})
writePage('/villes', cityIndexHtml)
generated.push('/villes')

const betaBody = `
  <h1>Bêta privée Proprely : devenez l'une des 30 sociétés fondatrices</h1>
  <p>Accès gratuit à toute la plateforme pendant la bêta. Onboarding 30 minutes avec le fondateur. Tarif fondateur conservé à vie quand on passe au prix public.</p>
  <h2>Cinq avantages exclusifs des membres fondateurs</h2>
  <ul>
    <li>Accès bêta 100% gratuit : tous les modules, sans limite d'agents ni de sites, pendant toute la durée de la bêta</li>
    <li>Onboarding accompagné par le fondateur : mise en route en 30 minutes lors d'un appel</li>
    <li>Influence directe sur la feuille de route : vos besoins remontés en direct deviennent les prochaines fonctionnalités</li>
    <li>Accès prioritaire au support : réponse sous 4 heures en semaine, interlocuteur dédié</li>
    <li>Conditions préférentielles à vie : tarif fondateur conservé après le lancement public</li>
  </ul>
  <h2>Profil recherché</h2>
  <ul>
    <li>Société de nettoyage B2B en France (bureaux, syndics, hôtels, cabinets médicaux, restaurants, copropriétés B2B)</li>
    <li>Entre 3 et 50 agents</li>
    <li>Au moins 5 sites clients</li>
    <li>Vous utilisez aujourd'hui Excel, WhatsApp, Word ou papier pour piloter</li>
    <li>Vous êtes dirigeant ou responsable d'exploitation</li>
    <li>Vous êtes prêt à nous remonter des retours pendant 4 à 8 semaines</li>
  </ul>
  <h2>Comment candidater</h2>
  <p>Remplissez le formulaire en quelques minutes : prénom, email professionnel, nom de votre entreprise, nombre d'agents, ville ou région, et votre plus gros problème actuel. Nous revenons vers vous sous 24 heures ouvrées pour un premier appel si votre profil correspond.</p>
`.trim()

const betaFaqs = [
  { q: "C'est quoi exactement, la bêta privée Proprely ?", a: "Nous lançons Proprely avec 30 sociétés de nettoyage fondatrices. Pendant toute la durée de la bêta, vous utilisez le produit gratuitement, vous nous remontez vos besoins, et vous influencez les prochaines fonctionnalités." },
  { q: "C'est vraiment gratuit ?", a: "Oui. Aucun paiement, aucune carte bancaire demandée. Vous accédez à toute la plateforme sans limite d'utilisation pendant toute la durée de la bêta." },
  { q: "Combien de temps pour la mise en route ?", a: "30 minutes lors d'un appel avec le fondateur. Nous configurons votre entreprise ensemble : sites, agents, fréquences d'intervention." },
  { q: "Combien ça coûtera après la bêta ?", a: "Le tarif public sera communiqué en fin de bêta. Les membres fondateurs gardent un tarif privilégié, fixé à l'avance et conservé à vie." },
  { q: "Mes données sont-elles sécurisées ?", a: "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100 % et pouvez les exporter en 1 clic à tout moment." },
]

const betaHtml = buildHtml({
  url: '/beta',
  title: 'Bêta privée Proprely : devenez membre fondateur · 30 places',
  description: "Rejoignez les 30 sociétés de nettoyage fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur à vie, onboarding 30 min.",
  schemas: [
    webpageSchema(
      'Bêta privée Proprely',
      "Rejoignez les 30 sociétés fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur conservé à vie.",
      `${ORIGIN}/beta`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Bêta privée', item: `${ORIGIN}/beta` },
      ]
    ),
    faqSchema(betaFaqs),
    {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Programme membres fondateurs Proprely',
      description: "Accès gratuit pendant toute la bêta privée. Tarif fondateur conservé à vie. Limité à 30 sociétés.",
      availability: 'https://schema.org/LimitedAvailability',
      price: '0',
      priceCurrency: 'EUR',
      seller: { '@id': `${ORIGIN}/#organization` },
    },
  ],
  bodyHtml: betaBody,
})
writePage('/beta', betaHtml)
generated.push('/beta')

const resourcesIndexBody = `
  <h1>Ressources gratuites pour société de nettoyage</h1>
  <p>Modèles Excel et outils interactifs pour structurer votre activité : devis, planning, suivi des heures, calculateur ROI. Téléchargement immédiat sans inscription.</p>
  <h2>Modèles et outils disponibles</h2>
  <ul>
    ${resources.map((r) => `<li><a href="${ORIGIN}/ressources/${r.slug}"><strong>${escapeHtml(r.title)}</strong></a> — ${escapeHtml(r.excerpt)}</li>`).join('')}
  </ul>
`.trim()

const resourcesHtml = buildHtml({
  url: '/ressources',
  title: 'Ressources gratuites pour société de nettoyage · Proprely',
  description: "Modèles de devis, planning et suivi des heures pour société de nettoyage : templates Excel gratuits, calculateur ROI. Dirigeants B2B.",
  schemas: [
    webpageSchema(
      'Ressources Proprely',
      "Modèles Excel et outils interactifs pour les dirigeants de société de nettoyage.",
      `${ORIGIN}/ressources`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Ressources', item: `${ORIGIN}/ressources` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: resources.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.title,
        url: `${ORIGIN}/ressources/${r.slug}`,
      })),
    },
  ],
  bodyHtml: resourcesIndexBody,
})
writePage('/ressources', resourcesHtml)
generated.push('/ressources')

for (const r of resources) {
  if (r.slug === 'calculateur-roi' || r.slug === 'simulateur-rentabilite') continue
  const url = `/ressources/${r.slug}`
  const insideHtml = r.whatsInside.map((b) => `<li>${escapeHtml(b)}</li>`).join('')
  const whoForHtml = r.whoFor.map((b) => `<li>${escapeHtml(b)}</li>`).join('')

  const bodyHtml = `
    <h1>${escapeHtml(r.title)}</h1>
    <p>${escapeHtml(r.description)}</p>
    <p>Format : ${escapeHtml(r.format)} · Taille : ${escapeHtml(r.fileSize)}</p>
    ${r.filePath ? `<p><a href="${escapeAttr(r.filePath)}" download>Télécharger le modèle</a></p>` : ''}
    <h2>Ce qu'il y a dans le fichier</h2>
    <ul>${insideHtml}</ul>
    <h2>Ce modèle convient si</h2>
    <ul>${whoForHtml}</ul>
    <h2>Aller plus loin que le modèle</h2>
    <p>${escapeHtml(r.bestFor)} Proprely automatise ce que ce modèle vous demande de faire à la main. <a href="${ORIGIN}/beta">Rejoindre la bêta gratuite</a>.</p>
  `.trim()

  const schemas: object[] = [
    webpageSchema(r.title, r.metaDescription, `${ORIGIN}${url}`, [
      { name: 'Accueil', item: `${ORIGIN}/` },
      { name: 'Ressources', item: `${ORIGIN}/ressources` },
      { name: r.shortTitle, item: `${ORIGIN}${url}` },
    ]),
  ]

  if (r.filePath) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      name: r.title,
      description: r.metaDescription,
      url: `${ORIGIN}${r.filePath}`,
      encodingFormat: 'text/csv',
      inLanguage: 'fr-FR',
      isAccessibleForFree: true,
      publisher: { '@id': `${ORIGIN}/#organization` },
    })
  }

  const html = buildHtml({
    url,
    title: r.metaTitle,
    description: r.metaDescription,
    ogTitle: r.title,
    ogDescription: r.metaDescription,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

const vsExcelBody = `
  <h1>Excel ou Proprely : à partir de quand changer ?</h1>
  <p>Excel reste un excellent outil pour démarrer une société de nettoyage. À partir d'une certaine taille, il devient le frein principal à la croissance. Ce comparatif identifie précisément le moment où basculer, pourquoi, et comment migrer sans douleur.</p>
  <h2>Quand Excel suffit encore</h2>
  <ul>
    <li>Vous êtes seul à gérer (pas de back-office)</li>
    <li>Moins de 5 agents</li>
    <li>Moins de 10 sites clients</li>
    <li>Pas de preuve de passage formelle attendue</li>
    <li>Pas de prestations récurrentes complexes</li>
    <li>Pas d'enjeu de marge par client à suivre finement</li>
  </ul>
  <h2>Quand Excel devient le frein</h2>
  <ul>
    <li>Plus de 6 heures par semaine en admin dispersée</li>
    <li>5 agents ou plus, sur 10 sites ou plus</li>
    <li>Clients qui demandent des preuves de passage</li>
    <li>Travail à 2+ personnes sur les mêmes fichiers</li>
    <li>Erreurs de pointage ou de devis découvertes a posteriori</li>
    <li>Plus de visibilité sur les contrats rentables</li>
    <li>Documents difficiles à retrouver (contrat, attestation)</li>
    <li>Agents qui oublient des passages</li>
  </ul>
  <h2>Coût caché d'Excel</h2>
  <p>Quand on additionne les heures perdues, les erreurs et les risques, Excel coûte plus cher qu'une licence d'outil métier. À 45 € de coût horaire dirigeant, 6 à 10 heures perdues par semaine représentent 12 600 à 21 000 € de coût caché par an.</p>
  <h2>Migration en 2 semaines</h2>
  <p>Jour 1 audit des fichiers · Jour 2 configuration de l'instance · Jour 3 premier planning et premier devis · Semaine 1 validation côté agents · Semaine 2 bascule complète. Pas de big bang, pas de double saisie pendant 3 mois.</p>
`.trim()

const vsExcelFaqs = [
  { q: "Excel est gratuit, pourquoi payer un logiciel ?", a: "Excel n'est pas gratuit dès qu'il vous coûte 6 à 10 heures par semaine d'administration dispersée. À 45 € de coût horaire dirigeant, ça représente 12 600 à 21 000 € de coût caché par an. Pendant la bêta, Proprely est aussi gratuit qu'Excel, sans ce coût caché." },
  { q: "Mes équipes connaissent Excel par cœur, est-ce qu'elles vont adopter Proprely ?", a: "Proprely a été conçu avec des dirigeants de société de nettoyage. L'interface reprend les logiques métier qu'ils connaissent : sites, agents, missions, devis. La prise en main se fait en 30 minutes avec le fondateur." },
  { q: "Comment je migre mes fichiers Excel existants ?", a: "Nous reprenons vos fichiers actuels et nous configurons votre instance avec vous lors de l'onboarding (30 minutes). Clients, sites, agents, fréquences : tout est importé sans que vous ayez à ressaisir." },
  { q: "Qu'est-ce qui casse vraiment dans Excel quand on grandit ?", a: "Trois choses : la collaboration (à 2 personnes simultanées, le fichier se corrompt ou les modifications s'écrasent), la fiabilité (formules cassées, lignes décalées, données perdues), et le manque de fonctions terrain (preuve de passage, signature client, géolocalisation, application mobile pour les agents)." },
  { q: "Et si je veux rester sur Excel ?", a: "Excel reste un excellent outil tant que vous êtes seul à gérer, avec moins de 5 agents et moins de 10 sites. Nous proposons d'ailleurs des modèles Excel gratuits sur notre page Ressources. Au-delà, le coût caché de la dispersion dépasse largement le prix d'un outil métier." },
]

const vsExcelHtml = buildHtml({
  url: '/proprely-vs-excel',
  title: 'Proprely vs Excel : à partir de quand changer ? · Comparatif 2026',
  description: "Excel pour gérer une société de nettoyage : jusqu'où ça tient, ce qui casse à partir de 5 agents, et combien coûte vraiment la dispersion. Comparatif honnête.",
  schemas: [
    webpageSchema(
      'Proprely vs Excel',
      "Comparatif honnête entre Excel et Proprely pour piloter une société de nettoyage B2B.",
      `${ORIGIN}/proprely-vs-excel`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Proprely vs Excel', item: `${ORIGIN}/proprely-vs-excel` },
      ]
    ),
    faqSchema(vsExcelFaqs),
  ],
  bodyHtml: vsExcelBody,
})
writePage('/proprely-vs-excel', vsExcelHtml)
generated.push('/proprely-vs-excel')

const simulateurFaqs = [
  { q: "Comment calculer la rentabilité d'un contrat de nettoyage ?", a: "La rentabilité d'un contrat de nettoyage se calcule à partir de quatre éléments : le CA mensuel, le nombre d'heures réellement effectuées sur le site, le coût horaire chargé des agents affectés, et les coûts annexes (consommables, déplacements, frais de structure). Marge brute = CA − (heures × coût horaire chargé + consommables + déplacements). Marge nette = marge brute − quote-part frais de structure (typiquement 8-15 % du CA pour une PME B2B nettoyage). Le KPI décisif pour comparer deux contrats est le résultat horaire (marge nette ÷ heures sur le site)." },
  { q: "Quelle marge nette viser sur un contrat de nettoyage B2B ?", a: "Cibles saines pour une société de nettoyage B2B en France en 2026 : marge brute 30-40 %, marge nette 12-20 %. Sous 10 % de marge nette, le contrat est vulnérable au moindre imprévu (remplacement, absentéisme, hausse de charges). Au-delà de 25 % de marge nette, vous êtes probablement hors marché concurrentiel ou sur un client captif (situation à court terme). Cible recommandée : 15-18 % de marge nette pour la majorité des contrats récurrents." },
  { q: "Quelle est la différence entre marge brute et marge nette ?", a: "La marge brute mesure ce que le contrat dégage avant la quote-part de structure (encadrement, locaux, comptable, logiciels, véhicules). La marge nette intègre cette quote-part et représente le vrai bénéfice du contrat. Sur 100 € de CA, un contrat sain dégage 30-40 € de marge brute, mais seulement 15-20 € de marge nette une fois les frais fixes ré-imputés. C'est la marge nette qui doit guider vos décisions d'arbitrage entre contrats." },
  { q: "Comment intégrer les heures supplémentaires dans le calcul ?", a: "Les heures supplémentaires doivent être valorisées à leur coût majoré réel : +25 % de 36 à 43 h hebdomadaires, +50 % au-delà (temps plein), ou +10 %/+25 % pour les heures complémentaires des temps partiels (cas le plus fréquent en propreté). Si votre contrat impose des plages décalées (nuit +20 %, dimanche +100 %, jours fériés +100 %), intégrez ces majorations dans votre coût horaire chargé moyen — sinon votre marge calculée est surestimée de 5-15 %." },
  { q: "Mon contrat est limite, que faire ?", a: "Trois leviers selon le verdict : (1) renégocier le prix au prochain renouvellement, en vous appuyant sur le détail des prestations et la grille de référence — voir notre <a href=\"/blog/fixer-prix-nettoyage\">méthode prix nettoyage 2026</a>, (2) optimiser les heures via une meilleure affectation agents/sites et la suppression des dérives (planning rigoureux + preuve de passage standardisée), (3) si le client refuse une hausse et que la marge nette reste sous 8 %, arbitrer pour ne pas reconduire et redéployer la capacité sur des contrats plus rentables." },
]

const simulateurBody = `
  <h1>Simulateur de rentabilité contrat de nettoyage : marge brute, nette et verdict</h1>
  <p>Pour calculer la rentabilité d'un contrat de nettoyage, comparez le CA mensuel aux coûts (heures × coût horaire chargé + consommables + déplacements + quote-part frais de structure). Une marge nette saine est de <strong>12 à 20 %</strong> pour une société de nettoyage B2B en France en 2026. Notre simulateur vous donne marge brute, marge nette, résultat horaire et un verdict immédiat avec actions concrètes.</p>
  <h2>Ce que le simulateur calcule</h2>
  <ul>
    <li><strong>Marge brute</strong> en euros et en pourcentage du CA</li>
    <li><strong>Marge nette</strong> après quote-part frais de structure</li>
    <li><strong>Résultat horaire</strong> — le KPI le plus utile pour comparer deux contrats</li>
    <li><strong>Net annuel projeté</strong> sur 12 mois</li>
    <li><strong>Verdict automatique</strong> : très rentable, rentable, limite, non rentable</li>
    <li><strong>Recommandations actionnables</strong> selon le verdict (renégocier, optimiser heures, arbitrer)</li>
  </ul>
  <h2>Méthode de calcul</h2>
  <p>Marge brute = CA mensuel − (heures × coût horaire chargé + consommables + déplacements). Marge nette = marge brute − frais de structure (en pourcentage du CA, typiquement 8 à 15 %). Résultat horaire = marge nette ÷ heures sur le site.</p>
  <h2>Cibles de marge par typologie de contrat</h2>
  <ul>
    <li><strong>Bureaux standards quotidien :</strong> marge nette cible 15-20 % (Paris/IDF +2 pts, province -2 pts)</li>
    <li><strong>Cabinets médicaux / bionettoyage :</strong> marge nette cible 18-25 % (technicité + traçabilité justifient un premium)</li>
    <li><strong>Hôtellerie :</strong> marge nette cible 12-18 % (saisonnalité forte, remplacements fréquents)</li>
    <li><strong>Copropriétés :</strong> marge nette cible 12-15 % (concurrence forte, syndic exigeant)</li>
    <li><strong>Industriel / logistique :</strong> marge nette cible 10-15 % (volumes élevés, pression prix)</li>
    <li><strong>Aérospatial / salles propres :</strong> marge nette cible 18-28 % (technicité ESD/ISO majoration 30-50 %)</li>
  </ul>
  <h2>Ce qui n'est pas pris en compte</h2>
  <p>Le simulateur ne prend pas en compte les prestations ponctuelles facturées hors contrat, l'écart entre heures contractuelles et heures réellement effectuées, ni les coûts liés aux remplacements et absences imprévues. Le module pilotage de Proprely intègre ces éléments avec vos données réelles agent par agent et site par site, et affiche la marge en temps réel.</p>
  <h2>Aller plus loin</h2>
  <p>Pour fixer un prix juste avant de signer : <a href="${ORIGIN}/calculateur-prix-nettoyage-m2">calculateur de prix nettoyage au m²</a> et <a href="${ORIGIN}/blog/fixer-prix-nettoyage">guide méthode prix nettoyage 2026</a>. Pour comprendre le vrai coût horaire chargé de vos agents : <a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage">guide coût horaire chargé 2026</a>. Pour calculer le ROI global de la digitalisation : <a href="${ORIGIN}/calculateur-roi">calculateur ROI société de nettoyage</a>. La bêta privée Proprely intègre la marge par client en temps réel — <a href="${ORIGIN}/beta">candidater à la bêta</a>.</p>
`.trim()

const simulateurHtml = buildHtml({
  url: '/simulateur-rentabilite',
  title: 'Simulateur rentabilité contrat nettoyage : marge brute et nette · Proprely',
  description: "Calculez en 1 minute la marge brute, la marge nette et le résultat horaire d'un contrat de nettoyage. Verdict immédiat, recommandations actionnables, cibles par typologie.",
  schemas: [
    webpageSchema(
      'Simulateur de rentabilité Proprely',
      "Calculez la rentabilité réelle d'un contrat de nettoyage avec un verdict immédiat et des recommandations actionnables.",
      `${ORIGIN}/simulateur-rentabilite`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Simulateur de rentabilité', item: `${ORIGIN}/simulateur-rentabilite` },
      ]
    ),
    faqSchema(simulateurFaqs),
  ],
  bodyHtml: simulateurBody,
})
writePage('/simulateur-rentabilite', simulateurHtml)
generated.push('/simulateur-rentabilite')

const softwareLandingBody = `
  <h1>Logiciel pour société de nettoyage B2B</h1>
  <p>Proprely est le logiciel de gestion pensé pour les sociétés de nettoyage B2B françaises : planning des agents, devis, preuve de passage, CRM et pilotage de la rentabilité dans un seul cockpit. Ce guide complet 2026 détaille les fonctionnalités essentielles, comment choisir, et un comparatif honnête avec Excel, PROPRET et Progiclean.</p>

  <h2>Pourquoi les sociétés de nettoyage ont besoin d'un logiciel dédié</h2>
  <p>La gestion d'une société de nettoyage B2B impose un rythme et un nombre d'interactions qu'aucun outil généraliste ne sait absorber. À partir de 3 agents et 5 sites clients, la dispersion entre Excel, WhatsApp, Google Agenda et Word coûte 6 à 10 heures par semaine d'administration pure, sans compter les erreurs de pointage, les contrats sous-tarifés et les litiges client.</p>
  <p>Un CRM généraliste ignore qu'un client a plusieurs sites avec des fréquences distinctes. Un ERP couvre tout mais coûte des dizaines de milliers d'euros d'intégration. Excel ne trace rien et bloque la croissance dès 5-8 agents. Un logiciel pensé pour la propreté répond à ces angles morts :</p>
  <ul>
    <li>Excel, WhatsApp, Word et Google Agenda — 7 outils dispersés, 6 à 10 heures perdues par semaine</li>
    <li>Aucune marge par client visible en temps réel, vous facturez à l'aveugle</li>
    <li>Vos agents oublient des passages, vos clients contestent, vous perdez le contrat</li>
    <li>Les remplacements se gèrent par téléphone, sans historique, sans traçabilité</li>
    <li>Vos devis prennent 20 minutes sur Word, le concurrent envoie en 5</li>
    <li>Pas de visibilité sur le surmenage agents, vous découvrez les arrêts maladie après-coup</li>
  </ul>
  <p>Pour une société de 10 agents perdant 8 heures par semaine en administration dispersée (à 45 € de coût horaire dirigeant chargé), le coût caché atteint environ 16 800 € par an. Estimez le vôtre avec le <a href="${ORIGIN}/calculateur-roi">calculateur ROI</a> ou la marge d'un contrat avec le <a href="${ORIGIN}/simulateur-rentabilite">simulateur de rentabilité</a>.</p>

  <h2>Les 7 fonctionnalités indispensables d'un logiciel de nettoyage</h2>
  <ol>
    <li><strong>Planning des agents multi-sites</strong> — un planning unique qui affecte chaque agent selon sa spécialité, sa disponibilité et sa charge, consultable sur mobile et mis à jour en temps réel, avec récurrences et remplacements tracés.</li>
    <li><strong>Devis et facturation</strong> — devis professionnels en 2 minutes depuis un catalogue propreté, signature électronique, relances automatiques et facturation sans ressaisie.</li>
    <li><strong>Gestion des agents et des heures</strong> — profils, spécialités (vitrerie, moquette, décapage, remise en état), compteur d'heures pour la paie et alertes de surmenage.</li>
    <li><strong>Preuve de passage</strong> — QR code par site, photos avant-après horodatées, signature client et procès-verbal automatique pour sécuriser vos contrats.</li>
    <li><strong>CRM clients et sites</strong> — un client = plusieurs sites ; suivi des prospects, devis et relances, relié au planning et à la marge.</li>
    <li><strong>Pilotage et marge par client</strong> — la marge brute par client et par contrat en temps réel, à partir des heures réellement passées.</li>
    <li><strong>Documents et conformité</strong> — contrats, attestations URSSAF et certifications centralisés ; hébergement européen, RGPD et convention collective propreté (IDCC 3043).</li>
  </ol>

  <h2>Proprely : le cockpit métier des sociétés de nettoyage B2B</h2>
  <p>Proprely n'est pas un logiciel généraliste sur lequel on aurait collé un module nettoyage : c'est un cockpit conçu dès l'origine pour la propreté B2B, avec des dirigeants du secteur. Les sept briques essentielles y sont réunies et connectées, le produit est mobile-first pour les agents (un simple lien web, sans application à installer), hébergé en Europe et conforme au RGPD. Quatre modules à explorer en priorité :</p>
  <ul>
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage">Planning agents</a> — affectation 1-clic, mobile-first sans app à installer</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage">Devis professionnels</a> — 2 minutes par devis, signature électronique native</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage">Gestion des agents</a> — profils, spécialités, charge horaire, paie</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage">Preuve de passage</a> — QR, photos avant-après, signature client, PV automatique</li>
  </ul>
  <p>Volet commercial : le <a href="${ORIGIN}/crm-entreprise-proprete">CRM entreprise propreté</a> intégré. Voir aussi toutes les <a href="${ORIGIN}/fonctionnalites">fonctionnalités</a>.</p>

  <h2>Pour quelle taille de société ?</h2>
  <ul>
    <li><strong>Auto-entrepreneur &amp; solo</strong> — utile dès 3-5 clients récurrents (devis à votre charte, preuve de passage). Voir le <a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage">logiciel auto-entrepreneur nettoyage</a>.</li>
    <li><strong>3 à 15 agents</strong> — le moment idéal pour structurer avant que la dispersion ne plafonne la croissance. Cœur de cible de Proprely.</li>
    <li><strong>15 à 50 agents</strong> — agilité et pilotage de la marge en priorité, sans projet d'intégration de plusieurs mois.</li>
    <li><strong>50 agents et plus</strong> — une couche comptable/ERP peut compléter le dispositif ; comparez objectivement via le <a href="${ORIGIN}/comparatif-logiciel-nettoyage">comparatif</a>.</li>
  </ul>

  <h2>Comment choisir son logiciel de nettoyage</h2>
  <p>Au-delà du prix, huit critères séparent un outil qui fait gagner du temps d'un gadget de plus :</p>
  <ul>
    <li>Conçu spécifiquement pour la propreté B2B (un client = plusieurs sites, spécialités agents)</li>
    <li>Planning multi-sites réellement mobile-first, sans application à installer</li>
    <li>Preuve de passage standardisée (QR + photos avant-après + signature)</li>
    <li>Marge par client en temps réel, sur les heures réellement passées</li>
    <li>Devis professionnels rapides avec signature électronique</li>
    <li>Hébergement européen, RGPD et export complet des données en 1 clic</li>
    <li>Onboarding accompagné et prise en main rapide</li>
    <li>Tarif transparent et prévisible, sans coût d'intégration caché</li>
  </ul>
  <p>Comparatif Proprely vs Excel, PROPRET, Progiclean et Organilog : voir le <a href="${ORIGIN}/comparatif-logiciel-nettoyage">comparatif détaillé</a>.</p>

  <h2>Questions fréquentes</h2>
  <h3>Qu'est-ce qu'un logiciel pour société de nettoyage ?</h3>
  <p>C'est un outil qui centralise dans une seule interface les fonctions opérationnelles d'une société de propreté B2B : clients et sites, agents et spécialités, planning et affectation, missions avec preuve de passage, devis et factures, documents et pilotage de la marge. Pour une TPE/PME de 3 à 50 agents, il remplace le mille-feuille Excel + WhatsApp + Word + Google Drive utilisé en parallèle.</p>
  <h3>Quel est le meilleur logiciel pour une société de nettoyage en 2026 ?</h3>
  <p>Tout dépend de votre taille. Pour 3-50 agents en croissance ou en structuration, les SaaS verticaux modernes (dont Proprely) offrent le meilleur rapport productivité/prix avec mobile-first natif et preuve de passage. Au-delà de 50 agents, des logiciels métier historiques (PROPRET, Progiclean) ou ERP couvrent davantage la couche comptable mais avec une UX plus dense.</p>
  <h3>Combien coûte un logiciel pour société de nettoyage ?</h3>
  <p>De 15 à 60 €/utilisateur/mois pour la plupart des SaaS verticaux, à 100+ €/utilisateur pour les ERP. Proprely est gratuit pendant la bêta privée (30 places fondateurs), tarif fondateur conservé à vie après.</p>
  <h3>Mes agents doivent-ils installer une application ?</h3>
  <p>Pas avec Proprely. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone, le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G dégradée.</p>
  <h3>Peut-on remplacer Excel et WhatsApp complètement ?</h3>
  <p>Oui pour la gestion quotidienne : clients/sites, agents, planning, missions, devis, factures, documents. WhatsApp peut rester pour les échanges informels, mais l'opérationnel passe par Proprely et tout est tracé.</p>
  <h3>Quelle taille d'entreprise est concernée ?</h3>
  <p>Proprely est conçu pour les sociétés de 3 à 50 agents. Dès que vous gérez plusieurs sites et plusieurs agents, vous avez besoin de centraliser. La bêta est ouverte aux structures en croissance comme aux entreprises établies.</p>
  <h3>Mes données sont-elles sécurisées ?</h3>
  <p>Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et vous pouvez les exporter en 1 clic à tout moment.</p>
  <h3>Quelle est la différence entre Proprely et PROPRET ou Progiclean ?</h3>
  <p>PROPRET et Progiclean sont les acteurs historiques (10-15 ans) avec une couverture fonctionnelle large mais une UX datée et un mobile via app native. Proprely est un SaaS de nouvelle génération (2026) conçu mobile-first par lien web, avec preuve de passage native et marge par client en surface.</p>

  <h2>Tout l'écosystème Proprely en un coup d'œil</h2>
  <p>Pour aller plus loin dans le choix et la mise en place de votre logiciel métier société de nettoyage, voici les ressources organisées par usage :</p>
  <h3>Comparer Proprely aux concurrents du marché</h3>
  <ul>
    <li><a href="${ORIGIN}/comparatif-logiciel-nettoyage">Comparatif général logiciels société de nettoyage 2026</a></li>
    <li><a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026">Comparatif logiciels métier société de nettoyage : lequel choisir ?</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-organilog">Proprely vs Organilog</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-progiclean">Proprely vs Progiclean</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-propret">Proprely vs PROPRET</a></li>
    <li><a href="${ORIGIN}/proprely-vs-excel">Proprely vs Excel</a></li>
  </ul>
  <h3>Explorer les fonctionnalités métier</h3>
  <ul>
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage">Logiciel planning agents nettoyage</a> — affectation 1-clic, mobile sans app</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage">Logiciel devis et facturation automatisée nettoyage</a> — contrats récurrents auto</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage">Gestion agents nettoyage</a> — profils, spécialités, alertes surmenage</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage">Preuve de passage nettoyage</a> — QR, photos, signature, PV automatique</li>
    <li><a href="${ORIGIN}/crm-entreprise-proprete">CRM entreprise propreté</a> — pipeline commercial, relances</li>
  </ul>
  <h3>Calculer et chiffrer avant de signer</h3>
  <ul>
    <li><a href="${ORIGIN}/calculateur-prix-nettoyage-m2">Calculateur prix de nettoyage au m²</a> — surface, fréquence, zone, type de site</li>
    <li><a href="${ORIGIN}/simulateur-rentabilite">Simulateur rentabilité contrat</a> — marge brute, marge nette, verdict</li>
    <li><a href="${ORIGIN}/calculateur-roi">Calculateur ROI logiciel société de nettoyage</a> — coût caché de la dispersion</li>
    <li><a href="${ORIGIN}/outils">Tous les outils gratuits</a></li>
  </ul>
  <h3>Cas spécifiques par taille et par profil</h3>
  <ul>
    <li><a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage">Logiciel pour auto-entrepreneur nettoyage</a> — solo et indépendants</li>
    <li><a href="${ORIGIN}/convention-collective-nettoyage">Logiciel conforme convention collective propreté IDCC 3043</a> — grille salaires, article 7</li>
  </ul>
  <h3>Pages locales — couverture nationale</h3>
  <ul>
    <li><a href="${ORIGIN}/villes/paris">Paris &amp; Île-de-France</a> · <a href="${ORIGIN}/villes/lyon">Lyon &amp; Rhône-Alpes</a> · <a href="${ORIGIN}/villes/marseille">Marseille &amp; PACA</a> · <a href="${ORIGIN}/villes/bordeaux">Bordeaux &amp; Gironde</a> · <a href="${ORIGIN}/villes/toulouse">Toulouse &amp; Occitanie</a></li>
    <li><a href="${ORIGIN}/villes/nantes">Nantes</a> · <a href="${ORIGIN}/villes/lille">Lille</a> · <a href="${ORIGIN}/villes/nice">Nice</a> · <a href="${ORIGIN}/villes/strasbourg">Strasbourg</a> · <a href="${ORIGIN}/villes/montpellier">Montpellier</a> · <a href="${ORIGIN}/villes/rennes">Rennes</a></li>
    <li><a href="${ORIGIN}/villes">Voir toutes les pages villes</a></li>
  </ul>
  <h3>Articles de blog les plus consultés</h3>
  <ul>
    <li><a href="${ORIGIN}/blog/fixer-prix-nettoyage">Fixer ses prix dans le nettoyage : méthode 2026</a></li>
    <li><a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043">Convention collective propreté IDCC 3043 : grille salaires 2026</a></li>
    <li><a href="${ORIGIN}/blog/calcul-heures-agents-nettoyage">Calcul des heures agents nettoyage : méthode et coût 2026</a></li>
    <li><a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026">Tarif nettoyage bureaux au m² 2026</a></li>
    <li><a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage">Coût horaire chargé d'un agent en 2026</a></li>
    <li><a href="${ORIGIN}/blog/rgpd-societe-nettoyage-2026">RGPD société de nettoyage 2026</a></li>
    <li><a href="${ORIGIN}/blog/fideliser-agents-nettoyage-turnover">Fidéliser les agents : 6 leviers contre 35 % de turnover</a></li>
    <li><a href="${ORIGIN}/blog">Voir tous les articles du blog</a></li>
  </ul>

  <h2>Bêta privée Proprely</h2>
  <p>30 sociétés fondatrices, accès gratuit pendant toute la bêta, tarif privilégié à vie après le lancement public. Onboarding 30 min avec le fondateur. <a href="${ORIGIN}/beta">Candidater à la bêta</a> · <a href="${ORIGIN}/tarifs">Tarifs</a>.</p>
`.trim()

const softwareLandingFaqs = [
  { q: "Qu'est-ce qu'un logiciel pour société de nettoyage ?", a: "C'est un outil qui centralise dans une seule interface les fonctions opérationnelles d'une société de propreté B2B : clients et sites, agents et spécialités, planning et affectation, missions avec preuve de passage, devis et factures, documents et pilotage de la marge. Pour une TPE/PME de 3 à 50 agents, il remplace le mille-feuille Excel + WhatsApp + Word + Google Drive utilisé en parallèle." },
  { q: "Quel est le meilleur logiciel pour une société de nettoyage en 2026 ?", a: "Tout dépend de votre taille. Pour 3-50 agents en croissance ou en structuration, les SaaS verticaux modernes (dont Proprely) offrent le meilleur rapport productivité/prix avec mobile-first natif et preuve de passage. Au-delà de 50 agents, des logiciels métier historiques (PROPRET, Progiclean) ou ERP couvrent davantage la couche comptable mais avec une UX plus dense." },
  { q: "Combien coûte un logiciel pour société de nettoyage ?", a: "De 15 à 60 €/utilisateur/mois pour la plupart des SaaS verticaux, à 100+ €/utilisateur pour les ERP. Proprely est gratuit pendant la bêta privée (30 places fondateurs), tarif fondateur conservé à vie après." },
  { q: "Mes agents doivent-ils installer une application ?", a: "Pas avec Proprely. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone, le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G dégradée." },
  { q: "Peut-on remplacer Excel et WhatsApp complètement ?", a: "Oui pour la gestion quotidienne : clients/sites, agents, planning, missions, devis, factures, documents. WhatsApp peut rester pour les échanges informels, mais l'opérationnel passe par Proprely et tout est tracé." },
  { q: "Quelle taille d'entreprise est concernée ?", a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Dès que vous gérez plusieurs sites et plusieurs agents, vous avez besoin de centraliser. La bêta est ouverte aux structures en croissance comme aux entreprises établies." },
  { q: "Mes données sont-elles sécurisées ?", a: "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire de vos données à 100% et vous pouvez les exporter en 1 clic à tout moment." },
  { q: "Quelle est la différence entre Proprely et PROPRET ou Progiclean ?", a: "PROPRET et Progiclean sont les acteurs historiques (10-15 ans) avec une couverture fonctionnelle large mais une UX datée et un mobile via app native. Proprely est un SaaS de nouvelle génération (2026) conçu mobile-first par lien web, avec preuve de passage native et marge par client en surface. Voir notre comparatif détaillé : /comparatif-logiciel-nettoyage." },
]

const softwareLandingHtml = buildHtml({
  url: '/logiciel-societe-nettoyage',
  title: 'Logiciel société de nettoyage B2B : guide complet 2026 · Proprely',
  description: "Logiciel de gestion pour société de nettoyage B2B : planning, devis, preuve de passage, CRM, rentabilité. Bêta gratuite — 14 places.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Proprely',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: "Logiciel de gestion pour société de nettoyage B2B : clients, agents, planning, devis, preuve de passage.",
      url: `${ORIGIN}/logiciel-societe-nettoyage`,
      publisher: { '@id': `${ORIGIN}/#organization` },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/LimitedAvailability',
        price: '0',
        priceCurrency: 'EUR',
        description: "Accès gratuit pendant la bêta privée, sur sélection",
      },
      featureList: ['Planning des agents multi-sites', 'Devis et facturation', 'Gestion des agents et des heures', 'Preuve de passage', 'CRM clients et sites', 'Pilotage et marge par client', 'Documents et conformité'],
    },
    webpageSchema(
      'Logiciel pour société de nettoyage',
      "Guide complet 2026 pour choisir un logiciel propreté B2B.",
      `${ORIGIN}/logiciel-societe-nettoyage`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Logiciel société de nettoyage', item: `${ORIGIN}/logiciel-societe-nettoyage` },
      ]
    ),
    faqSchema(softwareLandingFaqs),
  ],
  bodyHtml: softwareLandingBody,
})
writePage('/logiciel-societe-nettoyage', softwareLandingHtml)
generated.push('/logiciel-societe-nettoyage')

const comparatifBody = `
  <h1>Comparatif logiciels société de nettoyage 2026 : lequel choisir ?</h1>
  <p>Comparatif factuel des principaux outils du marché : Proprely, Organilog, Progiclean, PROPRET, Synchroteam et Excel. 13 critères qui comptent au quotidien, 4 profils types avec recommandation explicite, 8 questions fréquentes.</p>
  <h2>Les outils comparés</h2>
  <ul>
    <li><strong>Proprely</strong> — SaaS vertical 2026, mobile-first, gratuit en bêta privée (3-50 agents)</li>
    <li><strong>PROPRET</strong> — Logiciel métier historique (10+ ans), couverture large, app native (10-200 agents)</li>
    <li><strong>Progiclean</strong> — Logiciel métier historique, UX dense (10-100 agents)</li>
    <li><strong>Organilog</strong> — Field service générique (5-100 agents), pas spécifique propreté</li>
    <li><strong>Synchroteam</strong> — Field service générique (5-100 agents), app native, non spécifique propreté</li>
    <li><strong>Excel</strong> — Tableur généraliste, OK pour 1-8 agents en démarrage</li>
  </ul>
  <h2>Critères du comparatif</h2>
  <p>Conçu propreté B2B, essai gratuit, planning drag-and-drop, devis intégré et signature électronique, preuve de passage native, marge par client en temps réel, application mobile agents, spécialités agents, hébergement européen RGPD, export libre, onboarding accompagné, support en français, tarif transparent.</p>
  <h2>Recommandations par profil</h2>
  <ul>
    <li>1-5 agents : Excel + modèles Proprely gratuits suffisent — <a href="${ORIGIN}/ressources">Voir les modèles</a></li>
    <li>3-15 agents en structuration : Proprely (SaaS moderne) — <a href="${ORIGIN}/beta">Candidater à la bêta</a></li>
    <li>15-50 agents : Proprely (agilité, marge) ou PROPRET/Progiclean (comptabilité)</li>
    <li>50+ agents : ERP métier ou PROPRET/Progiclean entreprise</li>
  </ul>
  <h2>Aller plus loin</h2>
  <ul>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-organilog">Proprely vs Organilog</a> · <a href="${ORIGIN}/comparatif/proprely-vs-progiclean">Proprely vs Progiclean</a> · <a href="${ORIGIN}/comparatif/proprely-vs-propret">Proprely vs PROPRET</a> · <a href="${ORIGIN}/proprely-vs-excel">Proprely vs Excel</a></li>
    <li><a href="${ORIGIN}/tarifs">Tarifs Proprely</a> · <a href="${ORIGIN}/fonctionnalites">Toutes les fonctionnalités</a> · <a href="${ORIGIN}/logiciel-societe-nettoyage">Le guide complet</a></li>
    <li>Méthode détaillée : <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026">Comparatif logiciels nettoyage 2026 : grille de lecture honnête</a></li>
  </ul>
`.trim()

const comparatifFaqs = [
  { q: "Quel est le meilleur logiciel pour société de nettoyage en 2026 ?", a: "Pas de réponse unique : ça dépend de la taille (3-50 agents vs 50+), du mix client (syndics, hôtels, médical, industriel) et de votre niveau de digitalisation. Pour les PME 3-50 agents en croissance, les SaaS verticaux modernes (Proprely) offrent le meilleur rapport productivité/prix." },
  { q: "Faut-il prendre un logiciel installé ou en SaaS ?", a: "SaaS dans 95% des cas. L'installé impose maintenance, sauvegardes, et bloque le travail terrain. Les SaaS modernes sont plus sûrs, à jour, accessibles depuis n'importe quel téléphone." },
  { q: "PROPRET ou Proprely : que choisir ?", a: "PROPRET est l'acteur historique : couverture large, UX dense, app native, intégration par consultant. Proprely est un SaaS nouvelle génération : mobile-first par lien web, marge en surface, onboarding 30 min avec le fondateur. PROPRET pour 50+ agents avec besoins comptables avancés ; Proprely pour 3-50 agents avec besoin de productivité quotidienne." },
  { q: "Progiclean ou Proprely : que choisir ?", a: "Progiclean est solide pour 10-100 agents avec spécialisation propreté forte. Compromis : UX datée et app native obligatoire. Proprely propose la même couverture sur les 4 modules essentiels avec une UX 2026 et un mobile sans app." },
  { q: "Organilog est un bon choix pour la propreté ?", a: "Organilog est conçu pour le field service générique (BTP, maintenance, services). Faible sur la spécificité propreté : pas de catalogue prestations propreté, marges par client absentes, agents avec compétences génériques." },
  { q: "Combien coûte un logiciel de nettoyage ?", a: "15-60 €/utilisateur/mois pour les SaaS verticaux, 100+ €/utilisateur pour les ERP métier. Proprely est gratuit pendant la bêta, tarif fondateur à vie après." },
  { q: "Quels critères vérifier en démo ?", a: "5 tests à demander : affecter un agent en 1 clic, voir l'écran mobile agent, générer un PV de passage avec photos, voir la marge en temps réel sur un client, exporter l'intégralité des données. Si l'un prend plus de 30 secondes, cherchez ailleurs." },
  { q: "Combien de temps pour migrer ?", a: "30 min à 1 journée pour les SaaS verticaux modernes. 3 à 6 mois pour un ERP avec consultant intégrateur." },
]

const comparatifSoftwares: { name: string; description: string; url: string }[] = [
  { name: 'Proprely', description: "Cockpit métier B2B nouvelle génération (2026) conçu pour les TPE/PME nettoyage 3-50 agents. Planning, devis, preuve de passage, marge par client.", url: `${ORIGIN}/` },
  { name: 'PROPRET', description: "ERP métier historique de la propreté (depuis ~2005). Couverture fonctionnelle large (paie, GED) destinée aux PME/ETI 50+ agents.", url: `${ORIGIN}/comparatif/proprely-vs-propret` },
  { name: 'Progiclean', description: "ERP métier propreté historique (depuis ~2000). Setup sur devis, abonnement annuel, cible PME/ETI 50+ agents.", url: `${ORIGIN}/comparatif/proprely-vs-progiclean` },
  { name: 'Organilog', description: "Suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Forfait par utilisateur/mois, non spécifique propreté.", url: `${ORIGIN}/comparatif/proprely-vs-organilog` },
  { name: 'Synchroteam', description: "Solution de gestion d'interventions multi-secteurs avec planning et géolocalisation, non spécifique au nettoyage.", url: 'https://www.synchroteam.com/' },
]

const comparatifHtml = buildHtml({
  url: '/comparatif-logiciel-nettoyage',
  title: 'Comparatif logiciels société de nettoyage 2026 : lequel choisir ? · Proprely',
  description: "Comparatif honnête des logiciels société de nettoyage 2026 : Proprely, PROPRET, Progiclean, Organilog, Excel. Critères, tarifs, qui choisir.",
  schemas: [
    webpageSchema(
      'Comparatif logiciel nettoyage 2026',
      "Comparatif factuel des 5 principaux outils du marché propreté B2B.",
      `${ORIGIN}/comparatif-logiciel-nettoyage`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Comparatif logiciel nettoyage', item: `${ORIGIN}/comparatif-logiciel-nettoyage` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Logiciels société de nettoyage comparés en 2026',
      description: "Liste des logiciels analysés dans le comparatif Proprely 2026 pour les sociétés de nettoyage B2B en France.",
      numberOfItems: comparatifSoftwares.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: comparatifSoftwares.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: s.url,
        item: {
          '@type': 'SoftwareApplication',
          name: s.name,
          description: s.description,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: s.url,
        },
      })),
    },
    faqSchema(comparatifFaqs),
  ],
  bodyHtml: comparatifBody,
})
writePage('/comparatif-logiciel-nettoyage', comparatifHtml)
generated.push('/comparatif-logiciel-nettoyage')

const autoEntrepreneurBody = `
  <h1>Logiciel auto-entrepreneur nettoyage : gérer seul sans se perdre</h1>
  <p>Vous êtes auto-entrepreneur ou solo en nettoyage. Vous portez tout : devis, planning, facturation, relances. Proprely vous fait gagner 1 à 3 heures par semaine et vous donne l'image d'une vraie société pro.</p>
  <h2>Le quotidien d'un auto-entrepreneur en nettoyage</h2>
  <p>Quand vous êtes seul à porter votre activité, chaque heure passée en admin est une heure de moins en chantier ou en prospection.</p>
  <h2>Ce que Proprely fait pour vous</h2>
  <ul>
    <li>Devis pro en 2 minutes avec signature électronique</li>
    <li>Planning par semaine visible sur téléphone</li>
    <li>Mobile sur le terrain avec preuve de passage</li>
    <li>Conformité RGPD intégrée</li>
  </ul>
  <h2>Avant / Après</h2>
  <p>Avant : 5-6h d'admin par semaine. Avec Proprely : 1h30. À 30 €/heure réel, c'est 600 €/mois récupérés.</p>
  <h2>Gratuit pendant la bêta</h2>
  <p>30 places fondateurs incluant des auto-entrepreneurs. <a href="${ORIGIN}/beta">Candidater à la bêta</a>. Voir aussi nos <a href="${ORIGIN}/ressources">modèles gratuits</a>.</p>
`.trim()

const autoEntrepreneurFaqs = [
  { q: "Proprely est-il adapté à un auto-entrepreneur en nettoyage ?", a: "Oui à partir de 3-5 clients récurrents. En-dessous, un template Word et Excel suffit. Au-delà, vous gagnez 1 à 3 heures par semaine." },
  { q: "Combien coûte Proprely pour un auto-entrepreneur ?", a: "Gratuit pendant la bêta privée (30 places fondateurs). Tarif fondateur conservé à vie." },
  { q: "Mes clients verront-ils que je suis seul à gérer ?", a: "Non. Devis à votre charte, factures à votre SIRET, mentions auto-entrepreneur intégrées, signature électronique." },
  { q: "Peut-on connecter Proprely à mon comptable ?", a: "Oui. Export CSV/PDF pour comptable, connexion Pennylane en finalisation." },
  { q: "Que se passe-t-il quand j'embauche mon premier salarié ?", a: "Proprely bascule vers le mode multi-agents sans rupture. Vos données restent." },
  { q: "Combien de temps pour la mise en route ?", a: "30 minutes avec le fondateur. Vos clients, prestations et créneaux sont importés." },
  { q: "Faut-il un logiciel pour seulement 2-3 clients ?", a: "Non. Un template Word et Excel suffit (modèles gratuits sur /ressources). Dès 5+ clients récurrents, vous récupérez du temps." },
]

const autoEntrepreneurHtml = buildHtml({
  url: '/logiciel-auto-entrepreneur-nettoyage',
  title: 'Logiciel auto-entrepreneur nettoyage : gérer seul sans se perdre · Proprely',
  description: "Logiciel pour auto-entrepreneur en nettoyage : devis, clients, planning, facturation, suivi heures. Conçu pour les indépendants qui démarrent ou solo établis.",
  schemas: [
    webpageSchema(
      'Logiciel auto-entrepreneur nettoyage',
      "Logiciel pour auto-entrepreneur en nettoyage : devis, planning, facturation, suivi.",
      `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Logiciel auto-entrepreneur nettoyage', item: `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage` },
      ]
    ),
    faqSchema(autoEntrepreneurFaqs),
  ],
  bodyHtml: autoEntrepreneurBody,
})
writePage('/logiciel-auto-entrepreneur-nettoyage', autoEntrepreneurHtml)
generated.push('/logiciel-auto-entrepreneur-nettoyage')

const crmBody = `
  <h1>CRM entreprise propreté : suivez clients, sites et prospects</h1>
  <p>Un CRM pensé pour la réalité d'une société de nettoyage B2B : un compte client = plusieurs sites avec fréquences distinctes, pipeline devis avec relances auto, lien direct prospect → planning agents → marge réelle.</p>
  <h2>Pourquoi HubSpot ou Salesforce ne suffit pas</h2>
  <p>Les CRM généralistes sont d'excellents outils pour la vente complexe. La propreté B2B a des spécificités qu'ils ne couvrent pas :</p>
  <ul>
    <li>Pas de notion native de site client (un client = plusieurs sites)</li>
    <li>Pas de catalogue prestations propreté</li>
    <li>Pas de lien automatique entre prospect signé et planning agents</li>
    <li>Pas de visibilité sur la marge par client en temps réel</li>
    <li>Onboarding lourd et tarif élevé (40-80 €/utilisateur/mois minimum)</li>
  </ul>
  <h2>Le CRM Proprely</h2>
  <ul>
    <li>Comptes clients + sites multiples avec contacts par fonction</li>
    <li>Pipeline prospects et devis avec relances auto J+5 et J+10</li>
    <li>Contacts par site (directeur, facility manager, gardien, syndic)</li>
    <li>Historique des appels, mails, RDV</li>
    <li>Devis et catalogue prestations propreté pré-configuré</li>
    <li>Marge par client en temps réel</li>
  </ul>
  <h2>Tout connecté</h2>
  <p>Un prospect signé devient un client avec ses sites en 1 clic. Les sites alimentent le <a href="${ORIGIN}/fonctionnalites/planning-nettoyage">planning des agents</a>. Voir aussi le <a href="${ORIGIN}/fonctionnalites/devis-nettoyage">module devis</a>.</p>
  <h2>Gratuit en bêta privée</h2>
  <p>30 places fondateurs, tarif fondateur à vie. <a href="${ORIGIN}/beta">Candidater à la bêta</a>.</p>
`.trim()

const crmFaqs = [
  { q: "Pourquoi un CRM spécifique pour la propreté ?", a: "Parce que HubSpot, Salesforce ou Pipedrive sont conçus pour la vente complexe SaaS ou B2B industrielle. Ils ne couvrent pas les spécificités propreté : un client = plusieurs sites, catalogue prestations métier, lien direct prospect → planning agents, marge par compte en temps réel." },
  { q: "Combien coûte un CRM propreté ?", a: "Les CRM généralistes coûtent 40-80 €/utilisateur/mois minimum (200+ pour Salesforce). Proprely intègre les fonctions CRM : gratuit pendant la bêta, tarif fondateur à vie après." },
  { q: "Quelle différence avec HubSpot pour mon entreprise de nettoyage ?", a: "HubSpot excelle sur la vente complexe (6-12 mois). En propreté B2B, la vente est plus rapide (devis → signature en 1-3 semaines) et le besoin est de relier prospect → contrat → planning → marge." },
  { q: "Peut-on migrer depuis HubSpot ou Salesforce ?", a: "Oui. Vos comptes et contacts sont importés depuis un export CSV. Configuration du catalogue prestations à l'onboarding (30 min)." },
  { q: "Synchronisation Outlook / Gmail ?", a: "Synchronisation calendrier en finalisation. Connexion email prévue après la bêta." },
  { q: "Le module CRM est-il disponible séparément ?", a: "Non. Proprely est un cockpit unifié : clients/sites + agents + planning + devis + factures + documents + pilotage." },
  { q: "Combien de prospects et clients Proprely supporte-t-il ?", a: "Pas de limite imposée. Le produit est conçu pour 3-50 agents avec typiquement 10-150 sites clients." },
]

const crmHtml = buildHtml({
  url: '/crm-entreprise-proprete',
  title: 'CRM entreprise propreté : suivez clients et prospects · Proprely',
  description: "CRM pensé pour les entreprises de propreté : pipeline commercial, suivi clients et sites, relances devis, marge par compte. Conçu pour la propreté B2B française.",
  schemas: [
    webpageSchema(
      'CRM entreprise propreté Proprely',
      "CRM métier propreté : comptes + sites, pipeline devis, marge par client.",
      `${ORIGIN}/crm-entreprise-proprete`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'CRM entreprise propreté', item: `${ORIGIN}/crm-entreprise-proprete` },
      ]
    ),
    faqSchema(crmFaqs),
  ],
  bodyHtml: crmBody,
})
writePage('/crm-entreprise-proprete', crmHtml)
generated.push('/crm-entreprise-proprete')

// === Comparatifs concurrents (vs-organilog, vs-progiclean, vs-propret) ===
const { comparisons } = await import('../src/data/comparisons.ts')
for (const c of comparisons) {
  const url = `/comparatif/${c.slug}`
  const cmpUrl = `${ORIGIN}${url}`
  const tableHtml = c.comparisonTable
    .map(
      (r) =>
        `<tr><td>${escapeHtml(r.criterion)}</td><td>${escapeHtml(r.proprely)}</td><td>${escapeHtml(r.competitor)}</td></tr>`,
    )
    .join('')
  const diffsHtml = c.keyDifferences
    .map((d) => `<h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.description)}</p>`)
    .join('')
  const faqHtml = c.faq
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')
  const whoProprely = c.whoChooses.proprely.map((i) => `<li>${escapeHtml(i)}</li>`).join('')
  const whoCompetitor = c.whoChooses.competitor.map((i) => `<li>${escapeHtml(i)}</li>`).join('')

  const bodyHtml = `
    <h1>${escapeHtml(c.title)}</h1>
    <aside><p><strong>Réponse-flash :</strong> ${escapeHtml(c.tldr)}</p></aside>
    <h2>${escapeHtml(c.competitorName)} en quelques mots</h2>
    <p>${escapeHtml(c.competitorPitch)}</p>
    <h2>Tableau comparatif Proprely vs ${escapeHtml(c.competitorName)}</h2>
    <table>
      <thead><tr><th>Critère</th><th>Proprely</th><th>${escapeHtml(c.competitorName)}</th></tr></thead>
      <tbody>${tableHtml}</tbody>
    </table>
    <h2>Différences structurelles</h2>
    ${diffsHtml}
    <h2>Qui choisit Proprely</h2>
    <ul>${whoProprely}</ul>
    <h2>Qui choisit ${escapeHtml(c.competitorName)}</h2>
    <ul>${whoCompetitor}</ul>
    <h2>Questions fréquentes sur Proprely vs ${escapeHtml(c.competitorName)}</h2>
    ${faqHtml}
  `.trim()

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: c.title,
      description: c.metaDescription,
      url: cmpUrl,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      abstract: c.tldr,
      mentions: c.competitorUrl
        ? [{ '@type': 'Organization', name: c.competitorName, url: c.competitorUrl }]
        : [{ '@type': 'Organization', name: c.competitorName }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Comparatif', item: `${ORIGIN}/comparatif-logiciel-nettoyage` },
        { '@type': 'ListItem', position: 3, name: `Proprely vs ${c.competitorName}`, item: cmpUrl },
      ],
    },
    faqSchema(c.faq),
  ]

  const html = buildHtml({
    url,
    title: c.metaTitle,
    description: c.metaDescription,
    ogTitle: c.title,
    ogDescription: c.metaDescription,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

// === Page À propos ===
const aboutBody = `
  <h1>Libérer les dirigeants du nettoyage de la dispersion administrative</h1>
  <p>Proprely est le cockpit métier qui centralise clients, sites, agents, planning, missions, devis et pilotage d'une société de nettoyage B2B dans un seul outil. Conçu en France, en bêta privée auprès de 30 sociétés fondatrices.</p>
  <h2>Notre mission</h2>
  <p>Diriger une société de nettoyage B2B en France en 2026, c'est jongler entre Excel pour le planning, WhatsApp pour les changements de dernière minute, Word pour les devis, Google Drive pour les documents, et le papier pour la preuve de passage. Résultat : 6 à 10 heures par semaine perdues par le dirigeant en administration dispersée. À 45 € de coût horaire, c'est 12 600 à 21 000 € de coût caché par an.</p>
  <p>Notre mission : libérer ces heures et cette charge mentale. Un seul cockpit qui centralise tout, conçu avec les dirigeants qui l'utilisent, sur la convention collective IDCC 3043 et les exigences réelles des syndics, facility managers et clients B2B français.</p>
  <h2>Nos engagements</h2>
  <ul>
    <li><strong>Conçu avec des dirigeants du nettoyage</strong> — chaque fonctionnalité construite à partir d'entretiens terrain.</li>
    <li><strong>Bêta privée accompagnée et gratuite</strong> — 30 sociétés fondatrices, onboarding 30 min avec le fondateur, tarif fondateur conservé à vie.</li>
    <li><strong>Vos données restent vos données</strong> — hébergement européen, chiffrement, RGPD, export 1-clic.</li>
    <li><strong>Édité par une société IT établie</strong> — Pershing Global Solutions LTD (Dublin), spécialisée dans les logiciels métiers sur mesure.</li>
  </ul>
  <h2>L'auteur des articles</h2>
  <p><strong>Paul Munier</strong>, Business Developer &amp; rédacteur chez Proprely. Paul est en charge du développement commercial et signe la plupart des articles du blog. Il s'appuie sur des entretiens réguliers avec des dirigeants de sociétés de nettoyage B2B et sur la convention collective IDCC 3043 pour traiter les sujets concrets du métier : tarification, calcul des heures, transferts article 7, fidélisation des agents, choix d'outils. Profil LinkedIn : <a href="https://www.linkedin.com/in/paulmunier/" rel="noopener noreferrer">linkedin.com/in/paulmunier</a>.</p>
  <h2>Notre histoire</h2>
  <h3>Février 2026 — Premiers entretiens</h3>
  <p>Premiers entretiens terrain avec des dirigeants de sociétés de nettoyage B2B. Constat partagé : 6 à 10 heures par semaine perdues à jongler entre Excel, WhatsApp, Word, Drive et papier.</p>
  <h3>Mars 2026 — Construction</h3>
  <p>Construction du produit avec un panel de dirigeants. Itérations hebdomadaires, focus sur les 7 modules essentiels.</p>
  <h3>Juillet 2026 — Bêta privée</h3>
  <p>Ouverture à 30 sociétés fondatrices, support prioritaire, conditions tarifaires préférentielles à vie.</p>
  <h2>Éditeur</h2>
  <p>Proprely est édité par <strong>Pershing Global Solutions LTD</strong>, société IT spécialisée dans le développement de logiciels métiers sur mesure. Siège social : 77 Camden Lower Street, Saint Kevin, Dublin D02 XE80, Irlande. Plus d'informations sur <a href="https://pershingsolution.com">pershingsolution.com</a>.</p>
  <p>Service support et commercial en français : <a href="mailto:contact@proprely.fr">contact@proprely.fr</a>.</p>
`.trim()

const aboutHtml = buildHtml({
  url: '/a-propos',
  title: 'À propos de Proprely : notre mission et notre équipe · Proprely',
  description: "Proprely est édité par Pershing Global Solutions LTD. Notre mission : libérer les dirigeants de sociétés de nettoyage B2B de la dispersion.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'À propos de Proprely',
      description: "Mission, engagements, histoire et éditeur de Proprely.",
      url: `${ORIGIN}/a-propos`,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      mainEntity: { '@id': `${ORIGIN}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${ORIGIN}/a-propos#paul-munier`,
      name: 'Paul Munier',
      jobTitle: 'Business Developer & rédacteur',
      url: `${ORIGIN}/a-propos`,
      sameAs: ['https://www.linkedin.com/in/paulmunier/'],
      worksFor: { '@id': `${ORIGIN}/#organization` },
      knowsAbout: [
        'Logiciel de gestion société de nettoyage',
        'Convention collective propreté IDCC 3043',
        'Pilotage de marge en propreté B2B',
        'Planning multi-sites pour société de nettoyage',
        'Preuve de passage et conformité syndic',
      ],
      description: "Paul Munier est en charge du développement commercial chez Proprely et signe la plupart des articles du blog. Il s'appuie sur des entretiens réguliers avec des dirigeants de sociétés de nettoyage B2B et sur la convention collective IDCC 3043.",
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'À propos', item: `${ORIGIN}/a-propos` },
      ],
    },
  ],
  bodyHtml: aboutBody,
})
writePage('/a-propos', aboutHtml)
generated.push('/a-propos')

// === Page /outils (index outils gratuits) ===
const toolsBody = `
  <h1>Outils et calculateurs gratuits pour société de nettoyage en 2026</h1>
  <p>Pour piloter une société de nettoyage B2B sereinement, quatre calculs sont décisifs : le prix de vente au m², la marge nette par contrat, le coût horaire chargé des agents et le ROI de la digitalisation. Proprely met à disposition quatre outils en accès libre, sans inscription, pour répondre à chacune de ces questions en moins de 5 minutes.</p>
  <h2>Quatre outils utilisables tout de suite</h2>
  <ul>
    <li><a href="${ORIGIN}/calculateur-prix-nettoyage-m2"><strong>Calculateur prix de nettoyage au m²</strong></a> — estimez le prix de vente d'une prestation selon surface, fréquence (quotidienne, 3×/semaine, hebdomadaire), zone géographique (Paris, IDF, métropoles, villes moyennes, rural) et type de site (bureaux, médical, hôtellerie, industriel). Bénéfice : éviter de sous-tarifer un contrat avant de le signer (1 min).</li>
    <li><a href="${ORIGIN}/simulateur-rentabilite"><strong>Simulateur de rentabilité par contrat</strong></a> — marge brute, marge nette, résultat horaire et verdict immédiat (très rentable / rentable / limite / non rentable) avec recommandations actionnables selon votre situation. Bénéfice : identifier les contrats qui rongent votre rentabilité avant qu'ils ne creusent un trou (1 min).</li>
    <li><a href="${ORIGIN}/calculateur-roi"><strong>Calculateur ROI dispersion administrative</strong></a> — combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word. Benchmark : 6 à 10 h/semaine perdues pour une PME de 8-15 agents, soit 12 600 à 21 000 €/an. Bénéfice : objectiver le coût caché de la non-digitalisation (30 sec).</li>
    <li><a href="${ORIGIN}/ressources/modele-suivi-heures-agents"><strong>Coût horaire chargé d'un agent — modèle Excel</strong></a> — calcul du coût horaire réel d'un agent au SMIC propreté 2026, charges sociales et primes incluses (panier, transport, salissure). Bénéfice : connaître précisément le coût horaire à charger sur chaque contrat. À télécharger et adapter à vos paramètres (5 min).</li>
  </ul>
  <h2>Pour quel profil quel outil ?</h2>
  <ul>
    <li><strong>Vous êtes en phase de prospection</strong> et préparez une réponse à un nouveau client : commencez par le <a href="${ORIGIN}/calculateur-prix-nettoyage-m2">calculateur prix au m²</a>, puis validez la rentabilité prévisionnelle avec le <a href="${ORIGIN}/simulateur-rentabilite">simulateur de rentabilité</a>.</li>
    <li><strong>Vous voulez auditer un contrat existant</strong> qui vous semble fragile : utilisez directement le <a href="${ORIGIN}/simulateur-rentabilite">simulateur de rentabilité</a> avec les vraies données du contrat (CA, heures, coûts).</li>
    <li><strong>Vous hésitez à digitaliser votre gestion</strong> : commencez par le <a href="${ORIGIN}/calculateur-roi">calculateur ROI</a> pour mesurer le coût caché de la dispersion, puis lisez le <a href="${ORIGIN}/blog/digitaliser-entreprise-nettoyage-5-etapes">guide digitalisation en 5 étapes</a>.</li>
    <li><strong>Vous préparez votre prochaine grille de salaires</strong> : téléchargez le <a href="${ORIGIN}/ressources/modele-suivi-heures-agents">modèle coût horaire chargé</a> et croisez avec la <a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043">convention collective propreté IDCC 3043</a>.</li>
  </ul>
  <h2>Aller plus loin — guides et ressources</h2>
  <p>Pour approfondir le pilotage de votre société : <a href="${ORIGIN}/blog/fixer-prix-nettoyage">méthode prix nettoyage 2026</a>, <a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage">coût horaire chargé d'un agent</a>, <a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026">tarif nettoyage bureaux au m² 2026</a>, <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026">comparatif logiciels métier nettoyage 2026</a>. Tous les <a href="${ORIGIN}/ressources">modèles Excel téléchargeables</a> sont accessibles sans inscription. Pour passer à un cockpit unifié, la <a href="${ORIGIN}/beta">bêta privée Proprely</a> est gratuite pour les 30 sociétés fondatrices.</p>
`.trim()

const toolsHtml = buildHtml({
  url: '/outils',
  title: 'Outils gratuits pour société de nettoyage · Proprely',
  description: "Calculateurs et simulateurs gratuits : prix au m², coût horaire chargé, marge de contrat, ROI dispersion. Pour dirigeants de sociétés de nettoyage B2B en France.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Outils gratuits pour société de nettoyage',
      description: "Calculateurs et simulateurs gratuits : prix au m², coût horaire chargé, marge de contrat, ROI dispersion.",
      url: `${ORIGIN}/outils`,
      inLanguage: 'fr-FR',
      datePublished: '2026-05-21',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Calculateur prix de nettoyage au m²', url: `${ORIGIN}/calculateur-prix-nettoyage-m2` },
          { '@type': 'ListItem', position: 2, name: 'Simulateur de rentabilité contrat', url: `${ORIGIN}/simulateur-rentabilite` },
          { '@type': 'ListItem', position: 3, name: 'Calculateur ROI dispersion', url: `${ORIGIN}/calculateur-roi` },
          { '@type': 'ListItem', position: 4, name: "Coût horaire chargé d'un agent (modèle Excel)", url: `${ORIGIN}/ressources/modele-suivi-heures-agents` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: `${ORIGIN}/outils` },
      ],
    },
  ],
  bodyHtml: toolsBody,
})
writePage('/outils', toolsHtml)
generated.push('/outils')

// === Calculateur prix nettoyage au m² (page longue traîne SEO) ===
const priceFaqs = [
  { q: "Quel est le prix moyen du nettoyage de bureaux au m² en France en 2026 ?", a: "Entre 12 et 18 € HT/m²/an, soit ~1-1,5 €/m²/mois. La fourchette varie selon la zone géographique (Paris/IDF +15-25 %, ville moyenne -10 %), le type de local (médical +30-50 % vs bureau standard), la fréquence et les prestations annexes (vitrerie, moquette)." },
  { q: "Comment calcule-t-on le prix au m² pour une prestation de nettoyage ?", a: "Méthode : prix de base au m² (selon type de local) × multiplicateur de zone géographique × multiplicateur de fréquence. Cette estimation donne un prix annuel HT. Divisez par 12 pour le forfait mensuel. Ajustez ensuite selon les contraintes horaires (avant 6h ou après 21h : +30 à 60 %) et les prestations annexes." },
  { q: "Le prix du nettoyage est-il plus cher à Paris qu'en province ?", a: "Oui. Le marché Paris / Île-de-France est typiquement 15 à 25 % au-dessus de la moyenne nationale, en raison du coût de la vie (salaires agents + 5-10 %), de la densité tertiaire, et de la concurrence sur les marchés syndic / facility. Les grandes métropoles (Lyon, Marseille, Lille) sont alignées à la moyenne nationale. Villes moyennes : -10 %. Zones rurales : -18 %." },
  { q: "Comment justifier un prix au m² plus élevé que la concurrence ?", a: "Détaillez les prestations (qui fait quoi, à quelle fréquence), listez les produits utilisés et leurs certifications (écolabels), intégrez la preuve de passage (QR + photos + signature), les engagements de remplacement et les délais de réactivité. Un devis détaillé justifie un prix 15-20 % supérieur sans difficulté." },
]

const priceBody = `
  <h1>Calculateur prix de nettoyage de bureaux au m² en 2026</h1>
  <p>Estimez le prix de vente d'une prestation de nettoyage selon la surface, le type de local, la zone géographique et la fréquence. Fourchette basse / haute basée sur les prix marché observés en France en 2026.</p>
  <h2>Prix au m² indicatifs (base 2026)</h2>
  <ul>
    <li>Bureaux standards : 13 €/m²/an HT</li>
    <li>Bureaux premium : 17 €/m²/an HT</li>
    <li>Cabinets médicaux / labos : 21 €/m²/an HT (protocoles bionettoyage)</li>
    <li>Sites industriels : 9 €/m²/an HT</li>
    <li>Commerces / retail : 14 €/m²/an HT</li>
  </ul>
  <h2>Multiplicateurs zone géographique</h2>
  <ul>
    <li>Paris / Île-de-France : +20 %</li>
    <li>Grande métropole (Lyon, Marseille, Lille, Bordeaux, Toulouse, Nantes) : référence</li>
    <li>Ville moyenne (50 000-200 000 hab) : -10 %</li>
    <li>Zone rurale / petite ville : -18 %</li>
  </ul>
  <h2>Multiplicateurs fréquence</h2>
  <ul>
    <li>1×/semaine : 0,65</li>
    <li>2×/semaine : 0,78</li>
    <li>3×/semaine : 0,88</li>
    <li>4×/semaine : 0,95</li>
    <li>5×/semaine (quotidien) : 1,00 (base)</li>
    <li>6×/semaine : 1,12</li>
  </ul>
  <h2>Comment lire le résultat</h2>
  <p>La fourchette basse / haute reflète l'écart de marché entre prestataires "low-cost" et "premium". Si vous facturez en-dessous de la fourchette basse, votre marge est probablement insuffisante. Au-dessus, vous devez pouvoir justifier la différence (preuve de passage, certifications, réactivité).</p>
  <h2>Questions fréquentes</h2>
  ${priceFaqs.map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`).join('')}
`.trim()

const priceHtml = buildHtml({
  url: '/calculateur-prix-nettoyage-m2',
  title: 'Calculateur prix nettoyage bureaux au m² · Proprely',
  description: "Calculez le prix de nettoyage de bureaux au m² : surface, fréquence, zone géographique, type de local. Estimation honnête sans inscription.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Calculateur prix nettoyage bureaux au m²',
      description: "Estimation du prix de vente d'une prestation de nettoyage selon surface, fréquence, zone géographique, type de local.",
      url: `${ORIGIN}/calculateur-prix-nettoyage-m2`,
      inLanguage: 'fr-FR',
      datePublished: '2026-05-21',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: `${ORIGIN}/outils` },
        { '@type': 'ListItem', position: 3, name: 'Calculateur prix nettoyage', item: `${ORIGIN}/calculateur-prix-nettoyage-m2` },
      ],
    },
    faqSchema(priceFaqs),
  ],
  bodyHtml: priceBody,
})
writePage('/calculateur-prix-nettoyage-m2', priceHtml)
generated.push('/calculateur-prix-nettoyage-m2')

// === llms-full.txt : corpus intégral pour les moteurs génératifs (GEO) ===
// Au-delà de l'index llms.txt, on expose le TEXTE COMPLET des articles +
// résumés des fonctionnalités, villes et comparatifs, pour faciliter la
// citation par les LLM (ChatGPT, Perplexity, Claude, Gemini, Copilot).
const stripMd = (s: string): string =>
  s
    .replace(/^\s*\|.*\|\s*$/gm, (line) => line.replace(/\|/g, ' ').replace(/\s{2,}/g, ' ').trim())
    .replace(/^\s*[-:|\s]+$/gm, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

const lf: string[] = []
lf.push('# Proprely — contenu intégral pour moteurs génératifs (llms-full.txt)')
lf.push('')
lf.push('> Le cockpit métier des sociétés de nettoyage B2B en France. Ce fichier rassemble le texte intégral des articles ainsi que les résumés des fonctionnalités, pages villes et comparatifs, pour faciliter la citation par les LLM (ChatGPT, Perplexity, Claude, Gemini, Copilot). Index synthétique : https://proprely.fr/llms.txt')
lf.push('')
lf.push('## Articles de blog (texte intégral)')
for (const rawPost of posts) {
  const p = getPost(rawPost.slug) ?? rawPost
  lf.push('')
  lf.push(`### ${p.title}`)
  lf.push(`URL : ${ORIGIN}/blog/${p.slug}/ | ${p.tag} | ${p.readTime} | publié le ${p.date}`)
  if (p.tldr) lf.push(`Réponse-flash : ${p.tldr}`)
  lf.push(p.excerpt)
  lf.push('')
  lf.push(stripMd(p.content))
  if (p.faq?.length) {
    lf.push('')
    lf.push('Questions fréquentes :')
    for (const f of p.faq) lf.push(`- ${f.q} — ${f.a}`)
  }
}
lf.push('')
lf.push('## Fonctionnalités')
for (const rawF of features) {
  const f = getFeature(rawF.slug) ?? rawF
  lf.push('')
  lf.push(`### ${f.title}`)
  lf.push(`URL : ${ORIGIN}/fonctionnalites/${f.slug}/`)
  lf.push(f.subtitle)
  lf.push(`Problème : ${f.problemDescription}`)
  lf.push(`Solution : ${f.solutionDescription}`)
  if (f.faq?.length) for (const q of f.faq) lf.push(`- ${q.q} — ${q.a}`)
}
lf.push('')
lf.push('## Pages villes')
for (const rawC of cities) {
  const c = getCity(rawC.slug) ?? rawC
  lf.push('')
  lf.push(`### ${c.title}`)
  lf.push(`URL : ${ORIGIN}/villes/${c.slug}/`)
  lf.push(c.subtitle)
  lf.push(c.marketIntro)
}
lf.push('')
lf.push('## Comparatifs concurrents')
for (const cmp of comparisons) {
  lf.push('')
  lf.push(`### ${cmp.title}`)
  lf.push(`URL : ${ORIGIN}/comparatif/${cmp.slug}/`)
  lf.push(`Réponse-flash : ${cmp.tldr}`)
  lf.push(`${cmp.competitorName} : ${cmp.competitorPitch}`)
  if (cmp.faq?.length) for (const q of cmp.faq) lf.push(`- ${q.q} — ${q.a}`)
}
const llmsFullContent = lf.join('\n') + '\n'
writeFileSync(resolve(distDir, 'llms-full.txt'), llmsFullContent)
console.log(`✓ llms-full.txt généré (${llmsFullContent.length} caractères)`)

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
