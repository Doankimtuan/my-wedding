import { getWishes } from "@/app/actions/wishes-admin";
import { WishCardAdmin } from "@/components/admin/wishes/WishCardAdmin";
import { StatCard } from "@/components/admin/StatCard";
import { MessageSquare, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ filter?: "pending" | "approved" | "all" }>;
}

export default async function WishesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filter = params.filter || "pending";

  const wishes = await getWishes(filter);
  const allWishes = await getWishes("all");
  const pending = allWishes.filter((w: any) => !w.is_approved);
  const approved = allWishes.filter((w: any) => w.is_approved);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900 font-playfair">
          Wishes Moderation
        </h1>
        <p className="text-stone-500 text-sm">
          Review and approve guest wishes
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Total Wishes"
          value={allWishes.length}
          icon={MessageSquare}
        />
        <StatCard
          label="Pending Review"
          value={pending.length}
          icon={Clock}
          className="border-orange-100 bg-orange-50/30"
        />
        <StatCard
          label="Approved"
          value={approved.length}
          icon={CheckCircle}
          className="border-green-100 bg-green-50/30"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Link href="/admin/wishes?filter=pending">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "pending"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            Pending ({pending.length})
          </button>
        </Link>
        <Link href="/admin/wishes?filter=approved">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "approved"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            Approved ({approved.length})
          </button>
        </Link>
        <Link href="/admin/wishes?filter=all">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-rose-600 text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            All ({allWishes.length})
          </button>
        </Link>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishes.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-stone-200">
            <p className="text-stone-400">No wishes to display</p>
          </div>
        ) : (
          wishes.map((wish: any) => <WishCardAdmin key={wish.id} wish={wish} />)
        )}
      </div>
    </div>
  );
}
