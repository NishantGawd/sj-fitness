import { NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { SYSTEM_PROMPT, buildPromptFromQA } from "@/lib/ai/prompt"
import { FAQ_QA } from "@/data/faq"

// Very lightweight matcher (no vectors): normalize and check containment/tags
function findBestQA(userText: string) {
  const q = userText.toLowerCase()
  let best: { score: number; a: string } | null = null
  for (const item of FAQ_QA) {
    let score = 0
    if (q.includes(item.q.toLowerCase())) score += 2
    for (const t of item.tags || []) {
      if (q.includes(t)) score += 1
    }
    if (!best || score > best.score) best = { score, a: item.a }
  }
  // The threshold was too strict. A single tag match (score > 0) is enough to find relevant content.
  return best && best.score > 0 ? best.a : null
}

// Friendly fallback so we never 500 even if the provider fails or API key is missing
function defaultFallbackReply(userText: string) {
    // This function is now mainly for when the API key is missing.
    const greeting = /^(hi|hello|hey|yo|hola)\b/i.test(userText)
    if (greeting) {
        return `Hi! I’m the SJ Fitness Assistant. I can help with memberships, pricing, class schedules, trainers, and opening hours. You can also book a free trial—just say “book a free trial.”`
    }
    // Assemble a concise helpful reply from curated context
    const parts = [
        "I'm having a little trouble connecting to my brain right now, but here's a quick overview:",
        "- Memberships start monthly from $49; annual plans available.",
        "- Opening hours: Weekdays 5:30 AM–10:00 PM; Sat 7:00 AM–8:00 PM; Sun 8:00 AM–6:00 PM.",
        "- We offer HIIT, strength, mobility, spin, and boxing classes.",
        "Tell me what you’re looking for, or say “book a free trial.”",
    ]
    return parts.join("\n")
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      messages: Array<{ role: "user" | "assistant" | "system"; content: string }>
    }
    const userMessage = [...body.messages].reverse().find((m) => m.role === "user")
    const userText = userMessage?.content?.trim() || ""

    // 1) Try curated Q&A first for instant, accurate answers.
    const qaAnswer = findBestQA(userText)
    if (qaAnswer) {
      return NextResponse.json({ reply: qaAnswer })
    }

    // Provider check – if missing, reply with a safe fallback instead of an error.
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("[v0] Missing GOOGLE_GENERATIVE_AI_API_KEY – replying with fallback content.")
      return NextResponse.json({ reply: defaultFallbackReply(userText) })
    }

    // 2) AI fallback via Google Gemini for more complex queries.
    const { text } = await generateText({
      // Using a more recent and cost-effective model for chat.
      model: google("models/gemini-2.5-pro"),
      system: SYSTEM_PROMPT,
      prompt: buildPromptFromQA(userText, FAQ_QA),
      temperature: 0.5,
      maxOutputTokens: 300,
    })

    // 3) Check for the special "end session" marker from the AI for off-topic questions.
    if (text.trim() === "SESSION_END") {
        return NextResponse.json({
            reply: "I can only help with questions about SJ Fitness. If you'd like to start over, you can start a new session.",
            endSession: true,
        });
    }

    return NextResponse.json({ reply: text })
  } catch (e: any) {
    console.error("[v0] Chat API error:", e?.message || e)
    // Never return a 500 error to the UI – reply with a safe fallback.
    return NextResponse.json({ reply: defaultFallbackReply("hi") })
  }
}
