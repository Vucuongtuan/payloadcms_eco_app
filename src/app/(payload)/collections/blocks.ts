import { Block } from "payload";
import { FAQ, HeroBlock, MediaBlock, RichTextBlock, SingleProductBlock } from "../blocks";




export const CategoryBlock:Block[] = [MediaBlock,RichTextBlock]

export const PageBlock:Block[] = [SingleProductBlock,HeroBlock,MediaBlock,RichTextBlock,FAQ]