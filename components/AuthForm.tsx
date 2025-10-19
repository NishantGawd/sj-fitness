"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  User,
  ArrowRight,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle, // Added for better error display
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// --- Helper Components (Slightly Updated for Controlled Inputs & Style) ---

const RadioButton = ({ isSelected }: { isSelected: boolean }) => (
  <div
    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
      isSelected ? "border-brand-yellow" : "border-input"
    }`}
  >
    {isSelected && <div className="w-3 h-3 bg-brand-yellow rounded-full" />}
  </div>
)

// Updated to be a controlled component for pre-filling
const InputField = ({
  icon: Icon,
  type,
  placeholder,
  id,
  value,
  onChange,
  required = true,
}: {
  icon: React.ElementType
  type: string
  placeholder: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative flex items-center group">
      <Icon className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-brand-yellow transition-colors duration-200" />
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-input border border-input rounded-lg py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-200 hover:border-input/80"
      />
    </div>
  </motion.div>
)

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
      isSelected ? "border-brand-yellow bg-brand-yellow/5" : "border-border bg-muted hover:bg-accent"
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-start space-x-3 mb-4">
      <RadioButton isSelected={isSelected} />
      <MapPin className={`w-5 h-5 mt-1 ${isSelected ? "text-brand-yellow" : "text-muted-foreground"}`} />
      <div>
        <h3 className={`font-semibold text-lg ${isSelected ? "text-brand-yellow" : "text-foreground"}`}>{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{address}</p>
      </div>
    </div>
    <div className="space-y-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-brand-yellow" : "bg-muted-foreground"}`} />
          <span className="text-sm text-muted-foreground">{feature}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

