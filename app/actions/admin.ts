"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [guestsResult, rsvpResult, wishesResult] = await Promise.all([
    supabase.from("guests").select("id", { count: "exact" }),
    supabase.from("rsvp").select("id, attending", { count: "exact" }),
    supabase.from("wishes").select("id", { count: "exact" }),
  ]);

  const totalGuests = guestsResult.count || 0;
  const totalRsvps = rsvpResult.count || 0;
  const totalWishes = wishesResult.count || 0;

  const attendingCount =
    rsvpResult.data?.filter((r) => r.attending).length || 0;
  const declinedCount =
    rsvpResult.data?.filter((r) => !r.attending).length || 0;

  return {
    totalGuests,
    totalRsvps,
    totalWishes,
    attendingCount,
    declinedCount,
  };
}

export async function getRecentActivity() {
  const supabase = await createClient();

  const [rsvpResult, wishesResult] = await Promise.all([
    supabase
      .from("rsvp")
      .select("id, attending, number_of_guests, updated_at, guests(name)")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("wishes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    recentRsvps: rsvpResult.data || [],
    recentWishes: wishesResult.data || [],
  };
}
