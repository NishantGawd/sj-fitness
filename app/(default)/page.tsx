"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Dumbbell, Zap, HeartPulse, Users, Volume2, VolumeX, Images, Video, X } from "lucide-react"
import { useEffect, useState, useRef, useMemo } from "react"

// --- Reusable Motion Variants ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

type VideoTestimonial = {
  src: string
  poster?: string
  name: string
  role?: string
}

const videoTestimonials: VideoTestimonial[] = [
  { src: "/sjfitness_videos/testimonials/1.mp4", poster: "/sjfitness_videos/testimonials/1.jpg", name: "Yatharth Sharma" },
  { src: "/sjfitness_videos/testimonials/2.mp4", poster: "/sjfitness_videos/testimonials/2.jpg", name: "Vinay Sharma" },
  { src: "/sjfitness_videos/testimonials/3.mp4", poster: "/sjfitness_videos/testimonials/3.jpg", name: "Kavya Gupta" },
  { src: "/sjfitness_videos/testimonials/4.mp4", poster: "/sjfitness_videos/testimonials/4.jpg", name: "Rawat Dewani" },
  { src: "/sjfitness_videos/testimonials/5.mp4", poster: "/sjfitness_videos/testimonials/5.jpg", name: "Anil Sharma & Priyanka Sharma" },
  { src: "/sjfitness_videos/testimonials/6.mp4", poster: "/sjfitness_videos/testimonials/6.jpg", name: "Sachit" },
  { src: "/sjfitness_videos/testimonials/7.mp4", poster: "/sjfitness_videos/testimonials/7.jpg", name: "Yukta" },
  { src: "/sjfitness_videos/testimonials/8.mp4", poster: "/sjfitness_videos/testimonials/8.jpg", name: "Yash" },
  { src: "/sjfitness_videos/testimonials/9.mp4", poster: "/sjfitness_videos/testimonials/9.png", name: "Yash" },
  { src: "/sjfitness_videos/testimonials/10.mp4", poster: "/sjfitness_videos/testimonials/10.png", name: "Yash" },
  { src: "/sjfitness_videos/testimonials/11.mp4", poster: "/sjfitness_videos/testimonials/11.png", name: "Yash" },
]

// --- Helper function for classnames ---
function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}


