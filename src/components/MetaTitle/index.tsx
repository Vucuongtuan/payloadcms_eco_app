import { cn } from "@/lib/utils";

interface MetaTitleProps {
  title: string;
  description?: string;
  align?: "center" | "left" | "right";
  tag?: "section" | "header";
}

export default function MetaTitle(props: MetaTitleProps) {
  const { title, description, align, tag = "section" } = props;
  const Comp = tag as React.ElementType;
  return (
    <Comp
      className={cn(
        `w-full  mx-auto px-16 py-20`,
        `max-w-screen-3xl border-b  border-neutral-300`,
        align === "center" && "text-center",
        align === "right" && "text-right",
        align === "left" && "text-left"
      )}
    >
      <h1 className="text-5xl font-bold ">{title}</h1>
      {description && <p>{description}</p>}
    </Comp>
  );
}
