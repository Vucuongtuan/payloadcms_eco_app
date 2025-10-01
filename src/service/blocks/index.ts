import { cacheFunc } from "@/lib/cacheFunc";
import { query } from "@/lib/tryCatch";
import { Product } from "@/payload-types";
import { ResponseDocs } from "@/types";




/*
* Block Service CategoryShowcase
* @param id category
* @returns Product[]
*
*/
type FindCategoryShowcase = (id:string,categoryId:number) => Promise<Product[]> 
export const findCategoryShowcase: FindCategoryShowcase = async (id, categoryId) => {
    return cacheFunc(
        async () => {
            const [result, err] = await query<ResponseDocs<Product>>((payload) => {
                return payload.find({
                    collection: "products",
                    where: {
                    category: {
                        equals: categoryId,
                    },
                    status: "published",
                    },
                    limit: 4,
                })
            })
            if (err) throw err
            return result.docs as Product[]
      }, 
      [`categoryShowcase-${id}`],
      {
        tags: [`categoryShowcase-${id}`],
      },
    )();
}
  
