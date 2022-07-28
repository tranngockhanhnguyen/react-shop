import productApi from '@/api/productApi'
import { useEffect, useState } from 'react'

export default function (productId) {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const response = await productApi.get(productId)
        setProduct(response)
      } catch (error) {
        console.log('Failed to fetch product', error)
      }

      setLoading(false)
    })()
  }, [productId])

  return [loading, product]
}
