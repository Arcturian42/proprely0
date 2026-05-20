import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, X, Smartphone, FileText, Calendar, ShieldCheck, HelpCircle, Sparkles } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'
import { FOUNDER_SPOTS, remainingSpots } from '../config'

const URL = 'https://proprely.fr/logiciel-auto-entrepreneur-nettoyage'
const TITLE = 'Logiciel auto-entrepreneur nettoyage : gérer seul sans se perdre · Proprely'
const DESCRIPTION = "Logiciel pour auto-entrepreneur en nettoyage : devis, clients, planning, facturation, suivi heures. Conçu pour les indépendants qui démarrent ou solo établis."

const challenges = [
  "Vous êtes seul à tout porter : devis, planning, facturation, relances, paie",
  "Vous mélangez vos clients, vos prestations et vos heures sur un même fichier Excel",
  "Vous oubliez parfois de facturer une intervention ponctuelle",
  "Vos devis prennent 20 minutes sur Word, et vous perdez des prospects à cause de la lenteur",
  "Vous ne savez pas quel client vous coûte vraiment de l'argent (déplacement, fourniture, temps)",
  "Vous craignez l'URSSAF, le RGPD, les factures incomplètes",
]

const benefits = [
  { icon: FileText, title: "Devis pro en 2 minutes", desc: "Devis à votre charte, signature électronique, suivi des relances. Vous répondez avant le concurrent." },
  { icon: Calendar, title: "Planning par semaine", desc: "Vos interventions visibles d'un coup d'œil. Pas d'oubli, pas de doublon, prêt à imprimer pour les clients qui demandent." },
  { icon: Smartphone, title: "Mobile sur le terrain", desc: "Consultez vos missions depuis votre téléphone. Validez la prestation, prenez une photo, signature client, fini." },
  { icon: ShieldCheck, title: "Conformité RGPD intégrée", desc: "Hébergement européen, chiffrement, registre des traitements. Vous êtes tranquille face à l'URSSAF et à la CNIL." },
]

const faq = [
  { q: "Proprely est-il adapté à un auto-entrepreneur en nettoyage ?", a: "Oui, à partir du moment où vous gérez au moins 3-5 clients récurrents. En-dessous, un template Word et Excel suffit (voir nos modèles gratuits dans /ressources). Au-delà, vous gagnez 1 à 3 heures par semaine sur l'admin." },
  { q: "Combien coûte Proprely pour un auto-entrepreneur ?", a: "Gratuit pendant la bêta privée (30 places fondateurs). Tarif fondateur conservé à vie après le lancement. Aucune carte bancaire demandée." },
  { q: "Mes clients verront-ils que je suis seul à gérer ?", a: "Non, l'outil ressemble à n'importe quel logiciel pro. Devis à votre charte, factures à votre numéro de SIRET, mentions légales auto-entrepreneur intégrées, signature électronique native. Votre client ne fait pas la différence avec une PME de 10 personnes." },
  { q: "Peut-on connecter Proprely à mon comptable / mon URSSAF ?", a: "Oui. Devis et factures exportables en CSV ou PDF pour votre comptable. Connexion native Pennylane en finalisation. Pour l'URSSAF, vous saisissez normalement vos revenus, Proprely ne s'y substitue pas." },
  { q: "Que se passe-t-il quand j'embauche mon premier salarié ?", a: "Proprely bascule vers le mode multi-agents sans rupture. Vos données restent, vous ajoutez les profils agents. La transition d'auto-entrepreneur à TPE/EURL est fluide." },
  { q: "Combien de temps pour la mise en route ?", a: "30 minutes lors d'un appel avec le fondateur. Vos clients, prestations et créneaux sont importés. À la fin de l'appel, vous êtes opérationnel." },
  { q: "Faut-il un logiciel pour seulement 2-3 clients ?", a: "Probablement non. Un template Word (devis) + Excel (planning) suffit. Voir nos modèles gratuits sur /ressources. Dès 5+ clients récurrents, vous récupérez vraiment du temps avec un outil pro." },
]

