export type QA = { q: string; a: string; tags?: string[] }

// in faq.ts

export const FAQ_QA: QA[] = [
  {
    q: "what are your opening hours",
    a: "<p>We are open 7 days a week:</p><ul><li><b>Mon–Sat:</b> 6:00 AM – 10:00 PM</li><li><b>Sunday:</b> 6:00 AM – 12:00 PM</li></ul>",
    tags: ["hours", "time", "open", "closing", "schedule", "when are you open"],
  },
  {
    q: "do you offer a free trial",
    a: "<p><b>Yes! We offer a complimentary trial session.</b></p><p>Tap 'Book a Free Trial' below, and I can get all the details from you right here in the chat to set it up.</p>",
    tags: ["trial", "free", "book", "booking", "try", "guest pass"],
  },
  {
    q: "how much is membership",
    a: "<p>We offer flexible plans with no sign-up fees:</p><ul><li><b>Monthly:</b> from ₹3000</li><li><b>3-Month:</b> from ₹6500</li><li><b>6-Month:</b> from ₹9000</li><li><b>Annual:</b> from ₹13500</li></ul><p><i>All plans include unlimited access to the gym and classes.</i></p>",
    tags: ["price", "pricing", "membership", "cost", "fees", "plans", "join", "subscription", "rates"],
  },
  {
    q: "do you have personal trainers",
    a: "<p><b>Absolutely.</b> Our certified trainers specialize in:</p><ul><li>Strength & Conditioning</li><li>Mobility</li><li>Nutrition</li></ul><p>They are here to create a personalized plan to help you reach your goals.</p>",
    tags: ["trainer", "coach", "pt", "personal trainer", "coaching", "guidance"],
  },
  {
    q: "what classes do you have",
    a: "<p>We run a variety of exciting classes throughout the week, including:</p><ul><li><b>HIIT</b> (High Intensity Interval Training)</li><li><b>Strength Circuits</b></li><li><b>Yoga</b></li><li><b>Zumba</b></li></ul>",
    tags: ["classes", "class", "schedule", "group fitness", "yoga", "zumba", "hiit"],
  },
  {
    q: "where are you located",
    a: "<p>We are located at:</p><p><b>2nd Floor, Akshardham Chauraha,<br>B1/564A, Chitrakoot<br>Jaipur, Rajasthan 302021</b></p>",
    tags: ["location", "address", "parking", "where", "find you", "directions"],
  },
  {
    q: "what kind of equipment do you have",
    a: "<p>Our gym is fully equipped with:</p><ul><li><b>Cardio:</b> Treadmills, Ellipticals</li><li><b>Free Weights:</b> Dumbbells, Barbells, Squat Racks</li><li><b>Machines:</b> A wide range of strength training machines</li></ul>",
    tags: ["equipment", "machines", "weights", "cardio", "facilities", "gear"],
  },
  {
    q: "do you have lockers and showers",
    a: "<p>Yes, we provide:</p><ul><li><b>Secure Lockers</b> for your belongings</li><li><b>Clean Showers</b> for post-workout use</li></ul>",
    tags: ["amenities", "facilities", "showers", "lockers", "storage", "changing room"],
  },
  {
    q: "can i pause or freeze my membership",
    a: "<p><b>Yes, you can!</b></p><p>We allow membership freezes for our <b>3-month, 6-month, and annual plans</b>. Please speak with the front desk staff for more details on the policy.</p>",
    tags: ["membership", "pause", "freeze", "hold", "stop", "suspend"],
  },
  {
    q: "is there car parking",
    a: "Yes, there is available parking near our facility for members.",
    tags: ["parking", "car", "vehicle", "location", "address"],
  },
  {
    q: "do i need to book for classes in advance",
    a: "<p>While drop-ins are welcome if there's space, we <b>highly recommend booking in advance</b> via our app or the front desk to guarantee your spot!</p>",
    tags: ["booking", "classes", "schedule", "reserve", "sign up", "appointment"],
  },
  {
    q: "what makes SJ Fitness different from other gyms",
    a: "<p>At SJ Fitness, we focus on:</p><ul><li><b>Community:</b> A supportive environment.</li><li><b>Expert Guidance:</b> Certified trainers dedicated to you.</li><li><b>Quality:</b> State-of-the-art equipment.</li></ul>",
    tags: ["why you", "different", "better", "about", "special"],
  },
  {
    q: "how do i cancel my membership",
    a: "We'd be sad to see you go! To cancel, please visit the front desk to fill out a cancellation form. <br><i>Note: A notice period may apply based on your plan.</i>",
    tags: ["cancel", "cancellation", "end membership", "quit", "leave"],
  },
  {
    q: "are there water fountains or can i buy drinks",
    a: "<p><b>Yes!</b></p><ul><li>Filtered water fountain (free)</li><li>Pro shop with water, protein shakes, and healthy drinks (for purchase)</li></ul>",
    tags: ["water", "drinks", "beverages", "nutrition", "store"],
  },
  {
    q: "what is the busiest time at the gym",
    a: "<p><b>Peak Hours:</b><br>Mon-Fri: 6:30 AM – 8:30 AM & 5:00 PM – 8:00 PM</p><p><b>Quieter Times:</b><br>Midday (11 AM – 4 PM) or Weekends.</p>",
    tags: ["busy", "peak hours", "crowded", "quiet", "best time"],
  },
  {
    q: "do you have specific equipment like a leg press or squat rack",
    a: "Yes, we have all the essentials including <b>multiple squat racks</b>, <b>leg press machines</b>, and a wide variety of free weights.",
    tags: ["squat rack", "leg press", "bench press", "specific equipment"],
  },
  {
    q: "are there discounts for students or corporates",
    a: "We do offer special corporate packages and occasional student discounts. Please contact our front desk to check current offers.",
    tags: ["discount", "student", "corporate", "offer", "pricing"],
  },
  {
    q: "how old do i have to be to join the gym",
    a: "The minimum age is <b>16 years old</b>. Members who are 16 or 17 require consent from a parent or guardian.",
    tags: ["age", "requirement", "minimum", "join"],
  },
  {
    q: "what should i bring for my first workout or trial session",
    a: "<p>For a great first session, please bring:</p><ul><li>Comfortable workout clothes</li><li>Athletic shoes</li><li>A water bottle</li><li>A towel</li></ul><p>We'll take care of the rest!</p>",
    tags: ["trial", "first time", "what to bring", "prepare"],
  },
  {
    q: "do you have Wi-Fi",
    a: "Yes, we offer <b>complimentary Wi-Fi</b> for all our members. You can get the password from the front desk.",
    tags: ["wifi", "internet", "amenities", "facilities"],
  },
  {
    q: "can i pay with a credit card or upi",
    a: "<p>Absolutely. We accept:</p><ul><li>All major Credit/Debit Cards</li><li>UPI Payments</li><li>Cash</li></ul>",
    tags: ["payment", "pay", "credit card", "upi", "cash"],
  },
  {
    q: "what features and benefits are included in the memberships",
    a: "<p><b>All our memberships (starting from 1 Month) include:</b></p><ul><li><b>Full Access:</b> Gym floor, Locker facilities, and Showers.</li><li><b>Classes:</b> Unlimited Yoga, Zumba, HIIT, and Aerobics.</li><li><b>Guidance:</b> Standard Workout Plan + Monthly Outings.</li></ul><p><b>Long-term Plan Perks:</b></p><ul><li><b>3 Months:</b> Adds a Free BCA Test & Fitness Assessment.</li><li><b>6 Months:</b> Adds Monthly Body Composition Analysis.</li><li><b>1 Year:</b> Adds all the above + <b>10% Off Merchandise</b>.</li></ul>",
    tags: ["benefits", "included", "features", "perks", "bca", "classes", "what do i get"],
  },
]

// --- QUICK ACTIONS AND START FLOWS (NO CHANGES) ---
export const QUICK_ACTIONS: Array<{
  id: string
  label: string
  message: string
  flow?: string
}> = [
    { id: "qa-membership", label: "Gym Membership", message: "What features and benefits are included in the memberships?" },
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