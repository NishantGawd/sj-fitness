"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { X, MessageCircle, SendHorizonal, Mail, Loader2, CheckCircle2 } from "lucide-react"
import { ChatUI, type ChatMessage } from "./chat-ui"
import { QUICK_ACTIONS, START_FLOW_MESSAGE } from "@/data/faq"

// Define the different states the chatbot can be in
type Flow = null | "book-trial" | "email-transcript"

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

  // State for the "Book a Trial" form
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")

  // State for the "Email Transcript" form
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
  }, [])

  // Closes the chat panel and resets the state after the animation
  const closeChat = useCallback(() => {
    setOpen(false)
    setTimeout(resetChat, 300) // Wait for exit animation before resetting
  }, [resetChat])

  // Effect to handle focus and the 'Escape' key
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

  // Initiates a special flow (like booking or emailing)
  function startFlow(next: Flow) {
    setFlow(next)
    if (next && START_FLOW_MESSAGE[next]) {
      append("assistant", START_FLOW_MESSAGE[next])
    }
  }

  // Cancels the current flow and returns to the chat
  function cancelFlow() {
    setFlow(null);
    if (flow !== "email-transcript") {
      append("assistant", "No problem. How else can I help you today?");
    }
  }

  // Submits the "Book a Trial" lead form
  async function submitLead() {
    setPending(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, notes, source: "chatbot-book-trial" }),
      })
      if (!res.ok) throw new Error("Failed submitting lead")
      append("assistant", "Thanks! Your free trial request has been received. A team member will contact you shortly.")
      setFlow(null)
      setName("")
      setPhone("")
      setNotes("")
    } catch (_e: any) {
      append("assistant", "Sorry—something went wrong while submitting your request. Please try again.")
    } finally {
      setPending(false)
    }
  }

  // Handles sending the email transcript via the API
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

      // **NEW:** Automatically close the modal and widget after a 2-second delay
      setTimeout(() => {
        closeChat();
      }, 2000);

    } catch (e) {
      setEmailStatus("error");
    }
  }

  // Sends a user's message to the chat API
  async function onSend(message: string) {
    append("user", message)
    setPending(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: message }] }),
      })
      const data = (await res.json()) as { reply?: string; error?: string, endSession?: boolean }

      if (data.endSession) {
        append("assistant", data.reply || "Sounds good! Come back anytime if you have more questions.");
        endSession(false);
      } else {
        append("assistant", data.reply || "Thanks! Let me know how I can help with memberships, classes, or booking a trial.")
      }
    } catch (_e: any) {
      append("assistant", "I’m having trouble reaching the server. Here’s a quick summary: memberships from $49/month, weekdays 5:30 AM–10 PM, and we offer HIIT/strength/mobility/spin/boxing. Say “book a free trial” to get started.")
    } finally {
      setPending(false)
    }
  }

  // Ends the current chat session
  function endSession(addMessage = true) {
    if (sessionEnded) return
    setSessionEnded(true)
    if (addMessage) {
      append("assistant", "This chat session has ended. If you wish to continue, you can start a new one.")
    }
  }

  const isBooking = flow === "book-trial";
  const isEmailing = flow === "email-transcript";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!open ? (
          <Button
            aria-label="Open chat"
            onClick={() => setOpen(true)}
            size="icon"
            className="relative h-14 w-14 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 bg-yellow-400 hover:bg-yellow-500 text-gray-900 animate-bounce-slow"
            title="Chat with SJ Fitness"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
          </Button>
        ) : null}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="SJ Fitness chat"
          className={cn(
            "fixed z-50",
            (isBooking || isEmailing)
              ? "inset-0 flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm animate-in fade-in"
              : "bottom-4 right-4 w-[92vw] max-w-md animate-in fade-in slide-in-from-bottom-4"
          )}
        >
          <Card
            ref={panelRef}
            className={cn(
              "relative flex flex-col overflow-hidden border-2 border-yellow-400 bg-card shadow-2xl transition-all duration-300",
              (isBooking || isEmailing) ? "w-[92vw] max-w-md" : "h-[85vh] max-h-[700px]"
            )}
            style={{ borderRadius: "1.25rem" }}
          >
            <header className="flex flex-shrink-0 items-center justify-between p-4 bg-gradient-to-r from-yellow-400 to-yellow-500 border-b-2 border-yellow-500/50">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <MessageCircle className="h-6 w-6 text-gray-900" aria-hidden="true" />
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="font-semibold text-gray-900">
                  {isEmailing ? "Email Transcript" : "SJ Fitness Assistant"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {!isBooking && !isEmailing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => endSession()}
                    className="text-gray-900 hover:bg-yellow-600/20 transition-all"
                    title="End session"
                  >
                    End session
                  </Button>
                )}
                <Button
                  aria-label="Close chat"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (isBooking || isEmailing) cancelFlow();
                    else closeChat()
                  }}
                  className="hover:bg-yellow-600/20 text-gray-900 transition-all duration-200 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </header>

            <div className="flex-1 flex flex-col min-h-0">
              {isBooking ? (
                <div className="p-4 animate-in fade-in">
                  <CardHeader className="px-1 pt-0">
                    <CardTitle>Book Your Free Trial</CardTitle>
                    <CardDescription>
                      Let's get you set up. A team member will call you to confirm the details.
                    </CardDescription>
                  </CardHeader>
                  <div className="grid gap-3 pt-4">
                    <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input placeholder="Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <Textarea placeholder="Any notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                    <div className="flex items-center gap-2 pt-2">
                      <Button onClick={submitLead} disabled={pending || !name || !phone} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                        {pending ? "Submitting..." : "Confirm Booking"}
                      </Button>
                      <Button variant="ghost" onClick={cancelFlow}>Cancel</Button>
                    </div>
                  </div>
                </div>
              ) : isEmailing ? (
                <div className="p-4 animate-in fade-in">
                  <CardHeader className="px-1 pt-0">
                    <CardTitle>Email Chat Transcript</CardTitle>
                    <CardDescription>
                      Enter your email below and we'll send you a copy of this conversation.
                    </CardDescription>
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
                    {!sessionEnded && (
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
                    placeholder="Ask a question..."
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
      ) : null}
    </>
  )
}

