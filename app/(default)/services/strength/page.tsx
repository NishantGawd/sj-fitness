import { Dumbbell, CheckCircle2 } from "lucide-react"

export default function StrengthService() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center gap-3">
        <Dumbbell className="h-6 w-6" />
        <h1 className="text-balance text-3xl font-semibold">Strength Training</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <img
            src="/strength.jpg"
            alt="Barbells and rack in a modern gym"
            className="mb-4 h-56 w-full rounded-lg object-cover"
          />
          <p className="text-muted-foreground">
            Build muscle and functional strength with periodized programming. We focus on compound lifts, progressive
            overload, and safe technique to deliver measurable strength gains.
          </p>
        </div>

        <ul className="rounded-xl border border-border bg-card p-6 text-sm">
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Evidence-based coaching tailored to your experience level
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Structured cycles for hypertrophy, strength, and power
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Movement assessments and injury‑prevention warmups
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Progress tracking with regular testing blocks
          </li>
        </ul>
      </div>
    </div>
  )
}
