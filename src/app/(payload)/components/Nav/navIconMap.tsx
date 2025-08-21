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
  categories: List,
  subcategories: ListCheck,
  media: Image,
  users: User,
  products: PackageSearch,
  search: Search,
  "payload-folders": Folder,
  tags: Hash,
  // customers: User,
  // posts: LayoutGrid,
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug)
    ? navIconMap[slug as CollectionSlug | GlobalSlug]
    : undefined;
