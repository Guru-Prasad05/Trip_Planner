-- ============================================================
-- Odisha Unveiled — upcoming trips + animated gallery
-- Adds: upcoming_trips, trip_media (gallery) + storage bucket
-- ============================================================

-- upcoming_trips (public read; admin = authenticated write) -----------------
create table if not exists public.upcoming_trips (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  route text not null,                 -- e.g. "Bhubaneswar to Bhubaneswar"
  duration text not null,              -- e.g. "2 Days / 3 Nights"
  price_per_person numeric(10,2) not null,
  currency text not null default 'INR',
  start_date date,
  end_date date,
  dates_label text,                    -- human label e.g. "July 3 4 5"
  meetup_point text,
  contact_phone text,
  cover_url text,                      -- public URL of cover image in storage
  includes text[] default '{}',       -- amenities / inclusions (food, stay, cab...)
  itinerary jsonb not null default '[]'::jsonb,  -- array of { day, title, items[] }
  highlights text,                    -- short marketing blurb
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.upcoming_trips enable row level security;

drop policy if exists "Upcoming trips are public" on public.upcoming_trips;
create policy "Upcoming trips are public"
  on public.upcoming_trips for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage upcoming trips" on public.upcoming_trips;
create policy "Admins manage upcoming trips"
  on public.upcoming_trips for all
  to authenticated
  using (true) with check (true);

-- trip_media (public read; authenticated write — powers animated gallery) ----
create table if not exists public.trip_media (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.upcoming_trips on delete set null,
  type text not null check (type in ('image', 'video')),
  url text not null,                   -- public URL in storage
  thumbnail_url text,                  -- optional smaller poster for videos
  caption text,
  alt text,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.trip_media enable row level security;

drop policy if exists "Gallery media is public" on public.trip_media;
create policy "Gallery media is public"
  on public.trip_media for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Admins manage gallery media" on public.trip_media;
create policy "Admins manage gallery media"
  on public.trip_media for all
  to authenticated
  using (true) with check (true);

-- Helper: updated_at trigger for upcoming_trips ------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_upcoming_trips_touch on public.upcoming_trips;
create trigger trg_upcoming_trips_touch
  before update on public.upcoming_trips
  for each row execute function public.touch_updated_at();

-- Storage bucket for trip images & videos (public read, auth write) ----------
-- NOTE: run once; safe to re-run (insert...on conflict do nothing).
insert into storage.buckets (id, name, public)
values ('trip-media', 'trip-media', true)
on conflict (id) do nothing;

drop policy if exists "Gallery public read" on storage.objects;
create policy "Gallery public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'trip-media');

drop policy if exists "Admins upload trip media" on storage.objects;
create policy "Admins upload trip media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'trip-media');

drop policy if exists "Admins update trip media" on storage.objects;
create policy "Admins update trip media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'trip-media');

drop policy if exists "Admins delete trip media" on storage.objects;
create policy "Admins delete trip media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'trip-media');

-- Seed: the Koraput July 3-4-5 trip as the first upcoming trip ---------------
insert into public.upcoming_trips (
  title, slug, route, duration, price_per_person, start_date, end_date,
  dates_label, meetup_point, contact_phone, cover_url, includes, itinerary,
  highlights, is_published
)
values (
  'Koraput Highlands & Waterfalls Escape',
  'koraput-highlands-july-2026',
  'Bhubaneswar to Bhubaneswar',
  '2 Days / 3 Nights',
  10000,
  '2026-07-03'::date,
  '2026-07-05'::date,
  'July 3 4 5',
  'Crown Hotel, Bhubaneswar (9 PM departure)',
  '7008258411',
  'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?auto=format&fit=crop&w=1600&q=70',
  ARRAY['Food','Stay','Cab / Transport','All Toll & Parking Charges'],
  jsonb_build_array(
    jsonb_build_object(
      'day', 'Day 1',
      'title', 'Starting from Bhubaneswar by 9 PM',
      'items', jsonb_build_array('Meetup point: Crown Hotel')
    ),
    jsonb_build_object(
      'day', 'Day 2',
      'title', 'Hotel Check-in & Koraput Sightseeing',
      'items', jsonb_build_array(
        'Hotel Check-in & Freshen Up',
        'Gupteswar Temple',
        'Duduma Waterfall',
        'Upper Kolab Dam',
        'Sabar Srikhetra',
        'Overnight Stay at Hotel'
      )
    ),
    jsonb_build_object(
      'day', 'Day 3',
      'title', 'Sunrise & Nature Tour',
      'items', jsonb_build_array(
        'Sunrise at Deomali Hills (Highest peak of Odisha)',
        'Talamali View Point',
        'Kalyamali View Point',
        'Hanuman Vatika (Eco Park)',
        'Kanta Baunsuni Waterfall',
        'After dinner — start return journey for Bhubaneswar'
      )
    )
  ),
  'Experience the unmatched beauty, peaceful temples, waterfalls, and hill views of Koraput with complete comfort and guidance. Limited slots available — plan early!',
  true
)
on conflict (slug) do nothing;
