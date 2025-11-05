import { adminOnly } from "@/access/adminOnly";
import { adminOnlyFieldAccess } from "@/access/adminOnlyFieldAccess";
import { adminOrCustomerOwner } from "@/access/adminOrCustomerOwner";
import { adminOrPublishedStatus } from "@/access/adminOrPublishedStatus";
import { customerOnlyFieldAccess } from "@/access/customerOnlyFieldAccess";
import { getServerSideURL } from "@/utilities/getURL";
import { ecommercePlugin } from "@payloadcms/plugin-ecommerce";
import { stripeAdapter } from "@payloadcms/plugin-ecommerce/payments/stripe";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import {
  GenerateDescription,
  GenerateTitle,
  GenerateURL,
} from "@payloadcms/plugin-seo/types";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { FieldsOverride } from "node_modules/@payloadcms/plugin-ecommerce/dist/types";
import { Plugin } from "payload";
import { ProductsCollection } from "./collections";
export const defaultMeta = {
  brandName: "Moon co.",
  description: {
    vi: "Moon co. mang đến phong cách thời trang hiện đại cho nam, nữ và trẻ em với nhiều lựa chọn quần áo, giày dép và phụ kiện.",
    en: "Moon co. delivers modern fashion for men, women, and kids with a wide selection of clothing, shoes, and accessories.",
  } as Record<string, string>,
};

const generateTitle: GenerateTitle<any> = ({ doc }) => {
  // const brandTagline: Record<string, string> = {
  //   vi: 'Thời trang nam nữ, trẻ em - Quần áo, Giày dép, Phụ kiện',
  //   en: 'Fashion for Men, Women & Kids - Clothing, Shoes, Accessories'
  // };
  return `${doc.title} | ${defaultMeta.brandName}`;
};

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

const generateDescription: GenerateDescription<any> = ({ doc, locale }) => {
  return doc.subTitle ? doc.subTitle : defaultMeta.description[locale || "vi"];
};

const applySearchForCollection = [
  "categories",
  "products",
  "variants",
  "posts",
  "pages",
];
const applySEOForCollection = ["products", "posts", "pages", "categories"];

// override field for seo plugin disable localized
const overrideSEOFields: FieldsOverride = ({ defaultFields }) => {
  const override = defaultFields.map((field) => {
    if ("name" in field && field.name) {
      return {
        ...field,
        localized: true,
      };
    }
    return field;
  });
  override.splice(3, 0, {
    name: "image",
    type: "upload",
    relationTo: "media",
    label: "SEO Image",
    required: false,
    localized: false,
  });
  return override;
};
export const plugins: Plugin[] = [
  seoPlugin({
    collections: applySEOForCollection,
    generateTitle,
    generateURL,
    generateDescription,
    fields: overrideSEOFields,
    generateImage: ({ doc }) => doc.image,
  }),
  searchPlugin({
    collections: applySearchForCollection,
    defaultPriorities: {
      categories: 10,
      products: 20,
    },
    searchOverrides: {
      // @ts-expect-error
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ((field as { name: string }).name === "doc") {
            return {
              ...field,
              relationTo: applySearchForCollection,
              admin: {
                ...((field as any).admin || {}),
                sortOptions: {
                  categories: "title",
                  products: "title",
                  brands: "title",
                  tags: "title",
                  subCategories: "title",
                },
              },
            };
          }
          return field;
        }),
    },
    beforeSync: ({ doc, searchDoc }: any) => {
      return {
        ...searchDoc,
        title: doc?.title,
      };
    },
    localize: true,
  }),
  // Nesterd Docs
  nestedDocsPlugin({
    collections: ["categories"],
    generateLabel: (_, doc) => doc.title || doc.name || ("" as any),
    generateURL: (docs) => {
      return docs.reduce((url, doc) => `${url}/${doc.slug}`, "");
    },
  }),
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
      slug: "users",
    },
    payments: {
      paymentMethods: [
        stripeAdapter({
          secretKey: process.env.STRIPE_SECRET_KEY!,
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET!,
          webhooks: {
            "payment_intent.succeeded": ({ event, req, stripe }) => {
              console.log("🎉 Payment intent succeeded:", event.id);
              console.log("Event data:", JSON.stringify(event.data, null, 2));
              req.payload.logger.info(`Payment succeeded: ${event.id}`);
            },
            "payment_intent.payment_failed": ({ event, req, stripe }) => {
              console.log("❌ Payment failed:", event.id);
              console.log("Event data:", JSON.stringify(event.data, null, 2));
              req.payload.logger.error(`Payment failed: ${event.id}`);
            },
          },
        }),
      ],
    },
    products: {
      productsCollectionOverride: ProductsCollection,
      variants: {
        variantOptionsCollectionOverride: ({ defaultCollection }) =>
          ({
            ...defaultCollection,
            fields: defaultCollection.fields.map((f) =>
              (f as { name: string }).name === "discount"
                ? { ...f, defaultValue: "none" }
                : f
            ),
          }) as any,
        variantsCollectionOverride: ({ defaultCollection }) => ({
          ...defaultCollection,
          version: {
            draft: {
              autosave: false,
            },
          },
        }),
      },
    },
  }),

  // S3 vercel Blob
  vercelBlobStorage({
    collections: {
      media: {
        disableLocalStorage: true,
        prefix: "uploads",
        generateFileURL: async (args) =>
          args.filename
            ? `${process.env.BASE_URL_BLOB}/${args.prefix}/${args.filename}`
            : "",
      },
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || "",
  }),
];
