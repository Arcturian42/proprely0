import { useState } from 'react'
import { Calendar, FileText, Eye, LayoutDashboard, Users, Sparkles } from 'lucide-react'

// Screenshots SVG des modules Proprely. Mockups réalistes basés sur l'UI
// du cockpit (planning, devis IA, preuve de passage, dashboard).
// Pas d'assets externes — tout en SVG inline pour scale parfait + customisation.

type Screen = {
  id: string
  label: string
  icon: typeof Calendar
  tagline: string
  Component: React.FC
}

// ─── Screen 1 : Cockpit Dashboard ──────────────────────────────────────
function CockpitMockup() {
  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Cockpit dirigeant Proprely : KPI, marges et alertes">
      <defs>
        <linearGradient id="cockpit-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id="cockpit-card-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect width="800" height="480" rx="8" fill="url(#cockpit-bg)" />

      {/* Sidebar */}
      <rect x="0" y="0" width="180" height="480" fill="#F8FAFC" />
      <rect x="14" y="18" width="20" height="20" rx="5" fill="#2563EB" />
      <text x="42" y="33" fontFamily="Inter, system-ui" fontSize="12" fontWeight="800" fill="#0F172A">Proprely</text>

      {/* Nav items */}
      <rect x="14" y="60" width="152" height="28" rx="6" fill="#2563EB" />
      <text x="36" y="78" fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#FFFFFF">Tableau de bord</text>

      {['Planning', 'Clients & sites', 'Agents', 'Devis & factures', 'Documents', 'Rapports'].map((item, i) => (
        <g key={item}>
          <text x="36" y={102 + i * 28} fontFamily="Inter, system-ui" fontSize="10" fontWeight="500" fill="#64748B">{item}</text>
        </g>
      ))}

      {/* Main content */}
      <text x="200" y="40" fontFamily="Inter, system-ui" fontSize="16" fontWeight="800" fill="#0F172A">Cockpit dirigeant</text>
      <text x="200" y="58" fontFamily="Inter, system-ui" fontSize="11" fill="#64748B">Vue d'ensemble · Mercredi 22 octobre 2026</text>

      {/* KPI cards row */}
      <g>
        {/* Card 1 */}
        <rect x="200" y="80" width="180" height="78" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <text x="216" y="100" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">CA MENSUEL</text>
        <text x="216" y="126" fontFamily="Inter, system-ui" fontSize="20" fontWeight="900" fill="#0F172A">24 380 €</text>
        <text x="216" y="146" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#16A34A">↑ +12 % vs M-1</text>
      </g>
      <g>
        {/* Card 2 — featured */}
        <rect x="395" y="80" width="180" height="78" rx="10" fill="url(#cockpit-card-blue)" />
        <text x="411" y="100" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#BFDBFE" letterSpacing="0.5">MARGE MOYENNE</text>
        <text x="411" y="126" fontFamily="Inter, system-ui" fontSize="20" fontWeight="900" fill="#FFFFFF">31 %</text>
        <text x="411" y="146" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#BFDBFE">↑ +3 pts vs M-1</text>
      </g>
      <g>
        {/* Card 3 */}
        <rect x="590" y="80" width="195" height="78" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <text x="606" y="100" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">HEURES CETTE SEMAINE</text>
        <text x="606" y="126" fontFamily="Inter, system-ui" fontSize="20" fontWeight="900" fill="#0F172A">687 h</text>
        <text x="606" y="146" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B">94 % capacité</text>
      </g>

      {/* Margin per client */}
      <text x="200" y="190" fontFamily="Inter, system-ui" fontSize="12" fontWeight="700" fill="#0F172A">Marge par client (top 6)</text>
      <text x="200" y="208" fontFamily="Inter, system-ui" fontSize="10" fill="#64748B">Octobre 2026 · contrats actifs</text>

      {[
        { name: 'Bureaux Atrium', value: 38, ca: '4 200 €', color: '#16A34A' },
        { name: 'Hôtel Vivaldi', value: 34, ca: '3 850 €', color: '#16A34A' },
        { name: 'Syndic Foch', value: 27, ca: '2 940 €', color: '#0EA5E9' },
        { name: 'Cabinet Dr Mercier', value: 22, ca: '1 780 €', color: '#0EA5E9' },
        { name: 'Coproprieté Marbeuf', value: 18, ca: '2 100 €', color: '#EAB308' },
        { name: 'Bureaux Lex', value: 11, ca: '3 050 €', color: '#EF4444' },
      ].map((row, i) => (
        <g key={row.name}>
          <text x="200" y={236 + i * 30} fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#0F172A">{row.name}</text>
          <rect x="350" y={224 + i * 30} width="280" height="16" rx="4" fill="#F1F5F9" />
          <rect x="350" y={224 + i * 30} width={row.value * 7} height="16" rx="4" fill={row.color} />
          <text x={350 + row.value * 7 + 12} y={236 + i * 30} fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#0F172A">{row.value} %</text>
          <text x="690" y={236 + i * 30} fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#64748B">{row.ca}</text>
        </g>
      ))}

      {/* Alert */}
      <rect x="200" y="430" width="585" height="34" rx="8" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1" />
      <circle cx="220" cy="447" r="6" fill="#F59E0B" />
      <text x="234" y="451" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#92400E">Alerte marge — Bureaux Lex : −5 pts depuis 3 mois. Voir le détail →</text>
    </svg>
  )
}

