import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { toKebabCase } from '@/utilities/toKebabCase'
import React, { Fragment } from 'react'

import { cn } from '@/lib/utils'
import { spacing } from '@/utilities/cssVariable'
import type { Page } from '../payload-types'
import { ColumnMedia } from './ColumnMedia/Component'
import { CarouselBlock } from './Carousel/Components'

const blockComponents = {
  content: ContentBlock,
  mediaBlock: MediaBlock,
  columnMedia: ColumnMedia,
  carousel: CarouselBlock,
}
export const RenderBlocks: React.FC<{
  blocks: Page['sections']
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks!.map((block, idx) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]
            if (Block) {
              return (
                <section className={cn(
                  idx !== 0 && `${spacing(block.spacing || 'none')}`,
                  idx === 0 && 'mt-17'
                  )} key={idx} aria-label={blockName || ''}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </section>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
