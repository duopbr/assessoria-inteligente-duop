
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const queueNumber = searchParams.get("numero") || "---";
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-duop-purple/5 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-6">
          <span className="gradient-text">Obrigado pelo interesse!</span>
        </h1>
        
        <div className="mb-6">
          <div className="w-24 h-24 rounded-full bg-duop-purple/10 mx-auto flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-duop-purple">{queueNumber}</span>
          </div>
          <p className="text-xl text-duop-gray-dark">
            Este é seu número na fila de espera
          </p>
        </div>
        
        <p className="text-lg mb-8 text-duop-gray-dark">
          Recebemos seu interesse! Quer começar hoje mesmo? Entre em contato com nosso suporte para agendar sua reunião de demonstração, ou espere o suporte entrar em contato com você.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
          >
            <a 
              href={`https://wa.me/5521973973673?text=Ol%C3%A1%2C%20estou%20na%20fila%20de%20espera%20(n%C2%BA%20${queueNumber})%20e%20gostaria%20de%20agendar%20minha%20reuni%C3%A3o%20de%20demonstra%C3%A7%C3%A3o`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar com Suporte
            </a>
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="border-duop-purple text-duop-purple hover:bg-duop-purple/10"
          >
            Voltar para o site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
