import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Filter } from 'lucide-react';

// Importar imagens
import caldoVerdeImg from '../assets/caldo_verde.png';
import canjinhaImg from '../assets/canjinha.png';
import cremeMandioquinhaImg from '../assets/creme_mandioquinha.png';
import sopaMinestrone from '../assets/sopa_minestrone.png';
import strogonoffFrangoImg from '../assets/strogonoff_frango.png';
import escondidinhoCarneSeca from '../assets/escondidinho_carne_seca.png';
import lasanhaBolonhesa from '../assets/lasanha_bolonhesa.png';
import sucoLaranjaImg from '../assets/suco_laranja.png';
import refrigeranteColaImg from '../assets/refrigerante_cola.png';
import aguaMineralImg from '../assets/agua_mineral.png';
import pudimLeiteCondensado from '../assets/pudim_leite_condensado.png';
import boloCenouraImg from '../assets/bolo_cenoura.png';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mapeamento de imagens
  const imageMap = {
    '/uploads/caldo_verde.png': caldoVerdeImg,
    '/uploads/canjinha.png': canjinhaImg,
    '/uploads/creme_mandioquinha.png': cremeMandioquinhaImg,
    '/uploads/sopa_minestrone.png': sopaMinestrone,
    '/uploads/strogonoff_frango.png': strogonoffFrangoImg,
    '/uploads/escondidinho_carne_seca.png': escondidinhoCarneSeca,
    '/uploads/lasanha_bolonhesa.png': lasanhaBolonhesa,
    '/uploads/suco_laranja.png': sucoLaranjaImg,
    '/uploads/refrigerante_cola.png': refrigeranteColaImg,
    '/uploads/agua_mineral.png': aguaMineralImg,
    '/uploads/pudim_leite_condensado.png': pudimLeiteCondensado,
    '/uploads/bolo_cenoura.png': boloCenouraImg,
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category_id === selectedCategory);

  const featuredProducts = products.filter(product => product.is_featured);

  if (loading) {
    return (
      <section id="produtos" className="section-padding">
        <div className="container-max">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Carregando produtos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="produtos" className="section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Nossos Produtos
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra nossa seleção de pratos caseiros, preparados com ingredientes frescos e muito carinho
          </p>
        </div>

        {/* Produtos em Destaque */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Produtos em Destaque
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="product-card overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={imageMap[product.image_url] || product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-semibold">{product.name}</h4>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Destaque
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      <Badge variant="outline">{product.category_name}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Todos os Produtos
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="product-card overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={imageMap[product.image_url] || product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {product.category_name}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

