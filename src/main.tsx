import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Évite le double H1 sur les pages rendues côté client : le seo-fallback
// (hors #root) contient un <h1> pour les crawlers sans JS, et React rend
// son propre <h1> dans #root au montage. Quand JS s'exécute, on rétrograde
// le H1 du fallback en H2 pour qu'il ne reste qu'un seul H1 dans la page.
const fallbackH1 = document.querySelector('.seo-fallback h1')
if (fallbackH1) {
  const h2 = document.createElement('h2')
  h2.innerHTML = fallbackH1.innerHTML
  for (const attr of Array.from(fallbackH1.attributes)) {
    h2.setAttribute(attr.name, attr.value)
  }
  fallbackH1.parentNode?.replaceChild(h2, fallbackH1)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
