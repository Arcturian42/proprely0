import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

const BRAND_BLUE = '#2563EB'
const BRAND_DARK = '#1E3A8A'
const BRAND_SKY = '#38BDF8'

function iconSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" ry="112" fill="url(#g)"/>
  <path d="M 152 100 L 152 412 L 220 412 L 220 296 L 296 296 C 374 296 416 252 416 196 C 416 140 374 100 296 100 Z M 220 168 L 290 168 C 326 168 348 178 348 196 C 348 218 326 228 290 228 L 220 228 Z" fill="#FFFFFF"/>
</svg>`
}

function ogImageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_SKY}"/>
    </linearGradient>
    <linearGradient id="iconG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
    <linearGradient id="mockHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>

  <circle cx="100" cy="80" r="200" fill="${BRAND_BLUE}" fill-opacity="0.08"/>
  <circle cx="1180" cy="560" r="240" fill="${BRAND_SKY}" fill-opacity="0.08"/>

  <rect x="60" y="50" width="56" height="56" rx="14" ry="14" fill="url(#iconG)"/>
  <path d="M 76 66 L 76 92 L 82 92 L 82 82 L 90 82 C 96 82 100 78 100 73 C 100 68 96 66 90 66 Z M 82 71 L 89 71 C 91 71 93 71.5 93 73 C 93 75 91 76 89 76 L 82 76 Z" fill="#FFFFFF"/>
  <text x="135" y="89" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="32" font-weight="800" fill="#0F172A" letter-spacing="-0.5">Proprely</text>

  <g transform="translate(680, 130)">
    <rect x="0" y="0" width="460" height="380" rx="20" ry="20" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="0" y="0" width="460" height="38" rx="20" ry="20" fill="url(#mockHead)"/>
    <rect x="0" y="20" width="460" height="18" fill="url(#mockHead)"/>
    <circle cx="22" cy="19" r="5" fill="#FCA5A5"/>
    <circle cx="42" cy="19" r="5" fill="#FCD34D"/>
    <circle cx="62" cy="19" r="5" fill="#86EFAC"/>

    <rect x="0" y="38" width="120" height="342" fill="#F8FAFC"/>
    <rect x="14" y="56" width="92" height="10" rx="5" fill="#0F172A"/>
    <rect x="14" y="74" width="60" height="6" rx="3" fill="#94A3B8"/>

    <rect x="14" y="100" width="92" height="22" rx="6" fill="${BRAND_BLUE}"/>
    <rect x="14" y="130" width="92" height="22" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
    <rect x="14" y="160" width="92" height="22" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
    <rect x="14" y="190" width="92" height="22" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
    <rect x="14" y="220" width="92" height="22" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
    <rect x="14" y="250" width="92" height="22" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>

    <rect x="140" y="60" width="160" height="14" rx="4" fill="#0F172A"/>
    <rect x="140" y="82" width="100" height="8" rx="3" fill="#94A3B8"/>

    <rect x="140" y="110" width="95" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
    <rect x="150" y="120" width="50" height="6" rx="3" fill="#94A3B8"/>
    <rect x="150" y="134" width="70" height="14" rx="3" fill="#0F172A"/>
    <rect x="150" y="156" width="40" height="6" rx="3" fill="#10B981"/>

    <rect x="245" y="110" width="95" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
    <rect x="255" y="120" width="50" height="6" rx="3" fill="#94A3B8"/>
    <rect x="255" y="134" width="60" height="14" rx="3" fill="#0F172A"/>
    <rect x="255" y="156" width="40" height="6" rx="3" fill="#10B981"/>

    <rect x="350" y="110" width="95" height="60" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
    <rect x="360" y="120" width="50" height="6" rx="3" fill="#94A3B8"/>
    <rect x="360" y="134" width="50" height="14" rx="3" fill="#0F172A"/>
    <rect x="360" y="156" width="40" height="6" rx="3" fill="#10B981"/>

    <rect x="140" y="190" width="305" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="156" cy="208" r="6" fill="${BRAND_BLUE}"/>
    <rect x="170" y="200" width="120" height="7" rx="3" fill="#0F172A"/>
    <rect x="170" y="213" width="80" height="5" rx="2" fill="#94A3B8"/>
    <rect x="400" y="200" width="30" height="14" rx="7" fill="#DBEAFE"/>

    <rect x="140" y="232" width="305" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="156" cy="250" r="6" fill="#10B981"/>
    <rect x="170" y="242" width="100" height="7" rx="3" fill="#0F172A"/>
    <rect x="170" y="255" width="70" height="5" rx="2" fill="#94A3B8"/>
    <rect x="400" y="242" width="30" height="14" rx="7" fill="#D1FAE5"/>

    <rect x="140" y="274" width="305" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="156" cy="292" r="6" fill="#94A3B8"/>
    <rect x="170" y="284" width="110" height="7" rx="3" fill="#0F172A"/>
    <rect x="170" y="297" width="60" height="5" rx="2" fill="#94A3B8"/>
    <rect x="400" y="284" width="30" height="14" rx="7" fill="#F1F5F9"/>

    <rect x="140" y="316" width="305" height="36" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="156" cy="334" r="6" fill="#94A3B8"/>
    <rect x="170" y="326" width="90" height="7" rx="3" fill="#0F172A"/>
    <rect x="170" y="339" width="50" height="5" rx="2" fill="#94A3B8"/>
    <rect x="400" y="326" width="30" height="14" rx="7" fill="#F1F5F9"/>
  </g>

  <text x="60" y="220" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="56" font-weight="900" fill="#0F172A" letter-spacing="-1.5">Le cockpit métier</text>
  <text x="60" y="285" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="56" font-weight="900" fill="#0F172A" letter-spacing="-1.5">des sociétés de nettoyage</text>
  <text x="60" y="350" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="56" font-weight="900" fill="url(#brand)" letter-spacing="-1.5">qui veulent scaler.</text>

  <rect x="60" y="395" width="225" height="38" rx="19" fill="${BRAND_BLUE}" fill-opacity="0.10"/>
  <circle cx="78" cy="414" r="5" fill="${BRAND_BLUE}"/>
  <text x="92" y="420" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="18" font-weight="700" fill="${BRAND_BLUE}">Bêta privée — 30 places</text>

  <rect x="60" y="540" width="1080" height="1" fill="#E2E8F0"/>
  <text x="60" y="585" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="22" font-weight="600" fill="#475569">proprely.fr</text>
  <text x="1140" y="585" text-anchor="end" font-family="Inter, system-ui, -apple-system, Segoe UI, sans-serif" font-size="22" font-weight="500" fill="#94A3B8">Hébergement Europe · RGPD · SSL</text>
</svg>`
}

function render(svg, outName, opts = {}) {
  const resvg = new Resvg(svg, {
    fitTo: opts.fitTo,
    font: { loadSystemFonts: true },
    background: opts.background || 'rgba(0,0,0,0)',
  })
  const pngData = resvg.render().asPng()
  const path = resolve(publicDir, outName)
  writeFileSync(path, pngData)
  console.log(`✓ ${outName} (${pngData.length} bytes)`)
}

console.log('Generating Proprely assets...\n')

const icon512 = iconSvg(512)

render(icon512, 'proprely-icon-512.png', { fitTo: { mode: 'width', value: 512 } })
render(icon512, 'apple-touch-icon.png', { fitTo: { mode: 'width', value: 180 } })
render(icon512, 'favicon-32.png', { fitTo: { mode: 'width', value: 32 } })
render(icon512, 'favicon-16.png', { fitTo: { mode: 'width', value: 16 } })

writeFileSync(resolve(publicDir, 'favicon.svg'), iconSvg(512))
console.log('✓ favicon.svg (vector)')

render(ogImageSvg(), 'og-image.png', { fitTo: { mode: 'width', value: 1200 }, background: '#FFFFFF' })

console.log('\nDone.')
