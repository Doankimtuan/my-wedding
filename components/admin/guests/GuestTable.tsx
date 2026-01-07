"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteGuest } from "@/app/actions/guests";

interface Guest {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  group: string | null;
  invitation_sent: boolean;
  rsvp: Array<{ attending: boolean; number_of_guests: number }> | null;
}

interface GuestTableProps {
  guests: Guest[];
}

export function GuestTable({ guests }: GuestTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const copyInvitationLink = (slug: string, id: string) => {
    // Determine base URL (default to window.location.origin)
    // The invitation is at /invitation?guest=slug based on my plan
    // Wait, the page logic 'app/invitation/page.tsx' reads 'guest' param.
    // The previous code had '/?guest=', but the file structure is 'app/invitation/page.tsx', so the URL is '/invitation'.
    // If 'app/page.tsx' redirects to invitation, then '/' is fine, but I should use '/invitation' to be safe.

    // Correction: Checking 'app/page.tsx' in finding (Step 9) showed it's 102 bytes. It might just redirect.
    // But 'app/invitation/page.tsx' definitely exists.
    // Safest bet: '${window.location.origin}/invitation?guest=${slug}'

    const link = `${window.location.origin}/invitation?guest=${slug}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    setDeletingId(id);
    const result = await deleteGuest(id);
    if (result?.error) {
      alert(`Error: ${result.error}`);
    }
    setDeletingId(null);
  };

  const getRsvpStatus = (guest: Guest) => {
    if (!guest.rsvp || guest.rsvp.length === 0) {
      return <span className="text-stone-400 text-sm">No Response</span>;
    }
    const rsvp = guest.rsvp[0];
    if (rsvp.attending) {
      return (
        <span className="text-green-600 text-sm font-medium">
          ✓ Attending ({rsvp.number_of_guests})
        </span>
      );
    }
    return <span className="text-red-500 text-sm">✗ Declined</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Slug
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Group
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                RSVP
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Invitation
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-stone-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {guests.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-stone-400"
                >
                  No guests yet. Add your first guest to get started.
                </td>
              </tr>
            ) : (
              guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-stone-900">
                      {guest.name}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-stone-100 px-2 py-1 rounded text-stone-600">
                      {guest.slug}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-stone-600">
                      {guest.group || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-stone-600">
                      {guest.email && <div>{guest.email}</div>}
                      {guest.phone && (
                        <div className="text-xs text-stone-400">
                          {guest.phone}
                        </div>
                      )}
                      {!guest.email && !guest.phone && "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3">{getRsvpStatus(guest)}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyInvitationLink(guest.slug, guest.id)}
                      className="text-xs"
                    >
                      {copiedId === guest.id ? (
                        <>
                          <Check className="w-3 h-3 mr-1" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" /> Link
                        </>
                      )}
                    </Button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/guests/${guest.id}/edit`}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(guest.id, guest.name)}
                        disabled={deletingId === guest.id}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
