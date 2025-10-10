import { NextResponse } from "next/server";

// For type safety, define the expected shape of the request body
interface RequestBody {
    email?: string;
    transcript?: string;
}

// A simple function to format the plain text transcript into a clean HTML email
function buildTranscriptEmail(transcript: string): string {
    const formattedTranscript = transcript
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\n/g, "<br />");

    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #ffd700; border-bottom: 2px solid #eee; padding-bottom: 10px;">SJ Fitness Chat Transcript</h1>
            <p>Hi there,</p>
            <p>Thanks for chatting with our AI Assistant. Here is a copy of your conversation:</p>
            <div style="background-color: #f9f9f9; border-left: 4px solid #ffd700; padding: 15px; margin: 20px 0; white-space: pre-wrap; word-wrap: break-word;">
                <code>${formattedTranscript}</code>
            </div>
            <p>We look forward to seeing you at the gym!</p>
            <p><strong>&mdash; The SJ Fitness Team</strong></p>
        </div>
    `;
}


export async function POST(req: Request) {
    try {
        const body: RequestBody = await req.json();
        const { email, transcript } = body;

        // --- 1. Input Validation ---
        if (!email?.trim() || !transcript?.trim()) {
            return NextResponse.json({ error: "Missing required fields: email and transcript" }, { status: 400 });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // --- 2. Configuration Check ---
        const apiKey = process.env.RESEND_API_KEY;
        
        // **FIX:** Using Resend's sandbox domain for development.
        // For production, you must verify your own domain in your Resend account
        // and replace this with something like "assistant@yourverifieddomain.com".
        const from = "SJ Fitness <onboarding@resend.dev>"; 
        
        if (!apiKey) {
            console.error("[Transcript API] RESEND_API_KEY is not set in environment variables.");
            return NextResponse.json({ error: "Server configuration error: Email service is unavailable." }, { status: 500 });
        }

        // --- 3. Email Construction & Sending ---
        const html = buildTranscriptEmail(transcript);
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: email,
                subject: "Your SJ Fitness Chat Transcript",
                html,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`[Transcript API] Resend API failed with status ${res.status}:`, errorText);
            return NextResponse.json({ error: "Failed to send email", detail: errorText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json({ message: "Transcript sent successfully", id: data?.id });

    } catch (e: any) {
        // --- 4. Global Error Handling ---
        console.error("[Transcript API] An unexpected error occurred:", e);

        if (e instanceof SyntaxError) {
            return NextResponse.json({ error: "Invalid request body: Malformed JSON." }, { status: 400 });
        }

        return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
    }
}

