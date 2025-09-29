"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Award, Users, Target, Heart } from "lucide-react"

const trainers = [
  {
    name: "MIA STONES",
    role: "Strength & Conditioning Specialist",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=2574&auto=format&fit=crop",
    bio: "NASM-certified with 8+ years transforming lives through strength training.",
    certifications: "NASM-CPT, CSCS",
  },
  {
    name: "JASON GRIMES",
    role: "Yoga & Mindfulness Coach",
    img: "/professional-fitness-trainer-headshot.jpg",
    bio: "RYT-500 instructor helping members find balance, flexibility, and inner strength.",
    certifications: "RYT-500, Meditation Certified",
  },
  {
    name: "DAVID CHEN",
    role: "CrossFit & HIIT Expert",
    img: "/professional-fitness-coach-headshot.jpg",
    bio: "CrossFit Level 3 trainer specializing in functional fitness and metabolic conditioning.",
    certifications: "CF-L3, HIIT Specialist",
  },
]

const stats = [
  { icon: Users, number: "500+", label: "Active Members" },
  { icon: Award, number: "15+", label: "Certified Trainers" },
  { icon: Target, number: "95%", label: "Goal Achievement" },
  { icon: Heart, number: "5★", label: "Member Rating" },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative h-[91vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <motion.div
          className="relative z-10 h-full flex items-center px-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6">
              WHERE <span className="text-brand-yellow">LEGENDS</span> ARE MADE
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl">
              More than a gym. We&apos;re your transformation headquarters.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-8 h-8 text-brand-yellow mx-auto mb-3" />
                <div className="text-3xl font-black text-foreground mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl leading-relaxed text-muted-foreground mb-8">
              At SJ Fitness, we don&apos;t just build bodies—we build confidence, community, and champions. Every workout is
              designed to push your limits while our expert trainers ensure you&apos;re safe, supported, and successful.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold mb-2">Results-Driven</h3>
                <p className="text-sm text-muted-foreground">Proven methods that deliver real, lasting results</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold mb-2">Community First</h3>
                <p className="text-sm text-muted-foreground">A supportive family that celebrates every victory</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-bold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">Certified professionals dedicated to your success</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-card py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Meet Your Coaches</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              World-class trainers who are passionate about your transformation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.name}
                className="bg-background border border-border rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={trainer.img || "/placeholder.svg"}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{trainer.name}</h3>
                  <p className="text-brand-yellow font-semibold mb-2">{trainer.role}</p>
                  <p className="text-muted-foreground text-sm mb-3">{trainer.bio}</p>
                  <div className="text-xs text-muted-foreground font-medium">{trainer.certifications}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-brand-yellow from-brand-yellow/10 to-brand-yellow/5">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-black text-4xl font-bold mb-4">Ready to Transform?</h2>
            <p className="text-black text-xl mb-8">
              Join hundreds of members who&apos;ve already discovered their strongest selves. Your first class is on us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="bg-black text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                href="/classes"
                className="border-2 border-black text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                View Classes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
