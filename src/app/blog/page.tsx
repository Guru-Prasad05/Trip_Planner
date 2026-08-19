import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/content/blog";

export const metadata: Metadata = buildMetadata({
  title: "Travel Stories & Guides | Odisha & Sacred India",
  description:
    "Travel guides, itineraries and stories for Odisha's wilderness, celebrations and India's sacred pilgrimage circuits. Plan smarter with local expertise.",
  path: "/blog",
});

const categoryStyles: Record<string, { bg: string; color: string }> = {
  Nature:       { bg: "rgba(47,74,60,0.12)",  color: "var(--color-forest)" },
  Spiritual:    { bg: "rgba(212,164,55,0.15)", color: "#7a5f00" },
  Corporate:    { bg: "rgba(42,111,132,0.12)", color: "var(--color-river)" },
  Celebrations: { bg: "rgba(232,116,44,0.12)", color: "var(--color-saffron)" },
  Culture:      { bg: "rgba(212,164,55,0.15)", color: "var(--color-gold)" },
};

function CategoryBadge({ cat }: { cat: string }) {
  const s = categoryStyles[cat] ?? { bg: "rgba(26,20,16,0.08)", color: "var(--color-ink)" };
  return (
    <span
      className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
      style={{ background: s.bg, color: s.color }}
    >
      {cat}
    </span>
  );
}

export default function BlogPage() {
  const posts = blogPosts;
  return (
    <div style={{ background: "var(--color-ivory)" }}>
      {/* Hero */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
          alt="Person overlooking misty mountains"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/40 to-ink/80" />
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" fill="none" aria-hidden>
          <path d="M0 60 C360 10 1080 10 1440 60Z" fill="var(--color-ivory)" />
        </svg>
        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8 pb-16 pt-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--color-saffron)" }}>
            Stories &amp; Guides
          </p>
          <h1
            className="font-display font-black leading-none mb-3"
            style={{ fontSize: "clamp(2.8rem,7vw,5rem)", color: "var(--color-ivory)" }}
          >
            Travel <em className="not-italic" style={{ color: "var(--color-gold)" }}>Journal</em>
          </h1>
          <p className="font-body max-w-md text-lg" style={{ color: "rgba(251,247,240,0.7)" }}>
            Local expertise on when to go, what to see, and how to plan your Odisha journey.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-8">
          <Link
            href={`/blog/${posts[0].slug}`}
            className="group relative block overflow-hidden rounded-3xl shadow-warm"
          >
            <div className="relative h-[400px] w-full overflow-hidden sm:h-[500px]">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                sizes="(max-width:1280px) 100vw, 1216px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <CategoryBadge cat={posts[0].category} />
              <h2
                className="mt-3 font-display font-bold leading-tight"
                style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)", color: "var(--color-ivory)" }}
              >
                {posts[0].title}
              </h2>
              <p className="mt-3 max-w-xl text-base" style={{ color: "rgba(251,247,240,0.75)" }}>
                {posts[0].excerpt}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <span className="font-body text-xs" style={{ color: "rgba(251,247,240,0.45)" }}>
                  {posts[0].readTime}
                </span>
                <span className="font-body text-sm font-semibold" style={{ color: "var(--color-saffron)" }}>
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: "var(--color-ivory)",
                  border: "1px solid var(--color-sand)",
                  boxShadow: "0 4px 24px -8px rgba(26,20,16,0.12)",
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  <div className="absolute top-3 left-3">
                    <CategoryBadge cat={post.category} />
                  </div>
                </div>
                <div className="p-5">
                  <h3
                    className="font-display font-bold leading-snug"
                    style={{ fontSize: "1.1rem", color: "var(--color-ink)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm line-clamp-2" style={{ color: "rgba(26,20,16,0.6)" }}>
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-body text-xs" style={{ color: "rgba(26,20,16,0.4)" }}>
                      {post.readTime}
                    </span>
                    <span
                      className="font-body text-xs font-bold transition-colors"
                      style={{ color: "var(--color-saffron)" }}
                    >
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 text-center" style={{ background: "var(--color-forest)" }}>
        <div className="mx-auto max-w-lg px-6">
          <h2
            className="font-display font-bold"
            style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "var(--color-ivory)" }}
          >
            Get Travel Inspiration
          </h2>
          <p className="mt-3 font-body text-base" style={{ color: "rgba(251,247,240,0.65)" }}>
            Guides, hidden gems, and trip ideas delivered monthly.
          </p>
          <div className="mx-auto mt-6 flex max-w-md gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                background: "rgba(251,247,240,0.1)",
                color: "var(--color-ivory)",
                border: "1px solid rgba(251,247,240,0.2)",
              }}
            />
            <button
              className="rounded-xl px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
              style={{ background: "var(--color-saffron)", color: "var(--color-ivory)" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
