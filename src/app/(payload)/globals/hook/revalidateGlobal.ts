import { revalidateTag } from "next/cache";
import { getLogger } from "node_modules/payload/dist/utilities/logger";
import { GlobalAfterChangeHook } from "payload";

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
