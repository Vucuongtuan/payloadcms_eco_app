"use client"

import NImage from "@/components/ui/image"
import { Media } from "@/payload-types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"



export default function ImageProduct(props: {image:Media[] }) {
    const {image} = props
    const [isHover,setIsHover] = useState<boolean>(false) 
    const imageActive = isHover ?  image[1] : image[0]

    return (
        <AnimatePresence>
            <motion.div
                key={imageActive?.id || imageActive?.url}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="size-full"
            >
                <NImage 
                    resource={imageActive as Media} 
                    fill 
                    alt={imageActive?.alt || ""}
                    imgSize="large"
                    pictureClassName="size-full"
                    imgClassName="object-contain size-full"
                    onMouseover={() => setIsHover(true)}
                    onMouseout={() => setIsHover(false)}
                />
            </motion.div>
        </AnimatePresence>
    )
}