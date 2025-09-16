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
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
// ---
// i18n Translations
import { en } from '@payloadcms/translations/languages/en';
import { vi } from '@payloadcms/translations/languages/vi';

// ---
// collections

import { Brands, Categories, EmailSubscribe, Media, Newsletter, Orders, Pages, Posts, Products, ProductVariants, Reviews, SubCategories, Tags, Users } from './app/(payload)/collections';
import { defaultLexical } from './app/(payload)/fields/defaultLexical';
import { Settings } from './app/(payload)/globals';
import { truncate } from './utils/truncateText';
//---


// Config Environment
const configEnv = {
  payloadSecret: process.env.PAYLOAD_SECRET || "",
  postgresUrl: process.env.POSTGRES_URL || "",
  baseUrlBlob: process.env.BASE_URL_BLOB || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const maxLengthSEO: Record<string, number> = {
  title: 60,
  description: 150
}
const allCollections = [Users, Media, Categories, SubCategories, Products, Tags, Brands, Orders, Reviews, ProductVariants, Newsletter, EmailSubscribe, Pages, Posts];
const golobalCollections = [Settings]
const applySearchForCollection = ['categories', 'subcategories', 'products', 'brands', 'posts']
const applySEOForCollection = ['categories', 'subcategories', 'products', 'brands', 'posts', 'pages']



export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },

    //Custom UI for Admin Dashboard
    components: {
      Nav: "@/app/(payload)/components/Nav#Nav",
      // beforeDashboard: ["@/app/(payload)/components/Reporting#Reporting"],
      // views:{
      //   dashboard:{
      //     Component:"@/app/(payload)/components/Reporting#Reporting"
      //   }
      // }
    }
  },
  globals: golobalCollections,
  collections: allCollections,
  // Config i18n for CMS
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { en, vi },
  },
  // Config Localization Content
  localization: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
  editor: defaultLexical,
  folders: {
    debug: true, // optional
    collectionOverrides: [
      async ({ collection }) => {
        return collection
      },
    ], // optional
    fieldName: 'folder',
    slug: 'payload-folders',

  },
  secret: configEnv.payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: configEnv.postgresUrl
    }
  }),
  sharp,
  plugins: [
    // Payload Cloud Plugin
    payloadCloudPlugin(),

    // Plugin SEO Meta
    seoPlugin({
      collections: applySEOForCollection,
      uploadsCollection: "media",
      generateTitle: ({ doc, collectionSlug, locale }) => {
        const brandName = 'TCGear';
        const brandTagline: Record<string, string> = {
          vi: 'Phụ kiện máy tính cao cấp - Bàn phím, Chuột, Tai nghe',
          en: 'High-end computer peripherals - Keyboard, Mouse, Headphones'
        };

        if (collectionSlug === "categories" || collectionSlug === "subcategories") {
          const l = locale || 'vi'
          const fullTitle = `${doc.title} | ${brandName} | ${brandTagline[l]}`;
          return truncate(fullTitle, maxLengthSEO.title);
        }
        else if (collectionSlug === "pages") {
          const l = locale || 'vi'
          const fullTitle = `${brandName} | ${brandTagline[l]}`;
          return truncate(fullTitle, maxLengthSEO.title);
        }
        return truncate(doc.title, maxLengthSEO.title);
      },
      // generateImage:({doc ,collectionSlug})=>{
      //   return doc.image || `/assets/default-image.png`;
      // },
      generateDescription: ({ doc, collectionSlug, locale }) => {
        const l = locale || 'vi'

        const baseDescription: Record<string, string> = {
          vi: 'TCGear cung cấp các phụ kiện máy tính cao cấp như bàn phím, chuột, tai nghe với thiết kế hiện đại và hiệu suất vượt trội.',
          en: 'TCGear offers high-end computer accessories such as keyboards, mice, and headphones with modern design and superior performance.'
        };
        const desValue = doc.description || baseDescription[l];
        return truncate(desValue, maxLengthSEO.description)
      },
      generateImage: ({ doc }) => doc.image || `/assets/default-image.png`,
      // tabbedUI:true
    }),

    // Search Plugin
    searchPlugin({
      collections: applySearchForCollection,
      defaultPriorities: {
        categories: 10,
        products: 20
      },
      searchOverrides: {
        fields: ({ defaultFields }) => defaultFields.map(field => {
          if ((field as { name: string }).name === 'doc') {
            return {
              ...field,
              relationTo: applySearchForCollection,
              admin: {
                ...((field as any).admin || {}),
                sortOptions: {
                  categories: 'title',
                  products: 'title',
                  brands: 'title',
                  tags: 'title',
                  subCategories: 'title',
                },
              },
            }
          }
          return field
        })
      },
      beforeSync: ({ doc, searchDoc }) => {

        return {
          ...searchDoc,
          title: doc?.title,
        }
      },
      localize: true
    }),
    // Nesterd Docs
    // nestedDocsPlugin({
    //   collections: ['category'],
    //   generateLabel: (_, doc) => doc.title,
    //   generateURL: (docs) =>
    //     docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    // }),
    //Config vercel Blob Storage


    // Config Stripe Plugin
    // stripePlugin({
    //   stripeSecretKey: configEnv.stripeSecretKey,
    //   stripeWebhookSecret: configEnv.stripeWebhookSecret,
    //   isTest: true,
    //   sync: [
    //     {
    //       collection: 'users',
    //       stripeResourceType: 'customers',
    //       stripeResourceID: 'id',
    //       payloadCollectionID: 'id',
    //       fields: [
    //         {
    //           field: 'email',
    //           stripeProperty: 'email',
    //         },
    //         {
    //           field: 'name',
    //           stripeProperty: 'name',
    //         },
    //       ],
    //     },
    //   ],
    // }),

    // storage-adapter-placeholder
  ]
});
