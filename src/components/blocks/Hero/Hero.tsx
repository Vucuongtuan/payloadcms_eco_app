import { cn } from "@/lib/utils";
import { LayoutDefaultBlock } from "@/types";
import { layoutCtn } from "@/utils/cssVariable";
import { GalleryItem } from "../Media/MediaBlock";
import { CarouselHero } from "./CarouselHero";
import { SingleHero, SingleMedia } from "./SingleHero";


interface HeroProps extends LayoutDefaultBlock {
id:string,
type:"carousel" | "single",
gallery?:GalleryItem[]
single?:SingleMedia
}

export default function Hero(props:HeroProps) {
    const { layout,type, single,gallery } = props;
     console.log({props})
    const renderHero = () =>{
        if(type === "carousel" && gallery){
            return <CarouselHero carousel={gallery}/>
        }
        else if (type === "single" && single){
            console.log({single})
            return <SingleHero single={single}/>
        }
        return null
    }
   return (
    <div className={cn(
        layoutCtn(layout || "container"),
    )}>{renderHero()}</div>
   )
}