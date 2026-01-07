import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "p-6 bg-white rounded-xl shadow-sm border border-stone-100 flex items-center gap-4",
        className
      )}
    >
      <div className="p-3 rounded-full bg-rose-50 text-rose-500">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <h3 className="text-2xl font-bold text-stone-900">{value}</h3>
      </div>
    </div>
  );
}
