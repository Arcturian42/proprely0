import { useEffect } from 'react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import { MentionsLegales, Confidentialite, CGU } from '../components/LegalContent'

type Kind = 'mentions' | 'privacy' | 'cgu'

type Props = { kind: Kind }

const META: Record<Kind, { url: string; title: string; description: string; h1: string; crumb: string }> = {
  mentions: {
    url: 'https://proprely.fr/mentions-legales',
    title: 'Mentions légales · Proprely',
    description: "Mentions légales de Proprely : éditeur, hébergeur, propriété intellectuelle, contact. Société Pershing Global Solutions LTD.",
    h1: 'Mentions légales',
    crumb: 'Mentions légales',
  },
  privacy: {
    url: 'https://proprely.fr/confidentialite',
    title: 'Politique de confidentialité · Proprely',
    description: "Politique de confidentialité Proprely : données collectées, finalités, base légale, durée de conservation, droits RGPD.",
    h1: 'Politique de confidentialité',
    crumb: 'Confidentialité',
  },
  cgu: {
    url: 'https://proprely.fr/cgu',
    title: "Conditions générales d'utilisation · Proprely",
    description: "CGU Proprely : accès au service, engagements éditeur et membre, propriété des données, résiliation, évolutions.",
    h1: "Conditions générales d'utilisation",
    crumb: 'CGU',
  },
}

export default function Legal({ kind }: Props) {
  const m = META[kind]

  useEffect(() => {
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', m.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', m.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', m.url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', m.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', m.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', m.url)
  }, [kind, m])

  const Content = kind === 'mentions' ? MentionsLegales : kind === 'privacy' ? Confidentialite : CGU

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        <Breadcrumbs items={[{ name: m.crumb }]} className="mb-6" />
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">{m.h1}</h1>
        <div className="prose prose-slate max-w-none text-slate-700
          [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3
          [&_p]:my-3 [&_p]:leading-relaxed
          [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1
          [&_a]:text-blue-600 [&_a:hover]:underline
          [&_strong]:text-slate-900">
          <Content />
        </div>
      </main>
      <Footer />
    </div>
  )
}
