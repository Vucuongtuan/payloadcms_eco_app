// storage-adapter-import-placeholder

import { Categories } from '@/collections/(ecommerce)/Categories';
import { Media } from '@/collections/Media';
import { Pages } from '@/collections/Pages';
import { Users } from '@/collections/Users';
import { Footer } from '@/globals/Footer';
import { Header } from '@/globals/Header';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { plugins } from './plugin';
// i18n Translations
// ---
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { EmailSubscribe, Newsletter, Posts, Reviews, Tags } from './collections';
import { Screen } from './collections/(mobile)/Screen';
import { Notifications } from './collections/Notifications';
import { defaultLexical } from './fields/defaultLexical';
import { Rate } from './globals/Rate';
// ---

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
const allCollections = [Users, Media, Categories,Reviews, Newsletter, EmailSubscribe, Pages, Posts,Screen,Notifications,Tags]
const golobalCollections = [Header, Footer,Rate]
const applySearchForCollection = ['categories', 'products',  'posts']
const applySEOForCollection = ['categories', 'products',  'posts', 'pages']

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/(dashboard)/BeforeLogin#BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      // beforeDashboard: ['@/components/(dashboard)/BeforeDashboard#BeforeDashboard'],
    },
    user: Users.slug,
  },
  collections: allCollections,
  sharp,
    // Config i18n for CMS
    // i18n: {
    //   fallbackLanguage: "vi",
    //   supportedLanguages: { en, vi },
    // },
    // Config Localization Content
    localization: {
      locales: ['vi', 'en'],
      defaultLocale: 'vi',
      // fallback: true
    },
  // db: vercelPostgresAdapter({
  //   pool: {
  //     connectionString: configEnv.postgresUrlNonPooling
  //   },
    
  // }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  editor: defaultLexical({
    headingSizes: ['h1','h2', 'h3', 'h4','h5','h6'],
    enableHeading:true,
    enableTextState:true,
    enableLink:true,
    enableTable:true,
    
  }),
  //email: nodemailerAdapter(),
  endpoints: [],
  globals: golobalCollections,
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // sharp,
})
