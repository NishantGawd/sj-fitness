"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { X, MessageCircle, SendHorizonal, Mail, Loader2, CheckCircle2 } from "lucide-react"
import { ChatUI, type ChatMessage } from "./chat-ui"
import { QUICK_ACTIONS, START_FLOW_MESSAGE } from "@/data/faq"

// --- NEW: Define the steps and validation for our booking conversation ---
const bookingQuestions = [
    { key: "branch", question: "Great! Let's get you booked. First, which of our branches would you like to visit: <b>Vaishali Nagar</b> or <b>Gandhi Path</b>?", validation: (text: string) => /vaishali|gandhi/i.test(text), error: "Please choose either Vaishali Nagar or Gandhi Path." },
    { key: "name", question: "Perfect. What's your full name?", validation: (text: string) => text.trim().length > 2, error: "Please enter a valid name." },
    { key: "email", question: "Thanks! And your email address?", validation: (text: string) => /\S+@\S+\.\S+/.test(text), error: "Please enter a valid email address." },
    { key: "phone", question: "Got it. What's the best phone number to reach you at?", validation: (text: string) => /^\d{10,}$/.test(text.replace(/\s+/g, '')), error: "Please enter a valid 10-digit phone number." },
    { key: "date", question: `Almost done! What date would you like for your trial? (e.g., ${new Date().getFullYear()}-12-25)`, validation: (text: string) => /^\d{4}-\d{2}-\d{2}$/.test(text), error: "Please use the YYYY-MM-DD format." },
    { key: "time", question: "And finally, do you prefer a <b>morning</b>, <b>afternoon</b>, or <b>evening</b> time slot?", validation: (text: string) => /morning|afternoon|evening/i.test(text), error: "Please choose morning, afternoon, or evening." },
]

// Define the different states the chatbot can be in
type Flow = null | "book-trial" | "email-transcript"
type BookingData = Partial<Record<"name" | "email" | "phone" | "branch" | "date" | "time", string>>;

// The initial message the user sees
const initialMessages: ChatMessage[] = [
  {
    id: "init",
    role: "assistant",
    content:
      "Hi! I'm SJ Fitness Assistant. I can help with membership info, pricing, trainers, opening hours, or book a free trial. What would you like to do?",
  },
]

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [sessionEnded, setSessionEnded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [flow, setFlow] = useState<Flow>(null)
  const [pending, setPending] = useState(false)

  // --- NEW: State for the booking conversation ---
  const [bookingStep, setBookingStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>({})

  // State for the "Email Transcript" form (unchanged)
  const [email, setEmail] = useState("")
  const [emailStatus, setEmailStatus] = useState<"idle" | "pending" | "success" | "error">("idle")

  const panelRef = useRef<HTMLDivElement | null>(null)

  // Resets the chat to its initial state
  const resetChat = useCallback(() => {
    setMessages(initialMessages)
    setSessionEnded(false)
    setFlow(null)
    setEmail("")
    setEmailStatus("idle")
    // NEW: Reset booking state as well
    setBookingStep(0)
    setBookingData({})
  }, [])

  // Closes the chat panel and resets the state after the animation
  const closeChat = useCallback(() => {
    setOpen(false)
    setTimeout(resetChat, 300) // Wait for exit animation before resetting
  }, [resetChat])

  // Effect to handle focus and the 'Escape' key (unchanged)
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const el = panelRef.current?.querySelector("input, textarea")
        if (el instanceof HTMLElement) {
          el.focus()
        }
      }, 100)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        if (flow) {
          setFlow(null) // Close modal first if open
        } else {
          closeChat()
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [open, flow, closeChat])

  // Adds a new message to the chat history
  function append(role: "user" | "assistant", content: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, content }])
  }

  // MODIFIED: Initiates a special flow, now with special logic for "book-trial"
  function startFlow(next: Flow) {
    setFlow(next)
    if (next === "book-trial") {
        // Start the conversational booking
        setBookingStep(0)
        setBookingData({})
        append("assistant", bookingQuestions[0].question)
    } else if (next && START_FLOW_MESSAGE[next]) {
        // Handle other flows like before
        append("assistant", START_FLOW_MESSAGE[next])
    }
  }

  // MODIFIED: Cancels the current flow and returns to the chat
  function cancelFlow() {
    if (flow === "book-trial") {
        append("assistant", "No problem. Your booking has been cancelled. How else can I help?");
        setBookingStep(0);
        setBookingData({});
    }
    setFlow(null);
  }

  // --- NEW: Function to generate the final booking link ---
  async function generateBookingLink(finalData: BookingData) {
    append("assistant", "Perfect! I have all the details. Generating your secure booking link now...");
    setPending(true);
    try {
        const res = await fetch('/api/chatbot-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData),
        });

        if (!res.ok) throw new Error("API Error");

        const { leadId } = await res.json();
        // Use window.location.origin to be environment-agnostic
        const finalLink = `${window.location.origin}/join?leadId=${leadId}`;

        // --- THIS IS THE ONLY LINE THAT CHANGED ---
        // Removed target="_blank" to open the link in the same tab.
        append("assistant", `Awesome! Your link is ready. Please click here to review and confirm your free trial: <a href="${finalLink}" class="font-bold text-yellow-400 underline">Confirm My Trial Booking</a>`);
    } catch (e) {
        append("assistant", "Sorry, something went wrong while creating your link. Please try booking again in a moment.");
    } finally {
        setPending(false);
        setFlow(null); // End the booking flow
        setBookingStep(0);
        setBookingData({});
    }
  }

  // Handles sending the email transcript via the API (unchanged)
  async function handleSendEmail() {
    if (!email) return;
    setEmailStatus("pending");
    const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.content.replace(/<[^>]*>?/gm, '')}`).join("\n\n");
    try {
      const res = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, transcript }),
      });
      if (!res.ok) throw new Error("Server error");
      setEmailStatus("success");
      setTimeout(closeChat, 2000);
    } catch (e) {
      setEmailStatus("error");
    }
  }

  // MODIFIED: Sends a user's message, now handles the booking conversation
  async function onSend(message: string) {
    append("user", message);
    
    // --- NEW: Booking Conversation Logic ---
    if (flow === 'book-trial') {
        const currentQuestion = bookingQuestions[bookingStep];
        if (currentQuestion.validation(message)) {
            // Answer is valid, save it and ask the next question
            const updatedData = { ...bookingData, [currentQuestion.key]: message };
            setBookingData(updatedData);

            const nextStep = bookingStep + 1;
            if (nextStep < bookingQuestions.length) {
                setBookingStep(nextStep);
                append("assistant", bookingQuestions[nextStep].question);
            } else {
                // Last question answered, generate the link
                await generateBookingLink(updatedData);
            }
        } else {
            // Answer is invalid, repeat the question with an error
            append("assistant", currentQuestion.error);
        }
        return; // Stop here for booking flow
    }
    
    // --- Regular AI Chat Logic (unchanged) ---
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
        append("assistant", data.reply || "Thanks! Let me know how I can help.")
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
                      {emailStatus === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
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
                      <>
                        <div className="p-3 grid grid-cols-2 gap-2 md:grid-cols-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          {QUICK_ACTIONS.map((qa) => (
                            <Button key={qa.id} variant="secondary" onClick={() => (qa.flow ? startFlow(qa.flow as Flow) : onSend(qa.message))} className="justify-start text-xs">
                              {qa.label}
                            </Button>
                          ))}
                        </div>
                        <Separator />
                      </>
                    )}
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

