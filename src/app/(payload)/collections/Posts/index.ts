import { CollectionConfig } from "payload";
import { slugField } from "../../fields/slug";
import { uploadCustomField } from "../../fields/upload";




export const Posts: CollectionConfig = {
    slug: 'posts',
    labels: {
        singular: {
            vi: 'Bài đăng',
            en: 'Post'
        },
        plural: {
            vi: 'Bài đăng',
            en: 'Posts'
        }
    },
    admin: {
        useAsTitle: "title",
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: 'Title'
        },
        ...slugField(),
        {
            name: 'content',
            type: 'richText',
            label: 'Content'
        },
        uploadCustomField({
            name: "image",
            label: { vi: "Ảnh đại diện", en: "Featured Image" },
            required: true,
        }),
        {
            type: "relationship",
            relationTo: ["products"],
            label: {
                vi: "Sản phẩm",
                en: "Product"
            },
            hasMany: true,
            name: "linkedProducts"
        }
    ]
    ,
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    }

}