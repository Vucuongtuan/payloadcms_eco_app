import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

/// dev
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
///-----
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  //Image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnjdysar8zpiiswk.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },

  // react compiler
  reactCompiler: true,

  cacheComponents: true,

  //  Experimental Beta
  experimental: {
    // Use React Compiler
    // reactCompiler: {
    //   compilationMode: "annotation",
    // },
    inlineCss: true,

    turbopackFileSystemCacheForDev: true,
    // viewTransition: true,
    // ppr: "incremental",

    // turbopackFileSystemCacheForDev: true,
    // no supports production nextjs latest version
    // cacheComponents: true, // next@canary
  },
  // webpack: (webpackConfig) => {
  //   webpackConfig.resolve.extensionAlias = {
  //     ".cjs": [".cts", ".cjs"],
  //     ".js": [".ts", ".tsx", ".js", ".jsx"],
  //     ".mjs": [".mts", ".mjs"],
  //   };
  //   return webpackConfig;
  // },

  //Config I18n next-intl
  // i18n: {
  //   locales: ['vi', 'en'],
  //   defaultLocale: 'vi',
  // },
};

export default withNextIntl(withPayload(nextConfig));
