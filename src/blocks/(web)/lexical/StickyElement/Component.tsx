import { RichText } from "@/components/RichText";
import { cn } from "@/lib/utils";
import { Media as MediaType, StickyElementBlockProps } from "@/payload-types";
import { getMediaURL } from "@/utilities/getMediaUrl";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Image from "next/image";

export const StickyElementComp = ({
  first,
  stickyCol,
  content,
  image,
}: StickyElementBlockProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full h-auto">
      {first === "text" ? (
        <>
          <ContentCol
            content={content as any}
            isSticky={stickyCol === "text"}
          />
          <MediaCol
            images={image as MediaType[]}
            isSticky={stickyCol === "media"}
          />
        </>
      ) : (
        <>
          <MediaCol
            images={image as MediaType[]}
            isSticky={stickyCol === "media"}
          />
          <ContentCol
            content={content as any}
            isSticky={stickyCol === "text"}
          />
        </>
      )}
    </div>
  );
};

const ContentCol = ({
  content,
  isSticky,
}: {
  content: SerializedEditorState;
  isSticky: boolean;
}) => {
  return (
    <div className={cn(isSticky && "md:sticky h-fit md:top-22")}>
      <RichText data={content} />
    </div>
  );
};

const MediaCol = ({
  images,
  isSticky,
}: {
  images: MediaType[];
  isSticky: boolean;
}) => {
  return (
    <div className={cn(isSticky && "md:sticky h-fit md:top-22 ")}>
      {images.map((i) => (
        <figure key={i.id} className="w-full h-auto">
          <Image
            key={i.id}
            src={getMediaURL(i, "large")}
            alt={i.alt ?? ""}
            width={i.width as number}
            height={i.height as number}
          />
          {i.caption && (
            <figcaption className="text-sm text-center mt-2">
              {i.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};
