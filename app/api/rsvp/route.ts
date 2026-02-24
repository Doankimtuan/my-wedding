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

    if (!guestId && name?.trim()) {
      // Auto-create walk-in guest
      const slug =
        name
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now().toString(36);

      const { data: newGuest, error: createError } = await supabase
        .from("guests")
        .insert({ name: name.trim(), slug, group_name: "Walk-in" })
        .select("id, name")
        .single();

      if (createError || !newGuest) {
        console.error("Error auto-creating guest:", createError);
        return NextResponse.json(
          { error: "Could not register. Please try again." },
          { status: 500 },
        );
      }
      guestId = newGuest.id;
      guestData = newGuest;
    } else if (!guestId) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
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
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, guest: guestData?.name });
  } catch (err) {
    console.error("RSVP Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
