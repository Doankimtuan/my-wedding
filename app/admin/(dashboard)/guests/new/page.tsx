import { createGuest } from "@/app/actions/guests";
import { GuestForm } from "@/components/admin/guests/GuestForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewGuestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/guests"
          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-playfair">
            Add New Guest
          </h1>
          <p className="text-stone-500 text-sm">
            Create a new guest invitation
          </p>
        </div>
      </div>

      <GuestForm action={createGuest} submitLabel="Create Guest" />
    </div>
  );
}
