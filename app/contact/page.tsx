"use client"

import type React from "react"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Thank you for your message! We will get back to you within 24 hours.")
    ;(e.target as HTMLFormElement).reset()
    setIsSubmitting(false)
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[91vh] bg-cover bg-bottom flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Get In Touch</h1>
          <p className="mt-6 text-xl md:text-2xl text-brand-yellow font-medium">
            Ready to transform your life? Let&apos;s start the conversation.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              className="bg-card p-8 rounded-2xl shadow-2xl border border-border"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Send className="text-brand-yellow w-8 h-8" />
                <h2 className="text-3xl font-bold">Send Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="name" className="block text-sm font-semibold text-muted-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-background border-2 border-border rounded-xl py-4 px-4 text-foreground focus:outline-none focus:border-brand-yellow transition-all duration-300 hover:border-muted-foreground"
                      placeholder="Your name"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-background border-2 border-border rounded-xl py-4 px-4 text-foreground focus:outline-none focus:border-brand-yellow transition-all duration-300 hover:border-muted-foreground"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="subject" className="block text-sm font-semibold text-muted-foreground mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full bg-background border-2 border-border rounded-xl py-4 px-4 text-foreground focus:outline-none focus:border-brand-yellow transition-all duration-300 hover:border-muted-foreground"
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <label htmlFor="message" className="block text-sm font-semibold text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-background border-2 border-border rounded-xl py-4 px-4 text-foreground focus:outline-none focus:border-brand-yellow transition-all duration-300 hover:border-muted-foreground resize-none"
                    placeholder="Tell us about your fitness goals..."
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-yellow text-black font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-brand-yellow/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <h2 className="text-3xl font-bold mb-8">Visit Our Gym</h2>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="text-brand-yellow w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Location</h3>
                      <p className="text-muted-foreground">
                        2nd Floor, Akshardham Chauraha, B1/564A, Chitrakoot
                        <br />
                        Jaipur, Rajasthan 302021
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="text-brand-yellow w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-muted-foreground">+918824249083</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="text-brand-yellow w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">hello@sjfitness.com</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="text-brand-yellow w-6 h-6" />
                  <h3 className="text-2xl font-bold">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="font-medium">Monday - Saturday</span>
                    <span className="text-brand-yellow font-semibold">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-brand-yellow font-semibold">6:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-80 bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28464.368196956788!2d75.70059647431637!3d26.902034399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5bca0344373%3A0x8f244ba5ef75525f!2sSJ%20FITNESS%20GYM%2C%20VAISHALI%20NAGAR!5e0!3m2!1sen!2sin!4v1759387223770!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
