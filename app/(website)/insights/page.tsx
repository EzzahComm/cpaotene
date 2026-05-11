import { PageHero } from "@/components/shared/PageHero";
import { InsightsContent } from "@/components/insights/InsightsContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Thought Leadership",
  description:
    "Expert insights on audit, governance, tax, IFRS, ESG, and risk from CPA Otene and Associates LLP — Kenya's professional advisory firm.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Thought Leadership"
        title="Insights from"
        titleHighlight="Our Experts"
        description="Stay informed with analysis, commentary, and guidance from CPA Otene and Associates LLP on governance, tax, audit, IFRS, ESG, and regulatory developments across East Africa."
        breadcrumbs={[{ label: "Insights" }]}
      />
      <InsightsContent />
    </>
  );
}
