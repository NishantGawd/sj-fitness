import type React from "react"
import { ShieldCheck, Lock, Database, Bell, Globe, UserCheck, Mail, CreditCard } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-balance flex items-center gap-2">
          <ShieldCheck className="size-6" aria-hidden="true" />
          Privacy Policy
        </h1>
        <p className="mt-2 text-muted-foreground">
          We respect your privacy and handle your data responsibly. This notice explains what we collect, why we collect
          it, and the choices you have.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </header>

      <section className="mt-8 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <UserCheck className="size-5" aria-hidden="true" />
          Who controls your data
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          SJ Fitness is the data controller for information collected through this website and our services.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Database className="size-5" aria-hidden="true" />
          Information we collect
        </h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>Account details: name, email, phone, selected branch.</li>
          <li>Purchase details: plan, amount, payment status/IDs from our payment providers.</li>
          <li>Usage and device data: pages viewed, approximate location, and performance metrics.</li>
          <li>Support messages and preferences you share with us.</li>
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShieldCheck className="size-5" aria-hidden="true" />
          Why we use your data (legal bases)
        </h2>
        <ul className="mt-2 list-inside list-disc text-muted-foreground">
          <li>To provide the service and fulfill purchases (contract).</li>
          <li>To keep our platform secure, prevent fraud, and improve features (legitimate interests).</li>
          <li>To send required emails such as receipts and policy updates (legal/contract).</li>
          <li>With your consent for optional marketing or analytics where required.</li>
        </ul>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CreditCard className="size-5" aria-hidden="true" />
          Payments and communications
        </h2>
        <p className="mt-2 text-muted-foreground">
          Payments are processed by trusted providers. We never store full card details. We use an email provider to
          send receipts, reminders, and pass confirmations. You can opt out of marketing emails at any time via the link
          in our emails.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="size-5" aria-hidden="true" />
          Cookies & analytics
        </h2>
        <p className="mt-2 text-muted-foreground">
          We use cookies or similar technologies to keep you signed in, remember preferences, and measure site
          performance. You can control cookies via your browser settings. Some features may not function without
          essential cookies.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card/40 p-5">
          <h3 className="font-semibold flex items-center gap-2">
            <Lock className="size-5" aria-hidden="true" />
            Security & retention
          </h3>
          <p className="mt-2 text-muted-foreground">
            We apply industry-standard safeguards and retain data only as long as necessary for the purposes described
            above or as required by law.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/40 p-5">
          <h3 className="font-semibold flex items-center gap-2">
            <Mail className="size-5" aria-hidden="true" />
            Your rights
          </h3>
          <p className="mt-2 text-muted-foreground">
            You can request access, correction, deletion, or portability of your data where applicable. Contact us to
            exercise your rights.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Globe className="size-5" aria-hidden="true" />
          International transfers
        </h2>
        <p className="mt-2 text-muted-foreground">
          When we use global providers, your data may be transferred to other countries. We rely on appropriate
          safeguards where required.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold">Children</h2>
        <p className="mt-2 text-muted-foreground">
          Our services are not directed to children under the age required by local law. If you believe a child provided
          personal data, contact us.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-muted-foreground">
          Reach our privacy team at the email listed in the site footer. Please include your name and the email used for
          your account.
        </p>
      </section>
    </main>
  )
}

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  // small helper to avoid adding another import
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <rect x="2" y="9" width="20" height="2" />
      <rect x="6" y="14" width="6" height="2" />
    </svg>
  )
}
