"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Suspense, useRef, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { EnvelopeCover } from "@/components/invitation/EnvelopeCover";
import { MainContent } from "@/components/invitation/MainContent";
import { FallingPetals } from "@/components/invitation/FallingPetals";
import { WeddingProvider } from "@/components/invitation/WeddingContext";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

function InvitationContent() {
  const searchParams = useSearchParams();
  // Get guest from direct param OR fetch via slug
  const guestParam = searchParams.get("guest");
  const slugParam = searchParams.get("slug");

  const [isLoading, setIsLoading] = useState(true);
  const [guestName, setGuestName] = useState<string | null>("Quý Khách");

  // Fetch guest name from database (checking both slug and guest param)
  useEffect(() => {
    async function fetchGuestName() {
      // Prioritize explicit slug param, otherwise try using guest param as slug
      const lookupSlug = slugParam || guestParam;

      const fetchData = async () => {
        if (!lookupSlug) return;
        try {
          const supabase = createClient();
          const { data, error } = await supabase
            .from("guests")
            .select("name")
            .eq("slug", lookupSlug)
            .single();

          if (data && !error) {
            setGuestName(data.name);
          }
        } catch (err) {
          console.error("Error fetching guest:", err);
        }
      };

      // Wait for both data fetch and minimum loading time (2s)
      await Promise.all([
        fetchData(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      setIsLoading(false);
    }

    fetchGuestName();
  }, [slugParam, guestParam]);

  // Lock scroll initially
  const [canScroll, setCanScroll] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollRef = useRef<number | null>(null);
  const userInteractedRef = useRef(false);

  // Auto-scroll speed (pixels per frame at 60fps)
  const SCROLL_SPEED = 1.5;

  // Stop auto-scroll when user interacts
  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    setIsAutoScrolling(false);
    userInteractedRef.current = true;
  }, []);

  // Auto-scroll function
  const startAutoScroll = useCallback(() => {
    if (userInteractedRef.current) return;

    setIsAutoScrolling(true);

    const scroll = () => {
      // Check if we've reached the bottom
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY >= maxScroll || userInteractedRef.current) {
        stopAutoScroll();
        return;
      }

      window.scrollBy(0, SCROLL_SPEED);
      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    autoScrollRef.current = requestAnimationFrame(scroll);
  }, [stopAutoScroll]);

  // Listen for user scroll/touch to stop auto-scroll
  useEffect(() => {
    if (!isAutoScrolling) return;

    const handleUserInteraction = () => {
      stopAutoScroll();
    };

    // Wheel event for desktop
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    // Touch events for mobile
    window.addEventListener("touchstart", handleUserInteraction, {
      passive: true,
    });
    // Keyboard scroll
    window.addEventListener("keydown", (e) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space"].includes(e.key)
      ) {
        handleUserInteraction();
      }
    });

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };
  }, [isAutoScrolling, stopAutoScroll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, []);

  const handleOpenEnvelope = () => {
    // Allow scrolling after animation starts/completes
    setTimeout(() => {
      setCanScroll(true);
      // First scroll to main content, then start auto-scroll
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth" });

        // Start auto-scroll after the initial scroll completes
        setTimeout(() => {
          startAutoScroll();
        }, 1500); // Wait for smooth scroll to complete
      }
    }, 1800); // Wait for envelope flap (0.6) + card rise (0.8) + small buffer
  };

  return (
    <WeddingProvider>
      <div
        className={`min-h-screen ${
          canScroll ? "overflow-auto" : "overflow-hidden h-screen"
        }`}
      >
        {/* Subtle page-wide falling petals effect */}
        <FallingPetals />

        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--wedding-bg-paper)]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div className="flex flex-col items-center">
                {/* Logo / Initials */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-8 relative"
                >
                  <div className="absolute inset-0 border border-[var(--wedding-primary)] opacity-20 rounded-full" />
                  <div className="absolute inset-2 border border-[var(--wedding-primary)] opacity-40 rounded-full" />
                  <span className="font-display text-4xl text-[var(--wedding-primary)] tracking-widest">
                    T&N
                  </span>
                </motion.div>

                {/* Loading Text */}
                <motion.p
                  className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--wedding-text-muted)]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <EnvelopeCover guestName={guestName} onOpen={handleOpenEnvelope} />
        <div id="main-content">
          <MainContent guestName={guestName} />
        </div>

        <MusicPlayer shouldAutoPlay={canScroll} />
      </div>
    </WeddingProvider>
  );
}

export default function InvitationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--wedding-bg-paper)]">
          <div className="animate-pulse-subtle text-[var(--wedding-primary)] font-body">
            Loading...
          </div>
        </div>
      }
    >
      <InvitationContent />
    </Suspense>
  );
}
