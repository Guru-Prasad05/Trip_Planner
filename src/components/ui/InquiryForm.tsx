// === FILE: E:\Trip-planner\src\components\ui\InquiryForm.tsx ===

"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { SectionTheme } from "@/lib/site";

const initialState: InquiryState = { ok: false, message: "" };

// Label: small caps, tracked, muted
const labelClass =
  "block text-[10px] font-bold uppercase tracking-[0.18em] text-[--color-ink]/50 mb-1";

// Input: borderless, bottom-border only, focus animates saffron
const inputClass =
  "w-full border-0 border-b border-[--color-ink]/15 bg-transparent pb-2 pt-1 text-sm text-[--color-ink] placeholder:text-[--color-ink]/30 " +
  "focus:border-[--color-saffron] focus:outline-none transition-colors duration-200";

export function InquiryForm({
  section = "general",
  heading = "Plan Your Trip",
}: {
  section?: SectionTheme | "general";
  heading?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  // Success state  -  centered, clean, no card wrapper (parent provides)
  if (state.ok) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        {/* Saffron checkmark circle */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[--color-saffron]/10 ring-2 ring-[--color-saffron]/30">
          <svg
            className="h-7 w-7 text-[--color-saffron]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-[family-name:--font-display] text-xl font-semibold text-[--color-ink]">
          {state.message || "We received your enquiry!"}
        </p>
        <p className="max-w-xs text-sm text-[--color-ink]/55">
          Our team will reach out within 24 hours to craft your perfect Odisha experience.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate>
      {/* Hidden fields */}
      <input type="hidden" name="section" value={section} />
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {/* Heading */}
      <h2 className="font-[family-name:--font-display] text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight text-[--color-ink]">
        {heading}
      </h2>
      <div className="mt-2 h-0.5 w-10 rounded-full bg-[--color-saffron]" />

      {/* Fields grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div className="group">
          <label className={labelClass} htmlFor="name">Name</label>
          <input className={inputClass} id="name" name="name" required placeholder="Your full name" />
          {state.errors?.name && (
            <p className="mt-1 text-[11px] text-red-500">{state.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="group">
          <label className={labelClass} htmlFor="email">Email</label>
          <input
            className={inputClass}
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
          {state.errors?.email && (
            <p className="mt-1 text-[11px] text-red-500">{state.errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="group">
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input className={inputClass} id="phone" name="phone" required placeholder="+91 98765 43210" />
          {state.errors?.phone && (
            <p className="mt-1 text-[11px] text-red-500">{state.errors.phone}</p>
          )}
        </div>

        {/* Group Size */}
        <div className="group">
          <label className={labelClass} htmlFor="groupSize">Group Size</label>
          <input
            className={inputClass}
            id="groupSize"
            name="groupSize"
            type="number"
            min={1}
            placeholder="2"
          />
        </div>

        {/* Preferred Dates */}
        <div className="group sm:col-span-2">
          <label className={labelClass} htmlFor="preferredDates">Preferred Dates</label>
          <input
            className={inputClass}
            id="preferredDates"
            name="preferredDates"
            placeholder="e.g. mid-November, 3 nights"
          />
        </div>

        {/* Message */}
        <div className="group sm:col-span-2">
          <label className={labelClass} htmlFor="message">Tell us about your trip</label>
          <textarea
            className={inputClass + " resize-none"}
            id="message"
            name="message"
            rows={4}
            placeholder="Special interests, occasions, accessibility needs…"
          />
        </div>
      </div>

      {/* Form-level error */}
      {state.message && !state.ok && (
        <p className="mt-4 text-sm text-red-500">{state.message}</p>
      )}

      {/* Submit  -  full-width saffron pill */}
      <button
        type="submit"
        disabled={pending}
        className={[
          "mt-8 flex w-full items-center justify-center gap-3 rounded-full",
          "bg-[--color-saffron] px-8 py-4",
          "text-sm font-bold uppercase tracking-[0.15em] text-white",
          "transition-all duration-200",
          "hover:bg-[--color-saffron-deep] hover:shadow-[0_8px_30px_-8px_var(--color-saffron)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-saffron] focus-visible:ring-offset-2",
        ].join(" ")}
      >
        {pending ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Request My Proposal
            <span className="text-base leading-none" aria-hidden>→</span>
          </>
        )}
      </button>
    </form>
  );
}
