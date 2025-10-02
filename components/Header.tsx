"use client"

import Link from "next/link"
import { useState, Fragment, useEffect } from "react" // Import useEffect
import { usePathname } from "next/navigation"
import { Menu, X, Dumbbell, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Popover, Transition } from "@headlessui/react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const services = [
  {
    key: "strength",
    name: "Strength Training",
    href: "/services",
    image: "/services/strength.jpg",
    desc: "Progressive overload with expert guidance and tracked results.",
  },
  {
    key: "cardio",
    name: "Cardio Workouts",
    href: "/services",
    image: "/services/cardio.jpg",
    desc: "Endurance sessions tailored to your pace for real stamina gains.",
  },
  {
    key: "yoga",
    name: "Yoga & Flexibility",
    href: "/services",
    image: "/services/yoga.jpg",
    desc: "Guided flows to improve mobility, balance, and recovery.",
  },
  {
    key: "crossfit",
    name: "CrossFit Training",
    href: "/services",
    image: "/services/crossfit.jpg",
    desc: "High-intensity circuits that build strength and agility fast.",
  },
]

// NavLink component remains the same, it works perfectly
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "relative text-muted-foreground transition-colors font-medium px-3 py-2",
        isActive ? "text-foreground" : "hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
          layoutId="underline"
        />
      )}
    </Link>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const pathname = usePathname()

  const isServicePageActive = services.some(service => service.href === pathname)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary">
            <Dumbbell className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold uppercase tracking-wider text-foreground">
              SJ FITNESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-grow items-center justify-center gap-2">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About Us</NavLink>
            <NavLink href="/classes">Classes</NavLink>
            <NavLink href="/membership">Membership</NavLink>

            {/* Services Popover Dropdown */}
            <Popover className="relative">
              {({ open, close }) => {
                // FIX: This effect closes the popover on scroll
                useEffect(() => {
                  if (!open) {
                    return
                  }

                  const handleScroll = () => {
                    close()
                  }

                  window.addEventListener("scroll", handleScroll, { passive: true })
                  return () => {
                    window.removeEventListener("scroll", handleScroll)
                  }
                }, [open, close])

                return (
                  <>
                    <Popover.Button
                      className={cn(
                        "group relative inline-flex items-center rounded-md px-3 py-2 font-medium transition-colors focus:outline-none",
                        open || isServicePageActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      />
                      {/* FIX: Removed the conflicting underline from here */}
                      {isServicePageActive && !open && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                          layoutId="underline"
                        />
                      )}
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-4xl -translate-x-1/2 transform px-4">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-4 bg-card p-4 md:grid-cols-4">
                            {services.map((s) => (
                              <Link
                                key={s.key}
                                href={s.href}
                                // By using the 'onClick' event with the 'close' function,
                                // the popover will close when a service is selected.
                                onClick={() => close()}
                                className="group flex h-full w-full flex-col overflow-hidden rounded-md border bg-background shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg focus:shadow-lg focus:outline-none"
                              >
                                <div className="relative h-28 w-full">
                                  <Image
                                    src={s.image || "/placeholder.svg"}
                                    alt={s.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(min-width: 1024px) 256px, 33vw"
                                  />
                                </div>
                                <div className="flex-grow p-3">
                                  <div className="text-sm font-semibold text-foreground">
                                    {s.name}
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )
              }}
            </Popover>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedThemeToggler />
            <Link
              href="/join"
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-yellow-500 transition-colors duration-300"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <AnimatedThemeToggler />
            <button
              onClick={toggleMenu}
              className="text-foreground hover:text-yellow-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Home</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>About Us</Link>
              <Link href="/classes" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Classes</Link>
              <Link href="/membership" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Membership</Link>

              <div className="pl-2">
                <span className="text-sm font-semibold text-foreground">Services</span>
                <div className="flex flex-col mt-2 space-y-2">
                  {services.map((s) => (
                    <Link key={s.key} href={s.href} className="text-muted-foreground hover:text-foreground text-sm" onClick={toggleMenu}>
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="text-muted-foreground hover:text-foreground" onClick={toggleMenu}>Contact</Link>
              <Link
                href="/join"
                className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold uppercase text-sm hover:bg-yellow-500 transition-colors duration-300 text-center mt-2"
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