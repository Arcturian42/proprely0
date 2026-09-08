/**
 * Diagnostic « site piraté ou pas » pour proprely.fr.
 *
 * Répond à trois questions que Google Search Console ne tranche pas seule :
 *
 *   1. Le serveur fait-il du CLOAKING ? (réponse différente pour un visiteur,
 *      pour Googlebot, pour un mobile, ou pour un clic venant de Google).
 *      C'est LA signature d'un piratage par redirection : le propriétaire voit
 *      son site normal, le visiteur venu de Google atterrit ailleurs.
 *
 *   2. Une URL inexistante renvoie-t-elle bien 404, ou un 500 ? Un 500 sur les
 *      URLs inconnues explique à lui seul des milliers de « Server error (5xx) »
 *      dans GSC, parce que Google réessaie indéfiniment au lieu d'oublier l'URL.
 *
 *   3. Les URLs réelles du sitemap répondent-elles toutes 200 ?
 *
 * Aucune dépendance : Node 18+ suffit (fetch natif).
 *
 * Usage :
 *   node scripts/diagnose-live.mjs                 # profil complet
 *   node scripts/diagnose-live.mjs --sitemap 40    # teste 40 URLs du sitemap
 */
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const ORIGIN = 'https://proprely.fr'

const UA_HUMAIN =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
const UA_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
const UA_GOOGLEBOT =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

/** Les 4 profils. Un site sain répond la même chose aux quatre. */
const PROFILS = [
  { nom: 'Visiteur desktop', headers: { 'User-Agent': UA_HUMAIN } },
  { nom: 'Visiteur mobile', headers: { 'User-Agent': UA_MOBILE } },
  { nom: 'Googlebot', headers: { 'User-Agent': UA_GOOGLEBOT } },
  {
    nom: 'Clic depuis Google',
    headers: { 'User-Agent': UA_HUMAIN, Referer: 'https://www.google.com/' },
  },
]

/** Suit la chaîne de redirections à la main pour pouvoir l'afficher. */
async function suivre(url, headers, maxSauts = 10) {
  const chaine = []
  let courante = url

  for (let i = 0; i < maxSauts; i++) {
    let reponse
    try {
      reponse = await fetch(courante, { headers, redirect: 'manual' })
    } catch (err) {
      return { chaine, erreur: err.message, finale: courante }
    }

    const emplacement = reponse.headers.get('location')
    chaine.push({ url: courante, statut: reponse.status, vers: emplacement })

    if (reponse.status >= 300 && reponse.status < 400 && emplacement) {
      courante = new URL(emplacement, courante).toString()
      continue
    }

    const corps = await reponse.text()
    return {
      chaine,
      finale: courante,
      statut: reponse.status,
      serveur: reponse.headers.get('server'),
      titre: (corps.match(/<title[^>]*>([^<]*)<\/title>/i) || [, ''])[1].trim(),
      taille: corps.length,
      // Empreinte du corps : deux profils qui diffèrent = cloaking.
      empreinte: createHash('sha256').update(corps).digest('hex').slice(0, 12),
    }
  }

  return { chaine, finale: courante, erreur: `plus de ${maxSauts} redirections` }
}

function afficherChaine(chaine) {
  for (const saut of chaine) {
    const fleche = saut.vers ? ` → ${saut.vers}` : ''
    console.log(`      ${saut.statut} ${saut.url}${fleche}`)
  }
}

/** 1. Cloaking : la home vue par 4 profils différents. */
async function testCloaking() {
  console.log('\n━━━ 1. CLOAKING / REDIRECTION MASQUÉE ━━━\n')
  const resultats = []

  for (const profil of PROFILS) {
    const r = await suivre(`${ORIGIN}/`, profil.headers)
    resultats.push({ profil: profil.nom, ...r })

    console.log(`  ${profil.nom}`)
    if (r.erreur) {
      console.log(`      ✗ ${r.erreur}`)
      continue
    }
    afficherChaine(r.chaine)
    console.log(`      titre    : ${r.titre || '(aucun)'}`)
    console.log(`      empreinte: ${r.empreinte}  (${r.taille} octets)`)
    console.log('')
  }

  const valides = resultats.filter((r) => !r.erreur)
  const hotes = new Set(valides.map((r) => new URL(r.finale).host))
  const empreintes = new Set(valides.map((r) => r.empreinte))

  // Si même le visiteur desktop n'obtient pas 200, ce n'est pas le site qui
  // répond mais un intermédiaire (proxy d'entreprise, VPN, pare-feu, captive
  // portal). Tout le reste du diagnostic devient ininterprétable : on le dit
  // au lieu d'annoncer un « aucun cloaking détecté » trompeur.
  if (!valides.some((r) => r.statut === 200)) {
    console.log(`  ✗ Aucun profil n'obtient de 200 (statuts : ${[...new Set(valides.map((r) => r.statut))].join(', ')}).`)
    console.log(`    Le site n'est pas joignable depuis ce réseau, ou un proxy/VPN`)
    console.log(`    intercepte les requêtes. Relancer depuis une connexion directe`)
    console.log(`    avant de conclure quoi que ce soit.`)
    return null
  }

  if (hotes.size > 1) {
    console.log(`  ✗ ALERTE : le site n'atterrit pas sur le même domaine selon le profil`)
    console.log(`    domaines vus : ${[...hotes].join(', ')}`)
    console.log(`    → signature classique d'une redirection malveillante.`)
    return false
  }
  if (empreintes.size > 1) {
    console.log(`  ⚠ Le contenu diffère selon le profil (${empreintes.size} versions).`)
    console.log(`    Peut être légitime (rendu mobile), à vérifier si les titres diffèrent.`)
    return true
  }
  console.log(`  ✓ Réponse identique pour les 4 profils, sur ${[...hotes][0]}.`)
  console.log(`    Aucun cloaking détecté.`)
  return true
}

