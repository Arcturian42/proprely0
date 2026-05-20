import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Euro, TrendingUp, Calendar } from 'lucide-react'
import PageNav from '../components/PageNav'
import Breadcrumbs from '../components/Breadcrumbs'
import Footer from '../sections/Footer'
import Link from '../components/Link'

const PROPRELY_TIME_SAVING = 0.6
const WEEKS_PER_YEAR = 47

type SliderProps = {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (n: number) => void
}

function Slider({ label, value, min, max, step = 1, suffix, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <div className="text-2xl font-black text-slate-900">
          {value.toLocaleString('fr-FR')}
          <span className="text-base text-slate-500 font-bold ml-1">{suffix}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  )
}

export default function RoiCalculator() {
  const [agents, setAgents] = useState(12)
  const [adminHoursPerWeek, setAdminHoursPerWeek] = useState(10)
  const [hourlyCost, setHourlyCost] = useState(45)

  const yearlyLost = useMemo(() => adminHoursPerWeek * WEEKS_PER_YEAR, [adminHoursPerWeek])
  const yearlyLostEuros = useMemo(() => yearlyLost * hourlyCost, [yearlyLost, hourlyCost])
  const yearlyHoursSaved = useMemo(() => Math.round(yearlyLost * PROPRELY_TIME_SAVING), [yearlyLost])
  const yearlySaved = useMemo(() => Math.round(yearlyHoursSaved * hourlyCost), [yearlyHoursSaved, hourlyCost])
  const workDaysSaved = useMemo(() => Math.round(yearlyHoursSaved / 7), [yearlyHoursSaved])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageNav />

      <main className="flex-1">
        <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
          <div className="absolute top-10 -left-32 w-[28rem] h-[28rem] rounded-full bg-blue-100/40 blur-3xl pointer-events-none animate-blob-1" />
          <div className="absolute top-40 -right-32 w-[28rem] h-[28rem] rounded-full bg-sky-100/40 blur-3xl pointer-events-none animate-blob-2" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex justify-center mb-5">
              <Breadcrumbs items={[{ name: 'Calculateur ROI' }]} />
            </div>
            <div className="text-center mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-5">
                <TrendingUp size={14} />
                Calculateur ROI
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5 leading-tight">
                Combien vous coûte<br />
                <span className="text-blue-600">la dispersion de vos outils ?</span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Ajustez les curseurs selon votre situation. Le calcul est instantané, basé sur les benchmarks du secteur de la propreté B2B.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Votre situation</h2>
                <div className="space-y-8">
                  <Slider label="Nombre d'agents" value={agents} min={3} max={50} suffix=" agents" onChange={setAgents} />
                  <Slider label="Heures admin / semaine" value={adminHoursPerWeek} min={2} max={25} suffix="h" onChange={setAdminHoursPerWeek} />
                  <Slider label="Coût horaire admin" value={hourlyCost} min={25} max={80} step={5} suffix=" €" onChange={setHourlyCost} />
                </div>
                <p className="text-[11px] text-slate-500 mt-8 leading-relaxed">
                  L'estimation se base sur 47 semaines travaillées par an et un gain de temps moyen de 60% selon les benchmarks sectoriels (réduction de la saisie manuelle, automatisation du planning, preuve de passage).
                </p>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <motion.div
                  key={`lost-${yearlyLost}`}
                  initial={{ scale: 0.98, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                      <Clock size={14} />
                      Ce que vous perdez aujourd'hui
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-red-700">{yearlyLost.toLocaleString('fr-FR')} h</div>
                      <div className="text-xs text-red-600/80 mt-1">par an en administration</div>
                    </div>
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-red-700">{yearlyLostEuros.toLocaleString('fr-FR')} €</div>
                      <div className="text-xs text-red-600/80 mt-1">de coût caché annuel</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key={`saved-${yearlyHoursSaved}`}
                  initial={{ scale: 0.98, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-br from-blue-600 to-sky-600 rounded-2xl p-6 sm:p-7 text-white overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-100 mb-3">
                      <TrendingUp size={14} />
                      Ce que Proprely vous rendrait
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <div className="text-3xl sm:text-4xl font-black">{yearlyHoursSaved.toLocaleString('fr-FR')} h</div>
                        <div className="text-xs text-sky-100 mt-1">récupérées par an</div>
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl font-black">{yearlySaved.toLocaleString('fr-FR')} €</div>
                        <div className="text-xs text-sky-100 mt-1">économisés par an</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-white/20 text-sm">
                      <Calendar size={14} />
                      <span>Soit environ <strong>{workDaysSaved} journées de travail</strong> par an que vous récupérez pour piloter votre activité.</span>
                    </div>
                  </div>
                </motion.div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Euro size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900 mb-1">Pendant la bêta, c'est 100% gratuit</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Vous commencez à récupérer ces heures dès la première semaine, sans engagement et sans carte bancaire. Les fondateurs gardent un tarif privilégié à vie après la bêta.
                    </p>
                  </div>
                  <Link
                    to="/"
                    hash="formulaire"
                    className="group bg-blue-600 text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] inline-flex items-center gap-2 shrink-0"
                  >
                    Rejoindre la bêta
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { value: agents, label: "Agents pilotés depuis un seul outil", suffix: '' },
                { value: Math.round(adminHoursPerWeek * PROPRELY_TIME_SAVING), label: "Heures récupérées chaque semaine", suffix: 'h' },
                { value: 30, label: "Minutes pour la mise en route", suffix: ' min' },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="text-3xl font-black text-blue-600 mb-1">
                    {c.value}{c.suffix}
                  </div>
                  <div className="text-xs text-slate-600">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
