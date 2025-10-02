"use client"

import { useCallback, useMemo, useState, useEffect, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Building2, Check, CreditCard, Shield, Star, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay?: any
  }
}

async function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return false
  if (window.Razorpay) return true
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const plans = [
  { id: "1m", name: "1 Month", price: "3000", description: "Perfect to get started" },
  { id: "3m", name: "3 Months", price: "6000", description: "Commit to consistency" },
  { id: "6m", name: "6 Months", price: "9000", description: "Best value mid-term" },
  { id: "12m", name: "1 Year", price: "13000", description: "Ultimate commitment" },
] as const

type PlanId = (typeof plans)[number]["id"]
type PayMode = "subscription" | "one-time"

function validateForm(form: Record<string, string>) {
  const emailValid = /\S+@\S+\.\S+/.test(form.email)
  const phoneValid = /^\+?[0-9]{7,15}$/.test(form.phone.replace(/\s/g, ""))
  const namesValid = form.firstName.trim().length > 1 && form.lastName.trim().length > 1
  const branchValid = !!form.branch
  const overall = emailValid && phoneValid && namesValid && branchValid
  return { emailValid, phoneValid, namesValid, branchValid, overall }
}

function PaymentForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("1m")
  const [payMode, setPayMode] = useState<PayMode>("subscription")
  const [isStartingCheckout, setIsStartingCheckout] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
  })

  const searchParams = useSearchParams()
  useEffect(() => {
    const qp = searchParams.get("plan") as PlanId | null
    if (qp && plans.some((p) => p.id === qp)) {
      setSelectedPlan(qp)
    }
  }, [searchParams])

  const selected = useMemo(() => plans.find((p) => p.id === selectedPlan)!, [selectedPlan])

  const { emailValid, phoneValid, namesValid, branchValid, overall } = useMemo(() => validateForm(form), [form])

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const startCheckout = useCallback(async () => {
    setIsStartingCheckout(true)
    try {
      const ok = await loadRazorpay()
      if (!ok || !window.Razorpay) {
        toast({
          title: "Payment unavailable",
          description: "Razorpay failed to load. Please check your network and try again.",
          variant: "destructive",
        })
        return
      }

      const fullName = `${form.firstName} ${form.lastName}`.trim()
      if (!fullName || !form.email || !form.phone || !form.branch) {
        toast({
          title: "Missing details",
          description: "Please fill all details to continue.",
          variant: "destructive",
        })
        return
      }

      if (payMode === "one-time") {
        const amountInPaise = Number.parseInt(selected.price) * 100
        const res = await fetch("/api/razorpay/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountInPaise,
            name: fullName,
            email: form.email,
            phone: form.phone,
            notes: {
              planId: selectedPlan,
              branch: form.branch,
              purpose: "one-time-membership",
            },
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.error || "Failed to start payment")
        }

        const options = {
          key: data.keyId,
          amount: amountInPaise,
          currency: "INR",
          name: "SJ Fitness",
          description: `${selected.name} Membership`,
          order_id: data.orderId,
          prefill: {
            name: fullName,
            email: form.email,
            contact: form.phone,
          },
          notes: {
            planId: selectedPlan,
            branch: form.branch,
          },
          theme: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--primary")?.trim() || "#111111",
          },
          handler: async (resp: any) => {
            const fullName = `${form.firstName} ${form.lastName}`.trim();
            const verify = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "order",
                payload: {
                  razorpay_order_id: data.orderId,
                  razorpay_payment_id: resp.razorpay_payment_id,
                  razorpay_signature: resp.razorpay_signature,
                  name: fullName,
                  email: form.email,
                  phone: form.phone,
                  planName: selected.name,
                  planId: selectedPlan,
                  amount: Number(selected.price),
                  notes: { branch: form.branch }
                },
              }),
            });
            const v = await verify.json()
            if (v.valid) {
              toast({ title: "Payment successful", description: "Your membership has been activated." })
              fetch("/api/email/one-time", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: fullName,
                  email: form.email,
                  planId: selectedPlan,
                  planName: selected.name,
                  amount: Number(selected.price),
                  branch: form.branch,
                  orderId: data.orderId,
                  paymentId: resp.razorpay_payment_id,
                  mode: "one-time",
                }),
              })
                .then((r) => r.json())
                .then(() =>
                  toast({ title: "Receipt emailed", description: "A confirmation has been sent to your inbox." }),
                )
                .catch(() =>
                  toast({
                    title: "Email not sent",
                    description: "We couldn't send the email right now.",
                    variant: "destructive",
                  }),
                )
              setCurrentStep(2)
              setTimeout(() => router.push("/"), 1200)
            } else {
              toast({
                title: "Verification failed",
                description: "We could not verify the payment signature.",
                variant: "destructive",
              })
            }
          },
          modal: {
            ondismiss: () => {
              toast({ title: "Payment cancelled", description: "You closed the payment window." })
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
        setCurrentStep(2)
      } else {
        const res = await fetch("/api/razorpay/subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            duration: selectedPlan,
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            phone: form.phone,
            notes: {
              branch: form.branch,
            },
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.error || "Failed to start subscription")
        }

        const options = {
          key: data.keyId,
          name: "SJ Fitness",
          description: `${selected.name} Membership (Subscription)`,
          subscription_id: data.subscriptionId,
          prefill: {
            name: `${form.firstName} ${form.lastName}`.trim(),
            email: form.email,
            contact: form.phone,
          },
          notes: {
            duration: selectedPlan,
            branch: form.branch,
          },
          theme: {
            color: getComputedStyle(document.documentElement).getPropertyValue("--primary")?.trim() || "#111111",
          },
          handler: async (resp: any) => {
            const fullName = `${form.firstName} ${form.lastName}`.trim();
            const verify = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "subscription",
                payload: {
                  razorpay_subscription_id: data.subscriptionId,
                  razorpay_payment_id: resp.razorpay_payment_id,
                  razorpay_signature: resp.razorpay_signature,
                  name: fullName,
                  email: form.email,
                  phone: form.phone,
                  planName: selected.name,
                  planId: selectedPlan,
                  amount: Number(selected.price),
                  notes: { branch: form.branch }
                },
              }),
            });
            const v = await verify.json()
            if (v.valid) {
              toast({ title: "Subscription active", description: "Your membership subscription is active." })
              fetch("/api/email/membership", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: `${form.firstName} ${form.lastName}`.trim(),
                  email: form.email,
                  planId: selectedPlan,
                  planName: selected.name,
                  amount: Number(selected.price),
                  branch: form.branch,
                  mode: "subscription",
                  subscriptionId: data.subscriptionId,
                  paymentId: resp.razorpay_payment_id,
                }),
              })
                .then((r) => r.json())
                .then(() =>
                  toast({ title: "Receipt emailed", description: "A confirmation has been sent to your inbox." }),
                )
                .catch(() =>
                  toast({
                    title: "Email not sent",
                    description: "We couldn't send the email right now.",
                    variant: "destructive",
                  }),
                )
              setCurrentStep(2)
              setTimeout(() => router.push("/"), 1200)
            } else {
              toast({
                title: "Verification failed",
                description: "We could not verify the subscription payment.",
                variant: "destructive",
              })
            }
          },
          modal: {
            ondismiss: () => {
              toast({ title: "Checkout closed", description: "You closed the subscription window." })
            },
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
        setCurrentStep(2)
      }
    } catch (e: any) {
      console.error("[v0] startCheckout error:", e)
      toast({
        title: "Something went wrong",
        description: e?.message || "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsStartingCheckout(false)
    }
  }, [form, selectedPlan, payMode, selected.price, toast])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 text-sm">
            <div
              className={`flex items-center gap-2 ${currentStep === 1 ? "text-foreground" : "text-muted-foreground"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? "bg-brand-yellow text-black" : "bg-muted text-foreground"}`}
              >
                1
              </div>
              <span>Details</span>
            </div>
            <div className="h-px flex-1 bg-border" />
            <div
              className={`flex items-center gap-2 ${currentStep === 2 ? "text-foreground" : "text-muted-foreground"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? "bg-brand-yellow text-black" : "bg-muted text-foreground"}`}
              >
                2
              </div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Complete Your Membership</h1>
                  <p className="text-muted-foreground">
                    Choose your plan and payment type. Pay securely with Card, and for one-time payments, UPI is
                    available.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-brand-yellow" />
                      Select Your Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <RadioGroup
                      value={selectedPlan}
                      onValueChange={(v) => setSelectedPlan(v as PlanId)}
                      className="grid gap-3"
                    >
                      {plans.map((p) => (
                        <label
                          key={p.id}
                          htmlFor={`plan-${p.id}`}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${selectedPlan === p.id ? "border-brand-yellow ring-2 ring-brand-yellow/30 scale-[1.01]" : "border-border hover:border-brand-yellow/50"}`}
                        >
                          <RadioGroupItem id={`plan-${p.id}`} value={p.id} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">{p.name}</span>
                              <span className="text-2xl font-bold">₹{p.price}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                          </div>
                        </label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-brand-yellow" />
                      Payment Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    <RadioGroup value={payMode} onValueChange={(v) => setPayMode(v as PayMode)} className="grid gap-3">
                      <label
                        htmlFor="pay-subscription"
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${payMode === "subscription" ? "border-brand-yellow" : "border-border hover:border-brand-yellow/50"}`}
                      >
                        <RadioGroupItem id="pay-subscription" value="subscription" />
                        <div className="flex-1">
                          <div className="font-semibold">Monthly Subscription</div>
                          <p className="text-xs text-muted-foreground">
                            Best for ongoing membership. Card payments only for recurring in India.
                          </p>
                        </div>
                      </label>

                      <label
                        htmlFor="pay-onetime"
                        className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${payMode === "one-time" ? "border-brand-yellow" : "border-border hover:border-brand-yellow/50"}`}
                      >
                        <RadioGroupItem id="pay-onetime" value="one-time" />
                        <div className="flex-1">
                          <div className="font-semibold">One-Time Payment</div>
                          <p className="text-xs text-muted-foreground">
                            Pay once for the selected month. Supports Card and UPI.
                          </p>
                        </div>
                      </label>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-brand-yellow" />
                      Choose Your Branch
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={form.branch} onValueChange={(v) => handleChange("branch", v)}>
                      <SelectTrigger aria-label="Select branch">
                        <SelectValue placeholder="Select your preferred branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vaisali-nagar">SJ Fitness - Vaisali Nagar</SelectItem>
                        <SelectItem value="gandhi-path">SJ Fitness - Gandhi Path, Jaipur</SelectItem>
                      </SelectContent>
                    </Select>
                    {!form.branch && <p className="text-xs text-destructive mt-2">Please select a branch.</p>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={form.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          aria-invalid={form.firstName.length > 0 && form.firstName.trim().length <= 1}

                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={form.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          aria-invalid={form.lastName.length > 0 && form.lastName.trim().length <= 1}

                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        aria-invalid={!emailValid && form.email.length > 0}
                      />
                      {!emailValid && form.email.length > 0 && (
                        <p className="text-xs text-destructive mt-1">Enter a valid email.</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        aria-invalid={!phoneValid && form.phone.length > 0}
                      />
                      {!phoneValid && form.phone.length > 0 && (
                        <p className="text-xs text-destructive mt-1">Enter a valid phone number.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{selected.name} Membership</h3>
                        <p className="text-sm text-muted-foreground">{selected.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Plan</span>
                        <span>{selected.name}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>
                          ₹{selected.price}
                          {payMode === "subscription"
                            ? selectedPlan === "1m"
                              ? "/month"
                              : selectedPlan === "3m"
                                ? " every 3 months"
                                : selectedPlan === "6m"
                                  ? " every 6 months"
                                  : " yearly"
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>No joining fee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{payMode === "subscription" ? "Cancel anytime" : "One-time purchase"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Free fitness assessment</span>
                      </div>
                    </div>

                    <Button
                      onClick={startCheckout}
                      className="w-full bg-brand-yellow text-black hover:bg-brand-yellow/90 font-semibold"
                      disabled={!overall || isStartingCheckout}
                    >
                      {isStartingCheckout ? "Starting checkout..." : "Continue to Payment"}
                    </Button>
                    {!overall && (
                      <p className="text-xs text-muted-foreground">
                        Fill your details and select a branch to continue.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Payment</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    Payments are processed securely by Razorpay with bank-grade encryption.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-brand-yellow" />
                      Complete Payment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      A Razorpay window should have opened. If it didn’t, click the button below to try again.
                    </p>
                    <div className="flex gap-3">
                      <Button onClick={startCheckout} className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                        Pay Again
                      </Button>
                      <Button variant="outline" onClick={() => setCurrentStep(1)}>
                        Back
                      </Button>
                    </div>
                    {payMode === "one-time" && (
                      <div className="text-xs text-muted-foreground">One-time payments support UPI and cards.</div>
                    )}
                    {payMode === "subscription" && (
                      <div className="text-xs text-muted-foreground">
                        Subscriptions require a supported card with e-mandate.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="w-12 h-12 bg-brand-yellow rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{selected.name} Membership</h3>
                        <p className="text-sm text-muted-foreground">{selected.description}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span>
                          {form.firstName} {form.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{form.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Branch:</span>
                        <span>{form.branch === "vaisali-nagar" ? "Vaisali Nagar" : "Gandhi Path"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Type:</span>
                        <span>{payMode === "subscription" ? "Monthly subscription" : "One-time payment"}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{payMode === "subscription" ? "Recurring Amount" : "One-time Amount"}</span>
                        <span>
                          ₹{selected.price}
                          {payMode === "subscription"
                            ? selectedPlan === "1m"
                              ? "/month"
                              : selectedPlan === "3m"
                                ? " every 3 months"
                                : selectedPlan === "6m"
                                  ? " every 6 months"
                                  : " yearly"
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Razorpay protects your information</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading payment page...</p></div>}>
      <PaymentForm />
    </Suspense>
  )
}
