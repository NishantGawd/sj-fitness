export type QA = { q: string; a: string; tags?: string[] }

export const FAQ_QA: QA[] = [
  {
    q: "what are your opening hours",
    a: "We’re open Monday–Friday 5:30 AM–10:00 PM, Saturday 7:00 AM–8:00 PM, and Sunday 8:00 AM–6:00 PM.",
    tags: ["hours", "time", "open", "closing", "schedule"],
  },
  {
    q: "do you offer a free trial",
    a: "Yes! We offer a complimentary trial session. Tap “Book a Free Trial” to get started, and we’ll confirm via phone.",
    tags: ["trial", "free", "book", "booking"],
  },
  {
    q: "how much is membership",
    a: "We offer flexible plans: Monthly from $49, 3-Month from $129, and Annual from $449. Student and family discounts available.",
    tags: ["price", "pricing", "membership", "cost", "fees"],
  },
  {
    q: "do you have personal trainers",
    a: "Yes. Our certified trainers specialize in strength, conditioning, mobility, and nutrition. Tell me your goal and I’ll recommend a plan.",
    tags: ["trainer", "coach", "pt", "personal trainer", "coaching"],
  },
  {
    q: "what classes do you have",
    a: "We run HIIT, strength circuits, mobility, spin, and boxing classes across the week. Ask me for today’s schedule.",
    tags: ["classes", "class", "schedule", "hiit", "spin", "boxing"],
  },
  {
    q: "where are you located",
    a: "We’re located at 123 SJ Fitness Blvd, Suite 200. On-site parking available.",
    tags: ["location", "address", "parking", "where"],
  },
]

export const QUICK_ACTIONS: Array<{
  id: string
  label: string
  message: string
  flow?: string
}> = [
  { id: "qa-membership", label: "Gym Membership", message: "Tell me about memberships and pricing." },
  { id: "qa-pricing", label: "Pricing", message: "What are your current prices?" },
  { id: "qa-hours", label: "Opening Hours", message: "What are your opening hours?" },
  { id: "qa-trainers", label: "Trainers", message: "Do you offer personal trainers?" },
  { id: "qa-classes", label: "Classes", message: "What classes do you have?" },
  { id: "flow-book", label: "Book a Free Trial", message: "", flow: "book-trial" },
]

export const START_FLOW_MESSAGE: Record<string, string> = {
  "book-trial": "Great! What’s your name and phone number? I’ll confirm your free trial.",
  membership: "Happy to help with membership options. What’s your fitness goal and how often do you plan to train?",
  pricing: "I can walk you through our current pricing. Are you looking for monthly or annual?",
  hours: "Ask me about opening hours for weekdays or weekends.",
  trainers: "We have certified trainers for different goals. What would you like to focus on?",
}
