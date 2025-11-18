import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import { cn } from "@/lib/utils";
import { RowBlock as RowBlockType } from "@/payload-types";
import { layoutCtn, spacing } from "@/utilities/cssVariable";
import { colsSpanClasses } from "../Content/Component";

export const RowBlock = ({ row, layout }: RowBlockType) => {
  const layoutClass = layoutCtn(layout || "container");

  return (
    <div className={cn(layoutClass)}>
      {row?.map((r) => (
        <div
          key={r.id}
          className={cn(
            layoutCtn(r.layout || "container"),
            spacing(r.spacing || "none", "gap")
          )}
        >
          <ColumnItem data={r.columns || []} />
        </div>
      ))}
    </div>
  );
};
const ColumnItem = ({ data }: { data: any[] }) => {
  if (!data) return null;

  return (
    <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
      {data.map((c: any, idx: number) => {
        const { type, richText, size, media } = c;
        const colsClass = `col-span-4 ${colsSpanClasses[(size ?? "full") as keyof typeof colsSpanClasses]}`;
        return (
          <div
            className={cn(
              colsClass,
              {
                "md:col-span-2": size !== "full",
              },
              "p-8"
            )}
            key={c?.id || idx}
          >
            {type === "content"
              ? richText && (
                  <RichText
                    data={richText}
                    enableGutter={false}
                    // enableProse={false}
                    // className="prose md:prose-lg lg:prose-lg"
                  />
                )
              : media && (
                  <Media
                    fill
                    imgSize="medium"
                    fClassName="relative w-full h-full aspect-wide"
                    imgClassName="w-full object-containt"
                    resource={media}
                  />
                )}
          </div>
        );
      })}
    </div>
  );
};
