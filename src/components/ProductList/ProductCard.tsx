import { Product } from "@/payload-types"
import Link from "next/link"
import MediaCard from "./MediaCard"




export const ProductCard = ({doc}:{doc:Product}) =>{
    // const variant:VariantsProduct[] = [{color,slug,title,titleVn},...doc.variantsOption],

    return (
    <Link href={`/products/${doc.slug}`} className={`flex flex-col gap-2`}>
        <figure className={`flex-1`}>
        <MediaCard key={doc.id} media={doc.thumbnail} className="object-cover"/>
        </figure>
        <div className="w-full h-1/6">
            <h3 className="text-lg font-semibold">{doc.title}</h3>
            <p>{doc.pricing?.price}</p>
            {/* <p>{doc.pricing?.discount}</p> */}
        </div>
    </Link>
    )
}