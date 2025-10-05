import { type NextRequest, NextResponse } from "next/server";
import { issueTrialPass, upsertUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!email && !phone) {
        return NextResponse.json({ error: "Email or phone is required to book a trial." }, { status: 400 });
    }

    // These functions likely connect to your database. This is where the auth error happens.
    await upsertUser({ name, email, phone });
    const trial = await issueTrialPass({ name, email, phone });

    return NextResponse.json({ ok: true, trial });
  } catch (e: any) {
    // Log the detailed error on the server for debugging
    console.error("Error in /api/trial:", e);

    // Provide a clearer error message to the frontend
    if (e.message && (e.message.includes("bad auth") || e.message.includes("authentication failed"))) {
        return NextResponse.json({ error: "Server authentication error. Please check database credentials." }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred on the server." }, { status: 500 });
  }
}
