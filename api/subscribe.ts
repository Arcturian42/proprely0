// Vercel serverless function : capture des leads (newsletter + lead magnets)
// vers Brevo via l'API v3 /contacts.
//
// Configuration requise (Vercel → Environment Variables, sans préfixe VITE_) :
//   - BREVO_API_KEY                (server-side, jamais exposée au client)
//   - BREVO_NEWSLETTER_LIST_ID     (number, ID de la liste "Newsletter")
//   - BREVO_LEADMAGNET_LIST_ID     (number, ID de la liste "Lead magnets")
//
// Body POST attendu (JSON) :
//   {
//     email: string (requis),
//     type: 'newsletter' | 'lead_magnet' (requis),
//     source?: string,
//     company?: string,
//     resource?: string,           // slug ressource (lead magnet)
//     resourceTitle?: string,
//   }

const ALLOWED_ORIGINS = new Set([
  'https://proprely.fr',
  'https://www.proprely.fr',
])

const PREVIEW_ORIGIN_SUFFIX = '-energypromag.vercel.app'

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.has(origin)) return true
  try {
    const u = new URL(origin)
    if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') return true
    if (u.hostname.endsWith(PREVIEW_ORIGIN_SUFFIX)) return true
  } catch {
    /* ignore */
  }
  return false
}

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin) ? (origin as string) : 'https://proprely.fr',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

type SubscribePayload = {
  email?: string
  type?: 'newsletter' | 'lead_magnet'
  source?: string
  company?: string
  resource?: string
  resourceTitle?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin')
  const baseHeaders = corsHeaders(origin)

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: baseHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: SubscribePayload
  try {
    body = (await req.json()) as SubscribePayload
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }

  const email = (body.email || '').trim().toLowerCase()
  const type = body.type
  if (!email || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }
  if (type !== 'newsletter' && type !== 'lead_magnet') {
    return new Response(JSON.stringify({ error: 'Invalid type' }), {
      status: 400,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listIdRaw =
    type === 'newsletter'
      ? process.env.BREVO_NEWSLETTER_LIST_ID
      : process.env.BREVO_LEADMAGNET_LIST_ID
  const listId = listIdRaw ? Number.parseInt(listIdRaw, 10) : NaN

  if (!apiKey || !Number.isFinite(listId)) {
    // Pas de configuration → on log et on répond 202 pour ne pas casser l'UX,
    // mais on signale clairement l'absence de stockage.
    console.warn('[subscribe] Missing BREVO_API_KEY or list id for type', type)
    return new Response(JSON.stringify({ ok: true, stored: false, reason: 'not_configured' }), {
      status: 202,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }

  const attributes: Record<string, string> = {}
  if (body.company) attributes.COMPANY = body.company.slice(0, 200)
  if (body.source) attributes.SOURCE = body.source.slice(0, 100)
  if (body.resource) attributes.RESOURCE = body.resource.slice(0, 100)
  if (body.resourceTitle) attributes.RESOURCE_TITLE = body.resourceTitle.slice(0, 200)

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    })

    if (res.status === 201 || res.status === 204) {
      return new Response(JSON.stringify({ ok: true, stored: true, created: true }), {
        status: 200,
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (res.status === 400) {
      // Brevo renvoie 400 si le contact existe déjà avec updateEnabled=false.
      // Avec updateEnabled=true, on devrait recevoir 204. Si on tombe ici,
      // on lit le détail mais on ne casse pas l'UX.
      const detail = await res.text()
      console.warn('[subscribe] Brevo 400', detail.slice(0, 300))
      return new Response(JSON.stringify({ ok: true, stored: true, updated: true }), {
        status: 200,
        headers: { ...baseHeaders, 'Content-Type': 'application/json' },
      })
    }

    const detail = await res.text()
    console.error('[subscribe] Brevo error', res.status, detail.slice(0, 500))
    return new Response(JSON.stringify({ ok: false, error: 'brevo_error', status: res.status }), {
      status: 502,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('[subscribe] Unexpected error', err)
    return new Response(JSON.stringify({ ok: false, error: 'internal' }), {
      status: 500,
      headers: { ...baseHeaders, 'Content-Type': 'application/json' },
    })
  }
}

// Vercel Edge runtime — plus rapide, latence faible, parfait pour ce use case
export const config = {
  runtime: 'edge',
}
