"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence, easeOut } from "framer-motion"
import { Dumbbell, Zap, HeartPulse, Users } from "lucide-react"
import { useEffect, useState } from "react"

// --- Reusable Motion Variants ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

// --- Testimonials Data ---
const testimonials = [
  {
    quote:
      "SJ Fitness transformed not just my body, but my entire mindset. The personalized training approach and supportive community made all the difference in achieving my goals.",
    name: "Aarav Sharma",
    role: "Lost 25kg in 8 months",
  },
  {
    quote:
      "From my first day to now, the trainers have been incredibly knowledgeable and motivating. The clean facilities and variety of equipment keep my workouts exciting and effective.",
    name: "Priya Singh",
    role: "Strength Training Enthusiast",
  },
  {
    quote:
      "The diverse class schedule fits perfectly with my busy lifestyle. Whether it's early morning HIIT or evening yoga, there's always a session that works for me.",
    name: "Rohan Verma",
    role: "Fitness Journey: 2+ Years",
  },
]

// --- Home Page Component ---
export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-black text-white">
      {/* 1. Hero Section with Video Background */}
      <section className="relative h-[91vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0"
          poster="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2575&auto=format&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-man-lifting-weights-in-the-gym-2343-large.mp4"
            type="video/mp4"
          />
        </video>
        <motion.div
          className="relative z-20 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase">
            Transform Your
            <br />
            <span className="text-brand-yellow">Potential</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Welcome to SJ Fitness – Jaipur&apos;s most trusted fitness community. Where every rep counts, every goal matters,
            and your success is our mission.
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
        className="py-20 px-4 bg-zinc-900"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
            Why Choose <span className="text-brand-yellow">SJ Fitness</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of cutting-edge facilities, expert guidance, and a supportive community that
            celebrates every milestone on your fitness journey.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Dumbbell,
                title: "Premium Equipment",
                desc: "Industry-leading machines and free weights for optimal training results and safety.",
              },
              {
                icon: HeartPulse,
                title: "Certified Trainers",
                desc: "Experienced fitness professionals committed to helping you achieve sustainable results.",
              },
              {
                icon: Zap,
                title: "Diverse Programs",
                desc: "From high-intensity workouts to mindful movement – find your perfect fitness match.",
              },
              {
                icon: Users,
                title: "Supportive Community",
                desc: "Join a welcoming family of fitness enthusiasts who motivate and inspire each other.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-zinc-800 p-8 rounded-lg group hover:bg-zinc-700 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-brand-yellow/5 blur-3xl group-hover:w-32 group-hover:h-32 transition-all duration-500"></div>
                <feature.icon className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
                <h3 className="text-xl font-bold uppercase">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. Class Showcase Section */}
      <motion.section
        className="py-20 px-4 bg-black"
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
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Whether you&apos;re a beginner taking your first steps or an athlete pushing new limits, our expertly designed
              programs cater to every fitness level and aspiration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[60vh]">
            {[
              { name: "CrossFit", img: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Yoga", img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Strength", img: "https://images.unsplash.com/photo-1739430548335-6b3e76ddbd10?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ].map((cls) => (
              <Link href="/classes" key={cls.name} className="group relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={cls.img || "/placeholder.svg"}
                  alt={cls.name}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="text-3xl font-extrabold uppercase text-white tracking-widest">{cls.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. Testimonial Slider */}
      <motion.section
        className="py-20 px-4 bg-zinc-900"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto max-w-3xl text-center relative h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="absolute inset-0"
            >
              <p className="text-xl md:text-2xl italic text-gray-300">
                &quot;{testimonials[currentTestimonial].quote}&quot;
              </p>
              <h4 className="mt-6 text-xl font-bold uppercase text-brand-yellow">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 5. Final CTA Section */}
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
            className="mt-8 inline-block bg-black text-white font-bold py-4 px-10 rounded-md text-lg uppercase hover:bg-zinc-800 transition-colors duration-300 transform hover:scale-105"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </div>
  )
}
