"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Disc } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // You would replace this with your actual audio file path
    // For now using a placeholder or we can use a free licensed URL if provided
    audioRef.current = new Audio("/music/wedding-bgm.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((e) => console.log("Audio autoplay failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-50 group"
      onClick={togglePlay}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`
        relative w-12 h-12 rounded-full 
        flex items-center justify-center
        bg-white/80 backdrop-blur-md shadow-lg border border-white/20
        text-[var(--wedding-primary)] overflow-hidden
        transition-all duration-500
        ${isPlaying ? "shadow-[0_0_20px_rgba(212,184,149,0.4)]" : ""}
      `}
      >
        {/* Spinning Disc Effect */}
        <div
          className={`absolute inset-0 opacity-20 ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Icon */}
        <div className="relative z-10 transition-transform duration-300">
          {isPlaying ? (
            <div className="flex gap-1 items-end h-4">
              <motion.div
                animate={{ height: [8, 16, 8] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-1 bg-current rounded-full"
              />
              <motion.div
                animate={{ height: [12, 6, 12] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-1 bg-current rounded-full"
              />
              <motion.div
                animate={{ height: [6, 14, 6] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="w-1 bg-current rounded-full"
              />
            </div>
          ) : (
            <Disc size={24} className="opacity-80" />
          )}
        </div>
      </div>

      {/* Label Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/90 backdrop-blur text-xs font-body text-[var(--wedding-secondary)] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {isPlaying ? "Pause Music" : "Play Music"}
      </span>
    </motion.button>
  );
}
