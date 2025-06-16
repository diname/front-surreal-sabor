import { Mountain, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-max">
        {/* Conteúdo principal do footer */}
        <div className="section-padding border-b border-background/20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo e descrição */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Surreal Sabor</span>
              </div>
              <p className="text-background/80 mb-6 max-w-md leading-relaxed">
                Oferecemos refeições caseiras, nutritivas e saborosas, preparadas com ingredientes frescos e muito carinho. 
                Transformamos cada refeição em um momento de puro prazer e bem-estar.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    Início
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    Nossa História
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    Produtos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('contato').scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/80 hover:text-primary transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            {/* Informações de contato */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-background/80">contato@surrealsabor.com.br</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-background/80">(11) 99999-9999</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-background/80">
                    São Paulo, SP<br />
                    Brasil
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm">
              © {currentYear} Surreal Sabor. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-background/60 hover:text-primary text-sm transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

