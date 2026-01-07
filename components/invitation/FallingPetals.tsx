"use client";

import { motion } from "framer-motion";

interface Petal {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  swayAmount: number;
  opacity: number;
  color: string;
}

const petalColors = [
  "rgba(240, 228, 220, 0.6)", // Soft cream
  "rgba(232, 216, 208, 0.5)", // Light blush
  "rgba(245, 239, 232, 0.55)", // Off-white
  "rgba(224, 204, 196, 0.45)", // Dusty rose
  "rgba(212, 184, 149, 0.35)", // Gold hint
];

// Pre-computed petal configurations to avoid Math.random during render
const petals: Petal[] = [
  {
    id: 0,
    size: 10,
    left: 5,
    delay: 0,
    duration: 25,
    rotation: 45,
    swayAmount: 35,
    opacity: 0.4,
    color: petalColors[0],
  },
  {
    id: 1,
    size: 12,
    left: 15,
    delay: 3,
    duration: 28,
    rotation: 120,
    swayAmount: 50,
    opacity: 0.35,
    color: petalColors[1],
  },
  {
    id: 2,
    size: 8,
    left: 25,
    delay: 7,
    duration: 22,
    rotation: 200,
    swayAmount: 40,
    opacity: 0.45,
    color: petalColors[2],
  },
  {
    id: 3,
    size: 14,
    left: 35,
    delay: 12,
    duration: 30,
    rotation: 280,
    swayAmount: 55,
    opacity: 0.3,
    color: petalColors[3],
  },
  {
    id: 4,
    size: 9,
    left: 45,
    delay: 2,
    duration: 26,
    rotation: 30,
    swayAmount: 45,
    opacity: 0.5,
    color: petalColors[4],
  },
  {
    id: 5,
    size: 11,
    left: 55,
    delay: 8,
    duration: 24,
    rotation: 160,
    swayAmount: 38,
    opacity: 0.4,
    color: petalColors[0],
  },
  {
    id: 6,
    size: 13,
    left: 65,
    delay: 15,
    duration: 32,
    rotation: 90,
    swayAmount: 60,
    opacity: 0.35,
    color: petalColors[1],
  },
  {
    id: 7,
    size: 10,
    left: 75,
    delay: 5,
    duration: 27,
    rotation: 240,
    swayAmount: 42,
    opacity: 0.45,
    color: petalColors[2],
  },
  {
    id: 8,
    size: 8,
    left: 85,
    delay: 10,
    duration: 23,
    rotation: 320,
    swayAmount: 35,
    opacity: 0.38,
    color: petalColors[3],
  },
  {
    id: 9,
    size: 15,
    left: 92,
    delay: 18,
    duration: 35,
    rotation: 180,
    swayAmount: 48,
    opacity: 0.32,
    color: petalColors[4],
  },
  {
    id: 10,
    size: 9,
    left: 10,
    delay: 4,
    duration: 29,
    rotation: 60,
    swayAmount: 52,
    opacity: 0.42,
    color: petalColors[2],
  },
  {
    id: 11,
    size: 12,
    left: 40,
    delay: 14,
    duration: 31,
    rotation: 300,
    swayAmount: 44,
    opacity: 0.36,
    color: petalColors[0],
  },
  {
    id: 12,
    size: 11,
    left: 60,
    delay: 6,
    duration: 25,
    rotation: 150,
    swayAmount: 40,
    opacity: 0.48,
    color: petalColors[1],
  },
  {
    id: 13,
    size: 10,
    left: 80,
    delay: 11,
    duration: 28,
    rotation: 210,
    swayAmount: 55,
    opacity: 0.34,
    color: petalColors[3],
  },
  {
    id: 14,
    size: 14,
    left: 95,
    delay: 1,
    duration: 33,
    rotation: 270,
    swayAmount: 38,
    opacity: 0.4,
    color: petalColors[4],
  },
];

export function FallingPetals() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: "-20px",
            width: petal.size,
            height: petal.size * 1.3,
            willChange: "transform",
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [
              0,
              petal.swayAmount,
              -petal.swayAmount * 0.5,
              petal.swayAmount * 0.3,
              0,
            ],
            rotate: [
              petal.rotation,
              petal.rotation + 180,
              petal.rotation + 360,
            ],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
            x: {
              duration: petal.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: petal.delay,
            },
            rotate: {
              duration: petal.duration * 0.8,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
          }}
        >
          {/* Petal shape using SVG */}
          <svg
            viewBox="0 0 20 26"
            fill="none"
            style={{
              width: "100%",
              height: "100%",
              opacity: petal.opacity,
              filter: "blur(0.3px)",
            }}
          >
            {/* Rose petal shape */}
            <path
              d="M10 0 C15 5, 20 13, 10 26 C0 13, 5 5, 10 0"
              fill={petal.color}
            />
            {/* Subtle vein detail */}
            <path
              d="M10 3 Q11 13, 10 24"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
