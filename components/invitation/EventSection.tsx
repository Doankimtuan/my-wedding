"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { useWedding, defaultWeddingInfo } from "./WeddingContext";

export function EventSection() {
  const { weddingInfo } = useWedding();
  const info = weddingInfo || defaultWeddingInfo;

  // Parse date and time
  const weddingDate = new Date(info.wedding_date);
  const timeStr = info.wedding_time || "16:00";

  // Format date parts
  const day = weddingDate.getDate().toString().padStart(2, "0");
  const month = (weddingDate.getMonth() + 1).toString().padStart(2, "0");
  const year = weddingDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  // Get day of week in Vietnamese
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const dayOfWeek = daysOfWeek[weddingDate.getDay()];

  // Venue info from database or defaults
  const venueName = info.venue_name || "Tư Gia Nhà Gái";
  const venueAddress =
    info.venue_address || "124 Đường Chiến Thắng, Lê Chân, Hải Phòng";
  const mapUrl =
    info.venue_map_url ||
    `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`;

  const handleOpenMap = () => {
    window.open(mapUrl, "_blank");
  };

  return (
    <section className="relative px-6 py-16 text-center overflow-hidden bg-[var(--wedding-bg-paper)]">
      {/* Botanical decorations */}
      <motion.div
        className="absolute top-8 left-0 w-16 h-32 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 60 120" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q15 30 10 60 Q5 90 15 120"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="18"
            cy="40"
            rx="8"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-15 18 40)"
          />
          <ellipse
            cx="12"
            cy="70"
            rx="6"
            ry="2.5"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(10 12 70)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-8 right-0 w-16 h-32 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 60 120"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M0 0 Q15 30 10 60 Q5 90 15 120"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="18"
            cy="40"
            rx="8"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-15 18 40)"
          />
          <ellipse
            cx="12"
            cy="70"
            rx="6"
            ry="2.5"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(10 12 70)"
          />
        </svg>
      </motion.div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-accent)] opacity-60">
            Thông tin sự kiện
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
        </div>
      </div>

      {/* Event Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-body text-sm text-[var(--wedding-primary)] leading-relaxed mb-6 opacity-70">
          Đến dự buổi tiệc chung vui
          <br />
          cùng gia đình chúng tôi vào lúc
        </p>

        {/* Time and date */}
        <div className="flex flex-row items-center justify-center gap-3 mb-4">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="font-serif-numbers text-3xl sm:text-4xl text-[var(--wedding-secondary)] font-light">
              {timeStr}
            </span>
          </motion.div>

          <div className="w-[1px] h-8 bg-[var(--wedding-accent)]/30" />

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-display text-xl sm:text-2xl text-[var(--wedding-secondary)]">
              {dayOfWeek}
            </span>
          </motion.div>

          <div className="w-[1px] h-8 bg-[var(--wedding-accent)]/30" />

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-serif-numbers text-3xl sm:text-4xl text-[var(--wedding-secondary)] font-light">
              {formattedDate}
            </span>
          </motion.div>
        </div>

        <p className="font-body text-xs text-[var(--wedding-text-muted)] italic mb-8 opacity-60">
          (Nhằm ngày 03 tháng 09 năm Ất Tỵ)
        </p>
      </motion.div>

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="text-[var(--wedding-accent)]"
        >
          <path
            d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
      </div>

      {/* Venue Card */}
      <motion.div
        className="mx-auto max-w-sm relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div
          className="bg-white rounded-xl p-6 relative overflow-hidden"
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

          <p className="font-body text-[10px] tracking-[0.25em] text-[var(--wedding-primary)] uppercase mb-3 opacity-60">
            Hôn lễ được cử hành tại
          </p>

          <h4 className="font-display text-2xl text-[var(--wedding-secondary)] mb-3 tracking-wide">
            {venueName}
          </h4>

          <p className="font-body text-sm text-[var(--wedding-text-muted)] mb-6 leading-relaxed">
            {venueAddress}
          </p>

          {/* Map button */}
          <button
            onClick={handleOpenMap}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, var(--wedding-accent) 0%, #b8963d 100%)",
              color: "white",
              boxShadow: "0 4px 12px rgba(197, 168, 109, 0.25)",
            }}
          >
            <MapPin size={16} />
            <span className="font-body text-sm tracking-wider">
              Xem đường đi
            </span>
            <ExternalLink size={14} />
          </button>
        </div>
      </motion.div>

      {/* Invitation Message */}
      <motion.div
        className="mt-10 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex justify-center mb-3">
          <svg
            width="20"
            height="14"
            viewBox="0 0 24 18"
            className="text-[var(--wedding-accent)] opacity-30"
          >
            <path
              d="M0 18V10.5C0 4.5 4 0.5 10 0V3.5C7 4.5 5.5 6.5 5.5 9H10V18H0ZM14 18V10.5C14 4.5 18 0.5 24 0V3.5C21 4.5 19.5 6.5 19.5 9H24V18H14Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="font-body text-sm text-[var(--wedding-text-muted)] italic leading-relaxed opacity-70">
          Gửi đến bạn tấm thiệp cưới đầy yêu thương.
          <br />
          Những ai nhận được lời mời này đều là những người đặc biệt với bọn
          mình.
          <br />
          Mong bạn và gia đình sẽ đến chung vui.
        </p>
      </motion.div>
    </section>
  );
}
