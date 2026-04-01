
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle } from "lucide-react";

const ThankYou = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-duop-purple/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10 max-w-2xl w-full text-center">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
          <span className="gradient-text">Ótima decisão! Sua vaga para a demonstração está reservada.</span>
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <CheckCircle className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-[#25D366] mb-4 sm:mb-6" />
        </div>
        
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <p className="text-base sm:text-lg text-duop-gray-dark font-medium">
            Um de nossos especialistas vai te chamar no WhatsApp nos próximos minutos para agendar o melhor horário.
          </p>
          
          <p className="text-sm sm:text-base text-duop-gray-dark">
            Nessa conversa rápida, vamos te mostrar ao vivo como você pode automatizar tarefas e impressionar seus clientes.
          </p>
          
          <p className="text-sm sm:text-base text-duop-gray-dark">
            Não quer esperar? Clique no botão abaixo para chamar nossa equipe no WhatsApp agora mesmo e acelerar seu agendamento!
          </p>
        </div>
        
        <Button 
          asChild
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-base sm:text-lg py-4 sm:py-6 px-4 sm:px-8 h-auto w-full sm:w-auto whitespace-normal"
        >
          <a 
            href="https://wa.me/5521973973673?text=Quero%20agendar%20a%20reunião"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <MessageCircle className="mr-2 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <span>Agendar minha Demo de 15min via WhatsApp</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
