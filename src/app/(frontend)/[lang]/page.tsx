import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import type { Page as PageType } from "@/payload-types";
import { query } from "@/lib/tryCatch";
import { PaginatedDocs } from "payload";
// Find home page
// const findPage = (slug: string) =>
//   unstable_cache(
//     async () => {
//       const [result, err] = await query(async (payload) => {
//         const res: PaginatedDocs<PageType> = await payload.find({
//           collection: "pages",
//           where: { slug: { equals: slug } },
//           limit: 1,
//         });
//         return res.docs[0] || null;
//       });
//       if (err) throw err;
//       return result;
//     },
//     [`page_${slug}`],
//     {
//       tags: [`page_${slug}`],
//       revalidate: 3600,
//     },
//   )();

const findPage = async (slug: string) => {
  const [result, err] = await query(async (payload) => {
    const res: PaginatedDocs<PageType> = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return res.docs[0] || null;
  });
  if (err) throw err;
  return result;
};

export default async function Page() {
  const page: PageType = await findPage("home");
  //   console.log(page);
  if (!page) return <div>Page not found</div>;
  return (
    <>
      <RenderBlocks blocks={page.blocks} />
    </>
  );
}

// Find all page for generateStatic side

const findAllPages = async () => {
<<<<<<< HEAD
  const [result, err] = await query(async (payload) => {
    const res = await payload.find({
      collection: "pages",
      limit: 100,
    });
    return res.docs;
  });
  if (err) throw err;
  return result;
};
=======
    const [result, err] = await query(async (payload) => {
        const res = await payload.find({
            collection: "pages",
            limit: 100,
        });
        return res.docs;
    });
    if (err) throw err;
    return result;
};
>>>>>>> 4544019ae85173e44fdbc8897c62b598e02bf364
