"use client";

import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { CountdownSection } from "./CountdownSection";
import { EventSection } from "./EventSection";
import { GallerySection } from "./GallerySection";
import { RSVPSection } from "./RSVPSection";
import { WishesSection } from "./WishesSection";
import { GiftSection } from "./GiftSection";
import { FooterSection } from "./FooterSection";
import { MusicPlayer } from "./MusicPlayer";
import { useWedding, defaultWeddingInfo } from "./WeddingContext";

interface MainContentProps {
  guestName: string | null;
}

export function MainContent({ guestName }: MainContentProps) {
  const { weddingInfo } = useWedding();

  // Use wedding info or defaults
  const info = weddingInfo || defaultWeddingInfo;
  const targetDate = info.wedding_date.includes("T")
    ? info.wedding_date
    : `${info.wedding_date}T${info.wedding_time || "16:00:00"}`;

  return (
    <motion.div
      className="bg-[var(--wedding-bg-paper)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Countdown Section */}
      <CountdownSection targetDate={targetDate} />

      {/* Event Information */}
      <EventSection />

      {/* Photo Gallery */}
      <GallerySection />

      {/* RSVP Form */}
      <RSVPSection defaultName={guestName} />

      {/* Guest Wishes */}
      <WishesSection />

      {/* Gift / Banking */}
      <GiftSection />

      {/* Footer */}
      <FooterSection />

      {/* Floating Music Player */}
      <MusicPlayer />
    </motion.div>
  );
}
