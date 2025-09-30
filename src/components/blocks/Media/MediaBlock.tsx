import NImage from "@/components/ui/image";
import { Media } from "@/payload-types";
import { LayoutDefaultBlock, NavItemBase } from "@/types";
import { columnCl, layoutCtn } from "@/utils/cssVariable";
import clsx from "clsx";
import Link from "next/link";

export interface GalleryItem extends NavItemBase {
  caption?: string;
  image: Media;
}

interface MediaBlockProps extends LayoutDefaultBlock {
  gallery: GalleryItem[];
}

export default function MediaBlock(props: MediaBlockProps) {
  const { gallery, layout, column } = props;
  if (!gallery?.length) return null;

  return (
    <div
      className={clsx(
        layoutCtn(layout || "container"),
        columnCl(column || "one-column"),
      )}
    >
      {gallery.map((item, index) => {
        const { checkTypeLink, isblank, title, link, localLink, caption, image } = item;

        let url = "#";
        if (checkTypeLink === "internal") {
          url = localLink?.value?.slug || "#";
        }
        if (checkTypeLink === "external") {
          url = link || "#";
        }

        return (
          <Link
            key={index}
            href={url}
            target={isblank ? "_blank" : "_self"}
            rel={isblank ? "noopener noreferrer" : ""}
            aria-label={title || ""}
            className="relative"
          >
            <NImage
              resource={image}
              alt={image?.alt || ""}
              loading="lazy"
              imgSize="medium"
              pictureClassName="aspect-wide"
              imgClassName="w-full h-auto object-cover"
              quality={75}
              fill
            />
            <div className="absolute h-1/2 w-1/2 justify-end items-end bg-red-400 bottom-0 left-10">
            {caption && <h3 className="text-7xl text-white   mt-2">{caption}</h3>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
