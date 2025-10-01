import { Media, Product } from "@/payload-types"
import { formatPriceForLocation } from "@/utils/formatPriceForLocation"
import { useLocale } from "next-intl"
import { headers } from "next/headers"
import Link from "next/link"
import CardImage from "./CardImage"


interface CardItemProps {
    product:Product
}


export default async function CardItem(props:CardItemProps){
    const {product} = props
    const locale = useLocale();
    const headersList = await headers();
    const country = headersList.get('x-country') || 'US';
    return(
        <article className="flex flex-col gap-2">
        <Link href={`/products/${product.slug}`} className="block relative aspect-photo rounded-lg overflow-hidden">
          <CardImage image={product.image as Media[]} />
        </Link>
        <header>
          <h3 className="text-base font-medium">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>
        </header>
        <p className="text-sm text-gray-500">{product.color}</p>
        <p className="text-sm font-semibold">{formatPriceForLocation(product.pricing.price,locale,country)}</p>
      </article>
    )
}