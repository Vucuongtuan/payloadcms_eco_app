import { Block } from "payload";
import { galleryField } from "../../fields/gallery";





export const Hero:Block={
    slug:"hero",
    interfaceName:"Hero",
    fields:[
      galleryField(true),
    ]
}