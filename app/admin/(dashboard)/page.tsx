import { getDashboardStats, getRecentActivity } from "@/app/actions/admin";
import { StatCard } from "@/components/admin/StatCard";
import { Users, Mail, UserCheck, UserX, MessageSquare } from "lucide-react";
import Link from "next/link"; // Ensure Link is imported

interface RsvpWithGuest {
  id: string;
  attending: boolean;
  number_of_guests: number;
  updated_at: string;
  guests: { name: string } | null;
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const { recentRsvps, recentWishes } = await getRecentActivity();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 font-playfair">
          Dashboard
        </h1>
        <p className="text-stone-500">Welcome to your wedding overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Guests (List)"
          value={stats.totalGuests}
          icon={Users}
        />
        <StatCard
          label="RSVP Responses"
          value={stats.totalRsvps}
          icon={Mail}
          className=""
        />
        <StatCard
          label="Confirmed Guests"
          value={stats.attendingCount}
          icon={UserCheck}
          className="border-green-100 bg-green-50/30"
        />
        <StatCard
          label="Declined"
          value={stats.declinedCount}
          icon={UserX}
          className="border-red-100 bg-red-50/30"
        />
        <StatCard
          label="Wishes Received"
          value={stats.totalWishes}
          icon={MessageSquare}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent RSVPs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 min-h-[300px]">
          <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
            <span>Recent RSVPs</span>
            <Link
              href="/admin/rsvps"
              className="text-sm text-rose-500 hover:underline"
            >
              View All
            </Link>
          </h3>

          <div className="space-y-4">
            {recentRsvps.length === 0 ? (
              <p className="text-stone-400 text-sm">No RSVPs yet.</p>
            ) : (
              (recentRsvps as unknown as RsvpWithGuest[]).map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="flex justify-between items-center border-b border-stone-50 pb-2 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium text-stone-900">
                      {rsvp.guests?.name || "Unknown Guest"}
                    </p>
                    <p className="text-xs text-stone-500">
                      {rsvp.attending ? (
                        <span className="text-green-600">
                          Attending ({rsvp.number_of_guests})
                        </span>
                      ) : (
                        <span className="text-red-500">Not Attending</span>
                      )}
                    </p>
                  </div>
                  <span className="text-xs text-stone-400">
                    {new Date(rsvp.updated_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Wishes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 min-h-[300px]">
          <h3 className="font-semibold text-stone-800 mb-4 flex justify-between items-center">
            <span>Latest Wishes</span>
            <Link
              href="/admin/wishes"
              className="text-sm text-rose-500 hover:underline"
            >
              View All
            </Link>
          </h3>
          <div className="space-y-4">
            {recentWishes.length === 0 ? (
              <p className="text-stone-400 text-sm">No wishes yet.</p>
            ) : (
              recentWishes.map((wish) => (
                <div
                  key={wish.id}
                  className="border-b border-stone-50 pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-stone-900 text-sm">
                      {wish.guest_name}
                    </p>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        wish.is_approved
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {wish.is_approved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="text-stone-500 text-xs truncate max-w-sm">
                    "{wish.message}"
                  </p>
                  <p className="text-[10px] text-stone-400 mt-1">
                    {new Date(wish.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
