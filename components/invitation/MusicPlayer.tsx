"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Disc } from "lucide-react";

interface MusicPlayerProps {
  shouldAutoPlay?: boolean;
}

export function MusicPlayer({ shouldAutoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  // Initialize audio
  useEffect(() => {
    // Using Lover - Taylor Swift as the wedding background music
    audioRef.current = new Audio("/music/Lover Taylor Swift.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-play when envelope is opened
  useEffect(() => {
    if (shouldAutoPlay && !hasAutoPlayed.current && audioRef.current) {
      hasAutoPlayed.current = true;

      // Small delay to ensure smooth transition after envelope opens
      const timer = setTimeout(() => {
        audioRef.current
          ?.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => {
            console.log(
              "Audio autoplay failed (user interaction required):",
              e
            );
            // Player is still visible so user can manually play
          });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [shouldAutoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((e) => console.log("Audio play failed:", e));
      }
    }
  };

  // Don't render anything until envelope is opened
  if (!shouldAutoPlay) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        className="fixed bottom-6 right-6 z-50 group"
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className={`
          relative w-14 h-14 rounded-full 
          flex items-center justify-center
          bg-white/90 backdrop-blur-md shadow-xl border border-white/30
          text-[var(--wedding-primary)] overflow-hidden
          transition-all duration-500
          ${isPlaying ? "shadow-[0_0_25px_rgba(212,184,149,0.5)]" : ""}
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

          {/* Glow ring when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[var(--wedding-accent)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          )}

          {/* Icon */}
          <div className="relative z-10 transition-transform duration-300">
            {isPlaying ? (
              <div className="flex gap-1 items-end h-5">
                <motion.div
                  animate={{ height: [8, 18, 8] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 bg-current rounded-full"
                />
                <motion.div
                  animate={{ height: [14, 6, 14] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-1.5 bg-current rounded-full"
                />
                <motion.div
                  animate={{ height: [6, 16, 6] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-1.5 bg-current rounded-full"
                />
              </div>
            ) : (
              <Disc size={26} className="opacity-80" />
            )}
          </div>
        </div>

        {/* Label Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/95 backdrop-blur text-xs font-body text-[var(--wedding-secondary)] rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isPlaying ? "Tạm dừng" : "Phát nhạc"}
        </span>
      </motion.button>
    </AnimatePresence>
  );
}
