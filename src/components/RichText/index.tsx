import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'


import type {
  MediaBlock as MediaBlockProps
} from '@/payload-types'
import { cn } from '@/utilities/cn'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode< MediaBlockProps >

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        {...node.fields}
      />
    ),
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText: React.FC<Props> = (props) => {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md lg:prose-lg dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
