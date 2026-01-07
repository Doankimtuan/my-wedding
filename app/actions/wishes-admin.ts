"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getWishes(filter?: "pending" | "approved" | "all") {
  const supabase = await createClient();

  let query = supabase
    .from("wishes")
    .select("*")
    .order("created_at", { ascending: false });

  if (filter === "pending") {
    query = query.eq("is_approved", false);
  } else if (filter === "approved") {
    query = query.eq("is_approved", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching wishes:", error);
    return [];
  }

  return data;
}

export async function approveWish(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("wishes")
    .update({ is_approved: true })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/wishes");
  return { success: true };
}

export async function unapproveWish(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("wishes")
    .update({ is_approved: false })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/wishes");
  return { success: true };
}

export async function deleteWish(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("wishes").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/wishes");
  return { success: true };
}

export async function updateWishMessage(id: string, message: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("wishes")
    .update({ message })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/wishes");
  return { success: true };
}
