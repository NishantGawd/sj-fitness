import { type NextRequest, NextResponse } from "next/server";
import { issueTrialPass, upsertUser } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!email && !phone) {
        return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    // 1. Create or update the user in the 'users' collection
    await upsertUser({ name, email, phone });

    // 2. Create the trial pass in the 'trials' collection
    const trial = await issueTrialPass({ name, email, phone });

    return NextResponse.json({ ok: true, trial });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Error issuing trial" }, { status: 500 });
  }
}