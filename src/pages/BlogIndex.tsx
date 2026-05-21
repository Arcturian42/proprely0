import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import { posts } from '../data/blog'
import Link from '../components/Link'

const META = {
  title: 'Blog · Gestion, terrain et propreté B2B · Proprely',
  description:
    "Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage. Productivité, RGPD, outils, prix, fidélisation.",
  url: 'https://proprely.fr/blog',
}

function injectBlogIndexSchema() {
  const id = 'blog-index-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${META.url}#blog`,
      name: 'Blog Proprely',
      description: META.description,
      url: META.url,
      inLanguage: 'fr-FR',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      publisher: { '@id': 'https://proprely.fr/#organization' },
      blogPost: posts.slice(0, 12).map((p) => ({
        '@type': 'BlogPosting',
        url: `https://proprely.fr/blog/${p.slug}`,
        headline: p.title,
        description: p.excerpt,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://proprely.fr/blog/${p.slug}`,
        name: p.title,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: META.url },
      ],
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

// Catégorisation pour navigation par tags (signal de structure pour les bots).
function groupByTag(items: typeof posts) {
  const groups = new Map<string, typeof posts>()
  for (const p of items) {
    const arr = groups.get(p.tag) ?? []
    arr.push(p)
    groups.set(p.tag, arr)
  }
  return groups
}

export default function BlogIndex() {
  useEffect(() => {
    injectBlogIndexSchema()
    return () => {
      document.getElementById('blog-index-schema')?.remove()
    }
  }, [])

  const tags = Array.from(groupByTag(posts).keys()).sort()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1 py-12 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ name: 'Blog' }]} className="mb-6" />
          <div className="mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
              <BookOpen size={12} />
              Blog · {posts.length} articles
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
              Le terrain, la gestion,<br />la propreté B2B
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Analyses, retours d'expérience et bonnes pratiques pour les dirigeants de sociétés de nettoyage.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((t) => (
                <a
                  key={t}
                  href={`#tag-${t.toLowerCase().replace(/\s/g, '-')}`}
                  className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full px-3 py-1 transition-colors"
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {posts.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.3) }}
                id={`tag-${p.tag.toLowerCase().replace(/\s/g, '-')}`}
              >
                <Link
                  to={`/blog/${p.slug}`}
                  className="group block w-full text-left bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 flex-wrap">
                    <span className="font-semibold text-blue-700 bg-blue-50 rounded-full px-2.5 py-0.5">{p.tag}</span>
                    <span>{p.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {p.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-3 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Lire l'article
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
