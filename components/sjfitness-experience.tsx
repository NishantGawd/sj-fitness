import { Button } from "@/components/ui/button"

export function SJFitnessExperience() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="gradient-teal rounded-lg p-8">
              <img
                src="/athletic-man-running-with-motion-blur-effects-and-.jpg"
                alt="Dynamic fitness training"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase text-black mb-6 text-balance">
              The SJ Fitness Experience
            </h2>
            <p className="text-lg font-roboto text-gray-700 mb-8 text-balance leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story
              and let your users know a little more about you.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-white font-montserrat font-semibold uppercase px-8 py-4 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
