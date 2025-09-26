import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-dark-gold opacity-90"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald">Welcome to the Fit Family</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {
              "I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click \"Edit Text\" or double click me to add your own content and make changes to the font. I'm a great place for you to tell a story and let your users know a little more about you."
            }
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-oswald">Our Story</h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Founded with a passion for transforming lives through fitness, SJ Fitness has become a beacon of
                excellence in the fitness industry. Our journey began with a simple belief: everyone deserves access to
                world-class fitness facilities and expert guidance.
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Today, we continue to push boundaries, combining cutting-edge equipment with personalized training
                programs to help our members achieve their fitness goals and unlock their full potential.
              </p>
              <Button className="btn-gold text-lg px-8 py-3">Learn More About Us</Button>
            </div>
            <div className="relative">
              <img src="/modern-fitness-facility-interior-with-black-and-go.jpg" alt="Modern fitness facility" className="rounded-lg shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">E</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Excellence</h3>
              <p className="text-white/80 leading-relaxed">
                We strive for excellence in everything we do, from our state-of-the-art equipment to our personalized
                service.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">C</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Community</h3>
              <p className="text-white/80 leading-relaxed">
                Building a supportive community where members motivate and inspire each other to reach new heights.
              </p>
            </div>
            <div className="text-center p-8 rounded-lg bg-card border border-border">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-foreground">I</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 font-oswald">Innovation</h3>
              <p className="text-white/80 leading-relaxed">
                Continuously evolving with the latest fitness trends and technologies to provide the best experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/professional-fitness-trainer-headshot.jpg"
                alt="Head Trainer"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-2xl font-bold text-white mb-2 font-oswald">Sarah Johnson</h3>
              <p className="text-primary font-semibold mb-4">Head Trainer & Founder</p>
              <p className="text-white/80">
                With over 15 years of experience, Sarah leads our team with passion and expertise.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/professional-fitness-nutritionist-headshot.jpg"
                alt="Nutritionist"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-2xl font-bold text-white mb-2 font-oswald">Mike Chen</h3>
              <p className="text-primary font-semibold mb-4">Nutrition Specialist</p>
              <p className="text-white/80">
                Mike helps our members achieve their goals through personalized nutrition plans.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/professional-fitness-coach-headshot.jpg"
                alt="Fitness Coach"
                className="w-48 h-48 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-2xl font-bold text-white mb-2 font-oswald">Emma Rodriguez</h3>
              <p className="text-primary font-semibold mb-4">Fitness Coach</p>
              <p className="text-white/80">Emma specializes in strength training and helps members build confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
