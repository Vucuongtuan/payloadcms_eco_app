
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useState } from "react"
import { GalleryItem } from "../blocks/Media/MediaBlock"
import NImage from "./image"
interface CarouselProps {
 gallery:GalleryItem[]
}
export default function Carousel(props:CarouselProps){
    const {gallery} = props
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % gallery.length);
    };
    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + gallery.length) % gallery.length);
    };
    return (
        <div className="size-full relative">
        <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide} 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}
            className="relative"
            >
                <NImage resource={gallery[currentSlide].image} alt={gallery[currentSlide].image?.alt || ""}  fill 
                imgClassName="object-cover"
                pictureClassName="aspect-wide"
                loading="lazy"
                />
                <div
                className="absolute w-1/2   top-1/2 left-24 z-50 flex items-center ">
                    <motion.h3 
                    initial={{opacity:0 ,y:50}}
                    animate={{opacity:1,y:0}}
                     transition={{duration:0.2}}
                    className="text-6xl  text-white text-left overflow-hidden">{gallery[currentSlide].caption}</motion.h3>
                </div>
            </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-10 right-10 z-50 flex flex-col items-center justify-center gap-2">
            <div className="flex gap-2">
            <button onClick={handlePrevSlide} className="rounded-full p-2 bg-white">
                <ArrowLeftIcon/>
            </button>
            <button onClick={handleNextSlide} className="rounded-full p-2 bg-white">
                <ArrowRightIcon/>
            </button>
            </div>
            <div className="flex h-full mt-4 items-center justify-center gap-2">
                {gallery.map((_, index) => (
                    <motion.button
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setCurrentSlide(index)}
                        className={`block rounded-full bg-white ${index === currentSlide ? 'w-8 h-4' : 'w-4 h-4'}`}
                    >
                    </motion.button>
                ))}
    </div>
        </div>
    </div>
    )
}