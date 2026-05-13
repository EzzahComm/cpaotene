"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SERVICE_TYPES,
  SERVICE_LABELS,
  INDUSTRY_TYPES,
  ORG_SIZES,
  AuditAssuranceIntakeSchema,
  TaxAdvisoryIntakeSchema,
  InternalAuditIntakeSchema,
  ManagementConsultancyIntakeSchema,
  type ServiceType,
} from "@/lib/schemas/serviceIntake";

interface ServiceIntakeFormProps {
  serviceType: ServiceType;
  onSuccess?: (data: any) => void;
}

export function ServiceIntakeForm({
  serviceType,
  onSuccess,
}: ServiceIntakeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Select the appropriate schema based on service type
  let schema;
  switch (serviceType) {
    case SERVICE_TYPES.AUDIT_ASSURANCE:
      schema = AuditAssuranceIntakeSchema;
      break;
    case SERVICE_TYPES.TAX_ADVISORY:
      schema = TaxAdvisoryIntakeSchema;
      break;
    case SERVICE_TYPES.INTERNAL_AUDIT:
      schema = InternalAuditIntakeSchema;
      break;
    case SERVICE_TYPES.FINANCIAL_ADVISORY:
    case SERVICE_TYPES.GOVERNANCE_ADVISORY:
    case SERVICE_TYPES.RISK_COMPLIANCE:
      schema = ManagementConsultancyIntakeSchema;
      break;
    default:
      throw new Error(`Unknown service type: ${serviceType}`);
  }

  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/services/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit form");
      }

      const result = await response.json();

      // Call the success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      // Reset form
      form.reset();
      alert("Thank you! Your intake form has been submitted successfully.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Service Type (Read-only display) */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700">Service Type</p>
          <p className="text-lg font-semibold text-blue-900">
            {SERVICE_LABELS[serviceType]}
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+254 747 515 972"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Organization Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Organization Information</h3>

          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Ltd" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kraPin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>KRA PIN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A123456789B"
                    {...field}
                    pattern="^[A-Z]{1}[0-9]{9}[A-Z]{1}$"
                  />
                </FormControl>
                <FormDescription>
                  Format: Letter + 9 digits + Letter
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(INDUSTRY_TYPES).map(([key, value]) => (
                        <SelectItem key={value} value={value}>
                          {key
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0) +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Employees</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(ORG_SIZES).map(([, value]) => (
                        <SelectItem key={value} value={value}>
                          {value} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Service-Specific Fields */}
        <ServiceSpecificFields serviceType={serviceType} form={form} />

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Service Request"}
        </Button>
      </form>
    </Form>
  );
}

// Service-specific fields component
function ServiceSpecificFields({ serviceType, form }: any) {
  switch (serviceType) {
    case SERVICE_TYPES.AUDIT_ASSURANCE:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Audit Details</h3>

          <FormField
            control={form.control}
            name="auditType"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Type of Audit Required</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audit type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="financial">Financial Statement Audit</SelectItem>
                    <SelectItem value="compliance">Compliance Audit</SelectItem>
                    <SelectItem value="special">Special Purpose Audit</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="lastAuditYear"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Last Audit Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2023" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="financialYearEnd"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Financial Year End (MM/DD)</FormLabel>
                  <FormControl>
                    <Input placeholder="12/31" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="auditFirm"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Previous Audit Firm (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Audit Firm Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your audit requirements..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case SERVICE_TYPES.TAX_ADVISORY:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Tax Information</h3>

          <FormField
            control={form.control}
            name="taxIssues"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Tax Issues (Select all that apply)</FormLabel>
                <div className="space-y-2">
                  {[
                    { id: "compliance", label: "Tax Compliance" },
                    { id: "planning", label: "Tax Planning & Structuring" },
                    { id: "dispute", label: "Tax Dispute Resolution" },
                    { id: "transfer-pricing", label: "Transfer Pricing" },
                    { id: "other", label: "Other" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={field.value?.includes(option.id) || false}
                        onCheckedChange={(checked: boolean | string) => {
                          const updatedValue = checked
                            ? [...(field.value || []), option.id]
                            : (field.value || []).filter((v: string) => v !== option.id);
                          field.onChange(updatedValue);
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="annualRevenue"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Annual Revenue Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-1m">Under KES 1M</SelectItem>
                      <SelectItem value="1m-10m">KES 1M - 10M</SelectItem>
                      <SelectItem value="10m-100m">KES 10M - 100M</SelectItem>
                      <SelectItem value="100m-1b">KES 100M - 1B</SelectItem>
                      <SelectItem value="over-1b">Over KES 1B</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxFilingFrequency"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Tax Filing Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Describe Your Tax Challenges</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your specific tax needs..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case SERVICE_TYPES.INTERNAL_AUDIT:
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Internal Audit Details</h3>

          <FormField
            control={form.control}
            name="auditScope"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Audit Scope</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-outsourcing">Full Outsourcing</SelectItem>
                    <SelectItem value="co-sourcing">Co-sourcing</SelectItem>
                    <SelectItem value="specific-areas">Specific Areas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focusAreas"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Focus Areas (Select all that apply)</FormLabel>
                <div className="space-y-2">
                  {[
                    { id: "financial-controls", label: "Financial Controls" },
                    { id: "operations", label: "Operational Efficiency" },
                    { id: "it-systems", label: "IT Systems" },
                    { id: "compliance", label: "Regulatory Compliance" },
                    { id: "other", label: "Other" },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={field.value?.includes(option.id) || false}
                        onCheckedChange={(checked: boolean | string) => {
                          const updatedValue = checked
                            ? [...(field.value || []), option.id]
                            : (field.value || []).filter((v: string) => v !== option.id);
                          field.onChange(updatedValue);
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentInternalAudit"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Do you currently have internal audit?</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="partial">Partial/In-house</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your internal audit needs..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    case "management-consultancy":
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Consultancy Details</h3>

          <FormField
            control={form.control}
            name="consultancyArea"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Area of Consultancy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="financial-management">
                      Financial Management
                    </SelectItem>
                    <SelectItem value="strategy">Business Strategy</SelectItem>
                    <SelectItem value="operations">Operations Optimization</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentChallenges"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Current Challenges</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the specific challenges you're facing..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desiredOutcome"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Desired Outcome</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What would success look like for you?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Timeline</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );

    default:
      return null;
  }
}
