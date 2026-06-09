import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { posts, getPost } from '../src/data/blog.ts'
import { getAuthor } from '../src/config.ts'
import { features, getFeature } from '../src/data/features.ts'
import { cities, getCity } from '../src/data/cities.ts'
import { resources } from '../src/data/resources.ts'
import { glossary } from '../src/data/glossary.ts'
import { integrations, STATUS_LABEL } from '../src/data/integrations.ts'

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
  // Canonicalise les liens internes en ajoutant un trailing slash (sauf
  // racine, hash et liens externes) pour éviter les redirections 301 qui
  // créent des entrées "Page with redirect" dans Google Search Console.
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
    const isExternal = /^(https?:|mailto:|tel:|#)/.test(href)
    const [path, hash] = href.split('#')
    const needsSlash = !isExternal && path !== '/' && path && !path.endsWith('/')
    const canonical = needsSlash ? `${path}/${hash ? `#${hash}` : ''}` : href
    return `<a href="${canonical}">${label}</a>`
  })
  return s
}

type PageMeta = {
  url: string
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  /** URL relative ou absolue de l'image OG personnalisée.
   *  Si omise, utilise /og-image.png (image générique du site). */
  ogImage?: string
  schemas: object[]
  bodyHtml: string
  robots?: string
  /** URL canonique override : utilisé pour consolider le ranking sur une page
   * pilier en cas de cannibalisation. URL absolue avec trailing slash. */
  canonicalOverride?: string
}

function buildHtml(meta: PageMeta): string {
  // URL canonique AVEC slash final : c'est l'URL réellement servie par le
  // serveur (Apache DirectorySlash / Vercel trailingSlash) et celle déclarée
  // dans le sitemap. Évite les statuts "Page with redirect" dans GSC.
  // Si canonicalOverride est fourni, on l'utilise (cas de cannibalisation).
  const canonical = meta.canonicalOverride ?? `${ORIGIN}${meta.url}${meta.url.endsWith('/') ? '' : '/'}`
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

  // Image OG personnalisée par page si fournie, sinon image générique
  const ogImageUrl = meta.ogImage
    ? (meta.ogImage.startsWith('http') ? meta.ogImage : `${ORIGIN}${meta.ogImage}`)
    : `${ORIGIN}/og-image.png`
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${escapeAttr(ogImageUrl)}" />`
  )
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${escapeAttr(ogImageUrl)}" />`
  )

  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript)

  // Image visible Googlebot pour TOUTES les pages prérendues : l'og-image
  // figure systématiquement en tête du seo-fallback. Casse le statut
  // "0 <img>" du site et donne à Google Images au moins une image par URL.
  // Alt text adapté à la page via meta.ogTitle/ogDescription.
  const fallbackImage = `<img src="${ORIGIN}/og-image.png" alt="${escapeAttr(ogTitle)} — Proprely, logiciel société de nettoyage B2B" width="1200" height="630" loading="lazy" decoding="async" />`

  // Navigation statique en HTML pur pour Googlebot : reproduit les liens du
  // mega-menu React. Sans cela, le crawler ne voit que la coquille SPA et passe
  // à côté de la majorité des liens de navigation (qui sont rendus côté client
  // via useState). Aligné avec src/sections/MegaMenuNav.tsx.
  const fallbackNav = `<nav aria-label="Navigation principale">
    <h2>Navigation Proprely</h2>
    <h3>Solution</h3>
    <ul>
      <li><a href="${ORIGIN}/logiciel-societe-nettoyage/">Logiciel société de nettoyage</a></li>
      <li><a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/">Logiciel auto-entrepreneur nettoyage</a></li>
      <li><a href="${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/">Logiciel nettoyage médical et bionettoyage</a></li>
      <li><a href="${ORIGIN}/logiciel-nettoyage-copropriete-syndic/">Logiciel nettoyage copropriété et syndic</a></li>
      <li><a href="${ORIGIN}/crm-entreprise-proprete/">CRM entreprise propreté</a></li>
      <li><a href="${ORIGIN}/convention-collective-nettoyage/">Logiciel conforme convention IDCC 3043</a></li>
      <li><a href="${ORIGIN}/application-mobile-agents-nettoyage/">Application mobile agents nettoyage</a></li>
      <li><a href="${ORIGIN}/audit-gratuit/">Audit gratuit société de nettoyage</a></li>
    </ul>
    <h3>Fonctionnalités</h3>
    <ul>
      <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">Planning agents</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">Devis intelligent IA</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">Gestion des agents</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">Preuve de passage</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/facturation-nettoyage/">Facturation</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/pointage-agents-nettoyage/">Pointage GPS agents</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/suivi-interventions-nettoyage/">Suivi interventions</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/gestion-sites-clients-nettoyage/">Sites et clients</a></li>
      <li><a href="${ORIGIN}/fonctionnalites/">Toutes les fonctionnalités</a></li>
    </ul>
    <h3>Comparatifs</h3>
    <ul>
      <li><a href="${ORIGIN}/comparatif-logiciel-nettoyage/">Comparatif logiciels nettoyage 2026</a></li>
      <li><a href="${ORIGIN}/proprely-vs-excel/">Proprely vs Excel</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-organilog/">Proprely vs Organilog</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-progiclean/">Proprely vs Progiclean</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-propret/">Proprely vs PROPRET</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-2bepragma/">Proprely vs 2BePragma</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-synchroteam/">Proprely vs Synchroteam</a></li>
      <li><a href="${ORIGIN}/comparatif/proprely-vs-comete-proprete/">Proprely vs Comète Propreté</a></li>
      <li><a href="${ORIGIN}/alternative-organilog/">Alternative à Organilog</a></li>
      <li><a href="${ORIGIN}/alternative-progiclean/">Alternative à Progiclean</a></li>
      <li><a href="${ORIGIN}/alternative-propret/">Alternative à PROPRET</a></li>
      <li><a href="${ORIGIN}/alternative-2bepragma/">Alternative à 2BePragma</a></li>
    </ul>
    <h3>Ressources</h3>
    <ul>
      <li><a href="${ORIGIN}/outils/">Tous les outils gratuits</a></li>
      <li><a href="${ORIGIN}/calculateur-prix-nettoyage-m2/">Calculateur prix nettoyage m²</a></li>
      <li><a href="${ORIGIN}/simulateur-rentabilite/">Simulateur de rentabilité</a></li>
      <li><a href="${ORIGIN}/calculateur-roi/">Calculateur ROI</a></li>
      <li><a href="${ORIGIN}/ressources/">Modèles Excel gratuits</a></li>
      <li><a href="${ORIGIN}/blog/">Blog Proprely</a></li>
      <li><a href="${ORIGIN}/tarifs/">Tarifs Proprely</a></li>
      <li><a href="${ORIGIN}/a-propos/">À propos</a></li>
      <li><a href="${ORIGIN}/contact/">Contact</a></li>
      <li><a href="${ORIGIN}/beta/">Bêta privée</a></li>
    </ul>
  </nav>`
  html = html.replace(
    /<aside class="seo-fallback"[^>]*>[\s\S]*?<\/aside>/,
    `<aside class="seo-fallback" aria-label="Résumé et liens utiles">${fallbackImage}${meta.bodyHtml}${fallbackNav}</aside>`
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
  // SpeakableSpecification : signal AEO pour assistants vocaux (Google Assistant,
  // Alexa). Indique quelles parties de la page peuvent être lues à voix haute
  // comme réponse à une requête vocale. On cible H1 + TL;DR + résumé.
  schema.speakable = {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'aside p strong + br + *', 'aside > p:first-child'],
    xpath: [
      '/html/head/title',
      '//meta[@name="description"]/@content',
    ],
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
    // Signal AEO assistants vocaux : H1 et 1er paragraphe résumé
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'aside > p:first-child'],
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
            `<li><a href="${ORIGIN}/blog/${q.slug}/"><strong>${escapeHtml(q.title)}</strong></a> — ${escapeHtml(q.excerpt)}</li>`,
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
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog/` },
      { '@type': 'ListItem', position: 3, name: p.title, item: `${ORIGIN}${url}` },
    ],
  }
  const schemas: object[] = [blogPostingSchema(p), breadcrumbs]
  if (p.faq?.length) schemas.push(faqSchema(p.faq))
  if (p.howTo) schemas.push(howToSchema(p.howTo))

  // Suffix " · Proprely" conditionnel : seulement si le titre est court
  // (sinon on dépasse 60 chars = title tronqué dans les SERP Google).
  const titleSuffix = p.title.length > 49 ? '' : ' · Proprely'
  const html = buildHtml({
    url,
    title: `${p.title}${titleSuffix}`,
    description: p.excerpt,
    ogImage: `/og/blog-${p.slug}.png`,
    schemas,
    bodyHtml,
    canonicalOverride: p.canonicalUrl,
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
      { name: 'Fonctionnalités', item: `${ORIGIN}/fonctionnalites/` },
      { name: f.tag, item: `${ORIGIN}${url}` },
    ]),
  ]
  // ItemList schema sur la page planning : liste les 7 logiciels comparés
  // explicitement dans le contenu, pour aider Google et les LLMs à extraire
  // une liste structurée (signal AEO fort pour la requête
  // "Quel logiciel métier nettoyage avec gestion plannings recommandez-vous ?")
  if (f.slug === 'planning-nettoyage') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Logiciels métier de planning pour entreprise de nettoyage en 2026',
      description: "Top 7 des logiciels métier société de nettoyage avec gestion des plannings recommandés en 2026 en France.",
      numberOfItems: 7,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: [
        { name: 'Proprely', description: "Cockpit métier B2B nouvelle génération (2026) pour TPE/PME nettoyage 3-50 agents. Planning drag-and-drop, mobile sans app à installer, spécialités propreté natives.", url: `${ORIGIN}/` },
        { name: 'PROPRET', description: "ERP métier propreté historique pour PME/ETI 50+ agents. Couverture paie et GED intégrée.", url: `${ORIGIN}/comparatif/proprely-vs-propret/` },
        { name: 'Progiclean', description: "ERP métier propreté historique pour PME/ETI 50+ agents. Alternative à PROPRET.", url: `${ORIGIN}/comparatif/proprely-vs-progiclean/` },
        { name: 'Sevensoft Propreté', description: "Logiciel métier propreté ETI multi-établissements avec reporting consolidé.", url: 'https://www.sevensoft.fr/' },
        { name: 'Maglia', description: "Logiciel métier propreté ETI multi-marchés (industriel, médical, tertiaire).", url: 'https://www.maglia.fr/' },
        { name: 'Organilog', description: "Suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Planning générique multi-secteurs.", url: `${ORIGIN}/comparatif/proprely-vs-organilog/` },
        { name: 'Synchroteam', description: "Field service multi-secteurs avec géolocalisation. Pour interventions ponctuelles.", url: 'https://www.synchroteam.com/' },
      ].map((s, i) => ({
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
    })
  }
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

  const fTitleSuffix = f.title.length > 49 ? '' : ' · Proprely'
  const html = buildHtml({
    url,
    title: `${f.title}${fTitleSuffix}`,
    description: f.metaDescription,
    ogTitle: f.title,
    ogDescription: f.metaDescription,
    ogImage: `/og/fonctionnalites-${f.slug}.png`,
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
            `<li><a href="${ORIGIN}/blog/${p.slug}/"><strong>${escapeHtml(p.title)}</strong></a> — ${escapeHtml(p.excerpt)}</li>`,
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
    <p>Pour calibrer votre tarification au m², consultez le <a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026/">guide complet du tarif nettoyage bureaux 2026</a>.</p>`
    : ''

  const tldrHtml = c.tldr
    ? `<aside><strong>À retenir :</strong> ${escapeHtml(c.tldr)}</aside>`
    : ''

  const bodyHtml = `
    <h1>${escapeHtml(c.title)}</h1>
    <p>${escapeHtml(c.subtitle)}</p>
    ${tldrHtml}
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
        { '@type': 'ListItem', position: 2, name: 'Villes', item: `${ORIGIN}/villes/` },
        { '@type': 'ListItem', position: 3, name: c.city, item: cityUrl },
      ],
    },
    faqSchema(c.faq),
  ]

  const cTitleSuffix = c.title.length > 49 ? '' : ' · Proprely'
  const html = buildHtml({
    url,
    title: `${c.title}${cTitleSuffix}`,
    description: c.metaDescription,
    ogTitle: c.title,
    ogDescription: c.metaDescription,
    ogImage: `/og/villes-${c.slug}.png`,
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
          `<li><a href="${ORIGIN}/blog/${p.slug}/"><strong>${escapeHtml(p.title)}</strong></a> — ${escapeHtml(
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
  url: `${ORIGIN}/blog/`,
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
    url: `${ORIGIN}/blog/${p.slug}/`,
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
    url: `${ORIGIN}/blog/${p.slug}/`,
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
      `${ORIGIN}/blog/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Blog', item: `${ORIGIN}/blog/` },
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
  <p>Pour calibrer votre tarification au m² : <a href="${ORIGIN}/calculateur-prix-nettoyage-m2/">calculateur de prix nettoyage bureaux au m²</a>. Pour estimer la marge brute d'un contrat précis : <a href="${ORIGIN}/simulateur-rentabilite/">simulateur de rentabilité contrat nettoyage</a>. Pour le guide complet du choix de logiciel : <a href="${ORIGIN}/logiciel-societe-nettoyage/">logiciel société de nettoyage — guide complet 2026</a> ou le <a href="${ORIGIN}/comparatif-logiciel-nettoyage/">comparatif Proprely vs PROPRET, Progiclean, Organilog</a>. La bêta privée Proprely est gratuite pour 30 sociétés fondatrices : <a href="${ORIGIN}/beta/">candidater à la bêta</a>.</p>
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
      `${ORIGIN}/calculateur-roi/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Calculateur ROI', item: `${ORIGIN}/calculateur-roi/` },
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
  <p>Le vrai coût n'est pas le logiciel : c'est son absence. Diriger sur Excel, WhatsApp, Word et le papier représente 6 à 10 heures d'administration dispersée par semaine. À 45 € de coût horaire dirigeant chargé, c'est 12 600 à 21 000 € par an — sans compter les erreurs de pointage, les contrats sous-tarifés et les litiges clients faute de preuve de passage. Chiffrez votre propre coût avec le <a href="${ORIGIN}/calculateur-roi/">calculateur ROI</a> ou la marge d'un contrat avec le <a href="${ORIGIN}/simulateur-rentabilite/">simulateur de rentabilité</a>.</p>
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
  description: "Tarifs Proprely 2026 : gratuit pendant la bêta, tarif fondateur conservé à vie. Découvrez nos engagements et ce que coûte la gestion sans logiciel.",
  ogImage: '/og/tarifs.png',
  schemas: [
    webpageSchema(
      'Tarifs Proprely',
      'Gratuit pendant la bêta privée. Tarif fondateur à vie pour les 30 premières sociétés sélectionnées.',
      `${ORIGIN}/tarifs/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Tarifs', item: `${ORIGIN}/tarifs/` },
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
        url: `${ORIGIN}/tarifs/`,
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
    <li><a href="${ORIGIN}/tarifs/">Tarifs — Gratuit pendant la bêta</a></li>
    <li><a href="${ORIGIN}/calculateur-roi/">Calculateur ROI — Combien la dispersion vous coûte</a></li>
    <li><a href="${ORIGIN}/blog/">Blog — Analyses pour les dirigeants du nettoyage</a></li>
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
      url: `${ORIGIN}/404/`,
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
      `${ORIGIN}/beta/merci/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Merci', item: `${ORIGIN}/beta/merci/` },
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
      `${ORIGIN}/contact/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Contact', item: `${ORIGIN}/contact/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url: `${ORIGIN}/contact/`,
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
  <p>Cette page présente le logiciel. Pour comprendre en profondeur la convention IDCC 3043 (grille 2024/2025/2026, calcul détaillé des heures, mécanique de l'article 7, primes, formation, pénibilité, sources Légifrance/FEP), consultez notre <a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043/">guide de référence convention collective propreté IDCC 3043</a>.</p>
`.trim()

const conventionHtml = buildHtml({
  url: '/convention-collective-nettoyage',
  title: 'Logiciel conforme convention collective IDCC 3043 · Proprely',
  description: "Logiciel pour société de nettoyage conforme convention collective propreté IDCC 3043 : grille salaires 2026, heures, article 7. Bêta gratuite.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Logiciel conforme convention collective propreté IDCC 3043',
      description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes.",
      url: `${ORIGIN}/convention-collective-nettoyage/`,
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
          { '@type': 'ListItem', position: 2, name: 'Convention collective nettoyage IDCC 3043', item: `${ORIGIN}/convention-collective-nettoyage/` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel conforme convention collective propreté IDCC 3043',
      description: "Logiciel pour société de nettoyage conforme à la convention collective propreté IDCC 3043 : grille de salaires 2026, calcul des heures, article 7, primes.",
      url: `${ORIGIN}/convention-collective-nettoyage/`,
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

// === /logiciel-nettoyage-medical-bionettoyage ===
const medicalFaqs = [
  { q: "Quel logiciel pour société de bionettoyage médical ?", a: "Pour piloter une société de bionettoyage médical en France, le logiciel doit couvrir trois exigences spécifiques : (1) la traçabilité des protocoles et des produits (détergent, désinfectant, lot, fiche FDS) pour les audits ANSM/ARS, (2) le suivi des agents exposés aux produits CMR avec fiche d'exposition individuelle conservée 50 ans (obligation IDCC 3043), (3) la preuve de passage horodatée envoyée automatiquement au pharmacien hygiéniste ou au facility manager. Proprely intègre ces trois exigences nativement." },
  { q: "Comment tracer les protocoles bionettoyage avec un logiciel ?", a: "La traçabilité bionettoyage s'organise en 4 niveaux : protocole par site (ordre des zones, produits agréés, temps de contact), consigne par mission (l'agent voit le protocole sur son téléphone avant intervention), check-list de passage (chaque zone validée avec photos avant-après), export d'audit (historique complet exportable pour ANSM, ARS ou client). Proprely couvre les 4 niveaux dans un seul outil." },
  { q: "Le logiciel gère-t-il le suivi des agents exposés aux CMR ?", a: "Oui. La convention collective propreté IDCC 3043 impose un suivi médical renforcé pour les agents exposés aux produits cancérogènes, mutagènes ou reprotoxiques (CMR) — fréquents en bionettoyage médical. Proprely centralise dans le profil agent : formation aux risques chimiques, visites médicales renforcées (tous les 4 ans minimum), fiche d'exposition individuelle archivée 50 ans, équipements de protection fournis." },
  { q: "Quelle marge attendre sur un contrat de bionettoyage médical ?", a: "Les contrats médicaux justifient un prix premium (0,80 à 1,80 €/m²/mois selon la complexité), mais le coût horaire est plus élevé qu'en bureaux standards : agents formés (+10 à +15 % vs SMIC propreté), produits agréés plus chers, temps de protocole plus long. Cible saine : 18 à 25 % de marge nette." },
  { q: "Mes agents bionettoyage doivent-ils utiliser une application ?", a: "Non, ils accèdent à leur planning, aux protocoles du site et à la preuve de passage via un simple lien web sur leur téléphone. Pas d'application à installer, fonctionne sur 4G dégradée — important dans les sous-sols de cliniques ou les locaux techniques de laboratoires." },
  { q: "Comment se compare Proprely aux ERP propreté pour le médical ?", a: "PROPRET, Progiclean ou Sevensoft proposent des modules bionettoyage complets mais avec setup 1-3 mois et tarif sur devis. Proprely couvre les exigences essentielles du bionettoyage médical en bêta gratuite pour les TPE/PME 3-50 agents, avec onboarding 30 minutes." },
]

const medicalBody = `
  <h1>Logiciel nettoyage médical et bionettoyage : traçabilité, protocoles, conformité IDCC 3043</h1>
  <p>Pour piloter une société de bionettoyage médical, votre logiciel doit tracer les protocoles, suivre les agents exposés aux produits CMR (obligation IDCC 3043) et envoyer la preuve de passage horodatée au pharmacien hygiéniste. Proprely intègre les trois nativement.</p>
  <h2>Les 4 exigences spécifiques du bionettoyage médical</h2>
  <ul>
    <li><strong>Protocoles bionettoyage tracés</strong> — fiche par site avec produits agréés, ordre des zones, temps de contact. L'agent consulte le protocole sur son téléphone.</li>
    <li><strong>Suivi exposition CMR obligatoire</strong> — fiche d'exposition individuelle conservée 50 ans, suivi médical renforcé tous les 4 ans.</li>
    <li><strong>Preuve de passage horodatée</strong> — QR à l'entrée, photos avant-après, signature du référent, PV automatique au pharmacien hygiéniste.</li>
    <li><strong>Traçabilité produits et lots</strong> — référence + numéro de lot + fiche de données de sécurité pour audits ANSM/ARS.</li>
  </ul>
  <h2>Vos clients types et leur marché 2026</h2>
  <ul>
    <li><strong>Cabinets médicaux & dentaires</strong> — 0,80 à 1,20 €/m²/mois</li>
    <li><strong>Cliniques privées & centres d'imagerie</strong> — 1,00 à 1,50 €/m²/mois</li>
    <li><strong>Laboratoires d'analyses biomédicales</strong> — 1,20 à 1,80 €/m²/mois</li>
    <li><strong>EHPAD & résidences seniors</strong> — 0,70 à 1,00 €/m²/mois</li>
  </ul>
  <h2>Comment Proprely répond</h2>
  <ul>
    <li>Spécialités bionettoyage natives sur les profils agents</li>
    <li>Conformité IDCC 3043 médical : formations CMR, visites médicales, fiche d'exposition</li>
    <li>PV envoyés au pharmacien hygiéniste sans intervention manuelle</li>
    <li>Marge par contrat médical en temps réel pour éviter la sous-tarification</li>
  </ul>
  <h2>Pour aller plus loin</h2>
  <p>Voir le <a href="${ORIGIN}/blog/bionettoyage-medical-protocoles/">guide bionettoyage médical complet</a>, la <a href="${ORIGIN}/convention-collective-nettoyage/">conformité convention collective IDCC 3043</a>, le module <a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">gestion agents avec spécialités et exposition CMR</a>, et la <a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">preuve de passage avec PV automatique</a>. <a href="${ORIGIN}/beta/">Candidater à la bêta privée</a>.</p>
`.trim()

const medicalHtml = buildHtml({
  url: '/logiciel-nettoyage-medical-bionettoyage',
  title: 'Logiciel nettoyage médical et bionettoyage 2026 · Proprely',
  description: "Logiciel pour société de bionettoyage médical : protocoles, traçabilité produits CMR, PV automatique. Conforme IDCC 3043. Bêta gratuite.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Logiciel nettoyage médical et bionettoyage',
      description: "Logiciel pour société de bionettoyage médical conforme à la convention collective propreté IDCC 3043.",
      url: `${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/`,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-03',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Logiciel nettoyage médical', item: `${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel pour société de bionettoyage médical',
      description: "Logiciel pour société de bionettoyage médical : protocoles, traçabilité CMR, PV automatique. Conforme IDCC 3043.",
      url: `${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/`,
      image: `${ORIGIN}/og-image.png`,
      provider: { '@id': `${ORIGIN}/#organization` },
      serviceType: 'Logiciel de gestion société de bionettoyage médical',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de bionettoyage médical en France',
      },
    },
    faqSchema(medicalFaqs),
  ],
  bodyHtml: medicalBody,
})
writePage('/logiciel-nettoyage-medical-bionettoyage', medicalHtml)
generated.push('/logiciel-nettoyage-medical-bionettoyage')

// === /logiciel-nettoyage-copropriete-syndic ===
const coproFaqs = [
  { q: "Quel logiciel pour société de nettoyage qui travaille avec des syndics ?", a: "Pour piloter une société de nettoyage qui sert des syndics de copropriété, le logiciel doit couvrir : (1) preuve de passage standardisée (QR + photos avant-après + signature gardien éventuelle) acceptée par les syndics nationaux, (2) PV mensuel automatique envoyé au gestionnaire d'immeuble sans intervention manuelle, (3) facturation récurrente annuelle/trimestrielle avec relances automatiques. Proprely intègre ces trois exigences avec multi-sites illimité." },
  { q: "Comment générer un PV de passage pour un syndic de copropriété ?", a: "Le PV doit contenir : date et heure d'intervention, nom de l'agent, zones nettoyées (hall, escaliers, ascenseur, cour), photos avant-après, incidents éventuels, signature du gardien si présent. Proprely génère ce PV automatiquement à la validation de la mission et l'envoie au gestionnaire d'immeuble configuré. Format accepté par Foncia, Citya, Nexity, Sergic et Loiselet & Daigremont." },
  { q: "Comment automatiser la facturation des contrats syndic ?", a: "Les contrats syndic sont quasi-systématiquement annuels avec facturation mensuelle ou trimestrielle. Proprely transforme le contrat signé en facturation automatique : génération à l'échéance, envoi au service comptabilité du syndic, suivi du paiement, relances à J+15 et J+30." },
  { q: "Que faire en cas d'incident sur une copropriété ?", a: "L'agent signale l'incident depuis son téléphone (catégorie + photo + commentaire). Proprely ajoute l'incident au PV mensuel, envoie une notification immédiate au gestionnaire si configuré, et garde l'historique horodaté pour les contestations futures." },
  { q: "Peut-on adapter le protocole de nettoyage selon le bâti ?", a: "Oui. Chaque site a sa fiche dédiée avec son protocole spécifique : produits adaptés au revêtement (marbre, terrazzo, parquet ancien), ordre des zones, fréquence par partie commune, interdits (pas de produit corrosif sur ferronnerie ancienne)." },
  { q: "Combien de syndics et d'immeubles Proprely peut-il gérer ?", a: "Pas de limite par défaut. Les sociétés utilisent typiquement Proprely pour 3 à 25 syndics actifs et 30 à 300 immeubles au total. Le multi-sites illimité reste lisible jusqu'à plusieurs centaines de copropriétés." },
]

const coproBody = `
  <h1>Logiciel nettoyage copropriété et syndic : preuve de passage, PV automatique, facturation récurrente</h1>
  <p>Pour piloter une société de nettoyage qui sert des syndics, votre logiciel doit fournir une preuve de passage standardisée acceptée par Foncia, Citya, Nexity, envoyer un PV mensuel automatique au gestionnaire d'immeuble et facturer les contrats annuels sans intervention manuelle.</p>
  <h2>Ce que les syndics attendent vraiment</h2>
  <ul>
    <li><strong>Preuve de passage standardisée</strong> — QR + photos avant-après + signature gardien acceptés par les syndics nationaux</li>
    <li><strong>PV mensuel envoyé automatiquement</strong> au gestionnaire d'immeuble</li>
    <li><strong>Contrats récurrents facturés automatiquement</strong> (mensuel/trimestriel) avec relances J+15 / J+30</li>
    <li><strong>Adaptation au bâti</strong> (haussmannien, marbre, ferronnerie ancienne) via fiches site dédiées</li>
  </ul>
  <h2>Vos profils de clients syndic 2026</h2>
  <ul>
    <li><strong>Syndics nationaux (Foncia, Citya, Nexity)</strong> — 0,40 à 0,70 €/m²/mois, marge cible 12-18 %</li>
    <li><strong>Syndics indépendants régionaux</strong> — 0,45 à 0,80 €/m²/mois, marge cible 15-20 %</li>
    <li><strong>Copropriétés en gestion directe (ASL)</strong> — 0,40 à 0,65 €/m²/mois, marge cible 15-22 %</li>
    <li><strong>Copropriétés haussmanniennes premium</strong> — 0,80 à 1,30 €/m²/mois, marge cible 18-25 %</li>
  </ul>
  <h2>Comment Proprely répond</h2>
  <ul>
    <li>PV automatique configurable par destinataire (gestionnaire, conseil syndical, comptabilité)</li>
    <li>Multi-sites jusqu'à 300+ immeubles avec contraintes locales mémorisées</li>
    <li>Facturation récurrente syndic avec envoi au service compta + relances automatiques</li>
    <li>Catalogue prestations syndic pour répondre rapidement aux appels d'offres triennaux</li>
  </ul>
  <h2>Pour aller plus loin</h2>
  <p>Voir le <a href="${ORIGIN}/blog/nettoyage-copropriete-obligations-prix/">guide nettoyage copropriété : obligations et prix</a>, le module <a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">preuve de passage avec QR et PV automatique</a>, le module <a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">devis et facturation automatisée</a>, le <a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">planning multi-sites</a>, et la page <a href="${ORIGIN}/villes/paris/">logiciel nettoyage Paris</a> (50 000+ copropriétés intra-muros).</p>
`.trim()

const coproHtml = buildHtml({
  url: '/logiciel-nettoyage-copropriete-syndic',
  title: 'Logiciel nettoyage copropriété et syndic : PV auto · Proprely',
  description: "Logiciel pour société de nettoyage qui travaille avec des syndics : preuve de passage QR, PV automatique, facturation récurrente. Bêta gratuite.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Logiciel nettoyage copropriété et syndic',
      description: "Logiciel pour société de nettoyage qui travaille avec des syndics de copropriété.",
      url: `${ORIGIN}/logiciel-nettoyage-copropriete-syndic/`,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-03',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Logiciel nettoyage copropriété', item: `${ORIGIN}/logiciel-nettoyage-copropriete-syndic/` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Proprely — logiciel pour société de nettoyage de copropriétés',
      description: "Logiciel pour société de nettoyage intervenant pour syndics et copropriétés : preuve de passage, PV automatique, facturation récurrente.",
      url: `${ORIGIN}/logiciel-nettoyage-copropriete-syndic/`,
      image: `${ORIGIN}/og-image.png`,
      provider: { '@id': `${ORIGIN}/#organization` },
      serviceType: 'Logiciel de gestion société de nettoyage copropriétés',
      areaServed: { '@type': 'Country', name: 'France' },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Dirigeants de sociétés de nettoyage B2B intervenant pour syndics et copropriétés en France',
      },
    },
    faqSchema(coproFaqs),
  ],
  bodyHtml: coproBody,
})
writePage('/logiciel-nettoyage-copropriete-syndic', coproHtml)
generated.push('/logiciel-nettoyage-copropriete-syndic')

