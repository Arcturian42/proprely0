import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import StickyCTAMobile from './sections/StickyCTAMobile'
import ProblemSection from './sections/ProblemSection'
import BeforeAfter from './sections/BeforeAfter'
import HowItWorks from './sections/HowItWorks'
import FourSpaces from './sections/FourSpaces'
import Results from './sections/Results'
import FounderOffer from './sections/FounderOffer'
import WhyNow from './sections/WhyNow'
import AIAgentsSection from './sections/AIAgentsSection'
import FounderForm from './sections/FounderForm'
import Credibilite from './sections/Credibilite'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="w-full pb-16 sm:pb-0">
      <Navbar />
      <Hero />
      <ProblemSection />
      <BeforeAfter />
      <HowItWorks />
      <FourSpaces />
      <Results />
      <FounderOffer />
      <WhyNow />
      <AIAgentsSection />
      <FounderForm />
      <Credibilite />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTAMobile />
    </div>
  )
}

export default App
