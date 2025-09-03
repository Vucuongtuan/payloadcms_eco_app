import ModalBlock from "@/components/blocks/Modal";
import { query } from "@/utils/tryCatch";

const findHomePage = async () => {
  return query(async (payload) => {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    });
    return result.docs[0] || null;
  })
}


export default async function Page({
    params,
}: {
    params: Promise<{
        slug: string;
    }>
}) {
   
  return (
    <>
    <ModalBlock title="モーダル" content="モーダルの内容"/>
    </>
  )
}
