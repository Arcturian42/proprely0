import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Download, Calculator, ArrowUpRight } from 'lucide-react'
import PageNav from '../components/PageNav'
import Footer from '../sections/Footer'
import { posts } from '../data/blog'
import type { BlogPost } from '../data/blog'
import { navigate } from '../lib/useRoute'

const ALL = 'Tous'

const tagAccent: Record<string, { dot: string; chip: string; chipActive: string }> = {
  Stratégie: { dot: 'bg-indigo-500', chip: 'text-indigo-700 bg-indigo-50 border-indigo-100', chipActive: 'bg-indigo-600 text-white border-indigo-600' },
  Gestion: { dot: 'bg-emerald-500', chip: 'text-emerald-700 bg-emerald-50 border-emerald-100', chipActive: 'bg-emerald-600 text-white border-emerald-600' },
  Outils: { dot: 'bg-amber-500', chip: 'text-amber-800 bg-amber-50 border-amber-100', chipActive: 'bg-amber-600 text-white border-amber-600' },
  Productivité: { dot: 'bg-violet-500', chip: 'text-violet-700 bg-violet-50 border-violet-100', chipActive: 'bg-violet-600 text-white border-violet-600' },
  Conformité: { dot: 'bg-rose-500', chip: 'text-rose-700 bg-rose-50 border-rose-100', chipActive: 'bg-rose-600 text-white border-rose-600' },
  Management: { dot: 'bg-cyan-600', chip: 'text-cyan-800 bg-cyan-50 border-cyan-100', chipActive: 'bg-cyan-600 text-white border-cyan-600' },
}

function getAccent(tag: string) {
  return tagAccent[tag] || { dot: 'bg-slate-400', chip: 'text-slate-700 bg-slate-100 border-slate-200', chipActive: 'bg-slate-900 text-white border-slate-900' }
}

function totalReadTime(items: BlogPost[]) {
  const total = items.reduce((sum, p) => {
    const m = p.readTime.match(/(\d+)/)
    return sum + (m ? Number(m[1]) : 0)
  }, 0)
  return total
}

function parseDate(d: string): number {
  const months: Record<string, number> = {
    janvier: 0, février: 1, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5,
    juillet: 6, août: 7, aout: 7, septembre: 8, octobre: 9, novembre: 10, décembre: 11, decembre: 11,
  }
  const parts = d.toLowerCase().split(/\s+/)
  if (parts.length < 3) return 0
  const day = Number(parts[0])
  const month = months[parts[1]] ?? 0
  const year = Number(parts[2])
  return new Date(year, month, day).getTime()
}

const SORTED_POSTS = [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date))

