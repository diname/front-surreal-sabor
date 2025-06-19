import { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X, Mountain } from 'lucide-react'
import CartIcon from './CartIcon'

const Header = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Mountain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Surreal Sabor
            </span>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('sobre')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Nossa História
            </button>
            <button
              onClick={() => scrollToSection('produtos')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Produtos
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contato
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = '/admin')}
              className="text-muted-foreground hover:text-foreground"
            >
              Admin
            </Button>
            <CartIcon onClick={onCartClick} />
          </nav>

          {/* Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('sobre')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Nossa História
              </button>
              <button
                onClick={() => scrollToSection('produtos')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Produtos
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Contato
              </button>
              <button
                onClick={() => (window.location.href = '/admin')}
                className="text-left text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
