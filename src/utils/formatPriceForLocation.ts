
const countryToCurrencyMap: Record<string, string> = {
  US: "USD", // United States -> US Dollar
  GB: "GBP", // United Kingdom -> British Pound
  EU: "EUR", // Most of Europe -> Euro
  JP: "JPY", // Japan -> Japanese Yen
  CA: "CAD", // Canada -> Canadian Dollar
  AU: "AUD", // Australia -> Australian Dollar
  VN: "VND", // Vietnam -> Vietnamese Dong
};


export function formatPriceForLocation(
  value: number,
  locale: string,
  country: string,
): string {
  let currency: string;
  let displayLocale: string;

  if (locale === "vi") {
    currency = "VND";
    displayLocale = "vi-VN";
  } else {
    currency = countryToCurrencyMap[country.toUpperCase()] || "USD";
    switch (currency) {
      case "VND":
        displayLocale = "vi-VN";
        break;
      case "GBP":
        displayLocale = "en-GB";
        break;
      case "EUR":
        displayLocale = "de-DE";
        break;
      default:
        displayLocale = "en-US";
    }
  }

  return new Intl.NumberFormat(displayLocale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0, 
  }).format(value);
}