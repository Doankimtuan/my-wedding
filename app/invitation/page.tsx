"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { EnvelopeCover } from "@/components/invitation/EnvelopeCover";
import { MainContent } from "@/components/invitation/MainContent";
import { FallingPetals } from "@/components/invitation/FallingPetals";
import { WeddingProvider } from "@/components/invitation/WeddingContext";
import { useState } from "react";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("guest") || "Quý Khách";

  // Lock scroll initially
  const [canScroll, setCanScroll] = useState(false);

  const handleOpenEnvelope = () => {
    // Allow scrolling after animation starts/completes
    setTimeout(() => {
      setCanScroll(true);
      // Optional: Smooth scroll to main content start if needed
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth" });
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
