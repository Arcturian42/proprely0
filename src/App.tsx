import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import ProblemSection from './sections/ProblemSection'
import FourSpaces from './sections/FourSpaces'
import HowItWorks from './sections/HowItWorks'
import Results from './sections/Results'
import WhyNow from './sections/WhyNow'
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
      <FourSpaces />
      <HowItWorks />
      <Results />
      <WhyNow />
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
