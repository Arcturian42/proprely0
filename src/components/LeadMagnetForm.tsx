import { useState, type FormEvent } from 'react'
import { Download, ArrowRight, CheckCircle } from 'lucide-react'
import { trackEvent } from '../lib/analytics'

type Props = {
  filePath: string
  resourceSlug: string
  resourceTitle: string
}

const ENDPOINT = (import.meta as unknown as { env: { VITE_LEAD_MAGNET_ENDPOINT?: string } }).env.VITE_LEAD_MAGNET_ENDPOINT

async function sendLead(payload: { email: string; company: string; resource: string; resourceTitle: string }) {
  if (!ENDPOINT) return
  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    // Silent — analytics event toujours tracké, le download n'est pas bloqué.
  }
}

function triggerDownload(filePath: string, filename: string) {
  const a = document.createElement('a')
  a.href = filePath
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function LeadMagnetForm({ filePath, resourceSlug, resourceTitle }: Props) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const filename = filePath.split('/').pop() || 'modele.csv'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)

    const cleanEmail = email.trim().toLowerCase()
    const cleanCompany = company.trim()

    trackEvent('lead_magnet_download', {
      resource: resourceSlug,
      resource_title: resourceTitle,
      email_domain: cleanEmail.split('@')[1] || '',
      company: cleanCompany,
    })

    await sendLead({
      email: cleanEmail,
      company: cleanCompany,
      resource: resourceSlug,
      resourceTitle,
    })

    triggerDownload(filePath, filename)
    setSubmitted(true)
    setLoading(false)
  }

  const handleSkip = () => {
    trackEvent('lead_magnet_download_anonymous', {
      resource: resourceSlug,
      resource_title: resourceTitle,
    })
    triggerDownload(filePath, filename)
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <CheckCircle size={20} className="text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Téléchargement lancé</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Si le fichier ne s'est pas ouvert, <a href={filePath} download={filename} className="text-blue-600 underline">cliquez ici</a>. Nous vous enverrons d'autres ressources pertinentes pour votre activité — vous pouvez vous désinscrire à tout moment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">Téléchargement gratuit</p>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 leading-snug">{resourceTitle}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Recevez le fichier immédiatement. Nous vous enverrons aussi nos meilleurs articles propreté B2B (désinscription en 1 clic, RGPD).
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email professionnel"
          autoComplete="email"
          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nom de l'entreprise (optionnel)"
          autoComplete="organization"
          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group w-full bg-blue-600 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/20 active:scale-[0.97] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Download size={14} />
        {loading ? 'Envoi…' : 'Recevoir le fichier'}
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleSkip}
          className="text-slate-500 hover:text-slate-900 underline underline-offset-2"
        >
          Télécharger sans email
        </button>
        <span className="text-slate-400">RGPD · Hébergement européen</span>
      </div>
    </form>
  )
}
