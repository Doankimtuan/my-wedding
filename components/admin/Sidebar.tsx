"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  LayoutDashboard,
  Settings,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Guests", href: "/admin/guests", icon: Users },
  { name: "RSVPs", href: "/admin/rsvps", icon: Mail },
  { name: "Wishes", href: "/admin/wishes", icon: MessageSquare },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Album", href: "/admin/album", icon: ImageIcon },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-stone-900 text-stone-300 min-h-screen border-r border-stone-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white font-playfair tracking-wider">
          Wedding Admin
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-rose-600/20 text-rose-400"
                  : "hover:bg-stone-800 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800 text-xs text-stone-600 text-center">
        v1.0.0
      </div>
    </div>
  );
}
