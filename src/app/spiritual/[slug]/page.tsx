import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubPageView } from "@/components/page/SubPageView";
import { spiritualContent, findSubpage, siblingsOf } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return spiritualContent.subpages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sub = findSubpage(spiritualContent, slug);
  if (!sub) return {};
  return buildMetadata({
    title: sub.seoTitle,
    description: sub.seoDescription,
    path: `${sub.basePath}/${sub.slug}`,
    ogImage: sub.posterSrc,
  });
}

export default async function SpiritualSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sub = findSubpage(spiritualContent, slug);
  if (!sub) notFound();

  return (
    <SubPageView
      content={sub}
      hubTitle={spiritualContent.hubTitle}
      hubHref={spiritualContent.basePath}
      siblings={siblingsOf(spiritualContent, slug)}
    />
  );
}
