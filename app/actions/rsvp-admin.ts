"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getRSVPs(filter?: "all" | "attending" | "declined") {
  const supabase = await createClient();

  let query = supabase
    .from("rsvp")
    .select("*, guests(name, email, phone)")
    .order("updated_at", { ascending: false });

  if (filter === "attending") {
    query = query.eq("attending", true);
  } else if (filter === "declined") {
    query = query.eq("attending", false);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching RSVPs:", error);
    return [];
  }

  return data;
}

export async function getPendingRSVPs() {
  const supabase = await createClient();

  // Get guests who haven't RSVPed yet
  const { data: allGuests } = await supabase.from("guests").select("id, name");
  const { data: rsvps } = await supabase.from("rsvp").select("guest_id");

  const rsvpGuestIds = new Set(rsvps?.map((r) => r.guest_id) || []);
  const pendingGuests = allGuests?.filter((g) => !rsvpGuestIds.has(g.id)) || [];

  return pendingGuests;
}

export async function exportRSVPsToCSV() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rsvp")
    .select("*, guests(name, email, phone)")
    .order("updated_at", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  const headers = [
    "Guest Name",
    "Email",
    "Phone",
    "Attending",
    "Number of Guests",
    "Dietary Restrictions",
    "Message",
    "RSVP Date",
  ];

  const rows =
    data?.map((rsvp) => [
      rsvp.guests?.name || "",
      rsvp.guests?.email || "",
      rsvp.guests?.phone || "",
      rsvp.attending ? "Yes" : "No",
      rsvp.number_of_guests || 1,
      rsvp.dietary_restrictions || "",
      rsvp.message || "",
      new Date(rsvp.updated_at || "").toLocaleDateString(),
    ]) || [];

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  return { csv: csvContent };
}

export async function deleteRSVP(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("rsvp").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/rsvps");
  return { success: true };
}
