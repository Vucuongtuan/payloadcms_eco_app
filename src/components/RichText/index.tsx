import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";

import { Media } from "@/payload-types";
import { cn } from "@/utilities/cn";
import { color } from "./colorState";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => {
  return {
    ...defaultConverters,
    blocks: {},
    upload: ({ node, ...props }) => {
      const defaultElement = defaultConverters.upload;

      const element =
        typeof defaultElement === "function"
          ? defaultElement({ node, ...props })
          : defaultElement;

      const media = node.value as Media;
      const caption = media?.caption;

      return (
        <figure>
          {element}
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    },
    text: ({ node, ...props }) => {
      const defaultText = defaultConverters.text;
      const element =
        typeof defaultText === "function"
          ? defaultText({ node, ...props })
          : defaultText;
      if (!node.$ || !node.$.color) return element;
      const textState = (node.$ as { color: string }).color;
      const type = textState.includes("bg-") ? "background" : "text";
      return (
        <span
          style={(color as Record<string, any>)[type][textState]?.css}
          {...props}
        >
          {node.text}
        </span>
      );
    },
  };
};

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText: React.FC<Props> = (props) => {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;

  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          "container ": enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md lg:prose-lg dark:prose-invert ":
            enableProse,
        },
        className
      )}
      {...rest}
    />
  );
};
