import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-teal">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/athletic-woman-with-headphones-working-out-in-mode.jpg"
          alt="Fitness background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-teal-500/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-oswald font-bold uppercase mb-6 text-balance leading-tight">
          Welcome to SJ Fitness
        </h1>
        <p className="text-xl md:text-2xl font-montserrat font-light mb-8 text-balance max-w-2xl mx-auto">
          The fitness facility for all of your needs
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="btn-electric font-montserrat font-bold uppercase text-lg px-8 py-4">
            Join Now
          </Button>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-6 right-6 z-50 chat-button flex items-center space-x-2">
        <MessageCircle className="w-5 h-5" />
        <span>Let's Chat!</span>
      </button>
    </section>
  )
}
