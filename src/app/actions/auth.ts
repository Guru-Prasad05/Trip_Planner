"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Sign an admin in via Supabase Auth (email/password).
 * Guest admins can be created once from the Supabase dashboard.
 */
export async function signIn(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
  } catch (err) {
    return { error: (err as Error).message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function signOut() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    const c = await cookies();
    for (const name of c.getAll().map((x) => x.name)) {
      if (name.startsWith("sb-")) c.delete(name);
    }
  } catch {
    /* noop */
  }
  redirect("/admin/login");
}
