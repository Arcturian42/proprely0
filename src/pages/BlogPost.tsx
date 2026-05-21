import { useEffect, useState, type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Clock, ChevronDown, Sparkles, HelpCircle, Zap } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import NotFound from './NotFound'
import { getPost, getRelatedPosts } from '../data/blog'
import type { BlogPost as BlogPostType, BlogFAQ } from '../data/blog'
import Link from '../components/Link'
import { BETA_FORM_URL } from '../config'
import { trackEvent } from '../lib/analytics'

function renderMarkdown(content: string): ReactElement[] {
  const lines = content.split('\n')
  const blocks: ReactElement[] = []
  let key = 0
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={key++} className="text-2xl sm:text-3xl font-black text-slate-900 mt-12 mb-4 leading-tight tracking-tight">
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={key++} className="text-lg sm:text-xl font-bold text-slate-900 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push(
        <ul key={key++} className="list-disc pl-6 mb-5 space-y-1.5 text-slate-700">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          ))}
        </ul>
      )
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    blocks.push(
      <p key={key++} className="text-slate-700 leading-relaxed mb-5 text-base sm:text-lg" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
    )
    i++
  }

  return blocks
}

function renderInline(text: string): string {
  let html = text
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 font-semibold hover:underline">$1</a>')
  return html
}

function QuickSummary({ items }: { items: string[] }) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-5 sm:p-6 mb-10"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-blue-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">À retenir</span>
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800 leading-snug">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.aside>
  )
}

function FAQItem({ faq, defaultOpen }: { faq: BlogFAQ; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group"
      >
        <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">{faq.q}</span>
        <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-600' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed pb-4">{faq.a}</p>
      </motion.div>
    </div>
  )
}

function FAQSection({ faq }: { faq: BlogFAQ[] }) {
  return (
    <section className="mt-16 pt-12 border-t border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle size={16} className="text-blue-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 tracking-tight">
        Tout ce qu'on nous demande sur ce sujet
      </h2>
      <div className="bg-white border border-slate-100 rounded-2xl px-5 sm:px-6 divide-y divide-slate-100">
        {faq.map((f, i) => (
          <FAQItem key={i} faq={f} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  )
}

const FR_MONTHS: Record<string, string> = {
  janvier: '01', février: '02', fevrier: '02', mars: '03', avril: '04',
  mai: '05', juin: '06', juillet: '07', août: '08', aout: '08',
  septembre: '09', octobre: '10', novembre: '11', décembre: '12', decembre: '12',
}

function parseFrenchDate(str: string): string | null {
  const m = str.toLowerCase().trim().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/)
  if (!m) return null
  const day = m[1].padStart(2, '0')
  const month = FR_MONTHS[m[2]]
  if (!month) return null
  return `${m[3]}-${month}-${day}`
}

function injectArticleSchema(post: BlogPostType) {
  const id = 'blog-post-schema'
  document.getElementById(id)?.remove()
  const url = `https://proprely.fr/blog/${post.slug}`
  const datePublished = parseFrenchDate(post.date) || post.date
  const dateModified = post.dateModified ? (parseFrenchDate(post.dateModified) || post.dateModified) : datePublished
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url,
      datePublished,
      dateModified,
      image: 'https://proprely.fr/og-image.png',
      author: { '@type': 'Organization', name: 'Proprely', url: 'https://proprely.fr' },
      publisher: {
        '@type': 'Organization',
        name: 'Proprely',
        logo: { '@type': 'ImageObject', url: 'https://proprely.fr/proprely-icon-512.png' },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'fr-FR',
      articleSection: post.tag,
    },
  ]
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://proprely.fr/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  })
  if (post.faq?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  if (post.howTo) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: post.howTo.name,
      description: post.howTo.description,
      inLanguage: 'fr-FR',
      step: post.howTo.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    })
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas)
  document.head.appendChild(script)
}

type Props = { slug: string }

export default function BlogPost({ slug }: Props) {
  const post = getPost(slug)
  const others = getRelatedPosts(slug, 2)

  useEffect(() => {
    if (!post) return
    const url = `https://proprely.fr/blog/${post.slug}`
    const title = `${post.title} · Proprely`
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', post.excerpt)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', post.excerpt)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', post.excerpt)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
    injectArticleSchema(post)
    return () => {
      document.getElementById('blog-post-schema')?.remove()
    }
  }, [post])

  if (!post) return <NotFound />

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <article className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Blog', href: '/blog' },
                { name: post.title },
              ]}
              className="mb-6"
            />
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              Tous les articles
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
              <span className="font-semibold text-blue-700 bg-blue-50 rounded-full px-2.5 py-0.5">{post.tag}</span>
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {post.tldr && (
              <motion.aside
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="bg-white border-l-4 border-blue-500 rounded-r-2xl p-5 sm:p-6 mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Réponse-flash</span>
                </div>
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">{post.tldr}</p>
              </motion.aside>
            )}

            <QuickSummary items={post.quickSummary} />

            <div className="prose-content">
              {renderMarkdown(post.content)}
            </div>

            {post.faq && post.faq.length > 0 && <FAQSection faq={post.faq} />}

            <div className="mt-16 pt-8 border-t border-slate-100 bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Bêta privée</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">Vous reconnaissez votre quotidien ?</h3>
              <p className="text-sm sm:text-base text-slate-700 mb-5">
                Proprely centralise tout ce dont parle cet article. C'est gratuit pendant la bêta et la mise en route prend 30 minutes avec le fondateur.
              </p>
              <a
                href={BETA_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('beta_cta_click', { location: 'blog_post', post: post.slug })}
                className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-6 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Rejoindre la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
              </a>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="bg-slate-50 py-14 sm:py-20 border-t border-slate-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-black text-slate-900 mb-8">À lire aussi</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group block text-left bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
                  >
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
                      <span className="font-semibold text-blue-700 bg-blue-50 rounded-full px-2 py-0.5">{p.tag}</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
