import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { DownloadsSection } from "@/components/home/DownloadsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPA OTENE & ASSOCIATES LLP | Audit, Tax & Risk Advisory Services Kenya",
  description:
    "CPA OTENE & ASSOCIATES LLP is a professional accounting, audit, tax, risk advisory, and management consultancy firm based in Nairobi, Kenya. Trusted by 20+ enterprises, NGOs, and public institutions across East Africa.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <DownloadsSection />
      <WhyChooseUs />
      <IndustriesGrid />
      <Testimonials />
      <InsightsPreview />
      <CTASection />
    </>
  );
}
