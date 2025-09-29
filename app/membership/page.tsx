"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Star, Zap, Crown } from "lucide-react"
import { useState } from "react"

// Membership plans data
const plans = [
  {
    name: "Starter",
    icon: Star,
    price: "2999",
    originalPrice: "3999",
    period: "/month",
    description: "Perfect for fitness beginners ready to start their journey.",
    features: [
      "Gym Access (Mon-Fri, 6AM-8PM)",
      "Basic Equipment Access",
      "2 Group Classes per Week",
      "Locker Room Access",
      "Progress Tracking App",
    ],
    popular: false,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: "Pro",
    icon: Zap,
    price: "4999",
    originalPrice: "6999",
    period: "/month",
    description: "Most popular choice for serious fitness enthusiasts.",
    features: [
      "Everything in Starter, plus:",
      "24/7 Unlimited Gym Access",
      "All Premium Group Classes",
      "1 Personal Training Session/Month",
      "Sauna & Steam Room",
      "Guest Pass (2/Month)",
    ],
    popular: true,
    color: "from-brand-yellow to-yellow-500",
  },
  {
    name: "Elite",
    icon: Crown,
    price: "7999",
    originalPrice: "9999",
    period: "/month",
    description: "Ultimate experience for peak performance and luxury.",
    features: [
      "Everything in Pro, plus:",
      "Unlimited Personal Training",
      "Nutrition Consultation",
      "Priority Class Booking",
      "Towel Service & Amenities",
      "Guest Passes (4/Month)",
      "VIP Lounge Access",
    ],
    popular: false,
    color: "from-purple-500 to-purple-600",
  },
]

export default function MembershipPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[91vh] bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/interior.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Choose Your Plan</h1>
          <p className="mt-6 text-xl md:text-2xl text-brand-yellow font-medium">
            Flexible memberships designed for your lifestyle and goals.
          </p>
          <motion.div
            className="mt-8 inline-flex items-center gap-2 bg-brand-yellow/20 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-yellow/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Star className="w-5 h-5 text-brand-yellow" />
            <span className="text-sm font-semibold">Limited Time: Save up to 30%</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Fit</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our flexible membership options, each designed to support your unique fitness journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  className={`relative bg-card rounded-3xl shadow-2xl p-8 flex flex-col border-2 transition-all duration-500 ${
                    plan.popular
                      ? "border-brand-yellow scale-105 lg:scale-110"
                      : "border-border hover:border-brand-yellow/50"
                  } ${hoveredPlan === plan.name ? "scale-105" : ""}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ y: -10 }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <motion.div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black text-sm font-bold px-6 py-2 rounded-full shadow-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                    >
                      Most Popular
                    </motion.div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground line-through">₹{plan.originalPrice}</span>
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">SAVE 30%</span>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold">₹{plan.price}</span>
                      <span className="text-lg text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        <Check className="text-brand-yellow h-5 w-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/payment"
                      className={`w-full block text-center py-4 rounded-2xl font-bold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-brand-yellow to-yellow-500 text-black hover:shadow-2xl hover:shadow-brand-yellow/25"
                          : "bg-muted hover:bg-muted/80 text-foreground hover:shadow-xl"
                      }`}
                    >
                      Start Your Journey
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Info */}
          <motion.div
            className="text-center mt-16 p-8 bg-card rounded-2xl border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">All Plans Include</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow" />
                <span>No Joining Fee</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-brand-yellow" />
                <span>Free Fitness Assessment</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
