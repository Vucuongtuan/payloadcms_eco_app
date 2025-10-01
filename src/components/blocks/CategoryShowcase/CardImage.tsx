"use client"

import NImage from "@/components/ui/image"
import { Media } from "@/payload-types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"






interface CardImageProps {
    image:Media[]
}
const variants = {
    enter: {
      opacity: 0.8,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0.8,
    },
  };
  
export default function CardImage(props:CardImageProps){
    const {image} = props
    const [isHover,setIsHover] = useState<boolean>(false)
    const idxImage = isHover ? image.length - 1 : 0
    return(
        <div className="relative w-full h-full overflow-hidden"
         onMouseEnter={()=>setIsHover(true)}
         onMouseLeave={()=>setIsHover(false)}
        >
        <AnimatePresence>
          <motion.div
            key={image[idxImage].id}
            className="w-full h-full absolute"
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.3 },
            }}
          >
            <NImage
              resource={image[idxImage]}
              fill
              imgClassName="object-cover"
              pictureClassName="size-full"
              imgSize="large"
              alt={image[idxImage]?.alt || ""}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    )
}