"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, CreditCard, Smartphone, Building2, Shield, Clock, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Membership plans data (imported from membership page)
const plans = [
  {
    id: "starter",
    name: "Starter",
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
  },
  {
    id: "pro",
    name: "Pro",
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
  },
  {
    id: "elite",
    name: "Elite",
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
  },
]

type FormField =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "branch"
  | "cardNumber"
  | "expiryDate"
  | "cvv"
  | "cardName"

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [formData, setFormData] = useState<{
    firstName: string
    lastName: string
    email: string
    phone: string
    branch: string
    cardNumber: string
    expiryDate: string
    cvv: string
    cardName: string
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  // Get selected plan details
  const plan = plans.find((p) => p.id === selectedPlan) || plans[1]
  const savings = Number.parseInt(plan.originalPrice) - Number.parseInt(plan.price)

  const handleInputChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setCurrentStep(3)
    setIsProcessing(false)
  }

  const isFormValid = () => {
    const requiredFields: FormField[] = ["firstName", "lastName", "email", "phone", "branch"]
    const paymentFields: FormField[] = paymentMethod === "card" ? ["cardNumber", "expiryDate", "cvv", "cardName"] : []

    return [...requiredFields, ...paymentFields].every((field) => formData[field].trim() !== "")
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Left Column - Plan Selection & Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Complete Your Membership</h1>
                  <p className="text-muted-foreground">Join SJ Fitness and start your transformation journey today.</p>
                </div>

                {/* Plan Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-brand-yellow" />
                      Select Your Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                      {plans.map((planOption) => (
                        <div
                          key={planOption.id}
                          className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-brand-yellow/50 transition-colors"
                        >
                          <RadioGroupItem value={planOption.id} id={planOption.id} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Label htmlFor={planOption.id} className="font-semibold">
                                {planOption.name}
                              </Label>
                              {planOption.popular && <Badge className="bg-brand-yellow text-black">Most Popular</Badge>}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">₹{planOption.price}</span>
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{planOption.originalPrice}
                              </span>
                              <span className="text-sm text-green-500 font-medium">
                                Save ₹{Number.parseInt(planOption.originalPrice) - Number.parseInt(planOption.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Branch Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-brand-yellow" />
                      Choose Your Branch
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={formData.branch} onValueChange={(value: string) => handleInputChange("branch", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vaisali-nagar">SJ Fitness - Vaisali Nagar</SelectItem>
                        <SelectItem value="gandhi-path">SJ Fitness - Gandhi Path, Jaipur</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
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
                        <h3 className="font-semibold">{plan.name} Membership</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Fee</span>
                        <span>₹{plan.originalPrice}</span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>Discount (30%)</span>
                        <span>-₹{savings}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{plan.price}/month</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>No joining fee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Cancel anytime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Free fitness assessment</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-brand-yellow text-black hover:bg-brand-yellow/90 font-semibold"
                      disabled={!isFormValid()}
                    >
                      Continue to Payment
                    </Button>
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
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Payment Details</h1>
                  <p className="text-muted-foreground">Secure payment powered by industry-leading encryption.</p>
                </div>

                {/* Payment Method Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-brand-yellow" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-brand-yellow/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <Label htmlFor="card" className="flex-1">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-brand-yellow/50 transition-colors">
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="w-5 h-5" />
                        <Label htmlFor="upi" className="flex-1">
                          UPI Payment
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Payment Form */}
                {paymentMethod === "card" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Card Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          placeholder="Name on card"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "upi" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>UPI Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        You will be redirected to your UPI app to complete the payment.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Secure UPI payment via PhonePe, Google Pay, or Paytm</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handlePayment}
                    className="flex-1 bg-brand-yellow text-black hover:bg-brand-yellow/90 font-semibold"
                    disabled={isProcessing || !isFormValid()}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      `Pay ₹${plan.price}`
                    )}
                  </Button>
                </div>
              </div>

              {/* Order Summary (Repeated) */}
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
                        <h3 className="font-semibold">{plan.name} Membership</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Name:</span>
                        <span>
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Branch:</span>
                        <span>{formData.branch === "vaisali-nagar" ? "Vaisali Nagar" : "Gandhi Path"}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Fee</span>
                        <span>₹{plan.originalPrice}</span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>Discount (30%)</span>
                        <span>-₹{savings}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{plan.price}/month</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secured by 256-bit SSL encryption</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-4">Welcome to SJ Fitness!</h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Your {plan.name} membership has been successfully activated.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-brand-yellow" />
                      <span>Membership starts immediately</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-brand-yellow" />
                      <span>Branch: {formData.branch === "vaisali-nagar" ? "Vaisali Nagar" : "Gandhi Path"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-brand-yellow" />
                      <span>
                        Plan: {plan.name} - ₹{plan.price}/month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  A confirmation email has been sent to {formData.email} with your membership details and next steps.
                </p>

                <div className="flex gap-4 justify-center">
                  <Button asChild className="bg-brand-yellow text-black hover:bg-brand-yellow/90">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">Back to Home</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
