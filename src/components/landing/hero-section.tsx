
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white to-duop-purple/5 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">A inteligência</span> que trabalha por você.
            <br />
            Direto no WhatsApp.
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-duop-gray-dark">
            <strong>Menos tempo apagando incêndio</strong>. Mais presença com o cliente. 
            Um conversador feito para assessores que querem <strong>ganhar produtividade</strong>. 
            Por apenas <strong>47,00 reais ao mês</strong>.
          </p>
          
          <a 
            href="#contato" 
            className="cta-button mx-auto max-w-xs transform transition-transform hover:scale-105"
          >
            🚀 Quero testar agora
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
