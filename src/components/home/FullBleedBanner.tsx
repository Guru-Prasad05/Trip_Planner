import Image from "next/image";
import Link from "next/link";

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
      {/* Organic wavy top edge */}
      <svg
        aria-hidden
        className="absolute top-0 inset-x-0 z-10 w-full text-[#f7f5f2]"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,20 Q180,40 360,20 T720,20 T1080,20 T1440,20 L1440,0 L0,0 Z" fill="currentColor"/>
      </svg>

      <div className="relative h-[500px] sm:h-[600px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Directional gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: align === "left"
              ? "linear-gradient(90deg, rgba(26,20,16,0.72) 0%, rgba(26,20,16,0.35) 55%, rgba(26,20,16,0) 80%)"
              : "linear-gradient(270deg, rgba(26,20,16,0.72) 0%, rgba(26,20,16,0.35) 55%, rgba(26,20,16,0) 80%)",
          }}
        />

        {/* Organic SVG texture overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="banner-topo" x="0" y="0" width="400" height="250" patternUnits="userSpaceOnUse">
              <path d="M0,125 Q100,85 200,125 T400,125" fill="none" stroke="white" strokeWidth="1.2"/>
              <path d="M0,155 Q100,115 200,155 T400,155" fill="none" stroke="white" strokeWidth="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-topo)"/>
        </svg>

        {/* Content */}
        <div className={`absolute inset-0 flex items-center ${align === "left" ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-xl px-10 sm:px-16 ${align === "right" ? "text-right" : ""}`}>
            {/* Botanical leaf accent */}
            <div className="mb-4 flex items-center gap-3" style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
              <div className="h-[1px] w-10 bg-gradient-to-r from-gold/80 to-transparent"/>
              <svg className="w-4 h-4 text-gold/70" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" opacity="0.4"/>
                <path d="M10 4C7 4 5 7 5 10s2 5 5 6c0 0 5-1 5-6S13 4 10 4z"/>
              </svg>
            </div>

            <h2>
              <span className="block font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] italic font-light text-white leading-[0.9]">
                {scriptTitle}
              </span>
              <span className="block text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase tracking-wider text-white mt-1">
                {boldTitle}
              </span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-white/80 max-w-md">
              {description}
            </p>

            <Link
              href={ctaHref}
              className="mt-8 inline-block px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white
                       border-2 border-white/75
                       shadow-[5px_5px_0px_0px_rgba(255,255,255,0.15)]
                       hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.25)]
                       hover:bg-white hover:text-ink
                       hover:-translate-x-0.5 hover:-translate-y-0.5
                       transition-all duration-300"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Organic wavy bottom edge */}
      <svg
        aria-hidden
        className="absolute bottom-0 inset-x-0 z-10 w-full text-sand"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,20 Q360,0 720,20 T1440,20 L1440,40 L0,40 Z" fill="currentColor"/>
      </svg>
    </section>
  );
}
