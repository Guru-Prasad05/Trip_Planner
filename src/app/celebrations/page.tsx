import type { Metadata } from "next";
import { SectionHubPage } from "@/components/page/SectionHubPage";
import { celebrationsContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: celebrationsContent.seoTitle,
  description: celebrationsContent.seoDescription,
  path: celebrationsContent.basePath,
});

export default function CelebrationsPage() {
  return <SectionHubPage content={celebrationsContent} />;
}
