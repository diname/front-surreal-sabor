import { useState, useEffect } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const API_BASE_URL = 'http://localhost:3001/api'

export default function Cart({ isOpen, onClose, onCheckout }) {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // Buscar itens do carrinho
  const fetchCartItems = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/cart`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setCartItems(data.items || [])
        setTotal(data.total || 0)
      }
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error)
    } finally {
      setLoading(false)
    }
  }

  // Atualizar quantidade
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity
        })
      })

      if (response.ok) {
        fetchCartItems()
      }
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
    }
  }

  // Remover item
  const removeItem = async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        fetchCartItems()
      }
    } catch (error) {
      console.error('Erro ao remover item:', error)
    }
  }

  // Limpar carrinho
  const clearCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        fetchCartItems()
      }
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchCartItems()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-orange-600" />
            <h2 className="text-lg font-semibold">Carrinho</h2>
            <Badge variant="secondary">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-3 p-3 border rounded-lg"
                >
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}/uploads/${
                      item.image_url
                    }`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-orange-600 font-semibold">
                      R$ {item.price.toFixed(2)}
                    </p>

                    {/* Controles de quantidade */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product_id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product_id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-orange-600">
                R$ {total.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => {
                  onCheckout()
                  onClose()
                }}
              >
                Finalizar Compra
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Limpar Carrinho
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
