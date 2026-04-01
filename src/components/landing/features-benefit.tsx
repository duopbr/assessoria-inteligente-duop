import { Section, SectionTitle } from "../ui/section";
import { FileText, TrendingUp, Bell, Check, Zap } from "lucide-react";

export function FeaturesBenefit() {
  const features = [
    {
      icon: <FileText size={36} />,
      badge: "Mais usada",
      badgeColor: "bg-green-50 text-green-700 border-green-200",
      title: "Resumo de Performance",
      benefit: "De 2 horas para 10 segundos",
      description: "Peça à IA um resumo completo da carteira do seu cliente. Rentabilidade, alocação, sugestões de rebalanceamento.",
      highlights: [
        "Análise completa de rentabilidade",
        "Sugestões de rebalanceamento",
        "Comparação com benchmarks"
      ]
    },
    {
      icon: <TrendingUp size={36} />,
      badge: "Imprescindível",
      badgeColor: "bg-duop-purple/10 text-duop-purple border-duop-purple/20",
      title: "Análise de Ativos",
      benefit: "Respostas em linguagem clara",
      description: "Cliente perguntou sobre um ativo? A IA explica em segundos: fundamentos, riscos, comparação com similares.",
      highlights: [
        "Fundamentos simplificados",
        "Análise de riscos",
        "Comparação com similares"
      ]
    },
    {
      icon: <Bell size={36} />,
      title: "Morning Call Personalizado",
      benefit: "Antecipe o mercado",
      description: "Receba todo dia um resumo do que impacta seus clientes, antes mesmo deles perguntarem.",
      highlights: [
        "Resumo diário automático",
        "Personalizado por carteira",
        "Antes do mercado abrir"
      ]
    }
  ];

  return (
    <Section className="bg-white">
      <SectionTitle>3 Funcionalidades Que Vão Mudar Sua Rotina</SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-white to-duop-purple/5 rounded-xl p-5 md:p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-duop-purple/15"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-duop-purple">
                {feature.icon}
              </div>
              {feature.badge && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${feature.badgeColor}`}>
                  {feature.badge}
                </span>
              )}
            </div>

            <h3 className="text-lg md:text-xl font-bold text-duop-blue mb-2">
              {feature.title}
            </h3>

            <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-lg px-3 py-1 mb-4">
              <Zap size={14} className="text-green-700" />
              <span className="text-green-700 font-semibold text-sm">
                {feature.benefit}
              </span>
            </div>

            <p className="text-duop-gray-dark text-sm mb-5">
              {feature.description}
            </p>

            <div className="space-y-2">
              {feature.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-duop-gray-dark">
                  <Check size={14} className="text-duop-purple flex-shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-base text-duop-gray-dark">
          <strong>E muito mais:</strong> Cálculos financeiros, transcrição de áudios, análise de documentos e relatórios personalizados.
        </p>
      </div>
    </Section>
  );
}

export default FeaturesBenefit;