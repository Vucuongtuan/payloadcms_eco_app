import { Lang } from "@/types";

// Fallback rate if API fails
const FALLBACK_USD_TO_VND_RATE = 24000;

let cachedRate: number | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function getExchangeRate(): Promise<number> {
  const now = Date.now();
  
  // Return cached rate if still valid
  if (cachedRate && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRate;
  }

  try {
    const response = await fetch(
      "https://api.exchangerate.host/latest?base=USD&symbols=VND"
    );
    const data = await response.json();
    
    if (data.rates?.VND) {
      cachedRate = data.rates.VND;
      lastFetchTime = now;
      return cachedRate;
    }
  } catch (error) {
    console.warn("Failed to fetch exchange rate:", error);
  }

  // Return fallback rate
  return FALLBACK_USD_TO_VND_RATE;
}

export async function formatPriceAsync(priceInUSD: number, lang: Lang = "vi"): Promise<string> {
  if (lang === "en") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(priceInUSD);
  }

  const rate = await getExchangeRate();
  const priceInVND = priceInUSD * rate;
  
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceInVND);
}

// Synchronous version with static rate for immediate rendering
export function formatPrice(priceInUSD: number, lang: Lang = "vi"): string {
  if (lang === "en") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(priceInUSD);
  }

  const priceInVND = priceInUSD * FALLBACK_USD_TO_VND_RATE;
  
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceInVND);
}
