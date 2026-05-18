import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Calendar, Users, Building2, ClipboardList, FileText, FolderOpen, ArrowRight, CheckCircle, AlertTriangle, QrCode, Camera, Signature, FileSignature, Receipt, FileBadge, FileLock, FileCheck, Sparkles, MapPin, Battery, CalendarClock, Wand2 } from 'lucide-react'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

type Module = {
  id: string
  icon: typeof LayoutDashboard
  tab: string
  benefit: string
  desc: string
  preview: ReactNode
  roadmap?: boolean
}

const ClientsPreview = () => (
  <div className="space-y-2.5">
    {[
      { name: 'SCI Atrium', sites: '3 sites · 4 prestations', freq: 'Quotidien', tag: 'B2B' },
      { name: 'Hôtel Vivaldi', sites: '1 site · 2 prestations', freq: '3x / semaine', tag: 'B2B' },
      { name: 'Syndic Foch', sites: '8 immeubles · 12 prestations', freq: 'Hebdomadaire', tag: 'Syndic' },
      { name: 'Cabinet médical Dr Mercier', sites: '1 site · 1 prestation', freq: 'Quotidien', tag: 'B2B' },
    ].map((c) => (
      <div key={c.name} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <Building2 size={16} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-900 truncate">{c.name}</div>
          <div className="text-[11px] text-slate-500">{c.sites}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] font-semibold text-slate-700">{c.freq}</div>
          <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 rounded px-1.5 py-0.5">{c.tag}</span>
        </div>
      </div>
    ))}
  </div>
)

