import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { posts } from '../src/data/blog.ts'
import { features } from '../src/data/features.ts'
import { resources } from '../src/data/resources.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = resolve(root, 'dist')
const ORIGIN = 'https://proprely.fr'

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
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeAttr(canonical)}" />`
  )
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
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.excerpt,
    url,
    datePublished: p.date,
    author: { '@type': 'Organization', name: 'Proprely' },
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

function breadcrumbSchema(crumbs: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
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

  const schemas: object[] = [
    blogPostingSchema(p),
    breadcrumbSchema([
      { name: 'Accueil', item: `${ORIGIN}/` },
      { name: 'Blog', item: `${ORIGIN}/blog` },
      { name: p.title, item: `${ORIGIN}${url}` },
    ]),
  ]
  if (p.faq?.length) schemas.push(faqSchema(p.faq))

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

const thankYouHtml = buildHtml({
  url: '/beta/merci',
  title: 'Candidature enregistrée · Proprely',
  description: 'Votre candidature à la bêta privée Proprely est bien reçue. Nous revenons vers vous sous 24h ouvrées.',
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
  description:
    "Rejoignez les 30 sociétés de nettoyage fondatrices de Proprely. Accès gratuit pendant la bêta, tarif fondateur conservé à vie, onboarding 30 min avec le fondateur.",
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
  description:
    "Modèles de devis, planning et suivi des heures pour société de nettoyage : téléchargez gratuitement nos templates Excel et notre calculateur ROI. Conçu pour les dirigeants B2B.",
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
  if (r.slug === 'calculateur-roi') continue
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

console.log(`✓ Prerender : ${generated.length} pages statiques générées`)
generated.forEach((u) => console.log(`  ${u}`))
