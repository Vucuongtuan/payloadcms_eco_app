import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
// import { findMenuByLang } from "@/query/layout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";
import "./globals.css";
import { Announcement } from "@/components/announcement";
import { Lang } from "@/types";

export default async function RootLayout(props: {
  children: React.ReactNode;
  params?: Promise<{ lang: Lang }>;
}) {
  const { children, params } = props;
  const lang = (await params)?.lang || ("vi" as "vi" | "en");
  console.log("lang :", lang);
  let msg;
  try {
    msg = await getMessages({ locale: lang });
    console.log(msg);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return <>Error loading messages</>;
  }

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={msg}>
          <Announcement lang={lang} />
          <Header lang={lang} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}
