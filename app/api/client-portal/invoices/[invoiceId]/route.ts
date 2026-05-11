import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest, { params }: { params: { invoiceId: string } }) {
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

    const { data: invoiceData, error: invoiceError } = await supabase
      .from("invoices")
      .select("id")
      .eq("id", params.invoiceId)
      .eq("client_id", clientData.id)
      .single();

    if (invoiceError || !invoiceData) {
      return NextResponse.json({ error: "Invoice not found." }, { status: 404 });
    }

    const updatePayload = {
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

    const { error: dbError } = await supabase
      .from("invoices")
      .update(updatePayload)
      .eq("id", params.invoiceId);

    if (dbError) {
      console.error("Invoice update error:", dbError);
      return NextResponse.json({ error: "Failed to update invoice." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invoice update error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
