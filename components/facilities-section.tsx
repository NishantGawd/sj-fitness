export function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 gradient-purple">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold uppercase text-white mb-6 text-balance">
            Top Notch Facilities
          </h2>
          <p className="text-lg font-roboto text-white/90 max-w-2xl mx-auto text-balance leading-relaxed">
            I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story and
            let your users know a little more about you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pool & Relaxation Area */}
          <div className="relative group overflow-hidden rounded-lg shadow-xl">
            <img
              src="/modern-gym-with-swimming-pool-and-relaxation-area.jpg"
              alt="Pool and relaxation area"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-montserrat font-semibold">Pool & Spa</h3>
            </div>
          </div>

          {/* Equipment & Training */}
          <div className="relative group overflow-hidden rounded-lg shadow-xl">
            <img
              src="/gym-equipment-bags-and-training-gear-in-modern-fit.jpg"
              alt="Training equipment"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-montserrat font-semibold">Training Zone</h3>
            </div>
          </div>

          {/* Cardio Area */}
          <div className="relative group overflow-hidden rounded-lg shadow-xl">
            <img
              src="/modern-cardio-machines-with-pink-accent-lighting-i.jpg"
              alt="Cardio machines"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-montserrat font-semibold">Cardio Studio</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