// ─── Screen 2 : Planning ──────────────────────────────────────────────
function PlanningMockup() {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']
  const agents = [
    { name: 'Marie L.', color: '#2563EB', missions: [1, 2, 4] },
    { name: 'Karim B.', color: '#0EA5E9', missions: [0, 1, 2, 3, 4] },
    { name: 'Sofia D.', color: '#10B981', missions: [0, 2, 3] },
    { name: 'Thomas R.', color: '#A855F7', missions: [1, 3, 4] },
    { name: 'Aïcha M.', color: '#F59E0B', missions: [0, 1, 2, 3] },
  ]

  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Planning agents Proprely : vue semaine avec affectations">
      <rect width="800" height="480" rx="8" fill="#FFFFFF" />

      {/* Top bar */}
      <text x="24" y="34" fontFamily="Inter, system-ui" fontSize="16" fontWeight="800" fill="#0F172A">Planning · Semaine 43</text>
      <text x="24" y="54" fontFamily="Inter, system-ui" fontSize="11" fill="#64748B">5 agents · 28 interventions planifiées · 168 h</text>

      {/* Filters */}
      <rect x="580" y="22" width="80" height="24" rx="6" fill="#F1F5F9" />
      <text x="595" y="38" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#475569">Tertiaire ▾</text>
      <rect x="670" y="22" width="106" height="24" rx="6" fill="#2563EB" />
      <text x="694" y="38" fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#FFFFFF">+ Nouvelle mission</text>

      {/* Days header */}
      {days.map((d, i) => (
        <g key={d}>
          <rect x={144 + i * 120} y="82" width="116" height="32" rx="6" fill="#F8FAFC" />
          <text x={202 + i * 120} y="103" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#0F172A">{d} {21 + i}</text>
        </g>
      ))}

      {/* Agent rows */}
      {agents.map((a, ri) => (
        <g key={a.name}>
          {/* Agent label */}
          <rect x="24" y={130 + ri * 60} width="112" height="48" rx="6" fill="#F8FAFC" />
          <circle cx="40" cy={154 + ri * 60} r="9" fill={a.color} />
          <text x="55" y={150 + ri * 60} fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#0F172A">{a.name}</text>
          <text x="55" y={164 + ri * 60} fontFamily="Inter, system-ui" fontSize="8" fill="#64748B">35 h cette semaine</text>

          {/* Mission cards per day */}
          {a.missions.map((di) => (
            <g key={di}>
              <rect
                x={144 + di * 120}
                y={130 + ri * 60}
                width="116"
                height="48"
                rx="6"
                fill={a.color}
                fillOpacity="0.10"
                stroke={a.color}
                strokeWidth="1"
              />
              <text x={152 + di * 120} y={145 + ri * 60} fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill={a.color}>07:00 - 09:30</text>
              <text x={152 + di * 120} y={158 + ri * 60} fontFamily="Inter, system-ui" fontSize="8" fill="#0F172A">Bureaux Atrium</text>
              <text x={152 + di * 120} y={170 + ri * 60} fontFamily="Inter, system-ui" fontSize="7" fill="#64748B">Tour A · 2h30</text>
            </g>
          ))}
        </g>
      ))}

      {/* Footer info bar */}
      <rect x="24" y="440" width="752" height="28" rx="6" fill="#EFF6FF" />
      <text x="40" y="458" fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#1E3A8A">Drag-and-drop · Affectation 1-clic · Vérification spécialités + charge horaire automatique</text>
    </svg>
  )
}

