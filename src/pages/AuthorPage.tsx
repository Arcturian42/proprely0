import { useEffect, useMemo } from 'react'
import { ArrowRight, BookOpen, Award, Compass, Mail, MapPin, Sparkles, ExternalLink } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { AUTHORS, getAuthor, BETA_FORM_URL } from '../config'
import { posts } from '../data/blog'
import { trackEvent } from '../lib/analytics'

type Props = { slug: string }

const EXTENDED_BIOS: Record<string, {
  intro: string
  paragraphs: string[]
  expertise: { title: string; desc: string }[]
  approach: string[]
  location: string
}> = {
  'paul-munier': {
    intro:
      "Paul intervient au quotidien auprès des dirigeants de société de nettoyage B2B qui rejoignent Proprely. Onboarding, écoute de leurs contraintes terrain, contribution aux décisions produit : ses retours alimentent le contenu publié sur ce site.",
    paragraphs: [
      "Business Developer chez Proprely depuis le lancement de la bêta privée, Paul Munier accompagne chaque mois plusieurs dirigeants de société de nettoyage dans leur passage d'Excel + WhatsApp vers un cockpit métier intégré. Ces échanges nourrissent directement les articles publiés sur le blog Proprely.",
      "Sa double casquette commercial / rédacteur lui permet de traduire les contraintes opérationnelles (planning, IDCC 3043, preuve de passage, marge par contrat) en contenus actionnables pour les TPE/PME du secteur. Aucun article n'est publié sans avoir été cadré avec au moins un dirigeant de société de nettoyage en activité.",
      "Paul s'appuie systématiquement sur des sources officielles vérifiables (convention collective IDCC 3043, BOAMP, INSEE, Légifrance) et croise ses propres entretiens avec les retours des fondateurs Proprely pour produire des contenus à la fois techniques et terrain.",
    ],
    expertise: [
      {
        title: "Logiciels de gestion société de nettoyage",
        desc: "Comparatifs concurrents, critères de choix, migration depuis Excel, ROI réel.",
      },
      {
        title: "Convention collective IDCC 3043",
        desc: "Grille salariale 2026, primes (panier, transport, salissure), article 7 transfert du personnel.",
      },
      {
        title: "Pilotage de marge en propreté B2B",
        desc: "Coût horaire chargé, calcul prix au m², simulateur rentabilité par contrat.",
      },
      {
        title: "Planning multi-sites et terrain",
        desc: "Affectation 1-clic, spécialités agents, gestion des absences et remplacements.",
      },
      {
        title: "Preuve de passage et conformité syndic",
        desc: "QR code, photos horodatées, signature, PV automatique pour les copropriétés.",
      },
      {
        title: "Marchés publics et appels d'offres",
        desc: "BOAMP, mémoire technique, chiffrage juste, transfert personnel article 7.",
      },
    ],
    approach: [
      "Aucun article publié sans avoir été cadré avec au moins un dirigeant en exercice.",
      "Sources officielles citées (IDCC 3043, INSEE, Légifrance, BOAMP).",
      "Données chiffrées vérifiables, ordres de grandeur observés en bêta.",
      "Mises à jour annuelles sur les sujets sensibles (grille salariale, primes, Factur-X).",
      "Aucune fabrication, aucune affiliation cachée.",
    ],
    location: 'France · entretiens hebdomadaires avec les fondateurs Proprely',
  },
  'lucas-mafo': {
    intro:
      "Lucas couvre les verticales techniques de la propreté chez Proprely : industriel, vitrerie spécialisée, datacenter, bionettoyage laboratoire, après-sinistre. Ses articles s'adressent aux dirigeants de sociétés de nettoyage qui se positionnent sur des segments à protocoles formels (HACCP, EN bionettoyage, salles blanches, contamination biologique).",
    paragraphs: [
      "Spécialiste des verticales métier propreté chez Proprely, Lucas Mafo traite les segments techniques où les protocoles et la traçabilité sont des prérequis commerciaux : nettoyage industriel (HACCP agroalimentaire, ICPE), vitrerie spécialisée (travaux en hauteur, façades), bionettoyage médical et laboratoire (NF EN 14885, ISO 14644 salles blanches), nettoyage datacenter (zones sensibles, antistatique) et décontamination après sinistre (incendie, dégât des eaux, biologique).",
      "Sa méthode : entretiens systématiques avec des dirigeants de sociétés de nettoyage positionnées sur ces verticales, croisés avec la documentation officielle (INRS, ANSES, ISO, AFNOR, normes EN). Aucun article publié sans validation par un opérationnel en exercice sur la verticale concernée.",
      "Lucas s'appuie aussi sur les retours de la bêta privée Proprely pour identifier les besoins logiciels spécifiques de ces verticales (traçabilité protocole, photos avant-après datées sur zones critiques, conformité documentaire pour audits clients).",
    ],
    expertise: [
      {
        title: "Nettoyage industriel et HACCP",
        desc: "Agroalimentaire, ICPE, protocoles HACCP, zones à risque, fréquences et traçabilité.",
      },
      {
        title: "Vitrerie spécialisée et travaux en hauteur",
        desc: "Façades vitrées, nacelles, cordistes, équipements de protection individuelle, conformité Code du travail.",
      },
      {
        title: "Bionettoyage médical et laboratoire",
        desc: "Hôpitaux, EHPAD, laboratoires d'analyses, normes NF EN 14885, traçabilité produits CMR, désinfection ciblée.",
      },
      {
        title: "Salles blanches et environnements contrôlés",
        desc: "ISO 14644, pharmacie, semi-conducteurs, contrôles particulaires, équipements et tenues spécifiques.",
      },
      {
        title: "Décontamination après sinistre",
        desc: "Incendie, dégât des eaux, contamination biologique, prise en charge assurance, expertise contradictoire.",
      },
      {
        title: "Nettoyage datacenter",
        desc: "Zones sensibles, antistatique, sols techniques, protocoles d'accès sécurisé, périodicité.",
      },
    ],
    approach: [
      "Aucun article publié sans validation par un opérationnel en exercice sur la verticale.",
      "Sources officielles citées (INRS, ANSES, ISO, AFNOR, normes EN, Code du travail).",
      "Ordres de grandeur tarifaires basés sur la grille IDCC 3043 + primes spécifiques par verticale.",
      "Mises à jour quand un référentiel ou une norme évolue (révision EN, mise à jour ISO).",
      "Aucune fabrication, aucune affiliation cachée.",
    ],
    location: 'France · entretiens avec des dirigeants spécialisés sur chaque verticale',
  },
}

