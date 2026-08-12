"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";

const inputs =
  "mt-1 w-full rounded-[--radius-button] border border-[--color-gold]/40 bg-white px-3 py-2.5 text-[--color-ink] focus:border-[--color-saffron] focus:outline-none";
const labels = "block text-sm font-medium text-[--color-ink]";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, undefined);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-28">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-[--radius-card] border border-[--color-gold]/40 bg-[--color-ivory] p-8 shadow-[--shadow-warm]"
      >
        <h1 className="font-[family-name:--font-display] text-2xl font-semibold">
          Admin Sign In
        </h1>
        <p className="mt-1 text-sm text-[--color-ink]/60">
          Sign in to manage upcoming trips & the gallery.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className={labels} htmlFor="email">Email</label>
            <input
              className={inputs}
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className={labels} htmlFor="password">Password</label>
            <input
              className={inputs}
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
            />
          </div>
        </div>

        {state?.error && (
          <p className="mt-4 text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-[--radius-button] bg-[--color-saffron] px-6 py-3 font-semibold text-white transition-colors hover:bg-[--color-saffron-deep] disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>

        <p className="mt-4 text-xs text-[--color-ink]/50">
          Create an admin user in the Supabase dashboard first (Authentication →
          Users → Add user).
        </p>
      </form>
    </div>
  );
}
