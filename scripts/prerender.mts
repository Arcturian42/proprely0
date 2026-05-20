import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { posts } from '../src/data/blog.ts'
import { features } from '../src/data/features.ts'
import { cities } from '../src/data/cities.ts'
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
  description: "Rejoignez les 30 sociétés de nettoyage fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur conservé à vie, onboarding 30 min avec le fondateur.",
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
  description: "Modèles de devis, planning et suivi des heures pour société de nettoyage : téléchargez gratuitement nos templates Excel et notre calculateur ROI. Conçu pour les dirigeants B2B.",
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

const simulateurBody = `
  <h1>Simulateur de rentabilité par contrat de nettoyage</h1>
  <p>Renseignez les paramètres d'un contrat de nettoyage et obtenez en une minute la marge brute, la marge nette, le résultat horaire et un verdict immédiat avec des actions concrètes.</p>
  <h2>Ce que le simulateur calcule</h2>
  <ul>
    <li>Marge brute en euros et en pourcentage</li>
    <li>Marge nette après quote-part frais de structure</li>
    <li>Résultat horaire — le KPI le plus utile pour comparer deux contrats</li>
    <li>Net annuel projeté sur 12 mois</li>
    <li>Verdict automatique : très rentable, rentable, limite, non rentable</li>
    <li>Recommandations actionnables selon le verdict</li>
  </ul>
  <h2>Méthode de calcul</h2>
  <p>Marge brute = CA mensuel − (heures × coût horaire chargé + consommables + déplacements). Marge nette = marge brute − frais de structure (en pourcentage du CA). Résultat horaire = marge nette ÷ heures sur le site.</p>
  <h2>Ce qui n'est pas pris en compte</h2>
  <p>Le simulateur ne prend pas en compte les prestations ponctuelles facturées hors contrat, l'écart entre heures contractuelles et heures réellement effectuées, ni les coûts liés aux remplacements et absences. Le module rentabilité de Proprely intègre ces éléments avec vos données réelles.</p>
`.trim()

const simulateurHtml = buildHtml({
  url: '/simulateur-rentabilite',
  title: 'Simulateur de rentabilité par contrat de nettoyage · Proprely',
  description: "Calculez en 1 minute la marge brute, la marge nette et le résultat horaire d'un contrat de nettoyage. Verdict immédiat et recommandations selon votre situation.",
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
  ],
  bodyHtml: simulateurBody,
})
writePage('/simulateur-rentabilite', simulateurHtml)
generated.push('/simulateur-rentabilite')

const softwareLandingBody = `
  <h1>Logiciel pour société de nettoyage : le guide complet 2026</h1>
  <p>Tout ce qu'il faut savoir pour choisir un logiciel de gestion pensé pour la propreté B2B : fonctionnalités essentielles, comparatif Excel / PROPRET / Progiclean / Proprely, ROI estimé, FAQ détaillée.</p>
  <h2>Pourquoi un logiciel pour société de nettoyage</h2>
  <p>La gestion d'une société de nettoyage B2B impose un rythme et un nombre d'interactions qu'aucun outil généraliste ne sait gérer. À partir de 3 agents et 5 sites, la dispersion entre Excel, WhatsApp, Google Agenda et Word coûte 6 à 10 heures par semaine d'administration pure.</p>
  <h2>Les 4 modules essentiels</h2>
  <ul>
    <li><a href="${ORIGIN}/fonctionnalites/planning-nettoyage">Planning agents</a> : affectation 1-clic, mobile-first sans app à installer</li>
    <li><a href="${ORIGIN}/fonctionnalites/devis-nettoyage">Devis professionnels</a> : 2 minutes par devis, signature électronique native</li>
    <li><a href="${ORIGIN}/fonctionnalites/gestion-agents-nettoyage">Gestion des agents</a> : profils, spécialités, charge horaire, paie</li>
    <li><a href="${ORIGIN}/fonctionnalites/preuve-passage-nettoyage">Preuve de passage</a> : QR, photos avant-après, signature client, PV automatique</li>
  </ul>
  <h2>Comparatif Excel / PROPRET / Progiclean / Proprely</h2>
  <p>Voir notre <a href="${ORIGIN}/comparatif-logiciel-nettoyage">comparatif détaillé</a> sur 12 critères : conçu propreté, drag-and-drop planning, mobile sans app, preuve de passage native, marge en temps réel, onboarding, export libre, tarif transparent.</p>
  <h2>ROI estimé</h2>
  <p>Pour 10 agents à 8 heures perdues par semaine en admin dispersée (à 45 €/h dirigeant chargé) : 16 800 € de coût caché par an. Auquel s'ajoutent erreurs de pointage, contrats sous-tarifés, litiges. Calculer le ROI personnalisé : <a href="${ORIGIN}/calculateur-roi">Calculateur ROI</a>. Simuler la marge par contrat : <a href="${ORIGIN}/simulateur-rentabilite">Simulateur rentabilité</a>.</p>
  <h2>Bêta privée Proprely</h2>
  <p>30 sociétés fondatrices, accès gratuit, tarif privilégié à vie. Onboarding 30 min avec le fondateur. <a href="${ORIGIN}/beta">Candidater à la bêta</a>.</p>
`.trim()

