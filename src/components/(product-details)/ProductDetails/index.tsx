import { Product } from "@/payload-types";
import { Lang } from "@/types";
import { ProductDetailsClient } from "./ProductDetailsClient";

interface ProductDetailsProps {
  doc: Product;
  lang: Lang;
}

export default function ProductDetails(props: ProductDetailsProps) {
  return <ProductDetailsClient doc={props.doc} lang={props.lang} />;
}
