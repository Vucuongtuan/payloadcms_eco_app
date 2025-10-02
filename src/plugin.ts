

import { adminOnly } from '@/access/adminOnly';
import { adminOnlyFieldAccess } from '@/access/adminOnlyFieldAccess';
import { adminOrCustomerOwner } from '@/access/adminOrCustomerOwner';
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus';
import { customerOnlyFieldAccess } from '@/access/customerOnlyFieldAccess';
import { getServerSideURL } from '@/utilities/getURL';
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce';
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { MetaImageField } from '@payloadcms/plugin-seo/fields';
import { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { FieldsOverride } from 'node_modules/@payloadcms/plugin-ecommerce/dist/types';
import { Plugin } from 'payload';
import { ProductsCollection } from './collections';


const generateTitle: GenerateTitle<any> = ({ doc }) => {
    const brandName = 'Moon co.';
    // const brandTagline: Record<string, string> = {
    //   vi: 'Thời trang nam nữ, trẻ em - Quần áo, Giày dép, Phụ kiện',
    //   en: 'Fashion for Men, Women & Kids - Clothing, Shoes, Accessories'
    // };
    return `${doc.title} | ${brandName}`
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}
const generateDescription: GenerateDescription<any> = ({ doc }) => {
  const baseDescription: Record<string, string> = {
    vi: 'Moon co. mang đến phong cách thời trang hiện đại cho nam, nữ và trẻ em với nhiều lựa chọn quần áo, giày dép và phụ kiện.',
    en: 'Moon co. delivers modern fashion for men, women, and kids with a wide selection of clothing, shoes, and accessories.'
  };
  return doc.description ? doc.description : baseDescription[doc?.locale || 'vi']
}


const applySearchForCollection = ['categories', 'products', 'variants', 'posts']
const applySEOForCollection = ['categories', 'products', 'variants', 'posts', 'pages']

const overrideSEOFields: FieldsOverride = ({ defaultFields }) => {
  console.log(defaultFields)
  const override =  defaultFields.map((field) => {
    if ('name' in field && field.name) {
      return {
        ...field,
        localized: false, 
      }
    }
    return field
  })
  return [
    ...override,
    MetaImageField({
      relationTo: 'media',
    }),
  ]
}
export const plugins: Plugin[] = [
  seoPlugin({
    collections: applySEOForCollection,
    generateTitle,
    generateURL,
    generateDescription,
    fields:overrideSEOFields,
    generateImage:({doc}) => doc.image,
  }),
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
      //  nestedDocsPlugin({
      //   collections: ['categories'],
      //   generateLabel: (_, doc) => doc.title || doc.name || '' as any,
      //   generateURL: (docs) =>
      //     docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
      // }),
      // Ecommerce
      ecommercePlugin({
          access: {
            adminOnly,
            adminOnlyFieldAccess,
            adminOrCustomerOwner,
            adminOrPublishedStatus,
            customerOnlyFieldAccess,
          },
          customers: {
            slug: 'users',
          },
        //   payments: {
        //     paymentMethods: [
        //       stripeAdapter({
        //         secretKey: process.env.STRIPE_SECRET_KEY!,
        //         publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        //         webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
        //       }),
        //     ],
        //   },
          products: {
            productsCollectionOverride: ProductsCollection,
          },
        
        }),
  ]