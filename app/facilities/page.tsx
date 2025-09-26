import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-gold opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald">Top Notch Facilities</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {
              "I'm a paragraph. Click here to add your own text and edit me. I'm a great place for you to tell a story and let your users know a little more about you."
            }
          </p>
        </div>
      </section>

      {/* Main Facilities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Swimming Pool & Relaxation Area */}
            <div className="service-card group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/modern-gym-with-swimming-pool-and-relaxation-area.jpg"
                  alt="Modern gym with swimming pool and relaxation area"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Swimming Pool & Spa</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Dive into our Olympic-sized swimming pool or unwind in our luxurious spa area. Perfect for low-impact
                  cardio and recovery sessions.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Pool Hours:</span>
                    <span>5:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Spa Access:</span>
                    <span>Premium Members</span>
                  </div>
                </div>
                <Button className="btn-gold w-full">Book Pool Time</Button>
              </div>
            </div>

            {/* Training Equipment */}
            <div className="service-card group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/gym-equipment-bags-and-training-gear-in-modern-fit.jpg"
                  alt="Gym equipment bags and training gear"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Training Equipment</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  State-of-the-art training equipment including free weights, resistance bands, and specialized gear for
                  all fitness levels.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Equipment Types:</span>
                    <span>50+ Varieties</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Maintenance:</span>
                    <span>Daily Sanitization</span>
                  </div>
                </div>
                <Button className="btn-gold w-full">Equipment Guide</Button>
              </div>
            </div>

            {/* Cardio Zone */}
            <div className="service-card group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/modern-cardio-machines-with-pink-accent-lighting-i.jpg"
                  alt="Modern cardio machines with accent lighting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Cardio Zone</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Premium cardio equipment with integrated entertainment systems and heart rate monitoring for optimal
                  workout efficiency.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-white/70">
                    <span>Machines:</span>
                    <span>30+ Units</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Features:</span>
                    <span>TV & Music Integration</span>
                  </div>
                </div>
                <Button className="btn-gold w-full">Reserve Machine</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Amenities */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">
            Additional Amenities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">🏃</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-oswald">Running Track</h3>
              <p className="text-white/80 text-sm">Indoor 400m track for all-weather running</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">🧘</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-oswald">Yoga Studio</h3>
              <p className="text-white/80 text-sm">Peaceful space for yoga and meditation</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">🚿</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-oswald">Locker Rooms</h3>
              <p className="text-white/80 text-sm">Premium facilities with towel service</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">☕</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-oswald">Juice Bar</h3>
              <p className="text-white/80 text-sm">Fresh smoothies and healthy snacks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Hours */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">Facility Hours</h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 font-oswald">Weekdays</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-white/80">
                    <span>Monday - Friday</span>
                    <span>5:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Pool & Spa</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Group Classes</span>
                    <span>6:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 font-oswald">Weekends</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-white/80">
                    <span>Saturday - Sunday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Pool & Spa</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Group Classes</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
