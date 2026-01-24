"use client";

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

  const [guestName, setGuestName] = useState(guestParam || "Quý Khách");

  // Fetch guest name from database (checking both slug and guest param)
  useEffect(() => {
    async function fetchGuestName() {
      // Prioritize explicit slug param, otherwise try using guest param as slug
      const lookupSlug = slugParam || guestParam;

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
        } else {
          setGuestName("Quý Khách");
        }
      } catch (err) {
        console.error("Error fetching guest:", err);
      }
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

        <EnvelopeCover
          guestName={decodeURIComponent(guestName)}
          onOpen={handleOpenEnvelope}
        />
        <div id="main-content">
          <MainContent guestName={decodeURIComponent(guestName)} />
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