// === /application-mobile-agents-nettoyage ===
const mobileFaqs = [
  { q: "Quelle application mobile pour les agents de nettoyage ?", a: "Proprely propose une application mobile pour agents de nettoyage qui ne nécessite aucune installation : chaque agent reçoit un lien web personnel qu'il ouvre dans le navigateur de son téléphone. Il accède à son planning, peut pointer son arrivée et son départ, déclencher la preuve de passage (QR + photos + signature), signaler une absence ou un incident, et consulter son compteur d'heures en temps réel. Compatible Android 8+ et iOS 13+, fonctionne en 4G dégradée." },
  { q: "L'application mobile Proprely est-elle gratuite ?", a: "Oui. L'accès agent est inclus dans tous les abonnements (et donc gratuit pendant la bêta privée pour les 30 sociétés fondatrices). Vous payez par site ou par utilisateur dirigeant — pas par agent. Vous pouvez ajouter autant d'agents que nécessaire sans surcoût." },
  { q: "Pourquoi pas d'application native à installer ?", a: "Trois raisons : (1) les agents refusent souvent d'installer une app pro sur leur téléphone perso, (2) les apps natives saturent le stockage des téléphones d'entrée de gamme, (3) chaque mise à jour casse l'app pour une partie des utilisateurs. Le lien web supprime ces trois frictions." },
  { q: "L'application fonctionne-t-elle hors connexion ?", a: "Mode dégradé oui, hors ligne complet non. L'agent peut consulter son planning en cache navigateur, pointer ses heures et prendre les photos de preuve de passage même en 4G capricieuse — les données sont stockées temporairement puis envoyées en arrière-plan dès qu'une connexion correcte est retrouvée." },
  { q: "Que se passe-t-il si un agent perd son téléphone ?", a: "Vous coupez son accès en 5 secondes depuis le cockpit dirigeant : son lien personnel devient inactif. Aucune donnée client sensible n'est stockée localement de manière persistante — le cache est nettoyé après 7 jours d'inactivité." },
  { q: "Mes agents non-natifs du numérique vont-ils s'en sortir ?", a: "Oui. L'interface utilise un vocabulaire métier accessible, des icônes claires et une seule action principale par écran. Les agents de 40-60 ans prennent la main en 5 à 10 minutes. L'absence d'installation supprime la première barrière." },
]

