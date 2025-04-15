
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        
        <p className="text-lg mb-6">
          Infelizmente, todos os nossos slots para trials estão esgotados no momento. 
          Assim que novas vagas forem abertas, entraremos em contato por WhatsApp.
        </p>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate('/')}
            className="bg-duop-purple hover:bg-duop-purple/90 text-white"
          >
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
