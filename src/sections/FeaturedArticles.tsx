import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import Link from '../components/Link'

// Articles mis en avant sur la home pour renforcer leur maillage interne.
// Cible : les articles signalés "Discovered – currently not indexed" dans
// Google Search Console, qui ont besoin de plus de signaux d'autorité
// (liens internes depuis la home = la page la plus crawlée).
const FEATURED = [
  {
    slug: 'fixer-prix-nettoyage',
    title: 'Fixer ses prix dans le nettoyage : la méthode juste en 2026',
    excerpt: "La règle des 3×, les 4 facteurs qui justifient une hausse, et comment construire une grille interne qui protège vos marges.",
    tag: 'Stratégie',
    readTime: '7 min',
  },
  {
    slug: 'calcul-heures-agents-nettoyage',
    title: "Calcul des heures agents nettoyage : la méthode rigoureuse",
    excerpt: "Coût horaire chargé, primes, heures sup, paie sans erreur. Le passage à l'acte qui clarifie votre marge réelle.",
    tag: 'Gestion',
    readTime: '6 min',
  },
  {
    slug: 'logiciel-societe-nettoyage-criteres',
    title: "Logiciel société de nettoyage : les 8 critères qui comptent",
    excerpt: "Mobilité, preuve de passage, marge, RGPD — la grille de lecture pour choisir un outil qui ne vous ralentira pas.",
    tag: 'Outils',
    readTime: '6 min',
  },
  {
    slug: 'fideliser-agents-nettoyage-turnover',
    title: 'Fidéliser les agents : 6 leviers contre 35 % de turnover',
    excerpt: "Le turnover sectoriel coûte 4 000-8 000 € par départ. Les pratiques concrètes des dirigeants qui retiennent leurs agents.",
    tag: 'Équipe',
    readTime: '7 min',
  },
  {
    slug: 'gestion-societe-nettoyage-outils',
    title: 'Gestion société nettoyage : les outils 2026 et leurs limites',
    excerpt: "Excel, WhatsApp, Word, Drive, papier : panorama du mix utilisé et où chaque outil casse à partir de 5-8 agents.",
    tag: 'Outils',
    readTime: '8 min',
  },
  {
    slug: 'rgpd-societe-nettoyage-2026',
    title: 'RGPD société de nettoyage 2026 : ce qu\'il faut vraiment faire',
    excerpt: "Registre, sous-traitance, photos de preuve de passage, durées de conservation. Le minimum réglementaire qui tient juridiquement.",
    tag: 'Conformité',
    readTime: '7 min',
  },
]

export default function FeaturedArticles() {
  return (
    <section className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen size={12} />
            À lire en ce moment
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Les analyses qui font réfléchir<br className="hidden sm:block" />
            les dirigeants du nettoyage
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Six articles essentiels pour piloter votre société : prix, heures, outils, équipe, conformité.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
            >
              <Link
                to={`/blog/${p.slug}`}
                className="group block h-full bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:border-blue-200 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:scale-[0.99] transition-[border-color,box-shadow,transform] duration-200 ease-[var(--ease-out)]"
              >
                <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-blue-700 bg-blue-50 rounded-full px-2.5 py-0.5">{p.tag}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {p.readTime}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug text-base sm:text-lg">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3">{p.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                  Lire l'article
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors"
          >
            Voir tous les articles du blog
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
