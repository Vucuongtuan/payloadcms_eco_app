import { Media } from "@/components/Media";
import { Product, VariantsProduct } from "@/payload-types";

interface ProductGalleryProps {
  gallery?: (number | Media)[] | null;
}

export function ProductGallery({ gallery }: ProductGalleryProps) {
  return (
    <aside className="w-3/5">
      <div className="w-full h-auto relative grid grid-col-2">
        {gallery &&
          gallery.map((m, index) => (
            <Media
              key={index}
              resource={m}
              fill
              className="aspect-figcard w-full h-full"
            />
          ))}
      </div>
    </aside>
  );
}