const softwareLandingFaqs = [
  { q: "Quel est le meilleur logiciel pour une société de nettoyage en 2026 ?", a: "Tout dépend de votre taille. Pour 3-50 agents en croissance ou en structuration, les SaaS verticaux modernes (dont Proprely) offrent le meilleur rapport productivité/prix avec mobile-first natif et preuve de passage. Au-delà de 50 agents, des logiciels métier historiques (PROPRET, Progiclean) ou ERP couvrent davantage la couche comptable." },
  { q: "Combien coûte un logiciel pour société de nettoyage ?", a: "De 15 à 60 €/utilisateur/mois pour la plupart des SaaS verticaux, à 100+ €/utilisateur pour les ERP. Proprely est gratuit pendant la bêta privée (30 places fondateurs), tarif fondateur conservé à vie après." },
  { q: "Mes agents doivent-ils installer une application ?", a: "Pas avec Proprely. Chaque agent reçoit un lien web qu'il ouvre sur son téléphone, le planning et les missions s'affichent dans son navigateur. Pas d'installation, pas de formation, fonctionne en 4G dégradée." },
  { q: "Peut-on remplacer Excel et WhatsApp complètement ?", a: "Oui pour la gestion quotidienne : clients/sites, agents, planning, missions, devis, factures, documents. WhatsApp peut rester pour les échanges informels, mais l'opérationnel passe par Proprely et tout est tracé." },
  { q: "Quelle taille d'entreprise est concernée ?", a: "Proprely est conçu pour les sociétés de 3 à 50 agents. Dès que vous gérez plusieurs sites et plusieurs agents, vous avez besoin de centraliser." },
  { q: "Combien de temps pour la mise en route ?", a: "30 minutes lors d'un appel avec le fondateur. Vos sites, agents et fréquences sont importés (Excel, CSV, photos)." },
  { q: "Mes données sont-elles sécurisées ?", a: "Hébergement européen, chiffrement en transit et au repos, conformité RGPD. Vous restez propriétaire à 100% et pouvez exporter en 1 clic." },
  { q: "Quelle est la différence entre Proprely et PROPRET ou Progiclean ?", a: "PROPRET et Progiclean sont les acteurs historiques avec une couverture fonctionnelle large mais une UX datée et un mobile via app native. Proprely est un SaaS nouvelle génération mobile-first par lien web." },
]

const softwareLandingHtml = buildHtml({
  url: '/logiciel-societe-nettoyage',
  title: 'Logiciel pour société de nettoyage : le guide complet 2026 · Proprely',
  description: "Logiciel de gestion pensé pour les sociétés de nettoyage B2B : planning, devis, agents, preuve de passage, marge par client. Comparatif Excel/PROPRET/Progiclean. Bêta gratuite.",
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
      featureList: ['Planning agents', 'Devis professionnels', 'Gestion des agents', 'Preuve de passage'],
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
  <h1>Comparatif logiciel nettoyage 2026 : Proprely, PROPRET, Progiclean, Organilog, Excel</h1>
  <p>Comparatif factuel des principaux outils du marché. 12 critères qui comptent au quotidien, 4 profils types avec recommandation explicite, 8 questions fréquentes.</p>
  <h2>Les outils comparés</h2>
  <ul>
    <li><strong>Proprely</strong> — SaaS vertical 2026, mobile-first, gratuit en bêta privée (3-50 agents)</li>
    <li><strong>PROPRET</strong> — Logiciel métier historique (10+ ans), couverture large, app native (10-200 agents)</li>
    <li><strong>Progiclean</strong> — Logiciel métier historique, UX dense (10-100 agents)</li>
    <li><strong>Organilog</strong> — Field service générique (5-100 agents), pas spécifique propreté</li>
    <li><strong>Excel</strong> — Tableur généraliste, OK pour 1-8 agents en démarrage</li>
  </ul>
  <h2>Critères du comparatif</h2>
  <p>Conçu propreté B2B, planning drag-and-drop, mobile sans app, preuve de passage native, devis et signature électronique, marge en temps réel, spécialités agents, connexion Pennylane/Qonto, hébergement européen RGPD, export libre, onboarding accompagné, tarif transparent.</p>
  <h2>Recommandations par profil</h2>
  <ul>
    <li>1-5 agents : Excel + modèles Proprely gratuits suffisent — <a href="${ORIGIN}/ressources">Voir les modèles</a></li>
    <li>3-15 agents en structuration : Proprely (SaaS moderne) — <a href="${ORIGIN}/beta">Candidater à la bêta</a></li>
    <li>15-50 agents : Proprely (agilité, marge) ou PROPRET/Progiclean (comptabilité)</li>
    <li>50+ agents : ERP métier ou PROPRET/Progiclean entreprise</li>
  </ul>
  <h2>Voir aussi</h2>
  <p>Notre article blog complémentaire : <a href="${ORIGIN}/blog/comparatif-logiciels-nettoyage-2026">Comparatif logiciels nettoyage 2026 : grille de lecture honnête</a>. Et notre comparatif spécifique Excel : <a href="${ORIGIN}/proprely-vs-excel">Proprely vs Excel</a>.</p>
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

const comparatifHtml = buildHtml({
  url: '/comparatif-logiciel-nettoyage',
  title: 'Comparatif logiciel nettoyage 2026 : Proprely, PROPRET, Progiclean, Organilog · Proprely',
  description: "Comparatif honnête des principaux logiciels société de nettoyage en 2026 : Proprely, PROPRET, Progiclean, Organilog, Excel. Critères, fonctionnalités, tarifs, qui choisir.",
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

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
