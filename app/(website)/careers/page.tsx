import { PageHero } from "@/components/shared/PageHero";
import { CareersContent } from "@/components/careers/CareersContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join CPA Otene and Associates LLP — build your career in audit, governance, tax, and advisory with Kenya's premier professional services firm.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Join Our Team"
        title="Build a career that"
        titleHighlight="matters"
        description="At CPA Otene and Associates LLP, we invest in our people. Join a team of exceptional professionals where your growth, expertise, and contribution are genuinely valued."
        breadcrumbs={[{ label: "Careers" }]}
        cta={{ label: "See Open Positions", href: "#positions" }}
      />
      <CareersContent />
    </>
  );
}
