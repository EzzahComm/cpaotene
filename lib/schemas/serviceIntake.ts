import { z } from "zod";

// Service types
export const SERVICE_TYPES = {
  AUDIT_ASSURANCE: "audit-assurance",
  TAX_ADVISORY: "tax-advisory",
  GOVERNANCE_ADVISORY: "governance-advisory",
  RISK_COMPLIANCE: "risk-compliance",
  INTERNAL_AUDIT: "internal-audit",
  IFRS_ADVISORY: "ifrs-advisory",
  ESG_SUSTAINABILITY: "esg-sustainability",
  CYBERSECURITY_ADVISORY: "cybersecurity-advisory",
  PUBLIC_SECTOR_ADVISORY: "public-sector-advisory",
  FINANCIAL_ADVISORY: "financial-advisory",
  SME_ADVISORY: "sme-advisory",
} as const;

export type ServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  "audit-assurance": "Audit & Assurance",
  "tax-advisory": "Tax Advisory & Compliance",
  "governance-advisory": "Governance Advisory",
  "risk-compliance": "Risk & Compliance",
  "internal-audit": "Internal Audit",
  "ifrs-advisory": "IFRS Advisory",
  "esg-sustainability": "ESG & Sustainability",
  "cybersecurity-advisory": "Cybersecurity Advisory",
  "public-sector-advisory": "Public Sector Advisory",
  "financial-advisory": "Financial Advisory",
  "sme-advisory": "SME Advisory",
};

// Industry types
export const INDUSTRY_TYPES = {
  FINANCE: "finance",
  MANUFACTURING: "manufacturing",
  HEALTHCARE: "healthcare",
  RETAIL: "retail",
  TECHNOLOGY: "technology",
  EDUCATION: "education",
  HOSPITALITY: "hospitality",
  REAL_ESTATE: "real-estate",
  NGO: "ngo",
  GOVERNMENT: "government",
  AGRICULTURE: "agriculture",
  ENERGY: "energy",
  TELECOM: "telecom",
  CONSULTING: "consulting",
  OTHER: "other",
} as const;

export type IndustryType = typeof INDUSTRY_TYPES[keyof typeof INDUSTRY_TYPES];

// Organization size
export const ORG_SIZES = {
  MICRO: "1-10",
  SMALL: "11-50",
  MEDIUM: "51-250",
  LARGE: "251-1000",
  ENTERPRISE: "1000+",
} as const;

export type OrgSize = typeof ORG_SIZES[keyof typeof ORG_SIZES];

// Base contact info schema (shared across all intake forms)
export const ContactInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^\+?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
});

// Organization info schema (shared across all intake forms)
export const OrganizationInfoSchema = z.object({
  organizationName: z
    .string()
    .min(3, "Organization name must be at least 3 characters")
    .max(100),
  kraPin: z
    .string()
    .regex(/^[A-Z]{1}[0-9]{9}[A-Z]{1}$/, "Please enter a valid KRA PIN"),
  industry: z.enum(
    Object.values(INDUSTRY_TYPES) as [IndustryType, ...IndustryType[]],
    {
      errorMap: () => ({ message: "Please select an industry" }),
    }
  ),
  employees: z.enum(Object.values(ORG_SIZES) as [OrgSize, ...OrgSize[]], {
    errorMap: () => ({ message: "Please select organization size" }),
  }),
  website: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
});

// Service-specific schema variants
export const AuditAssuranceIntakeSchema = z.object({
  ...ContactInfoSchema.shape,
  ...OrganizationInfoSchema.shape,
  serviceType: z.literal(SERVICE_TYPES.AUDIT_ASSURANCE),
  auditType: z.enum(["financial", "compliance", "special"], {
    errorMap: () => ({ message: "Please select audit type" }),
  }),
  lastAuditYear: z.string().regex(/^\d{4}$/, "Please enter a valid year"),
  auditFirm: z.string().max(100).optional(),
  financialYearEnd: z.string().regex(/^\d{2}\/\d{2}$/, "Format: MM/DD"),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500),
});

export const TaxAdvisoryIntakeSchema = z.object({
  ...ContactInfoSchema.shape,
  ...OrganizationInfoSchema.shape,
  serviceType: z.literal(SERVICE_TYPES.TAX_ADVISORY),
  taxIssues: z.array(
    z.enum([
      "compliance",
      "planning",
      "dispute",
      "transfer-pricing",
      "other",
    ]),
    {
      errorMap: () => ({ message: "Please select at least one tax issue" }),
    }
  ),
  annualRevenue: z.enum(
    ["under-1m", "1m-10m", "10m-100m", "100m-1b", "over-1b"],
    {
      errorMap: () => ({ message: "Please select revenue range" }),
    }
  ),
  taxFilingFrequency: z.enum(["monthly", "quarterly", "annual"], {
    errorMap: () => ({ message: "Please select filing frequency" }),
  }),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500),
});

export const InternalAuditIntakeSchema = z.object({
  ...ContactInfoSchema.shape,
  ...OrganizationInfoSchema.shape,
  serviceType: z.literal(SERVICE_TYPES.INTERNAL_AUDIT),
  auditScope: z.enum(["full-outsourcing", "co-sourcing", "specific-areas"], {
    errorMap: () => ({ message: "Please select audit scope" }),
  }),
  focusAreas: z.array(
    z.enum([
      "financial-controls",
      "operations",
      "it-systems",
      "compliance",
      "other",
    ]),
    {
      errorMap: () => ({ message: "Please select at least one focus area" }),
    }
  ),
  currentInternalAudit: z.enum(["yes", "no", "partial"], {
    errorMap: () => ({ message: "Please select an option" }),
  }),
  description: z
    .string()
    .min(10, "Please provide more details")
    .max(500),
});

export const ManagementConsultancyIntakeSchema = z.object({
  ...ContactInfoSchema.shape,
  ...OrganizationInfoSchema.shape,
  serviceType: z.literal("management-consultancy"),
  consultancyArea: z.enum(
    [
      "financial-management",
      "strategy",
      "operations",
      "governance",
      "other",
    ],
    {
      errorMap: () => ({ message: "Please select consultancy area" }),
    }
  ),
  currentChallenges: z
    .string()
    .min(20, "Please describe your challenges in detail")
    .max(1000),
  desiredOutcome: z
    .string()
    .min(20, "Please describe your desired outcome")
    .max(500),
  timeline: z.enum(["immediate", "1-3months", "3-6months", "flexible"], {
    errorMap: () => ({ message: "Please select a timeline" }),
  }),
});

// Union of all intake schemas
export const ServiceIntakeSchema = z.union([
  AuditAssuranceIntakeSchema,
  TaxAdvisoryIntakeSchema,
  InternalAuditIntakeSchema,
  ManagementConsultancyIntakeSchema,
]);

export type ServiceIntakeFormData = z.infer<typeof ServiceIntakeSchema>;
export type AuditAssuranceIntake = z.infer<typeof AuditAssuranceIntakeSchema>;
export type TaxAdvisoryIntake = z.infer<typeof TaxAdvisoryIntakeSchema>;
export type InternalAuditIntake = z.infer<typeof InternalAuditIntakeSchema>;
export type ManagementConsultancyIntake = z.infer<
  typeof ManagementConsultancyIntakeSchema
>;
