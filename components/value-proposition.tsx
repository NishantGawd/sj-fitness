import { Users, Dumbbell, Heart } from "lucide-react"

export function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Expert Trainers */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-purple rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-montserrat font-bold text-black mb-4 uppercase">Expert Trainers</h3>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Our certified trainers are here to guide you every step of the way on your fitness journey.
            </p>
          </div>

          {/* State-of-the-Art Facilities */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-teal rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-montserrat font-bold text-black mb-4 uppercase">State-of-the-Art Facilities</h3>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Experience the latest in fitness technology and equipment in our modern facility.
            </p>
          </div>

          {/* Vibrant Community */}
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-6 gradient-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-montserrat font-bold text-black mb-4 uppercase">Vibrant Community</h3>
            <p className="text-gray-600 font-roboto leading-relaxed">
              Join a supportive community of fitness enthusiasts who motivate and inspire each other.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
