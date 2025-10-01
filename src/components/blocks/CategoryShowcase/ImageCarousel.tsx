"use client";

import { Media } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { useEffect, useState } from "react";
import NImage from "../../ui/image";

interface ImageCarouselProps {
  images: Media[];
}

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [page, setPage] = useState(0);

  const imageIndex = wrap(0, images.length, page);

  useEffect(() => {
    const autoplay = setInterval(() => {
      setPage((prevPage:number) => prevPage + 1);
    }, 10000);
    return () => clearInterval(autoplay);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={page}
          className="w-full h-full absolute"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.5 },
          }}
        >
          <NImage
            resource={images[imageIndex]}
            fill
            imgClassName="object-cover"
            pictureClassName="size-full"
            imgSize="large"
            alt={images[imageIndex]?.alt || ""}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
