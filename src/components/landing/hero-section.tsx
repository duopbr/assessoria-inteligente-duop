
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-white to-duop-purple/5 py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">💬 A inteligência</span> que trabalha por você, direto no WhatsApp.
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-duop-gray-dark">
            Menos tempo apagando incêndio. Mais presença com o cliente.
            <br />
            <span className="font-medium">Uma plataforma feita para assessores que querem ser lembrados — sem perder produtividade.</span>
          </p>
          
          <a 
            href="https://outlook.office.com/bookwithme/user/6c084914dd174c1882e026a95a54bf79@duop.com.br/meetingtype/YMMt-mG0-EG_5Q4HvKL_Pg2?anonymous&ep=owaSlotsCopyCard" 
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button mx-auto max-w-xs transform transition-transform hover:scale-105"
          >
            🔍 Quero entender como funciona
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
