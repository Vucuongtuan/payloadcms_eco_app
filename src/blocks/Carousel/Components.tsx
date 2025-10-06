"use client"

import { Media } from "@/components/Media"
import { cn } from "@/lib/utils"
import type { Carousel as CarouselBlockProps } from "@/payload-types"
import { aspectConfig, layoutCtn } from "@/utilities/cssVariable"
import { AnimatePresence, motion } from "framer-motion"
import { memo, useCallback, useEffect, useState } from "react"

const CarouselBlock = ({
  gallery,
  layout,
  aspect,
  duration = 5,
}: CarouselBlockProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Nếu không có gallery thì return null sớm
  if (!gallery?.length) return null

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length)
  }, [gallery.length])

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length)
  }, [gallery.length])

  useEffect(() => {
    const interval = setInterval(handleNextSlide, duration * 1000)
    return () => clearInterval(interval)
  }, [handleNextSlide, duration])

  return (
    <div
      className={cn(
        'relative',
        layoutCtn(layout || "container"),
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`${aspect && aspectConfig(aspect)}`}
        >
          <Media resource={gallery[currentSlide].media} fClassName={
             cn(
              "relative w-full h-full",
            )
          } imgClassName="w-full h-full object-cover"/>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-12 right-12 transform -translate-x-1/2 flex justify-center items-center space-x-2">
        {gallery.map((_, index) => (
          <div
           key={index}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "px-4 bg-[--color-primary]" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

const CarouselBlockMemo = memo(CarouselBlock)
CarouselBlockMemo.displayName = "CarouselBlock"

export { CarouselBlockMemo as CarouselBlock }
