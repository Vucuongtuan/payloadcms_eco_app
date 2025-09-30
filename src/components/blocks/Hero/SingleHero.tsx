import NImage from "@/components/ui/image"
import { Media } from "@/payload-types"
import { NavItemBase } from "@/types"


export interface SingleMedia extends NavItemBase {
    image:Media,
    caption:string,
    aspect:string
}

interface SingleHeroProps {
   single: SingleMedia   
}
export const SingleHero =(props:SingleHeroProps) =>{
    const {single} = props
    console.log({single})
    return <div className="relative">
      <NImage
        resource={single.image}
        alt={single.image?.alt || ""}
        loading="lazy"
        imgSize="medium"
        pictureClassName="aspect-wide"
        imgClassName="w-full h-auto object-cover"
        fill
        />
    </div>
}