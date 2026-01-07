"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StoryBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StoryBlock({
  children,
  className = "",
  delay = 0,
}: StoryBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom silky ease
        delay: delay,
      }}
      className={`py-6 md:py-8 ${className}`}
    >
      {children}
    </motion.div>
  );
}
