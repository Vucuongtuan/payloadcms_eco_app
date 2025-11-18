import { cn } from "@/lib/utils";
import { ListProductsBlock } from "@/payload-types";
import { layoutCtn } from "@/utilities/cssVariable";

export const ListProductsComp = (props: ListProductsBlock) => {
  const { title, description, type, products, categories, hashTag, configs } =
    props;
  return (
    <div className={cn(layoutCtn(configs?.layout || "container"))}>
      <header className={cn()}>
        <h2
          className={cn(
            // configs?.layout !== "full" || configs?.layout !== "wide"
            //   ? "text-left"
            //   : "text-center",
            "py-4 text-2xl"
          )}
        >
          {title}
        </h2>
        <p>{description}</p>
      </header>
    </div>
  );
};
