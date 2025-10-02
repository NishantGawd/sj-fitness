export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-extrabold text-balance">Privacy Policy</h1>
      <p className="mt-3 text-muted-foreground">
        We respect your privacy and handle your data responsibly. This policy explains what we collect and how we use
        it.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="text-xl font-semibold">Information We Collect</h2>
        <p className="text-pretty">
          When you create an account or purchase a membership, we collect your name, email, and payment details
          processed securely by our payment provider. We also collect basic analytics to improve the experience.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">How We Use Information</h2>
        <ul className="list-inside list-disc text-pretty text-muted-foreground">
          <li>Provide and manage memberships and day passes</li>
          <li>Send receipts, reminders, and relevant service updates</li>
          <li>Improve site performance and class/program offerings</li>
        </ul>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Data Sharing</h2>
        <p className="text-pretty">
          We do not sell your data. We share it only with essential processors (e.g., payment and email providers) to
          deliver the service. They comply with industry-standard security practices.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Your Choices</h2>
        <p className="text-pretty">
          You can request access, correction, or deletion of your data by contacting us. Opt-out links are included in
          marketing emails.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-pretty">For privacy questions, contact our team at the email listed in the site footer.</p>
      </section>
    </main>
  )
}
