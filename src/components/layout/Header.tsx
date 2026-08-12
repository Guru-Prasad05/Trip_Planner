"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { navSections } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpenMenu(false), [pathname]);

  // Prefetch all section pages on mount for instant nav
  useEffect(() => {
    navSections.forEach((s) => {
      router.prefetch(s.href);
      s.children.forEach((c) => router.prefetch(c.href));
    });
  }, [router]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] border-b border-white/20"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-4"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Trip Planner"
            width={160}
            height={40}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navSections.map((section) => {
            const active = pathname.startsWith(section.href);
            const isHovered = hoveredSection === section.href;

            return (
              <li key={section.href} className="relative">
                <Link
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={() => setHoveredSection(section.href)}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    scrolled ? "text-[--color-ink]" : "text-white/90",
                    "hover:text-[--color-saffron]",
                    active && "text-[--color-gold] bg-white/10 rounded-full",
                  )}
                >
                  {section.label}
                </Link>

                {/* Glassmorphism dropdown */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full z-[200] w-72 -translate-x-1/2 pt-3"
                      onMouseEnter={() => setHoveredSection(section.href)}
                      onMouseLeave={() => setHoveredSection(null)}
                    >
                      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-2xl">
                        {/* Section header */}
                        <div className="rounded-xl bg-emerald-50 px-4 py-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                            {section.label}
                          </p>
                          <p className="mt-0.5 text-[11px] text-gray-500">
                            {section.tagline}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="mx-3 my-1.5 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

                        {/* Links */}
                        <ul className="space-y-0.5">
                          {section.children.map((child, i) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-all hover:bg-amber-50 hover:text-amber-700"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-[10px] font-bold text-emerald-700 transition-colors group-hover:bg-amber-200 group-hover:text-amber-800">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="font-medium">{child.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Bottom CTA */}
                        <div className="mx-3 mt-1.5 mb-1 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
                        <Link
                          href={section.href}
                          className="mx-1.5 mb-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800 transition-colors hover:bg-emerald-700 hover:text-white"
                        >
                          View All {section.label}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
          <li>
            <Link
              href="/upcoming-trips"
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium hover:text-[--color-saffron]",
                scrolled ? "text-[--color-ink]" : "text-white/90",
              )}
            >
              Upcoming Trips
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium hover:text-[--color-saffron]",
                scrolled ? "text-[--color-ink]" : "text-white/90",
              )}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium hover:text-[--color-saffron]",
                scrolled ? "text-[--color-ink]" : "text-white/90",
              )}
            >
              Blog
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-[--color-saffron] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[--color-saffron]/20 transition-all hover:bg-[--color-saffron-deep] hover:scale-105 sm:block"
          >
            Plan My Trip
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={openMenu}
            onClick={() => setOpenMenu((v) => !v)}
            className={cn("flex flex-col gap-1.5 lg:hidden", scrolled ? "text-[--color-ink]" : "text-white")}
          >
            <span className={cn("block h-0.5 w-6 bg-current transition-all", openMenu && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-current transition-all", openMenu && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-current transition-all", openMenu && "-translate-y-2 -rotate-45")} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay nav — glass effect */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10 bg-white/90 backdrop-blur-2xl lg:hidden"
          >
            <ul className="max-h-[75vh] overflow-y-auto px-6 py-4">
              {navSections.map((section) => (
                <li key={section.href} className="border-b border-[--color-gold]/15 py-3">
                  <Link
                    href={section.href}
                    className="block py-1.5 font-[family-name:--font-display] text-lg font-semibold text-[--color-ink]"
                  >
                    {section.label}
                  </Link>
                  <p className="mb-2 text-xs text-[--color-ink]/50">{section.tagline}</p>
                  <ul className="grid grid-cols-2 gap-1 pl-1">
                    {section.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-md px-2 py-1.5 text-sm text-[--color-ink]/70 hover:bg-[--color-saffron]/10 hover:text-[--color-saffron]"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="pt-3">
                <Link href="/upcoming-trips" className="block py-2 text-lg text-[--color-ink]">
                  Upcoming Trips
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/gallery" className="block py-2 text-lg text-[--color-ink]">
                  Gallery
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/blog" className="block py-2 text-lg text-[--color-ink]">Blog</Link>
              </li>
              <li className="pt-3">
                <Link
                  href="/contact"
                  className="block rounded-lg bg-[--color-saffron] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Plan My Trip
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
