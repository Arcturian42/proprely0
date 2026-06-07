import { useEffect } from 'react'
import { Mail, MapPin, Building2, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { trackEvent } from '../lib/analytics'
import { BETA_FORM_URL } from '../config'

const URL = 'https://proprely.fr/contact'
const TITLE = 'Contact · Proprely'
const DESCRIPTION = "Contactez Proprely : logiciel de gestion pour sociétés de nettoyage B2B. Email contact@proprely.fr, réponse sous 24h ouvrées."

export default function Contact() {
  useEffect(() => {
    document.title = TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', URL)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', URL)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        <Breadcrumbs items={[{ name: 'Contact' }]} className="mb-6" />
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
          Contacter Proprely
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Le moyen le plus rapide d'avoir une réponse : <strong className="text-slate-900">candidater à la bêta privée</strong> ci-dessous (2 min). Sinon, écrivez-nous, nous revenons sous 24 h ouvrées.
        </p>

        <div className="relative mb-10 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white overflow-hidden shadow-xl shadow-blue-900/20">
          <div className="absolute top-0 -left-32 w-[20rem] h-[20rem] rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -right-32 w-[20rem] h-[20rem] rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} />
              Bêta privée — 30 places fondateurs
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3 leading-tight">
              Rejoignez les 30 sociétés fondatrices.
            </h2>
            <p className="text-slate-200 text-sm sm:text-base mb-6 leading-relaxed">
              Accès gratuit pendant toute la bêta. Tarif fondateur conservé à vie. Onboarding 30 min directement avec le fondateur. Sans carte bancaire, sans engagement.
            </p>
            <a
              href={BETA_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('beta_cta_click', { location: 'contact_page_hero' })}
              className="group inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-3.5 font-bold text-sm sm:text-base hover:bg-blue-50 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-900/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Candidater à la bêta (2 min)
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-xs text-slate-300 mt-4">Réponse sous 24 h ouvrées</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="mailto:contact@proprely.fr"
            onClick={() => trackEvent('email_click', { location: 'contact_page' })}
            className="group bg-blue-50 border border-blue-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-100/60 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Email direct</span>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              contact@proprely.fr
            </div>
            <div className="text-sm text-slate-600 mt-1">Pour toute question hors bêta</div>
          </a>

          <Link
            to="/audit-gratuit"
            className="group bg-emerald-50 border border-emerald-100 rounded-2xl p-5 hover:border-emerald-200 hover:bg-emerald-100/60 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Audit gratuit</span>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              Diagnostic 30 min offert
            </div>
            <div className="text-sm text-slate-600 mt-1">Pour identifier vos pertes de temps + ROI</div>
          </Link>
        </div>

        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Informations</h2>
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6 space-y-4 mb-10">
          <div className="flex items-start gap-3">
            <Building2 size={18} className="text-slate-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Éditeur</div>
              <div className="text-sm text-slate-600">Pershing Global Solutions LTD</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-slate-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Siège social</div>
              <div className="text-sm text-slate-600">77 Camden Lower Street, Saint Kevin, Dublin D02 XE80, Irlande</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={18} className="text-slate-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Délai de réponse</div>
              <div className="text-sm text-slate-600">Sous 24h ouvrées (lundi-vendredi, 9h-18h CET)</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-slate-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-bold text-slate-900">Zones d'opération</div>
              <div className="text-sm text-slate-600">
                France entière, focus{' '}
                <Link to="/villes/paris" className="text-blue-600 hover:underline">Paris &amp; Île-de-France</Link>,{' '}
                <Link to="/villes/lyon" className="text-blue-600 hover:underline">Lyon &amp; Rhône-Alpes</Link>,{' '}
                <Link to="/villes/marseille" className="text-blue-600 hover:underline">Marseille &amp; PACA</Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Pour toute question relative à vos données personnelles ou à l'exercice de vos droits RGPD :{' '}
          <a href="mailto:contact@proprely.fr" className="text-blue-600 hover:underline">contact@proprely.fr</a>.
          Voir aussi notre{' '}
          <Link to="/confidentialite" className="text-blue-600 hover:underline">politique de confidentialité</Link>.
        </p>
      </main>
      <Footer />
    </div>
  )
}
