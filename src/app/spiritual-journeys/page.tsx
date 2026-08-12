import type { Metadata } from "next";
import { SectionHubPage } from "@/components/page/SectionHubPage";
import { spiritualContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: spiritualContent.seoTitle,
  description: spiritualContent.seoDescription,
  path: spiritualContent.basePath,
});

export default function SpiritualJourneysPage() {
  return <SectionHubPage content={spiritualContent} />;
}
