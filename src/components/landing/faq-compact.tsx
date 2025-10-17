import { FAQItem } from "../ui/faq-item";

export function FAQCompact() {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-duop-blue mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-duop-gray-dark">
            Tudo o que você precisa saber antes de testar
          </p>
        </div>
        
        <div className="space-y-4">
          <FAQItem 
            question="Isso substitui meu trabalho como assessor?"
            answer="Não! A Duop foi criada para ajudar você, não substituir. Ela cuida das tarefas operacionais (resumos, alertas, respostas automáticas) enquanto você foca no relacionamento e orientação dos clientes. Você sempre tem o controle."
          />
          
          <FAQItem 
            question="Preciso instalar algo?"
            answer="Não precisa instalar nada. Tudo funciona 100% pelo WhatsApp. É só adicionar o contato da Duop e começar a usar. Simples assim."
          />
          
          <FAQItem 
            question="Como funciona a demo de 15 minutos?"
            answer="Marcamos uma videochamada rápida onde mostramos a Duop funcionando ao vivo na sua tela. Você vê exatamente como gerar resumos, responder clientes e receber alertas. Sem enrolação, direto ao ponto."
          />

          <FAQItem 
            question="Quanto custa?"
            answer="Durante a demo, apresentamos os planos disponíveis. Mas você pode testar gratuitamente antes de decidir qualquer coisa. Sem pegadinhas."
          />

          <FAQItem 
            question="Meus dados e dos clientes estão seguros?"
            answer="Sim! Usamos criptografia de ponta e seguimos todas as normas de segurança. Seus dados e dos seus clientes são tratados com o máximo sigilo e não são compartilhados com terceiros."
          />
        </div>
      </div>
    </section>
  );
}
