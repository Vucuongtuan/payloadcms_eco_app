import { Product } from "@/payload-types";
import { Lang } from "@/types";
import { CarouselList } from "./Carousel";

interface CarouselListProductProps {
  items: Product[];
  title?: string;
  subtitle?: string;
  lang: Lang;
}
export async function CarouselListProduct(props: CarouselListProductProps) {
  "use memo";
  const { items, title, subtitle, lang } = props;
  console.log(items[0].gallery);
  return (
    <section>
      <CarouselList
        products={[...items, ...items, ...items, ...items]}
        title={title}
        subtitle={subtitle}
        lang={lang}
      />
    </section>
  );
}
