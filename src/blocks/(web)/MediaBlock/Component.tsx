import type { MediaBlock as MediaBlockProps } from "@/payload-types";
import { cn } from "@/utilities/cn";
import React from "react";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import { layoutCtn } from "@/utilities/cssVariable";

export const MediaBlock: React.FC<MediaBlockProps> = ({
  media,
  layout,
  template,
  columns,
  cta,
  aspect,
  background,
}) => {
  const baseClasses = layoutCtn(layout || "container");
  const aspectClasses = aspect && aspect !== "auto" && `aspect-${aspect}`;

  // Template: image-only
  if (template === "image-only") {
    return (
      <div className={cn(baseClasses, "aspect-wide")}>
        <Media
          imgClassName="w-full object-cover"
          fClassName={`relative ${aspectClasses}`}
          fill
          resource={media}
        />
      </div>
    );
  }

  // Template: column layout
  if (template === "column") {
    return (
      <div
        className={cn(
          baseClasses,
          "grid grid-cols-1 lg:grid-cols-2 gap-6",
          aspectClasses
        )}
        style={{ backgroundColor: `${background}` }}
      >
        <div className={cn(columns === "image-first" && "lg:order-2")}>
          <Media
            className="h-full w-full"
            imgClassName="border border-border h-full w-full"
            resource={media}
          />
        </div>
        <div
          className={cn(
            columns === "image-first" && "lg:order-1",
            "flex justify-center items-center max-lg:pb-8"
          )}
        >
          <div className="w-full px-12">
            {cta?.content && (
              <RichText
                data={cta.content}
                className="max-w-full p-0 prose-h2:text-gray-500 prose-h2:text-xl prose-p:text-2xl"
              />
            )}
            {cta?.link && cta?.link.label && (
              <CMSLink
                className="bg-transparent border-black border-[1px] px-4 py-4 text-black rounded-sm hover:bg-transparent text-lg"
                {...cta.link}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Template: image-center & image-bottom-left
  if (template === "image-center" || template === "image-bottom-left") {
    return (
      <div className={cn(baseClasses, "relative flex", aspectClasses)}>
        <Media imgClassName="object-cover" fill resource={media} />
        <div
          className={cn("absolute inset-0", {
            "bg-black/40": template === "image-center",
            "bg-gradient-to-t from-black/80 to-transparent":
              template === "image-bottom-left",
          })}
        />
        <div
          className={cn("relative w-full flex flex-col text-white", {
            "items-center justify-center text-center":
              template === "image-center",
            "items-start justify-end text-left":
              template === "image-bottom-left",
          })}
        >
          <div className="max-w-2xl p-8">
            {cta?.content && (
              <RichText
                data={cta.content}
                className="text-white prose-h2:text-white prose-h2:text-xl prose-p:text-2xl p-0"
              />
            )}
            {cta?.link && cta?.link.label && (
              <CMSLink
                className=" bg-transparent border-white border-[1px] px-6 py-3 text-white rounded-sm hover:bg-white hover:text-black transition-colors duration-300 text-lg"
                {...cta.link}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
