"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  section: z.enum(["nature", "corporate", "celebration", "spiritual", "general"]),
  groupSize: z.coerce.number().int().min(1).max(1000).optional(),
  preferredDates: z.string().max(120).optional(),
  message: z.string().max(2000).optional(),
  // Honeypot — must stay empty.
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

  // Honeypot tripped — pretend success, drop silently.
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

  return {
    ok: true,
    message: "Thank you! Our trip curator will send you a proposal within 24 hours.",
  };
}
