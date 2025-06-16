import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Mountain, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Package, 
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_featured: false
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token || !userData) {
      navigate('/admin');
      return;
    }
    
    setUser(JSON.parse(userData));
  };

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes, customersRes] = await Promise.all([
        fetch('http://localhost:3001/api/products'),
        fetch('http://localhost:3001/api/categories'),
        fetch('http://localhost:3001/api/customers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })
      ]);

      const [productsData, categoriesData, customersData] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        customersRes.json()
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const url = editingProduct 
        ? `http://localhost:3001/api/products/${editingProduct.id}`
        : 'http://localhost:3001/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price)
        }),
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: editingProduct ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!' 
        });
        setShowProductForm(false);
        setEditingProduct(null);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category_id: '',
          is_featured: false
        });
        fetchData();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.message || 'Erro ao salvar produto' });
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      is_featured: product.is_featured === 1
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const response = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Produto excluído com sucesso!' });
        fetchData();
      } else {
        setMessage({ type: 'error', text: 'Erro ao excluir produto' });
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">Surreal Sabor Admin</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Olá, {user?.username}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg border">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('overview')}
            className="flex-1"
          >
            Visão Geral
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('products')}
            className="flex-1"
          >
            Produtos
          </Button>
          <Button
            variant={activeTab === 'customers' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('customers')}
            className="flex-1"
          >
            Clientes
          </Button>
        </div>

        {/* Conteúdo das tabs */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  {products.filter(p => p.is_featured).length} em destaque
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Cadastrados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{customers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total de cadastros
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categorias</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length}</div>
                <p className="text-xs text-muted-foreground">
                  Categorias ativas
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
              <Button onClick={() => {
                setShowProductForm(true);
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  description: '',
                  price: '',
                  category_id: '',
                  is_featured: false
                });
              }}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Produto
              </Button>
            </div>

            {showProductForm && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome do Produto</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Preço</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="category">Categoria</Label>
                      <select
                        id="category"
                        value={productForm.category_id}
                        onChange={(e) => setProductForm({...productForm, category_id: e.target.value})}
                        className="w-full p-2 border border-border rounded-md"
                        required
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={productForm.is_featured}
                        onChange={(e) => setProductForm({...productForm, is_featured: e.target.checked})}
                      />
                      <Label htmlFor="featured">Produto em destaque</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowProductForm(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {products.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          {product.is_featured && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Destaque
                            </Badge>
                          )}
                          <Badge variant="outline">{product.category_name}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.description}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Clientes Cadastrados</h2>
            <div className="grid gap-4">
              {customers.map(customer => (
                <Card key={customer.id}>
                  <CardContent className="p-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="font-semibold">{customer.full_name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p>{customer.phone || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Endereço</p>
                        <p>{customer.address || 'Não informado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cadastrado em</p>
                        <p>{new Date(customer.created_at).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

