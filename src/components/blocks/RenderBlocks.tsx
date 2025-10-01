import React, { Fragment } from "react";

import { cn } from "@/lib/utils";
import { Page } from "@/payload-types";
import { spacing } from "@/utils/cssVariable";
import { CategoryShowcase } from "./CategoryShowcase";


const blockComponents = {
  // modalBlock: ModalBlock,
  // mediaBlock: MediaBlock,
  // faq:FAQ,
  // heroBlock:Hero
  categoryShowcase:CategoryShowcase
};

export const RenderBlocks: React.FC<{
  blocks: Page["blocks"];
}> = (props) => {
  const { blocks } = props;
  
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, idx) => {
          const { blockType } = block;
          
          if (blockType && blockType in blockComponents) {
            const Block =
              blockComponents[blockType as keyof typeof blockComponents];
            if (Block) {
              return (
                <section className={cn(
                  idx !== 0 && `${spacing(block.spacing || 'none')}`,
                  idx === 0 && 'mt-17'
                  )} key={idx}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </section>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
