import { Button } from './ui/button'
import { ArrowRight, Star } from 'lucide-react'

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('produtos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="hero-gradient section-padding pt-24">
      <div className="container-max">
        <div className="text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">
              Comida caseira com sabor inconfundível
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Sabores que
            <br />
            <span className="text-yellow-200">Aquecem a Alma</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Descubra nossa seleção de pratos caseiros, caldos reconfortantes e
            refeições completas, preparados com ingredientes frescos e muito
            carinho.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3"
              onClick={scrollToProducts}
            >
              Ver Nossos Produtos
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              // variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3"
              onClick={() =>
                document
                  .getElementById('sobre')
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Nossa História
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">12+</div>
              <div className="text-white/80">Pratos Deliciosos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Ingredientes Frescos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">5★</div>
              <div className="text-white/80">Avaliação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
