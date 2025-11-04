import { Section, SectionTitle } from "../ui/section";
import { Clock, FileText, TrendingUp, Building2, Bell, BarChart3, MessageSquare, FolderOpen } from "lucide-react";

export function HowToUseSection() {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Morning Call",
      description: "Enviaremos todo dia útil entre 9 e 10 horas da manhã",
      color: "text-blue-600"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Relatório Mensal da Carteira",
      description: "Basta enviar o relatório de performance finalizando no último dia útil do mês",
      color: "text-purple-600"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Análise da Carteira",
      steps: [
        "1º Passo: Enviar uma foto da carteira, ou o documento de posição consolidada",
        "2º Passo: Responder a mensagem e descrever o perfil do cliente",
        "3º Passo: Pedir a análise da carteira"
      ],
      color: "text-green-600"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Análise de Oferta Pública",
      commands: [
        '"Me fale quais ofertas analisadas que vocês tem"',
        '"Analise a oferta X"'
      ],
      color: "text-orange-600"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Recebimento de Análises e Relatórios Esporádicos",
      description: "Isso enviaremos quando fizermos, como fizemos com a nossa tese de dólar",
      color: "text-red-600"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Análise de Ação",
      commands: [
        '"Me faça a análise de ação X"',
        '"Me mande o documento da tese da ação X" (nosso documento de research)'
      ],
      color: "text-indigo-600"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Análise de FII",
      commands: [
        '"Me faça a análise de FII X"',
        '"Me mande o documento da tese da FII X" (nosso documento de research)'
      ],
      color: "text-cyan-600"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Dados Ação e FII",
      description: "Me dê os dados financeiros, cotação de X",
      color: "text-pink-600"
    },
    {
      icon: <FolderOpen className="w-6 h-6" />,
      title: "Carteira Recomendada",
      description: "Me mande o relatório de carteira recomendada",
      color: "text-yellow-600"
    }
  ];

  return (
    <Section id="como-usar" className="bg-gradient-to-b from-white to-duop-gray-light/30">
      <SectionTitle>Como Usar a Duop</SectionTitle>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-xl text-duop-gray-dark leading-relaxed">
          Veja como é simples utilizar todas as funcionalidades da Duop no seu dia a dia
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-duop-gray-light/20"
          >
            <div className={`${feature.color} mb-4`}>
              {feature.icon}
            </div>
            
            <h3 className="text-lg font-bold text-duop-blue mb-3">
              {feature.title}
            </h3>
            
            {feature.description && (
              <p className="text-duop-gray-dark text-sm leading-relaxed">
                {feature.description}
              </p>
            )}
            
            {feature.steps && (
              <ul className="space-y-2">
                {feature.steps.map((step, i) => (
                  <li key={i} className="text-duop-gray-dark text-sm leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            )}
            
            {feature.commands && (
              <ul className="space-y-2">
                {feature.commands.map((command, i) => (
                  <li key={i} className="text-duop-gray-dark text-sm italic bg-duop-gray-light/20 p-2 rounded">
                    {command}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