const mobileBody = `
  <h1>Application mobile pour agents de nettoyage : aucune app à installer</h1>
  <p>Pour équiper vos agents de nettoyage en mobile, Proprely fournit un simple lien web personnel : planning, pointage, preuve de passage, signalement d'absence et compteur d'heures dans le navigateur du téléphone. Aucune application à installer, aucune mise à jour à pousser, aucune formation longue.</p>
  <h2>Pourquoi les apps natives échouent sur le terrain nettoyage</h2>
  <ul>
    <li>Les agents refusent d'installer une app pro sur leur téléphone perso</li>
    <li>Le téléphone est saturé, l'app refuse de s'installer</li>
    <li>Formation longue à chaque nouvel agent</li>
    <li>Les mises à jour cassent la fonctionnalité pour une partie de l'équipe</li>
    <li>Compte ancien encore actif des semaines après le départ d'un agent</li>
    <li>App native qui ne fonctionne plus en sous-sol ou en parking 4G dégradée</li>
  </ul>
  <h2>Notre approche : un lien web personnel = une application mobile</h2>
  <ul>
    <li><strong>Zéro installation, zéro mise à jour</strong> — pas de téléchargement, version toujours à jour</li>
    <li><strong>Fonctionne sur tout téléphone récent</strong> — Android 8+ et iOS 13+, entrée de gamme inclus</li>
    <li><strong>Sécurisé même si le téléphone est perdu</strong> — lien révocable en 5 secondes</li>
    <li><strong>Connexion réseau dégradée gérée</strong> — cache navigateur + envoi en arrière-plan</li>
  </ul>
  <h2>Ce que vos agents peuvent faire depuis leur téléphone</h2>
  <ul>
    <li><strong>Voir son planning de la semaine</strong> — par jour, par site, par horaire</li>
    <li><strong>Pointer son arrivée et son départ</strong> — horodatage + géolocalisation optionnelle</li>
    <li><strong>Déclencher la preuve de passage</strong> — QR, photos avant-après, signature</li>
    <li><strong>Signaler une absence ou un incident</strong> — alerte cockpit dirigeant immédiate</li>
    <li><strong>Consulter ses heures et historique</strong> — transparence anti-conflits paie</li>
    <li><strong>Consignes en français simple</strong> — pour équipes intergénérationnelles</li>
  </ul>
  <h2>Pour aller plus loin</h2>
  <p>Voir le module <a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">planning agents (cockpit dirigeant)</a>, la <a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">preuve de passage mobile</a>, la <a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">gestion agents (profils, spécialités, alertes)</a>, le <a href="${ORIGIN}/blog/calcul-heures-agents-nettoyage/">guide calcul des heures agents 2026</a>, et le <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">comparatif logiciels métier 2026</a>.</p>
`.trim()

const mobileHtml = buildHtml({
  url: '/application-mobile-agents-nettoyage',
  title: "Application mobile agents nettoyage : sans app · Proprely",
  description: "Application mobile pour agents de nettoyage : planning, pointage, preuve de passage via lien web — aucune app à installer. Bêta gratuite.",
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Application mobile agents nettoyage',
      description: "Application mobile pour agents de nettoyage : planning, pointage, preuve de passage via lien web — sans app à installer.",
      url: `${ORIGIN}/application-mobile-agents-nettoyage/`,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-03',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Application mobile agents nettoyage', item: `${ORIGIN}/application-mobile-agents-nettoyage/` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Proprely — application agent terrain',
      description: "Application mobile pour agents de nettoyage via lien web personnel : planning, pointage, preuve de passage, signalements.",
      url: `${ORIGIN}/application-mobile-agents-nettoyage/`,
      operatingSystem: 'Web (Android 8+, iOS 13+, navigateur récent)',
      applicationCategory: 'BusinessApplication',
      publisher: { '@id': `${ORIGIN}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        description: 'Accès agent inclus dans tous les abonnements Proprely, gratuit pendant la bêta privée.',
      },
    },
    faqSchema(mobileFaqs),
  ],
  bodyHtml: mobileBody,
})
writePage('/application-mobile-agents-nettoyage', mobileHtml)
generated.push('/application-mobile-agents-nettoyage')

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
      `${ORIGIN}/mentions-legales/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Mentions légales', item: `${ORIGIN}/mentions-legales/` },
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
  <h2>Cookies et traceurs</h2>
  <p>Le site proprely.fr utilise par défaut uniquement des cookies fonctionnels strictement nécessaires à son fonctionnement. Aucun cookie de mesure d'audience, de profilage ou publicitaire n'est posé tant que vous n'avez pas cliqué « Accepter » sur le bandeau de consentement.</p>
  <p>Si vous cliquez « Accepter », les services tiers suivants sont activés : Google Analytics 4 (Google Ireland), Meta Pixel (Meta Platforms Ireland), LinkedIn Insight Tag (LinkedIn Ireland), Microsoft Clarity et Microsoft Advertising (Microsoft Corporation).</p>
  <h3>Microsoft Clarity et Microsoft Advertising</h3>
  <p>We partner with Microsoft Clarity and Microsoft Advertising to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. Additionally, we use this information for site optimization, fraud/security purposes, and advertising. For more information about how Microsoft collects and uses your data, visit the <a href="https://www.microsoft.com/fr-fr/privacy/privacystatement">Microsoft Privacy Statement</a>.</p>
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
      `${ORIGIN}/confidentialite/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Confidentialité', item: `${ORIGIN}/confidentialite/` },
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
      `${ORIGIN}/cgu/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'CGU', item: `${ORIGIN}/cgu/` },
      ]
    ),
  ],
  bodyHtml: cguBody,
})
writePage('/cgu', cguHtml)
generated.push('/cgu')

const securiteRgpdBody = `
  <h1>Sécurité &amp; conformité RGPD chez Proprely</h1>
  <p>Vos données métier — clients, sites, agents, contrats — sont parmi les plus sensibles que vous traitez. Voici comment Proprely les protège.</p>
  <h2>Les 6 piliers de notre sécurité</h2>
  <ul>
    <li><strong>Hébergement européen</strong> : données hébergées en France et en UE, sans transfert hors UE sans clauses contractuelles types.</li>
    <li><strong>Chiffrement bout en bout</strong> : TLS 1.3 en transit, AES-256 au repos, clés rotées et gérées en HSM.</li>
    <li><strong>Contrôle d'accès strict</strong> : authentification renforcée, journalisation complète, principe du moindre privilège.</li>
    <li><strong>Conformité RGPD by design</strong> : registre des traitements, DPA à la demande, durées de conservation paramétrées, exports 1-clic.</li>
    <li><strong>Transparence opérationnelle</strong> : vous gardez la propriété de vos données, export CSV/Excel à tout moment, pas de lock-in.</li>
    <li><strong>Surveillance et sauvegardes</strong> : sauvegardes chiffrées quotidiennes, rétention 30 jours, surveillance 24/7.</li>
  </ul>
  <h2>Sous-traitants techniques</h2>
  <p>Liste complète et à jour de nos sous-traitants : Hostinger / Hetzner (hébergement applicatif UE), Vercel (site marketing UE), Cloudflare (CDN UE), Google GA4 (mesure anonymisée UE, opt-in), Fillout (formulaires UE), Brevo à venir (emails France).</p>
  <h2>Vos droits RGPD</h2>
  <p>Vous disposez de 6 droits sur vos données personnelles : accès, rectification, effacement, portabilité, opposition / limitation, retrait de consentement. Tous activables à <a href="mailto:dpo@proprely.fr">dpo@proprely.fr</a>, réponse sous 30 jours maximum.</p>
  <h2>DPA et certifications</h2>
  <p>Un Data Processing Agreement (DPA) au sens de l'article 28 du RGPD est disponible sur demande. Proprely applique les principes ISO 27001 sans certification formelle en phase de bêta privée ; la feuille de route post-bêta inclut une certification ISO 27001 puis une qualification SecNumCloud quand l'échelle le justifiera.</p>
`.trim()

const securiteRgpdHtml = buildHtml({
  url: '/securite-rgpd',
  title: 'Sécurité & RGPD · Proprely',
  description: "Sécurité et conformité RGPD chez Proprely : hébergement européen, chiffrement TLS 1.3 + AES-256, DPA, sous-traitants, droits RGPD activables en un email.",
  ogImage: '/og/securite-rgpd.png',
  schemas: [
    webpageSchema(
      'Sécurité & RGPD Proprely',
      "Hébergement européen, chiffrement, DPA, sous-traitants, droits RGPD.",
      `${ORIGIN}/securite-rgpd/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Sécurité & RGPD', item: `${ORIGIN}/securite-rgpd/` },
      ]
    ),
  ],
  bodyHtml: securiteRgpdBody,
})
writePage('/securite-rgpd', securiteRgpdHtml)
generated.push('/securite-rgpd')

const casClientsBody = `
  <h1>Cas clients : ils pilotent leur société de nettoyage avec Proprely</h1>
  <p>Des dirigeants de société de nettoyage B2B qui ont remplacé Excel, WhatsApp et Word par un cockpit unique. Voici leurs défis avant Proprely, ce qu'ils ont mis en place et les résultats mesurés.</p>
  <h2>Récits en cours de collecte</h2>
  <p>Nous recueillons actuellement les retours détaillés de nos premières sociétés fondatrices : situation avant Proprely, mise en place, résultats chiffrés à 30, 60 et 90 jours. Les premiers cas clients publiés sous peu.</p>
  <p>En attendant, vous pouvez <a href="${ORIGIN}/audit-gratuit/">prendre un audit gratuit</a> avec le fondateur ou échanger avec lui directement à <a href="mailto:contact@proprely.fr">contact@proprely.fr</a>.</p>
  <h2>Vous êtes déjà membre fondateur ?</h2>
  <p>On adorerait raconter votre passage à Proprely. 20 minutes d'échange, rédaction par nous, validation écrite avant publication. En contrepartie : mise en avant sur cette page, lien vers votre société, et un mois de support prioritaire offert.</p>
  <h2>Pourquoi les premiers fondateurs nous rejoignent</h2>
  <ul>
    <li><strong>Conçu avec eux</strong> : chaque fonctionnalité est cadrée avec des dirigeants de société de nettoyage. Pas de menu inutile, pas de jargon SaaS générique.</li>
    <li><strong>Onboarding 30 min</strong> : le fondateur vous accompagne en visio, importe votre Excel et vos contacts agents. Vous repartez avec un cockpit opérationnel.</li>
    <li><strong>Tarif fondateur à vie</strong> : les 30 premières sociétés conservent leur tarif privilégié après la bêta. Pas d'augmentation arbitraire post-lancement.</li>
  </ul>
`.trim()

const casClientsHtml = buildHtml({
  url: '/cas-clients',
  title: 'Cas clients : ils pilotent leur société de nettoyage avec Proprely',
  ogImage: '/og/cas-clients.png',
  description: "Retours détaillés de sociétés de nettoyage B2B fondatrices Proprely : défi initial, mise en place, résultats chiffrés (heures gagnées, marge, litiges).",
  schemas: [
    webpageSchema(
      'Cas clients Proprely',
      "Retours de sociétés de nettoyage B2B qui pilotent leur activité avec Proprely.",
      `${ORIGIN}/cas-clients/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Cas clients', item: `${ORIGIN}/cas-clients/` },
      ]
    ),
  ],
  bodyHtml: casClientsBody,
})
writePage('/cas-clients', casClientsHtml)
generated.push('/cas-clients')

const roadmapBody = `
  <h1>Roadmap publique Proprely</h1>
  <p>Ce qui a été livré, ce qui est en cours, ce qui arrive. Les membres fondateurs influencent directement les priorités. Aucun item caché, aucune date promise sans cadence réelle.</p>
  <h2>Livré récemment</h2>
  <ul>
    <li><strong>Page Intégrations</strong> — 14 connecteurs documentés (Silae, Brevo, Qonto, Pennylane, Chorus Pro Factur-X…)</li>
    <li><strong>Page Cas clients</strong> — structure prête pour les retours détaillés des fondateurs</li>
    <li><strong>Page Sécurité &amp; RGPD</strong> — 6 piliers, sous-traitants, droits, DPA</li>
    <li><strong>Tarifs : tableau comparatif chiffré</strong> + FAQ étoffée + schemas Product/Offer</li>
    <li><strong>Capture leads Brevo</strong> automatisée pour newsletter et lead magnets</li>
    <li><strong>Pixels Meta + LinkedIn</strong> avec gating consentement</li>
    <li><strong>Header et footer SaaS B2B mature</strong> avec mega-menu Solutions et colonne Entreprise</li>
    <li><strong>Landing /fonctionnalites/ par modules</strong> avec diagramme de flux</li>
  </ul>
  <h2>En cours</h2>
  <ul>
    <li><strong>Module Devis intelligent IA</strong> — phase 2, pondération par secteur</li>
    <li><strong>Pennylane : sync factures</strong> — bêta technique en cours</li>
    <li><strong>Collecte des premiers cas clients</strong> détaillés (60-90 jours)</li>
  </ul>
  <h2>Planifié — Q3 et Q4 2026</h2>
  <ul>
    <li><strong>Google Calendar</strong> — sync interventions vers calendrier encadrement</li>
    <li><strong>Application mobile native (PWA renforcée)</strong> — mode hors-ligne + notifications</li>
    <li><strong>ISO 27001</strong> — préparation certification</li>
    <li><strong>Chorus Pro Factur-X généralisé</strong> — émission native conforme 2027</li>
    <li><strong>Cockpit dirigeant : KPI prédictifs</strong> — marge prévisionnelle, alertes dérive</li>
    <li><strong>Slack</strong> — notifications mission en retard, agent absent, devis signé</li>
  </ul>
  <h2>À l'étude</h2>
  <ul>
    <li><strong>Module DPO automatisé (RGPD)</strong> pour aider les petites structures</li>
    <li><strong>Portail client public</strong> — espace de demandes client</li>
    <li><strong>Microsoft Teams</strong> — alternative à Slack</li>
  </ul>
  <p>Le changelog est également publié sur notre <a href="${ORIGIN}/rss.xml">flux RSS</a> à côté des articles du blog.</p>
`.trim()

const roadmapHtml = buildHtml({
  url: '/roadmap',
  title: 'Roadmap et changelog Proprely — Ce qui arrive · Proprely',
  description: "Roadmap publique Proprely : ce qui a été livré, ce qui est en cours, ce qui arrive. Transparence totale.",
  ogImage: '/og/roadmap.png',
  schemas: [
    webpageSchema(
      'Roadmap Proprely',
      "Ce qui a été livré, ce qui est en cours, ce qui arrive.",
      `${ORIGIN}/roadmap/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Roadmap', item: `${ORIGIN}/roadmap/` },
      ]
    ),
  ],
  bodyHtml: roadmapBody,
})
writePage('/roadmap', roadmapHtml)
generated.push('/roadmap')

const authorsIndexBody = `
  <h1>Auteurs Proprely</h1>
  <p>Aucun article publié sans avoir été cadré avec un dirigeant de société de nettoyage en exercice. Sources officielles citées (IDCC 3043, INSEE, Légifrance, BOAMP). Aucune fabrication, aucune affiliation cachée.</p>
  <h2>Paul Munier — Business Developer &amp; rédacteur</h2>
  <p>Business Developer chez Proprely depuis le lancement de la bêta privée, Paul accompagne chaque mois plusieurs dirigeants de société de nettoyage dans leur passage d'Excel + WhatsApp vers un cockpit métier intégré.</p>
  <p><a href="${ORIGIN}/auteurs/paul-munier/">Voir le profil complet de Paul Munier</a></p>
`.trim()

const authorsIndexHtml = buildHtml({
  url: '/auteurs',
  title: 'Auteurs Proprely — Qui écrit sur le blog · Proprely',
  description: "Les auteurs du blog Proprely : profils, expertises et méthode éditoriale.",
  ogImage: '/og/auteurs.png',
  schemas: [
    webpageSchema(
      'Auteurs Proprely',
      "Profils des auteurs du blog Proprely.",
      `${ORIGIN}/auteurs/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Auteurs', item: `${ORIGIN}/auteurs/` },
      ]
    ),
  ],
  bodyHtml: authorsIndexBody,
})
writePage('/auteurs', authorsIndexHtml)
generated.push('/auteurs')

