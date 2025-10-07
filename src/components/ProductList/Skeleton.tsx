import { cn } from "@/lib/utils";

interface SkeletonItemSize {
  height: string;
  width?: string;
  line?: number;
}

interface SkeletonProps {
  numberItems?: number;
  options?: {
    isImage?: SkeletonItemSize;
    isTitle?: SkeletonItemSize;
    isDescription?: SkeletonItemSize;
    gap?: string;
  };
  className?:string
}

export default function Skeleton({
  numberItems = 10,
  options = {},
  className=""
}: SkeletonProps) {
  const gap = options.gap ?? "6px";

  const renderSkeletonBlock = (item?: SkeletonItemSize) => {
    if (!item) return null;
    return (
      <div
        className={cn("animate-pulse bg-gray-200" , className,
          item.width && item.width,
          item.height && item.height
        )}
      />
    );
  };

  return Array.from({ length: numberItems }).map((_, index) => (
    <div
      key={`skeleton_card_${index}`}
      className={
        cn("w-full h-full flex flex-col", gap)
      }
    >
      {renderSkeletonBlock(options.isImage)}
      {renderSkeletonBlock(options.isTitle)}
      {renderSkeletonBlock(options.isDescription)}
    </div>
  ));
}
