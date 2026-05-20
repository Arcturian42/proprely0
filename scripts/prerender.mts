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
      { name: 'Fonctionnalités', item: `${ORIGIN}/fonctionnalites` },
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
  description: "Toutes les fonctionnalités Proprely pour piloter une société de nettoyage : planning agents, devis, gestion agents, preuve de passage. Conçu pour la propreté B2B.",
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

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
