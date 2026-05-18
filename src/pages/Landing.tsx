import { useEffect } from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import TrustBadges from '../sections/TrustBadges'
import ProblemSection from '../sections/ProblemSection'
import SolutionSection from '../sections/SolutionSection'
import Comparison from '../sections/Comparison'
import FourSpaces from '../sections/FourSpaces'
import HowItWorks from '../sections/HowItWorks'
import ProductStatus from '../sections/ProductStatus'
import FounderOffer from '../sections/FounderOffer'
import Credibilite from '../sections/Credibilite'
import FounderForm from '../sections/FounderForm'
import FAQ from '../sections/FAQ'
import FinalCTA from '../sections/FinalCTA'
import Footer from '../sections/Footer'
import StickyCTAMobile from '../sections/StickyCTAMobile'
import SectionDivider from '../components/SectionDivider'

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
      <SolutionSection />
      <Comparison />
      <SectionDivider variant="curve" topColor="#ffffff" bottomColor="#f8fafc" />
      <FourSpaces />
      <HowItWorks />
      <ProductStatus />
      <FounderOffer />
      <Credibilite />
      <FounderForm />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTAMobile />
    </>
  )
}
