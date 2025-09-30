import RichText from "@/components/richText/RichText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FAQBlock } from "@/types";
import { cva } from "class-variance-authority";


const faqVariants = cva(
    "ctn",
    {
    variants:{
        direction: {
            horizontal: "grid grid-cols-1  lg:grid-cols-2 gap-16",
            vertical: "grid grid-cols-1 ",
        },
        layout: {
            container :"  max-w-screen-2xl w-full mx-auto",
            full :"w-full  mx-auto",
            wide:"max-w-screen-3xl mx-auto",
            narrow:"max-w-screen-xl mx-auto",

        },
    },
    defaultVariants:{
        direction:"horizontal",
        layout:"container"
    },
    }
)

export default function FAQ(props: FAQBlock) {
     console.log(props)
    const { content, faqList ,direction, layout} = props
    return (
        <div className={cn(faqVariants({direction, layout}))}>
            <header>
                {content &&   
                <RichText
                    className={cn(
                    "prose lg:prose-lg mx-auto  ",
                    direction === "vertical" ? "text-center" : "text-left"
                    )}
                    data={content}
                />}
            </header>
            <div>
            <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
            >
                {faqList?.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <RichText
                                className={cn(
                                "prose lg:prose-lg mx-auto",
                                )}
                                data={item.answer}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            
            </Accordion>

            </div>
        </div>
    )
}