import type { CollectionConfig } from "payload";

import { adminOnly } from "@/access/adminOnly";
import { adminOrPublishedStatus } from "@/access/adminOrPublishedStatus";
import { Carousel } from "@/blocks/(web)/Carousel/config";
import { ColumnMedia } from "@/blocks/(web)/ColumnMedia/config";
import { Content } from "@/blocks/(web)/Content/config";
import { MediaBlock } from "@/blocks/(web)/MediaBlock/config";
import { slugField } from "@/fields/slug";
import { Page } from "@/payload-types";
import {
  deleteEmbeddingFromQdrant,
  saveEmbeddingToQdrant,
} from "@/utilities/embedding";
import { generatePreviewPath } from "@/utilities/generatePreviewPath";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc }) => {
        if (operation === "update" || operation === "create") {
          await saveEmbeddingToQdrant({
            data: data as Page,
            type: "page",
          });
        } else if (operation === "delete" && originalDoc) {
          await deleteEmbeddingFromQdrant(originalDoc.id);
        }
      },
    ],
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "publishedOn",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "sections",
              type: "blocks",
              blocks: [Content, MediaBlock, Carousel, ColumnMedia],
            },
          ],
          label: "Layout",
        },
        // {
        //   name: 'meta',
        //   label: 'SEO',
        //   fields: [
        //     OverviewField({
        //       titlePath: 'meta.title',
        //       descriptionPath: 'meta.description',
        //       imagePath: 'meta.image',
        //     }),
        //     MetaTitleField({
        //       hasGenerateFn: true,
        //     }),
        //     MetaImageField({
        //       relationTo: 'media',
        //     }),

        //     MetaDescriptionField({}),
        //     PreviewField({
        //       // if the `generateUrl` function is configured
        //       hasGenerateFn: true,

        //       // field paths to match the target field for data
        //       titlePath: 'meta.title',
        //       descriptionPath: 'meta.description',
        //     }),
        //   ],
        // },
      ],
    },
    ...slugField(
      "title",
      {
        slugOverrides: {
          required: true,
        },
      },
      false
    ),
    {
      name: "isTopLevel",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],

  versions: {
    drafts: {
      autosave: false,
      schedulePublish: true,
    },
  },
};
