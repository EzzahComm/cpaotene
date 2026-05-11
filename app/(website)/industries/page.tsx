import { PageHero } from "@/components/shared/PageHero";
import { IndustriesPageContent } from "@/components/industries/IndustriesPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "CPA Otene and Associates LLP brings deep sector expertise to banking, insurance, NGOs, public sector, real estate, technology, and more across East Africa.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        label="Sector Expertise"
        title="Deep expertise across"
        titleHighlight="every industry"
        description="We understand the unique regulatory, financial, and operational challenges of each sector we serve — bringing tailored advisory that creates real institutional value."
        breadcrumbs={[{ label: "Industries" }]}
      />
      <IndustriesPageContent />
    </>
  );
}
