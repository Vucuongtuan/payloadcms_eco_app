import { routing } from "@/i18n/routing";
// import { findMenuByLang } from "@/query/layout";
import { Lang } from "@/types";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Playfair_Display } from "next/font/google";
import React from "react";
import "./globals.css";

export const experimental_ppr = true;


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});


export default async function RootLayout(props: {
  children: React.ReactNode;
  params?: Promise<{ lang: string }>;
}) {
  const { children, params } = props;
  const lang = (await params)?.lang as Lang;
  let msg;
  try {
    msg = await getMessages({ locale: lang });
    console.log(msg);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return <>Error loading messages</>;
  }

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <NextIntlClientProvider messages={msg}>
          {/* <Announcement lang={lang} /> */}
            {/* <Header lang={lang} /> */}
          <main className="h-[2000px]">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}
