import Carousel from "@/components/ui/carousel"
import { GalleryItem } from "../Media/MediaBlock"

export interface CarouselHeroProps  {
    carousel:GalleryItem[]
}

export const CarouselHero =(props:CarouselHeroProps) =>{
    const {carousel} = props
    console.log({carousel})
    return (
<>
        <Carousel gallery={carousel}/>
</>
)
}