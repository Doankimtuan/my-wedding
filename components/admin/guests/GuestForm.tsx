"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GuestFormProps {
  guest?: {
    id: string;
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    group: string | null;
  };
  action: (formData: FormData) => Promise<void | { error: string }>;
  submitLabel: string;
}

export function GuestForm({ guest, action, submitLabel }: GuestFormProps) {
  const [name, setName] = useState(guest?.name || "");
  const [slug, setSlug] = useState(guest?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!guest); // Auto-generate slug for new guests
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from name
  useEffect(() => {
    if (autoSlug && name) {
      const generated = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generated);
    }
  }, [name, autoSlug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await action(formData);

    if (result?.error) {
      alert(`Error: ${result.error}`);
      setLoading(false);
    }
    // If successful, redirect happens in server action
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-stone-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-stone-700">
            Slug (URL identifier)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setAutoSlug(false);
            }}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono text-sm"
            placeholder="john-doe"
          />
          <p className="text-xs text-stone-500">
            Auto-generated from name. Edit to customize.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-stone-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={guest?.email || ""}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-stone-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue={guest?.phone || ""}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="group" className="text-sm font-medium text-stone-700">
            Group
          </label>
          <input
            type="text"
            id="group"
            name="group"
            defaultValue={guest?.group || ""}
            className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            placeholder="e.g., Family, Friends, Colleagues"
          />
          <p className="text-xs text-stone-500">
            Optional grouping for organizing guests
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-stone-200">
        <Button
          type="submit"
          disabled={loading}
          className="bg-rose-600 hover:bg-rose-700"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
