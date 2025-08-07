import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// ---
// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
// --- 
// plugins
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
// ---
// i18n Translations
import { en } from '@payloadcms/translations/languages/en';
import { vi } from '@payloadcms/translations/languages/vi';

// ---
// collections
import { Categories, Media, Users } from './app/(payload)/collections';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { en, vi },
    locales: ["vi", "en"]
  },
  collections: [Users, Media, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || ""
    }
  }),
  sharp,
  plugins: [
    // Payload Cloud Plugin
    payloadCloudPlugin(),

    // Plugin SEO Meta
    seoPlugin({
      collections: ["category"],
      uploadsCollection: "media",
      generateTitle: ({ doc,collectionSlug }) => {
        if(collectionSlug === "category") {
          return doc.title + '| Eco Store | ' + 'Phụ kiện máy tính cao cấp - Bàn phím, Chuột, Keycap';
        }
        return `${doc.title}`
      },
      generateImage:({doc ,collectionSlug})=>{
        return doc.image || `/assets/default-image.png`;
      },
      generateDescription: ({ doc }) => doc.desc,
      tabbedUI:true
    }),

    // Search Plugin

    //Config vercel Blob Storage
    vercelBlobStorage({
      collections: {
        media: {
          disableLocalStorage: true,
          prefix: "uploads",
          generateFileURL: async args =>
            args.filename
              ? `${process.env.BASE_URL_BLOB}/${args.prefix}/${args.filename}`
              : ""
        }
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || ""
    })
    // storage-adapter-placeholder
  ]
});
