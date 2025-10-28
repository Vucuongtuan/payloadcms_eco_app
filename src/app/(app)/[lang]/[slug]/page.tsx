// import { MobileNav } from "@/components/layout/Header/MobileNav";
import { RenderBlocks } from "@/blocks/(web)/RenderBlocks";
import MetaTitle from "@/components/MetaTitle";
import { Page } from "@/payload-types";
import { findPageDoc } from "@/service/pages";
import { findLatestPostByLang } from "@/service/posts";
import { Lang } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    lang: Lang;
    slug: string;
  }>;
}

export default async function PageTemplate({ params }: PageProps) {
  await cookies();

  const { lang, slug = "" } = await params;
  const isHomepage = slug === "";
  const doc = await findPageDoc(lang, isHomepage ? "home" : slug);

  if (!doc) {
    return notFound();
  }
  return (
    <>
      {!isHomepage && <MetaTitle title={(doc as Page).title} align="center" />}
      <RenderBlocks blocks={(doc as Page).sections} />
    </>
  );
}

export async function generateStaticParams() {
  const [vi, en] = await Promise.all([
    findLatestPostByLang("vi"),
    findLatestPostByLang("en"),
  ]);

  const langVi =
    vi instanceof Error
      ? []
      : vi.map((item) => ({ lang: "vi" as const, slug: item.slug }));
  const langEn =
    en instanceof Error
      ? []
      : en.map((item) => ({ lang: "en" as const, slug: item.slug }));

  const params = [...langVi, ...langEn];

  // Ensure at least one result for Cache Components
  return params.length > 0 ? params : [{ lang: "en" as const, slug: "home" }];
}
