"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  section: z.enum(["nature", "corporate", "celebration", "spiritual", "general"]),
  groupSize: z.coerce.number().int().min(1).max(1000).optional(),
  preferredDates: z.string().max(120).optional(),
  message: z.string().max(2000).optional(),
  company_website: z.string().max(0).optional(),
});

export type InquiryState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    section: formData.get("section"),
    groupSize: formData.get("groupSize") || undefined,
    preferredDates: formData.get("preferredDates") || undefined,
    message: formData.get("message") || undefined,
    company_website: formData.get("company_website") || undefined,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  if (parsed.data.company_website) {
    return { ok: true, message: "Thank you!" };
  }

  const { company_website: _hp, ...payload } = parsed.data;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      section: payload.section,
      group_size: payload.groupSize ?? null,
      preferred_dates: payload.preferredDates ?? null,
      payload: { message: payload.message ?? "" },
      status: "new",
    });
    if (error) throw error;
  } catch {
    return {
      ok: false,
      message: "Something went wrong saving your inquiry. Please try WhatsApp or call us.",
    };
  }

  // Send notification email  -  fire-and-forget, never fail the user response
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.INQUIRY_NOTIFY_EMAIL;
  if (resendKey && notifyEmail) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Trip Planner Enquiries <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `New Inquiry  -  ${payload.name} (${payload.section})`,
        html: `
<div style="font-family:sans-serif;max-width:560px;color:#1a1410">
  <div style="background:#2f4a3c;padding:24px 28px;border-radius:12px 12px 0 0">
    <h1 style="margin:0;font-size:1.4rem;color:#fff">New Enquiry Received</h1>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:0.85rem">Trip Planner  -  ${payload.section} category</p>
  </div>
  <div style="border:1px solid #e8e3da;border-top:none;padding:24px 28px;border-radius:0 0 12px 12px;background:#fbf7f0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${payload.name}</td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:8px 0"><a href="mailto:${payload.email}" style="color:#e8742c">${payload.email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em">Phone</td><td style="padding:8px 0"><a href="tel:${payload.phone}" style="color:#e8742c">${payload.phone}</a></td></tr>
      ${payload.groupSize ? `<tr><td style="padding:8px 0;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em">Group Size</td><td style="padding:8px 0">${payload.groupSize} people</td></tr>` : ""}
      ${payload.preferredDates ? `<tr><td style="padding:8px 0;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em">Dates</td><td style="padding:8px 0">${payload.preferredDates}</td></tr>` : ""}
      ${payload.message ? `<tr><td colspan="2" style="padding:16px 0 8px;border-top:1px solid #e8e3da"><p style="margin:0 0 6px;color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em">Message</p><p style="margin:0;line-height:1.6">${payload.message}</p></td></tr>` : ""}
    </table>
    <div style="margin-top:20px">
      <a href="mailto:${payload.email}" style="display:inline-block;background:#e8742c;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;font-size:0.9rem;text-decoration:none">Reply to ${payload.name}</a>
    </div>
  </div>
</div>`,
      });
    } catch {
      // Email failure is non-fatal  -  inquiry already saved to Supabase
    }
  }

  return {
    ok: true,
    message: "Thank you! Our trip curator will send you a proposal within 24 hours.",
  };
}
