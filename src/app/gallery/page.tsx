import { createClient } from "@/lib/supabase/server";
import GalleryClient from "./gallery-client";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Trip Gallery | Trip Planner",
  description:
    "Browse photos and videos from our Odisha nature tours, spiritual journeys, celebrations & corporate retreats. Animated gallery with filter by trip.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const supabase = await createClient();
  const [{ data: media }, { data: trips }] = await Promise.all([
    supabase
      .from("trip_media")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("upcoming_trips")
      .select("id, title")
      .eq("is_published", true)
      .order("start_date", { ascending: false }),
  ]);

  return <GalleryClient initialMedia={media ?? []} initialTrips={trips ?? []} />;
}