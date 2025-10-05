import { HeartPulse, CheckCircle2 } from "lucide-react"

export default function CardioService() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center gap-3">
        <HeartPulse className="h-6 w-6" />
        <h1 className="text-balance text-3xl font-semibold">Cardio Workouts</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <img
            src="/cardio.jpg"
            alt="Cardio machines in a clean studio"
            className="mb-4 h-56 w-full rounded-lg object-cover"
          />
          <p className="text-muted-foreground">
            Improve endurance and heart health through structured LISS, tempo, and interval sessions designed for your
            goals—from fat loss to performance.
          </p>
        </div>

        <ul className="rounded-xl border border-border bg-card p-6 text-sm">
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Personalized HR zones and weekly progression
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Interval and tempo protocols to maximize VO₂ and stamina
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Metrics tracking for distance, pace, cadence, and load
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Low‑impact options for joint‑friendly conditioning
          </li>
        </ul>
      </div>
    </div>
  )
}
