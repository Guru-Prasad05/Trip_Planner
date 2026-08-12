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

const categoryColors: Record<string, string> = {
  Nature: "bg-emerald-100 text-emerald-800",
  Spiritual: "bg-purple-100 text-purple-800",
  Corporate: "bg-blue-100 text-blue-800",
  Celebrations: "bg-pink-100 text-pink-800",
  Culture: "bg-amber-100 text-amber-800",
};

export default function BlogPage() {
  const posts = blogPosts;
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
          alt="Person overlooking mountains"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-8 py-32 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-400">Stories & Guides</p>
          <h1 className="mt-4 font-display text-5xl font-bold sm:text-6xl">
            Travel <span className="italic text-amber-400">Journal</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Local expertise on when to go, what to see, and how to plan your Odisha journey.
          </p>
        </div>
      </section>

      {/* Featured post — large */}
      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-8">
          <Link href={`/blog/${posts[0].slug}`} className="group relative block overflow-hidden rounded-3xl">
            <div className="relative h-[400px] w-full overflow-hidden sm:h-[500px]">
              <Image
                src={posts[0].image}
                alt={posts[0].title}
                fill
                sizes="(max-width: 1280px) 100vw, 1216px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase ${categoryColors[posts[0].category]}`}>
                {posts[0].category}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                {posts[0].title}
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/80">{posts[0].excerpt}</p>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-xs text-white/50">{posts[0].readTime}</span>
                <span className="text-sm font-bold text-amber-400">Read Article →</span>
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
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-gray-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400">{post.readTime}</span>
                    <span className="text-xs font-bold text-amber-600 group-hover:text-amber-700">
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
      <section className="bg-emerald-800 py-16 text-center text-white">
        <h2 className="font-display text-3xl font-bold">Get Travel Inspiration</h2>
        <p className="mx-auto mt-3 max-w-md text-white/70">
          Join our journal — guides, hidden gems, and trip ideas delivered monthly.
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-2 px-4">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 border border-white/20 outline-none focus:border-amber-400"
          />
          <button className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-amber-600">
            Subscribe
          </button>
        </div>
      </section>
    </>
  );
}