// --- Home Page Component ---
export default function HomePage() {
  const [muted, setMuted] = useState(true)
  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // --- NAVIGATION LOGIC ---
  const handleEnded = () => {
    setIndex((prev) => (prev + 1) % videoTestimonials.length)
  }
  
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % videoTestimonials.length)
  }

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length)
  }
  // --- END NAVIGATION LOGIC ---

  // When index or muted changes, ensure video plays and mute state applies
  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.muted = muted
    const play = async () => {
      try {
        await videoRef.current?.play()
      } catch {
        // Autoplay might be blocked if unmuted; leave it to user interaction
      }
    }
    play()
  }, [index, muted])

  const activeVideo = useMemo(() => videoTestimonials[index], [index])

  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Section with Video Background */}
      <section className="relative h-[91vh] flex items-center justify-center text-center overflow-hidden">
        {/* Dark overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/80 z-10"></div>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          // The key change is here: ensuring the video is always at least the full width and height of its container.
          // This works with object-cover to responsively fill the space without black bars.
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 z-0"
        >
          <source src="/mixkit-fitness-man-lifting-weights-at-the-gym-14661-hd-ready.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <motion.div
          className="relative z-20 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-white">
            Transform Your
            <br />
            <span className="text-brand-yellow">Potential</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Welcome to SJ Fitness – Jaipur&apos;s most trusted fitness community. Where every rep counts, every goal matters, and your success is our mission.
          </p>
          <Link
            href="/join"
            className="mt-10 inline-block bg-brand-yellow text-zinc-900 font-bold py-4 px-10 rounded-md text-lg uppercase hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_5px_30px_-5px_rgba(255,215,0,0.6)]"
          >
            Start Your Journey Today
          </Link>
        </motion.div>
      </section>


      {/* 2. "Why Us" Features Section */}
      <motion.section
        className="py-20 px-4"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
            Why Choose <span className="text-brand-yellow">SJ Fitness</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of cutting-edge facilities, expert guidance, and a supportive community that
            celebrates every milestone on your fitness journey.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Dumbbell, title: "Premium Equipment", desc: "Industry-leading machines and free weights for optimal training results and safety." },
              { icon: HeartPulse, title: "Certified Trainers", desc: "Experienced fitness professionals committed to helping you achieve sustainable results." },
              { icon: Zap, title: "Diverse Programs", desc: "From high-intensity workouts to mindful movement – find your perfect fitness match." },
              { icon: Users, title: "Supportive Community", desc: "Join a welcoming family of fitness enthusiasts who motivate and inspire each other." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-lg group hover:bg-muted transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-brand-yellow/5 blur-3xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
                <feature.icon className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
                <h3 className="text-xl font-bold uppercase text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

    {/* 3. Class Showcase Section */}
      <motion.section
        className="py-20 px-4 bg-card"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
              Discover Your <span className="text-brand-yellow">Perfect Workout</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re a beginner taking your first steps or an athlete pushing new limits, our expertly designed
              programs cater to every fitness level and aspiration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[60vh]">
            {/* --- UPDATED: Added a 'position' property to each object --- */}
            {[
              { name: "CrossFit", img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1025&auto=format&fit=crop", position: "object-center" },
              { name: "Yoga", img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1170&auto=format&fit=crop", position: "object-center" },
              { name: "Strength", img: "/strength2.jpg", position: "object-top" }, // This will fix the cropping
            ].map((cls) => (
              <Link href="/classes" key={cls.name} className="group relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={cls.img || "/placeholder.svg"}
                  alt={cls.name}
                  fill
                  // --- UPDATED: Added the conditional position class ---
                  className={cn(
                    "object-cover group-hover:scale-110 transition-transform duration-500",
                    cls.position // This applies 'object-top' for the Strength image
                  )}
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-3xl font-extrabold uppercase text-white tracking-widest">{cls.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 px-4"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto">
           <div className="max-w-3xl mx-auto">
              <div className="bg-card group rounded-xl shadow-xl overflow-hidden md:grid md:grid-cols-2 md:items-center transition-all duration-300 hover:shadow-2xl border border-transparent">
                  <div className="relative h-64 md:h-full overflow-hidden">
                      <img
                          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1287&auto=format&fit=crop"
                          alt="A vibrant and healthy meal with fruits and vegetables"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6 md:p-10 text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-extrabold uppercase">
                          Fuel Your <span className="text-brand-yellow">Results</span>
                      </h2>
                      <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">
                          Achieving your fitness goals isn&apos;t just about the workout. Our expert nutrition guidance is tailored to complement your training.
                      </p>
                      <a
                          href="/nutrition"
                          className="mt-6 inline-block bg-brand-yellow text-zinc-900 font-bold py-2.5 px-6 rounded-md text-sm uppercase hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_5px_20px_-5px_rgba(255,215,0,0.5)]"
                      >
                          Explore Nutrition Guidance
                      </a>
                  </div>
              </div>
            </div>
        </div>
      </motion.section>

      {/* Video Testimonials (auto-advance, mute toggle) */}
      <motion.section
        className="py-20 px-4"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold uppercase mb-8">
            Member <span className="text-brand-yellow">Stories</span>
          </h2>

          <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-sm">
            <div className="relative aspect-video">
              <video
                key={activeVideo.src}
                ref={videoRef}
                src={activeVideo.src}
                poster={activeVideo.poster}
                controls={false}
                muted={muted}
                autoPlay
                playsInline
                preload="metadata"
                className="h-full w-full object-contain bg-black"
                onEnded={handleEnded}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/40" />
              <div className="absolute inset-x-0 top-0 p-3 flex justify-between">
                 <button type="button" onClick={handlePrevious} className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur hover:bg-black/70">Previous</button>
                 <button type="button" onClick={handleNext} className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur hover:bg-black/70">Next</button>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                <div className="pointer-events-none">
                  <p className="text-white text-sm opacity-90">{activeVideo.role}</p>
                  <p className="text-white font-semibold">{activeVideo.name}</p>
                </div>
                <button
                  type="button"
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  onClick={() => setMuted((m) => !m)}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-md bg-black/60 px-3 py-2 text-white backdrop-blur transition hover:bg-black/70"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  <span className="text-sm">{muted ? "Sound off" : "Sound on"}</span>
                </button>
              </div>
            </div>
            <div className="relative">
              <div
                className="flex gap-2 p-3 overflow-x-auto snap-x snap-mandatory"
                style={{ scrollBehavior: "smooth" }}
              >
              {videoTestimonials.map((v, i) => (
                <button
                  key={v.src}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "group relative h-14 w-24 shrink-0 overflow-hidden rounded-md border snap-start",
                    i === index ? "border-brand-yellow ring-2 ring-brand-yellow" : "border-border",
                  )}
                >
                  <Image
                    src={v.poster || "/placeholder.svg?height=90&width=160&query=fitness video poster"}
                    alt={v.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6. Final CTA Section */}
      <section className="py-20 px-4 bg-brand-yellow text-zinc-900">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
            Ready to Begin Your Fitness Story?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Take the first step towards a stronger, healthier, and more confident you. Join Jaipur&apos;s premier fitness
            community and discover what you&apos;re truly capable of.
          </p>
          <Link
            href="/join"
            className="mt-10 inline-block bg-black text-white font-bold py-4 px-10 rounded-md text-lg uppercase hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>

    </div>
  )
}
