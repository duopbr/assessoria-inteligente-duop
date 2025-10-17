import { Clock, Zap, Target } from "lucide-react";

export function BenefitsFocused() {
  const benefits = [
    {
      icon: <Clock className="text-duop-blue" size={48} />,
      title: "5 horas extras por semana",
      description: "Automatize tarefas repetitivas e foque no que realmente importa: crescer sua carteira.",
      highlight: "Menos planilhas, mais clientes"
    },
    {
      icon: <Zap className="text-duop-purple" size={48} />,
      title: "Respostas instantâneas",
      description: "Responda dúvidas complexas dos clientes em segundos, direto no WhatsApp.",
      highlight: "IA treinada em mercado financeiro"
    },
    {
      icon: <Target className="text-green-600" size={48} />,
      title: "Nunca perca uma oportunidade",
      description: "Receba alertas sobre seus ativos antes dos clientes perguntarem.",
      highlight: "Seja proativo, não reativo"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-duop-blue mb-4">
            Por que assessores escolhem a Duop?
          </h2>
          <p className="text-xl text-duop-gray-dark max-w-2xl mx-auto">
            Não é mágica. É <strong>inteligência artificial</strong> focada no que você realmente precisa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white to-duop-purple/5 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-duop-purple/10"
            >
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-duop-blue">{benefit.title}</h3>
              <p className="text-duop-gray-dark mb-4">{benefit.description}</p>
              <div className="inline-block bg-duop-blue/10 text-duop-blue px-4 py-2 rounded-full text-sm font-semibold">
                {benefit.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
