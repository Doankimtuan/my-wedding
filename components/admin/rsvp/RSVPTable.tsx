"use client";

interface RSVPWithGuest {
  id: string;
  attending: boolean;
  number_of_guests: number;
  dietary_restrictions: string | null;
  message: string | null;
  created_at: string;
  guests: {
    name: string;
    email: string | null;
    phone: string | null;
    group: string | null;
  } | null;
}

interface RSVPTableProps {
  rsvps: RSVPWithGuest[];
}

export function RSVPTable({ rsvps }: RSVPTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Guest
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Guests
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Dietary
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Message
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600 uppercase">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {rsvps.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-stone-400"
                >
                  No RSVPs yet.
                </td>
              </tr>
            ) : (
              rsvps.map((rsvp) => (
                <tr
                  key={rsvp.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-stone-900">
                        {rsvp.guests?.name || "Unknown"}
                      </div>
                      {rsvp.guests?.email && (
                        <div className="text-xs text-stone-500">
                          {rsvp.guests.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {rsvp.attending ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Attending
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        ✗ Declined
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-stone-900 font-medium">
                      {rsvp.number_of_guests || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-stone-600 max-w-xs truncate">
                      {rsvp.dietary_restrictions || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-stone-600 max-w-xs truncate">
                      {rsvp.message || "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-stone-500">
                      {new Date(rsvp.created_at).toLocaleDateString()}
                    </span>
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
