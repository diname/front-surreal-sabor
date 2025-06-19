import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const API_BASE_URL = 'http://localhost:3001/api'

export default function CartIcon({ onClick }) {
  const [cartCount, setCartCount] = useState(0)

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        const count =
          data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
        setCartCount(count)
      }
    } catch (error) {
      console.error('Erro ao buscar contador do carrinho:', error)
    }
  }

  useEffect(() => {
    fetchCartCount()

    // Atualizar contador a cada 5 segundos
    const interval = setInterval(fetchCartCount, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="relative">
      <ShoppingCart className="h-5 w-5" />
      {cartCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-600"
        >
          {cartCount > 99 ? '99+' : cartCount}
        </Badge>
      )}
    </Button>
  )
}
