export default function CancellationPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-balance">Cancellation & Refund Policy</h1>
      <p className="mt-3 text-muted-foreground">Clear, fair terms for cancelling memberships and one‑time purchases.</p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Memberships</h2>
        <ul className="list-inside list-disc text-pretty text-muted-foreground">
          <li>Cancel anytime from your account or by contacting support.</li>
          <li>Cancellations take effect at the end of the current billing period.</li>
          <li>No partial refunds for unused time within an active period.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">One‑Time Payments (Day Pass / Single Session)</h2>
        <ul className="list-inside list-disc text-pretty text-muted-foreground">
          <li>One‑time purchases are non‑recurring and non‑refundable once redeemed.</li>
          <li>If you were charged in error and did not use the pass, contact support within 7 days.</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Class & Booking Changes</h2>
        <p className="text-pretty">
          Reschedule up to 12 hours before your class start time when available. Missed sessions are not refundable.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">How to Cancel</h2>
        <p className="text-pretty">
          Visit your membership page and follow the cancellation flow, or email support with your name, purchase email,
          and order ID. We’ll confirm by email once processed.
        </p>
      </section>
    </main>
  )
}
