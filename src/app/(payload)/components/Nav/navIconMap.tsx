import {
  BookCopy,
  Folder,
  Hash,
  Image,
  LayoutGrid,
  List,
  LucideProps,
  Menu,
  PackageSearch,
  Search,
  Smile,
  StickyNote,
  TabletSmartphone,
  User
} from "lucide-react";
import { CollectionSlug, GlobalSlug } from "payload";
import { ExoticComponent } from "react";

export const navIconMap: Partial<
  Record<CollectionSlug | GlobalSlug, ExoticComponent<LucideProps>>
> = {
  users: User,
  media: Image,
  categories: List,
  products: PackageSearch,
  tags: Hash,
  orders: TabletSmartphone,
  reviews: Smile,
  newsletter: StickyNote,
  "email-subscribe": Menu,
  pages: LayoutGrid,
  posts: BookCopy,
  "payload-folders": Folder,
  search: Search,
};

export const getNavIcon = (slug: string) =>
  Object.hasOwn(navIconMap, slug)
    ? navIconMap[slug as CollectionSlug | GlobalSlug]
    : undefined;
