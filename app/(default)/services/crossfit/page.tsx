import { Flame, CheckCircle2 } from "lucide-react"

export default function CrossfitService() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8 flex items-center gap-3">
        <Flame className="h-6 w-6" />
        <h1 className="text-balance text-3xl font-semibold">CrossFit Training</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <img
            src="/crossfit.jpg"
            alt="Kettlebells and boxes in a CrossFit space"
            className="mb-4 h-56 w-full rounded-lg object-cover"
          />
          <p className="text-muted-foreground">
            Constantly varied, high‑intensity functional training. Build power, agility, and work capacity in safe,
            coach‑led sessions.
          </p>
        </div>

        <ul className="rounded-xl border border-border bg-card p-6 text-sm">
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Scalable WODs for all levels (strength, skill, metcon)
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Technique first: movement quality and safety
          </li>
          <li className="mb-3 flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Community‑driven environment to stay consistent
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
            Benchmarks and progress tracking across cycles
          </li>
        </ul>
      </div>
    </div>
  )
}
