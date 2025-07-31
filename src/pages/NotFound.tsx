import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-duop-purple/5 flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8">
          <img
            src="/lovable-uploads/b10b2b1a-83ce-47f4-8f30-3b76dcd797c3.png"
            alt="Duop Logo"
            className="h-16 mx-auto mb-6"
            loading="eager"
          />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-duop-blue">Página não encontrada</h2>
        <p className="text-lg text-duop-gray-dark mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link to="/">
          <Button size="lg" className="bg-duop-purple hover:bg-duop-purple/90 text-white px-8 py-3">
            Voltar ao Início
          </Button>
        </Link>
        
        <div className="mt-8 text-sm text-duop-gray-dark">
          Se você acredita que isso é um erro, entre em contato conosco.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
