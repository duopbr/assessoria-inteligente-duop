import { Section, SectionTitle } from "../ui/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function FAQCompact() {
  const faqs = [
    {
      question: "Isso substitui meu trabalho como assessor?",
      answer: "Não! A Duop automatiza tarefas operacionais (relatórios, análises técnicas), liberando seu tempo para o que só você faz: relacionamento e estratégia. A IA é sua assistente, não sua substituta."
    },
    {
      question: "Preciso instalar algo ou mudar de sistema?",
      answer: "Zero instalação. Tudo funciona 100% no WhatsApp. A Duop se integra à sua rotina, não o contrário. Basta adicionar nosso número e começar a usar."
    },
    {
      question: "E se eu não gostar? Posso cancelar?",
      answer: "Sim, sem burocracia e sem fidelidade. Mas estamos confiantes: mais de 3.000 assessores já testaram e 94% seguem usando ativamente todos os dias."
    },
    {
      question: "A IA tem acesso aos meus dados de clientes?",
      answer: "Não. A Duop trabalha com informações públicas de mercado (cotações, fundamentos, notícias). Você decide o que compartilhar e mantém total controle sobre os dados sensíveis."
    },
    {
      question: "Quanto tempo leva para implementar?",
      answer: "A demo acontece em 15 minutos. Se aprovar, o acesso é liberado em até 24h. Você começa a usar no mesmo dia, sem treinamento complexo ou configurações técnicas."
    }
  ];

  return (
    <Section className="bg-duop-gray-lightest">
      <SectionTitle>Perguntas Frequentes</SectionTitle>
      
      <div className="max-w-3xl mx-auto mt-12">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-md border border-duop-purple/10 px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-duop-blue hover:text-duop-purple">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-duop-gray-dark pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-duop-gray-dark">
          Ainda tem dúvidas? <a href="https://wa.me/5521973973673" className="text-duop-purple font-bold hover:underline">Fale conosco no WhatsApp</a>
        </p>
      </div>
    </Section>
  );
}
