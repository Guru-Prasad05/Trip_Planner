import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAdminUser, deleteTrip } from "@/app/actions/trips";
import { deleteMedia } from "@/app/actions/media";
import { signOut } from "@/app/actions/auth";
import { formatINR } from "@/lib/utils";
import type { UpcomingTrip, TripMedia } from "@/lib/trips/types";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const supabase = await createClient();
  const [{ data: trips }, { data: media }] = await Promise.all([
    supabase
      .from("upcoming_trips")
      .select("*")
      .order("start_date", { ascending: false }),
    supabase
      .from("trip_media")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  const tripsList = (trips ?? []) as UpcomingTrip[];
  const mediaList = (media ?? []) as TripMedia[];

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-28">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:--font-display] text-3xl font-semibold">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-[--color-ink]/60">
            Signed in as {user.email}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-[--radius-button] border border-[--color-gold]/40 px-5 py-2.5 text-sm font-medium text-[--color-ink] hover:bg-[--color-saffron]/10"
          >
            Sign out
          </button>
        </form>
      </header>

      {/* Quick links */}
      <nav className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/upcoming-trips/new"
          className="rounded-[--radius-button] bg-[--color-saffron] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[--color-saffron-deep]"
        >
          + New Upcoming Trip
        </Link>
        <Link
          href="/admin/gallery/new"
          className="rounded-[--radius-button] border border-[--color-gold]/40 px-5 py-2.5 text-sm font-semibold text-[--color-ink] hover:bg-[--color-gold]/10"
        >
          + Add Gallery Media
        </Link>
        <Link
          href="/gallery"
          className="rounded-[--radius-button] border border-[--color-gold]/40 px-5 py-2.5 text-sm font-semibold text-[--color-ink] hover:bg-[--color-gold]/10"
        >
          View Gallery
        </Link>
        <Link
          href="/upcoming-trips"
          className="rounded-[--radius-button] border border-[--color-gold]/40 px-5 py-2.5 text-sm font-semibold text-[--color-ink] hover:bg-[--color-gold]/10"
        >
          View Upcoming Trips
        </Link>
      </nav>

      {/* Upcoming trips table */}
      <section className="mt-12">
        <h2 className="font-[family-name:--font-display] text-xl font-semibold">
          Upcoming Trips ({tripsList.length})
        </h2>
        <div className="mt-4 overflow-x-auto rounded-[--radius-card] border border-[--color-gold]/30 bg-white shadow-[--shadow-warm]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[--color-ivory] text-[--color-ink]/60">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[--color-gold]/15">
              {tripsList.map((t) => (
                <tr key={t.id}>
                  <td className="px-4 py-3 font-medium">{t.title}</td>
                  <td className="px-4 py-3">{t.dates_label ?? t.start_date}</td>
                  <td className="px-4 py-3">{formatINR(Number(t.price_per_person))}/p</td>
                  <td className="px-4 py-3">
                    {t.is_published ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <form
                      action={async () => {
                        "use server";
                        await deleteTrip(t.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-xs font-semibold text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {tripsList.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-[--color-ink]/50">
                    No upcoming trips yet. Create one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gallery media grid */}
      <section className="mt-12">
        <h2 className="font-[family-name:--font-display] text-xl font-semibold">
          Gallery Media ({mediaList.length})
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {mediaList.map((m) => (
            <figure
              key={m.id}
              className="relative overflow-hidden rounded-[--radius-button] border border-[--color-gold]/30 bg-white"
            >
              {m.type === "image" ? (
                <div className="relative h-32 w-full">
                  <Image
                    src={m.url}
                    alt={m.alt ?? ""}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <video src={m.url} className="h-32 w-full object-cover" muted />
              )}
              <figcaption className="truncate px-2 py-1.5 text-xs text-[--color-ink]/70">
                {m.caption ?? m.type}
              </figcaption>
              <form
                action={async () => {
                  "use server";
                  await deleteMedia(m.id);
                }}
              >
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white hover:bg-red-600"
                >
                  ×
                </button>
              </form>
            </figure>
          ))}
          {mediaList.length === 0 && (
            <p className="col-span-full text-sm text-[--color-ink]/50">
              No gallery media yet. Add one above.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
