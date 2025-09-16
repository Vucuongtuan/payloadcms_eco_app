import { revalidateTag } from "next/cache";
import { getLogger } from "node_modules/payload/dist/utilities/logger";
import { GlobalAfterChangeHook } from "payload";

<<<<<<< HEAD
export const revalidateGlobal: GlobalAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  const locale = new URL((req as { url: string }).url).searchParams.get(
    "locale",
  );
  console.log("==============================================");
  getLogger("revalidateGlobal").info("Revalidating menu global...");
  console.log("==============================================");
  revalidateTag("announcement-" + locale);
};
=======
export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, previousDoc, req }) => {

    const slug = (req as { url: string }).url.split('/globals/')[1]?.split('?')[0];
    // revalidate Menu

    if (slug === 'menu') {

        console.log("==============================================");
        getLogger('revalidateGlobal').info('Revalidating menu global...');
        console.log("==============================================");
        revalidateTag('menu')

    }
}
>>>>>>> 4544019ae85173e44fdbc8897c62b598e02bf364
