"use client"

import type React from "react"
import { useCallback, useMemo, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import {
  Star,
  Zap,
  Gem,
  Crown,
  Check,
  Loader2,
  Dumbbell,
  Users,
  CalendarDays,
  Sparkles,
  ChevronDown, // For FAQ accordion
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const featureGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const featureItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

// --- Plan Structure with Detailed Features ---
type Plan = {
  key: "1m" | "3m" | "6m" | "12m"
  label: string
  price: number // Reverted to original prices
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  features: string[] // Added detailed features
}

// --- Updated PLANS constant with original prices and more content ---
const PLANS: Plan[] = [
  {
    key: "1m",
    label: "1 Month",
    price: 3000,
    desc: "A flexible start to your fitness journey.",
    icon: Star,
    features: ["Full Gym Access", "Standard Workout Plan", "Locker Facilities", "Monthly Outings", "Yoga | Zumba | HIIT |  Aerobics Classes"],
  },
  {
    key: "3m",
    label: "3 Months",
    price: 6500,
    desc: "Commit to consistency and see real results.",
    icon: Zap,
    features: ["Everything in 1 Month", "BCA Test", "Access to Group Classes", "Fitness Assessment"],
  },
  {
    key: "6m",
    label: "6 Months",
    price: 9000,
    desc: "A solid commitment for transformative change.",
    icon: Gem,
    features: ["Everything in 3 Months", "Monthly Body Composition Analysis"],
  },
  {
    key: "12m",
    label: "1 Year",
    price: 13500,
    desc: "The ultimate value for a dedicated lifestyle.",
    icon: Crown,
    features: ["Everything in 6 Months", "10% Off on Merchandise"],
  },
]

export default function MembershipPage() {
  const [selected, setSelected] = useState<Plan>(PLANS[1])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const priceText = useMemo(() => `₹${selected.price.toLocaleString("en-IN")}`, [selected])

  const proceed = useCallback(() => {
    setIsRedirecting(true)
    toast({
      title: "Great Choice!",
      description: `Finalizing your ${selected.label} plan...`,
    })
    setTimeout(() => {
      router.push(`/payment?plan=${selected.key}`)
    }, 1500)
  }, [router, selected, toast])

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section (Unchanged) */}
      <section className="relative">
        <div className="relative h-[91vh] md:h-[91vh] overflow-hidden">
          <img
            src="/membership-hero.jpg"
            alt="SJ Fitness Membership"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight text-white text-balance"
              >
                CHOOSE YOUR <span className="text-yellow-400">MEMBERSHIP</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="text-gray-200 mt-3 md:text-lg">
                Flexible plans. Transparent pricing. Expert guidance at every step.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main two-column layout */}
      <section className="max-w-6xl mx-auto px-4 py-8 lg:py-16 grid lg:grid-cols-3 gap-8">
        {/* Left: Plan list with detailed features */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-[var(--color-brand-yellow)]" />
              <h2 className="text-xl font-semibold">Select Your Plan</h2>
            </div>
            <div className="grid gap-4">
              {PLANS.map((p) => {
                const Icon = p.icon
                const active = p.key === selected.key
                return (
                  <motion.button
                    key={p.key}
                    onClick={() => setSelected(p)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      "w-full text-left rounded-xl border p-5 transition-all duration-200 ease-in-out",
                      active
                        ? "border-[var(--color-brand-yellow)] ring-2 ring-[var(--color-brand-yellow)]/30 bg-card"
                        : "hover:border-foreground/20",
                    )}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border shrink-0">
                        {active && (
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: "var(--color-brand-yellow)" }}
                          />
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-md bg-[var(--color-brand-yellow)]/15 flex items-center justify-center">
                              {Icon && <Icon className="h-5 w-5 text-[var(--color-brand-yellow)]" />}
                            </div>
                            <div className="font-semibold text-lg">{p.label}</div>
                          </div>
                          <div className="text-2xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                        {/* --- NEW: Features List --- */}
                        <div className="mt-4 border-t pt-3">
                          <ul className="space-y-2 text-sm">
                            {p.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                <Check className="w-4 h-4 text-green-500 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Order Summary card (unchanged logic) */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-brand-yellow)] rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="text-lg font-semibold">Pro Membership</div>
                <div className="text-sm text-muted-foreground">Access all our premium facilities.</div>
              </div>
            </div>
            <div className="space-y-2 py-4 border-y">
              <div className="flex justify-between text-muted-foreground">
                <span>Selected Plan</span>
                <span className="font-medium text-foreground">{selected.label}</span>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total Amount</span>
                <span>{priceText}</span>
              </div>
            </div>
            <button
              onClick={proceed}
              disabled={isRedirecting}
              className={cn(
                "mt-6 w-full rounded-md px-4 py-3 font-semibold text-black transition-all duration-300 flex items-center justify-center",
                "hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.02]",
                isRedirecting ? "bg-yellow-300 cursor-not-allowed" : "bg-[var(--color-brand-yellow)]",
              )}
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Redirecting...
                </>
              ) : (
                "Continue to Payment"
              )}
            </button>
          </div>
        </aside>
      </section>

      {/* --- NEW: Animated "Unlock Your Potential" Section --- */}
      <section className="bg-card border-y">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={itemVariants}>
            <h2 className="text-3xl font-bold">Unlock Your Potential</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              A membership at SJ Fitness is your key to a world-class fitness environment designed for results.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureGridVariants}
          >
            <FeatureCard
              icon={Dumbbell}
              title="Premium Equipment"
              description="State-of-the-art machines for cardio, strength, and functional training."
            />
            <FeatureCard
              icon={Users}
              title="Expert Guidance"
              description="Certified trainers available to assist you in reaching your fitness goals."
            />
            <FeatureCard
              icon={CalendarDays}
              title="Dynamic Classes"
              description="Engaging group sessions like Yoga, Zumba, and HIIT included in your plan."
            />
            <FeatureCard
              icon={Sparkles}
              title="Supportive Atmosphere"
              description="Join a clean, motivating, and friendly environment for all fitness levels."
            />
          </motion.div>
        </div>
      </section>

      {/* --- NEW: Robust FAQ and Support Section --- */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Answers & Support</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to know before you get started.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold">Payment & Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We accept all major payment methods for your convenience. For any queries, feel free to contact our support team.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md border px-2 py-1">Visa</span>
                <span className="rounded-md border px-2 py-1">Mastercard</span>
                <span className="rounded-md border px-2 py-1">UPI</span>
                <span className="rounded-md border px-2 py-1">Rupay</span>
              </div>
               <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Contact Us:</p>
                <a href="mailto:support@sjfitness.com" className="hover:text-[var(--color-brand-yellow)]">support@sjfitness.com</a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <FAQItem
                  question="What are the gym operating hours?"
                  answer="We are open from 5:00 AM to 11:00 PM on weekdays, and from 7:00 AM to 9:00 PM on weekends and public holidays."
                />
                <FAQItem
                  question="Is personal training included in the membership?"
                  answer="While general guidance from floor trainers is always available, dedicated personal training sessions are available as a separate, add-on package. The 3-month plan includes one complimentary session."
                />
                <FAQItem
                  question="Can I pause or freeze my membership?"
                  answer="Yes, members with 6-month and 1-year plans are eligible to freeze their membership once during their term for up to 30 days. Please contact the front desk for assistance."
                />
                 <FAQItem
                  question="What is the cancellation policy?"
                  answer="Memberships are non-refundable. However, you can choose not to renew your plan at the end of its cycle. For any exceptional circumstances, please speak with our management."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// Helper component for the animated feature cards
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <motion.div variants={featureItemVariants} className="bg-background border rounded-lg p-6 text-center flex flex-col items-center">
    <div className="h-14 w-14 rounded-full bg-[var(--color-brand-yellow)]/15 flex items-center justify-center mb-4">
      <Icon className="h-7 w-7 text-[var(--color-brand-yellow)]" />
    </div>
    <h4 className="font-semibold text-lg">{title}</h4>
    <p className="text-sm text-muted-foreground mt-1">{description}</p>
  </motion.div>
)

// Helper component for the FAQ accordion
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left">
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={cn("w-5 h-5 transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-3 text-sm text-muted-foreground">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}