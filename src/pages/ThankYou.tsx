
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const queueNumber = searchParams.get("numero") || "---";
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    document.title = "Obrigado - Duop";
    
    // Redirect to home after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);
  
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
        
        <div className="text-sm text-duop-gray">
          Você será redirecionado para a página inicial em {countdown} segundos.
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
