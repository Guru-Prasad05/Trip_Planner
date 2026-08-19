import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";
import type { UpcomingTrip } from "@/lib/trips/types";

export const metadata = buildMetadata({
  title: "Upcoming Trips",
  description:
    "Join an upcoming curated group trip across Odisha  -  Koraput highlands, waterfalls, wildlife & coastal escapes. Dates, prices & full itinerary.",
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
    <div className="relative min-h-screen">
      {/* Layered organic background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base paper texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Flowing water-inspired curves */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="400" height="300" patternUnits="userSpaceOnUse">
              <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M0,180 Q100,130 200,180 T400,180" fill="none" stroke="currentColor" strokeWidth="1"/>
              <path d="M0,210 Q100,160 200,210 T400,210" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" className="text-river"/>
        </svg>

        {/* Organic gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-forest/5 rounded-[60%_40%_30%_70%/40%_60%_70%_30%] blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Flowing header with botanical elements */}
        <header className="mb-16 lg:mb-24 relative">
          {/* Decorative leaf pattern */}
          <div className="absolute -right-8 top-0 w-40 h-40 opacity-[0.06]" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="text-forest">
              <ellipse cx="50" cy="50" rx="20" ry="35" fill="currentColor" opacity="0.3"/>
              <path d="M50,15 Q35,35 50,50 Q65,35 50,15" fill="currentColor" opacity="0.5"/>
              <path d="M50,50 Q65,65 50,85 Q35,65 50,50" fill="currentColor" opacity="0.5"/>
              <path d="M50,15 L50,85 M35,30 Q50,35 65,30 M35,50 Q50,55 65,50 M35,70 Q50,75 65,70"
                    stroke="currentColor" fill="none" strokeWidth="1" opacity="0.4"/>
            </svg>
          </div>

          <div className="relative max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-saffron"/>
              <p className="text-[11px] font-bold uppercase tracking-trust text-saffron">
                Expert-Led Adventures
              </p>
            </div>
            <h1 className="font-display text-section-title font-extrabold leading-[0.92] tracking-tight mb-5">
              <span className="block text-ink uppercase">Fixed Departures</span>
              <span className="block text-forest italic font-light tracking-nature">Ready to Explore</span>
            </h1>
            <p className="text-[15px] sm:text-[17px] leading-[1.65] text-ink/65 font-light max-w-2xl">
              Small-group trekking journeys led by certified guides. Vetted eco-stays,
              transparent pricing, comprehensive safety protocols  -  all departures confirmed with minimum 8 travelers.
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-ink/60">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-forest/8 border border-forest/20">
                <svg className="w-3.5 h-3.5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">Certified Guides</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-forest/8 border border-forest/20">
                <svg className="w-3.5 h-3.5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                <span className="font-semibold">8-12 Travelers Max</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-forest/8 border border-forest/20">
                <svg className="w-3.5 h-3.5 text-forest" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                <span className="font-semibold">Eco-Verified Stays</span>
              </div>
            </div>

            {/* Organic separator */}
            <div className="mt-8 flex items-center gap-4">
              <div className="h-[2px] w-20 bg-gradient-to-r from-gold to-transparent" />
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"/>
              </svg>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            </div>
          </div>
        </header>

        {tripsList.length === 0 ? (
          <div className="mt-20">
            <div className="relative mx-auto max-w-2xl p-12 bg-white/60 backdrop-blur-sm border-2 border-sand
                          shadow-[12px_12px_0px_0px_rgba(47,74,60,0.08)]"
                 style={{
                   clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                 }}>
              {/* Decorative corner flourish */}
              <div className="absolute top-6 right-6 w-16 h-16 opacity-10" aria-hidden="true">
                <svg viewBox="0 0 64 64" className="text-forest">
                  <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
                  <path d="M32,8 L32,56 M8,32 L56,32" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="text-center relative z-10">
                <svg className="w-24 h-24 mx-auto text-ink/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xl font-display font-semibold text-ink/70 mb-3">
                  New Journeys Being Crafted
                </p>
                <p className="text-ink/50 mb-8 max-w-md mx-auto leading-relaxed">
                  Our next departures are in planning. Check back soon or request a custom journey tailored to your vision.
                </p>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-forest text-white font-bold uppercase tracking-wider
                           shadow-[6px_6px_0px_0px_rgba(47,74,60,0.3)]
                           hover:shadow-[10px_10px_0px_0px_rgba(47,74,60,0.4)]
                           hover:-translate-x-1 hover:-translate-y-1
                           transition-all duration-300"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}
                >
                  Request Custom Trip
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tripsList.map((trip, idx) => {
              // Organic card variations following sacred geometry
              const isWide = idx % 5 === 0;
              const isFeatured = idx === 0;

              return (
                <article
                  key={trip.id}
                  className={`group relative flex flex-col overflow-hidden bg-white
                            border-2 border-sand hover:border-forest/30
                            shadow-[8px_8px_0px_0px_rgba(47,74,60,0.08)]
                            hover:shadow-[14px_14px_0px_0px_rgba(47,74,60,0.15)]
                            hover:-translate-x-1 hover:-translate-y-1
                            transition-all duration-500 ease-out
                            ${isWide ? 'md:col-span-2' : ''}
                            ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                  style={{
                    clipPath: idx % 3 === 0
                      ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                      : idx % 3 === 1
                      ? 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                      : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                >
                  {/* Image container with organic overlay */}
                  {trip.cover_url && (
                    <Link
                      href={`/upcoming-trips/${trip.id}`}
                      className={`block relative overflow-hidden ${isFeatured ? 'h-80' : 'h-64'}`}
                    >
                      <Image
                        src={trip.cover_url}
                        alt={trip.title}
                        fill
                        sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                        className="object-cover transition-all duration-700 ease-out
                                 group-hover:scale-105 group-hover:brightness-105"
                      />

                      {/* Organic gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-70" />

                      {/* Flowing decorative element */}
                      <svg className="absolute bottom-0 left-0 w-full h-24 text-white opacity-10"
                           viewBox="0 0 400 100" preserveAspectRatio="none">
                        <path d="M0,50 Q100,20 200,50 T400,50 L400,100 L0,100 Z" fill="currentColor"/>
                      </svg>

                      {/* Date badge with organic shape */}
                      {trip.dates_label && (
                        <div className="absolute left-4 top-4 px-4 py-2 bg-saffron text-white
                                      text-xs font-bold uppercase tracking-wider
                                      shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                             style={{
                               clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                             }}>
                          {trip.dates_label}
                        </div>
                      )}

                      {/* Featured badge */}
                      {isFeatured && (
                        <div className="absolute right-4 top-4 px-3 py-1.5 bg-gold text-white
                                      text-xs font-bold uppercase tracking-wider flex items-center gap-1.5
                                      shadow-lg">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                          Featured
                        </div>
                      )}
                    </Link>
                  )}

                  {/* Content area with organic flow */}
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    {/* Title */}
                    <h2 className="font-display text-card-title font-extrabold leading-[1.15] mb-2 tracking-tight">
                      <Link
                        href={`/upcoming-trips/${trip.id}`}
                        className="hover:text-forest transition-colors duration-300"
                      >
                        {trip.title}
                      </Link>
                    </h2>

                    {/* Route & Duration with icons */}
                    <div className="space-y-1.5 mb-4 text-sm text-ink/70">
                      {trip.route && (
                        <p className="flex items-start gap-2">
                          <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{trip.route}</span>
                        </p>
                      )}
                      {trip.duration && (
                        <p className="flex items-center gap-2">
                          <svg className="w-4 h-4 flex-shrink-0 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{trip.duration}</span>
                        </p>
                      )}
                    </div>

                    {/* Includes tags with organic design */}
                    {trip.includes && trip.includes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {trip.includes.slice(0, 4).map((inc) => (
                          <span
                            key={inc}
                            className="px-3 py-1 text-xs font-medium text-forest bg-forest/10
                                     border border-forest/20
                                     transition-colors duration-300 hover:bg-forest/20"
                            style={{
                              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                            }}
                          >
                            ✓ {inc}
                          </span>
                        ))}
                        {trip.includes.length > 4 && (
                          <span className="px-3 py-1 text-xs font-medium text-ink/50 italic">
                            +{trip.includes.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price and CTA section with organic separator */}
                    <div className="mt-auto pt-5 border-t-2 border-sand">
                      <div className="flex items-end justify-between gap-4">
                        {/* Price display */}
                        <div>
                          <p className="text-xs uppercase tracking-wider text-ink/50 mb-1">Starting from</p>
                          <p className="font-display text-3xl font-bold text-forest">
                            {formatINR(Number(trip.price_per_person))}
                          </p>
                          <p className="text-xs text-ink/50">per person</p>
                        </div>

                        {/* CTA button with organic design */}
                        <Link
                          href={`/upcoming-trips/${trip.id}`}
                          className="group/btn relative px-6 py-3 bg-saffron text-white font-bold text-sm uppercase tracking-wider
                                   overflow-hidden
                                   shadow-[4px_4px_0px_0px_rgba(232,116,44,0.3)]
                                   hover:shadow-[6px_6px_0px_0px_rgba(232,116,44,0.4)]
                                   hover:-translate-x-0.5 hover:-translate-y-0.5
                                   active:shadow-[2px_2px_0px_0px_rgba(232,116,44,0.3)]
                                   active:translate-x-0.5 active:translate-y-0.5
                                   transition-all duration-300"
                          style={{
                            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                          }}
                        >
                          <span className="relative z-10">View Trip</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-saffron to-saffron-deep
                                        transform translate-x-[-100%] group-hover/btn:translate-x-0
                                        transition-transform duration-500 ease-out" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 opacity-5 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 32 32" className="text-forest">
                      <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16,4 L16,28 M4,16 L28,16" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom decorative element */}
        {tripsList.length > 0 && (
          <div className="mt-20 flex items-center justify-center gap-4" aria-hidden="true">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-gold/40" />
            <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        )}
      </div>
    </div>
  );
}
