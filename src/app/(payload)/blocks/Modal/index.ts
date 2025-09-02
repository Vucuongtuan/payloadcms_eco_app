import { Block } from "payload";




export const ModalBlock:Block = {
  slug: 'modal',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized:true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      localized:true,
    },
   
  ],
}