import { Product } from "@/payload-types";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Image } from "../Media/Image";

const ProductImage = memo(function ProductImage({ doc }: { doc: Product }) {
  const [isHover, setIsHover] = useState(false);
  
  const firstGalleryItem = doc.gallery?.[0];
  const firstImage = firstGalleryItem?.image?.[0];
  const secondImage = firstGalleryItem?.image?.[1];

  return (
    <figure
      className="relative h-full w-full aspect-figcard overflow-hidden"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        resource={firstImage}
        fill
        imgSize="medium"
        imgClassName="object-cover"
      />

      {secondImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            resource={secondImage}
            fill
            imgSize="medium"
            imgClassName="object-cover"
          />
        </motion.div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </figure>
  );
});

export default ProductImage;