// Bloc HTML pour /glossaire — utile aux crawlers IA pour citer le sens des termes
const glossaireBody = `
  <h1>Glossaire propreté B2B</h1>
  <p>Tous les termes métier des sociétés de nettoyage français : convention IDCC 3043, marchés publics, finance, conformité 2026. Définitions précises, sources officielles.</p>
  <h2>Convention IDCC 3043</h2>
  <p><strong>IDCC 3043</strong> : Convention collective nationale des entreprises de propreté et services associés. <strong>AS1</strong> : agent de service niveau 1 (SMIC propreté à 11,99 €/h brut en 2026). <strong>Article 7</strong> : transfert automatique des agents au repreneur d'un marché de nettoyage (sous conditions de 6 mois d'affectation). <strong>Prime de panier, transport, salissure</strong> : primes conventionnelles obligatoires.</p>
  <h2>Marchés publics et appels d'offres</h2>
  <p><strong>BOAMP</strong> : plateforme officielle de publication des marchés publics. <strong>CCTP</strong> : Cahier des Clauses Techniques Particulières (prestations attendues). <strong>CCAP</strong> : conditions contractuelles. <strong>RC</strong> : Règlement de Consultation (critères de notation). <strong>Mémoire technique</strong> : document central de réponse, 40-60 % de la note.</p>
  <h2>Financier</h2>
  <p><strong>Coût horaire chargé (CHC)</strong> : coût complet d'une heure d'agent, 19-23 €/h pour un AS1 en 2026. <strong>Marge brute</strong> : 25-35 % visée. <strong>Marge nette</strong> : 12-18 % visée. <strong>Quote-part frais de structure</strong> : à intégrer dans tout devis.</p>
  <h2>Conformité 2026</h2>
  <p><strong>Factur-X</strong> : format de facture électronique mixte (PDF/A-3 + XML). <strong>Chorus Pro</strong> : plateforme officielle pour les marchés publics. <strong>PDP</strong> : Plateforme de Dématérialisation Partenaire (dès 2027). <strong>RGPD</strong> : règlement européen sur la protection des données.</p>
  <h2>Métier</h2>
  <p><strong>Bionettoyage</strong> : nettoyage-désinfection en milieu médical. <strong>Preuve de passage</strong> : QR code, photos, signature. <strong>Remise en état</strong> : nettoyage approfondi après chantier. <strong>Décapage</strong> : élimination des couches d'émulsion sur sols durs.</p>
`.trim()

