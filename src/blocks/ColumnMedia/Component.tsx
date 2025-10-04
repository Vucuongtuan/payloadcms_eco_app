import { Media } from "@/components/Media"
import { cn } from "@/lib/utils"
import { Media as MediaType } from "@/payload-types"
import { aspectConfig, layoutCtn } from "@/utilities/cssVariable"
import { getLinkProps } from "@/utilities/getLinkAndTitle"
import Link from "next/link"





export const ColumnMedia = ({
layout,items,columns,aspect
}:any) => {
    

    const gridColumns = () => {
        let gridClass = ''
        switch (columns) {
            case 1:
                gridClass = 'grid-cols-1'
                break;
            case 2:
                gridClass = 'grid-cols-2'
                break;
            case 3:
                gridClass = 'grid-cols-2 lg:grid-cols-3'
                break;
            case 4:
                gridClass = 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                break;
            default:
                gridClass = 'grid-cols-2'
        }
        return `grid ${gridClass}`
    }
    if(!items) return null


return (
    <div className={cn(
        layoutCtn(layout || 'container'),
        gridColumns(),
    )}>
        {items.map((item:{media:MediaType,link:any},idx:number)=>(
           <div
           key={idx}
           className={cn(
             `size-full relative`,
             aspectConfig(aspect)
           )}
         >
           <Media
             resource={item.media}
             imgClassName="w-full object-cover"
             fClassName="relative"
             fill
           />
         
         {item.link && (() => {
  const linkProps = getLinkProps(item.link)
  if (!linkProps) return null
  return (
    <Link
      href={linkProps.href}
      {...linkProps.newTabProps}
      className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 via-black/50 to-transparent" />
      <div className="relative z-10 p-4 text-white">
        {item.link.label}
      </div>
    </Link>
  )
})()}

         </div>
         
        ))}
    </div>
)
}