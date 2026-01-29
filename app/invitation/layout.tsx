import type { Metadata } from "next";
import {
  Playfair_Display,
  Lora,
  Dancing_Script,
  Crimson_Text,
} from "next/font/google";
import "../globals.css";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"], // Playfair doesn't support 300
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
  title: "Thiệp Cưới | Kim Tuấn & Thanh Ngân",
  description:
    "Trân trọng kính mời bạn đến tham dự lễ thành hôn của chúng tôi. Sự hiện diện của bạn là niềm vinh hạnh và hạnh phúc lớn nhất!",
  keywords: [
    "thiệp cưới",
    "wedding invitation",
    "đám cưới",
    "Kim Tuấn",
    "Thanh Ngân",
    "wedding",
    "lễ cưới",
    "save the date",
  ],
  authors: [{ name: "Kim Tuấn & Thanh Ngân" }],
  creator: "Kim Tuấn & Thanh Ngân",
  metadataBase: new URL("https://tuan-ngan-wedding.vercel.app"),
  openGraph: {
    title: "💒 Thiệp Cưới | Kim Tuấn & Thanh Ngân",
    description:
      "Trân trọng kính mời bạn đến tham dự lễ thành hôn của chúng tôi. Sự hiện diện của bạn là niềm vinh hạnh và hạnh phúc lớn nhất!",
    type: "website",
    locale: "vi_VN",
    siteName: "Thiệp Cưới Kim Tuấn & Thanh Ngân",
    images: [
      {
        url: "https://tuan-ngan-wedding.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Thiệp cưới Kim Tuấn & Thanh Ngân",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "💒 Thiệp Cưới | Kim Tuấn & Thanh Ngân",
    description:
      "Trân trọng kính mời bạn đến tham dự lễ thành hôn của chúng tôi!",
    images: ["https://tuan-ngan-wedding.vercel.app/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#d4a574",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lora.variable} ${dancingScript.variable} ${crimson.variable}`}
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
