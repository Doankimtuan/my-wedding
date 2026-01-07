import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, guests, message, slug } = body;

    const supabase = await createClient();

    // 1. Identify the Guest
    let guestId: string | null = null;
    let guestData;

    // Priority 1: Match by Slug if provided (most accurate)
    if (slug) {
      const { data } = await supabase
        .from("guests")
        .select("id, name")
        .eq("slug", slug)
        .single();
      if (data) {
        guestId = data.id;
        guestData = data;
      }
    }

    // Priority 2: Match by Name (exact match case-insensitive-ish or normalized?)
    // Using simple ilike for now as fallback
    if (!guestId && name) {
      const { data } = await supabase
        .from("guests")
        .select("id, name")
        .ilike("name", name.trim())
        .maybeSingle(); // Use maybeSingle to avoid error if multiple (though risk of wrong assignment exists)

      if (data) {
        guestId = data.id;
        guestData = data;
      }
    }

    // If still no guest found, strictly we should fail for this specific flow
    // BUT for a wedding, maybe we create a "Walk-in" guest?
    // Plan suggests: "If Not Found: Reject or create 'Unknown' guest (Strict mode preferred: Reject)"
    // However, to be friendly, let's create a guest if they don't exist?
    // actually, let's stick to the plan: REJECT if not found to prevent spam,
    // UNLESS we want to allow anyone to RSVP.
    // The current RSVPSection allows typing a name. If I typed "John Doe" and I wasn't in DB, what happens?
    // Let's return 400 with "Guest not found" to prompt them to contact host or try exact name.

    if (!guestId) {
      // Optional: Auto-create guest for "Open RSVP" style
      // For now, let's return error to be safe and avoid database clutter
      return NextResponse.json(
        {
          error:
            "Guest name not found on the list. Please use the exact name on your invitation or contact the couple.",
        },
        { status: 404 }
      );
    }

    // 2. Create or Update RSVP
    // Check if RSVP exists
    const { data: existingRsvp } = await supabase
      .from("rsvp")
      .select("id")
      .eq("guest_id", guestId)
      .single();

    const rsvpData = {
      guest_id: guestId,
      attending: attending === "yes" || attending === true,
      number_of_guests: parseInt(guests) || 1,
      message: message || null,
      updated_at: new Date().toISOString(),
    };

    let error;

    if (existingRsvp) {
      const { error: updateError } = await supabase
        .from("rsvp")
        .update(rsvpData)
        .eq("id", existingRsvp.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("rsvp")
        .insert(rsvpData);
      error = insertError;
    }

    if (error) {
      console.error("RSVP DB Error:", error);
      return NextResponse.json(
        { error: "Failed to save RSVP." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, guest: guestData?.name });
  } catch (err) {
    console.error("RSVP Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
