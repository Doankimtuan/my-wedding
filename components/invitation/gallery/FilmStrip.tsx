"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import File1Image from "../../../assets/images/file-1.jpg";
// import File2Image from "@/assets/images/file2.jpg";
// import File3Image from "@/assets/images/file3.jpg";
// import File4Image from "@/assets/images/file4.jpg";
// import File5Image from "@/assets/images/file5.jpg";

interface FilmStripProps {
  images: string[];
}

export function FilmStrip() {
  const images = ["../../../assets/images/file-1.jpg"];
  return (
    <div className="px-4 md:px-6">
      {/* Warm-toned film strip that matches the wedding theme */}
      <div
        className="p-4 md:p-5 pb-6 rounded-lg relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #E8E0D8 0%, #DDD4CA 100%)",
          boxShadow: `
            0 20px 40px -10px rgba(61, 53, 46, 0.15),
            0 8px 16px -6px rgba(61, 53, 46, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.5)
          `,
        }}
      >
        {/* Film Header — Vintage style */}
        <div className="flex justify-between items-center text-[var(--wedding-primary)] text-[9px] font-body mb-3 tracking-[0.2em] uppercase opacity-50">
          <span>Portra 400</span>
          <div className="flex gap-2">
            <span>•</span>
            <span>36 Exp</span>
          </div>
        </div>

        {/* Decorative perforations on sides */}
        <div className="absolute left-2 top-12 bottom-6 flex flex-col justify-around">
          {[...Array(images.length * 3)].map((_, i) => (
            <div
              key={`perf-l-${i}`}
              className="w-1.5 h-2 rounded-full bg-white/40"
            />
          ))}
        </div>
        <div className="absolute right-2 top-12 bottom-6 flex flex-col justify-around">
          {[...Array(images.length * 3)].map((_, i) => (
            <div
              key={`perf-r-${i}`}
              className="w-1.5 h-2 rounded-full bg-white/40"
            />
          ))}
        </div>

        {/* Photo frames */}
        <div className="flex flex-col gap-4 pl-4 pr-4">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
            >
              {/* Photo with white border */}
              <div
                className="aspect-[4/3] overflow-hidden rounded-sm"
                style={{
                  border: "4px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${src})` }}
                  initial={{ filter: "sepia(30%)" }}
                  whileInView={{ filter: "sepia(0%)" }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                />
              </div>

              {/* Frame Number — Subtle */}
              <span className="absolute -bottom-2 right-2 text-[var(--wedding-text-muted)] text-[8px] font-body tracking-wider opacity-40">
                #{12 + idx}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
