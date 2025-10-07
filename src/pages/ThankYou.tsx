
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle } from "lucide-react";

const ThankYou = () => {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-duop-purple/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8">
          <span className="gradient-text">Ótima decisão! Sua vaga para a demonstração está reservada.</span>
        </h1>
        
        <div className="mb-8">
          <CheckCircle className="w-24 h-24 mx-auto text-[#25D366] mb-6" />
        </div>
        
        <div className="space-y-4 mb-10">
          <p className="text-lg text-duop-gray-dark font-medium">
            Um de nossos especialistas vai te chamar no WhatsApp nos próximos minutos para agendar o melhor horário.
          </p>
          
          <p className="text-base text-duop-gray-dark">
            Nessa conversa rápida, vamos te mostrar ao vivo como você pode automatizar tarefas e impressionar seus clientes.
          </p>
          
          <p className="text-base text-duop-gray-dark">
            Não quer esperar? Clique no botão abaixo para chamar nossa equipe no WhatsApp agora mesmo e acelerar seu agendamento!
          </p>
        </div>
        
        <Button 
          asChild
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white text-lg py-6 px-8 h-auto w-full sm:w-auto"
        >
          <a 
            href="https://wa.me/5521973973673?text=Olá, quero agendar minha demonstração de 15min!"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            ✅ Agendar minha Demo de 15min via WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
