"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Dumbbell } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo (Left) */}
          <Link href="/" className="flex items-center space-x-2 text-yellow-400">
            <Dumbbell className="w-6 h-6" />
            <span className="text-xl font-bold uppercase tracking-wider">SJ FITNESS</span>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              About Us
            </Link>
            <Link href="/classes" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Classes
            </Link>
            <Link href="/membership" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Membership
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Join Now Button (Right) */}
          <div className="hidden md:block">
            <Link
              href="/join"
              className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold uppercase text-sm hover:bg-opacity-90 transition-all duration-300"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-300 hover:text-yellow-400 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/classes"
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Classes
              </Link>
              <Link
                href="/membership"
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Membership
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-yellow-400 transition-colors font-medium"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href="/join"
                className="bg-yellow-400 text-black px-6 py-2 rounded-md font-bold uppercase text-sm hover:bg-opacity-90 transition-all duration-300 text-center mt-2"
                onClick={toggleMenu}
              >
                Join Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}