function injectSchema() {
  const id = 'auto-entrepreneur-schema'
  document.getElementById(id)?.remove()
  const today = new Date().toISOString().slice(0, 10)
  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: TITLE,
      description: DESCRIPTION,
      url: URL,
      inLanguage: 'fr-FR',
      datePublished: '2026-01-01',
      dateModified: today,
      isPartOf: { '@type': 'WebSite', '@id': 'https://proprely.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://proprely.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Logiciel auto-entrepreneur nettoyage', item: URL },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.id = id
  script.text = JSON.stringify(schemas)
  document.head.appendChild(script)
}

export default function AutoEntrepreneurLanding() {
  const remaining = remainingSpots()

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
      document.getElementById('auto-entrepreneur-schema')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-white pt-12 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <Breadcrumbs items={[{ name: 'Logiciel auto-entrepreneur nettoyage' }]} className="mb-6 justify-center inline-flex" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-5"
            >
              <Sparkles size={12} />
              Pour les indépendants du nettoyage
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6"
            >
              Logiciel auto-entrepreneur nettoyage :<br />
              <span className="text-blue-600">gérer seul sans se perdre</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Vous êtes auto-entrepreneur ou solo en nettoyage. Vous portez tout : devis, planning, facturation, relances. Proprely vous fait gagner 1 à 3 heures par semaine et vous donne l'image d'une vraie société pro — sans ce coût.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/beta"
                className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center justify-center gap-2"
              >
                Candidater à la bêta gratuite
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/ressources"
                className="bg-white border border-slate-200 text-slate-700 rounded-xl px-6 py-3.5 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Voir les modèles gratuits
              </Link>
            </motion.div>
            <p className="text-xs text-slate-500 mt-4">{remaining} places sur {FOUNDER_SPOTS.total} · Sans carte bancaire</p>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
              Le quotidien d'un auto-entrepreneur en nettoyage
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Quand vous êtes seul à porter votre activité, chaque heure passée en admin est une heure de moins en chantier ou en prospection. Et chaque oubli coûte cher : un devis qui traîne, une facture qui passe à la trappe, un client mécontent.
            </p>
            <ul className="space-y-3">
              {challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 bg-slate-50 rounded-xl p-4">
                  <X size={18} className="text-red-400 mt-0.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Pensé solo</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Ce que Proprely fait pour vous
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Pas besoin de tous les modules d'une PME. Vous activez ce qui sert vraiment quand on est seul.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-y border-slate-100 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5">
              Avant : 5-6h d'admin par semaine
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Devis sur Word, planning sur Excel, factures sur un autre fichier, relances dans votre boîte mail. Vous y consacrez le samedi matin ou le dimanche soir. Pendant ce temps, vous ne prospectez pas.
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-5 mt-10">
              Avec Proprely : 1h30 par semaine
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Devis en 2 minutes, factures auto depuis le devis signé, planning visible sur téléphone, relances automatiques. Vous récupérez 4 à 5 heures par semaine. À 30 €/heure de travail réel, c'est 600 €/mois récupérés.
            </p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Gratuit pendant la bêta privée</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    30 sociétés fondatrices, incluant des auto-entrepreneurs sélectionnés. Accès complet pendant toute la bêta, tarif fondateur garanti à vie après le lancement public.
                  </p>
                  <Link
                    to="/beta"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Candidater
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={16} className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 tracking-tight">
              Vos questions sur Proprely en solo
            </h2>
            <div className="bg-white border border-slate-100 rounded-2xl divide-y divide-slate-100">
              {faq.map((f, i) => (
                <details key={i} className="group p-5 sm:p-6 cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 font-bold text-slate-900 list-none">
                    <span className="text-sm sm:text-base group-open:text-blue-700 transition-colors">{f.q}</span>
                    <span className="text-blue-600 text-xs group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20 border-t border-slate-100 bg-slate-950 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-5 leading-tight">
              Prêt à arrêter de tout porter seul ?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              30 places fondateurs, accès gratuit pendant la bêta, tarif privilégié à vie. Onboarding 30 min avec le fondateur.
            </p>
            <Link
              to="/beta"
              className="group bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2"
            >
              Candidater à la bêta
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
