"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────
   Custom SVG icons for each timeline event
   ───────────────────────────────────────────────── */
function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function RingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  );
}

function ChampagneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M8 22h8" />
      <path d="M12 11v11" />
      <path d="m19 3-7 8-7-8Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────
   Floating sparkle particle component
   ───────────────────────────────────────────────── */
function FloatingSparkle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
      viewport={{ once: false }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 12 12">
        <path
          d="M6 0 L6.8 4.2 L11 5 L6.8 5.8 L6 10 L5.2 5.8 L1 5 L5.2 4.2 Z"
          fill="var(--wedding-accent)"
          opacity="0.5"
        />
      </svg>
    </motion.div>
  );
}

export function TimelineSection() {
  const timelineEvents = [
    {
      time: "17:00",
      title: "Đón khách",
      description: "Chụp ảnh lưu niệm bằng photobooth",
      icon: <CameraIcon />,
      accent: "rgba(168, 181, 160, 0.25)", // sage
    },
    {
      time: "18:00",
      title: "Cử hành hôn lễ",
      description: "Nghi thức trao nhẫn và thề nguyền",
      icon: <RingsIcon />,
      accent: "rgba(201, 184, 150, 0.3)", // gold
    },
    {
      time: "18:15",
      title: "Khai tiệc",
      description: "Thưởng thức tiệc mặn và nâng ly chúc mừng",
      icon: <ChampagneIcon />,
      accent: "rgba(212, 168, 168, 0.2)", // blush
    },
  ];

  return (
    <section className="relative px-6 py-24 bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* ═══════════════════════════════════════════════
          FLOATING SPARKLE PARTICLES
          ═══════════════════════════════════════════════ */}
      <FloatingSparkle delay={0} x="10%" y="15%" size={10} />
      <FloatingSparkle delay={1.5} x="85%" y="25%" size={8} />
      <FloatingSparkle delay={0.8} x="15%" y="60%" size={6} />
      <FloatingSparkle delay={2.2} x="90%" y="70%" size={9} />
      <FloatingSparkle delay={1.0} x="50%" y="10%" size={7} />
      <FloatingSparkle delay={2.8} x="75%" y="85%" size={8} />

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-8 left-[-10px] w-28 h-52 pointer-events-none"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <svg viewBox="0 0 100 200" fill="none" className="w-full h-full">
          {/* Main stem */}
          <path
            d="M15 0 Q25 50 20 100 Q15 150 25 200"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          {/* Branch stems */}
          <path
            d="M18 40 Q40 35 55 45"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M20 80 Q45 75 60 85"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M18 130 Q40 125 50 135"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
          {/* Leaves */}
          <ellipse
            cx="40"
            cy="40"
            rx="14"
            ry="5"
            fill="#A8B5A0"
            fillOpacity="0.15"
            transform="rotate(-15 40 40)"
          />
          <ellipse
            cx="48"
            cy="80"
            rx="12"
            ry="4.5"
            fill="#A8B5A0"
            fillOpacity="0.12"
            transform="rotate(10 48 80)"
          />
          <ellipse
            cx="38"
            cy="130"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.1"
            transform="rotate(-8 38 130)"
          />
          {/* Small flowers */}
          <g transform="translate(58, 45)" opacity="0.4">
            <circle cx="0" cy="0" r="4" fill="#f5efe8" />
            <circle
              cx="0"
              cy="0"
              r="2"
              fill="var(--wedding-accent)"
              opacity="0.5"
            />
          </g>
          <g transform="translate(62, 85)" opacity="0.3">
            <circle cx="0" cy="0" r="3" fill="#f5efe8" />
            <circle
              cx="0"
              cy="0"
              r="1.5"
              fill="var(--wedding-accent)"
              opacity="0.5"
            />
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — RIGHT (mirrored)
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-12 right-[-10px] w-24 h-44 pointer-events-none"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <svg
          viewBox="0 0 100 200"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M15 0 Q25 50 20 100 Q15 150 25 200"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M18 50 Q40 45 55 55"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M20 110 Q45 105 55 115"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
          <ellipse
            cx="42"
            cy="50"
            rx="12"
            ry="4.5"
            fill="#A8B5A0"
            fillOpacity="0.12"
            transform="rotate(-12 42 50)"
          />
          <ellipse
            cx="45"
            cy="110"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.1"
            transform="rotate(8 45 110)"
          />
          <g transform="translate(56, 55)" opacity="0.3">
            <circle cx="0" cy="0" r="3.5" fill="#f5efe8" />
            <circle
              cx="0"
              cy="0"
              r="1.8"
              fill="var(--wedding-accent)"
              opacity="0.4"
            />
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="mb-14 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Top ornamental line */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/50" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="text-[var(--wedding-accent)]"
          >
            <path
              d="M4 0 L4.75 3.25 L8 4 L4.75 4.75 L4 8 L3.25 4.75 L0 4 L3.25 3.25 Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/50" />
        </div>

        {/* Title */}
        <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--wedding-accent)] opacity-70">
          Chương Trình
        </span>

        {/* Subtitle with script font */}
        <motion.h3
          className="font-script text-3xl sm:text-4xl text-[var(--wedding-secondary)] mt-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Tiệc Cưới
        </motion.h3>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          TIMELINE CARDS
          ═══════════════════════════════════════════════ */}
      <div className="max-w-sm mx-auto relative z-10">
        {/* Animated golden thread connecting the cards */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--wedding-accent) 15%, var(--wedding-accent) 85%, transparent)",
              opacity: 0.25,
            }}
          />
        </motion.div>

        <div className="flex flex-col gap-0 relative">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.time}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative py-6 group"
            >
              {/* ─── Glowing Node on the center thread ─── */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                {/* Outer glow ring */}
                <motion.div
                  className="absolute w-10 h-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${event.accent} 0%, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
                {/* Inner bright dot */}
                <div
                  className="w-3 h-3 rounded-full relative z-10 transition-transform duration-500 group-hover:scale-150"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, var(--wedding-accent), #a08060)",
                    boxShadow:
                      "0 0 0 3px rgba(201, 184, 150, 0.15), 0 0 12px rgba(201, 184, 150, 0.2)",
                  }}
                />
              </div>

              {/* ─── Card Layout: alternating left/right ─── */}
              <div
                className={`flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div
                  className={`w-[44%] ${
                    index % 2 === 0 ? "pr-6 text-right" : "pl-6 text-left"
                  }`}
                >
                  <motion.div
                    className="relative rounded-xl p-5 overflow-hidden transition-all duration-500 group-hover:shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(253, 251, 248, 0.9) 0%, rgba(250, 248, 245, 0.7) 100%)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(201, 184, 150, 0.15)",
                      boxShadow: `
                        0 4px 20px rgba(61, 53, 46, 0.04),
                        0 1px 3px rgba(61, 53, 46, 0.03)
                      `,
                    }}
                    whileHover={{
                      y: -2,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Subtle gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at ${
                          index % 2 === 0 ? "right" : "left"
                        } center, ${event.accent} 0%, transparent 70%)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={`relative z-10 mb-3 flex ${
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--wedding-accent)] transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: "rgba(201, 184, 150, 0.1)",
                          border: "1px solid rgba(201, 184, 150, 0.2)",
                        }}
                      >
                        {event.icon}
                      </div>
                    </div>

                    {/* Event title */}
                    <h4 className="relative z-10 font-display text-lg text-[var(--wedding-secondary)] mb-1 tracking-wide">
                      {event.title}
                    </h4>

                    {/* Description */}
                    <p className="relative z-10 font-body text-xs text-[var(--wedding-text-muted)] opacity-70 leading-relaxed">
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for the center thread */}
                <div className="w-[12%] flex-shrink-0" />

                {/* Time side */}
                <div
                  className={`w-[44%] ${
                    index % 2 === 0 ? "pl-6 text-left" : "pr-6 text-right"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.2 }}
                    className="flex flex-col"
                  >
                    <span className="font-serif-numbers text-4xl sm:text-5xl text-[var(--wedding-secondary)] font-light tracking-wider transition-all duration-500 group-hover:text-[var(--wedding-accent)]">
                      {event.time}
                    </span>
                    <span className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--wedding-text-muted)] opacity-40 mt-1">
                      {index === 0
                        ? "Bắt đầu"
                        : index === 1
                          ? "Nghi lễ"
                          : "Tiệc mặn"}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          BOTTOM DECORATIVE DIVIDER
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="mt-16 flex items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/25" />
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="text-[var(--wedding-accent)]"
        >
          <path
            d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5 Z"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/25" />
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTTOM BOTANICAL ACCENT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-4 right-0 w-20 h-36 pointer-events-none"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.3, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <svg viewBox="0 0 80 160" fill="none" className="w-full h-full">
          <path
            d="M70 160 Q60 120 65 80 Q70 40 55 0"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
          />
          <ellipse
            cx="55"
            cy="50"
            rx="10"
            ry="4"
            fill="#A8B5A0"
            fillOpacity="0.15"
            transform="rotate(15 55 50)"
          />
          <ellipse
            cx="60"
            cy="100"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.12"
            transform="rotate(-10 60 100)"
          />
          <g transform="translate(48, 30)" opacity="0.3">
            <circle cx="0" cy="0" r="5" fill="#f0e4dc" />
            <circle cx="0" cy="0" r="3" fill="#e8d8d0" />
            <circle cx="0" cy="0" r="1.5" fill="#e0ccc4" />
          </g>
        </svg>
      </motion.div>
    </section>
  );
}