// Main component logic moved here
function AuthFormComponent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')

  const [step, setStep] = useState<"branch" | "details" | "success">("branch")
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // States for all form fields to enable pre-filling
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  
  // New states for handling the chatbot pre-fill flow
  const [isPreloading, setIsPreloading] = useState(!!leadId)
  const [preloadError, setPreloadError] = useState<string | null>(null)

  const branches = [
    { id: "Vaishali", title: "SJ Fitness Vaishali Nagar", address: "Vaishali Nagar, Jaipur, Rajasthan", features: ["Modern Equipment", "Personal Training", "Group Classes", "Nutrition Guidance"] },
    { id: "gandhi-path", title: "SJ Fitness Gandhi Path", address: "Gandhi Path, Jaipur, Rajasthan", features: ["Premium Facilities", "Swimming Pool", "Yoga Studio", "Steam & Sauna"] },
  ]

  // This effect runs only if a leadId is found in the URL to pre-fill the form
  useEffect(() => {
    if (leadId) {
      const prefillForm = async () => {
        setIsPreloading(true)
        setPreloadError(null)
        try {
          const res = await fetch(`/api/leads/${leadId}`)
          if (!res.ok) {
            const errorData = await res.json()
            throw new Error(errorData.message || "This trial link is invalid or has expired.")
          }
          const data = await res.json()
          
          setName(data.name || "")
          setEmail(data.email || "")
          setPhone(data.phone || "")
          setDate(data.date || new Date().toISOString().split("T")[0])
          setTime(data.time || "")

          if (data.branch?.toLowerCase().includes("vaishali")) {
            setSelectedBranch("Vaishali")
          } else if (data.branch?.toLowerCase().includes("gandhi")) {
            setSelectedBranch("gandhi-path")
          }
          
          setStep("details")
        } catch (err: any) {
          setPreloadError(err.message)
          // Fallback to manual booking
          setStep("branch")
        } finally {
          setIsPreloading(false)
        }
      }
      prefillForm()
    }
  }, [leadId])


  const handleBranchSelect = (branchId: string) => setSelectedBranch(branchId)
  const handleContinue = () => selectedBranch && setStep("details")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const branchName = selectedBranch === "Vaishali" ? "SJ Fitness Vaishali Nagar" : "SJ Fitness Gandhi Path"
    const finalLeadData = { name, email, phone, branch: branchName, date, time }

    try {
      const dbRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalLeadData),
      })

      if (!dbRes.ok) {
        const dbErrorData = await dbRes.json()
        throw new Error(dbErrorData?.message || "Failed to book your trial. Please try again.")
      }
      
      const qrData = JSON.stringify({ email, date, branch: branchName, type: "day-pass" })
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`

      await fetch("/api/email/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...finalLeadData, qrUrl }),
      })
      
      toast({ title: "Free trial booked!", description: "We’ve emailed your 1‑day pass." })
      setStep("success")
    } catch (err: any) {
      toast({ title: "Could not complete request", description: err?.message || "Please try again.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => setStep("branch")

  const resetForm = () => {
    setStep("branch")
    setSelectedBranch("")
    setName(""); setEmail(""); setPhone(""); setDate(""); setTime("");
    window.history.pushState({}, '', window.location.pathname);
  }

  // --- Main Render Logic ---

  if (isPreloading) {
    return (
        <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-muted border-t-brand-yellow rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your details...</p>
        </div>
      )
  }

  return (
    <AnimatePresence mode="wait">
      {step === "branch" && (
        <motion.div key="branch" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="flex justify-center mb-6">
              <Image src="/logo.png" alt="SJ Fitness Logo" width={80} height={80} className="rounded-full" />
            </motion.div>
            <motion.h1 className="text-3xl font-bold text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Get Your Free Trial</motion.h1>
            <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Choose your preferred SJ Fitness location for a 1-day free trial</motion.p>
             {preloadError && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1}} className="mt-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg flex items-center justify-center space-x-2">
                     <AlertTriangle className="w-4 h-4" />
                     <span>{preloadError}</span>
                 </motion.div>
             )}
          </div>
          <div className="space-y-4 mb-8">
            {branches.map((branch, index) => (
              <motion.div key={branch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }}>
                <BranchCard {...branch} isSelected={selectedBranch === branch.id} onClick={() => handleBranchSelect(branch.id)} />
              </motion.div>
            ))}
          </div>
          <motion.button type="button" onClick={handleContinue} disabled={!selectedBranch} className="w-full bg-brand-yellow text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow" whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="flex items-center justify-center">Continue to Details<ArrowRight className="ml-2 w-5 h-5" /></div>
          </motion.button>
        </motion.div>
      )}

      {step === "details" && (
        <motion.div key="details" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="flex justify-center mb-6">
              <Image src="/logo.png" alt="SJ Fitness Logo" width={80} height={80} className="rounded-full" />
            </motion.div>
            <motion.h1 className="text-3xl font-bold text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Almost There!</motion.h1>
            <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              Confirm your details for a free trial at{" "}
              <span className="text-brand-yellow font-medium">{selectedBranch === "Vaishali" ? "SJ Fitness Vaishali Nagar" : "SJ Fitness Gandhi Path"}</span>
            </motion.p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField icon={User} type="text" placeholder="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputField icon={Mail} type="email" placeholder="Email Address" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField icon={Phone} type="tel" placeholder="Phone Number" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="relative flex items-center group">
                <Calendar className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-brand-yellow transition-colors duration-200" />
                <input type="date" id="preferred-date" name="preferred-date" min={new Date().toISOString().split("T")[0]} required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-input border border-input rounded-lg py-4 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-200 hover:border-input/80" />
              </div>
              <p className="text-xs text-muted-foreground mt-2 ml-1">Preferred trial date</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="relative flex items-center group">
                <Clock className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-brand-yellow transition-colors duration-200" />
                <select id="preferred-time" name="preferred-time" required value={time} onChange={(e) => setTime(e.target.value)} className={`w-full bg-input border border-input rounded-lg py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all duration-200 hover:border-input/80 ${time ? 'text-foreground' : 'text-muted-foreground'}`}>
                  <option value="" disabled>Select preferred time</option>
                  <option value="morning" className="text-foreground bg-background">Morning (6:00 AM - 10:00 AM)</option>
                  <option value="afternoon" className="text-foreground bg-background">Afternoon (10:00 AM - 4:00 PM)</option>
                  <option value="evening" className="text-foreground bg-background">Evening (4:00 PM - 10:00 PM)</option>
                </select>
              </div>
            </motion.div>
            <div className="flex space-x-4 pt-4">
              <motion.button type="button" onClick={handleBack} className="flex-1 bg-secondary text-secondary-foreground font-medium py-4 px-6 rounded-lg hover:bg-secondary/80 transition-colors duration-200" whileTap={{ scale: 0.98 }}>Back</motion.button>
              <motion.button type="submit" disabled={isLoading} className="flex-1 bg-brand-yellow text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow" whileTap={{ scale: 0.98 }}>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />Processing...
                    </motion.div>
                  ) : (
                    <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">Claim Free Trial<ArrowRight className="ml-2 w-5 h-5" /></motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {step === "success" && (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-brand-yellow" />
          </motion.div>
          <motion.h1 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Trial Booked Successfully!</motion.h1>
          <motion.div className="bg-muted rounded-lg p-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-muted-foreground mb-4">Your free trial has been confirmed. We’ve sent details to your email.</p>
          </motion.div> 
          <motion.button type="button" onClick={resetForm} className="bg-brand-yellow text-black font-semibold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors duration-200" whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Book Another Trial</motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// This wrapper component is required by Next.js when using `useSearchParams`.
// It provides a "Suspense Boundary" which shows a fallback UI while the page is loading.
export default function AuthForm() {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background relative">
        <motion.div
          className="relative bg-card border border-border p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
            <Suspense fallback={
                <div className="text-center py-20">
                    <div className="w-10 h-10 border-4 border-muted border-t-brand-yellow rounded-full animate-spin mx-auto mb-4" />
                </div>
            }>
                <AuthFormComponent />
            </Suspense>
        </motion.div>
      </div>
    )
}

