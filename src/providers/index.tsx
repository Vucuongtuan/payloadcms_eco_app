import CartProvider from "@/components/(cart)/CartProvider";
import { AuthProvider } from "@/providers/Auth";
import { EcommerceProvider } from "@payloadcms/plugin-ecommerce/client/react";
import { stripeAdapterClient } from "@payloadcms/plugin-ecommerce/payments/stripe";
import React from "react";

import { HeaderThemeProvider } from "./HeaderTheme";
import { QueryProvider } from "./QueryClient";
import { ThemeProvider } from "./Theme";

export const Providers: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          <HeaderThemeProvider>
            <EcommerceProvider
              enableVariants={true}
              api={{
                cartsFetchQuery: {
                  depth: 2,
                  populate: {
                    products: {
                      slug: true,
                      title: true,
                      gallery: true,
                    },
                    variants: {
                      title: true,
                      inventory: true,
                    },
                  },
                },
              }}
              paymentMethods={[
                stripeAdapterClient({
                  publishableKey:
                    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
                }),
              ]}
            >
              <CartProvider>{children}</CartProvider>
            </EcommerceProvider>
          </HeaderThemeProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
};
