"use client";

import { Media } from "@/components/Media";
import { Button } from "@/components/ui/button";
import type { Media as MediaType, Product } from "@/payload-types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

interface ProductGalleryCarouselProps {
  currentData: Product["gallery"];
}

export function ProductGalleryCarousel({
  currentData,
}: ProductGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!currentData || currentData.length === 0 || !currentData[0].image)
    return null;

  const images: MediaType[] = (
    Array.isArray(currentData[0]?.image) ? currentData[0].image : currentData
  ).filter((item): item is MediaType => typeof item !== "number");

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full">
      {/* Main Image */}
      <div className="aspect-insta max-lg:aspect-figcard w-full relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full absolute inset-0"
          >
            <Media
              resource={images[currentIndex]}
              fill
              className="w-full h-full"
              imgClassName="object-cover"
              imgSize="large"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              variant={"blur"}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              onClick={nextImage}
              variant={"blur"}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ArrowRightIcon />
            </Button>
          </>
        )}
      </div>
      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="bg-bg-primary backdrop-blur-xl px-2 py-1 rounded-full absolute bottom-3 right-3 ">
          <span className="rounded-full transition-colors duration-500 ">
            {currentIndex + 1}/{images.length}
          </span>
        </div>
      )}
    </div>
  );
}
