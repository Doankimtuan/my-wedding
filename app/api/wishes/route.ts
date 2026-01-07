import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET - Fetch all approved wishes
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: wishes, error } = await supabase
      .from("wishes")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching wishes:", error);
      return NextResponse.json(
        { error: "Failed to fetch wishes" },
        { status: 500 }
      );
    }

    return NextResponse.json(wishes || []);
  } catch (error) {
    console.error("Error in wishes GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Submit a new wish
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { guest_name, message } = body;

    if (!guest_name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("wishes")
      .insert({
        guest_name: guest_name.trim(),
        message: message.trim(),
        is_approved: true, // Auto-approve for now, can be changed to require moderation
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating wish:", error);
      return NextResponse.json(
        { error: "Failed to submit wish" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error in wishes POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
