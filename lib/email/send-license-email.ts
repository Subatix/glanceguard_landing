import { Resend } from "resend";
import { getSiteUrl } from "@/lib/site-url";

export function requireResendClient(): Resend {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(key);
}

export async function sendLicenseDeliveryEmail(input: {
  to: string;
  licenseKey: string;
}) {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not set");
  }

  const site = getSiteUrl();
  const downloadPath = `${site}/download`;
  const supportPath = `${site}/support`;

  const resend = requireResendClient();
  await resend.emails.send({
    from,
    to: input.to,
    subject: "Your GlanceGuard license",
    html: `
      <p>You paid for GlanceGuard — thanks. Here’s your license key (copy exactly):</p>
      <pre style="font-family:ui-monospace,monospace;font-size:15px;line-height:1.5;background:#1118270d;padding:12px;border-radius:8px;">${escapeHtml(
        input.licenseKey,
      )}</pre>
      <p><strong>How to activate</strong>: open GlanceGuard on your Mac → paste this key where the app asks for a license → continue setup.</p>
      <ul>
        <li><a href="${escapeHtml(downloadPath)}">Download / install DMG</a></li>
        <li><a href="${escapeHtml(supportPath)}">Support</a></li>
      </ul>
      <p style="color:#6b7280;font-size:14px;margin-top:24px;">
        Lifetime license · one seat on one Mac. Keep this email — receipts are awkward to dig up mid-airport Wi‑Fi.
      </p>
    `,
    text: [
      `Your GlanceGuard license key: ${input.licenseKey}`,
      "",
      `Activate: open GlanceGuard → paste the key.`,
      "",
      `Download: ${downloadPath}`,
      `Support: ${supportPath}`,
    ].join("\n"),
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
