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
  AlertTriangle,
  CreditCard,
  Lock,
  ChevronDown
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

// --- Helper Components ---

const RadioButton = ({ isSelected }: { isSelected: boolean }) => (
  <div
    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${
      isSelected ? "border-brand-yellow" : "border-input"
    }`}
  >
    {isSelected && <div className="w-3 h-3 bg-brand-yellow rounded-full" />}
  </div>
)

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

// --- Custom Hover Dropdown Component ---
const HoverTimeSelect = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { val: "morning", label: "Morning (6:00 AM - 10:00 AM)" },
    { val: "afternoon", label: "Afternoon (10:00 AM - 4:00 PM)" },
    { val: "evening", label: "Evening (4:00 PM - 10:00 PM)" }
  ];

  const getLabel = () => {
    if (!value) return "Select preferred time";
    return options.find(o => o.val === value)?.label;
  };

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
       <div className={`relative flex items-center w-full bg-input border border-input rounded-lg py-4 pl-12 pr-4 cursor-pointer transition-all duration-200 hover:border-input/80 ${isOpen ? 'ring-2 ring-brand-yellow/50 border-brand-yellow' : ''}`}>
          <Clock className="absolute left-4 w-5 h-5 text-muted-foreground group-hover:text-brand-yellow transition-colors duration-200" />
          <span className={`flex-1 ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
            {getLabel()}
          </span>
          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
       </div>
       
       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             transition={{ duration: 0.15 }}
             className="absolute z-50 top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
           >
             {options.map((opt) => (
               <div 
                 key={opt.val}
                 onClick={() => { onChange(opt.val); setIsOpen(false); }}
                 className={`px-4 py-3 cursor-pointer hover:bg-brand-yellow/10 hover:text-brand-yellow transition-colors text-sm ${value === opt.val ? 'bg-brand-yellow/20 text-brand-yellow font-medium' : 'text-foreground'}`}
               >
                 {opt.label}
               </div>
             ))}
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

// --- Main Component ---

function AuthFormComponent() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('leadId')

  const [step, setStep] = useState<"branch" | "details" | "success">("branch")
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Form States
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  
  // Chatbot Pre-fill States
  const [isPreloading, setIsPreloading] = useState(!!leadId)
  const [preloadError, setPreloadError] = useState<string | null>(null)

  const branches = [
    { id: "Vaishali", title: "SJ Fitness Vaishali Nagar", address: "Vaishali Nagar, Jaipur, Rajasthan", features: ["Modern Equipment", "Personal Training", "Group Classes", "Nutrition Guidance"] },
    { id: "gandhi-path", title: "SJ Fitness Gandhi Path", address: "Gandhi Path, Jaipur, Rajasthan", features: ["Premium Facilities", "Swimming Pool", "Yoga Studio", "Steam & Sauna"] },
  ]

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
          setStep("branch")
        } finally {
          setIsPreloading(false)
        }
      }
      prefillForm()
    }
  }, [leadId])

  // --- Razorpay Logic ---

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleFinalRegistration = async (paymentId: string) => {
    const branchName = selectedBranch === "Vaishali" ? "SJ Fitness Vaishali Nagar" : "SJ Fitness Gandhi Path"
    const finalLeadData = { name, email, phone, branch: branchName, date, time, paymentId, amount: 200 }

    try {
      const dbRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalLeadData),
      })

      if (!dbRes.ok) {
        const dbErrorData = await dbRes.json()
        throw new Error(dbErrorData?.message || "Failed to save booking.")
      }
      
      // --- GENERATE VERIFICATION QR CODE ---
      // FIX: FORCE THE PRODUCTION DOMAIN
      // This ensures that even if you test on localhost, the QR code will point to the live site.
      // REPLACE 'https://sjfitness.in' with your actual Vercel domain if different.
      const origin = 'https://sjfitness.vercel.app'; 
      
      const verificationUrl = `${origin}/verify-pass?id=${paymentId}&name=${encodeURIComponent(name)}&branch=${encodeURIComponent(branchName)}&date=${date}&status=valid`;
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(verificationUrl)}`

      await fetch("/api/email/day-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...finalLeadData, qrUrl, paymentId }),
      })
      
      toast({ title: "Payment Successful!", description: "Your 1-day pass receipt has been emailed." })
      setStep("success")
    } catch (err: any) {
      console.error(err)
      toast({ title: "Booking Error", description: "Payment received but booking failed. Contact support.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!name || !email || !phone || !date || !time) {
        toast({ title: "Missing Details", description: "Please fill in all fields.", variant: "destructive" })
        return
    }

    setIsLoading(true)

    const isLoaded = await loadRazorpay()
    if (!isLoaded) {
      toast({ title: "System Error", description: "Razorpay SDK failed to load.", variant: "destructive" })
      setIsLoading(false)
      return
    }

    const options = {
      key: "rzp_test_ROhDstKLFyy0rA", 
      amount: "20000", // 200 INR
      currency: "INR",
      name: "SJ Fitness",
      description: "1-Day Trial Pass",
      image: "/logo.png", 
      handler: async function (response: any) {
        await handleFinalRegistration(response.razorpay_payment_id)
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#ffd700",
      },
    }

    const paymentObject = new (window as any).Razorpay(options)
    paymentObject.open()
    
    paymentObject.on('payment.failed', function (response: any){
        toast({ title: "Payment Failed", description: response.error.description, variant: "destructive" })
        setIsLoading(false)
    });
  }


  const handleBranchSelect = (branchId: string) => setSelectedBranch(branchId)
  const handleContinue = () => selectedBranch && setStep("details")
  const handleBack = () => setStep("branch")

  const resetForm = () => {
    setStep("branch")
    setSelectedBranch("")
    setName(""); setEmail(""); setPhone(""); setDate(""); setTime("");
    if(typeof window !== 'undefined') {
      window.history.pushState({}, '', window.location.pathname);
    }
  }

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
            <motion.h1 className="text-3xl font-bold text-foreground mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Get Your Trial Pass</motion.h1>
            <motion.p className="text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Choose your preferred SJ Fitness location for a 1-day pass</motion.p>
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
              Confirm your details for a trial pass at{" "}
              <span className="text-brand-yellow font-medium">{selectedBranch === "Vaishali" ? "SJ Fitness Vaishali Nagar" : "SJ Fitness Gandhi Path"}</span>
            </motion.p>
          </div>
          
          <form onSubmit={handlePayment} className="space-y-6">
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
            
            {/* Custom Hover Dropdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <HoverTimeSelect value={time} onChange={setTime} />
            </motion.div>
            
            <div className="pt-2">
                 <p className="text-sm text-center mb-3 text-muted-foreground">
                    You have to pay <span className="text-brand-yellow font-bold">₹200</span> to claim this trial pass
                 </p>
                <div className="flex space-x-4">
                  <motion.button type="button" onClick={handleBack} className="flex-1 bg-secondary text-secondary-foreground font-medium py-4 px-6 rounded-lg hover:bg-secondary/80 transition-colors duration-200" whileTap={{ scale: 0.98 }}>Back</motion.button>
                  
                  <motion.button type="submit" disabled={isLoading} className="flex-1 bg-brand-yellow text-black font-semibold py-4 px-6 rounded-lg hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-brand-yellow shadow-[0_0_20px_rgba(255,215,0,0.2)]" whileTap={{ scale: 0.98 }}>
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2" />Processing...
                        </motion.div>
                      ) : (
                        <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                            <Lock className="w-4 h-4 mr-2 opacity-75" />
                            <span>Pay & Claim</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                    <CreditCard className="w-3 h-3" /> Secure payment via Razorpay
                </p>
            </div>
          </form>
        </motion.div>
      )}

      {step === "success" && (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }} className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-brand-yellow" />
          </motion.div>
          <motion.h1 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Payment Successful!</motion.h1>
          <motion.div className="bg-muted rounded-lg p-6 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <p className="text-muted-foreground mb-4">Your trial pass has been confirmed. We’ve sent your receipt to your email.</p>
            <div className="text-sm font-medium text-brand-yellow bg-brand-yellow/10 py-2 rounded">Amount Paid: ₹200.00</div>
          </motion.div> 
          <motion.button type="button" onClick={resetForm} className="bg-brand-yellow text-black font-semibold py-4 px-8 rounded-lg hover:bg-yellow-400 transition-colors duration-200" whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>Book Another</motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

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