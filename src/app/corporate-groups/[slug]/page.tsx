import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubPageView } from "@/components/page/SubPageView";
import { corporateContent, findSubpage, siblingsOf } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return corporateContent.subpages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sub = findSubpage(corporateContent, slug);
  if (!sub) return {};
  return buildMetadata({
    title: sub.seoTitle,
    description: sub.seoDescription,
    path: `${sub.basePath}/${sub.slug}`,
    ogImage: sub.posterSrc,
  });
}

export default async function CorporateSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sub = findSubpage(corporateContent, slug);
  if (!sub) notFound();

  return (
    <SubPageView
      content={sub}
      hubTitle={corporateContent.hubTitle}
      hubHref={corporateContent.basePath}
      siblings={siblingsOf(corporateContent, slug)}
    />
  );
}
