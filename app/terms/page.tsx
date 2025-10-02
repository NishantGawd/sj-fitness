export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-balance">Terms of Service</h1>
      <p className="mt-3 text-muted-foreground">
        These terms govern your use of SJ Fitness services, memberships, and the website.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Accounts</h2>
        <p className="text-pretty">You are responsible for your account credentials and activity on your account.</p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Memberships & Day Passes</h2>
        <p className="text-pretty">
          Membership plans renew per their terms unless cancelled. Day passes are valid for the period specified in the
          purchase confirmation. Access may be suspended for misuse or policy violations.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Payments</h2>
        <p className="text-pretty">
          Payments are processed by our payment provider. Taxes may apply. You agree to provide accurate billing
          information and authorize recurring charges for subscription plans.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Liability</h2>
        <p className="text-pretty">
          Fitness activities carry inherent risks. Use facilities and programs at your discretion. To the fullest extent
          permitted by law, SJ Fitness is not liable for indirect or incidental damages.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Changes</h2>
        <p className="text-pretty">We may update these terms. Continued use after changes constitutes acceptance.</p>
      </section>
    </main>
  )
}
