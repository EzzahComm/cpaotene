import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { InsightArticle } from "@/components/insights/InsightArticle";

const insightData: Record<string, {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorTitle: string;
  body: string[];
  keyTakeaways: string[];
  relatedSlugs: string[];
}> = {
  "esg-imperative-kenyan-boards": {
    category: "ESG",
    title: "The ESG Imperative: Why Kenyan Boards Must Act Now",
    excerpt: "Environmental, social, and governance factors are rapidly becoming central to investor decisions and regulatory expectations in East Africa.",
    date: "February 12, 2025",
    readTime: "7 min read",
    author: "ESG Practice Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "ESG is no longer optional — investors, development partners, and regulators are demanding disclosure",
      "Kenya's listed companies face growing pressure from NSE and institutional investors on ESG reporting",
      "Early adopters of ESG frameworks are gaining competitive advantage in accessing green finance",
      "The ISSB's IFRS S1 and S2 standards are setting the global baseline for sustainability disclosure",
      "Boards need to own ESG strategy — not delegate it entirely to management",
    ],
    body: [
      "For most Kenyan boards, ESG was until recently a peripheral concern — a box to tick in annual reports, or a section delegated to the communications team. That era is ending. Rapidly.",
      "Across East Africa, the pressure on boards to take environmental, social, and governance matters seriously has intensified dramatically. Development finance institutions — from IFC to FMO, the African Development Bank to PROPARCO — are making ESG performance a condition of investment and lending. International institutional investors are applying ESG screens to their African portfolios. And regulators, from the Nairobi Securities Exchange to the Capital Markets Authority, are progressively strengthening ESG disclosure requirements.",
      "The question for Kenyan boards is no longer whether to take ESG seriously. It is whether to lead or to follow.",

      "**What Is Driving the ESG Imperative?**",

      "Several forces are converging to make ESG a board-level priority across East Africa:",

      "First, international capital flows are increasingly ESG-conditional. The majority of foreign institutional investment now flows through funds with ESG mandates. Development finance institutions — which provide a significant share of long-term capital to East African businesses — are applying increasingly rigorous ESG due diligence. Organisations that cannot demonstrate credible ESG governance are simply excluded from these capital pools.",

      "Second, the regulatory environment is tightening. The Nairobi Securities Exchange's ESG disclosure guidelines for listed companies have created an expectation of structured sustainability reporting. The Capital Markets Authority's corporate governance code emphasises board responsibility for ESG matters. And globally, the International Sustainability Standards Board's IFRS S1 (general sustainability disclosures) and IFRS S2 (climate-related disclosures) are rapidly becoming the new baseline — Kenyan companies with international operations or cross-listed securities will face these standards sooner than they expect.",

      "Third, stakeholder expectations have shifted. Employees — particularly younger professionals — increasingly choose employers based on their sustainability commitments. Customers are scrutinising supply chain practices. Communities are more vocal about corporate social and environmental impacts. Boards that ignore these shifts do so at the cost of their social licence to operate.",

      "**The Board's Role in ESG**",

      "ESG is fundamentally a governance matter — which makes it a board responsibility. Yet in most Kenyan organisations, ESG strategy is either absent or managed entirely by management without meaningful board oversight. This creates significant risk.",

      "Effective board ESG governance involves several elements: a clear board-level mandate for ESG oversight (typically through an existing committee or a dedicated ESG/sustainability committee); regular reporting to the board on material ESG risks and opportunities; integration of ESG performance metrics into executive remuneration; and transparent external disclosure through an annual sustainability report.",

      "Boards also need to build their own ESG literacy. Directors who cannot engage meaningfully with climate risk, social impact, or governance quality metrics cannot effectively oversee management's ESG performance. This requires targeted director education and, where necessary, bringing ESG expertise onto the board.",

      "**Climate Risk: The Urgent Priority**",

      "Among ESG topics, climate risk demands particular board attention. The Task Force on Climate-related Financial Disclosures (TCFD) framework — now incorporated into IFRS S2 — provides a structured approach to assessing and disclosing climate-related risks and opportunities across four pillars: governance, strategy, risk management, and metrics and targets.",

      "For East African companies, physical climate risks (drought, flooding, extreme weather events) are particularly material — affecting agricultural supply chains, infrastructure, and operational resilience. Transition risks — those arising from the shift to a low-carbon economy — affect energy-intensive industries, financial institutions with carbon-exposed loan portfolios, and companies dependent on fossil fuels.",

      "Boards need to ensure that management has assessed the organisation's exposure to both physical and transition climate risks, and that these assessments inform strategic planning and capital allocation decisions.",

      "**A Practical Starting Point**",

      "For boards that are early in their ESG journey, the starting point is a materiality assessment — a structured process to identify the ESG topics that are most significant to the organisation's stakeholders and most material to its business performance. This assessment should involve board members, senior management, investors, customers, employees, and community representatives.",

      "From the materiality assessment, the board can develop an ESG strategy that focuses on the issues that matter most — setting measurable targets, allocating resources, and establishing governance structures. The first external ESG report need not be perfect; it must be credible, transparent, and improving year on year.",

      "The boards that start this journey now will be better positioned for capital access, regulatory compliance, and stakeholder trust as ESG requirements intensify across East Africa. Those that wait may find themselves locked out of the most valuable sources of long-term capital.",
    ],
    relatedSlugs: ["board-governance-kenya-2025", "kenya-tax-reform-2025"],
  },
  "kenya-tax-reform-2025": {
    category: "Tax",
    title: "Kenya Tax Reform 2025: Key Changes Every CFO Must Know",
    excerpt: "A comprehensive analysis of the latest tax amendments and their critical implications for corporate taxpayers operating in Kenya.",
    date: "January 28, 2025",
    readTime: "5 min read",
    author: "Tax Advisory Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "The Finance Act 2024 introduces significant changes to corporate income tax, VAT, and excise duty",
      "Digital services tax provisions have been strengthened with new enforcement mechanisms",
      "Transfer pricing documentation requirements have been enhanced — multinationals must review their positions",
      "New WHT rules affect cross-border service payments and management fee arrangements",
      "CFOs should conduct a comprehensive tax health check in Q1 2025 to assess exposure",
    ],
    body: [
      "Kenya's tax landscape is undergoing significant reform, with the Finance Act 2024 introducing changes that every CFO and tax director in the country needs to understand and respond to. This analysis highlights the most critical provisions and their practical implications for corporate taxpayers.",

      "**Corporate Income Tax: Key Changes**",

      "The most significant change for corporate taxpayers is the revision to the deductibility of management and professional fees paid to non-resident associates. The Kenya Revenue Authority has significantly tightened the documentation required to support the deductibility of these payments, and is increasingly challenging arrangements where fees are paid without demonstrable substance in the recipient jurisdiction.",

      "CFOs should ensure that all intercompany service arrangements are underpinned by written agreements, clear descriptions of the services provided, evidence of delivery, and pricing that is consistent with the arm's length standard. Arrangements that cannot meet this standard face the risk of disallowance on audit.",

      "**Digital Services Tax: Enhanced Enforcement**",

      "Kenya's digital services tax — applicable to non-resident companies providing digital services to Kenyan users — has been strengthened with new enforcement provisions. The KRA has enhanced its ability to detect and pursue non-compliant foreign digital service providers, and has issued updated guidance on the scope of the tax.",

      "Kenyan companies that use digital services from non-resident providers should review their withholding tax obligations carefully. The obligation to withhold and remit tax on payments for digital services from non-resident providers rests with the Kenyan payer.",

      "**VAT: Treatment of Financial Services**",

      "The Finance Act 2024 has clarified the VAT treatment of certain financial services, with implications for banks, insurance companies, and other financial institutions. The Act has also introduced changes to the VAT refund process, with new timelines and documentation requirements that claimants should review carefully.",

      "**Transfer Pricing: Strengthened Documentation Requirements**",

      "Kenya's transfer pricing regulations have been updated to bring them closer to OECD guidelines. Multinationals operating in Kenya must now maintain a three-tiered documentation structure: a master file, a local file, and country-by-country reporting (for groups above the CbCR threshold).",

      "The KRA has significantly increased its transfer pricing audit activity, and is showing particular interest in cross-border royalty payments, management fee arrangements, and the pricing of goods transfers within multinational groups. CFOs should ensure that their transfer pricing documentation is current, defensible, and consistent with the group's global transfer pricing policy.",

      "**What CFOs Should Do Now**",

      "The breadth of changes in the Finance Act 2024 makes a comprehensive tax health check essential for all corporate taxpayers. This should cover corporate income tax compliance and documentation, VAT compliance including any refund claims, transfer pricing documentation adequacy, digital services tax obligations, and withholding tax on cross-border payments.",

      "Organisations that identify gaps should develop a prioritised remediation plan — addressing the highest-risk areas first. Early voluntary disclosure of errors, where appropriate, can significantly reduce the penalties and interest that arise on KRA audit.",
    ],
    relatedSlugs: ["esg-imperative-kenyan-boards", "ifrs-9-expected-credit-loss"],
  },
  "ifrs-17-implementation-lessons": {
    category: "IFRS",
    title: "IFRS 17 Implementation: Lessons from Early Adopters",
    excerpt: "Insights from insurance sector IFRS 17 implementations across East Africa, with practical recommendations for organisations still in transition.",
    date: "January 15, 2025",
    readTime: "8 min read",
    author: "IFRS Advisory Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "IFRS 17 fundamentally changes how insurance contracts are measured and presented — it is not just an accounting exercise",
      "Data quality is the biggest implementation challenge: many insurers are discovering data gaps they were unaware of",
      "System changes take longer than expected — allow significantly more time than initially planned",
      "Actuarial and finance team collaboration is essential and needs to start early",
      "The Contractual Service Margin concept requires careful understanding and robust modelling",
    ],
    body: [
      "IFRS 17 Insurance Contracts — effective for annual periods beginning on or after 1 January 2023 — represents the most significant change to insurance accounting in a generation. For insurers still navigating the transition or embedding the new standard, the experiences of early adopters offer valuable lessons.",

      "Having supported several East African insurers through IFRS 17 implementation, our team has observed consistent patterns in where implementations succeed and where they struggle. This article shares those observations.",

      "**Lesson 1: Data Quality Is the Critical Constraint**",

      "The most common — and most costly — discovery in IFRS 17 implementation is data quality gaps. IFRS 17 requires granular, contract-level data going back to the inception of in-force policies. Many insurers find that their legacy systems simply do not hold the data they need in the format required.",

      "Early adopters who invested upfront in comprehensive data assessment and remediation — even when this extended the implementation timeline — consistently achieved better outcomes than those who deferred this work. If you have not yet conducted a thorough data readiness assessment, this should be your immediate priority.",

      "**Lesson 2: Actuarial-Finance Integration Is Non-Negotiable**",

      "IFRS 17 sits at the intersection of actuarial science and financial reporting in a way that IFRS 4 never did. The Contractual Service Margin, the risk adjustment for non-financial risk, and the measurement approaches for General Measurement Model contracts all require close collaboration between actuarial and finance teams.",

      "Organisations that treated IFRS 17 as either a pure finance project (without adequate actuarial input) or a pure actuarial exercise (without adequate finance ownership) consistently struggled. Effective implementations had dedicated actuarial-finance working groups with clear joint accountability.",

      "**Lesson 3: The Contractual Service Margin Requires Deep Understanding**",

      "The Contractual Service Margin (CSM) — which represents unearned profit in insurance contracts — is one of IFRS 17's most distinctive concepts and one that many finance teams found hardest to internalise. Understanding how the CSM is established, how it is amortised, and how experience adjustments flow through the P&L or to the CSM is essential for competent IFRS 17 reporting.",

      "Boards and audit committees also need sufficient IFRS 17 literacy to provide effective oversight. Director education programmes should include dedicated IFRS 17 sessions for audit committee members.",

      "**Lesson 4: System Implementation Takes Longer Than Expected**",

      "Every insurer we have worked with has found that system implementation — whether adapting existing systems or implementing dedicated IFRS 17 calculation engines — took significantly longer than initially planned. Vendor delivery delays, data migration challenges, and integration complexity with existing actuarial and finance systems all contributed to extended timelines.",

      "For insurers still in implementation, building realistic schedule buffers is essential. Parallel running — producing IFRS 17 figures alongside the old basis — requires significant additional effort but is invaluable for building confidence in the new numbers.",

      "**Lesson 5: Engage Your Auditors Early and Often**",

      "The organisations with the smoothest audit processes engaged their external auditors early in the implementation — sharing key judgements, modelling approaches, and accounting policy choices as they were developed rather than presenting completed positions for audit. This enabled any auditor concerns to be addressed before they became audit issues, and built auditor confidence in the implementation.",

      "For insurers yet to complete their first full year of IFRS 17 reporting, we strongly recommend proactive engagement with your audit team on key judgements — particularly around the risk adjustment methodology, the level of aggregation for insurance contract groups, and the discount rate approach.",
    ],
    relatedSlugs: ["ifrs-9-expected-credit-loss", "board-governance-kenya-2025"],
  },
  "cybersecurity-risk-kenya-financial": {
    category: "Risk",
    title: "Cybersecurity Risk in the Kenyan Financial Sector",
    excerpt: "As digital banking accelerates, Kenyan financial institutions face mounting cyber threats. An analysis of the current landscape and recommended frameworks.",
    date: "December 10, 2024",
    readTime: "6 min read",
    author: "Risk Advisory Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "Cybercrime losses in Kenya's financial sector are growing rapidly with mobile money fraud as the leading threat vector",
      "CBK's cybersecurity guidelines require board-level cyber oversight — many banks are not yet compliant",
      "Third-party and supply chain cybersecurity risk is consistently underestimated",
      "Incident response planning is the most underdeveloped area in Kenyan financial institution cybersecurity",
      "ISO 27001 and NIST CSF provide complementary frameworks for building cyber resilience",
    ],
    body: [
      "Kenya's financial sector has undergone remarkable digital transformation. Mobile money, internet banking, agency banking, and digital lending have made financial services more accessible to millions of Kenyans — and created an expanded attack surface for cybercriminals.",

      "The consequences are increasingly visible. Reports of mobile money fraud, SIM swap attacks, and targeted attacks on banking systems appear regularly. The Communications Authority and the Central Bank of Kenya have both escalated their focus on cybersecurity governance in the financial sector. For boards and management teams, the question is no longer whether a cyber incident will occur, but whether the organisation is prepared to prevent, detect, respond to, and recover from one.",

      "**The Threat Landscape**",

      "Kenya's financial sector faces a diverse range of cyber threats. Mobile money fraud — including SIM swap, social engineering, and agent network compromise — continues to be the most prevalent and high-volume threat, with losses affecting both institutions and customers.",

      "More sophisticated threats include targeted attacks on core banking systems, ransomware deployment against financial institutions, and business email compromise targeting finance teams. The growth of open banking and API-based financial services creates new integration points that attackers actively probe for vulnerabilities.",

      "Third-party risk is a significant and often underestimated exposure. Core banking vendors, cloud service providers, fintech partners, and payment processors all represent potential entry points for attackers. The 2020 SolarWinds attack — which affected thousands of organisations globally through a compromised software update — demonstrated how devastating supply chain attacks can be.",

      "**CBK Regulatory Requirements**",

      "The Central Bank of Kenya's Guidance Note on Cybersecurity for Payment Service Providers (2020) and subsequent circulars have established a clear expectation: financial institutions must have board-approved cybersecurity strategies, dedicated cybersecurity functions, incident response plans, and regular cybersecurity assessments.",

      "In practice, compliance with these requirements varies significantly. Board-level cybersecurity governance — including regular cybersecurity reporting to the board, board awareness of material cyber risks, and board oversight of the cybersecurity strategy — is an area where many institutions fall short. Boards often receive cyber updates that are too technical to be actionable, or too infrequent to provide meaningful oversight.",

      "**Building Cyber Resilience: A Framework Approach**",

      "For financial institutions seeking to strengthen their cybersecurity posture, we recommend a framework-based approach combining the NIST Cybersecurity Framework (which provides a comprehensive structure across Identify, Protect, Detect, Respond, and Recover domains) with ISO 27001 (which provides a management system framework for information security).",

      "The starting point is a comprehensive cybersecurity maturity assessment — an honest evaluation of current capabilities against the framework, identifying gaps and prioritising remediation. This assessment should cover technical controls, governance and oversight, incident response readiness, third-party risk management, and staff awareness.",

      "From the assessment, a prioritised cybersecurity improvement roadmap can be developed — one that allocates limited resources to the highest-impact improvements and builds cyber resilience systematically over time.",

      "**Incident Response: The Critical Gap**",

      "The area where we consistently find the greatest gaps in Kenyan financial institutions is incident response. Most organisations have some form of incident response plan on paper; far fewer have tested it through simulation exercises, trained their response teams, and established clear communication protocols.",

      "A cyber incident is not the moment to discover that your incident response plan does not work. Regular tabletop exercises — simulating realistic attack scenarios and testing your organisation's response — are among the highest-value investments a financial institution can make in its cyber resilience.",
    ],
    relatedSlugs: ["board-governance-kenya-2025", "kenya-tax-reform-2025"],
  },
  "board-governance-kenya-2025": {
    category: "Governance",
    title: "Board Governance in Kenya: Trends and Challenges for 2025",
    excerpt: "A review of the governance landscape in Kenya — from regulatory requirements to emerging best practice for listed companies, NGOs, and public institutions.",
    date: "November 30, 2024",
    readTime: "9 min read",
    author: "Governance Advisory Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "Board diversity — gender, skills, and sector — remains a significant gap in Kenyan institutions",
      "Audit committee effectiveness is improving but independent financial expertise is still lacking in many boards",
      "ESG and cybersecurity are emerging as key board competency gaps requiring director education",
      "Succession planning for CEOs and key management roles is inadequately addressed by most Kenyan boards",
      "Stakeholder governance — going beyond shareholder primacy — is gaining traction across the region",
    ],
    body: [
      "Kenya's corporate governance landscape continues to evolve, driven by regulatory requirements, investor expectations, and the growing recognition among boards themselves that good governance is not merely a compliance exercise but a genuine driver of institutional performance.",

      "This article reviews the key governance trends and challenges facing Kenyan boards in 2025 — drawing on our experience advising boards across the financial services, NGO, listed company, and public sector.",

      "**Board Composition: Progress and Persistent Gaps**",

      "The most visible dimension of board governance is board composition — the mix of skills, experience, diversity, and independence that directors bring to the boardroom. Kenya has made meaningful progress on gender diversity, with the 30% gender requirement now embedded in listed company and state corporation governance codes. However, compliance remains uneven, and the quality of female board representation — ensuring that women directors are substantively engaged rather than nominally present — requires ongoing attention.",

      "Skills-based composition remains a challenge. Too many Kenyan boards are composed primarily of lawyers and accountants, without adequate representation of technology expertise, sector-specific domain knowledge, or international experience. In sectors like banking and insurance, where technology, cybersecurity, and IFRS are board-level concerns, this skills gap creates real governance risk.",

      "**Audit Committee Effectiveness**",

      "Audit committees are the cornerstone of board financial oversight, yet our experience suggests significant variation in their effectiveness. The most common gaps we observe are: insufficient financial expertise among audit committee members (the requirement for at least one independent member with recent, relevant financial experience is not always meaningfully met); inadequate time devoted to audit committee work (most audit committees meet four to six times per year, which is insufficient for meaningful oversight in complex institutions); and weak relationships between audit committees and internal audit functions.",

      "The most effective audit committees we have encountered share several characteristics: they meet more frequently than the minimum required; they have private sessions with internal and external auditors without management present; they have a clear annual work plan that goes beyond the financial statements; and their chair is genuinely expert in financial reporting and risk.",

      "**Emerging Governance Challenges: ESG and Cybersecurity**",

      "Two areas have emerged as significant governance gaps in Kenyan boards: ESG and cybersecurity. Both represent risks that are material to institutional performance and stakeholder confidence, yet neither is consistently embedded in board oversight frameworks.",

      "For ESG, the challenge is translating board commitment into structured oversight — with clear board-level ESG governance, regular management reporting on material ESG risks and performance, and transparent external disclosure. For cybersecurity, the challenge is ensuring that boards can engage meaningfully with an inherently technical topic — receiving cybersecurity briefings that are accessible and actionable, and providing effective oversight of management's cybersecurity strategy.",

      "**Succession Planning: The Governance Gap That Matters Most**",

      "Perhaps the most consequential governance gap in Kenyan institutions is succession planning — for CEOs, executive directors, and other key management roles. The departure of a key leader — planned or unplanned — can be deeply disruptive if the board has not ensured that talent pipelines and succession plans are in place.",

      "Best practice board governance requires that succession planning is a standing item on the board agenda — not a crisis response when departure is imminent. This includes identifying internal succession candidates, investing in their development, and maintaining an awareness of external talent that could be accessed if needed.",

      "**Looking Ahead: Stakeholder Governance**",

      "A significant trend in global governance thinking — and one that is gaining traction in East Africa — is the move toward stakeholder governance: the recognition that boards must consider the interests of employees, customers, communities, and the environment alongside those of shareholders or members. This is particularly relevant in Kenya's context, where businesses operate in communities with high expectations of corporate social contribution.",

      "The most forward-thinking Kenyan boards are beginning to formalise stakeholder engagement — including systematic processes for identifying and engaging key stakeholder groups, and integrating stakeholder perspectives into strategic decision-making. This is governance that goes beyond compliance to create genuine institutional legitimacy.",
    ],
    relatedSlugs: ["esg-imperative-kenyan-boards", "ifrs-17-implementation-lessons"],
  },
  "public-financial-management-devolution": {
    category: "Public Sector",
    title: "Strengthening PFM in Kenya's Devolved System",
    excerpt: "Analysis of public financial management challenges in Kenya's 47 counties and recommendations for improved accountability and service delivery.",
    date: "November 15, 2024",
    readTime: "10 min read",
    author: "Public Sector Advisory",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "Devolution has brought financial resources closer to communities but governance challenges persist in many counties",
      "Internal audit functions in county governments remain weak — most do not meet PPFMA standards",
      "Revenue enhancement is a major opportunity — many counties collect far less than their potential",
      "Controller of Budget reports show persistent budget absorption challenges affecting service delivery",
      "Technology adoption for PFM (IFMIS, eCitizen) is improving but implementation is uneven",
    ],
    body: [
      "A decade into devolution, Kenya's counties collectively manage over KES 400 billion annually in equitable share allocations and own-source revenues. This represents a historic shift of fiscal resources toward local governance — and with it, new accountability challenges.",

      "Our experience supporting county government PFM improvement, combined with analysis of Controller of Budget reports and OAG audit findings, paints a complex picture: meaningful progress in institutional capacity alongside persistent governance gaps that affect service delivery and public trust.",

      "**The PFM Framework: What Works and What Doesn't**",

      "The Public Finance Management Act, 2012 provides a comprehensive framework for county PFM — covering budget preparation, execution, accounting, reporting, and oversight. Implementation of this framework has been uneven across Kenya's 47 counties.",

      "Counties that have invested in PFM systems — including IFMIS integration, internal audit capacity, and audit committee establishment — show measurably better financial management outcomes. Counties that have not made these investments continue to attract qualified audit opinions, persistent budget absorption gaps, and recurring internal control failures.",

      "**Internal Audit: The Critical Weakness**",

      "Perhaps the most significant structural weakness in county PFM is the state of internal audit functions. The PPFMA requires each county to maintain an internal audit function that meets professional standards. In practice, most county internal audit departments are understaffed, underskilled, and insufficiently independent to provide meaningful assurance.",

      "Internal audit reports in county governments too frequently focus on compliance checking rather than risk-based audit, do not reach meaningful findings, and are not acted upon by county management. County audit committees — where they exist — often lack the expertise to drive improvements.",

      "Strengthening county internal audit requires investment in professional development, adequate staffing, and genuine independence from county executive departments. The IPPF standards provide a clear benchmark.",

      "**Revenue Enhancement: An Underexploited Opportunity**",

      "Most Kenyan counties collect significantly less own-source revenue than their economic potential would suggest. Analysis of county revenue performance consistently shows gaps in property rate collection, business permits, market fees, and other local revenue streams.",

      "Effective county revenue enhancement requires a structured approach: a comprehensive revenue mapping exercise to identify all revenue sources and their potential; systems improvement for billing, collection, and receipt management; enforcement of payment obligations; and addressing revenue leakages in the collection process.",

      "Counties that have invested in revenue enhancement — often with technical assistance — have achieved significant improvements in own-source revenue, reducing their dependence on equitable share transfers.",

      "**Recommendations for Strengthening County PFM**",

      "Based on our experience, we recommend the following priority interventions for counties seeking to strengthen PFM: First, invest in internal audit capacity — recruit qualified internal auditors, establish a functioning audit committee, and mandate risk-based audit planning. Second, implement a comprehensive revenue enhancement programme — understand revenue potential, fix collection systems, and enforce payment. Third, strengthen budget execution monitoring — establish monthly budget performance reviews with departmental accountability for absorption. Fourth, improve IFMIS utilisation — ensure that all county transactions are processed through IFMIS and that the system's reporting capabilities are fully exploited.",
    ],
    relatedSlugs: ["board-governance-kenya-2025", "internal-audit-transformation"],
  },
  "ifrs-9-expected-credit-loss": {
    category: "IFRS",
    title: "IFRS 9 Expected Credit Loss: Practical Application for Kenyan Banks",
    excerpt: "A practical guide to IFRS 9 ECL model development and application for financial institutions in Kenya, including regulatory considerations.",
    date: "October 22, 2024",
    readTime: "12 min read",
    author: "IFRS Advisory Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "Kenyan banks must balance IFRS 9 ECL requirements with CBK provisioning rules — the two are not always aligned",
      "PD, LGD, and EAD estimation requires high-quality historical data that many Kenyan banks still lack",
      "Forward-looking macro scenarios must reflect Kenya-specific economic conditions",
      "Significant Increase in Credit Risk (SICR) criteria should be calibrated carefully to avoid excessive Stage 2 migration",
      "Model governance — documentation, validation, and board oversight — is as important as the model itself",
    ],
    body: [
      "IFRS 9's Expected Credit Loss model has been in force for Kenyan banks since 2018. Yet many institutions continue to grapple with implementation challenges — from data gaps and model limitations to regulatory alignment and model governance.",

      "This article provides a practical analysis of the key implementation challenges and how leading Kenyan banks are addressing them.",

      "**The CBK-IFRS 9 Alignment Challenge**",

      "A persistent challenge for Kenyan banks is the relationship between IFRS 9 ECL provisions and CBK provisioning requirements. The CBK Prudential Guidelines specify minimum provisioning levels (20% for substandard, 50% for doubtful, 100% for loss) that do not always correspond to IFRS 9 ECL estimates.",

      "Where CBK provisions exceed IFRS 9 ECL, banks are required to maintain a regulatory reserve — a charge to retained earnings that does not flow through the income statement. Understanding and managing this difference is important for capital planning and financial reporting.",

      "**Data Quality: The Foundation of ECL Models**",

      "IFRS 9 ECL models require historical data on default rates, loss rates, and exposure at default — typically spanning multiple years across different economic cycles. Many Kenyan banks implemented IFRS 9 with limited historical data, relying on proxy data or simplified approaches that were acceptable in the early years but are increasingly scrutinised by auditors and the CBK.",

      "Investing in data quality — including data governance frameworks, data collection improvements, and historical data rehabilitation — is the most impactful action a Kenyan bank can take to improve its IFRS 9 capability. The data investment also pays dividends in other areas: credit risk management, regulatory reporting, and management information.",

      "**Forward-Looking Macro Scenarios**",

      "A distinctive feature of IFRS 9 is its requirement to incorporate forward-looking information — economic forecasts and scenarios — into ECL estimates. This requires banks to develop macroeconomic scenarios (typically a base case, an upside, and a downside) and model the impact of these scenarios on credit losses.",

      "For Kenyan banks, the relevant macro variables include GDP growth, inflation, exchange rate movements, and sector-specific indicators (for agricultural lenders, for example, rainfall and commodity prices are important). The scenarios must be internally consistent, plausible, and regularly updated.",

      "**Model Governance: An Often-Neglected Dimension**",

      "IFRS 9 ECL models are significant — they affect reported profits, regulatory capital, and dividend capacity. Yet many Kenyan banks have model governance frameworks that are inadequate for models of this importance.",

      "Effective model governance for IFRS 9 requires: comprehensive model documentation (methodology, assumptions, data, limitations); independent model validation at least annually; a model risk committee or equivalent oversight body; and regular reporting to the board or audit committee on model performance and material changes.",

      "Banks whose ECL models are poorly documented, untested, or inadequately governed face increasing scrutiny from external auditors and the CBK — and the risk of being required to make significant provisions adjustments.",
    ],
    relatedSlugs: ["ifrs-17-implementation-lessons", "cybersecurity-risk-kenya-financial"],
  },
  "internal-audit-transformation": {
    category: "Audit",
    title: "Transforming Internal Audit: The Digital Frontier",
    excerpt: "How data analytics and technology are reshaping internal audit practice in East Africa — and what progressive audit functions are doing differently.",
    date: "October 5, 2024",
    readTime: "7 min read",
    author: "Audit Practice Team",
    authorTitle: "CPA Otene & Associates LLP",
    keyTakeaways: [
      "Data analytics is transforming internal audit from sample-based to population-based testing",
      "Continuous auditing — real-time monitoring of transactions and controls — is increasingly achievable",
      "Process mining allows internal audit to analyse entire business processes, not just individual transactions",
      "Robotic Process Automation is reducing the cost of routine audit procedures",
      "Chief Audit Executives need to invest in technology skills alongside traditional audit competencies",
    ],
    body: [
      "Internal audit is at an inflection point. The traditional approach — risk-based but largely manual, relying on sampling, interviews, and document review — is being transformed by the availability of data analytics, process mining, continuous monitoring tools, and artificial intelligence.",

      "For Chief Audit Executives in East Africa, the question is not whether to adopt these technologies, but how quickly and in what sequence. This article explores the key technological transformations reshaping internal audit and how progressive audit functions are implementing them.",

      "**From Sampling to Population Testing**",

      "Traditional internal audit relies on statistical sampling — selecting a representative sample of transactions to test, and extrapolating conclusions to the population. This approach is well-established but has fundamental limitations: it can miss fraudulent or erroneous transactions that fall outside the sample; it provides only periodic rather than continuous assurance; and it is time-consuming.",

      "Data analytics enables internal audit to move from sampling to population testing — analysing every transaction in a dataset to identify anomalies, outliers, and patterns that warrant investigation. This significantly increases the probability of detecting fraud and errors, while reducing the time spent on manual sampling procedures.",

      "Tools like ACL Analytics, IDEA, and increasingly accessible open-source data analysis platforms are enabling audit teams to conduct population-based analysis of large transaction datasets. The investment in data analytics skills and tools is rapidly becoming a hygiene factor for progressive internal audit functions.",

      "**Continuous Auditing: Real-Time Assurance**",

      "Beyond periodic population testing, technology now enables continuous auditing — automated monitoring of transactions and controls on a real-time or near-real-time basis. Continuous auditing identifies control failures and anomalous transactions as they occur, rather than discovering them weeks or months later during a periodic audit.",

      "For high-risk processes — like payments, payroll, revenue recognition, and procurement — continuous auditing significantly reduces the window of exposure to fraud and error. It also allows internal audit to shift resources from routine transaction testing toward higher-value advisory and assurance activities.",

      "**Process Mining: Seeing the Full Picture**",

      "Process mining is a relatively new but rapidly growing analytical technique that reconstructs actual business processes from system event logs — showing how processes really flow, rather than how they are supposed to flow. For internal audit, process mining is transformative: it enables auditors to analyse entire processes (not individual transactions) and identify inefficiencies, control gaps, and deviations from intended process flows.",

      "A process mining analysis of a procurement process, for example, might reveal that 30% of purchase orders are created after goods are received (bypassing the three-way match control), that a significant proportion of payments go to vendors added to the system on the same day as the invoice, or that approval workflows are being circumvented in identifiable patterns. These insights would be extremely difficult to obtain through traditional audit approaches.",

      "**Building the Digital Audit Capability**",

      "For Chief Audit Executives looking to build digital audit capability, the journey typically involves three phases: building foundational data analytics skills in the team and establishing access to organisational data; embedding data analytics into routine audit procedures; and progressively adopting more advanced techniques like continuous auditing and process mining.",

      "The investment required — in technology, training, and data access — is significant but increasingly justified by the improved audit quality and efficiency that digital approaches deliver. CAEs who delay this investment risk being left behind as boards and audit committees raise expectations for internal audit sophistication.",
    ],
    relatedSlugs: ["board-governance-kenya-2025", "public-financial-management-devolution"],
  },
};

export function generateStaticParams() {
  return Object.keys(insightData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = insightData[slug];
  if (!insight) return { title: "Insight Not Found" };
  return {
    title: `${insight.title} | CPA Otene Insights`,
    description: insight.excerpt,
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = insightData[slug];
  if (!insight) notFound();

  const relatedInsights = insight.relatedSlugs
    .map((s) => insightData[s] ? { slug: s, ...insightData[s] } : null)
    .filter(Boolean);

  return (
    <>
      <PageHero
        label={insight.category}
        title={insight.title.split(":")[0]}
        titleHighlight={insight.title.includes(":") ? insight.title.split(":")[1].trim() : undefined}
        description={insight.excerpt}
        breadcrumbs={[
          { label: "Insights", href: "/insights" },
          { label: insight.category, href: `/insights?category=${insight.category}` },
          { label: insight.title },
        ]}
        size="compact"
      />
      <InsightArticle insight={{ slug, ...insight }} relatedInsights={relatedInsights as any} />
    </>
  );
}
