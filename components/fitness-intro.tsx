import { Button } from "@/components/ui/button"

export function FitnessIntro() {
  return (
    <section className="py-20 gradient-purple">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase mb-6 text-balance">
              Fitness Is for Everyone
            </h2>
            <p className="text-lg font-roboto mb-8 text-balance leading-relaxed opacity-90">
              I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story
              and let your users know a little more about you.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-purple-600 font-montserrat font-semibold uppercase px-8 py-4 bg-transparent"
            >
              Reserve a Spot
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/three-diverse-women-in-workout-attire-smiling-toge.jpg"
              alt="Diverse women working out together"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
