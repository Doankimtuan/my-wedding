"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageBeginning from "@/assets/images/beginning.png";
import Image from "next/image";

interface FullWidthFrameProps {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

export function FullWidthFrame({
  src,
  alt,
  caption,
  title,
}: FullWidthFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm my-4"
    >
      <motion.div style={{ scale, y }} className="w-full h-full">
        {/* Placeholder for actual image */}
        <div className="w-full h-full bg-gray-200">
          {/* In a real scenario, use Next/Image here */}
          <Image
            src={ImageBeginning}
            alt={alt}
            className="w-full h-[538px] bg-cover bg-center"
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
      </motion.div>

      {/* Inner Vignette Shadow */}
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />

      {(title || caption) && (
        <div className="absolute bottom-6 left-0 right-0 text-center text-white z-10 px-4">
          {title && (
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-3xl mb-2 drop-shadow-md"
            >
              {title}
            </motion.h3>
          )}
          {caption && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-body text-xs tracking-[0.2em] uppercase opacity-90 drop-shadow-sm"
            >
              {caption}
            </motion.p>
          )}
        </div>
      )}

      {/* Soft gradient at bottom for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}
