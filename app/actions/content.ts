"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getWeddingInfo() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wedding_info")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching wedding info:", error);
    return null;
  }

  return data;
}

export async function updateWeddingInfo(formData: FormData) {
  const supabase = await createClient();

  // Get existing wedding info ID
  const { data: existing } = await supabase
    .from("wedding_info")
    .select("id")
    .limit(1)
    .single();

  const updateData = {
    groom_name: formData.get("groom_name") as string,
    bride_name: formData.get("bride_name") as string,
    wedding_date: formData.get("wedding_date") as string,
    wedding_time: formData.get("wedding_time") as string | null,
    venue_name: formData.get("venue_name") as string | null,
    venue_address: formData.get("venue_address") as string | null,
    venue_map_url: formData.get("venue_map_url") as string | null,
    hero_image_url: formData.get("hero_image_url") as string | null,
    story_text: formData.get("story_text") as string | null,
    bank_name: formData.get("bank_name") as string | null,
    bank_account_number: formData.get("bank_account_number") as string | null,
    bank_account_name: formData.get("bank_account_name") as string | null,
    bank_qr_image_url: formData.get("bank_qr_image_url") as string | null,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (existing?.id) {
    const result = await supabase
      .from("wedding_info")
      .update(updateData)
      .eq("id", existing.id);
    error = result.error;
  } else {
    const result = await supabase.from("wedding_info").insert(updateData);
    error = result.error;
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/content");
}
