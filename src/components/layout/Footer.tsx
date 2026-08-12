import Image from "next/image";
import Link from "next/link";
import { navSections, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0f1a12] text-white">
      {/* Subtle forest texture */}
      <Image
        src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=40"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="object-cover opacity-[0.06]"
      />

      <div className="relative z-10">
        {/* CTA band */}
        <div className="border-b border-white/10 px-6 py-20 text-center">
          <h2 className="font-[family-name:--font-display] text-4xl font-bold text-white sm:text-5xl">
            Ready to Begin?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Speak to a trip curator today — free consultation, no obligation.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-[--color-saffron] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-[--color-saffron]/20 transition-all hover:bg-[--color-saffron-deep] hover:scale-105"
          >
            Book Free Consultation
          </Link>
        </div>

        {/* Links grid */}
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Trip Planner"
                width={108}
                height={36}
                className="h-9 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-3 text-sm text-white/40">{siteConfig.tagline}</p>
            <div className="mt-6 space-y-2 text-sm text-white/50">
              <p>{siteConfig.contact.phone}</p>
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.address}</p>
            </div>
          </div>

          {navSections.map((section) => (
            <div key={section.href}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[--color-gold]">
                <Link href={section.href} className="hover:text-white transition-colors">
                  {section.label}
                </Link>
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-6 py-5">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 text-xs text-white/30 sm:flex-row">
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-white/60">About</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-white/60">Contact</Link>
              <span>·</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
