import { Card, CardContent } from './ui/card';
import { Heart, Users, Leaf, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Sabor Inconfundível",
      description: "Acreditamos que a comida deve ser uma experiência deliciosa. Priorizamos o uso de temperos naturais e receitas autênticas."
    },
    {
      icon: Leaf,
      title: "Qualidade e Frescor",
      description: "Comprometemo-nos com a excelência em cada etapa, desde a seleção rigorosa dos ingredientes até o preparo e a entrega."
    },
    {
      icon: Users,
      title: "Praticidade com Carinho",
      description: "Entendemos a correria do cotidiano e oferecemos soluções práticas sem abrir mão do toque caseiro e do afeto em cada prato."
    },
    {
      icon: Award,
      title: "Inovação Constante",
      description: "Estamos sempre em busca de novas receitas, combinações e formas de aprimorar nossos produtos e serviços."
    }
  ];

  return (
    <section id="sobre" className="section-padding bg-muted/30">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Nossa História
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Conheça a missão e os valores que guiam a Surreal Sabor na criação de experiências culinárias únicas
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Missão */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              Nossa Missão
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Nossa missão na Surreal Sabor é encantar paladares e simplificar a vida de nossos clientes, 
              oferecendo refeições caseiras, nutritivas e saborosas, preparadas com ingredientes frescos e muito carinho. 
              Buscamos levar o conforto do lar à mesa de cada um, com a praticidade que o dia a dia moderno exige, 
              transformando cada refeição em um momento de puro prazer e bem-estar.
            </p>
          </div>

          {/* Imagem ilustrativa */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-primary">
                  Feito com amor,<br />servido com carinho
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Valores adicionais */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Card className="p-6">
            <CardContent className="pt-6">
              <Leaf className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-3">Sustentabilidade e Responsabilidade</h4>
              <p className="text-muted-foreground">
                Atuamos com consciência ambiental e social, buscando práticas sustentáveis em nossa produção 
                e contribuindo para o bem-estar da comunidade.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="pt-6">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-xl font-semibold mb-3">Transparência e Confiança</h4>
              <p className="text-muted-foreground">
                Construímos relações de confiança com nossos clientes, fornecedores e colaboradores, 
                pautadas na honestidade e na clareza em todas as nossas ações.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

