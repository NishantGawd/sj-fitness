import { NextResponse } from "next/server";
import { buildDayPassEmail } from "@/components/emails/day-pass";

// For type safety, define the expected shape of the request body
interface RequestBody {
    name?: string;
    email?: string;
    branch?: string;
    date?: string;
    qrUrl?: string;
}

export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json();
        const { name, email, branch, date, qrUrl } = body;

        // --- 1. Stricter Input Validation ---
        // Check for all required fields and ensure they are not just empty strings
        if (!name?.trim() || !email?.trim() || !branch?.trim() || !date?.trim() || !qrUrl?.trim()) {
            return NextResponse.json({ error: "Missing one or more required fields: name, email, branch, date, qrUrl" }, { status: 400 });
        }

        // Simple email format validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // --- 2. Configuration Check ---
        const apiKey = process.env.RESEND_API_KEY;
        const from = "SJ Fitness <onboarding@resend.dev>";
        if (!apiKey) {
            // Log the error on the server for easier debugging
            console.error("[Day Pass API] RESEND_API_KEY is not set in environment variables.");
            return NextResponse.json({ error: "Server configuration error: Email service is not set up." }, { status: 500 });
        }

        // --- 3. Email Construction & Sending ---
        const html = buildDayPassEmail({ name, branch, date, qrUrl });
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: email,
                subject: "Your Free 1-Day Pass — SJ Fitness",
                html,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            // Log the detailed error from the email provider on the server
            console.error(`[Day Pass API] Resend API failed with status ${res.status}:`, errorText);
            return NextResponse.json({ error: "Failed to send email", detail: errorText }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json({ ok: true, id: data?.id });

    } catch (e: any) {
        // --- 4. Global Error Handling ---
        // Log the exact error on the server for any unexpected failures
        console.error("[Day Pass API] An unexpected error occurred:", e);

        // Check if the error was due to malformed JSON from the client
        if (e instanceof SyntaxError) {
            return NextResponse.json({ error: "Invalid request body: Malformed JSON." }, { status: 400 });
        }

        return NextResponse.json({ error: e?.message || "An unexpected server error occurred." }, { status: 500 });
    }
}