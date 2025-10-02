import { NextResponse } from "next/server"

const RZP_KEY_ID = process.env.RAZORPAY_KEY_ID
const RZP_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.REMINDER_FROM_EMAIL

export async function GET() {
  if (!RZP_KEY_ID || !RZP_KEY_SECRET) return NextResponse.json({ error: "Missing Razorpay creds" }, { status: 500 })
  if (!RESEND_API_KEY || !FROM_EMAIL) return NextResponse.json({ error: "Missing Resend config" }, { status: 500 })
  try {
    const subsRes = await fetch("https://api.razorpay.com/v1/subscriptions?count=100", {
      headers: {
        Authorization: "Basic " + Buffer.from(`${RZP_KEY_ID}:${RZP_KEY_SECRET}`).toString("base64"),
      },
    })
    const subsData = await subsRes.json()
    if (!subsRes.ok) {
      return NextResponse.json(
        { error: subsData?.error?.description || "Failed to fetch subscriptions" },
        { status: 400 },
      )
    }

    const now = Date.now()
    let sent = 0
    for (const sub of subsData?.items || []) {
      const email = sub?.notes?.email
      const name = sub?.notes?.name || "Member"
      const duration = sub?.notes?.duration || ""
      const endAtSec = sub?.end_at || sub?.current_end || null
      if (!email || !endAtSec) continue

      const daysLeft = Math.floor((endAtSec * 1000 - now) / (1000 * 60 * 60 * 24))
      if (daysLeft === 10 || daysLeft === 7) {
        const subject = `Your ${duration} membership ends in ${daysLeft} days`
        const html = `
          <p>Hi ${name},</p>
          <p>This is a reminder that your membership ends in <b>${daysLeft}</b> days.</p>
          <p>Please renew to avoid interruption.</p>
          <p>Best,<br/>Team</p>
        `
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({ from: FROM_EMAIL, to: [email], subject, html }),
        })
        if (emailRes.ok) sent++
      }
    }
    return NextResponse.json({ sent })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Cron error" }, { status: 500 })
  }
}
