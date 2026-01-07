import { getRSVPs, getPendingRSVPs } from "@/app/actions/rsvp-admin";
import { RSVPTable } from "@/components/admin/rsvp/RSVPTable";
import { ExportButton } from "@/components/admin/rsvp/ExportButton";
import { StatCard } from "@/components/admin/StatCard";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ filter?: "all" | "attending" | "declined" }>;
}

export default async function RSVPsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = params.filter || "all";

  const rsvps = await getRSVPs(filter);
  const pending = await getPendingRSVPs();

  // Calculate stats
  const totalRsvps = rsvps.length;
  const attending = rsvps.filter((r: any) => r.attending);
  const declined = rsvps.filter((r: any) => !r.attending);
  const totalGuests = attending.reduce(
    (sum: number, r: any) => sum + (r.number_of_guests || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-playfair">
            RSVP Responses
          </h1>
          <p className="text-stone-500 text-sm">
            View and manage guest responses
          </p>
        </div>
        <ExportButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Responses" value={totalRsvps} icon={Users} />
        <StatCard
          label="Confirmed Guests"
          value={totalGuests}
          icon={UserCheck}
          className="border-green-100 bg-green-50/30"
        />
        <StatCard
          label="Declined"
          value={declined.length}
          icon={UserX}
          className="border-red-100 bg-red-50/30"
        />
        <StatCard
          label="Pending"
          value={pending.length}
          icon={Clock}
          className="border-orange-100 bg-orange-50/30"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Link href="/admin/rsvps?filter=all">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            All ({totalRsvps})
          </button>
        </Link>
        <Link href="/admin/rsvps?filter=attending">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "attending"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            Attending ({attending.length})
          </button>
        </Link>
        <Link href="/admin/rsvps?filter=declined">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "declined"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            Declined ({declined.length})
          </button>
        </Link>
      </div>

      <RSVPTable rsvps={rsvps as any} />
    </div>
  );
}
