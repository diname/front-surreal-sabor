import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  FileText,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { toast } from 'sonner'

const API_BASE_URL = 'http://localhost:3001/api'

export default function Checkout({ onBack, onOrderComplete }) {
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Dados, 2: Pagamento, 3: Confirmação

  const [customerData, setCustomerData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [errors, setErrors] = useState({})

  // Buscar itens do carrinho
  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
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
    }
  }

  // Validar formulário
  const validateForm = () => {
    const newErrors = {}

    if (!customerData.full_name.trim()) {
      newErrors.full_name = 'Nome completo é obrigatório'
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!customerData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    }

    if (!customerData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Processar pedido
  const processOrder = async () => {
    if (!validateForm()) {
      toast.error('Por favor, preencha todos os campos obrigatórios')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          customer_data: customerData,
          payment_method: paymentMethod
        })
      })

      if (response.ok) {
        const orderData = await response.json()
        onOrderComplete(orderData)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || 'Erro ao processar pedido')
      }
    } catch (error) {
      console.error('Erro ao processar pedido:', error)
      toast.error('Erro ao processar pedido')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setCustomerData((prev) => ({
      ...prev,
      [field]: value
    }))

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 mb-4">Seu carrinho está vazio</p>
              <Button onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar às Compras
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-orange-600">
                        R$ {total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Nome Completo *</Label>
                    <Input
                      id="full_name"
                      value={customerData.full_name}
                      onChange={(e) =>
                        handleInputChange('full_name', e.target.value)
                      }
                      placeholder="Digite seu nome completo"
                      className={errors.full_name ? 'border-red-500' : ''}
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      placeholder="Digite seu email"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      placeholder="(11) 99999-9999"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Textarea
                      id="address"
                      value={customerData.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      placeholder="Digite seu endereço completo"
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Forma de Pagamento */}
                <div className="pt-6 border-t">
                  <Label className="text-base font-semibold mb-4 block">
                    Forma de Pagamento
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label
                        htmlFor="pix"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <QrCode className="h-4 w-4 text-green-600" />
                        PIX (Aprovação Instantânea)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label
                        htmlFor="boleto"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="h-4 w-4 text-blue-600" />
                        Boleto Bancário (Vencimento em 3 dias)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Botão de Finalizar */}
                <div className="pt-6">
                  <Button
                    onClick={processOrder}
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    size="lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <CreditCard className="h-4 w-4 mr-2" />
                    )}
                    {loading
                      ? 'Processando...'
                      : `Finalizar Compra - R$ ${total.toFixed(2)}`}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios. Seus dados estão seguros conosco.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
