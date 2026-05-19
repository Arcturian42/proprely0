import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { posts } from '../src/data/blog.ts'
import { features } from '../src/data/features.ts'
import { cities } from '../src/data/cities.ts'

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
  const canonical = `${ORIGIN}${meta.url}`
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

function blogPostingSchema(p: typeof posts[number]) {
  const url = `${ORIGIN}/blog/${p.slug}`
  const datePublished = parseFrenchDate(p.date) || p.date
  const dateModified = p.dateModified ? (parseFrenchDate(p.dateModified) || p.dateModified) : datePublished
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url,
    datePublished,
    dateModified,
    image: `${ORIGIN}/og-image.png`,
    author: { '@type': 'Organization', name: 'Proprely', url: ORIGIN },
    publisher: {
      '@type': 'Organization',
      name: 'Proprely',
      logo: { '@type': 'ImageObject', url: `${ORIGIN}/proprely-icon-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'fr-FR',
    articleSection: p.tag,
  }
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

for (const p of posts) {
  const url = `/blog/${p.slug}`
  const summaryHtml = p.quickSummary.map((s) => `<li>${escapeHtml(s)}</li>`).join('')
  const faqHtml = (p.faq || [])
    .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
    .join('')
  const bodyHtml = `
    <h1>${escapeHtml(p.title)}</h1>
    <p>${escapeHtml(p.excerpt)}</p>
    <p>Publié le ${escapeHtml(p.date)} · ${escapeHtml(p.readTime)} · ${escapeHtml(p.tag)}</p>
    <h2>L'essentiel</h2>
    <ul>${summaryHtml}</ul>
    ${md2html(p.content)}
    ${faqHtml ? `<h2>Questions fréquentes</h2>${faqHtml}` : ''}
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

for (const f of features) {
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
    <h2>Questions fréquentes</h2>
    ${faqHtml}
  `.trim()

  const schemas: object[] = [
    webpageSchema(f.title, f.metaDescription, `${ORIGIN}${url}`, [
      { name: 'Accueil', item: `${ORIGIN}/` },
      { name: 'Fonctionnalités', item: `${ORIGIN}/` },
      { name: f.tag, item: `${ORIGIN}${url}` },
    ]),
  ]
  if (f.faq.length) schemas.push(faqSchema(f.faq))

  const html = buildHtml({
    url,
    title: `${f.tag} · Proprely`,
    description: f.metaDescription,
    ogTitle: f.title,
    ogDescription: f.metaDescription,
    schemas,
    bodyHtml,
  })
  writePage(url, html)
  generated.push(url)
}

for (const c of cities) {
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

  const bodyHtml = `
    <h1>${escapeHtml(c.title)}</h1>
    <p>${escapeHtml(c.subtitle)}</p>
    <h2>Le marché de la propreté B2B à ${escapeHtml(c.city)}</h2>
    <p>${escapeHtml(c.marketIntro)}</p>
    <ul>${marketBulletsHtml}</ul>
    <h2>Vos clients types à ${escapeHtml(c.city)}</h2>
    <ul>${clientTypesHtml}</ul>
    <h2>Les défis spécifiques à ${escapeHtml(c.city)}</h2>
    ${challengesHtml}
    <h2>Comment Proprely répond aux contraintes de ${escapeHtml(c.city)}</h2>
    ${fitHtml}
    <h2>Questions fréquentes sur ${escapeHtml(c.city)}</h2>
    ${faqHtml}
  `.trim()

  const cityUrl = `${ORIGIN}${url}`
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
      about: {
        '@type': 'Service',
        name: `Logiciel de gestion pour sociétés de nettoyage à ${c.city}`,
        provider: { '@id': `${ORIGIN}/#organization` },
        areaServed: {
          '@type': 'City',
          name: c.city,
          containedInPlace: { '@type': 'AdministrativeArea', name: c.region },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Villes', item: `${ORIGIN}/` },
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
  ],
  bodyHtml: blogIndexBody,
})
writePage('/blog', blogIndexHtml)
generated.push('/blog')

const roiBody = `
  <h1>Calculateur ROI : combien vous coûte la dispersion ?</h1>
  <p>Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word pour gérer votre société de nettoyage.</p>
  <h2>Ce que vous découvrirez en 30 secondes</h2>
  <ul>
    <li>Le temps réel perdu chaque semaine en administration dispersée</li>
    <li>Le coût annuel équivalent (heures × taux horaire dirigeant)</li>
    <li>Le ROI estimé si vous centralisiez sur un seul outil</li>
  </ul>
`.trim()

const roiHtml = buildHtml({
  url: '/calculateur-roi',
  title: 'Calculateur ROI : combien vous coûte la dispersion ? · Proprely',
  description:
    "Estimez en 30 secondes combien d'heures et d'euros vous perdez chaque année à jongler entre Excel, WhatsApp et Word pour gérer votre société de nettoyage.",
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
  ],
  bodyHtml: roiBody,
})
writePage('/calculateur-roi', roiHtml)
generated.push('/calculateur-roi')

const pricingBody = `
  <h1>Tarifs Proprely : gratuit pendant la bêta, tarif fondateur à vie</h1>
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
  title: 'Tarifs : Gratuit pendant la bêta, tarif fondateur à vie · Proprely',
  description: 'Proprely est gratuit pendant la bêta privée. 30 sociétés fondatrices gardent un tarif privilégié à vie après le lancement. Sans CB, sans engagement, sans lock-in.',
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

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
