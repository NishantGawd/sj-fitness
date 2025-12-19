type DayPassInput = {
  name: string
  branch?: string
  date?: string
  qrUrl?: string
  amount?: number
  paymentId?: string
}

export function buildDayPassEmail({ name, branch, date, qrUrl, amount, paymentId }: DayPassInput) {
  const safe = (s?: string) => (s ? String(s) : "")
  // Green badge for success/payment
  const badge =
    "font-weight:700;padding:4px 10px;border-radius:9999px;background:#22c55e;color:#000;display:inline-block;"
  
  return `
  <meta name="color-scheme" content="light">
  <div style="font-family:Inter,ui-sans-serif,system-ui;max-width:640px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fafafa">
    <div style="border:1px solid #262626;border-radius:16px;overflow:hidden">
      <div style="padding:24px;background:#111111;border-bottom:1px solid #262626">
        <div style="${badge}">PAYMENT SUCCESSFUL</div>
        <h1 style="margin:12px 0 0;font-size:22px;line-height:1.3">Receipt for ${safe(name)}</h1>
        <p style="margin:8px 0 0;color:#a3a3a3">Thank you for your purchase. Your trial pass is attached below.</p>
      </div>
      <div style="padding:24px;background:#0a0a0a">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#a3a3a3;width:140px">Item</td>
            <td style="padding:8px 0;color:#e5e5e5">1-Day Gym Trial Pass</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#a3a3a3">Branch</td>
            <td style="padding:8px 0;color:#e5e5e5">${safe(branch) || "Any participating location"}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#a3a3a3">Valid Date</td>
            <td style="padding:8px 0;color:#e5e5e5">${safe(date) || "Today"}</td>
          </tr>
           <tr>
            <td style="padding:8px 0;color:#a3a3a3;border-top:1px solid #262626;margin-top:8px">Amount Paid</td>
            <td style="padding:8px 0;color:#ffd700;font-weight:bold;border-top:1px solid #262626;margin-top:8px">₹${amount || "200"}.00</td>
          </tr>
        </table>
        ${
          qrUrl
            ? `<div style="margin-top:24px;padding:16px;border:1px dashed #333;border-radius:12px;text-align:center;background:#0f0f0f">
                <img src="${qrUrl}" alt="Entry QR Code" width="150" height="150" style="border-radius:8px"/>
                <div style="margin-top:12px;color:#ffd700;font-weight:bold;font-size:14px">ENTRY PASS</div>
                <div style="margin-top:4px;color:#666;font-size:11px">Scan this QR code at the front desk</div>
              </div>`
            : ""
        }
        <div style="margin-top:24px;color:#666;font-size:12px;text-align:center">
          Transaction ID: ${paymentId || "N/A"} <br/>
          Please carry a valid ID. Gym rules and safety guidelines apply.
        </div>
      </div>
      <div style="padding:18px;background:#111;border-top:1px solid #262626;color:#a3a3a3;font-size:12px;text-align:center">
        SJ Fitness India • Vaishali Nagar & Gandhi Path, Jaipur
      </div>
    </div>
  </div>
  `
}