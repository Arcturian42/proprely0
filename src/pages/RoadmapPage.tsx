import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ChevronDown, Map, Sparkles, Filter, Rss } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'
import {
  changelog,
  CATEGORY_STYLE,
  STATUS_LABEL,
  STATUS_STYLE,
  type ChangelogStatus,
  type ChangelogCategory,
  type ChangelogItem,
} from '../data/changelog'

const URL = 'https://proprely.fr/roadmap'
const TITLE = 'Roadmap et changelog Proprely — Ce qui arrive, ce qui a été livré'
const DESCRIPTION =
  "Roadmap publique Proprely : ce qui a été livré, ce qui est en cours, ce qui arrive. Transparence totale sur les évolutions du cockpit nettoyage."

const TABS: { id: 'all' | 'roadmap' | 'shipped'; label: string }[] = [
  { id: 'all', label: 'Tout' },
  { id: 'shipped', label: 'Livré' },
  { id: 'roadmap', label: 'À venir' },
]

function injectSchema() {
  const id = 'roadmap-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-06-07',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Roadmap', item: URL },
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

function ItemRow({ item }: { item: ChangelogItem }) {
  const cat = CATEGORY_STYLE[item.category]
  const CatIcon = cat.icon
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-slate-300 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.border} border flex items-center justify-center shrink-0`}>
          <CatIcon size={18} className={cat.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 border ${STATUS_STYLE[item.status]}`}>
              {STATUS_LABEL[item.status]}
            </span>
            <span className={`text-[10px] font-semibold ${cat.text}`}>{item.category}</span>
            <span className="text-[10px] text-slate-400">·</span>
            <span className="text-[10px] text-slate-500">{item.dateLabel}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-2">{item.description}</p>
          {item.details && item.details.length > 0 && (
            <ul className="space-y-1 mt-3">
              {item.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          )}
          {item.link && (
            <Link
              to={item.link.to}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline mt-3"
            >
              {item.link.label}
              <ArrowRight size={11} />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default function RoadmapPage() {
  const [tab, setTab] = useState<'all' | 'roadmap' | 'shipped'>('all')
  const [category, setCategory] = useState<ChangelogCategory | 'all'>('all')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    document.title = TITLE
    document.querySelector('meta[name="description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', URL)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', TITLE)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', DESCRIPTION)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', URL)
    injectSchema()
    return () => {
      document.getElementById('roadmap-schema')?.remove()
    }
  }, [])

  const filtered = useMemo(() => {
    let items = [...changelog]
    if (tab === 'shipped') items = items.filter((i) => i.status === 'shipped')
    else if (tab === 'roadmap') items = items.filter((i) => i.status !== 'shipped')
    if (category !== 'all') items = items.filter((i) => i.category === category)
    return items
  }, [tab, category])

  const counts = useMemo(() => {
    return {
      shipped: changelog.filter((i) => i.status === 'shipped').length,
      in_progress: changelog.filter((i) => i.status === 'in_progress').length,
      planned: changelog.filter((i) => i.status === 'planned').length,
      considering: changelog.filter((i) => i.status === 'considering').length,
    } as Record<ChangelogStatus, number>
  }, [])

  const categories = useMemo(() => {
    const set = new Set<ChangelogCategory>()
    changelog.forEach((i) => set.add(i.category))
    return Array.from(set)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-14 sm:py-20">
          <div className="absolute top-10 -right-20 w-[400px] h-[400px] bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <Breadcrumbs items={[{ name: 'Roadmap' }]} className="mb-6" />

            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5 border border-violet-100">
              <Map size={12} />
              Transparence totale
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.05] max-w-4xl">
              Roadmap publique Proprely
            </h1>

            <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Ce qui a été livré, ce qui est en cours, ce qui arrive. Les membres fondateurs influencent directement les priorités. Aucun item caché, aucune date promise sans cadence réelle.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {(['shipped', 'in_progress', 'planned', 'considering'] as ChangelogStatus[]).map((s) => (
                <div key={s} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="text-2xl font-black text-slate-900">{counts[s]}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${STATUS_STYLE[s].split(' ')[1]}`}>
                    {STATUS_LABEL[s]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TABS + FILTER */}
        <section className="border-y border-slate-100 bg-white sticky top-14 sm:top-16 z-30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4">
              <div className="inline-flex bg-slate-100 rounded-xl p-1 self-start">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      tab === t.id ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setFilterOpen((o) => !o)}
                  className="inline-flex items-center gap-2 text-sm text-slate-700 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                >
                  <Filter size={14} />
                  {category === 'all' ? 'Toutes catégories' : category}
                  <ChevronDown size={14} className={filterOpen ? 'rotate-180' : ''} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-1 min-w-[180px] z-10">
                    <button
                      type="button"
                      onClick={() => {
                        setCategory('all')
                        setFilterOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm hover:bg-slate-50 ${category === 'all' ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                    >
                      Toutes catégories
                    </button>
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCategory(c)
                          setFilterOpen(false)
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm hover:bg-slate-50 ${category === c ? 'font-bold text-blue-700' : 'text-slate-700'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="py-10 sm:py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {filtered.length === 0 ? (
              <p className="text-center text-slate-500 py-12">
                Aucun item ne correspond à ce filtre.
              </p>
            ) : (
              <div className="space-y-4">
                {filtered.map((item, i) => (
                  <ItemRow key={`${item.date}-${item.title}-${i}`} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RSS NOTICE */}
        <section className="py-10 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Rss size={12} />
              Suivez le changelog par flux RSS
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Les évolutions Proprely sont également publiées sur notre flux RSS aux côtés des articles du blog.
            </p>
            <a
              href="https://proprely.fr/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              proprely.fr/rss.xml
              <ArrowRight size={11} />
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 sm:py-20 bg-gradient-to-br from-slate-900 via-slate-900 to-violet-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Sparkles size={28} className="text-violet-300 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
              Influencez la roadmap en rejoignant la bêta
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Les membres fondateurs ont une ligne directe avec le fondateur. Leurs retours pèsent dans la priorisation de chaque sprint.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'roadmap_final' })}
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 rounded-xl px-7 py-4 font-black text-sm hover:bg-slate-100 transition-colors"
              >
                Rejoindre la bêta
                <ArrowRight size={14} />
              </a>
              <Link
                to="/integrations"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white rounded-xl px-7 py-4 font-black text-sm hover:bg-white/20 transition-colors"
              >
                Voir les intégrations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
