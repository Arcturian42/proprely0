import { Suspense, lazy, useEffect } from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import TrustBadges from '../sections/TrustBadges'
import ProblemSection from '../sections/ProblemSection'
import SectionDivider from '../components/SectionDivider'

const SolutionSection = lazy(() => import('../sections/SolutionSection'))
const Comparison = lazy(() => import('../sections/Comparison'))
const FourSpaces = lazy(() => import('../sections/FourSpaces'))
const Personas = lazy(() => import('../sections/Personas'))
const HowItWorks = lazy(() => import('../sections/HowItWorks'))
const ProductStatus = lazy(() => import('../sections/ProductStatus'))
const FounderOffer = lazy(() => import('../sections/FounderOffer'))
const Credibilite = lazy(() => import('../sections/Credibilite'))
const FounderForm = lazy(() => import('../sections/FounderForm'))
const FAQ = lazy(() => import('../sections/FAQ'))
const FinalCTA = lazy(() => import('../sections/FinalCTA'))
const Footer = lazy(() => import('../sections/Footer'))
const StickyCTAMobile = lazy(() => import('../sections/StickyCTAMobile'))

export default function Landing() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    const tryScroll = () => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const t = window.setTimeout(tryScroll, 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <TrustBadges />
      <ProblemSection />
      <SectionDivider variant="wave" topColor="#f8fafc" bottomColor="#ffffff" />
      <Suspense fallback={null}>
        <SolutionSection />
        <Comparison />
        <SectionDivider variant="curve" topColor="#ffffff" bottomColor="#f8fafc" />
        <FourSpaces />
        <Personas />
        <HowItWorks />
        <ProductStatus />
        <FounderOffer />
        <Credibilite />
        <FounderForm />
        <FAQ />
        <FinalCTA />
        <Footer />
        <StickyCTAMobile />
      </Suspense>
    </>
  )
}
