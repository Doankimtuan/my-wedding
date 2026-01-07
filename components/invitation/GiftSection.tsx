"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Heart,
  Sparkles,
} from "lucide-react";
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
    qrCode: "/images/qr-tpbank.png", // Add your QR code images
  },
  {
    bankName: "VPBank",
    accountNumber: "198532436",
    accountName: "LE THI THANH NGAN",
    qrCode: "/images/qr-vpbank.png",
  },
];

export function GiftSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

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
    <section className="relative px-6 py-16 text-center bg-[var(--wedding-bg-paper)] overflow-hidden">
      {/* Botanical decorations */}
      <motion.div
        className="absolute top-12 left-0 w-16 h-28 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 60 110" fill="none" className="w-full h-full">
          <path
            d="M0 0 Q12 25 10 55 Q8 85 18 110"
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-12 right-0 w-16 h-28 pointer-events-none opacity-40"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 0.4, x: 0 }}
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
            stroke="#7c9a73"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <ellipse
            cx="16"
            cy="35"
            rx="7"
            ry="3"
            fill="#7c9a73"
            fillOpacity="0.25"
            transform="rotate(-20 16 35)"
          />
        </svg>
      </motion.div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/40" />
          <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[var(--wedding-accent)] opacity-60">
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
        transition={{ duration: 0.6 }}
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
        className="font-body text-sm text-[var(--wedding-text-muted)] max-w-xs mx-auto mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Sự hiện diện của bạn là món quà quý giá nhất. Nếu bạn muốn gửi thêm lời
        chúc qua quà cưới...
      </motion.p>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full transition-all duration-300 hover:scale-[1.02]"
        style={{
          background: isExpanded
            ? "transparent"
            : "linear-gradient(135deg, var(--wedding-accent) 0%, #b8963d 100%)",
          color: isExpanded ? "var(--wedding-accent)" : "white",
          border: isExpanded ? "1.5px solid var(--wedding-accent)" : "none",
          boxShadow: isExpanded
            ? "none"
            : "0 4px 16px rgba(197, 168, 109, 0.3)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="font-body text-sm tracking-wider">
          {isExpanded ? "Ẩn thông tin" : "Gửi quà mừng"}
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </motion.button>

      {/* Bank Accounts - Expandable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="max-w-sm mx-auto mt-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-6">
              {bankAccounts.map((account, index) => (
                <button
                  key={account.accountNumber}
                  onClick={() => setActiveTab(index)}
                  className="px-4 py-2 rounded-full font-body text-xs tracking-wide transition-all duration-300"
                  style={{
                    background:
                      activeTab === index
                        ? "var(--wedding-accent)"
                        : "rgba(197, 168, 109, 0.1)",
                    color:
                      activeTab === index ? "white" : "var(--wedding-accent)",
                  }}
                >
                  {account.bankName}
                </button>
              ))}
            </div>

            {/* Active Bank Card */}
            <motion.div
              key={activeTab}
              className="text-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="bg-white rounded-2xl p-6 relative overflow-hidden"
                style={{
                  boxShadow: "0 12px 40px -12px rgba(61, 53, 46, 0.12)",
                  border: "1px solid rgba(197, 168, 109, 0.2)",
                }}
              >
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="text-[var(--wedding-accent)]"
                  >
                    <circle cx="100" cy="0" r="80" />
                  </svg>
                </div>

                {/* QR Code */}
                {bankAccounts[activeTab].qrCode && (
                  <div className="flex justify-center mb-5">
                    <div
                      className="w-36 h-36 rounded-xl overflow-hidden"
                      style={{
                        border: "2px solid rgba(197, 168, 109, 0.2)",
                        padding: "8px",
                        background: "white",
                      }}
                    >
                      <Image
                        src={bankAccounts[activeTab].qrCode!}
                        alt={`QR Code ${bankAccounts[activeTab].bankName}`}
                        width={144}
                        height={144}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback: hide if image fails to load
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Bank Info */}
                <div className="text-center space-y-3">
                  <div>
                    <p className="font-display text-lg text-[var(--wedding-secondary)] tracking-wide">
                      {bankAccounts[activeTab].bankName}
                    </p>
                  </div>

                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-[var(--wedding-accent)]/10"
                    style={{ background: "rgba(250, 247, 243, 0.8)" }}
                    onClick={() =>
                      copyToClipboard(
                        bankAccounts[activeTab].accountNumber,
                        bankAccounts[activeTab].accountNumber
                      )
                    }
                  >
                    <span className="font-mono text-xl tracking-[0.2em] text-[var(--wedding-secondary)]">
                      {bankAccounts[activeTab].accountNumber}
                    </span>
                    {copiedAccount === bankAccounts[activeTab].accountNumber ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy
                        size={16}
                        className="text-[var(--wedding-accent)]"
                      />
                    )}
                  </div>

                  <p className="font-body text-sm text-[var(--wedding-text-muted)] tracking-wide">
                    {bankAccounts[activeTab].accountName}
                  </p>

                  {copiedAccount === bankAccounts[activeTab].accountNumber && (
                    <motion.p
                      className="text-xs text-green-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Đã sao chép số tài khoản!
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Footer message */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--wedding-accent)]/30" />
                <Heart
                  size={10}
                  className="text-[var(--wedding-accent)] opacity-50"
                />
                <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[var(--wedding-accent)]/30" />
              </div>
              <p className="font-body text-xs text-[var(--wedding-text-muted)] italic leading-relaxed">
                Xin chân thành cảm ơn
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
