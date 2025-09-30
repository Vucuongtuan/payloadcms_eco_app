import type { Media as MediaType } from "@/payload-types";
import { MediaRes } from "@/types";
import { cssVariables } from "@/utils/cssVariable";
import { getMediaURL } from "@/utils/getMediaUrl";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { ElementType, Ref } from "react";

const { breakpoints } = cssVariables;

export interface Props {
  alt?: string;
  className?: string;
  fill?: boolean;
  htmlElement?: ElementType | null;
  pictureClassName?: string;
  imgClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  onMouseover?: () => void;
  onMouseout?: () => void;
  loading?: "lazy" | "eager"; // for NextImage only
  priority?: boolean; // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaRes | string | number | null; // for Payload media
  size?: string; // for NextImage only
  src?: StaticImageData; // for static media
  videoClassName?: string;
  imgSize?: "thumbnail" | "small" | "medium" | "large";
  isPost?: boolean;
  quality?: number;
}

export default function NImage(props: Props) {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    imgSize = "medium",
    isPost = false,
    quality = 75,
    onMouseover,
    onMouseout,
  } = props;
  if (!resource) return null;
  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";

  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource;

    width = fullWidth!;
    height = fullHeight!;
    alt = altFromResource || "";

    src = getMediaURL(resource as string | MediaType, imgSize);
  }

  const loading = loadingFromProps || (!priority ? "lazy" : undefined);
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(", ");
  return (
    <picture className={clsx(pictureClassName, "relative", "block")}>
      <Image
        alt={alt || ""}
        className={clsx(imgClassName)}
        fill={fill}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        placeholder="blur"
        blurDataURL={(resource as MediaRes)?.blurUrl || placeholderBlur}
        priority={priority}
        quality={quality}
        loading={loading}
        sizes={sizes}
        src={src}
        onMouseOver={onMouseover}
        onMouseOut={onMouseout}
      />
      {isPost && <figcaption className="text-center">{alt}</figcaption>}
    </picture>
  );
}
const placeholderBlur =
  "AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAXBtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgABAAAAAAGUAAEAAAAAAAAA6QACAAAAAAJ9AAEAAAAAAAAAGwAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAAAAAIAAGF2MDEAAAAAr2lwcnAAAACKaXBjbwAAAAxhdjFDgSACAAAAABRpc3BlAAAAAAAAAPAAAACGAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAcAAAAAA5waXhpAAAAAAEIAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAdaXBtYQAAAAAAAAACAAEDgQIDAAIEhAIFhgAAABppcmVmAAAAAAAAAA5hdXhsAAIAAQABAAABDG1kYXQSAAoJOB374VhAQ0GkMtkBEgABBBBBQMAt3iYKEnTul2dfwiFSdtMx8U9ZoGIQIqxiVVw08yDOWM6YwDTapoITrrXYmpiaFp23G4/jw33Tyt7a1AFAP/qOInf701wVOceVBNsHxEJsYZEaVz4B+vwWG73QSISRIbPIlLH3xzbEIG7MWldI3sq8N8JSjcaGFaIEtIAjCMfEBcIZiiTFJdMZo5wuz8E5KfefD2Z9HE07KJEn+Gg4pxhMdD4nbL+quLOw+2ZsmuqVn8A4l95NAbtvcjAjKTZUzKfD3CkWcO4ThV6y66gegmoZwBIACgYYHfvhWFQyDxIAAABQAphWRmCoUnEEBQ==";
