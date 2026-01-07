"use client";

import { motion } from "framer-motion";
import { StoryBlock } from "./gallery/StoryBlock";
import { FullWidthFrame } from "./gallery/FullWidthFrame";
import { EditorialSplit } from "./gallery/EditorialSplit";
import { FilmStrip } from "./gallery/FilmStrip";
import { FloatingQuote } from "./gallery/FloatingQuote";
import { HighlightMoment } from "./gallery/HighlightMoment";

// Using placeholder images for now - easy to swap later
const GALLERY = {
  hero: "/images/beginning.png",
  splitLeft: "/images/gallery-2.jpg",
  splitRight: "/images/gallery-3.jpg",
  film: [
    "/images/file-1.jpg",
    "/images/file-2.jpg",
    "/images/file-3.png",
    "/images/file-4.jpg",
  ],
  floating: "/images/floating.jpg",
  highlight: "/images/highlight.jpg",
};

export function GallerySection() {
  return (
    <section className="relative bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP LEFT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-12 left-2 w-20 h-28 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.5, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 80 110" fill="none" className="w-full h-full">
          <path
            d="M5 0 Q15 30 12 60 Q8 90 20 110"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M10 30 Q30 40 40 30"
            stroke="#7c9a73"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="28"
            cy="35"
            rx="8"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 28 35)"
          />
          <ellipse
            cx="15"
            cy="55"
            rx="6"
            ry="2.5"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(10 15 55)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          BOTANICAL DECORATION — TOP RIGHT
          ═══════════════════════════════════════════════ */}
      <motion.div
        className="absolute top-12 right-2 w-20 h-28 pointer-events-none opacity-50"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.5, x: 0 }}
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
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M10 30 Q30 40 40 30"
            stroke="#7c9a73"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />
          <ellipse
            cx="28"
            cy="35"
            rx="8"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 28 35)"
          />
          <ellipse
            cx="15"
            cy="55"
            rx="6"
            ry="2.5"
            fill="#7c9a73"
            fillOpacity="0.2"
            transform="rotate(10 15 55)"
          />
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          TITLE HEADER — Editorial style
          ═══════════════════════════════════════════════ */}
      <div className="pt-16 pb-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Small caps tagline with ornamental lines */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-accent)] opacity-70">
              Love Story
            </span>
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-[var(--wedding-secondary)] tracking-wide">
            Our Journey
          </h2>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          ACT I: The Introduction
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0.1}>
        <FullWidthFrame
          src={GALLERY.hero}
          alt="The beginning"
          title="The Beginning"
          caption="Where it all started"
        />
      </StoryBlock>

      {/* ═══════════════════════════════════════════════
          ACT II: The Whisper — Quote
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0.2} className="!py-10 md:!py-16">
        <div className="text-center px-8">
          {/* Decorative quote marks */}
          <div className="flex justify-center mb-4">
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              className="text-[var(--wedding-accent)] opacity-40"
            >
              <path
                d="M0 18V10.5C0 4.5 4 0.5 10 0V3.5C7 4.5 5.5 6.5 5.5 9H10V18H0ZM14 18V10.5C14 4.5 18 0.5 24 0V3.5C21 4.5 19.5 6.5 19.5 9H24V18H14Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="font-script text-2xl md:text-3xl text-[var(--wedding-text-muted)] opacity-70 leading-relaxed">
            Two souls with but a single thought,
            <br />
            Two hearts that beat as one.
          </p>
        </div>
      </StoryBlock>

      {/* ═══════════════════════════════════════════════
          ACT III: The Connection — Split photos
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0}>
        <EditorialSplit leftLabel="Him" rightLabel="Her" />
      </StoryBlock>

      {/* ═══════════════════════════════════════════════
          ACT IV: Nostalgia — Film strip
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0.2} className="!py-12">
        <FilmStrip />
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-body text-[10px] tracking-[0.3em] text-[var(--wedding-text-muted)] uppercase opacity-60">
            Captured Moments
          </p>
        </motion.div>
      </StoryBlock>

      {/* ═══════════════════════════════════════════════
          ACT V: Tender Moments
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0}>
        <FloatingQuote
          src={GALLERY.floating}
          quote="I love you not only for what you are, but for what I am when I am with you."
        />
      </StoryBlock>

      {/* ═══════════════════════════════════════════════
          ACT VI: The Promise (Finale)
          ═══════════════════════════════════════════════ */}
      <StoryBlock delay={0.2}>
        <HighlightMoment src={GALLERY.highlight} text="ETERNAL" />
      </StoryBlock>
    </section>
  );
}
