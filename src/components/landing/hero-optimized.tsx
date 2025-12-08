import { Section } from "../ui/section";
import { LeadForm } from "./lead-form";
import { CheckCircle2 } from "lucide-react";

export function HeroOptimized() {
  return (
    <Section className="bg-white pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Coluna Esquerda - Mensagem Principal */}
        <div className="order-2 lg:order-1 space-y-8">
          <div className="inline-block bg-duop-purple/10 border border-duop-purple/20 rounded-full px-4 py-2 mb-4">
            <span className="text-duop-purple font-semibold text-sm">
              ✅ +3.000 assessores já testaram | XP • BTG • Warren
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-duop-blue leading-tight">
            Ganhe 5 Dias de Trabalho por Mês.
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-duop-purple">
            A Rotina do Assessor, Reinventada pela IA.
          </h2>

          <p className="text-xl text-duop-gray-dark leading-relaxed">
            Automatize tarefas operacionais e ganhe tempo para relacionamento e estratégia.
          </p>

          <div className="space-y-5 pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-green-500 flex-shrink-0" size={28} />
              <p className="text-lg font-semibold text-duop-blue">
                Resumos de carteira em 10 segundos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-blue-500 flex-shrink-0" size={28} />
              <p className="text-lg font-semibold text-duop-blue">
                Respostas automáticas no WhatsApp 24/7
              </p>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-purple-500 flex-shrink-0" size={28} />
              <p className="text-lg font-semibold text-duop-blue">
                Alertas inteligentes antes dos clientes
              </p>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Formulário */}
        <div className="order-1 lg:order-2">
          <div className="bg-gradient-to-br from-duop-purple/5 to-duop-blue/5 rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-duop-purple/20 shadow-xl max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-duop-blue mb-2">
                Agende Sua Demo de 15 Minutos
              </h3>
              <p className="text-sm sm:text-base text-duop-gray-dark">
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
