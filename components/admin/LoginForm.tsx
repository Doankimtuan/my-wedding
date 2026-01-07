"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // Assuming I check components later, I'll use standard input for now or check

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // If success, redirect happens in server action
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-stone-700" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          placeholder="admin@example.com"
        />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-stone-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-rose-600 hover:bg-rose-700 text-white"
        disabled={loading}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        Sign In
      </Button>
    </form>
  );
}
