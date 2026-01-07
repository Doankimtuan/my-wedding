"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Heart, RefreshCw } from "lucide-react";

interface Wish {
  id: string;
  guest_name: string;
  message: string;
  created_at: string | null;
}

const POLL_INTERVAL = 10000; // Poll every 10 seconds

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch wishes from API
  const fetchWishes = useCallback(async () => {
    try {
      const response = await fetch("/api/wishes");
      if (response.ok) {
        const data = await response.json();
        setWishes(data);
      }
    } catch (error) {
      console.error("Failed to fetch wishes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and polling for real-time updates
  useEffect(() => {
    fetchWishes();

    // Set up polling for real-time updates
    const pollInterval = setInterval(fetchWishes, POLL_INTERVAL);

    return () => clearInterval(pollInterval);
  }, [fetchWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: newWish.name.trim(),
          message: newWish.message.trim(),
        }),
      });

      if (response.ok) {
        const createdWish = await response.json();
        setWishes((prev) => [createdWish, ...prev]);
        setNewWish({ name: "", message: "" });
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        console.error("Failed to submit wish");
      }
    } catch (error) {
      console.error("Failed to submit wish:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative px-6 py-16 bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-12 left-0 w-16 h-28 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 60 110" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q12 25 10 55 Q8 85 18 110"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
          <ellipse
            cx="12"
            cy="65"
            rx="5"
            ry="2"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(15 12 65)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — RIGHT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-12 right-0 w-16 h-28 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 60 110"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M0 0 Q12 25 10 55 Q8 85 18 110"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
          <ellipse
            cx="12"
            cy="65"
            rx="5"
            ry="2"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(15 12 65)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          HEADER — Section title with ornamental elements
          ═══════════════════════════════════════════════ */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-accent)] opacity-60">
            Lời Chúc
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
        </div>
        <h3 className="font-script text-4xl text-[var(--wedding-secondary)] mb-2">
          Gửi Lời Chúc
        </h3>
        <p className="font-body text-sm text-[var(--wedding-text-muted)] italic">
          Hãy gửi những lời chúc tốt đẹp nhất đến cô dâu chú rể
        </p>
      </div>

      {/* ═══════════════════════════════════════════════
          WISH FORM — Premium styled input form
          ═══════════════════════════════════════════════ */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mb-10 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="bg-white rounded-xl p-5 relative overflow-hidden"
          style={{
            boxShadow: "0 8px 24px -4px rgba(61, 53, 46, 0.08)",
            border: "1px solid rgba(197, 168, 109, 0.15)",
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--wedding-accent)]/20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--wedding-accent)]/20" />

          {/* Name input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tên của bạn"
              value={newWish.name}
              onChange={(e) =>
                setNewWish((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-lg font-body text-sm text-[var(--wedding-secondary)] placeholder:text-[var(--wedding-text-muted)]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--wedding-accent)]/30"
              style={{
                background: "rgba(250, 247, 243, 0.8)",
                border: "1px solid rgba(197, 168, 109, 0.1)",
              }}
            />
          </div>

          {/* Message textarea */}
          <div className="mb-4">
            <textarea
              placeholder="Viết lời chúc của bạn..."
              value={newWish.message}
              onChange={(e) =>
                setNewWish((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg font-body text-sm text-[var(--wedding-secondary)] placeholder:text-[var(--wedding-text-muted)]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--wedding-accent)]/30 resize-none"
              style={{
                background: "rgba(250, 247, 243, 0.8)",
                border: "1px solid rgba(197, 168, 109, 0.1)",
              }}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={
              isSubmitting || !newWish.name.trim() || !newWish.message.trim()
            }
            className="w-full py-2.5 px-4 rounded-lg font-body text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: submitSuccess
                ? "linear-gradient(135deg, #7c9a73 0%, #5a7a53 100%)"
                : "linear-gradient(135deg, var(--wedding-accent) 0%, #b8963d 100%)",
              color: "white",
              boxShadow: "0 4px 12px rgba(197, 168, 109, 0.25)",
            }}
          >
            {isSubmitting ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : submitSuccess ? (
              <>
                <Heart size={16} className="fill-current" />
                Đã gửi lời chúc!
              </>
            ) : (
              <>
                <Heart size={16} />
                Gửi lời chúc
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* ═══════════════════════════════════════════════
          WISHES LIST — Scrollable container with real-time updates
          ═══════════════════════════════════════════════ */}
      <div
        className="max-h-[400px] overflow-y-auto pr-2 space-y-4 max-w-sm mx-auto"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(197, 168, 109, 0.3) transparent",
        }}
      >
        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw
              size={24}
              className="animate-spin text-[var(--wedding-accent)] mx-auto mb-2"
            />
            <p className="font-body text-sm text-[var(--wedding-text-muted)]">
              Đang tải lời chúc...
            </p>
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center py-8">
            <Heart
              size={32}
              className="text-[var(--wedding-accent)] opacity-30 mx-auto mb-2"
            />
            <p className="font-body text-sm text-[var(--wedding-text-muted)]">
              Hãy là người đầu tiên gửi lời chúc!
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {wishes.map((wish, index) => (
              <motion.div
                key={wish.id}
                className="relative"
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div
                  className="bg-white/80 rounded-xl p-5 relative"
                  style={{
                    boxShadow: "0 4px 16px rgba(61, 53, 46, 0.06)",
                    border: "1px solid rgba(197, 168, 109, 0.1)",
                  }}
                >
                  {/* Decorative quote mark */}
                  <div className="absolute -top-2 -left-1 w-6 h-6 flex items-center justify-center">
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 24 18"
                      className="text-[var(--wedding-accent)] opacity-30"
                    >
                      <path
                        d="M0 18V10.5C0 4.5 4 0.5 10 0V3.5C7 4.5 5.5 6.5 5.5 9H10V18H0ZM14 18V10.5C14 4.5 18 0.5 24 0V3.5C21 4.5 19.5 6.5 19.5 9H24V18H14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>

                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(197, 168, 109, 0.2) 0%, rgba(197, 168, 109, 0.1) 100%)",
                        border: "1px solid rgba(197, 168, 109, 0.2)",
                      }}
                    >
                      <span className="font-display text-sm text-[var(--wedding-accent)]">
                        {wish.guest_name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-[var(--wedding-secondary)] mb-1 tracking-wide">
                        {wish.guest_name}
                      </p>
                      <p className="font-body text-sm text-[var(--wedding-text-muted)] leading-relaxed italic">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM DIVIDER — Section end decoration
          ═══════════════════════════════════════════════ */}
      <div className="flex items-center justify-center gap-3 mt-10">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/30" />
        <Heart size={12} className="text-[var(--wedding-accent)] opacity-40" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/30" />
      </div>
    </section>
  );
}
