"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Send, Check, Users, Heart } from "lucide-react";

interface RSVPSectionProps {
  defaultName: string | null;
}

import { useSearchParams } from "next/navigation";

// ... imports remain ...

export function RSVPSection({ defaultName }: RSVPSectionProps) {
  const searchParams = useSearchParams();
  const guestSlug = searchParams.get("guest");
  // If slug exists, we rely on it. The name is for display.
  // Actually, 'defaultName' prop comes from page.tsx which reads searchParams.
  // But we need the raw slug for the API.

  const [formData, setFormData] = useState({
    name: defaultName,
    attending: "yes",
    guests: "1",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send slug if available (high trust), otherwise send name (fallback lookup)
        body: JSON.stringify({
          ...formData,
          slug: guestSlug || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("RSVP submission failed:", error);
      // Safe error handling
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      name: defaultName,
    });
  }, [defaultName]);

  return (
    <section className="relative px-6 py-20 bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* ... decorations ... */}

      {/* ... header ... */}

      {isSubmitted ? (
        // ... success state ...
        <motion.div
          className="text-center py-8 max-w-sm mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* ... existing success UI ... */}
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(140, 180, 140, 0.15) 0%, rgba(140, 180, 140, 0.05) 100%)",
              border: "1px solid rgba(140, 180, 140, 0.3)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Check className="w-10 h-10 text-[#A8B5A0]" />
          </motion.div>
          <h4 className="font-display text-2xl text-[var(--wedding-secondary)] mb-3">
            Cảm ơn bạn!
          </h4>
          <p className="font-body text-sm text-[var(--wedding-text-muted)] leading-relaxed">
            Chúng tôi đã nhận được xác nhận của bạn.
            <br />
            Hẹn gặp bạn trong ngày trọng đại!
          </p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div
            className="bg-white rounded-xl p-8 relative overflow-hidden"
            style={{
              boxShadow: `
                0 20px 40px -10px rgba(61, 53, 46, 0.1),
                0 8px 16px -6px rgba(61, 53, 46, 0.08)
              `,
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[var(--wedding-accent)]/20 rounded-tl" />
            <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[var(--wedding-accent)]/20 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[var(--wedding-accent)]/20 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[var(--wedding-accent)]/20 rounded-br" />

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs text-center font-body">
                {errorMsg}
              </div>
            )}

            {/* Name input */}
            <div className="mb-5">
              <label className="block font-body text-xs tracking-[0.15em] text-[var(--wedding-primary)] uppercase mb-2 opacity-60">
                Họ và tên
              </label>
              <input
                type="text"
                value={formData.name || ""}
                // If slug is present, make name readonly to ensure deterministic link
                readOnly={defaultName !== "Quý Khách"}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nhập tên của bạn"
                className={`w-full px-4 py-3 rounded-lg font-body text-sm text-[var(--wedding-secondary)] placeholder-[var(--wedding-text-muted)]/50 transition-all duration-300 focus:outline-none ${
                  defaultName ? "opacity-60 cursor-not-allowed" : ""
                }`}
                style={{
                  background: "rgba(250, 247, 243, 0.8)",
                  border: "1px solid rgba(197, 168, 109, 0.2)",
                }}
                required
              />
              {!defaultName && (
                <p className="mt-1 text-[10px] text-[var(--wedding-text-muted)] opacity-25">
                  Vui lòng nhập chính xác tên như trên thiệp mời.
                </p>
              )}
            </div>

            {/* Attendance radio — Custom styling */}
            <div className="mb-5">
              <label className="block font-body text-xs tracking-[0.15em] text-[var(--wedding-primary)] uppercase mb-3 opacity-60">
                Bạn sẽ tham dự chứ?
              </label>
              <div className="space-y-2">
                {[
                  { value: "yes", label: "Có, tôi sẽ tham dự", icon: Heart },
                  { value: "no", label: "Rất tiếc, tôi không thể tham dự" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      formData.attending === option.value
                        ? "bg-[var(--wedding-accent)]/10 border-[var(--wedding-accent)]/30"
                        : "bg-[var(--wedding-bg-paper)]/50 border-transparent hover:bg-[var(--wedding-bg-paper)]"
                    }`}
                    style={{ border: "1px solid" }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        formData.attending === option.value
                          ? "border-[var(--wedding-accent)] bg-[var(--wedding-accent)]"
                          : "border-[var(--wedding-text-muted)]/30"
                      }`}
                    >
                      {formData.attending === option.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={formData.attending === option.value}
                      onChange={(e) =>
                        setFormData({ ...formData, attending: e.target.value })
                      }
                      className="sr-only"
                    />
                    <span className="font-body text-sm text-[var(--wedding-secondary)]">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest count */}
            {formData.attending === "yes" && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block font-body text-xs tracking-[0.15em] text-[var(--wedding-primary)] uppercase mb-2 opacity-60">
                  <Users size={12} className="inline mr-1" />
                  Số lượng người tham dự
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg font-body text-sm text-[var(--wedding-secondary)] transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
                  style={{
                    background: "rgba(250, 247, 243, 0.8)",
                    border: "1px solid rgba(197, 168, 109, 0.2)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23997b4d' d='M6 8L2 4h8z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} người
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Message Input */}
            <div className="mb-6">
              <label className="block font-body text-xs tracking-[0.15em] text-[var(--wedding-primary)] uppercase mb-2 opacity-60">
                Lời nhắn (Tùy chọn)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Gửi lời chúc đến cô dâu & chú rể..."
                rows={2}
                className="w-full px-4 py-3 rounded-lg font-body text-sm text-[var(--wedding-secondary)] placeholder-[var(--wedding-text-muted)]/50 transition-all duration-300 focus:outline-none resize-none"
                style={{
                  background: "rgba(250, 247, 243, 0.8)",
                  border: "1px solid rgba(197, 168, 109, 0.2)",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-25 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, var(--wedding-accent) 0%, #b8963d 100%)",
                color: "white",
                boxShadow: "0 4px 12px rgba(197, 168, 109, 0.25)",
              }}
            >
              {isSubmitting ? (
                <span className="font-body text-sm tracking-wider animate-pulse">
                  Đang gửi...
                </span>
              ) : (
                <>
                  <Send size={16} />
                  <span className="font-body text-sm tracking-wider">
                    Gửi xác nhận
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </section>
  );
}
