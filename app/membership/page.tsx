import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MembershipPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 gradient-gold opacity-20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald">Membership Plans</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect membership plan that fits your lifestyle and fitness goals. All plans include access to
            our world-class facilities.
          </p>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Membership */}
            <div className="service-card p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Basic</h3>
              <div className="text-5xl font-bold text-primary mb-2">$49</div>
              <p className="text-white/60 mb-8">per month</p>

              <ul className="text-left text-white/80 space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Access to gym equipment
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Locker room facilities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Basic fitness assessment
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Mobile app access
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Standard operating hours
                </li>
              </ul>

              <Button className="btn-gold w-full text-lg py-3">Start Basic Plan</Button>
              <p className="text-white/60 text-sm mt-4">No commitment • Cancel anytime</p>
            </div>

            {/* Premium Membership */}
            <div className="service-card p-8 text-center border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                MOST POPULAR
              </Badge>

              <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Premium</h3>
              <div className="text-5xl font-bold text-primary mb-2">$89</div>
              <p className="text-white/60 mb-8">per month</p>

              <ul className="text-left text-white/80 space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Everything in Basic
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Unlimited group classes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Pool and spa access
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>2 guest passes per month
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Nutrition consultation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Extended hours access
                </li>
              </ul>

              <Button className="btn-gold w-full text-lg py-3">Start Premium Plan</Button>
              <p className="text-white/60 text-sm mt-4">Most popular choice • Best value</p>
            </div>

            {/* Elite Membership */}
            <div className="service-card p-8 text-center">
              <h3 className="text-3xl font-bold text-white mb-4 font-oswald">Elite</h3>
              <div className="text-5xl font-bold text-primary mb-2">$149</div>
              <p className="text-white/60 mb-8">per month</p>

              <ul className="text-left text-white/80 space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Everything in Premium
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>4 personal training sessions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Priority class booking
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Unlimited guest passes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Custom meal planning
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  24/7 facility access
                </li>
              </ul>

              <Button className="btn-gold w-full text-lg py-3">Start Elite Plan</Button>
              <p className="text-white/60 text-sm mt-4">Ultimate experience • VIP treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Memberships */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-oswald">Corporate Memberships</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Invest in your team's health and productivity with our corporate wellness programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6 font-oswald">Benefits for Your Team</h3>
              <ul className="text-white/80 space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Discounted group rates (20% off)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Flexible payment options
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  On-site wellness seminars
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Team building fitness challenges
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Dedicated account manager
                </li>
              </ul>
              <Button className="btn-gold text-lg px-8 py-3">Contact Sales Team</Button>
            </div>

            <div className="service-card p-8">
              <h4 className="text-2xl font-bold text-white mb-4 font-oswald">Get Started Today</h4>
              <p className="text-white/80 mb-6">
                Minimum 10 employees required. Contact our corporate sales team for a customized quote and package
                details.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between text-white/70">
                  <span>Minimum Team Size:</span>
                  <span>10 employees</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Discount:</span>
                  <span className="text-primary font-bold">Up to 20% off</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Contract:</span>
                  <span>12-month minimum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">
            Why Choose SJ Fitness?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-foreground">24/7</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-oswald">Always Open</h3>
              <p className="text-white/80">
                Elite members enjoy 24/7 access to our facilities for maximum flexibility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-foreground">50+</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-oswald">Equipment Types</h3>
              <p className="text-white/80">State-of-the-art equipment from leading fitness brands worldwide.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-foreground">15+</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-oswald">Expert Trainers</h3>
              <p className="text-white/80">Certified professionals dedicated to helping you achieve your goals.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-foreground">100%</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-oswald">Satisfaction</h3>
              <p className="text-white/80">30-day money-back guarantee if you're not completely satisfied.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-oswald">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="service-card p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-oswald">Can I freeze my membership?</h3>
              <p className="text-white/80">
                Yes, you can freeze your membership for up to 3 months per year for medical reasons or extended travel.
                A small administrative fee applies.
              </p>
            </div>

            <div className="service-card p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-oswald">Is there a joining fee?</h3>
              <p className="text-white/80">
                New members pay a one-time joining fee of $99. This fee is waived during special promotional periods
                throughout the year.
              </p>
            </div>

            <div className="service-card p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-oswald">Can I bring guests?</h3>
              <p className="text-white/80">
                Premium and Elite members receive guest passes each month. Basic members can purchase day passes for
                guests at $15 per visit.
              </p>
            </div>

            <div className="service-card p-6">
              <h3 className="text-xl font-bold text-white mb-3 font-oswald">What if I want to cancel?</h3>
              <p className="text-white/80">
                You can cancel your membership anytime with 30 days written notice. We also offer a 30-day money-back
                guarantee for new members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
