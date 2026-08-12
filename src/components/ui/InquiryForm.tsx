"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";
import type { SectionTheme } from "@/lib/site";

const initialState: InquiryState = { ok: false, message: "" };

const labels = "block text-sm font-medium text-[--color-ink]";
const inputs =
  "mt-1 w-full rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none";

export function InquiryForm({
  section = "general",
  heading = "Plan Your Trip",
}: {
  section?: SectionTheme | "general";
  heading?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.ok) {
    return (
      <div className="rounded-[--radius-card] border border-[--color-gold]/40 bg-[--color-ivory] p-8 text-center">
        <p className="text-lg font-medium text-[--color-forest]">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[--radius-card] border border-[--color-gold]/40 bg-[--color-ivory] p-6 shadow-[--shadow-warm] sm:p-8"
    >
      <h2 className="font-[family-name:--font-display] text-2xl font-semibold">{heading}</h2>
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labels} htmlFor="name">Name</label>
          <input className={inputs} id="name" name="name" required />
          {state.errors?.name && <p className="mt-1 text-xs text-red-600">{state.errors.name}</p>}
        </div>
        <div>
          <label className={labels} htmlFor="email">Email</label>
          <input className={inputs} id="email" name="email" type="email" required />
          {state.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email}</p>}
        </div>
        <div>
          <label className={labels} htmlFor="phone">Phone</label>
          <input className={inputs} id="phone" name="phone" required />
          {state.errors?.phone && <p className="mt-1 text-xs text-red-600">{state.errors.phone}</p>}
        </div>
        <div>
          <label className={labels} htmlFor="groupSize">Group Size</label>
          <input className={inputs} id="groupSize" name="groupSize" type="number" min={1} />
        </div>
        <div className="sm:col-span-2">
          <label className={labels} htmlFor="preferredDates">Preferred Dates</label>
          <input className={inputs} id="preferredDates" name="preferredDates" placeholder="e.g. mid-November, 3 nights" />
        </div>
        <div className="sm:col-span-2">
          <label className={labels} htmlFor="message">Tell us about your trip</label>
          <textarea className={inputs} id="message" name="message" rows={4} />
        </div>
      </div>

      {state.message && !state.ok && (
        <p className="mt-4 text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-[--radius-button] bg-[--color-saffron] px-6 py-3 font-semibold text-white transition-colors hover:bg-[--color-saffron-deep] disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending…" : "Request My Proposal"}
      </button>
    </form>
  );
}
