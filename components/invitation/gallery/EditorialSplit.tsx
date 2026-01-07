"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import HerImage from "@/assets/images/her.jpg";
import HimImage from "@/assets/images/him.jpg";

interface EditorialSplitProps {
  leftLabel?: string;
  rightLabel?: string;
}

export function EditorialSplit({ leftLabel, rightLabel }: EditorialSplitProps) {
  return (
    <div className="flex gap-3 md:gap-4 px-4 md:px-6">
      {/* Left photo */}
      <div className="flex-1">
        <motion.div
          className="aspect-[3/4] overflow-hidden rounded-sm mb-4"
          style={{
            border: "6px solid white",
            boxShadow: "var(--wedding-shadow-envelope)",
          }}
          initial={{ opacity: 0, x: -20, rotate: -1 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={HimImage}
            alt="Him"
            className="w-full h-full bg-cover bg-center"
          />
        </motion.div>
        {leftLabel && (
          <motion.p
            className="text-center font-script text-xl text-[var(--wedding-secondary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {leftLabel}
          </motion.p>
        )}
      </div>

      {/* Decorative divider */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[var(--wedding-accent)]/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--wedding-accent)]/40" />
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--wedding-accent)]/30 to-transparent" />
      </div>

      {/* Right photo */}
      <div className="flex-1">
        <motion.div
          className="aspect-[3/4] overflow-hidden rounded-sm mb-4"
          style={{
            border: "6px solid white",
            boxShadow: "var(--wedding-shadow-envelope)",
          }}
          initial={{ opacity: 0, x: 20, rotate: 1 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={HerImage}
            alt="Her"
            className="w-full h-full bg-cover bg-center"
          />
        </motion.div>
        {rightLabel && (
          <motion.p
            className="text-center font-script text-xl text-[var(--wedding-secondary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {rightLabel}
          </motion.p>
        )}
      </div>
    </div>
  );
}
