"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountName: string;
  qrCode?: string;
}

const bankAccounts: BankInfo[] = [
  {
    bankName: "TPBank",
    accountNumber: "62292826729",
    accountName: "DOAN KIM TUAN",
    qrCode: "/images/qr.png",
  },
];

export function GiftSection() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = async (text: string, accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountNumber);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <section className="relative px-6 py-20 text-center bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* Botanical decorations */}
      <motion.div
        className="absolute top-12 left-0 w-16 h-28 pointer-events-none opacity-25"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 60 110" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q12 25 10 55 Q8 85 18 110"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-12 right-0 w-16 h-28 pointer-events-none opacity-25"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.25, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <svg
          viewBox="0 0 60 110"
          fill="none"
          className="w-full h-full"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M0 0 Q12 25 10 55 Q8 85 18 110"
            stroke="#A8B5A0"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#A8B5A0"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
        </svg>
      </motion.div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-accent)] opacity-25">
            Mừng Cưới
          </span>
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/40" />
        </div>
        <h3 className="font-script text-4xl text-[var(--wedding-secondary)] mb-2">
          Hộp Quà Cưới
        </h3>
      </div>

      {/* Elegant Gift Icon - Redesigned */}
      <motion.div
        className="relative w-24 h-24 mx-auto mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="w-full h-full rounded-full flex items-center justify-center relative"
          style={{
            background:
              "linear-gradient(145deg, rgba(197, 168, 109, 0.15) 0%, rgba(197, 168, 109, 0.05) 100%)",
            border: "2px solid rgba(197, 168, 109, 0.3)",
            boxShadow: "0 8px 32px rgba(197, 168, 109, 0.15)",
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-[var(--wedding-accent)]" />
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.p
        className="font-body text-sm text-[var(--wedding-text-muted)] max-w-xs mx-auto mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Sự hiện diện của bạn là món quà quý giá nhất. Nếu bạn muốn gửi thêm lời
        chúc qua quà cưới...
      </motion.p>

      {/* REFINED Option 3: Side-by-Side Elegant Card (Keepsake Style) */}
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
          style={{
            boxShadow: "0 8px 32px rgba(61, 53, 46, 0.03)",
            border: "1px solid rgba(232, 226, 218, 0.5)",
          }}
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

          {/* Decorative corner accent - ultra subtle */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none transition-opacity duration-700 group-hover:opacity-10">
            <svg
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-[var(--wedding-accent)]"
            >
              <circle cx="100" cy="0" r="70" />
            </svg>
          </div>

          {/* Grid Layout */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative z-10">
            {/* QR Code - Style like a Stamp/Photo */}
            <div className="flex-shrink-0 relative">
              {bankAccounts[0].qrCode && (
                <div
                  className="w-[150px] h-[150px] rounded-lg overflow-hidden bg-white relative shadow-sm"
                  style={{
                    border: "4px solid white", // Polaroid/Stamp thick border
                    boxShadow: "0 2px 8px rgba(61, 53, 46, 0.08)", // Subtle lift
                  }}
                >
                  <Image
                    src={bankAccounts[0].qrCode}
                    alt={`QR Code ${bankAccounts[0].bankName}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                    // No filters ensuring 100% scannability
                  />
                </div>
              )}
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[var(--wedding-border)] to-transparent opacity-50" />

            {/* Bank Info - Minimal Text */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              {/* Bank Name */}
              <p className="font-display text-lg text-[var(--wedding-secondary)] tracking-wide">
                {bankAccounts[0].bankName}
              </p>

              {/* Account Number - Ghost Pill */}
              <div
                className="group/copy inline-flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all duration-300 hover:bg-[var(--wedding-accent)]/5 border border-transparent hover:border-[var(--wedding-accent)]/10"
                onClick={() =>
                  copyToClipboard(
                    bankAccounts[0].accountNumber,
                    bankAccounts[0].accountNumber,
                  )
                }
              >
                <span className="font-mono text-base tracking-[0.1em] text-[var(--wedding-secondary)] opacity-80 group-hover/copy:opacity-100 transition-opacity">
                  {bankAccounts[0].accountNumber}
                </span>
                {copiedAccount === bankAccounts[0].accountNumber ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Copy
                    size={14}
                    className="text-[var(--wedding-text-muted)] opacity-50 group-hover/copy:opacity-100 group-hover/copy:text-[var(--wedding-accent)] transition-all"
                  />
                )}
              </div>

              {/* Account Name */}
              <p className="font-body text-xs text-[var(--wedding-text-muted)] tracking-widest uppercase opacity-60">
                {bankAccounts[0].accountName}
              </p>

              {/* Success Message */}
              <div className="h-4">
                {copiedAccount === bankAccounts[0].accountNumber && (
                  <motion.p
                    className="text-[10px] text-green-600 flex items-center justify-center sm:justify-start gap-1"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={10} /> Đã sao chép
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thank you message */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/20" />
            <Heart
              size={10}
              className="text-[var(--wedding-accent)] opacity-40"
            />
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/20" />
          </div>
          <p className="font-body text-[10px] text-[var(--wedding-text-muted)] italic leading-relaxed opacity-50 tracking-wider">
            Thank you with all our hearts
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
