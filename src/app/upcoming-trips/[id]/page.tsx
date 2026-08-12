import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";
import type { UpcomingTrip, ItineraryDay } from "@/lib/trips/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: trip } = await supabase
    .from("upcoming_trips")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();
  if (!trip) return { title: "Trip Not Found" };
  const t = trip as UpcomingTrip;
  return {
    title: t.title,
    description: t.highlights ?? `${t.duration} ${t.route} from ${formatINR(Number(t.price_per_person))}/person`,
  };
}

export default async function TripDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: trip } = await supabase
    .from("upcoming_trips")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .single();

  if (!trip) notFound();
  const t = trip as UpcomingTrip;

  return (
    <article className="mx-auto max-w-[900px] px-6 py-28">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-[--radius-card] mb-10">
        {t.cover_url && (
          <>
            <div className="relative h-[55vh] w-full">
              <Image
                src={t.cover_url}
                alt={t.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          {t.dates_label && (
            <p className="inline-block rounded-full bg-[--color-saffron] px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {t.dates_label}
            </p>
          )}
          <h1 className="mt-3 font-[family-name:--font-display] text-[clamp(1.75rem,4vw,3rem)] font-bold drop-shadow-lg">
            {t.title}
          </h1>
          <p className="mt-2 text-white/90">📍 {t.route}</p>
          <p className="mt-1 text-white/90">🧳 {t.duration}</p>
        </div>
      </header>

      {/* Quick facts + price */}
      <section className="grid gap-4 rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-6 shadow-[--shadow-warm] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--color-ink]/50">
            Package Cost
          </p>
          <p className="mt-1 text-2xl font-bold text-[--color-saffron]">
            {formatINR(Number(t.price_per_person))}
            <span className="block text-xs font-normal text-[--color-ink]/60">per person</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--color-ink]/50">
            Duration
          </p>
          <p className="mt-1 font-medium">{t.duration}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--color-ink]/50">
            Meetup
          </p>
          <p className="mt-1 text-sm">{t.meetup_point ?? "TBA"}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[--color-ink]/50">
            Contact
          </p>
          <p className="mt-1 text-sm font-medium text-[--color-saffron]">
            📞 {t.contact_phone ?? "7008258411"}
          </p>
        </div>
      </section>

      {/* Includes */}
      {t.includes.length > 0 && (
        <section className="mt-8">
          <h2 className="font-[family-name:--font-display] text-2xl font-semibold">
            ✅ Package Includes
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.includes.map((inc) => (
              <li
                key={inc}
                className="flex items-center gap-2 rounded-[--radius-button] bg-white p-3 text-sm"
              >
                <span aria-hidden className="text-[--color-saffron]">✓</span>
                {inc}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Itinerary */}
      <section className="mt-10">
        <h2 className="font-[family-name:--font-display] text-2xl font-semibold">
          🗓️ Itinerary
        </h2>
        <ol className="mt-6 space-y-6">
          {t.itinerary.map((d: ItineraryDay, i) => (
            <li
              key={i}
              className="relative rounded-[--radius-card] border border-[--color-gold]/30 bg-white p-6 shadow-[--shadow-warm] pl-14"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[--color-saffron] text-xs font-bold text-white">
                {i + 1}
              </div>
              <div className="absolute left-[34px] top-16 bottom-[-32px] w-px bg-[--color-gold]/30 last:hidden" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[--color-saffron]">
                {d.day}
              </p>
              <h3 className="mt-1 font-[family-name:--font-display] text-lg font-semibold">
                {d.title}
              </h3>
              {d.items.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {d.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-[--color-ink]/80">
                      <span aria-hidden className="text-[--color-saffron]">✅</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Highlights */}
      {t.highlights && (
        <section className="mt-10 rounded-[--radius-card] bg-[--color-forest] p-8 text-white">
          <p className="text-sm leading-relaxed text-white/90">{t.highlights}</p>
        </section>
      )}

      {/* CTA */}
      <section className="mt-10 rounded-[--radius-card] border-2 border-[--color-saffron] bg-[--color-saffron]/5 p-8 text-center">
        <h2 className="font-[family-name:--font-display] text-2xl font-semibold">
          📸 Book Your Trip Now!
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[--color-ink]/70">
          Limited slots available — plan early! Call now and lock in your seat.
        </p>
        <a
          href={`tel:${t.contact_phone ?? "7008258411"}`}
          className="mt-6 inline-block rounded-[--radius-button] bg-[--color-saffron] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[--color-saffron]/20 transition-all hover:scale-105 hover:bg-[--color-saffron-deep]"
        >
          📞 Call Now: {t.contact_phone ?? "7008258411"}
        </a>
      </section>

      {/* Back link */}
      <p className="mt-8 text-sm text-[--color-ink]/60">
        ←{" "}
        <Link href="/upcoming-trips" className="text-[--color-saffron] hover:underline">
          View all upcoming trips
        </Link>
        {" · "}
        <Link href="/gallery" className="text-[--color-saffron] hover:underline">
          View trip gallery
        </Link>
      </p>
    </article>
  );
}