const AgentsPreview = () => (
  <div className="grid grid-cols-2 gap-2.5">
    {[
      { name: 'Marie L.', spec: 'Vitrerie · Bureaux', hours: 142, max: 151, alert: false },
      { name: 'Karim B.', spec: 'Décapage · Moquette', hours: 148, max: 151, alert: true },
      { name: 'Sofia D.', spec: 'Quotidien · Hôtels', hours: 96, max: 151, alert: false },
      { name: 'Antoine R.', spec: 'Remise en état', hours: 134, max: 151, alert: false },
    ].map((a) => (
      <div key={a.name} className="p-3 bg-white border border-slate-100 rounded-lg">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
            {a.name.split(' ').map(s => s[0]).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">{a.name}</div>
            <div className="text-[10px] text-slate-500 truncate">{a.spec}</div>
          </div>
          {a.alert && <AlertTriangle size={12} className="text-amber-500 shrink-0" />}
        </div>
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-slate-500">{a.hours}h / {a.max}h</span>
          <span className={`font-semibold ${a.alert ? 'text-amber-600' : 'text-emerald-600'}`}>{Math.round((a.hours / a.max) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${a.alert ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${(a.hours / a.max) * 100}%` }} />
        </div>
      </div>
    ))}
  </div>
)

const PlanningPreview = () => (
  <div>
    <div className="grid grid-cols-6 gap-1 mb-2 text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
      <div></div>
      {['L', 'M', 'M', 'J', 'V'].map((d, i) => (
        <div key={i} className="text-center">{d}</div>
      ))}
    </div>
    {[
      { name: 'Marie L.', slots: [{ d: 0, color: 'bg-blue-500' }, { d: 1, color: 'bg-blue-500' }, { d: 2, color: 'bg-sky-500' }, { d: 4, color: 'bg-blue-500' }] },
      { name: 'Karim B.', slots: [{ d: 0, color: 'bg-emerald-500' }, { d: 2, color: 'bg-emerald-500' }, { d: 3, color: 'bg-blue-500' }, { d: 4, color: 'bg-blue-500' }] },
      { name: 'Sofia D.', slots: [{ d: 1, color: 'bg-blue-500' }, { d: 2, color: 'bg-amber-500' }, { d: 3, color: 'bg-blue-500' }] },
      { name: 'Antoine R.', slots: [{ d: 0, color: 'bg-sky-500' }, { d: 3, color: 'bg-emerald-500' }, { d: 4, color: 'bg-sky-500' }] },
    ].map((row) => (
      <div key={row.name} className="grid grid-cols-6 gap-1 mb-1.5 items-center">
        <div className="text-[10px] font-semibold text-slate-700 truncate">{row.name}</div>
        {[0, 1, 2, 3, 4].map((d) => {
          const slot = row.slots.find(s => s.d === d)
          return (
            <div key={d} className="h-6 rounded bg-slate-100 relative overflow-hidden">
              {slot && <div className={`absolute inset-0 ${slot.color} opacity-90 rounded`} />}
            </div>
          )
        })}
      </div>
    ))}
    <div className="flex items-center gap-3 mt-3 text-[9px] text-slate-500">
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Récurrent</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500" /> Vitrerie</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500" /> Décapage</span>
    </div>
  </div>
)

const MissionsPreview = () => (
  <div className="space-y-2.5">
    {[
      { site: 'Bureaux Atrium · Tour A', agent: 'Marie L.', time: '07:00 - 09:30', status: 'Terminé', statusBg: 'bg-emerald-50 text-emerald-700', icons: [QrCode, Camera, Signature] },
      { site: 'Hôtel Vivaldi · Étages 4-6', agent: 'Karim B.', time: '10:00 - 12:00', status: 'En cours', statusBg: 'bg-blue-50 text-blue-700', icons: [QrCode, Camera] },
      { site: 'Cabinet médical Dr Mercier', agent: 'Sofia D.', time: '14:00 - 15:30', status: 'À venir', statusBg: 'bg-slate-100 text-slate-600', icons: [] },
    ].map((m, i) => (
      <div key={i} className="p-3 bg-white border border-slate-100 rounded-lg">
        <div className="flex items-start justify-between mb-2">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-slate-900 truncate">{m.site}</div>
            <div className="text-[11px] text-slate-500">{m.agent} · {m.time}</div>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 shrink-0 ${m.statusBg}`}>{m.status}</span>
        </div>
        {m.icons.length > 0 && (
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
            {m.icons.map((Icon, j) => (
              <div key={j} className="flex items-center gap-1 text-[10px] text-slate-500">
                <Icon size={11} className="text-blue-600" />
                <span>{Icon === QrCode ? 'QR scanné' : Icon === Camera ? '4 photos' : 'Signé'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
)

const DevisPreview = () => (
  <div className="space-y-2">
    {[
      { type: 'Devis', ref: 'DV-2024-087', client: 'SCI Atrium - Tour B', amount: '4 280 €', status: 'Envoyé', color: 'bg-blue-50 text-blue-700' },
      { type: 'Facture', ref: 'FAC-2024-142', client: 'Hôtel Vivaldi', amount: '2 850 €', status: 'Payée', color: 'bg-emerald-50 text-emerald-700' },
      { type: 'Facture', ref: 'FAC-2024-141', client: 'Syndic Foch', amount: '3 940 €', status: 'En retard', color: 'bg-red-50 text-red-700' },
      { type: 'Devis', ref: 'DV-2024-086', client: 'Cabinet médical', amount: '1 250 €', status: 'Signé', color: 'bg-emerald-50 text-emerald-700' },
    ].map((d, i) => (
      <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          {d.type === 'Devis' ? <FileSignature size={16} className="text-blue-600" /> : <Receipt size={16} className="text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{d.type}</span>
            <span className="text-[10px] text-slate-400 font-mono">{d.ref}</span>
          </div>
          <div className="text-sm font-bold text-slate-900 truncate">{d.client}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-bold text-slate-900">{d.amount}</div>
          <span className={`text-[9px] font-bold uppercase tracking-wider rounded px-1.5 py-0.5 ${d.color}`}>{d.status}</span>
        </div>
      </div>
    ))}
  </div>
)

const DocumentsPreview = () => (
  <div className="space-y-2">
    {[
      { name: 'Contrat SCI Atrium 2024', type: 'Contrat', date: '12 sept.', icon: FileBadge },
      { name: 'Fiche sécurité décapage', type: 'Sécurité', date: '04 sept.', icon: FileLock },
      { name: 'Attestation URSSAF Q3', type: 'Légal', date: '28 août', icon: FileCheck },
      { name: 'Avenant Hôtel Vivaldi', type: 'Contrat', date: '15 août', icon: FileBadge },
      { name: 'PV intervention - Cab. Mercier', type: 'Rapport', date: '14 août', icon: FileText },
    ].map((d, i) => (
      <div key={i} className="flex items-center gap-3 p-2.5 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
          <d.icon size={16} className="text-blue-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-slate-900 truncate">{d.name}</div>
          <div className="text-[11px] text-slate-500">{d.type}</div>
        </div>
        <div className="text-[10px] text-slate-400 shrink-0">{d.date}</div>
      </div>
    ))}
  </div>
)

const PilotagePreview = () => (
  <div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[
        { label: 'CA mois', value: '24 380 €', trend: '+12%', color: 'text-emerald-600' },
        { label: 'Marge', value: '31%', trend: '+3pt', color: 'text-emerald-600' },
        { label: 'Heures', value: '687 h', trend: '94%', color: 'text-slate-500' },
      ].map((k) => (
        <div key={k.label} className="bg-white rounded-lg p-3 border border-slate-100">
          <div className="text-[9px] uppercase text-slate-500 mb-1 tracking-wider">{k.label}</div>
          <div className="text-base font-black text-slate-900">{k.value}</div>
          <div className={`text-[10px] font-semibold mt-0.5 ${k.color}`}>{k.trend}</div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-lg p-3 border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-bold text-slate-900">Marge par client</div>
        <div className="text-[9px] text-slate-500">Sept. 2024</div>
      </div>
      <div className="space-y-2">
        {[
          { name: 'SCI Atrium', margin: 38, color: 'bg-emerald-500' },
          { name: 'Hôtel Vivaldi', margin: 32, color: 'bg-emerald-500' },
          { name: 'Syndic Foch', margin: 24, color: 'bg-amber-500' },
          { name: 'Cabinet Dr Mercier', margin: 8, color: 'bg-red-500' },
        ].map((c) => (
          <div key={c.name} className="flex items-center gap-2 text-[10px]">
            <div className="w-20 truncate text-slate-700 font-medium">{c.name}</div>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${c.color} rounded-full`} style={{ width: `${(c.margin / 40) * 100}%` }} />
            </div>
            <div className="w-9 text-right font-bold text-slate-900">{c.margin}%</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const IAPreview = () => (
  <div className="space-y-3">
    <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-xl p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Wand2 size={12} className="text-violet-600" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700">Devis intelligent</span>
        </div>
        <span className="text-[9px] font-bold text-violet-600 bg-white rounded px-1.5 py-0.5">IA</span>
      </div>
      <div className="text-xs text-slate-700 mb-2 leading-snug">
        Créez vos devis en quelques secondes et optimisez vos marges.
      </div>
      <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-violet-100">
        <div>
          <div className="text-base font-black text-slate-900">4 320 €</div>
          <div className="text-[9px] text-slate-500">selon votre historique et le marché</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-emerald-600 font-bold">+12% marge</div>
          <div className="text-[9px] text-slate-400">vs vos prix actuels</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-2.5">
      <div className="bg-white border border-slate-100 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin size={11} className="text-blue-600" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700">Prospection IA</span>
        </div>
        <div className="text-[10px] text-slate-600 leading-tight mb-2">On vous trouve des prospects à fort potentiel.</div>
        <div className="flex items-baseline gap-1.5">
          <div className="text-base font-black text-slate-900">12</div>
          <div className="text-[9px] text-slate-500">notés 9/10 cette semaine</div>
        </div>
        <div className="flex gap-0.5 mt-2">
          {[9.6, 9.4, 9.2, 9.0, 8.9].map((s, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-blue-100 overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: `${(s / 10) * 100}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <CalendarClock size={11} className="text-emerald-600" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700">Planning auto</span>
        </div>
        <div className="text-[10px] text-slate-700 leading-tight mb-1">
          <span className="font-bold">Karim absent</span> demain
        </div>
        <div className="text-[10px] text-slate-700 leading-tight mb-1.5">
          → propose <span className="font-bold text-emerald-700">Antoine R.</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 rounded px-1 py-0.5">96% match</span>
        </div>
      </div>
    </div>

    <div className="bg-white border border-amber-200 rounded-xl p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Battery size={12} className="text-amber-600" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Fatigue prédictive</span>
        </div>
        <span className="text-[9px] font-bold text-amber-700 bg-amber-50 rounded px-1.5 py-0.5">Alerte</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white text-[10px] font-bold shrink-0">KB</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-slate-900">Karim B.</div>
          <div className="text-[10px] text-slate-500">Risque élevé d'épuisement sous 12 jours</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-base font-black text-amber-600">7.8</div>
          <div className="text-[9px] text-slate-400">/10</div>
        </div>
      </div>
    </div>
  </div>
)

const modules: Module[] = [
  { id: 'clients', icon: Building2, tab: 'Clients & sites', benefit: 'Plus jamais perdu dans vos prestations', desc: "Toutes vos prestations organisées par client et par site. Historique, contrats, fréquences, contacts.", preview: <ClientsPreview /> },
  { id: 'agents', icon: Users, tab: 'Agents', benefit: 'Gardez vos meilleurs agents', desc: "Profils avec spécialités (vitrerie, moquette, décapage), charge horaire, alertes de surmenage automatiques.", preview: <AgentsPreview /> },
  { id: 'planning', icon: Calendar, tab: 'Planning', benefit: '30 min gagnées chaque matin', desc: "Vue calendrier centralisée. Affectation 1-clic selon spécialité et disponibilité. Remplacements maîtrisés.", preview: <PlanningPreview /> },
  { id: 'missions', icon: ClipboardList, tab: 'Missions', benefit: 'Preuve de passage à chaque intervention', desc: "Récurrences, check-in QR code, photos avant/après, signatures clients. Fin des litiges sur les heures.", preview: <MissionsPreview /> },
  { id: 'devis', icon: FileText, tab: 'Devis & factures', benefit: 'Devis envoyés en 2 minutes', desc: "Devis professionnels générés avec votre logo. Suivi des relances, alerte impayés, factures en 2 clics.", preview: <DevisPreview /> },
  { id: 'documents', icon: FolderOpen, tab: 'Documents', benefit: 'Tout retrouver en 5 secondes', desc: "Contrats, fiches sécurité, attestations URSSAF, fiches de poste, classés, centralisés, accessibles.", preview: <DocumentsPreview /> },
  { id: 'pilotage', icon: LayoutDashboard, tab: 'Pilotage', benefit: 'Votre vraie marge, en temps réel', desc: "CA, heures et marge par client et par site. Vous ne découvrez plus la rentabilité 45 jours après.", preview: <PilotagePreview /> },
  { id: 'ia', icon: Sparkles, tab: 'IA', benefit: "L'intelligence qui anticipe à votre place", desc: "Devis suggérés au juste prix selon votre historique, prospects locaux scorés, propositions de remplacement automatiques selon spécialité et distance, alerte de fatigue avant le burn-out. L'IA embarquée fait gagner du temps sur les décisions, pas seulement sur la saisie.", preview: <IAPreview />, roadmap: true },
]

export default function SolutionSection() {
  const [activeId, setActiveId] = useState(modules[0].id)
  const active = modules.find(m => m.id === activeId) ?? modules[0]

  return (
    <section id="solution" className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">La solution</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
            Sept outils, un seul écran.<br />Le métier du nettoyage, enfin centralisé.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Cliquez sur un module pour voir ce qu'il change concrètement dans votre quotidien.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {modules.map((m) => {
            const isActive = m.id === activeId
            return (
              <button
                key={m.id}
                onClick={() => setActiveId(m.id)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-600/25"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <m.icon size={14} />
                  {m.tab}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-stretch">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
                  <active.icon size={12} />
                  {active.tab}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                  {active.benefit}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {active.desc}
                </p>
                {active.roadmap ? (
                  <div className="flex items-center gap-2 text-sm text-violet-700 font-semibold">
                    <Sparkles size={14} />
                    Sur la feuille de route, livré pendant la bêta
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                    <CheckCircle size={14} />
                    Inclus dès l'accès bêta
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-300/20 to-sky-300/20 blur-2xl rounded-3xl pointer-events-none" />
              <div className="relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-[0_12px_40px_-12px_rgba(15,42,94,0.2)]">
                <div className="bg-white border-b border-slate-100 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                    <div className="w-2 h-2 rounded-full bg-emerald-300" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 ml-2">app.proprely.fr/{active.id}</div>
                </div>
                <div className="p-4 sm:p-5 min-h-[300px] sm:min-h-[360px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                    >
                      {active.preview}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-14">
          <button
            onClick={() => scrollTo('formulaire')}
            className="group inline-flex items-center gap-2 bg-blue-600 text-white rounded-xl px-7 py-3.5 font-bold text-sm hover:bg-blue-700 transition-[background-color,box-shadow,transform] duration-200 ease-[var(--ease-out)] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            Rejoindre la bêta gratuite
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200 ease-[var(--ease-out)]" />
          </button>
          <p className="text-xs text-slate-500 mt-3">Gratuit pendant la bêta · Pas de carte bancaire · Aucun engagement</p>
        </div>
      </div>
    </section>
  )
}
