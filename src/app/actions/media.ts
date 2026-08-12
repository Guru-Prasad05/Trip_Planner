"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getAdminUser } from "./trips";

/**
 * Build a signed upload URL for a trip-media object so the browser can
 * PUT bytes directly to Supabase Storage (avoids streaming big files
 * through the server). Returns the signed URL + the eventual public URL.
 */
export type UploadUrlState = {
  ok: boolean;
  message: string;
  signedUrl?: string;
  publicUrl?: string;
  path?: string;
};

export async function createUploadUrl(
  _prev: UploadUrlState,
  formData: FormData,
): Promise<UploadUrlState> {
  try {
    const user = await getAdminUser();
    if (!user) return { ok: false, message: "Unauthorized" };
  } catch {
    return { ok: false, message: "Unauthorized" };
  }

  const path = String(formData.get("path") ?? "");
  const contentType = String(formData.get("contentType") ?? "");
  if (!path || !contentType) {
    return { ok: false, message: "path and contentType are required" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("trip-media")
      .createSignedUploadUrl(path, { upsert: true });

    if (error || !data) throw error ?? new Error("No signed URL returned");

    const { data: pub } = supabase.storage.from("trip-media").getPublicUrl(path);

    return {
      ok: true,
      message: "Upload URL ready",
      signedUrl: data.signedUrl,
      publicUrl: pub.publicUrl,
      path,
    };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}

const mediaRowSchema = z.object({
  tripId: z.string().uuid().optional(),
  type: z.enum(["image", "video"]),
  url: z.string().url(),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  caption: z.string().max(200).optional().or(z.literal("")),
  alt: z.string().max(200).optional().or(z.literal("")),
});

export async function createMediaRow(
  _prev: UploadUrlState,
  formData: FormData,
): Promise<UploadUrlState> {
  try {
    const user = await getAdminUser();
    if (!user) return { ok: false, message: "Unauthorized" };
  } catch {
    return { ok: false, message: "Unauthorized" };
  }

  const parsed = mediaRowSchema.safeParse({
    tripId: formData.get("tripId") || undefined,
    type: formData.get("type"),
    url: formData.get("url"),
    thumbnailUrl: formData.get("thumbnailUrl") || "",
    caption: formData.get("caption") || "",
    alt: formData.get("alt") || "",
  });
  if (!parsed.success) {
    return { ok: false, message: "Invalid media data." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("trip_media").insert({
      trip_id: parsed.data.tripId ?? null,
      type: parsed.data.type,
      url: parsed.data.url,
      thumbnail_url: parsed.data.thumbnailUrl || null,
      caption: parsed.data.caption || null,
      alt: parsed.data.alt || null,
      is_published: true,
    });
    if (error) throw error;
    revalidatePath("/gallery");
    return { ok: true, message: "Media added to gallery." };
  } catch (err) {
    return { ok: false, message: (err as Error).message };
  }
}

export async function deleteMedia(id: string): Promise<{ ok: boolean; message: string }> {
  try {
    const user = await getAdminUser();
    if (!user) return { ok: false, message: "Unauthorized" };
  } catch {
    return { ok: false, message: "Unauthorized" };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("trip_media").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/gallery");
  return { ok: true, message: "Deleted." };
}
