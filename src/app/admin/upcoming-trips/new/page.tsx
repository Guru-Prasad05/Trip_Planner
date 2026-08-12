"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { createTrip } from "@/app/actions/trips";
import { createUploadUrl } from "@/app/actions/media";
import { signOut } from "@/app/actions/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ItineraryDay = { day: string; title: string; items: string[] };

const inputs =
  "mt-1 w-full rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none";
const labels = "block text-sm font-medium text-[--color-ink]";

export default function NewTripPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createTrip, {
    ok: false,
    message: "",
  });
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([{ day: "Day 1", title: "", items: [""] }]);
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);

  // ---- Itinerary helpers ----
  const addDay = () => {
    const nextNum = itinerary.length + 1;
    setItinerary([...itinerary, { day: `Day ${nextNum}`, title: "", items: [""] }]);
  };
  const removeDay = (idx: number) => {
    if (itinerary.length <= 1) return;
    setItinerary(itinerary.filter((_, i) => i !== idx));
  };
  const updateDay = (idx: number, field: keyof ItineraryDay, value: string) => {
    setItinerary(itinerary.map((d, i) => (i === idx ? { ...d, [field]: value } : d)));
  };
  const addItem = (dayIdx: number) => {
    setItinerary(
      itinerary.map((d, i) => (i === dayIdx ? { ...d, items: [...d.items, ""] } : d)),
    );
  };
  const updateItem = (dayIdx: number, itemIdx: number, value: string) => {
    setItinerary(
      itinerary.map((d, i) =>
        i === dayIdx ? { ...d, items: d.items.map((it, j) => (j === itemIdx ? value : it)) } : d,
      ),
    );
  };
  const removeItem = (dayIdx: number, itemIdx: number) => {
    setItinerary(
      itinerary.map((d, i) =>
        i === dayIdx ? { ...d, items: d.items.filter((_, j) => j !== itemIdx) } : d,
      ),
    );
  };

  // ---- Cover image upload to Supabase Storage ----
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setCoverUploading(true);
    try {
      // 1) Get signed upload URL
      const fd = new FormData();
      fd.set("path", `covers/${Date.now()}-${file.name}`);
      fd.set("contentType", file.type);
      const res = await fetch("/api/admin/upload-url", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!data.ok || !data.signedUrl) throw new Error(data.message ?? "No signed URL");
      // 2) PUT the file to the signed URL
      await fetch(data.signedUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      // 3) Save the public URL to form state
      setCoverUrl(data.publicUrl);
      setCoverPreview(data.publicUrl);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setCoverUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-28">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-sm text-[--color-ink]/60 hover:text-[--color-saffron]"
          >
            ← Admin Dashboard
          </Link>
          <h1 className="mt-2 font-[family-name:--font-display] text-3xl font-semibold">
            New Upcoming Trip
          </h1>
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

      <form
        action={formAction}
        className="mt-8 space-y-8 rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-6 shadow-[--shadow-warm]"
      >
        {/* Success message */}
        {state.ok && (
          <div className="rounded-lg bg-emerald-50 p-4 text-emerald-700">
            {state.message}
            <div className="mt-2 flex gap-2">
              <Link
                href="/admin"
                className="rounded-[--radius-button] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Back to Dashboard
              </Link>
              <Link
                href={`/upcoming-trips/${state.tripId}`}
                className="rounded-[--radius-button] border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700"
              >
                View Trip
              </Link>
            </div>
          </div>
        )}

        {/* Error message */}
        {state.message && !state.ok && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">{state.message}</div>
        )}

        {/* Basic fields */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labels} htmlFor="title">Trip Title *</label>
            <input
              className={inputs}
              id="title"
              name="title"
              required
              placeholder="e.g. Koraput Highlands & Waterfalls Escape"
            />
            {state.errors?.title && <p className="mt-1 text-xs text-red-600">{state.errors.title}</p>}
          </div>
          <div>
            <label className={labels} htmlFor="route">Route *</label>
            <input
              className={inputs}
              id="route"
              name="route"
              required
              placeholder="e.g. Bhubaneswar to Bhubaneswar"
            />
          </div>
          <div>
            <label className={labels} htmlFor="duration">Duration *</label>
            <input
              className={inputs}
              id="duration"
              name="duration"
              required
              placeholder="e.g. 2 Days / 3 Nights"
            />
          </div>
          <div>
            <label className={labels} htmlFor="pricePerPerson">Price Per Person (₹) *</label>
            <input
              className={inputs}
              id="pricePerPerson"
              name="pricePerPerson"
              type="number"
              min="0"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labels} htmlFor="datesLabel">Dates Label</label>
            <input
              className={inputs}
              id="datesLabel"
              name="datesLabel"
              placeholder="e.g. July 3 4 5"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labels} htmlFor="startDate">Start Date</label>
            <input className={inputs} id="startDate" name="startDate" type="date" />
          </div>
          <div className="sm:col-span-2">
            <label className={labels} htmlFor="endDate">End Date</label>
            <input className={inputs} id="endDate" name="endDate" type="date" />
          </div>
          <div className="sm:col-span-2">
            <label className={labels} htmlFor="meetupPoint">Meetup Point</label>
            <input
              className={inputs}
              id="meetupPoint"
              name="meetupPoint"
              placeholder="e.g. Crown Hotel, Bhubaneswar (9 PM departure)"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labels} htmlFor="contactPhone">Contact Phone</label>
            <input
              className={inputs}
              id="contactPhone"
              name="contactPhone"
              placeholder="e.g. 7008258411"
            />
          </div>
        </div>

        {/* Cover image */}
        <fieldset className="space-y-3">
          <legend className={labels}>Cover Image</legend>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            disabled={coverUploading}
            className="sr-only"
            id="cover-upload"
          />
          <label
            htmlFor="cover-upload"
            className={`
              inline-flex items-center justify-center gap-2 rounded-[--radius-button]
              border-2 border-dashed border-[--color-gold]/40 px-6 py-8 text-center
              text-[--color-ink]/60 cursor-pointer transition-colors
              ${coverPreview ? "border-transparent bg-white" : "hover:border-[--color-saffron]"}
            `}
          >
            {coverPreview ? (
              <>
                <Image
                  src={coverPreview}
                  alt="Cover preview"
                  width={200}
                  height={128}
                  sizes="200px"
                  className="max-h-32 max-w-full rounded-[--radius-button] object-cover"
                />
                <span className="text-sm font-medium text-[--color-ink]">Cover set</span>
              </>
            ) : (
              <>
                <svg
                  className="h-8 w-8 text-[--color-gold]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Click or drag to upload a cover image</span>
              </>
            )}
            {coverUploading && <span className="text-sm text-[--color-saffron]">Uploading…</span>}
          </label>
          <input
            type="hidden"
            name="coverUrl"
            value={coverPreview ?? coverUrl}
            required
          />
          {state.errors?.coverUrl && (
            <p className="text-xs text-red-600">{state.errors.coverUrl}</p>
          )}
        </fieldset>

        {/* Includes (comma or newline separated) */}
        <div>
          <label className={labels} htmlFor="includes">Includes (one per line or comma-separated)</label>
          <textarea
            className={inputs}
            id="includes"
            name="includes"
            rows={3}
            placeholder="Food, Stay, Cab / Transport, All Toll & Parking Charges"
          />
        </div>

        {/* Highlights */}
        <div>
          <label className={labels} htmlFor="highlights">Highlights / Marketing blurb</label>
          <textarea
            className={inputs}
            id="highlights"
            name="highlights"
            rows={3}
            placeholder="Short marketing description..."
          />
        </div>

        {/* Itinerary builder */}
        <fieldset>
          <legend className="font-[family-name:--font-display] text-lg font-semibold mb-4">
            Itinerary (add as many days as needed)
          </legend>
          <div className="space-y-6">
            {itinerary.map((day, di) => (
              <div
                key={di}
                className="rounded-lg border border-[--color-gold]/30 bg-white p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      className="w-24 rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-2 py-1.5 text-sm text-[--color-ink]"
                      value={day.day}
                      onChange={(e) => updateDay(di, "day", e.target.value)}
                    />
                    <input
                      className="flex-1 rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-1.5 text-sm text-[--color-ink]"
                      placeholder="Day title (e.g. Hotel Check-in & Koraput Sightseeing)"
                      value={day.title}
                      onChange={(e) => updateDay(di, "title", e.target.value)}
                    />
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDay(di)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove day
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  {day.items.map((item, ii) => (
                    <div key={ii} className="flex gap-2">
                      <span className="mt-1 text-[--color-saffron]">•</span>
                      <input
                        className="flex-1 rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-1.5 text-sm text-[--color-ink]"
                        placeholder="Activity / stop"
                        value={item}
                        onChange={(e) => updateItem(di, ii, e.target.value)}
                      />
                      {day.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(di, ii)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem(di)}
                    className="text-sm font-medium text-[--color-saffron] hover:underline"
                  >
                    + Add activity
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDay}
              className="w-full rounded-[--radius-button] border-2 border-dashed border-[--color-gold]/40 py-3 text-[--color-saffron] font-medium hover:border-[--color-saffron] hover:bg-[--color-gold]/5"
            >
              + Add another day
            </button>
          </div>
          <input
            type="hidden"
            name="itinerary"
            value={JSON.stringify(itinerary)}
          />
        </fieldset>

        {/* Submit */}
        <div className="pt-4 border-t border-[--color-gold]/20">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-[--radius-button] bg-[--color-saffron] px-8 py-4 font-semibold text-white text-lg transition-colors hover:bg-[--color-saffron-deep] disabled:opacity-60"
          >
            {pending ? "Publishing…" : "Publish Trip"}
          </button>
        </div>
      </form>
    </div>
  );
}