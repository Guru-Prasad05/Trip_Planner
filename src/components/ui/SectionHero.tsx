import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SectionTheme } from "@/lib/site";

/**
 * Full-bleed section hero with background image, gradient overlay, and text.
 * Shows the actual destination photo behind the content (not just a flat gradient).
 */
export function SectionHero({
  eyebrow,
  headline,
  subhead,
  theme,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: {
  eyebrow?: string;
  headline: string;
  subhead: string;
  theme: SectionTheme;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
}) {
  return (
    <section className="relative flex min-h-[65svh] items-center overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div
            aria-hidden
            className="absolute inset-0 bg-black/50"
          />
        </>
      )}

      {/* Fallback gradient when no image */}
      {!backgroundImage && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: themeGradient[theme] }}
        />
      )}

      {/* Bottom fade to page bg */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, var(--color-sand) 0%, transparent 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center text-white">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[--color-gold] sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 font-[family-name:--font-display] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-[clamp(2.5rem,6vw,4.5rem)]">
          {headline}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-lg">
          {subhead}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-sm bg-[--color-saffron] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[--color-saffron-deep] hover:scale-105"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-sm border-2 border-white/60 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white/15 hover:border-white"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const themeGradient: Record<SectionTheme, string> = {
  nature: "linear-gradient(180deg,#10241b 0%,#1f3a2c 50%,#0c1a13 100%)",
  corporate: "linear-gradient(180deg,#1b2330 0%,#324158 55%,#11161f 100%)",
  celebration: "linear-gradient(180deg,#2a0f1c 0%,#5e1f3a 50%,#1a0a12 100%)",
  spiritual: "linear-gradient(180deg,#231a14 0%,#4a3a2c 50%,#160f0a 100%)",
};
