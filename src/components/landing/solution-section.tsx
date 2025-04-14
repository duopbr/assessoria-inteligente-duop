
import { Section, SectionTitle } from "../ui/section";
import { FeatureCard } from "../ui/feature-card";
import { BellRing, HelpCircle, BarChart3 } from "lucide-react";
import { WhatsAppMockup } from "./whatsapp-mockup";

export function SolutionSection() {
  return (
    <Section>
      <SectionTitle>
        A Duop é o seu braço direito digital — direto no WhatsApp.
      </SectionTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <div className="grid grid-cols-1 gap-8">
            <FeatureCard 
              icon={<BellRing />}
              title="📢 Proatividade sem Esforço"
              description="Selecione os ativos que deseja acompanhar e receba alertas sobre notícias, fatos relevantes e oscilações fora do padrão – tudo no momento certo."
            />
            
            <FeatureCard 
              icon={<HelpCircle />}
              title="❓ Respostas Inteligentes na Palma da Mão"
              description="Quando os clientes enviarem dúvidas sobre ofertas, ações ou produtos, responda pelo WhatsApp com explicações claras e consultivas, prontas para repassar."
            />
            
            <FeatureCard 
              icon={<BarChart3 />}
              title="📊 Análises Sem Viés, Direto para a Conversa"
              description="Receba resumos práticos de ofertas, movimentos macro e insights de ações com linguagem acessível, para você conversar com propriedade."
            />
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <WhatsAppMockup />
        </div>
      </div>
    </Section>
  );
}
