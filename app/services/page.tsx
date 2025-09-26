import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-gold opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald">Our Services</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of fitness services designed to help you achieve your goals and transform
            your lifestyle.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Cardio Class */}
            <div className="service-card group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SpRwVNYPtlwC6NzFt4O0H7QSbMQv6L.png"
                    alt="Cardio Class - Woman with exercise ball"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Cardio Class</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Use this area to describe one of your services. High-intensity cardio workouts designed to boost
                    your cardiovascular health and burn calories effectively.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-white/70">
                      <span>Schedule:</span>
                      <span>Mon, Tue, Wed, Thu, Fri</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Duration:</span>
                      <span>1 hr</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Price:</span>
                      <span className="text-primary font-bold">$25</span>
                    </div>
                  </div>
                  <Button className="btn-gold">Book Now</Button>
                </div>
              </div>
            </div>

            {/* Training Floor */}
            <div className="service-card group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Sxn2ABaXyuTWG6KS2XbKv29sjEjBbP.png"
                    alt="Training Floor - Woman with resistance bands"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Training Floor</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Use this area to describe one of your services. Access to our premium training floor with
                    professional equipment and personalized guidance.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-white/70">
                      <span>Schedule:</span>
                      <span>Mon, Tue, Wed, Thu, Fri</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Duration:</span>
                      <span>2 hr</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Price:</span>
                      <span className="text-primary font-bold">$25</span>
                    </div>
                  </div>
                  <Button className="btn-gold">Book Now</Button>
                </div>
              </div>
            </div>

            {/* Swim */}
            <div className="service-card group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IU8H4Qa7Teg4F7N7a1CixDFegKVxUN.png"
                    alt="Swim - Man in swimming attire"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Swim</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Use this area to describe one of your services. Professional swimming lessons and aquatic fitness
                    programs for all skill levels.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-white/70">
                      <span>Schedule:</span>
                      <span>Mon, Tue, Wed, Thu, Fri</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Duration:</span>
                      <span>2 hr</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Price:</span>
                      <span className="text-primary font-bold">$25</span>
                    </div>
                  </div>
                  <Button className="btn-gold">Book Now</Button>
                </div>
              </div>
            </div>

            {/* Strength Class */}
            <div className="service-card group">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8hhhxnKWWeKxDfnMPYKO7APd4PbQKa.png"
                    alt="Strength Class - Man lifting dumbbells"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Strength Class</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Use this area to describe one of your services. Build muscle and increase strength with our
                    comprehensive weight training programs.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-white/70">
                      <span>Schedule:</span>
                      <span>Mon, Tue, Wed, Thu, Fri</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Duration:</span>
                      <span>1 hr</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Price:</span>
                      <span className="text-primary font-bold">$25</span>
                    </div>
                  </div>
                  <Button className="btn-gold">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">
            Additional Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">PT</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Personal Training</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                One-on-one sessions with certified trainers tailored to your specific goals and fitness level.
              </p>
              <p className="text-primary font-bold text-xl mb-4">$75/session</p>
              <Button className="btn-gold w-full">Book Session</Button>
            </div>

            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">NP</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Nutrition Planning</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Customized meal plans and nutritional guidance to complement your fitness journey.
              </p>
              <p className="text-primary font-bold text-xl mb-4">$50/consultation</p>
              <Button className="btn-gold w-full">Schedule Consultation</Button>
            </div>

            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">FA</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Fitness Assessment</h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Comprehensive fitness evaluation to establish baseline metrics and track progress.
              </p>
              <p className="text-primary font-bold text-xl mb-4">$35/assessment</p>
              <Button className="btn-gold w-full">Book Assessment</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">Service Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Starter Package</h3>
              <div className="text-4xl font-bold text-primary mb-6">$99</div>
              <ul className="text-white/80 space-y-3 mb-8">
                <li>• 4 Group Classes</li>
                <li>• 1 Personal Training Session</li>
                <li>• Fitness Assessment</li>
                <li>• Basic Nutrition Guide</li>
              </ul>
              <Button className="btn-gold w-full">Choose Package</Button>
            </div>

            <div className="service-card p-8 text-center border-primary">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Premium Package</h3>
              <div className="text-4xl font-bold text-primary mb-6">$199</div>
              <ul className="text-white/80 space-y-3 mb-8">
                <li>• 8 Group Classes</li>
                <li>• 3 Personal Training Sessions</li>
                <li>• Fitness Assessment</li>
                <li>• Custom Nutrition Plan</li>
                <li>• Pool Access</li>
              </ul>
              <Button className="btn-gold w-full">Choose Package</Button>
            </div>

            <div className="service-card p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Elite Package</h3>
              <div className="text-4xl font-bold text-primary mb-6">$299</div>
              <ul className="text-white/80 space-y-3 mb-8">
                <li>• Unlimited Group Classes</li>
                <li>• 5 Personal Training Sessions</li>
                <li>• Monthly Fitness Assessment</li>
                <li>• Premium Nutrition Coaching</li>
                <li>• Full Facility Access</li>
                <li>• Guest Passes (2/month)</li>
              </ul>
              <Button className="btn-gold w-full">Choose Package</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
