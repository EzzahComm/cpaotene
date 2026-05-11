import { PageHero } from "@/components/shared/PageHero";
import { ServicesIndex } from "@/components/services/ServicesIndex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive audit, governance, tax, risk, IFRS, ESG, and advisory services from Kenya's premier professional services firm.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Our Expertise"
        title="Professional Services"
        titleHighlight="Built for East Africa"
        description="From audit and assurance to governance, tax, risk, and sustainability — we deliver the full spectrum of professional services your organisation needs to thrive."
        breadcrumbs={[{ label: "Services" }]}
        cta={{ label: "Book a Consultation", href: "/contact" }}
      />
      <ServicesIndex />
    </>
  );
}
