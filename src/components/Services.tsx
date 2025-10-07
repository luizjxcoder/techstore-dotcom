import React, { useEffect, useRef, useState } from 'react';
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2, Tablet, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Services = () => {
  console.log('Services component rendering with horizontal scroll');
  const servicesRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const services = [
    {
      icon: Smartphone,
      title: 'SMARTPHONES',
      description: 'Últimos lançamentos das principais marcas com tecnologia de ponta.'
    },
    {
      icon: Laptop,
      title: 'LAPTOPS',
      description: 'Notebooks profissionais para todas as necessidades de trabalho.'
    },
    {
      icon: Headphones,
      title: 'ÁUDIO',
      description: 'Fones e sistemas de áudio premium para profissionais.'
    },
    {
      icon: Camera,
      title: 'CÂMERAS',
      description: 'Equipamentos fotográficos profissionais e acessórios.'
    },
    {
      icon: Zap,
      title: 'ACESSÓRIOS',
      description: 'Carregadores, cabos e acessórios premium para seus dispositivos.'
    },
    {
      icon: Watch,
      title: 'SMARTWATCHES',
      description: 'Relógios inteligentes para monitorar e otimizar sua rotina.'
    },
    {
      icon: Tablet,
      title: 'TABLETS',
      description: 'Dispositivos versáteis para produtividade e entretenimento.'
    },
    {
      icon: Gamepad2,
      title: 'GAMING',
      description: 'Periféricos e equipamentos para uma experiência gaming única.'
    }
  ];

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // width of card + gap
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      scrollContainerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

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

    const elements = servicesRef.current?.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3, .fade-in-up-delay-4, .fade-in-up-delay-5');
    elements?.forEach((el) => observer.observe(el));

    // Check scrollability on mount and resize
    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  return (
    <section
      id="services"
      ref={servicesRef}
      className="min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pr-8 sm:pr-16 lg:pr-32 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient">SERVIÇOS</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-tech-accent mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Oferecemos uma ampla gama de produtos eletrônicos premium, 
            cuidadosamente selecionados para atender às necessidades dos profissionais mais exigentes.
          </p>
        </div>

        {/* Horizontal Scroll Container with Navigation */}
        <div className="relative fade-in-up-delay-1">
          {/* Left Navigation Button */}
          {isScrollable && canScrollLeft && (
            <button
              onClick={() => scrollTo('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-tech-accent/80 hover:bg-tech-accent text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Navigation Button */}
          {isScrollable && canScrollRight && (
            <button
              onClick={() => scrollTo('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-tech-accent/80 hover:bg-tech-accent text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide pb-6 cursor-grab select-none"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={checkScrollability}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-8 min-w-max px-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group bg-tech-gray/30 backdrop-blur-sm rounded-lg p-8 hover-lift hover-slide transition-all duration-500 flex-shrink-0 w-80 pointer-events-none"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <IconComponent className="text-tech-accent mb-6 group-hover:scale-125 transition-all duration-500" size={48} />
                      <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-tech-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {service.description}
                      </p>
                      <div className="absolute inset-0 bg-gradient-to-r from-tech-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drag Instruction */}
        <div className="text-center mt-8 fade-in-up-delay-2">
          <p className="text-gray-400 text-sm mb-4">↔ Arraste ou use as setas para navegar ↔</p>
        </div>

        {/* Animated CTA */}
        <div className="text-center mt-8 fade-in-up-delay-3">
          <button className="bg-tech-accent hover:bg-tech-accent/80 text-white px-12 py-4 rounded-full transition-all duration-300 ripple font-semibold text-lg">
            EXPLORAR TODOS OS SERVIÇOS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;