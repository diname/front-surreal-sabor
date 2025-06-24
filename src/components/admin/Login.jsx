// Importações
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock, AlertCircle, Mountain } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const isAdminEmail = formData.email.toLowerCase().endsWith('@surrealsabor.com');

      if (isLogin) {
        if (isAdminEmail) {
          // Login admin
          const res = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: formData.email, password: formData.password })
          });

          const data = await res.json();
          if (res.ok) {
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.admin));
            navigate('/admin/dashboard');
          } else {
            setError(data.message || 'Credenciais inválidas');
          }
        } else {
          // Login cliente
          const res = await fetch('http://localhost:3001/api/customers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: formData.email, password: formData.password })
          });

          const data = await res.json();
          if (res.ok) {
            localStorage.setItem('customerToken', data.token || '');
            localStorage.setItem('customerData', JSON.stringify(data.customer));
            navigate('/');
          } else {
            setError(data.message || 'Credenciais inválidas');
          }
        }
      } else {
        // Cadastro cliente
        const res = await fetch('http://localhost:3001/api/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('customerToken', data.token || '');
          localStorage.setItem('customerData', JSON.stringify(data.customer));
          navigate('/');
        } else {
          setError(data.message || 'Erro ao cadastrar');
        }
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Mountain className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Surreal Sabor</span>
          </div>
          <p className="text-muted-foreground">
            {isLogin ? 'Acesso à conta' : 'Criar nova conta'}
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{isLogin ? 'Entrar' : 'Cadastrar'}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="flex items-center gap-2 p-4 mb-6 rounded-lg bg-red-50 text-red-700 border border-red-200">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="full_name">Nome completo</Label>
                    <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
              </Button>
            </form>

            <div className="text-sm text-center mt-4">
              {isLogin ? (
                <>
                  Não tem uma conta?{' '}
                  <button onClick={() => setIsLogin(false)} className="text-primary underline">
                    Cadastre-se
                  </button>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <button onClick={() => setIsLogin(true)} className="text-primary underline">
                    Entrar
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
