"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WeddingInfo {
  groom_name: string;
  bride_name: string;
  wedding_date: string;
  wedding_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  venue_map_url: string | null;
  hero_image_url: string | null;
  story_text: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  bank_account_name: string | null;
  bank_qr_image_url: string | null;
}

interface WeddingContextType {
  weddingInfo: WeddingInfo | null;
  isLoading: boolean;
}

const WeddingContext = createContext<WeddingContextType>({
  weddingInfo: null,
  isLoading: true,
});

export function WeddingProvider({ children }: { children: ReactNode }) {
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWeddingInfo() {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          setWeddingInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch wedding info:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeddingInfo();
  }, []);

  return (
    <WeddingContext.Provider value={{ weddingInfo, isLoading }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  return useContext(WeddingContext);
}

// Default values for when data is loading or unavailable
export const defaultWeddingInfo: WeddingInfo = {
  groom_name: "Kim Tuấn",
  bride_name: "Thanh Ngân",
  wedding_date: "ß",
  wedding_time: "",
  venue_name: "",
  venue_address: "",
  venue_map_url: null,
  hero_image_url: null,
  story_text: null,
  bank_name: null,
  bank_account_number: null,
  bank_account_name: null,
  bank_qr_image_url: null,
};
