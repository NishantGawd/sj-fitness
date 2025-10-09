"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, type Variants, AnimatePresence, animate } from "framer-motion"
import { Sparkles, Zap, Wind, ChevronLeft, ChevronRight } from "lucide-react"

// --- Custom Animated SVG Icons ---
// Each icon is a self-contained component with its own looping animation.

const AnimatedBarbellIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      initial={false}
      animate={{ y: [0, -2, 0], rotate: [0, -1.5, 0] }}
      transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
        transform-origin="center"
        transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.g>
  </svg>
)

const AnimatedLotusIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      animate={{ scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <path d="M40 22 C 52 28, 62 42, 40 60 C 18 42, 28 28, 40 22 Z" fill="currentColor" opacity="0.85" />
      <motion.path
        d="M25 36 C 30 30, 40 30, 45 36"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.path
        d="M55 36 C 50 30, 40 30, 35 36"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.1 }}
      />
    </motion.g>
  </svg>
)

// New: Strength Training dumbbell
const AnimatedDumbbellIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <motion.g
      animate={{ rotate: [0, -6, 0, 6, 0] }}
      transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      transform-origin="40 40"
    >
      <rect x="30" y="36" width="20" height="8" rx="4" fill="currentColor" />
      <rect x="20" y="30" width="8" height="20" rx="4" fill="currentColor" />
      <rect x="52" y="30" width="8" height="20" rx="4" fill="currentColor" />
      <motion.circle
        cx="24"
        cy="40"
        r="2.5"
        fill="currentColor"
        animate={{ r: [2.5, 3, 2.5] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.circle
        cx="56"
        cy="40"
        r="2.5"
        fill="currentColor"
        animate={{ r: [2.5, 3, 2.5] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.2 }}
      />
    </motion.g>
  </svg>
)

// New: Zumba groove/music icon
const AnimatedZumbaIcon = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* musical note */}
    <motion.path
      d="M46 18 v26 a8 8 0 1 1 -4 -6 V24 h-8 v-6 h12 z"
      fill="currentColor"
      animate={{ y: [0, -1.5, 0, 1.5, 0] }}
      transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
    {/* dancing wave */}
    <motion.path
      d="M12 56 C 20 50, 28 62, 36 56 C 44 50, 52 62, 60 56"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      animate={{ pathLength: [0.8, 1, 0.8] }}
      transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    />
  </svg>
)

// --- Class Data with Generated Images and Icons ---
const classTypes = [
  {
    vibe: "Beast Mode",
    title: "Forge & Fire",
    subtitle: "HIIT & CrossFit",
    description: "Unleash raw power. A relentless fusion of high‑intensity interval training and functional strength.",
    icon: AnimatedBarbellIcon,
    image: "/classes/crossfit.jpg",
  },
  {
    vibe: "Balanced",
    title: "Iron Core",
    subtitle: "Strength Training",
    description: "Progressive overload, proper form, and full‑body programming to build durable strength.",
    icon: AnimatedDumbbellIcon,
    image: "/classes/strength.jpg",
  },
  {
    vibe: "Balanced",
    title: "Groove Burn",
    subtitle: "Zumba",
    description: "Rhythm‑driven cardio that blends dance and conditioning for a joyful, sweat‑filled session.",
    icon: AnimatedZumbaIcon,
    image: "/classes/zumba.jpg",
  },
  {
    vibe: "Chill",
    title: "Zenith Flow",
    subtitle: "Yoga & Mindfulness",
    description: "Find your center with restorative flows designed to enhance flexibility, balance, and inner peace.",
    icon: AnimatedLotusIcon,
    image: "/classes/yoga.jpg",
  },
]

// --- Main Page Component ---
export default function ClassesPage() {
  const [activeVibe, setActiveVibe] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const vibeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!activeVibe) return
    if (vibeTimerRef.current) clearTimeout(vibeTimerRef.current)
    vibeTimerRef.current = setTimeout(() => setActiveVibe(null), 5000)
    return () => {
      if (vibeTimerRef.current) clearTimeout(vibeTimerRef.current)
    }
  }, [activeVibe])

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
  }

  const handleVibeSelect = (vibe: string) => {
    setActiveVibe(vibe)
    setIsModalOpen(false)
  }

  const scrollByCards = (dir: -1 | 1) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector("[data-card]") as HTMLElement | null;
    const gap = 24; // Corresponds to the `gap-6` class
    const cardWidth = firstCard ? firstCard.offsetWidth : 0;
    const amountToScroll = (cardWidth + gap) * dir;
    
    const currentScroll = container.scrollLeft;
    const targetScroll = currentScroll + amountToScroll;

    // Use Framer Motion's animate function for a custom, smooth animation
    animate(currentScroll, targetScroll, {
        type: "spring",
        stiffness: 400,
        damping: 40,
        onUpdate: (latest) => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft = latest;
            }
        }
    });
  };

  return (
    <motion.div
      className="bg-background text-foreground min-h-screen overflow-x-hidden"
      animate={activeVibe === "Beast Mode" ? { x: [0, -1.5, 1.5, -0.75, 0] } : { x: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Static background gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-900/90 to-black -z-10" />

      {/* Hero Section */}
      <section className="relative h-[91vh] flex items-center justify-center text-center px-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
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
        </div>
      </section>

      {/* Class Carousel */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="relative">
            {/* Updated Arrow Buttons */}
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
                    <div className="glow-orbit pointer-events-none" aria-hidden="true" />

                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${classType.image})` }}
                      aria-hidden="true"
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

