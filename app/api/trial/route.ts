import { type NextRequest, NextResponse } from "next/server"
import { issueTrialPass, upsertUser } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json()
    if (!email && !phone) return NextResponse.json({ error: "Email or phone required" }, { status: 400 })
    await upsertUser({ name, email, phone })
    const trial = await issueTrialPass({ name, email, phone })
    return NextResponse.json({ ok: true, trial })
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Error issuing trial" }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
