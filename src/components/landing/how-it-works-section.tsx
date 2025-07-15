import { Section, SectionTitle } from "../ui/section";
import { FeatureCard } from "../ui/feature-card";
import { 
  FileText, 
  Brain, 
  Newspaper, 
  TrendingUp, 
  MessageSquare,
  Calculator,
  Bell
} from "lucide-react";

export function HowItWorksSection() {
  const availableFeatures = [
    {
      icon: <FileText />,
      title: "Resumos de Carteira em Segundos",
      description: "Chega de trabalho manual. Envie o relatório de performance (XP) e nossa IA gera um resumo mensal claro e objetivo para cada cliente, explicando os resultados e as movimentações de forma simples e direta."
    },
    {
      icon: <Brain />,
      title: "Seu Especialista de IA para Análises",
      description: "Converse com nossa IA e obtenha dados, insights e análises sobre Fundos Imobiliários, Ações, Renda Fixa e cenários econômicos. Solicite também documentos como cartas de fundos e releases de resultados diretamente em PDF.",
      note: "Análise de cenários e classes de ativos já disponível. Análise de ativos específicos será implementada progressivamente."
    },
    {
      icon: <Newspaper />,
      title: "Notícias Relevantes, Sem Ruído",
      description: "Busque notícias sobre ativos específicos ou sobre o cenário econômico e receba resumos diretos. Garanta que nenhuma informação importante passe despercebida por você ou seu cliente."
    },
    {
      icon: <TrendingUp />,
      title: "Análise das Ofertas do Mês",
      description: "Acesse todas as ofertas relevantes do mercado em um só lugar. Fornecemos os dados e uma análise isenta para te ajudar a esclarecer dúvidas sobre riscos, liquidez, retorno e tributação dos produtos."
    },
    {
      icon: <MessageSquare />,
      title: "Auxiliar para Comunicação com o Cliente",
      description: "Use nosso agente de IA para criar explicações didáticas e sem jargões técnicos sobre conceitos financeiros, classes de ativos e cenários econômicos. Facilite o entendimento do seu cliente e agregue mais valor ao seu serviço."
    }
  ];

  const upcomingFeatures = [
    {
      icon: <Calculator />,
      title: "Calculadora Financeira Inteligente",
      description: "Esqueça as planilhas complexas. Apenas descreva o problema – cálculo de juros reais, planejamento de aposentadoria, comparações – e nossa IA entrega o resultado completo, pronto para a sua tomada de decisão."
    },
    {
      icon: <Bell />,
      title: "Alertas Proativos e Personalizados",
      description: "Monitore os ativos da carteira dos seus clientes e seja notificado proativamente sobre oscilações relevantes, notícias críticas, dividendos e vencimentos. Antecipe-se às dúvidas dos seus clientes e atue de forma estratégica."
    }
  ];

  return (
    <Section id="como-funciona" className="bg-duop-gray-light/30">
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
            <div key={index} className="relative">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full"
              />
              {feature.note && (
                <div className="mt-4 p-3 bg-duop-purple/10 border border-duop-purple/20 rounded-lg">
                  <p className="text-sm text-duop-purple font-medium">
                    💡 {feature.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Em Breve */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-duop-blue mb-4">
            Novas Ferramentas para Potencializar seu Trabalho
          </h3>
          <p className="text-lg text-duop-gray-dark">
            Lançamento em até 6 semanas
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {upcomingFeatures.map((feature, index) => (
            <div key={index} className="relative">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="opacity-80 border-2 border-dashed border-duop-purple/30"
              />
              <div className="absolute top-4 right-4 bg-duop-purple text-white text-xs px-2 py-1 rounded-full">
                Em breve
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}