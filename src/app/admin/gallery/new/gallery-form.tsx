"use client";

import { useActionState, useState } from "react";
import { createMediaRow } from "@/app/actions/media";
import { signOut } from "@/app/actions/auth";
import Link from "next/link";
import type { TripOption } from "@/lib/trips/types";

const inputs =
  "mt-1 w-full rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none";
const labels = "block text-sm font-medium text-[--color-ink]";

export default function GalleryForm({ trips }: { trips: TripOption[] }) {
  const [state, formAction, pending] = useActionState(createMediaRow, {
    ok: false,
    message: "",
  });
  const [selectedType, setSelectedType] = useState<"image" | "video">("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [tripId, setTripId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null); // video preview handled differently
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Pick a file first");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("path", `gallery/${Date.now()}-${file.name}`);
      fd.set("contentType", file.type);
      const res = await fetch("/api/admin/upload-url", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.ok || !data.signedUrl) throw new Error(data.message ?? "No signed URL");
      await fetch(data.signedUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      setUploadedUrl(data.publicUrl);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl) return alert("Upload a file first");
    const fd = new FormData();
    fd.set("type", selectedType);
    fd.set("url", uploadedUrl);
    fd.set("caption", caption);
    fd.set("alt", alt);
    fd.set("tripId", tripId);
    formAction(fd);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-28">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-sm text-[--color-ink]/60 hover:text-[--color-saffron]"
          >
            ← Admin Dashboard
          </Link>
          <h1 className="mt-2 font-[family-name:--font-display] text-3xl font-semibold">
            Add Gallery Media
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

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload panel */}
        <section className="rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-6 shadow-[--shadow-warm]">
          <h2 className="font-[family-name:--font-display] text-lg font-semibold">1. Upload File</h2>

          <div className="mt-4 space-y-3">
            <div className="flex gap-2">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="mediaType"
                  value="image"
                  checked={selectedType === "image"}
                  onChange={() => setSelectedType("image")}
                  className="accent-[--color-saffron]"
                />
                <span className="text-sm font-medium">Image</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="mediaType"
                  value="video"
                  checked={selectedType === "video"}
                  onChange={() => setSelectedType("video")}
                  className="accent-[--color-saffron]"
                />
                <span className="text-sm font-medium">Video</span>
              </label>
            </div>

            <input
              type="file"
              accept={selectedType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="sr-only"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className={`
                block rounded-[--radius-button] border-2 border-dashed border-[--color-gold]/40
                p-8 text-center cursor-pointer transition-colors
                ${preview || uploadedUrl ? "border-transparent bg-white" : "hover:border-[--color-saffron]"}
              `}
            >
              {preview ? (
                <>
                  {selectedType === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className="mx-auto max-h-48 max-w-full rounded-[--radius-button] object-cover"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="mx-auto max-h-48 max-w-full rounded-[--radius-button]"
                      controls
                      muted
                    />
                  )}
                  <p className="mt-2 text-sm font-medium text-[--color-ink]">File selected</p>
                </>
              ) : uploadedUrl ? (
                <p className="text-sm font-medium text-[--color-ink]">Uploaded ✓</p>
              ) : (
                <>
                  <svg
                    className="mx-auto h-8 w-8 text-[--color-gold]"
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
                  <p className="mt-2">Click or drag to upload a {selectedType}</p>
                </>
              )}
              {uploading && <p className="mt-2 text-sm text-[--color-saffron]">Uploading…</p>}
            </label>

            {file && !uploadedUrl && (
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="w-full rounded-[--radius-button] bg-[--color-saffron] px-6 py-3 font-semibold text-white transition-colors hover:bg-[--color-saffron-deep] disabled:opacity-60"
              >
                {uploading ? "Uploading…" : `Upload ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`}
              </button>
            )}
            {uploadedUrl && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setUploadedUrl("");
                }}
                className="w-full rounded-[--radius-button] border border-[--color-gold]/40 px-6 py-3 font-semibold text-[--color-ink] hover:bg-[--color-gold]/10"
              >
                Choose different file
              </button>
            )}
          </div>
        </section>

        {/* Metadata + save */}
        <section className="rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-6 shadow-[--shadow-warm]">
          <h2 className="font-[family-name:--font-display] text-lg font-semibold">2. Details & Save</h2>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className={labels} htmlFor="tripId">Trip</label>
              <select
                className={inputs}
                id="tripId"
                name="tripId"
                value={tripId}
                onChange={(e) => setTripId(e.target.value)}
              >
                <option value=""> -  Unassigned  - </option>
                {trips.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-[--color-ink]/60">
                Sets the caption shown on the gallery and enables filtering by trip.
              </p>
            </div>
            <div>
              <label className={labels} htmlFor="caption">Caption</label>
              <input
                className={inputs}
                id="caption"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Deomali sunrise over the misty peaks"
              />
            </div>
            <div>
              <label className={labels} htmlFor="alt">Alt text (accessibility)</label>
              <input
                className={inputs}
                id="alt"
                name="alt"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                placeholder="e.g. Misty mountain peaks at sunrise with trekkers in silhouette"
              />
            </div>

            {state.message && !state.ok && (
              <div className="rounded-lg bg-red-50 p-3 text-red-700 text-sm">{state.message}</div>
            )}
            {state.ok && (
              <div className="rounded-lg bg-emerald-50 p-3 text-emerald-700 text-sm">
                {state.message}
              </div>
            )}

            <button
              type="submit"
              disabled={pending || !uploadedUrl}
              className="w-full rounded-[--radius-button] bg-[--color-saffron] px-6 py-3 font-semibold text-white transition-colors hover:bg-[--color-saffron-deep] disabled:opacity-60"
            >
              {pending ? "Saving…" : "Add to Gallery"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}