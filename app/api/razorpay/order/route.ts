import { type NextRequest, NextResponse } from "next/server"
import { createPayment, upsertUser } from "@/lib/db"

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

export async function POST(req: NextRequest) {
  if (!RZP_KEY_ID || !RZP_KEY_SECRET) {
    return NextResponse.json({ error: "Missing Razorpay credentials" }, { status: 500 })
  }
  try {
    const { amount, name, email, phone, notes } = await req.json()

    if (!amount || amount < 100) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const body = {
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: { name, email, phone, ...notes },
    }

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64"),
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: data?.error?.description || "Failed to create order" }, { status: 400 })
    }

    // Persist pending payment
    try {
      await upsertUser({ name, email, phone })
      await createPayment({
        provider: "razorpay",
        providerRef: data.id,
        amount,
        currency: "INR",
        status: "created",
        user: { name, email, phone },
        notes,
      })
    } catch (e) {
      console.log("[v0] Failed to persist pending RZP order:", (e as any)?.message)
    }

    return NextResponse.json({ orderId: data.id, keyId: RZP_KEY_ID })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Server error" }, { status: 500 })
  }
}