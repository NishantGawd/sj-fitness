"use client"

import type React from "react"

import { useCallback, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Star, Zap, Gem, Crown, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Plan = {
  key: "1m" | "3m" | "6m" | "12m"
  label: string
  price: number
  desc: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const PLANS: Plan[] = [
  { key: "1m", label: "1 Month", price: 3000, desc: "Perfect to get started", icon: Star },
  { key: "3m", label: "3 Months", price: 6000, desc: "Commit to consistency", icon: Zap },
  { key: "6m", label: "6 Months", price: 9000, desc: "Best value mid-term", icon: Gem },
  { key: "12m", label: "1 Year", price: 13000, desc: "Ultimate commitment", icon: Crown },
]

export default function MembershipPage() {
  const [selected, setSelected] = useState<Plan>(PLANS[1])
  const router = useRouter()
  const { toast } = useToast()
  const priceText = useMemo(() => `₹${selected.price.toLocaleString("en-IN")}`, [selected])

  const proceed = useCallback(() => {
    toast({ title: "Plan selected", description: `${selected.label} • ${priceText}` })
    router.push(`/payment?plan=${selected.key}`)
  }, [router, selected, priceText, toast])

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[260px] w-full overflow-hidden rounded-none">
          <Image
            src="/interior.jpg"
            alt="Train hard at SJ Fitness"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white text-balance">Complete Your Membership</h1>
              <p className="text-zinc-300 mt-2 text-pretty">
                Choose your plan and payment type. Pay securely with Card, and for one-time payments, UPI is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main two-column layout (old style preserved) */}
      <section className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left: Plan list (2 columns) */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-card p-4 md:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
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
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    className={cn(
                      "w-full text-left rounded-xl border p-5 transition-all",
                      active
                        ? "border-[var(--color-brand-yellow)] ring-2 ring-[var(--color-brand-yellow)]/30"
                        : "hover:border-[var(--color-brand-yellow)]/50",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border">
                        {active && (
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: "var(--color-brand-yellow)" }}
                          />
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-md bg-[var(--color-brand-yellow)]/15 flex items-center justify-center">
                              {Icon ? <Icon className="h-4 w-4 text-[var(--color-brand-yellow)]" /> : null}
                            </div>
                            <div className="font-semibold">{p.label}</div>
                          </div>
                          <div className="text-2xl font-extrabold">₹{p.price.toLocaleString("en-IN")}</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Order Summary card */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--color-brand-yellow)] rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="font-semibold">Pro Membership</div>
                <div className="text-sm text-muted-foreground">
                  Most popular choice for serious fitness enthusiasts.
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan</span>
                <span>{selected.label}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{priceText}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> <span>No joining fee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> <span>Free fitness assessment</span>
              </div>
            </div>
            <button
              onClick={proceed}
              className="mt-6 w-full rounded-md px-4 py-3 font-semibold"
              style={{ background: "var(--color-brand-yellow)", color: "#000" }}
            >
              Continue to Payment
            </button>
          </div>
        </aside>
      </section>
    </main>
  )
}
