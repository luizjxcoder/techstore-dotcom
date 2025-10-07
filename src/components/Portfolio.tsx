import React, { useEffect, useRef, useState } from 'react';
import { X, Star, ShoppingCart, Heart, Share2, Eye, Zap, Shield, Award } from 'lucide-react';

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  const features = {
    'Smartphone Pro Max': [
      { icon: Zap, text: 'Processador A17 Bionic' },
      { icon: Eye, text: 'Câmera 48MP com IA' },
      { icon: Shield, text: 'Resistente à água IP68' },
      { icon: Award, text: 'Bateria 24h contínuas' }
    ],
    'Laptop Ultrabook': [
      { icon: Zap, text: 'Intel Core i7 13ª geração' },
      { icon: Eye, text: 'Tela 4K OLED 15.6"' },
      { icon: Shield, text: 'SSD 1TB NVMe' },
      { icon: Award, text: '16GB RAM DDR5' }
    ],
    'Fones Premium': [
      { icon: Zap, text: 'Cancelamento de ruído ativo' },
      { icon: Eye, text: 'Drivers 40mm premium' },
      { icon: Shield, text: 'Bluetooth 5.3' },
      { icon: Award, text: 'Bateria 30h reprodução' }
    ],
    'Câmera DSLR': [
      { icon: Zap, text: 'Sensor Full Frame 45MP' },
      { icon: Eye, text: 'Vídeo 4K 60fps' },
      { icon: Shield, text: 'Estabilização 5 eixos' },
      { icon: Award, text: 'ISO até 102.400' }
    ],
    'Smartwatch Elite': [
      { icon: Zap, text: 'Monitoramento cardíaco' },
      { icon: Eye, text: 'GPS integrado' },
      { icon: Shield, text: 'Resistente à água 50m' },
      { icon: Award, text: 'Bateria 7 dias' }
    ],
    'Console Gaming': [
      { icon: Zap, text: 'GPU customizada RDNA 2' },
      { icon: Eye, text: 'Suporte 4K 120fps' },
      { icon: Shield, text: 'SSD ultra-rápido 1TB' },
      { icon: Award, text: 'Ray Tracing em tempo real' }
    ]
  };

  const productFeatures = features[product.title] || [];
  const price = {
    'Smartphone Pro Max': 'R$ 8.999',
    'Laptop Ultrabook': 'R$ 12.999',
    'Fones Premium': 'R$ 2.499',
    'Câmera DSLR': 'R$ 15.999',
    'Smartwatch Elite': 'R$ 3.999',
    'Console Gaming': 'R$ 4.999'
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-tech-darker rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-tech-accent text-sm font-semibold">{product.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{product.title}</h2>
              <p className="text-gray-400 text-lg">{product.description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-tech-accent mb-2">{price[product.title]}</div>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <span className="ml-2 text-gray-400 text-sm">(4.9)</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Principais Características</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {productFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-tech-gray/30 rounded-lg">
                    <IconComponent className="text-tech-accent" size={20} />
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Descrição Detalhada</h3>
            <p className="text-gray-300 leading-relaxed">
              Este produto representa o que há de mais avançado em tecnologia. 
              Desenvolvido com os melhores materiais e componentes premium, 
              oferece performance excepcional e durabilidade incomparável. 
              Ideal para profissionais que não abrem mão da qualidade e excelência.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <button className="flex-1 bg-tech-accent hover:bg-tech-accent/80 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold">
              <ShoppingCart size={20} />
              <span>ADICIONAR AO CARRINHO</span>
            </button>
            <button className="bg-tech-gray/50 hover:bg-tech-gray/70 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Heart size={20} />
              <span>FAVORITAR</span>
            </button>
            <button className="bg-tech-gray/50 hover:bg-tech-gray/70 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Share2 size={20} />
              <span>COMPARTILHAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  console.log('Portfolio component rendering with image animations');
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const portfolioItems = [
    {
      image: 'https://images.unsplash.com/photo-1707438095940-1eee18e85400?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Smartphone Pro Max',
      category: 'SMARTPHONES',
      description: 'Última geração com tecnologia 5G'
    },
    {
      image: 'https://images.unsplash.com/photo-1579362243176-b746a02bc030?q=80&w=1181&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Laptop Ultrabook',
      category: 'LAPTOPS',
      description: 'Performance profissional extrema'
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Fones Premium',
      category: 'ÁUDIO',
      description: 'Cancelamento de ruído ativo'
    },
    {
      image: 'https://images.unsplash.com/photo-1598469701566-59655353deb4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Câmera DSLR',
      category: 'CÂMERAS',
      description: 'Qualidade profissional 4K'
    },
    {
      image: 'https://images.unsplash.com/photo-1609096458733-95b38583ac4e?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Smartwatch Elite',
      category: 'SMARTWATCHES',
      description: 'Monitoramento avançado de saúde'
    },
    {
      image: 'https://images.unsplash.com/photo-1709587797203-b28ef0e16e31?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Console Gaming',
      category: 'GAMING',
      description: 'Experiência imersiva next-gen'
    }
  ];

  const categories = ['TODOS', 'SMARTPHONES', 'LAPTOPS', 'ÁUDIO', 'CÂMERAS', 'SMARTWATCHES', 'GAMING'];

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log('Opening modal for product:', product.title);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    console.log('Closing product modal');
  };

  const filteredItems = activeFilter === 'TODOS' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = portfolioRef.current?.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3, .fade-in-up-delay-4, .fade-in-up-delay-5');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredItems]);

  return (
    <section
      id="portfolio"
      ref={portfolioRef}
      className="min-h-screen flex items-center bg-tech-darker"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pr-8 sm:pr-16 lg:pr-32 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient">PORTFÓLIO</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-tech-accent mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Conheça alguns dos produtos em destaque da nossa seleção premium. 
            Cada item é escolhido por sua qualidade excepcional e inovação tecnológica.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 fade-in-up-delay-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-semibold text-xs sm:text-sm lg:text-base transition-all duration-300 ripple ${
                activeFilter === category
                  ? 'bg-tech-accent text-white'
                  : 'bg-tech-gray/50 text-gray-300 hover:bg-tech-accent/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => {
            const delayClass = `fade-in-up-delay-${Math.min((index % 5) + 2, 5)}`;
            return (
            <div 
              key={`${item.category}-${index}`} 
              className={`group relative overflow-hidden rounded-lg bg-tech-gray hover-lift ${delayClass}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-125 transition-transform duration-700"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                  <div className="mb-2">
                    <span className="text-xs text-tech-accent font-semibold">{item.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-4 line-clamp-2">{item.description}</p>
                  <button 
                    onClick={() => openModal(item)}
                    className="bg-tech-accent hover:bg-tech-accent/80 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ripple"
                  >
                    VER DETALHES
                  </button>
                </div>

                {/* Corner decoration - static */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-tech-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </div>
            );
          })}
        </div>

        {/* Animated CTA */}
        <div className="text-center mt-12 sm:mt-16 fade-in-up-delay-3">
          <button className="bg-tech-accent hover:bg-tech-accent/80 text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full transition-all duration-300 ripple font-semibold text-sm sm:text-base lg:text-lg">
            VER TODOS OS PRODUTOS
          </button>
        </div>

        {/* Product Modal */}
        <ProductModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          product={selectedProduct}
        />
      </div>
    </section>
  );
};

export default Portfolio;