"use client";

import { useState, useMemo, useEffect, useRef, useDeferredValue } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { TripMedia, TripOption } from "@/lib/trips/types";

interface GalleryClientProps {
  initialMedia: TripMedia[];
  initialTrips: TripOption[];
}

const PAGE_SIZE = 24;

function sliceVisible(all: TripMedia[], count: number): TripMedia[] {
  return all.slice(0, count);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
  exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
};

export default function GalleryClient({ initialMedia, initialTrips }: GalleryClientProps) {
  const [filterTripId, setFilterTripId] = useState<string | "all">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const itemsRef = useRef<HTMLDivElement>(null);

  const trips = useMemo(
    () => [{ id: "all", title: "All Journeys" }, ...initialTrips],
    [initialTrips],
  );

  const tripTitleById = useMemo(
    () => new Map(initialTrips.map((t) => [t.id, t.title])),
    [initialTrips],
  );

  const filteredMedia = useMemo(() => {
    let arr = initialMedia;
    if (filterTripId !== "all") arr = arr.filter((m) => m.trip_id === filterTripId);
    if (deferredSearch.trim()) {
      const q = deferredSearch.toLowerCase();
      arr = arr.filter(
        (m) =>
          (m.caption?.toLowerCase().includes(q) ?? false) ||
          (m.alt?.toLowerCase().includes(q) ?? false) ||
          (m.type === "video" && "video".includes(q)),
      );
    }
    return arr;
  }, [initialMedia, filterTripId, deferredSearch]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterTripId, deferredSearch]);

  const visibleMedia = useMemo(
    () => sliceVisible(filteredMedia, visibleCount),
    [filteredMedia, visibleCount],
  );

  const hasMore = visibleCount < filteredMedia.length;

  // Lightbox keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) => (i === 0 ? filteredMedia.length - 1 : i - 1));
      if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i === filteredMedia.length - 1 ? 0 : i + 1));
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, filteredMedia.length]);

  const handleOpen = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  // Sacred geometry patterns for different card sizes
  const cardPattern = (idx: number) => {
    const patterns = [
      "col-span-1 row-span-1", // Standard
      "col-span-2 row-span-1", // Wide
      "col-span-1 row-span-2", // Tall
      "col-span-2 row-span-2", // Large square
    ];
    // Use Fibonacci-inspired distribution
    const weights = [50, 25, 15, 10]; // Percentage distribution
    const roll = (idx * 13 + 7) % 100; // Pseudo-random but consistent
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (roll < cumulative) return patterns[i];
    }
    return patterns[0];
  };

  return (
    <div className="relative min-h-screen">
      {/* Organic background texture layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Paper texture base */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Topographic contour lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M20,50 Q60,30 100,50 T180,50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M10,90 Q50,70 90,90 T170,90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M30,130 Q70,110 110,130 T190,130" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <path d="M15,170 Q55,150 95,170 T175,170" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo)" className="text-forest"/>
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Organic header with flowing typography */}
        <header className="mb-16 lg:mb-24 relative">
          {/* Decorative botanical element */}
          <div className="absolute -left-8 top-0 w-32 h-32 opacity-[0.07]" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="text-forest">
              <path d="M50,10 Q30,30 50,50 Q70,30 50,10" fill="currentColor"/>
              <path d="M50,50 Q60,70 50,90" stroke="currentColor" fill="none" strokeWidth="2"/>
              <path d="M50,50 Q40,70 50,90" stroke="currentColor" fill="none" strokeWidth="2"/>
            </svg>
          </div>

          <div className="relative">
            <p className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-forest/60 mb-3
                         relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-12 after:h-[2px]
                         after:bg-gradient-to-r after:from-gold after:to-transparent">
              Visual Memories
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
              <span className="block text-ink">Gallery of</span>
              <span className="block text-forest italic font-light">Sacred Journeys</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-ink/70 font-light">
              Captured moments from nature's embrace—each image a testament to the beauty
              of slow travel and mindful exploration across Odisha's sacred landscapes.
            </p>
          </div>
        </header>

        {/* Organic filter controls with flowing shapes */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:items-end">
            {/* Search with organic border */}
            <div className="flex-1 max-w-md relative group">
              <label htmlFor="gallery-search" className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                Search Moments
              </label>
              <div className="relative">
                <input
                  id="gallery-search"
                  type="search"
                  placeholder="Find a memory..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 text-ink bg-white/80 backdrop-blur-sm
                           border-2 border-sand rounded-none
                           focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20
                           transition-all duration-300
                           shadow-[4px_4px_0px_0px_rgba(47,74,60,0.1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(47,74,60,0.15)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40 group-focus-within:text-forest transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            {/* Filter dropdown with organic style */}
            <div className="relative">
              <label htmlFor="trip-filter" className="block text-xs font-semibold uppercase tracking-wider text-ink/60 mb-2">
                Filter by Journey
              </label>
              <div className="relative">
                <select
                  id="trip-filter"
                  value={filterTripId}
                  onChange={(e) => setFilterTripId(e.target.value)}
                  className="w-full lg:w-64 pl-4 pr-10 py-3.5 text-ink bg-white/80 backdrop-blur-sm
                           border-2 border-sand rounded-none appearance-none cursor-pointer
                           focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20
                           transition-all duration-300
                           shadow-[4px_4px_0px_0px_rgba(47,74,60,0.1)]
                           hover:shadow-[6px_6px_0px_0px_rgba(47,74,60,0.15)]"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}
                >
                  {trips.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Results count with organic separator */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />
            <p className="text-sm font-medium text-ink/60">
              <span className="text-forest font-bold">{visibleMedia.length}</span> of{" "}
              <span className="text-forest font-bold">{filteredMedia.length}</span> moments
              {(filterTripId !== "all" || search) && " shown"}
            </p>
            <div className="h-[2px] flex-1 bg-gradient-to-l from-gold/40 via-gold/20 to-transparent" />
          </div>
        </div>

        {/* Masonry gallery with organic, flowing layout */}
        <motion.div
          ref={itemsRef}
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-3 sm:gap-4 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Trip gallery"
        >
          <AnimatePresence mode="popLayout">
            {visibleMedia.map((media, idx) => {
              const isWide = idx % 7 === 0;
              const isTall = idx % 11 === 3;
              const isLarge = idx % 17 === 5;

              const spanClass = isLarge
                ? "col-span-2 row-span-2"
                : isWide
                ? "col-span-2 row-span-1"
                : isTall
                ? "col-span-1 row-span-2"
                : "col-span-1 row-span-1";

              return (
                <motion.figure
                  key={media.id}
                  variants={itemVariants}
                  layout
                  className={`relative group cursor-pointer overflow-hidden bg-white
                            ${spanClass}
                            shadow-[6px_6px_0px_0px_rgba(47,74,60,0.08)]
                            hover:shadow-[10px_10px_0px_0px_rgba(47,74,60,0.15)]
                            transition-all duration-500 ease-out
                            border-2 border-sand hover:border-forest/30`}
                  style={{
                    clipPath: idx % 3 === 0
                      ? 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
                      : idx % 3 === 1
                      ? 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'
                      : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                  role="listitem"
                  onClick={() => handleOpen(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpen(idx);
                    }
                  }}
                  tabIndex={0}
                  aria-label={`View ${media.caption || media.type} in lightbox`}
                >
                  {media.type === "image" ? (
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={media.url}
                        alt={media.alt ?? media.caption ?? "Trip gallery image"}
                        fill
                        sizes={isLarge ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                      />
                      {/* Organic overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    </div>
                  ) : (
                    <div className="relative h-full w-full">
                      <video
                        src={media.url}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        loop
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-ink/40 group-hover:bg-ink/30 transition-colors duration-500">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                          <svg
                            className="h-7 w-7 text-forest ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Caption overlay with organic design */}
                  <figcaption className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 bg-gradient-to-t from-ink/95 via-ink/85 to-transparent
                                       transform translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500">
                    {media.caption && (
                      <p className="text-white font-medium text-sm lg:text-base line-clamp-2 mb-1">
                        {media.caption}
                      </p>
                    )}
                    {media.trip_id && tripTitleById.has(media.trip_id) && (
                      <p className="text-white/70 text-xs lg:text-sm flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {tripTitleById.get(media.trip_id)}
                      </p>
                    )}
                  </figcaption>

                  {/* Media type badge with organic shape */}
                  <div className="absolute right-3 top-3 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5
                                text-xs font-bold text-forest shadow-lg
                                transform group-hover:-translate-y-1 transition-transform duration-300"
                       style={{
                         clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
                       }}>
                    {media.type === "image" ? "📷" : "🎥"}
                  </div>
                </motion.figure>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Load more with organic button design */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="group relative px-10 py-4 text-base font-bold uppercase tracking-wider text-white bg-forest
                       overflow-hidden
                       shadow-[6px_6px_0px_0px_rgba(47,74,60,0.3)]
                       hover:shadow-[10px_10px_0px_0px_rgba(47,74,60,0.4)]
                       hover:-translate-x-1 hover:-translate-y-1
                       active:shadow-[4px_4px_0px_0px_rgba(47,74,60,0.3)]
                       active:translate-x-1 active:translate-y-1
                       transition-all duration-300"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {/* Animated background layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-forest via-forest to-gold/20
                             transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              <span className="relative flex items-center gap-3">
                Continue Exploring
                <span className="text-sm font-normal text-white/80">
                  ({filteredMedia.length - visibleCount} more)
                </span>
              </span>
            </button>
          </div>
        )}

        {/* Empty state with organic design */}
        {filteredMedia.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-block p-12 bg-white/60 backdrop-blur-sm border-2 border-sand
                          shadow-[8px_8px_0px_0px_rgba(47,74,60,0.08)]"
                 style={{
                   clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                 }}>
              <svg className="w-20 h-20 mx-auto text-ink/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium text-ink/60 mb-2">No moments found</p>
              <p className="text-sm text-ink/40">Try adjusting your search or filter</p>
            </div>
          </div>
        )}

        {/* Lightbox with enhanced design */}
        <AnimatePresence mode="wait">
          {lightboxOpen && filteredMedia[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-ink/97 backdrop-blur-md"
              onClick={() => setLightboxOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Image full view"
            >
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="absolute right-6 top-6 z-10 p-4 bg-white/10 backdrop-blur-sm
                         text-white hover:bg-white/20 hover:scale-110
                         transition-all duration-300 group"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                aria-label="Close lightbox"
              >
                <svg className="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === 0 ? filteredMedia.length - 1 : i - 1));
                }}
                className="absolute left-6 z-10 p-4 bg-white/10 backdrop-blur-sm
                         text-white hover:bg-white/20 hover:-translate-x-1
                         transition-all duration-300 hidden sm:block"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                aria-label="Previous image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === filteredMedia.length - 1 ? 0 : i + 1));
                }}
                className="absolute right-6 z-10 p-4 bg-white/10 backdrop-blur-sm
                         text-white hover:bg-white/20 hover:translate-x-1
                         transition-all duration-300 hidden sm:block"
                style={{
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                }}
                aria-label="Next image"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image container */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative max-h-[85vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredMedia[lightboxIndex].type === "image" ? (
                  <div className="relative h-[85vh] w-[90vw]">
                    <Image
                      src={filteredMedia[lightboxIndex].url}
                      alt={filteredMedia[lightboxIndex].alt ?? filteredMedia[lightboxIndex].caption ?? "Gallery image"}
                      fill
                      sizes="90vw"
                      priority
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <video
                    src={filteredMedia[lightboxIndex].url}
                    className="max-h-[85vh] max-w-[90vw]"
                    controls
                    autoPlay
                    muted
                    playsInline
                  />
                )}
              </motion.div>

              {/* Info bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl px-6 py-4
                            bg-white/10 backdrop-blur-md text-white text-center
                            shadow-2xl"
                   style={{
                     clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                   }}>
                <p className="text-sm font-medium mb-1">
                  {lightboxIndex + 1} of {filteredMedia.length}
                </p>
                {filteredMedia[lightboxIndex].caption && (
                  <p className="text-sm text-white/80">{filteredMedia[lightboxIndex].caption}</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
