# Supabase Setup

This folder holds the database schema for Odisha Unveiled.

## Apply the schema

**Option A — Supabase Dashboard (quickest)**
1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** → paste the contents of `migrations/0001_init.sql` → **Run**.
3. Copy your Project URL and anon key into `.env.local` (see `.env.example`).

**Option B — Supabase CLI**
```bash
npm i -g supabase
supabase link --project-ref <your-ref>
supabase db push
```

## What the schema provides
- `trip_packages` — public read; powers Product/Offer JSON-LD + sitemap.
- `inquiries` — anon insert only (lead capture via the Server Action). Not publicly readable.
- `leads` — brochure/newsletter email capture.
- `user_profiles` — owner-only (RLS via `auth.uid()`), auto-created on signup.
- `bookings` — owner-only booking lifecycle (pending → confirmed → cancelled).
- `blog_posts` — public read for published posts only.

## Security notes
- Row Level Security is enabled on every table.
- The browser/server clients use the **anon key**, so all access is RLS-enforced.
- Ops/admin reads of `inquiries` and `leads` should use the **service role key**
  (server-only, never exposed to the client).
