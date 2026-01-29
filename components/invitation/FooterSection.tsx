"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWedding, defaultWeddingInfo } from "./WeddingContext";

export function FooterSection() {
  // Get wedding info from context
  const { weddingInfo } = useWedding();
  const info = weddingInfo || defaultWeddingInfo;

  // Format date
  const weddingDate = new Date(info.wedding_date);
  const day = weddingDate.getDate().toString().padStart(2, "0");
  const month = (weddingDate.getMonth() + 1).toString().padStart(2, "0");
  const year = weddingDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <footer className="relative px-6 py-20 text-center bg-gradient-to-b from-[var(--wedding-bg-paper)] to-[#F5F0E8] overflow-hidden">
      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-8 left-0 w-20 h-32 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 70 130" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q15 30 12 65 Q9 100 22 130"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="20"
            cy="40"
            rx="9"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 20 40)"
          />
          <ellipse
            cx="14"
            cy="75"
            rx="7"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(12 14 75)"
          />
          <ellipse
            cx="18"
            cy="100"
            rx="5"
            ry="2"
            fill="#A8B5A0"
            fillOpacity="0.15"
            transform="rotate(-8 18 100)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — RIGHT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-8 right-0 w-20 h-32 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 70 130"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M0 0 Q15 30 12 65 Q9 100 22 130"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="20"
            cy="40"
            rx="9"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 20 40)"
          />
          <ellipse
            cx="14"
            cy="75"
            rx="7"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(12 14 75)"
          />
          <ellipse
            cx="18"
            cy="100"
            rx="5"
            ry="2"
            fill="#A8B5A0"
            fillOpacity="0.15"
            transform="rotate(-8 18 100)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          COUPLE ILLUSTRATION — Premium styling
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="w-36 h-36 mx-auto mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Soft background glow */}
          <defs>
            <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
              <stop
                offset="0%"
                stopColor="var(--wedding-accent)"
                stopOpacity="0.15"
              />
              <stop
                offset="100%"
                stopColor="var(--wedding-accent)"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>

          {/* Background heart with glow */}
          <motion.path
            d="M100 175 C60 140 25 105 25 70 C25 40 48 22 75 22 C88 22 100 35 100 35 C100 35 112 22 125 22 C152 22 175 40 175 70 C175 105 140 140 100 175Z"
            fill="url(#heartGlow)"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Groom */}
          <g transform="translate(55, 50)">
            {/* Head */}
            <circle cx="20" cy="15" r="13" fill="#F5E6D3" />
            {/* Hair */}
            <path
              d="M9 10 Q14 3 20 3 Q26 3 31 10 Q28 6 20 6 Q12 6 9 10Z"
              fill="#3D2817"
            />
            {/* Suit */}
            <path d="M6 32 Q20 26 34 32 L38 90 L2 90 Z" fill="#2A2A2A" />
            {/* Shirt collar */}
            <path
              d="M15 32 L20 45 L25 32"
              stroke="#FFFFFF"
              strokeWidth="3"
              fill="none"
            />
            {/* Tie */}
            <path d="M17 35 L20 50 L23 35" fill="var(--wedding-accent)" />
            {/* Lapels */}
            <path d="M10 32 L15 45 L15 32 Z" fill="#1A1A1A" />
            <path d="M30 32 L25 45 L25 32 Z" fill="#1A1A1A" />
          </g>

          {/* Bride */}
          <g transform="translate(100, 45)">
            {/* Head */}
            <circle cx="25" cy="18" r="13" fill="#F5E6D3" />
            {/* Hair */}
            <path
              d="M13 13 Q16 2 25 2 Q34 2 37 13 Q38 8 36 18 Q34 10 25 9 Q16 10 14 18 Q12 8 13 13Z"
              fill="#3D2817"
            />
            {/* Veil */}
            <path
              d="M13 13 Q6 16 9 32 Q12 22 25 22 Q38 22 41 32 Q44 16 37 13"
              fill="#FFFFFF"
              fillOpacity="0.4"
              stroke="#E8E8E8"
              strokeWidth="0.5"
            />
            {/* Dress */}
            <path
              d="M12 36 Q25 30 38 36 L52 95 L-2 95 Z"
              fill="#FFFFFF"
              stroke="#E8E0D5"
              strokeWidth="1"
            />
            {/* Dress lace details */}
            <path
              d="M5 65 Q15 60 25 65 Q35 60 45 65"
              stroke="#E8D5D0"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M2 78 Q14 72 25 78 Q36 72 48 78"
              stroke="#E8D5D0"
              strokeWidth="1"
              fill="none"
            />
            {/* Bouquet */}
            <g transform="translate(8, 52)">
              <circle cx="8" cy="7" r="5" fill="#F5D5D5" />
              <circle cx="13" cy="5" r="4" fill="#E8C0C0" />
              <circle cx="5" cy="4" r="3.5" fill="#FFE8E5" />
              <circle cx="11" cy="9" r="3" fill="#F8E5E5" />
              <path d="M9 12 L7 19" stroke="#7C9A73" strokeWidth="1.5" />
              <path d="M9 12 L11 19" stroke="#7C9A73" strokeWidth="1.5" />
            </g>
          </g>

          {/* Floating hearts */}
          <motion.g
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M95 38 C92.5 35.5 89 35.5 89 38.5 C89 41 95 45 95 45 C95 45 101 41 101 38.5 C101 35.5 97.5 35.5 95 38Z"
              fill="var(--wedding-accent)"
              fillOpacity="0.5"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          THANK YOU MESSAGE
          ═══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h3 className="font-script text-5xl text-[var(--wedding-accent)] mb-4 tracking-wide">
          Thank You
        </h3>
      </motion.div>

      <motion.p
        className="font-body text-sm text-[var(--wedding-text-muted)] mb-8 leading-relaxed max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Cảm ơn bạn đã dành thời gian xem thiệp cưới của chúng tôi.
        <br />
        Sự hiện diện của bạn sẽ là niềm vinh dự lớn với gia đình hai bên.
      </motion.p>

      {/* ═══════════════════════════════════════════════
          COUPLE NAMES — Premium styling
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className="font-script text-2xl text-[var(--wedding-secondary)]">
          {info.groom_name}
        </span>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart
            size={16}
            className="text-[var(--wedding-accent)] fill-[var(--wedding-accent)]"
          />
        </motion.div>
        <span className="font-script text-2xl text-[var(--wedding-secondary)]">
          {info.bride_name}
        </span>
      </motion.div>

      {/* Date with ornamental dividers */}
      <motion.div
        className="flex items-center justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
        <p className="font-serif-numbers text-sm text-[var(--wedding-text-muted)] tracking-[0.25em]">
          {formattedDate}
        </p>
        <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
      </motion.div>

      {/* ═══════════════════════════════════════════════
          MADE WITH LOVE — Premium footer
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="pt-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Ornamental top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-border)]" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="text-[var(--wedding-accent)] opacity-50"
          >
            <path
              d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z"
              fill="currentColor"
            />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-border)]" />
        </div>

        <p className="font-body text-[10px] text-[var(--wedding-text-muted)] tracking-[0.2em] uppercase pt-4 flex items-center justify-center gap-1.5">
          Made with
          <Heart
            size={10}
            className="text-[var(--wedding-accent)] fill-[var(--wedding-accent)]"
          />
          for our special day
        </p>
      </motion.div>
    </footer>
  );
}
