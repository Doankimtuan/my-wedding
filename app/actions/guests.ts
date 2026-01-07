"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getGuests(search?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching guests:", error);
    return [];
  }

  return data;
}

export async function getGuestById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching guest:", error);
    return null;
  }

  return data;
}

function generateSlug(name: string): string {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now().toString(36)
  );
}

export async function createGuest(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slugInput = formData.get("slug") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const groupName = formData.get("group") as string | null; // Form sends 'group'

  if (!name || !name.trim()) {
    return { error: "Name is required" };
  }

  // Check for duplicate name
  const { data: existing } = await supabase
    .from("guests")
    .select("id")
    .ilike("name", name.trim())
    .maybeSingle();

  if (existing) {
    return {
      error: "A guest with this name already exists. Please use a unique name.",
    };
  }

  // Use provided slug or generate one
  const slug = slugInput?.trim() || generateSlug(name);

  const { error } = await supabase.from("guests").insert({
    name: name.trim(),
    email: email || null,
    phone: phone || null,
    group_name: groupName || null,
    slug,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/guests");
  redirect("/admin/guests");
}

export async function updateGuest(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string | null;
  const email = formData.get("email") as string | null;
  const phone = formData.get("phone") as string | null;
  const groupName = formData.get("group") as string | null; // Form sends 'group'

  const updateData: Record<string, unknown> = {
    name,
    email: email || null,
    phone: phone || null,
    group_name: groupName || null,
    updated_at: new Date().toISOString(),
  };

  // Only update slug if provided
  if (slug?.trim()) {
    updateData.slug = slug.trim();
  }

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/guests");
  redirect("/admin/guests");
}

export async function deleteGuest(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/guests");
}
