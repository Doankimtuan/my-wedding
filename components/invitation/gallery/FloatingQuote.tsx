"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingQuoteProps {
  src: string;
  quote: string;
}

export function FloatingQuote({ src, quote }: FloatingQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative py-8 px-4">
      {/* Main Image */}
      <div className="w-full aspect-[4/5] bg-gray-200 overflow-hidden rounded-sm ml-auto mr-0 md:mr-4 md:w-3/4 shadow-lg">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        />
      </div>

      {/* Floating Card */}
      <motion.div
        style={{ y }}
        className="absolute bottom-12 left-4 md:left-8 w-48 md:w-56 bg-white/90 backdrop-blur-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40"
      >
        <div className="text-[var(--wedding-accent)] mb-2 opacity-50">❝</div>
        <p className="font-display text-lg md:text-xl text-[var(--wedding-secondary)] italic leading-relaxed">
          {quote}
        </p>
      </motion.div>
    </div>
  );
}
