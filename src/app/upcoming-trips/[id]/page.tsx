import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatINR } from "@/lib/utils";
import { InquiryForm } from "@/components/ui/InquiryForm";
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
    description:
      t.highlights ??
      `${t.duration} · ${t.route} · from ${formatINR(Number(t.price_per_person))}/person`,
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

  const phone = t.contact_phone ?? "7008258411";
  const wa = `https://wa.me/91${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in the trip: ${t.title}`)}`;

  return (
    <div style={{ background: "var(--color-ivory)" }}>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
        {t.cover_url ? (
          <Image src={t.cover_url} alt={t.title} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0" style={{ background: "var(--color-forest)" }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/10 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/50 via-transparent to-transparent" />
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-20 text-gold" viewBox="0 0 200 200" fill="currentColor" aria-hidden>
          <path d="M100 0 Q120 40 100 80 Q80 40 100 0Z" />
          <path d="M100 80 Q140 90 160 120 Q120 110 100 80Z" />
          <path d="M100 80 Q60 90 40 120 Q80 110 100 80Z" />
          <path d="M100 120 Q115 150 100 180 Q85 150 100 120Z" />
        </svg>
        <nav className="absolute top-6 left-0 right-0 px-6 md:px-12 z-10">
          <Link
            href="/upcoming-trips"
            className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors text-sm font-body tracking-wide"
          >
            <span aria-hidden>←</span> All Trips
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12 md:pb-16 z-10">
          {(t.dates_label ?? t.start_date) && (
            <span
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-body tracking-[0.15em] uppercase"
              style={{ background: "var(--color-saffron)", color: "var(--color-ivory)" }}
            >
              {t.dates_label ?? t.start_date}
            </span>
          )}
          <h1
            className="font-display font-black leading-none mb-3"
            style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", color: "var(--color-ivory)" }}
          >
            {t.title}
          </h1>
          <p className="font-body text-ivory/70 text-lg tracking-wide">
            {t.route} · {t.duration}
          </p>
        </div>
        <div className="absolute bottom-6 right-8 flex flex-col items-center gap-1 opacity-50" aria-hidden>
          <div className="w-px h-8 overflow-hidden" style={{ background: "rgba(251,247,240,0.4)" }}>
            <div className="w-full h-full animate-scroll-line" style={{ background: "var(--color-ivory)" }} />
          </div>
        </div>
      </section>
      {/* ORGANIC WAVE DIVIDER */}
      <div style={{ background: "var(--color-ivory)", marginTop: "-2px" }} aria-hidden>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0 60 C360 0 1080 0 1440 60 L1440 60 L0 60Z" fill="var(--color-ivory)" />
        </svg>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

        {/* ── LEFT COLUMN ── */}
        <div>

          {/* QUICK GLANCE STRIP */}
          <div className="flex flex-wrap gap-4 mb-12 -mt-2">
            {[
              { label: "Duration", value: t.duration },
              { label: "Route", value: t.route },
              t.meetup_point ? { label: "Meetup", value: t.meetup_point } : null,
              { label: "Group Size", value: "Small groups" },
            ].filter(Boolean).map((item) => (
              <div
                key={item!.label}
                className="flex flex-col px-5 py-3 rounded-2xl"
                style={{ background: "var(--color-sand)" }}
              >
                <span className="flex items-center gap-1.5 text-xs font-body tracking-[0.12em] uppercase" style={{ color: "var(--color-saffron)" }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-saffron)" }} aria-hidden />
                  {item!.label}
                </span>
                <span className="font-body font-semibold text-sm mt-0.5" style={{ color: "var(--color-ink)" }}>{item!.value}</span>
              </div>
            ))}
          </div>

          {/* WHAT'S INCLUDED */}
          {t.includes?.length > 0 && (
            <section className="mb-16">
              <h2
                className="font-display font-bold mb-6"
                style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--color-forest)" }}
              >
                What&apos;s Included
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t.includes.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "var(--color-sand)" }}
                  >
                    <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="7" stroke="var(--color-saffron)" strokeWidth="1.5" />
                      <path d="M5 8.5L7 10.5L11 6.5" stroke="var(--color-saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-body text-sm" style={{ color: "var(--color-ink)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* ITINERARY TIMELINE */}
          {t.itinerary?.length > 0 && (
            <section className="mb-16">
              <h2
                className="font-display font-bold mb-8"
                style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--color-forest)" }}
              >
                Day by Day
              </h2>
              <div className="relative">
                <div
                  className="absolute left-5 top-0 bottom-0 w-px"
                  style={{ background: "linear-gradient(to bottom, var(--color-saffron), var(--color-forest))" }}
                  aria-hidden
                />
                <div className="space-y-6 pl-14">
                  {t.itinerary.map((day, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className="absolute -left-9 top-1 flex items-center justify-center w-8 h-8 rounded-full font-display font-black text-xs"
                        style={{ background: "var(--color-forest)", color: "var(--color-ivory)", boxShadow: "0 0 0 3px var(--color-ivory), 0 0 0 5px var(--color-forest)" }}
                        aria-hidden
                      >
                        {idx + 1}
                      </div>
                      <div
                        className="rounded-2xl p-5"
                        style={{ background: "var(--color-sand)" }}
                      >
                        <p className="text-xs font-body tracking-[0.12em] uppercase mb-1" style={{ color: "var(--color-saffron)" }}>{day.day}</p>
                        <h3 className="font-display font-bold text-lg mb-3" style={{ color: "var(--color-ink)" }}>{day.title}</h3>
                        <ul className="space-y-1.5">
                          {day.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm font-body" style={{ color: "rgba(26,20,16,0.75)" }}>
                              <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-gold)" }} aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:sticky lg:top-8">
          <div
            className="rounded-3xl overflow-hidden shadow-warm"
            style={{ background: "var(--color-forest)" }}
          >
            {/* Price header */}
            <div className="px-7 pt-10 pb-8" style={{ borderBottom: "1px solid rgba(251,247,240,0.12)" }}>
              <p className="text-xs font-body tracking-[0.15em] uppercase mb-2" style={{ color: "rgba(251,247,240,0.55)" }}>Starting from</p>
              <div className="flex items-baseline gap-1">
                <span
                  className="font-display font-black leading-none"
                  style={{ fontSize: "2.75rem", color: "var(--color-saffron)" }}
                >
                  {formatINR(Number(t.price_per_person))}
                </span>
                <span className="font-body text-sm" style={{ color: "rgba(251,247,240,0.5)" }}>/person</span>
              </div>
            </div>

            {/* Details */}
            <dl className="px-7 py-6 space-y-4" style={{ borderBottom: "1px solid rgba(251,247,240,0.12)" }}>
              {[
                { icon: "M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3zm0 2.5v3l2 1.5", label: "Duration", value: t.duration },
                { icon: "M8 2C5.24 2 3 4.24 3 7c0 4.17 5 9 5 9s5-4.83 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 118 5a1.5 1.5 0 010 3z", label: "Dates", value: t.dates_label ?? (t.start_date ?? "TBD") },
                t.meetup_point ? { icon: "M3 6l5-4 5 4v7a1 1 0 01-1 1H4a1 1 0 01-1-1V6z", label: "Meetup", value: t.meetup_point } : null,
              ].filter(Boolean).map((row) => (
                <div key={row!.label} className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d={row!.icon} stroke="var(--color-saffron)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <dt className="text-xs font-body tracking-wider uppercase" style={{ color: "rgba(251,247,240,0.45)" }}>{row!.label}</dt>
                    <dd className="font-body text-sm font-medium mt-0.5" style={{ color: "var(--color-ivory)" }}>{row!.value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* CTAs */}
            <div className="px-7 py-6 space-y-3">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ background: "var(--color-saffron)", color: "var(--color-ivory)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.846L0 24l6.335-1.502A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 01-5.003-1.374l-.36-.213-3.76.89.952-3.658-.234-.374A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
                Book on WhatsApp
              </a>
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-body font-medium text-sm transition-opacity hover:opacity-80"
                style={{ background: "rgba(251,247,240,0.08)", color: "var(--color-ivory)", border: "1px solid rgba(251,247,240,0.15)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Call Us
              </a>
            </div>

            {/* Trust badges */}
            <div
              className="px-7 py-4 flex items-center gap-3"
              style={{ background: "rgba(0,0,0,0.15)", borderTop: "1px solid rgba(251,247,240,0.08)" }}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.4l-3.7 2.2.7-4.1L2 5.6l4.2-.8L8 1z" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-xs" style={{ color: "rgba(251,247,240,0.5)" }}>
                Small-batch trips · Curated by local experts
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* HIGHLIGHTS  -  forest full-bleed */}
      {t.highlights && (
        <section className="relative overflow-hidden py-20 px-6 md:px-12" style={{ background: "var(--color-forest)" }}>
          <svg className="absolute -top-8 left-0 w-full opacity-10" viewBox="0 0 1440 80" fill="none" aria-hidden>
            <path d="M0 80 C480 0 960 0 1440 80Z" fill="var(--color-ivory)" />
          </svg>
          <svg className="absolute top-4 right-8 w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="var(--color-gold)" aria-hidden>
            <path d="M50 5 Q65 30 50 55 Q35 30 50 5Z" />
            <path d="M50 55 Q75 60 85 80 Q60 70 50 55Z" />
            <path d="M50 55 Q25 60 15 80 Q40 70 50 55Z" />
          </svg>
          <div className="max-w-3xl mx-auto relative z-10">
            <p className="font-display text-6xl leading-none mb-6 opacity-20 select-none" style={{ color: "var(--color-gold)" }} aria-hidden>&ldquo;</p>
            <p
              className="font-display font-medium leading-relaxed -mt-10"
              style={{ fontSize: "clamp(1.2rem,2.5vw,1.75rem)", color: "var(--color-ivory)" }}
            >
              {t.highlights}
            </p>
            <div className="mt-8 w-16 h-0.5" style={{ background: "var(--color-saffron)" }} aria-hidden />
          </div>
          <svg className="absolute -bottom-8 left-0 w-full opacity-10" viewBox="0 0 1440 80" fill="none" aria-hidden>
            <path d="M0 0 C480 80 960 80 1440 0Z" fill="var(--color-ivory)" />
          </svg>
        </section>
      )}

      {/* INQUIRY FORM SECTION */}
      <section
        className="py-20 px-4 md:px-8"
        style={{ background: "linear-gradient(180deg, var(--color-ivory) 0%, var(--color-sand) 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span
              className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-body tracking-[0.12em] uppercase"
              style={{ background: "rgba(47,74,60,0.08)", color: "var(--color-forest)" }}
            >
              Ready to go?
            </span>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "var(--color-ink)" }}
            >
              Plan Your Journey
            </h2>
            <p className="font-body mt-3 text-base" style={{ color: "rgba(26,20,16,0.6)" }}>
              Tell us about your group and we&apos;ll craft a personalised proposal within 24 hours.
            </p>
          </div>
          <div
            className="rounded-3xl p-8 shadow-warm"
            style={{ background: "var(--color-ivory)" }}
          >
            <InquiryForm section="nature" />
          </div>
        </div>
      </section>
    </div>
  );
}

