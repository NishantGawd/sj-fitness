import Link from "next/link"
import { Dumbbell, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-brand-yellow">
              <Dumbbell className="w-8 h-8" />
              <span className="text-xl font-bold uppercase tracking-wider">SJ Fitness</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Jaipur&apos;s premier fitness destination where strength meets community. Transform your potential with expert
              guidance and state-of-the-art facilities.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.instagram.com/sj_fitness_jaipur/?hl=en" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://www.facebook.com/sjfitnessfactory/" className="text-muted-foreground hover:text-brand-yellow transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground uppercase">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/classes" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Classes & Programs
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Personal Trainers
              </Link>
              <Link href="/membership" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Membership Plans
              </Link>
              <Link href="/nutrition" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Nutrition Guidance
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground uppercase">Services</h3>
            <div className="space-y-2">
              <Link href="/services/strength" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Strength Training
              </Link>
              <Link href="/services/cardio" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Cardio Workouts
              </Link>
              <Link href="/services/yoga" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                Yoga & Flexibility
              </Link>
              <Link href="/services/crossfit" className="block text-muted-foreground hover:text-brand-yellow transition-colors">
                CrossFit Training
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground uppercase">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground text-sm">
                  2nd Floor, Akshardham Chauraha, B1/564A
                  <br />
                  Chitrakoot, Jaipur
                  <br />
                  Rajasthan 302021
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <p className="text-muted-foreground text-sm">+918824249083</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-yellow flex-shrink-0" />
                <p className="text-muted-foreground text-sm">hello@sjfitness.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 SJ Fitness. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cancel" className="text-muted-foreground hover:text-brand-yellow text-sm transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}