import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Mountain, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    const customerUser = localStorage.getItem('customerData');

    if (adminUser) {
      setUser(JSON.parse(adminUser));
      setIsAdmin(true);
    } else if (customerUser) {
      setUser(JSON.parse(customerUser));
      setIsAdmin(false);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerData');
    window.location.href = '/Login';
  };

  const getFirstName = () => {
    if (!user) return '';
    const name = isAdmin ? user.username : user.full_name;
    return name?.split(' ')[0] || '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Surreal Sabor</span>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('inicio')} className="text-foreground hover:text-primary transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('sobre')} className="text-foreground hover:text-primary transition-colors">
              Nossa História
            </button>
            <button onClick={() => scrollToSection('produtos')} className="text-foreground hover:text-primary transition-colors">
              Produtos
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-foreground hover:text-primary transition-colors">
              Contato
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Olá, {getFirstName()}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Sair
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/Login'} className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            )}
          </nav>

          {/* Botão de menu mobile */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('inicio')} className="text-left text-foreground hover:text-primary transition-colors">
                Início
              </button>
              <button onClick={() => scrollToSection('sobre')} className="text-left text-foreground hover:text-primary transition-colors">
                Nossa História
              </button>
              <button onClick={() => scrollToSection('produtos')} className="text-left text-foreground hover:text-primary transition-colors">
                Produtos
              </button>
              <button onClick={() => scrollToSection('contato')} className="text-left text-foreground hover:text-primary transition-colors">
                Contato
              </button>

              {user ? (
                <>
                  <span className="text-left text-muted-foreground">Olá, {getFirstName()}</span>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <LogOut className="w-4 h-4" /> Sair
                  </button>
                </>
              ) : (
                <button
                  onClick={() => window.location.href = '/Login'}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
