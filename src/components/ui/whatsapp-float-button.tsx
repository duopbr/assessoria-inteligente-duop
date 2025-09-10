import { MessageCircle } from "lucide-react";
import { Button } from "./button";

export const WhatsAppFloatButton = () => {
  const phoneNumber = "+5521973973673";
  const message = "Quero marcar uma reunião";
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-16 bg-green-500 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Quero marcar uma reunião
      </span>
    </Button>
  );
};