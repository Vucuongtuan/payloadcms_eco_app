// import { MobileNav } from "@/components/layout/Header/MobileNav";
import { RenderBlocks } from "@/blocks/RenderBlocks";
import { Page } from "@/payload-types";
import { findPageDoc } from "@/service/pages";
import { findLatestPostByLang } from "@/service/posts";
import { Lang } from "@/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    lang: Lang;
    slug: string;
  }>;
}

export default async function PageTemplate({ params }: PageProps) {
  const { lang, slug = "" } = await params;
  const doc = await findPageDoc(lang, slug);

  if (!doc) {
    return notFound();
  }
  return (
    <>
      <RenderBlocks blocks={(doc as Page).layout} />
    </>
  );
}

export async function generateStaticParams() {
  const [vi, en] = await Promise.all([
    findLatestPostByLang("vi"),
    findLatestPostByLang("en"),
  ]);
  if (vi instanceof Error || en instanceof Error) {
    return [];
  }

  const langVi = vi.map((item) => ({ lang: "vi", slug: item.slug }));
  const langEn = en.map((item) => ({ lang: "en", slug: item.slug }));

  return [...langVi, ...langEn];
}
