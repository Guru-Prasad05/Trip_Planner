import { createClient } from "@/lib/supabase/server";
import GalleryForm from "./gallery-form";

export default async function NewGalleryPage() {
  const supabase = await createClient();
  const { data: trips } = await supabase
    .from("upcoming_trips")
    .select("id, title")
    .eq("is_published", true)
    .order("start_date", { ascending: false });

  return <GalleryForm trips={trips ?? []} />;
}
