import { createUploadUrl } from "@/app/actions/media";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // Verify the user is authenticated (same check as the server action)
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json({ ok: false, message: "Supabase config missing" }, { status: 500 });
  }

  // Check for auth cookie
  const hasAuthCookie = cookieStore.getAll().some((c) => c.name.startsWith("sb-"));
  if (!hasAuthCookie) {
    return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  // Reuse the server action directly (it already does getAdminUser)
  const result = await createUploadUrl({ ok: false, message: "" }, formData);
  return Response.json(result);
}