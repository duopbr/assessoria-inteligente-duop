
import { Section, SectionTitle } from "../ui/section";
import { Calendar } from "lucide-react";

export function CTASection() {
  return (
    <Section id="contato" className="bg-gradient-to-br from-duop-purple/10 to-duop-purple/5">
      <SectionTitle emoji="💡">
        Quer ver como funciona?
      </SectionTitle>
      
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xl mb-8">
          Marque uma conversa de 10 minutos conosco.
          <br />
          Demonstraremos na prática como a plataforma pode transformar a sua rotina, 
          esclareceremos suas dúvidas e ainda liberamos um desconto especial de 
          lançamento para quem participou da fase inicial.
        </p>
        
        <a 
          href="https://outlook.office.com/bookwithme/user/6c084914dd174c1882e026a95a54bf79@duop.com.br/meetingtype/YMMt-mG0-EG_5Q4HvKL_Pg2?anonymous&ep=owaSlotsCopyCard" 
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button mx-auto max-w-xs transform transition-transform hover:scale-105"
        >
          <Calendar size={20} />
          📅 Quero agendar agora
        </a>
      </div>
    </Section>
  );
}
