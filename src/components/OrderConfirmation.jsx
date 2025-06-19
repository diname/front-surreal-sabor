import { useState, useEffect } from 'react'
import {
  CheckCircle,
  Copy,
  QrCode,
  FileText,
  ArrowLeft,
  ShoppingBag,
  Clock,
  CreditCard
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { toast } from 'sonner'

const API_BASE_URL = 'http://localhost:3001/api'

export default function OrderConfirmation({ orderData, onNewOrder }) {
  const [paymentStatus, setPaymentStatus] = useState(
    orderData?.payment_status || 'pending'
  )
  const [loading, setLoading] = useState(false)

  // Verificar status do pagamento periodicamente
  useEffect(() => {
    if (!orderData?.order_id) return

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/orders/${orderData.order_id}/payment-status`,
          {
            credentials: 'include'
          }
        )

        if (response.ok) {
          const data = await response.json()
          setPaymentStatus(data.status)

          if (data.status === 'approved') {
            toast.success('Pagamento aprovado! Seu pedido foi confirmado.')
          }
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error)
      }
    }

    // Verificar imediatamente
    checkPaymentStatus()

    // Verificar a cada 10 segundos se ainda está pendente
    const interval = setInterval(() => {
      if (paymentStatus === 'pending') {
        checkPaymentStatus()
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [orderData?.order_id, paymentStatus])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copiado para a área de transferência!')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Pagamento Aprovado'
      case 'pending':
        return 'Aguardando Pagamento'
      case 'rejected':
        return 'Pagamento Rejeitado'
      default:
        return 'Status Desconhecido'
    }
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Dados do pedido não encontrados
            </p>
            <Button onClick={onNewOrder}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pedido Realizado com Sucesso!
          </h1>
          <p className="text-gray-600">
            Seu pedido #{orderData.order_number} foi criado e está sendo
            processado.
          </p>
        </div>

        {/* Status do Pagamento */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Status do Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(paymentStatus)}>
                {getStatusText(paymentStatus)}
              </Badge>
              {paymentStatus === 'pending' && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Verificando automaticamente...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações do Pagamento */}
        {orderData.payment_method === 'pix' && orderData.pix_qr_code && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-green-600" />
                Pagamento via PIX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="bg-white p-4 rounded-lg border inline-block">
                  <div className="w-48 h-48 bg-gray-200 rounded flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-500">
                      QR Code PIX
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Código PIX:
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-gray-100 rounded text-xs break-all">
                      {orderData.pix_qr_code}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(orderData.pix_qr_code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <p>• Abra o app do seu banco</p>
                  <p>• Escolha a opção PIX</p>
                  <p>• Escaneie o QR Code ou cole o código</p>
                  <p>• Confirme o pagamento</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {orderData.payment_method === 'boleto' && orderData.boleto_url && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Boleto Bancário
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Código de Barras:
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="flex-1 p-2 bg-gray-100 rounded text-xs">
                      {orderData.boleto_barcode}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(orderData.boleto_barcode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => window.open(orderData.boleto_url, '_blank')}
                  className="w-full"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Visualizar/Imprimir Boleto
                </Button>

                <div className="text-sm text-gray-600">
                  <p>• Vencimento: 3 dias úteis</p>
                  <p>
                    • Pode ser pago em qualquer banco, lotérica ou app bancário
                  </p>
                  <p>
                    • Após o pagamento, a confirmação pode levar até 2 dias
                    úteis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resumo do Pedido */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Resumo do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Número do Pedido:</span>
                <span className="font-medium">{orderData.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span>Forma de Pagamento:</span>
                <span className="font-medium capitalize">
                  {orderData.payment_method === 'pix'
                    ? 'PIX'
                    : 'Boleto Bancário'}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-orange-600">
                  R$ {orderData.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Próximos Passos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {paymentStatus === 'pending' && (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Realize o pagamento</p>
                      <p className="text-gray-600">
                        {orderData.payment_method === 'pix'
                          ? 'Use o QR Code ou código PIX acima'
                          : 'Imprima e pague o boleto até o vencimento'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Confirmação automática</p>
                      <p className="text-gray-600">
                        Após o pagamento, você receberá um email de confirmação
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Preparação do pedido</p>
                      <p className="text-gray-600">
                        Começaremos a preparar seus pratos com carinho
                      </p>
                    </div>
                  </div>
                </>
              )}

              {paymentStatus === 'approved' && (
                <div className="text-center py-4">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <p className="font-medium text-green-800">
                    Pagamento confirmado!
                  </p>
                  <p className="text-green-600">
                    Seu pedido está sendo preparado com carinho.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex gap-4">
          <Button variant="outline" onClick={onNewOrder} className="flex-1">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Fazer Novo Pedido
          </Button>

          <Button
            onClick={() =>
              (window.location.href = `mailto:contato@surrealsabor.com.br?subject=Pedido ${orderData.order_number}`)
            }
            className="flex-1 bg-orange-600 hover:bg-orange-700"
          >
            Entrar em Contato
          </Button>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Dúvidas? Entre em contato conosco:</p>
          <p>📧 contato@surrealsabor.com.br | 📱 (11) 99999-9999</p>
        </div>
      </div>
    </div>
  )
}
