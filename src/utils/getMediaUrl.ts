import { Media } from "@/payload-types";

type MediaSizeKey = keyof NonNullable<Media["sizes"]>;

const sizePriority: MediaSizeKey[] = ["large", "medium", "small", "thumbnail"];

/**
 *
 * @param media
 * @param size thumbnail: 240px, small: 480px, medium: 960px, large 1920px,
 * @returns Image src, fallback to smaller size if expected size not available.
 */
export function getMediaURL(
  media?: string | Media,
  size?: MediaSizeKey,
): string {
  if (!media) return "/assets/thumbnail.svg";
  if (typeof media === "string") return media;

  if (size && media.sizes) {
    const requestedIndex = sizePriority.indexOf(size);
    if (requestedIndex !== -1) {
      for (let i = requestedIndex; i < sizePriority.length; i++) {
        const key = sizePriority[i];
        const variant = media.sizes[key];
        if (variant?.url) {
          return variant.url;
        }
      }
    }
  }

  return media.url || "/assets/default_og.jpg";
}
