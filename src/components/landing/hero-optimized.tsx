import { Section } from "../ui/section";
import { LeadForm } from "../ui/lead-form";
import { CheckCircle2 } from "lucide-react";

export function HeroOptimized() {
  return (
    <Section className="bg-white pt-24 pb-16">
      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Coluna Esquerda - 40% */}
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-block bg-duop-purple/10 border border-duop-purple/20 rounded-full px-4 py-2 mb-4">
            <span className="text-duop-purple font-semibold text-sm">
              ✅ +3.000 assessores já testaram | XP • BTG • Warren
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-duop-blue leading-tight">
            Ganhe 5 Dias de Trabalho por Mês.
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-duop-purple">
            A Rotina do Assessor, Reinventada pela IA.
          </h2>

          <p className="text-xl text-duop-gray-dark">
            Descubra como a Duop automatiza relatórios de performance, análises de ativos e comunicação com clientes, 
            liberando seu tempo para o que realmente importa: o relacionamento e a estratégia.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-duop-purple mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-bold text-duop-blue">Resumos de performance em 10 segundos</p>
                <p className="text-sm text-duop-gray-dark">De 2 horas para 10 segundos na criação de relatórios</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-duop-purple mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-bold text-duop-blue">Análise de ativos automatizada</p>
                <p className="text-sm text-duop-gray-dark">Respostas inteligentes sobre qualquer ativo em segundos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-duop-purple mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-bold text-duop-blue">Respostas inteligentes direto no WhatsApp</p>
                <p className="text-sm text-duop-gray-dark">Atenda seus clientes 24/7 com IA treinada no mercado financeiro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita - 60% - Formulário */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-duop-purple/5 to-duop-blue/5 rounded-2xl p-8 border-2 border-duop-purple/20 shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-duop-blue mb-2">
                Agende Sua Demo de 15 Minutos
              </h3>
              <p className="text-duop-gray-dark">
                Veja na prática como a Duop vai transformar sua rotina
              </p>
            </div>

            <LeadForm source="hero_optimized" ctaText="📱 Quero ver na prática agora" />
          </div>
        </div>
      </div>
    </Section>
  );
}
