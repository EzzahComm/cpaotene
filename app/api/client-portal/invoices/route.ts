import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      invoiceNumber,
      issueDate,
      dueDate,
      status,
      currency,
      amountDue,
      amountPaid,
      description,
      externalUrl,
    } = body;

    if (!invoiceNumber || !issueDate || !status || !currency) {
      return NextResponse.json({ error: "Missing required invoice fields." }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (clientError || !clientData) {
      return NextResponse.json({ error: "Client account not found." }, { status: 404 });
    }

    const insertPayload = {
      client_id: clientData.id,
      invoice_number: invoiceNumber,
      issue_date: issueDate,
      due_date: dueDate || null,
      status,
      currency,
      amount_due: Number(amountDue) || 0,
      amount_paid: Number(amountPaid) || 0,
      description: description || null,
      external_url: externalUrl || null,
    };

    const { data, error: dbError } = await supabase.from("invoices").insert(insertPayload).select("id");
    if (dbError) {
      console.error("Invoice insert error:", dbError);
      return NextResponse.json({ error: "Failed to create invoice." }, { status: 500 });
    }

    return NextResponse.json({ success: true, invoiceId: data?.[0]?.id });
  } catch (error) {
    console.error("Invoice creation error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
