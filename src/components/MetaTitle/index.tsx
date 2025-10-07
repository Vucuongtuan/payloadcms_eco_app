import { cn } from "@/lib/utils"



interface MetaTitleProps {
    title:string,
    description:string,
    align?:'center' | 'left' | 'right'
}

export default function MetaTitle(props:MetaTitleProps){
    const {title,description,align} = props
    return (
        <section className={cn(
            `w-full max-w-screen-3xl mx-auto px-16 py-20`,
            `max-w-screen-3xl border-b `,
            align === 'center' && 'text-center' ,
            align === 'right' && 'text-right' ,
            align === 'left' && 'text-left'
        )}>
            <h1 className="text-5xl font-bold ">{title}</h1>
            {description && <p>{description}</p>}
        </section>
    )
}