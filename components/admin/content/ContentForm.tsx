"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

import { Database } from "@/lib/supabase/database.types";

type WeddingInfo = Database["public"]["Tables"]["wedding_info"]["Row"];

interface ContentFormProps {
  weddingInfo: WeddingInfo | null;
  action: (formData: FormData) => Promise<void | { error: string }>;
}

export function ContentForm({ weddingInfo, action }: ContentFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result?.error) {
      alert(`Error: ${result.error}`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Couple Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-4">
        <h3 className="text-lg font-semibold text-stone-900">
          Couple Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Groom Name
            </label>
            <input
              type="text"
              name="groom_name"
              defaultValue={weddingInfo?.groom_name || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Bride Name
            </label>
            <input
              type="text"
              name="bride_name"
              defaultValue={weddingInfo?.bride_name || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-4">
        <h3 className="text-lg font-semibold text-stone-900">Event Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Wedding Date
            </label>
            <input
              type="date"
              name="wedding_date"
              defaultValue={weddingInfo?.wedding_date || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Wedding Time
            </label>
            <input
              type="time"
              name="wedding_time"
              defaultValue={weddingInfo?.wedding_time || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-stone-700">
              Venue Name
            </label>
            <input
              type="text"
              name="venue_name"
              defaultValue={weddingInfo?.venue_name || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-stone-700">
              Venue Address
            </label>
            <input
              type="text"
              name="venue_address"
              defaultValue={weddingInfo?.venue_address || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-stone-700">
              Map URL (Google Maps embed or link)
            </label>
            <input
              type="url"
              name="venue_map_url"
              defaultValue={weddingInfo?.venue_map_url || ""}
              placeholder="https://maps.google.com/..."
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-4">
        <h3 className="text-lg font-semibold text-stone-900">
          Bank Information (Gift Registry)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              defaultValue={weddingInfo?.bank_name || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Account Number
            </label>
            <input
              type="text"
              name="bank_account_number"
              defaultValue={weddingInfo?.bank_account_number || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-stone-700">
              Account Holder Name
            </label>
            <input
              type="text"
              name="bank_account_name"
              defaultValue={weddingInfo?.bank_account_name || ""}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-stone-700">
              QR Code Image URL
            </label>
            <input
              type="url"
              name="bank_qr_image_url"
              defaultValue={weddingInfo?.bank_qr_image_url || ""}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </div>

      {/* Story & Images */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-200 space-y-4">
        <h3 className="text-lg font-semibold text-stone-900">Story & Media</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Hero Image URL (Top Banner)
            </label>
            <input
              type="url"
              name="hero_image_url"
              defaultValue={weddingInfo?.hero_image_url || ""}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">
              Our Story
            </label>
            <textarea
              name="story_text"
              defaultValue={weddingInfo?.story_text || ""}
              rows={5}
              className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-y"
              placeholder="Share your love story..."
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
