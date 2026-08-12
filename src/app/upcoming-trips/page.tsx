import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import type { UpcomingTrip } from "@/lib/trips/types";

export const metadata = buildMetadata({
  title: "Upcoming Trips",
  description:
    "Join an upcoming curated group trip across Odisha — Koraput highlands, waterfalls, wildlife & coastal escapes. Dates, prices & full itinerary.",
  path: "/upcoming-trips",
});

export default async function UpcomingTripsPage() {
  const supabase = await createClient();
  const { data: trips } = await supabase
    .from("upcoming_trips")
    .select("*")
    .eq("is_published", true)
    .order("start_date", { ascending: true });

  const tripsList = (trips ?? []) as UpcomingTrip[];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-28">
      <header className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[--color-saffron]">
          Upcoming Trips
        </p>
        <h1 className="mt-2 font-[family-name:--font-display] text-[clamp(2rem,5vw,3.5rem)] font-bold">
          Join Our Next Adventure
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[--color-ink]/70">
          Fixed-departure group trips with dates, prices & full itinerary laid out transparently.
          Limited slots — plan early.
        </p>
      </header>

      {tripsList.length === 0 ? (
        <div className="rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-12 text-center text-[--color-ink]/60">
          No upcoming trips scheduled right now. Check back soon or{" "}
          <Link href="/contact" className="text-[--color-saffron] underline">
            request a custom trip
          </Link>
          .
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tripsList.map((trip) => (
            <article
              key={trip.id}
              className="group flex flex-col overflow-hidden rounded-[--radius-card] border border-[--color-gold]/30 bg-white shadow-[--shadow-warm] transition-transform hover:-translate-y-1"
            >
              {trip.cover_url && (
                <Link href={`/upcoming-trips/${trip.id}`} className="block relative h-52 overflow-hidden">
                  <Image
                    src={trip.cover_url}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {trip.dates_label && (
                    <span className="absolute left-3 top-3 rounded-full bg-[--color-saffron] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {trip.dates_label}
                    </span>
                  )}
                </Link>
              )}

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-[family-name:--font-display] text-xl font-semibold">
                  <Link
                    href={`/upcoming-trips/${trip.id}`}
                    className="hover:text-[--color-saffron] transition-colors"
                  >
                    {trip.title}
                  </Link>
                </h2>
                <p className="mt-1 text-sm text-[--color-ink]/60">{trip.route}</p>
                <p className="mt-1 text-sm text-[--color-ink]/60">{trip.duration}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {trip.includes.slice(0, 4).map((inc) => (
                    <span
                      key={inc}
                      className="rounded-full bg-[--color-gold]/15 px-2.5 py-0.5 text-xs font-medium text-[--color-ink]/70"
                    >
                      ✓ {inc}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-[--color-ink]/50">from</span>
                    <p className="font-[family-name:--font-display] text-2xl font-bold text-[--color-ink]">
                      {formatINR(Number(trip.price_per_person))}
                    </p>
                    <span className="text-xs text-[--color-ink]/50">/person</span>
                  </div>
                  <Link
                    href={`/upcoming-trips/${trip.id}`}
                    className="rounded-[--radius-button] bg-[--color-saffron] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[--color-saffron-deep]"
                  >
                    View Itinerary
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}