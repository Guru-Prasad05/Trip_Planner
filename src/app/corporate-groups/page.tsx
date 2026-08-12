import type { Metadata } from "next";
import { SectionHubPage } from "@/components/page/SectionHubPage";
import { corporateContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: corporateContent.seoTitle,
  description: corporateContent.seoDescription,
  path: corporateContent.basePath,
});

export default function CorporateGroupsPage() {
  return <SectionHubPage content={corporateContent} />;
}
