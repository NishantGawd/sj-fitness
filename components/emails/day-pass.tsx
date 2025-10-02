type DayPassInput = {
  name: string
  branch?: string
  date?: string
  qrUrl?: string
}

export function buildDayPassEmail({ name, branch, date, qrUrl }: DayPassInput) {
  const safe = (s?: string) => (s ? String(s) : "")
  const badge =
    "font-weight:700;padding:4px 10px;border-radius:9999px;background:#ffd000;color:#000;display:inline-block;"
  return `
  <meta name="color-scheme" content="light">
  <div style="font-family:Inter,ui-sans-serif,system-ui;max-width:640px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa">
    <div style="border:1px solid #262626;border-radius:16px;overflow:hidden">
      <div style="padding:24px;background:#111111;border-bottom:1px solid #262626">
        <div style="${badge}">Free 1‑Day Pass</div>
        <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3">Welcome, ${safe(name)}! Your trial starts soon.</h1>
        <p style="margin:8px 0 0;color:#a3a3a3">Show this email at the front desk to claim your pass.</p>
      </div>
      <div style="padding:24px;background:#0a0a0a">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#a3a3a3;width:140px">Branch</td>
            <td style="padding:8px 0;color:#e5e5e5">${safe(branch) || "Any participating location"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#a3a3a3">Valid Date</td>
            <td style="padding:8px 0;color:#e5e5e5">${safe(date) || "Today"}</td>
          </tr>
        </table>
        ${
          qrUrl
            ? `<div style="margin-top:16px;padding:12px;border:1px dashed #262626;border-radius:12px;text-align:center">
                <img src="${qrUrl}" alt="QR code for day pass" width="132" height="132" style="border-radius:8px"/>
                <div style="margin-top:8px;color:#a3a3a3;font-size:12px">Scan at entry</div>
              </div>`
            : ""
        }
        <div style="margin-top:16px;color:#a3a3a3;font-size:13px">
          Please carry a valid ID. Gym rules and safety guidelines apply.
        </div>
      </div>
      <div style="padding:18px;background:#111;border-top:1px solid #262626;color:#a3a3a3;font-size:12px">
        Need help? Reply to this email and our team will assist you.
      </div>
    </div>
  </div>
  `
}
