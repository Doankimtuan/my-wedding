"use client";

import { useState } from "react";
import { Check, X, Trash2, Edit2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  approveWish,
  unapproveWish,
  deleteWish,
  updateWishMessage,
} from "@/app/actions/wishes-admin";

interface WishCardProps {
  wish: {
    id: string;
    guest_name: string;
    message: string;
    is_approved: boolean;
    created_at: string;
  };
}

export function WishCardAdmin({ wish }: WishCardProps) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(wish.message);

  const handleApprove = async () => {
    setLoading(true);
    await approveWish(wish.id);
    setLoading(false);
  };

  const handleUnapprove = async () => {
    setLoading(true);
    await unapproveWish(wish.id);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete wish from ${wish.guest_name}?`)) return;
    setLoading(true);
    await deleteWish(wish.id);
    setLoading(false);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    await updateWishMessage(wish.id, editedMessage);
    setEditing(false);
    setLoading(false);
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        wish.is_approved
          ? "bg-green-50/50 border-green-200"
          : "bg-orange-50/50 border-orange-200"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-stone-900">{wish.guest_name}</h4>
          <p className="text-xs text-stone-500">
            {new Date(wish.created_at).toLocaleString()}
          </p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            wish.is_approved
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {wish.is_approved ? "Approved" : "Pending"}
        </span>
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            className="w-full p-2 border border-stone-200 rounded-md text-sm"
            rows={3}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSaveEdit} disabled={loading}>
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-stone-700 mb-3 italic">"{wish.message}"</p>

          <div className="flex gap-2 flex-wrap">
            {!wish.is_approved ? (
              <Button
                size="sm"
                onClick={handleApprove}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="w-3 h-3 mr-1" />
                Approve
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleUnapprove}
                disabled={loading}
                variant="outline"
              >
                <X className="w-3 h-3 mr-1" />
                Unapprove
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
            >
              <Edit2 className="w-3 h-3 mr-1" />
              Edit
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              disabled={loading}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
