import ProductList from "@/components/ProductList"
import { findCategoryBySlug, findListProductByCategory } from "@/service/pages"
import { Lang } from "@/types"


export default async function PageCollection({
    params
}: {
    params: Promise<{
        lang: string,
        slug: string
    }  > 
}){
    const {lang,slug} = await params
    const [category,products] = await Promise.all([
        findCategoryBySlug({lang:lang as Lang,slug}),
        findListProductByCategory({lang:lang as Lang,slug})
    ])
    
    return (<>
    {/* <MetaTitle title={category.title} description={category.description || ''}/> */}
    {/* <ListProduct data={products}/> */}
    <ProductList data={products}  />
    </>)
}