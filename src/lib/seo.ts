import type { Metadata } from "next";

/**
 * Build per-page metadata consistently (SEO strategy §3).
 * Pass a relative path; canonical + OG url are derived from it.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const images = ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      locale: "en_IN",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
