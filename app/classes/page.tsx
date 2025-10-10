"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, animate } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const AnimatedBarbellIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      animate={{ y: [0, -2, 0], rotate: [0, -1.5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="18" y="37" width="44" height="6" rx="3" fill="currentColor" />
      <rect x="12" y="28" width="8" height="24" rx="4" fill="currentColor" />
      <rect x="60" y="28" width="8" height="24" rx="4" fill="currentColor" />
      <motion.rect
        x="38"
        y="34"
        width="4"
        height="12"
        rx="2"
        fill="currentColor"
        animate={{ scaleY: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>
  </svg>
)

const AnimatedLotusIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      animate={{ scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M40 22 C 52 28, 62 42, 40 60 C 18 42, 28 28, 40 22 Z" fill="currentColor" opacity="0.85" />
    </motion.g>
  </svg>
)

const AnimatedDumbbellIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      animate={{ rotate: [0, -6, 0, 6, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      transformOrigin="40 40"
    >
      <rect x="30" y="36" width="20" height="8" rx="4" fill="currentColor" />
      <rect x="20" y="30" width="8" height="20" rx="4" fill="currentColor" />
      <rect x="52" y="30" width="8" height="20" rx="4" fill="currentColor" />
    </motion.g>
  </svg>
)

const AnimatedZumbaIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.path
      d="M46 18 v26 a8 8 0 1 1 -4 -6 V24 h-8 v-6 h12 z"
      fill="currentColor"
      animate={{ y: [0, -1.5, 0, 1.5, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </svg>
)

const classTypes = [
  {
    title: "Forge & Fire",
    subtitle: "HIIT & CrossFit",
    description: "Unleash raw power. A relentless fusion of high-intensity interval training and functional strength.",
    icon: AnimatedBarbellIcon,
    image: "/classes/crossfit.jpg",
  },
  {
    title: "Iron Core",
    subtitle: "Strength Training",
    description: "Progressive overload, proper form, and full-body programming to build durable strength.",
    icon: AnimatedDumbbellIcon,
    image: "/classes/strength.jpg",
  },
  {
    title: "Groove Burn",
    subtitle: "Zumba",
    description: "Rhythm-driven cardio that blends dance and conditioning for a joyful, sweat-filled session.",
    icon: AnimatedZumbaIcon,
    image: "/classes/zumba.jpg",
  },
  {
    title: "Zenith Flow",
    subtitle: "Yoga & Mindfulness",
    description: "Find your center with restorative flows designed to enhance flexibility, balance, and inner peace.",
    icon: AnimatedLotusIcon,
    image: "/classes/yoga.jpg",
  },
]

export default function ClassesPage() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const yHeroText = useTransform(scrollY, [0, 300], [0, -50])
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0.4])

  const scrollByCards = (dir: -1 | 1) => {
    const container = scrollRef.current
    if (!container) return
    const firstCard = container.querySelector("[data-card]") as HTMLElement | null
    const gap = 24
    const cardWidth = firstCard ? firstCard.offsetWidth : 0
    const amountToScroll = (cardWidth + gap) * dir
    const currentScroll = container.scrollLeft
    const targetScroll = currentScroll + amountToScroll
    animate(currentScroll, targetScroll, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      onUpdate: (latest) => {
        if (scrollRef.current) scrollRef.current.scrollLeft = latest
      },
    })
  }

  return (
    <motion.div className="overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-[91vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        <motion.div
          className="relative z-10"
          style={{ y: yHeroText, opacity: opacityHero }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            DEFINE YOUR <span className="text-brand-yellow">ENERGY</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover classes that match your intensity and fuel your ambition.
          </motion.p>
        </motion.div>
      </section>

      {/* Class Carousel */}
      <section className="py-20 overflow-x-hidden">
        <div className="container mx-auto">
          <div className="relative">
            <motion.button
              aria-label="Scroll left"
              onClick={() => scrollByCards(-1)}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={48} />
            </motion.button>
            <motion.button
              aria-label="Scroll right"
              onClick={() => scrollByCards(1)}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={48} />
            </motion.button>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-2">
              {classTypes.map((classType, index) => {
                const Icon = classType.icon
                return (
                  <motion.div
                    key={index}
                    data-card
                    className="snap-start relative flex-shrink-0 w-[88%] md:w-[30%] h-[440px] md:h-[520px] rounded-2xl overflow-hidden group transition-all duration-500 ease-in-out border border-white/10 hover:shadow-2xl hover:shadow-black/30"
                    whileHover={{ scale: 1.025 }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${classType.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
                    <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-end text-white">
                      <div className="mb-4 text-brand-yellow group-hover:scale-110 transition-transform">
                        <Icon />
                      </div>
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-yellow mb-1">
                        {classType.subtitle}
                      </h3>
                      <h2 className="text-2xl md:text-4xl font-extrabold mb-3 text-pretty">{classType.title}</h2>
                      <p className="text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {classType.description}
                      </p>
                      <a
                        href="/join"
                        className="bg-white text-black font-bold py-3 px-6 rounded-full self-start hover:bg-brand-yellow transition-all duration-300 shadow-lg"
                      >
                        View Schedule
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
