import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { IndustryDetail } from "@/components/industries/IndustryDetail";

const industryData: Record<string, {
  name: string;
  headline: string;
  description: string;
  overview: string;
  challenges: string[];
  ourApproach: string[];
  keyServices: string[];
  whyUs: string[];
}> = {
  banking: {
    name: "Banking & Financial Services",
    headline: "Banking & Financial Services",
    description: "Audit, governance, risk, and compliance advisory tailored to Kenya's banking sector regulatory environment — helping financial institutions build trust and resilience.",
    overview: "Kenya's banking sector operates under rigorous CBK oversight and increasingly complex international standards. We provide specialist audit, risk, and advisory services that help financial institutions meet their regulatory obligations, strengthen governance, and build the stakeholder confidence essential to their business.",
    challenges: [
      "CBK Prudential Guidelines and Banking Act compliance",
      "IFRS 9 Expected Credit Loss model implementation and validation",
      "Credit risk governance and non-performing loan management",
      "AML/CFT framework implementation and regulatory reporting",
      "Cybersecurity and operational risk in digital banking",
      "IFRS 7 and Pillar III market discipline disclosures",
    ],
    ourApproach: [
      "Deep understanding of CBK regulatory frameworks and circulars",
      "ECL model advisory and independent model validation",
      "Risk-based audit methodology aligned to banking risk profiles",
      "Governance advisory benchmarked to IFC and BCBS standards",
      "Continuous monitoring of CBK and global banking regulatory developments",
    ],
    keyServices: ["Audit & Assurance", "Risk & Compliance", "IFRS Advisory", "Governance Advisory", "Internal Audit", "Cybersecurity Advisory"],
    whyUs: [
      "ICPAK-registered professionals with deep banking sector experience",
      "Track record with commercial banks, development finance institutions, and microfinance",
      "International standard advisory delivered with Kenyan regulatory context",
    ],
  },
  insurance: {
    name: "Insurance",
    headline: "Insurance Sector",
    description: "Technical insurance audit, IFRS 17 implementation support, and actuarial-aligned advisory for underwriters, brokers, and reinsurers across East Africa.",
    overview: "The insurance industry faces significant transformation — from IFRS 17 implementation to evolving IRA regulatory requirements. Our team brings specialised insurance expertise to audit, governance, and advisory engagements, helping underwriters and brokers navigate complexity and maintain stakeholder confidence.",
    challenges: [
      "IFRS 17 Insurance Contracts transition and implementation",
      "IRA regulatory compliance and prudential reporting",
      "Reserving adequacy and actuarial alignment in audit",
      "Policyholder fund governance and investments oversight",
      "Distribution channel governance and market conduct",
      "Digital insurance and InsurTech risk management",
    ],
    ourApproach: [
      "Insurance-specialist audit teams with actuarial collaboration",
      "IFRS 17 transition roadmap development and implementation support",
      "IRA regulatory filing review and compliance assurance",
      "Governance framework development for insurance boards",
      "Risk management framework design aligned to IRA guidelines",
    ],
    keyServices: ["IFRS Advisory", "Audit & Assurance", "Risk & Compliance", "Governance Advisory", "Internal Audit"],
    whyUs: [
      "Experience across life, general, and composite insurers",
      "IFRS 17 transition expertise from early-adopter engagements",
      "Deep IRA regulatory knowledge and established relationships",
    ],
  },
  "public-sector": {
    name: "Public Sector & Government",
    headline: "Public Sector & Government",
    description: "Public financial management, performance audit, and governance advisory for ministries, counties, state corporations, and development organisations across Kenya.",
    overview: "Kenya's public sector operates under the PFM Act, PFMR regulations, and an increasingly demanding accountability environment. We support government institutions, counties, and state corporations to strengthen financial management, governance, and service delivery — delivering advisory that is technically rigorous and practically grounded in the Kenyan public sector context.",
    challenges: [
      "PFMA compliance and Public Finance Management Regulations",
      "County government governance, accountability, and intergovernmental transfers",
      "State corporation performance management and board oversight",
      "Development partner audit requirements and grant management",
      "Strengthening internal audit and internal controls in public institutions",
      "IPSAS adoption and public sector financial reporting",
    ],
    ourApproach: [
      "PEFA and PFM assessment frameworks for diagnostics",
      "County capacity building and devolution governance support",
      "SOE governance reviews against State Corporations Act requirements",
      "Development partner compliance audit to donor standards",
      "Internal audit function transformation and capacity building",
    ],
    keyServices: ["Public Sector Advisory", "Internal Audit", "Governance Advisory", "Audit & Assurance", "Risk & Compliance"],
    whyUs: [
      "Extensive experience with Kenyan national and county government engagements",
      "Understanding of Kenya's devolution framework and PFMA requirements",
      "Development partner audit experience including World Bank, UN, EU, and bilateral donors",
    ],
  },
  "ngo-not-for-profit": {
    name: "NGOs & Not-for-Profit",
    headline: "NGOs & Not-for-Profit",
    description: "Donor compliance audit, governance frameworks, and financial management advisory for development organisations, foundations, and community-based organisations.",
    overview: "Kenya's vibrant civil society sector faces unique financial management and governance challenges — balancing donor compliance requirements with effective programme delivery. Our NGO & Not-for-Profit practice provides audit, governance, and financial advisory services that help development organisations maintain donor confidence and deliver impact.",
    challenges: [
      "Donor compliance audit to international donor standards",
      "NGO Board of Kenya registration and compliance",
      "Grant management systems and financial reporting to multiple donors",
      "Board governance and fiduciary accountability",
      "Financial sustainability planning and reserves management",
      "Programme and project audit requirements",
    ],
    ourApproach: [
      "Audit to donor standards including USAID, DFID, EU, and UN requirements",
      "Governance framework development aligned to NGO best practice",
      "Grant management system advisory and financial controls review",
      "NGO Board registration support and annual compliance",
      "Capacity building for finance teams in development organisations",
    ],
    keyServices: ["Audit & Assurance", "Governance Advisory", "Internal Audit", "Tax Advisory", "Financial Advisory"],
    whyUs: [
      "Experience with over 50 development organisations across Kenya and East Africa",
      "Knowledge of major international donor requirements and audit standards",
      "Sensitivity to the programme-focused culture of the development sector",
    ],
  },
  healthcare: {
    name: "Healthcare & Life Sciences",
    headline: "Healthcare & Life Sciences",
    description: "Audit, tax, and governance advisory for hospitals, clinics, pharmaceutical companies, and health sector organisations across Kenya and East Africa.",
    overview: "Kenya's healthcare sector is experiencing rapid growth and increasing regulatory complexity. From private hospital groups to pharmaceutical distributors and health sector NGOs, our practice provides audit, tax, and governance advisory tailored to the specific challenges of healthcare organisations.",
    challenges: [
      "Healthcare regulatory compliance (MOH, PPB, NHIF requirements)",
      "Healthcare governance and clinical governance integration",
      "Cost management and financial sustainability in healthcare",
      "Research fund management and donor compliance for health NGOs",
      "Tax compliance for healthcare organisations including exemptions",
      "Supply chain integrity and pharmaceutical procurement audit",
    ],
    ourApproach: [
      "Healthcare-specific audit methodology covering clinical and financial processes",
      "Tax advisory including VAT exemption planning for healthcare entities",
      "Governance framework development for hospital boards and trustees",
      "NHIF reimbursement compliance and claims audit support",
      "ESG advisory integrating healthcare social impact reporting",
    ],
    keyServices: ["Audit & Assurance", "Tax Advisory", "Governance Advisory", "ESG & Sustainability", "Internal Audit"],
    whyUs: [
      "Experience across private hospitals, mission health facilities, and health sector NGOs",
      "Knowledge of Kenya's healthcare regulatory environment",
      "Sensitivity to the public interest nature of healthcare delivery",
    ],
  },
  "real-estate": {
    name: "Real Estate & Construction",
    headline: "Real Estate & Construction",
    description: "Tax structuring, audit, and financial advisory for property developers, REITs, housing institutions, and construction companies across East Africa.",
    overview: "Kenya's real estate sector is one of East Africa's most dynamic, yet it faces specific tax, audit, and financing challenges. Our Real Estate & Construction practice provides specialist advisory across the property value chain — from development financing to REIT compliance and project completion audits.",
    challenges: [
      "Capital gains tax and stamp duty structuring for property transactions",
      "REIT compliance and CMA regulatory requirements",
      "Project finance audit and contractor payment certification",
      "VAT treatment of construction and property transactions",
      "Transfer pricing for multinational property groups",
      "Property valuation and IFRS reporting for investment properties",
    ],
    ourApproach: [
      "Tax structuring for property acquisition, development, and disposal",
      "REIT compliance advisory and CMA regulatory support",
      "Project audit methodology for construction contracts",
      "IFRS 16 and IAS 40 advisory for property leases and investments",
      "Financial due diligence for property acquisitions",
    ],
    keyServices: ["Tax Advisory", "Audit & Assurance", "Financial Advisory", "Bookkeeping Services", "IFRS Advisory"],
    whyUs: [
      "Track record with listed property companies, REIT managers, and developers",
      "Deep knowledge of Kenya's stamp duty, CGT, and VAT frameworks",
      "Financial modelling capability for complex development projects",
    ],
  },
  energy: {
    name: "Energy & Natural Resources",
    headline: "Energy & Natural Resources",
    description: "Specialised audit, ESG reporting, and regulatory compliance advisory for energy, mining, and natural resource companies operating in East Africa.",
    overview: "Kenya's energy sector — from renewable energy projects to petroleum and mining — operates under complex regulatory frameworks and increasing ESG expectations. Our Energy & Natural Resources practice brings technical depth to audit, tax, and sustainability advisory for energy companies, project developers, and resource sector investors.",
    challenges: [
      "EPRA, ERC, and NEMA regulatory compliance requirements",
      "ESG reporting aligned to GRI and ISSB for energy companies",
      "Revenue management and production sharing agreement audit",
      "Joint venture and project finance audit complexity",
      "Carbon accounting and climate-related financial disclosure",
      "Transfer pricing for multinational energy groups",
    ],
    ourApproach: [
      "Sector-specific audit methodology for energy and resource companies",
      "ESG framework development and GRI/TCFD reporting support",
      "Production sharing agreement compliance and government audit support",
      "Joint venture accounting advisory and audit",
      "Carbon accounting and Scope 1, 2, 3 emissions measurement",
    ],
    keyServices: ["Audit & Assurance", "ESG & Sustainability", "Tax Advisory", "Risk & Compliance", "Financial Advisory"],
    whyUs: [
      "Experience with renewable energy developers, IPPs, and petroleum companies",
      "Knowledge of Kenya and East Africa energy regulatory frameworks",
      "ESG advisory aligned to international climate disclosure standards",
    ],
  },
  technology: {
    name: "Technology & Telecoms",
    headline: "Technology & Telecoms",
    description: "Cybersecurity risk, tax advisory, and financial audit for technology companies, telecoms operators, and digital businesses across East Africa.",
    overview: "Kenya is East Africa's technology hub, with a vibrant ecosystem of software companies, telecoms operators, fintech firms, and digital start-ups. Our Technology & Telecoms practice provides audit, cybersecurity advisory, and tax services tailored to the specific challenges and rapid growth of digital businesses.",
    challenges: [
      "Digital services tax and VAT on digital platforms",
      "Cybersecurity risk management and regulatory compliance (CA-K, CBK)",
      "Software revenue recognition under IFRS 15",
      "Data protection compliance (ODPC) and privacy governance",
      "Transfer pricing for IP holding structures and intercompany royalties",
      "M-Pesa and mobile money regulatory compliance for fintechs",
    ],
    ourApproach: [
      "Cybersecurity maturity assessment and framework implementation",
      "Digital tax advisory including DST, VAT on digital services, and transfer pricing",
      "Revenue recognition advisory for SaaS and software companies",
      "Data protection audit and ODPC compliance review",
      "Audit methodology adapted to technology company business models",
    ],
    keyServices: ["Cybersecurity Advisory", "Tax Advisory", "Audit & Assurance", "Risk & Compliance", "IFRS Advisory"],
    whyUs: [
      "Experience with Kenyan tech companies, fintechs, and telecoms operators",
      "Understanding of Kenya's digital tax and regulatory environment",
      "Cybersecurity advisory aligned to NIST, ISO 27001, and CBK guidelines",
    ],
  },
  "private-equity": {
    name: "Private Equity & Investment",
    headline: "Private Equity & Investment",
    description: "Due diligence, portfolio company audit, and tax structuring advisory for private equity firms, venture capital funds, and investment managers.",
    overview: "East Africa's private equity sector has matured significantly, with investors deploying capital across diverse sectors. Our Financial Advisory and Audit practices support PE funds and their portfolio companies with transaction due diligence, fund audit, portfolio governance, and tax structuring advisory.",
    challenges: [
      "Financial and commercial due diligence for acquisitions",
      "Fund accounting, LP reporting, and fund audit",
      "Portfolio company governance improvement and performance monitoring",
      "Tax structuring for fund formation and exit planning",
      "ESG due diligence and impact measurement for development finance investors",
      "IFRS reporting and valuation for portfolio companies",
    ],
    ourApproach: [
      "Financial due diligence with commercial insight and red-flag identification",
      "Fund audit and LP reporting aligned to ILPA standards",
      "Portfolio company governance assessment and improvement advisory",
      "Exit readiness preparation and vendor due diligence",
      "Impact measurement and ESG reporting for development finance LPs",
    ],
    keyServices: ["Financial Advisory", "Audit & Assurance", "Tax Advisory", "Governance Advisory", "ESG & Sustainability"],
    whyUs: [
      "Track record with PE funds, development finance institutions, and portfolio companies",
      "Cross-sector due diligence expertise across East Africa",
      "Understanding of development finance ESG and impact requirements",
    ],
  },
  retail: {
    name: "Retail & Consumer",
    headline: "Retail & Consumer",
    description: "Audit, tax compliance, and financial advisory for retail chains, FMCG companies, consumer brands, and distribution businesses across Kenya.",
    overview: "Kenya's retail and consumer sector is undergoing rapid transformation driven by changing consumer preferences, e-commerce growth, and competitive pressure. Our Retail & Consumer practice provides audit, tax, and internal control advisory tailored to the specific challenges of product-based businesses.",
    challenges: [
      "Inventory management controls and stock loss prevention",
      "VAT compliance on mixed-rate product portfolios",
      "Transfer pricing for multinational FMCG groups",
      "Franchise and licensing arrangement audit",
      "Supply chain risk management and procurement controls",
      "E-commerce and digital sales tax compliance",
    ],
    ourApproach: [
      "Inventory audit methodology and shrinkage analysis",
      "VAT advisory and compliance for complex product mixes",
      "Transfer pricing documentation for FMCG multinationals",
      "Internal audit of procurement, inventory, and sales processes",
      "Financial due diligence for retail sector acquisitions",
    ],
    keyServices: ["Audit & Assurance", "Tax Advisory", "Bookkeeping Services", "Internal Audit", "Risk & Compliance"],
    whyUs: [
      "Experience with retail chains, FMCG distributors, and consumer brands",
      "Inventory audit expertise and understanding of retail business models",
      "Transfer pricing capability for multinational consumer companies",
    ],
  },
  saccos: {
    name: "SACCOs & Microfinance",
    headline: "SACCOs & Microfinance",
    description: "SASRA compliance audit, governance frameworks, and financial management advisory for deposit-taking SACCOs and microfinance institutions.",
    overview: "Kenya's SACCO sector is a critical pillar of financial inclusion, serving millions of Kenyans across farming, teaching, and other sectors. Our SACCO & Microfinance practice provides audit, governance, and risk advisory services aligned to SASRA requirements and SACCO movement best practice.",
    challenges: [
      "SASRA regulatory compliance and DT-SACCO prudential guidelines",
      "Loan portfolio quality management and provisioning adequacy",
      "SACCO board governance and member accountability",
      "Capital adequacy and liquidity management",
      "FOSA operations audit and controls",
      "Transition to IFRS 9 for DT-SACCOs",
    ],
    ourApproach: [
      "SASRA-aligned audit methodology for deposit-taking SACCOs",
      "Loan portfolio review and provisioning adequacy assessment",
      "Governance framework aligned to SASRA and Sacco Societies Act",
      "Capital adequacy modelling and stress testing",
      "FOSA operations audit and internal controls review",
    ],
    keyServices: ["Audit & Assurance", "Governance Advisory", "Risk & Compliance", "Internal Audit", "IFRS Advisory"],
    whyUs: [
      "Extensive experience with DT-SACCOs and non-withdrawable SACCOs",
      "Deep SASRA regulatory knowledge and compliance expertise",
      "Understanding of the cooperative movement and SACCO member accountability",
    ],
  },
  manufacturing: {
    name: "Manufacturing",
    headline: "Manufacturing",
    description: "Audit, costing review, and tax advisory for manufacturing companies operating in Kenya's industrial and agro-processing sectors.",
    overview: "Kenya's manufacturing sector — from food processing to pharmaceuticals and industrial manufacturing — faces unique audit, tax, and operational risk challenges. Our Manufacturing practice brings sector-specific expertise to audit, excise duty management, and internal controls for industrial companies.",
    challenges: [
      "Cost audit and overhead allocation methodology",
      "Excise duty compliance and KRA compliance management",
      "Transfer pricing for inputs, finished goods, and management fees",
      "Supply chain risk management and procurement controls",
      "Environmental compliance and ESG reporting",
      "EPC contract audit for capital project management",
    ],
    ourApproach: [
      "Manufacturing-specific audit methodology covering production and costing",
      "Excise duty advisory and KRA dispute resolution",
      "Transfer pricing documentation for manufacturing multinationals",
      "Internal controls review for procurement and production processes",
      "EPC contract audit and capital project controls review",
    ],
    keyServices: ["Audit & Assurance", "Tax Advisory", "Internal Audit", "Bookkeeping Services", "Risk & Compliance"],
    whyUs: [
      "Experience with food manufacturers, pharmaceutical producers, and industrial companies",
      "Excise duty expertise and KRA representation capability",
      "Understanding of manufacturing cost structures and operational risk",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(industryData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryData[slug];
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name} | CPA Otene`,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industryData[slug];
  if (!industry) notFound();

  return (
    <>
      <PageHero
        label="Industry Expertise"
        title={industry.headline.split(" ").slice(0, -1).join(" ")}
        titleHighlight={industry.headline.split(" ").slice(-1)[0]}
        description={industry.description}
        breadcrumbs={[
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        cta={{ label: "Request Advisory", href: "/contact" }}
      />
      <IndustryDetail industry={industry} />
    </>
  );
}
