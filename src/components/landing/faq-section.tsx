
import { Section, SectionTitle } from "../ui/section";
import { FAQItem } from "../ui/faq-item";

export function FAQSection() {
  return (
    <Section>
      <SectionTitle>
        Perguntas Frequentes
      </SectionTitle>
      
      <div className="max-w-3xl mx-auto">
        <FAQItem 
          question="Isso substitui meu trabalho como assessor?"
          answer="De forma nenhuma. A Duop foi criada para ser sua aliada. Você continua no controle, com mais ferramentas para focar no que realmente importa: conversar, orientar e agregar valor."
        />
        
        <FAQItem 
          question="Preciso instalar algo?"
          answer="Não. Tudo acontece direto no WhatsApp – simples, rápido e no canal que seus clientes já utilizam."
        />
        
        <FAQItem 
          question="Quem faz as análises e responde às dúvidas?"
          answer="Nosso time conta com ex-gestores, especialistas e uma base de conhecimento que integra tecnologia à inteligência de mercado, sempre com linguagem clara e útil."
        />
      </div>
    </Section>
  );
}
