import { NextResponse } from "next/server"
import { buildDayPassEmail } from "@/components/emails/day-pass"

export async function POST(req: Request) {
  try {
    const { name, email, branch, date, qrUrl } = await req.json()
    if (!email || !name) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = "SJ Fitness <onboarding@resend.dev>";
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 })
    }

    const html = buildDayPassEmail({ name, branch, date, qrUrl })
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: "Your Free 1‑Day Pass — SJ Fitness",
        html,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: "Failed to send email", detail: text }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json({ ok: true, id: data?.id })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 })
  }
}