function injectSchema(slug: string) {
  const id = 'author-schema'
  document.getElementById(id)?.remove()
  const author = getAuthor(slug)
  const ext = EXTENDED_BIOS[slug]
  const url = `https://proprely.fr/auteurs/${slug}`
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `${author.name} — Auteur Proprely`,
      description: author.bio,
      url,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-07',
      dateModified: today,
      mainEntity: {
        '@type': 'Person',
        '@id': `${url}#person`,
        name: author.name,
        jobTitle: author.jobTitle,
        description: ext?.intro || author.bio,
        knowsAbout: ext?.expertise.map((e) => e.title) ?? author.knowsAbout,
        worksFor: { '@type': 'Organization', name: 'Proprely', url: 'https://proprely.fr/' },
        url,
        sameAs: [author.linkedin],
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Auteurs', item: 'https://proprely.fr/auteurs/' },
          { '@type': 'ListItem', position: 3, name: author.name, item: url },
        ],
      },
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function AuthorPage({ slug }: Props) {
  const author = AUTHORS[slug]
  const ext = EXTENDED_BIOS[slug]

  useEffect(() => {
    if (!author) return
    const title = `${author.name} — ${author.jobTitle} chez Proprely · Auteur`
    const description = ext?.intro || author.bio
    const url = `https://proprely.fr/auteurs/${slug}`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectSchema(slug)
    return () => {
      document.getElementById('author-schema')?.remove()
    }
  }, [slug, author, ext])

  const authoredArticles = useMemo(
    () => posts.filter((p) => (p.authorSlug ?? 'paul-munier') === slug).slice(0, 12),
    [slug]
  )

  if (!author) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <PageNav />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">Auteur introuvable</h1>
          <p className="text-slate-600 mb-6">L'auteur demandé n'existe pas.</p>
          <Link to="/blog" className="text-blue-600 font-bold hover:underline">Retour au blog →</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const initials = author.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="absolute top-10 -right-20 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs
              items={[
                { name: 'Auteurs', href: '/auteurs' },
                { name: author.name },
              ]}
              className="mb-6"
            />

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-lg shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
                  <Sparkles size={12} />
                  Auteur Proprely
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-2 leading-[1.05]">
                  {author.name}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-semibold mb-2">{author.jobTitle}</p>
                {ext?.location && (
                  <p className="text-sm text-slate-500 inline-flex items-center gap-1.5 mb-5">
                    <MapPin size={12} />
                    {ext.location}
                  </p>
                )}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 max-w-3xl">
                  {ext?.intro || author.bio}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('author_linkedin_click', { author: slug, location: 'author_page' })}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white rounded-xl px-5 py-2.5 font-semibold text-sm hover:bg-slate-800 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Profil LinkedIn
                  </a>
                  <a
                    href="mailto:contact@proprely.fr"
                    onClick={() => trackEvent('email_click', { location: 'author_page' })}
                    className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-xl px-5 py-2.5 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    <Mail size={14} />
                    Contacter l'équipe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BIO */}
        {ext && (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">Parcours et méthode</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight">
                {author.name.split(' ')[0]} en 3 paragraphes
              </h2>
              <div className="prose-content space-y-5">
                {ext.paragraphs.map((p, i) => (
                  <p key={i} className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EXPERTISE */}
        {ext && (
          <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 bg-white text-slate-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
                  <Award size={12} />
                  Expertises
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Les sujets sur lesquels {author.name.split(' ')[0]} écrit
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ext.expertise.map((e) => (
                  <div key={e.title} className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{e.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{e.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* APPROACH */}
        {ext && (
          <section className="py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
                <Compass size={12} />
                Méthode éditoriale
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight">
                5 règles strictes pour chaque article
              </h2>
              <ul className="space-y-3">
                {ext.approach.map((a, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-slate-700 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ARTICLES */}
        {authoredArticles.length > 0 && (
          <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 bg-white text-slate-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-200">
                  <BookOpen size={12} />
                  Publications
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Articles écrits par {author.name.split(' ')[0]}
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                  {authoredArticles.length} article{authoredArticles.length > 1 ? 's' : ''} récent{authoredArticles.length > 1 ? 's' : ''} sur le blog Proprely.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {authoredArticles.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 transition-colors block"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2">{p.tag}</p>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug line-clamp-3">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{p.date} · {p.readTime}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                      Lire l'article
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:underline">
                  Voir tous les articles du blog
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Échanger avec {author.name.split(' ')[0]} en 30 minutes
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              {author.name.split(' ')[0]} mène les onboardings des sociétés fondatrices. Réservez un échange via la bêta ou un audit gratuit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'author_page_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-50 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('audit_cta_click', { location: 'author_page_final' })}
                className="inline-flex items-center justify-center gap-2 bg-blue-800/40 border border-white/30 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-blue-800/60 transition-colors"
              >
                Audit gratuit 30 min
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
