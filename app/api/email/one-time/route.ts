import { NextResponse } from "next/server"
import { buildOneTimeReceiptEmail } from "@/components/emails/one-time-receipt"

export async function POST(req: Request) {
  try {
    // Step 1: Parse body
    let body: any = {}
    try {
      body = await req.json()
    } catch (err) {
      console.error("[OneTime API] Failed to parse request body:", err)
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const { name, email, planId, planName, amount, branch, orderId, paymentId, mode } = body

    // Step 2: Validate required fields
    if (!email || !name || !planId || !planName || !amount) {
      console.error("[OneTime API] Missing required fields:", {
        name, email, planId, planName, amount
      })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Step 3: Check API Key
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.REMINDER_FROM_EMAIL || "SJ Fitness <onboarding@resend.dev>";
    if (!apiKey) {
      console.error("[OneTime API] RESEND_API_KEY not set in environment")
      return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 })
    }

    // Step 4: Build HTML email
    let html: string
    try {
      html = buildOneTimeReceiptEmail({
        name,
        email,
        planId,
        planName,
        amount,
        branch,
        orderId,
        paymentId,
        mode: mode || "one-time",
      })
    } catch (err) {
      console.error("[OneTime API] Error building email HTML:", err)
      return NextResponse.json({ error: "Failed to build email template" }, { status: 500 })
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: `Your ${planName} — One-Time Payment Receipt`,
        html,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("[OneTime API] Resend API failed:", text)
      return NextResponse.json({ error: "Failed to send email", detail: text }, { status: 500 })
    }

    const data = await res.json()
    console.log("Email sent successfully:", data)
    return NextResponse.json({ ok: true, id: data?.id })
  } catch (e: any) {
    console.error("[OneTime API] Unexpected server error:", e)
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 })
  }
}
