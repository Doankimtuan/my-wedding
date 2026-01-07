"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useWedding, defaultWeddingInfo } from "./WeddingContext";

interface GreetingCardProps {
  guestName: string;
  onOpen: () => void;
}

export const EnvelopeCover = ({ guestName, onOpen }: GreetingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardPhoto = "/images/cover.jpg";

  // Get wedding info from context
  const { weddingInfo } = useWedding();
  const info = weddingInfo || defaultWeddingInfo;

  // Parse date
  const weddingDate = new Date(info.wedding_date);
  const day = weddingDate.getDate().toString().padStart(2, "0");
  const month = (weddingDate.getMonth() + 1).toString().padStart(2, "0");
  const year = weddingDate.getFullYear();

  // Get initials for seal
  const groomInitial = info.groom_name.charAt(0).toUpperCase();
  const brideInitial = info.bride_name.charAt(0).toUpperCase();

  // Refs for GSAP animations
  const flapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onOpen();
  };

  // GSAP Animation Timeline
  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Stage 1: Fade out wax seal first (0-300ms)
    tl.to(sealRef.current, {
      opacity: 0,
      scale: 0.6,
      duration: 0.3,
      ease: "power2.in",
    });

    // Stage 2: Open the flap (200-900ms) - 3D rotation
    tl.to(
      flapRef.current,
      {
        rotateX: -180,
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.1"
    );

    // Drop flap z-index so photo appears in front of opened flap
    tl.set(flapRef.current, { zIndex: 5 }, 0.5);

    // Stage 3: Rise the photo card from inside envelope
    tl.to(
      photoRef.current,
      {
        y: "-100px",
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, [isOpen]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-between py-10 px-6 bg-[var(--wedding-bg-paper)] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ═══════════════════════════════════════════════
          FLOATING PARTICLES EFFECT - Subtle sparkles
          ═══════════════════════════════════════════════ */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            left: `${5 + ((i * 8) % 90)}%`,
            top: `${10 + ((i * 13) % 80)}%`,
            background:
              i % 3 === 0
                ? "rgba(212, 184, 149, 0.4)" // Gold
                : i % 3 === 1
                ? "rgba(255, 255, 255, 0.5)" // White
                : "rgba(180, 160, 140, 0.3)", // Soft brown
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
          }}
          animate={{
            y: [0, -30 - (i % 3) * 15, 0],
            x: [0, i % 2 === 0 ? 10 : -10, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* ═══════════════════════════════════════════════
          FLORAL DECORATION: TOP LEFT
          ═══════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 w-36 h-44 pointer-events-none">
        <svg viewBox="0 0 150 180" fill="none" className="w-full h-full">
          {/* Stems */}
          <path
            d="M0 0 Q30 60 25 120 Q20 150 30 180"
            stroke="#7c9a73"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M5 20 Q40 50 60 35"
            stroke="#7c9a73"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0 40 Q35 70 70 60"
            stroke="#7c9a73"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M10 80 Q30 100 55 95"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
          />

          {/* Leaves */}
          <ellipse
            cx="35"
            cy="50"
            rx="8"
            ry="4"
            fill="#7c9a73"
            fillOpacity="0.35"
            transform="rotate(-30 35 50)"
          />
          <ellipse
            cx="25"
            cy="85"
            rx="7"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.35"
            transform="rotate(-20 25 85)"
          />
          <ellipse
            cx="50"
            cy="70"
            rx="6"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.4"
            transform="rotate(15 50 70)"
          />

          {/* Daisies (white petals, yellow center) */}
          <g transform="translate(25, 120)">
            <circle cx="0" cy="0" r="4" fill="#e8b923" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-8"
                rx="3"
                ry="6"
                fill="white"
                fillOpacity="0.9"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          <g transform="translate(60, 35)">
            <circle cx="0" cy="0" r="3" fill="#e8b923" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-6"
                rx="2.5"
                ry="5"
                fill="white"
                fillOpacity="0.85"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          <g transform="translate(70, 60)">
            <circle cx="0" cy="0" r="3" fill="#e8b923" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-5"
                rx="2"
                ry="4"
                fill="white"
                fillOpacity="0.85"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
          <g transform="translate(55, 95)">
            <circle cx="0" cy="0" r="2.5" fill="#e8b923" />
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-4"
                rx="1.5"
                ry="3"
                fill="white"
                fillOpacity="0.8"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════
          HEADER SECTION — Editorial Style
          ═══════════════════════════════════════════════ */}
      <div className="text-center z-10 w-full pt-8">
        {/* Elegant small caps tagline */}
        <motion.p
          className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-primary)] mb-8 opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We invite you to celebrate
        </motion.p>

        {/* Names as the hero — Editorial Typography */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-4xl md:text-6xl text-[var(--wedding-secondary)] leading-[1.1] tracking-wide">
            {info.groom_name}
          </h1>
          <p className="font-script text-3xl text-[var(--wedding-accent)] my-1">
            &
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-[var(--wedding-secondary)] leading-[1.1] tracking-wide">
            {info.bride_name}
          </h1>
        </motion.div>

        {/* Date teaser */}
        <motion.p
          className="font-body text-xs tracking-[0.2em] text-[var(--wedding-text-muted)] mt-6 mb-2 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {day} · {month} · {year}
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════
          ENVELOPE CENTERPIECE
          ═══════════════════════════════════════════════ */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full">
        {/* Floating envelope container */}
        <motion.div
          className="relative"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          animate={
            isOpen ? { y: -15, scale: 1.02 } : { y: [0, -10, 0], scale: 1 }
          }
          transition={
            isOpen
              ? { duration: 0.8, ease: "easeOut" }
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.45, 0.05, 0.55, 0.95],
                }
          }
        >
          {/* Glow effect behind envelope */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212, 184, 149, 0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              transform: "scale(1.3) translateY(10px)",
            }}
            animate={isOpen ? { opacity: 0.2 } : { opacity: [0.3, 0.5, 0.3] }}
            transition={
              isOpen
                ? { duration: 0.5 }
                : {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />

          {/* SHADOW under envelope */}
          <motion.div
            className="absolute left-1/2 w-[300px] sm:w-[380px] h-[20px] rounded-[100%] bg-black/20 blur-xl"
            style={{
              bottom: "-40px",
              transform: "translateX(-50%) translateZ(0)",
              willChange: "transform, opacity",
            }}
            animate={
              isOpen
                ? { scaleX: 1.15, scaleY: 1.2, opacity: 0.25 }
                : {
                    scaleX: [1, 1.08, 1],
                    scaleY: [1, 1.1, 1],
                    opacity: [0.2, 0.28, 0.2],
                  }
            }
            transition={
              isOpen
                ? { duration: 0.6 }
                : {
                    duration: 4,
                    repeat: Infinity,
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }
            }
          />

          {/* ════════════════════════════════════════════
              ENVELOPE STRUCTURE
              Proper layer order (bottom to top):
              1. Envelope back (z-5)
              2. Photo card (z-10) - rises up when opened
              3. Envelope body/pocket (z-20) - covers bottom of photo
              4. Top flap (z-30) - opens upward, covers everything when closed
              5. Wax seal (z-40)
              ════════════════════════════════════════════ */}
          <div
            className="relative w-[300px] sm:w-[380px] h-[220px] sm:h-[280px] cursor-pointer"
            onClick={handleOpen}
            style={{
              perspective: "1200px",
            }}
          >
            {/* ──────────────────────────────────────────
                LAYER 1: Envelope Back (z-5)
                The innermost layer, visible when flap opens
                ────────────────────────────────────────── */}
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "linear-gradient(160deg, #f8f4f0 0%, #ebe3da 100%)",
                boxShadow: "var(--wedding-shadow-envelope)",
                zIndex: 5,
              }}
            />

            {/* ──────────────────────────────────────────
                LAYER 2: Photo Card (z-10)
                Initially hidden inside envelope, rises up when opened
                ────────────────────────────────────────── */}
            <div
              ref={photoRef}
              className="absolute left-[24px] right-[24px] sm:left-[32px] sm:right-[32px]"
              style={{
                bottom: "0",
                top: "auto",
                height: "180px",
                zIndex: 10,
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                willChange: "transform",
              }}
            >
              {/* Photo frame with white border */}
              <div
                className="w-full h-full p-[6px]"
                style={{
                  background: "white",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="w-full h-full rounded-[4px] bg-cover bg-center relative "
                  style={{ backgroundImage: `url(${cardPhoto})` }}
                >
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* ──────────────────────────────────────────
                LAYER 3: Envelope Body/Pocket (z-20)
                The main body with V-shaped opening
                Covers the bottom portion of the photo
                ────────────────────────────────────────── */}
            {/* Left side flap */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #efe8e0 0%, #e5dcd3 100%)",
                clipPath: "polygon(0 0, 50% 50%, 0 100%)",
                zIndex: 20,
              }}
            />
            {/* Right side flap */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(-135deg, #efe8e0 0%, #e5dcd3 100%)",
                clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
                zIndex: 20,
              }}
            />
            {/* Bottom flap (pocket) */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(0deg, #efe8e0 0%, #e8e0d8 100%)",
                clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
                zIndex: 21,
                boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.04)",
              }}
            />

            {/* ──────────────────────────────────────────
                LAYER 4: Top Flap (z-30)
                Opens upward in 3D when clicked
                Fully covers photo in closed state
                Has both front and back faces for realistic 3D flip
                ────────────────────────────────────────── */}
            <div
              ref={flapRef}
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "top center",
                zIndex: 30,
              }}
            >
              {/* Front face of flap (visible when closed) */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                  background:
                    "linear-gradient(180deg, #f5efe8 0%, #e8e0d8 100%)",
                  backfaceVisibility: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* Subtle depth gradient on flap front */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.03) 100%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 55%)",
                  }}
                />
              </div>

              {/* Back face of flap (visible when opened) - triangle points UP */}
              <div
                className="absolute inset-0"
                style={{
                  // Triangle pointing UP (explicit shape since net rotation is 0)
                  clipPath: "polygon(0% 100%, 100% 100%, 50% 45%)",
                  background:
                    "linear-gradient(180deg, #e0d8d0 0%, #efe8e0 100%)",
                  backfaceVisibility: "hidden",
                  // We still need rotateX(180) so it's on the 'back' of the element
                  // but visually it cancels out with the parent's rotateX(-180)
                  transform: "rotateX(180deg)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {/* Inner shadow for depth on back of flap */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.04) 100%)",
                    clipPath: "polygon(50% 55%, 0 0, 100% 0)",
                  }}
                />
              </div>
            </div>

            {/* ──────────────────────────────────────────
                LAYER 5: Wax Seal (z-40) — Premium Metallic
                ────────────────────────────────────────── */}
            <div
              ref={sealRef}
              className="absolute left-1/2 flex items-center justify-center overflow-hidden"
              style={{
                top: "42%",
                transform: "translateX(-50%)",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: `
                  radial-gradient(circle at 30% 25%, #e8c896 0%, #c9a26d 25%, #a07d4f 55%, #7f5536 100%)
                `,
                boxShadow: `
                  inset 0 3px 6px rgba(255,255,255,0.35),
                  inset 0 -3px 6px rgba(0,0,0,0.2),
                  0 6px 20px rgba(0,0,0,0.3),
                  0 2px 4px rgba(0,0,0,0.15)
                `,
                zIndex: 40,
              }}
            >
              {/* Specular Highlight — Static Sheen */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, transparent 100%)",
                }}
              />
              {/* Animated Shimmer — Light sweep effect */}
              <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
                <div
                  className="animate-shimmer absolute w-[200%] h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    left: "-50%",
                  }}
                />
              </div>
              {/* Seal embossed text */}
              <span
                className="font-display text-white/95 text-lg font-semibold tracking-wider relative z-10"
                style={{
                  textShadow:
                    "0 1px 3px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.2)",
                }}
              >
                T&N
              </span>
            </div>

            {/* RISING HEARTS */}
            <AnimatePresence>
              {isOpen &&
                [0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute left-1/2 text-3xl pointer-events-none"
                    style={{
                      top: "15%",
                      zIndex: 50,
                      willChange: "transform, opacity",
                      color: i % 2 === 0 ? "#e74c4c" : "#ff7b7b",
                    }}
                    initial={{ y: 0, x: 0, opacity: 0, scale: 0.3 }}
                    animate={{
                      y: -220 - i * 40,
                      x: (i - 2) * 50,
                      opacity: [0, 1, 1, 1, 0],
                      scale: [0.3, 1.4, 1.3, 1.2, 0.8],
                      rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 4,
                      delay: 0.6 + i * 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    ❤
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          FOOTER: Guest Name Section
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full text-center z-10 pb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--wedding-primary)] mb-3 opacity-70">
          Trân trọng kính mời
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]" />
          <span className="text-[var(--wedding-accent)] text-xs">♦</span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]" />
        </div>

        <p className="font-display text-2xl md:text-3xl text-[var(--wedding-secondary)] italic">
          {guestName}
        </p>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          FLORAL DECORATION: BOTTOM RIGHT
          ═══════════════════════════════════════════════ */}
      <div className="absolute bottom-0 right-0 w-40 h-48 pointer-events-none opacity-90">
        <svg viewBox="0 0 160 200" fill="none" className="w-full h-full">
          {/* Main curved stem */}
          <path
            d="M160 200 Q120 140 130 80 Q140 40 120 0"
            stroke="#7c9a73"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M140 180 Q100 140 80 160"
            stroke="#7c9a73"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M155 150 Q110 120 95 140"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
          />

          {/* Leaves */}
          <ellipse
            cx="125"
            cy="60"
            rx="10"
            ry="5"
            fill="#7c9a73"
            fillOpacity="0.35"
            transform="rotate(60 125 60)"
          />
          <ellipse
            cx="135"
            cy="100"
            rx="8"
            ry="4"
            fill="#7c9a73"
            fillOpacity="0.35"
            transform="rotate(45 135 100)"
          />
          <ellipse
            cx="100"
            cy="150"
            rx="9"
            ry="4"
            fill="#7c9a73"
            fillOpacity="0.4"
            transform="rotate(-20 100 150)"
          />

          {/* Roses (soft pink/cream) */}
          <g transform="translate(120, 20)">
            <circle cx="0" cy="0" r="14" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="10" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="6" fill="#e0ccc4" />
            <circle cx="0" cy="0" r="3" fill="#d8c0b8" />
          </g>
          <g transform="translate(90, 135)">
            <circle cx="0" cy="0" r="10" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="7" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="4" fill="#e0ccc4" />
          </g>
          <g transform="translate(80, 165)">
            <circle cx="0" cy="0" r="8" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="5" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="2.5" fill="#e0ccc4" />
          </g>

          {/* Small accent flowers */}
          <circle
            cx="105"
            cy="120"
            r="4"
            fill="#f5efe8"
            stroke="#e8dcd0"
            strokeWidth="1"
          />
          <circle
            cx="95"
            cy="145"
            r="3"
            fill="#f5efe8"
            stroke="#e8dcd0"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Music icon hint (top right) */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[var(--wedding-border)] flex items-center justify-center opacity-40">
        <span className="text-xs">🎵</span>
      </div>
    </motion.div>
  );
};
