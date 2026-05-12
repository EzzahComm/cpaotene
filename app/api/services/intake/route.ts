import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ServiceIntakeSchema } from "@/lib/schemas/serviceIntake";
import { classifyOnboardingRequest } from "@/lib/ai";
import { ZodError } from "zod";
import { withRateLimit, RATE_LIMITS } from "@/lib/ratelimit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 intake submissions per 10 minutes per IP
  const limited = await withRateLimit(request, RATE_LIMITS.intake);
  if (limited) return limited;

  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = ServiceIntakeSchema.parse(body);

    // Create Supabase client
    const supabase = await createClient();

    // Get the current user if authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Insert the onboarding request into Supabase
    const { data, error } = await supabase
      .from("onboarding_requests")
      .insert({
        user_id: user?.id || null,
        email: validatedData.email,
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        phone: validatedData.phone,
        organization_name: validatedData.organizationName,
        kra_pin: validatedData.kraPin,
        industry: validatedData.industry,
        employees: validatedData.employees,
        website: validatedData.website || null,
        service_type: validatedData.serviceType,
        form_data: validatedData, // Store the complete form data as JSON
        status: "pending",
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to save your request. Please try again." },
        { status: 500 }
      );
    }

    const requestId = data?.[0]?.id;

    try {
      const assessment = await classifyOnboardingRequest(validatedData);
      if (requestId) {
        await supabase
          .from("onboarding_requests")
          .update({ ai_assessment: assessment })
          .eq("id", requestId);
      }
    } catch (aiError) {
      console.error("AI assessment failed:", aiError);
    }

    return NextResponse.json(
      {
        message: "Thank you for your submission! We'll be in touch shortly.",
        requestId: data?.[0]?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing intake form:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
