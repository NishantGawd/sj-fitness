import { FileText, Scale, CreditCard, Users, Dumbbell, ShieldAlert } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <header>
        <h1 className="text-3xl font-extrabold text-balance flex items-center gap-2">
          <FileText className="size-6" aria-hidden="true" />
          Terms of Service
        </h1>
        <p className="mt-2 text-muted-foreground">
          These terms govern your use of SJ Fitness services, memberships, and the website.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      </header>

      <section className="mt-8 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="size-5" aria-hidden="true" />
          Accounts & eligibility
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          You must be legally capable of entering into contracts in your jurisdiction. You’re responsible for your
          account credentials and all activity on your account.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold">Memberships and day passes</h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          Memberships renew per their plan terms until cancelled. Day passes grant access for the period shown at
          purchase and do not auto‑renew.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CreditCard className="size-5" aria-hidden="true" />
          Billing & charges
        </h2>
        <p className="mt-2 text-pretty text-muted-foreground">
          Payments are processed by our payment provider. Taxes may apply. By subscribing, you authorize recurring
          charges until you cancel. Keep your billing details accurate.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card/40 p-5">
          <h3 className="font-semibold flex items-center gap-2">
            <Dumbbell className="size-5" aria-hidden="true" />
            Facility & conduct
          </h3>
          <p className="mt-2 text-muted-foreground">
            Follow posted rules and staff directions. We may suspend access for unsafe or disruptive behavior.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card/40 p-5">
          <h3 className="font-semibold flex items-center gap-2">
            <ShieldAlert className="size-5" aria-hidden="true" />
            Health disclaimer
          </h3>
          <p className="mt-2 text-muted-foreground">
            Fitness activities carry inherent risks. Consult a physician before beginning any program. You participate
            at your own risk.
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Scale className="size-5" aria-hidden="true" />
          Disclaimers & limitation of liability
        </h2>
        <p className="mt-2 text-muted-foreground">
          To the fullest extent permitted by law, we disclaim implied warranties and exclude liability for indirect or
          incidental damages. Nothing here limits rights that cannot be excluded by law.
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-border bg-card/40 p-5">
        <h2 className="text-xl font-semibold">Changes and governing law</h2>
        <p className="mt-2 text-muted-foreground">
          We may update these terms. Continued use after updated terms take effect constitutes acceptance. These terms
          are governed by the laws of your primary place of business; choose the appropriate jurisdiction when
          deploying.
        </p>
      </section>
    </main>
  )
}
