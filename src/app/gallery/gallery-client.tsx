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

/**
 * Returns the subset of media to actually mount into the grid.
 *
 * Constraint worth knowing: the lightbox is opened with the grid's own index
 * (`handleOpen(idx)`) but reads from `filteredMedia`. So whatever this returns
 * must line up index-for-index with `filteredMedia` — a leading slice does;
 * a reordered or gap-filled window would open the wrong image.
 *
 * @param all   - full filtered result set
 * @param count - current window size
 */
function sliceVisible(all: TripMedia[], count: number): TripMedia[] {
  return all.slice(0, count);
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
};

export default function GalleryClient({ initialMedia, initialTrips }: GalleryClientProps) {
  const [filterTripId, setFilterTripId] = useState<string | "all">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const itemsRef = useRef<HTMLDivElement>(null);

  const trips = useMemo(
    () => [{ id: "all", title: "All Trips" }, ...initialTrips],
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

  // How many items are currently rendered. Reset whenever the filter/search
  // changes so a new result set always starts from the first page.
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filterTripId, deferredSearch]);

  /**
   * Decides which subset of `filteredMedia` actually gets mounted into the DOM.
   *
   * This is the whole point of the perf fix: rendering all N items is what makes
   * the grid thrash. Everything below `return` in this component animates, so the
   * size of this array directly sets the cost of every filter keystroke.
   *
   * @param all   - the full filtered result set
   * @param count - the current window size (starts at PAGE_SIZE, grows via "Load more")
   * @returns the items to render this pass
   *
   * TODO(you): implement the windowing strategy.
   */
  const visibleMedia = useMemo(
    () => sliceVisible(filteredMedia, visibleCount),
    [filteredMedia, visibleCount],
  );

  const hasMore = visibleCount < filteredMedia.length;

  // Close lightbox on Escape
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

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-28">
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[--color-saffron]">
          Trip Gallery
        </p>
        <h1 className="mt-2 font-[family-name:--font-display] text-[clamp(2rem,5vw,3.5rem)] font-bold">
          Moments from the Road
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[--color-ink]/70">
          Photos and videos from our nature tours, spiritual journeys, celebrations & corporate
          retreats across Odisha and beyond.
        </p>
      </header>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-xs">
          <input
            type="search"
            placeholder="Search captions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-[--radius-button] border border-[--color-gold]/40 bg-white pl-10 pr-4 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[--color-ink]/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          value={filterTripId}
          onChange={(e) => setFilterTripId(e.target.value)}
          className="rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-4 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none"
        >
          {trips.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <p className="mb-6 text-sm text-[--color-ink]/60">
        Showing <strong>{visibleMedia.length}</strong> of <strong>{filteredMedia.length}</strong>
        {filterTripId !== "all" || search ? " results" : " items"}
      </p>

      {/* Masonry grid */}
      <motion.div
        ref={itemsRef}
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="list"
        aria-label="Trip gallery"
      >
        <AnimatePresence>
          {visibleMedia.map((media, idx) => (
            <motion.figure
              key={media.id}
              variants={itemVariants}
              className="relative overflow-hidden group rounded-[--radius-card] border border-[--color-gold]/30 bg-white shadow-[--shadow-warm]"
              role="listitem"
              onClick={() => handleOpen(idx)}
            >
              {media.type === "image" ? (
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={media.url}
                    alt={media.alt ?? media.caption ?? "Trip gallery image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative h-64 w-full">
                  <video
                    src={media.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    loop
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg
                      className="h-12 w-12 text-white drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              <figcaption className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="truncate font-medium">{media.caption ?? media.type}</p>
                {media.trip_id && tripTitleById.has(media.trip_id) && (
                  <p className="truncate text-xs text-white/70">
                    Trip: {tripTitleById.get(media.trip_id)}
                  </p>
                )}
              </figcaption>
              <div className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white">
                {media.type === "image" ? "📷" : "🎥"}
              </div>
            </motion.figure>
          ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-6 py-3 font-medium text-[--color-ink] transition-colors hover:border-[--color-saffron] hover:text-[--color-saffron]"
          >
            Load more ({filteredMedia.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {filteredMedia.length === 0 && (
        <div className="mt-12 text-center text-[--color-ink]/50">
          No media matches your filters. Try a different search or trip.
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence mode="wait">
        {lightboxOpen && filteredMedia[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image full view"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === 0 ? filteredMedia.length - 1 : i - 1));
              }}
              className="absolute left-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hidden sm:block"
              aria-label="Previous"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative max-h-[85vh] max-w-[90vw]"
            >
              {filteredMedia[lightboxIndex].type === "image" ? (
                <div className="relative h-[85vh] w-[90vw]">
                  <Image
                    src={filteredMedia[lightboxIndex].url}
                    alt={filteredMedia[lightboxIndex].alt ?? ""}
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
                />
              )}
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => (i === filteredMedia.length - 1 ? 0 : i + 1));
              }}
              className="absolute right-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 hidden sm:block"
              aria-label="Next"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/80">
              <p className="text-sm">
                {lightboxIndex + 1} / {filteredMedia.length}
              </p>
              {filteredMedia[lightboxIndex].caption && (
                <p className="mt-1 max-w-xl text-sm">{filteredMedia[lightboxIndex].caption}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}