import { FAQItem } from "@/components/ui/faq-item";

export function FAQSectionA() {
  const faqs = [
    {
      question: "Isso substitui meu trabalho como assessor?",
      answer: "Não! A Duop potencializa seu trabalho. Ela cuida das tarefas operacionais e repetitivas (como responder dúvidas básicas ou gerar relatórios), liberando você para focar no que realmente importa: construir relacionamentos, prospectar novos clientes e oferecer consultoria estratégica."
    },
    {
      question: "Preciso instalar algo?",
      answer: "Não precisa instalar nada! A Duop funciona 100% pelo WhatsApp. Basta ter o aplicativo no seu celular e pronto. Toda a inteligência artificial funciona na nuvem, sem ocupar espaço no seu dispositivo."
    },
    {
      question: "Quem faz as análises e responde às dúvidas?",
      answer: "Nossa IA foi treinada por especialistas do mercado financeiro e usa dados reais e atualizados. Ela analisa carteiras, gera insights e responde dúvidas com linguagem profissional. Você sempre pode revisar e personalizar as respostas antes de enviar ao cliente."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-duop-blue">
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
