"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, User, Star } from "lucide-react"
import Link from "next/link"

const schedule = {
  Monday: [
    { time: "06:00 - 07:00", name: "Morning Power CrossFit", trainer: "David Chen", intensity: "High", spots: 8 },
    { time: "09:00 - 10:00", name: "Energizing Spin", trainer: "Mia Stones", intensity: "Medium", spots: 12 },
    { time: "17:30 - 18:30", name: "HIIT Transformation", trainer: "David Chen", intensity: "High", spots: 6 },
    { time: "19:00 - 20:00", name: "Strength Builder", trainer: "Mia Stones", intensity: "Medium", spots: 10 },
  ],
  Tuesday: [
    { time: "07:00 - 08:00", name: "Mindful Yoga Flow", trainer: "Jason Grimes", intensity: "Low", spots: 15 },
    { time: "10:00 - 11:00", name: "Zumba Fiesta", trainer: "Jason Grimes", intensity: "Medium", spots: 20 },
    { time: "18:00 - 19:00", name: "Evening Spin", trainer: "Mia Stones", intensity: "Medium", spots: 12 },
  ],
  Wednesday: [
    { time: "06:00 - 07:00", name: "CrossFit Challenge", trainer: "David Chen", intensity: "High", spots: 8 },
    { time: "09:00 - 10:00", name: "Cardio Blast Spin", trainer: "Mia Stones", intensity: "High", spots: 12 },
    { time: "17:30 - 18:30", name: "Core & Conditioning", trainer: "David Chen", intensity: "Medium", spots: 10 },
  ],
  Thursday: [
    { time: "07:00 - 08:00", name: "Power Yoga", trainer: "Jason Grimes", intensity: "Medium", spots: 15 },
    { time: "18:00 - 19:00", name: "Total Body Strength", trainer: "Mia Stones", intensity: "High", spots: 8 },
    { time: "19:00 - 20:00", name: "Dance Fitness Party", trainer: "Jason Grimes", intensity: "Medium", spots: 20 },
  ],
  Friday: [
    { time: "06:00 - 07:00", name: "Friday Fury CrossFit", trainer: "David Chen", intensity: "High", spots: 8 },
    { time: "09:00 - 10:00", name: "Feel-Good Spin", trainer: "Mia Stones", intensity: "Medium", spots: 12 },
    { time: "17:30 - 18:30", name: "Weekend Warrior Prep", trainer: "David Chen", intensity: "High", spots: 6 },
  ],
  Saturday: [
    { time: "09:00 - 10:30", name: "Weekend Power Yoga", trainer: "Jason Grimes", intensity: "Medium", spots: 15 },
    { time: "11:00 - 12:00", name: "Saturday Dance Party", trainer: "Jason Grimes", intensity: "Medium", spots: 25 },
  ],
  Sunday: [{ time: "10:00 - 11:30", name: "Sunday Reset Yoga", trainer: "Jason Grimes", intensity: "Low", spots: 20 }],
}

type Day = keyof typeof schedule

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case "High":
      return "text-red-400"
    case "Medium":
      return "text-brand-yellow"
    case "Low":
      return "text-green-400"
    default:
      return "text-gray-400"
  }
}

export default function ClassesPage() {
  const [selectedDay, setSelectedDay] = useState<Day>("Monday")
  const days = Object.keys(schedule) as Day[]

  return (
    <div className="bg-background text-foreground min-h-screen">
      <section className="relative h-[91vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <motion.div
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
              FIND YOUR <span className="text-brand-yellow">FIRE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              Premium classes. Expert trainers. Your transformation starts here.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Day Selector */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Weekly Schedule</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {days.map((day) => (
                <motion.button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-3 font-bold uppercase rounded-full transition-all duration-300 ${
                    selectedDay === day
                      ? "bg-brand-yellow text-black shadow-lg scale-105"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {day.slice(0, 3)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Classes Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4"
            >
              {schedule[selectedDay].length > 0 ? (
                schedule[selectedDay].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-brand-yellow transition-colors">
                            {item.name}
                          </h3>
                          <span
                            className={`text-sm font-semibold px-2 py-1 rounded-full bg-opacity-20 ${getIntensityColor(item.intensity)}`}
                          >
                            {item.intensity}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <Clock size={16} className="text-brand-yellow" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-2">
                            <User size={16} className="text-brand-yellow" />
                            {item.trainer}
                          </span>
                          <span className="flex items-center gap-2">
                            <Star size={16} className="text-brand-yellow" />
                            {item.spots} spots left
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/join"
                        className="bg-brand-yellow text-black font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Reserve Spot
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-bold text-muted-foreground mb-2">Rest Day</h3>
                  <p className="text-muted-foreground">Perfect time for recovery and personal training!</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-card py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">New to SJ Fitness?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start with a free trial class and discover why our members love training with us.
          </p>
          <Link
            href="/join"
            className="bg-brand-yellow text-black font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-xl inline-block"
          >
            Claim Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
