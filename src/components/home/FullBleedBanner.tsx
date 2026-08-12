import Image from "next/image";
import Link from "next/link";

/**
 * Full-bleed photo banner section (like the "Learn & Give Back" and 
 * "Philosophy of Sustainability" sections in the reference).
 * Shows a large photo with overlaid text + CTA.
 */
export function FullBleedBanner({
  imageSrc,
  imageAlt,
  scriptTitle,
  boldTitle,
  description,
  ctaLabel,
  ctaHref,
  align = "left",
}: {
  imageSrc: string;
  imageAlt: string;
  scriptTitle: string;
  boldTitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  align?: "left" | "right";
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] sm:h-[600px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Content */}
        <div className={`absolute inset-0 flex items-center ${align === "left" ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-xl px-8 sm:px-16 ${align === "right" ? "text-right" : ""}`}>
            <h2>
              <span className="block font-[family-name:--font-display] text-[clamp(2.5rem,5vw,4.5rem)] italic font-light text-white">
                {scriptTitle}
              </span>
              <span className="block text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase tracking-wider text-white">
                {boldTitle}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="mt-6 inline-block rounded-sm border-2 border-white/80 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[--color-ink]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
