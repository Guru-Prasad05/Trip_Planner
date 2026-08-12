"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePortal } from "@/components/portal/PortalProvider";
import type { SectionTheme } from "@/lib/site";

export interface CategoryCard {
  title: string;
  description?: string;
  count?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface CategoryRowProps {
  scriptTitle: string;
  boldTitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: CategoryCard[];
  reversed?: boolean;
  theme?: SectionTheme;
}

/**
 * Section layout matching the reference: left-side title block (script + bold + desc + CTA)
 * with horizontal scrolling row of rounded destination cards to the right.
 * First card has an overlay with description; rest are photo-only with bottom label.
 */
export function CategoryRow({
  scriptTitle,
  boldTitle,
  description,
  ctaLabel,
  ctaHref,
  cards,
  reversed = false,
  theme,
}: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { enterPortal } = usePortal();
  const router = useRouter();

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleCardClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    enterPortal(href, theme);
  };

  const handleCardHover = (href: string) => {
    // Prefetch on hover for instant navigation
    router.prefetch(href);
  };

  return (
    <section className={cn("py-16 lg:py-24", reversed ? "bg-[#f7f5f2]" : "bg-white")}>
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Left title block */}
          <div className="shrink-0 lg:w-[280px] lg:sticky lg:top-32">
            <h2>
              <span className="block font-[family-name:--font-display] text-[clamp(2rem,4vw,3rem)] italic font-light text-[--color-forest]">
                {scriptTitle}
              </span>
              <span className="block text-[clamp(1.2rem,2.5vw,1.6rem)] font-extrabold uppercase tracking-wide text-[--color-ink]">
                {boldTitle}
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[--color-ink]/70">
              {description}
            </p>
            <Link
              href={ctaHref}
              className="mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[--color-ink] transition-colors hover:text-[--color-forest]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[--color-forest] text-[--color-forest]">
                +
              </span>
              {ctaLabel}
            </Link>
          </div>

          {/* Horizontal scrolling cards */}
          <div className="relative flex-1 overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cards.map((card, i) => (
                <motion.div
                  key={card.href}
                  className="snap-start shrink-0"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={card.href}
                    onClick={(e) => handleCardClick(e, card.href)}
                    onMouseEnter={() => handleCardHover(card.href)}
                    className="group relative block h-[320px] w-[240px] overflow-hidden rounded-2xl sm:h-[380px] sm:w-[280px]"
                  >
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="280px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* First card: overlay with content (like Australia card in reference) */}
                    {i === 0 && card.description ? (
                      <div className="absolute inset-0 flex flex-col justify-end bg-[--color-forest]/75 p-5 text-white transition-colors group-hover:bg-[--color-forest]/85">
                        <h3 className="text-xl font-bold">{card.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/85">
                          {card.description}
                        </p>
                        {card.count && (
                          <span className="mt-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/70">
                            {card.count} →
                          </span>
                        )}
                      </div>
                    ) : (
                      /* Other cards: photo with bottom label */
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
                        <h3 className="text-lg font-bold text-white drop-shadow-md">
                          {card.title}
                        </h3>
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Scroll arrow */}
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right"
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
