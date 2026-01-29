"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import calendarImg from "@/assets/images/calendar.jpg";
import Image from "next/image";

interface CountdownSectionProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownSection({ targetDate }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const timeUnits = [
    { label: "Ngày", value: timeLeft.days },
    { label: "Giờ", value: timeLeft.hours },
    { label: "Phút", value: timeLeft.minutes },
    { label: "Giây", value: timeLeft.seconds },
  ];

  // Dynamic calendar generation based on targetDate
  const calendarData = useMemo(() => {
    const weddingDate = new Date(targetDate);
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth(); // 0-indexed
    const weddingDay = weddingDate.getDate();

    // Get first day of month (0=Sun, 1=Mon, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate calendar days array
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const days = Array.from({ length: totalCells }, (_, i) => {
      const dayNum = i - firstDayOfMonth + 1;
      return dayNum > 0 && dayNum <= daysInMonth ? dayNum : null;
    });

    // Month names in English
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return {
      days,
      monthName: monthNames[month],
      weddingDay,
    };
  }, [targetDate]);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <section className="relative w-full bg-[var(--wedding-bg-paper)]">
      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-8 left-4 w-20 h-28 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 80 110" fill="none" className="w-full h-full">
          <path
            d="M5 0 Q15 30 12 60 Q8 90 20 110"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M10 30 Q30 40 40 30"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="28"
            cy="35"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 28 35)"
          />
          <ellipse
            cx="15"
            cy="55"
            rx="6"
            ry="2.5"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(10 15 55)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP RIGHT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-8 right-4 w-20 h-28 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 80 110"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M5 0 Q15 30 12 60 Q8 90 20 110"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M10 30 Q30 40 40 30"
            stroke="#A8B5A0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="28"
            cy="35"
            rx="8"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 28 35)"
          />
          <ellipse
            cx="15"
            cy="55"
            rx="6"
            ry="2.5"
            fill="#A8B5A0"
            fillOpacity="0.2"
            transform="rotate(10 15 55)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          HEADER — Editorial Style
          ═══════════════════════════════════════════════ */}
      <div className="pt-16 pb-8 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {/* Small caps tagline */}
          <p className="font-body text-[10px] tracking-[0.35em] text-[var(--wedding-primary)] uppercase mb-4 opacity-50">
            We Are Getting Married
          </p>

          {/* Title with ornamental dividers */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
            <h3 className="font-script text-5xl md:text-6xl text-[var(--wedding-secondary)]">
              Save The Date
            </h3>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
          </div>

          {/* Quote */}
          <p className="font-body text-sm text-[var(--wedding-text-muted)] italic max-w-sm mx-auto leading-relaxed">
            Đi một vòng lớn rồi vẫn gặp anh,
            <br />
            Từ đó, thế gian bỗng hóa dịu dàng.
          </p>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          CALENDAR — Refined Design
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="relative max-w-sm mx-auto px-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <div
          className="bg-white rounded-xl p-8 relative overflow-hidden"
          style={{
            boxShadow: `
              0 20px 40px -10px rgba(61, 53, 46, 0.12),
              0 8px 16px -6px rgba(61, 53, 46, 0.08)
            `,
          }}
        >
          {/* Korean Minimal: No corner decorations */}

          {/* Month title */}
          <p className="text-center font-display text-2xl text-[var(--wedding-secondary)] mb-4 uppercase tracking-[0.2em]">
            {calendarData.monthName}
          </p>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-x-2 gap-y-1 text-center">
            {/* Weekdays header */}
            {weekDays.map((d, i) => (
              <span
                key={`weekday-${i}`}
                className="font-body text-[10px] font-medium text-[var(--wedding-text-muted)] uppercase tracking-wider pb-2"
              >
                {d}
              </span>
            ))}

            {/* Days */}
            {calendarData.days.map((d: number | null, i: number) => (
              <div
                key={`day-${i}`}
                className="flex items-center justify-center w-9 h-9 relative"
              >
                {d && (
                  <>
                    {/* Special day highlight - Wedding date */}
                    {d === calendarData.weddingDay && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(197, 133, 133, 0.25) 0%, rgba(197, 133, 133, 0.1) 70%)",
                        }}
                        animate={{
                          scale: [0.85, 1, 0.85],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 font-serif-numbers text-base ${
                        d === calendarData.weddingDay
                          ? "text-[#c58585] font-semibold text-lg"
                          : "text-[var(--wedding-secondary)]"
                      }`}
                    >
                      {d}
                    </span>
                    {/* Heart icon for wedding date */}
                    {d === calendarData.weddingDay && (
                      <motion.svg
                        className="absolute -top-1 -right-1 w-3 h-3 text-[#c58585]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </motion.svg>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          PHOTO SECTION — With elegant frame
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="relative w-full mb-10"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="relative h-[50vh] min-h-[400px] max-h-[550px] w-full overflow-hidden">
          <Image
            src={calendarImg}
            alt="Couple Photo"
            fill
            className="object-cover object-center"
            placeholder="blur"
          />

          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.1) 100%)",
            }}
          />

          {/* Decorative frame lines */}
          <div className="absolute inset-4 sm:inset-6 border border-white/30 pointer-events-none" />
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          COUNTDOWN TIMER — Premium styling
          ═══════════════════════════════════════════════ */}
      <div className="pb-16 pt-4 text-center px-4">
        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="text-[var(--wedding-accent)]"
          >
            <path
              d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
        </div>

        <motion.p
          className="font-display text-lg text-[var(--wedding-secondary)] mb-6 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Time Until We Say &quot;I Do&quot;
        </motion.p>

        {/* Countdown boxes */}
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Number box */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-lg mb-2"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,247,243,0.9) 100%)",
                  boxShadow: `
                    0 4px 12px rgba(61, 53, 46, 0.08),
                    inset 0 1px 0 rgba(255,255,255,0.5)
                  `,
                  border: "1px solid rgba(197, 168, 109, 0.15)",
                }}
              >
                <span className="font-serif-numbers text-2xl sm:text-3xl text-[var(--wedding-secondary)] font-light">
                  {formatNumber(unit.value)}
                </span>
              </div>
              <span className="font-body text-[9px] text-[var(--wedding-text-muted)] uppercase tracking-[0.2em]">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
