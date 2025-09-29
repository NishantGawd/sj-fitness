"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, User, ArrowRight, MapPin, Calendar, Clock, CheckCircle } from "lucide-react"
import Image from "next/image"


// Enhanced Input Field Component
const InputField = ({
  icon: Icon,
  type,
  placeholder,
  id,
  required = true,
}: {
  icon: React.ElementType
  type: string
  placeholder: string
  id: string
  required?: boolean
}) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative flex items-center group">
      <Icon className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-yellow transition-colors duration-200" />
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 focus:border-brand-yellow transition-all duration-200 hover:border-zinc-600"
      />
    </div>
  </motion.div>
)

// Branch Selection Card Component
const BranchCard = ({
  title,
  address,
  features,
  isSelected,
  onClick,
}: {
  title: string
  address: string
  features: string[]
  isSelected: boolean
  onClick: () => void
}) => (
  <motion.div
    className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
      isSelected
        ? "border-brand-yellow bg-brand-yellow/5"
        : "border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900/80"
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {isSelected && (
      <motion.div
        className="absolute top-4 right-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-6 h-6 text-brand-yellow" />
      </motion.div>
    )}

    <div className="flex items-start space-x-3 mb-4">
      <MapPin className={`w-5 h-5 mt-1 ${isSelected ? "text-brand-yellow" : "text-zinc-400"}`} />
      <div>
        <h3 className={`font-semibold text-lg ${isSelected ? "text-brand-yellow" : "text-white"}`}>{title}</h3>
        <p className="text-zinc-400 text-sm mt-1">{address}</p>
      </div>
    </div>

    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-brand-yellow" : "bg-zinc-500"}`} />
          <span className="text-sm text-zinc-300">{feature}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

// Main Free Trial Form Component
export default function AuthForm() {
  const [step, setStep] = useState<"branch" | "details" | "success">("branch")
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const branches = [
    {
      id: "vaisali",
      title: "SJ Fitness Vaisali Nagar",
      address: "Vaisali Nagar, Jaipur, Rajasthan",
      features: ["Modern Equipment", "Personal Training", "Group Classes", "Nutrition Guidance"],
    },
    {
      id: "gandhi-path",
      title: "SJ Fitness Gandhi Path",
      address: "Gandhi Path, Jaipur, Rajasthan",
      features: ["Premium Facilities", "Swimming Pool", "Yoga Studio", "Steam & Sauna"],
    },
  ]

  const handleBranchSelect = (branchId: string) => {
    setSelectedBranch(branchId)
  }

  const handleContinue = () => {
    if (selectedBranch) {
      setStep("details")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setStep("success")
    setIsLoading(false)
  }

  const handleBack = () => {
    setStep("branch")
  }

  const resetForm = () => {
    setStep("branch")
    setSelectedBranch("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <motion.div
        className="relative bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Branch Selection */}
          {step === "branch" && (
            <motion.div
              key="branch"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <Image src="/logo.png" alt="SJ Fitness Logo" width={80} height={80} className="rounded-full" />
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Get Your Free Trial
                </motion.h1>

                <motion.p
                  className="text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Choose your preferred SJ Fitness location for a 1-day free trial
                </motion.p>
              </div>

              {/* Branch Selection */}
              <div className="space-y-4 mb-8">
                {branches.map((branch, index) => (
                  <motion.div
                    key={branch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <BranchCard
                      {...branch}
                      isSelected={selectedBranch === branch.id}
                      onClick={() => handleBranchSelect(branch.id)}
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="button"
                onClick={handleContinue}
                disabled={!selectedBranch}
                className="w-full bg-brand-yellow text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center">
                  Continue to Details
                  <ArrowRight className="ml-2 w-5 h-5" />
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: User Details Form */}
          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-6"
                >
                  <Image src="/logo.png" alt="SJ Fitness Logo" width={80} height={80} className="rounded-full" />
                </motion.div>

                <motion.h1
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Almost There!
                </motion.h1>

                <motion.p
                  className="text-zinc-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Fill in your details to claim your free trial at{" "}
                  <span className="text-brand-yellow font-medium">
                    {branches.find((b) => b.id === selectedBranch)?.title}
                  </span>
                </motion.p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField icon={User} type="text" placeholder="Full Name" id="name" />
                <InputField icon={Mail} type="email" placeholder="Email Address" id="email" />
                <InputField icon={Phone} type="tel" placeholder="Phone Number" id="phone" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex items-center group">
                    <Calendar className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-yellow transition-colors duration-200" />
                    <input
                      type="date"
                      id="preferred-date"
                      name="preferred-date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 focus:border-brand-yellow transition-all duration-200 hover:border-zinc-600"
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2 ml-1">Preferred trial date</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative flex items-center group">
                    <Clock className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-brand-yellow transition-colors duration-200" />
                    <select
                      id="preferred-time"
                      name="preferred-time"
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow/30 focus:border-brand-yellow transition-all duration-200 hover:border-zinc-600"
                    >
                      <option value="">Select preferred time</option>
                      <option value="morning">Morning (6:00 AM - 10:00 AM)</option>
                      <option value="afternoon">Afternoon (10:00 AM - 4:00 PM)</option>
                      <option value="evening">Evening (4:00 PM - 10:00 PM)</option>
                    </select>
                  </div>
                </motion.div>

                <div className="flex space-x-4 pt-4">
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-zinc-800 text-white font-medium py-4 px-6 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-brand-yellow text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow"
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />
                          Processing...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          Claim Free Trial
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Success Message */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-6"
              >
                <CheckCircle className="w-20 h-20 text-brand-yellow" />
              </motion.div>

              <motion.h1
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Trial Booked Successfully!
              </motion.h1>

              <motion.div
                className="bg-zinc-900 rounded-lg p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-zinc-300 mb-4">
                  Your free trial has been confirmed at{" "}
                  <span className="text-brand-yellow font-medium">
                    {branches.find((b) => b.id === selectedBranch)?.title}
                  </span>
                </p>
                <p className="text-sm text-zinc-400">
                  We&apos;ll send you a confirmation email with all the details and what to bring for your trial session.
                </p>
              </motion.div>

              <motion.button
                type="button"
                onClick={resetForm}
                className="bg-brand-yellow text-black font-semibold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Book Another Trial
              </motion.button>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-zinc-500">
                  Questions? Contact us at info@sjfitness.com or call +91 98765 43210
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
