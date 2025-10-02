// File: app/api/email/membership/route.ts

import { NextResponse } from "next/server";
import { buildMembershipReceiptEmail } from "@/components/emails/membership-receipt"; // Make sure you have this email template file

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // These are the details your frontend sends after a successful subscription
    const { name, email, planId, planName, amount, branch, subscriptionId, paymentId, mode } = body;

    // Validate that you have the essential information
    if (!email || !name || !planName || !amount || !subscriptionId) {
      return NextResponse.json({ error: "Missing required fields for membership email" }, { status: 400 });
    }

    // Get the Resend API Key from your environment variables
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.REMINDER_FROM_EMAIL || "SJ Fitness <onboarding@resend.dev>";
    
    if (!apiKey) {
      console.error("[Membership Email API] RESEND_API_KEY not set in environment");
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    // Build the HTML for the email using your existing template function
    const html = buildMembershipReceiptEmail({
        name,
        email,
        planId,
        planName,
        amount,
        branch,
        subscriptionId,
        paymentId,
        mode: mode || "subscription",
    });

    // Send the email using the Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: `Your ${planName} Membership is Active!`,
        html,
      }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("[Membership Email API] Resend API failed:", errorText);
        return NextResponse.json({ error: "Failed to send email", detail: errorText }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, id: data?.id });

  } catch (e: any) {
    console.error("[Membership Email API] Unexpected server error:", e);
    return NextResponse.json({ error: e?.message || "Unexpected error" }, { status: 500 });
  }
}