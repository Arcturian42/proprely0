import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ProblemSection from './sections/ProblemSection'
import SolutionSection from './sections/SolutionSection'
import FourSpaces from './sections/FourSpaces'
import HowItWorks from './sections/HowItWorks'
import FounderOffer from './sections/FounderOffer'
import Credibilite from './sections/Credibilite'
import FounderForm from './sections/FounderForm'
import FAQ from './sections/FAQ'
import FinalCTA from './sections/FinalCTA'
import Footer from './sections/Footer'
import StickyCTAMobile from './sections/StickyCTAMobile'

function App() {
  return (
    <div className="w-full pb-16 sm:pb-0 bg-white">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FourSpaces />
      <HowItWorks />
      <FounderOffer />
      <Credibilite />
      <FounderForm />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyCTAMobile />
    </div>
  )
}

export default App
