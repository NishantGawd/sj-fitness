type ReceiptInput = {
  name: string
  email: string
  planId: "1m" | "3m" | "6m" | "12m"
  planName: string
  amount: number
  branch?: string
  mode: "one-time" | "subscription"
  orderId?: string
  subscriptionId?: string
  paymentId?: string
}

export function buildMembershipReceiptEmail(input: ReceiptInput) {
  const currency = `₹${Number(input.amount || 0).toLocaleString("en-IN")}`
  const cycle =
    input.mode === "subscription"
      ? input.planId === "1m"
        ? "/month"
        : input.planId === "3m"
          ? " every 3 months"
          : input.planId === "6m"
            ? " every 6 months"
            : " yearly"
      : ""
  const badge =
    "font-weight:700;padding:4px 10px;border-radius:9999px;background:#ffd000;color:#000;display:inline-block;"
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#a3a3a3;width:160px">${label}</td><td style="padding:8px 0;color:#e5e5e5">${value}</td></tr>`
  return `
  <meta name="color-scheme" content="light">
  <div style="font-family:Inter,ui-sans-serif,system-ui;max-width:640px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa">
    <div style="border:1px solid #262626;border-radius:16px;overflow:hidden">
      <div style="padding:24px;background:#111111;border-bottom:1px solid #262626">
        <div style="${badge}">Membership Confirmed</div>
        <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3">Thanks, ${input.name}!</h1>
        <p style="margin:8px 0 0;color:#a3a3a3">Your ${input.planName} membership is now active.</p>
      </div>
      <div style="padding:24px;background:#0a0a0a">
        <table style="width:100%;border-collapse:collapse">
          ${row("Plan", input.planName)}
          ${row("Amount", `${currency}${cycle}`)}
          ${row("Branch", input.branch || "—")}
          ${row("Payment Type", input.mode === "subscription" ? "Subscription" : "One-time")}
          ${input.orderId ? row("Order ID", input.orderId) : ""}
          ${input.subscriptionId ? row("Subscription ID", input.subscriptionId) : ""}
          ${input.paymentId ? row("Payment ID", input.paymentId) : ""}
        </table>
        <div style="margin-top:16px;color:#a3a3a3;font-size:13px">
          You’ll receive reminders near renewal. You can reply to this email for any assistance.
        </div>
      </div>
      <div style="padding:18px;background:#111;border-top:1px solid #262626;color:#a3a3a3;font-size:12px">
        SJ Fitness • Thank you for training with us.
      </div>
    </div>
  </div>
  `
}
