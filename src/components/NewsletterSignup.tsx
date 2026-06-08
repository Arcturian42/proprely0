import { useState, type FormEvent } from 'react'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'
import { trackEvent } from '../lib/analytics'
import { trackPixelLead } from '../lib/pixels'

// Endpoint Brevo via la fonction serverless interne /api/subscribe.
// La clé API Brevo est stockée côté serveur (BREVO_API_KEY), jamais exposée
// au bundle client. Override possible via VITE_SUBSCRIBE_ENDPOINT en dev.
const ENDPOINT = (import.meta as unknown as {
  env: { VITE_SUBSCRIBE_ENDPOINT?: string }
}).env.VITE_SUBSCRIBE_ENDPOINT || '/api/subscribe'

type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: 'network' | 'http' | 'not_configured' | 'brevo_error' | 'unknown'; status?: number }

async function sendSubscription(payload: { email: string; source: string }): Promise<SubscribeResult> {
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, type: 'newsletter' }),
    })
  } catch (err) {
    console.error('[newsletter] Network error', err)
    return { ok: false, reason: 'network' }
  }

  type Body = { ok?: boolean; stored?: boolean; reason?: string; error?: string }
  let data: Body | null = null
  try {
    data = (await res.json()) as Body
  } catch {
    /* may not be JSON (e.g. 404 HTML page) */
  }

  if (!res.ok) {
    console.error('[newsletter] Server error', res.status, data ?? '<no body>')
    if (data?.reason === 'not_configured') return { ok: false, reason: 'not_configured' }
    if (data?.error === 'brevo_error') return { ok: false, reason: 'brevo_error', status: res.status }
    return { ok: false, reason: 'http', status: res.status }
  }

  // res.ok mais payload signale stored:false ou ok:false → on remonte une erreur.
  if (data && (data.ok === false || data.stored === false)) {
    console.warn('[newsletter] Server returned ok=false', data)
    return { ok: false, reason: 'not_configured' }
  }

  return { ok: true }
}

type Variant = 'default' | 'compact' | 'inline'

type Props = {
  source: string
  variant?: Variant
  title?: string
  description?: string
  buttonLabel?: string
}

export default function NewsletterSignup({
  source,
  variant = 'default',
  title,
  description,
  buttonLabel = "S'abonner",
}: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const defaultTitle = title ?? "Une analyse propreté B2B chaque semaine"
  const defaultDescription =
    description ??
    "Méthodes, prix, gestion d'équipe, conformité. Pour les dirigeants de sociétés de nettoyage qui veulent piloter au lieu de subir. Désinscription en 1 clic, données conformes RGPD."

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || loading) return
    setErrorMsg(null)
    setLoading(true)

    const cleanEmail = email.trim().toLowerCase()
    trackEvent('newsletter_signup', {
      source,
      email_domain: cleanEmail.split('@')[1] || '',
    })
    trackPixelLead({ content_name: 'newsletter', content_category: source })
    const result = await sendSubscription({ email: cleanEmail, source })

    if (!result.ok) {
      const friendly =
        result.reason === 'not_configured'
          ? "L'inscription n'est pas encore opérationnelle. Écrivez-nous à contact@proprely.fr, on vous ajoute manuellement."
          : result.reason === 'network'
            ? "Connexion impossible. Vérifiez votre connexion et réessayez."
            : "Une erreur est survenue. Réessayez dans un instant ou écrivez à contact@proprely.fr."
      setErrorMsg(friendly)
      setLoading(false)
      return
    }

    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div
        className={
          variant === 'compact'
            ? 'flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3'
            : 'bg-emerald-50 border border-emerald-100 rounded-2xl p-5 sm:p-6 text-center'
        }
      >
        <CheckCircle size={variant === 'compact' ? 18 : 22} className="text-emerald-600 shrink-0" />
        <div className={variant === 'compact' ? 'text-sm' : 'text-base'}>
          <p className="font-bold text-emerald-900">Inscription confirmée</p>
          <p className="text-emerald-700 text-sm mt-0.5">Vous recevrez la prochaine analyse cette semaine.</p>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
            aria-label="Adresse email"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? '…' : buttonLabel}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>
        {errorMsg && (
          <p role="alert" className="text-xs text-rose-700 mt-2">{errorMsg}</p>
        )}
      </div>
    )
  }

  return (
    <div
      className={
        variant === 'compact'
          ? 'bg-slate-50 border border-slate-100 rounded-2xl p-5'
          : 'bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-6 sm:p-8'
      }
    >
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${variant === 'compact' ? 'bg-white' : 'bg-blue-600 text-white'}`}>
          <Mail size={18} className={variant === 'compact' ? 'text-blue-600' : 'text-white'} />
        </div>
        <div>
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${variant === 'compact' ? 'text-slate-500' : 'text-blue-700'}`}>
            Newsletter Proprely
          </p>
          <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug">{defaultTitle}</h3>
        </div>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-4">{defaultDescription}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-colors"
          aria-label="Adresse email"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2 shrink-0"
        >
          {loading ? '…' : buttonLabel}
          {!loading && <ArrowRight size={14} />}
        </button>
      </form>
      {errorMsg && (
        <p role="alert" className="text-xs text-rose-700 mt-3">{errorMsg}</p>
      )}
    </div>
  )
}
