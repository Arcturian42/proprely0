import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ProblemSection from './sections/ProblemSection'
import FourSpaces from './sections/FourSpaces'
import Pricing from './sections/Pricing'
import GrowthServices from './sections/GrowthServices'
import FounderForm from './sections/FounderForm'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'
import StickyCTAMobile from './sections/StickyCTAMobile'

function App() {
  return (
    <div className="w-full pb-16 sm:pb-0">
      <Navbar />
      <Hero />
      <ProblemSection />
      <FourSpaces />
      <Pricing />
      <GrowthServices />
      <FounderForm />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTAMobile />
    </div>
  )
}

export default App
