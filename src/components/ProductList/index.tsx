import { Product } from "@/payload-types"
import { ResponseDocs } from "@/types"
import { ProductCard } from "./ProductCard"
import Skeleton from "./Skeleton"


interface ProductListProps {
    data: ResponseDocs<Product>
    isLoading?: boolean
}

export default function ProductList(props: ProductListProps) {
    const { docs } = props.data
    const { isLoading = false } = props
    
    return (
        <section className="w-full h-auto py-12">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {isLoading ? (
                    <Skeleton 
                        numberItems={8} 
                        className="rounded-lg" 
                        options={{
                            isImage: {
                                height: 'h-[200px] lg:h-[300px]',
                                width: 'w-full'
                            },
                            isTitle: {
                                height: 'h-[20px]',
                                width: 'w-full'
                            },
                            isDescription: {
                                height: 'h-[16px]',
                                width: 'w-[60%]'
                            },
                            gap: "gap-2"
                        }} 
                    />
                ) : (
                    docs.map(doc => (
                        <li key={doc.id}>
                        <ProductCard doc={doc} />
                        </li>
                    ))
                )}
            </ul>
        </section>
    )
}