import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  console.log('Hero component rendering with office background');
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fade in animations with Intersection Observer
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

    const elements = heroRef.current?.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3');
    elements?.forEach((el) => observer.observe(el));

    // Ensure all content is visible after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-end pt-40 pb-80 section-overlay relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pr-8 sm:pr-16 lg:pr-32 section-content">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 fade-in-up">
            <span className="block text-white">
              TECHSTORE
            </span>
            <span className="text-gradient block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
              QUALIDADE EM TECNOLOGIA
            </span>
          </h1>
          
          <div className="w-20 h-1 bg-tech-accent mb-8 fade-in-up-delay-1"></div>
          
          <div className="space-y-4 text-base sm:text-lg text-gray-300 fade-in-up-delay-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              BEM-VINDOS
            </h2>
            <p className="leading-relaxed">
              Descubra nossa seleção premium de eletrônicos que revolucionarão sua forma de trabalhar. 
              Produtos de alta qualidade para profissionais que buscam excelência.
            </p>
            <p className="leading-relaxed hidden sm:block">
              Desde smartphones de última geração até laptops ultrapoderosos, 
              temos tudo que você precisa para elevar sua produtividade ao próximo nível.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12 fade-in-up-delay-3">
            <button className="bg-tech-accent hover:bg-tech-accent/80 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 ripple font-semibold text-sm sm:text-base">
              EXPLORAR PRODUTOS
            </button>
            <button className="border-2 border-tech-accent text-tech-accent hover:bg-tech-accent hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 font-semibold text-sm sm:text-base">
              SAIBA MAIS
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Hero;