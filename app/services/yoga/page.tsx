import { StretchHorizontal, CheckCircle2 } from "lucide-react"

export default function YogaFlexService() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center gap-3">
        <StretchHorizontal className="h-6 w-6" />
        <h1 className="text-balance text-3xl font-semibold">Yoga & Flexibility</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <img
            src="/yoga.jpg"
            alt="Calm yoga studio with mats"
            className="mb-4 h-56 w-full rounded-lg object-cover"
          />
          <p className="text-muted-foreground">
            Restore mobility, improve posture, and reduce stress with guided flows, breathwork, and recovery sessions
            designed for active people.
          </p>
        </div>

        <ul className="rounded-xl border border-border bg-card p-6 text-sm">
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Mobility flows targeting hips, shoulders, T‑spine
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Breathwork and mindfulness for recovery and focus
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Yoga for lifters and runners (complementary routines)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Beginner‑friendly classes with progressions
          </li>
        </ul>
      </div>
    </div>
  )
}
