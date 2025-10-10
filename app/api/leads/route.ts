import { NextResponse } from "next/server"

type Lead = {
  name: string
  phone: string
  notes?: string
  source?: string
}

// NOTE: This is a stateless example (no DB). Replace with Neon/Upstash later.
export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Lead
    // In production, store the lead:
    // - Neon (Postgres) via @neondatabase/serverless
    // - Upstash Redis via REST API
    // - Or send to a CRM webhook (HubSpot, Zapier, Make)
    console.log("Lead received:", data)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }
}
