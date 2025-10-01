import { cn } from "@/lib/utils";
import { Category, Media, Product } from "@/payload-types";
import { findCategoryShowcase } from "@/service/blocks";
import { LayoutDefaultBlock } from "@/types";
import { layoutCtn } from "@/utils/cssVariable";
import NImage from "../../ui/image";
import CardItem from "./CardItem";
import { ImageCarousel } from "./ImageCarousel";

interface CategoryShowcaseProps extends LayoutDefaultBlock {
  category:Category;
  image?: Media[];
  id:string
}

export default  async function CategoryShowcase(props: CategoryShowcaseProps) {
  const { category, image, layout,id } = props;
  const products = await findCategoryShowcase(id,category.id) 
  if(!products || products.length === 0) return null
  console.log({products})
  const hasImages = image && image.length > 0;
  const isCarousel = hasImages && image.length > 1;
   
  return (
    <div className={cn(layoutCtn(layout || "container"), "aspect-wide")}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 h-full items-center">
        <div className="size-full relative">
          {hasImages &&
            (isCarousel ? (
              <ImageCarousel images={image} />
            ) : (
              <div className="w-full h-full relative rounded-lg overflow-hidden">
                <NImage
                  resource={image[0]}
                  fill
                  imgClassName="object-cover"
                  alt={image[0]?.alt || category.title}
                />
              </div>
            ))}
        </div>
        <aside className="size-full p-8 lg:p-16">
      <ul className="grid grid-cols-2 gap-6">
        {products &&
          products.map((product: Product) => (
            <li key={product.id}>
              <CardItem product={product} />
            </li>
          ))}
      </ul>
    </aside>
      </div>
    </div>
  );
}