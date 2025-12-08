
import { Section, SectionTitle } from "../ui/section";
import { FeatureCard } from "../ui/feature-card";
import { BellRing, HelpCircle, BarChart3 } from "lucide-react";
import { WhatsAppMockup } from "./whatsapp-mockup";

export function SolutionSection() {
  return (
    <Section>
      <SectionTitle>
        Em 15 minutos, você vai descobrir como:
      </SectionTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <div className="grid grid-cols-1 gap-8">
            <FeatureCard 
              icon={<BarChart3 />}
              title="✅ Gerar um resumo de carteira em segundos"
              description="Vamos te mostrar como criar análises completas da carteira do seu cliente automaticamente, com dados atualizados e insights práticos."
            />
            
            <FeatureCard 
              icon={<HelpCircle />}
              title="✅ Responder dúvidas de clientes sem sair do WhatsApp"
              description="Demonstraremos como a IA responde perguntas complexas sobre investimentos diretamente no chat, com respostas personalizadas e precisas."
            />
            
            <FeatureCard 
              icon={<BellRing />}
              title="✅ Antecipar-se ao mercado com alertas inteligentes (Em breve)"
              description="Você verá como receber notificações proativas sobre seus ativos acompanhados antes mesmo dos clientes perguntarem."
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <WhatsAppMockup />
        </div>
      </div>
      
      <div className="text-center mt-12">
        <p className="text-lg text-duop-gray-dark max-w-2xl mx-auto">
          <strong>Tudo isso ao vivo, na sua tela.</strong> Uma demonstração personalizada onde você vê exatamente 
          como a Duop se adapta à sua rotina de assessor.
        </p>
      </div>
    </Section>
  );
}

export default SolutionSection;
