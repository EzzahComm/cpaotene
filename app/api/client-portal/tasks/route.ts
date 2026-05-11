import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority, dueDate } = body;

    if (!title || !priority) {
      return NextResponse.json({ error: "Missing required task fields." }, { status: 400 });
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
      title,
      description: description || null,
      priority,
      due_date: dueDate || null,
      created_by: user.id,
    };

    const { error: dbError } = await supabase.from("client_tasks").insert(insertPayload);
    if (dbError) {
      console.error("Task insert error:", dbError);
      return NextResponse.json({ error: "Failed to create task." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Task creation error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
