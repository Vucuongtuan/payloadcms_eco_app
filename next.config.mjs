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
  turbopack: {
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  //Image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gnjdysar8zpiiswk.public.blob.vercel-storage.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      }
    ],
  },
  //
  experimental: {
    // viewTransition: true,
    // reactCompiler: true,
    // ppr: "incremental",
    inlineCss: true,
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

  sassOptions: {
    silenceDeprecations: ["import"],
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default withNextIntl(withPayload(nextConfig));
