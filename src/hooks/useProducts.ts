import { useState, useEffect, useCallback } from 'react'
import { Product, VariantsProduct } from '@/payload-types'

interface UseProductsOptions {
  limit?: number
  includeVariants?: boolean
  groupByTitle?: boolean
}

interface ProductWithVariants extends Product {
  variants?: VariantsProduct[]
  availableColors?: string[]
}

export function useProducts({ 
  limit = 20, 
  includeVariants = false,
  groupByTitle = false 
}: UseProductsOptions = {}) {
  const [products, setProducts] = useState<ProductWithVariants[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(async (pageNum: number, reset = false) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch main products
      const productResponse = await fetch(
        `/api/products?limit=${limit}&page=${pageNum}&select=id,title,description,color,pricing.price,pricing.discount`
      )
      const productData = await productResponse.json()

      let processedProducts = productData.docs

      // Fetch variants if needed
      if (includeVariants) {
        const variantResponse = await fetch(
          `/api/variantsProduct?limit=100&select=id,title,titleVN,color,sizes.s.pricing,sizes.M.pricing,sizes.L.pricing`
        )
        const variantData = await variantResponse.json()

        // Group variants by title
        const variantsByTitle = variantData.docs.reduce((acc: any, variant: VariantsProduct) => {
          const key = variant.title || variant.titleVN
          if (!acc[key]) acc[key] = []
          acc[key].push(variant)
          return acc
        }, {})

        // Merge products with variants
        processedProducts = productData.docs.map((product: Product) => {
          const variants = variantsByTitle[product.title] || []
          const allColors = [product.color, ...variants.map((v: VariantsProduct) => v.color)]
          
          return {
            ...product,
            variants,
            availableColors: [...new Set(allColors.filter(Boolean))]
          }
        })

        // Group by title if requested
        if (groupByTitle) {
          const grouped = processedProducts.reduce((acc: any, product: ProductWithVariants) => {
            const existing = acc.find((p: ProductWithVariants) => p.title === product.title)
            if (existing) {
              existing.availableColors = [...new Set([
                ...(existing.availableColors || []),
                ...(product.availableColors || [])
              ])]
              if (product.variants) {
                existing.variants = [...(existing.variants || []), ...product.variants]
              }
            } else {
              acc.push(product)
            }
            return acc
          }, [])
          processedProducts = grouped
        }
      }

      if (reset) {
        setProducts(processedProducts)
      } else {
        setProducts(prev => [...prev, ...processedProducts])
      }

      setHasMore(productData.docs.length === limit)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải sản phẩm')
    } finally {
      setLoading(false)
    }
  }, [limit, includeVariants, groupByTitle])

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchProducts(nextPage, false)
    }
  }, [page, loading, hasMore, fetchProducts])

  const refresh = useCallback(() => {
    setPage(1)
    fetchProducts(1, true)
  }, [fetchProducts])

  useEffect(() => {
    fetchProducts(1, true)
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  }
}
