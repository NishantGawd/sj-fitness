"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { X, MessageCircle, SendHorizonal, Loader2, CheckCircle2 } from "lucide-react"
import { ChatUI, type ChatMessage } from "./chat-ui"
import { QUICK_ACTIONS, START_FLOW_MESSAGE } from "@/data/faq"

// ----------------------- Validation helpers -----------------------
const emailValidator = (text: string) => {
  const v = text.trim();
  if (/[,\s]/.test(v)) return false;
  if (/\.\./.test(v)) return false;
  if (/@\./.test(v) || /\.@/.test(v)) return false;
  const re = /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return re.test(v);
};
const phoneValidator = (text: string) => {
  const digits = text.replace(/\D/g, "");
  return /^[6-9]\d{9}$/.test(digits);
};
const dateValidator = (text: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const [y, m, d] = text.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
};

// ----------------------- Booking questions -----------------------
const bookingQuestions = [
    { key: "branch", question: "Great! Let's get you booked. First, which of our branches would you like to visit: <b>Vaishali Nagar</b> or <b>Gandhi Path</b>?", validation: (text: string) => /\b(vaishali(\s*nagar)?|gandhi(\s*path)?)\b/i.test(text), error: "Please type either Vaishali Nagar or Gandhi Path (you can just say 'Vaishali' or 'Gandhi')." },
    { key: "name", question: "Perfect. What's your full name?", validation: (text: string) => /^[A-Za-z\s'.-]{3,}$/.test(text.trim()), error: "Please enter your name (letters only, at least 3 characters)." },
    { key: "email", question: "Thanks! And your email address?", validation: (text: string) => emailValidator(text), error: "That email doesn’t look right. Please use a format like name@example.com." },
    { key: "phone", question: "Got it. What's the best phone number to reach you at?", validation: (text: string) => phoneValidator(text), error: "Please enter a 10-digit mobile number starting with 6/7/8/9 (numbers only)." },
    { key: "date", question: `Almost done! What date would you like for your trial? (e.g., ${new Date().getFullYear()}-12-25)`, validation: (text: string) => dateValidator(text), error: "Please provide the date in YYYY-MM-DD format (for example, 2025-12-25)." },
    { key: "time", question: "And finally, do you prefer a <b>morning</b>, <b>afternoon</b>, or <b>evening</b> time slot?", validation: (text: string) => /^(?:\s*)(morning|afternoon|evening)(?:\s*)$/i.test(text), error: "Please choose morning, afternoon, or evening." },
]

// ----------------------- Intent detection (client-side) -----------------------
// Humanized templates (kept concise & friendly). These match the templates in prompt.ts.
// ----------------------- Intent detection (client-side with delay) -----------------------
const TEMPLATES: Record<string, string> = {
  // Goals
  "bulking": `<p>Nice — bulking season! 💪<br><b>Workouts:</b> Stick to 3–5 heavy strength sessions weekly with compound lifts like squats, presses, and rows.<br><b>Nutrition:</b> Eat in a small calorie surplus with high protein and balanced carbs to fuel recovery.<br><b>Pro Tip:</b> Track progress and avoid overdoing the surplus — clean bulk beats dirty bulk!</p>`,
  "fat loss": `<p>Smart choice! Fat loss comes from a steady calorie deficit and smart training.<br><b>Workouts:</b> Combine 3 strength sessions and 2 cardio sessions weekly.<br><b>Nutrition:</b> High-protein, whole foods help you stay full and energized.<br><b>Pro Tip:</b> Don’t rush it — steady progress lasts longer!</p>`,
  "maintenance": `<p>Awesome! Maintenance means balance — consistency over intensity.<br>Keep 2–3 strength sessions and 1–2 light cardio days weekly, and eat around your daily needs.<br><b>Pro Tip:</b> Mix things up sometimes to stay fresh and motivated!</p>`,
  "cutting": `<p>Cutting done right = keeping muscle while losing fat.<br><b>Training:</b> Strength 3–4x/week + cardio.<br><b>Nutrition:</b> Small calorie deficit with high protein.<br><b>Pro Tip:</b> Don’t over-restrict; sustainability is key.</p>`,
  "muscle gain": `<p>Perfect — muscle gain starts with progressive overload and nutrition.<br><b>Train:</b> Focus on compound lifts and progressive overload 3–5x/week.<br><b>Eat:</b> Slight surplus + protein-rich meals to repair and grow muscle.<br><b>Pro Tip:</b> Rest and sleep matter as much as lifting!</p>`,

  // Exercises
  "chest": `<p>For chest growth: Bench Press (flat/incline), Dumbbell Press, and Push-ups.<br><b>Pro Tip:</b> Control each rep — slower negatives, stronger results.</p>`,
  "back": `<p>For back: Pull-ups, Barbell Rows, and Seated Rows.<br><b>Pro Tip:</b> Focus on pulling with your elbows, not just your arms.</p>`,
  "legs": `<p>Legs: Squats, Deadlifts, Lunges, and Leg Press.<br><b>Pro Tip:</b> Go for form and depth — strong legs support everything!</p>`,
  "glutes": `<p>Glutes: Hip Thrusts, Bulgarian Split Squats, and Lunges.<br><b>Pro Tip:</b> Pause at the top and squeeze — that’s where growth happens!</p>`,
  "shoulders": `<p>Shoulders: Overhead Press, Lateral Raises, and Rear Delt Flyes.<br><b>Pro Tip:</b> Keep movements smooth — shoulders love control, not momentum.</p>`,
  "arms": `<p>Arms: Biceps Curls, Hammer Curls, Triceps Pushdowns, and Dips.<br><b>Pro Tip:</b> Squeeze at the top, slow on the way down for better activation.</p>`,
  "abs": `<p>Abs/Core: Planks, Hanging Leg Raises, Cable Crunches.<br><b>Pro Tip:</b> Slow reps + focus = stronger core, faster progress.</p>`,
  "calves": `<p>Calves: Standing and Seated Calf Raises.<br><b>Pro Tip:</b> Hold each rep at the top for 1 second — that’s the real burn.</p>`,
  "full body": `<p>Full-Body: Squats, Bench Press, Rows, Overhead Press, Plank.<br><b>Pro Tip:</b> 2–3 sessions weekly is enough to build all-round strength.</p>`
};

// Detect fitness or exercise intent keywords
function detectFitnessIntentKey(message: string): string | null {
  const text = message.toLowerCase();
  const keywords = Object.keys(TEMPLATES);
  for (const key of keywords) {
    if (text.includes(key)) return key;
  }
  return null;
}

// quick regexes for matching (goal keywords + exercise keywords)
const GOAL_REGEX = /\b(fat loss|fatloss|lose weight|cut|cutting|muscle gain|building muscle|bulk|bulking|maintenance|maintain|toning|get toned)\b/i;
const EXERCISE_REGEX = /\b(chest|back|legs|glutes|shoulders|arms|biceps|triceps|abs|core|calves|full body|fullbody)\b/i;

function detectFitnessIntent(message: string): string | null {
  const m = message.toLowerCase();
  // Goals
  if (/\bbulk|bulk|bulking|muscle gain\b/.test(m)) return TEMPLATES["bulking"];
  if (/\bfat loss\b|\bfatloss\b|\bcut\b|\bcutting\b|\blose weight\b/.test(m)) return TEMPLATES["fat loss"];
  if (/\bmaintenance\b|\bmaintain\b/.test(m)) return TEMPLATES["maintenance"];
  if (/\btoning\b|\bget toned\b/.test(m)) return TEMPLATES["full body"];
  // Exercises (map synonyms)
  if (/\bchest\b/.test(m)) return TEMPLATES["chest"];
  if (/\bback\b/.test(m)) return TEMPLATES["back"];
  if (/\bleg(s)?\b/.test(m)) return TEMPLATES["legs"];
  if (/\bglute(s)?\b|\bbutt\b/.test(m)) return TEMPLATES["glutes"];
  if (/\bshoulder(s)?\b/.test(m)) return TEMPLATES["shoulders"];
  if (/\barm(s)?\b|\bbiceps\b|\btriceps\b/.test(m)) return TEMPLATES["arms"];
  if (/\babs\b|\bcore\b/.test(m)) return TEMPLATES["abs"];
  if (/\bcalf(s)?\b/.test(m)) return TEMPLATES["calves"];
  if (/\bfull[\s-]?body\b/.test(m)) return TEMPLATES["full body"];
  return null;
}

// ----------------------- Types & initial -----------------------
type Flow = null | "book-trial" | "email-transcript"
type BookingData = Partial<Record<"name" | "email" | "phone" | "branch" | "date" | "time", string>>;
type ChatMessageLocal = ChatMessage;

const initialMessages: ChatMessageLocal[] = [
  { id: "init", role: "assistant", content: "Hi! I'm SJ Fitness Assistant. I can help with membership info, pricing, trainers, opening hours, or book a free trial. What would you like to do?" }
]

// ----------------------- Component -----------------------
export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [messages, setMessages] = useState<ChatMessageLocal[]>(initialMessages)
  const [flow, setFlow] = useState<Flow>(null)
  const [pending, setPending] = useState(false)

  const [bookingStep, setBookingStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>({})

  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "pending" | "success" | "error">("idle")

  const panelRef = useRef<HTMLDivElement | null>(null)

  const resetChat = useCallback(() => {
    setMessages(initialMessages)
    setSessionEnded(false)
    setFlow(null)
    setEmail("")
    setEmailStatus("idle")
    setBookingStep(0)
    setBookingData({})
  }, [])

  const closeChat = useCallback(() => {
    setOpen(false)
    setTimeout(resetChat, 300)
  }, [resetChat])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const el = panelRef.current?.querySelector("input, textarea")
        if (el instanceof HTMLElement) el.focus()
      }, 100)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        if (flow) setFlow(null)
        else closeChat()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, flow, closeChat])

  function append(role: "user" | "assistant", content: string) {
    setMessages(prev => [...prev, { id: crypto.randomUUID(), role, content }])
  }

  function startFlow(next: Flow) {
    setFlow(next)
    if (next === "book-trial") {
      setBookingStep(0)
      setBookingData({})
      append("assistant", bookingQuestions[0].question)
    } else if (next && START_FLOW_MESSAGE[next]) {
      append("assistant", START_FLOW_MESSAGE[next])
    }
  }

  function cancelFlow() {
    if (flow === "book-trial") {
      append("assistant", "No problem. Your booking has been cancelled. How else can I help?");
      setBookingStep(0)
      setBookingData({})
    }
    setFlow(null)
  }

  async function generateBookingLink(finalData: BookingData) {
    append("assistant", "Perfect! I have all the details. Generating your secure booking link now...");
    setPending(true)
    try {
      const res = await fetch('/api/chatbot-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });
      if (!res.ok) throw new Error("API Error");
      const { leadId } = await res.json();
      const finalLink = `${window.location.origin}/join?leadId=${leadId}`;
      append("assistant", `Awesome! Your link is ready. Please click here to review and confirm your free trial: <a href="${finalLink}" class="font-bold text-yellow-400 underline">Confirm My Trial Booking</a>`);
    } catch (e) {
      append("assistant", "Sorry, something went wrong while creating your link. Please try booking again in a moment.");
    } finally {
      setPending(false)
      setFlow(null)
      setBookingStep(0)
      setBookingData({})
    }
  }

  // email transcript with validation
  async function handleSendEmail() {
    const trimmed = email.trim()
    if (!trimmed) return
    if (!emailValidator(trimmed)) {
      setEmailStatus("error")
      append("assistant", "That email doesn’t look right. Please use name@example.com.")
      return
    }
    setEmailStatus("pending")
    const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.content.replace(/<[^>]*>?/gm, '')}`).join("\n\n")
    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, transcript }),
      })
      if (!res.ok) throw new Error("Server error")
      setEmailStatus("success")
      setTimeout(closeChat, 2000)
    } catch (e) {
      setEmailStatus("error")
    }
  }

  // ----------------------- onSend -----------------------
  async function onSend(message: string) {
    const trimmed = message.trim()
    append("user", message)

    // 1) Booking flow
    if (flow === 'book-trial') {
      const currentQuestion = bookingQuestions[bookingStep];
      if (currentQuestion.validation(trimmed)) {
        const valueToStore = currentQuestion.key === "phone" ? trimmed.replace(/\D/g, "") : trimmed;
        const updatedData = { ...bookingData, [currentQuestion.key]: valueToStore };
        setBookingData(updatedData);

        const nextStep = bookingStep + 1;
        if (nextStep < bookingQuestions.length) {
          setBookingStep(nextStep);
          append("assistant", bookingQuestions[nextStep].question);
        } else {
          await generateBookingLink(updatedData);
        }
      } else {
        // VALIDATION ERROR: append only the error (do NOT re-ask the same question)
        append("assistant", currentQuestion.error);
        // do NOT append the question again — the UI shows previous question so user can correct.
      }
      return;
    }

    // 2) Local intent detection for fitness / exercises (client-side fast path)
  const detectedKey = detectFitnessIntentKey(trimmed);
if (detectedKey) {
  const reply = TEMPLATES[detectedKey];
  // show typing animation for natural feel
  setPending(true);
  setTimeout(() => {
    append("assistant", reply);
    setPending(false);
  }, 1200 + Math.random() * 600); // random delay between 1.2–1.8s for realism
  return;
}

    // 3) Otherwise, send to server as usual
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: message }] }),
      });
      const data = await res.json() as { reply?: string; error?: string, endSession?: boolean };

      if (data.endSession) {
        append("assistant", data.reply || "Sounds good! Come back anytime if you have more questions.");
        setSessionEnded(true);
      } else {
        append("assistant", data.reply || "Thanks! Let me know how I can help.");
      }
    } catch (_e: any) {
      append("assistant", "I’m having trouble reaching the server. Please try again later.")
    } finally {
      setPending(false);
    }
  }

  const isEmailing = flow === "email-transcript";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!open && (
          <Button aria-label="Open chat" onClick={() => setOpen(true)} size="icon" className="relative h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-yellow-400 hover:bg-yellow-500 text-gray-900 animate-bounce-slow" title="Chat with SJ Fitness">
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          </Button>
        )}
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="SJ Fitness chat" className={cn("fixed z-50", isEmailing ? "inset-0 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm animate-in fade-in" : "bottom-4 right-4 w-[92vw] max-w-md animate-in fade-in slide-in-from-bottom-4")}>
          <Card ref={panelRef} className={cn("relative flex flex-col overflow-hidden border-2 border-yellow-400 bg-card shadow-2xl transition-all duration-300", isEmailing ? "w-[92vw] max-w-md" : "h-[85vh] max-h-[700px]")} style={{ borderRadius: "1.25rem" }}>
            <header className="flex flex-shrink-0 items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 border-b-2 border-yellow-500/50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <MessageCircle className="h-6 w-6 text-gray-900" aria-hidden="true" />
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="font-semibold text-gray-900">{isEmailing ? "Email Transcript" : "SJ Fitness Assistant"}</p>
              </div>
              <Button aria-label="Close chat" variant="ghost" size="icon" onClick={() => { if (isEmailing) cancelFlow(); else closeChat() }} className="hover:bg-yellow-600/20 text-gray-900 transition-all duration-200 hover:rotate-90">
                <X className="h-5 w-5" />
              </Button>
            </header>

            <div className="flex-1 flex flex-col min-h-0">
               {isEmailing ? (
                <div className="p-4 animate-in fade-in">
                  <CardHeader className="px-1 pt-0">
                    <CardTitle>Email Chat Transcript</CardTitle>
                    <CardDescription>Enter your email below and we'll send you a copy of this conversation.</CardDescription>
                  </CardHeader>
                  {emailStatus === 'success' ? (
                    <div className="text-center py-8 flex flex-col items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                      <p className="font-medium">Success! The transcript has been sent.</p>
                      <p className="text-sm text-muted-foreground mt-1">This window will now close.</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 pt-4">
                      <Input placeholder="your.email@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={emailStatus === 'pending'} />
                      {emailStatus === 'error' && <p className="text-sm text-red-500">Please enter a valid email address.</p>}
                      <div className="flex items-center gap-2 pt-2">
                        <Button onClick={handleSendEmail} disabled={emailStatus === "pending" || !email} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                          {emailStatus === "pending" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Email"}
                        </Button>
                        <Button variant="ghost" onClick={cancelFlow} disabled={emailStatus === 'pending'}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex-shrink-0">
                    {!sessionEnded && flow !== 'book-trial' && (
                      <div className="p-3 grid grid-cols-2 gap-2 md:grid-cols-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        {QUICK_ACTIONS.map((qa) => (
                          <Button key={qa.id} variant="secondary" onClick={() => (qa.flow ? startFlow(qa.flow as Flow) : onSend(qa.message))} className="justify-start text-xs">
                            {qa.label}
                          </Button>
                        ))}
                      </div>
                    )}
                    {flow !== 'book-trial' && <Separator />}
                  </div>
                  <ChatUI
                    className="flex-1 min-h-0"
                    disabled={pending}
                    messages={messages}
                    onSend={onSend}
                    placeholder={flow === 'book-trial' ? 'Type your answer...' : 'Ask a question...'}
                    inputAdornment={<SendHorizonal className="h-4 w-4 opacity-70" />}
                    sessionEnded={sessionEnded}
                    onRestart={resetChat}
                    onEmailTranscriptClick={() => setFlow("email-transcript")}
                  />
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
