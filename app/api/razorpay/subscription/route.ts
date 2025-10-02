import { type NextRequest, NextResponse } from "next/server"

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

type PlanCfg = { amount: number; label: string; period: "monthly" | "yearly"; interval: number; total_count: number }
type Duration = "1m" | "3m" | "6m" | "12m"
const PLAN_IDS: Partial<Record<Duration, string | undefined>> = {
  "1m": process.env.RAZORPAY_PLAN_1M,
  "3m": process.env.RAZORPAY_PLAN_3M,
  "6m": process.env.RAZORPAY_PLAN_6M,
  "12m": process.env.RAZORPAY_PLAN_12M,
}

// In route.ts

function cfg(duration: "1m" | "3m" | "6m" | "12m"): PlanCfg {
  switch (duration) {
    case "1m":
      // Billed every 1 month, for 1 cycle total.
      return { amount: 300000, label: "1 Month Membership", period: "monthly", interval: 1, total_count: 1 }
    case "3m":
      // Billed every 3 months, for 1 cycle total.
      return { amount: 600000, label: "3 Month Membership", period: "monthly", interval: 3, total_count: 1 }
    case "6m":
      // Billed every 6 months, for 1 cycle total.
      return { amount: 900000, label: "6 Month Membership", period: "monthly", interval: 6, total_count: 1 }
    case "12m":
      // Billed every 12 months (yearly), for 1 cycle total.
      return { amount: 1300000, label: "1 Year Membership", period: "monthly", interval: 12, total_count: 1 }
  }
}

export async function POST(req: NextRequest) {
  if (!RZP_KEY_ID || !RZP_KEY_SECRET) {
    return NextResponse.json({ error: "Missing Razorpay credentials" }, { status: 500 })
  }
  try {
    const { duration, name, email, phone, notes } = await req.json()
    const c = cfg(duration)

    let planId = PLAN_IDS[duration as Duration]

    if (!planId) {
      const planRes = await fetch("https://api.razorpay.com/v1/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64"),
        },
        body: JSON.stringify({
          period: c.period,
          interval: c.interval,
          item: { name: c.label, amount: c.amount, currency: "INR" },
          notes: { duration },
        }),
      })
      const planData = await planRes.json()

      if (!planRes.ok) {
        const msg =
          planData?.error?.description ||
          "Failed to create plan. Ensure Razorpay Subscriptions is enabled or set RAZORPAY_PLAN_* env vars."
        return NextResponse.json({ error: msg }, { status: 400 })
      }
      planId = planData.id
    }

    const subRes = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64"),
      },
      body: JSON.stringify({
        plan_id: planId,
        total_count: c.total_count,
        customer_notify: 1,
        notes: { name, email, phone, duration, ...notes },
      }),
    })
    const subData = await subRes.json()
    if (!subRes.ok) {
      return NextResponse.json(
        {
          error:
            subData?.error?.description ||
            "Failed to create subscription. Ensure Subscriptions is enabled for your Razorpay account.",
        },
        { status: 400 },
      )
    }
    return NextResponse.json({ subscriptionId: subData.id, keyId: RZP_KEY_ID, shortUrl: subData.short_url || null })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}
