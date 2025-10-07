import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  console.log('WhatsApp button rendering');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Número do WhatsApp (substitua pelo número real)
  const whatsappNumber = "5511999999999"; // Formato: código do país + DDD + número
  const message = "Olá! Gostaria de saber mais sobre os produtos da TechStore Pro.";
  
  const handleWhatsAppClick = () => {
    console.log('WhatsApp button clicked');
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    console.log('WhatsApp button hidden');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full right-0 mb-2 bg-tech-gray/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap animate-fade-in">
          Fale conosco no WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-tech-gray/95"></div>
        </div>
      )}
      
      {/* WhatsApp Button */}
      <div
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)'
        }}
      >
        {/* Close button */}
        <div
          onClick={handleClose}
          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xs cursor-pointer"
        >
          <X size={12} />
        </div>
        
        {/* WhatsApp Icon */}
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-green-500/30 animate-ping pointer-events-none"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;