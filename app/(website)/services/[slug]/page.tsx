import { PageHero } from "@/components/shared/PageHero";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Service data registry
const serviceData: Record<string, {
  title: string;
  label: string;
  titleHighlight: string;
  description: string;
  overview: string;
  challenges: string[];
  methodology: string[];
  benefits: string[];
  industries: string[];
}> = {
  "audit-assurance": {
    title: "Audit &",
    label: "Assurance Services",
    titleHighlight: "Assurance",
    description: "Independent, rigorous audit services that inspire confidence in your financial statements and institutional processes — delivered by ICPAK-registered professionals.",
    overview: "Our Audit & Assurance practice delivers independent, high-quality audit services that provide stakeholders with the confidence they need in your organisation's financial statements and internal processes. We apply International Standards on Auditing (ISAs) to every engagement, combining technical rigour with practical commercial awareness.",
    challenges: [
      "Increasing regulatory requirements for financial transparency",
      "Stakeholder demands for reliable, independent financial information",
      "Complex accounting standards including IFRS transition",
      "Need for robust internal controls and governance frameworks",
      "Pressure from donors, investors, and development partners for audit quality",
    ],
    methodology: [
      "Risk-based audit planning tailored to your organisation",
      "Deep understanding of your business, industry, and regulatory environment",
      "Application of ISAs and ICPAK professional standards",
      "Clear communication with management and audit committees",
      "Practical, actionable recommendations in management letters",
    ],
    benefits: [
      "Independent assurance on financial statements",
      "Identification of internal control weaknesses",
      "Compliance with statutory and regulatory requirements",
      "Enhanced stakeholder and investor confidence",
      "Insights to improve financial reporting quality",
    ],
    industries: ["Banking", "Insurance", "NGOs", "Public Sector", "Listed Companies", "SACCOs", "Private Equity"],
  },
  "tax-advisory": {
    title: "Tax",
    label: "Tax Advisory",
    titleHighlight: "Advisory",
    description: "Strategic tax planning, compliance management, and dispute resolution — navigating Kenya's tax landscape with precision and confidence.",
    overview: "Our Tax Advisory practice provides comprehensive tax services to corporates, NGOs, financial institutions, and individuals operating in Kenya and East Africa. We combine in-depth knowledge of Kenyan tax law with an understanding of international tax principles to deliver tax advice that is both legally sound and commercially practical.",
    challenges: [
      "Complex and evolving Kenyan tax legislation and KRA enforcement",
      "Transfer pricing requirements for multinationals",
      "Indirect tax compliance including VAT and excise duty",
      "Tax audit and dispute resolution with KRA",
      "Withholding tax obligations in cross-border transactions",
    ],
    methodology: [
      "Tax health checks to identify risks and opportunities",
      "Proactive tax planning aligned with business strategy",
      "Preparation and review of tax returns and compliance filings",
      "Representation in KRA audits and objections",
      "Training for finance teams on tax compliance",
    ],
    benefits: [
      "Optimised tax position within legal boundaries",
      "Reduced risk of penalties and interest from KRA",
      "Confidence in tax compliance and reporting",
      "Expert support in tax disputes and objections",
      "Informed decision-making on tax implications of transactions",
    ],
    industries: ["All Sectors", "Multinationals", "Financial Services", "Real Estate", "Energy", "NGOs"],
  },
  "governance-advisory": {
    title: "Governance",
    label: "Governance Advisory",
    titleHighlight: "Advisory",
    description: "Board governance frameworks, institutional policy development, and governance training for enterprises and public institutions across East Africa.",
    overview: "Good governance is the foundation of institutional credibility and long-term success. Our Governance Advisory practice helps organisations design, implement, and continuously improve governance frameworks that meet regulatory requirements, satisfy stakeholder expectations, and drive institutional performance.",
    challenges: [
      "Gaps in board effectiveness and leadership accountability",
      "Inadequate governance policies and institutional frameworks",
      "Regulatory governance requirements for listed and regulated entities",
      "Donor and development partner governance compliance requirements",
      "Succession planning and board renewal challenges",
    ],
    methodology: [
      "Governance maturity assessments benchmarked to best practice",
      "Board and committee effectiveness evaluations",
      "Development of charters, policies, and governance frameworks",
      "Board induction, training, and capacity building programmes",
      "Ongoing governance advisory and board secretariat support",
    ],
    benefits: [
      "Stronger board leadership and accountability",
      "Compliance with governance codes and regulatory requirements",
      "Enhanced institutional credibility with stakeholders",
      "Reduced governance risk and improved oversight",
      "Better strategic decision-making at board level",
    ],
    industries: ["Listed Companies", "Banks", "Insurance", "NGOs", "Public Sector", "SACCOs", "Development Finance"],
  },
};

// Generate all slugs at build time
export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} ${service.titleHighlight}`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug];

  if (!service) notFound();

  return (
    <>
      <PageHero
        label={service.label}
        title={service.title}
        titleHighlight={service.titleHighlight}
        description={service.description}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: `${service.title} ${service.titleHighlight}` },
        ]}
        cta={{ label: "Request This Service", href: "/contact" }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
