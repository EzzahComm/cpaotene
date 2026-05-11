import { PageHero } from "@/components/shared/PageHero";
import { AboutContent } from "@/components/about/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CPA Otene and Associates LLP — Kenya's trusted governance and advisory firm with over 25 years of professional excellence across East Africa.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Our Story"
        title="Building Trust"
        titleHighlight="Beyond Numbers"
        description="For over two decades, CPA Otene and Associates LLP has been Kenya's trusted partner in audit, governance, tax, and advisory — combining deep local expertise with international standards."
        breadcrumbs={[{ label: "About Us" }]}
      />
      <AboutContent />
    </>
  );
}
