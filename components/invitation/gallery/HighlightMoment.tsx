"use client";

import { motion } from "framer-motion";

interface HighlightMomentProps {
  src: string;
  text: string;
}

export function HighlightMoment({ src, text }: HighlightMomentProps) {
  return (
    <div className="relative py-20 px-4 flex flex-col items-center justify-center overflow-hidden min-h-[500px]">
      {/* Background Text Aura */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="font-display text-[20vw] whitespace-nowrap text-[var(--wedding-accent)]">
          {text}
        </h2>
      </motion.div>

      {/* Hero Image / Cutout feel */}
      <motion.div
        className="relative z-10 w-full max-w-sm aspect-[3/4]"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full h-full bg-gray-200 shadow-2xl overflow-hidden rounded-t-[100px] rounded-b-[20px]">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      </motion.div>

      {/* Decorative Signature */}
      <motion.div
        className="mt-8 relative z-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="font-script text-4xl text-[var(--wedding-secondary)]">
          Forever Yours
        </p>
      </motion.div>
    </div>
  );
}
