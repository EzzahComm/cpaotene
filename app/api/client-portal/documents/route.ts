import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const documentType = formData.get("documentType") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File | null;

    if (!documentType || !file || file.size === 0) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (clientError || !clientData) {
      return NextResponse.json({ error: "Client account not found." }, { status: 404 });
    }

    const clientId = clientData.id;
    const fileName = `${clientId}/${Date.now()}-${file.name}`;
    const bucket = "client-documents";

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError || !uploadData) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      console.error("Storage URL error: Could not generate public URL");
      return NextResponse.json({ error: "Failed to generate file URL." }, { status: 500 });
    }

    const { error: dbError } = await supabase.from("documents").insert({
      client_id: clientId,
      file_name: file.name,
      file_type: file.type,
      file_size_kb: Math.round(file.size / 1024),
      storage_url: urlData.publicUrl,
      document_type: documentType,
      description: description || null,
      uploaded_by: user.id,
      is_public: false,
    });

    if (dbError) {
      console.error("Document insert error:", dbError);
      return NextResponse.json({ error: "Failed to save document metadata." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
