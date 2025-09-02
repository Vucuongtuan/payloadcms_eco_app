import { CollectionSlug, GlobalSlug } from "payload";
import {
  BookCopy,
  Folder,
  Footprints,
  Hash,
  Image,
  LayoutGrid,
  List,
  ListCheck,
  LucideProps,
  Menu,
  PackageSearch,
  Percent,
  Search,
  Smile,
  Star,
  StickyNote,
  TabletSmartphone,
  User,
} from "lucide-react";
import { ExoticComponent } from "react";

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  users: User,
  media: Image,
  categories: List,
  subcategories: ListCheck,
  products: PackageSearch,
  tags: Hash,
  brands: Star,
  orders: TabletSmartphone,
  reviews: Smile,
  "product-variants": Percent,
  newsletter: StickyNote,
  "email-subscribe": Menu,
  pages: LayoutGrid,
  posts: BookCopy,
  "payload-folders": Folder,
  search: Search,
  menu:Menu
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug)
    ? navIconMap[slug as CollectionSlug | GlobalSlug]
    : undefined;
