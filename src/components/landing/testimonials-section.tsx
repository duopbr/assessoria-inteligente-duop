import { Section, SectionTitle } from "../ui/section";
import { TestimonialCard } from "../ui/testimonial-card";
import { Briefcase, Users, Award } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Finalmente consigo focar na estratégia, não na operação. Ganhei 6h por semana só com os resumos automáticos.",
      name: "Carlos Mendes",
      role: "Assessor Sênior",
      company: "XP Investimentos"
    },
    {
      quote: "Meus clientes ficam impressionados com a velocidade das análises. Parece mágica, mas é tecnologia de ponta.",
      name: "Fernanda Lima",
      role: "Assessora Premium",
      company: "BTG Pactual"
    },
    {
      quote: "Deixei de passar horas montando relatórios. Agora foco 100% no relacionamento e na captação.",
      name: "Roberto Silva",
      role: "Head de Assessoria",
      company: "Warren"
    }
  ];

  const credibilityItems = [
    {
      icon: <Briefcase size={32} />,
      title: "Experiência Real",
      description: "Ex-gestores e estrategistas de grandes assessorias"
    },
    {
      icon: <Users size={32} />,
      title: "Co-criação",
      description: "Validado com +3.000 assessores parceiros"
    },
    {
      icon: <Award size={32} />,
      title: "Time Técnico",
      description: "Mestres, Doutores e PhDs em IA aplicada"
    }
  ];

  return (
    <Section className="bg-gradient-to-b from-duop-purple/5 to-white">
      <SectionTitle>Assessores Reais, Resultados Reais</SectionTitle>
      
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>

      <div className="mt-20 pt-12 border-t-2 border-duop-purple/20">
        <h3 className="text-3xl font-bold text-center text-duop-blue mb-12">
          Quem Construiu a Duop
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {credibilityItems.map((item, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-duop-purple/10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-duop-purple to-duop-blue rounded-full text-white mb-4">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-duop-blue mb-2">
                {item.title}
              </h4>
              <p className="text-duop-gray-dark">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
