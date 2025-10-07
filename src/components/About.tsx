import React, { useEffect, useState, useRef } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';

const About = () => {
  console.log('About component rendering with improved layout');
  const [counters, setCounters] = useState({ products: 0, clients: 0, years: 0, rating: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Award, label: 'PRODUTOS PREMIUM', value: 500, suffix: '+', key: 'products' },
    { icon: Users, label: 'CLIENTES SATISFEITOS', value: 10000, suffix: '+', key: 'clients' },
    { icon: Clock, label: 'ANOS DE EXPERIÊNCIA', value: 15, suffix: '+', key: 'years' },
    { icon: Star, label: 'AVALIAÇÃO MÉDIA', value: 4.9, suffix: '', key: 'rating' },
  ];

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

    // Observer separado para animar contadores quando a seção de estatísticas aparecer
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            console.log('Stats section is visible, starting counter animation');
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = aboutRef.current?.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3, .fade-in-up-delay-4, .fade-in-up-delay-5');
    elements?.forEach((el) => observer.observe(el));

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    console.log('Starting counter animations');
    const duration = 2500; // Duração de 2.5 segundos
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Função de easing para fazer a animação mais suave
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
      const easedProgress = easeOutQuart(progress);

      setCounters({
        products: Math.floor(500 * easedProgress),
        clients: Math.floor(10000 * easedProgress),
        years: Math.floor(15 * easedProgress),
        rating: parseFloat((4.9 * easedProgress).toFixed(1))
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Garantir que os valores finais sejam exatos
        setCounters({
          products: 500,
          clients: 10000,
          years: 15,
          rating: 4.9
        });
        console.log('Counter animations completed');
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-[200vh] flex items-start section-overlay"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pr-8 sm:pr-16 lg:pr-32 py-12 sm:py-16 lg:py-20 section-content">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient">SOBRE NÓS</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-tech-accent mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Com mais de 15 anos no mercado de tecnologia, a TechStore Pro é referência 
            em eletrônicos premium para profissionais exigentes que buscam excelência e inovação.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-start mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column - Text Content */}
          <div className="space-y-6 sm:space-y-8 fade-in-up-delay-1">
            <div className="space-y-4 sm:space-y-6 text-gray-300">
              <p className="text-base sm:text-lg leading-relaxed">
                Nossa missão é fornecer produtos de alta qualidade que aumentem a produtividade 
                e facilitem o dia a dia dos nossos clientes. Trabalhamos apenas com as melhores 
                marcas do mercado mundial.
              </p>
              <p className="text-sm sm:text-base leading-relaxed hidden sm:block">
                Oferecemos suporte técnico especializado, garantia estendida e um atendimento 
                personalizado que faz toda a diferença na sua experiência de compra. Nossa equipe 
                de especialistas está sempre pronta para ajudar você a encontrar a solução ideal.
              </p>
            </div>
            
            {/* Nossa História */}
            <div className="p-4 sm:p-6 bg-tech-gray/30 rounded-lg backdrop-blur-sm">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Nossa História</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Fundada em 2009, começamos como uma pequena loja especializada em equipamentos 
                para escritório. Hoje, somos uma das principais referências em tecnologia 
                corporativa no Brasil, atendendo desde pequenas empresas até grandes corporações.
              </p>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="space-y-4 sm:space-y-6 fade-in-up-delay-2">
            {/* Imagem Principal do Escritório */}
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Nosso escritório moderno"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <h4 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Nosso Escritório</h4>
                <p className="text-xs sm:text-sm text-gray-200">Ambiente moderno e tecnológico</p>
              </div>
            </div>

            {/* Imagem da Equipe */}
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Nossa equipe de especialistas"
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                <h4 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Nossa Equipe</h4>
                <p className="text-xs sm:text-sm text-gray-200">Especialistas em tecnologia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas - Grid Centralizado */}
        <div ref={statsRef} className="mb-12 sm:mb-16 lg:mb-20 fade-in-up-delay-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-8 sm:mb-12">Nossos Números</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const currentValue = counters[stat.key as keyof typeof counters];
              return (
                <div 
                  key={index} 
                  className="text-center p-3 sm:p-4 lg:p-6 bg-tech-gray/30 backdrop-blur-sm rounded-lg transition-all duration-300 hover:bg-tech-gray/40 hover:scale-105"
                >
                  <Icon className="mx-auto mb-2 sm:mb-3 lg:mb-4 text-tech-accent" size={28} />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 counter-display transition-all duration-300">
                    {stat.key === 'rating' ? currentValue.toFixed(1) : Math.floor(currentValue).toLocaleString('pt-BR')}{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-tight font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nossos Valores - Grid Horizontal */}
        <div className="mb-12 sm:mb-16 lg:mb-20 fade-in-up-delay-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-8 sm:mb-12">Nossos Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center p-4 sm:p-6 lg:p-8 bg-tech-gray/30 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-tech-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award className="text-tech-accent" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-tech-accent mb-3 sm:mb-4">QUALIDADE</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Produtos premium das melhores marcas mundiais, rigorosamente selecionados 
                por nossa equipe de especialistas.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 lg:p-8 bg-tech-gray/30 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-tech-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="text-tech-accent" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-tech-accent mb-3 sm:mb-4">INOVAÇÃO</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Sempre à frente das tendências tecnológicas, oferecendo as soluções 
                mais avançadas do mercado.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 lg:p-8 bg-tech-gray/30 rounded-lg backdrop-blur-sm">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-tech-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Users className="text-tech-accent" size={24} />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-tech-accent mb-3 sm:mb-4">CONFIANÇA</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Relacionamento duradouro com nossos clientes, baseado na 
                transparência e excelência no atendimento.
              </p>
            </div>
          </div>
        </div>

        {/* Certificações e Parcerias */}
        <div className="text-center fade-in-up-delay-5">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-8 sm:mb-12">Parcerias e Certificações</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">APPLE</div>
              <div className="text-xs text-gray-400">Revendedor Autorizado</div>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">MICROSOFT</div>
              <div className="text-xs text-gray-400">Parceiro Ouro</div>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">SAMSUNG</div>
              <div className="text-xs text-gray-400">Parceiro Premium</div>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm text-center">
              <div className="text-white font-bold text-lg sm:text-xl mb-1 sm:mb-2">DELL</div>
              <div className="text-xs text-gray-400">Parceiro Autorizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;