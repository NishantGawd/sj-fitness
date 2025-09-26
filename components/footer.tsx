import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-montserrat font-bold uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3 font-roboto">
              <li>
                <a href="#about" className="hover:text-yellow-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-yellow-400 transition-colors">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-yellow-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#membership" className="hover:text-yellow-400 transition-colors">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info & Hours */}
          <div>
            <h3 className="text-xl font-montserrat font-bold uppercase mb-6">Contact & Hours</h3>
            <div className="space-y-3 font-roboto">
              <p>
                123 Fitness Street
                <br />
                City, State 12345
              </p>
              <p>
                Phone: (555) 123-4567
                <br />
                Email: info@SJ Fitnessfitness.com
              </p>
              <div className="mt-4">
                <p className="font-semibold">Hours:</p>
                <p>
                  Mon-Fri: 5:00 AM - 11:00 PM
                  <br />
                  Sat-Sun: 6:00 AM - 10:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-montserrat font-bold uppercase mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-oswald font-bold tracking-wider mb-4 md:mb-0">⚡ SJ Fitness</div>
          <div className="text-sm font-roboto text-gray-400">
            © 2025 SJ Fitness Fitness. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>
    </footer>
  )
}
