import { Section, SectionTitle } from "../ui/section";
import { FeatureCard } from "../ui/feature-card";
import { FileText, Brain, Newspaper, TrendingUp, MessageSquare, Calculator, Bell } from "lucide-react";
export function HowItWorksSection() {
  const availableFeatures = [{
    icon: <FileText />,
    title: "✅ Resumos de Carteira Automáticos",
    description: "Gere análises para clientes em segundos."
  }, {
    icon: <Brain />,
    title: "✅ Especialista IA no seu WhatsApp",
    description: "Responda dúvidas complexas sobre ativos instantaneamente."
  }, {
    icon: <Newspaper />,
    title: "✅ Notícias Relevantes, Sem Ruído",
    description: "Receba resumos do que realmente importa para seus clientes."
  }, {
    icon: <TrendingUp />,
    title: "✅ Análise das Ofertas do Mês",
    description: "Acesse todas as ofertas relevantes em um só lugar."
  }, {
    icon: <MessageSquare />,
    title: "✅ Auxiliar para Comunicação",
    description: "Crie explicações didáticas sem jargões técnicos."
  }];
  return <Section id="como-funciona" className="bg-duop-gray-light/30">
      <SectionTitle>
        Sua Rotina de Assessor, Simplificada e Inteligente
      </SectionTitle>
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <p className="text-xl text-duop-gray-dark leading-relaxed">
          A Duop transforma a maneira como você interage com informações financeiras. 
          Centralize análises, relatórios e comunicação em uma única plataforma de IA conversacional, 
          liberando seu tempo para o que realmente importa: seus clientes.
        </p>
      </div>

      {/* Funcionalidades Disponíveis */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-duop-blue mb-4">
            Funcionalidades Disponíveis
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableFeatures.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              className="h-full" 
            />
          ))}
        </div>
      </div>

    </Section>;
}