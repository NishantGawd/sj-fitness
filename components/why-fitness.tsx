export function WhyFitness() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase text-black mb-6 text-balance">
              Why We Do Fitness
            </h2>
            <div className="space-y-4 text-gray-700 font-roboto leading-relaxed">
              <p>
                I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit Text" or
                double click me to add your own content and make changes to the font. Feel free to drag and drop me
                anywhere you like on your page. I'm a great place for you to tell a story and let your users know a
                little more about you.
              </p>
              <p>
                This is a great space to write a long text about your company and your services. You can use this space
                to go into a little more detail about your company. Talk about your team and what services you provide.
                Tell your visitors the story of how you came up with the idea for your business and what makes you
                different from your competitors.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="gradient-orange rounded-lg p-8">
              <img src="/athletic-woman-in-yellow-sports-bra-doing-workout-.jpg" alt="Woman working out" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