export default function BlogIndex() {
  const [activeTag, setActiveTag] = useState<string>(ALL)

  const tags = useMemo(() => {
    const map = new Map<string, number>()
    SORTED_POSTS.forEach((p) => map.set(p.tag, (map.get(p.tag) || 0) + 1))
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
  }, [])

  const filtered = useMemo(() => {
    if (activeTag === ALL) return SORTED_POSTS
    return SORTED_POSTS.filter((p) => p.tag === activeTag)
  }, [activeTag])

  const featured = filtered[0]
  const rest = filtered.slice(1)
  const totalMin = totalReadTime(SORTED_POSTS)

  const issueLabel = useMemo(() => {
    if (SORTED_POSTS.length === 0) return ''
    const latest = SORTED_POSTS[0].date.split(/\s+/).slice(1).join(' ')
    return `Édition ${latest.toLowerCase()}`
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1 bg-white">
        <section className="border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-12">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-5">
              <span className="text-slate-900">Le Brief Propreté</span>
              <span className="text-slate-300">·</span>
              <span>{issueLabel}</span>
              <span className="text-slate-300">·</span>
              <span>{SORTED_POSTS.length} articles</span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="hidden sm:inline">{totalMin} min de lecture</span>
            </div>

            <h1 className="font-black text-slate-900 leading-[0.95] tracking-tight text-[2.6rem] sm:text-6xl lg:text-7xl mb-4 max-w-4xl">
              Le terrain, la gestion, la propreté B2B.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Une revue éditoriale pour les dirigeants de société de nettoyage. Analyses, méthodes, retours de praticiens. Pas de tribune sponsorisée, pas de générique LinkedIn.
            </p>
          </div>
        </section>

        <section className="sticky top-14 sm:top-16 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <button
                onClick={() => setActiveTag(ALL)}
                className={`text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors ${
                  activeTag === ALL
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {ALL} <span className="opacity-60 ml-1">({SORTED_POSTS.length})</span>
              </button>
              {tags.map(([tag, count]) => {
                const accent = getAccent(tag)
                const isActive = activeTag === tag
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors inline-flex items-center gap-1.5 ${
                      isActive ? accent.chipActive : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : accent.dot}`} />
                    {tag} <span className="opacity-70 ml-0.5">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {featured && (
          <section className="border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
              <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-6">
                À la une
              </div>

              <motion.button
                onClick={() => navigate(`/blog/${featured.slug}`)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group block w-full text-left"
              >
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 text-xs mb-5">
                      <span className={`inline-flex items-center gap-1.5 font-bold rounded-full px-2.5 py-1 border ${getAccent(featured.tag).chip}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getAccent(featured.tag).dot}`} />
                        {featured.tag}
                      </span>
                      <span className="text-slate-500">{featured.date}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 flex items-center gap-1">
                        <Clock size={11} /> {featured.readTime}
                      </span>
                    </div>

                    <h2 className="font-black text-slate-900 leading-[1.05] tracking-tight text-3xl sm:text-5xl mb-5 group-hover:text-blue-700 transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl">
                      {featured.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700">
                      Lire l'article
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <aside className="lg:col-span-5">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 sm:p-6">
                      <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-3">
                        Ce que l'article répond
                      </div>
                      <ul className="space-y-2.5">
                        {featured.quickSummary.slice(0, 4).map((s, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-800 leading-snug">
                            <span className={`w-1.5 h-1.5 rounded-full ${getAccent(featured.tag).dot} mt-2 shrink-0`} />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </aside>
                </div>
              </motion.button>
            </div>
          </section>
        )}

        <section className="bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-2">
                  {activeTag === ALL ? 'Tous les articles' : activeTag}
                </div>
                <h2 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">
                  {rest.length === 0 ? "Pas d'autres articles dans cette rubrique" : `${rest.length} autres ${rest.length > 1 ? 'lectures' : 'lecture'}`}
                </h2>
              </div>
              {rest.length > 0 && (
                <span className="text-xs text-slate-500 hidden sm:block">
                  Du plus récent au plus ancien
                </span>
              )}
            </div>

            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {rest.map((p, i) => {
                  const accent = getAccent(p.tag)
                  const spanLarge = i === 0 && rest.length >= 4
                  return (
                    <motion.button
                      key={p.slug}
                      onClick={() => navigate(`/blog/${p.slug}`)}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                      className={`group text-left bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] flex flex-col ${spanLarge ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                    >
                      <div className="flex items-center gap-2.5 text-[11px] mb-4">
                        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full px-2 py-0.5 border ${accent.chip}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${accent.dot}`} />
                          {p.tag}
                        </span>
                        <span className="text-slate-500">{p.date}</span>
                      </div>

                      <h3 className={`font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-tight tracking-tight mb-3 ${spanLarge ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                        {p.title}
                      </h3>

                      <p className={`text-slate-600 leading-relaxed line-clamp-3 mb-5 ${spanLarge ? 'text-base' : 'text-sm'}`}>
                        {p.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between text-xs">
                        <span className="text-slate-500 inline-flex items-center gap-1">
                          <Clock size={11} /> {p.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 font-bold text-blue-700">
                          Lire
                          <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <button
                onClick={() => navigate('/ressources')}
                className="group text-left bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:border-slate-900 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center mb-5">
                  <Download size={18} className="text-white" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 mb-2">
                  Hors-série
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
                  Les modèles Excel utilisés par les dirigeants
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  Devis, planning hebdomadaire, suivi des heures. Trois templates prêts à l'emploi pour ceux qui n'ont pas encore basculé sur un outil métier.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:gap-2 transition-all">
                  Voir les modèles
                  <ArrowRight size={14} />
                </span>
              </button>

              <button
                onClick={() => navigate('/simulateur-rentabilite')}
                className="group text-left bg-slate-900 text-white rounded-2xl p-6 sm:p-8 hover:bg-slate-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                  <Calculator size={18} className="text-white" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-blue-300 mb-2">
                  Outil
                </div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 leading-tight tracking-tight">
                  Vérifier si un contrat est rentable
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  Un simulateur qui calcule la marge nette et le résultat horaire d'un contrat de nettoyage. Verdict immédiat avec actions à prendre.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2 transition-all">
                  Ouvrir le simulateur
                  <ArrowRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-[11px] uppercase tracking-[0.18em] font-bold text-blue-300 mb-4">
              Bêta privée
            </div>
            <h2 className="font-black tracking-tight leading-[1.05] text-3xl sm:text-5xl mb-5">
              Lire est utile.<br />
              Tester le produit, encore plus.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-7 max-w-2xl">
              Proprely est en bêta privée, réservée à 30 sociétés de nettoyage fondatrices. Accès complet et gratuit, onboarding 30 minutes, tarif fondateur conservé à vie.
            </p>
            <button
              onClick={() => navigate('/beta')}
              className="group bg-white text-slate-900 rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-slate-100 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] inline-flex items-center gap-2 active:scale-[0.97]"
            >
              Candidater à la bêta
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
