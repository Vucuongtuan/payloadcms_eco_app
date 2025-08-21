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
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
// ---
// i18n Translations
import { en } from '@payloadcms/translations/languages/en';
import { vi } from '@payloadcms/translations/languages/vi';

// ---
// collections
import { Categories, Media, Products, Tags, Users,SubCategories,Brands } from './app/(payload)/collections';
import { defaultLexical } from './app/(payload)/fields/defaultLexical';
import { truncate } from './utils/truncateText';
//---

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const maxLengthSEO:Record<string,number> = {
  title:60,
  description:150
}
const allCollections = [Users, Media, Categories,SubCategories,Products,Tags,Brands];
const applySearchForCollection = ['categories', 'subcategories','products','brands']
const applySEOForCollection = ['categories', 'subcategories','products','brands']

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    //Custom UI for Admin Dashboard
    components: {
      Nav: "@/app/(payload)/components/Nav#Nav",
    }
  },
  collections: allCollections,
  // Config i18n for CMS
  i18n: {
    fallbackLanguage: "vi",
    supportedLanguages: { en, vi },
  },
  // Config Localization Content
  localization:{
    locales: ['vi', 'en'],
    defaultLocale:'vi',
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
     admin: {
       group: {
         vi:"Khác",
         en:"Other"
       }
     }
  },
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
      collections: applySEOForCollection,
      uploadsCollection: "media",
      generateTitle: ({ doc, collectionSlug ,locale}) => {
      const brandName = 'TCGear';
      const brandTagline = {
        vi:'Phụ kiện máy tính cao cấp - Bàn phím, Chuột, Tai nghe',
        en:'High-end computer peripherals - Keyboard, Mouse, Headphones'
      };

      if (collectionSlug === "categories" || collectionSlug === "subcategories") {
        const l = locale || 'vi'
        const fullTitle = `${doc.title} | ${brandName} | ${brandTagline[l]}`;
        return truncate(fullTitle, maxLengthSEO.title);
      }

      return truncate(doc.title, maxLengthSEO.title);
      },
      // generateImage:({doc ,collectionSlug})=>{
      //   return doc.image || `/assets/default-image.png`;
      // },
      generateDescription: ({ doc }) => truncate(doc.description, maxLengthSEO.description),
      generateImage: ({ doc }) => doc.image || `/assets/default-image.png`,
      // tabbedUI:true
    }),

    // Search Plugin
    searchPlugin({
      collections:applySearchForCollection,
      defaultPriorities:{
        categories:10,
        products:20
      },
      searchOverrides: {
        fields: ({ defaultFields }) => defaultFields.map(field => {
          if ((field as {name: string}).name === 'doc') {
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
      localize:true
    }),
    // Nesterd Docs
    // nestedDocsPlugin({
    //   collections: ['category'],
    //   generateLabel: (_, doc) => doc.title,
    //   generateURL: (docs) =>
    //     docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    // }),
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
