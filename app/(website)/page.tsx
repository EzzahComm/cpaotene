import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPA Otene & Associates LLP | Audit, Governance & Advisory Kenya",
  description:
    "Kenya's premier audit, governance, tax, risk, and advisory firm. Trusted by 500+ enterprises, NGOs, and public institutions across East Africa.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <WhyChooseUs />
      <IndustriesGrid />
      <Testimonials />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
