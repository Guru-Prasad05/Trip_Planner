-- ============================================================
-- Odisha Unveiled — initial schema + Row Level Security
-- See docs/design/07-shared-components-and-booking.md §5
-- ============================================================

-- Helpful enums --------------------------------------------------------------
do $$ begin
  create type section_type as enum ('nature', 'corporate', 'celebration', 'spiritual', 'general');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'cancelled');
exception when duplicate_object then null; end $$;

-- trip_packages (public read) ------------------------------------------------
create table if not exists public.trip_packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  section section_type not null,
  title text not null,
  description text,
  duration text,
  price_per_person numeric(10,2),
  currency text not null default 'INR',
  min_group_size int,
  max_group_size int,
  destination text,
  image_url text,
  amenities jsonb default '[]'::jsonb,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now()
);

alter table public.trip_packages enable row level security;

drop policy if exists "Packages are public" on public.trip_packages;
create policy "Packages are public"
  on public.trip_packages for select
  to anon, authenticated
  using (true);

-- inquiries (anon insert only; no public read) -------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  section section_type not null default 'general',
  group_size int,
  preferred_dates text,
  payload jsonb default '{}'::jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);
-- No select policy: inquiries are not publicly readable (ops reads via service role).

-- leads (brochure / newsletter capture) --------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

drop policy if exists "Anyone can join the list" on public.leads;
create policy "Anyone can join the list"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- user_profiles (owner-only) -------------------------------------------------
create table if not exists public.user_profiles (
  id uuid primary key references auth.users on delete cascade,
  username text,
  phone text,
  address text,
  preferences jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

drop policy if exists "Users read own profile" on public.user_profiles;
create policy "Users read own profile"
  on public.user_profiles for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users insert own profile" on public.user_profiles;
create policy "Users insert own profile"
  on public.user_profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "Users update own profile" on public.user_profiles;
create policy "Users update own profile"
  on public.user_profiles for update
  to authenticated
  using ((select auth.uid()) = id);

-- bookings (owner-only) ------------------------------------------------------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  package_type section_type not null,
  package_id uuid references public.trip_packages on delete set null,
  group_size int,
  travel_dates daterange,
  special_requests text,
  status booking_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

drop policy if exists "Users read own bookings" on public.bookings;
create policy "Users read own bookings"
  on public.bookings for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users create own bookings" on public.bookings;
create policy "Users create own bookings"
  on public.bookings for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own bookings" on public.bookings;
create policy "Users update own bookings"
  on public.bookings for update
  to authenticated
  using ((select auth.uid()) = user_id);

-- blog_posts (public read) ---------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  cover_url text,
  author text,
  tags text[] default '{}',
  seo_title text,
  seo_description text,
  published_at timestamptz
);

alter table public.blog_posts enable row level security;

drop policy if exists "Published posts are public" on public.blog_posts;
create policy "Published posts are public"
  on public.blog_posts for select
  to anon, authenticated
  using (published_at is not null and published_at <= now());

-- Auto-create profile on signup ----------------------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
