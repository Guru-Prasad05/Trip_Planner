import type { Metadata } from "next";
import { SectionHubPage } from "@/components/page/SectionHubPage";
import { natureContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: natureContent.seoTitle,
  description: natureContent.seoDescription,
  path: natureContent.basePath,
});

export default function NatureToursPage() {
  return <SectionHubPage content={natureContent} />;
}
