/**
 * Shared types for upcoming trips + gallery media (Supabase-backed).
 */

/** A single day inside an itinerary. */
export interface ItineraryDay {
  day: string;        // e.g. "Day 1", "Day 2"
  title: string;      // headline for the day
  items: string[];    // bullet list of the day's stops
}

/** Row in public.upcoming_trips. */
export interface UpcomingTrip {
  id: string;
  title: string;
  slug: string;
  route: string;
  duration: string;
  price_per_person: number;
  currency: string;
  start_date: string | null;
  end_date: string | null;
  dates_label: string | null;
  meetup_point: string | null;
  contact_phone: string | null;
  cover_url: string | null;
  includes: string[];
  itinerary: ItineraryDay[];
  highlights: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/** Row in public.trip_media (powers the animated gallery). */
export interface TripMedia {
  id: string;
  trip_id: string | null;
  type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  alt: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

/** Minimal trip shape for the gallery filter dropdown (id + title). */
export interface TripOption {
  id: string;
  title: string;
}
