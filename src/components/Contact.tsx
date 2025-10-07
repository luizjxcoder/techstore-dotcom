import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  console.log('Contact component rendering with form animations');
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    console.log(`Contact form: ${name} changed to ${value}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    
    setIsLoading(true);
    
    // Create FormData to send to FormSubmit
    const form = e.target as HTMLFormElement;
    const formDataToSend = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/jxcoder.dev@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Falha no envio');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setIsLoading(false);
      alert('Erro ao enviar mensagem. Tente novamente.');
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'EMAIL', value: 'contato@techstorepro.com', color: 'text-blue-400' },
    { icon: Phone, label: 'TELEFONE', value: '+55 (11) 99999-9999', color: 'text-green-400' },
    { icon: MapPin, label: 'ENDEREÇO', value: 'Pinda/SP - CEP: 12402-010', color: 'text-red-400' },
    { icon: Clock, label: 'HORÁRIO', value: 'Seg-Sex: 9h às 18h', color: 'text-yellow-400' }
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

    const elements = contactRef.current?.querySelectorAll('.fade-in-up, .fade-in-up-delay-1, .fade-in-up-delay-2, .fade-in-up-delay-3');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="min-h-screen section-overlay"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1565728744382-61accd4aa148?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pr-8 sm:pr-16 lg:pr-32 py-12 sm:py-16 lg:py-20 section-content">
        <div className="text-center mb-12 sm:mb-16 fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">
            <span className="text-gradient">CONTATO</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-tech-accent mx-auto mb-6 sm:mb-8"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Entre em contato conosco para conhecer nossos produtos ou tirar suas dúvidas. 
            Nossa equipe está pronta para atendê-lo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="fade-in-up-delay-1">
            <h3 className="text-2xl font-semibold text-white mb-8">INFORMAÇÕES DE CONTATO</h3>
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 bg-tech-gray/30 backdrop-blur-sm rounded-lg hover-lift transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <Icon className={`${info.color}`} size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-white font-medium">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Maps Integration */}
            <div className="bg-tech-gray/30 backdrop-blur-sm rounded-lg p-2 h-80 hover-lift transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29557.47259832988!2d-45.527157!3d-22.924842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c9d6c3e5b3e9b9%3A0x8b2e1e5e8e5e8e5e!2sPindamonhangaba%2C%20SP%2C%2012400-000!5e0!3m2!1spt!2sbr!4v1633024800000!5m2!1spt!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização TechStore - Pinda/SP"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-up-delay-2">
            <h3 className="text-2xl font-semibold text-white mb-8">ENVIE UMA MENSAGEM</h3>
            
            {isSubmitted ? (
              <div className="text-center py-20 animate-scale-in">
                <CheckCircle className="mx-auto mb-6 text-green-400" size={80} />
                <h4 className="text-2xl font-semibold text-white mb-4">Mensagem Enviada!</h4>
                <p className="text-gray-300">Obrigado pelo contato. Retornaremos em breve!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                {/* FormSubmit configuration fields */}
                <input type="hidden" name="_subject" value="Nova mensagem do site TechStore Pro" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={window.location.href} />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Seu Nome"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-tech-gray/50 border border-tech-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/20 backdrop-blur-sm transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-tech-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Seu Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-tech-gray/50 border border-tech-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/20 backdrop-blur-sm transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-tech-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Assunto"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-tech-gray/50 border border-tech-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/20 backdrop-blur-sm transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-tech-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Sua Mensagem"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-tech-gray/50 border border-tech-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-tech-accent focus:ring-2 focus:ring-tech-accent/20 resize-none backdrop-blur-sm transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-tech-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-tech-accent hover:bg-tech-accent/80 text-white py-3 rounded-lg transition-all duration-300 font-semibold ripple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>ENVIANDO...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>ENVIAR MENSAGEM</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-8 border-t border-tech-gray fade-in-up-delay-3">
          <p className="text-gray-400">
            © 2024 TechStore Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;