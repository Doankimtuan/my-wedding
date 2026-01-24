"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import groomPhoto from "@/assets/images/groom.jpg";
import bridePhoto from "@/assets/images/bride.jpg";
import { useWedding, defaultWeddingInfo } from "./WeddingContext";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  // Get wedding info from context
  const { weddingInfo } = useWedding();
  const info = weddingInfo || defaultWeddingInfo;

  // Parse date
  const weddingDate = new Date(info.wedding_date);
  const day = weddingDate.getDate().toString().padStart(2, "0");
  const month = (weddingDate.getMonth() + 1).toString().padStart(2, "0");
  const year = weddingDate.getFullYear();

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Korean Minimal: Clean background without radial glow */}

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-4 left-2 w-28 h-36 pointer-events-none opacity-25"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <svg viewBox="0 0 120 150" fill="none" className="w-full h-full">
          {/* Stems */}
          <path
            d="M10 0 Q25 40 20 80 Q15 110 25 150"
            stroke="#A8B5A0"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M5 20 Q30 35 45 25"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M15 50 Q40 60 55 50"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />

          {/* Leaves */}
          <ellipse
            cx="30"
            cy="35"
            rx="12"
            ry="5"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-25 30 35)"
          />
          <ellipse
            cx="40"
            cy="55"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.3"
            transform="rotate(15 40 55)"
          />
          <ellipse
            cx="22"
            cy="75"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-10 22 75)"
          />

          {/* Small flowers */}
          <g transform="translate(50, 30)">
            <circle cx="0" cy="0" r="4" fill="#f5efe8" />
            <circle cx="0" cy="0" r="2" fill="#c5a86d" fillOpacity="0.6" />
          </g>
          <g transform="translate(55, 55)">
            <circle cx="0" cy="0" r="3" fill="#f5efe8" />
            <circle cx="0" cy="0" r="1.5" fill="#c5a86d" fillOpacity="0.6" />
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP RIGHT (mirrored)
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-4 right-2 w-28 h-36 pointer-events-none opacity-25"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.25, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <svg
          viewBox="0 0 120 150"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M10 0 Q25 40 20 80 Q15 110 25 150"
            stroke="#A8B5A0"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M5 20 Q30 35 45 25"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M15 50 Q40 60 55 50"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="30"
            cy="35"
            rx="12"
            ry="5"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-25 30 35)"
          />
          <ellipse
            cx="40"
            cy="55"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.3"
            transform="rotate(15 40 55)"
          />
          <ellipse
            cx="22"
            cy="75"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-10 22 75)"
          />
          <g transform="translate(50, 30)">
            <circle cx="0" cy="0" r="4" fill="#f5efe8" />
            <circle cx="0" cy="0" r="2" fill="#c5a86d" fillOpacity="0.6" />
          </g>
          <g transform="translate(55, 55)">
            <circle cx="0" cy="0" r="3" fill="#f5efe8" />
            <circle cx="0" cy="0" r="1.5" fill="#c5a86d" fillOpacity="0.6" />
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          HEADER — With ornamental divider
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 text-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-primary)] opacity-60 mb-4">
          We are getting married
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/50" />
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className="text-[var(--wedding-accent)]"
          >
            <path
              d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/50" />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          PHOTO GRID — With glow effects and connecting arc
          ═══════════════════════════════════════════════ */}
      <div className="relative w-full max-w-[440px] mx-auto px-4 mb-6">
        <div className="flex items-start justify-center gap-8">
          {/* ─────────────────────────────────────────────
              GROOM CARD — Left side
              ───────────────────────────────────────────── */}
          <motion.div
            style={{ y: y1 }}
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Photo container with glow */}
            <div className="relative mb-4">
              {/* Outer glow effect */}
              <div
                className="absolute -inset-4 rounded-lg opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(197, 168, 109, 0.15) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Photo frame with double border */}
              <motion.div
                className="relative w-[130px] sm:w-[160px] aspect-[3/4] rounded-sm overflow-hidden"
                style={{
                  boxShadow: `
                    0 20px 40px -10px rgba(61, 53, 46, 0.2),
                    0 10px 20px -5px rgba(61, 53, 46, 0.1),
                    inset 0 0 0 1px rgba(197, 168, 109, 0.2)
                  `,
                  border: "3px solid white",
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Photo content */}
                <div className="w-full h-full relative">
                  <Image
                    src={groomPhoto}
                    alt={info.groom_name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4b895]/10 to-transparent" />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.08) 100%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Name with underline accent */}
            <h2 className="font-display text-xl sm:text-2xl text-[var(--wedding-secondary)] tracking-wide mb-1">
              {info.groom_name}
            </h2>
            <div className="w-8 h-[1px] bg-[var(--wedding-accent)]/40 mb-1" />
            <p className="font-body text-[8px] tracking-[0.25em] uppercase text-[var(--wedding-text-muted)]">
              The Groom
            </p>
          </motion.div>

          {/* ─────────────────────────────────────────────
              CENTER DECORATION — Connecting element
              ───────────────────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center justify-center pt-16 sm:pt-20"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            {/* Upper decorative line */}
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[var(--wedding-accent)]/30 to-[var(--wedding-accent)]/50" />

            {/* Ampersand with ring */}
            <div className="relative my-2">
              <div className="absolute -inset-3 rounded-full border border-[var(--wedding-accent)]/20" />
              <span className="font-script text-3xl sm:text-4xl text-[var(--wedding-accent)] block">
                &
              </span>
            </div>

            {/* Lower decorative line */}
            <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--wedding-accent)]/50 via-[var(--wedding-accent)]/30 to-transparent" />
          </motion.div>

          {/* ─────────────────────────────────────────────
              BRIDE CARD — Right side
              ───────────────────────────────────────────── */}
          <motion.div
            style={{ y: y2 }}
            className="flex flex-col items-center relative"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Photo container with glow */}
            <div className="relative mb-4">
              {/* Outer glow effect — slightly warmer for bride */}
              <div
                className="absolute -inset-4 rounded-lg opacity-25"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(212, 168, 168, 0.12) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
              />

              {/* Photo frame */}
              <motion.div
                className="relative w-[130px] sm:w-[160px] aspect-[3/4] rounded-sm overflow-hidden"
                style={{
                  boxShadow: `
                    0 20px 40px -10px rgba(61, 53, 46, 0.2),
                    0 10px 20px -5px rgba(61, 53, 46, 0.1),
                    inset 0 0 0 1px rgba(197, 168, 109, 0.2)
                  `,
                  border: "3px solid white",
                }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                {/* Photo content */}
                <div className="w-full h-full relative">
                  <Image
                    src={bridePhoto}
                    alt={info.bride_name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4a5a5]/10 to-transparent" />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.08) 100%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Name with underline accent */}
            <h2 className="font-display text-xl sm:text-2xl text-[var(--wedding-secondary)] tracking-wide mb-1">
              {info.bride_name}
            </h2>
            <div className="w-8 h-[1px] bg-[var(--wedding-accent)]/40 mb-1" />
            <p className="font-body text-[8px] tracking-[0.25em] uppercase text-[var(--wedding-text-muted)]">
              The Bride
            </p>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DATE & LOCATION — With ornamental frame
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="text-center relative z-30 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        {/* Top ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="text-[var(--wedding-accent)]"
          >
            <circle cx="4" cy="4" r="2" fill="currentColor" opacity="0.5" />
          </svg>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
        </div>

        {/* Date */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[var(--wedding-secondary)] mb-2">
          <span className="font-serif-numbers text-2xl sm:text-3xl font-light">
            {day}
          </span>
          <span className="text-xl opacity-50">·</span>
          <span className="font-serif-numbers text-2xl sm:text-3xl font-light">
            {month}
          </span>
          <span className="text-xl opacity-50">·</span>
          <span className="font-serif-numbers text-2xl sm:text-3xl font-light">
            {year}
          </span>
        </div>

        {/* Location */}
        <p className="font-body text-[9px] tracking-[0.3em] text-[var(--wedding-primary)] uppercase opacity-25 mb-4">
          {info.venue_address
            ? info.venue_address.split(",").slice(-1)[0].trim()
            : "Vietnam"}
        </p>

        {/* Bottom ornamental divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/30" />
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            className="text-[var(--wedding-accent)]"
          >
            <path
              d="M3 0 L3.75 2.25 L6 3 L3.75 3.75 L3 6 L2.25 3.75 L0 3 L2.25 2.25 Z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/30" />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — BOTTOM LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-2 w-24 h-32 pointer-events-none opacity-25"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <svg viewBox="0 0 100 130" fill="none" className="w-full h-full">
          <path
            d="M10 130 Q20 90 15 50 Q10 20 25 0"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M5 100 Q30 90 45 100"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="35"
            cy="95"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(20 35 95)"
          />
          <ellipse
            cx="20"
            cy="60"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-15 20 60)"
          />
          {/* Small rose */}
          <g transform="translate(30, 25)">
            <circle cx="0" cy="0" r="8" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="5" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="2.5" fill="#e0ccc4" />
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — BOTTOM RIGHT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 right-2 w-24 h-32 pointer-events-none opacity-25"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <svg
          viewBox="0 0 100 130"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M10 130 Q20 90 15 50 Q10 20 25 0"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M5 100 Q30 90 45 100"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="35"
            cy="95"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(20 35 95)"
          />
          <ellipse
            cx="20"
            cy="60"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-15 20 60)"
          />
          <g transform="translate(30, 25)">
            <circle cx="0" cy="0" r="8" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="5" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="2.5" fill="#e0ccc4" />
          </g>
        </svg>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-6 bg-gradient-to-b from-[var(--wedding-accent)]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