// ─── Screen 3 : Devis intelligent IA ──────────────────────────────────
function DevisMockup() {
  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Devis intelligent IA : 3 scénarios optimisés">
      <defs>
        <linearGradient id="devis-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect width="800" height="480" rx="8" fill="#FFFFFF" />

      <text x="24" y="34" fontFamily="Inter, system-ui" fontSize="16" fontWeight="800" fill="#0F172A">Devis intelligent IA</text>
      <text x="24" y="54" fontFamily="Inter, system-ui" fontSize="11" fill="#64748B">Société Atrium · Bureaux 480 m² · 5 j/sem</text>

      {/* IA Badge */}
      <rect x="630" y="22" width="146" height="26" rx="13" fill="url(#devis-gold)" />
      <circle cx="649" cy="35" r="5" fill="#FFFFFF" />
      <text x="660" y="39" fontFamily="Inter, system-ui" fontSize="10" fontWeight="800" fill="#FFFFFF">IA · 9 facteurs analysés</text>

      {/* 3 cards horizontal */}
      {[
        {
          label: 'Marge protégée',
          tag: 'Conservateur',
          price: '3 980 €',
          margin: '32 %',
          win: '58 %',
          color: '#10B981',
          subColor: '#D1FAE5',
        },
        {
          label: 'Gagner le contrat',
          tag: 'Recommandé',
          price: '3 480 €',
          margin: '24 %',
          win: '78 %',
          color: '#2563EB',
          subColor: '#DBEAFE',
        },
        {
          label: 'Upsell maximisé',
          tag: 'Premium',
          price: '4 850 €',
          margin: '38 %',
          win: '32 %',
          color: '#A855F7',
          subColor: '#F3E8FF',
        },
      ].map((s, i) => (
        <g key={s.label}>
          <rect
            x={24 + i * 256}
            y="84"
            width="240"
            height="320"
            rx="12"
            fill={i === 1 ? s.subColor : '#FFFFFF'}
            stroke={i === 1 ? s.color : '#E2E8F0'}
            strokeWidth={i === 1 ? '2' : '1'}
          />
          {/* Tag */}
          <rect x={40 + i * 256} y="100" width="80" height="22" rx="11" fill={s.color} />
          <text x={80 + i * 256} y="115" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="800" fill="#FFFFFF">{s.tag.toUpperCase()}</text>

          {/* Label */}
          <text x={40 + i * 256} y="150" fontFamily="Inter, system-ui" fontSize="14" fontWeight="800" fill="#0F172A">{s.label}</text>

          {/* Price */}
          <text x={40 + i * 256} y="200" fontFamily="Inter, system-ui" fontSize="32" fontWeight="900" fill="#0F172A">{s.price}</text>
          <text x={40 + i * 256} y="218" fontFamily="Inter, system-ui" fontSize="10" fill="#64748B">/ mois HT</text>

          {/* Stats */}
          <text x={40 + i * 256} y="260" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#64748B">Marge nette</text>
          <text x={210 + i * 256} y="260" textAnchor="end" fontFamily="Inter, system-ui" fontSize="12" fontWeight="800" fill={s.color}>{s.margin}</text>

          <text x={40 + i * 256} y="285" fontFamily="Inter, system-ui" fontSize="10" fontWeight="600" fill="#64748B">Proba signature</text>
          <text x={210 + i * 256} y="285" textAnchor="end" fontFamily="Inter, system-ui" fontSize="12" fontWeight="800" fill="#0F172A">{s.win}</text>

          {/* Bar */}
          <rect x={40 + i * 256} y="300" width="180" height="6" rx="3" fill="#F1F5F9" />
          <rect x={40 + i * 256} y="300" width={parseInt(s.win) * 1.8} height="6" rx="3" fill={s.color} />

          {/* CTA */}
          <rect x={40 + i * 256} y="340" width="200" height="36" rx="8" fill={i === 1 ? s.color : '#F8FAFC'} stroke={i === 1 ? 'none' : '#E2E8F0'} strokeWidth="1" />
          <text x={140 + i * 256} y="362" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill={i === 1 ? '#FFFFFF' : '#0F172A'}>
            {i === 1 ? "Choisir ce scénario" : "Voir le détail"}
          </text>
        </g>
      ))}

      {/* Bottom info */}
      <rect x="24" y="430" width="752" height="34" rx="8" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
      <circle cx="44" cy="447" r="6" fill="#F59E0B" />
      <text x="58" y="451" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#92400E">IA prend en compte : marché local, disponibilités, profil client, masse salariale chargée, consommables, marketing, structure.</text>
    </svg>
  )
}

