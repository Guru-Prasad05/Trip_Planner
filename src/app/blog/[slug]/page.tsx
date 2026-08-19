import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-[800px] px-8 pb-12 pt-32 text-white">
          <span className="inline-block rounded-full bg-amber-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title.slice(0, 40), href: `/blog/${post.slug}` },
        ]}
      />

      {/* Article body */}
      <article className="py-16">
        <div className="mx-auto max-w-[700px] px-6">
          <p className="text-lg font-medium leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-amber-400 via-amber-200 to-transparent" />

          <div className="mt-10 space-y-6">
            {post.body.map((paragraph, i) => (
              <p key={i} className="text-base leading-[1.8] text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-gray-900">
              Ready to Experience This?
            </h3>
            <p className="mt-2 text-gray-600">
              Let us plan the perfect trip based on this guide  -  customised for your group.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full bg-amber-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-amber-700 hover:scale-105"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-[1280px] px-8">
          <h2 className="font-display text-2xl font-bold text-gray-900">More Stories</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                  <span className="mt-2 block text-[10px] text-gray-400">{p.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
