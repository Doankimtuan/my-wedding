import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGuests } from "@/app/actions/guests";
import { GuestTable } from "@/components/admin/guests/GuestTable";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function GuestsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const guests = await getGuests(params.search);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-playfair">
            Guest List
          </h1>
          <p className="text-stone-500 text-sm">
            Manage your wedding guests and invitations
          </p>
        </div>
        <Link href="/admin/guests/new">
          <Button className="bg-rose-600 hover:bg-rose-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <form method="GET" className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Search guests by name..."
            className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>
        <Button type="submit" variant="outline">
          Search
        </Button>
      </form>

      <GuestTable guests={guests as any} />

      <div className="text-sm text-stone-500">
        Total: {guests.length} guest{guests.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
