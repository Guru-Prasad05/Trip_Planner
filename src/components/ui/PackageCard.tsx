import Link from "next/link";
import { formatINR } from "@/lib/utils";

export interface TripPackage {
  title: string;
  duration: string;
  fromPrice?: number; // omit for "On Request"
  highlights: string[];
  href: string;
}

export function PackageCard({ pkg }: { pkg: TripPackage }) {
  return (
    <article className="flex flex-col rounded-[--radius-card] border border-[--color-gold]/30 bg-[--color-ivory] p-6 shadow-[--shadow-warm]">
      <h3 className="font-[family-name:--font-display] text-xl font-semibold">{pkg.title}</h3>
      <p className="mt-1 text-sm text-[--color-ink]/60">{pkg.duration}</p>
      <ul className="mt-4 flex-1 space-y-2 text-sm text-[--color-ink]/80">
        {pkg.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span aria-hidden className="text-[--color-saffron]">›</span>
            {h}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm">
          {pkg.fromPrice ? (
            <>
              <span className="text-[--color-ink]/60">from </span>
              <span className="font-semibold text-[--color-ink]">{formatINR(pkg.fromPrice)}</span>
              <span className="text-[--color-ink]/60">/person</span>
            </>
          ) : (
            <span className="font-semibold">On Request</span>
          )}
        </span>
        <Link
          href={pkg.href}
          className="rounded-[--radius-button] bg-[--color-saffron] px-4 py-2 text-sm font-semibold text-white hover:bg-[--color-saffron-deep]"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
}
