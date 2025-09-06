import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
import { findMenuByLang } from "@/query/layout";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React from "react";
import "./globals.css";



export default async function RootLayout(props: { children: React.ReactNode, params?: Promise<{ lang: string }> }) {
  const { children, params } = props;
  const lang = (await params)?.lang || 'vi' as 'vi' | 'en';
  let msg;
  try {
    msg = await getMessages({ locale: lang });
    console.log(msg)
  } catch (error) {
    console.error("Error fetching messages:", error);
    return <>Error loading messages</>;
  }

  const menu = await findMenuByLang(lang as 'vi' | 'en');

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={msg}>
          <Header lang={lang} menu={menu?.header ?? undefined} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }))
}