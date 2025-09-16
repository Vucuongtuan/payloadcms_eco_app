import { Menu } from "@/payload-types";
import { query } from "@/utils/tryCatch";
import { unstable_cache } from "next/cache";





interface LayoutType {
    type: 'header' | 'footer'
    lang: 'vi' | 'en'
}
export const findMenuByLang = async (lang: LayoutType['lang']) => {
    return unstable_cache(
        async (): Promise<Menu | null> => {
            const [result, err] = await query((payload) =>
                payload.findGlobal({ slug: 'menu', locale: lang })
            );
            if (err) throw err;
            return result as Menu;
        },
        [`menu`],
        { tags: [`menu`] }
    )();
};
