"use client";

import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 border-b border-stone-200 bg-white px-6 flex items-center justify-between">
      <div className="text-sm text-stone-500 font-medium">Welcome Name</div>

      <form action={logout}>
        <Button
          variant="ghost"
          size="sm"
          className="text-stone-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </form>
    </header>
  );
}
