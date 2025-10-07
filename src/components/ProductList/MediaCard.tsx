"use client"

import { cn } from "@/lib/utils"
import { Product } from "@/payload-types"
import { useState } from "react"
import { Image } from "../Media/Image"




export default function MediaCard({media,className}: {media: Product['thumbnail'],className?:string}) {
    const [isHover,setIsHover] = useState<boolean>(false)
    return (
        <Image resource={media[isHover ? 1 : 0]} 
            imgClassName={
                cn("w-full h-full object-cover",className)
            }
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        />
    )
}