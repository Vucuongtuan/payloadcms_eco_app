import { Block } from "payload";
import { CategoryShowcase, FAQ, HeroBlock, MediaBlock, RichTextBlock } from "../blocks";




export const CategoryBlock:Block[] = [MediaBlock,RichTextBlock]

export const PageBlock:Block[] = [CategoryShowcase,HeroBlock,MediaBlock,RichTextBlock,FAQ]