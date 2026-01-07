import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Lora,
  Dancing_Script,
  Crimson_Text,
} from "next/font/google";
import "../globals.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation | Minh Tung & Thanh Thuy",
  description: "You are cordially invited to celebrate our wedding",
  openGraph: {
    title: "Wedding Invitation | Minh Tung & Thanh Thuy",
    description: "You are cordially invited to celebrate our wedding",
    type: "website",
  },
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${lora.variable} ${dancingScript.variable} ${crimson.variable}`}
    >
      {/* Noise texture overlay */}
      <div className="wedding-noise" aria-hidden="true" />

      {/* Wedding wrapper with decorative background */}
      <div className="wedding-wrapper">
        {/* Mobile frame container */}
        <main className="wedding-frame">{children}</main>
      </div>
    </div>
  );
}
