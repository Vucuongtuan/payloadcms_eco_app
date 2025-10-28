import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import { CheckoutPage } from "@/components/Checkout/CheckoutPage";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("checkout");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: mergeOpenGraph({
      title: t("title"),
      url: "/checkout",
    }),
  };
}

export default async function Checkout() {
  const t = await getTranslations("checkout");

  return (
    <div className="container min-h-[90vh] flex">
      {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
        <div>
          <Fragment>
            {t("missingStripeKey")}{" "}
            <a
              href="https://dashboard.stripe.com/test/apikeys"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-600 underline"
            >
              {t("getStripeKeys")}
            </a>{" "}
            {t("setEnvVariables")}{" "}
            <a
              href="https://github.com/payloadcms/payload/blob/main/templates/ecommerce/README.md#stripe"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-600 underline"
            >
              {t("readme")}
            </a>{" "}
            {t("forMoreDetails")}
          </Fragment>
        </div>
      )}

      <h1 className="sr-only">{t("title")}</h1>

      <CheckoutPage />
    </div>
  );
}
