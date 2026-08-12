import Link from "next/link";
import { navSections } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="font-[family-name:--font-display] text-6xl font-semibold text-[--color-saffron]">404</p>
      <h1 className="mt-4 text-2xl font-semibold">This path leads nowhere — yet.</h1>
      <p className="mt-3 text-[--color-ink]/70">
        The page you&apos;re looking for doesn&apos;t exist. Try one of our journeys instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {navSections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-full border border-[--color-gold]/40 px-5 py-2.5 text-sm font-medium hover:bg-[--color-saffron] hover:text-white"
          >
            {s.label}
          </Link>
        ))}
        <Link href="/" className="rounded-full bg-[--color-saffron] px-5 py-2.5 text-sm font-semibold text-white">
          Home
        </Link>
      </div>
    </section>
  );
}
