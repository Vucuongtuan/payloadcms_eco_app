"use client"

import { Media } from "@/components/Media"
import { cn } from "@/lib/utils"
import type { Carousel as CarouselBlockProps } from "@/payload-types"
import { aspectConfig, layoutCtn } from "@/utilities/cssVariable"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { memo, useCallback, useEffect, useRef, useState } from "react"

const CarouselBlock = ({
  gallery,
  layout,
  aspect,
  duration = 5,
}: CarouselBlockProps) => {
  const [[currentSlide, direction], setCurrentSlide] = useState([0, 0])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const progress = useMotionValue(0)
  const smoothProgress = useSpring(progress, { stiffness: 50, damping: 20 })

  if (!gallery?.length) return null

  const slideCount = gallery.length

  const paginate = useCallback((newDirection: number) => {
    setCurrentSlide(([prev]) => {
      const next = (prev + newDirection + slideCount) % slideCount
      return [next, newDirection]
    })
    progress.set(0)
  }, [slideCount, progress])

  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(([prev]) => {
      const newDirection = index > prev ? 1 : -1
      return [index, newDirection]
    })
    progress.set(0)
  }, [progress])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    progress.set(0)
    
    if ( slideCount > 1) {
      const startTime = Date.now()
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progressValue = Math.min((elapsed % (duration * 1000)) / (duration * 1000), 1)
        progress.set(progressValue)
        
        if (progressValue >= 0.99) {
          paginate(1)
        }
      }, 16)
    }
  }, [slideCount, duration, paginate, progress])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [resetTimer])

  const handlePrevClick = useCallback(() => {
    paginate(-1)
    resetTimer()
  }, [paginate, resetTimer])

  const handleNextClick = useCallback(() => {
    paginate(1)
    resetTimer()
  }, [paginate, resetTimer])



  return (
    <div className={cn("relative", layoutCtn(layout || "container"))}>
      <div className={cn("relative w-full h-full overflow-hidden", aspectConfig(aspect || 'wide'))}>
        {/* Main Slide */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={cn('absolute inset-0 w-full h-full',
               
              )}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Media
                  resource={gallery[currentSlide].media}
                  className="relative w-full h-full "
                  imgClassName="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute bottom-15 lg:bottom-0 left-0 right-0 p-12 text-white lg:text-left text-center"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-5xl font-bold mb-4"
                  >
                    Slide {currentSlide + 1}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-lg text-white/90 max-w-2xl"
                  >
                    Discover the latest collection with stunning visuals and modern design.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center lg:justify-end px-8">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xs lg:p-2 rounded-full border border-white/20 shadow-2xl">
            <motion.button
              onClick={handlePrevClick}
              className="p-2 rounded-full cursor-pointer"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            <div className="flex items-center gap-2">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className="group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors duration-300 cursor-pointer",
                      currentSlide === index
                        ? "bg-white px-3"
                        : "bg-white/40 group-hover:bg-white/70"
                    )}
                  />
                </button>
              ))}
            </div>

            <motion.button
              onClick={handleNextClick}
              className="p-2 rounded-full cursor-pointer"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Progress Bar */}
        {slideCount > 1  && (
          <motion.div
            className="absolute top-0 left-0 h-1 bg-white z-30 shadow-lg shadow-white/50"
            style={{ 
              width: useTransform(smoothProgress, [0, 1], ["0%", "100%"])
            }}
          />
        )}
      </div>
    </div>
  )
}

const CarouselBlockMemo = memo(CarouselBlock)
CarouselBlockMemo.displayName = "CarouselBlock"

export { CarouselBlockMemo as CarouselBlock }