const glossaireHtml = buildHtml({
  url: '/glossaire',
  title: 'Glossaire propreté B2B : 40+ termes définis · Proprely',
  description: "Glossaire métier des sociétés de nettoyage B2B : IDCC 3043, AS1, article 7, bionettoyage, CCTP, coût horaire chargé, Factur-X, RGPD.",
  schemas: [
    webpageSchema(
      'Glossaire propreté B2B',
      "Définitions des termes utilisés dans les sociétés de nettoyage françaises.",
      `${ORIGIN}/glossaire/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Glossaire', item: `${ORIGIN}/glossaire/` },
      ]
    ),
  ],
  bodyHtml: glossaireBody,
})
writePage('/glossaire', glossaireHtml)
generated.push('/glossaire')

const paulMunierBody = `
  <h1>Paul Munier — Business Developer &amp; rédacteur</h1>
  <p>Business Developer chez Proprely depuis le lancement de la bêta privée, Paul Munier accompagne chaque mois plusieurs dirigeants de société de nettoyage dans leur passage d'Excel + WhatsApp vers un cockpit métier intégré. Ces échanges nourrissent directement les articles publiés sur le blog Proprely.</p>
  <p>Sa double casquette commercial / rédacteur lui permet de traduire les contraintes opérationnelles (planning, IDCC 3043, preuve de passage, marge par contrat) en contenus actionnables pour les TPE/PME du secteur.</p>
  <h2>Expertises</h2>
  <ul>
    <li>Logiciels de gestion société de nettoyage</li>
    <li>Convention collective IDCC 3043 (grille salariale, primes, article 7)</li>
    <li>Pilotage de marge en propreté B2B</li>
    <li>Planning multi-sites et terrain</li>
    <li>Preuve de passage et conformité syndic</li>
    <li>Marchés publics et appels d'offres propreté</li>
  </ul>
  <h2>Méthode éditoriale</h2>
  <p>Aucun article publié sans avoir été cadré avec au moins un dirigeant en exercice. Sources officielles citées (IDCC 3043, INSEE, Légifrance, BOAMP). Données chiffrées vérifiables, ordres de grandeur observés en bêta. Mises à jour annuelles sur les sujets sensibles. Aucune fabrication, aucune affiliation cachée.</p>
  <p>LinkedIn : <a href="https://www.linkedin.com/in/paulmunier/" rel="nofollow">paulmunier</a> — Contact : <a href="mailto:contact@proprely.fr">contact@proprely.fr</a></p>
`.trim()

const paulMunierHtml = buildHtml({
  url: '/auteurs/paul-munier',
  title: 'Paul Munier — Business Developer chez Proprely · Auteur',
  description: "Paul Munier accompagne les dirigeants de société de nettoyage chez Proprely. Expertises : IDCC 3043, planning multi-sites, preuve de passage, pilotage de marge.",
  ogImage: '/og/auteurs-paul-munier.png',
  schemas: [
    webpageSchema(
      'Paul Munier — Auteur Proprely',
      "Profil de Paul Munier, Business Developer chez Proprely.",
      `${ORIGIN}/auteurs/paul-munier/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Auteurs', item: `${ORIGIN}/auteurs/` },
        { name: 'Paul Munier', item: `${ORIGIN}/auteurs/paul-munier/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${ORIGIN}/auteurs/paul-munier/#person`,
      name: 'Paul Munier',
      jobTitle: 'Business Developer & rédacteur',
      url: `${ORIGIN}/auteurs/paul-munier/`,
      worksFor: { '@type': 'Organization', name: 'Proprely', url: `${ORIGIN}/` },
      sameAs: ['https://www.linkedin.com/in/paulmunier/'],
      knowsAbout: [
        'Logiciel de gestion société de nettoyage',
        'Convention collective propreté IDCC 3043',
        'Pilotage de marge en propreté B2B',
        'Planning multi-sites pour société de nettoyage',
        'Preuve de passage et conformité syndic',
        "Marchés publics et appels d'offres propreté",
      ],
    },
  ],
  bodyHtml: paulMunierBody,
})
writePage('/auteurs/paul-munier', paulMunierHtml)
generated.push('/auteurs/paul-munier')

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
  ogImage: '/og/fonctionnalites.png',
  schemas: [
    webpageSchema(
      'Fonctionnalités Proprely',
      "Planning, devis, gestion agents, preuve de passage pour société de nettoyage.",
      `${ORIGIN}/fonctionnalites/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Fonctionnalités', item: `${ORIGIN}/fonctionnalites/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Fonctionnalités Proprely',
      url: `${ORIGIN}/fonctionnalites/`,
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
      `${ORIGIN}/villes/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Villes', item: `${ORIGIN}/villes/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Logiciel nettoyage par ville',
      url: `${ORIGIN}/villes/`,
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
      `${ORIGIN}/beta/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Bêta privée', item: `${ORIGIN}/beta/` },
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
      `${ORIGIN}/ressources/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Ressources', item: `${ORIGIN}/ressources/` },
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
    <p>${escapeHtml(r.bestFor)} Proprely automatise ce que ce modèle vous demande de faire à la main. <a href="${ORIGIN}/beta/">Rejoindre la bêta gratuite</a>.</p>
  `.trim()

  const schemas: object[] = [
    webpageSchema(r.title, r.metaDescription, `${ORIGIN}${url}`, [
      { name: 'Accueil', item: `${ORIGIN}/` },
      { name: 'Ressources', item: `${ORIGIN}/ressources/` },
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
  <h1>Proprely vs Excel : à partir de quand changer pour un logiciel métier ?</h1>
  <p>Excel reste un excellent outil pour démarrer une société de nettoyage. Au-delà d'un seuil — typiquement 5 à 8 agents et 10 sites — il devient le frein principal à la croissance et coûte plus cher qu'une licence d'outil métier. Ce comparatif Proprely vs Excel identifie précisément le moment où basculer, pourquoi, et comment migrer sans douleur en moins de 2 semaines.</p>

  <h2>Quand Excel suffit encore</h2>
  <ul>
    <li>Vous êtes seul à gérer la société (pas de back-office, pas d'associé)</li>
    <li>Moins de 5 agents</li>
    <li>Moins de 10 sites clients récurrents</li>
    <li>Pas de preuve de passage formelle attendue par vos clients</li>
    <li>Pas de prestations récurrentes complexes (un seul type de prestation, fréquence standard)</li>
    <li>Pas d'enjeu de marge par client à suivre finement</li>
    <li>Pas de contraintes réglementaires fortes (médical, agroalimentaire)</li>
  </ul>
  <p>Dans ce cadre, nous proposons même des <a href="${ORIGIN}/ressources/">modèles Excel gratuits téléchargeables</a> pour démarrer : devis, planning hebdomadaire, suivi des heures agents.</p>

  <h2>Quand Excel devient le frein principal à la croissance</h2>
  <ul>
    <li>Plus de 6 heures par semaine perdues en administration dispersée (saisie, recherche, ressaisie entre fichiers)</li>
    <li>5 agents ou plus, sur 10 sites ou plus</li>
    <li>Clients (syndics, facility managers, gardiens) qui demandent une preuve de passage formelle avec photos et signature</li>
    <li>Travail simultané à 2 personnes ou plus sur les mêmes fichiers (corruption, modifications écrasées)</li>
    <li>Erreurs de pointage ou de devis découvertes a posteriori (formules cassées, lignes décalées, oublis)</li>
    <li>Plus aucune visibilité sur quels contrats sont vraiment rentables</li>
    <li>Documents administratifs difficiles à retrouver (contrat agent, attestation URSSAF, KBis client)</li>
    <li>Agents qui oublient des passages sans qu'on s'en rende compte avant le client mécontent</li>
    <li>Facturation manuelle des contrats récurrents qui prend 4 à 6 heures par mois</li>
  </ul>

  <h2>Coût caché d'Excel pour une société de nettoyage</h2>
  <p>Quand on additionne les heures perdues en dispersion administrative, les erreurs de devis et de pointage, et les risques (perte de contrat faute de preuve de passage, redressement URSSAF sur les heures sup non majorées), Excel coûte plus cher qu'une licence d'outil métier. Estimation chiffrée : pour une société B2B nettoyage de 8 à 15 agents, à 45 € de coût horaire dirigeant chargé, 6 à 10 heures perdues par semaine représentent <strong>12 600 à 21 000 € de coût caché par an</strong> — sans compter les opportunités commerciales loupées par lenteur de devis ou les contrats perdus par sous-tarification invisible.</p>
  <p>Mesurez votre coût réel avec le <a href="${ORIGIN}/calculateur-roi/">calculateur ROI logiciel société de nettoyage</a>.</p>

  <h2>Comparatif tableau : Proprely vs Excel sur 10 critères</h2>
  <ul>
    <li><strong>Coût</strong> : Excel = 0 € licence (Office 365 inclus le plus souvent) mais 12-21 k€/an de coût caché. Proprely = gratuit pendant la bêta privée, tarif fondateur à vie après</li>
    <li><strong>Multi-utilisateur</strong> : Excel = collaboration fragile (corruption). Proprely = multi-utilisateur natif, droits par profil</li>
    <li><strong>Mobile agents</strong> : Excel = inutilisable sur téléphone. Proprely = lien web personnel par agent, sans app à installer</li>
    <li><strong>Preuve de passage</strong> : Excel = aucune. Proprely = QR + photos avant-après + signature + PV automatique</li>
    <li><strong>Marge par client en temps réel</strong> : Excel = à compiler manuellement. Proprely = en surface dans le pilotage</li>
    <li><strong>Facturation auto contrats récurrents</strong> : Excel = manuel chaque mois. Proprely = automatique</li>
    <li><strong>Spécialités agents (vitrerie, bionettoyage)</strong> : Excel = colonne notée à la main. Proprely = filtre natif à l'affectation</li>
    <li><strong>Alertes surmenage</strong> : Excel = aucune. Proprely = alerte automatique au dépassement de seuil</li>
    <li><strong>RGPD et hébergement</strong> : Excel/OneDrive = OK. Proprely = hébergement européen, contrat de sous-traitance, export 1 clic</li>
    <li><strong>Évolutivité</strong> : Excel = bloque à 8-10 agents. Proprely = jusqu'à 50+ agents sans dégradation</li>
  </ul>

  <h2>Migration Excel → Proprely en 2 semaines</h2>
  <p>Jour 1 — audit de vos fichiers Excel actuels (clients, sites, agents, contrats, devis). Jour 2 — configuration de votre instance Proprely à partir de vos fichiers. Jour 3 — premier planning + premier devis sur Proprely. Semaine 1 — validation côté agents (chacun ouvre son lien web personnel, valide sa première mission). Semaine 2 — bascule complète : Proprely devient l'outil principal, Excel reste accessible en archive. Pas de big bang, pas de double saisie pendant 3 mois.</p>

  <h2>Aller plus loin</h2>
  <ul>
    <li>Pour comparer avec d'autres logiciels métier société de nettoyage : <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">comparatif logiciels métier nettoyage 2026</a></li>
    <li>Pour mesurer votre ROI : <a href="${ORIGIN}/calculateur-roi/">calculateur ROI logiciel société de nettoyage</a></li>
    <li>Pour préparer la digitalisation : <a href="${ORIGIN}/blog/digitaliser-entreprise-nettoyage-5-etapes/">Digitaliser sa société de nettoyage : 5 étapes 2026</a></li>
    <li>Modèles Excel gratuits pour démarrer : <a href="${ORIGIN}/ressources/">devis, planning, suivi heures</a></li>
    <li><a href="${ORIGIN}/beta/">Candidater à la bêta Proprely</a> — gratuit, sans carte bancaire</li>
  </ul>
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
      `${ORIGIN}/proprely-vs-excel/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Proprely vs Excel', item: `${ORIGIN}/proprely-vs-excel/` },
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
  <p>Pour fixer un prix juste avant de signer : <a href="${ORIGIN}/calculateur-prix-nettoyage-m2/">calculateur de prix nettoyage au m²</a> et <a href="${ORIGIN}/blog/fixer-prix-nettoyage/">guide méthode prix nettoyage 2026</a>. Pour comprendre le vrai coût horaire chargé de vos agents : <a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage/">guide coût horaire chargé 2026</a>. Pour calculer le ROI global de la digitalisation : <a href="${ORIGIN}/calculateur-roi/">calculateur ROI société de nettoyage</a>. La bêta privée Proprely intègre la marge par client en temps réel — <a href="${ORIGIN}/beta/">candidater à la bêta</a>.</p>
`.trim()

const simulateurHtml = buildHtml({
  url: '/simulateur-rentabilite',
  title: 'Simulateur rentabilité contrat nettoyage : marge brute et nette · Proprely',
  description: "Calculez en 1 minute la marge brute, la marge nette et le résultat horaire d'un contrat de nettoyage. Verdict immédiat, recommandations actionnables, cibles par typologie.",
  schemas: [
    webpageSchema(
      'Simulateur de rentabilité Proprely',
      "Calculez la rentabilité réelle d'un contrat de nettoyage avec un verdict immédiat et des recommandations actionnables.",
      `${ORIGIN}/simulateur-rentabilite/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Simulateur de rentabilité', item: `${ORIGIN}/simulateur-rentabilite/` },
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
  <p><strong>Réponse rapide</strong> — Un logiciel pour société de nettoyage B2B (ou logiciel entreprise de propreté) centralise dans un seul cockpit : clients et sites, agents et planning, devis et facturation, preuve de passage, CRM et marge par client. En France en 2026, le marché se répartit en trois familles : ERP métier historiques (PROPRET, Progiclean, 50+ agents), suites multi-métiers (Organilog), et SaaS verticaux nouvelle génération mobile-first (dont Proprely, 3-50 agents). Compter 15-60 €/utilisateur/mois sur les SaaS verticaux, 100 €+ sur les ERP. <strong>Proprely est gratuit pendant la bêta privée</strong> (30 places fondateurs) avec tarif fondateur conservé à vie ensuite.</p>
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
  <p>Pour une société de 10 agents perdant 8 heures par semaine en administration dispersée (à 45 € de coût horaire dirigeant chargé), le coût caché atteint environ 16 800 € par an. Estimez le vôtre avec le <a href="${ORIGIN}/calculateur-roi/">calculateur ROI</a> ou la marge d'un contrat avec le <a href="${ORIGIN}/simulateur-rentabilite/">simulateur de rentabilité</a>.</p>

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
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">Planning agents</a> — affectation 1-clic, mobile-first sans app à installer</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">Devis professionnels</a> — 2 minutes par devis, signature électronique native</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">Gestion des agents</a> — profils, spécialités, charge horaire, paie</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">Preuve de passage</a> — QR, photos avant-après, signature client, PV automatique</li>
  </ul>
  <p>Volet commercial : le <a href="${ORIGIN}/crm-entreprise-proprete/">CRM entreprise propreté</a> intégré. Voir aussi toutes les <a href="${ORIGIN}/fonctionnalites/">fonctionnalités</a>.</p>

  <h2>Pour quelle taille de société ?</h2>
  <ul>
    <li><strong>Auto-entrepreneur &amp; solo</strong> — utile dès 3-5 clients récurrents (devis à votre charte, preuve de passage). Voir le <a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/">logiciel auto-entrepreneur nettoyage</a>.</li>
    <li><strong>3 à 15 agents</strong> — le moment idéal pour structurer avant que la dispersion ne plafonne la croissance. Cœur de cible de Proprely.</li>
    <li><strong>15 à 50 agents</strong> — agilité et pilotage de la marge en priorité, sans projet d'intégration de plusieurs mois.</li>
    <li><strong>50 agents et plus</strong> — une couche comptable/ERP peut compléter le dispositif ; comparez objectivement via le <a href="${ORIGIN}/comparatif-logiciel-nettoyage/">comparatif</a>.</li>
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
  <p>Comparatif Proprely vs Excel, PROPRET, Progiclean et Organilog : voir le <a href="${ORIGIN}/comparatif-logiciel-nettoyage/">comparatif détaillé</a>.</p>

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
    <li><a href="${ORIGIN}/comparatif-logiciel-nettoyage/">Comparatif général logiciels société de nettoyage 2026</a></li>
    <li><a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">Comparatif logiciels métier société de nettoyage : lequel choisir ?</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-organilog/">Proprely vs Organilog</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-progiclean/">Proprely vs Progiclean</a></li>
    <li><a href="${ORIGIN}/comparatif/proprely-vs-propret/">Proprely vs PROPRET</a></li>
    <li><a href="${ORIGIN}/proprely-vs-excel/">Proprely vs Excel</a></li>
  </ul>
  <h3>Explorer les fonctionnalités métier</h3>
  <ul>
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">Logiciel planning agents nettoyage</a> — affectation 1-clic, mobile sans app</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">Logiciel devis et facturation automatisée nettoyage</a> — contrats récurrents auto</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">Gestion agents nettoyage</a> — profils, spécialités, alertes surmenage</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">Preuve de passage nettoyage</a> — QR, photos, signature, PV automatique</li>
    <li><a href="${ORIGIN}/crm-entreprise-proprete/">CRM entreprise propreté</a> — pipeline commercial, relances</li>
  </ul>
  <h3>Calculer et chiffrer avant de signer</h3>
  <ul>
    <li><a href="${ORIGIN}/calculateur-prix-nettoyage-m2/">Calculateur prix de nettoyage au m²</a> — surface, fréquence, zone, type de site</li>
    <li><a href="${ORIGIN}/simulateur-rentabilite/">Simulateur rentabilité contrat</a> — marge brute, marge nette, verdict</li>
    <li><a href="${ORIGIN}/calculateur-roi/">Calculateur ROI logiciel société de nettoyage</a> — coût caché de la dispersion</li>
    <li><a href="${ORIGIN}/outils/">Tous les outils gratuits</a></li>
  </ul>
  <h3>Cas spécifiques par taille, profil et vertical</h3>
  <ul>
    <li><a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/">Logiciel pour auto-entrepreneur nettoyage</a> — solo et indépendants</li>
    <li><a href="${ORIGIN}/convention-collective-nettoyage/">Logiciel conforme convention collective propreté IDCC 3043</a> — grille salaires, article 7</li>
    <li><a href="${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/">Logiciel nettoyage médical et bionettoyage</a> — traçabilité, protocoles, CMR</li>
    <li><a href="${ORIGIN}/logiciel-nettoyage-copropriete-syndic/">Logiciel nettoyage copropriété et syndic</a> — PV automatique, facturation récurrente</li>
    <li><a href="${ORIGIN}/application-mobile-agents-nettoyage/">Application mobile pour agents de nettoyage</a> — sans app à installer</li>
  </ul>
  <h3>Pages locales — couverture nationale</h3>
  <ul>
    <li><a href="${ORIGIN}/villes/paris/">Paris &amp; Île-de-France</a> · <a href="${ORIGIN}/villes/lyon/">Lyon &amp; Rhône-Alpes</a> · <a href="${ORIGIN}/villes/marseille/">Marseille &amp; PACA</a> · <a href="${ORIGIN}/villes/bordeaux/">Bordeaux &amp; Gironde</a> · <a href="${ORIGIN}/villes/toulouse/">Toulouse &amp; Occitanie</a></li>
    <li><a href="${ORIGIN}/villes/nantes/">Nantes</a> · <a href="${ORIGIN}/villes/lille/">Lille</a> · <a href="${ORIGIN}/villes/nice/">Nice</a> · <a href="${ORIGIN}/villes/strasbourg/">Strasbourg</a> · <a href="${ORIGIN}/villes/montpellier/">Montpellier</a> · <a href="${ORIGIN}/villes/rennes/">Rennes</a></li>
    <li><a href="${ORIGIN}/villes/">Voir toutes les pages villes</a></li>
  </ul>
  <h3>Articles de blog les plus consultés</h3>
  <ul>
    <li><a href="${ORIGIN}/blog/logiciel-planning-nettoyage-2026/">Logiciel planning nettoyage : 7 outils recommandés en 2026</a></li>
    <li><a href="${ORIGIN}/blog/devis-nettoyage-intelligent-ia/">Devis nettoyage par IA : 9 facteurs pour scaler en 2026</a></li>
    <li><a href="${ORIGIN}/blog/ia-nettoyage-b2b-transformations-2026/">IA dans le nettoyage B2B : 4 transformations en cours en 2026</a></li>
    <li><a href="${ORIGIN}/blog/fixer-prix-nettoyage/">Fixer ses prix dans le nettoyage : méthode 2026</a></li>
    <li><a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043/">Convention collective propreté IDCC 3043 : grille salaires 2026</a></li>
    <li><a href="${ORIGIN}/blog/calcul-heures-agents-nettoyage/">Calcul des heures agents nettoyage : méthode et coût 2026</a></li>
    <li><a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026/">Tarif nettoyage bureaux au m² 2026</a></li>
    <li><a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage/">Coût horaire chargé d'un agent en 2026</a></li>
    <li><a href="${ORIGIN}/blog/rgpd-societe-nettoyage-2026/">RGPD société de nettoyage 2026</a></li>
    <li><a href="${ORIGIN}/blog/fideliser-agents-nettoyage-turnover/">Fidéliser les agents : 6 leviers contre 35 % de turnover</a></li>
    <li><a href="${ORIGIN}/blog/">Voir tous les articles du blog</a></li>
  </ul>

  <h2>Bêta privée Proprely</h2>
  <p>30 sociétés fondatrices, accès gratuit pendant toute la bêta, tarif privilégié à vie après le lancement public. Onboarding 30 min avec le fondateur. <a href="${ORIGIN}/beta/">Candidater à la bêta</a> · <a href="${ORIGIN}/tarifs/">Tarifs</a>.</p>
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
  title: 'Logiciel société nettoyage B2B 2026 : guide + essai · Proprely',
  description: "Logiciel de gestion société de nettoyage B2B : planning, devis, preuve de passage, marge par client. Bêta gratuite — 14 places fondateurs. Guide 2026.",
  ogImage: '/og/logiciel-societe-nettoyage.png',
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Proprely',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: "Logiciel de gestion pour société de nettoyage B2B : clients, agents, planning, devis, preuve de passage.",
      url: `${ORIGIN}/logiciel-societe-nettoyage/`,
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
      `${ORIGIN}/logiciel-societe-nettoyage/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Logiciel société de nettoyage', item: `${ORIGIN}/logiciel-societe-nettoyage/` },
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
  <p>Le comparatif des logiciels métier pour société de nettoyage en France en 2026 oppose trois familles : les SaaS verticaux nouvelle génération (Proprely), les logiciels métier historiques (PROPRET, Progiclean, Sevensoft, Maglia), les suites multi-métiers (Organilog, Synchroteam) et Excel. Le bon choix dépend de votre taille, votre mix client et votre niveau de digitalisation actuel.</p>
  <h2>Réponse rapide selon votre profil</h2>
  <ul>
    <li><strong>1 à 5 agents (démarrage solo ou TPE)</strong> — Excel + modèles Proprely gratuits suffisent. Voir nos <a href="${ORIGIN}/ressources/">modèles de devis, planning et suivi des heures</a>.</li>
    <li><strong>3 à 15 agents en structuration</strong> — Proprely (SaaS vertical moderne) : mobile-first sans app, marge par client, onboarding 30 min. <a href="${ORIGIN}/beta/">Candidater à la bêta gratuite</a>.</li>
    <li><strong>15 à 50 agents</strong> — Proprely pour l'agilité et la marge, ou PROPRET/Progiclean si vous avez besoin d'une couverture comptable intégrée.</li>
    <li><strong>50+ agents avec besoins paie/GED avancés</strong> — ERP métier propreté (PROPRET, Progiclean, Sevensoft, Maglia) ou ERP généraliste (Sage, Cegid, Divalto).</li>
    <li><strong>Multi-métiers (BTP + sécurité + nettoyage)</strong> — Organilog (couverture multi-secteurs) ; compromis : moins spécialisé propreté.</li>
    <li><strong>Pour la facturation pure</strong> — Henrri ou Bizyness (puissants en facturation mais sans planning ni preuve de passage).</li>
  </ul>

  <h2>Les outils comparés en 2026</h2>
  <ul>
    <li><strong>Proprely</strong> — SaaS vertical 2026 conçu pour TPE/PME nettoyage B2B 3-50 agents, mobile-first sans app à installer, gratuit en bêta privée. Planning drag-and-drop, devis et facturation auto, preuve de passage native, marge par client en temps réel.</li>
    <li><strong>PROPRET</strong> — Logiciel métier historique propreté (10+ ans). Couverture fonctionnelle large incluant paie et GED, UX dense, app mobile native, intégration par consultant. Cible PME/ETI 50+ agents. Tarif sur devis.</li>
    <li><strong>Progiclean</strong> — Logiciel métier historique propreté. UX dense, setup 3-6 mois avec consultant intégrateur, packages 5-15 k€ + abonnement annuel. Cible PME/ETI 50+ agents.</li>
    <li><strong>Sevensoft Propreté</strong> — Logiciel métier ETI propreté multi-établissements avec facturation métier complète. Setup 1-3 mois sur devis.</li>
    <li><strong>Maglia</strong> — Logiciel métier ETI propreté multi-marchés avec reporting consolidé. Setup 1-3 mois sur devis.</li>
    <li><strong>Organilog</strong> — Suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Planning générique complet mais non spécifique propreté. ~25-40 €/utilisateur/mois.</li>
    <li><strong>Synchroteam</strong> — Field service multi-secteurs avec géolocalisation, app mobile native. Non spécifique au nettoyage.</li>
    <li><strong>Excel + WhatsApp + Word</strong> — Mix gratuit viable pour 1 à 5 agents en démarrage. Bloque la croissance dès 5-8 agents (6 à 10 h/semaine perdues en dispersion).</li>
  </ul>

  <h2>13 critères qui comptent vraiment</h2>
  <p>Pour comparer objectivement les logiciels métier société de nettoyage, vérifiez en démo : (1) conçu propreté B2B vs adapté propreté, (2) essai gratuit sans carte bancaire, (3) planning drag-and-drop avec affectation 1-clic, (4) devis intégré avec signature électronique, (5) facturation automatique des contrats récurrents, (6) preuve de passage native (QR + photos + signature), (7) marge par client en temps réel (pas dans un reporting compilé), (8) application mobile agents (idéalement lien web sans app à installer), (9) spécialités agents natives (vitrerie hauteur, décapage, bionettoyage), (10) hébergement européen et RGPD réel, (11) export 1 clic de toutes vos données, (12) onboarding rapide (< 1 journée pour les SaaS modernes, 1-6 mois pour les ERP), (13) tarif transparent et prévisible sans coût caché.</p>

  <h2>Coût d'un logiciel métier société de nettoyage en 2026</h2>
  <p>Les fourchettes du marché français : SaaS verticaux modernes 15 à 60 €/utilisateur/mois (Proprely : gratuit en bêta privée, tarif fondateur à vie après) ; ERP métier propreté 50 à 150 €/utilisateur/mois plus un setup facturé 5 à 15 k€ ; suites multi-métiers 25 à 50 €/utilisateur/mois ; logiciels de facturation pure 10 à 30 €/mois forfait. Méfiance des packages "tout compris" à 200 € flat — souvent très limités.</p>

  <h2>5 tests à demander absolument en démo</h2>
  <p>Pour qualifier un logiciel métier société de nettoyage avant de signer : (1) affecter un agent à un créneau en 1 clic, (2) voir l'écran mobile que verra réellement un agent sur son téléphone, (3) générer un PV de passage avec photos avant-après et signature, (4) consulter la marge brute en temps réel sur un client, (5) exporter l'intégralité de vos données en CSV. Si l'une des cinq actions prend plus de 30 secondes ou nécessite un "on vous montrera plus tard", cherchez ailleurs.</p>

  <h2>Pour aller plus loin</h2>
  <ul>
    <li>Comparatifs détaillés un-à-un : <a href="${ORIGIN}/comparatif/proprely-vs-organilog/">Proprely vs Organilog</a> · <a href="${ORIGIN}/comparatif/proprely-vs-progiclean/">Proprely vs Progiclean</a> · <a href="${ORIGIN}/comparatif/proprely-vs-propret/">Proprely vs PROPRET</a> · <a href="${ORIGIN}/proprely-vs-excel/">Proprely vs Excel</a></li>
    <li>Méthode complète : <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">Comparatif logiciels métier nettoyage 2026 — lequel choisir ?</a> (article de référence sur les trois familles)</li>
    <li>Aller plus loin : <a href="${ORIGIN}/tarifs/">Tarifs Proprely</a> · <a href="${ORIGIN}/fonctionnalites/">Toutes les fonctionnalités</a> · <a href="${ORIGIN}/logiciel-societe-nettoyage/">Logiciel société de nettoyage : guide complet</a> · <a href="${ORIGIN}/calculateur-roi/">Calculateur ROI logiciel société de nettoyage</a></li>
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
  { name: 'PROPRET', description: "ERP métier historique de la propreté (depuis ~2005). Couverture fonctionnelle large (paie, GED) destinée aux PME/ETI 50+ agents.", url: `${ORIGIN}/comparatif/proprely-vs-propret/` },
  { name: 'Progiclean', description: "ERP métier propreté historique (depuis ~2000). Setup sur devis, abonnement annuel, cible PME/ETI 50+ agents.", url: `${ORIGIN}/comparatif/proprely-vs-progiclean/` },
  { name: 'Organilog', description: "Suite multi-métiers (BTP, sécurité, espaces verts, nettoyage). Forfait par utilisateur/mois, non spécifique propreté.", url: `${ORIGIN}/comparatif/proprely-vs-organilog/` },
  { name: 'Synchroteam', description: "Solution de gestion d'interventions multi-secteurs avec planning et géolocalisation, non spécifique au nettoyage.", url: 'https://www.synchroteam.com/' },
]

const comparatifHtml = buildHtml({
  url: '/comparatif-logiciel-nettoyage',
  title: 'Comparatif logiciels nettoyage 2026 : 6 outils notés · Proprely',
  description: "Proprely, Organilog, Progiclean, PROPRET, Synchroteam, Excel : 13 critères comparés, tarifs 2026 et recommandations par taille d'entreprise.",
  ogImage: '/og/comparatif-logiciel-nettoyage.png',
  schemas: [
    webpageSchema(
      'Comparatif logiciel nettoyage 2026',
      "Comparatif factuel des 5 principaux outils du marché propreté B2B.",
      `${ORIGIN}/comparatif-logiciel-nettoyage/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Comparatif logiciel nettoyage', item: `${ORIGIN}/comparatif-logiciel-nettoyage/` },
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
  <p><strong>Réponse rapide</strong> — Pour un auto-entrepreneur en nettoyage (micro-entrepreneur, indépendant, solo), le bon logiciel est utile dès 3 à 5 clients récurrents et couvre 5 fonctions : devis professionnels à votre charte (2 min), signature électronique, planning mobile sans application à installer, facturation automatique des contrats récurrents, export comptable CSV. Compter 0 à 30 €/mois sur le marché ; Proprely est gratuit pendant la bêta privée et bascule sans rupture en mode multi-agents quand vous embauchez. Gain typique : 1 à 3 heures d'administration récupérées par semaine.</p>
  <p>Un logiciel métier pour auto-entrepreneur en nettoyage doit couvrir le minimum vital : devis professionnels à votre charte, signature électronique, planning visible sur téléphone, facturation automatique des contrats récurrents, suivi des heures pour votre comptable. Proprely fait tout ça gratuitement pendant la bêta privée, et vous récupérez 1 à 3 heures par semaine sur l'administration.</p>

  <h2>Le quotidien d'un auto-entrepreneur en nettoyage</h2>
  <p>Quand vous êtes seul à porter votre activité, chaque heure passée en admin est une heure de moins en chantier ou en prospection. Les frictions récurrentes : devis sur Word qui prend 20 minutes par client, planning sur Excel qui se désynchronise dès le premier remplacement, factures à émettre manuellement chaque mois pour les contrats récurrents, relances de paiement oubliées, pas de preuve de passage formelle quand le client conteste une intervention.</p>

  <h2>Ce que Proprely fait pour vous, concrètement</h2>
  <ul>
    <li><strong>Devis pro en 2 minutes</strong> avec template à votre charte, signature électronique du client, suivi des relances automatiques à J+5 et J+10</li>
    <li><strong>Planning par semaine</strong> visible sur votre téléphone et sur celui de vos sous-traitants éventuels — sans application à installer</li>
    <li><strong>Facturation automatique des contrats récurrents</strong> : devis signé devient contrat, facture émise chaque mois, envoyée par e-mail, relances J+15 et J+30 si impayé</li>
    <li><strong>Preuve de passage standardisée</strong> sur les sites où le client veut un suivi formel (QR + photos + signature)</li>
    <li><strong>Suivi des heures pour le comptable</strong> exportable en CSV à tout moment, prêt pour Pennylane, Sage ou tout autre outil compta</li>
    <li><strong>Conformité RGPD intégrée</strong> avec hébergement européen et chiffrement</li>
  </ul>

  <h2>Avant / Après : le gain concret</h2>
  <p>Avant Proprely (mix Word + Excel + WhatsApp + Gmail) : 5 à 6 heures d'admin par semaine pour 8 à 12 clients. Avec Proprely : 1 h 30 par semaine. Sur un an, à 30 €/heure réelle de votre temps, c'est <strong>environ 600 € par mois récupérés</strong> en pratique — du temps qui peut être consacré à la prospection ou aux chantiers facturables.</p>

  <h2>Faut-il un logiciel quand on a 2-3 clients ?</h2>
  <p>Probablement non. En dessous de 5 clients récurrents, un template Word pour les devis + Excel pour le planning suffit. Voir nos <a href="${ORIGIN}/ressources/">modèles gratuits téléchargeables</a>. Dès que vous dépassez 5 clients récurrents ou commencez à perdre du temps à chercher l'info, basculer vers un logiciel métier vous récupère du temps immédiatement.</p>

  <h2>Quand vous embauchez votre premier salarié</h2>
  <p>Proprely bascule sans rupture du mode solo au mode multi-agents : vos données restent, vous ajoutez les profils des agents, ils accèdent à leur planning depuis leur téléphone via un lien web personnel — toujours sans application à installer. C'est exactement la même interface qu'en solo, juste avec plus de monde.</p>

  <h2>Gratuit pendant la bêta privée</h2>
  <p>30 places fondateurs incluant des auto-entrepreneurs et solo. Tarif fondateur conservé à vie après le lancement public. Pas de carte bancaire demandée, onboarding 30 minutes avec le fondateur. <a href="${ORIGIN}/beta/">Candidater à la bêta</a> ou voir le <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">comparatif logiciels métier nettoyage 2026</a> pour comparer avec les alternatives (Henrri, Bizyness, Organilog).</p>
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
  title: 'Logiciel auto-entrepreneur nettoyage : gérer seul · Proprely',
  description: "Logiciel pour auto-entrepreneur en nettoyage : devis, clients, planning, facturation, suivi heures. Pour solo et indépendants.",
  schemas: [
    webpageSchema(
      'Logiciel auto-entrepreneur nettoyage',
      "Logiciel pour auto-entrepreneur en nettoyage : devis, planning, facturation, suivi.",
      `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Logiciel auto-entrepreneur nettoyage', item: `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/` },
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
  <p><strong>Réponse rapide</strong> — Un CRM pour entreprise de propreté doit gérer la spécificité métier « un client = plusieurs sites avec des fréquences distinctes ». Les CRM généralistes (HubSpot, Salesforce, Pipedrive) ne couvrent pas ce modèle nativement : pas de notion de site client, pas de catalogue prestations propreté, pas de lien automatique prospect → planning agents, pas de visibilité sur la marge par client en temps réel, et un tarif élevé (40 à 200 €/utilisateur/mois). Un CRM intégré dans un cockpit métier (comme Proprely) résout ces angles morts à un coût bien inférieur — gratuit pendant la bêta privée.</p>
  <p>Un CRM pour entreprise de propreté doit gérer une spécificité fondamentale : un client = plusieurs sites avec des fréquences distinctes. Les CRM généralistes (HubSpot, Salesforce, Pipedrive) ne couvrent pas ce modèle. Proprely intègre nativement comptes + sites multiples + pipeline devis + planning agents + marge par client en temps réel — dans un seul cockpit, gratuit pendant la bêta privée.</p>

  <h2>Pourquoi HubSpot ou Salesforce ne suffit pas en propreté B2B</h2>
  <p>Les CRM généralistes sont d'excellents outils pour la vente complexe SaaS ou B2B industrielle (cycles 6-12 mois, équipes commerciales étoffées). La propreté B2B a des spécificités qu'ils ne couvrent pas natively :</p>
  <ul>
    <li><strong>Pas de notion native de site client</strong> — un client de nettoyage a souvent 5 à 50 sites avec adresses, codes d'accès, gardiens, fréquences et protocoles distincts. Les CRM généralistes obligent à dupliquer le compte ou bricoler avec des champs custom</li>
    <li><strong>Pas de catalogue prestations propreté</strong> — vous devez recréer vitrerie hauteur, moquette, décapage, bionettoyage et leurs tarifs à la main, dans chaque devis</li>
    <li><strong>Pas de lien automatique prospect → planning agents</strong> — quand vous gagnez un contrat, vous ressaisissez tout dans Excel ou un outil planning séparé</li>
    <li><strong>Pas de visibilité sur la marge par client en temps réel</strong> — vous suivez le CA, pas la rentabilité réelle qui dépend des heures effectivement passées</li>
    <li><strong>Onboarding lourd et tarif élevé</strong> — 40 à 80 €/utilisateur/mois minimum, 200 €+ pour Salesforce, sans compter le setup de plusieurs jours/semaines</li>
  </ul>

  <h2>Le CRM intégré Proprely : ce qu'il fait</h2>
  <ul>
    <li><strong>Comptes clients + sites multiples</strong> avec contacts par fonction (DG, facility manager, gardien, syndic, comptabilité)</li>
    <li><strong>Pipeline prospects et devis</strong> avec relances automatiques à J+5 et J+10 si le devis n'est pas signé</li>
    <li><strong>Historique des interactions</strong> par compte : appels, e-mails, RDV, devis envoyés, contrats signés</li>
    <li><strong>Catalogue prestations propreté pré-configuré</strong> : vitrerie, moquette, décapage, bionettoyage, remise en état post-chantier, avec tarification par fréquence</li>
    <li><strong>Conversion prospect → client en 1 clic</strong> — le prospect signé alimente automatiquement le planning des agents et le contrat de facturation récurrent</li>
    <li><strong>Marge par client en temps réel</strong> — visible sur l'écran de pilotage, basée sur les heures réellement passées (pas une projection théorique)</li>
    <li><strong>Alertes commerciales</strong> — contrat expirant dans 60 jours, marge en baisse, client non visité depuis 6 mois</li>
  </ul>

  <h2>Tout connecté dans un seul écran</h2>
  <p>L'avantage d'un cockpit unifié vs un CRM séparé : un prospect signé devient un client avec ses sites en 1 clic. Les sites alimentent automatiquement le <a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">planning des agents</a>. Les missions validées génèrent le PV de passage automatique. La facturation récurrente part chaque mois sans intervention manuelle (voir le <a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">module devis et facturation auto</a>). La marge par client se calcule en temps réel sur les heures réellement passées. Aucune ressaisie, aucune perte d'information entre les étapes.</p>

  <h2>Profils de sociétés concernées</h2>
  <p>Le CRM Proprely couvre les besoins typiques d'une société de nettoyage B2B de 3 à 50 agents avec 10 à 150 sites clients : prestataires multi-sites pour syndics de copropriété, sociétés intervenant sur bureaux tertiaires, cabinets médicaux, hôtellerie, retail. Au-delà de 50 agents avec besoins commerciaux structurés (commerciaux dédiés, comptes-clés stratégiques), un CRM dédié type HubSpot Sales Hub couplé à un ERP métier reste plus adapté.</p>

  <h2>Coût et alternatives</h2>
  <p>Tarifs CRM 2026 pour entreprise de propreté : Proprely gratuit pendant la bêta privée (tarif fondateur à vie après) ; HubSpot Starter 20 €/utilisateur/mois (mais sans la spécificité propreté) ; Pipedrive 15-30 €/utilisateur/mois (idem) ; Salesforce Essentials 25 €+/utilisateur/mois (idem, et setup lourd). Pour une comparaison plus large des logiciels métier société de nettoyage, voir le <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">comparatif logiciels métier nettoyage 2026</a>.</p>

  <h2>Gratuit pendant la bêta privée</h2>
  <p>30 places fondateurs, tarif fondateur conservé à vie après le lancement public. Onboarding 30 min avec le fondateur : import de vos comptes clients + sites + contacts, configuration du catalogue prestations, et vous êtes opérationnel. <a href="${ORIGIN}/beta/">Candidater à la bêta</a> ou voir <a href="${ORIGIN}/logiciel-societe-nettoyage/">le guide complet logiciel société de nettoyage</a>.</p>
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
  title: 'CRM entreprise propreté : clients et prospects · Proprely',
  description: "CRM pensé pour les entreprises de propreté : pipeline commercial, suivi clients et sites, relances devis, marge par compte.",
  schemas: [
    webpageSchema(
      'CRM entreprise propreté Proprely',
      "CRM métier propreté : comptes + sites, pipeline devis, marge par client.",
      `${ORIGIN}/crm-entreprise-proprete/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'CRM entreprise propreté', item: `${ORIGIN}/crm-entreprise-proprete/` },
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
        { '@type': 'ListItem', position: 2, name: 'Comparatif', item: `${ORIGIN}/comparatif-logiciel-nettoyage/` },
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
    ogImage: `/og/comparatif-${c.slug}.png`,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

// Pages "Alternative à X" — content marketing pages générées à partir de
// src/data/alternatives.ts. Body HTML riche pour SEO (tableau, raisons,
// migration, FAQ) + schemas WebPage / BreadcrumbList / FAQPage.
const { alternatives } = await import('../src/data/alternatives.ts')
for (const a of alternatives) {
  const url = `/${a.slug}`
  const altUrl = `${ORIGIN}${url}/`
  const reasonsHtml = a.reasonsToLeave
    .map((r, i) => `<h3>${i + 1}. ${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description)}</p>`)
    .join('')
  const tableHtml = a.quickTable
    .map(
      (r) =>
        `<tr><td>${escapeHtml(r.criterion)}</td><td>${escapeHtml(r.competitor)}</td><td>${escapeHtml(r.proprely)}</td></tr>`,
    )
    .join('')
  const stepsHtml = a.migrationSteps
    .map((s, i) => `<h3>Étape ${i + 1} — ${escapeHtml(s.title)}</h3><p>${escapeHtml(s.description)}</p>`)
    .join('')
  const faqHtml = a.faq
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')

  const bodyHtml = `
    <h1>${escapeHtml(a.title)}</h1>
    <aside><p><strong>Réponse-flash :</strong> ${escapeHtml(a.tldr)}</p></aside>
    <h2>${a.reasonsToLeave.length} raisons concrètes de chercher une alternative à ${escapeHtml(a.competitorName)}</h2>
    ${reasonsHtml}
    <h2>${escapeHtml(a.competitorName)} vs Proprely : tableau comparatif</h2>
    <table>
      <thead><tr><th>Critère</th><th>${escapeHtml(a.competitorName)}</th><th>Proprely</th></tr></thead>
      <tbody>${tableHtml}</tbody>
    </table>
    <h2>Comment migrer de ${escapeHtml(a.competitorName)} vers Proprely en ${a.migrationSteps.length} étapes</h2>
    ${stepsHtml}
    <h2>Questions fréquentes sur la migration depuis ${escapeHtml(a.competitorName)}</h2>
    ${faqHtml}
    <p><a href="${ORIGIN}/beta/">Candidater à la bêta privée Proprely</a> · ${
      a.comparisonSlug ? `<a href="${ORIGIN}/comparatif/${a.comparisonSlug}/">Comparatif détaillé Proprely vs ${escapeHtml(a.competitorName)}</a>` : ''
    }</p>
  `.trim()

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: a.title,
      description: a.metaDescription,
      url: altUrl,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      abstract: a.tldr,
      mentions: a.competitorUrl
        ? [{ '@type': 'Organization', name: a.competitorName, url: a.competitorUrl }]
        : [{ '@type': 'Organization', name: a.competitorName }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Comparatif', item: `${ORIGIN}/comparatif-logiciel-nettoyage/` },
        { '@type': 'ListItem', position: 3, name: `Alternative à ${a.competitorName}`, item: altUrl },
      ],
    },
    faqSchema(a.faq),
  ]

  const html = buildHtml({
    url,
    title: a.metaTitle,
    description: a.metaDescription,
    ogTitle: a.title,
    ogDescription: a.metaDescription,
    ogImage: `/og/${a.slug}.png`,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

// Page /audit-gratuit/ — page de conversion principale (offre d'appel).
const auditGratuitBody = `
  <h1>Audit gratuit de votre société de nettoyage : 30 minutes avec le fondateur</h1>
  <p>30 minutes en visio avec le fondateur Proprely pour identifier vos pertes de temps et d'argent, et chiffrer le ROI d'une digitalisation. Audit offert, sans engagement. Pour TPE/PME de 3 à 50 agents.</p>

  <h2>5 livrables concrets à la fin des 30 minutes</h2>
  <ul>
    <li><strong>Cartographie de vos outils actuels</strong> — Excel, WhatsApp, Word, Google Agenda, papier… on liste tout et on identifie où l'info se perd entre les outils.</li>
    <li><strong>Chiffrage du temps perdu en gestion</strong> — combien d'heures par semaine consacrez-vous (vous et vos chefs d'équipe) à la gestion ? On calcule en euros.</li>
    <li><strong>Identification des contrats sous-tarifés</strong> — on regarde 2-3 contrats avec vous et on chiffre la marge brute réelle. Souvent : surprise désagréable.</li>
    <li><strong>Diagnostic risque RH / turnover</strong> — quel est votre taux de turnover ? Vos agents les plus chargés sont-ils protégés ?</li>
    <li><strong>Roadmap de digitalisation chiffrée</strong> — à la fin de l'audit, vous repartez avec une roadmap claire : que digitaliser en priorité, dans quel ordre, quel ROI attendre.</li>
  </ul>

  <h2>Comment ça se passe</h2>
  <h3>Étape 1 — Vous demandez votre audit</h3>
  <p>Formulaire en 2 minutes. Vous précisez votre nombre d'agents, votre activité et vos disponibilités.</p>
  <h3>Étape 2 — On vous propose 3 créneaux sous 24 h ouvrées</h3>
  <p>Vous choisissez celui qui vous arrange. Le lien Google Meet vous est envoyé automatiquement.</p>
  <h3>Étape 3 — 30 min d'échange avec le fondateur</h3>
  <p>On parcourt vos outils actuels, on chiffre le temps perdu, on regarde 2-3 contrats pour la marge, on diagnostique le risque RH.</p>
  <h3>Étape 4 — Roadmap chiffrée envoyée par email</h3>
  <p>Sous 48 h, vous recevez un email récapitulatif : ce qu'on a identifié, les priorités, le ROI estimé. Vous décidez de la suite. Sans engagement.</p>

  <h2>Questions fréquentes sur l'audit gratuit</h2>
  <h3>Combien coûte l'audit ?</h3>
  <p>0 €, c'est offert par Proprely. Notre objectif : vous aider à identifier ce qui vous coûte du temps et de l'argent, que vous deveniez client ou non.</p>
  <h3>Combien de temps ça prend ?</h3>
  <p>30 minutes en visio (Google Meet ou téléphone). On peut faire plus court (20 min) ou plus long (45 min) selon votre disponibilité.</p>
  <h3>Qui fait l'audit ?</h3>
  <p>Paul Munier, fondateur de Proprely. Pas un commercial, pas un junior.</p>
  <h3>Et si vous me proposez Proprely à la fin ?</h3>
  <p>Nous pouvons vous proposer de candidater à la bêta privée (30 places fondateurs) si votre profil correspond. Sans engagement. Si Proprely ne convient pas, nous orientons honnêtement vers d'autres solutions du marché.</p>

  <p><a href="${ORIGIN}/beta/">Demander mon audit gratuit</a> — Réponse sous 24 h ouvrées.</p>
`.trim()

const auditGratuitFaq = [
  { q: "Combien coûte l'audit gratuit Proprely ?", a: "0 €, c'est offert par Proprely. Notre objectif : vous aider à identifier ce qui vous coûte du temps et de l'argent, que vous deveniez client ou non." },
  { q: "Combien de temps prend l'audit ?", a: "30 minutes en visio. On peut faire plus court (20 min) ou plus long (45 min) selon votre disponibilité et la complexité de votre activité." },
  { q: "Qui réalise l'audit ?", a: "Paul Munier, fondateur de Proprely. Pas un commercial, pas un junior. L'audit fait partie de notre démarche : comprendre les vraies douleurs avant de proposer une solution." },
  { q: "Que dois-je préparer ?", a: "Rien d'obligatoire. Si vous avez 5 minutes : ayez en tête le nombre d'agents, le nombre de sites/clients, et 1-2 contrats sur lesquels vous voulez creuser la marge." },
  { q: "Et si vous me proposez Proprely à la fin ?", a: "Nous pouvons vous proposer de candidater à la bêta privée si votre profil correspond. Sans engagement. Si Proprely ne convient pas, nous orientons honnêtement vers d'autres solutions du marché." },
  { q: "Faut-il être une grosse société pour bénéficier de l'audit ?", a: "Non. Nous faisons l'audit dès 3 agents, et jusqu'à 50 agents. Au-delà, nous orientons vers des solutions ERP métier plus adaptées." },
]

const auditGratuitHtml = buildHtml({
  url: '/audit-gratuit',
  title: 'Audit gratuit de votre société de nettoyage : 30 min · Proprely',
  description: "30 minutes pour identifier vos pertes de temps et d'argent, et chiffrer le ROI d'une digitalisation. Audit offert avec le fondateur Proprely, sans engagement.",
  ogImage: '/og/audit-gratuit.png',
  schemas: [
    webpageSchema(
      'Audit gratuit société de nettoyage',
      "Audit de 30 minutes avec le fondateur Proprely : identification des pertes de temps, chiffrage du ROI, recommandations adaptées.",
      `${ORIGIN}/audit-gratuit/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Audit gratuit', item: `${ORIGIN}/audit-gratuit/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Audit gratuit société de nettoyage',
      description: "Audit de 30 minutes avec le fondateur Proprely : identification des pertes de temps, chiffrage du ROI d'une digitalisation, recommandations adaptées à votre taille.",
      provider: { '@id': `${ORIGIN}/#organization` },
      areaServed: { '@type': 'Country', name: 'France' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
      },
    },
    faqSchema(auditGratuitFaq),
  ],
  bodyHtml: auditGratuitBody,
})
writePage('/audit-gratuit', auditGratuitHtml)
generated.push('/audit-gratuit')

// === Page /solution/ — hub navigationnel ===
// IMPORTANT : cette page cible "solution gestion société nettoyage B2B" et NON
// "logiciel société de nettoyage" pour ne pas cannibaliser la page pilier
// /logiciel-societe-nettoyage/.
const solutionHubBody = `
  <h1>La solution complète pour gérer une société de nettoyage B2B en 2026</h1>
  <p>Explorez l'écosystème Proprely selon votre besoin : par type de société (auto-entrepreneur, PME, secteur médical, copropriété) ou par fonctionnalité (planning, devis, agents, preuve de passage, facturation 2026). Tout part d'un cockpit unifié, gratuit pendant la bêta privée.</p>

  <h2>Par type de société</h2>
  <ul>
    <li><a href="${ORIGIN}/logiciel-societe-nettoyage/">Logiciel société de nettoyage</a> — Le guide complet 2026 pour TPE/PME B2B 3-50 agents.</li>
    <li><a href="${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/">Solution auto-entrepreneur nettoyage</a> — Démarrer seul en propreté sans Excel ni WhatsApp.</li>
    <li><a href="${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/">Solution secteur médical</a> — Bionettoyage, protocoles HACCP, traçabilité agents.</li>
    <li><a href="${ORIGIN}/logiciel-nettoyage-copropriete-syndic/">Solution copropriété et syndic</a> — Multi-immeubles, PV automatique, format syndic standardisé.</li>
  </ul>

  <h2>Par besoin / fonctionnalité</h2>
  <ul>
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage/">Planning agents</a> — Drag-and-drop avec affectation 1-clic selon spécialités.</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage/">Devis intelligent IA</a> — Algorithme propriétaire : 9 facteurs, 3 scénarios optimisés.</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/">Gestion des agents</a> — Profils, spécialités, alertes surmenage, compteur d'heures.</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/">Preuve de passage</a> — QR code + photos avant-après + signature + PV automatique.</li>
    <li><a href="${ORIGIN}/fonctionnalites/facturation-nettoyage/">Facturation 2026</a> — Factur-X conforme + récurrente automatique + relances.</li>
    <li><a href="${ORIGIN}/fonctionnalites/pointage-agents-nettoyage/">Pointage GPS agents</a> — Mobile sans badgeuse + calcul majorations IDCC 3043.</li>
    <li><a href="${ORIGIN}/fonctionnalites/suivi-interventions-nettoyage/">Suivi interventions</a> — Statut temps réel + alertes retard + rapports automatiques.</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-sites-clients-nettoyage/">Sites et clients</a> — Multi-sites, protocoles, marge par client en temps réel.</li>
    <li><a href="${ORIGIN}/application-mobile-agents-nettoyage/">Application mobile agents</a> — Lien web mobile sans application à installer.</li>
    <li><a href="${ORIGIN}/crm-entreprise-proprete/">CRM entreprise propreté</a> — Pipeline commercial + marge par compte client.</li>
  </ul>

  <h2>Pas sûr du choix ? Démarrez par ces options</h2>
  <ul>
    <li><a href="${ORIGIN}/audit-gratuit/">Audit gratuit 30 minutes</a> — Diagnostic offert par le fondateur Proprely.</li>
    <li><a href="${ORIGIN}/outils/">4 calculateurs gratuits</a> — Prix m², ROI, rentabilité, coût horaire chargé.</li>
    <li><a href="${ORIGIN}/comparatif-logiciel-nettoyage/">Comparatif logiciels nettoyage 2026</a> — 6 outils notés sur 13 critères.</li>
  </ul>

  <p>Tout l'écosystème Proprely en bêta privée gratuite : 30 sociétés fondatrices, accès complet pendant la bêta, tarif fondateur à vie après. <a href="${ORIGIN}/beta/">Candidater à la bêta</a>.</p>
`.trim()

const solutionHubItems = [
  { name: 'Logiciel société de nettoyage', url: `${ORIGIN}/logiciel-societe-nettoyage/` },
  { name: 'Solution auto-entrepreneur', url: `${ORIGIN}/logiciel-auto-entrepreneur-nettoyage/` },
  { name: 'Solution secteur médical', url: `${ORIGIN}/logiciel-nettoyage-medical-bionettoyage/` },
  { name: 'Solution copropriété et syndic', url: `${ORIGIN}/logiciel-nettoyage-copropriete-syndic/` },
  { name: 'Planning agents', url: `${ORIGIN}/fonctionnalites/planning-nettoyage/` },
  { name: 'Devis intelligent IA', url: `${ORIGIN}/fonctionnalites/devis-nettoyage/` },
  { name: 'Gestion des agents', url: `${ORIGIN}/fonctionnalites/gestion-agents-nettoyage/` },
  { name: 'Preuve de passage', url: `${ORIGIN}/fonctionnalites/preuve-passage-nettoyage/` },
  { name: 'Facturation 2026', url: `${ORIGIN}/fonctionnalites/facturation-nettoyage/` },
  { name: 'Pointage GPS agents', url: `${ORIGIN}/fonctionnalites/pointage-agents-nettoyage/` },
  { name: 'Suivi interventions', url: `${ORIGIN}/fonctionnalites/suivi-interventions-nettoyage/` },
  { name: 'Sites et clients', url: `${ORIGIN}/fonctionnalites/gestion-sites-clients-nettoyage/` },
  { name: 'Application mobile agents', url: `${ORIGIN}/application-mobile-agents-nettoyage/` },
  { name: 'CRM entreprise propreté', url: `${ORIGIN}/crm-entreprise-proprete/` },
]

const solutionHubHtml = buildHtml({
  url: '/solution',
  title: 'Solution gestion société de nettoyage B2B 2026 · Proprely',
  description: "La solution complète pour gérer une société de nettoyage B2B en 2026 : par type de société, par fonctionnalité, par cas d'usage. Découvrez toutes les options.",
  schemas: [
    webpageSchema(
      'Solution gestion société de nettoyage B2B',
      "Hub navigationnel des solutions Proprely par type de société et par besoin opérationnel.",
      `${ORIGIN}/solution/`,
      [
        { name: 'Accueil', item: `${ORIGIN}/` },
        { name: 'Solution', item: `${ORIGIN}/solution/` },
      ]
    ),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Solutions Proprely par segment et par besoin',
      numberOfItems: solutionHubItems.length,
      itemListElement: solutionHubItems.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: s.url,
        name: s.name,
      })),
    },
  ],
  bodyHtml: solutionHubBody,
})
writePage('/solution', solutionHubHtml)
generated.push('/solution')

// Pages /guides/ — format réponse directe pour Generative Engines (ChatGPT,
// Perplexity, Google AI Overviews, Gemini). Schemas WebPage + BreadcrumbList
// + FAQPage avec abstract pour maximiser la citation IA.
const { guides } = await import('../src/data/guides.ts')
for (const g of guides) {
  const url = `/guides/${g.slug}`
  const guideUrl = `${ORIGIN}${url}/`
  const sectionsHtml = g.sections
    .map((s) => {
      const paragraphsHtml = s.paragraphs
        .map((p) => `<p>${p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`)
        .join('')
      return `<h2>${escapeHtml(s.heading)}</h2>${paragraphsHtml}`
    })
    .join('')
  const faqHtml = g.faq
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')
  const relatedHtml = g.relatedLinks
    .map((l) => `<li><a href="${ORIGIN}${l.to}/">${escapeHtml(l.label)}</a></li>`)
    .join('')

  const bodyHtml = `
    <h1>${escapeHtml(g.title)}</h1>
    <aside><p><strong>Réponse-flash :</strong> ${escapeHtml(g.tldr)}</p></aside>
    ${sectionsHtml}
    <h2>Questions fréquentes</h2>
    ${faqHtml}
    <h2>Pour aller plus loin</h2>
    <ul>${relatedHtml}</ul>
  `.trim()

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: g.title,
      description: g.metaDescription,
      url: guideUrl,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-01',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      abstract: g.tldr,
      mainContentOfPage: { '@type': 'WebPageElement', name: g.primaryQuestion },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${ORIGIN}/guides/` },
        { '@type': 'ListItem', position: 3, name: g.primaryQuestion, item: guideUrl },
      ],
    },
    faqSchema(g.faq),
  ]

  const html = buildHtml({
    url,
    title: g.metaTitle,
    description: g.metaDescription,
    ogTitle: g.title,
    ogDescription: g.metaDescription,
    ogImage: `/og/guides-${g.slug}.png`,
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
      url: `${ORIGIN}/a-propos/`,
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
      url: `${ORIGIN}/a-propos/`,
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
        { '@type': 'ListItem', position: 2, name: 'À propos', item: `${ORIGIN}/a-propos/` },
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
    <li><a href="${ORIGIN}/calculateur-prix-nettoyage-m2/"><strong>Calculateur prix de nettoyage au m²</strong></a> — estimez le prix de vente d'une prestation selon surface, fréquence (quotidienne, 3×/semaine, hebdomadaire), zone géographique (Paris, IDF, métropoles, villes moyennes, rural) et type de site (bureaux, médical, hôtellerie, industriel). Bénéfice : éviter de sous-tarifer un contrat avant de le signer (1 min).</li>
    <li><a href="${ORIGIN}/simulateur-rentabilite/"><strong>Simulateur de rentabilité par contrat</strong></a> — marge brute, marge nette, résultat horaire et verdict immédiat (très rentable / rentable / limite / non rentable) avec recommandations actionnables selon votre situation. Bénéfice : identifier les contrats qui rongent votre rentabilité avant qu'ils ne creusent un trou (1 min).</li>
    <li><a href="${ORIGIN}/calculateur-roi/"><strong>Calculateur ROI dispersion administrative</strong></a> — combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word. Benchmark : 6 à 10 h/semaine perdues pour une PME de 8-15 agents, soit 12 600 à 21 000 €/an. Bénéfice : objectiver le coût caché de la non-digitalisation (30 sec).</li>
    <li><a href="${ORIGIN}/ressources/modele-suivi-heures-agents/"><strong>Coût horaire chargé d'un agent — modèle Excel</strong></a> — calcul du coût horaire réel d'un agent au SMIC propreté 2026, charges sociales et primes incluses (panier, transport, salissure). Bénéfice : connaître précisément le coût horaire à charger sur chaque contrat. À télécharger et adapter à vos paramètres (5 min).</li>
  </ul>
  <h2>Pour quel profil quel outil ?</h2>
  <ul>
    <li><strong>Vous êtes en phase de prospection</strong> et préparez une réponse à un nouveau client : commencez par le <a href="${ORIGIN}/calculateur-prix-nettoyage-m2/">calculateur prix au m²</a>, puis validez la rentabilité prévisionnelle avec le <a href="${ORIGIN}/simulateur-rentabilite/">simulateur de rentabilité</a>.</li>
    <li><strong>Vous voulez auditer un contrat existant</strong> qui vous semble fragile : utilisez directement le <a href="${ORIGIN}/simulateur-rentabilite/">simulateur de rentabilité</a> avec les vraies données du contrat (CA, heures, coûts).</li>
    <li><strong>Vous hésitez à digitaliser votre gestion</strong> : commencez par le <a href="${ORIGIN}/calculateur-roi/">calculateur ROI</a> pour mesurer le coût caché de la dispersion, puis lisez le <a href="${ORIGIN}/blog/digitaliser-entreprise-nettoyage-5-etapes/">guide digitalisation en 5 étapes</a>.</li>
    <li><strong>Vous préparez votre prochaine grille de salaires</strong> : téléchargez le <a href="${ORIGIN}/ressources/modele-suivi-heures-agents/">modèle coût horaire chargé</a> et croisez avec la <a href="${ORIGIN}/blog/convention-collective-nettoyage-idcc-3043/">convention collective propreté IDCC 3043</a>.</li>
  </ul>
  <h2>Aller plus loin — guides et ressources</h2>
  <p>Pour approfondir le pilotage de votre société : <a href="${ORIGIN}/blog/fixer-prix-nettoyage/">méthode prix nettoyage 2026</a>, <a href="${ORIGIN}/blog/cout-horaire-charge-agent-nettoyage/">coût horaire chargé d'un agent</a>, <a href="${ORIGIN}/blog/tarif-nettoyage-bureaux-m2-2026/">tarif nettoyage bureaux au m² 2026</a>, <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026/">comparatif logiciels métier nettoyage 2026</a>. Tous les <a href="${ORIGIN}/ressources/">modèles Excel téléchargeables</a> sont accessibles sans inscription. Pour passer à un cockpit unifié, la <a href="${ORIGIN}/beta/">bêta privée Proprely</a> est gratuite pour les 30 sociétés fondatrices.</p>
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
      url: `${ORIGIN}/outils/`,
      inLanguage: 'fr-FR',
      datePublished: '2026-05-21',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Calculateur prix de nettoyage au m²', url: `${ORIGIN}/calculateur-prix-nettoyage-m2/` },
          { '@type': 'ListItem', position: 2, name: 'Simulateur de rentabilité contrat', url: `${ORIGIN}/simulateur-rentabilite/` },
          { '@type': 'ListItem', position: 3, name: 'Calculateur ROI dispersion', url: `${ORIGIN}/calculateur-roi/` },
          { '@type': 'ListItem', position: 4, name: "Coût horaire chargé d'un agent (modèle Excel)", url: `${ORIGIN}/ressources/modele-suivi-heures-agents/` },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: `${ORIGIN}/outils/` },
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
      url: `${ORIGIN}/calculateur-prix-nettoyage-m2/`,
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
        { '@type': 'ListItem', position: 2, name: 'Outils', item: `${ORIGIN}/outils/` },
        { '@type': 'ListItem', position: 3, name: 'Calculateur prix nettoyage', item: `${ORIGIN}/calculateur-prix-nettoyage-m2/` },
      ],
    },
    faqSchema(priceFaqs),
  ],
  bodyHtml: priceBody,
})
writePage('/calculateur-prix-nettoyage-m2', priceHtml)
generated.push('/calculateur-prix-nettoyage-m2')

// ─── Index intégrations + pages détail ────────────────────────────────
// /integrations/ : page index avec toutes les intégrations groupées par catégorie.
// /integrations/{slug}/ : pages détail pour les intégrations avec `detail`.
const integrationsByCategory = new Map<string, typeof integrations>()
for (const integ of integrations) {
  if (!integrationsByCategory.has(integ.category)) integrationsByCategory.set(integ.category, [])
  integrationsByCategory.get(integ.category)!.push(integ)
}

const integrationsIndexBody = `
  <h1>Intégrations Proprely : votre cockpit nettoyage parle à votre stack</h1>
  <p>Vos données opérationnelles (clients, agents, plannings, devis, factures) ne devraient pas être enfermées dans un seul outil. Proprely se connecte à votre paie (Silae), votre comptabilité (Pennylane, Tiime, Indy), votre banque pro (Qonto, Shine), votre email marketing (Brevo) et la conformité Factur-X 2026-2027 (Chorus Pro et PDP).</p>
  ${[...integrationsByCategory.entries()].map(([cat, integs]) => `
    <h2>${escapeHtml(cat)}</h2>
    <ul>${integs.map((i) => `
      <li>
        ${i.detail ? `<a href="${ORIGIN}/integrations/${i.slug}/"><strong>${escapeHtml(i.name)}</strong></a>` : `<strong>${escapeHtml(i.name)}</strong>`}
        (${escapeHtml(STATUS_LABEL[i.status])}) — ${escapeHtml(i.description)}
      </li>
    `).join('')}</ul>
  `).join('')}
  <h2>Aucun lock-in technique</h2>
  <p>Toutes vos données restent exportables en CSV / Excel à tout moment, sans intervention technique. Les intégrations sont des facilitateurs, pas des verrous.</p>
`.trim()

const integrationsIndexHtml = buildHtml({
  url: '/integrations',
  title: 'Intégrations Proprely : Silae, Pennylane, Qonto, Brevo · Proprely',
  description: "Toutes les intégrations Proprely : paie Silae, comptabilité Pennylane/Tiime/Indy, banque Qonto/Shine, email Brevo, Chorus Pro Factur-X. Cockpit nettoyage qui parle à votre stack.",
  ogImage: '/og/integrations.png',
  schemas: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Intégrations Proprely',
      description: "Intégrations natives du cockpit Proprely : paie, comptabilité, banque pro, email, conformité Factur-X.",
      url: `${ORIGIN}/integrations/`,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-07',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      hasPart: integrations.map((i) => ({
        '@type': 'WebPage',
        name: `Intégration ${i.name}`,
        description: i.description,
        ...(i.detail ? { url: `${ORIGIN}/integrations/${i.slug}/` } : {}),
      })),
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Intégrations', item: `${ORIGIN}/integrations/` },
        ],
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h1 + p'],
      },
    },
  ],
  bodyHtml: integrationsIndexBody,
})
writePage('/integrations', integrationsIndexHtml)
generated.push('/integrations')

for (const integ of integrations) {
  if (!integ.detail) continue
  const url = `/integrations/${integ.slug}`
  const detailUrl = `${ORIGIN}${url}/`
  const d = integ.detail

  const useCasesHtml = d.useCases
    .map((uc) => `<h3>${escapeHtml(uc.title)}</h3><p>${escapeHtml(uc.description)}</p>`)
    .join('')
  const howItWorksHtml = d.howItWorks
    .map((s, k) => `<h3>${k + 1}. ${escapeHtml(s.step)}</h3><p>${escapeHtml(s.description)}</p>`)
    .join('')
  const faqHtmlInt = d.faq
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')
  const relatedHtmlInt = d.relatedLinks?.length
    ? `<h2>À lire aussi</h2><ul>${d.relatedLinks.map((r) => `<li><a href="${ORIGIN}${r.to}/">${escapeHtml(r.label)}</a></li>`).join('')}</ul>`
    : ''

  const bodyHtml = `
    <h1>${escapeHtml(integ.name)} × Proprely</h1>
    <p>${escapeHtml(d.heroPitch)}</p>
    <aside><p><strong>Réponse-flash :</strong> ${escapeHtml(d.tldr)}</p></aside>
    <h2>Ce que ${escapeHtml(integ.name)} × Proprely vous permet de faire</h2>
    ${useCasesHtml}
    <h2>Comment ça marche</h2>
    ${howItWorksHtml}
    <h2>Questions fréquentes sur ${escapeHtml(integ.name)} × Proprely</h2>
    ${faqHtmlInt}
    ${relatedHtmlInt}
  `.trim()

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: d.metaTitle,
      description: d.metaDescription,
      url: detailUrl,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-08',
      dateModified: TODAY,
      isPartOf: { '@type': 'WebSite', '@id': `${ORIGIN}/#website` },
      abstract: d.tldr,
      mentions: integ.website
        ? [{ '@type': 'Organization', name: integ.name, url: integ.website }]
        : [{ '@type': 'Organization', name: integ.name }],
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'aside > p:first-of-type'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Intégrations', item: `${ORIGIN}/integrations/` },
        { '@type': 'ListItem', position: 3, name: `${integ.name} × Proprely`, item: detailUrl },
      ],
    },
    faqSchema(d.faq),
  ]

  const html = buildHtml({
    url,
    title: d.metaTitle,
    description: d.metaDescription,
    ogTitle: d.metaTitle,
    ogDescription: d.metaDescription,
    ogImage: `/og/integrations-${integ.slug}.png`,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

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
  if (c.tldr) lf.push(`Réponse-flash : ${c.tldr}`)
  lf.push(c.subtitle)
  lf.push(c.marketIntro)
  if (c.faq?.length) for (const q of c.faq) lf.push(`- ${q.q} — ${q.a}`)
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

// === llms.txt : index synthétique régénéré à chaque build ====================
// Auto-sync avec les sources (posts, features, cities, comparisons, alternatives,
// guides). Évite la dérive du fichier statique public/llms.txt.
const lx: string[] = []
lx.push('# Proprely')
lx.push('')
lx.push('> Le cockpit métier des sociétés de nettoyage B2B en France. Vos clients, sites, agents, plannings, devis et preuve de passage dans un seul outil — pensé avec des dirigeants du nettoyage, pour des dirigeants du nettoyage.')
lx.push('')
lx.push("Proprely est un logiciel SaaS B2B français conçu pour les sociétés de nettoyage de 3 à 50 agents. Il centralise dans une seule interface : la gestion des clients et sites, le suivi des agents et leurs spécialités (vitrerie, moquette, décapage, remise en état), le planning et l'affectation 1-clic, la preuve de passage par QR code et photos avant-après, les devis et factures avec signature électronique, les documents (contrats, fiches sécurité, attestations URSSAF, certifications) et le pilotage de la rentabilité avec marge par client en temps réel.")
lx.push('')
lx.push("Le produit est actuellement en **bêta privée**, réservée à 30 sociétés fondatrices sélectionnées. L'accès est **gratuit** pendant toute la durée de la bêta, sans carte bancaire, sans engagement. Les membres fondateurs gardent un **tarif privilégié à vie** après le lancement public. Hébergement européen, conformité RGPD, chiffrement en transit et au repos, export des données en 1 clic.")
lx.push('')
lx.push("Cible : dirigeants de sociétés de nettoyage B2B en France (3 à 50 agents, plusieurs sites clients : bureaux, syndics, hôtels, cabinets médicaux, copropriétés). Le produit n'est pas conçu pour le nettoyage particulier domestique (B2C), ni pour les grands groupes industriels (>200 agents).")
lx.push('')
lx.push('Éditeur : Pershing Global Solutions LTD. Contact : contact@proprely.fr.')
lx.push('')

lx.push('## Pages principales')
lx.push('')
lx.push('- [Accueil](https://proprely.fr/) : présentation du cockpit, problème adressé, solution, programme fondateurs')
lx.push('- [Logiciel société de nettoyage — guide complet 2026](https://proprely.fr/logiciel-societe-nettoyage/) : guide pilier, critères de choix, ROI')
lx.push('- [Comparatif logiciels nettoyage 2026](https://proprely.fr/comparatif-logiciel-nettoyage/) : 6 outils notés sur 13 critères')
lx.push('- [Fonctionnalités](https://proprely.fr/fonctionnalites/) : les modules produit en détail')
lx.push('- [Solutions](https://proprely.fr/solution/) : par contexte et par douleur métier')
lx.push('- [Intégrations](https://proprely.fr/integrations/) : Silae, Pennylane, Qonto, Brevo, Chorus Pro Factur-X')
lx.push('- [Tarifs](https://proprely.fr/tarifs/) : gratuit pendant la bêta, tarif fondateur à vie')
lx.push('- [Sécurité & RGPD](https://proprely.fr/securite-rgpd/) : hébergement européen, DPA, droits RGPD')
lx.push('- [Cas clients](https://proprely.fr/cas-clients/) : retours des fondateurs')
lx.push('- [Roadmap](https://proprely.fr/roadmap/) : ce qui est livré, en cours, à venir')
lx.push('- [Auteurs](https://proprely.fr/auteurs/) : qui écrit sur le blog')
lx.push('- [Audit gratuit 30 min](https://proprely.fr/audit-gratuit/) : diagnostic avec le fondateur')
lx.push('- [Bêta privée — devenir membre fondateur](https://proprely.fr/beta/) : candidature aux 30 places')
lx.push('- [À propos](https://proprely.fr/a-propos/) : mission, engagements, éditeur')
lx.push('- [Contact](https://proprely.fr/contact/)')
lx.push('- [Contenu intégral pour LLM](https://proprely.fr/llms-full.txt) : texte complet des articles')
lx.push('')

lx.push(`## Fonctionnalités (${features.length} modules)`)
lx.push('')
for (const rawF of features) {
  const f = getFeature(rawF.slug) ?? rawF
  lx.push(`- [${f.title}](${ORIGIN}/fonctionnalites/${f.slug}/) : ${f.subtitle}`)
}
lx.push('')

lx.push(`## Villes desservies (${cities.length} pages locales)`)
lx.push('')
for (const rawC of cities) {
  const c = getCity(rawC.slug) ?? rawC
  if (c.tldr) {
    lx.push(`- [${c.title}](${ORIGIN}/villes/${c.slug}/) : ${c.tldr}`)
  } else {
    lx.push(`- [${c.title}](${ORIGIN}/villes/${c.slug}/) : ${c.subtitle}`)
  }
}
lx.push('')

lx.push(`## Comparatifs concurrents (${comparisons.length} face-à-face)`)
lx.push('')
for (const cmp of comparisons) {
  lx.push(`- [${cmp.title}](${ORIGIN}/comparatif/${cmp.slug}/) : ${cmp.tldr.slice(0, 200)}${cmp.tldr.length > 200 ? '…' : ''}`)
}
lx.push('')

lx.push(`## Articles de blog (${posts.length} articles)`)
lx.push('')
for (const rawP of posts) {
  const p = getPost(rawP.slug) ?? rawP
  lx.push(`- [${p.title}](${ORIGIN}/blog/${p.slug}/) — ${p.tag} · ${p.readTime}`)
}
lx.push('')

lx.push('## Outils gratuits')
lx.push('')
lx.push('- [Calculateur prix nettoyage au m²](https://proprely.fr/calculateur-prix-nettoyage-m2/) : estimation interactive selon surface, type local, zone, fréquence')
lx.push('- [Calculateur ROI](https://proprely.fr/calculateur-roi/) : heures et euros perdus en gestion dispersée')
lx.push('- [Simulateur de rentabilité par contrat](https://proprely.fr/simulateur-rentabilite/) : marge brute en 1 minute')
lx.push('- [Tous les outils](https://proprely.fr/outils/)')
lx.push('')

lx.push('## Ressources & modèles')
lx.push('')
lx.push('- [Toutes les ressources](https://proprely.fr/ressources/) : modèles Excel téléchargeables (devis, planning, suivi heures)')
lx.push('')

// Section "Définitions clés" : extraits courts du glossaire propreté B2B
// pour permettre une citation one-shot par les LLM (ChatGPT, Perplexity).
// Sélection des termes les plus citables (réglementaires, conformité, financier).
lx.push(`## Définitions clés (${glossary.length} termes au glossaire)`)
lx.push('')
lx.push('Source canonique : https://proprely.fr/glossaire/')
lx.push('')
const KEY_GLOSSARY_CATEGORIES: ReadonlyArray<string> = [
  'Convention IDCC 3043',
  'Réglementaire',
  'Conformité 2026',
  'Financier',
]
for (const term of glossary) {
  if (!KEY_GLOSSARY_CATEGORIES.includes(term.category)) continue
  lx.push(`- **${term.term}** : ${term.short}`)
}
lx.push('')
lx.push('[Voir le glossaire complet](https://proprely.fr/glossaire/) — 41 termes propreté B2B avec sources officielles et définitions étendues.')
lx.push('')

const llmsContent = lx.join('\n') + '\n'
writeFileSync(resolve(distDir, 'llms.txt'), llmsContent)
console.log(`✓ llms.txt régénéré (${llmsContent.length} caractères, ${features.length} fonctionnalités + ${cities.length} villes + ${comparisons.length} comparatifs + ${posts.length} articles + ${glossary.length} termes glossaire)`)

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
