"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-oswald font-bold text-black tracking-wider">⚡ SJ Fitness</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/about" className="text-gray-700 hover:text-black font-montserrat font-medium transition-colors">
              ABOUT
            </a>
            <a
              href="/facilities"
              className="text-gray-700 hover:text-black font-montserrat font-medium transition-colors"
            >
              FACILITIES
            </a>
            <a
              href="/services"
              className="text-gray-700 hover:text-black font-montserrat font-medium transition-colors"
            >
              SERVICES
            </a>
            <a
              href="/membership"
              className="text-gray-700 hover:text-black font-montserrat font-medium transition-colors"
            >
              MEMBERSHIP
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-black font-montserrat font-medium transition-colors">
              <User className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <Button className="chat-button">Join Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#about" className="text-gray-700 hover:text-black font-montserrat font-medium">
                ABOUT
              </a>
              <a href="#facilities" className="text-gray-700 hover:text-black font-montserrat font-medium">
                FACILITIES
              </a>
              <a href="#services" className="text-gray-700 hover:text-black font-montserrat font-medium">
                SERVICES
              </a>
              <a href="#community" className="text-gray-700 hover:text-black font-montserrat font-medium">
                COMMUNITY
              </a>
              <a href="#membership" className="text-gray-700 hover:text-black font-montserrat font-medium">
                MEMBERSHIP
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-black font-montserrat font-medium">
                  <User className="w-4 h-4" />
                  <span>Log In</span>
                </button>
                <Button className="chat-button w-full">Join Now</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
