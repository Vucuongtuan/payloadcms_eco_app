
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { routing } from '@/i18n/routing'
import { Providers } from '@/providers'
import { Lang } from '@/types'
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from 'next-intl/server'
import './globals.css'

/* const { SITE_NAME, TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined
 */
/* export const metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
} */

export default async function RootLayout(props: {
      children: React.ReactNode;
      params?: Promise<{ lang: string }>;
    }) {
      const { children, params } = props;
  const lang = (await params)?.lang as Lang;
  let msg;
  try {
    msg = await getMessages({ locale: lang });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return <>Error loading messages</>;
  }

  return (
    <html
      lang={lang}
      suppressHydrationWarning
    >
      <head>
        {/* <InitTheme /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
         <NextIntlClientProvider messages={msg}>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          {/* <Header lang={lang}/> */}
          <main className="min-h-[1000px]">{children}</main>
          <Footer lang={lang} />
        </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}
