import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";

/// dev
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
///-----

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
    ],
  },
  //
  experimental: {
    viewTransition: true,
    reactCompiler: true,
  },
  // webpack: (webpackConfig) => {
  //   webpackConfig.resolve.extensionAlias = {
  //     ".cjs": [".cts", ".cjs"],
  //     ".js": [".ts", ".tsx", ".js", ".jsx"],
  //     ".mjs": [".mts", ".mjs"],
  //   };
  //   return webpackConfig;
  // },

  sassOptions: {
    silenceDeprecations: ["import"],
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
