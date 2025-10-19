import { Undo2, CalendarClock, CreditCard, HelpCircle } from "lucide-react"

export default function CancellationPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-extrabold text-balance flex items-center gap-2">
          <Undo2 className="size-6" aria-hidden="true" />
          Cancellation & Refund Policy
        </h1>
        <p className="mt-2 text-muted-foreground">
          Clear, fair terms for cancelling memberships and one‑time purchases.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </header>

      {/* Memberships */}
      <section className="mt-8 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarClock className="size-5" aria-hidden="true" />
          Memberships (auto‑renewing)
        </h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>Cancel anytime from your account or by contacting support.</li>
          <li>Cancellations take effect at the end of the current billing period.</li>
          <li>We generally do not prorate or refund partial periods unless required by law.</li>
        </ul>
      </section>

      {/* One-time payments */}
      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CreditCard className="size-5" aria-hidden="true" />
          One‑time payments (Day Pass / Single Session)
        </h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>Non‑recurring and non‑refundable once redeemed.</li>
          <li>If charged in error and not used, contact support within 7 days with your order ID.</li>
        </ul>
      </section>

      {/* Class & Booking Changes */}
      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Class & Booking Changes</h2>
        <p className="text-pretty">
          Reschedule up to 12 hours before your class start time when available. Missed sessions are not refundable.
        </p>
      </section>

      {/* How to Cancel */}
      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold">How to cancel</h2>
        <p className="mt-2 text-muted-foreground">
          Visit your membership page to cancel, or email support with your name, purchase email, and order ID. We’ll
          confirm by email when complete.
        </p>
      </section>

      {/* Help Note */}
      <aside className="mt-6 rounded-lg border border-border bg-card/40 p-4 flex items-start gap-3">
        <HelpCircle className="mt-0.5 size-5" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Your statutory rights remain unaffected. If local law provides cooling‑off periods or specific refund rights,
          those will apply.
        </p>
      </aside>
    </main>
  )
}