// ─── Screen 4 : Preuve de passage (mobile) ────────────────────────────
function PreuvePassageMockup() {
  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Preuve de passage Proprely : QR code, photos avant/après, signature">
      <rect width="800" height="480" rx="8" fill="#F8FAFC" />

      {/* Phone frame */}
      <g transform="translate(110, 30)">
        <rect x="0" y="0" width="220" height="420" rx="28" fill="#0F172A" />
        <rect x="6" y="14" width="208" height="392" rx="22" fill="#FFFFFF" />

        {/* Status bar */}
        <text x="20" y="32" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#0F172A">09:42</text>
        <text x="180" y="32" textAnchor="end" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#0F172A">5G</text>

        {/* Header */}
        <text x="20" y="60" fontFamily="Inter, system-ui" fontSize="12" fontWeight="800" fill="#0F172A">Bureaux Atrium</text>
        <text x="20" y="75" fontFamily="Inter, system-ui" fontSize="9" fill="#64748B">Mission 07:00 - 09:30 · Tour A</text>

        {/* QR */}
        <rect x="20" y="90" width="184" height="78" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
        <g transform="translate(34, 100)">
          <rect width="56" height="56" rx="4" fill="#FFFFFF" />
          {/* Fake QR pattern déterministe pour éviter mismatch SSR/CSR */}
          {[...Array(8)].map((_, ri) =>
            [...Array(8)].map((_, ci) => {
              const hash = (ri * 7 + ci * 11 + ri * ci) % 5
              if (hash >= 3) return null
              return (
                <rect key={`${ri}-${ci}`} x={4 + ci * 6.5} y={4 + ri * 6.5} width="5" height="5" fill="#0F172A" />
              )
            })
          )}
        </g>
        <text x="100" y="118" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#1E40AF">QR scanné ✓</text>
        <text x="100" y="132" fontFamily="Inter, system-ui" fontSize="8" fill="#1E3A8A">Arrivée 07:02</text>
        <text x="100" y="146" fontFamily="Inter, system-ui" fontSize="8" fill="#1E3A8A">GPS validé</text>

        {/* Photos */}
        <text x="20" y="186" fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#0F172A">Photos avant / après</text>

        <g transform="translate(20, 196)">
          <rect width="86" height="60" rx="6" fill="#F1F5F9" />
          <text x="43" y="32" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B">AVANT</text>
          <text x="43" y="46" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="7" fill="#94A3B8">07:01</text>
        </g>
        <g transform="translate(116, 196)">
          <rect width="86" height="60" rx="6" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" />
          <text x="43" y="32" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#065F46">APRÈS</text>
          <text x="43" y="46" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="7" fill="#10B981">09:28</text>
        </g>

        {/* Signature */}
        <text x="20" y="280" fontFamily="Inter, system-ui" fontSize="10" fontWeight="700" fill="#0F172A">Signature client</text>
        <rect x="20" y="288" width="182" height="50" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M 30 320 Q 60 300 90 318 T 150 312" stroke="#0F172A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <text x="22" y="332" fontFamily="Inter, system-ui" fontSize="7" fill="#94A3B8">M. Dupont · Atrium · 09:30</text>

        {/* Submit */}
        <rect x="20" y="352" width="182" height="36" rx="8" fill="#10B981" />
        <text x="111" y="375" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="11" fontWeight="800" fill="#FFFFFF">Valider la mission</text>
      </g>

      {/* Right side : explanation cards */}
      <g transform="translate(390, 50)">
        <text fontFamily="Inter, system-ui" fontSize="16" fontWeight="800" fill="#0F172A">Fin des litiges syndic</text>
        <text y="22" fontFamily="Inter, system-ui" fontSize="11" fill="#64748B">3 éléments capturés à chaque mission, PV automatique envoyé sous 1h.</text>

        {[
          { title: 'QR code site', desc: 'Scan obligatoire en arrivée. GPS validé.' },
          { title: 'Photos avant/après', desc: 'Horodatées, géolocalisées. Compression auto.' },
          { title: 'Signature client', desc: 'Sur place ou par email post-mission.' },
        ].map((item, i) => (
          <g key={item.title} transform={`translate(0, ${60 + i * 80})`}>
            <rect width="380" height="64" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx="32" cy="32" r="14" fill="#DBEAFE" />
            <text x="32" y="36" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="10" fontWeight="900" fill="#1E40AF">{i + 1}</text>
            <text x="58" y="28" fontFamily="Inter, system-ui" fontSize="12" fontWeight="800" fill="#0F172A">{item.title}</text>
            <text x="58" y="46" fontFamily="Inter, system-ui" fontSize="10" fill="#64748B">{item.desc}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

// ─── Screen 5 : Gestion clients & sites ───────────────────────────────
function ClientsMockup() {
  return (
    <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="CRM Proprely : pipeline clients et marges">
      <rect width="800" height="480" rx="8" fill="#FFFFFF" />

      <text x="24" y="34" fontFamily="Inter, system-ui" fontSize="16" fontWeight="800" fill="#0F172A">Clients & sites</text>
      <text x="24" y="54" fontFamily="Inter, system-ui" fontSize="11" fill="#64748B">12 clients actifs · 38 sites · CA 2026 : 268 k€</text>

      {/* Pipeline stages */}
      <g transform="translate(24, 80)">
        {[
          { label: 'Prospects', count: 4, color: '#64748B' },
          { label: 'Devis envoyés', count: 6, color: '#0EA5E9' },
          { label: 'Signés', count: 12, color: '#10B981' },
          { label: 'Sites actifs', count: 38, color: '#2563EB' },
        ].map((s, i) => (
          <g key={s.label} transform={`translate(${i * 190}, 0)`}>
            <rect width="180" height="68" rx="10" fill="#F8FAFC" />
            <text x="16" y="22" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.4">{s.label.toUpperCase()}</text>
            <text x="16" y="50" fontFamily="Inter, system-ui" fontSize="26" fontWeight="900" fill="#0F172A">{s.count}</text>
            <circle cx="160" cy="34" r="4" fill={s.color} />
          </g>
        ))}
      </g>

      {/* Table */}
      <g transform="translate(24, 170)">
        <rect width="752" height="280" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

        {/* Table header */}
        <rect width="752" height="36" rx="10" fill="#F8FAFC" />
        <text x="20" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">CLIENT</text>
        <text x="240" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">SITES</text>
        <text x="320" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">CA / MOIS</text>
        <text x="440" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">MARGE</text>
        <text x="540" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">STATUT</text>
        <text x="700" y="23" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#64748B" letterSpacing="0.5">ACTION</text>

        {/* Rows */}
        {[
          { name: 'Société Atrium', sector: 'Tertiaire', sites: 3, ca: '4 200 €', margin: '38 %', mc: '#10B981', status: 'Actif', sc: '#10B981' },
          { name: 'Hôtel Vivaldi', sector: 'Hôtellerie', sites: 2, ca: '3 850 €', margin: '34 %', mc: '#10B981', status: 'Actif', sc: '#10B981' },
          { name: 'Syndic Foch', sector: 'Copropriété', sites: 12, ca: '2 940 €', margin: '27 %', mc: '#0EA5E9', status: 'Actif', sc: '#10B981' },
          { name: 'Cabinet Dr Mercier', sector: 'Médical', sites: 1, ca: '1 780 €', margin: '22 %', mc: '#0EA5E9', status: 'Actif', sc: '#10B981' },
          { name: 'Bureaux Lex', sector: 'Tertiaire', sites: 4, ca: '3 050 €', margin: '11 %', mc: '#EF4444', status: 'Alerte', sc: '#EF4444' },
          { name: 'Copro Marbeuf', sector: 'Copropriété', sites: 1, ca: '2 100 €', margin: '18 %', mc: '#EAB308', status: 'Actif', sc: '#10B981' },
        ].map((row, i) => (
          <g key={row.name} transform={`translate(0, ${56 + i * 36})`}>
            {i % 2 === 1 && <rect x="0" y="-12" width="752" height="36" fill="#F8FAFC" fillOpacity="0.4" />}
            <text x="20" y="6" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#0F172A">{row.name}</text>
            <text x="20" y="18" fontFamily="Inter, system-ui" fontSize="9" fill="#94A3B8">{row.sector}</text>
            <text x="240" y="12" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#0F172A">{row.sites}</text>
            <text x="320" y="12" fontFamily="Inter, system-ui" fontSize="11" fontWeight="700" fill="#0F172A">{row.ca}</text>
            <text x="440" y="12" fontFamily="Inter, system-ui" fontSize="11" fontWeight="800" fill={row.mc}>{row.margin}</text>
            <rect x="540" y="0" width="60" height="20" rx="10" fill={row.sc} fillOpacity="0.12" />
            <text x="570" y="14" textAnchor="middle" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill={row.sc}>{row.status}</text>
            <text x="700" y="13" fontFamily="Inter, system-ui" fontSize="9" fontWeight="700" fill="#2563EB">Ouvrir →</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

// ─── Showcase principal ───────────────────────────────────────────────

const SCREENS: Screen[] = [
  { id: 'cockpit', label: 'Cockpit dirigeant', icon: LayoutDashboard, tagline: 'KPI, marges, alertes en temps réel', Component: CockpitMockup },
  { id: 'planning', label: 'Planning agents', icon: Calendar, tagline: 'Drag-and-drop, spécialités, charge', Component: PlanningMockup },
  { id: 'devis', label: 'Devis intelligent IA', icon: Sparkles, tagline: '9 facteurs, 3 scénarios optimisés', Component: DevisMockup },
  { id: 'preuve', label: 'Preuve de passage', icon: Eye, tagline: 'QR, photos, signature', Component: PreuvePassageMockup },
  { id: 'clients', label: 'Clients & sites', icon: Users, tagline: 'Pipeline + marge par compte', Component: ClientsMockup },
]

type Props = {
  className?: string
  defaultScreen?: string
}

export default function ProductScreenshots({ className = '', defaultScreen = 'cockpit' }: Props) {
  const [active, setActive] = useState(defaultScreen)
  const screen = SCREENS.find((s) => s.id === active) ?? SCREENS[0]
  const ActiveScreen = screen.Component

  return (
    <div className={className}>
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {SCREENS.map((s) => {
          const Icon = s.icon
          const isActive = s.id === active
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon size={12} />
              {s.label}
            </button>
          )
        })}
      </div>

      {/* Tagline */}
      <p className="text-center text-sm text-slate-500 mb-4">
        <FileText size={11} className="inline mr-1 mb-0.5" />
        Aperçu produit — {screen.tagline}
      </p>

      {/* Browser frame */}
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute -inset-6 bg-gradient-to-br from-blue-400/15 via-sky-300/10 to-blue-500/15 blur-3xl rounded-[2.5rem] pointer-events-none" />
        <div className="relative bg-white rounded-2xl shadow-[0_20px_70px_-15px_rgba(15,42,94,0.20)] border border-slate-200/80 overflow-hidden">
          {/* Browser top bar */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-300" />
              <div className="w-3 h-3 rounded-full bg-amber-300" />
              <div className="w-3 h-3 rounded-full bg-emerald-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-500 font-mono">
                app.proprely.fr/{screen.id}
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Screen */}
          <div className="bg-white">
            <ActiveScreen />
          </div>
        </div>
      </div>
    </div>
  )
}
