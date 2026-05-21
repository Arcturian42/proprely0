import { useEffect } from 'react'
import { Mail, MapPin, Building2, Clock, ShieldCheck } from 'lucide-react'
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
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Une question sur le logiciel, la bêta privée, ou votre candidature de membre fondateur ? Écrivez-nous, nous revenons vers vous sous 24h ouvrées.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="mailto:contact@proprely.fr"
            onClick={() => trackEvent('email_click', { location: 'contact_page' })}
            className="group bg-blue-50 border border-blue-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-100/60 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Email</span>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              contact@proprely.fr
            </div>
            <div className="text-sm text-slate-600 mt-1">Réponse sous 24h ouvrées</div>
          </a>

          <a
            href={BETA_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('beta_cta_click', { location: 'contact_page' })}
            className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:border-slate-300 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-slate-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Bêta privée</span>
            </div>
            <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
              Candidater à la bêta
            </div>
            <div className="text-sm text-slate-600 mt-1">Formulaire 2 minutes, 30 places fondateurs</div>
          </a>
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
