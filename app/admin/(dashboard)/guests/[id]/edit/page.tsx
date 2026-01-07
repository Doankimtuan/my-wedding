import { getGuestById, updateGuest } from "@/app/actions/guests";
import { GuestForm } from "@/components/admin/guests/GuestForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGuestPage({ params }: PageProps) {
  const { id } = await params;
  const guest = await getGuestById(id);

  if (!guest) {
    notFound();
  }

  const updateGuestWithId = async (formData: FormData) => {
    "use server";
    return updateGuest(id, formData);
  };

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
            Edit Guest
          </h1>
          <p className="text-stone-500 text-sm">Update guest information</p>
        </div>
      </div>

      <GuestForm
        guest={guest}
        action={updateGuestWithId}
        submitLabel="Update Guest"
      />
    </div>
  );
}
