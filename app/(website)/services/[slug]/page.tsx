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
  "risk-compliance": {
    title: "Risk &",
    label: "Risk & Compliance",
    titleHighlight: "Compliance",
    description: "Enterprise risk management frameworks, regulatory compliance programmes, and risk culture development for institutional resilience across East Africa.",
    overview: "In an increasingly complex regulatory and operational environment, robust risk management is not optional — it is a strategic imperative. Our Risk & Compliance practice helps organisations identify, assess, and manage risks across all dimensions: financial, operational, reputational, regulatory, and strategic.",
    challenges: [
      "Rapidly evolving regulatory requirements from CBK, CMA, IRA, and SASRA",
      "Inadequate enterprise risk frameworks and risk appetite statements",
      "Weak risk culture and lack of risk awareness at all levels",
      "Insufficient integration of risk management into strategic planning",
      "Increasing complexity of operational and technology risks",
    ],
    methodology: [
      "Enterprise-wide risk assessment and heat-mapping",
      "Risk appetite and tolerance framework development",
      "Regulatory compliance gap analysis and remediation planning",
      "Risk culture assessment and board risk training",
      "Design and implementation of risk monitoring dashboards",
    ],
    benefits: [
      "Comprehensive view of organisational risk exposure",
      "Reduced regulatory penalties and compliance breaches",
      "Stronger risk culture and risk-aware decision-making",
      "Board and audit committee confidence in risk oversight",
      "Proactive identification of emerging threats",
    ],
    industries: ["Banking", "Insurance", "SACCOs", "NGOs", "Listed Companies", "Public Sector", "Energy"],
  },
  "internal-audit": {
    title: "Internal",
    label: "Internal Audit",
    titleHighlight: "Audit",
    description: "Comprehensive internal audit services that strengthen controls, improve processes, and enhance accountability — delivered independently and objectively.",
    overview: "A strong internal audit function is one of the most powerful tools available to boards and management for maintaining accountability and institutional integrity. Our Internal Audit practice provides outsourced, co-sourced, and advisory internal audit services aligned to the International Standards for the Professional Practice of Internal Auditing (ISPPIA).",
    challenges: [
      "Insufficient internal capacity to maintain an effective audit function",
      "Lack of independence and objectivity in existing internal audit teams",
      "Inadequate coverage of key risk areas and emerging technology risks",
      "Weak audit committee oversight and limited audit quality assurance",
      "Failure to add strategic value beyond compliance checking",
    ],
    methodology: [
      "Risk-based internal audit planning aligned to organisational objectives",
      "Audit universe development and prioritisation",
      "Process, IT, and compliance audit execution",
      "Clear and actionable audit reports with management responses",
      "Quarterly reporting to audit committees and follow-up on recommendations",
    ],
    benefits: [
      "Independent assurance on the effectiveness of internal controls",
      "Identification and remediation of operational and financial risks",
      "Enhanced accountability and governance oversight",
      "Cost-effective access to specialist audit expertise",
      "Audit function benchmarked to IIA standards",
    ],
    industries: ["Banks", "Insurance", "NGOs", "Public Sector", "Listed Companies", "SACCOs", "Microfinance"],
  },
  "ifrs-advisory": {
    title: "IFRS",
    label: "IFRS Advisory",
    titleHighlight: "Advisory",
    description: "Expert guidance on IFRS adoption, transition management, and complex accounting judgements — helping organisations achieve compliance with confidence.",
    overview: "International Financial Reporting Standards continue to evolve, and their correct application demands deep technical expertise and practical experience. Our IFRS Advisory practice supports organisations through complex standard transitions, accounting policy reviews, and technical accounting challenges — from IFRS 9 expected credit loss to IFRS 17 insurance contracts.",
    challenges: [
      "Complex and evolving IFRS standards requiring specialist interpretation",
      "IFRS 9 ECL model development and validation for financial institutions",
      "IFRS 17 transition for insurance companies",
      "Revenue recognition challenges under IFRS 15",
      "Lease accounting under IFRS 16 and asset impairment under IAS 36",
    ],
    methodology: [
      "Technical accounting gap analysis against current and upcoming standards",
      "IFRS impact assessment and transition planning",
      "Development of accounting policies and disclosures",
      "Model development support for IFRS 9 and IFRS 17",
      "Training for finance teams and audit committees on new standards",
    ],
    benefits: [
      "Accurate and compliant IFRS financial statements",
      "Smooth and well-managed standard transitions",
      "Reduced risk of material misstatements and audit qualifications",
      "Finance team capability building on complex standards",
      "Objective second opinions on complex accounting judgements",
    ],
    industries: ["Banking", "Insurance", "Listed Companies", "NGOs", "Investment Funds", "Multinationals"],
  },
  "esg-sustainability": {
    title: "ESG &",
    label: "ESG & Sustainability",
    titleHighlight: "Sustainability",
    description: "ESG strategy development, sustainability reporting, and stakeholder engagement frameworks — positioning your organisation for a sustainable future.",
    overview: "Environmental, Social, and Governance (ESG) factors are rapidly becoming central to investment decisions, regulatory expectations, and stakeholder demands in East Africa and globally. Our ESG & Sustainability practice helps organisations develop credible, actionable sustainability strategies and reporting frameworks aligned to GRI, ISSB, and other international standards.",
    challenges: [
      "Growing investor and development partner ESG disclosure requirements",
      "Lack of structured ESG frameworks and governance structures",
      "Climate risk assessment and integration into business strategy",
      "Supply chain ESG due diligence requirements",
      "Sustainability reporting aligned to GRI, ISSB, and TCFD frameworks",
    ],
    methodology: [
      "ESG materiality assessment and stakeholder engagement",
      "ESG strategy development and governance framework design",
      "Baseline ESG data collection and gap analysis",
      "Sustainability report preparation aligned to international standards",
      "ESG assurance and third-party verification support",
    ],
    benefits: [
      "Credible ESG strategy aligned to international frameworks",
      "Enhanced investor confidence and access to green finance",
      "Reduced regulatory and reputational ESG risk",
      "Stronger stakeholder relationships and social licence to operate",
      "Competitive differentiation in sustainability performance",
    ],
    industries: ["Listed Companies", "Banks", "NGOs", "Energy", "Real Estate", "Development Finance", "Multinationals"],
  },
  "cybersecurity-advisory": {
    title: "Cybersecurity",
    label: "Cybersecurity Advisory",
    titleHighlight: "Advisory",
    description: "Cybersecurity risk assessments, framework development, and digital resilience strategies — protecting your organisation in an increasingly digital world.",
    overview: "As organisations in East Africa accelerate their digital transformation, cybersecurity risks are growing in complexity and impact. Our Cybersecurity Advisory practice helps organisations assess their cyber risk posture, develop robust security frameworks, and build digital resilience — enabling them to operate with confidence in a connected environment.",
    challenges: [
      "Rapidly evolving cyber threat landscape targeting East African organisations",
      "CBK and other regulatory cybersecurity compliance requirements",
      "Inadequate cybersecurity governance and board oversight",
      "Weak incident response planning and business continuity frameworks",
      "Third-party and supply chain cybersecurity risks",
    ],
    methodology: [
      "Cybersecurity maturity assessment against NIST and ISO 27001 frameworks",
      "Vulnerability assessment and penetration testing coordination",
      "Cybersecurity governance framework design",
      "Incident response plan development and tabletop exercises",
      "Board and management cybersecurity awareness training",
    ],
    benefits: [
      "Clear view of current cyber risk exposure and maturity",
      "Prioritised roadmap to improve cybersecurity posture",
      "Regulatory compliance with CBK and sector cybersecurity guidelines",
      "Board confidence in cybersecurity governance and oversight",
      "Reduced risk of data breaches and operational disruptions",
    ],
    industries: ["Banking", "Insurance", "Telecoms", "Technology", "Healthcare", "Public Sector", "Retail"],
  },
  "public-sector-advisory": {
    title: "Public Sector",
    label: "Public Sector Advisory",
    titleHighlight: "Advisory",
    description: "Specialised advisory for government agencies, SOEs, devolved units, and development organisations — strengthening accountability and public value delivery.",
    overview: "The public sector in Kenya operates within a complex web of regulations, accountability requirements, and development mandates. Our Public Sector Advisory practice brings deep expertise in public financial management, devolution governance, SOE oversight, and development partner reporting — helping government institutions deliver better outcomes for citizens.",
    challenges: [
      "PFMA compliance and public finance management reforms",
      "County government governance and accountability frameworks",
      "State corporation performance management and oversight",
      "Development partner audit and reporting requirements",
      "Strengthening internal controls and reducing fiscal risks",
    ],
    methodology: [
      "Public financial management assessments (PEFA, PFMR frameworks)",
      "Devolution support and county capacity building",
      "SOE governance reviews and performance improvement planning",
      "Development partner compliance audit and reporting",
      "Internal audit transformation for public institutions",
    ],
    benefits: [
      "Improved public financial management and accountability",
      "Compliance with PFM Act, PFMR regulations, and audit requirements",
      "Stronger county governance and service delivery",
      "Enhanced development partner confidence and continued funding",
      "Reduced risk of qualified audit opinions and financial mismanagement",
    ],
    industries: ["National Government", "County Governments", "State Corporations", "NGOs", "Development Finance", "Parastatals"],
  },
  "financial-advisory": {
    title: "Financial",
    label: "Financial Advisory",
    titleHighlight: "Advisory",
    description: "Mergers, acquisitions, business valuations, debt restructuring, and transaction advisory — supporting your most critical financial decisions.",
    overview: "Major financial decisions require independent, objective, and technically rigorous advisory. Our Financial Advisory practice provides valuations, transaction support, restructuring advisory, and financial due diligence to help organisations navigate complex financial events with confidence — from acquisitions and mergers to restructurings and fundraising.",
    challenges: [
      "Complex business valuations for M&A transactions and regulatory purposes",
      "Financial due diligence gaps in acquisition processes",
      "Corporate debt restructuring and financial distress situations",
      "Fundraising and investor readiness for growth-stage companies",
      "Post-merger integration financial management",
    ],
    methodology: [
      "Business valuation using DCF, market, and asset-based approaches",
      "Financial and commercial due diligence for acquisitions",
      "Debt structuring and restructuring advisory",
      "Financial modelling and scenario analysis",
      "Transaction support from term sheet through to completion",
    ],
    benefits: [
      "Independent and defensible business valuations",
      "Reduced transaction risk through thorough due diligence",
      "Optimal financing structures for growth and stability",
      "Expert support through complex financial transactions",
      "Actionable financial intelligence for board decision-making",
    ],
    industries: ["Private Equity", "Listed Companies", "Financial Services", "Real Estate", "Energy", "Multinationals", "SMEs"],
  },
  "sme-advisory": {
    title: "SME",
    label: "SME Advisory",
    titleHighlight: "Advisory",
    description: "Tailored advisory services designed for growing SMEs — financial management, governance, and strategic planning for the next stage of growth.",
    overview: "Small and medium enterprises are the backbone of Kenya's economy, yet they often lack access to the professional advisory services that larger organisations take for granted. Our SME Advisory practice brings enterprise-grade financial, governance, and strategic advisory to growing businesses — at a scale and price point that makes sense.",
    challenges: [
      "Lack of structured financial management and reporting systems",
      "KRA compliance challenges including VAT, PAYE, and corporate tax",
      "Weak governance structures and overdependence on founders",
      "Difficulty accessing bank finance and investor funding",
      "Scaling operations and managing rapid growth sustainably",
    ],
    methodology: [
      "SME financial health check and improvement planning",
      "Tax compliance review and regularisation support",
      "Financial reporting systems implementation",
      "Board and governance advisory for growing businesses",
      "Strategic planning and business advisory for growth stages",
    ],
    benefits: [
      "Professional financial management at SME-appropriate scale",
      "Full KRA and regulatory tax compliance",
      "Improved financial reporting quality for bank and investor access",
      "Governance frameworks that support growth and succession",
      "Credible financial projections for fundraising and lending",
    ],
    industries: ["SMEs", "Family Businesses", "Start-ups", "Manufacturing", "Retail", "Healthcare", "Technology"],
  },
  "bookkeeping": {
    title: "Bookkeeping",
    label: "Bookkeeping Services",
    titleHighlight: "Services",
    description: "Accurate, professional bookkeeping and financial management services that keep your business compliant, informed, and in control.",
    overview: "Reliable bookkeeping is the foundation of sound financial management. Our Bookkeeping Services practice provides accurate, timely, and professional bookkeeping for SMEs and growing businesses — freeing owners and managers to focus on running their organisations while we keep the numbers right.",
    challenges: [
      "Inaccurate and outdated financial records leading to poor decisions",
      "KRA compliance failures due to poor bookkeeping and late returns",
      "Inability to produce management accounts for bank or investor meetings",
      "PAYE, VAT, and NSSF/NHIF compliance burden for busy business owners",
      "Payroll errors causing employee dissatisfaction and legal risk",
    ],
    methodology: [
      "Chart of accounts setup and accounting software implementation",
      "Monthly bookkeeping and bank reconciliation",
      "Payroll processing, PAYE, NSSF, and NHIF management",
      "VAT and withholding tax return preparation and filing",
      "Monthly management accounts and financial reporting",
    ],
    benefits: [
      "Accurate and up-to-date financial records at all times",
      "Full KRA compliance and timely statutory filings",
      "Monthly management accounts for informed decision-making",
      "Payroll accuracy and employee statutory compliance",
      "Cost-effective alternative to a full-time finance team",
    ],
    industries: ["SMEs", "Retail", "Hospitality", "Healthcare", "Professional Services", "NGOs", "Start-ups"],
  },
};

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
