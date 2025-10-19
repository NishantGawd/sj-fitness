export type QA = { q: string; a: string; tags?: string[] }

export const FAQ_QA: QA[] = [
  {
    q: "what are your opening hours",
    a: "We’re open Monday–Saturday 5:30 AM–10:00 PM, and Sunday 5:30 AM–12:00 PM.",
    tags: ["hours", "time", "open", "closing", "schedule", "when are you open"],
  },
  {
    q: "do you offer a free trial",
    a: "Yes! We offer a complimentary trial session. Tap “Book a Free Trial” and I can get all the details from you right here in the chat.",
    tags: ["trial", "free", "book", "booking", "try", "guest pass"],
  },
  {
    q: "how much is membership",
    a: "We offer flexible plans: <b>Monthly</b> from ₹3000, <b>3-Month</b> from ₹6000, <b>6-Month</b> from ₹9000 and <b>Annual</b> from ₹13000. All include unlimited access to gym and classes. There are no sign-up fees.",
    tags: ["price", "pricing", "membership", "cost", "fees", "plans", "join", "subscription", "rates"],
  },
  {
    q: "do you have personal trainers",
    a: "Absolutely. Our certified trainers specialize in strength, conditioning, mobility, and nutrition. They are here to create a personalized plan to help you reach your goals.",
    tags: ["trainer", "coach", "pt", "personal trainer", "coaching", "guidance"],
  },
  {
    q: "what classes do you have",
    a: "We run a variety of exciting classes, including <b>HIIT</b>, <b>Strength Circuits</b>, <b>Yoga</b>, and <b>Zumba</b> throughout the week.",
    tags: ["classes", "class", "schedule", "group fitness", "yoga", "zumba", "hiit"],
  },
  {
    q: "where are you located",
    a: "We’re located at 2nd Floor, Akshardham Chauraha, B1/564A, Chitrakoot Jaipur, Rajasthan 302021.",
    tags: ["location", "address", "parking", "where", "find you", "directions"],
  },
  {
    q: "what kind of equipment do you have",
    a: "Our gym is fully equipped! We have a complete range of cardio machines (treadmills, ellipticals), a dedicated section for free weights with dumbbells and barbells, squat racks, and various strength training machines.",
    tags: ["equipment", "machines", "weights", "cardio", "facilities", "gear"],
  },
  {
    q: "do you have lockers and showers",
    a: "Yes, we provide secure lockers for your belongings and clean shower facilities for you to use after your workout.",
    tags: ["amenities", "facilities", "showers", "lockers", "storage", "changing room"],
  },
  {
    q: "can i pause or freeze my membership",
    a: "Yes, you can! We allow membership freezes for our 3-month, 6-month, and annual plans. Please speak with the front desk staff for more details on the policy.",
    tags: ["membership", "pause", "freeze", "hold", "stop", "suspend"],
  },
  {
    q: "is there car parking",
    a: "Yes, there is available parking near our facility for members.",
    tags: ["parking", "car", "vehicle", "location", "address"],
  },
  {
    q: "do i need to book for classes in advance",
    a: "While drop-ins are welcome if there's space, we highly recommend booking your spot in advance through our app or at the front desk to guarantee your place, as classes can get busy!",
    tags: ["booking", "classes", "schedule", "reserve", "sign up", "appointment"],
  },
  {
    q: "what makes SJ Fitness different from other gyms",
    a: "At SJ Fitness, we focus on community, expert guidance, and state-of-the-art equipment. Our certified trainers are dedicated to your personal journey, and our wide range of classes ensures your workouts are always engaging.",
    tags: ["why you", "different", "better", "about", "special"],
  },
  {
    q: "how do i cancel my membership",
    a: "We'd be sad to see you go! To cancel your membership, please visit the front desk to fill out a cancellation form. Note that a notice period may apply based on your plan.",
    tags: ["cancel", "cancellation", "end membership", "quit", "leave"],
  },
  {
    q: "are there water fountains or can i buy drinks",
    a: "Yes, we have a filtered water fountain for you to refill your bottle. We also have a selection of water, protein shakes, and healthy drinks available for purchase at the front desk.",
    tags: ["water", "drinks", "beverages", "nutrition", "store"],
  },
  {
    q: "what is the busiest time at the gym",
    a: "Our peak hours are typically on weekdays from 6:30 AM to 8:30 AM and from 5:00 PM to 8:00 PM. If you prefer a quieter workout, we recommend visiting during midday or on weekends.",
    tags: ["busy", "peak hours", "crowded", "quiet", "best time"],
  },
  {
    q: "do you have specific equipment like a leg press or squat rack",
    a: "Yes, we have all the essential equipment for a great workout, including multiple squat racks, leg press machines, and a wide variety of free weights and resistance machines.",
    tags: ["squat rack", "leg press", "bench press", "specific equipment"],
  },
  {
    q: "are there discounts for students or corporates",
    a: "We do offer special corporate packages and occasional student discounts. Please contact our front desk with your details to learn more about current offers.",
    tags: ["discount", "student", "corporate", "offer", "pricing"],
  },
  {
    q: "how old do i have to be to join the gym",
    a: "The minimum age to join SJ Fitness is 16 years old. Members who are 16 or 17 require consent from a parent or guardian.",
    tags: ["age", "requirement", "minimum", "join"],
  },
  {
    q: "what should i bring for my first workout or trial session",
    a: "For a great first session, please bring comfortable workout clothes, athletic shoes, a water bottle, and a towel. We'll take care of the rest!",
    tags: ["trial", "first time", "what to bring", "prepare"],
  },
  {
    q: "do you have Wi-Fi",
    a: "Yes, we offer complimentary Wi-Fi for all our members. You can get the password from the front desk.",
    tags: ["wifi", "internet", "amenities", "facilities"],
  },
  {
    q: "can i pay with a credit card or upi",
    a: "Absolutely. We accept all major credit cards, debit cards, and UPI payments for memberships and other services.",
    tags: ["payment", "pay", "credit card", "upi", "cash"],
  },
]

// --- QUICK ACTIONS AND START FLOWS (NO CHANGES) ---
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
  "book-trial": "Great! Let's get you booked. First, which of our branches would you like to visit: <b>Vaishali Nagar</b> or <b>Gandhi Path</b>?",
  membership: "Happy to help with membership options. What’s your fitness goal and how often do you plan to train?",
  pricing: "I can walk you through our current pricing. Are you looking for monthly or annual?",
  hours: "Ask me about opening hours for weekdays or weekends.",
  trainers: "We have certified trainers for different goals. What would you like to focus on?",
}