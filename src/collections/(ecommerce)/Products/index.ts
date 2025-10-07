import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { groupCategoriesField } from '@/fields/groupCategories'
import { slugField } from '@/fields/slug'
import { uploadCustomField } from '@/fields/upload'
import { variants } from '@/fields/variant'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { statusField } from '@payloadcms/plugin-ecommerce'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', '_status'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    gallery: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true ,localized:true},
    {
      name: "description",
      type: "textarea",
      label: { vi: "Mô tả ngắn", en: "Short Description" },
      localized:true
      
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            // ...defaultCollection.fields,
            {
        
              type:"group",
              label:{vi:"Thông tin sản phẩm chính",en:"Main Product Info"},
              fields:[
                ...variants({isStatus:false,requiredPrice:true,isMain:true,isName:false}),
                
              ]
            },
            {
              name:"gallery",
              type:"upload",
              hasMany:true,
              relationTo:"media",
            }
            // {
            //   type:"group",
            //   label:{vi:"Biến thể",en:"Variants"},
            //   fields:[
            //     {
            //       name:"variantsOption",
            //       type:"relationship",
            //       relationTo:"variantsProduct",
            //       hasMany:true,
            //     }
            //   ]
            // },
            // {
            //   name: 'relatedProducts',
            //   type: 'relationship',
            //   filterOptions: ({ id }) => {
            //     if (id) {
            //       return {
            //         id: {
            //           not_in: [id],
            //         },
            //       }
            //     }
            //     return {
            //       id: {
            //         exists: true,
            //       },
            //     }
            //   },
            //   hasMany: true,
            //   relationTo: 'products',
            // },
          ],
          label: 'Details',
        },
        {
          fields: [
           
            {
              name:"content",
              type:"richText",
              localized:true,
            },
            {
              name: 'sections',
              type: 'blocks',
              blocks: [ Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          label:"Variants and Related",
          fields:[
            {
              name:"variantsOption",
              type:"relationship",
              relationTo:"variantsProduct",
              hasMany:true,
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }
                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ]
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides:{
                localized:false
              }
            }),
            MetaDescriptionField({
              hasGenerateFn: true,
              overrides:{
                localized:false
              }
            }),
            MetaImageField({
              relationTo: 'media',
              overrides:{
                localized:false
              }
            }),

            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    ...slugField('title', {
      slugOverrides: {
        required: true,
      },
    }),
    {
      name: 'sales',
      type: 'number',
      label: { vi: 'Lượt mua', en: 'Sales' },
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },

    },
     statusField({
      overrides:{
        name:"statusProduct",
        options: [
          {
            label:{
              vi:"Còn hàng",
              en:"In Stock"
            },
            value:"in-stock"
          },
          {
            label: {
              vi: 'Hết hàng',
              en: 'Out of Stock',
            },
            value: 'out-of-stock',
          },
          {
            label:{
              vi:"Đặt trước",
              en:"Pre-order"
            },
            value:"pre-order"
          }
        ],
        defaultValue:"in-stock",
        admin:{
          position:"sidebar"
        }
      }
     }),
        {
          name: "taxonomies",
          type: "group",
          label: { vi: "Phân loại", en: "Taxonomies" },
          admin: { position: "sidebar" },
          fields: [
            ...groupCategoriesField(
              {admin:{
              position:"sidebar"
            }}
          ),
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              hasMany: true,
            },
          ],
        }, 
        uploadCustomField({
          name:"thumbnail",
          label:"Thumbnail",
          hasMany:true,
          admin:{
            position:"sidebar"
          },
          required:true,
          minRows:1,
          maxRows:2
        })
  ],
  versions:{
    drafts: {
      autosave:false,
      schedulePublish:true
    },
  }
})
