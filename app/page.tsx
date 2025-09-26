import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FitnessIntro } from "@/components/fitness-intro"
import { ValueProposition } from "@/components/value-proposition"
import { FacilitiesSection } from "@/components/facilities-section"
import { WhyFitness } from "@/components/why-fitness"
import { SJFitnessExperience } from "@/components/sjfitness-experience"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FitnessIntro />
      <ValueProposition />
      <FacilitiesSection />
      <WhyFitness />
      <SJFitnessExperience />
      <Footer />
    </main>
  )
}
