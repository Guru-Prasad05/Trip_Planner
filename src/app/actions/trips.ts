"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Return the current authenticated Supabase user, or null.
 * Used to guard admin pages and actions.
 */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** Require an authenticated user; throws if none (use in Server Actions). */
async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const itineraryItemSchema = z.object({
  day: z.string().min(1),
  title: z.string().min(1),
  items: z.array(z.string()).default([]),
});

const tripSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  route: z.string().min(2, "Route is required"),
  duration: z.string().min(2, "Duration is required"),
  pricePerPerson: z.coerce.number().min(0, "Price must be 0 or more"),
  datesLabel: z.string().max(60).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  meetupPoint: z.string().max(200).optional(),
  contactPhone: z.string().max(20).optional(),
  coverUrl: z.string().url("Cover URL must be a valid URL"),
  includes: z.array(z.string()).default([]),
  highlights: z.string().max(1000).optional(),
  itinerary: z.array(itineraryItemSchema).min(1, "Add at least one itinerary day"),
});

export type TripFormState = {
  ok: boolean;
  message: string;
  tripId?: string;
  errors?: Record<string, string>;
};

export async function createTrip(
  _prev: TripFormState,
  formData: FormData,
): Promise<TripFormState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "You must sign in to create a trip." };
  }

  // Parse itinerary sent as JSON string field (one entry per day).
  let itinerary: unknown = [];
  try {
    itinerary = JSON.parse(String(formData.get("itinerary") ?? "[]"));
  } catch {
    return { ok: false, message: "Itinerary data is malformed." };
  }

  // Parse includes sent as comma-separated string.
  const includesRaw = String(formData.get("includes") ?? "");
  const includes = includesRaw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const parsed = tripSchema.safeParse({
    title: formData.get("title"),
    route: formData.get("route"),
    duration: formData.get("duration"),
    pricePerPerson: formData.get("pricePerPerson"),
    datesLabel: formData.get("datesLabel") || undefined,
    startDate: formData.get("startDate") || undefined,
    endDate: formData.get("endDate") || undefined,
    meetupPoint: formData.get("meetupPoint") || undefined,
    contactPhone: formData.get("contactPhone") || undefined,
    coverUrl: formData.get("coverUrl"),
    includes,
    highlights: formData.get("highlights") || undefined,
    itinerary,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0] ?? "_")] = issue.message;
    }
    return {
      ok: false,
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  const d = parsed.data;
  const slug = slugify(d.title);

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("upcoming_trips")
      .insert({
        title: d.title,
        slug,
        route: d.route,
        duration: d.duration,
        price_per_person: d.pricePerPerson,
        dates_label: d.datesLabel ?? null,
        start_date: d.startDate || null,
        end_date: d.endDate || null,
        meetup_point: d.meetupPoint ?? null,
        contact_phone: d.contactPhone ?? null,
        cover_url: d.coverUrl,
        includes: d.includes,
        itinerary: d.itinerary,
        highlights: d.highlights ?? null,
        is_published: true,
      })
      .select("id")
      .single();

    if (error) throw error;

    revalidatePath("/upcoming-trips");
    revalidatePath("/gallery");

    return { ok: true, tripId: data.id, message: "Trip published successfully." };
  } catch (err) {
    return {
      ok: false,
      message: `Could not save trip: ${(err as Error).message}`,
    };
  }
}

export async function deleteTrip(id: string): Promise<{ ok: boolean; message: string }> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "You must sign in." };
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("upcoming_trips").delete().eq("id", id);
    if (error) throw error;
    revalidatePath("/upcoming-trips");
    revalidatePath("/gallery");
    return { ok: true, message: "Trip deleted." };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}
