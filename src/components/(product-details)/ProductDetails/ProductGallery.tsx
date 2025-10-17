import { Media } from "@/components/Media";
import { Product } from "@/payload-types";

interface ProductGalleryProps {
  currentData: any;
}

export function ProductGallery({ currentData }: ProductGalleryProps) {
  return (
    <aside className="w-3/5">
      <div className="w-full h-auto relative grid grid-cols-2 gap-[2px]">
        {(Array.isArray(currentData.gallery?.[0]?.image)
          ? currentData.gallery[0].image
          : currentData.gallery
        )?.map((m, index) => (
          <Media
            key={index}
            resource={m}
            fill
            className="aspect-figStyle w-full h-full relative"
            imgClassName="object-cover"
            imgSize={"large"}
          />
        ))}
      </div>
    </aside>
  );
}
