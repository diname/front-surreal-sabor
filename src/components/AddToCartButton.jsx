import { useState } from 'react'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner'

const API_BASE_URL = 'http://localhost:3001/api'

export default function AddToCartButton({ product, className = '' }) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const addToCart = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      })

      if (response.ok) {
        setAdded(true)
        toast.success(`${product.name} adicionado ao carrinho!`)

        // Reset do estado após 2 segundos
        setTimeout(() => setAdded(false), 2000)
      } else {
        toast.error('Erro ao adicionar produto ao carrinho')
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      toast.error('Erro ao adicionar produto ao carrinho')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={addToCart}
      disabled={loading}
      className={`bg-orange-600 hover:bg-orange-700 ${className}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : added ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Adicionado!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar
        </>
      )}
    </Button>
  )
}
