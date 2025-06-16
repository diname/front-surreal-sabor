import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Cadastro realizado com sucesso! Bem-vindo à família Surreal Sabor!' 
        });
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          address: ''
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.message || 'Erro ao realizar cadastro. Tente novamente.' 
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      setMessage({ 
        type: 'error', 
        text: 'Erro de conexão. Verifique sua internet e tente novamente.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Faça Parte da Nossa Família
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Cadastre-se para receber novidades, promoções exclusivas e ficar por dentro dos nossos lançamentos
            </p>
          </div>

          {/* Formulário */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Cadastro de Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mensagem de feedback */}
              {message.text && (
                <div className={`flex items-center gap-2 p-4 rounded-lg mb-6 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome Completo */}
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nome Completo *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                    required
                    className="w-full"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                    required
                    className="w-full"
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="w-full"
                  />
                </div>

                {/* Endereço */}
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Digite seu endereço completo (opcional)"
                    rows={3}
                    className="w-full resize-none"
                  />
                </div>

                {/* Botão de Submit */}
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Realizar Cadastro
                    </>
                  )}
                </Button>

                {/* Nota */}
                <p className="text-sm text-muted-foreground text-center">
                  * Campos obrigatórios. Seus dados estão seguros conosco.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefícios do cadastro */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Promoções Exclusivas</h4>
              <p className="text-sm text-muted-foreground">
                Receba ofertas especiais e descontos exclusivos para clientes cadastrados
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Novidades em Primeira Mão</h4>
              <p className="text-sm text-muted-foreground">
                Seja o primeiro a saber sobre novos pratos e lançamentos
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Atendimento Personalizado</h4>
              <p className="text-sm text-muted-foreground">
                Receba um atendimento mais rápido e personalizado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerForm;

