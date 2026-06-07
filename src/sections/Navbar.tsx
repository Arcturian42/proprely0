// Conservé pour rétrocompatibilité — la navigation utilise désormais MegaMenuNav,
// qui expose un mega-menu desktop avec vrais liens (essentiel pour le SEO et le
// crawl Google) et un accordéon mobile. L'ancienne version de Navbar n'avait
// que des ancres de scroll sur la homepage — invisibles pour les crawlers.
export { default } from './MegaMenuNav'
