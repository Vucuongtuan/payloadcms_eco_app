import { cn } from "@/lib/utils"
import { Media, Product } from "@/payload-types"
import { Layout } from "@/types"
import { layoutCtn } from "@/utils/cssVariable"
import ImageProduct from "./ImageProduct"




interface SingleProductProps {
type: "auto" | "manual",
product?:Product,
image?:Media[]
layout?:Layout
}

export const SingleProduct =(props:SingleProductProps) =>{
    const {product,image,type,layout} = props
    const resourceImage = !image || image.length === 0   ?  product?.image : image
    return (
        <div className={cn(
            layoutCtn(layout || 'container'),
            'flex flex-wrap',
            'aspect-wide '
        )}>
            <div className="w-1/2">
            <ImageProduct image={resourceImage as Media[]}/>
            </div>
            <div className="flex-1">
                <h1>{product?.title}</h1>
                <p>{product?.description}</p>
            </div>
        </div>
    )
}