/** 2. Le comportement sur URL inconnue : 404 attendu, 5xx = la cause des 6 589. */
async function test404() {
  console.log('\n━━━ 2. RÉPONSE SUR URL INEXISTANTE (cause probable des 5xx) ━━━\n')

  const bidons = [
    `${ORIGIN}/cette-page-n-existe-pas-${Date.now()}/`,
    `${ORIGIN}/blog/page-inventee-${Date.now()}/`,
    `${ORIGIN}/wp-content/uploads/test.php`,
    `${ORIGIN}/404.html`,
  ]

  let bug5xx = false
  for (const url of bidons) {
    const r = await suivre(url, { 'User-Agent': UA_GOOGLEBOT })
    if (r.erreur) {
      console.log(`  ✗ ${url}\n      ${r.erreur}`)
      continue
    }
    const attendu = url.endsWith('/404.html') ? 200 : 404
    const ok = r.statut === attendu
    const marque = ok ? '✓' : r.statut >= 500 ? '✗' : '⚠'
    if (r.statut >= 500) bug5xx = true
    console.log(`  ${marque} ${r.statut} (attendu ${attendu})  ${url}`)
    if (r.chaine.length > 1) afficherChaine(r.chaine)
  }

  if (bug5xx) {
    console.log('')
    console.log('  ✗ Une URL inconnue renvoie 5xx au lieu de 404.')
    console.log('    C\'est la cause directe des « Server error (5xx) » dans GSC :')
    console.log('    Google conserve et réessaie les URLs en 5xx, alors qu\'il oublie')
    console.log('    définitivement les 404. Le compteur grossit donc sans limite.')
    console.log('    Piste n°1 : /404.html absent du serveur → ErrorDocument boucle → 500.')
  }
  return !bug5xx
}

/** 3. Les vraies pages du site répondent-elles 200 ? */
async function testSitemap(limite) {
  console.log(`\n━━━ 3. URLS RÉELLES DU SITEMAP (échantillon de ${limite}) ━━━\n`)

  const chemin = resolve(root, 'public/sitemap.xml')
  if (!existsSync(chemin)) {
    console.log('  ✗ public/sitemap.xml introuvable')
    return false
  }

  const urls = [...readFileSync(chemin, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .slice(0, limite)

  const casses = []
  for (const url of urls) {
    const r = await suivre(url, { 'User-Agent': UA_GOOGLEBOT })
    const statut = r.erreur ? `ERR ${r.erreur}` : r.statut
    if (r.erreur || r.statut !== 200) {
      casses.push({ url, statut })
      console.log(`  ✗ ${statut}  ${url}`)
      if (r.chaine?.length > 1) afficherChaine(r.chaine)
    }
  }

  if (casses.length === 0) {
    console.log(`  ✓ Les ${urls.length} URLs testées répondent 200.`)
    return true
  }
  console.log(`\n  ✗ ${casses.length}/${urls.length} URLs du sitemap ne répondent pas 200.`)
  return false
}

async function main() {
  const idx = process.argv.indexOf('--sitemap')
  const limite = idx !== -1 ? Number(process.argv[idx + 1]) || 20 : 20

  console.log(`Diagnostic ${ORIGIN} — ${new Date().toISOString()}`)

  const cloakingOk = await testCloaking()
  const erreurOk = await test404()
  const sitemapOk = await testSitemap(limite)

  console.log('\n━━━ SYNTHÈSE ━━━\n')

  if (cloakingOk === null) {
    console.log('  ⚠ Diagnostic non concluant : le site n\'est pas joignable depuis')
    console.log('    ce réseau. Aucune conclusion ne peut être tirée sur un piratage.')
    console.log('    Relancer depuis une connexion directe (sans VPN ni proxy).')
    process.exitCode = 2
    return
  }

  console.log(`  ${cloakingOk ? '✓' : '✗'} Pas de redirection masquée`)
  console.log(`  ${erreurOk ? '✓' : '✗'} URLs inconnues en 404 (et non 5xx)`)
  console.log(`  ${sitemapOk ? '✓' : '✗'} Pages réelles en 200`)
  console.log('')

  if (!cloakingOk) {
    console.log('  → Priorité : piratage probable. Inspecter les fichiers du serveur')
    console.log('    (public_html : .htaccess, *.php récents) et changer tous les accès.')
  } else if (!erreurOk) {
    console.log('  → Priorité : bug de routage serveur, pas un piratage.')
    console.log('    Corriger le 5xx sur URL inconnue vide les 6 589 erreurs de GSC.')
  } else {
    console.log('  → Le serveur répond correctement sur tous les profils testés.')
  }

  process.exitCode = cloakingOk && erreurOk && sitemapOk ? 0 : 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
