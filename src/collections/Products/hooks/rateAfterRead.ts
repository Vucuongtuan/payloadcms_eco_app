// import { query } from "@/lib/tryCatch";
// import type { Rate } from "@/payload-types";
// import type { CollectionAfterReadHook } from "payload";

// export const rateAfterRead: CollectionAfterReadHook = async ({ doc, req }) => {
//   if (!doc?.pricing) return doc;

//   const { price, discount = 0 } = doc.pricing;
//   const locale = req.locale || "vi";
//   const country = req.headers?.get("x-country") || "VN";

//   if (locale === "vi") {
//     return {
//       ...doc,
//       pricing: {
//         ...doc.pricing,
//         finalPrice: `${parseInt(price.replace(/\./g, ""), 10) - (parseInt(price.replace(/\./g, ""), 10) * discount) / 100}`,
//         currency: "VND",
//       },
//     };
//   }

//   const [result, err] = await query<Rate>((payload) =>
//     payload.findGlobal({ slug: "rate" })
//   );

//   if (err) throw err;
//   if (!result?.rates) return doc;

//   const foundRate =
//     result.rates.find((r) => r.currency === country) ||
//     result.rates.find((r) => r.currency === "USD");
//   if (!foundRate) {
//     return {
//       ...doc,
//       pricing: {
//         ...doc.pricing,
//         finalPrice: `${parseInt(price.replace(/\./g, ""), 10) - (parseInt(price.replace(/\./g, ""), 10) * discount) / 100}`,
//         currency: "VND",
//       },
//     };
//   }

//   const cleanedStr = doc.pricing.price.replace(/\./g, "");
//   const num = parseInt(cleanedStr, 10);
//   return {
//     ...doc,
//     pricing: {
//       ...doc.pricing,
//       price: `${num * foundRate.rate}`,
//       finalPrice: `${num * foundRate.rate - (num * foundRate.rate * discount) / 100}`,
//       currency: foundRate.currency,
//     },
//   };
// };
