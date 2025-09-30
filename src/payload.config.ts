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
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
// ---
// i18n Translations
import { en } from '@payloadcms/translations/languages/en';
import { vi } from '@payloadcms/translations/languages/vi';

// ---
// collections

import { Categories, EmailSubscribe, Media, Newsletter, Orders, Pages, Posts, Products, Reviews, Tags, Users } from './app/(payload)/collections';
import { defaultLexical } from './app/(payload)/fields/defaultLexical';
import { Settings } from './app/(payload)/globals';
import { shorten, truncate } from './utils/truncateText';
//---


// Config Environment
const configEnv = {
  payloadSecret: process.env.PAYLOAD_SECRET || "",
  postgresUrl: process.env.POSTGRES_URL || "",
  baseUrlBlob: process.env.BASE_URL_BLOB || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  postgresUrlNonPooling: process.env.POSTGRES_URL_NON_POOLING || "",
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const maxLengthSEO: Record<string, number> = {
  title: 60,
  description: 150
}
const allCollections = [Users, Media, Categories, Products, Tags, Orders, Reviews, Newsletter, EmailSubscribe, Pages, Posts];
const golobalCollections = [Settings]
const applySearchForCollection = ['categories', 'products', 'posts']
const applySEOForCollection = ['categories', 'products', 'posts', 'pages']



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
  editor: defaultLexical(),
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
      connectionString: configEnv.postgresUrlNonPooling
    },
    
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
        const brandName = 'Moon co.';
        const brandTagline: Record<string, string> = {
          vi: 'Thời trang nam nữ, trẻ em - Quần áo, Giày dép, Phụ kiện',
          en: 'Fashion for Men, Women & Kids - Clothing, Shoes, Accessories'
        };

        if (collectionSlug === "categories") {
          const l = locale || "vi";
          return shorten(`${doc.title} | ${brandName}`, maxLengthSEO.title);
        } else if (collectionSlug === "pages") {
          const l = locale || "vi";
          return shorten(`${brandName} | ${brandTagline[l]}`, maxLengthSEO.title);
        }
        
        return truncate(doc.title, maxLengthSEO.title);
      },
      // generateImage:({doc ,collectionSlug})=>{
      //   return doc.image || `/assets/default-image.png`;
      // },
      generateDescription: ({ doc, collectionSlug, locale }) => {
        const l = locale || 'vi'

        const baseDescription: Record<string, string> = {
          vi: 'Moon co. mang đến phong cách thời trang hiện đại cho nam, nữ và trẻ em với nhiều lựa chọn quần áo, giày dép và phụ kiện.',
          en: 'Moon co. delivers modern fashion for men, women, and kids with a wide selection of clothing, shoes, and accessories.'
        };
        const desValue = doc.description || baseDescription[l];
        return truncate(desValue, maxLengthSEO.description)
      },
      generateImage: ({ doc }) => doc.image || `/img/Logo_black.png` || null,
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
        // @ts-expect-error
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

      beforeSync: ({ doc, searchDoc }:any) => {
        return {
          ...searchDoc,
          title: doc?.title,
        }
      },
      localize: true
    }),
    // Nesterd Docs
    nestedDocsPlugin({
      collections: ['categories'],
      generateLabel: (_, doc) => doc.title || doc.name || '',
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
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
const defaultImage = {
  id: 6,
  alt: "Plaholder",
  folder: null,
  updatedAt: "2025-09-22T09:59:40.505Z",
  createdAt: "2025-09-22T09:59:40.505Z",
  url: "/api/media/file/Logo_black-1.png",
  thumbnailURL: "//Logo_black-1-240x240.avif",
  filename: "Logo_black-1.png",
  mimeType: "image/png",
  filesize: 98161,
  width: 512,
  height: 512,
  focalX: 50,
  focalY: 50,
  sizes: {
    thumbnail: {
      url: "/api/media/file/Logo_black-1-240x240.avif",
      width: 240,
      height: 240,
      mimeType: "image/avif",
      filesize: 879,
      filename: "Logo_black-1-240x240.avif"
    },
    small: {
      url: "/api/media/file/Logo_black-1-480x480.avif",
      width: 480,
      height: 480,
      mimeType: "image/avif",
      filesize: 1397,
      filename: "Logo_black-1-480x480.avif"
    },
    medium: {
      url: null,
      width: null,
      height: null,
      mimeType: null,
      filesize: null,
      filename: null
    },
    large: {
      url: null,
      width: null,
      height: null,
      mimeType: null,
      filesize: null,
      filename: null
    }
  }
};
